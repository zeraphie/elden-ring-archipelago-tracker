import { describe, expect, test } from "bun:test";
import type { Boss } from "../../../src/data/bosses/bosses.js";
import { goalBosses } from "../../../src/data/bosses/goal.js";
import fixture from "../../fixtures/goals.json";

interface FixtureRoom {
  readonly label: string;
  readonly goal: readonly number[];
  readonly roomDrops: readonly string[];
}

const ROOMS = fixture.rooms as readonly FixtureRoom[];
const room = (label: string): FixtureRoom => {
  const found = ROOMS.find((each) => each.label === label);
  if (found === undefined) {
    throw new Error(`The goal fixture has no room labelled "${label}"`);
  }
  return found;
};
const NONE = new Set<string>();

describe("goalBosses in Izzy's live room", () => {
  const live = room("Izzy's live room");
  const drops = new Set(live.roomDrops);

  test("names both bosses of the Leyndell goal, in slot_data's order", () => {
    expect(goalBosses(live.goal, drops, NONE).map((boss) => [boss.name, boss.where])).toEqual([
      ["Godfrey, First Elden Lord", "LRC"],
      ["Morgott, the Omen King", "LRC"],
    ]);
  });

  test("both are still to do while neither drop is checked", () => {
    expect(goalBosses(live.goal, drops, NONE).map((boss) => boss.state)).toEqual([
      "to do",
      "to do",
    ]);
  });

  test("a boss is defeated once any of its drops is checked", () => {
    const checked = new Set(["LRC/QB: Remembrance of the Omen King - mainboss drop"]);
    expect(goalBosses(live.goal, drops, checked).map((boss) => boss.state)).toEqual([
      "to do",
      "defeated",
    ]);
  });
});

describe("goalBosses on the shipped presets' goals", () => {
  test.each(ROOMS.map((each) => [each.label, each]))("%s: every goal boss is known", (_, each) => {
    const unknown = goalBosses(each.goal, new Set(each.roomDrops), NONE).filter(
      (boss) => boss.name === undefined
    );
    expect(unknown).toEqual([]);
  });

  test("All Bosses names all 203, and only the two with no drop can't be read", () => {
    const allBosses = room("[Very Long] All Bosses");
    const bosses = goalBosses(allBosses.goal, new Set(allBosses.roomDrops), NONE);
    expect(bosses).toHaveLength(203);
    expect(
      bosses
        .filter((boss) => boss.state === "unknown")
        .map((boss) => boss.name)
        .sort()
    ).toEqual(["Mad Pumpkin Head", "Soldier of Godrick"]);
  });
});

describe("goalBosses with its edges", () => {
  const BOSSES: ReadonlyMap<number, Boss> = new Map([
    [1, { name: "Kept Boss", where: "LG", drops: ["LG/A: Drop - boss drop"] }],
  ]);

  test("a flag the table doesn't know has no name and can't be read", () => {
    expect(goalBosses([99], new Set(), NONE, BOSSES)).toEqual([
      { flag: 99, name: undefined, where: undefined, drop: undefined, state: "unknown" },
    ]);
  });

  test("a boss carries the first of its drops that's a check in the room", () => {
    const TWO: ReadonlyMap<number, Boss> = new Map([
      [
        2,
        {
          name: "Two Drops",
          where: "LG",
          drops: ["LG/A: First - boss drop", "LG/A: Second - boss drop"],
        },
      ],
    ]);
    const room = new Set(["LG/A: Second - boss drop"]);
    expect(goalBosses([2], room, NONE, TWO)[0]?.drop).toBe("LG/A: Second - boss drop");
  });

  test("a boss whose drops aren't checks in this room can't be read", () => {
    expect(goalBosses([1], new Set(), NONE, BOSSES)[0]?.state).toBe("unknown");
  });
});
