/*! The base game's rules follow the Elden Ring apworld 0.1.3's set_rules and _key_rules, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

/**
 * ─ Base game rules ─
 *
 * The rules set_rules puts on the base game's ways in: the side dungeons
 * behind imp statues, the legacy dungeons' keys, the great runes, the
 * Mountaintops' medallion, the soft-logic gates, and those a room's options
 * add, for bell bearings, early legacy dungeons and Varré's medal. They're
 * built from the options, in set_rules' order, since several take a count from
 * them. A rule on a region the room doesn't have never applies, which stands
 * in for the apworld's base_enabled check.
 */

import { greatRunes, keyOrShards, type KeyRuleOptions } from "./key-rules.js";
import { isPurebloodMedalRandomized, type RegionGraphOptions } from "../regions/region-graph.js";
import { area, item, location, type Rule, type Weighted } from "../rules.js";

/** The options these rules read, with the apworld's names. */
export interface BaseGameRuleOptions extends RegionGraphOptions, KeyRuleOptions {
  readonly soft_logic: number | boolean;
  readonly great_runes_required_leyndell: number;
  /** 0 for none. */
  readonly great_runes_required_erdtree: number;
  /** 0 for Stonesword Keys, 1 for a master key per region, 2 for one master key. */
  readonly use_master_key: number;
  /** 1 makes each smithing bell bearing needed for the areas after the one it's found in. */
  readonly smithing_bell_bearing_option: number;
  readonly early_legacy_dungeons: number | boolean;
}

const STONESWORD_KEYS: readonly Weighted[] = [
  { item: "Stonesword Key", weight: 1 },
  { item: "Stonesword Key x3", weight: 3 },
  { item: "Stonesword Key x5", weight: 5 },
];

const RADAHN_REMEMBRANCE = "CL/(WD): Remembrance of the Starscourge - mainboss drop";

/** The base game's rules on a region's way in, for a room's options, by the region each leads to. */
export function baseGameEntrances(options: BaseGameRuleOptions): (readonly [string, Rule])[] {
  const keysFor = (needs: number, masterKey: string) => keysOrMasterKey(needs, masterKey, options);
  const rold = keyOrShards("Rold Medallion", options);
  const entrances: (readonly [string, Rule])[] = [
    // _key_rules: each count includes the keys the imp statues before it took.
    ["Fringefolk Hero's Grave", keysFor(3, "Limgrave Master Key")],
    ["Academy Crystal Cave", keysFor(16, "Liurnia Master Key")],
    ["Old Altus Tunnel", keysFor(25, "Altus Master Key")],
    ["Unsightly Catacombs", keysFor(25, "Altus Master Key")],
    ["Gaol Cave", keysFor(28, "Caelid Master Key")],
    ["Seethewater Cave", keysFor(31, "Mt. Gelmir Master Key")],
    ["Spiritcaller Cave", keysFor(41, "Mountaintops Master Key")],
    ["Cave of the Forlorn", keysFor(45, "Snowfield Master Key")],
  ];
  if (options.soft_logic) {
    entrances.push(["Caelid", area("Altus Plateau")]);
  }
  entrances.push(
    ["Wailing Dunes", area("Altus Plateau")],
    ["Stormveil Castle", keyOrShards("Rusty Key", options)],
    ["Raya Lucaria Academy", item("Academy Glintstone Key")],
    ["Carian Study Hall (Inverted)", item("Carian Inverted Statue")],
    ["Nokron, Eternal City Start", location(RADAHN_REMEMBRANCE)],
    ["Deeproot Depths Upper", area("Frenzied Flame Proscription")],
    ["Moonlight Altar", item("Dark Moon Ring")],
    // From Raya Lucaria, an imp statue leads back into the manor's main hall.
    [
      "Volcano Manor",
      { kind: "any", rules: [item("Drawing-Room Key"), area("Volcano Manor Dungeon")] },
    ],
    [
      "Volcano Manor Dungeon",
      { kind: "any", rules: [area("Raya Lucaria Academy Main"), area("Volcano Manor")] },
    ],
    ["Leyndell, Royal Capital", greatRunes(options.great_runes_required_leyndell)],
    ["Mountaintops of the Giants", rold]
  );
  if (options.soft_logic) {
    entrances.push(["Consecrated Snowfield", rold]);
  }
  entrances.push([
    "Hidden Path to the Haligtree",
    {
      kind: "all",
      rules: [
        item("Haligtree Secret Medallion (Left)"),
        item("Haligtree Secret Medallion (Right)"),
      ],
    },
  ]);
  if (options.great_runes_required_erdtree > 0) {
    entrances.push(["Erdtree", greatRunes(options.great_runes_required_erdtree)]);
  }
  if (options.smithing_bell_bearing_option === 1) {
    entrances.push(
      ["Altus Plateau", bellBearings("Smithing-Stone", 1)],
      ["Capital Outskirts", bellBearings("Smithing-Stone", 2)],
      ["Flame Peak", bellBearings("Smithing-Stone", 3)],
      ["Farum Azula Main", bellBearings("Smithing-Stone", 4)],
      ["Dragonbarrow", bellBearings("Somberstone", 1)],
      ["Capital Outskirts", bellBearings("Somberstone", 2)],
      ["Flame Peak", bellBearings("Somberstone", 3)],
      ["Farum Azula Main", bellBearings("Somberstone", 4)],
      ["Leyndell, Ashen Capital", bellBearings("Somberstone", 5)]
    );
    if (options.enable_dlc && options.dlc_start === 0) {
      // Starting in the base game, the DLC takes every bell bearing.
      entrances.push([
        "Gravesite Plain",
        { kind: "all", rules: [bellBearings("Smithing-Stone", 4), bellBearings("Somberstone", 5)] },
      ]);
    }
  }
  // The rules the apworld's soft_logic_enabled guards hold, as it's on whenever it generates.
  if (options.early_legacy_dungeons) {
    const rustyKey = keyOrShards("Rusty Key", options);
    entrances.push(
      ["Liurnia of The Lakes", rustyKey],
      ["Caelid", rustyKey],
      ["Altus Plateau", item("Academy Glintstone Key")]
    );
  }
  entrances.push(...purebloodMedalEntrances(options, rold));
  return entrances;
}

