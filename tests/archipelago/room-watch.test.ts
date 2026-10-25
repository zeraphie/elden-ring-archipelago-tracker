import { describe, expect, test } from "bun:test";
import type { LiveEvent } from "../../src/archipelago/live-events.js";
import { RoomSocket, type SocketOpener } from "../../src/archipelago/room-socket.js";
import { RoomWatch, type RoomPhase } from "../../src/archipelago/room-watch.js";
import type { Fetcher } from "../../src/archipelago/web-api.js";
import { roomInfo, TestSocket, testRoom, TRACKER_VERSION } from "../fixtures/sockets.js";
import webApi from "../fixtures/web-api.json";
import { settle } from "../fixtures/waits.js";

const ROOM = "q3Xh8sJm2PzK0tLw9RbVcA";
const NOW = Date.parse("Thu, 22 Oct 2026 21:00:00 GMT");
// room_status as recorded, last active at this time and listening on this port.
const status = (lastActivity: string, port = 61475) => ({
  ...webApi.room_status,
  last_activity: lastActivity,
  last_port: port,
});
// 21 minutes before NOW, inside the room's two-hour timeout.
const AWAKE = status("Thu, 22 Oct 2026 20:39:03 GMT");
// Four hours before NOW.
const ASLEEP = status("Thu, 22 Oct 2026 17:00:00 GMT");
const NOT_FOUND = 404;

// A watch whose room_status answers come in this order, with its sockets, waits, phases and events open to look at.
function watching(...answers: unknown[]) {
  const asked: string[] = [];
  const fetcher: Fetcher = (url) => {
    asked.push(url);
    const next = answers.shift();
    if (next instanceof Error) {
      return Promise.reject(next);
    }
    return Promise.resolve(
      next === NOT_FOUND ? new Response("", { status: 404 }) : new Response(JSON.stringify(next))
    );
  };
  const sockets: { url: string; socket: TestSocket }[] = [];
  const opener: SocketOpener = (url) => {
    const socket = new TestSocket();
    sockets.push({ url, socket });
    return socket;
  };
  const waits: { run: () => void; ms: number }[] = [];
  const phases: RoomPhase[] = [];
  const events: LiveEvent[] = [];
  const watch = new RoomWatch({
    room: ROOM,
    slot: "Tarnished",
    version: TRACKER_VERSION,
    fetcher,
    opener,
    timer: (run, ms) => waits.push({ run, ms }),
    now: () => NOW,
    onPhase: (phase) => phases.push(phase),
    onEvent: (event) => events.push(event),
  });
  return { asked, sockets, waits, phases, events, watch };
}

// The server's side of opening and logging in on the newest socket.
async function logIn(sockets: { socket: TestSocket }[]): Promise<void> {
  const socket = sockets.at(-1)?.socket;
  socket?.serve(roomInfo(false));
  await settle();
  socket?.serve({ cmd: "Connected", team: 0, slot: 1, players: [] });
  await settle();
}

const kinds = (phases: RoomPhase[]) => phases.map(({ phase }) => phase);

