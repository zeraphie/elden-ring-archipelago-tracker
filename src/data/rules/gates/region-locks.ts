/*! The region locks follow the Elden Ring apworld 0.1.4's _region_lock(), Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

/**
 * ─ Region locks ─
 *
 * The apworld's region locks as rule data: with world logic set to region
 * lock, each region of the base game and the DLC is entered only with its
 * lock item, and two spots wait for theirs too. A rule on a region or a spot
 * the room doesn't have never applies, as the apworld skips them.
 */

import { area, item, type Rule } from "../rules.js";

const REGION_LOCK = { option: "world_logic", is: 0 } as const;

// A rule that holds only under region lock.
function locked(rule: Rule): Rule {
  return { kind: "when", test: REGION_LOCK, rule };
}

function lock(name: string): Rule {
  return locked(item(name));
}

/** The region-lock rule on each region's way in, by the region it leads to. */
export const REGION_LOCK_ENTRANCES: readonly (readonly [string, Rule])[] = [
  // The base game.
  ["Weeping Peninsula", lock("Weeping Lock")],
  ["Liurnia of The Lakes", lock("Liurnia Lock")],
  ["Siofra River", lock("Siofra Lock")],
  ["Nokron, Eternal City Start", lock("Siofra Lock")],
  ["Ainsel River", lock("Ainsel Lock")],
  ["Ainsel River Main", lock("Ainsel Lock")],
  ["Deeproot Depths", lock("Deeproot Lock")],
  ["Deeproot Depths Upper", lock("Deeproot Lock")],
  ["Caelid", lock("Caelid Lock")],
  ["Sellia Crystal Tunnel", lock("Caelid Lock")],
  [
    "Altus Plateau",
    locked({
      kind: "all",
      rules: [item("Dectus Medallion (Left)"), item("Dectus Medallion (Right)")],
    }),
  ],
  ["Mt. Gelmir", lock("Mt. Gelmir Lock")],
  ["Volcano Manor Entrance", lock("Volcano Lock")],
  ["Volcano Manor Dungeon", lock("Volcano Lock")],
  ["Subterranean Shunning-Grounds", lock("Sewer Lock")],
  ["Mohgwyn Palace", lock("Mohgwyn Lock")],
  ["Farum Azula", lock("Farum Azula Lock")],
  ["Leyndell, Ashen Capital", lock("Ashen Lock")],
  ["Miquella's Haligtree", lock("Haligtree Lock")],
  // The DLC. Gravesite Plain is locked only when the base game comes first.
  [
    "Gravesite Plain",
    locked({
      kind: "when",
      test: { option: "dlc_start", is: 0 },
      rule: item("Gravesite Lock"),
    }),
  ],
  ["Belurat", lock("Belurat Lock")],
  ["Belurat Swamp", lock("Belurat Lock")],
  ["Castle Ensis", lock("Ensis & Scadu Altus Lock")],
  ["Scadu Altus", lock("Ensis & Scadu Altus Lock")],
  ["Ellac River", lock("Ellac Lock")],
  ["Cerulean Coast", lock("Cerulean & Charo Lock")],
  ["Charo's Hidden Grave", lock("Cerulean & Charo Lock")],
  [
    "Stone Coffin Fissure",
    locked({
      kind: "all",
      rules: [item("Stone Coffin Lock"), area("Scadu Altus")],
    }),
  ],
  ["Jagged Peak Foot", lock("Jagged Peak Lock")],
  ["Rauh Base", lock("Rauh Base Lock")],
  ["Shadow Keep", lock("Shadow Keep Lock")],
  ["Shadow Keep, Church District", lock("Shadow Keep Lock")],
  ["Recluses' River", lock("Recluses' Lock")],
  ["Abyssal Woods", lock("Abyssal Lock")],
  ["Ancient Ruins of Rauh", lock("Ancient Ruins Lock")],
];

/** The region-lock rule on the spots that wait for a lock of their own, by name. */
export const REGION_LOCK_LOCATIONS: readonly (readonly [string, Rule])[] = [
  [
    "BTS|EI/SR: Euporia - outside to SE downstairs, drop down from gazebo, after jump to window, continue down and down",
    lock("Belurat Lock"),
  ],
  ["SK/SKMG: Aspects of the Crucible: Thorns - boss drop", lock("Shadow Keep Lock")],
];
