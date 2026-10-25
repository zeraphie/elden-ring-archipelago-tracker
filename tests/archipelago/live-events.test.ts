import { describe, expect, test } from "bun:test";
import { eventOf, receiveItems } from "../../src/archipelago/live-events.js";
import type { ServerPacket } from "../../src/archipelago/room-socket.js";
import fixture from "../fixtures/live-packets.json";

const MESSAGES = fixture.messages as unknown as { during: string; message: ServerPacket[] }[];
const PACKETS = MESSAGES.flatMap(({ message }) => message);
const PRINTED = PACKETS.filter((packet) => packet.cmd === "PrintJSON");

// The first recorded PrintJSON of a type.
const printed = (type: string | undefined): ServerPacket => {
  const found = PRINTED.find((packet) => packet.type === type);
  if (found === undefined) {
    throw new Error(`The recording has no PrintJSON of type ${type}`);
  }
  return found;
};

describe("eventOf, on a recorded session", () => {
  test("every PrintJSON becomes an event, none dropped", () => {
    expect(PRINTED.map(eventOf).filter((event) => event === undefined)).toEqual([]);
  });

  test("a check's ItemSend is an item sent, its item without the class tag", () => {
    expect(eventOf(printed("ItemSend"))).toMatchObject({
      kind: "item sent",
      item: { item: 70961, location: 7000000, player: 1, flags: 0 },
      receiving: 1,
    });
    expect(eventOf(printed("ItemSend"))).not.toHaveProperty("item.class");
  });

  test("a hint keeps its item, whether it's found, and the hint status in its text", () => {
    const hint = eventOf(printed("Hint"));
    expect(hint).toMatchObject({
      kind: "hint",
      item: { item: 70630, location: 7003661, player: 1, flags: 1 },
      receiving: 1,
      found: false,
    });
    expect(hint && "parts" in hint ? hint.parts : []).toContainEqual(
      expect.objectContaining({ type: "hint_status", hint_status: 30 })
    );
  });

  test("a chat line keeps who said it and what, apart from its text", () => {
    expect(eventOf(printed("Chat"))).toMatchObject({
      kind: "chat",
      team: 0,
      slot: 1,
      message: "hello from the tracker",
    });
  });

  test("a join keeps the client's tags, and a goal its slot", () => {
    expect(eventOf(printed("Join"))).toMatchObject({ kind: "join", slot: 1, tags: ["Tracker"] });
    expect(eventOf(printed("Goal"))).toMatchObject({ kind: "goal", team: 0, slot: 1 });
  });

  test("a release keeps the slot whose items went", () => {
    expect(eventOf(printed("Release"))).toMatchObject({ kind: "release", team: 0 });
    expect(eventOf(printed("Release"))).toHaveProperty("slot");
  });

  test("a command's answer is a command result", () => {
    expect(eventOf(printed("CommandResult"))?.kind).toBe("command result");
  });

  test("anything else keeps its type and text, a message with no type included", () => {
    for (const type of ["Tutorial", "Collect", "Part", undefined]) {
      expect(eventOf(printed(type))).toMatchObject({ kind: "message", type });
    }
  });

  test("a typed message missing what it needs is read as a message", () => {
    expect(eventOf({ cmd: "PrintJSON", type: "ItemSend", data: [{ text: "?" }] })).toEqual({
      kind: "message",
      type: "ItemSend",
      parts: [{ text: "?" }],
    });
  });

  test("a packet that isn't PrintJSON isn't an event here", () => {
    expect(eventOf({ cmd: "RoomUpdate", hint_points: 0 })).toBeUndefined();
  });
});

describe("receiveItems", () => {
  const item = (n: number) => ({ item: n, location: n, player: 1, flags: 0 });

  test("the recorded ReceivedItems follow on from each other, none missed", () => {
    let held: readonly ReturnType<typeof item>[] = [];
    for (const packet of PACKETS.filter((each) => each.cmd === "ReceivedItems")) {
      const after = receiveItems(
        held,
        Number(packet.index),
        packet.items as ReturnType<typeof item>[]
      );
      expect(after.missed).toBe(false);
      held = after.held;
    }
    expect(held.length).toBe(1 + 1 + 3);
  });

  test("index 0 is the whole list, and replaces what was held, adding what's new", () => {
    const after = receiveItems([item(1)], 0, [item(1), item(2), item(3)]);
    expect(after).toEqual({
      held: [item(1), item(2), item(3)],
      added: [item(2), item(3)],
      missed: false,
    });
  });

  test("an index where the held list ends adds to it", () => {
    expect(receiveItems([item(1)], 1, [item(2)])).toEqual({
      held: [item(1), item(2)],
      added: [item(2)],
      missed: false,
    });
  });

  test("an index past the end, or before it, means one was missed", () => {
    expect(receiveItems([item(1)], 3, [item(4)])).toEqual({
      held: [item(1)],
      added: [],
      missed: true,
    });
    expect(receiveItems([item(1), item(2)], 1, [item(2)]).missed).toBe(true);
  });
});