describe("RoomWatch", () => {
  test("an awake room is logged into on its port", async () => {
    const run = watching(AWAKE);
    run.watch.start();
    await settle();
    expect(run.sockets.map(({ url }) => url)).toEqual(["wss://archipelago.gg:61475"]);
    await logIn(run.sockets);
    expect(kinds(run.phases)).toEqual(["looking", "connecting", "connected"]);
    expect(run.events.map(({ kind }) => kind)).toEqual(["connected"]);
  });

  test("logs in on a socket already open, without asking the room's status", async () => {
    const room = testRoom();
    const socket = await RoomSocket.open("wss://archipelago.gg:61475", room.opener);
    const asked: string[] = [];
    const phases: RoomPhase[] = [];
    const watch = new RoomWatch({
      room: ROOM,
      slot: "Tarnished",
      version: TRACKER_VERSION,
      opened: { socket, port: 61475 },
      fetcher: (url) => {
        asked.push(url);
        return Promise.reject(new TypeError("not asked"));
      },
      opener: room.opener,
      onPhase: (phase) => phases.push(phase),
      onEvent: () => undefined,
    });
    watch.start();
    await settle();
    expect(phases).toEqual([
      { phase: "connecting", port: 61475 },
      { phase: "connected", port: 61475 },
    ]);
    expect(asked).toEqual([]);
    expect(room.sockets.length).toBe(1);
  });

  test("an asleep room is left asleep with its page, asked again later, and never woken", async () => {
    const run = watching(ASLEEP);
    run.watch.start();
    await settle();
    expect(run.phases).toEqual([
      { phase: "looking" },
      {
        phase: "asleep",
        since: Date.parse("Thu, 22 Oct 2026 17:00:00 GMT"),
        page: `https://archipelago.gg/room/${ROOM}`,
      },
    ]);
    expect(run.sockets).toEqual([]);
    expect(run.asked).toEqual([`https://archipelago.gg/api/room_status/${ROOM}`]);
    expect(run.waits.map(({ ms }) => ms)).toEqual([30_000]);
  });

  test("once woken, it logs in on the port the room has now", async () => {
    const run = watching(ASLEEP, status("Thu, 22 Oct 2026 20:59:00 GMT", 50_000));
    run.watch.start();
    await settle();
    run.waits.shift()?.run();
    await settle();
    expect(run.sockets.map(({ url }) => url)).toEqual(["wss://archipelago.gg:50000"]);
    await logIn(run.sockets);
    expect(run.phases.at(-1)).toEqual({ phase: "connected", port: 50_000 });
  });

  test("a socket that closes sends it back to the room's status", async () => {
    const run = watching(AWAKE, ASLEEP);
    run.watch.start();
    await settle();
    await logIn(run.sockets);
    run.sockets[0]?.socket.close();
    expect(run.waits.map(({ ms }) => ms)).toEqual([1_000]);
    run.waits.shift()?.run();
    await settle();
    expect(kinds(run.phases).slice(-2)).toEqual(["looking", "asleep"]);
  });

  test("a room archipelago.gg no longer has is gone, and nothing more is asked", async () => {
    const run = watching(NOT_FOUND);
    run.watch.start();
    await settle();
    expect(kinds(run.phases)).toEqual(["looking", "gone"]);
    expect(run.waits).toEqual([]);
  });

  test("no answer from archipelago.gg is unreachable, and asked again shortly", async () => {
    const run = watching(new TypeError("Failed to fetch"));
    run.watch.start();
    await settle();
    expect(kinds(run.phases)).toEqual(["looking", "unreachable"]);
    expect(run.waits.map(({ ms }) => ms)).toEqual([15_000]);
  });

  test("a socket that won't open is unreachable, and asked again shortly", async () => {
    const run = watching(AWAKE);
    run.watch.start();
    await settle();
    run.sockets[0]?.socket.emit("error");
    await settle();
    expect(kinds(run.phases)).toEqual(["looking", "connecting", "unreachable"]);
    expect(run.waits.map(({ ms }) => ms)).toEqual([15_000]);
  });

  test("a wrong password is refused, and ends the watch", async () => {
    const run = watching(AWAKE);
    run.watch.start();
    await settle();
    const socket = run.sockets[0]?.socket;
    socket?.serve(roomInfo(true));
    await settle();
    socket?.serve({ cmd: "ConnectionRefused", errors: ["InvalidPassword"] });
    await settle();
    expect(run.phases.at(-1)).toMatchObject({
      phase: "refused",
      error: { problem: "invalid password" },
    });
    run.waits.splice(0).forEach(({ run: again }) => again());
    await settle();
    expect(kinds(run.phases).at(-1)).toBe("refused");
    expect(run.asked.length).toBe(1);
  });

  test("once stopped, it says nothing more and closes its socket", async () => {
    const run = watching(AWAKE, AWAKE);
    run.watch.start();
    await settle();
    await logIn(run.sockets);
    run.watch.stop();
    run.waits.splice(0).forEach(({ run: again }) => again());
    await settle();
    expect(kinds(run.phases)).toEqual(["looking", "connecting", "connected"]);
    expect(run.asked.length).toBe(1);
  });

  test("says chat and commands through the room while connected", async () => {
    const run = watching(AWAKE);
    run.watch.start();
    await settle();
    await logIn(run.sockets);
    run.watch.say("!hint Rusty Key");
    expect(run.sockets[0]?.socket.sent.at(-1)).toEqual({ cmd: "Say", text: "!hint Rusty Key" });
  });
});
