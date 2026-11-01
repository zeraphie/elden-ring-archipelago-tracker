import { describe, expect, test } from "bun:test";
import { ELDEN_RING } from "../../src/archipelago/look-up.js";
import * as data from "../../src/data/elden-ring.js";
import { withoutExtra } from "../../src/data/names/location-name.js";
import { demoLocationNames, demoSlotData, DEMO_SLOT } from "../../src/demo/room.js";
import { goalMenuOf } from "../../src/state/utils/goal.js";
import { keyChecksFrom } from "../../src/state/utils/key-checks.js";
import { mapOf } from "../../src/state/utils/map.js";
import { regionsOf } from "../../src/state/utils/regions.js";
import webApi from "../fixtures/web-api.json";

const NAMES = demoLocationNames();
const SLOT_DATA = demoSlotData();
const KEYS = SLOT_DATA["locationIdsToKeys"] as Record<string, string>;
const COPIES = SLOT_DATA["duplicatedLocations"] as Record<string, string>;
const KEY_CHECKS = keyChecksFrom(data, SLOT_DATA, NAMES);

// The store's inputs for the room as it would open, with nothing made yet.
const inputs = {
  slotData: SLOT_DATA,
  packages: new Map([
    [ELDEN_RING, { checksum: "demo", itemNames: new Map(), locationNames: NAMES }],
  ]),
  keyChecks: KEY_CHECKS,
  received: [],
  checked: [],
  sent: [],
  roster: [],
  team: 0,
  slot: 1,
};

describe("the demo room", () => {
  test("names every check in its slot_data", () => {
    const ids = Object.keys(KEYS).map(Number);
    expect(ids).toHaveLength(3766);
    expect(ids.every((id) => NAMES.has(id))).toBe(true);
  });

  test("numbers its checks as the recorded data package does", () => {
    const recorded = Object.entries(webApi.datapackage.location_name_to_id).filter(([, id]) =>
      NAMES.has(id)
    );
    expect(recorded.length).toBeGreaterThan(0);
    for (const [name, id] of recorded) {
      expect(NAMES.get(id)).toBe(name);
    }
  });

  test("lists each copy with the spot it copies", () => {
    const copies = [...NAMES.entries()].filter(([id]) => id >= 8000000);
    expect(copies.length).toBeGreaterThan(0);
    for (const [, name] of copies) {
      expect(COPIES[name]).toBe(withoutExtra(name).base);
    }
  });

  test("takes its options as the rules and the key checks read them", () => {
    expect(KEY_CHECKS?.size).toBe(166);
    expect([...(regionsOf(data, inputs) ?? [])]).toHaveLength(58);
  });

  test("has the goal of the seed it came from", () => {
    const menu = goalMenuOf(data, inputs);
    expect(menu?.needed).toHaveLength(4);
    expect(menu?.bosses).toHaveLength(2);
  });

  test("places its checks on both sheets", () => {
    const tiles = (sheet: "surface" | "dlc") =>
      mapOf(data, inputs)
        ?.sheets.get(sheet)
        ?.regions.reduce((all, { tiles: held }) => all + held.length, 0);
    expect(tiles("surface")).toBe(219);
    expect(tiles("dlc")).toBe(87);
  });

  test("goes by a made-up slot, not the seed's", () => {
    expect(SLOT_DATA["slot"]).toBe(DEMO_SLOT);
  });
});
