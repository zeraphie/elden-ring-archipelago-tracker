import { describe, expect, test } from "bun:test";
import { readRulesSlotData } from "../../src/archipelago/elden-ring-slot.js";
import type { LiveEvent } from "../../src/archipelago/live-events.js";
import { LiveRoom } from "../../src/archipelago/live-room.js";
import { ELDEN_RING, lookUp } from "../../src/archipelago/look-up.js";
import { roomAddress, RoomSocket } from "../../src/archipelago/room-socket.js";
import { isNewer, serverVersionOf } from "../../src/archipelago/versions.js";
import { isApworldSupported } from "../../src/data/rules/apworld.js";
import { OTHER_PLAYERS } from "../../src/demo/players.js";
import { demoLocationNames, DEMO_PLAYER, DEMO_SLOT } from "../../src/demo/room.js";
import { demoSnapshot } from "../../src/demo/snapshot.js";
import { demoOpener } from "../../src/demo/socket.js";
import { demoFetcher } from "../../src/demo/web.js";
import { TRACKER_VERSION } from "../fixtures/sockets.js";
import { until } from "../fixtures/waits.js";

const SNAPSHOT = demoSnapshot();
const open = () => RoomSocket.open(roomAddress(38281), demoOpener());

// The packets as the live room reads them, through a login.
async function loggedIn(): Promise<{ readonly events: LiveEvent[]; readonly live: LiveRoom }> {
  const socket = await open();
  const events: LiveEvent[] = [];
  const live = new LiveRoom(socket, (event) => events.push(event));
  await socket.logIn(DEMO_SLOT, TRACKER_VERSION);
  return { events, live };
}

describe("demoOpener", () => {
  test("says a room with no password as it opens", async () => {
    expect((await open()).info.password).toBe(false);
  });

  test("says a data package checksum the tracker can read", async () => {
    const { info } = await open();
    const checksums = new Map(Object.entries(info.datapackage_checksums));
    expect(isApworldSupported(checksums.get(ELDEN_RING))).toBe(true);
  });

  test("says a version the tracker is sure of", async () => {
    const version = serverVersionOf((await open()).info);
    expect(version).toBeDefined();
    expect(version && isNewer(version, TRACKER_VERSION)).toBe(false);
  });

  test("logs the slot in with the run as the snapshot has it", async () => {
    const socket = await open();
    const connected = await socket.logIn(DEMO_SLOT, TRACKER_VERSION);
    expect(connected.slot).toBe(DEMO_PLAYER.player);
    expect(connected.team).toBe(DEMO_PLAYER.team);
    expect(connected.checked_locations).toEqual([...SNAPSHOT.checked]);
    expect(connected.missing_locations).toHaveLength(
      demoLocationNames().size - SNAPSHOT.checked.length
    );
  });

  test("lists every player with the login", async () => {
    const { players } = await (await open()).logIn(DEMO_SLOT, TRACKER_VERSION);
    expect(players.map(({ name }) => name)).toEqual([
      DEMO_SLOT,
      ...OTHER_PLAYERS.map(({ name }) => name),
    ]);
  });

  test("gives slot_data the rules can read with the login", async () => {
    const { slot_data: slotData } = await (await open()).logIn(DEMO_SLOT, TRACKER_VERSION);
    expect(readRulesSlotData(slotData as Record<string, unknown>)?.goal).toHaveLength(2);
  });

  test("hands over the whole list of items with the login, so none of it toasts", async () => {
    const { events } = await loggedIn();
    expect(events.slice(0, 2).map(({ kind }) => kind)).toEqual(["connected", "items received"]);
    expect(events[1]).toMatchObject({ isWholeList: true, items: [...SNAPSHOT.received] });
  });

  test("says what the room has to say after the login", async () => {
    const { events } = await loggedIn();
    await until(() => events.some(({ kind }) => kind === "hint"));
    const kinds = new Set(events.map(({ kind }) => kind));
    expect(kinds).toEqual(new Set(["connected", "items received", "join", "chat", "hint"]));
  });

  test("hints in the shape a real hint comes in", async () => {
    const { events } = await loggedIn();
    await until(() => events.some(({ kind }) => kind === "hint"));
    expect(events.find(({ kind }) => kind === "hint")).toMatchObject({
      item: SNAPSHOT.hint,
      receiving: DEMO_PLAYER.player,
      found: false,
    });
  });

  test("sends what the slot says back, once it's logged in", async () => {
    const { events, live } = await loggedIn();
    await until(() => events.some(({ kind }) => kind === "hint"));
    live.say("hello");
    await until(() => events.some((event) => event.kind === "chat" && event.message === "hello"));
    expect(events.at(-1)).toMatchObject({ kind: "chat", slot: DEMO_PLAYER.player });
  });

  test("answers a hint asked for, as a live room does", async () => {
    const { events, live } = await loggedIn();
    await until(() => events.some(({ kind }) => kind === "hint"));
    const before = events.length;
    live.say("!hint Rusty Key");
    await until(() => events.length >= before + 2);
    expect(events.slice(before).map(({ kind }) => kind)).toEqual(["chat", "hint"]);
  });

  test("tells whoever's listening when it's closed", async () => {
    const socket = await open();
    let isClosed = false;
    socket.onClosed(() => {
      isClosed = true;
    });
    socket.close();
    expect(isClosed).toBe(true);
  });

  test("is found by looking the room up, with the web API's stand-in", async () => {
    const result = await lookUp(
      { kind: "room", room: "demo" },
      { fetcher: demoFetcher(), opener: demoOpener() }
    );
    expect(result).toMatchObject({
      kind: "found",
      found: {
        kind: "room",
        needsPassword: false,
        slots: [
          { team: 0, player: 1, name: DEMO_SLOT, game: ELDEN_RING, isEldenRing: true },
          ...OTHER_PLAYERS.map(({ player, name, game }) => ({
            team: 0,
            player,
            name,
            game,
            isEldenRing: false,
          })),
        ],
      },
    });
  });
});
