/*! The DLC's rules follow the Elden Ring apworld 0.1.3's set_rules, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

/**
 * ─ DLC rules ─
 *
 * The rules set_rules puts on the Realm of Shadow's ways in: the Imbued Sword
 * Keys on Rauh's ruins and the Four Belfries, Messmer's Kindling on Enir-Ilim,
 * the spiritspring stones, the DLC's own keys and its soft-logic gate. With the
 * DLC off, the Four Belfries take one key fewer. A rule on a region the room
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
}

const BELFRIES = [
  "The Four Belfries (Chapel of Anticipation)",
  "The Four Belfries (Nokron)",
  "The Four Belfries (Farum Azula)",
];

/** The DLC's rules on a region's way in, for a room's options, by the region each leads to. */
export function dlcEntrances(options: DlcRuleOptions): (readonly [string, Rule])[] {
  if (!options.enable_dlc) {
    return BELFRIES.map((belfry) => [belfry, imbuedSwordKeys(3)]);
  }
  const rauh = area("Ancient Ruins of Rauh");
  const entrances: (readonly [string, Rule])[] =
    options.dlc_start === 1
      ? [["Rauh Ruins Limited", { kind: "any", rules: [imbuedSwordKeys(1), rauh] }]]
      : [
          ...BELFRIES.map((belfry): readonly [string, Rule] => [belfry, imbuedSwordKeys(4)]),
          ["Rauh Ruins Limited", { kind: "any", rules: [imbuedSwordKeys(4), rauh] }],
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
