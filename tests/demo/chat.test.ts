import { describe, expect, test } from "bun:test";
import { eventOf } from "../../src/archipelago/live-events.js";
import type { ServerPacket } from "../../src/archipelago/room-socket.js";
import { answersTo, openingLines } from "../../src/demo/chat.js";
import { demoItemNames, DEMO_PLAYER } from "../../src/demo/room.js";
import { demoSnapshot } from "../../src/demo/snapshot.js";

const SNAPSHOT = demoSnapshot();
const ITEMS = demoItemNames();
// The events a list of packets reads as.
const read = (packets: readonly unknown[]) => packets.map((each) => eventOf(each as ServerPacket));
const kinds = (packets: readonly unknown[]) => read(packets).map((event) => event?.kind);

describe("openingLines", () => {
  test("has the others join and talk, and the slot's hint, oldest first", () => {
    expect(kinds(openingLines(SNAPSHOT))).toEqual(["join", "join", "chat", "chat", "chat", "hint"]);
  });

  test("has the slot's own line read as a command", () => {
    const own = read(openingLines(SNAPSHOT)).find(
      (event) => event?.kind === "chat" && event.slot === DEMO_PLAYER.player
    );
    expect(own).toMatchObject({ message: expect.stringMatching(/^!hint /) });
  });
});

describe("answersTo", () => {
  test("sends a chat line back as the slot's own", () => {
    expect(read(answersTo("hello", SNAPSHOT))).toMatchObject([
      { kind: "chat", slot: DEMO_PLAYER.player, message: "hello" },
    ]);
  });

  test("sends a command back, then its answer", () => {
    expect(kinds(answersTo("!hint Rusty Key", SNAPSHOT))).toEqual(["chat", "hint"]);
  });

  test("hints at a key check left, for an item of the room's", () => {
    const [, hint] = read(answersTo("!hint Rusty Key", SNAPSHOT));
    const [item] = [...ITEMS].find(([, name]) => name === "Rusty Key") ?? [];
    expect(hint).toMatchObject({ kind: "hint", found: false, item: { item } });
    expect(hint?.kind === "hint" && SNAPSHOT.keyChecksLeft.includes(hint.item.location)).toBe(true);
  });

  test("takes an item's name in any case", () => {
    expect(kinds(answersTo("!HINT rusty key", SNAPSHOT))).toEqual(["chat", "hint"]);
  });

  test("names different places for different items", () => {
    const place = (name: string) => {
      const [, hint] = read(answersTo(`!hint ${name}`, SNAPSHOT));
      return hint?.kind === "hint" ? hint.item.location : undefined;
    };
    expect(place("Rusty Key")).not.toBe(place("Rold Medallion"));
  });

  test("says why for an item the room doesn't have", () => {
    expect(kinds(answersTo("!hint Moon Pearl", SNAPSHOT))).toEqual(["chat", "command result"]);
  });

  test("says why for a hint with no item", () => {
    expect(kinds(answersTo("!hint", SNAPSHOT))).toEqual(["chat", "command result"]);
  });

  test("says why for any other command", () => {
    expect(kinds(answersTo("!release", SNAPSHOT))).toEqual(["chat", "command result"]);
  });
});
