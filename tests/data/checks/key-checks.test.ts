import { describe, expect, test } from "bun:test";
import {
  excludedGroups,
  keyChecks,
  prioritySpots,
  type KeyCheckOptions,
} from "../../../src/data/checks/key-checks.js";
import type { LocationGroups } from "../../../src/data/checks/location-groups.js";
import { nameOf, SEEDS, seed, slotOf } from "../../fixtures/seeds.js";

describe("prioritySpots on generated seeds", () => {
  const generated = SEEDS.filter((each) => each.generatorPrinted !== null);

  test.each(generated.map((each) => [each.label, each]))(
    "%s: the generator's own priority set, less its names that aren't checks, plus any multiworld trim",
    (_, each) => {
      const expected = (each.generatorPrinted ?? 0) - each.notChecks + each.trimmed;
      expect(prioritySpots(slotOf(each)).size).toBe(expected);
    }
  );

  test.each(generated.map((each) => [each.label, each]))(
    "%s: every spot holding an important item is a key check",
    (_, each) => {
      const keys = keyChecks(slotOf(each));
      const outside = (each.important ?? []).filter((index) => !keys.has(index)).map(nameOf);
      expect(outside).toEqual([]);
    }
  );
});

describe("Izzy's live room", () => {
  const slot = slotOf(seed("Izzy's live room"));
  const spots = prioritySpots(slot);

  test("reads back the groups Izzy excluded", () => {
    const excluded = excludedGroups(slot.options);
    expect(["Dungeon", "Hidden", "Post Leyndell"].every((group) => excluded.has(group))).toBe(true);
    expect(excluded.has("DLC")).toBe(false);
  });

  test("an excluded side-dungeon boss drop isn't key, though slot_data's exclude list lost it", () => {
    expect(spots.has("AP/(AT): Somberstone Miner's Bell Bearing [2] - boss drop")).toBe(false);
  });

  test("holds the 158 chosen spots, the Gravesite Plain top-up and the 4 extra copies", () => {
    expect(spots.has("GP/TPC: Scadutree Fragment - by cross")).toBe(true);
    expect(spots.size).toBe(158 + 1 + 4);
  });

  test("adds the two spots its options leave the Crafting Kit and Physick Flask on", () => {
    expect(keyChecks(slot).size).toBe(spots.size + 2);
  });
});

// A handful of locations in the shape of the real groups.
const GROUPS: ReadonlyMap<string, LocationGroups> = new Map<string, LocationGroups>([
  ["LG/A: Seed - tree", { groups: [], region: "Limgrave" }],
  ["LG/CC: Cave Boss - boss drop", { groups: ["Dungeon"], region: "Limgrave" }],
  ["LG/CC: Cave Chest - chest", { groups: ["Dungeon"], region: "Limgrave" }],
  ["LG/CC: Cave Pot - pot", { groups: ["Dungeon"], region: "Limgrave" }],
  ["LL/A: Missable - quest", { groups: [], isMissable: true, region: "Liurnia of The Lakes" }],
  ["GP/TPC: Scadutree Fragment - by cross", { groups: ["DLC"], region: "Gravesite Plain" }],
  ["GP/B: DLC Boss - boss drop", { groups: ["DLC", "Dungeon"], region: "Gravesite Plain" }],
]);
const OPTIONS: KeyCheckOptions = {
  priority_location_groups: [],
  exclude_locations: [],
  world_logic: 0,
  enable_dlc: 0,
  dlc_start: 0,
  crafting_kit_option: 0,
  physick_flask_option: 0,
};
const roomOf = (...names: string[]): Record<string, string> =>
  Object.fromEntries(names.map((name, i) => [String(i + 1), name]));

