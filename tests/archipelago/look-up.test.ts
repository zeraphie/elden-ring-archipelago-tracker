import { describe, expect, test } from "bun:test";
import { lookUp } from "../../src/archipelago/look-up.js";
import { TestSocket, testRoom } from "../fixtures/sockets.js";
import webApi from "../fixtures/web-api.json";
import { recordedWeb } from "../fixtures/web.js";

const ROOM = { kind: "room", room: "q3Xh8sJm2PzK0tLw9RbVcA" } as const;
const TRACKER = { kind: "tracker", tracker: "q3Xh8sJm2PzK0tLw9RbVcA" } as const;
// 21 minutes after the recorded room was last active, inside its two-hour timeout.
const NOW = () => Date.parse("Thu, 22 Oct 2026 21:00:00 GMT");
// Three players: the recorded Elden Ring slot, and two of other games.
const THREE = {
  ...webApi.room_status,
  players: [
    ["Tarnished", "EldenRing"],
    ["Sam", "Ocarina of Time"],
    ["Jo", "Hollow Knight"],
  ],
};

// A release the tracker has moved on from, and a tracker page whose room was made with it.
const OLD_RELEASE = "c3ab8b33b4e26448022dd43b79b231082699e63b";
const oldTracker = (checksum: string) => ({
  ...webApi.static_tracker,
  datapackage: { ...webApi.static_tracker.datapackage, EldenRing: { checksum, version: 7 } },
});

describe("lookUp", () => {
  test("a room on a past release goes no further, its socket let go, naming the release", async () => {
    const room = testRoom(undefined, OLD_RELEASE);
    const result = await lookUp(ROOM, {
      fetcher: recordedWeb().fetcher,
      opener: room.opener,
      now: NOW,
    });
    expect(result).toEqual({
      kind: "unsupported",
      release: "0.1.3",
      page: `https://archipelago.gg/room/${ROOM.room}`,
    });
    expect(room.sockets[0]?.socket.isClosed).toBe(true);
  });

  test("a tracker link on a release it doesn't know goes no further, with no release to name", async () => {
    const result = await lookUp(TRACKER, {
      fetcher: recordedWeb({ static_tracker: { body: oldTracker("a release to come") } }).fetcher,
    });
    expect(result).toEqual({
      kind: "unsupported",
      release: undefined,
      page: `https://archipelago.gg/tracker/${TRACKER.tracker}`,
    });
  });

  test("an awake room offers its slots in order, Elden Ring's marked, on a socket left open", async () => {
    const room = testRoom();
    const result = await lookUp(ROOM, {
      fetcher: recordedWeb({ room_status: { body: THREE } }).fetcher,
      opener: room.opener,
      now: NOW,
    });
    expect(result.kind).toBe("found");
    const found = result.kind === "found" ? result.found : undefined;
    expect(
      found?.slots.map(({ player, name, isEldenRing }) => [player, name, isEldenRing])
    ).toEqual([
      [1, "Tarnished", true],
      [2, "Sam", false],
      [3, "Jo", false],
    ]);
    expect(found?.kind === "room" && found.needsPassword).toBe(false);
    expect(room.sockets.map(({ url }) => url)).toEqual(["wss://archipelago.gg:61475"]);
    expect(room.sockets[0]?.socket.isClosed).toBe(false);
  });

  test("RoomInfo says whether the room needs a password", async () => {
    const result = await lookUp(ROOM, {
      fetcher: recordedWeb().fetcher,
      opener: testRoom("secret").opener,
      now: NOW,
    });
    expect(
      result.kind === "found" && result.found.kind === "room" && result.found.needsPassword
    ).toBe(true);
  });

  test("a sleeping room is left asleep, with its page, and no socket is opened", async () => {
    const room = testRoom();
    const result = await lookUp(ROOM, {
      fetcher: recordedWeb().fetcher,
      opener: room.opener,
      now: () => Date.parse("Fri, 23 Oct 2026 12:00:00 GMT"),
    });
    expect(result).toEqual({
      kind: "asleep",
      since: Date.parse(webApi.room_status.last_activity),
      page: `https://archipelago.gg/room/${ROOM.room}`,
    });
    expect(room.sockets).toEqual([]);
  });

  test("a room archipelago.gg doesn't have is gone", async () => {
    const result = await lookUp(ROOM, {
      fetcher: recordedWeb({ room_status: { status: 404 } }).fetcher,
      now: NOW,
    });
    expect(result).toEqual({ kind: "gone" });
  });

  test("no answer, or a socket that closes before RoomInfo, is unreachable", async () => {
    const offline = await lookUp(ROOM, { fetcher: () => Promise.reject(new TypeError("offline")) });
    expect(offline).toEqual({ kind: "unreachable" });
    const closing = await lookUp(ROOM, {
      fetcher: recordedWeb().fetcher,
      opener: () => {
        const socket = new TestSocket();
        queueMicrotask(() => socket.close());
        return socket;
      },
      now: NOW,
    });
    expect(closing).toEqual({ kind: "unreachable" });
  });

  test("an answer in a shape the tracker doesn't read names the field", async () => {
    const result = await lookUp(ROOM, {
      fetcher: recordedWeb({ room_status: { body: { ...webApi.room_status, last_port: "x" } } })
        .fetcher,
      now: NOW,
    });
    expect(result).toEqual({ kind: "unexpected", field: "last_port" });
  });

  test("a tracker link names its slots from slot_data, and opens no socket", async () => {
    const web = recordedWeb();
    const room = testRoom();
    const result = await lookUp(TRACKER, { fetcher: web.fetcher, opener: room.opener });
    expect(result.kind === "found" && result.found.slots).toEqual([
      { team: 0, player: 1, name: "Tarnished", game: "EldenRing", isEldenRing: true },
    ]);
    expect(web.asked.map((url) => url.split("/api/")[1]?.split("/")[0])).toEqual([
      "static_tracker",
      "slot_data_tracker",
    ]);
    expect(room.sockets).toEqual([]);
  });
});
