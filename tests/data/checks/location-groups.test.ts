import { describe, expect, test } from "bun:test";
import { LOCATION_GROUPS } from "../../../src/data/checks/location-groups.js";

// The group sizes the apworld 0.1.3's own location_groups() and the loops after its tables give.
const SIZES = {
  DLC: 1287,
  Hidden: 29,
  Blizzard: 29,
  Scarab: 95,
  "Furnace Golem": 16,
  "Out of the Way": 44,
  Drop: 7,
  Dungeon: 642,
  "Post Leyndell": 867,
};

describe("LOCATION_GROUPS", () => {
  test("each excludable group is the size the apworld gives it", () => {
    const sizes = Object.fromEntries(
      Object.keys(SIZES).map((group) => [
        group,
        [...LOCATION_GROUPS.values()].filter((facts) => facts.groups.includes(group)).length,
      ])
    );
    expect(sizes).toEqual(SIZES);
  });

  test("an excluded side-dungeon boss drop in Izzy's room is in Dungeon", () => {
    expect(
      LOCATION_GROUPS.get("AP/(AT): Somberstone Miner's Bell Bearing [2] - boss drop")?.groups
    ).toContain("Dungeon");
  });

  test("the two spots generation tops up with know their region", () => {
    expect(LOCATION_GROUPS.get("LG/(SG): Finger Severer - beside grace")?.region).toBe("Limgrave");
    expect(LOCATION_GROUPS.get("GP/TPC: Scadutree Fragment - by cross")?.region).toBe(
      "Gravesite Plain"
    );
  });
});
