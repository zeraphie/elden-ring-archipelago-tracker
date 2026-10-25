import { describe, expect, test } from "bun:test";
import type { GoalBoss, GoalState } from "../../../../src/data/bosses/goal.js";
import {
  BY_REGION_PAST,
  bossesByRegion,
  bossTally,
  goalPickerGroups,
  isByRegion,
} from "../../../../src/components/organisms/goal-menu/goal-regions.js";
import type { PickerGroup } from "../../../../src/components/utils/region-groups.js";

const boss = (flag: number, drop: string | undefined, state: GoalState): GoalBoss => ({
  flag,
  name: `Boss ${flag}`,
  where: undefined,
  drop,
  state,
});
// A drop's region is the code before its colon, as a location name's first region.
const regionOf = (drop: string) => drop.split(":")[0];

const BOSSES = [
  boss(1, "LG: One", "defeated"),
  boss(2, "LG: Two", "to do"),
  boss(3, "SV: Three", "to do"),
  boss(4, undefined, "unknown"),
];

describe("isByRegion", () => {
  test("holds past the menu's count of goal bosses, not at it", () => {
    const many = (count: number) =>
      Array.from({ length: count }, (_, i) => boss(i, "LG: x", "to do"));
    expect(isByRegion(many(BY_REGION_PAST))).toBe(false);
    expect(isByRegion(many(BY_REGION_PAST + 1))).toBe(true);
  });
});

describe("bossesByRegion", () => {
  test("puts each boss in its drop's region, to do or defeated, in the goal's order", () => {
    const byRegion = bossesByRegion(BOSSES, regionOf, false);
    expect(byRegion.get("LG")?.toDo.map(({ flag }) => flag)).toEqual([2]);
    expect(byRegion.get("LG")?.defeated.map(({ flag }) => flag)).toEqual([1]);
    expect(byRegion.get("SV")?.toDo.map(({ flag }) => flag)).toEqual([3]);
  });

  test("leaves out a boss with no drop in the room, as the goal does", () => {
    const byRegion = bossesByRegion(BOSSES, regionOf, false);
    expect(
      [...byRegion.values()].flatMap(({ toDo, defeated }) => [...toDo, ...defeated])
    ).toHaveLength(3);
  });

  test("counts every boss defeated once the goal's achieved", () => {
    const byRegion = bossesByRegion(BOSSES, regionOf, true);
    expect(byRegion.get("SV")?.toDo).toEqual([]);
    expect(byRegion.get("SV")?.defeated.map(({ state }) => state)).toEqual(["defeated"]);
  });
});

describe("bossTally", () => {
  test("counts the placed bosses defeated, out of all placed", () => {
    expect(bossTally(bossesByRegion(BOSSES, regionOf, false))).toEqual({ defeated: 1, of: 3 });
  });
});

describe("goalPickerGroups", () => {
  const region = (code: string) => ({
    code,
    name: code,
    state: "open" as const,
    done: 5,
    of: 9,
    what: "key checks done",
  });
  const GROUPS: PickerGroup[] = [
    { title: "Lands", regions: [region("LG"), region("WP")] },
    { title: "Dungeons", regions: [region("SV")] },
  ];

  test("keeps the regions holding a goal boss, in the picker's order, counting their bosses", () => {
    const groups = goalPickerGroups(GROUPS, bossesByRegion(BOSSES, regionOf, false));
    expect(
      groups.map(({ regions }) => regions.map(({ code, done, of }) => [code, done, of]))
    ).toEqual([[["LG", 1, 2]], [["SV", 0, 1]]]);
  });

  test("keeps each region's own state, as the map shows it", () => {
    const groups = goalPickerGroups(GROUPS, bossesByRegion(BOSSES, regionOf, false));
    expect(groups[0]?.regions[0]?.state).toBe("open");
  });
});
