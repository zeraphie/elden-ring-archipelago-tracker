import { describe, expect, test } from "bun:test";
import { LOCATION_GROUPS } from "../../../../src/data/checks/location-groups.js";
import { regionOf } from "../../../../src/data/rules/regions/location-region.js";
import { regionGraph } from "../../../../src/data/rules/regions/region-graph.js";

const BOTH = {
  world_logic: 0,
  enable_dlc: 1,
  dlc_start: 0,
  dlc_timing: 0,
  missable_location_behavior: 2,
  excluded_location_behavior: 2,
  exclude_locations: [] as string[],
};

describe("regionOf", () => {
  test("every location sits in a region the graph knows", () => {
    // The DLC-only Roundtable is a region only when a room starts in the DLC alone.
    const known = new Set([
      ...regionGraph(BOTH).regions,
      ...regionGraph({ ...BOTH, dlc_start: 1 }).regions,
    ]);
    const unknown = [...LOCATION_GROUPS.keys()].filter((name) => {
      const region = regionOf(name);
      return region === undefined || !known.has(region);
    });
    expect(unknown).toEqual([]);
  });

  test("a boss drop sits in its arena's region", () => {
    expect(regionOf("FP/FF: Remembrance of the Fire Giant - mainboss drop")).toBe("Flame Peak");
    expect(regionOf("CL/(WD): Remembrance of the Starscourge - mainboss drop")).toBe(
      "Wailing Dunes"
    );
  });

  test("a name the apworld doesn't list has no region", () => {
    expect(regionOf("LG/A: Not a location - nowhere")).toBeUndefined();
  });
});
