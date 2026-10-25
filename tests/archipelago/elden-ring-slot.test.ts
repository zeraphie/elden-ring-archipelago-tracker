import { describe, expect, test } from "bun:test";
import {
  readKeyCheckSlotData,
  readMapSlotData,
  readRulesSlotData,
  readSlotVersions,
} from "../../src/archipelago/elden-ring-slot.js";
import { PRESETS } from "../fixtures/presets.js";
import { SEEDS, seed, slotOf } from "../fixtures/seeds.js";
import webApi from "../fixtures/web-api.json";

// A seed's slot_data as it arrives: JSON, untyped.
const arriving = (label: string) =>
  JSON.parse(JSON.stringify(slotOf(seed(label)))) as Record<string, unknown>;

// A preset's options as slot_data carries them, with a goal.
const rulesSlot = (label: string, extra: Record<string, unknown> = {}) => ({
  options: (PRESETS as Record<string, Record<string, unknown>>)[label],
  goal: [11000850, 11000800],
  ...extra,
});

describe("readKeyCheckSlotData", () => {
  test.each(SEEDS.map(({ label }) => [label]))("%s: reads back whole", (label) => {
    expect(readKeyCheckSlotData(arriving(label))).toEqual(slotOf(seed(label)));
  });

  test("slot_data without the options key checks read is nothing", () => {
    expect(readKeyCheckSlotData(webApi.slot_data_tracker[0]?.slot_data ?? {})).toBeUndefined();
  });

  test("a field in the wrong shape is nothing, rather than a wrong answer", () => {
    const slot = arriving("Izzy's preset");
    const options = slot.options as Record<string, unknown>;
    expect(readKeyCheckSlotData({ ...slot, options: { ...options, world_logic: "0" } })).toBe(
      undefined
    );
    expect(readKeyCheckSlotData({ ...slot, locationIdsToName: { 1: 7 } })).toBeUndefined();
    expect(readKeyCheckSlotData({ ...slot, duplicatedLocations: [] })).toBeUndefined();
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
  const names = { 7000000: "LG/(SG): Finger Severer - beside grace" };
  const keys = { 7000000: "604038,0:0000000000::" };

  test("each check's key and name, by id", () => {
    expect(readMapSlotData({ locationIdsToKeys: keys, locationIdsToName: names })).toEqual({
      locationIdsToKeys: keys,
      locationIdsToName: names,
    });
  });

  test("without its keys, or with a key that isn't text, is nothing", () => {
    expect(readMapSlotData({ locationIdsToName: names })).toBeUndefined();
    expect(readMapSlotData({ locationIdsToKeys: { 7000000: 1 }, locationIdsToName: names })).toBe(
      undefined
    );
  });
});

describe("readSlotVersions", () => {
  test("is the apworld range a slot_data says made it, and nothing for slot_data without one", () => {
    expect(readSlotVersions({ versions: ">=0.1 <0.2" })).toBe(">=0.1 <0.2");
    expect(readSlotVersions({ versions: 1 })).toBeUndefined();
    expect(readSlotVersions({})).toBeUndefined();
  });
});
