import { describe, expect, test } from "bun:test";
import { ARENA_DROPS, BOSSES, RYKARD_ID, SERPENT_ID } from "../../../src/data/bosses/bosses.js";

// Izzy's preset's goal is "Leyndell, Royal Capital Boss": slot_data's `goal` carries these two flags.
const GODFREY_GOLDEN_SHADE = 11000850;
const MORGOTT = 11000800;

describe("BOSSES", () => {
  test("names each boss in Izzy's goal by its flag, with where it is", () => {
    expect(BOSSES.get(GODFREY_GOLDEN_SHADE)).toEqual({
      name: "Godfrey, First Elden Lord",
      where: "LRC",
      drops: ["LRC/WCR: Talisman Pouch - mainboss drop"],
    });
    expect(BOSSES.get(MORGOTT)).toEqual({
      name: "Morgott, the Omen King",
      where: "LRC",
      drops: [
        "LRC/QB: Morgott's Great Rune - mainboss drop",
        "LRC/QB: Remembrance of the Omen King - mainboss drop",
      ],
    });
  });

  test("holds every boss a goal can name in apworld 0.1.3", () => {
    expect(BOSSES.size).toBe(203);
  });

  test("no name keeps its area bracket or a phase", () => {
    const bracketed = [...BOSSES.values()].filter(({ name }) => /\(/.test(name));
    expect(bracketed).toEqual([]);
  });

  test("all but two bosses have a drop to show they're defeated", () => {
    const dropless = [...BOSSES.values()].filter(({ drops }) => drops.length === 0);
    expect(dropless.map(({ name }) => name).sort()).toEqual([
      "Mad Pumpkin Head",
      "Soldier of Godrick",
    ]);
  });

  test("every boss says where it is", () => {
    const nowhere = [...BOSSES.values()].filter(({ where }) => where === undefined);
    expect(nowhere).toEqual([]);
  });
});

describe("ARENA_DROPS", () => {
  test("holds every boss's arena in apworld 0.1.3, by the game's id", () => {
    expect(ARENA_DROPS.size).toBe(215);
  });

  test("Rykard starts in Volcano Manor with his great rune and remembrance, the serpent with nothing", () => {
    expect(ARENA_DROPS.get(RYKARD_ID)).toEqual([
      "VM/AP: Rykard's Great Rune - mainboss drop",
      "VM/AP: Remembrance of the Blasphemous - mainboss drop",
    ]);
    expect(ARENA_DROPS.get(SERPENT_ID)).toEqual([]);
  });

  test("every goal boss's drops are its arena's", () => {
    const arenaDrops = new Set([...ARENA_DROPS.values()].flat());
    const unmatched = [...BOSSES.values()].flatMap(({ drops }) =>
      drops.filter((drop) => !arenaDrops.has(drop))
    );
    expect(unmatched).toEqual([]);
  });
});
