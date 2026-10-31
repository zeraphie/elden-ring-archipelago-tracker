/*! The DLC's rules follow the Elden Ring apworld 0.1.3's set_rules, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

/**
 * ─ DLC rules ─
 *
 * The rules set_rules puts on the Realm of Shadow's ways in: the Imbued Sword
 * Keys on Rauh's ruins and the Four Belfries, Messmer's Kindling on Enir-Ilim,
 * the spiritspring stones, the DLC's own keys and its soft-logic gate. Each
 * statue takes a key of its own when the room splits them, or else a count of
 * Imbued Sword Keys, one fewer with the DLC off. A rule on a region the room
 * doesn't have never applies.
 */

import { keyOrShards, type KeyRuleOptions } from "./key-rules.js";
import { area, item, location, type Rule } from "../rules.js";

/** The options these rules read, with the apworld's names. */
export interface DlcRuleOptions extends KeyRuleOptions {
  readonly enable_dlc: number | boolean;
  /** 0 for the base game first, 1 for the DLC alone, 2 for both from the DLC. */
  readonly dlc_start: number;
  readonly spiritspring_stones: number | boolean;
  readonly soft_logic: number | boolean;
  /** On when each imp statue takes an imbued key of its own, as the apworld spells it. */
  readonly seperate_imbued_key: number | boolean;
}

// Each belfry, with the key of its own when the room splits them.
const BELFRIES = [
  ["The Four Belfries (Chapel of Anticipation)", "Chapel Sword Key"],
  ["The Four Belfries (Nokron)", "Eternal Sword Key"],
  ["The Four Belfries (Farum Azula)", "Crumbling Sword Key"],
] as const;
const RAUH_KEY = "Ancient Sword Key";

/** The DLC's rules on a region's way in, for a room's options, by the region each leads to. */
export function dlcEntrances(options: DlcRuleOptions): (readonly [string, Rule])[] {
  // The apworld's _choose_imbued_key_rules.
  const imbuedKey = (needs: number, key: string): Rule =>
    options.seperate_imbued_key ? item(key) : imbuedSwordKeys(needs);
  if (!options.enable_dlc) {
    return BELFRIES.map(([belfry, key]) => [belfry, imbuedKey(3, key)]);
  }
  const rauh = area("Ancient Ruins of Rauh");
  const entrances: (readonly [string, Rule])[] =
    options.dlc_start === 1
      ? [["Rauh Ruins Limited", { kind: "any", rules: [imbuedKey(1, RAUH_KEY), rauh] }]]
      : [
          ...BELFRIES.map(([belfry, key]): readonly [string, Rule] => [belfry, imbuedKey(4, key)]),
          ["Rauh Ruins Limited", { kind: "any", rules: [imbuedKey(4, RAUH_KEY), rauh] }],
        ];
  entrances.push(["Enir-Ilim", keyOrShards("Messmer's Kindling", options)]);
  if (options.spiritspring_stones) {
    entrances.push([
      "Scadu Altus",
      {
        kind: "any",
        rules: [
          item("Fort of Reprimand Spiritspring Stone"),
          location("CE/CLC: Remembrance of the Twin Moon Knight - mainboss drop"),
        ],
      },
    ]);
  }
  if (options.soft_logic) {
    // Jagged Peak is a later area, so it doesn't come first.
    entrances.push([
      "Jagged Peak Foot",
      { kind: "any", rules: [area("Belurat"), area("Ellac River"), area("Castle Ensis")] },
    ]);
  }
  entrances.push(
    // The long drop down from Enir-Ilim lands in the swamp.
    ["Belurat Swamp", { kind: "any", rules: [item("Well Depths Key"), area("Enir-Ilim")] }],
    ["Hinterland", item("O Mother")],
    [
      "Cathedral of Manus Metyr",
      {
        kind: "all",
        rules: [
          item("Hole-Laden Necklace"),
          area("Finger Ruins of Rhia"),
          area("Finger Ruins of Dheo"),
        ],
      },
    ],
    ["Lamenter's Gaol (Upper)", item("Gaol Upper Level Key")],
    ["Lamenter's Gaol (Lower)", item("Gaol Lower Level Key")]
  );
  return entrances;
}

function imbuedSwordKeys(needs: number): Rule {
  return {
    kind: "count",
    label: "Imbued Sword Keys",
    items: [{ item: "Imbued Sword Key", weight: 1 }],
    needs,
  };
}
