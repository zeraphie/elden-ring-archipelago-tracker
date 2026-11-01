import { describe, expect, test } from "bun:test";
import { ELDEN_RING } from "../../src/archipelago/look-up.js";
import * as data from "../../src/data/elden-ring.js";
import { OTHER_PLAYERS } from "../../src/demo/players.js";
import {
  demoItemNames,
  demoLocationNames,
  demoSlotData,
  DEMO_PLAYER,
} from "../../src/demo/room.js";
import { demoSnapshot } from "../../src/demo/snapshot.js";
import { goalMenuOf } from "../../src/state/utils/goal.js";
import { keyChecksFrom } from "../../src/state/utils/key-checks.js";
import { regionsOf } from "../../src/state/utils/regions.js";

const { checked, received, sent, hint } = demoSnapshot();
const NAMES = demoLocationNames();
const ITEMS = demoItemNames();
const SLOT_DATA = demoSlotData();
const KEY_CHECKS = keyChecksFrom(data, SLOT_DATA, NAMES);

const inputs = {
  slotData: SLOT_DATA,
  packages: new Map([[ELDEN_RING, { checksum: "demo", itemNames: ITEMS, locationNames: NAMES }]]),
  keyChecks: KEY_CHECKS,
  received: received.map((value) => ({ value })),
  checked,
  sent: [],
  roster: [],
  team: 0,
  slot: DEMO_PLAYER.player,
};
const REGIONS = [...(regionsOf(data, inputs) ?? [])];

describe("the demo's snapshot", () => {
  test("is partway through the run, with key checks made and left", () => {
    const made = checked.filter((id) => KEY_CHECKS?.has(id));
    expect(made.length).toBeGreaterThan(0);
    expect(made.length).toBeLessThan(KEY_CHECKS?.size ?? 0);
  });

  test("has more checks made than key checks", () => {
    expect(checked.length).toBeGreaterThan(checked.filter((id) => KEY_CHECKS?.has(id)).length);
  });

  test("makes each check once, and only the room's own", () => {
    expect(new Set(checked).size).toBe(checked.length);
    expect(checked.every((id) => NAMES.has(id))).toBe(true);
  });

  test("leaves regions in each state", () => {
    const states = new Set(REGIONS.map(([, { state }]) => state));
    expect(states).toEqual(new Set(["locked", "open", "done"]));
  });

  test("has met part of the goal and left the rest", () => {
    const menu = goalMenuOf(data, inputs);
    expect(menu?.met.length).toBeGreaterThan(0);
    expect(menu?.needed.length).toBeGreaterThan(0);
  });

  test("names every item the slot holds", () => {
    expect(received.every(({ item }) => ITEMS.has(item))).toBe(true);
  });

  test("gives each check made at most one item", () => {
    const places = [
      ...received.filter(({ player }) => player === DEMO_PLAYER.player),
      ...sent.map(({ item }) => item),
    ].map(({ location }) => location);
    expect(new Set(places).size).toBe(places.length);
    expect(places.every((id) => checked.includes(id))).toBe(true);
  });

  test("has items from each of the others, at places their games name", () => {
    for (const { player, locations } of OTHER_PLAYERS) {
      const theirs = received.filter((item) => item.player === player);
      expect(theirs.length).toBeGreaterThan(0);
      expect(theirs.every(({ location }) => location >= 1 && location <= locations.length)).toBe(
        true
      );
    }
  });

  test("has items for each of the others, that their games name", () => {
    for (const { player, items } of OTHER_PLAYERS) {
      const theirs = sent.filter(({ receiving }) => receiving === player);
      expect(theirs.length).toBeGreaterThan(0);
      expect(theirs.every(({ item }) => item.item >= 1 && item.item <= items.length)).toBe(true);
    }
  });

  test("hints at a key check still to make", () => {
    expect(ITEMS.has(hint.item)).toBe(true);
    expect(KEY_CHECKS?.has(hint.location)).toBe(true);
    expect(checked).not.toContain(hint.location);
  });

  test("is the same run each time it's asked for", () => {
    expect(demoSnapshot()).toBe(demoSnapshot());
  });
});
