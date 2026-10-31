/*! The boss gates follow the Elden Ring apworld 0.1.4's set_rules, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

/**
 * ─ Boss gates ─
 *
 * The rules set_rules puts on bosses, in the base game and the DLC. They hold
 * because the apworld's soft_logic_enabled is on whenever it generates. Without
 * enemy rando, two areas wait for what helps with their bosses. With enemy rando
 * and no Rykard encounter, areas wait for the boss before them, and wherever Rykard
 * and the serpent were moved, their drops wait for the Serpent-Hunter. A rule
 * on a location the room doesn't have never applies, which stands in for the
 * apworld's checks on whether an arena's half of the game is on.
 */

import { ARENA_DROPS, RYKARD_ID, SERPENT_ID } from "../../bosses/bosses.js";
import { item, location, type Rule } from "../rules.js";

/** The options these rules read, with the apworld's names. */
export interface BossGateOptions {
  readonly enemy_rando: number | boolean;
  readonly rykard_encounter: number | boolean;
}

/** slot_data's forceBosses: the boss forced into each arena, both by the game's id. */
export type ForcedBosses = Readonly<Record<string, number>>;

const MORGOTT = "LRC/QB: Morgott's Great Rune - mainboss drop";
// Rykard's drops before enemy rando moves him.
const RYKARD_DROPS = [
  "VM/AP: Rykard's Great Rune - mainboss drop",
  "VM/AP: Remembrance of the Blasphemous - mainboss drop",
];

/** The boss gates on a region's way in, for a room's options, by the region each leads to. */
export function bossGateEntrances(options: BossGateOptions): (readonly [string, Rule])[] {
  if (!options.enemy_rando) {
    return [
      ["Stormveil Start", item("Margit's Shackle")],
      [
        "Mohgwyn Palace",
        { kind: "all", rules: [item("Mohg's Shackle"), item("Purifying Crystal Tear")] },
      ],
    ];
  }
  if (options.rykard_encounter) {
    return [];
  }
  return [
    ["Stormveil Castle", location("SV/CT: Talisman Pouch - boss drop")],
    ["Raya Lucaria Academy Main", location("RLA/SC: Memory Stone - boss drop")],
    ["Nokron, Eternal City", location("NR/NEC: Silver Tear Mask - boss drop")],
    ["Deeproot Depths", location("NR/(SA): Gargoyle's Greatsword - boss drop")],
    ["War-Dead Catacombs", location("CL/(WD): Radahn's Great Rune - mainboss drop")],
    // The apworld means this for open world, but its test compares a number to text and always passes.
    [
      "Altus Plateau",
      {
        kind: "any",
        rules: [
          location("RSP/RSPO: Dragon Heart - boss drop"),
          {
            kind: "all",
            rules: [item("Dectus Medallion (Left)"), item("Dectus Medallion (Right)")],
          },
        ],
      },
    ],
    ["Volcano Manor Upper", location("VM/GH: Godskin Stitcher - boss drop")],
    ["Leyndell, Royal Capital Throne", location("LRC/WCR: Talisman Pouch - mainboss drop")],
    ["Divine Tower of East Altus", location(MORGOTT)],
    [
      "Frenzied Flame Proscription",
      {
        kind: "all",
        rules: [location(MORGOTT), location("SSG/FD: Bloodflame Talons - boss drop")],
      },
    ],
    ["Elphael, Brace of the Haligtree", location("MH/HTP: Loretta's War Sickle - boss drop")],
    ["Farum Azula", location("FP/FF: Remembrance of the Fire Giant - mainboss drop")],
    ["Farum Azula Main", location("FA/DTT: Smithing-Stone Miner's Bell Bearing [4] - boss drop")],
    ["Leyndell, Ashen Capital", location("FA/BGB: Remembrance of the Black Blade - mainboss drop")],
    ["Leyndell, Ashen Capital Throne", location("LAC/LCA: Scepter of the All-Knowing - boss drop")],
    ["Erdtree", location("LAC/QB: Remembrance of Hoarah Loux - mainboss drop")],
    // The DLC's.
    ["Jagged Peak Foot", location("GP/(DP): Dragon-Hunter's Great Katana - boss drop")],
    ["Shadow Keep", location("SK/SKMG: Aspects of the Crucible: Thorns - boss drop")],
    ["Scaduview", location("ScV/SKBG: Remembrance of the Wild Boar Rider - mainboss drop")],
    ["Abyssal Woods", location("RR/(DC): Barbed Staff-Spear - boss drop")],
    ["Enir-Ilim", location("ARR/CBME: Remembrance of the Saint of the Bud - mainboss drop")],
  ];
}

/** The Serpent-Hunter's rules on the drops of wherever Rykard and the serpent are fought, by location. */
export function bossGateLocations(
  options: BossGateOptions,
  forced: ForcedBosses
): (readonly [string, Rule])[] {
  if (options.rykard_encounter) {
    return [];
  }
  const drops = options.enemy_rando ? [] : [...RYKARD_DROPS];
  const rykardDrops = dropsWhere(RYKARD_ID, forced);
  // The apworld checks Rykard's arena has drops before adding the serpent's too.
  if (rykardDrops.length > 0) {
    drops.push(...rykardDrops, ...dropsWhere(SERPENT_ID, forced));
  }
  const serpentHunter = item("Serpent-Hunter");
  return drops.map((drop) => [drop, serpentHunter]);
}

// What the arena a boss was forced into drops, or nothing when it wasn't forced anywhere.
function dropsWhere(boss: number, forced: ForcedBosses): readonly string[] {
  const arena = Object.entries(forced).find(([, moved]) => moved === boss)?.[0];
  return arena === undefined ? [] : (ARENA_DROPS.get(Number(arena)) ?? []);
}