describe("excludedGroups", () => {
  test("a group counts as excluded with at least half its members still listed", () => {
    const options = {
      ...OPTIONS,
      exclude_locations: ["LG/CC: Cave Chest - chest", "LG/CC: Cave Pot - pot"],
    };
    expect(excludedGroups(options, GROUPS)).toEqual(new Set(["Dungeon"]));
  });

  test("the DLC's members don't count while the DLC is off", () => {
    const options = { ...OPTIONS, exclude_locations: ["LG/CC: Cave Chest - chest"] };
    expect(excludedGroups(options, GROUPS).has("Dungeon")).toBe(false);
    expect(excludedGroups({ ...options, enable_dlc: 0 }, GROUPS).has("Dungeon")).toBe(false);
    const twoOfThree = {
      ...options,
      exclude_locations: ["LG/CC: Cave Chest - chest", "LG/CC: Cave Pot - pot"],
    };
    expect(excludedGroups(twoOfThree, GROUPS).has("Dungeon")).toBe(true);
  });

  test("the base game's members don't count in a run that starts in the DLC", () => {
    const options = {
      ...OPTIONS,
      enable_dlc: 1,
      dlc_start: 1,
      exclude_locations: ["GP/B: DLC Boss - boss drop"],
    };
    expect(excludedGroups(options, GROUPS).has("Dungeon")).toBe(true);
  });
});

describe("prioritySpots", () => {
  test("keeps chosen spots in the room that can't be missed and aren't excluded", () => {
    const slot = {
      options: {
        ...OPTIONS,
        priority_location_groups: [
          "LG/A: Seed - tree",
          "LG/CC: Cave Boss - boss drop",
          "LL/A: Missable - quest",
          "LG/Z: Not In Room - nowhere",
        ],
        exclude_locations: ["LG/CC: Cave Chest - chest", "LG/CC: Cave Pot - pot"],
      },
      locationIdsToName: roomOf(
        "LG/A: Seed - tree",
        "LG/CC: Cave Boss - boss drop",
        "LL/A: Missable - quest"
      ),
    };
    expect(prioritySpots(slot, GROUPS)).toEqual(new Set(["LG/A: Seed - tree"]));
  });

  test("tops up Limgrave with the Finger Severer when it has no spot, under region lock", () => {
    const slot = { options: OPTIONS, locationIdsToName: roomOf() };
    expect(prioritySpots(slot, GROUPS).has("LG/(SG): Finger Severer - beside grace")).toBe(true);
    const open = { ...slot, options: { ...OPTIONS, world_logic: 1 } };
    expect(prioritySpots(open, GROUPS).size).toBe(0);
  });

  test("tops up Gravesite Plain with the Scadutree Fragment when the DLC is on and it has none", () => {
    const slot = { options: { ...OPTIONS, enable_dlc: 1 }, locationIdsToName: roomOf() };
    expect(prioritySpots(slot, GROUPS).has("GP/TPC: Scadutree Fragment - by cross")).toBe(true);
  });

  test("adds the generator's extra copies", () => {
    const slot = {
      options: { ...OPTIONS, priority_location_groups: ["LG/A: Seed - tree"] },
      locationIdsToName: roomOf("LG/A: Seed - tree", "LG/A: Seed - tree, extra item 1"),
      duplicatedLocations: { "LG/A: Seed - tree, extra item 1": "LG/A: Seed - tree" },
    };
    expect(prioritySpots(slot, GROUPS).has("LG/A: Seed - tree, extra item 1")).toBe(true);
  });
});

describe("keyChecks", () => {
  test("gives ids, and adds the Crafting Kit's spot when it isn't randomized", () => {
    const kit = "LG/(CE): Crafting Kit - Kalé Shop";
    const slot = {
      options: { ...OPTIONS, priority_location_groups: ["LG/A: Seed - tree"] },
      locationIdsToName: roomOf("LG/A: Seed - tree", kit),
    };
    expect(keyChecks(slot, GROUPS)).toEqual(new Set([1]));
    const pinned = { ...slot, options: { ...slot.options, crafting_kit_option: 2 } };
    expect(keyChecks(pinned, GROUPS)).toEqual(new Set([1, 2]));
  });
});
