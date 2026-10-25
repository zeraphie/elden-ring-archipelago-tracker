import { describe, expect, test } from "bun:test";
import { reach, type WorldRules } from "../../../../src/data/rules/reachability.js";
import { regionGraph } from "../../../../src/data/rules/regions/region-graph.js";
import {
  REGION_LOCK_ENTRANCES,
  REGION_LOCK_LOCATIONS,
} from "../../../../src/data/rules/gates/region-locks.js";
import { needs } from "../../../../src/data/rules/rules.js";

// Izzy's preset's settings: region lock, the DLC on, the base game first.
const OPTIONS = {
  world_logic: 0,
  enable_dlc: 1,
  dlc_start: 0,
  dlc_timing: 0,
  missable_location_behavior: 2,
  excluded_location_behavior: 2,
  exclude_locations: [] as string[],
};
const GRAPH = regionGraph(OPTIONS);
const RULES: WorldRules = {
  entrances: new Map(REGION_LOCK_ENTRANCES),
  locations: new Map(REGION_LOCK_LOCATIONS),
  regionOf: (location) => (location.startsWith("BTS|EI/") ? "Enir-Ilim" : undefined),
};
const reached = (options: Record<string, unknown>, ...items: string[]) =>
  reach(GRAPH, RULES, new Map(items.map((item) => [item, 1])), options);

describe("region locks, against the research's unlock table", () => {
  // Each row: the region, and the locks the table names for it on the way in.
  const ROWS: [string, string[]][] = [
    ["Weeping Peninsula", ["Weeping Lock"]],
    ["Liurnia of The Lakes", ["Liurnia Lock"]],
    ["Siofra River", ["Siofra Lock"]],
    ["Caelid", ["Caelid Lock"]],
    ["Altus Plateau", ["Liurnia Lock", "Dectus Medallion (Left)", "Dectus Medallion (Right)"]],
    [
      "Mt. Gelmir",
      ["Liurnia Lock", "Dectus Medallion (Left)", "Dectus Medallion (Right)", "Mt. Gelmir Lock"],
    ],
    ["Ainsel River", ["Liurnia Lock", "Ainsel Lock"]],
  ];

  test.each(ROWS)("%s opens with its locks and not without them", (region, locks) => {
    expect(reached(OPTIONS, ...locks).regions.has(region)).toBe(true);
    for (const missing of locks) {
      const without = locks.filter((lock) => lock !== missing);
      expect(reached(OPTIONS, ...without).regions.has(region)).toBe(false);
    }
  });

  test("Altus with one Dectus half needs the other", () => {
    const state = reached(OPTIONS, "Liurnia Lock", "Dectus Medallion (Left)").state;
    const altus = new Map(REGION_LOCK_ENTRANCES).get("Altus Plateau");
    expect(altus && needs(altus, state)).toEqual({
      kind: "item",
      item: "Dectus Medallion (Right)",
    });
  });

  test("open world locks nothing", () => {
    const open = reached({ ...OPTIONS, world_logic: 1 });
    expect(open.regions.size).toBe(GRAPH.regions.size);
  });

  test("Gravesite Plain is locked only when the base game comes first", () => {
    const gravesite = new Map(REGION_LOCK_ENTRANCES).get("Gravesite Plain");
    const firstBase = reached(OPTIONS).state;
    const firstDlc = reached({ ...OPTIONS, dlc_start: 2 }).state;
    expect(gravesite && needs(gravesite, firstBase)).toEqual({
      kind: "item",
      item: "Gravesite Lock",
    });
    expect(gravesite && needs(gravesite, firstDlc)).toBeUndefined();
  });

  test("a spot with its own lock waits for it once its region is reached", () => {
    const euporia =
      "BTS|EI/SR: Euporia - outside to SE downstairs, drop down from gazebo, after jump to window, continue down and down";
    const open = { ...OPTIONS, world_logic: 1 };
    expect(reached({ ...open }).canGet(euporia)).toBe(true);
    const lockedEuporia = new Map(REGION_LOCK_LOCATIONS).get(euporia);
    expect(lockedEuporia && needs(lockedEuporia, reached(OPTIONS).state)).toEqual({
      kind: "item",
      item: "Belurat Lock",
    });
  });
});