// The rules on Mohgwyn Palace and the DLC's way in that hang on Varré's medal
// and on when Mohgwyn opens. Gravesite Plain asks for Wailing Dunes, and the
// Rold Medallion too when Mohgwyn opens from the Snowfield.
function purebloodMedalEntrances(options: BaseGameRuleOptions, rold: Rule): [string, Rule][] {
  const isBaseFirst = Boolean(options.enable_dlc) && options.dlc_start === 0;
  const snowfield = area("Consecrated Snowfield");
  const dunes = area("Wailing Dunes");
  if (!isPurebloodMedalRandomized(options)) {
    return isBaseFirst
      ? [
          ["Mohgwyn Palace", snowfield],
          ["Gravesite Plain", dunes],
        ]
      : [];
  }
  const medal = item("Pureblood Knight's Medal");
  if (!isBaseFirst) {
    return [["Mohgwyn Palace", { kind: "any", rules: [medal, snowfield] }]];
  }
  if (options.dlc_timing === 2) {
    return [
      ["Mohgwyn Palace", snowfield],
      ["Gravesite Plain", { kind: "all", rules: [rold, dunes] }],
    ];
  }
  const entrances: [string, Rule][] = [
    [
      "Mohgwyn Palace",
      options.dlc_timing === 1 ? { kind: "all", rules: [medal, area("Altus Plateau")] } : medal,
    ],
    ["Gravesite Plain", dunes],
  ];
  // The early medal, another of soft_logic_enabled's rules.
  if (options.dlc_timing === 0 && options.missable_location_behavior <= 1) {
    entrances.push(["Altus Plateau", medal], ["Caelid", medal]);
  }
  return entrances;
}

// The apworld's _bell_bearings_required: every bell bearing of the kind up to this one.
function bellBearings(kind: "Smithing-Stone" | "Somberstone", upTo: number): Rule {
  const bearings = Array.from({ length: upTo }, (_, i) =>
    item(`${kind} Miner's Bell Bearing [${i + 1}]`)
  );
  return { kind: "all", rules: bearings };
}

// The apworld's _choose_key_rules: a master key when the room has them, or else enough Stonesword Keys.
function keysOrMasterKey(needs: number, masterKey: string, options: BaseGameRuleOptions): Rule {
  if (options.use_master_key === 1) {
    return item(masterKey);
  }
  if (options.use_master_key === 2) {
    return item("Stonesword Master Key");
  }
  return { kind: "count", label: "Stonesword Keys", items: STONESWORD_KEYS, needs };
}
