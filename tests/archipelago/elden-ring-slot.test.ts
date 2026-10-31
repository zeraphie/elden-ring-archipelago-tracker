import { describe, expect, test } from "bun:test";
import {
  readCheckNames,
  readKeyCheckSlotData,
  readMapSlotData,
  readRulesSlotData,
} from "../../src/archipelago/elden-ring-slot.js";
import { PRESETS } from "../fixtures/presets.js";
import { arrivingSlot, LOCATION_NAMES, SEEDS, seed, slotOf } from "../fixtures/seeds.js";
import webApi from "../fixtures/web-api.json";

// A seed's slot_data as it arrives: JSON, untyped.
const arriving = (label: string) =>
  JSON.parse(JSON.stringify(arrivingSlot(seed(label)))) as Record<string, unknown>;

// A preset's options as slot_data carries them, with a goal.
const rulesSlot = (label: string, extra: Record<string, unknown> = {}) => ({
  options: (PRESETS as Record<string, Record<string, unknown>>)[label],
  goal: [11000850, 11000800],
  ...extra,
});

describe("readCheckNames", () => {
  test("names each check in the room by the data package, and only those", () => {
    const names = new Map([
      [1, "LG/A: In the room - here"],
      [2, "LG/A: Not in the room - there"],
    ]);
    expect(readCheckNames({ locationIdsToKeys: { 1: "604038,0:1::" } }, names)).toEqual({
      1: "LG/A: In the room - here",
    });
  });

  test("leaves out a check the data package doesn't name", () => {
    expect(readCheckNames({ locationIdsToKeys: { 9: "604038,0:1::" } }, new Map())).toEqual({});
  });

  test("is nothing without its keys, or with a key that isn't text", () => {
    expect(readCheckNames({}, LOCATION_NAMES)).toBeUndefined();
    expect(readCheckNames({ locationIdsToKeys: { 1: 7 } }, LOCATION_NAMES)).toBeUndefined();
  });
});

describe("readKeyCheckSlotData", () => {
  test.each(SEEDS.map(({ label }) => [label]))("%s: reads back whole", (label) => {
    expect(readKeyCheckSlotData(arriving(label), LOCATION_NAMES)).toEqual(slotOf(seed(label)));
  });

  test("slot_data without the options key checks read is nothing", () => {
    expect(
      readKeyCheckSlotData(webApi.slot_data_tracker[0]?.slot_data ?? {}, LOCATION_NAMES)
    ).toBeUndefined();
  });

  test("a field in the wrong shape is nothing, rather than a wrong answer", () => {
    const slot = arriving("Izzy's preset");
    const options = slot.options as Record<string, unknown>;
    expect(
      readKeyCheckSlotData({ ...slot, options: { ...options, world_logic: "0" } }, LOCATION_NAMES)
    ).toBeUndefined();
    expect(
      readKeyCheckSlotData({ ...slot, locationIdsToKeys: { 1: 7 } }, LOCATION_NAMES)
    ).toBeUndefined();
    expect(
      readKeyCheckSlotData({ ...slot, duplicatedLocations: [] }, LOCATION_NAMES)
    ).toBeUndefined();
  });
});

describe("readRulesSlotData", () => {
  test.each(Object.keys(PRESETS).map((label) => [label]))(
    "%s: the options, the goal, and no bosses forced",
    (label) => {
      const read = readRulesSlotData(rulesSlot(label));
      expect(read?.options).toEqual(rulesSlot(label).options as never);
      expect(read?.goal).toEqual([11000850, 11000800]);
      expect(read?.forced).toEqual({});
    }
  );

  test("forceBosses is read as it comes", () => {
    const forced = { 14000850: 16000800 };
    expect(readRulesSlotData(rulesSlot("Izzy's preset", { forceBosses: forced }))?.forced).toEqual(
      forced
    );
  });

  test("an option missing or in the wrong shape, a goal that isn't flags, or forceBosses that isn't ids, is nothing", () => {
    const { options } = rulesSlot("Izzy's preset");
    const without = { ...options } as Record<string, unknown>;
    delete without.great_runes_required_leyndell;
    expect(readRulesSlotData({ ...rulesSlot("Izzy's preset"), options: without })).toBeUndefined();
    expect(
      readRulesSlotData({
        ...rulesSlot("Izzy's preset"),
        options: { ...options, soft_logic: "on" },
      })
    ).toBeUndefined();
    expect(
      readRulesSlotData({
        ...rulesSlot("Izzy's preset"),
        options: { ...options, key_item_shards: { RustyKeyShards: { Req: 1 } } },
      })
    ).toBeUndefined();
    expect(readRulesSlotData(rulesSlot("Izzy's preset", { goal: ["Godfrey"] }))).toBeUndefined();
    expect(readRulesSlotData(rulesSlot("Izzy's preset", { forceBosses: { 1: "x" } }))).toBe(
      undefined
    );
  });
});

describe("readMapSlotData", () => {
  const names = new Map([[7000000, "LG/(SGr): Finger Severer - beside grace"]]);
  const keys = { 7000000: "604038,0:0000000000::" };

  test("each check's key and name, by id", () => {
    expect(readMapSlotData({ locationIdsToKeys: keys }, names)).toEqual({
      locationIdsToKeys: keys,
      locationIdsToName: { 7000000: "LG/(SGr): Finger Severer - beside grace" },
    });
  });

  test("without its keys, or with a key that isn't text, is nothing", () => {
    expect(readMapSlotData({}, names)).toBeUndefined();
    expect(readMapSlotData({ locationIdsToKeys: { 7000000: 1 } }, names)).toBeUndefined();
  });
});
