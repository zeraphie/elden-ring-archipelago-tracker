import { describe, expect, test } from "bun:test";
import { ELDEN_RING } from "../../../src/archipelago/look-up.js";
import * as data from "../../../src/data/elden-ring.js";
import { demoItemNames, demoLocationNames, demoSlotData } from "../../../src/demo/room.js";
import { demoSnapshot } from "../../../src/demo/snapshot.js";
import { goalMenuOf } from "../../../src/state/utils/goal.js";
import { hintItemsOf } from "../../../src/state/utils/hint-items.js";

const ITEMS = demoItemNames();
const { checked, received } = demoSnapshot();

// The demo's room, partway, with these items received in place of its own.
const room = (held = received.map((value) => ({ value }))) => ({
  slotData: demoSlotData(),
  packages: new Map([
    [ELDEN_RING, { checksum: "demo", itemNames: ITEMS, locationNames: demoLocationNames() }],
  ]),
  received: held,
  checked,
});
const held = (name: string) => {
  const [item = 0] = [...ITEMS].find(([, each]) => each === name) ?? [];
  return { value: { item, location: 0, player: 2, flags: 1 } };
};

describe("hintItemsOf", () => {
  test("starts with what the goal still waits on", () => {
    const inputs = room();
    const goal = data.goalItems(goalMenuOf(data, inputs) ?? { needed: [], met: [], bosses: [] });
    const items = hintItemsOf(data, inputs);
    expect(goal.length).toBeGreaterThan(0);
    expect(items[0]).toBe(goal[0] ?? "");
  });

  test("offers the key items the room's rules ask for", () => {
    expect(hintItemsOf(data, room())).toContain("Mohgwyn Lock");
  });

  test("leaves out what's already held", () => {
    const items = hintItemsOf(data, room([held("Mt. Gelmir Lock")]));
    expect(items).not.toContain("Mt. Gelmir Lock");
  });

  test("leaves out what the room's package doesn't name", () => {
    const names = new Set(ITEMS.values());
    expect(hintItemsOf(data, room()).every((name) => names.has(name))).toBe(true);
  });

  test("names each item once", () => {
    const items = hintItemsOf(data, room());
    expect(new Set(items).size).toBe(items.length);
  });

  test("offers no ordinary item", () => {
    expect(hintItemsOf(data, room())).not.toContain("Torch");
  });

  test("offers nothing until the room can be read", () => {
    expect(hintItemsOf(data, { ...room(), slotData: undefined })).toEqual([]);
  });

  test("gives the same list back for the same room", () => {
    const inputs = room();
    expect(hintItemsOf(data, inputs)).toBe(hintItemsOf(data, inputs));
  });
});
