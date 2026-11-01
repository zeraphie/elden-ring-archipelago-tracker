import { describe, expect, test } from "bun:test";
import { demoRoomFrom, demoRoomModule } from "../../tools/write-demo-room.js";

const LOCATIONS = ["LG/(CE): Crafting Kit - shop", "LL/(SV): Rusty Key - chest"];

// A decoded multidata in a seed's own shape: a slot of another game, and an Elden Ring slot.
const seed = (slot: Record<string, unknown> = {}) => ({
  slot_info: { "1": ["Friend", "ChecksFinder", 1, []], "2": ["Izzy", "EldenRing", 1, []] },
  slot_data: {
    "1": {},
    "2": {
      options: {
        world_logic: 2,
        exclude_locations: [LOCATIONS[1]],
        priority_location_groups: [LOCATIONS[0], LOCATIONS[1]],
        local_item_only: ["Rusty Key"],
      },
      goal: [11000850],
      locationIdsToKeys: {
        "7000002": "604037,0:0000000000::",
        "7000000": "604038,0:1041367000::",
        "7000001": "604038,0:0000000000:100500:",
        "7000004": "100000,0:0000000000::",
        "7000005": "310000,0:0000000000::",
      },
      ...slot,
    },
  },
});

describe("demoRoomFrom", () => {
  test("reads the Elden Ring slot, whichever number it is", () => {
    expect(demoRoomFrom(seed(), LOCATIONS).goal).toEqual([11000850]);
  });

  test("writes its lists of locations as indices into the table", () => {
    const { options, locations } = demoRoomFrom(seed(), LOCATIONS);
    expect(locations["exclude_locations"]).toEqual([1]);
    expect(locations["priority_location_groups"]).toEqual([0, 1]);
    expect(options).toEqual({ world_logic: 2 });
  });

  test("leaves out what nothing reads", () => {
    expect(JSON.stringify(demoRoomFrom(seed(), LOCATIONS))).not.toContain("local_item_only");
  });

  test("joins neighbouring ids on a tile, in order of id", () => {
    expect(demoRoomFrom(seed(), LOCATIONS).checks.slice(0, 2)).toEqual([
      [7000000, 2, "604038"],
      [7000002, 1, "604037"],
    ]);
  });

  test("keeps no tile for a check off the map, and starts a run at a gap", () => {
    expect(demoRoomFrom(seed(), LOCATIONS).checks.slice(2)).toEqual([[7000004, 2, ""]]);
  });

  test("stops at a location the table doesn't name", () => {
    const options = { exclude_locations: ["Nowhere"] };
    expect(() => demoRoomFrom(seed({ options }), LOCATIONS)).toThrow();
  });

  test("stops at a multidata with no Elden Ring slot", () => {
    expect(() => demoRoomFrom({ slot_info: {}, slot_data: {} }, LOCATIONS)).toThrow();
  });
});

describe("demoRoomModule", () => {
  test("says which tool wrote it, and carries the apworld's licence", () => {
    const source = demoRoomModule(demoRoomFrom(seed(), LOCATIONS));
    expect(source).toContain("tools/write-demo-room.ts");
    expect(source.startsWith("/*!")).toBe(true);
  });
});
