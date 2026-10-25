import { describe, expect, test } from "bun:test";
import { callsIn } from "../../tools/apworld-source.js";
import { bossArenasFrom, goalBossesFrom } from "../../tools/write-bosses.js";

// Calls shaped as the apworld's bosses.py writes them.
const SOURCE = `
base_bosses = [
    ERBossInfo("Solder of Godrick", ["Limgrave"], 18000850, 18000850, locations=[]), # emote spot
    ERBossInfo("Tree Sentinel (LG)", ["Limgrave", "Overworld"], 1042360800, 1042360800,
               locations=["LG/TFS: Golden Halberd - first field boss"]),
    ERBossInfo("Patches (LG/MCV)", ["Limgrave", "Dungeon"], 31000800, 31000800, dungeon=True, missable=True, locations=[]),
    ERBossInfo("Rennala, Queen of the Full Moon (Phase 1) (RLA)", [], 14000801, None, locations=[]),
    ERBossInfo("Rennala, Queen of the Full Moon (Phase 2) (RLA)", ["Raya Lucaria Academy"], 14000800, 14000800),
    ERBossInfo("Morgott, The Omen King (LRC)", ["Leyndell, Royal Capital"], 11000800, 11000800),
    ERBossInfo("God-Devouring Serpent (VM)", [], 16000801, None, allow_rykard=True, locations=[]),
    ERBossInfo("Rykard, Lord of Blasphemy (VM)", ["Volcano Manor"], 16000800, 16000800, allow_rykard=True,
               locations=["VM/AP: Rykard's Great Rune - mainboss drop"]),
]
`;

describe("goalBossesFrom", () => {
  const bosses = goalBossesFrom(callsIn(SOURCE, "ERBossInfo"));

  test("keeps only the bosses with a defeat flag that can't be missed", () => {
    expect(bosses.map((boss) => boss.flag)).toEqual([
      18000850, 1042360800, 14000800, 11000800, 16000800,
    ]);
  });

  test("parts the name from the area code in its brackets", () => {
    expect(bosses[1]).toEqual({
      flag: 1042360800,
      name: "Tree Sentinel",
      where: "LG",
      drops: ["LG/TFS: Golden Halberd - first field boss"],
    });
  });

  test("spells names as the game does: a typo fixed, no phase, and ', the'", () => {
    expect(bosses[0]).toEqual({
      flag: 18000850,
      name: "Soldier of Godrick",
      where: "LG",
      drops: [],
    });
    expect(bosses[2]?.name).toBe("Rennala, Queen of the Full Moon");
    expect(bosses[3]?.name).toBe("Morgott, the Omen King");
  });
});

describe("bossArenasFrom", () => {
  const { arenas, rykard, serpent } = bossArenasFrom(callsIn(SOURCE, "ERBossInfo"));

  test("keeps every boss's arena by its id, missable and flagless ones too", () => {
    expect(arenas.map((arena) => arena.id)).toEqual([
      18000850, 1042360800, 31000800, 14000801, 14000800, 11000800, 16000801, 16000800,
    ]);
    expect(arenas[1]?.drops).toEqual(["LG/TFS: Golden Halberd - first field boss"]);
  });

  test("finds Rykard and the serpent by the names bosses.py finds them by", () => {
    expect(rykard).toBe(16000800);
    expect(serpent).toBe(16000801);
  });
});
