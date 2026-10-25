import { describe, expect, test } from "bun:test";
import type { LiveEvent } from "../../src/archipelago/live-events.js";
import { LiveRoom } from "../../src/archipelago/live-room.js";
import { RoomSocket } from "../../src/archipelago/room-socket.js";
import fixture from "../fixtures/live-packets.json";
import { roomInfo, TestSocket, TRACKER_VERSION } from "../fixtures/sockets.js";

const item = (n: number) => ({ item: n, location: -2, player: 0, flags: 0, class: "NetworkItem" });

// A live room on a test socket, listening before it logs in, with the events it hands on.
async function live() {
  const socket = new TestSocket();
  const opening = RoomSocket.open("wss://archipelago.gg:61475", () => socket);
  socket.serve(roomInfo(false));
  const room = await opening;
  const events: LiveEvent[] = [];
  const liveRoom = new LiveRoom(room, (event) => events.push(event));
  return { socket, room, liveRoom, events };
}

describe("LiveRoom", () => {
  test("hears the items sent in the same message as Connected, with RoomInfo's hint price, release permission and version", async () => {
    const { socket, room, events } = await live();
    const login = room.logIn("Tarnished", TRACKER_VERSION);
    socket.serve(
      { cmd: "Connected", team: 0, slot: 1 },
      { cmd: "ReceivedItems", index: 0, items: [item(1)] }
    );
    await login;
    expect(events.map((event) => event.kind)).toEqual(["connected", "items received"]);
    expect(events[0]).toMatchObject({
      hintPercent: 10,
      releasePermission: 2,
      serverVersion: { major: 0, minor: 6, build: 8 },
    });
    expect(events[1]).toMatchObject({ items: [{ item: 1, location: -2, player: 0, flags: 0 }] });
  });

  test("asks for a Sync when an item is missed, and takes the whole list it gets back", async () => {
    const { socket, events } = await live();
    socket.serve({ cmd: "ReceivedItems", index: 0, items: [item(1)] });
    socket.serve({ cmd: "ReceivedItems", index: 2, items: [item(3)] });
    expect(socket.sent).toEqual([{ cmd: "Sync" }]);
    socket.serve({ cmd: "ReceivedItems", index: 0, items: [item(1), item(2), item(3)] });
    expect(events.at(-1)).toMatchObject({
      kind: "items received",
      added: [{ item: 2 }, { item: 3 }],
    });
  });

  test("hands on room updates and printed messages as events", async () => {
    const { socket, events } = await live();
    socket.serve({ cmd: "RoomUpdate", hint_points: 3 });
    socket.serve({ cmd: "PrintJSON", type: "Goal", team: 0, slot: 1, data: [{ text: "done" }] });
    expect(events).toMatchObject([
      { kind: "room update", update: { hint_points: 3 } },
      { kind: "goal", slot: 1 },
    ]);
  });

  test("says a chat line or a command as Say", async () => {
    const { socket, liveRoom } = await live();
    liveRoom.say("!hint Rusty Key");
    expect(socket.sent).toEqual([{ cmd: "Say", text: "!hint Rusty Key" }]);
  });

  test("the recorded session plays through with no Sync, every packet an event", async () => {
    const { socket, events } = await live();
    const messages = fixture.messages as unknown as { message: unknown[] }[];
    for (const { message } of messages) {
      socket.serve(...message);
    }
    expect(socket.sent).toEqual([]);
    expect(events.length).toBe(messages.flatMap(({ message }) => message).length);
    expect(events.filter((event) => event.kind === "items received").at(-1)).toMatchObject({
      items: { length: 5 },
    });
  });
});
