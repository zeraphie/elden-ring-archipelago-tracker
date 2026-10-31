/*! Location groups from the Elden Ring apworld 0.1.4's locations.py, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

// Written by tools/write-location-groups.ts from the apworld's locations.py: run `bun run location-groups` again rather than editing it.

/** What a room's key checks and rules need to know of a location. */
export interface LocationGroups {
  /** The groups a host can exclude it by. */
  readonly groups: readonly string[];
  /** Whether the apworld counts it missable, which keeps it out of the priority set. */
  readonly isMissable?: true;
  /** The region it sits in: the apworld's location table it's listed in. */
  readonly region: string;
}

/** Each location's groups and region, by its Archipelago name. */
export const LOCATION_GROUPS: ReadonlyMap<string, LocationGroups> = new Map<string, LocationGroups>(
  [
    [
      "SV/GG: Ancient Dragon Smithing Stone - Gostoc shop after finishing Nepheli and Kenneth Haight's quests",
      { groups: [], isMissable: true, region: "Stormveil Throne" },
    ],
    [
      "SV/GG: Ancient Dragon Smithing Stone - talk to Nepheli in SV after her and Kenneth's questlines",
      { groups: [], isMissable: true, region: "Stormveil Throne" },
    ],
    [
      "SV/GG: Spectral Steed Regalia: Tree Sentinel - to NW in chest to right of throne",
      { groups: [], region: "Stormveil Throne" },
    ],
    [
      "SV/LL: Shabriri Grape - from LL/LFC to E, inside by ghost",
      { groups: [], region: "Stormveil Throne" },
    ],
    [
      "SV/RT: Ash of War: Spinning Weapon - Rogier shop, in church or RH later",
      { groups: [], isMissable: true, region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Ash of War: Glintstone Pebble - Rogier shop, in church or RH later",
      { groups: [], isMissable: true, region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Ash of War: Carian Greatsword - Rogier shop, in church or RH later",
      { groups: [], isMissable: true, region: "Stormveil Castle" },
    ],
    ["SV/SeC: Godrick's Great Rune - mainboss drop", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/RT: Iron Whetblade - shortcut elevator to SE, to N through door, behind imp statue",
      { groups: ["Out of the Way"], region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Cracked Pot - to SW in dead-end, left corner",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Cracked Pot - to SW in dead-end, right corner",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Nomadic Warrior's Cookbook [10] - from grace go outside, jump to roof to E, cross skinny roof then jump down to NE, on wood platform across bridge",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/SMG: Silver-Pickled Fowl Foot - kill Gostoc",
      { groups: [], isMissable: true, region: "Stormveil Castle" },
    ],
    [
      "SV/SMG: Glass Shard - kill Gostoc",
      { groups: [], isMissable: true, region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Remembrance of the Grafted - mainboss drop",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Ash of War: Storm Assault - jump off raise part of outer wall to NW, scarab after breakable platform",
      { groups: ["Scarab"], region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Ash of War: Stormcaller - scarab to SW",
      { groups: ["Scarab"], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Rancorcall - shortcut door to W, scarab at bottom to S",
      { groups: ["Scarab"], region: "Stormveil Castle" },
    ],
    ['SV/LC: "Prophecy" Painting - in a room to S', { groups: [], region: "Stormveil Castle" }],
    [
      "SV/LC: Wooden Greatshield - in wooden structure NE side of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Hawk Crest Wooden Shield - shortcut elevator to SE, to N through door, behind imp statue",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Miséricorde - shortcut elevator to SE, to N through door, behind imp statue",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/StC: Brick Hammer - follow outside wood walkway at top of big long room",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Gold-Pickled Fowl Foot - shortcut elevator to SE, to NE right of painting, up stairs to SE room, jump over wall with sandbags",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Festering Bloody Finger x3 - from grace go outside, jump to roof to E, cross skinny roof then jump down to NE, down ladder, top of next ladder",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Arrow x10 - from grace go outside, jump to roof to E, cross skinny roof then jump down to NE, down ladder x2, top of ladder",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Raw Meat Dumpling - enemy drop to SW in dead-end",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Living Jar Shard - enemy drop to SW in dead-end",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LTB: Somber Smithing Stone [1] - enemy drop to SW",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/LTB: Beast Blood - enemy drop to SW", { groups: [], region: "Stormveil Castle" }],
    ["SV/LTB: Old Fang x2 - enemy drop to SW", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/SeC: Manor Towershield - to SW above, under stairs in interior",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/StC: Silver-Pickled Fowl Foot - by big long room top exit",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Golden Seed - shortcut door to W, enemy drop after one way at bottom",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/StC: Fire Grease - on top rafters of big long room",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Claw Talisman - from grace go outside, jump to roof to E, climb broken pillar to roof area, atop tower",
      { groups: ["Hidden"], region: "Stormveil Castle" },
    ],
    [
      "SV/StC: Arteria Leaf x3 - after big long room exit, go up stairs and drop down to S, follow path, in hole",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Throwing Dagger x5 - across top of long elevator",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/StC: Mushroom x3 - after big long room exit, on lower ledge before elevator room",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Drawstring Fire Grease x2 - by very tall elevator lever",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Golden Rune [2] - roof above long elevator",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Aspects of the Crucible: Horns - jump off raise part of outer wall to NW, enemy drop after breakable platform to SE",
      { groups: ["Out of the Way"], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Somber Smithing Stone [2] - jump off raise part of outer wall to NW, after breakable platform to SE",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Smithing Stone [2] - follow outer wall, in dead-end with ton of barrels",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Marred Wooden Shield - jump off raise part of outer wall to NW, at end of thin walkway",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/RT: Golden Rune [2] - top of church roof", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/RT: Highland Axe - shortcut elevator to SE, to NE by painting",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/RT: Kukri x5 - on lower side roof of church", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/RT: Golden Rune [2] x2 - from grace go outside, jump to roof to E, in room below",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Stonesword Key - shortcut elevator to SE, to NE, right of painting, up stairs to SE room, jump over wall with sandbags, follow path up ladder and drop down, on corpse",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Exalted Flesh - shortcut elevator to SE, to NE, right of painting, under wood platform",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Lump of Flesh - shortcut elevator to SE, to SE under dead troll",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Golden Rune [1] - shortcut elevator to SE, to SE under dead troll",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Smithing Stone [2] x2 - from grace go outside, jump to roof to E, follow ledge to S",
      { groups: ["Hidden"], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Arrow x10 - shortcut elevator to SE, to NE room left of painting, second floor",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Fireproof Dried Liver - in storeroom SE of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Chrysalids' Memento - shortcut elevator to SE, to SE under dead troll",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Crimson Hood - shortcut elevator to SE, to SE under dead troll, after Roderika becomes a spirit tuner",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Stanching Boluses - shortcut elevator to SE, SE side of room with hanging arms",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Stonesword Key - parkour from roof above long elevator, to E, fall into tower",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/GC: Smithing Stone [1] - on raised platform to NW",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/SMG: Golden Rune [1] - next to main gate", { groups: [], region: "Stormveil Castle" }],
    ["SV/SMG: Golden Rune [2] - next to main gate", { groups: [], region: "Stormveil Castle" }],
    ["SV/SMG: Ballista Bolt x5 - next to main gate", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/GC: Arbalest - in castle wall area above stairs with cliffs, climb cliff, jump across",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/GC: Commoner's Simple Garb - outside to SE", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/LC: Golden Rune [2] - top of massive courtyard entrance ramp",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/GC: Golden Rune [5] - next to grace", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/GC: Smithing Stone [2] - on raised platform to NW",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Golden Rune [4] - from grace go outside, jump to roof to E, cross skinny roof then jump down to NE, down ladder x3, on corpse",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Fire Arrow x12 - in wooden structure W side of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/LC: Pike - middle of massive courtyard", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/LC: Furlcalling Finger Remedy - on stairs to massive courtyard to SE",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Smithing Stone [1] x2 - corpse overlooking pit to S",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Smoldering Butterfly x5 - middle of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/GC: Golden Rune [4] - on ramp just before massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Golden Rune [1] - middle of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Mushroom x8 - hidden under stairs to massive courtyard to SE",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Golden Rune [2] - middle of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Magic Grease - middle of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Smithing Stone [2] - on walkway above N of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Golden Rune [2] - just outside Nepheli's room to E",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/SeC: Golden Seed - seedtree to SE", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/SeC: Smithing Stone [2] - down dark alley to SE",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Stormhawk Axe - kill Nepheli",
      { groups: [], isMissable: true, region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Smithing Stone [1] x4 - in Nepheli's room to E",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Golden Rune [5] - outside shortcut door to W, on outer wall through door",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Smithing Stone [1] x5 - breakable statue in massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Smithing Stone [2] - breakable statue in massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/SeC: Kukri x8 - to SW on wood walkway above", { groups: [], region: "Stormveil Castle" }],
    [
      "SV/SeC: Smithing Stone [2] x3 - to SW on wood walkway above after ledge walk",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Lump of Flesh x3 - to SW on wood walkway above after ledge walk head to SE and jump down",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Smithing Stone [1] - to SW above before interior",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Golden Rune [2] - to SW above before interior",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/SeC: Smithing Stone [3] - to SW above after interior",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Rainbow Stone x5 - just outside shortcut door to W",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Smithing Stone [2] x2 - shortcut door to W, below on small arch",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Arteria Leaf - shortcut door to W, to S in dead-end",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Golden Rune [2] - shortcut door to W, at bottom",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Poisonbloom x3 - shortcut door to W, at bottom to S",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Smoldering Butterfly x3 - shortcut door to W, after one way at bottom",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Stonesword Key - shortcut door to W, after one way at bottom",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Throwing Dagger x8 - shortcut door to W, after one way at bottom",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Prince of Death's Pustule - shortcut door to W, after one way at bottom, next to face",
      { groups: ["Out of the Way"], region: "Stormveil Castle" },
    ],
    [
      "SV/GC: Kukri x5 - in arch on way to massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Pickled Turtle Neck x3 - shortcut elevator to SE, to NE, right of painting, up stairs to SE room, jump over wall with sandbags, follow path up ladder and drop down, in chest",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Godslayer's Seal - left chest behind imp statue in storeroom SE of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Mimic's Veil - shortcut elevator to SE, to NE, right of painting, up stairs to SE room in chest",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/RT: Somber Smithing Stone [2] - shortcut elevator to SE, to N through door",
      { groups: [], region: "Stormveil Castle" },
    ],
    [
      "SV/LC: Godskin Prayerbook - right chest behind imp statue in storeroom SE of massive courtyard",
      { groups: [], region: "Stormveil Castle" },
    ],
    ["SV/CT: Talisman Pouch - boss drop", { groups: [], region: "Stormhill" }],
    [
      "LG/SB: Exalted Flesh - help Alexander to S",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/SB: Warrior Jar Shard - kill Alexander to S",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    ["LG/(WS): Beast Champion Helm - kill Bernahl", { groups: [], region: "Stormhill" }],
    ["LG/(WS): Beast Champion Gauntlets - kill Bernahl", { groups: [], region: "Stormhill" }],
    ["LG/(WS): Beast Champion Greaves - kill Bernahl", { groups: [], region: "Stormhill" }],
    ["LG/(WS): Beast Champion Armor (Altered) - kill Bernahl", { groups: [], region: "Stormhill" }],
    [
      "LG/(WS): Ash of War: Impaling Thrust - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(WS): Ash of War: Spinning Slash - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(WS): Ash of War: Stamp (Upward Cut) - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(WS): Ash of War: Storm Blade - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(WS): Ash of War: Parry - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(WS): Ash of War: No Skill - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(WS): Ash of War: Kick - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(WS): Ash of War: War Cry - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(WS): Ash of War: Endure - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(WS): Ash of War: Quickstep - Bernahl shop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/SV: Smithing Stone [1] - S of first SV boss arena W side",
      { groups: [], region: "Stormhill" },
    ],
    [
      "LG/SV: Nomadic Warrior's Cookbook [7] - E of SV on broken bridge",
      { groups: [], region: "Stormhill" },
    ],
    [
      "LG/SV: Ash of War: Storm Wall - scarab E of SV after broken bridge",
      { groups: ["Scarab"], region: "Stormhill" },
    ],
    [
      "LG/(SS): Spirit Jellyfish Ashes - talk to Roderika 4 times",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/(SS): Golden Seed - give Roderika Chrysalids' Memento then talk to her at RH, or after SV mainboss item is at SS",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/SS: Ash of War: Wild Strikes - scarab NW of SS",
      { groups: ["Scarab"], region: "Stormhill" },
    ],
    [
      "LG/SV: Magic Grease x3 - S of first SV boss arena E side item 1",
      { groups: [], region: "Stormhill" },
    ],
    ["LG/SS: Smithing Stone [1] x3 - SE of SS", { groups: [], region: "Stormhill" }],
    ["LG/(SS): Stonesword Key - near grace", { groups: [], region: "Stormhill" }],
    [
      "LG/SV: Godrick Soldier Ashes - S of first SV boss arena E side item 2",
      { groups: [], region: "Stormhill" },
    ],
    ["LG/SS: Golden Seed - seedtree SE of SS", { groups: [], region: "Stormhill" }],
    [
      "LG/SV: Bloodrose x3 - S of first SV boss arena E side item 3",
      { groups: [], region: "Stormhill" },
    ],
    ["LG/SS: Lump of Flesh - under bridge NW of SS", { groups: [], region: "Stormhill" }],
    [
      "LG/(SE): Aspects of the Crucible: Tail - boss drop Evergaol",
      { groups: [], region: "Stormhill" },
    ],
    ["LG/(SGa): Arrow's Reach Talisman - chest above gate", { groups: [], region: "Stormhill" }],
    [
      "LG/WS: Blue-Feathered Branchsword - night boss drop SE of WS",
      { groups: [], region: "Stormhill" },
    ],
    ["LG/(WS): Bone Peddler's Bell Bearing - night boss drop", { groups: [], region: "Stormhill" }],
    [
      "LG/WS: Strength-knot Crystal Tear - in basin on cliff NW of WS",
      { groups: [], region: "Stormhill" },
    ],
    [
      "LG/WS: Somber Smithing Stone [1] - scarab on ruin NE of WS",
      { groups: ["Scarab"], region: "Stormhill" },
    ],
    ["LG/WS: Lance - on ruin in enemy camp NE of WS", { groups: [], region: "Stormhill" }],
    ["LG/LC: Scaled Helm - invade Istvan SE of colo", { groups: [], region: "Stormhill" }],
    ["LG/LC: Scaled Armor - invade Istvan SE of colo", { groups: [], region: "Stormhill" }],
    ["LG/LC: Scaled Gauntlets - invade Istvan SE of colo", { groups: [], region: "Stormhill" }],
    ["LG/LC: Scaled Greaves - invade Istvan SE of colo", { groups: [], region: "Stormhill" }],
    [
      "LG/LC: Hammer Talisman - invader drop",
      { groups: [], isMissable: true, region: "Stormhill" },
    ],
    [
      "LG/WS: Beast Crest Heater Shield - chest within enemy camp NE of WS",
      { groups: [], region: "Stormhill" },
    ],
    ["LG/LC: Duelist's Furled Finger - by colo door", { groups: [], region: "Stormhill" }],
    ["LG/LC: Small Red Effigy - by colo door", { groups: [], region: "Stormhill" }],
    ["LG/DC: Lance Talisman - NE of DC", { groups: ["Hidden"], region: "Stormhill" }],
    [
      "SV/SMG: Caestus - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Buckler - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Great Arrow x5 - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Ballista Bolt x5 - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Bandit Manchettes - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Bandit Boots - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Bandit Garb - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Festering Bloody Finger x2 - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Furlcalling Finger Remedy x4 - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Silver-Pickled Fowl Foot x3 - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Ruin Fragment x5 - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Stormhawk Feather x5 - Gostoc shop, after dark room or mainboss",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Grace Mimic - talk to Gostoc in stalking spot, to SE and above SC grace",
      { groups: [], isMissable: true, region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Furlcalling Finger Remedy - down stairs to NE",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Fire Grease x2 - down stairs to NE, then drop to wood platform, at end of tunnel",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Marred Leather Shield - on wood walkway to N",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Golden Rune [1] - after room with Gostoc, on corpse",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Bolt x10 - backtrack from SC to lower area then head E, then N",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Smithing Stone [3] - backtrack from SC to lower area then head SW",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/SMG: Ruin Fragment x3 - after room with Gostoc, on ledge",
      { groups: [], region: "Stormveil Start" },
    ],
    ["SV/SMG: Smithing Stone [2] - climb broken wall", { groups: [], region: "Stormveil Start" }],
    [
      "SV/StC: Golden Rune [2] - on curved wood walkway to N",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Hookclaws - NW on bottom layer of big long room",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Throwing Dagger x5 - beside Rusty Key door in big long room",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Smoldering Butterfly x3 - tight corridor middle of big long room",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Rusty Key - corpse in dark room",
      { groups: ["Out of the Way"], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Curved Sword Talisman - in chest in dark room",
      { groups: ["Out of the Way"], region: "Stormveil Start" },
    ],
    [
      "SV/StC: St. Trina's Arrow x10 - on hole in outer wall middle of big long room",
      { groups: [], region: "Stormveil Start" },
    ],
    [
      "SV/StC: Golden Rune [2] - on dropdown platform middle of big long room",
      { groups: [], region: "Stormveil Start" },
    ],
    ["LG/(SGr): Tarnished's Furled Finger - beside grace", { groups: [], region: "Limgrave" }],
    ["LG/(SGr): Finger Severer - beside grace", { groups: [], region: "Limgrave" }],
    [
      "LG/MO: Golden Seed - kill Kenneth Haight",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    [
      "LG/MO: Erdsteel Dagger - kill FH enemy, Kenneth Haight to NE",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    ["LG/ALN: Mushroom x10 - Boc to SE", { groups: [], isMissable: true, region: "Limgrave" }],
    [
      "LG/(FHE): Somber Smithing Stone [2] - Blaidd reward Evergaol",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    [
      "LG/(WR): Glintstone Cometshard - Conspectus Scroll",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    [
      "LG/(WR): Star Shower - Conspectus Scroll",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    [
      "LG/(WR): Glintblade Phalanx - Royal House Scroll",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    [
      "LG/(WR): Carian Slicer - Royal House Scroll",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    [
      "LG/(WR): Great Glintstone Shard - Academy Scroll",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    [
      "LG/(WR): Swift Glintstone Shard - Academy Scroll",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    ["LG/(WR): Glintstone Pebble - Sellen Shop", { groups: [], region: "Limgrave" }],
    ["LG/(WR): Glintstone Stars - Sellen Shop", { groups: [], region: "Limgrave" }],
    ["LG/(WR): Crystal Barrage - Sellen Shop", { groups: [], region: "Limgrave" }],
    ["LG/(WR): Glintstone Arc - Sellen Shop", { groups: [], region: "Limgrave" }],
    ["LG/(WR): Scholar's Armament - Sellen Shop", { groups: [], region: "Limgrave" }],
    ["LG/(WR): Scholar's Shield - Sellen Shop", { groups: [], region: "Limgrave" }],
    [
      "LG/(WR): Starlight Shards - given by Sellen after you show her Stars of Ruin",
      { groups: [], isMissable: true, region: "Limgrave" },
    ],
    [
      "LG/SR: Haligdrake Talisman - cave entrance lower beach to NW",
      { groups: ["Out of the Way"], region: "Limgrave" },
    ],
    ["LG/CC: Broadsword - Nomadic Merchant SE of CC", { groups: [], region: "Limgrave" }],
    ["LG/CC: Club - Nomadic Merchant SE of CC", { groups: [], region: "Limgrave" }],
    ["LG/CC: Iron Roundshield - Nomadic Merchant SE of CC", { groups: [], region: "Limgrave" }],
    ["LG/CC: Shortbow - Nomadic Merchant SE of CC", { groups: [], region: "Limgrave" }],
    [
      "LG/CC: Neutralizing Boluses x5 - Nomadic Merchant SE of CC",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/CC: Stanching Boluses x3 - Nomadic Merchant SE of CC", { groups: [], region: "Limgrave" }],
    [
      "LG/CC: Stimulating Boluses x2 - Nomadic Merchant SE of CC",
      { groups: [], region: "Limgrave" },
    ],
    [
      "LG/CC: Note: Stonedigger Trolls - Nomadic Merchant SE of CC",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/CC: Note: Land Squirts - Nomadic Merchant SE of CC", { groups: [], region: "Limgrave" }],
    [
      "LG/CC: Armorer's Cookbook [2] - Nomadic Merchant SE of CC",
      { groups: [], region: "Limgrave" },
    ],
    [
      "LG/CC: Smithing Stone [1] x3 - Nomadic Merchant SE of CC",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/CC: Land Octopus Ovary - NW of CC along beach", { groups: [], region: "Limgrave" }],
    [
      "LG/CC: Ash of War: Stamp (Sweep) - scarab NW of CC along beach",
      { groups: ["Scarab"], region: "Limgrave" },
    ],
    ["LG/CC: Strip of White Flesh - NW of CC along beach", { groups: [], region: "Limgrave" }],
    ["LG/SC: Starlight Shards - cliff above W of SC", { groups: [], region: "Limgrave" }],
    ["LG/SR: Lump of Flesh x3 - lower beach to W", { groups: [], region: "Limgrave" }],
    ["LG/CC: Gold-Pickled Fowl Foot - SE of CC along beach", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Crafting Kit - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Torch - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Large Leather Shield - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Chain Coif - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Chain Armor - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Gauntlets - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Chain Leggings - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Furlcalling Finger Remedy x5 - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Telescope - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Note: Flask of Wondrous Physick - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Note: Waypoint Ruins - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Nomadic Warrior's Cookbook [1] - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Nomadic Warrior's Cookbook [2] - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Missionary's Cookbook [1] - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Cracked Pot x3 - Kalé Shop", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Spirit Calling Bell - talk to Ranni", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Lone Wolf Ashes - talk to Ranni", { groups: [], region: "Limgrave" }],
    ["LG/TFS: Golden Halberd - first field boss", { groups: [], region: "Limgrave" }],
    [
      "LG/SGr: Silver-Pickled Fowl Foot x2 - hidden drop down behind SGr entrance",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/(CE): Golden Rune [2] - out front", { groups: [], region: "Limgrave" }],
    ["LG/CE: Golden Rune [1] - E of CE", { groups: [], region: "Limgrave" }],
    ["LG/DBR: Smithing Stone [1] - W of DBR", { groups: [], region: "Limgrave" }],
    ["LG/(CE): Smithing Stone [1] - on anvil", { groups: [], region: "Limgrave" }],
    ["LG/(GR): Whetstone Knife - underground chest", { groups: [], region: "Limgrave" }],
    ["LG/(GR): Map: Limgrave, West - map pillar", { groups: [], region: "Limgrave" }],
    ["LG/(GR): Ruin Fragment x3 - S of NW caravan", { groups: [], region: "Limgrave" }],
    ["LG/GC: Kukri x4 - E of GC", { groups: [], region: "Limgrave" }],
    ["LG/(GR): Flail - in NE caravan chest", { groups: [], region: "Limgrave" }],
    ["LG/(GR): Lordsworn's Greatsword - in NW caravan chest", { groups: [], region: "Limgrave" }],
    ["LG/(GR): Ash of War: Storm Stomp - underground chest", { groups: [], region: "Limgrave" }],
    ["LG/WS: Beast Liver - SE of WS", { groups: [], region: "Limgrave" }],
    ["LG/(SGa): Golden Rune [1] - lower area", { groups: [], region: "Limgrave" }],
    ["LG/WS: Fire Arrow x5 - W of WS", { groups: [], region: "Limgrave" }],
    ["LG/WS: Golden Rune [5] - graveyard SW of WS", { groups: [], region: "Limgrave" }],
    ["LG/WS: Golden Rune [1] 1 - graveyard SW of WS", { groups: [], region: "Limgrave" }],
    ["LG/WS: Golden Rune [3] - graveyard SW of WS", { groups: [], region: "Limgrave" }],
    ["LG/WS: Golden Rune [2] 1 - graveyard SW of WS", { groups: [], region: "Limgrave" }],
    ["LG/WS: Golden Rune [1] 2 - graveyard SW of WS", { groups: [], region: "Limgrave" }],
    ["LG/WS: Golden Rune [2] 2 - graveyard SW of WS", { groups: [], region: "Limgrave" }],
    ["LG/WS: Golden Rune [1] 3 - graveyard SW of WS", { groups: [], region: "Limgrave" }],
    ["LG/WS: Golden Rune [1] 4 - graveyard SW of WS", { groups: [], region: "Limgrave" }],
    ["LG/(SGa): Golden Rune [2] - off side of ruin above", { groups: [], region: "Limgrave" }],
    ["LG/(SGa): Lump of Flesh - lower area", { groups: [], region: "Limgrave" }],
    ["LG/(SGa): Smoldering Butterfly x5 - on cliff above", { groups: [], region: "Limgrave" }],
    [
      "LG/WS: Smithing Stone [1] x5 - breakable statue SE of WS",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/WS: Smithing Stone [2] - breakable statue SE of WS", { groups: [], region: "Limgrave" }],
    ["LG/SR: Crab Eggs - to S", { groups: [], region: "Limgrave" }],
    ["LG/SR: Golden Rune [1] - to N", { groups: [], region: "Limgrave" }],
    ["LG/SR: Slumbering Egg - to E on ruin", { groups: [], region: "Limgrave" }],
    [
      "LG/SR: Ash of War: Gravitas - enemy drop lower beach to NW",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/DBR: Dragon Heart - boss drop N of DBR", { groups: [], region: "Limgrave" }],
    [
      'LG/SR: Incantation Scarab - "Homing Instinct" Painting reward to NW',
      { groups: [], region: "Limgrave" },
    ],
    ["LG/(DBR): Stonesword Key - within ruined building", { groups: [], region: "Limgrave" }],
    ["LG/(DBR): Golden Rune [2] - within ruins", { groups: [], region: "Limgrave" }],
    ["LG/(DBR): Crab Eggs - within ruins", { groups: [], region: "Limgrave" }],
    ["LG/DBR: Arteria Leaf - NE of DBR", { groups: [], region: "Limgrave" }],
    [
      "LG/(DBR): Twinblade - underground chest hidden within ruin",
      { groups: [], region: "Limgrave" },
    ],
    [
      "LG/ALN: Ash of War: Determination - scarab to SE",
      { groups: ["Scarab"], region: "Limgrave" },
    ],
    ["LG/MCV: Reduvia - invader drop E of MCV", { groups: [], region: "Limgrave" }],
    ["LG/ALN: Smithing Stone [1] - bridge to SE", { groups: [], region: "Limgrave" }],
    ["LG/ALN: Fire Grease - under bridge to SE", { groups: [], region: "Limgrave" }],
    ["LG/ALN: Arteria Leaf - to SE", { groups: [], region: "Limgrave" }],
    [
      "LG/ALN: Ash of War: Repeating Thrust - night boss drop to SE",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/MCO: Armorer's Cookbook [1] - to SW", { groups: [], region: "Limgrave" }],
    ["LG/SB: Smithing Stone [1] - to S", { groups: [], region: "Limgrave" }],
    ["LG/MCO: Golden Rune [2] - to W", { groups: [], region: "Limgrave" }],
    ["LG/WS: Exalted Flesh - enemy camp NE of WS", { groups: [], region: "Limgrave" }],
    ["LG/SB: Smithing Stone [1] x2 - on bridge to E", { groups: [], region: "Limgrave" }],
    ["LG/HC: Turtle Neck Meat - N above HC", { groups: [], region: "Limgrave" }],
    ["LG/DC: Golden Rune [3] - E of DC", { groups: [], region: "Limgrave" }],
    ["LG/WS: Ash of War: Golden Vow - enemy drop NE of WS", { groups: [], region: "Limgrave" }],
    [
      "LG/DC: Soporific Grease x3 - above on the pillar of divine bridge N of DC",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/(BS): Stonesword Key - behind wooden platform", { groups: [], region: "Limgrave" }],
    [
      "LG/(BS): Smithing Stone [1] x3 - corpse hanging off edge",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/FHE: Ruin Fragment x3 - SW of Evergaol", { groups: [], region: "Limgrave" }],
    ["LG/FHE: Large Club - S of Evergaol", { groups: [], region: "Limgrave" }],
    ["LG/(FHE): Bloodhound's Fang - boss drop Evergaol", { groups: [], region: "Limgrave" }],
    ["LG/ALS: Golden Rune [2] - to S", { groups: [], region: "Limgrave" }],
    ["LG/ALS: Royal House Scroll - to E on ruin", { groups: [], region: "Limgrave" }],
    ["LG/ALS: Golden Rune [1] - to E", { groups: [], region: "Limgrave" }],
    ["LG/ALS: Sliver of Meat - to W", { groups: [], region: "Limgrave" }],
    ["LG/ALS: Crab Eggs - to NW", { groups: [], region: "Limgrave" }],
    ["LG/ALS: Golden Rune [1] - to SE high on cliff", { groups: [], region: "Limgrave" }],
    ["LG/ALS: Starlight Shards - to SE high on cliff", { groups: [], region: "Limgrave" }],
    ["LG/ALS: Larval Tear - transforming enemy to E", { groups: [], region: "Limgrave" }],
    ["LG/ALS: Great Épée - to E in chest", { groups: [], region: "Limgrave" }],
    [
      "LG/(WR): Sellian Sealbreaker - given by Sellen after you show her Comet Azur",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/ALS: Ash of War: Unsheathe - scarab to NW", { groups: ["Scarab"], region: "Limgrave" }],
    ["LG/(WR): Glowstone x2 - within ruins", { groups: [], region: "Limgrave" }],
    ["LG/(WR): Golden Rune [1] - within ruins", { groups: [], region: "Limgrave" }],
    ["LG/(WR): Immunizing Cured Meat - within ruins", { groups: [], region: "Limgrave" }],
    ["LG/WR: Smoldering Butterfly x4 - SW of WR", { groups: [], region: "Limgrave" }],
    ["LG/ALN: Somber Smithing Stone [1] - after bridge to SE", { groups: [], region: "Limgrave" }],
    ["LG/(WR): Trina's Lily x4 - on ruin wall", { groups: [], region: "Limgrave" }],
    ["LG/WR: Greataxe - in caravan chest W of WR", { groups: [], region: "Limgrave" }],
    ["LG/WR: Golden Rune [1] 1 - graveyard S of WR", { groups: [], region: "Limgrave" }],
    ["LG/WR: Golden Rune [1] 2 - graveyard S of WR", { groups: [], region: "Limgrave" }],
    ["LG/WR: Golden Rune [2] - graveyard S of WR", { groups: [], region: "Limgrave" }],
    ["LG/WR: Golden Rune [1] 3 - graveyard S of WR", { groups: [], region: "Limgrave" }],
    ["LG/WR: Golden Rune [3] - graveyard S of WR", { groups: [], region: "Limgrave" }],
    ["LG/WR: Glintstone Staff - enemy drop S of WR under ruin", { groups: [], region: "Limgrave" }],
    ["LG/MR: Golden Rune [1] - N of MR", { groups: [], region: "Limgrave" }],
    ["LG/MR: Sacrificial Twig - W of MR", { groups: [], region: "Limgrave" }],
    ["LG/WR: Gold-Pickled Fowl Foot - NW of WR", { groups: [], region: "Limgrave" }],
    [
      "LG/AS: Somber Smithing Stone [1] - scarab W of AS",
      { groups: ["Scarab"], region: "Limgrave" },
    ],
    ['LG/(AS): "Homing Instinct" Painting - painting', { groups: [], region: "Limgrave" }],
    ["LG/(AS): Smithing Stone [1] - on corpse", { groups: [], region: "Limgrave" }],
    ["LG/MCO: Poisonbloom x2 - NE of MCO", { groups: [], region: "Limgrave" }],
    ["LG/SB: Golden Rune [1] - past bridge to SE", { groups: [], region: "Limgrave" }],
    ["LG/SB: Short Sword - Nomadic Merchant to E", { groups: [], region: "Limgrave" }],
    ["LG/SB: Halberd - Nomadic Merchant to E", { groups: [], region: "Limgrave" }],
    ["LG/SB: Bandit Mask - Nomadic Merchant to E", { groups: [], region: "Limgrave" }],
    ["LG/SB: Pickled Turtle Neck x3 - Nomadic Merchant to E", { groups: [], region: "Limgrave" }],
    ["LG/SB: Note: Flame Chariots - Nomadic Merchant to E", { groups: [], region: "Limgrave" }],
    [
      "LG/SB: Nomadic Warrior's Cookbook [3] - Nomadic Merchant to E",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/SB: Cracked Pot - Nomadic Merchant to E", { groups: [], region: "Limgrave" }],
    ["LG/SB: Smithing Stone [1] x3 - Nomadic Merchant to E", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Rune [1] - beach to SW", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Rune [1] 1 - graveyard to SW", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Rune [4] - graveyard to SW", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Rune [3] - graveyard to SW", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Rune [2] 1 - graveyard to SW", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Rune [1] 2 - graveyard to SW", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Rune [2] 2 - graveyard to SW", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Rune [1] 3 - graveyard to SW", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Rune [1] 4 - graveyard to SW", { groups: [], region: "Limgrave" }],
    ["LG/ME: Hand Axe - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    ["LG/ME: Riveted Wooden Shield - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    ["LG/ME: Blue-Gold Kite Shield - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    ["LG/ME: St. Trina's Arrow x10 - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    [
      "LG/ME: Festering Bloody Finger x5 - Nomadic Merchant S of ME",
      { groups: [], region: "Limgrave" },
    ],
    [
      "LG/ME: Armorer's Cookbook [3] - Nomadic Merchant S of ME",
      { groups: [], region: "Limgrave" },
    ],
    [
      "LG/ME: Nomadic Warrior's Cookbook [5] - Nomadic Merchant S of ME",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/ME: Smithing Stone [1] x3 - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    ["LG/ME: Sliver of Meat x5 - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    ["LG/ME: Beast Liver x5 - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    ["LG/ME: Lump of Flesh x3 - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    ["LG/ME: Trina's Lily x3 - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    ["LG/ME: Hefty Scimitar - Nomadic Merchant S of ME", { groups: [], region: "Limgrave" }],
    ["LG/SRW: Map: Limgrave, East - map pillar W of SRW", { groups: [], region: "Limgrave" }],
    [
      "LG/ME: Greenspill Crystal Tear - in basin, Minor Erdtree",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/ME: Spiked Cracked Tear - in basin, Minor Erdtree", { groups: [], region: "Limgrave" }],
    ["LG/SRW: Nomadic Warrior's Cookbook [4] - W of SRW", { groups: [], region: "Limgrave" }],
    ["LG/ME: Ash of War: Ground Slam - scarab W of ME", { groups: ["Scarab"], region: "Limgrave" }],
    ["LG/(MR): Golden Rune [2] - within ruins", { groups: [], region: "Limgrave" }],
    ["LG/(MR): Smithing Stone [2] - chest in ruins", { groups: [], region: "Limgrave" }],
    ["LG/MO: Golden Rune [1] - on ruin to SW", { groups: [], region: "Limgrave" }],
    ["LG/ME: Thin Beast Bones x3 - W of ME", { groups: [], region: "Limgrave" }],
    ["LG/MO: Gold-Tinged Excrement x5 - to SE", { groups: [], region: "Limgrave" }],
    ["LG/MO: Throwing Dagger x5 - to SE", { groups: [], region: "Limgrave" }],
    ["LG/MO: Golden Rune [5] - to SE", { groups: [], region: "Limgrave" }],
    ["LG/(MR): Axe Talisman - chest underground", { groups: [], region: "Limgrave" }],
    ["LG/SWVO: Fevor's Cookbook [1] - graveyard to S", { groups: [], region: "Limgrave" }],
    ["LG/MO: Magic Grease - to NE", { groups: [], region: "Limgrave" }],
    ["LG/SWVO: Golden Rune [1] 1 - graveyard to S", { groups: [], region: "Limgrave" }],
    ["LG/SWVO: Golden Rune [1] 2 - graveyard to S", { groups: [], region: "Limgrave" }],
    ["LG/SWVO: Golden Rune [1] 3 - graveyard to S", { groups: [], region: "Limgrave" }],
    ["LG/SWVO: Golden Rune [2] - graveyard to S", { groups: [], region: "Limgrave" }],
    ["LG/SWVO: Golden Rune [4] 1 - graveyard to S", { groups: [], region: "Limgrave" }],
    ["LG/SWVO: Golden Rune [4] 2 - graveyard to S", { groups: [], region: "Limgrave" }],
    ["LG/SWVO: Golden Rune [6] - graveyard to S", { groups: [], region: "Limgrave" }],
    ["LG/(SWV): Deathroot - boss drop", { groups: [], region: "Limgrave" }],
    ["LG/(SWV): Skeletal Militiaman Ashes - boss drop", { groups: [], region: "Limgrave" }],
    ["LG/SWV: Golden Rune [4] - ruins NE of SWV", { groups: [], region: "Limgrave" }],
    ["LG/(SWV): Mushroom x3 - within ruins", { groups: [], region: "Limgrave" }],
    [
      "LG/SWV: Smithing Stone [2] - to E, down cliff middle of pond",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/SWV: Golden Rune [1] 1 - graveyard SE of SWV", { groups: [], region: "Limgrave" }],
    ["LG/SWV: Golden Rune [1] 2 - graveyard SE of SWV", { groups: [], region: "Limgrave" }],
    ["LG/SWV: Golden Rune [1] 3 - graveyard SE of SWV", { groups: [], region: "Limgrave" }],
    ["LG/SWV: Golden Rune [1] 4 - graveyard SE of SWV", { groups: [], region: "Limgrave" }],
    ["LG/SWV: Golden Rune [5] - graveyard SE of SWV", { groups: [], region: "Limgrave" }],
    ["LG/SWV: Golden Rune [2] - graveyard SE of SWV", { groups: [], region: "Limgrave" }],
    ["LG/SWV: Golden Rune [1] 5 - graveyard SE of SWV", { groups: [], region: "Limgrave" }],
    [
      "LG/(SWV): Green Turtle Talisman - behind imp statue",
      { groups: ["Out of the Way"], region: "Limgrave" },
    ],
    ["LG/(SWV): Smithing Stone [1] - N side", { groups: [], region: "Limgrave" }],
    [
      "LG/(FH): Nomadic Warrior's Cookbook [6] - ground floor room",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/(FH): Smithing Stone [1] - catwalk right of tower", { groups: [], region: "Limgrave" }],
    ["LG/(FH): Bloodrose x5 - upper area", { groups: [], region: "Limgrave" }],
    ["LG/(FH): Bloodrose x3 - near entrance", { groups: [], region: "Limgrave" }],
    ["LG/FHW: Golden Seed - seedtree to E", { groups: [], region: "Limgrave" }],
    ["LG/(FH): Dectus Medallion (Left) - tower chest", { groups: [], region: "Limgrave" }],
    [
      "LG/(FH): Ash of War: Bloody Slash - enemy drop upper area",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/SRW: Strip of White Flesh x3 - NE of SRW", { groups: [], region: "Limgrave" }],
    [
      "LG/(TCM): Flask of Wondrous Physick - in basin or at RH after 2 great runes",
      { groups: [], region: "Limgrave" },
    ],
    ["LG/(TCM): Crimson Crystal Tear - in basin", { groups: [], region: "Limgrave" }],
    ["LG/TCM: Neutralizing Boluses - NE of TCM", { groups: [], region: "Limgrave" }],
    ["LG/(TCM): Sacred Tear - by statue", { groups: [], region: "Limgrave" }],
    [
      "LG/TCM: Ash of War: Sacred Blade - scarab N of TCM",
      { groups: ["Scarab"], region: "Limgrave" },
    ],
    [
      "RH: Rogier's Rapier - talk Rogier after beating SV mainboss or on his body after he dies",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: O, Flame! - Fire Monks' Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Surge, O Flame! - Fire Monks' Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Flame, Fall Upon Them - Giant's Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Giantsflame Take Thee - Giant's Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Black Flame - Godskin Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Black Flame Blade - Godskin Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Lord's Heal - Two Fingers' Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Lord's Aid - Two Fingers' Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Assassin's Approach - Assassin's Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Darkness - Assassin's Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Radagon's Rings of Light - Golden Order Principia",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Law of Regression - Golden Order Principia",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Lightning Spear - Dragon Cult Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Honed Bolt - Dragon Cult Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Electrify Armament - Dragon Cult Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Ancient Dragons' Lightning Strike - Ancient Dragon Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Ancient Dragons' Lightning Spear - Ancient Dragon Prayerbook",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    ["RH: Catch Flame - Corhyn shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Flame Sling - Corhyn shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Rejection - Corhyn shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Urgent Heal - Corhyn shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Heal - Corhyn shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Cure Poison - Corhyn shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Flame Fortification - Corhyn shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Magic Fortification - Corhyn shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Dagger - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Longsword - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Rapier - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Scimitar - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Reverse-Bladed Sword - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Mace - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Battle Axe - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Short Spear - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Heater Shield - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Finger Seal - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Longbow - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Knight Helm - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Knight Armor - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Knight Gauntlets - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Knight Greaves - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    [
      "RH: Furled Finger's Trick-Mirror - Twin maiden shop",
      { groups: [], region: "Roundtable Hold" },
    ],
    ["RH: Host's Trick-Mirror - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: White Cipher Ring - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Blue Cipher Ring - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Rune Arc x5 - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Stonesword Key x3 - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    ["RH: Memory Stone - Twin maiden shop", { groups: [], region: "Roundtable Hold" }],
    [
      "RH: Sacred Relic Sword - Enia for Elden Remembrance",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Blasphemous Blade - Enia for Remembrance of the Blasphemous",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Greatsword of Damnation - Enia for Remembrance of the Lord of Frenzied Flame",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Maliketh's Black Blade - Enia for Remembrance of the Black Blade",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Starscourge Greatsword - Enia for Remembrance of the Starscourge",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Greatsword of Radahn (Lord) - Enia for Remembrance of a God and a Lord",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Greatsword of Radahn (Light) - Enia for Remembrance of a God and a Lord",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Dragon King's Cragblade - Enia for Remembrance of the Dragonlord",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Morgott's Cursed Sword - Enia for Remembrance of the Omen King",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Putrescence Cleaver - Enia for Remembrance of Putrescence",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Hand of Malenia - Enia for Remembrance of the Rot Goddess",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Marika's Hammer - Enia for Elden Remembrance",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Bastard's Stars - Enia for Remembrance of the Naturalborn",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Axe of Godrick - Enia for Remembrance of the Grafted",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Winged Greathorn - Enia for Remembrance of the Regal Ancestor",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Mohgwyn's Sacred Spear - Enia for Remembrance of the Blood Lord",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Spear of the Impaler - Enia for Remembrance of the Impaler",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Poleblade of the Bud - Enia for Remembrance of the Saint of the Bud",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Giant's Red Braid - Enia for Remembrance of the Fire Giant",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Grafted Dragon - Enia for Remembrance of the Grafted",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Axe of Godfrey - Enia for Remembrance of Hoarah Loux",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Shadow Sunflower Blossom - Enia for Remembrance of the Shadow Sunflower",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Gazing Finger - Enia for Remembrance of the Mother of Fingers",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Carian Regal Scepter - Enia for Remembrance of the Full Moon Queen",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Staff of the Great Beyond - Enia for Remembrance of the Mother of Fingers",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Lion Greatbow - Enia for Remembrance of the Starscourge",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rellana's Twin Blades - Enia for Remembrance of the Twin Moon Knight",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Ancestral Spirit's Horn - Enia for Remembrance of the Regal Ancestor",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Enraged Divine Beast - Enia for Remembrance of the Dancing Lion",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Regal Omen Bairn - Enia for Remembrance of the Omen King",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rennala's Full Moon - Enia for Remembrance of the Full Moon Queen",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rykard's Rancor - Enia for Remembrance of the Blasphemous",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Death Lightning - Enia for Remembrance of the Lichdragon",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Burn, O Flame! - Enia for Remembrance of the Fire Giant",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Bloodboon - Enia for Remembrance of the Blood Lord",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Fortissax's Lightning Spear - Enia for Remembrance of the Lichdragon",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Placidusax's Ruin - Enia for Remembrance of the Dragonlord",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Scarlet Aeonia - Enia for Remembrance of the Rot Goddess",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Black Blade - Enia for Remembrance of the Black Blade",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rellana's Twin Moons - Enia for Remembrance of the Twin Moon Knight",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Blades of Stone - Enia for Remembrance of the Wild Boar Rider",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Vortex of Putrescence - Enia for Remembrance of Putrescence",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Land of Shadow - Enia for Remembrance of the Shadow Sunflower",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Light of Miquella - Enia for Remembrance of a God and a Lord",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rotten Butterflies - Enia for Remembrance of the Saint of the Bud",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Midra's Flame of Frenzy - Enia for Remembrance of the Lord of Frenzied Flame",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Messmer's Orb - Enia for Remembrance of the Impaler",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Ash of War: Waves of Darkness - Enia for Remembrance of the Naturalborn",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Ash of War: Hoarah Loux's Earthshaker - Enia for Remembrance of Hoarah Loux",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Ash of War: Divine Beast Frost Stomp - Enia for Remembrance of the Dancing Lion",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Sword Lance - Enia for Remembrance of the Wild Boar Rider",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Fell Omen Cloak - Enia shop, defeat LRC/QB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Elden Lord Crown - Enia shop, defeat LAC/QB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Elden Lord Armor - Enia shop, defeat LAC/QB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Elden Lord Bracers - Enia shop, defeat LAC/QB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Elden Lord Greaves - Enia shop, defeat LAC/QB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Lord of Blood's Robe - Enia shop, defeat MP/(MDM) mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Maliketh's Helm - Enia shop, defeat FA/BGB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Maliketh's Armor - Enia shop, defeat FA/BGB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Maliketh's Gauntlets - Enia shop, defeat FA/BGB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Maliketh's Greaves - Enia shop, defeat FA/BGB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Queen's Crescent Crown - Enia shop, defeat RLA/DB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Queen's Robe - Enia shop, defeat RLA/DB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Queen's Bracelets - Enia shop, defeat RLA/DB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Queen's Leggings - Enia shop, defeat RLA/DB mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Royal Knight Helm - Enia shop, defeat MH/HTP boss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Royal Knight Armor - Enia shop, defeat MH/HTP boss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Royal Knight Gauntlets - Enia shop, defeat MH/HTP boss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Royal Knight Greaves - Enia shop, defeat MH/HTP boss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Malenia's Winged Helm - Enia shop, defeat EBH/HR mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Malenia's Armor - Enia shop, defeat EBH/HR mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Malenia's Gauntlet - Enia shop, defeat EBH/HR mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Malenia's Greaves - Enia shop, defeat EBH/HR mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Radahn's Redmane Helm - Enia shop, defeat CL/(WD) mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Radahn's Lion Armor - Enia shop, defeat CL/(WD) mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Radahn's Gauntlets - Enia shop, defeat CL/(WD) mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Radahn's Greaves - Enia shop, defeat CL/(WD) mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Young Lion's Helm - Enia shop, defeat EI/DGFS mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Young Lion's Armor - Enia shop, defeat EI/DGFS mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Young Lion's Gauntlets - Enia shop, defeat EI/DGFS mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Young Lion's Greaves - Enia shop, defeat EI/DGFS mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Messmer's Helm - Enia shop, defeat SK/DCE mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Messmer's Armor - Enia shop, defeat SK/DCE mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Messmer's Gauntlets - Enia shop, defeat SK/DCE mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Messmer's Greaves - Enia shop, defeat SK/DCE mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Gaius's Helm - Enia shop, defeat ScV/SKBG mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Gaius's Armor - Enia shop, defeat ScV/SKBG mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Gaius's Gauntlets - Enia shop, defeat ScV/SKBG mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Briar Helm - Enia shop, defeat TSC/SCIG boss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Briar Armor - Enia shop, defeat TSC/SCIG boss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Briar Gauntlets - Enia shop, defeat TSC/SCIG boss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Briar Greaves - Enia shop, defeat TSC/SCIG boss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Veteran's Helm - Enia shop, defeat MotG/(CS) mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Veteran's Armor - Enia shop, defeat MotG/(CS) mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Veteran's Gauntlets - Enia shop, defeat MotG/(CS) mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Veteran's Greaves - Enia shop, defeat MotG/(CS) mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rellana's Helm - Enia shop, defeat CE/CLC mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rellana's Armor - Enia shop, defeat CE/CLC mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rellana's Gloves - Enia shop, defeat CE/CLC mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rellana's Greaves - Enia shop, defeat CE/CLC mainboss",
      { groups: ["DLC"], isMissable: true, region: "Roundtable Hold" },
    ],
    ["RH: Taunter's Tongue - invader drop", { groups: [], region: "Roundtable Hold" }],
    [
      "RH: Talisman Pouch - talk to Enia at 2 great runes or Twin Maiden after farum boss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Fevor's Cookbook [3] - talk to Gideon after reaching MP",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Black Flame's Protection - talk to Gideon after reaching MH",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Lord's Divine Fortification - talk to Gideon after beating EBH mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Law of Causality - talk to Gideon after beating MP mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Rogier's Letter - after giving Black Knifeprint, talk to Ranni, talk to Rogier again",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Spellblade's Pointed Hat - found on Rogier's body",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Spellblade's Traveling Attire - found on Rogier's body",
      { groups: [], region: "Roundtable Hold" },
    ],
    ["RH: Spellblade's Gloves - found on Rogier's body", { groups: [], region: "Roundtable Hold" }],
    [
      "RH: Spellblade's Trousers - found on Rogier's body",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Sewer-Gaol Key - talk to Dung Eater while having a Seedbed Curse",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Royal Remains Helm - Ensha's spot, after getting half of secret medallion",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Royal Remains Armor - Ensha's spot, after getting half of secret medallion",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Royal Remains Gauntlets - Ensha's spot, after getting half of secret medallion",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Royal Remains Greaves - Ensha's spot, after getting half of secret medallion",
      { groups: [], region: "Roundtable Hold" },
    ],
    ["RH: Cipher Pata - on bed in lower area", { groups: [], region: "Roundtable Hold" }],
    [
      "RH: Assassin's Prayerbook - behind second imp statue in chest",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Crepus's Black-Key Crossbow - behind imp statue in chest",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Black-Key Bolt x20 - behind imp statue in chest",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Clinging Bone - dropped by Ensha, after getting half of secret medallion",
      { groups: [], region: "Roundtable Hold" },
    ],
    [
      "RH: Weathered Dagger - talk to Fia after reaching altus",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Sacrificial Twig - talk to Fia after giving Black Knifeprint to Rogier",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Litany of Proper Death - D shop, after talking to Gurraq",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Order's Blade - D shop, after talking to Gurraq",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Twinned Helm - on D's body after giving him Weather Dagger during Fia's quest",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Twinned Armor - on D's body after giving him Weather Dagger during Fia's quest",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Twinned Gauntlets - on D's body after giving him Weather Dagger during Fia's quest",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Twinned Greaves - on D's body after giving him Weather Dagger during Fia's quest",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Knifeprint Clue - talk to Fia multiple times",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH: Arsenal Charm - talk to Nepheli before and after defeating SV mainboss",
      { groups: [], isMissable: true, region: "Roundtable Hold" },
    ],
    [
      "RH/DLC: Catch Flame - Corhyn shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Flame Sling - Corhyn shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rejection - Corhyn shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Urgent Heal - Corhyn shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Heal - Corhyn shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Cure Poison - Corhyn shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Flame Fortification - Corhyn shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Magic Fortification - Corhyn shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Dagger - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Longsword - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rapier - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Scimitar - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Reverse-Bladed Sword - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Mace - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Battle Axe - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Short Spear - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Heater Shield - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Finger Seal - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Longbow - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Knight Helm - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Knight Armor - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Knight Gauntlets - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Knight Greaves - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Furled Finger's Trick-Mirror - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Host's Trick-Mirror - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: White Cipher Ring - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Blue Cipher Ring - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rune Arc x5 - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Stonesword Key x3 - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Memory Stone - Twin maiden shop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Greatsword of Damnation - Enia for Remembrance of the Lord of Frenzied Flame",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Greatsword of Radahn (Lord) - Enia for Remembrance of a God and a Lord",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Greatsword of Radahn (Light) - Enia for Remembrance of a God and a Lord",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Putrescence Cleaver - Enia for Remembrance of Putrescence",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Spear of the Impaler - Enia for Remembrance of the Impaler",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Poleblade of the Bud - Enia for Remembrance of the Saint of the Bud",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Shadow Sunflower Blossom - Enia for Remembrance of the Shadow Sunflower",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Gazing Finger - Enia for Remembrance of the Mother of Fingers",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Staff of the Great Beyond - Enia for Remembrance of the Mother of Fingers",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rellana's Twin Blades - Enia for Remembrance of the Twin Moon Knight",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Enraged Divine Beast - Enia for Remembrance of the Dancing Lion",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rellana's Twin Moons - Enia for Remembrance of the Twin Moon Knight",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Blades of Stone - Enia for Remembrance of the Wild Boar Rider",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Vortex of Putrescence - Enia for Remembrance of Putrescence",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Land of Shadow - Enia for Remembrance of the Shadow Sunflower",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Light of Miquella - Enia for Remembrance of a God and a Lord",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rotten Butterflies - Enia for Remembrance of the Saint of the Bud",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Midra's Flame of Frenzy - Enia for Remembrance of the Lord of Frenzied Flame",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Messmer's Orb - Enia for Remembrance of the Impaler",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Ash of War: Divine Beast Frost Stomp - Enia for Remembrance of the Dancing Lion",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Sword Lance - Enia for Remembrance of the Wild Boar Rider",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Young Lion's Helm - Enia shop, defeat EI/DGFS mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Young Lion's Armor - Enia shop, defeat EI/DGFS mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Young Lion's Gauntlets - Enia shop, defeat EI/DGFS mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Young Lion's Greaves - Enia shop, defeat EI/DGFS mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Messmer's Helm - Enia shop, defeat SK/DCE mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Messmer's Armor - Enia shop, defeat SK/DCE mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Messmer's Gauntlets - Enia shop, defeat SK/DCE mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Messmer's Greaves - Enia shop, defeat SK/DCE mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Gaius's Helm - Enia shop, defeat ScV/SKBG mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Gaius's Armor - Enia shop, defeat ScV/SKBG mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Gaius's Gauntlets - Enia shop, defeat ScV/SKBG mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rellana's Helm - Enia shop, defeat CE/CLC mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rellana's Armor - Enia shop, defeat CE/CLC mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rellana's Gloves - Enia shop, defeat CE/CLC mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Rellana's Greaves - Enia shop, defeat CE/CLC mainboss",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Taunter's Tongue - invader drop",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Talisman Pouch - talk to Enia",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "RH/DLC: Cipher Pata - on bed in lower area",
      { groups: ["DLC", "Post Leyndell"], region: "Roundtable Hold DLC Only" },
    ],
    [
      "LL/JB: Exalted Flesh x3 - given by Alexander after getting him unstuck with oil pots, just above JB",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/SeI: Volcano Manor Invitation - give Rya her necklace, you will need to buy the item from Boggart or reach altus",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Hoslow's Petal Whip - on Diallos's body",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Diallos's Mask - on Diallos's body",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/MEW: Cerulean Crystal Tear - boss drop, Minor Erdtree W",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/MEW: Ruptured Crystal Tear - boss drop, Minor Erdtree W",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/REC: Ash of War: Sword Dance - scarab N of REC",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RS): Raw Meat Dumpling x5 - kill invader Edgar",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RS): Shabriri Grape - kill invader Edgar",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RS): Raw Meat Dumpling 1 - in shack when Edgar invades",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RS): Raw Meat Dumpling 2 - in shack when Edgar invades",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RS): Raw Meat Dumpling 3 - in shack when Edgar invades",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RS): Raw Meat Dumpling 4 - in shack when Edgar invades",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RS): Raw Meat Dumpling 5 - in shack when Edgar invades",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CE): Greatblade Phalanx - boss drop Evergaol",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/TQ: Somber Smithing Stone [2] - scarab to NW on island",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FFB: Golden Rune [6] - enemy drop to S middle of rocks",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/FFB: Strip of White Flesh - to E", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/FFB: Blood Grease x3 - to N by broken cart",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FFB: Jellyfish Shield - to N in broken cart",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/SoI: Somber Smithing Stone [3] - to SW up on cliff in chair",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FFB: Smithing Stone [4] - in right chest to N in upper camp",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(TFB): Imbued Sword Key - in chest", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/FFB: Rune Arc - to N in camp", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/FFB: Carian Knight's Sword - in caravan chest to N, NE of camp",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FFB: Albinauric Bloodclot x6 - in left chest to N in upper camp",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FFB: Cuckoo Glintstone x10 - in chest to N in camp",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/VA: Albinauric Bloodclot - to N by tree", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/VA: Smithing Stone [2] x2 - to NW, below by tree",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/VA: Crystal Sword - to N, NE cliff side", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/VA: Larval Tear - to NE", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(CT): Memory Stone - top of tower, requires Erudition gesture",
      { groups: ["Rise"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/VA: Somber Smithing Stone [2] - scarab to N, cross bridge, drop from island and head N",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CT): Magic Grease x2 - behind the tower, inner wall",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/CT: Golden Rune [6] - balloon to N", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/(CT): Cuckoo Glintstone x5 - in tower", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/RC: Bloodflame Blade - scarab NW of RC",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/TQ: Rimed Crystal Bud x3 - to SE in middle of buildings",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CT: Smithing Stone [2] x3 - to N in gazebo",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/TQ: Icerind Hatchet - in chest to SE, in tower S side of TQ",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/TQ: Dragon Heart - boss drop to N", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/TQ: Dragonwound Grease - to N by boss", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/TQ: Kukri x6 - to N by boss", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/TQ: Academy Glintstone Key - to N by boss",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CW: Smithing Stone [3] x3 - to N in gazebo",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/SoI: Throwing Dagger x6 - to SW by broken cart",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/SoI: Golden Rune [1] 1 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [3] 1 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [3] 2 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [1] 2 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [5] - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [3] 3 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [2] 1 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [3] 4 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [3] 5 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [4] 1 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [2] 2 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [4] 2 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [6] - balloon to SW", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [6] - balloon to W", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SoI: Golden Rune [2] 3 - graveyard to SW", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/NLLS: Map: Liurnia, West - to NE on map pillar",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(KR): Rimed Crystal Bud x8 - NW side of ruins in tower",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(KR): Glintstone Firefly x4 - E side of ruins",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(KR): Frozen Needle - in chest E side of ruins underground behind illusory floor",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/SoI: Golden Rune [6] - balloon to N close one",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/SoI: Golden Rune [6] - balloon to N far one",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/RM: Carian Filigreed Crest - Iji shop after defeating LG/FHE boss",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/RM: Somber Smithing Stone [3] x3 - Iji shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/RM: Somber Smithing Stone [4] x3 - Iji shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/RM: Iji's Mirrorhelm - kill Iji or after quest",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/VA: Haligtree Secret Medallion (Right) - given by Albus",
      { groups: ["Out of the Way"], region: "Liurnia of The Lakes" },
    ],
    ["LL/(VA): Crucible Knot Talisman - boss drop", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/FL: Ash of War: Vow of the Indomitable - scarab to S",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FL: Smithing Stone [2] x2 - to S by big tree",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(VA): Rune Arc - SW by coffin in boss arena",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/VA: Ivory Sickle - to E in coffin", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/FL: Somber Smithing Stone [1] x2 - to NW in chair",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FRL: Larval Tear - enemy drop to S, NW of gazebo",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RC): Bloody Finger - talk to Varré after invading Magnus in AP and returning the bloodsoaked Lord of Blood's Favor",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RC): Nomadic Warrior's Cookbook [12] - in church",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RC): Festering Bloody Finger x5 - talk to Varré after obtaining Godrick's Great Rune",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RC): Lord of Blood's Favor - talk to Varré after invading Magnus in AP",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(RC): Pureblood Knight's Medal - talk to Varré after invading Magnus in AP and returning the bloodsoaked Lord of Blood's Favor",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(AGT): Smithing Stone [3] - upper AGT, NW of fountain",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [1] 1 - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [4] 1 - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [3] 1 - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [2] 1 - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [4] 2 - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [2] 2 - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [1] 2 - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [5] - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [2] 3 - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [3] 2 - W of upper AGT in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Smithing Stone [2] x3 - W of upper AGT in gazebo",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(AGT): Blue-White Wooden Shield - W side of upper AGT",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(AGT): Fire Blossom x3 - enemy drop upper AGT, NW of fountain",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(AGT): Smoldering Butterfly x5 - enemy drop upper AGT, NW of fountain",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/SRLG: Meeting Place Map - to N", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/GTN: Stonesword Key - to W in chair under curved RLA main stairs",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/SoI: Memory Stone - in chest top of tower, solve puzzle",
      { groups: ["Rise"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/EGBT: Ash of War: Shield Bash - scarab to NE",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/EGBT: Smithing Stone [2] x3 - to W in gazebo",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/TR: Old Fang x2 - to SW under some ruins with tons of enemies",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/TR: Soporific Grease x3 - to SW between some ruins",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/TR: Lump of Flesh - to S in camp, follow cliff side",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/SoI: Golden Rune [6] - balloon to NE", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/RM: Intelligence-knot Crystal Tear - to NE below in a basin, follow cliff side",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/TR: Somber Smithing Stone [4] - to W in chair",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/RM: Somber Smithing Stone [2] - enemy drop to NE below by a basin, follow cliff side",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Cracked Pot - down left path before boss arena, first area to S",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Glintstone Craftsman's Cookbook [6] - right from entrance, up stairs, in room",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(CM): Loretta's Greatbow - boss drop", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(CM): Ash of War: Loretta's Slash - boss drop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Carian Piercer - scarab NE of fountain",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/BCM: Frozen Armament - scarab to NW",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Rune Arc - behind last pillar on alt upper walkway path",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(CM): Golden Rune [4] - N of fountain", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(CM): Stonesword Key - after boss, path down to church, drop to path SW from church, end of path",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Slumbering Egg x3 - after boss, path down to church, drop to path SW from church, on wood walkway",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [3] - jump down from upper walkway to SE before elevator, follow right path to end",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Golden Rune [3] - jump down from upper walkway to SE before elevator, under stairs to left",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Crystal Dart x8 - down left path before boss arena, first area to W",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Smithing Stone [4] - middle of grand stairs, head E and drop down to a lower platform",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Ash of War: Carian Grandeur - down left path before boss arena, end of area on arch",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [3] - right from entrance, up stairs, down alley in corner",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Spellproof Dried Liver - after boss, path down to church, in upper church",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Rimed Crystal Bud x5 - left from entrance",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Smithing Stone [2] x3 - in front of fountain",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Smithing Stone [4] - in church within coffin",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Urumi - jump down from upper walkway to SE before elevator, SE most point to right",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Smithing Stone [3] - down left path before boss arena, second area",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Golden Rune [4] - top of grand stairs on ledge",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Old Fang x5 - after boss, path down to church, on church roof",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Glintstone Firefly x6 - S of second small arch by crystal",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Ice Crest Shield - NE of fountain behind stone pillar",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Magic Grease x2 - bottom of grand stairs, jump to SW, up ladder then N",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Rimed Crystal Bud x5 - on left small stair of grand stairs",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Rimed Crystal Bud x3 - E corner after MUL grace",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Rimed Crystal Bud x8 - on jump down from upper walkway to SE before elevator",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Rimed Crystal Bud x3 - right from entrance",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Rimed Crystal Bud x2 - just S of second small arch",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Rimed Crystal Bud x2 - E from fountain",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Golden Seed - seedtree W of MUL grace",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Raw Meat Dumpling - enemy drop down left path before boss arena, first area",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Living Jar Shard - enemy drop down left path before boss arena, first area",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Raw Meat Dumpling - enemy drop down left path before boss arena, second area enemy 2",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Living Jar Shard - enemy drop down left path before boss arena, second area enemy 2",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Raw Meat Dumpling - enemy drop down left path before boss arena, second area enemy 1",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Living Jar Shard - enemy drop down left path before boss arena, second area enemy 1",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop N of fountain",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop left from entrance behind tower",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop SE from fountain",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop left pillar from entrance",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop right pillar from entrance",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop NW of fountain, 4/4",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop left from entrance up rock face",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop by lower church stairs",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop E of fountain behind tower",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop E of first small arch",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop NW of fountain, 2/4",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop left from entrance",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop right from entrance by wall pillar",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop NW of fountain, 3/4",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop SE of lower church stairs",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Somber Smithing Stone [2] - enemy drop NW of fountain, 1/4",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Sword of Night and Flame - in chest, drop down from upper walkway onto building, down ladder",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CM): Troll Knight's Sword - enemy drop middle of grand stairs",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(SWS): Latenna the Albinauric - talk to Latenna after talking to Albus",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(SWS): Blue Silver Mail Hood - kill Latenna",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(SWS): Blue Silver Mail Armor - kill Latenna",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(SWS): Blue Silver Bracelets - kill Latenna",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(SWS): Blue Silver Mail Skirt - kill Latenna",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/SeI: Fire Monks' Prayerbook - to SW in camp by fire",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/SeI: Dappled Cured Meat - to SW in camp tent ",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(SWS): Rune Arc - near grace", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/BS: Dexterity-knot Crystal Tear - to SW in basin",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/BS: Rya's Necklace - Blackguard Boggart shop after talked to Rya",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/BS: Blackguard's Iron Mask - kill Blackguard Boggart",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/BS: Iron Ball - kill Blackguard Boggart", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/FRL: Smithing Stone [2] x3 - to S in gazebo",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FRL: Tarnished Golden Sunflower x4 - to E on broken ruin",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Rainbow Stone x4 - to W on broken ruin",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Glintstone Craftsman's Cookbook [4] - in chest to NW on L-shaped building",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FRL: Ash of War: Charge Forth - scarab to N hanging under bridge",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Crystal Bud x2 - to NW, just past L-shaped building",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Arteria Leaf x2 - to NW on L-shaped building",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FRL: Smithing Stone [2] x3 - to N just past bridge",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(AGT): Shattershard Arrow (Fletched) x6 - on railing middle of upper AGT main stairs",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(AGT): Glintstone Firefly x4 - NE corner of upper AGT",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(AGT): Golden Seed - seedtree SE of upper AGT main stairs",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Crystal Cave Moss x3 - N of upper AGT main stairs, by graves right of big building",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Stonesword Key - in chest N of upper AGT main stairs, within second tower left of big building",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/GTN: Ancient Death Rancor - night boss drop to S",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/EGBT: Somber Smithing Stone [3] - to NE in chair, to right at cliff",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/BC: Sanctuary Stone x3 - S of BC by ruin", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/MCMG: Ash of War: Hoarfrost Stomp - scarab to SE in pond",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/SeI: Ballista Bolt x5 - to SW, E of camp", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/(LR): Ritual Pot - N side of ruins", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(LR): Golden Rune [3] - NE outer wall of ruins",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(LR): Smithing Stone [3] - near waygate", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/SeI: Glass Shard - to S on isle", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/SeI: Red-Feathered Branchsword - night boss drop to NE",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(LR): Wraith Calling Bell - in underground chest NW side of ruins",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(LR): Ghost Glovewort [2] - enemy drop near waygate",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [3] - to SE on broken bridge",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Smithing Stone [3] x3 - to SE in gazebo",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Map: Liurnia, North - map pillar near grace",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Somber Smithing Stone [2] - scarab to NW, N of L-shaped building with chest",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Golden Rune [4] - to E on broken rooves",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AGT: Magic Grease - to N on tip of broken spire",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/ELLS: Smithing Stone [3] x3 - to W in gazebo",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(CV): Magic Glintblade - Miriel shop", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/(CV): Carian Greatsword - Miriel shop", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/(CV): Blessing's Boon - Miriel shop", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(CV): Golden Tailoring Tools - in chest within CV",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(CV): Turtle Neck Meat x12 - kill Miriel", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(CV): Gold Sewing Needle - in chest within CV",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CV: Stormhawk Feather x5 - to W behind CV on cliff facing RLA",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CV): Meat Peddler's Bell Bearing - night boss drop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CV: Grave Violet - to N by big gravestone",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/MC: Arteria Leaf x3 - to SW, in chair within lower forest",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/MC: Stalwart Horn Charm - to SW, head up N and around, small hole in rock face",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/MC: Spiralhorn Shield - to SE, S of walking mausoleum",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FFV: Frenzied Burst - scarab NW of FFV",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/MC: Somber Smithing Stone [2] - scarab to NW",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/ERLG: Slumbering Egg x2 - to NE up cliff path by tent",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CIn: Golden Rune [3] 1 - graveyard S of CIn",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CIn: Golden Rune [3] 2 - graveyard S of CIn",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CIn: Golden Rune [1] - graveyard S of CIn",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CIn: Golden Rune [7] - graveyard S of CIn",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CIn: Golden Rune [3] 3 - graveyard S of CIn",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CIn: Golden Rune [2] - graveyard S of CIn",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CIn: Golden Rune [4] - graveyard S of CIn",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CIn: Golden Rune [3] 4 - graveyard S of CIn",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/RVV: Golden Seed - seedtree to SW ", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/RVV: Ash of War: Barbaric Roar - scarab to N",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CIr: Warming Stone x3 - W of CIr in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Glintstone Craftsman's Cookbook [1] - to S in camp",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Smoldering Butterfly x6 - to S in camp",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/LLS: Estoc - Nomadic Merchant shop", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/LLS: Kite Shield - Nomadic Merchant shop", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/LLS: Astrologer's Staff - Nomadic Merchant shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Astrologer Hood - Nomadic Merchant shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Astrologer Robe - Nomadic Merchant shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Astrologer Gloves - Nomadic Merchant shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Astrologer Trousers - Nomadic Merchant shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/LLS: Lantern - Nomadic Merchant shop", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/LLS: Nomadic Warrior's Cookbook [11] - Nomadic Merchant shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Smithing Stone [1] x5 - Nomadic Merchant shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Smithing Stone [2] x3 - Nomadic Merchant shop",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Map: Liurnia, East - map pillar to N",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/LLS: Idus Sword - to N, W of map pillar", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/LR: Glintstone Craftsman's Cookbook [2] - to N",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(ME): Flame of the Fell God - boss drop Evergaol",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LLS: Sacrificial Twig - to W up on gravestone",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(HLT): Glintstone Craftsman's Cookbook [3] - in chest second floor",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/GTB: Smithing Stone [2] x3 - to S in gazebo E of HLT",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(HLT): Golden Rune [4] - in camp", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(HLT): Carian Glintblade Staff - top of tower",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/GTB: Strip of White Flesh x3 - below grace",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/GTB: Sliver of Meat - to S by enemy", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/GTB: Silver-Pickled Fowl Foot x3 - to NW in small camp",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/GTB: Golden Rune [6] - balloon drop to W", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/ELLS: Smithing Stone [3] x3 - to SW on chair by group of enemies",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/ELLS: Land Squirt Ashes - to S on grave in middle of massive group of enemies",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AS: Dragon Cult Prayerbook - enemy drop S of AS",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ['LL/(AS): "Resurrection" Painting - painting', { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/ET: Smoldering Butterfly x8 - to SW in camp item 1",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/ET: Flame, Cleanse Me - to SW in camp item 2",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AS: Smithing Stone [4] - NE of AS in chair",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/ET: Briars of Sin - enemy drop to SW past camp",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/ET: Immunizing White Cured Meat - to NW by cart",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/ET: Fire Blossom x3 - enemy drop to W", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/ET: Smoldering Butterfly x5 - enemy drop to W",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/RL: Frenzyflame Stone - to SE behind statue on cliff",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/ARW: Stonesword Key - way N of ARW in chair",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FFVO: Note: The Lord of Frenzied Flame - to SW behind house",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(FFV): Eye of Yelough x3 - drop from W wall, in corner",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(FFV): Stonesword Key - on W wall", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/FFVO: Eye of Yelough - to SE in chair circle",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/FFVO: Frenzyflame Stone - to SE in chair circle",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/GLD: Somber Smithing Stone [3] - scarab to NW",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    ["LL/RVV: Smithing Stone [5] - to SW in shack", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/GLD: Dragonwound Grease - to W down stairs",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(CIr): Glintstone Pebble - Thops shop", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/(CIr): Glintstone Arc - Thops shop", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/(CIr): Starlight - Thops shop", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(CIr): Ash of War: Thops's Barrier - scarab in church after Thops moves",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    ["LL/(CIr): Sacred Tear - at statue", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/LFC: Academy Scroll - to W in graveyard", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(PR): Golden Rune [3] - in SE ruins, SW corner",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(PR): Cuckoo Glintstone x4 - in SE ruins by entrance",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/CC: Somber Smithing Stone [2] x2 - S of CC in chair",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LHN: Stormhawk Feather x3 - to S middle of broken ruins",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(PR): Two Fingers Heirloom - in chest underground",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(PR): Shabriri Grape - by chest underground",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/LHS: Golden Rune [6] - balloon drop to N", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/LHS: Golden Rune [6] - balloon drop to NE",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/(PR): Mushroom x5 - in NW ruins", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/LHN: Crystal Dart x5 - to N on path, item 3",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LHN: Golden Rune [6] - to N on path, item 2",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/LHN: Golden Rune [3] - to N on path, item 1",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/LHN: Beast Blood - to NE on broken ruins", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/LHN: Lucerne - to N by cart", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/GTB: Somber Smithing Stone [2] - scarab to SE",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Golden Rune [2] 1 - to S in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/JB: Golden Rune [6] - to S in graveyard", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/JB: Golden Rune [1] - to S in graveyard", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/JB: Golden Rune [3] 1 - to S in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Golden Rune [2] 2 - to S in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Golden Rune [3] 2 - to S in graveyard",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AS: Starlight Shards - SE of AS, S of swamp by statue",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/GTB: Ash of War: Ice Spear - night boss drop to SE",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/JB: Cracked Pot - to N in shack", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/JB: Cracked Pot - to NE", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/JB: Cracked Pot - to N on steps", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/JB: Ritual Pot - to N on roof", { groups: [], region: "Liurnia of The Lakes" }],
    ["LL/JB: Ritual Pot - to N on pot", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/JB: Numen's Rune - on Diallos's body",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Companion Jar - give Alexander's Innards, left after Jar Bairn leaves",
      { groups: [], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    ["LL/AS: Deathroot - boss drop SE of AS", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/AS: Skeletal Bandit Ashes - boss drop SE of AS",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AS: Smithing Stone [3] - SE of AS, S side of swamp item 2",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AS: Great Dragonfly Head x5 - SE of AS by graves",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/AS: Trina's Lily - SE of AS, S side of swamp item 1",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Smithing Stone [3] x3 - to NW on roof",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    ["LL/JB: Living Jar Shard - to N in shack", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/JB: Raw Meat Dumpling - enemy drop to N, close",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Living Jar Shard - enemy drop to N, close",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Raw Meat Dumpling - enemy drop to N, far",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/JB: Living Jar Shard - enemy drop to N, far",
      { groups: [], region: "Liurnia of The Lakes" },
    ],
    [
      "LL/SHE: Somber Smithing Stone [3] - scarab NW of SHE",
      { groups: ["Scarab"], region: "Liurnia of The Lakes" },
    ],
    ["LL/CFT: Crystal Dart x3 - SW under CFT", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/(CFT): Cannon of Haima - in chest atop tower, requires using Erudition gesture while wearing any Glintstone Crown",
      { groups: ["Rise"], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    [
      "LL/(CFT): Gavel of Haima - in chest atop tower, requires using Erudition gesture while wearing any Glintstone Crown",
      { groups: ["Rise"], isMissable: true, region: "Liurnia of The Lakes" },
    ],
    ["LL/LHS: Treespear - to SE in caravan chest", { groups: [], region: "Liurnia of The Lakes" }],
    [
      "LL/BC: Nightrider Glaive - night boss drop S of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Ash of War: Giant Hunt - night boss drop S of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Rift Shield - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Blue Crest Heater Shield - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Composite Bow - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Rune Arc x3 - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Immunizing White Cured Meat x3 - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Invigorating White Cured Meat x3 - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Clarifying White Cured Meat x3 - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Bewitching Branch x5 - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Nomadic Warrior's Cookbook [13] - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Silver Grooved Shield - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Silver Grooved Helm - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Silver Grooved Armor - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Silver Grooved Gauntlets - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Silver Grooved Greaves - Nomadic Merchant shop N of BC",
      { groups: [], region: "Bellum Highway" },
    ],
    ["LL/(BC): Sacred Tear - by statue", { groups: [], region: "Bellum Highway" }],
    [
      "LL/BC: Cuckoo Glintstone x3 - NE of BC in left camp after choke point",
      { groups: [], region: "Bellum Highway" },
    ],
    ["LL/BC: Rune Arc - NE of BC by giant gravestones", { groups: [], region: "Bellum Highway" }],
    [
      "LL/BC: Rune Arc - E of BC in alcove under catapults",
      { groups: [], region: "Bellum Highway" },
    ],
    ["LL/(CIn): Finger Maiden Fillet - on body", { groups: [], region: "Bellum Highway" }],
    ["LL/(CIn): Finger Maiden Robe - on body", { groups: [], region: "Bellum Highway" }],
    ["LL/(CIn): Finger Maiden Shoes - on body", { groups: [], region: "Bellum Highway" }],
    ["LL/(CIn): Sacred Tear - by statue", { groups: [], region: "Bellum Highway" }],
    [
      "LL/BC: Great Mace - in chest NE of BC in right camp after choke point",
      { groups: [], region: "Bellum Highway" },
    ],
    ["LL/CIn: Vyke's War Spear - invader drop", { groups: [], region: "Bellum Highway" }],
    ["LL/CIn: Fingerprint Grape - invader drop", { groups: [], region: "Bellum Highway" }],
    [
      "LL/BC: Fire Blossom x3 - enemy drop NE of BC, on square tile in choke point",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/BC: Smoldering Butterfly x5 - enemy drop NE of BC, on square tile in choke point",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/MEE: Magic-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/MEE: Lightning-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/MEE: Holy-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/(FFV): Frenzied's Cookbook [1] - in shack near entrance",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/(FFV): Shabriri's Woe - on front steps of a house",
      { groups: [], region: "Bellum Highway" },
    ],
    ["LL/GLD: Yellow Ember - to S on path below FFT", { groups: [], region: "Bellum Highway" }],
    [
      "LL/GLD: Smithing Stone [2] x2 - to S on path below FFT",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/FFVO: Burred Bolt x5 - to NW on rock down path, S of FFT",
      { groups: [], region: "Bellum Highway" },
    ],
    ["LL/GLD: Golden Rune [3] - to S on path below FFT", { groups: [], region: "Bellum Highway" }],
    [
      "LL/(FFT): Howl of Shabriri - in chest near top of tower",
      { groups: [], region: "Bellum Highway" },
    ],
    [
      "LL/(TFB/CA): Ornamental Straight Sword - boss drop",
      { groups: [], region: "The Four Belfries (Chapel of Anticipation)" },
    ],
    [
      "LL/(TFB/CA): Golden Beast Crest Shield - boss drop",
      { groups: [], region: "The Four Belfries (Chapel of Anticipation)" },
    ],
    [
      "LL/(TFB/CA): The Stormhawk King - top of church",
      { groups: [], region: "The Four Belfries (Chapel of Anticipation)" },
    ],
    [
      "LL/(TFB/CA): Stormhawk Deenh - chest top of church",
      { groups: [], region: "The Four Belfries (Chapel of Anticipation)" },
    ],
    [
      "AP/AHJ: Great Heal - Brother Corhyn shop to N by map pillar",
      { groups: [], isMissable: true, region: "Altus Plateau" },
    ],
    [
      "AP/AHJ: Lightning Fortification - Brother Corhyn shop to N by map pillar",
      { groups: [], isMissable: true, region: "Altus Plateau" },
    ],
    [
      "AP/FSG: Discus of Light - Brother Corhyn shop FSG waygate",
      { groups: [], isMissable: true, region: "Altus Plateau" },
    ],
    [
      "TSC/CI: Dancer's Castanets - given by Patches just outside boss arena",
      { groups: [], isMissable: true, region: "Altus Plateau" },
    ],
    [
      "AP/PR: Perfume Bottle - under table middle of ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/PR: Perfumer's Cookbook [1] - in chest middle of ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/PR: Golden Rune [5] - on a ledge S side of ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/PR: Omenkiller Robe - enemy drop middle of ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/PR: Omenkiller Long Gloves - enemy drop middle of ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/PR: Omenkiller Boots - enemy drop middle of ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/PR: Perfume Bottle - on a ledge upper part of ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/PR: Perfumer's Talisman - in chest underground",
      { groups: ["Hidden"], region: "Altus Plateau" },
    ],
    ["AP/PR: Budding Cave Moss x4 - by NE doorway", { groups: [], region: "Altus Plateau" }],
    [
      "AP/PR: Nascent Butterfly - hidden behind boards next to underground entrance",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/RP: Lansseax's Glaive - boss drop up hill to SW or NE of AC grace",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/AC: Ash of War: Sacred Order - scarab to NW",
      { groups: ["Scarab"], region: "Altus Plateau" },
    ],
    [
      "AP/AC: Smithing Stone [5] - to NE between broken carriages",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/AC: Fulgurbloom x5 - to E on top of caravan", { groups: [], region: "Altus Plateau" }],
    ["AP/AC: Ruler's Mask - to NE on back of caravan", { groups: [], region: "Altus Plateau" }],
    ["AP/AC: Ruler's Robe - to NE on back of caravan", { groups: [], region: "Altus Plateau" }],
    ["AP/AC: Gold Firefly - to N on far side of lake", { groups: [], region: "Altus Plateau" }],
    [
      "AP/LR: Ash of War: Shield Crash - scarab N side of ruins",
      { groups: ["Scarab"], region: "Altus Plateau" },
    ],
    [
      "AP/AC: Nascent Butterfly - far to E on top of carriages",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/AP: String x5 - to NE down hill E of the cart", { groups: [], region: "Altus Plateau" }],
    ["AP/AP: Lightningproof Dried Liver - to NW by cart", { groups: [], region: "Altus Plateau" }],
    [
      "AP/EGH: Greatshield Talisman - in caravan chest to E",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/EGH: Lightningproof Dried Liver - to W behind hill",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/LR: Ritual Sword Talisman - in chest after boss underground",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/EGH: Lightning Grease - to E in middle of camp", { groups: [], region: "Altus Plateau" }],
    ["AP/LR: String x3 - middle of ruins", { groups: [], region: "Altus Plateau" }],
    ["AP/LR: Golden Rune [3] - on NE ledge", { groups: [], region: "Altus Plateau" }],
    ["AP/EGH: Golden Seed - seedtree to NE", { groups: [], region: "Altus Plateau" }],
    ["AP/WhR: Deathroot - boss drop", { groups: [], region: "Altus Plateau" }],
    ["AP/WhR: Tibia's Summons - boss drop", { groups: [], region: "Altus Plateau" }],
    [
      "AP/WhR: Pearldrake Talisman +1 - in chest underground behind a imp statue",
      { groups: ["Out of the Way"], region: "Altus Plateau" },
    ],
    ["AP/WhR: Smithing Stone [5] - in SW ruin", { groups: [], region: "Altus Plateau" }],
    [
      "AP/WhR: Golden Rune [3] - middle of big ruin platform in water",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/WhR: Golden Rune [7] - in right corner after small arch on entrance stairs",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/WhR: Dappled White Cured Meat - in small room top of ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/WhR: Stormhawk Feather x4 - on lower entrance stairs",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/WhR: Golden Rune [4] - by big arch on entrance stairs",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/WhR: Human Bone Shard x5 - W of big ruin platform in water",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/SH: Smithing Stone [5] - W of SH", { groups: [], region: "Altus Plateau" }],
    ["AP/SH: Antspur Rapier - hostile npc drop W of SH", { groups: [], region: "Altus Plateau" }],
    ["AP/SH: Marais Mask - hostile npc drop W of SH", { groups: [], region: "Altus Plateau" }],
    ["AP/SH: Marais Robe - hostile npc drop W of SH", { groups: [], region: "Altus Plateau" }],
    ["AP/GLE: Hefty Beast Bone x2 - to N in cave", { groups: [], region: "Altus Plateau" }],
    ["AP/AP: Stonesword Key - to E in camp", { groups: [], region: "Altus Plateau" }],
    ["AP/AHJ: Golden Rune [4] - to S on hill E of a camp", { groups: [], region: "Altus Plateau" }],
    ["AP/GLE: Godfrey Icon - boss drop Evergaol", { groups: [], region: "Altus Plateau" }],
    ["AP/AHJ: Perfume Bottle - to N in camp", { groups: [], region: "Altus Plateau" }],
    [
      "AP/AHJ: Ash of War: Earthshaker - scarab to SW on road",
      { groups: ["Scarab"], region: "Altus Plateau" },
    ],
    [
      "AP/AHJ: Troll's Golden Sword - in caravan chest to W in lower camp",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/AHJ: Fan Daggers x5 - to W in S camp", { groups: [], region: "Altus Plateau" }],
    ["AP/AHJ: Sacrificial Twig - in chest to W in N camp", { groups: [], region: "Altus Plateau" }],
    ["AP/AHJ: Warming Stone - to W in middle camp", { groups: [], region: "Altus Plateau" }],
    ["AP/AHJ: Turtle Neck Meat - to N, W of camp by tent", { groups: [], region: "Altus Plateau" }],
    [
      "AP/AHJ: Ash of War: Shared Order - night boss drop to SW",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/AHJ: Golden Seed - seedtree to N", { groups: [], region: "Altus Plateau" }],
    [
      "AP/(SCM): Purifying Crystal Tear - invader drop, requires Yura death",
      { groups: [], isMissable: true, region: "Altus Plateau" },
    ],
    [
      "AP/(SCM): Eleonora's Poleblade - invader drop, requires Yura death",
      { groups: [], isMissable: true, region: "Altus Plateau" },
    ],
    [
      "AP/(SCM): Nagakiba - on Yura after RLA invasion",
      { groups: [], isMissable: true, region: "Altus Plateau" },
    ],
    [
      "AP/EGH: Ash of War: Blood Blade - scarab to NE in pond",
      { groups: ["Scarab"], region: "Altus Plateau" },
    ],
    ["AP/(SCM): Human Bone Shard x6 - by graves", { groups: [], region: "Altus Plateau" }],
    ["AP/SCM: Magic Grease - N of SCM by lower graves", { groups: [], region: "Altus Plateau" }],
    ["AP/(SCM): Sacred Tear - by statue", { groups: ["Out of the Way"], region: "Altus Plateau" }],
    [
      "AP/WbR: Golden Rune [4] - W of WbR on top of hill by group of enemies",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/WbR: Blood Grease x2 - W of WbR by caravan", { groups: [], region: "Altus Plateau" }],
    [
      "AP/OAT: Golden Rune [3] - NE of OAT on a rock slab lower ravine",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/MR: Miquella's Lily - W of MR by grave", { groups: [], region: "Altus Plateau" }],
    [
      "AP/OAT: Nascent Butterfly - N of OAT on upper path of ravine by bridge",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/(MR): Unseen Blade - in chest top of tower",
      { groups: ["Rise"], region: "Altus Plateau" },
    ],
    [
      "AP/(MR): Unseen Form -  in chest top of tower",
      { groups: ["Rise"], region: "Altus Plateau" },
    ],
    [
      "AP/(MR): Slumbering Egg x5 - top of tower on body",
      { groups: ["Rise"], region: "Altus Plateau" },
    ],
    ["AP/MR: Golden Rune [3] - SE of MR", { groups: [], region: "Altus Plateau" }],
    ["AP/(MR): Mirage Riddle - imp statue holding book", { groups: [], region: "Altus Plateau" }],
    ["AP/OAT: Black-Key Bolt x20 - invade Rileigh", { groups: [], region: "Altus Plateau" }],
    ["AP/OAT: Crepus's Vial - invade Rileigh", { groups: [], region: "Altus Plateau" }],
    [
      "AP/WbR: Golden Rune [10] - enemy drop SW of WbR, by the top of a spritsping",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCIG: Perfume Bottle - top of lower shortcut ladder on ledge to W",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCIG: Perfumer's Cookbook [2] - top of upper NW tower",
      { groups: [], region: "Altus Plateau" },
    ],
    ["TSC/SCIG: Marais Executioner's Sword - boss drop", { groups: [], region: "Altus Plateau" }],
    ["TSC/SCIG: Briar Greatshield - boss drop", { groups: [], region: "Altus Plateau" }],
    [
      'TSC/SCR: "Champion\'s Song" Painting - follow E wall, painting in wood structure down in pit',
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/SCR: Golden Rune [3] - to SW outside castle, follow outer wall into a cubby",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Smithing Stone [5] - from SW inner swamp, follow outer wall to E, at end",
      { groups: [], region: "Altus Plateau" },
    ],
    ["TSC/SCR: Poisonbloom x4 - to S on outer wall", { groups: [], region: "Altus Plateau" }],
    [
      "TSC/SCR: Poisonbone Dart x5 - follow E wall, down in pit",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Golden Rune [6] - follow E wall onto E platform",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Smithing Stone [4] - down ladder, on wood structure to NW",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Somber Smithing Stone [5] - SW inner swamp, N end behind tree",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Smithing Stone [5] - N end of W outer wall, down in pit",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Drawstring Fire Grease x2 - S inner swamp, NW corner",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Golden Rune [6] - S inner swamp, on wood ramp",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Beast Blood - SW inner swamp, NW from tall ladder",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Neutralizing Boluses x2 - W outer wall, in S dead-end",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Glass Shard x2 - on ledge before NW inner wall tower",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Stonesword Key - down ladder, to NE up on ledge, parkour",
      { groups: [], region: "Altus Plateau" },
    ],
    ["TSC/SCIG: Golden Rune [6] - to S by big tree", { groups: [], region: "Altus Plateau" }],
    ["AP/SCR: Poison Grease - to S out in swamp", { groups: [], region: "Altus Plateau" }],
    [
      "TSC/SCIG: Hefty Beast Bone x4 - after upper NW tower, to S before bridge",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCIG: Smithing Stone [5] - in courtyard before boss elevator in NW corner",
      { groups: [], region: "Altus Plateau" },
    ],
    ["TSC/SCIG: Gold Firefly x2 - in upper NE tower", { groups: [], region: "Altus Plateau" }],
    ["TSC/SCR: Glass Shard - follow E wall, down in pit", { groups: [], region: "Altus Plateau" }],
    [
      "TSC/SCIG: Smithing Stone [5] - N corner of SE inner wall",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Smithing Stone [5] - S inner swamp, SE corner",
      { groups: [], region: "Altus Plateau" },
    ],
    ["TSC/SCIG: Golden Rune [4] - just SE of grace", { groups: [], region: "Altus Plateau" }],
    [
      "TSC/SCIG: Smithing Stone [4] - middle inner swamp, NE corner in wood structure",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Valkyrie's Prosthesis - in chest NW inner wall tower",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/TSC: Starlight Shards - N behind TSC by statue", { groups: [], region: "Altus Plateau" }],
    [
      "TSC/SCIG: Ghost Glovewort [4] - enemy drop to E middle courtyard",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "TSC/SCR: Ghost Glovewort [4] - enemy drop SW inner swamp, N end behind tree",
      { groups: [], region: "Altus Plateau" },
    ],
    ["TSC/SCIG: Rot Grease x3 - to E middle courtyard", { groups: [], region: "Altus Plateau" }],
    [
      "AP/AHJ: Gravity Stone Fan x4 - to SE in SW gravity craters",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/SHG: Ash of War: Lightning Ram - scarab SE of SHG",
      { groups: ["Scarab"], region: "Altus Plateau" },
    ],
    ["AP/AHJ: Old Fang x3 - to E on platform", { groups: [], region: "Altus Plateau" }],
    ["AP/(ScC): Dragonbolt Blessing - in chest", { groups: [], region: "Altus Plateau" }],
    ["AP/AHJ: Beast Blood - to SE by tent", { groups: [], region: "Altus Plateau" }],
    ["AP/(ScC): Lightning Greatbolt x10 - on corpse", { groups: [], region: "Altus Plateau" }],
    ["AP/(ScC): Sacred Tear - by statue", { groups: ["Out of the Way"], region: "Altus Plateau" }],
    ["AP/FSG: Scorpion Kite Shield - Nomadic Merchant", { groups: [], region: "Altus Plateau" }],
    ["AP/FSG: Red Crest Heater Shield - Nomadic Merchant", { groups: [], region: "Altus Plateau" }],
    [
      "AP/FSG: Crossed-Tree Towershield - Nomadic Merchant",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/FSG: Tree Surcoat - Nomadic Merchant", { groups: [], region: "Altus Plateau" }],
    [
      "AP/FSG: Festering Bloody Finger x3 - Nomadic Merchant",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/FSG: Stonesword Key x3 - Nomadic Merchant", { groups: [], region: "Altus Plateau" }],
    ["AP/FSG: Note: Imp Shades - Nomadic Merchant", { groups: [], region: "Altus Plateau" }],
    ["AP/FSG: Note: Unseen Assassins - Nomadic Merchant", { groups: [], region: "Altus Plateau" }],
    [
      "AP/FSG: Ancient Dragon Apostle's Cookbook [2] - Nomadic Merchant",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/FSG: Gravel Stone x8 - Nomadic Merchant", { groups: [], region: "Altus Plateau" }],
    ["AP/AHJ: Map: Altus Plateau - to N by map pillar", { groups: [], region: "Altus Plateau" }],
    ["AP/SHG: Black Knife - boss drop guarding SHG", { groups: [], region: "Altus Plateau" }],
    ["AP/STH: Amber Starlight - by statue", { groups: [], region: "Altus Plateau" }],
    ["AP/SHG: Golden Rune [6] 1 - graveyard S of SHG", { groups: [], region: "Altus Plateau" }],
    ["AP/SHG: Golden Rune [6] 2 - graveyard S of SHG", { groups: [], region: "Altus Plateau" }],
    ["AP/SHG: Golden Rune [4] 1 - graveyard S of SHG", { groups: [], region: "Altus Plateau" }],
    ["AP/SHG: Golden Rune [3] - graveyard S of SHG", { groups: [], region: "Altus Plateau" }],
    ["AP/SHG: Golden Rune [4] 2 - graveyard S of SHG", { groups: [], region: "Altus Plateau" }],
    [
      "AP/(WbR): Great Stars - invade Magus",
      { groups: [], isMissable: true, region: "Altus Plateau" },
    ],
    [
      "AP/(WbR): Somber Smithing Stone [6] - invade Magus",
      { groups: [], isMissable: true, region: "Altus Plateau" },
    ],
    [
      "AP/BB: Somber Smithing Stone [5] - scarab to SW",
      { groups: ["Scarab"], region: "Altus Plateau" },
    ],
    ["AP/(WbR): Golden Rune [5] - SW corner of ruin", { groups: [], region: "Altus Plateau" }],
    [
      "AP/(WbR): Bloody Helice - in chest after boss underground",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/BB: Nascent Butterfly - to N up a hill", { groups: [], region: "Altus Plateau" }],
    [
      "AP/FSG: Fulgurbloom x4 - to N under upper bridge on ledge",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/FSG: Golden Arrow x10 - to N on bridge", { groups: [], region: "Altus Plateau" }],
    [
      "AP/FSG: Lump of Flesh x3 - to N of bridge on small bridge ruin",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/FSG: Hefty Beast Bone x2 - to N under lower bridge arch",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/RISP: Protection of the Erdtree - scarab to SW",
      { groups: ["Scarab"], region: "Altus Plateau" },
    ],
    ["AP/RISP: Great Stars - in caravan chest to SW", { groups: [], region: "Altus Plateau" }],
    [
      "AP/RISP: Gravel Stone x2 - to SW by lone grave overlooking TSC",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/RISP: Stimulating Boluses x2 - to S on upper broken bridge",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/FSG: Dragonwound Grease - FSG waygate, to S", { groups: [], region: "Altus Plateau" }],
    [
      "AP/RISP: Radiant Gold Mask - to S on lower broken bridge end",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/RISP: Golden Rune [10] - enemy drop to W under grave steps",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/WWP: Giant Rat Ashes - in stable", { groups: [], region: "Altus Plateau" }],
    [
      "AP/FSG: Haima Glintstone Crown - FSG waygate, enemy drop to NW on hill tip",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/FSG: Battlemage Robe - FSG waygate, enemy drop to NW on hill tip",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/FSG: Battlemage Manchettes - FSG waygate, enemy drop to NW on hill tip",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/FSG: Battlemage Legwraps - FSG waygate, enemy drop to NW on hill tip",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/AHJ: Gravity Stone Fan x10 - boss drop S of great stairs in meteor crater",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/AHJ: Gravity Stone Chunk x10 - boss drop S of great stairs in meteor crater",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/AHJ: Smithing Stone [6] x5 - boss drop S of great stairs in meteor crater",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/AHJ: Somber Smithing Stone [5] - boss drop S of great stairs in meteor crater",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/AHJ: Erdtree Greatshield - boss drop duo to E top of great stairs",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/AHJ: Hero's Rune [1] - boss drop duo to E top of great stairs",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/RP: Golden Rune [3] - to S down SE path in graveyard, E of spirtsping",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/RP: Golden Rune [6] - to S down SE path in graveyard, near entrance",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/RP: Silver-Pickled Fowl Foot - to S down SE path in graveyard, S of spirtsping",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/AHJ: Gravity Stone Chunk x2 - to SE in NE gravity craters",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      'AP/RP: Harp Bow - "Champion\'s Song" Painting reward to S top of grave steps',
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/RP: Golden Rune [8] - graveyard to N", { groups: [], region: "Altus Plateau" }],
    ["AP/RP: Golden Rune [6] - graveyard to N", { groups: [], region: "Altus Plateau" }],
    ["AP/RP: Golden Rune [4] - graveyard to N", { groups: [], region: "Altus Plateau" }],
    ["AP/RP: Golden Rune [3] - graveyard to N", { groups: [], region: "Altus Plateau" }],
    ["AP/RP: Golden Rune [1] - graveyard to N", { groups: [], region: "Altus Plateau" }],
    ["AP/FSG: Lump of Flesh - to SE by tent", { groups: [], region: "Altus Plateau" }],
    [
      "AP/RP: Land Octopus Ovary - to S down SE path by tent",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/SHG: Stonesword Key - SE of SHG on platform", { groups: [], region: "Altus Plateau" }],
    [
      "AP/ME: Crimsonspill Crystal Tear - boss drop, Minor Erdtree",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/ME: Speckled Hardtear - boss drop, Minor Erdtree",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/(WfR): Nomadic Warrior's Cookbook [19] - in ruins N of ME",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/(WfR): Ash of War: Golden Slam - scarab in ruins N of ME",
      { groups: ["Scarab"], region: "Altus Plateau" },
    ],
    [
      "AP/(WfR): Poisonbone Dart x5 - in ruins NE of S most ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/(WfR): Wrath of Gold - in chest underground in S most ruins",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/(WfR): Invigorating White Cured Meat - in E ruins, N item",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/(WfR): Beast Blood x2 - in ruins NE of ME", { groups: [], region: "Altus Plateau" }],
    ["AP/(WfR): Gravel Stone x2 - in NE ruins, NE item", { groups: [], region: "Altus Plateau" }],
    ["AP/(WfR): Soft Cotton - in E ruins, S item", { groups: [], region: "Altus Plateau" }],
    ["AP/(WfR): Icon Shield - in NE ruins, SW item", { groups: [], region: "Altus Plateau" }],
    [
      "AP/WV: Poison Grease - to W on left lower windmill stairs",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/ME: Golden Seed - seedtree N of ME",
      { groups: ["Out of the Way"], region: "Altus Plateau" },
    ],
    ["AP/EWP: Twinned Knight Swords - corpse", { groups: [], region: "Altus Plateau" }],
    ["AP/VWP: Raw Meat Dumpling x10 - in stable", { groups: [], region: "Altus Plateau" }],
    ["AP/EWP: Noble's Traveling Garb - cloaked corpse", { groups: [], region: "Altus Plateau" }],
    ["AP/EWP: Noble's Gloves - cloaked corpse", { groups: [], region: "Altus Plateau" }],
    ["AP/EWP: Noble's Trousers - cloaked corpse", { groups: [], region: "Altus Plateau" }],
    ["AP/EWP: Navy Hood - cloaked corpse", { groups: [], region: "Altus Plateau" }],
    [
      "AP/RP: Lightning Greatbolt x3 - to NE by flipped catapults",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/RP: Somber Smithing Stone [5] - to N in lower ruin chair",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/RP: Larval Tear - enemy drop to N in upper ruin", { groups: [], region: "Altus Plateau" }],
    [
      'AP/(DWV): Fire\'s Deadly Sin - "Flightless Bird" Painting reward S from boss',
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/WV: Four-Toed Fowl Foot x3 - to S by cart", { groups: [], region: "Altus Plateau" }],
    [
      "AP/(DWV): Golden Rune [5] - first area in left stable behind boxes",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/(DWV): Holyproof Dried Liver - right of second area",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/(DWV): Stormhawk Feather x3 - second area on right house",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/(HLT): Hefty Beast Bone x10 - second floor", { groups: [], region: "Altus Plateau" }],
    ["AP/(HLT): Golden Arrow x6 - on outer ledge", { groups: [], region: "Altus Plateau" }],
    ["AP/(HLT): Greatbow - in chest top of tower", { groups: [], region: "Altus Plateau" }],
    ["AP/(HLT): Great Arrow x20 - in chest top of tower", { groups: [], region: "Altus Plateau" }],
    ["AP/(DWV): Gold Firefly - S from boss", { groups: [], region: "Altus Plateau" }],
    [
      "AP/(DWV): Lightning Grease - upper second area behind E house",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/(DWV): Exalted Flesh x2 - upper second area on W house",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/(DWV): Rune Arc - first area in right house", { groups: [], region: "Altus Plateau" }],
    ["AP/WV: Golden Seed - seedtree to SE", { groups: [], region: "Altus Plateau" }],
    ["AP/(DWV): Godskin Peeler - boss drop", { groups: [], region: "Altus Plateau" }],
    ["AP/(DWV): Scouring Black Flame - boss drop", { groups: [], region: "Altus Plateau" }],
    [
      "AP/(DWV): Celebrant's Skull - N from grace down cliff path",
      { groups: [], region: "Altus Plateau" },
    ],
    [
      "AP/HLT: Ash of War: Lightning Slash - scarab SE of HLT",
      { groups: ["Scarab"], region: "Altus Plateau" },
    ],
    [
      "AP/HLT: Golden Rune [9] - SE of HLT by tent just before CO entrance",
      { groups: [], region: "Altus Plateau" },
    ],
    ["AP/SR: Ash of War: Barrage - scarab to N", { groups: ["Scarab"], region: "Altus Plateau" }],
    ["AP/SR: Arrow x10 - to NE under slanted rock", { groups: [], region: "Altus Plateau" }],
    [
      "LRC|LAC/RC: Immutable Shield - Brother Corhyn shop after using Law of Regression and telling Goldmask",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Sanctified Whetblade - second floor where blacksmith sits",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Cracked Pot - down right sewer, to NE in upper room",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Perfume Bottle - in chest down W path, down elevator, up ladder in room to E",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Perfume Bottle - up stairs, to NE past door, end of right side",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC|LAC/RC: Flail - kill Brother Corhyn",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC|LAC/RC: Corhyn's Robe - kill Brother Corhyn",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Ash of War: Thunderbolt - scarab down stairs to NW, over left railing before dragon wing",
      { groups: ["Scarab"], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      'LRC/FMFF: "Flightless Bird" Painting - by grace',
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Alberich's Pointed Hat - up stairs, to SW in old RH, middle of lower carpet",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Alberich's Robe - up stairs, to SW in old RH, middle of lower carpet",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Alberich's Bracers - up stairs, to SW in old RH, middle of lower carpet",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Alberich's Trousers - up stairs, to SW in old RH, middle of lower carpet",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Hefty Beast Bone - down right sewer, to NE under middle item",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Deathbed Dress - on bed",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Lionel's Helm - on bed",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Lionel's Armor - on bed",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Lionel's Gauntlets - on bed",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Lionel's Greaves - on bed",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Cave Moss x10 - down W path, lower room end of upper wall, under stairs",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Hammer - second floor where blacksmith sits",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Preserving Boluses - down W path, down elevator, in room to E",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Rune Arc - second floor on broken round table",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: String x4 - down left sewer, to W",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Hero's Rune [1] - second floor in room behind blacksmith, on bed",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Upper-Class Robe - down W path, down elevator, up ladder, outside to left, far E end",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [12] - down NW stairs, to right over railing along ledge, on rooftop",
      { groups: ["Out of the Way"], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Miranda Powder x10 - up stairs, to left, to right at second caravan, inside, next room to left past breakable boxes",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Guilty Hood - down right sewer, to NE far lower sewer",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Smithing Stone [6] - up stairs, halfway up left stairs, to left over railing, by tree",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Stormhawk Axe - in divine bridge courtyard by SE wall",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Warming Stone x5 - up stairs, to left, to right at second caravan, inside by pillar",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [10] - up stairs, to left, to right at second caravan, inside by wall",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Black-Key Bolt x20 - across main hall in room by table",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Gravel Stone x2 - up stairs, to right, up left stairs, on railing to left",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Fan Daggers x8 - up stairs, to left, to right at second caravan, in right dead-end",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Somber Smithing Stone [6] - in NW hall of divine bridge courtyard",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Gold Firefly x3 - up stairs, to NE on left",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Hero's Rune [5] - up stairs, to NE in church on carpet",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Holy Grease - up stairs, to E on caravan",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [11] - up stairs, up left stairs, to left in ash dead-end, item 1",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [8] - up stairs, to SW on stairs item 1",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Hero's Rune [2] - up stairs, to right, up left stairs, past fountain to right, by wall",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Old Fang x3 - up stairs, to left, to right after caravan, after passage",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Somber Smithing Stone [6] - enemy drop up stairs, to right, up left stairs, behind fountain to right",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Beast Blood - enemy drop up stairs, to right, up left stairs, behind fountain to right",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Old Fang x2 - enemy drop up stairs, to right, up left stairs, behind fountain to right",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Smithing Stone [4] - up stairs, halfway up left stairs, to left in gazebo",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [8] - up stairs, up left stairs, to left in ash dead-end, item 2",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [13] - up stairs, to right, up left stairs, on left",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Somber Smithing Stone [5] - up stairs, up left stairs, to left in ash dead-end, item 3",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [8] - up stairs, up left stairs, to left behind building arches",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [12] - up stairs, to SW on stairs item 2",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Lordsworn's Bolt x10 - up stairs, up left stairs, to right behind building on left",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Lightningproof Dried Liver x2 - up stairs, to SW on stairs item 3",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Tarnished Golden Sunflower x8 - up stairs, to right, up left stairs, behind gazebo",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Stonesword Key - up stairs, to right, up left stairs, on lower gazebo to left",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [10] - up stairs, to right, up left stairs, past fountain to right, on ground",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [8] - up stairs, to right, behind stairs left of main stairs",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [9] - up stairs, to NE under caravan",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Smithing Stone [6] - down W path, drop to roof before elevator, drop off right side of 5th roof",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Golden Rune [9] - down W path, drop to roof before elevator, drop to right, by railing",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Arteria Leaf x2 - up stairs, to left, to right across from church, in right alcove",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Imp Head (Corpse) - up stairs, to left, to right at massive gate",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [9] - up stairs, to NE in church in corner",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Seedbed Curse - down W path, down elevator, top floor of building to E",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Smithing Stone [6] - to W in corner",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Golden Rune [9] - down W path, drop to roof before elevator, on 5th roof",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Smithing Stone [5] - down W path, down elevator, up ladder, outside on roof to right",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Stonesword Key - down W path, drop to roof before elevator, to left from 7th roof",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/ECR: Golden Rune [12] - down W path, drop to roof before elevator, to right from 7th roof",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Beast Blood x3 - up stairs, to NE past door, on right between buildings",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [9] - up stairs, to NE past door, halfway down right side before caravan",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Lightningproof Dried Liver - up stairs, to NE past door, halfway down right side behind caravan",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Gravel Stone - shortcut door ladder, to NE right of big stairs",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Stonesword Key - shortcut door ladder, to NE in right courtyard, on grave",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [9] - shortcut door ladder, to NE on left",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Smithing Stone [4] - shortcut door ladder, to NE in right courtyard, on body pile",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Golden Arrow x15 - down right sewer, to NE past upper room, to left along wall, item 1",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Smithing Stone [6] - down right sewer, to NE past upper room, to left along wall, item 2",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Clarifying Boluses - shortcut door ladder, second floor",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Golden Rune [8] - down right sewer, to NE under by wall",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Lost Ashes of War - down left sewer, in SE long dead-end",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Rune Arc - down stairs to NW, over left railing before dragon wing, down well ladder",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Erdsteel Dagger - down stairs to NW, down ladder at far left end, by wall",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Poisonbone Dart x8 - down left sewer, in SE short dead-end",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Somber Smithing Stone [6] - down stairs to NW, down far left stairs, in back SW corner behind crumbled wall",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Albinauric Bloodclot - down stairs to NW, over left railing before dragon wing, by well",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Smithing Stone [5] - down stairs to NW, over left railing before dragon wing, hanging over sewer to SE",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Pickled Turtle Neck x3 - down stairs to NW, over left railing before dragon wing, to NE in corridor",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Smithing Stone [6] - outside to right",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Golden Rune [9] - down stairs to NW along right railing",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Black Bow - shortcut door ladder, to NE on left rooftop, top of big stairs",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Dragonwound Grease - down stairs to NW by castle gate",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Two Fingers' Prayerbook - across main hall in room by fireplace",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Smithing Stone [5] - in armory before main hall",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Golden Rune [9] - on roof leading to second floor",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Smithing Stone [6] - second floor on stairs leading down",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Holyproof Dried Liver - down stairs to NW, down ladder at far left end, item 1",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Furlcalling Finger Remedy - second floor in Gideon's room",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Gravel Stone x3 - outside to NW, behind dragon leg",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Smithing Stone [5] - second floor on railing overlooking main hall",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Old Fang x5 - outside to NW, in right stable",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Smithing Stone [6] - outside to NW, second floor of left stable, by hole",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Nascent Butterfly x3 - in divine bridge courtyard behind W statue",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Stonesword Key - outside to NW, second floor of left stable, on wall",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Fan Daggers x5 - down stairs to NW, down ladder at far left end, item 2",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Coded Sword - second floor in twin fingers chair",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Stonesword Key - in chest shortcut door ladder, in cell",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Somber Smithing Stone [4] - enemy drop down left sewer, in SE long dead-end",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Raging Wolf Helm - invade Vargram",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Raging Wolf Armor - invade Vargram",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Raging Wolf Gauntlets - invade Vargram",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Raging Wolf Greaves - invade Vargram",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/WCR: Gargoyle's Halberd - enemy drop to SE by seedtree",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/FMFF: Gravel Stone Seal - enemy drop outside to NW",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/QB: Blessing of the Erdtree - on bed",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Omensmirk Mask - enemy drop outside to right",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/LCC: Golden Seed - enemy drop down right sewer, to NE past upper room, middle of area",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/AB: Lord's Rune - enemy drop to SE up stairs",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital" },
    ],
    [
      "LRC/WCR: Talisman Pouch - mainboss drop",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/WCR: Holy Grease x3 - to SE, down sub branch before boss arena",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/WCR: Golden Seed - seedtree to SE",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/WCR: Smithing Stone [6] - to SE down stairs NW of seedtree on ledge",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/WCR: Smithing Stone [6] - to S down lower branch path, on broken bridge",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/WCR: Cane Sword - to SE down NW stairs in corner of room",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/WCR: Golden Rune [9] - jump down to SW, by lever",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/AB: Rune Arc - down stairs to NW, up dragon wing before ladder",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/WCR: Gravel Stone x5 - to NW on right ledge",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/WCR: Golden Rune [11] - to NW in room",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/FMFF: Seedbed Curse - second floor in Dung Eaters room, gets moved outside in LAC",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/RC: Ritual Shield Talisman - on colo stairs",
      { groups: ["Out of the Way"], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/RC: Star Fist - in SE alcove",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/RC: Furlcalling Finger Remedy - in SW alcove",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/RC: Smithing Stone [5] - on far SE end on rock",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/ECR: Furlcalling Finger Remedy - down E path, on church altar",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/ECR: Magic Grease x3 - down E path, in hallway after church",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/ECR: Smithing Stone [4] - down W path, in room under semi circle platform",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/ECR: Golden Rune [7] - down W path, down stairs after semi circle platform",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/ECR: Golden Rune [10] - down W path, on semi circle platform",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/AB: Nascent Butterfly x3 - up stairs, to NE past door, on stairs near top",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/AB: Exalted Flesh - up stairs, to NE past door, on ledge near top of stairs",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/AB: Soporific Grease x2 - up stairs, to NE past door, up stairs, to NW in corner",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC|LAC/AB: Somber Smithing Stone [6] - up stairs, to NE past door, up stairs to NW down pit behind statue",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "DTEA: Flamedrake Talisman +1 - E of leyndell elevator by pillar",
      { groups: [], region: "Leyndell, Royal Capital Unmissable" },
    ],
    [
      "LRC/QB: Morgott's Great Rune - mainboss drop",
      { groups: [], region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/QB: Remembrance of the Omen King - mainboss drop",
      { groups: [], region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/ET: Rold Medallion - talk to Melina after boss",
      { groups: [], region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/ES: Barrier of Gold - scarab to W down elevator, down stairs",
      { groups: ["Scarab"], isMissable: true, region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC|LAC/ES: Erdtree Bow - in chest second floor",
      { groups: [], region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC|LAC/ES: Celestial Dew - by shortcut ladder on second floor",
      { groups: [], region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC|LAC/ES: Golden Order Principia - on hanging chair second floor",
      { groups: [], region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC|LAC/ES: Somber Smithing Stone [5] x3 - in NW corner of boss arena",
      { groups: [], region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC|LAC/ES: Holy Grease x6 - to SE in gazebo",
      { groups: [], region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/ES: Holy Grease x5 - to W down elevator, down stairs by tree",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/ES: Bolt of Gransax - to W down elevator, on the big bolt",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/ES: Golden Order Flail - to W down elevator, invader drop after using Law of Regression at statue",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/ES: Broken Gold Mask - to W down elevator, invader drop after using Law of Regression at statue",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/ES: Gold Tattoo (Chest) - to W down elevator, invader drop after using Law of Regression at statue",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/ES: Gold Tattoo (Arm) - to W down elevator, invader drop after using Law of Regression at statue",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC/ES: Gold Tattoo (Leg) - to W down elevator, invader drop after using Law of Regression at statue",
      { groups: [], isMissable: true, region: "Leyndell, Royal Capital Throne" },
    ],
    [
      "LRC|LAC/(DB): Blessed Dew Talisman - in chest",
      { groups: ["Out of the Way"], region: "Divine Bridge" },
    ],
    [
      "LAC/RC: Mending Rune of Perfect Order - on Goldmask's body",
      { groups: ["Post Leyndell"], isMissable: true, region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/RC: Goldmask's Rags - on Goldmask's body",
      { groups: ["Post Leyndell"], isMissable: true, region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/RC: Gold Bracelets - on Goldmask's body",
      { groups: ["Post Leyndell"], isMissable: true, region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/RC: Gold Waistwrap - on Goldmask's body",
      { groups: ["Post Leyndell"], isMissable: true, region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: Scepter of the All-Knowing - boss drop",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: All-Knowing Helm - boss drop",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: All-Knowing Armor - boss drop",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: All-Knowing Gauntlets - boss drop",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: All-Knowing Greaves - boss drop",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/QB: Erdtree Heal - on bed",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: Somber Ancient Dragon Smithing Stone - by destroyed roundtable hold frontdoor",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: Tarnished Golden Sunflower - to SW inside building",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: Rune Arc - to S on ground",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: Golden Sunflower - to SW on statue",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: Hero's Rune [4] - far to S on building",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/FL: Erdtree's Favor +2 - backtrack from forbidden lands, SW corner on branch",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/LCA: Crimson Amber Medallion +2 - to S down manhole",
      { groups: ["Out of the Way", "Post Leyndell"], region: "Leyndell, Ashen Capital" },
    ],
    [
      "LAC/QB: Remembrance of Hoarah Loux - mainboss drop",
      { groups: ["Post Leyndell"], region: "Leyndell, Ashen Capital Throne" },
    ],
    [
      "AR/UPR: Prisoner Iron Mask - Hermit Merchant NW of UPR in temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Prisoner Clothing - Hermit Merchant NW of UPR in temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Prisoner Trousers - Hermit Merchant NW of UPR in temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Celestial Dew - Hermit Merchant NW of UPR in temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Gravity Stone Fan x20 - Hermit Merchant NW of UPR in temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Gravity Stone Chunk x10 - Hermit Merchant NW of UPR in temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Nomadic Warrior's Cookbook [16] - Hermit Merchant NW of UPR in temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Perfumer's Cookbook [4] - Hermit Merchant NW of UPR in temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Lost Ashes of War - Hermit Merchant NW of UPR in temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Map: Ainsel River - NW of UPR in temple by merchant",
      { groups: [], region: "Ainsel River" },
    ],
    ["AR/ARD: Frozen Lightning Spear - boss drop", { groups: [], region: "Ainsel River" }],
    ["AR/(UPR): Golden Rune [1] - NE corner by dam", { groups: [], region: "Ainsel River" }],
    [
      "AR/(UPR): Golden Rune [2] - NW of elevator in corner ruin",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/(UPR): Smithing Stone [1] - W of elevator by pillar",
      { groups: [], region: "Ainsel River" },
    ],
    ["AR/ARWD: Magic Grease x3 - to N by waterfall", { groups: [], region: "Ainsel River" }],
    [
      "AR/(UPR): Golden Rune [3] - W of elevator by broken pillars",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARWD: Rune Arc - enemy drop S of corpse and coffin room",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARWD: Golden Rune [10] - enemy drop S of corpse and coffin room",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARWD: Smithing Stone [3] - corpse and coffin room, by S exit",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARSG: Shattershard Arrow (Fletched) x10 - to N down below middle of dam",
      { groups: [], region: "Ainsel River" },
    ],
    ["AR/ARWD: Grace Mimic x8 - to W on coffin", { groups: [], region: "Ainsel River" }],
    [
      "AR/ARD: Immunizing Horn Charm - to SW on corpses item 2",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARWD: Smithing Stone [3] - to W first left in dead-end",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARWD: Golden Rune [1] - corpse and coffin room, by W exit",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARSG: Smithing Stone [3] - to N down below in corner",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Throwing Dagger x6 - NW of UPR on stairs item 2",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Smithing Stone [3] x2 - NW of UPR down path over some rocks, on end of beam after climbing pillar",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Golden Rune [2] - NW of UPR on corpse under skylight",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Shield Grease - N of UPR by corner ruin NE of first stairs",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARD: Smithing Stone [3] x3 - to NE on ledge overlooking grace",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARWD: Smithing Stone [4] - S of corpse and coffin room, on pillar arch",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARD: Smithing Stone [2] x3 - to SW on corpses item 1",
      { groups: [], region: "Ainsel River" },
    ],
    ["AR/ARD: Formic Rock - to SW on corpses item 3", { groups: [], region: "Ainsel River" }],
    ["AR/ARD: Crystal Dart x5 - to SW on corpses item 4", { groups: [], region: "Ainsel River" }],
    [
      "AR/ARD: Soap x4 - to SW past corpses to right just before ledge overlooking LR",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARD: Somber Smithing Stone [3] - to SW past corpses on ledge overlooking LR",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARD: Melted Mushroom x3 - W corner in big room before boss",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Golden Rune [3] - N of UPR on pillar in river",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/ARWD: Celestial Dew - S of corpse and coffin room, drop to SW from pillar arch",
      { groups: [], region: "Ainsel River" },
    ],
    ["AR/ARWD: Golden Rune [3] - to NW in coffin", { groups: [], region: "Ainsel River" }],
    [
      "AR/ARWD: Silver Firefly x2 - corpse and coffin room, by entrance",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Golden Rune [3] - NW of UPR on second stairs leading up to temple",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Magic Grease x2 - NW of UPR on stairs item 3",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Golden Rune [3] - NW of UPR on stairs item 4",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Furlcalling Finger Remedy - NW of UPR on stairs item 1",
      { groups: [], region: "Ainsel River" },
    ],
    [
      "AR/UPR: Smithing Stone [1] x3 - NW of UPR down path over some rocks, on ledge",
      { groups: [], region: "Ainsel River" },
    ],
    ["AR/ARD: Great Ghost Glovewort - in chest after boss", { groups: [], region: "Ainsel River" }],
    ["LR: Remembrance of the Naturalborn - mainboss drop", { groups: [], region: "Lake of Rot" }],
    ["LR/LRS: Map: Lake of Rot - to S", { groups: [], region: "Lake of Rot" }],
    [
      "LR/GC: Nomadic Warrior's Cookbook [22] - in chest SW corner of LR within structure",
      { groups: [], region: "Lake of Rot" },
    ],
    ["LR/LRS: Dragonscale Blade - boss drop", { groups: [], region: "Lake of Rot" }],
    [
      "LR/LRS: Somber Smithing Stone [6] - scarab to S most part of LR",
      { groups: ["Scarab"], region: "Lake of Rot" },
    ],
    [
      "LR/LRS: Somber Smithing Stone [8] - SE corner of LR on tilted pillar",
      { groups: [], region: "Lake of Rot" },
    ],
    [
      "LR/LRS: Somber Smithing Stone [9] - NE corner on top of the raised structure",
      { groups: [], region: "Lake of Rot" },
    ],
    ["LR/LRS: Rot Grease - to SW by tip of first platform", { groups: [], region: "Lake of Rot" }],
    [
      "LR/LRS: Black-Key Bolt x10 - W of first platform by nothing",
      { groups: [], region: "Lake of Rot" },
    ],
    [
      "LR/LRS: Warming Stone - middle of second platform area",
      { groups: [], region: "Lake of Rot" },
    ],
    [
      "LR/LRS: Lightningproof Dried Liver - SW side of boss arena",
      { groups: [], region: "Lake of Rot" },
    ],
    ["LR/LRS: Aeonian Butterfly - to E", { groups: [], region: "Lake of Rot" }],
    ["LR/LRS: Somber Smithing Stone [7] - way to E in ruin", { groups: [], region: "Lake of Rot" }],
    ["LR/LRS: Golden Rune [9] - way to SE on broken beam", { groups: [], region: "Lake of Rot" }],
    [
      "LR/LRS: Mushroom Crown - SE corner of LR on pillar within ruin",
      { groups: [], region: "Lake of Rot" },
    ],
    [
      "LR/GC: Preserving Boluses - to N up stairs on left after river",
      { groups: [], region: "Lake of Rot" },
    ],
    ["LR/LRS: Golden Rune [7] - middle of boss arena", { groups: [], region: "Lake of Rot" }],
    ["LR/LRS: Golden Rune [10] - W side of boss arena", { groups: [], region: "Lake of Rot" }],
    [
      "LR/GC: Golden Rune [10] - to W on backside of top ledge",
      { groups: [], region: "Lake of Rot" },
    ],
    [
      "LR/GC: Smithing Stone [5] - on stairs leading to W temple item 1",
      { groups: [], region: "Lake of Rot" },
    ],
    [
      "LR/GC: Fan Daggers x8 - on stairs leading to W temple item 2",
      { groups: [], region: "Lake of Rot" },
    ],
    [
      "LR/GC: Golden Rune [10] - just S after ledge drop downs",
      { groups: [], region: "Lake of Rot" },
    ],
    ["LR/GC: Smithing Stone [7] - by rot waterfall item 1", { groups: [], region: "Lake of Rot" }],
    ["LR/GC: Smithing Stone [6] - by rot waterfall item 2", { groups: [], region: "Lake of Rot" }],
    ["LR/LRS: Somber Smithing Stone [8] - to NE", { groups: [], region: "Lake of Rot" }],
    [
      "LR/LRS: Somber Smithing Stone [7] - W of first platform by mushroom land",
      { groups: [], region: "Lake of Rot" },
    ],
    ["LR/GC: Scorpion's Stinger - in chest within W temple", { groups: [], region: "Lake of Rot" }],
    [
      "LR/LRS: Immunizing Horn Charm +1 - enemy drop way to SE, W of broken beam",
      { groups: [], region: "Lake of Rot" },
    ],
    ["LR/GC: Golden Seed - enemy drop by rot waterfall", { groups: [], region: "Lake of Rot" }],
    [
      "LR/LRS: Alabaster Lord's Sword - enemy drop on top of the raised structure",
      { groups: [], region: "Lake of Rot" },
    ],
    [
      "NS/NWB: Discarded Palace Key - invader drop to SE, need Miniature Ranni",
      { groups: [], isMissable: true, region: "Ainsel River Main" },
    ],
    [
      "ARM/ARM: Miniature Ranni - to N after giving Ranni Fingerslayer Blade",
      { groups: [], isMissable: true, region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Somber Smithing Stone [6] - scarab up stairs to W, on end stairs",
      { groups: ["Scarab"], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Golden Seed - seedtree to W by elevator from upper NS path",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/(UPR): Golden Rune [7] - just before NE platform",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/(UPR): Human Bone Shard x3 - on NE platform",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/UPR: Somber Smithing Stone [6] - left path from corpse room after UPR, upper cliff ledge",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/(UPR): Smithing Stone [4] - SE side by unlit torch",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/UPR: Stimulating Boluses - on path to corpse room from UPR",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/UPR: Shield Grease x2 - corpse room after UPR, right item",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/UPR: Golden Rune [10] x8 - corpse room after UPR, left item",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/UPR: Stonesword Key - SE of UPR on corpse middle of water",
      { groups: [], region: "Ainsel River Main" },
    ],
    ["ARM/(UPR): Golden Rune [7] - behind the S wall", { groups: [], region: "Ainsel River Main" }],
    [
      "NS/NEC: Golden Rune [10] - to NW in water by rocks",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Fan Daggers - to W on railing up stairs",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Smithing Stone [6] - to N in some ruins, under arch",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Archer Ashes - up stairs to W behind second interior room",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Golden Rune [10] - to W up stairs, after corridor",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Golden Rune [10] - to W up stairs, on bridge",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Golden Rune [10] - to W up stairs, in corridor",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Smithing Stone [6] - to W up stairs, after bridge up stairs right of interior",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Golden Rune [10] - to W up stairs, after bridge on stair railing",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Great Ghost Glovewort - in chest up stairs to W, after bridge to right in interior",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Somber Smithing Stone [7] - in chest up stairs to W, after bridge up stairs in interior",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/UPR: Clayman Ashes - SE of UPR on ledge by waterfall",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Stonesword Key - to NW under final upper NS bridge, S of the seedtree",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Magic Grease x3 - to SW behind ruins walls, by wall",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Drawstring Holy Grease x2 - to N in some ruins",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Silver Tear Husk x3 - far to N on ledge behind building",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Smithing Stone [6] - to NW in corner behind some pillars",
      { groups: [], region: "Ainsel River Main" },
    ],
    ["NS/NEC: Celestial Dew - to NW in alcove", { groups: [], region: "Ainsel River Main" }],
    [
      "NS/NEC: Somber Smithing Stone [7] - to W, on corpse overlooking AR boss arena",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Celestial Dew - in structure far SW end of NS",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NWB: Smithing Stone [4] - to SW in corpse room item 1",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NWB: Smithing Stone [5] - to SW in corpse room item 2",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/UPR: Wing of Astel - left path from corpse room after UPR, in chest on temple beam",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Somber Smithing Stone [7] - in chest up W stairs within interior through window in corridor",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Ghost Glovewort [9] - in chest up stairs to NW in lower area",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Moon of Nokstella - in chest up stairs to W, within final interior",
      { groups: ["Out of the Way"], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Larval Tear - enemy drop to W up stairs, after bridge top of stairs",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Ant's Skull Plate - in chest up stairs to W in first interior room",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Larval Tear - enemy drop to W up stairs, after bridge to right in interior",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Ghost-Glovewort Picker's Bell Bearing [2] - in chest up stairs to W in second interior room",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Larval Tear - enemy drop to W up stairs, after bridge up stairs in interior, spawns/falls when chest is opened",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "NS/NEC: Nightmaiden & Swordstress Puppets - in chest behind imp statue to W up stairs, left before bridge",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "ARM/(UPR): Somber Smithing Stone [7] - enemy drop by 2 statues",
      { groups: [], region: "Ainsel River Main" },
    ],
    [
      "SR/WW: Shotel - Abandoned Merchant to W in upper interior area",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Dwelling Arrow x30 - Abandoned Merchant to W in upper interior area",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Soap x3 - Abandoned Merchant to W in upper interior area",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Stonesword Key x3 - Abandoned Merchant to W in upper interior area",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Larval Tear - Abandoned Merchant to W in upper interior area",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Nomadic Warrior's Cookbook [17] - Abandoned Merchant to W in upper interior area",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Nomadic Warrior's Cookbook [18] - Abandoned Merchant to W in upper interior area",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Nascent Butterfly x5 - Abandoned Merchant to W in upper interior area",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRB: Map: Siofra River - to SE by bottom of stairs",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRB: Armorer's Cookbook [6] - to NW up ledge, camp to W",
      { groups: [], region: "Siofra River" },
    ],
    ["SR/(HG): Ancestral Follower Ashes - boss drop", { groups: [], region: "Siofra River" }],
    ["SR/WW: Dragon Halberd - upper siofra, boss drop", { groups: [], region: "Siofra River" }],
    [
      "SR/WW: Great Oracular Bubble - scarab upper siofra, inside tower to SW",
      { groups: ["Scarab"], region: "Siofra River" },
    ],
    [
      "SR/WW: Ash of War: Square Off - scarab to N looking at waterfall",
      { groups: ["Scarab"], region: "Siofra River" },
    ],
    [
      "SR/SRB: Arteria Leaf x3 - to SE up rock, to W behind pillar",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/BW: Golden Seed - to SW across rock bridge under seedtree",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Marika's Scarseal - upper siofra, behind boss under waterfall",
      { groups: ["Out of the Way"], region: "Siofra River" },
    ],
    ["SR/SRB: Crab Eggs x3 - to W in river", { groups: [], region: "Siofra River" }],
    ["SR/SRB: Beast Liver x3 - to W by dam", { groups: [], region: "Siofra River" }],
    ["SR/SRB: Golden Rune [3] - to SW on pillar", { groups: [], region: "Siofra River" }],
    [
      "SR/SRB: Inverted Hawk Heater Shield - to SE up rock, to W behind pillar",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRB: Somber Smithing Stone [2] - to NE on island by waygate",
      { groups: [], region: "Siofra River" },
    ],
    ["SR/SRB: Old Fang x2 - to SE high on ledge", { groups: [], region: "Siofra River" }],
    [
      "SR/WW: Golden Rune [2] - to S, NW from path leading to fire monument by pillar",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Shield Grease - to S on path leading to fire monument",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Golden Rune [3] - to S, S from path leading to fire monument by pillar",
      { groups: [], region: "Siofra River" },
    ],
    ["SR/WW: Dappled Cured Meat - to S on fallen pillar", { groups: [], region: "Siofra River" }],
    [
      "SR/WW: Somber Smithing Stone [2] - to S on tall broken pillar",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Smithing Stone [3] - to S on small broken pillar",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Smithing Stone [2] x3 - to S, middle of trees past pillars",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Dwelling Arrow x10 - to S beside fallen pillar",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRB: Gold-Pickled Fowl Foot - to NE, just S of fire monument",
      { groups: [], region: "Siofra River" },
    ],
    ["SR/SRB: Golden Rune [4] - to NE under bridge", { groups: [], region: "Siofra River" }],
    [
      "SR/WW: Golden Rune [4] - to W, just S of lower interior area by trees, NE item",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Furlcalling Finger Remedy - to W, just S of lower interior area by wall",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Golden Rune [4] - to W, just S of lower interior area by trees, W item",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Smithing Stone [4] - to W lower interior area",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Hefty Beast Bone - to W in upper interior area by merchant",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRB: Golden Rune [6] - to SE ledge down right of stairs",
      { groups: [], region: "Siofra River" },
    ],
    ["SR/WW: Golden Rune [3] - to SW on wood platforms", { groups: [], region: "Siofra River" }],
    ["SR/WW: Sliver of Meat - to SW on wood platforms", { groups: [], region: "Siofra River" }],
    [
      "SR/WW: Smithing Stone [3] x2 - to SW in top part of hut",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Gold-Pickled Fowl Foot x2 - to W under waterfall ",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRB: Golden Rune [4] - way to E behind some pillars",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRB: Dwelling Arrow x10 - to E, lower NW side of broken bridge piece you jump to with torrent",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRB: Stonesword Key - to E, upper SE side of broken bridge piece you jump to with torrent",
      { groups: [], region: "Siofra River" },
    ],
    ["SR/WW: Golden Rune [4] - to NW by rocks", { groups: [], region: "Siofra River" }],
    ["SR/WW: Smithing Stone [2] x3 - to N by rocks", { groups: [], region: "Siofra River" }],
    ["SR/SRB: Horn Bow - to SE under stairs", { groups: [], region: "Siofra River" }],
    [
      "SR/BW: Golden Rune [4] - to S on ledge middle of forest",
      { groups: [], region: "Siofra River" },
    ],
    ["SR/BW: Sliver of Meat x3 - to SE behind trees", { groups: [], region: "Siofra River" }],
    [
      "SR/BW: Stonesword Key - to SW across rock bridge on the SW pillar",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/BW: Rune Arc - way to W in a cave behind the waterfall",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/BW: Clarifying Horn Charm - on stairs by elevator",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRB: Lump of Flesh x3 - way to NW by flame monument on rock",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Somber Smithing Stone [5] - upper siofra, to SW in tower, S corner",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Dragonwound Grease x3 - upper siofra, to W behind tower, continue SW down path",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Slumbering Egg x2 - upper siofra, to SW right of waterfall",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Golden Rune [7] - upper siofra, to W behind tower",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/WW: Golden Rune [7] - upper siofra, to NW by small waterfall",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Oracle Bubbles - scarab on statue in ruins",
      { groups: ["Scarab"], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Furlcalling Finger Remedy - to SE in pool of water",
      { groups: [], region: "Siofra River" },
    ],
    ["SR/SRWD: Silver Firefly x5 - way to E behind tree", { groups: [], region: "Siofra River" }],
    ["SR/SRWD: Golden Rune [3] - to NE by pillar", { groups: [], region: "Siofra River" }],
    ["SR/SRWD: Golden Rune [2] - to NE before ruins", { groups: [], region: "Siofra River" }],
    [
      "SR/SRWD: Smithing Stone [4] - to NE on ledge in ruins",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Smithing Stone [2] - to NE on lower stairs in ruins",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Golden Rune [2] - to NE by lower stairs in ruins",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Immunizing Cured Meat - to NE on upper stairs in ruins",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Golden Rune [2] - to NE on middle stairs in ruins",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Rainbow Stone x5 - to NE after upper stairs by tree in ruins",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Golden Rune [4] - on stairs leading to elevator",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Budding Horn x3 - path behind ruins on ledge",
      { groups: [], region: "Siofra River" },
    ],
    [
      "SR/SRWD: Throwing Dagger x8 - on top of ruins before drop down",
      { groups: [], region: "Siofra River" },
    ],
    ["SR/SRWD: Golden Rune [4] - by waterfall", { groups: [], region: "Siofra River" }],
    ["SR/SRWD: Smithing Stone [4] - by waterfall", { groups: [], region: "Siofra River" }],
    ["SR/SRWD: Soap x3 - under waterfall", { groups: [], region: "Siofra River" }],
    ["SR/SRB: Preserving Boluses - to W on dam right room", { groups: [], region: "Siofra River" }],
    [
      "SR/SRWD: Silver-Pickled Fowl Foot x3 - on statue in ruins",
      { groups: [], region: "Siofra River" },
    ],
    [
      "NR/(NSG): Black Whetblade - upper interior by statues",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AFC: Missionary's Cookbook [5] - jump down to SE, on corpse",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    ["NR/(SA): Gargoyle's Greatsword - boss drop", { groups: [], region: "Nokron, Eternal City" }],
    ["NR/(SA): Gargoyle's Twinblade - boss drop", { groups: [], region: "Nokron, Eternal City" }],
    [
      "NR/(HG): Remembrance of the Regal Ancestor - boss drop",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/MT: Somber Smithing Stone [5] - scarab to NE",
      { groups: ["Scarab"], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Ash of War: Enchanted Shot - scarab to N by fire monument",
      { groups: ["Scarab"], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(SA): Order Healing - scarab in SE most structure",
      { groups: ["Scarab"], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Fingerslayer Blade - in chest lower area, talk to Ranni in LL",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Great Ghost Glovewort - in chest lower area, talk to Ranni in LL",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Ancestral Infant's Head - in chest in NW ruin on water",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AFC: Crucible Hornshield - enemy drop jump down to SE, on bridge",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(SA): Somber Smithing Stone [6] - enemy drop by the stream end",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Clarifying Horn Charm +1 - down path to upper siofra in room with bunch of pillars, middle",
      { groups: ["Out of the Way"], region: "Nokron, Eternal City" },
    ],
    ["NR/MT: Golden Rune [4] - to NE on bridge", { groups: [], region: "Nokron, Eternal City" }],
    [
      "NR/MT: Dwelling Arrow x8 - to NE, SE at intersection",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/MT: Nascent Butterfly - to NE just off ramp to NW",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Gold-Tinged Excrement x5 - to E below the fire monument, on path",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Fireproof Dried Liver - to E below the fire monument",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Golden Rune [4] - to E below the fire monument, on rock across path",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Old Fang x4 - to NE next to small ruin stairs",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    ["NR/HG: Kukri x8 - SE of stairs SW of HG", { groups: [], region: "Nokron, Eternal City" }],
    [
      "NR/HG: Hefty Beast Bone x5 - by stairs SW of HG",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Smithing Stone [5] - to E by giant pillar in the forest",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(HG): Mottled Necklace +1 - on beam above",
      { groups: ["Hidden"], region: "Nokron, Eternal City" },
    ],
    ["NR/AW: Old Fang - by the drop down to SA", { groups: [], region: "Nokron, Eternal City" }],
    [
      "NR/AW: Hefty Beast Bone x3 - to NE, just N of small ruins",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Smithing Stone [4] - to N near giant pillar",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    ["NR/AW: Beast Blood - to N near giant pillar", { groups: [], region: "Nokron, Eternal City" }],
    [
      "NR/AW: Beast Blood x3 - to N by giant pillar",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Somber Smithing Stone [5] - to W in pool of water",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Golden Rune [12] - in NW ruin on water",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Smithing Stone [5] - to SE off the side of lower bridge",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Smithing Stone [2] - down path to upper siofra in room with bunch of pillars, SW side",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Celestial Dew - down path to upper siofra in room with bunch of pillars, S corner",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Smithing Stone [5] - down path to upper siofra past room with bunch of pillars all the way SE by last pillar",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AFC: Stonesword Key - to S on ledge overlooking HG",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    ["NR/AFC: Silver Tear Husk x2 - to SW", { groups: [], region: "Nokron, Eternal City" }],
    [
      "NR/(SA): Golden Rune [13] - in SE most structure on NW broken bridge",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(SA): Golden Rune [7] - in SE most structure on outer SE rim",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(SA): Smithing Stone [5] - by the stream end",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    ["NR/(SA): Golden Rune [6] - by the waterfall", { groups: [], region: "Nokron, Eternal City" }],
    [
      "NR/(SA): Rune Arc - in the room left of the waterfall",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(SA): Smithing Stone [4] - under the waterfall",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Rejuvenating Boluses - follow path from AW grace, on railing",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Rune Arc - follow path from AW grace, on stairs with crying out statues",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Celestial Dew - follow path from AW grace, up stairs with crying out statues, jump to NW ledge, N around back",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Mimic Tear Ashes - in chest behind imp statue upper interior",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Golden Rune [7] - follow path from AW grace, after half-sphere roof on lower platform",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Smithing Stone [3] - behind imp statue upper interior",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Nox Flowing Hammer - on beam in interior, requires jumping out window by imp statue",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    ["NR/(NSG): Celestial Dew - lower area item 1", { groups: [], region: "Nokron, Eternal City" }],
    [
      "NR/(NSG): Golden Rune [7] - lower area item 2",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Soft Cotton x3 - lower area item 3",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/(NSG): Larval Tear - enemy drop lower interior",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "NR/AW: Shining Horned Headband - enemy drop to NE in small ruin",
      { groups: [], region: "Nokron, Eternal City" },
    ],
    [
      "DD/AR: Inseparable Sword - kill D Twin at NEC if you killed D, or at end of Fia's quest",
      { groups: [], isMissable: true, region: "Deeproot Depths Boss" },
    ],
    [
      "DD/PDT: Mending Rune of the Death-Prince - on Fia after mainboss",
      { groups: [], isMissable: true, region: "Deeproot Depths Boss" },
    ],
    [
      "DD/PDT: Fia's Hood - kill Fia or after mainboss",
      { groups: [], isMissable: true, region: "Deeproot Depths Boss" },
    ],
    [
      "DD/PDT: Fia's Robe - kill Fia or after mainboss",
      { groups: [], isMissable: true, region: "Deeproot Depths Boss" },
    ],
    [
      "DD/PDT: Remembrance of the Lichdragon - mainboss drop",
      { groups: [], isMissable: true, region: "Deeproot Depths Boss" },
    ],
    ["NR/NEC: Silver Tear Mask - boss drop", { groups: [], region: "Nokron, Eternal City Start" }],
    ["NR/NEC: Larval Tear x2 - boss drop", { groups: [], region: "Nokron, Eternal City Start" }],
    [
      "NR/LG: Golden Rune [5] - entrance middle platform on ledge",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/LG: Soporific Grease x2 - entrance lower platform on ledge",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/LG: Burred Bolt x10 - rooftops after walking down skinny path",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/LG: Nascent Butterfly x3 - top of fallen building",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/LG: Rune Arc - up rooves before drop to fallen building",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/LG: Golden Rune [6] - bottom of fallen building",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/LG: Smithing Stone [5] - interior after rooves in S corner",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/LG: Furlcalling Finger Remedy - interior after rooves on ledge",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Clarifying White Cured Meat - bottom of interior after rooves, middle",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Golden Rune [6] - bottom of interior after rooves, S side",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Ghost-Glovewort Picker's Bell Bearing [1] - to E in center of area",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Smithing Stone [3] - to E, behind a wall to SW outside",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Somber Smithing Stone [4] - to NE behind building",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Smithing Stone [5] - to SE in graveyard S side",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Greatshield Soldier Ashes - to SE in graveyard E side",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Golden Rune [7] - to E down stairs at bottom",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Golden Rune [7] - to E down stairs to E on ledge",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Rune Arc - to NW of boss fog door",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Larval Tear - to SE in building",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/NEC: Larval Tear - to E down stairs in structure",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "NR/LG: Ghostflame Torch - jump to highest roof",
      { groups: [], region: "Nokron, Eternal City Start" },
    ],
    [
      "LL/(TFB/NEC): Mottled Necklace - on NW ledge",
      { groups: [], region: "The Four Belfries (Nokron)" },
    ],
    [
      "DD/DD: Map: Deeproot Depths - path to NE in gazebo",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/AR: Fia's Mist - boss drop", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/GWC: Ash of War: Golden Land - scarab to S",
      { groups: ["Scarab"], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Somber Smithing Stone [6] - scarab to NW on some roots",
      { groups: ["Scarab"], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Somber Smithing Stone [6] - scarab to E, N of the gazebo",
      { groups: ["Scarab"], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Stonesword Key - to NW, on top of W structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/GWC: Smithing Stone [6] -  to W up on root", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/GWC: Holy Grease x3 -  to W middle of root crossing",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/GWC: Elden Stars -  to W on exit ledge from ant cave",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/GWC: Smithing Stone [4] -  to W on end root after root crossing",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/DD: Golden Rune [5] - way to SE out on the end of a root",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/DD: Golden Rune [6] - 3 corpses to E", { groups: [], region: "Deeproot Depths" }],
    ["DD/DD: Warming Stone x3 - 3 corpses to E", { groups: [], region: "Deeproot Depths" }],
    ["DD/DD: Smithing Stone [4] - 3 corpses to E", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/DD: Ash of War: Vacuum Slice - path to NE, NE of gazebo in structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/DD: Dragonwound Grease - path to NE just before gazebo on path side",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/DD: Hefty Beast Bone x5 - path to NE by gazebo",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/TNEC: Golden Rune [1] - to E on root", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/TNEC: Prince of Death's Staff - root path to boss, N most building",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Smithing Stone [6] - to NE on root behind tilled structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/AR: Golden Rune [5] - to SW on root behind building",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/AR: Golden Rune [8] - to S on root", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/AR: Nascent Butterfly x3 - to SW on top of building",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Somber Smithing Stone [7] - to NW, in W structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Somber Smithing Stone [7] - to NW on ledge under NE side of roots",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Somber Smithing Stone [7] - to NE, in NE structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Fan Daggers x4 - to N in a cave S of the walking mausoleum",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Somber Smithing Stone [6] - way to N in a tilled structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Golden Rune [8] - to NW on the NE end of the roots",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Golden Rune [8] - to NW by base of the roots",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Crucible Gauntlets - in chest way to W within tree stump",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Crucible Greaves - in chest way to W within tree stump",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Crucible Tree Helm - in chest way to W within tree stump",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Crucible Tree Armor - in chest way to W within tree stump",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/AR: Somber Smithing Stone [7] - to S down a hole in upper area",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Arteria Leaf x5 - to NE, on top of building by spiritspring",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Smithing Stone [7] - to NE, on middle of building by spiritspring",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Lightning Greatbolt x6 - to N, E of walking mausoleum by waterfall",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Golden Rune [8] - to NW on a root behind the NE structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Smithing Stone [6] - to NW, on top of NE structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Golden Rune [8] - to NW on a root overhanging endless pit",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/TNEC: Clarifying Boluses - to W in graveyard", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/TNEC: Smithing Stone [4] 1 - to W in graveyard",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/TNEC: Human Bone Shard x5 - to W in graveyard", { groups: [], region: "Deeproot Depths" }],
    ["DD/TNEC: Golden Rune [8] 1 - to W in graveyard", { groups: [], region: "Deeproot Depths" }],
    ["DD/TNEC: Golden Rune [9] - to W in graveyard", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/TNEC: Smithing Stone [4] 2 - to W in graveyard",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/TNEC: Nascent Butterfly - to W in graveyard", { groups: [], region: "Deeproot Depths" }],
    ["DD/TNEC: Golden Rune [8] 2 - to W in graveyard", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/TNEC: Smithing Stone [5] - to N, NW of walking mausoleum by edge",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Smithing Stone [5] - to NE on tilled structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/DD: Smithing Stone [6] x3 - path to NE, SE of gazebo in ruins",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/DD: Rune Arc - path to NE, SE of gazebo in ruins",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Mausoleum Soldier Ashes - way to N on the N most ledge behind tilled structure",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Somber Smithing Stone [7] - to N in a cave S of the walking mausoleum",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Golden Rune [8] - to N in a cave S of the walking mausoleum",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/GWC: Somber Smithing Stone [6] - to W in lower ant cave",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/GWC: Rune Arc - enemy drop 1 to W in ant cave", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/GWC: Numen's Rune - enemy drop 1 to W in ant cave",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/GWC: Rune Arc - enemy drop 2 to W in ant cave", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/GWC: Numen's Rune - enemy drop 2 to W in ant cave",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/GWC: Rune Arc - enemy drop 3 to W in ant cave", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/GWC: Numen's Rune - enemy drop 3 to W in ant cave",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/GWC: Rune Arc - enemy drop 4 to W in ant cave", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/GWC: Numen's Rune - enemy drop 4 to W in ant cave",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/GWC: Rune Arc - enemy drop 5 to W in ant cave", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/GWC: Numen's Rune - enemy drop 5 to W in ant cave",
      { groups: [], region: "Deeproot Depths" },
    ],
    [
      "DD/TNEC: Siluria's Tree - boss drop way to W by tree stump",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/GWC: Staff of the Avatar - enemy drop to S", { groups: [], region: "Deeproot Depths" }],
    [
      "DD/DD: Prince of Death's Cyst - enemy drop path to NE, E of gazebo behind waterfall",
      { groups: [], region: "Deeproot Depths" },
    ],
    ["DD/RFC: Formic Rock - on far SE ledge", { groups: [], region: "Deeproot Depths Upper" }],
    [
      "DD/RFC: Golden Rune [5] - on last platform of S area",
      { groups: [], region: "Deeproot Depths Upper" },
    ],
    [
      "DD/RFC: Golden Rune [8] - on upper root of S area",
      { groups: [], region: "Deeproot Depths Upper" },
    ],
    [
      "DD/RFC: Golden Arrow x10 - down mega root on left sub root",
      { groups: [], region: "Deeproot Depths Upper" },
    ],
    [
      "DD/RFC: Smithing Stone [6] - below grace on a root",
      { groups: [], region: "Deeproot Depths Upper" },
    ],
    [
      "DD/RFC: Golden Rune [8] - below platform after crossing big SE root",
      { groups: [], region: "Deeproot Depths Upper" },
    ],
    ["DD/RFC: Rune Arc - enemy drop to S", { groups: [], region: "Deeproot Depths Upper" }],
    ["DD/RFC: Numen's Rune - enemy drop to S", { groups: [], region: "Deeproot Depths Upper" }],
    [
      "MP/(MDM): Festering Bloody Finger x10 - Imprisoned Merchant down first left in cave",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Rune Arc x3 - Imprisoned Merchant down first left in cave",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Stanching Boluses x3 - Imprisoned Merchant down first left in cave",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Stonesword Key x5 - Imprisoned Merchant down first left in cave",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Lost Ashes of War - Imprisoned Merchant down first left in cave",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Mohg's Great Rune - mainboss drop",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/MDE: Map: Mohgwyn Palace - to NW",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Nomadic Warrior's Cookbook [24] - on E most ledge in S blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Festering Bloody Finger x6 - invade Varré near DMM grace",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Varré's Bouquet - invade Varré near DMM grace",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Remembrance of the Blood Lord - mainboss drop",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Ash of War: Blood Tax - scarab to NE down path, first E dead-end in blood swamp",
      { groups: ["Scarab", "Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR|(MDM): Golden Seed - seedtree in S blood swamp AND SE of boss elevator behind statue down below on rocks, getting one and reloading area deletes the other",
      { groups: ["Out of the Way", "Post Leyndell"], isMissable: true, region: "Mohgwyn Palace" },
    ],
    ["MP/PALR: Golden Rune [11] - to NE", { groups: ["Post Leyndell"], region: "Mohgwyn Palace" }],
    [
      "MP/PALR: Smithing Stone [6] - to NE down path, to left before blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Bloodrose x5 - to NE down path, before blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Hero's Rune [4] - to NE down path, by first pillar in blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Smithing Stone [8] - N blood swamp, SW pillar",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Hero's Rune [3] - N blood swamp, NE pillar",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Blood-Tainted Excrement x8 - N blood swamp, NE pillar",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Somber Smithing Stone [9] - to NE down path, first E dead-end in blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Swarm of Flies - to NE down path, second E dead-end in blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Drawstring Blood Grease x4 - N blood swamp, NE pillar",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Blood-Tainted Excrement x8 - N blood swamp, N pillar",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/MDE: Golden Rune [12] - to NE, just S of giant pillar after forest",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/MDE: Smithing Stone [7] - to NE, just S of giant pillar after forest",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/MDE: Golden Rune [12] - to NE in middle of forest",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/MDE: Sacramental Bud - to NE in middle of forest",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/MDE: Nascent Butterfly x3 - to NE in middle of forest",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/MDE: Rune Arc - way to NE behind giant pillar",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Golden Rune [13] - to NE down path, third E dead-end in blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Bloodrose x5 - by SE pillar in S blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Holy Grease - N of gravestones W of S blood swamp by pillar",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Stonesword Key - near gravestones W of S blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Smithing Stone [6] - NW side of S blood swamp by pillar",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Arteria Leaf x4 - NE dead-end in S blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Golden Rune [13] - NW side of S blood swamp by pillar",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Clarifying Boluses - by path connecting blood swamps, S side",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Rot Grease x3 - by SE pillar in S blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Haligdrake Talisman +2 - by gravestones W of S blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Smithing Stone [7] - on first path from MDE grace",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Stanching Boluses x3 - up first path from MDE grace, just E of mausoleum entrance on path",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Stonesword Key - up first path from MDE grace, just NE of mausoleum entrance through path",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Bloodrose x8 - up first path from MDE grace, just S of mausoleum entrance",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Smithing Stone [8] x3 - down SW dead-end in cave area",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Numen's Rune - up first path from MDE grace, on E ledge",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Golden Rune [13] - SE of boss elevator behind statue",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Golden Rune [11] - to E by tree",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Lord's Rune - by pillar in cave area",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: Smithing Stone [6] - to NE down path, third E dead-end in blood swamp",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/(MDM): Somber Ancient Dragon Smithing Stone - in chest SE of boss elevator",
      { groups: ["Post Leyndell"], region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: White Mask - invader in S blood swamp",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: War Surgeon Gloves - invader in S blood swamp",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: War Surgeon Trousers - invader in S blood swamp",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mohgwyn Palace" },
    ],
    [
      "MP/PALR: War Surgeon Gown (Altered) - invader in S blood swamp",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mohgwyn Palace" },
    ],
    [
      "FA/DTL: Ancient Dragon Apostle's Cookbook [4] - to SE up right path, W of seedtree, far end of path in building",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Shard of Alexander - fight Alexander to SW",
      { groups: ["Post Leyndell"], isMissable: true, region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Alexander's Innards - fight Alexander to SW",
      { groups: ["Post Leyndell"], isMissable: true, region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Blasphemous Claw - kill invader Bernahl, to NE end of path",
      { groups: ["Post Leyndell"], isMissable: true, region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Devourer's Scepter - kill invader Bernahl, to NE end of path, or kill him at LG/WS",
      { groups: ["Post Leyndell"], isMissable: true, region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Remembrance of the Dragonlord - alt mainboss drop",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Remembrance of the Black Blade - mainboss drop",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Golden Lightning Fortification - scarab to SE up right path, SW of seedtree",
      { groups: ["Scarab", "Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Somber Ancient Dragon Smithing Stone - to SE in gazebo",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Golden Rune [11] - to NW by pillar jump",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Old Fang x5 - to NW, on left after window drop down",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Hero's Rune [5] - to NW, after window drop down, backside of W wall",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Smithing Stone [7] - to NW, NE end of staute corridor",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Lightning Grease x5 - to NW, N end of staute corridor, down left path",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Somber Smithing Stone [9] - to NW, upstairs NW corner",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Ancient Dragon Smithing Stone - to NW, upstairs to S",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Golden Rune [12] - to NW, down crumbled path, right item",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Dragoncrest Shield Talisman +2 - to NW, down crumbled path, left item",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Dappled Cured Meat - to NW, down crumbled path, upstairs on right",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTA: Smithing Stone [8] - to NW, down crumbled path, on floating rubble before next grace",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Lord's Rune - to SE in fountain",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Nascent Butterfly x2 - to SE down left stairs by tree",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Golden Rune [12] - to SE up right path, E of seedtree left of gazebo by tree",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Smithing Stone [8] - to SE up right path, E of seedtree behind gazebo",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Rune Arc - to SE up right path beside seedtree",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Smithing Stone [7] - to SE up right path, E of seedtree left of gazebo on ledge",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Dragonwound Grease x2 - to S under fallen building",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Smithing Stone [8] - to SE up right path, SW of seedtree",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Golden Rune [12] - to SE up right path, W of seedtree on platform after crossing building",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Smithing Stone [7] - to SE up right path, W of seedtree on second platform after crossing building",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Somber Smithing Stone [8] - to SE up right path, W of seedtree, far end of path left of building",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Smithing Stone [6] - to E before ladder",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Arteria Leaf x3 - to E down ladder on right",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Lightning Greatbolt x5 - to E down ladder, down NE path, up elevator",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Fulgurbloom x8 - to SE middle of courtyard, item 1",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Golden Rune [12] - to SE middle of courtyard, item 2",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Smithing Stone [7] - to SE, NE of courtyard above, middle of pillars",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Golden Rune [12] - to SE, down path E of courtyard, before ladder",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Boltdrake Talisman +2 - to SE, down path E of courtyard, after second ladder on ledge",
      { groups: ["Out of the Way", "Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Somber Smithing Stone [7] - to SE, w of courtyard, to right before jump across pillars",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Somberstone Miner's Bell Bearing [5] - to SE, W of courtyard, in water room by altar",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Golden Rune [12] - to SE on path, item 1",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Somber Smithing Stone [7] - to SE on path, item 2",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Somber Smithing Stone [8] - to NE on left before ladder",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Smithing Stone [8] - to SE up right path, W of seedtree, far end of path drop down left of building",
      { groups: ["Hidden", "Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Drake Knight Helm - in chest to E down ladder, down NE path behind elevator",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Drake Knight Armor - in chest to E down ladder, down NE path behind elevator",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Drake Knight Gauntlets - in chest to E down ladder, down NE path behind elevator",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Drake Knight Greaves - in chest to E down ladder, down NE path behind elevator",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Dragon Towershield - in chest to SE, down path E of courtyard, left at top of ladder",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Old Lord's Talisman - in chest to NE end of path",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Golden Seed - seedtree to SE, NE of courtyard above",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTL: Golden Seed - seedtree to SE up right path",
      { groups: ["Out of the Way", "Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/DTR: Ancient Dragon Smithing Stone - enemy drop to SE middle of courtyard",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Malformed Dragon Helm - enemy drop to SE",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Malformed Dragon Armor - enemy drop to SE",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Malformed Dragon Gauntlets - enemy drop to SE",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "FA/BGB: Malformed Dragon Greaves - enemy drop to SE",
      { groups: ["Post Leyndell"], region: "Farum Azula Main" },
    ],
    [
      "MtG/FL: Jar - talk to Alexander S of FL",
      { groups: [], isMissable: true, region: "Mt. Gelmir" },
    ],
    ["MtG/HS: Golden Rune [2] 1 - graveyard W of HS", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/HS: Golden Rune [4] - graveyard W of HS", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/HS: Golden Rune [2] 2 - graveyard W of HS", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/HS: Golden Rune [6] - graveyard W of HS", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/HS: Gravel Stone - up on ledge E of HS", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/(HS): Roiling Magma - in shack", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/(CS): Pulley Crossbow - by shack", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/HS: Smithing Stone [6] x3 - breakable statue S of HS",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/FL: Dragon Heart - boss drop S of FL in magma lake",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/FL: Smoldering Butterfly x8 - E side of FL by burning corpses",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/FL: Golden Rune [3] - middle of magma lake S of FL",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/ST: Mushroom x5 - to W by wood walls", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/FL: Smoldering Butterfly x2 - SW edge of magma lake S of FL",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/FL: Smoldering Butterfly x5 - N side of magma lake S of FL",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/FL: Golden Rune [5] - on a rock middle of magma lake S of FL",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/FL: Fire Blossom x3 - enemy drop SE of FL", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FL: Smoldering Butterfly x5 - enemy drop SE of FL", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FL: Fire Blossom x3 - enemy drop by S side of FL", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/FL: Smoldering Butterfly x5 - enemy drop by S side of FL",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/(FL): Armorer's Cookbook [7] - inside lower room", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/RI: Dragonwound Grease - to NW, NW of map pillar up on ledge",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/VM: Golden Rune [3] - NW of VM, SW of seedtree", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/ST: Stonesword Key - to NW behind tree in graveyard",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/(FL): Fire Scorpion Charm - by the talking ghost up top",
      { groups: ["Hidden"], region: "Mt. Gelmir" },
    ],
    ["MtG/(FL): Golden Rune [8] - on corpse up top", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/(FL): Slumbering Egg x3 - on corpse up top", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/(FL): Prelate's Inferno Crozier - enemy drop middle of courtyard",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/VM: Somber Smithing Stone [4] - enemy drop NW of VM, SW of seedtree",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/ST: Fire Blossom x3 - enemy drop to NW, before graveyard",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/ST: Smoldering Butterfly x5 - enemy drop to NW, before graveyard",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/RI: Somber Smithing Stone [4] - enemy drop to W by map pillar",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/ST: Golden Rune [6] - to NW", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/RI: Map: Mt. Gelmir - map pillar to W", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/NMGC: Fallingstar Beast Jaw - boss drop", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/NMGC: Smithing Stone [6] x5 - boss drop", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/NMGC: Somber Smithing Stone [6] - boss drop", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/VM: Ash of War: Through and Through - scarab NW of VM",
      { groups: ["Scarab"], region: "Mt. Gelmir" },
    ],
    [
      "MtG/VM: Golden Rune [3] - N of VM, under the slated rock above",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/VM: Smoldering Butterfly x4 - NW of VM, SE of seedtree",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/VM: Golden Rune [7] - N of VM, near bottom of slated rocks",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/VM: Smoldering Butterfly x6 - NW of VM, on left ledge",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/NMGC: Starlight Shards - by statue S of crater", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/ST: Fireproof Dried Liver x3 - to E down river", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/RI: Larval Tear - enemy drop to E between wood walls",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/VM: Golden Seed - seedtree NW of VM", { groups: [], region: "Mt. Gelmir" }],
    [
      'MtG/(HV): Prattling Pate "You\'re beautiful" - on stairs SE side of village',
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/PSA: Memory Stone - boss drop to S", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/HV: Sacramental Bud x2 - W of HV", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/(HV): String x5 - on roof W side of village", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/(HV): Gold-Tinged Excrement - NE side of village", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/HV: Starlight Shards - by statue E of HV", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/(HV): Hierodas Glintstone Crown - behind house SE side of village",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/(HV): Errant Sorcerer Manchettes - in shack NW side of village",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/(HV): Errant Sorcerer Boots - in shack NW side of village",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/(HV): Errant Sorcerer Robe (Altered) - in shack NW side of village",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/PSA: Comet Azur - given by Azur", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/PSA: Azur's Glintstone Crown - side with Sellen, where Azur was",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/PSA: Azur's Glintstone Robe - side with Sellen, where Azur was",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/PSA: Azur's Manchettes - side with Sellen, where Azur was",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/GHG: Mushroom x6 - N of GHG", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/PSA: Golden Rune [6] - to NE on tip", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/SR: Smithing Stone [5] - S of SR in river", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/SR: Golden Seed - seedtree to N", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/NMGC: Guilty Hood - Nomadic Merchant in ladder section to E",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/NMGC: Confessor Hood - Nomadic Merchant in ladder section to E",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/NMGC: Confessor Armor - Nomadic Merchant in ladder section to E",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/NMGC: Confessor Gloves - Nomadic Merchant in ladder section to E",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/NMGC: Confessor Boots - Nomadic Merchant in ladder section to E",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/NMGC: Stonesword Key - Nomadic Merchant in ladder section to E",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/NMGC: Nomadic Warrior's Cookbook [20] - Nomadic Merchant in ladder section to E",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/ME: Leaden Hardtear - boss drop, Minor Erdtree", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/ME: Cerulean Hidden Tear - boss drop, Minor Erdtree",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/ME: Beast Blood x3 - E of ME on upper bridge", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/ME: Stonesword Key - W of CSS", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/NMGC: Soporific Grease x2 - to E bottom of ladder section by tarp",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/SR: Herba x3 - W of SR down river", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/NMGC: Eye of Yelough x3 - to E across bridge", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/ME: Golden Arrow x5 - behind ME", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/SR: Glass Shard - E of SR, item 3", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/SR: Nascent Butterfly - E of SR, item 4", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/SR: Rejuvenating Boluses - E of SR, item 1", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/SR: Hefty Beast Bone x2 - E of SR, item 2", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FMGC: Golden Rune [6] - to NW past tower", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/NMGC: Great Arrow x5 - to E down 2 ladders", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/FMGC: Bloodrose x3 - by bottom of ladder to SE between rocks",
      { groups: [], region: "Mt. Gelmir" },
    ],
    [
      "MtG/FMGC: Explosive Greatbolt x5 - by bottom of ladder to NE",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/FMGC: Golden Rune [8] - by bottom of ladder to NE", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/BI: Arteria Leaf x2 - to NW by 3 enemies", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/FMGC: Throwing Dagger x6 - by bottom of ladder to E in bush",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/FMGC: Pulley Bow - to NW on top of tower", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FMGC: Fire Arrow x10 - to NW in tower", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FMGC: Beast Blood - to NW bottom of tower", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FMGC: Golden Rune [2] - graveyard to SE", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FMGC: Golden Rune [3] 1 - graveyard to SE", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FMGC: Golden Rune [4] - graveyard to SE", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FMGC: Golden Rune [7] - graveyard to SE", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/FMGC: Golden Rune [3] 2 - graveyard to SE", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/FMGC: Somber Smithing Stone [6] - past graveyard to SE",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/RI: Fan Daggers x5 - to E, W of ME", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/ME: Drawstring Fire Grease x3 - N of ME", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/ME: Golden Rune [4] - by ME boss", { groups: [], region: "Mt. Gelmir" }],
    [
      "MtG/NMGC: Scavenger's Curved Sword - to E bottom of ladder section by cart",
      { groups: [], region: "Mt. Gelmir" },
    ],
    ["MtG/VC: Poison Grease x2 - SE of VC", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/(CSS): Golden Vow - in shack", { groups: [], region: "Mt. Gelmir" }],
    ["MtG/(CSS): Sacred Butchering Knife - invader drop", { groups: [], region: "Mt. Gelmir" }],
    [
      "VM/VM: Gelmir's Fury - Bernahl reward",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Ash of War: Eruption - Bernahl shop after request 1",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Ash of War: Assassin's Gambit - Bernahl shop after request 1",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Estoc - Patches shop",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Great Arrow x10 - Patches shop",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Ballista Bolt x5 - Patches shop",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Festering Bloody Finger x5 - Patches shop",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Recusant Finger - on the table in the drawing room",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Perfume Bottle - in the first room on the right",
      { groups: [], region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Nomadic Warrior's Cookbook [21] - behind the illusory wall in the right room, all the way around down the dead-end",
      { groups: [], region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Tonic of Forgetfulness - given by Tanith after you give Rya Serpent's Amnion",
      { groups: [], region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Letter from Volcano Manor (Istvan) - on the table in the drawing room",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Letter from Volcano Manor (Rileigh) - on the table in the drawing room after request 1",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Red Letter - on the table in the drawing room after request 2",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Magma Shot - Tanith reward request 1",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Serpentbone Blade - Tanith reward request 2",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Taker's Cameo - Tanith reward request 3",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Daedicar's Woe - end of Rya's quest, any option",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Zorayas's Letter - end of Rya's quest, dont kill or give potion",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Letter to Bernahl - Bernahl after request 2",
      { groups: [], isMissable: true, region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Depraved Perfumer Carmaan - behind the illusory wall in the right room, all the way around down the dead-end behind the illusory wall",
      { groups: [], region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Budding Horn x3 - behind the illusory wall in the right room, next to the stairs",
      { groups: [], region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Fireproof Dried Liver - behind the illusory wall in the right room, down the stairs",
      { groups: [], region: "Volcano Manor Drawing Room" },
    ],
    [
      "VM/VM: Bloodhound Claws - enemy drop behind the illusory wall in the right room, down the stairs",
      { groups: [], region: "Volcano Manor Drawing Room" },
    ],
    [
      "FA/DTT: Smithing-Stone Miner's Bell Bearing [4] - boss drop",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DTT: Ash of War: Black Flame Tornado - boss drop",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/MotG: Smithing Stone [8] - just after warping to FA",
      { groups: ["Post Leyndell"], isMissable: true, region: "Farum Azula" },
    ],
    [
      "FA/MotG: Golden Rune [9] - just after warping to FA drop down",
      { groups: ["Post Leyndell"], isMissable: true, region: "Farum Azula" },
    ],
    [
      "FA/DT: Dragonwound Grease x2 - inside, down path left before curved stairs, far end of path on left",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    ["FA/CBG: Old Fang x3 - to E on right", { groups: ["Post Leyndell"], region: "Farum Azula" }],
    [
      "FA/DT: Great Grave Glovewort - to SW below, take second right, up ladder on grave",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/CBG: Lightningproof Dried Liver - to E on left",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/CBGD: Great Grave Glovewort - to W out balcony, up roof, far end of room",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/CBG: Smithing Stone [6] - to W on slanted graves, item 1",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/CBG: Smithing Stone [8] - to W on slanted graves, item 2",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/CBG: Dragonwound Grease - to W on slanted graves, item 3",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Smithing Stone [8] - to SW down elevator, to right in miniboss arena",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    ["FA/CBGD: Smithing Stone [8] - to SE", { groups: ["Post Leyndell"], region: "Farum Azula" }],
    [
      "FA/TFB: Lightning Greatbolt x14 - to SW on left stairs",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Golden Rune [12] - to SW up right stairs outside",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Ancient Dragon Prayerbook - to SW middle of room",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Hero's Rune [2] - to SW, to right before elevator",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/CBGD: Smithing Stone [6] - to W out balcony, up roof, middle of room",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Somberstone Miner's Bell Bearing [4] - to N",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Somber Smithing Stone [9] - to SW down elevator, to E by second tree",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Fulgurbloom x4 - to SW down elevator, to E on left path",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Smithing Stone [8] - to SW down elevator, to E up ladder on back of left pillar, at end",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Rejuvenating Boluses - to SW down elevator, to E middle of pond",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Smithing Stone [8] - to SW down elevator, to E beside pond",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Gravel Stone x5 - to SW down elevator, furthest E possible in dead-end",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Somber Smithing Stone [7] - to NW on small platform",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Golden Rune [9] - to NW after tilted tower behind left pillars",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Golden Arrow x14 - to NW on platform midway down to lower area",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Gravel Stone x3 - to N in lower area behind left pillars",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DT: Golden Rune [10] - to SW below at far end",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DT: Golden Rune [12] - to SW below on right",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DT: Smithing Stone [6] - inside to right",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DT: Golden Rune [11] - inside over left rubble",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DT: Stonesword Key - inside, down path left before curved stairs, by right opening",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DT: Golden Rune [12] - inside, left at bottom of curved stairs, top of broken curved stairs",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DT: Rune Arc - to SW below, then to NE below on left",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DT: Somber Smithing Stone [9] - to SW below, then to NE below, follow path, right of room",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/CBGD: Smithing Stone [7] - to W on grave 3",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/CBGD: Gravel Stone x3 - to W out balcony, up roof, on left grave",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Somber Smithing Stone [9] - to N in lower area under chained body before next grace",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/DT: Azula Beastman Ashes - to SW below, then to NE below, follow path, on middle grave in room",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/TFB: Glovewort Picker's Bell Bearing [3] - to SW down elevator, to E in gazebo",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "FA/CBG: Ancient Dragon Smithing Stone - enemy drop to W on slated graves",
      { groups: ["Post Leyndell"], region: "Farum Azula" },
    ],
    [
      "LL/(TFB/FA): Pearldrake Talisman - N side at the bottom",
      { groups: [], region: "The Four Belfries (Farum Azula)" },
    ],
    [
      "RLA/RLGL: Shard Spiral - side with Sellen, sold in shop",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy Library" },
    ],
    [
      "RLA/RLGL: Witch's Glintstone Crown - side with either",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy Library" },
    ],
    [
      "RLA/RLGL: Ancient Dragon Smithing Stone - side with Jerren",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy Library" },
    ],
    [
      "RLA/RLGL: Glintstone Kris - given by Sellen after siding with her",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy Library" },
    ],
    [
      "RLA/RLGL: Dark Moon Ring - in chest, requires Discarded Palace Key",
      { groups: [], region: "Raya Lucaria Academy Chest" },
    ],
    [
      "RLA/DB: Great Rune of the Unborn - mainboss drop",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Remembrance of the Full Moon Queen - mainboss drop",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Cracked Pot - outside, to left up S stairs item 2",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Twinsage Glintstone Crown - enemy drop outside upper church in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Karolos Glintstone Crown - enemy drop outside to NW, SW of seedtree",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Living Jar Shard x3 - outside, to left up S stairs item 1",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Stonesword Key - outside on fountain",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Glintstone Firefly x5 - outside to N in courtyard",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [2] - outside to NW before tower",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [4] - outside to NW behind tower",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Crystal Bud x5 - outside, around to right up ladder, upper DB",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [4] - outside, around to right up ladder, upper DB then outside",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Smithing Stone [5] - bottom of curved stairs",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [2] - outside, left up rubble then up S stairs",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [3] - on railing at start of rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Crystal Dart x8 - on broken arch off curved stairs",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [4] - in courtyard on way to unlock shortcut door",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Furlcalling Finger Remedy - upper middle of curved stairs",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [7] - up ladder down hidden path in courtyard on way to unlock shortcut door, under balcony",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [4] - left of first ladder in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Crystal Dart x5 - on bridge in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Imbued Sword Key - in a tower E before jumping to church roof in rooftop section",
      { groups: ["Out of the Way"], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Meteor Bolt x5 - behind tower after bridge in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Smithing Stone [4] - after making the insane long jump to upper W roofs, jump W from top of tower after long ladder in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [4] - on W T-roof end of skinny roof after drop downs in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Smithing Stone [3] x2 - on the back end of the second tower E before jumping to church roof in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Magic Grease x2 - W end of church roof in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Rune [3] - on church rafters in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Somber Smithing Stone [4] - in the tower before the jump to church roof, down ladder, in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Shattering Crystal - NW corner upper church in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Azur's Glintstone Staff - E of upper church down corridor in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Glintstone Scarab - in chest up ladder down hidden path in courtyard on way to unlock shortcut door",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Academy Glintstone Key (Thops) - on church chandelier in rooftop section",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Radagon Icon - in chest outside, around to right up ladder, upper DB",
      { groups: ["Hidden"], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Carian Knight's Shield - hostile npc drop after curved stairs",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    [
      "RLA/DB: Golden Seed - seedtree outside to NW",
      { groups: [], region: "Raya Lucaria Academy Main" },
    ],
    ["RLA/SC: Memory Stone - boss drop", { groups: [], region: "Raya Lucaria Academy" }],
    [
      "RLA/DB: Glintstone Whetblade - outside, left up rubble then in room on railing",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Ritual Pot - in chest to S, follow corridor, S in 4-way",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Glintstone Craftsman's Cookbook [5] - in chest to S within left room",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Academy Glintstone Staff - on Thops body just outside",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Thops's Barrier - on Thops body just outside",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/RLGL: Eccentric's Hood - side with Sellen",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/RLGL: Eccentric's Armor - side with Sellen",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/RLGL: Eccentric's Manchettes - side with Sellen",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/RLGL: Eccentric's Breeches - side with Sellen",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Ash of War: Spectral Lance - scarab outside, E after bridge over some graves",
      { groups: ["Scarab"], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Magic Grease - up elevator, right of fountain",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Olivinus Glintstone Crown - to S behind illusory bookshelf in left room, follow path after jumping off balcony",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Rune Arc - lower church behind illusory wall NW corner",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/DB: Lazuli Glintstone Crown - enemy drop after making the insane long jump to upper W roofs, on wood platforms within the NE tower in rooftop section",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Golden Rune [2] - lower church SW corner",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Somber Smithing Stone [3] - lower church S behind behind far wall",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    ["RLA/CC: Grace Mimic x3 - outside to NW", { groups: [], region: "Raya Lucaria Academy" }],
    [
      "RLA/CC: Smithing Stone [4] - outside to SE under cliff ledge",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Spellproof Dried Liver - outside to NE before bridge",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Marionette Soldier Ashes - outside, off left of bridge on ledge",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Silver-Pickled Fowl Foot - outside, E after bridge",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Magic Grease x2 - outside, SE after bridge before next interior",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Golden Rune [4] - outside, E after bridge just over some graves",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Mushroom x5 - outside, SE after bridge to left before next interior",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Golden Rune [4] - outside, S after bridge, drop down off ledge, to E in corner",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Golden Rune [3] - down cog elevator, to NW item 1",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Avionette Soldier Ashes - down cog elevator, to NW item 2",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Smithing Stone [5] - below cog elevator item 1",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Longtail Cat Talisman - below cog elevator item 2",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Crystal Dart x5 - to NW in alcove with gears and crystals, S alcove",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Golden Rune [4] - to NW on ledge near upper cog elevator",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Conspectus Scroll - to S in left room",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Smithing Stone [4] - to S behind illusory bookshelf in left room, on balcony",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Stonesword Key - behind illusory bookshelf before boss room",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Furlcalling Finger Remedy - to S, follow corridor, W of 4-way on railing",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Carian Knight Helm - outside, S after bridge, drop down off ledge, by single grave",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Carian Knight Armor - outside, S after bridge, drop down off ledge, by single grave",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Carian Knight Gauntlets - outside, S after bridge, drop down off ledge, by single grave",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Carian Knight Greaves - outside, S after bridge, drop down off ledge, by single grave",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Somber Smithing Stone [3] - on massive gravestone S before cog elevator",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Lost Ashes of War - bottom of cog elevator, to W up crystals",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Comet - in chest behind illusory bookshelf before boss room",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Graven-School Talisman - behind illusory bookshelf before boss room, up ladder and down hidden hole",
      { groups: ["Hidden"], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/DB: Full Moon Crossbow - in chest after making the insane long jump to upper W roofs, top of tower after long ladder in rooftop section",
      { groups: ["Out of the Way"], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/CC: Gravity Well - enemy drop by massive gravestone S before cog elevator",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Raw Meat Dumpling - enemy drop to S, follow corridor, E in 4-way",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/SC: Living Jar Shard - enemy drop to S, follow corridor, E in 4-way",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Smithing Stone [5] - talk to Yura after beating invasion at RLA to NE",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Ash of War: Raptor of the Mists - beat invasion at RLA to NE",
      { groups: [], isMissable: true, region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Celestial Dew - down SE ramp by gate",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Strip of White Flesh x2 - down SE ramp before gate",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: St. Trina's Arrow x20 - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Blue Cloth Cowl - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Blue Cloth Vest - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Warrior Gauntlets - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Warrior Greaves - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Sacrificial Twig x3 - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Festering Bloody Finger x8 - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Stonesword Key x3 - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Note: The Preceptor's Secret - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Note: Revenants - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Note: Frenzied Flame Village - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Fevor's Cookbook [2] - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Lost Ashes of War - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Trina's Lily x3 - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Eye of Yelough - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    [
      "RLA/MAG: Fanged Imp Ashes - Isolated Merchant down SE ramp",
      { groups: [], region: "Raya Lucaria Academy" },
    ],
    ["RLA/MAG: Golden Seed - seedtree to NE", { groups: [], region: "Raya Lucaria Academy" }],
    [
      "LL/(ACC): Terra Magica - in chest atop tower after boss",
      { groups: ["Dungeon"], region: "Academy Crystal Cave" },
    ],
    [
      "LL/(ACC): Crystal Release - boss drop",
      { groups: ["Dungeon"], region: "Academy Crystal Cave" },
    ],
    [
      "LL/(ACC): Cuckoo Glintstone x5 - head SE from start of first room",
      { groups: ["Dungeon"], region: "Academy Crystal Cave" },
    ],
    [
      "LL/(ACC): Stonesword Key - in cage NW from first room",
      { groups: ["Dungeon"], region: "Academy Crystal Cave" },
    ],
    [
      "LL/(ACC): Crystal Staff - in chest behind illusory wall, left of storage room",
      { groups: ["Dungeon"], region: "Academy Crystal Cave" },
    ],
    [
      "LL/(ACC): Rune Arc - in chest in storage room",
      { groups: ["Dungeon"], region: "Academy Crystal Cave" },
    ],
    [
      "EBH/HR: Malenia's Great Rune - mainboss drop",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Unalloyed Gold Needle (Milicent) - help Millicent talk then reload area",
      { groups: ["Post Leyndell"], isMissable: true, region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Millicent's Prosthesis - invade Millicent or kill in altus",
      { groups: ["Post Leyndell"], isMissable: true, region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/HR: Miquella's Needle - use needle on flower in boss arena after Millicent quest",
      { groups: ["Post Leyndell"], isMissable: true, region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/HR: Somber Ancient Dragon Smithing Stone - use needle on flower in boss arena after Millicent quest",
      { groups: ["Post Leyndell"], isMissable: true, region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Rotten Winged Sword Insignia - help Millicent",
      { groups: ["Post Leyndell"], isMissable: true, region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/HR: Remembrance of the Rot Goddess - mainboss drop",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Golden Seed - miniboss drop in rot pond across large root",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Lord's Rune - miniboss drop to E on outer wall",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Rotten Staff - miniboss drop to E on outer wall",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Ghost Glovewort [9] - enemy drop 1 at bottom",
      { groups: ["Drop", "Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Ghost Glovewort [9] - enemy drop 2 at bottom",
      { groups: ["Drop", "Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Ghost Glovewort [9] - enemy drop 3 at bottom",
      { groups: ["Drop", "Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Ghost Glovewort [9] - enemy drop 4 at bottom",
      { groups: ["Drop", "Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Ghost Glovewort [9] - enemy drop 5 at bottom",
      { groups: ["Drop", "Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/HP: Ancient Dragon Smithing Stone - in chest up stairs after ladder",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Holy Grease x3 - to SE on bridge",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Golden Rune [12] - in first room on the left",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Smithing Stone [8] - on balcony in second room on the left",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Miquellan Knight's Sword - on top of ladder behind second buttress",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Lightning Greatbolt x5 - at end of path to the right",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Smithing Stone [7] - drop down to E, in building to N",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Triple Rings of Light - drop down to E, in chest behind imp statue",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Immunizing White Cured Meat - at end of path below third buttress",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Cleanrot Knight Finlay - in chest W of gazebo",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Somber Ancient Dragon Smithing Stone - in chest up the buttress NW of gazebo",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Numen's Rune - to E on outer wall",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Somber Ancient Dragon Smithing Stone - to E on outer wall, at end of SW path",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Somber Smithing Stone [9] - to E on outer wall at end of NW path in building",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Golden Rune [10] - drop down to NE of gazebo",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Smithing Stone [7] - in room under gazebo",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Old Fang x5 - up the buttress NW of gazebo, drop to NE",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Warming Stone x2 - to E in building across first buttress after stairs, item 1",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Spiritflame Arrow x15 - to E in building across first buttress after stairs, item 2",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Smithing Stone [8] - to N after jump to buttress up ladder",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Haligtree Soldier Ashes - to N at basin after jump to buttress up ladder",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Golden Rune [11] - to E after stairs",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Arteria Leaf - to E on stairs",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Sacramental Bud - to E on right",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Smithing Stone [8] - to SE at tree in lower section",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Lord's Rune - to SE first room on left in lower section",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Seedbed Curse - drop down to E before room under gazebo",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Somber Smithing Stone [9] - to SE in second room on right in lower section, item 1",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Pickled Turtle Neck - to SE in second room on right in lower section, item 2",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Beast Blood x3 - to SE third room on right in lower section",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Aeonian Butterfly x4 - to SE in corner before the imp statue in lower section",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Marika's Soreseal - to SE past the imp statue in lower section",
      { groups: ["Out of the Way", "Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Golden Rune [12] - to SE near the imp statue in lower section",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Haligtree Knight Helm - to E up the ladder",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Smithing Stone [6] - to N",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/PR: Seedbed Curse - up the buttress NW of gazebo",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Rotten Crystal Sword - in chest to S past roots on left",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Hero's Rune [5] - to SW behind basin at end of hallway",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Rot Grease - to NW at start of rot swamp",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/EIW: Great Grave Glovewort - in rot pond across large root",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/DC: Golden Rune [10] - to W up the ladder",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/DC: Ghost-Glovewort Picker's Bell Bearing [3] - between tombstones in far NW side of graveyard",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/DC: Nascent Butterfly - on SE balcony of main building",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/DC: Dragoncrest Greatshield Talisman - in chest after drop down on main building roof",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/DC: Aeonian Butterfly - on lower NW balcony of main building",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/DC: Arteria Leaf x3 - at S side of graveyard in a puddle",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/DC: Hero's Rune [5] - at S end of graveyard near large tree",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/DC: Numen's Rune - on a small ledge in far NW side of graveyard",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/HR: Traveler's Clothes - to S by giant rot flower",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/HR: Traveler's Manchettes - to S by giant rot flower",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "EBH/HR: Traveler's Boots - to S by giant rot flower",
      { groups: ["Post Leyndell"], region: "Elphael, Brace of the Haligtree" },
    ],
    [
      "CL/(CP): Prosthesis-Wearer Heirloom - give Millicent fixed needle",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    ["CL/(SC): Nomadic Warrior's Cookbook [14] - on corpse", { groups: [], region: "Caelid" }],
    ["CL/CHS: Golden Rune [1] 1 - graveyard to S", { groups: [], region: "Caelid" }],
    ["CL/CHS: Golden Rune [5] - graveyard to S", { groups: [], region: "Caelid" }],
    ["CL/CHS: Golden Rune [1] 2 - graveyard to S", { groups: [], region: "Caelid" }],
    ["CL/CHS: Golden Rune [2] - graveyard to S", { groups: [], region: "Caelid" }],
    ["CL/CWR: Poisonbloom x4 - S of CWR", { groups: [], region: "Caelid" }],
    ["CL/CHS: Starlight Shards - to W", { groups: [], region: "Caelid" }],
    ["CL/CHS: Larval Tear - enemy drop in graveyard to S", { groups: [], region: "Caelid" }],
    [
      "CL/SW: Somber Smithing Stone [4] - chair half way down cliff to SW",
      { groups: [], region: "Caelid" },
    ],
    ["CL/(CWR): Great Dragonfly Head x5 - middle of ruins", { groups: [], region: "Caelid" }],
    ["CL/(CWR): Rot Grease x3 - near tree", { groups: [], region: "Caelid" }],
    ["CL/(FG): Rune Arc - in courtyard", { groups: [], region: "Caelid" }],
    ["CL/(FG): Warming Stone x2 - walk the plank item", { groups: [], region: "Caelid" }],
    [
      "CL/(FG): Smoldering Butterfly x6 - in burning pile of corpses outback",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(FG): Mushroom x10 - wood platform behind a tower near gate lever",
      { groups: [], region: "Caelid" },
    ],
    ["CL/(FG): Flame, Grant Me Strength - against wall outback", { groups: [], region: "Caelid" }],
    ["CL/FGN: Explosive Greatbolt x5 - to S in camp", { groups: [], region: "Caelid" }],
    [
      "CL/(FG): Ash of War: Lion's Claw - enemy drop in courtyard",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(FG): Starscourge Heirloom - chest upper platform",
      { groups: ["Out of the Way"], region: "Caelid" },
    ],
    ["CL/(CWR): Meteoric Ore Blade - chest underground", { groups: [], region: "Caelid" }],
    ["CL/(FG): Katar - chest in lower room", { groups: [], region: "Caelid" }],
    ["CL/(FG): Fire Blossom x3 - enemy drop 1", { groups: [], region: "Caelid" }],
    ["CL/(FG): Smoldering Butterfly x5 - enemy drop 1 outback", { groups: [], region: "Caelid" }],
    ["CL/(FG): Fire Blossom x3 - enemy drop 2 outback", { groups: [], region: "Caelid" }],
    ["CL/(FG): Smoldering Butterfly x5 - enemy drop 2 outback", { groups: [], region: "Caelid" }],
    [
      "CL/FGN: Ash of War: Flame of the Redmanes - scarab to NE",
      { groups: ["Scarab"], region: "Caelid" },
    ],
    [
      "CL/FR: Somber Smithing Stone [4] - scarab on root arch S of FR",
      { groups: ["Scarab"], region: "Caelid" },
    ],
    ["CL/FR: Smithing Stone [5] - on mass SE of FR", { groups: [], region: "Caelid" }],
    ["CL/SW: Golden Rune [9] - to NW", { groups: [], region: "Caelid" }],
    ["CL/SW: Slumbering Egg x2 - in chest within camp to SW", { groups: [], region: "Caelid" }],
    ["CL/FGN: Fire Blossom x3 - enemy drop to E", { groups: [], region: "Caelid" }],
    ["CL/FGN: Smoldering Butterfly x5 - enemy drop to E", { groups: [], region: "Caelid" }],
    ["CL/MEW: Greenburst Crystal Tear - boss drop", { groups: [], region: "Caelid" }],
    ["CL/MEW: Flame-Shrouding Cracked Tear - boss drop", { groups: [], region: "Caelid" }],
    ["CL/MEW: Cracked Pot - N of NEW on root", { groups: [], region: "Caelid" }],
    ["CL/CR: Whirl, O Flame! - scarab to NW", { groups: ["Scarab"], region: "Caelid" }],
    ["CL/(FR): Golden Rune [5] - in NE ruin", { groups: [], region: "Caelid" }],
    ["CL/(FR): Smithing Stone [4] - middle of ruins", { groups: [], region: "Caelid" }],
    [
      "CL/MEW: Somber Smithing Stone [4] - E of MEW, chair way NW of CR grace",
      { groups: [], region: "Caelid" },
    ],
    ["CL/CR: Explosive Bolt x6 - in camp to N", { groups: [], region: "Caelid" }],
    ["CL/(CR): Drawstring Fire Grease x3 - in NW ruin", { groups: [], region: "Caelid" }],
    ["CL/(CR): Smoldering Butterfly x3 - near middle of ruins", { groups: [], region: "Caelid" }],
    ["CL/CR: Rune Arc - in chest within camp to N", { groups: [], region: "Caelid" }],
    [
      "CL/(FR): Sword of St. Trina - in chest underground behind imp statue",
      { groups: [], region: "Caelid" },
    ],
    ["CL/CR: Greatsword - in caravan chest to NW", { groups: [], region: "Caelid" }],
    ["CL/(CR): Fire Blossom x3 - enemy drop 2 SW side", { groups: [], region: "Caelid" }],
    ["CL/(CR): Smoldering Butterfly x5 - enemy drop 2 SW side", { groups: [], region: "Caelid" }],
    [
      "CL/(CDC): Smarag's Glintstone Breath - Dragon Communion, kill boss in LL, SW of ACC",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(CDC): Magma Breath - Dragon Communion, kill boss in MtG, S of FL",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(CDC): Agheel's Flame - Dragon Communion, kill boss in LG, NW of DBR",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(CDC): Ekzykes's Decay - Dragon Communion, kill boss to NW of here",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(CDC): Greyoll's Roar - Dragon Communion, kill enemy in CL, W of FF",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(CDC): Theodorix's Magma - Dragon Communion, kill boss in CS, SE of CF",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(CDC): Borealis's Mist - Dragon Communion, kill boss in MotG, N of FCM",
      { groups: [], region: "Caelid" },
    ],
    ["CL/(CDC): Dragonice - Dragon Communion", { groups: [], region: "Caelid" }],
    ["CL/(CDC): Rotten Breath - Dragon Communion", { groups: [], region: "Caelid" }],
    ["CL/(CDC): Glintstone Breath - Dragon Communion", { groups: [], region: "Caelid" }],
    [
      "CL/(CDC): Ancient Dragon Apostle's Cookbook [3] - by dragon",
      { groups: [], region: "Caelid" },
    ],
    ["CL/CHS: Dragon Heart - boss drop to SE", { groups: [], region: "Caelid" }],
    ["CL/ASS: Ash of War: Poisonous Mist - scarab to SE", { groups: ["Scarab"], region: "Caelid" }],
    ["CL/SASB: Crab Eggs x4 - to W", { groups: [], region: "Caelid" }],
    ["CL/CHS: Golden Rune [3] - to E", { groups: [], region: "Caelid" }],
    ["CL/CHS: Golden Rune [4] - on top of mound to SE", { groups: [], region: "Caelid" }],
    ["CL/ACHN: Preserving Boluses x3 - Nomadic Merchant to E", { groups: [], region: "Caelid" }],
    ["CL/ACHN: Aeonian Butterfly x5 - Nomadic Merchant to E", { groups: [], region: "Caelid" }],
    ["CL/(SSR): Perfume Bottle - in raised ruin", { groups: [], region: "Caelid" }],
    ["CL/ACHN: Ash of War: Lifesteal Fist - scarab to N", { groups: ["Scarab"], region: "Caelid" }],
    ["CL/(SSR): Golden Rune [4] - in SW Ruin", { groups: [], region: "Caelid" }],
    ["CL/(SSR): Traveler's Hat - in raised ruin", { groups: [], region: "Caelid" }],
    ["CL/(SSR): Perfumer's Traveling Garb - in raised ruin", { groups: [], region: "Caelid" }],
    ["CL/(SSR): Traveler's Gloves - in raised ruin", { groups: [], region: "Caelid" }],
    ["CL/(SSR): Traveler's Slops - in raised ruin", { groups: [], region: "Caelid" }],
    ["CL/(SSR): Meteorite Staff - on window SW Ruin", { groups: [], region: "Caelid" }],
    [
      "CL/IA: Golden Rune [3] - Millicent invasion to S",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    [
      "CL/IA: Golden Rune [5] - Millicent invasion to S",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    [
      "CL/IA: Golden Rune [10] - Millicent invasion to S",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    [
      "CL/IA: Sacramental Bud x5 - Millicent invasion to S",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    ["CL/SSR: Sacramental Bud - NW of SSR up roots", { groups: [], region: "Caelid" }],
    [
      "CL/DSW: Somber Smithing Stone [5] - to S after one way drop",
      { groups: [], region: "Caelid" },
    ],
    ["CL/(CR): Great Dragonfly Head x3 - in SE ruin", { groups: [], region: "Caelid" }],
    ["CL/DSW: Stonesword Key - to S", { groups: [], region: "Caelid" }],
    ["CL/(SSR): Rock Sling - in chest underground", { groups: [], region: "Caelid" }],
    ["CL/(CR): Fire Blossom x3 - enemy drop 3 E side", { groups: [], region: "Caelid" }],
    ["CL/(CR): Smoldering Butterfly x5 - enemy drop 3 E side", { groups: [], region: "Caelid" }],
    ["CL/DW: Golden Rune [1] - graveyard to S", { groups: [], region: "Caelid" }],
    ["CL/DW: Golden Rune [6] - graveyard to S", { groups: [], region: "Caelid" }],
    ["CL/DW: Golden Rune [2] - graveyard to S", { groups: [], region: "Caelid" }],
    ["CL/CR: Sacramental Bud - on giant skull SE of CR", { groups: [], region: "Caelid" }],
    ["CL/CR: Hefty Beast Bone x3 - E of CR", { groups: [], region: "Caelid" }],
    ["CL/DSW: Spiked Palisade Shield - to W follow ravine", { groups: [], region: "Caelid" }],
    ["CL/(CR): Visage Shield - in chest after boss", { groups: [], region: "Caelid" }],
    [
      "CL/(CR): Fire Blossom x3 - enemy drop 1 near underground entrance",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(CR): Smoldering Butterfly x5 - enemy drop 1 near underground entrance",
      { groups: [], region: "Caelid" },
    ],
    ["CL/IG: Ash of War: Cragblade - scarab to W", { groups: ["Scarab"], region: "Caelid" }],
    [
      "CL/CCC: Somber Smithing Stone [4] - scarab E of CCC",
      { groups: ["Scarab"], region: "Caelid" },
    ],
    ["CL/IG: Smoldering Butterfly x3 - to NW", { groups: [], region: "Caelid" }],
    ["CL/SASB: Fan Daggers x6 - to S", { groups: [], region: "Caelid" }],
    ["CL/SASB: Champion Headband - Nomadic Merchant to SW", { groups: [], region: "Caelid" }],
    ["CL/SASB: Champion Pauldron - Nomadic Merchant to SW", { groups: [], region: "Caelid" }],
    ["CL/SASB: Champion Bracers - Nomadic Merchant to SW", { groups: [], region: "Caelid" }],
    ["CL/SASB: Champion Gaiters - Nomadic Merchant to SW", { groups: [], region: "Caelid" }],
    ["CL/SASB: Greathelm - Nomadic Merchant to SW", { groups: [], region: "Caelid" }],
    ["CL/SASB: Stonesword Key - Nomadic Merchant to SW", { groups: [], region: "Caelid" }],
    [
      "CL/SASB: Note: Gravity's Advantage - Nomadic Merchant to SW",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/SASB: Nomadic Warrior's Cookbook [15] - Nomadic Merchant to SW",
      { groups: [], region: "Caelid" },
    ],
    ["CL/SASB: Cracked Pot - Nomadic Merchant to SW", { groups: [], region: "Caelid" }],
    ["CL/SASB: Map: Caelid - map pillar to SW", { groups: [], region: "Caelid" }],
    ["CL/SASB: Windy Crystal Tear - to S in basin", { groups: [], region: "Caelid" }],
    ["CL/SASB: Beast Blood x2 - to SE", { groups: [], region: "Caelid" }],
    ["CL/SASB: Golden Seed - seedtree to S", { groups: [], region: "Caelid" }],
    ["CL/SASB: Beast Blood x3 - to SE", { groups: [], region: "Caelid" }],
    ["CL/SG: Golden Rune [2] - S of SG", { groups: [], region: "Caelid" }],
    [
      "CL/SASB: Ash of War: Poison Moth Flight - night boss drop to SW",
      { groups: [], region: "Caelid" },
    ],
    ["CL/SASB: Death's Poker - night boss drop to SE", { groups: [], region: "Caelid" }],
    ["CL/SASB: Somber Smithing Stone [4] - enemy drop to SE", { groups: [], region: "Caelid" }],
    ["CL/SASB: Beast Blood - enemy drop to SE", { groups: [], region: "Caelid" }],
    ["CL/SASB: Old Fang x2 - enemy drop to SE", { groups: [], region: "Caelid" }],
    ["CL/IA: Commander's Standard - boss drop to SE", { groups: [], region: "Caelid" }],
    ["CL/IA: Unalloyed Gold Needle (Broken) - boss drop to SE", { groups: [], region: "Caelid" }],
    [
      "CL/IA: Ash of War: Sacred Ring of Light - scarab to SE",
      { groups: ["Scarab"], region: "Caelid" },
    ],
    ["CL/SASB: Somber Smithing Stone [4] - to N", { groups: [], region: "Caelid" }],
    ["CL/SASB: Aeonian Butterfly - to N", { groups: [], region: "Caelid" }],
    ["CL/SASB: Smithing Stone [4] x3 - chairs to NW", { groups: [], region: "Caelid" }],
    ["CL/(SG): Black-Key Bolt x20 - upper part", { groups: [], region: "Caelid" }],
    ["CL/SASB: Sacramental Bud x2 - chairs to NW", { groups: [], region: "Caelid" }],
    ["CL/SASB: Rune Arc - chairs to NW", { groups: [], region: "Caelid" }],
    ["CL/(SG): Golden Rune [4] - upper part", { groups: [], region: "Caelid" }],
    ["CL/SG: Golden Rune [5] - S of SG", { groups: [], region: "Caelid" }],
    ["CL/SG: Glass Shard x5 - S of SG", { groups: [], region: "Caelid" }],
    ["CL/(SLT): Eternal Darkness - in cage", { groups: [], region: "Caelid" }],
    ["CL/SUS: Poison Armament - scarab to W", { groups: ["Scarab"], region: "Caelid" }],
    [
      "CL/(STS): Ash of War: Double Slash - scarab above SUS grace root",
      { groups: ["Scarab"], region: "Caelid" },
    ],
    [
      "CL/(STS): Stonesword Key - upstairs from SUS grace to right on arch",
      { groups: [], region: "Caelid" },
    ],
    ["CL/(STS): Poisonbloom x5 - on house SW side of STS", { groups: [], region: "Caelid" }],
    ["CL/SUS: Rune Arc - to W", { groups: [], region: "Caelid" }],
    [
      "CL/(STS): Staff of Loss - on balcony above SUS grace to NE",
      { groups: [], region: "Caelid" },
    ],
    ["CL/SUS: Rotten Stray Ashes - in ruin to NW", { groups: [], region: "Caelid" }],
    ["CL/(STS): Nox Flowing Sword - boss drop", { groups: [], region: "Caelid" }],
    ["CL/(STS): Lusat's Glintstone Staff - in chest after boss", { groups: [], region: "Caelid" }],
    [
      "CL/(STS): Spelldrake Talisman +1 - in chest behind seal above SUS grace to NE",
      { groups: ["Out of the Way"], region: "Caelid" },
    ],
    ["CL/IG: Mushroom x6 - in tent to N", { groups: [], region: "Caelid" }],
    [
      "CL/IG: Arrow's Sting Talisman - chest top of tower",
      { groups: ["Out of the Way"], region: "Caelid" },
    ],
    ["CL/(GS): Glintstone Stars - Gowry Shop", { groups: [], isMissable: true, region: "Caelid" }],
    ["CL/(GS): Night Shard - Gowry Shop", { groups: [], isMissable: true, region: "Caelid" }],
    [
      "CL/(GS): Night Maiden's Mist - Gowry Shop",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    [
      "CL/(GS): Pest Threads - Gowry Shop after giving Valkyrie's Prosthesis to Millicent",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    [
      "CL/(GS): Unalloyed Gold Needle (Fixed) - talk to Gowry after giving needle",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    [
      "CL/(GS): Sellia's Secret - talk to Gowry with needle",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    [
      "CL/(GS): Flock's Canvas Talisman - kill Gowry or complete questline",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    [
      "CL/(GS): Gowry's Bell Bearing - kill Gowry or complete questline",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    ["CL/CP: Golden Rune [5] - far S of CP on pillar", { groups: [], region: "Caelid" }],
    ["CL/CP: Drawstring Poison Grease x3 - S of CP", { groups: [], region: "Caelid" }],
    ["CL/(CP): Sacred Tear - by statue", { groups: [], region: "Caelid" }],
    [
      "CL/CP: Golden Rune [9] - enemy drop SW of CP, near broken pillars 1",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/CP: Golden Rune [9] - enemy drop SW of CP, near broken pillars 2",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/CP: Golden Rune [9] - enemy drop SW of CP, near broken pillars 3",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/CP: Golden Rune [9] - enemy drop SW of CP, near branch 1",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/CP: Golden Rune [9] - enemy drop SW of CP, near branch 2",
      { groups: [], region: "Caelid" },
    ],
    [
      'CL/(STS): "Redmane" Painting - upstairs from SUS grace to right',
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(STS): Poison Grease x2 - upstairs from SUS grace, straight up next stairs",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(STS): Toxic Mushroom x5 - upstairs from SUS grace, straight up next stairs, on roof to left",
      { groups: [], region: "Caelid" },
    ],
    ["CL/CP: Starlight Shards - E of CP", { groups: [], region: "Caelid" }],
    ["CL/(STS): Cerulean Tear Scarab - on house NE side of STS", { groups: [], region: "Caelid" }],
    ["CL/SH: Beast Blood x2 - S of SH", { groups: [], region: "Caelid" }],
    ["CL/(STS): Golden Seed - seedtree by SB grace", { groups: [], region: "Caelid" }],
    [
      "CL/(STS): Night Comet - in chest behind seal upstairs from SUS grace",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(STS): Imbued Sword Key - in chest behind seal E side of STS",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Ash of War: Flaming Strike - scarab graveyard by back entrance",
      { groups: ["Scarab"], region: "Caelid" },
    ],
    [
      "CL/(RC): Smoldering Butterfly x8 - graveyard by back entrance",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Golden Rune [9] - enemy drop, graveyard by back entrance",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Red-Hot Whetblade - upper front courtyard in NW room",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Armorer's Cookbook [4] - room W side of front courtyard",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Armorer's Cookbook [5] - by back entrance shortcut door",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Golden Rune [6] - wood structure S side of front courtyard",
      { groups: [], region: "Caelid" },
    ],
    ["CL/(RC): Smithing Stone [6] - on entrance tower", { groups: [], region: "Caelid" }],
    ["CL/(RC): Smithing Stone [3] - behind entrance tower", { groups: [], region: "Caelid" }],
    ["CL/(RC): Smithing Stone [4] - front courtyard", { groups: [], region: "Caelid" }],
    [
      "CL/(RC): Smithing Stone [3] - room S of COP, up ladder, corpse on ledge",
      { groups: [], region: "Caelid" },
    ],
    ["CL/(RC): Smithing Stone [5] - room S of COP, up ladder x2", { groups: [], region: "Caelid" }],
    [
      "CL/(RC): Smithing Stone [5] - by back entrance shortcut door",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Smithing Stone [4] - out from grace, to W, up wood stairs on platform",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Smithing Stone [6] - in church during festival",
      { groups: [], isMissable: true, region: "Caelid" },
    ],
    [
      "CL/(RC): Somber Smithing Stone [5] - to N after boss arena",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Flamberge - room S of COP, up ladder, behind enemy",
      { groups: [], region: "Caelid" },
    ],
    [
      "CL/(RC): Somber Smithing Stone [4] - enemy drop 1 front courtyard",
      { groups: [], region: "Caelid" },
    ],
    ["CL/(RC): Beast Blood - enemy drop 1 front courtyard", { groups: [], region: "Caelid" }],
    ["CL/(RC): Old Fang x2 - enemy drop 1 front courtyard", { groups: [], region: "Caelid" }],
    [
      "CL/(RC): Somber Smithing Stone [4] - enemy drop 2 front courtyard",
      { groups: [], region: "Caelid" },
    ],
    ["CL/(RC): Beast Blood - enemy drop 2 front courtyard", { groups: [], region: "Caelid" }],
    ["CL/(RC): Old Fang x2 - enemy drop 2 front courtyard", { groups: [], region: "Caelid" }],
    [
      "CL/(RC): Smithing Stone [6] - upper front courtyard NW room, follow upper path till chest",
      { groups: [], region: "Caelid" },
    ],
    ["CL/RB: Golden Rune [1] - graveyard to SW", { groups: [], region: "Caelid" }],
    ["CL/RB: Golden Rune [2] - graveyard to SW", { groups: [], region: "Caelid" }],
    ["CL/RB: Golden Rune [3] - graveyard to SW", { groups: [], region: "Caelid" }],
    ["CL/(SC): Missionary's Cookbook [3] - on corpse", { groups: [], region: "Caelid" }],
    ["CL/RB: Nascent Butterfly x2 - to E", { groups: [], region: "Caelid" }],
    ["CL/MEW: Rune Arc - W of MEW high on root", { groups: [], region: "Caelid" }],
    ["CL/RB: Golden Rune [3] - in stable to N", { groups: [], region: "Caelid" }],
    ["CL/RB: Preserving Boluses x5 - in shack to SW", { groups: [], region: "Caelid" }],
    ["CL/RB: Drawstring Lightning Grease x2 - to W", { groups: [], region: "Caelid" }],
    ["CL/(SC): Sacred Scorpion Charm - invader drop", { groups: [], region: "Caelid" }],
    [
      "MH/HTP: Loretta's War Sickle - boss drop",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Loretta's Mastery - boss drop",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Stonesword Key - to S behind waygate arrival location",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Sacramental Bud x3 - to S first side branch",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Golden Rune [10] - to E after a single drop",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Stonesword Key - from main branch, go S take small left branch then on a small right branch",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Fire Grease x3 - from main branch, go S take small left branch all the way up then go S",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Aeonian Butterfly x2 - from main branch, go S take small left branch all the way up, go NW and down a small brach on the left",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Preserving Boluses - from main branch, go S take small left branch all the way up then go NW",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Golden Rune [10] - from main branch, go S then left fork",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Envoy Crown - from main branch, go S take left fork then S",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Dappled Cured Meat - from main branch, go S take right fork",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Smithing Stone [8] - from main branch, go S take right fork then SE",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      'MH/HC: Prattling Pate "My beloved" - drop to E, drop onto main branch, go N then up large branch on left, jump up mushrooms',
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Warming Stone x4 - from main branch, go N",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Flaming Bolt x10 - to E up ladder, S up branch item 2",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Numen's Rune - to E up ladder, S up branch item 1",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Golden Rune [13] - from main branch, go N then drop on right and cont. N",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Lost Ashes of War - from main branch, go N then drop on right and cont. N, at split go W to small shrine",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HC: Oracle Envoy Ashes - from main branch, go N then drop on right and cont. N, at split go E to top of branch",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HT: Golden Rune [10] - to NW by the first ladder",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HT: Rot Grease x2 - to NW up the first ladder",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HT: Pearldrake Talisman +2 - to NW up the first ladder, jump SE over a gap",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HT: Smithing Stone [8] - to NW first building top floor",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HT: Golden Rune [13] - to NW first building lower floor rear balcony",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HT: Hefty Beast Bone x6 - to NW first building lower floor",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HT: Fire Grease x5 - to NW on small wooden bridge",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HT: Ancient Dragon Smithing Stone - to N in the courtyard",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Somber Smithing Stone [8] - to N on a balcony",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Golden Rune [12] - beside the grace",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Aeonian Butterfly x4 - to E down on a branch",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Smithing Stone [6] - to S first building top roof",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Somber Smithing Stone [9] - to S first building top floor",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Golden Rune [10] - to NE first building lower roof",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Golden Rune [12] - to NE first building lower floor",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Viridian Amber Medallion +2 - to NE first building lower floor in chest",
      { groups: ["Hidden", "Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Smithing Stone [6] - to NE round building roof",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Sacramental Bud - to NE round building west wing",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Smithing Stone [7] - to NE on a bridge by the elevator",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Hero's Rune [4] - to NE in the small rotunda by the elevator",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "MH/HTP: Smithing Stone [8] - NE in the large rotunda by the elevator",
      { groups: ["Post Leyndell"], region: "Miquella's Haligtree" },
    ],
    [
      "VM/VM: Drawing-Room Key - join volcano manor",
      { groups: [], region: "Volcano Manor Entrance" },
    ],
    [
      "VM/VM: Letter to Patches - talk to Patches after request 1",
      { groups: [], isMissable: true, region: "Volcano Manor Entrance" },
    ],
    [
      "VM/VM: Magma Whip Candlestick - Patches reward",
      { groups: [], isMissable: true, region: "Volcano Manor Entrance" },
    ],
    [
      "VM/VM: Smithing Stone [6] - up the main stairs",
      { groups: [], region: "Volcano Manor Entrance" },
    ],
    [
      "VM/VM: Ghiza's Wheel - invader drop up the main stairs",
      { groups: [], region: "Volcano Manor Entrance" },
    ],
    ["LG/(MCV): Parrying Dagger - Patches shop", { groups: ["Dungeon"], region: "Murkwater Cave" }],
    [
      "LG/(MCV): Horse Crest Wooden Shield - Patches shop",
      { groups: ["Dungeon"], region: "Murkwater Cave" },
    ],
    ["LG/(MCV): Great Arrow x10 - Patches shop", { groups: ["Dungeon"], region: "Murkwater Cave" }],
    [
      "LG/(MCV): Ballista Bolt x5 - Patches shop",
      { groups: ["Dungeon"], region: "Murkwater Cave" },
    ],
    [
      "LG/(MCV): Sacrificial Twig - Patches shop",
      { groups: ["Dungeon"], region: "Murkwater Cave" },
    ],
    [
      "LG/(MCV): Festering Bloody Finger x5 - Patches shop",
      { groups: ["Dungeon"], region: "Murkwater Cave" },
    ],
    [
      "LG/(MCV): Furlcalling Finger Remedy x3 - Patches shop",
      { groups: ["Dungeon"], region: "Murkwater Cave" },
    ],
    [
      "LG/(MCV): Gold-Pickled Fowl Foot x3 - Patches shop",
      { groups: ["Dungeon"], region: "Murkwater Cave" },
    ],
    ["LG/(MCV): Grace Mimic x15 - Patches shop", { groups: ["Dungeon"], region: "Murkwater Cave" }],
    [
      "LG/(MCV): Margit's Shackle - Patches shop",
      { groups: ["Dungeon"], region: "Murkwater Cave" },
    ],
    ["LG/(MCV): Stonesword Key - Patches shop", { groups: ["Dungeon"], region: "Murkwater Cave" }],
    [
      "LG/(MCV): Missionary's Cookbook [2] - Patches shop",
      { groups: ["Dungeon"], region: "Murkwater Cave" },
    ],
    [
      "LG/(MCV): Spear - kill Patches",
      { groups: ["Dungeon"], isMissable: true, region: "Murkwater Cave" },
    ],
    [
      "LG/(MCV): Leather Armor - kill Patches",
      { groups: ["Dungeon"], isMissable: true, region: "Murkwater Cave" },
    ],
    [
      "LG/(MCV): Leather Gloves - kill Patches",
      { groups: ["Dungeon"], isMissable: true, region: "Murkwater Cave" },
    ],
    [
      "LG/(MCV): Leather Boots - kill Patches",
      { groups: ["Dungeon"], isMissable: true, region: "Murkwater Cave" },
    ],
    [
      "LG/(MCV): Golden Rune [1] x2 - spare or kill Patches",
      { groups: ["Dungeon"], isMissable: true, region: "Murkwater Cave" },
    ],
    ["LG/(MCV): Mushroom x5 - chest at back", { groups: ["Dungeon"], region: "Murkwater Cave" }],
    ["LG/(MCV): Cloth Garb - Patches chest", { groups: ["Dungeon"], region: "Murkwater Cave" }],
    ["LG/(MCV): Cloth Trousers - Patches chest", { groups: ["Dungeon"], region: "Murkwater Cave" }],
    [
      "LG/(MCV): Glass Shard x3 - Patches chest, after you've given the Dancer's Castanets to Tanith",
      { groups: ["Dungeon"], isMissable: true, region: "Murkwater Cave" },
    ],
    [
      "VM/AP: Serpent-Hunter - statue in mainboss arena",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    ["VM/AP: Rykard's Great Rune - mainboss drop", { groups: [], region: "Volcano Manor Upper" }],
    [
      "VM/TE: Missionary's Cookbook [6] - E of shortcut elevator, inside lower part of tower in cell",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/RLB: Consort's Mask - kill Tanith",
      { groups: [], isMissable: true, region: "Volcano Manor Upper" },
    ],
    [
      "VM/RLB: Consort's Robe - kill Tanith",
      { groups: [], isMissable: true, region: "Volcano Manor Upper" },
    ],
    [
      "VM/RLB: Consort's Trousers - kill Tanith",
      { groups: [], isMissable: true, region: "Volcano Manor Upper" },
    ],
    [
      "VM/AP: Remembrance of the Blasphemous - mainboss drop",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Somber Smithing Stone [5] - scarab N of shortcut elevator below",
      { groups: ["Scarab"], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Ash of War: Royal Knight's Resolve - NW of shortcut elevator, after imp statue, lower part of big cage room to NE",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Golden Rune [9] - NW corner of upper church",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Smoldering Butterfly x4 - by lava pool after jumping down from church",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Golden Rune [12] - below balcony after jumping down from church",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Furlcalling Finger Remedy - on SE rock tip",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Drawstring Fire Grease x4 - E of shortcut elevator, inside lower part of tower by ladder",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Crimson Tear Scarab - E of shortcut elevator over S railing before door",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Stonesword Key - in room middle of shortcut elevator",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Rune Arc - NW of shortcut elevator, after imp statue, drop to hidden path lower item",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Commoner's Headband - NW of shortcut elevator on snake statue",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Man-Serpent Ashes - NW of shortcut elevator on altar inside",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Somber Smithing Stone [6] - NW of shortcut elevator, after stairs in room below",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Dagger Talisman - NW of shortcut elevator, after imp statue, drop to hidden path top item",
      { groups: ["Hidden"], region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Seedbed Curse - NW of shortcut elevator, after imp statue, lower part of big cage room to SW",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    ["VM/AP: Eye Surcoat - in mainboss arena", { groups: [], region: "Volcano Manor Upper" }],
    [
      "VM/RLB: Aspects of the Crucible: Breath - enemy drop, spawns after Tanith's death",
      { groups: [], isMissable: true, region: "Volcano Manor Upper" },
    ],
    [
      "VM/TE: Somber Smithing Stone [7] - NW of shortcut elevator, after imp statue, lower part of big cage room outside to SW",
      { groups: [], region: "Volcano Manor Upper" },
    ],
    [
      "(VM)/SIC: Inquisitor's Girandole - boss drop, from RLA warp",
      { groups: [], region: "Volcano Manor Dungeon" },
    ],
    [
      "(VM)/RLA: Smoldering Butterfly x5 - to E after warp",
      { groups: [], region: "Volcano Manor Dungeon" },
    ],
    [
      "(VM)/SIC: Smithing Stone [6] - to S by cage",
      { groups: [], region: "Volcano Manor Dungeon" },
    ],
    [
      "(VM)/SIC: Smithing Stone [4] - to S on the pillar",
      { groups: [], region: "Volcano Manor Dungeon" },
    ],
    ["VM/GH: Godskin Stitcher - boss drop", { groups: [], region: "Volcano Manor" }],
    ["VM/GH: Noble Presence - boss drop", { groups: [], region: "Volcano Manor" }],
    [
      "VM/PTC: Somber Smithing Stone [5] - scarab on NW lower rooftop",
      { groups: ["Scarab"], region: "Volcano Manor" },
    ],
    ["VM/PTC: Golden Rune [9] - up the skinny roof path", { groups: [], region: "Volcano Manor" }],
    [
      "VM/PTC: Golden Rune [5] - side of the bridge on rooftops",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Stonesword Key - outside SE of town, jump to lower broken stairs",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Furlcalling Finger Remedy - on path around town down an alley to NE",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Smithing Stone [6] - on N high hexagon roof",
      { groups: [], region: "Volcano Manor" },
    ],
    ["VM/PTC: Erdtree Seal - in room within town", { groups: [], region: "Volcano Manor" }],
    [
      "VM/PTC: Drawstring Fire Grease x3 - between corpse fire and exit gate within town",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Golden Rune [6] - by corpse fire middle of town",
      { groups: [], region: "Volcano Manor" },
    ],
    ["VM/PTC: Fire Arrow x10 - on path around town", { groups: [], region: "Volcano Manor" }],
    ["VM/GH: Golden Rune [9] - under the stairs", { groups: [], region: "Volcano Manor" }],
    [
      "VM/GH: Explosive Greatbolt x5 - to NW outside by curved railing",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Golden Rune [9] - outside to E on the fountain",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Somber Smithing Stone [6] - outside to E, on right roof",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Fireproof Dried Liver x2 - outside to E, S of ladder in corner",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Albinauric Bloodclot - over the railing SE of GH upper entrance door",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Smithing Stone [4] - SW of GH upper entrance door",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Smithing Stone [6] x2 - outside to E, on left roof",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Smoldering Butterfly x6 - outside to E, ride elevator down, start of cave",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Smithing Stone [7] - outside to E, ride elevator down, back of cave",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Somber Smithing Stone [5] - outside to E, ride elevator up, to SE at top",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Golden Rune [10] - fall from GH roof to SW, up ladder",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Smithing Stone [6] x2 - in lower graveyard, middle island",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Golden Rune [9] - NE side of lower graveyard on ledge",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Smithing Stone [5] - on lower roof by exit gate of town",
      { groups: [], region: "Volcano Manor" },
    ],
    ["VM/GH: Beast Blood x2 - in corner of GH entrance", { groups: [], region: "Volcano Manor" }],
    [
      "VM/GH: Albinauric Staff - fall from GH roof to SW, on guillotine",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Albinauric Mask - fall from GH roof to SW, on guillotine",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Crimson Amber Medallion +1 - behind imp statue W of town",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Smoldering Shield - NE side of lower graveyard by enemies",
      { groups: [], region: "Volcano Manor" },
    ],
    ["VM/TE: Serpent's Amnion - on the altar", { groups: [], region: "Volcano Manor" }],
    [
      "VM/PTC: Raw Meat Dumpling - enemy drop NE side of lower graveyard",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Living Jar Shard - enemy drop NE side of lower graveyard",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Great Omenkiller Cleaver - enemy drop, fall from GH roof to SW, in torture room",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/PTC: Great Omenkiller Cleaver - enemy drop by corpse fire middle of town",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "VM/GH: Dragon Heart - enemy drop outside to E, ride elevator down, in cave",
      { groups: [], region: "Volcano Manor" },
    ],
    [
      "LG/(FHG): Golden Seed - boss drop",
      { groups: ["Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Banished Knight Oleg - boss drop",
      { groups: ["Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Poisonbone Dart x5 - top of first ramp",
      { groups: ["Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Stonesword Key - drop into second ramp pit, past fire spitter, drop to bottom of big room",
      { groups: ["Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Golden Rune [5] - middle of second ramp pit",
      { groups: ["Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Dragonwound Grease - top of third ramp",
      { groups: ["Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Lightning Grease x2 - drop into second ramp pit, left of fire spitter",
      { groups: ["Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Erdtree's Favor - altar by miniboss duo",
      { groups: ["Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Grave Glovewort [1] - middle of lower third ramp",
      { groups: ["Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Dragon Communion Seal - enemy drop top of third ramp",
      { groups: ["Drop", "Dungeon"], region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Erdtree Greatbow - kill chariot",
      { groups: ["Dungeon"], isMissable: true, region: "Fringefolk Hero's Grave" },
    ],
    [
      "LG/(FHG): Great Arrow x10 - kill chariot",
      { groups: ["Dungeon"], isMissable: true, region: "Fringefolk Hero's Grave" },
    ],
    ["ET: Elden Remembrance - mainboss drop", { groups: ["Post Leyndell"], region: "Erdtree" }],
    [
      "BTS/SPA: Crusade Insignia - invader drop in NE courtyard",
      { groups: ["DLC"], isMissable: true, region: "Belurat" },
    ],
    [
      "BTS/SPA: Scorpion Stew - given by Hornsent Grandam while wearing the Divine Beast Head a second time after reloading",
      { groups: ["DLC"], isMissable: true, region: "Belurat" },
    ],
    [
      "BTS/SPA: Watchful Spirit - given by Hornsent Grandam while wearing the Divine Beast Head",
      { groups: ["DLC"], isMissable: true, region: "Belurat" },
    ],
    [
      "BTS/SPA: Gourmet Scorpion Stew - given by Hornsent Grandam after defeating SK mainboss",
      { groups: ["DLC"], isMissable: true, region: "Belurat" },
    ],
    [
      "BTS/SPA: Gourmet Scorpion Stew - on Hornsent Grandam after defeating SK mainboss, exhausting her dialogue, and reloading",
      { groups: ["DLC"], isMissable: true, region: "Belurat" },
    ],
    [
      "BTS/SF: Remembrance of the Dancing Lion - mainboss drop",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/TDB: Revered Spirit Ash - on statue after boss", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/TDB: Tower of Shadow Message - at the top of the stairs after boss",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/BTS: Shadow Realm Rune [1] - to SE, behind statue",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/BTS: Fireproof Dried Liver - stairs to SE", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/BTS: Black Pyrefly x5 - stairs to SE right before grace",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/BTS: Neutralizing Boluses - room to W", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/BTS: Knot Resin x3 - to E, waterfall", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/BTS: Stimulating Boluses - fountain to E", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/BTS: Somber Smithing Stone [5] - second fountain to E",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Messmerfire Grease - to SW, down side street",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/SPA: Black Pyrefly x3 - down stairs to S", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/SPA: Silver Horn Tender - behind pots below grace",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Silver Horn Tender - to SW, from bridge go to NW rooftops",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Somber Smithing Stone [7] - to SW, from bridge go to SW rooftops",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Silver Horn Tender x2 - to SW, from bridge go to SW rooftops",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Golden Horn Tender x2 - to SW, from bridge go to SW rooftops",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/BTS: Revered Spirit Ash x2 - to SE, statue by stairs",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/BTS: Messmerfire Grease - to SE, down ladder", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/SPA: Rada Fruit - to NE, S section of invader courtyard",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Black Pyrefly x3 - to NE, N section of invader courtyard",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Ash of War: Shriek of Sorrow - to NE, tree in invader courtyard",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Dewgem x3 - to NE, S section of invader courtyard",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Arrow x10 - to NE, up the rubble in W invader courtyard",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/SPA: Black Pyrefly x2 - to N, in rubble", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/SPA: Thin Beast Bones x4 - to N, in rubble", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/SPA: Redflesh Mushroom x5 - to N, in front of sewer grate",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/SPA: String x4 - to N, top of waterfall", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/SPA: Storeroom Key - to NW, up ladder", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/SPA: Throwing Dagger x3 - to NW, bottom of stairs",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Whiteflesh Mushroom x6 - to NW, up ladder, jump onto bridge",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SPA: Well Depths Key - to NW, up ladder, jump onto bridge, room to E",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/SPA: Flight Pinion x4 - to NE, on rooftops", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/SPA: Smithing Stone [6] x2 - to NE, on rooftops", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/BTS: Bone Bow - up shortcut elevator, room to NW",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/SF: Thin Beast Bones x5 - W of cross", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/SF: Scadutree Fragment - to S by cross", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/SF: Dried Bouquet - SE of cross", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/SF: Glass Shard - to E, down ladder, SW corner", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/SF: Stanching Boluses - to E, down ladder, NW corner",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/SF: Redflesh Mushroom x8 - to E, down ladder, NW rubble",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/SF: Fly Mold x4 - to E, down ladder, S wall", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/SF: Broken Rune - to E, down ladder", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/SF: Black Pyrefly x4 - to SE, hanging off wall", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/SF: Revered Spirit Ash - to SW, statue", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/SF: Somber Smithing Stone [5] - to W, bottom of stairs",
      { groups: ["DLC"], region: "Belurat" },
    ],
    ["BTS/BTS: Black Pyrefly x3 - NE of shortcut elevator", { groups: ["DLC"], region: "Belurat" }],
    ["BTS/BTS: Divine Beast Head - boss drop", { groups: ["DLC"], region: "Belurat" }],
    [
      "BTS/BTS: Golden Horn Tender - enemy drop NE of shortcut elevator",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "BTS/BTS: Revered Spirit Ash - enemy drop NE of shortcut elevator",
      { groups: ["DLC"], region: "Belurat" },
    ],
    [
      "Cross: Message from Leda - by any cross after SK mainboss",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Ansbach's Longbow - on Leda's body after invading her alongside Ansbach",
      { groups: ["DLC"], isMissable: true, region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Leda's Rune - on Leda's body after invading her alongside Ansbach",
      { groups: ["DLC"], isMissable: true, region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SSF: Golden Lion Shield - given by Freyja after giving her Letter for Freyja",
      { groups: ["DLC"], isMissable: true, region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Letter for Freyja - given by Ansbach after giving Secret Rite Scroll",
      { groups: ["DLC"], isMissable: true, region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/DCE: Remembrance of the Impaler - mainboss drop",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/DCE: Messmer's Kindling - mainboss drop",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Fireproof Pickled Liver - to E in left corner",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Rune Arc - to NW in room leading down",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Revered Spirit Ash - on top of beast",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Ember of Messmer x2 - down left path, under stair arch",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Fire Coil - E corner of upper bottom floor",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Hefty Beast Bone x3 - NE room of upper bottom floor",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Smithing Stone [8] x5 - NW corner of upper bottom floor",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Black Pyrefly x4 - W side of second floor",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Beast Horn x4 - middle of second floor under stairs",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Smithing Stone [7] x4 - on second floor SW bridge",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Boltdrake Talisman +3 - to E in room down path",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Beast Horn - SW room of third floor",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Pearldrake Talisman +3 - on center specimens horns after they get moved, on third floor",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Blessed Bone Shard - S side of third floor",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Furlcalling Finger Remedy - on SW bridge of third floor",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Dueling Shield - SE of SW bridge of third floor",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Lump of Flesh x2 - across SW bridge of third floor, in S corner room",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFiF: Beast Horn x4 - across SW bridge of third floor, by balcony",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Storehouse Cross Message - by cross",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Scadutree Fragment - by cross",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Stormhawk Feather x3 - outside to right",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Black Pyrefly x4 - outside by flaming boats",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Shadow Realm Rune [5] - outside, down stairs, beside stairs",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Holyproof Pickled Liver - outside, down stairs back inside, by wall",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Secret Rite Scroll - outside, down stairs back inside, on table",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Redflesh Mushroom x6 - outside, NE end of outer walkway",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Ember of Messmer x3 - outside, NE end of outer walkway, by ledge",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Smithing Stone [7] x4 - after outer walkway, left in dead-end",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Fire Coil x2 - after outer walkway, on right by bookshelf",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SFoF: Smithing Stone [8] x3 - after outer walkway, to right, on right after skinny walkway",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SSF: Silver-Pickled Fowl Foot - downstairs on lower stairs",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SSF: Spirit Calculus - downstairs in SW room",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SSF: Sliver of Meat x2 - to NE between stairs",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SSF: Revered Spirit Ash - to E on beast",
      { groups: ["DLC", "Out of the Way"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SSF: Ember of Messmer x5 - downstairs to SW, by left wall",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/SSF: Shadow Realm Rune [5] - downstairs to SW, by lever",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/DCE: Ember of Messmer x3 - downstairs, inside to SE",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/DCE: Scadutree Fragment - downstairs by statue",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/DCE: Impenetrable Thorns - downstairs, outside to S down on hidden platform",
      { groups: ["DLC", "Hidden"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/DCE: Winged Serpent Helm - enemy drop downstairs outside",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "SK/DCE: Ash of War: Flame Spear - enemy drop downstairs outside",
      { groups: ["DLC"], region: "Shadow Keep Storehouse" },
    ],
    [
      "BTS/BTS: Smithing Stone [6] x4 - by SW wall on building",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    ["BTS/BTS: Thin Beast Bones x8 - SE swamp area", { groups: ["DLC"], region: "Belurat Swamp" }],
    ["BTS/BTS: Sliver of Meat x2 - SE swamp area", { groups: ["DLC"], region: "Belurat Swamp" }],
    ["BTS/BTS: Broken Rune - SE swamp area", { groups: ["DLC"], region: "Belurat Swamp" }],
    [
      "BTS/BTS: Smithing Stone [5] x2 - SE swamp area",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    ["BTS/BTS: Poisonbone Dart x8 - SE swamp area", { groups: ["DLC"], region: "Belurat Swamp" }],
    [
      "BTS/BTS: Neutralizing Boluses - in swamp area behind W buildings",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    [
      "BTS/BTS: Serpent Arrow x8 - top of W building in NW swamp area",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    [
      "BTS/BTS: Beast Liver x3 - NW wall of swamp area",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    [
      "BTS/BTS: Poisoned Hand - N swamp area, by building",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    [
      "BTS/BTS: Knot Resin x5 - NW swamp area on building rubble",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    [
      "BTS/BTS: Whiteflesh Mushroom x4 - in swamp area, S of shortcut ladder",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    [
      "BTS/BTS: Immunizing Horn Charm +2 - enemy drop in SE swamp area",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    [
      "BTS/BTS: Horned Warrior's Sword - enemy drop in NW swamp area",
      { groups: ["DLC"], region: "Belurat Swamp" },
    ],
    [
      "EI/CCA: Leda's Armor - on Leda's body after npc boss",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Freyja's Greatsword - on Freyja's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Freyja's Helm - on Freyja's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Freyja's Armor - on Freyja's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Freyja's Gauntlets - on Freyja's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Freyja's Greaves - on Freyja's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Falx - on Hornsent's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Caterpillar Mask - on Hornsent's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Braided Cord Robe - on Hornsent's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Braided Arm Wraps - on Hornsent's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Soiled Loincloth - on Hornsent's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Obsidian Lamina - on Ansbach's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Ansbach's Longbow - on Ansbach's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Wise Man's Mask - on Ansbach's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Ansbach's Attire - on Ansbach's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Ansbach's Manchettes - on Ansbach's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Ansbach's Boots - on Ansbach's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Furious Blade of Ansbach - on Ansbach's body",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/GD: Thiollier's Hidden Needle - on Thiollier's body to NW",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/GD: Thiollier's Mask - on Thiollier's body to NW",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/GD: Thiollier's Garb - on Thiollier's body to NW",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/GD: Thiollier's Gloves - on Thiollier's body to NW",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/GD: Thiollier's Trousers - on Thiollier's body to NW",
      { groups: ["DLC"], isMissable: true, region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Dane's Footwork - on Dane's body after npc boss",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    ["EI/CCA: Leda's Sword - npc boss drop", { groups: ["DLC"], region: "Enir-Ilim" }],
    [
      "EI/DGFS: Remembrance of a God and a Lord - mainboss drop",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    ["EI/OW: Somber Smithing Stone [9] - by grace", { groups: ["DLC"], region: "Enir-Ilim" }],
    ["EI/FR: Messmerfire Grease - to SE on stairs", { groups: ["DLC"], region: "Enir-Ilim" }],
    [
      "EI/FR: Somber Smithing Stone [8] - upstairs outside on stairs",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    ["EI/FR: Broken Rune - outside to SW, on right", { groups: ["DLC"], region: "Enir-Ilim" }],
    [
      "EI/FR: Rune Arc - outside to SW, through right room out backdoor, up on altar",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Budding Horn x4 - outside to SW, across broken bridge, middle of enemy group",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Lightningproof Pickled Liver x2 - outside to SW, across broken bridge, to left in left corner",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Thin Beast Bones x8 - outside to SW, drop off broken bridge, to left, right of tree",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Whiteflesh Mushroom x3 - outside to SW, drop off broken bridge, to left, left of tree",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Redflesh Mushroom x4 - outside to SW, drop off broken bridge, to left on left root",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Revered Spirit Ash x2 - outside to SW, drop off broken bridge, to right on statue",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Furlcalling Finger Remedy x3 - outside to SW, drop from second level to E tree",
      { groups: ["DLC", "Hidden"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Spira - outside to SW, drop from second level to E tree, on platform to N",
      { groups: ["DLC", "Out of the Way"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Dragonbolt Grease - outside to SW, bottom of stairscase on second level",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Inquisitor Ashes - outside to SE downstairs, down left of gazebo underneath",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Drawstring Golden Grease - outside to SE downstairs on right of gazebo",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    ["EI/SR: Fire Arrow x10 - outside to SE down stairs", { groups: ["DLC"], region: "Enir-Ilim" }],
    [
      "EI/SR: Golden Bolt x10 - outside to SE top of stairs",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    ["EI/SR: Scadutree Fragment - by cross", { groups: ["DLC"], region: "Enir-Ilim" }],
    [
      "EI/SR: Smithing Stone [8] x5 - up outside, on right roof",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Revered Spirit Ash - up outside, after first rooftops, in left building on statue",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Silver Horn Tender - up outside, after first rooftops, drop off stairs, bottom of stairs",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Horned Warrior Ashes - up outside, after first rooftops, drop off stairs, up in room on left",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Neutralizing Boluses x2 - up outside, after first rooftops, drop off stairs, up in room by back wall",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Stanching Boluses - up outside, after first rooftops, drop off stairs, up in room on right",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Golden Horn Tender - up outside, after first rooftops, drop off stairs, up ladder on ledge outside",
      { groups: ["DLC", "Out of the Way"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Scadutree Fragment - up outside, behind at start of second rooftops",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Sunwarmth Stone x2 - up outside, NE corner of second rooftops",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Somber Smithing Stone [7] - up outside, after second rooftops, downstairs",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Gravebird Helm - up outside, after second rooftops, down elevator and drop halfway",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Somber Ancient Dragon Smithing Stone - up outside, after second rooftops, down elevator, outside to NE bottom of stairs",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    ["EI/CCA: Scadutree Fragment - by altar", { groups: ["DLC"], region: "Enir-Ilim" }],
    [
      "EI/SR: Fireproof Pickled Liver x2 - outside to SE downstairs, drop down from gazebo, on stairs",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Holyproof Pickled Liver - outside to SE downstairs, drop down from gazebo, drop twice, at far end",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Smithing Stone [8] x3 - outside to SE downstairs, drop down from gazebo, drop 3 times, behind",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Lordsworn's Bolt x10 - outside to SE downstairs, drop down from gazebo, after drop to spiral walkway, to right",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Somber Smithing Stone [8] - outside to SE downstairs, drop down from gazebo, after drop to spiral walkway, in gazebo below",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/SR: Fireproof Pickled Liver - outside to SE downstairs, drop down from gazebo, right before the window jump",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "BTS|EI/SR: Euporia - outside to SE downstairs, drop down from gazebo, after jump to window, continue down and down",
      { groups: ["DLC", "Out of the Way"], region: "Enir-Ilim" },
    ],
    [
      "BTS|EI/SR: Scadutree Fragment - outside to SE downstairs, drop down from gazebo, after jump to window, by statue",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/FR: Revered Spirit Ash - enemy drop outside to SW, across broken bridge, by left fountain",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/GD: Circlet of Light - interact with memory after mainboss",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "EI/CCA: Horned Warrior's Greatsword - enemy drop to N",
      { groups: ["DLC"], region: "Enir-Ilim" },
    ],
    [
      "SK/SC: Battlefield Priest's Cookbook [1] - in right wing of church above on balcony",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Somber Smithing Stone [9] - to W inside tower",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Well-Pickled Turtle Neck - to NW in corner",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Crab Eggs x2 - far to E",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Ghost Glovewort [7] - just outside to E",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Somber Smithing Stone [7] - by big tree front of church",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Shadow Realm Rune [5] - middle of lower rectangle roof to NE",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Kukri x6 - upper N courtyard, in building on right",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Smithing Stone [8] x5 - upper N courtyard, in building on left",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Crab Eggs x2 - upper N courtyard, between arches",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Shadow Sunflower x3 - in S corner of church",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Fire Knight's Seal - behind statue in church",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Rada Fruit x4 - upper N courtyard, SW side",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: String x6 - upper N courtyard, middle",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/TWS: Iris of Grace - to S by statue",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/TWS: Marika's Rune - by grace",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Mantle of Thorns - enemy drop by big tree front of church",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Iris of Occultation - enemy drop in upper N courtyard",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/SC: Death Mask Helm - enemy drop in front of statue in church",
      { groups: ["DLC"], region: "Shadow Keep, Church District Lower" },
    ],
    [
      "SK/MGP: Leda's Rune - on Leda's body after invading her alongside Hornsent",
      { groups: ["DLC"], isMissable: true, region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Ash of War: Swift Slash - on Leda's body after invading her alongside Hornsent",
      { groups: ["DLC"], isMissable: true, region: "Shadow Keep" },
    ],
    ["SK/SKMG: Scadutree Fragment x2 - boss drop", { groups: ["DLC"], region: "Shadow Keep" }],
    [
      'SK/MGP: "Domain of Dragons" Painting - painting to SE, to right at top of stairs, down ladder, under waterfall',
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Festive Grease - to NW after first stairs",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Smithing Stone [7] x3 - to NW, to right halfway up wooden stairs",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Main-gauche - to NW, to right halfway up wooden stairs, in next room",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Redflesh Mushroom x7 - to NW, on left landing up wooden stairs",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Golden Vow - to NW, on ledge in dining room",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Shadow Realm Rune [6] - to NW, upper part of dining room",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Smithing Stone [8] x3 -  to NW, drop down left after dining room",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Talisman of Lord's Bestowal - to NW, to right halfway up wooden stairs, out window by tree",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Smithing Stone [8] x2 - to NW, to right halfway up wooden stairs, out window, in room back right corner",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Golden Vow x3 - to NW, to right halfway up wooden stairs, out window to left in dead-end",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Smithing Stone [8] x2 - to NW, to right halfway up wooden stairs, out window in room to left behind weapon rack",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Holyproof Pickled Liver -  to NW, left after dining room",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Messmerfire Grease - to SE, to left at top of stairs",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Drawstring Golden Grease - to SE, lower stairs",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Smithing Stone [8] x3 - to SE, to right at top of stairs, by back wall",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Somber Smithing Stone [8] - to SE, to right at top of stairs, down ladder, to NW under bridge",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Bone Dart x8 - to SE, on path to storehouse",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Smithing Stone [7] x2 - to SE, on path to storehouse",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Silver-Pickled Fowl Foot - to SE, to right at top of stairs, by ladder",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/MGP: Rada Fruit - to SE, to right at top of stairs, by flaming boat",
      { groups: ["DLC"], region: "Shadow Keep" },
    ],
    [
      "SK/CDE: Fire Knight Queelign - on Queelign, give Iris of Grace, in room with door",
      { groups: ["DLC"], isMissable: true, region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Queelign's Greatsword - on Queelign, give Iris of Occultation, in room with door",
      { groups: ["DLC"], isMissable: true, region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Thin Beast Bones x4 - down back right of first roof",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Strip of White Flesh x2 - down left side of first roof",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Great Grave Glovewort - to SW across floating logs",
      { groups: ["DLC"], isMissable: true, region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Fireproof Pickled Liver - to NW after first roof by wall",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Ember of Messmer x3 - to NW backside of second roof",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Slumbering Egg - to NW left side of second roof behind spire",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Stormhawk Feather x3 - on upper arches in main church building",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Lightningproof Pickled Liver - just below hole after dropping into church",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Rune of an Unsung Hero - after dropping into church, to NW in left room",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Ember of Messmer x2 - in curved corridor near statue",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Scadutree Fragment - on the statue hand in church",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Hefty Beast Bone x3 - in dead-end near water lever",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "SK/CDE: Crab Eggs x2 - down right on first roof",
      { groups: ["DLC"], region: "Shadow Keep, Church District" },
    ],
    [
      "GP/(EH): Fort of Reprimand Spiritspring Stone - stone to NW",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/TPC: Cross Map - given by Hornsent at TPC or HC",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/TPC: Furnace Visage x3 - given by Hornsent after giving Scorpion Stew",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PT: Ghost Glovewort [5] - W of PT, in front of gravestone",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PT: Silver Horn Tender - enemy drop W of PT, near graves",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PT: Scadutree Fragment - enemy drop W of PT, near graves",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PT: Forager Brood Cookbook [2] - given by friendly Kindred of Rot E of PT",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Verdigris Greatshield - on Moore's body",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Verdigris Helm - on Moore's body",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Verdigris Armor - on Moore's body",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Verdigris Gauntlets - on Moore's body",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Verdigris Greaves - on Moore's body",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PT: Black Pyrefly x3 - given by friendly Kindred of Rot E of PT",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/(PT): Beast Blood x2 - in building with pots, past first stairs",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(PT): Whiteflesh Mushroom x3 - in front of fallen pillar, past second stairs",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(PT): Sanguine Amaryllis x2 - under balcony on upper level",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(PT): Somber Smithing Stone [6] - upper level, hanging from broken stairs to N",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PT: Smithing Stone [5] x4 - E of PT, at small ruined camp",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PT: Sacred Bloody Flesh x2 - E of PT, at small ruined camp",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PT: Great Arrow x10 - E of PT, at small ruined camp",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CRT: Revered Spirit Ash - to SE, overlooking WNM",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PT: String-Seller's Bell Bearing - W of PT, shoot down pot in ravine",
      { groups: ["DLC", "Hidden", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(PT): Outer God Heirloom - in chest top of PT, inside shrine",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PT: Larval Tear - blue graves E of PT, near kindred npc",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(PT): Bloodfiend's Arm - enemy drop upper level",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Deadly Poison Perfume Bottle - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Poison Grease x5 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Drawstring Poison Grease x5 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Poisonbone Dart x20 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Poisoned Stone x10 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Poisoned Stone Clump x5 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Miranda Powder x10 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Poisonbloom x10 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Trina's Lily x3 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Altus Bloom x20 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Toxic Mushroom x10 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Toxic Mossling x5 - Thiollier / Moore Shop",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Rune Arc x3 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Spellproof Pickled Liver x2 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Fireproof Pickled Liver x2 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Lightningproof Pickled Liver x2 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Holyproof Pickled Liver x2 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Well-Pickled Turtle Neck - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Note: Sealed Spiritsprings - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Rada Fruit x10 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Redflesh Mushroom x8 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Whiteflesh Mushroom x6 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Knot Resin x5 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Black Pyrefly x8 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Sanguine Amaryllis x4 - Moore Shop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Forager Brood Cookbook [7] - given by Moore after healing kindred npc, so long as moore is happy",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Black Syrup - given by Moore after speaking with Thiollier",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Smithing Stone [5] x4 - to SE, on cliffroad to CRT",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/MGC: Scadutree Fragment - by cross",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Thiollier's Concoction - talk to Thiollier after giving him Black Syrup",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/BG: Serpent Crest Shield - painting reward SE of BG",
      { groups: ["DLC", "Post Leyndell"], isMissable: true, region: "Gravesite Plain" },
    ],
    [
      "GP/BG: Shadow Realm Rune [1] - S of BG, in front of arch",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/GN: Ash of War: Savage Lion's Claw - to SW, in makeshift campsite",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/BG: Dragon Heart - boss drop E of BG",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/BG: Somber Ancient Dragon Smithing Stone - boss drop E of BG",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/GN: Whiteflesh Mushroom x3 - to NW, N of lake",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/BG: Great Katana - E of BG, in middle of lake",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/BG: Gravebird Armor - NW of BG, in front of arch",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/AS: Greater Potentate's Cookbook [5] - NW of AS, on W cliffside",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      'GP/(AS): "Incursion" Painting - painting',
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CB: Pata - NE of CB, overlooking drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CB: Oathseeker Knight Helm - NE of CB, overlooking drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CB: Oathseeker Knight Armor - NE of CB, overlooking drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CB: Oathseeker Knight Gauntlets - NE of CB, overlooking drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CB: Oathseeker Knight Greaves - NE of CB, overlooking drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(CB): Blessed Blue Dew Talisman - in front of statue",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(WNM): Greatsword of Solitude - boss drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(WNM): Helm of Solitude - boss drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(WNM): Armor of Solitude - boss drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(WNM): Gauntlets of Solitude - boss drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(WNM): Greaves of Solitude - boss drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SR: Deflecting Hardtear - furnace golem N of SR",
      { groups: ["DLC", "Furnace Golem", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/TPC: Scadutree Fragment - by cross",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SR: Furnace Visage - furnace golem N of SR",
      { groups: ["DLC", "Furnace Golem", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(RDTR): Greater Potentate's Cookbook [2] - on corpse",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(EG): Ballista Bolt x5 - middle of EG",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(EG): Lost Ashes of War - middle of EG",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(EG): Shadow Realm Rune [1] - near ballista, overlooking SE",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(RDTR): Furnace Visage - on corpse 1",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(RDTR): Furnace Visage - on corpse 2",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(AAV): Greater Potentate's Cookbook [10] - in NW isolated shack",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(AAV): Broken Rune - in second left shack",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(AAV): Human Bone Shard - on upper E ledge",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(AAV): Fly Mold x3 - on lower ledge overlooking NW isolated shack",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(AAV): Ailment Talisman - upper level of village on platform",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(AAV): Black Pyrefly x2 - on lower E ledge",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(AAV): Revered Spirit Ash - on statue NE of village",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/GN: Larval Tear - blue graves to E",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CC: Glass Shard - S of CC, near carts",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CC: Black Pyrefly - S of CC, near carts",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CC: Arrow x10 - S of CC, near carts",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/GP: Lump of Flesh x2 - to SE, behind arch overlooking cliff",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SR: Larval Tear - blue graves SE of SR, overlooking CC",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/GP: Beast Claw - hostile npc drop to SE",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SR: Map: Gravesite Plain - map pillar S of SR",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(SR): Hefty Cracked Pot - E side of SR, ground level",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(SR): Greater Potentate's Cookbook [1] - E side of SR, up stairs",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PPW: Herbalist's Bell Bearing - hanging pot down SW path on right cliff where you get invaded",
      { groups: ["DLC", "Hidden", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(SR): Black Pyrefly x3 - overlooking road, second floor, drop down from top",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(SR): Shadow Realm Rune [2] - W side of SR, first floor, behind pots",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(SR): Furlcalling Finger Remedy x2 - W side of SR, go up stairs, on roof to S",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(SR): Redflesh Mushroom x5 - E side of SR, second story, corpse on balcony",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SR: Black Pyrefly x3 - NE of SR",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SR: Revered Spirit Ash - E of SR, overlooking CC",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(SR): Blade of Mercy - in chest behind door atop SR",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SR: Silver Horn Tender - enemy drop NE of SR, near graves",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SR: Scadutree Fragment - enemy drop NE of SR, near graves",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      'GP/SR: "The Sacred Tower" Painting - painting to NE in cave',
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/TPC: Grave Glovewort [5] - to E by grave",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SR: Backhand Blade - N of SR, in tomb near spiral pillars",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Grave Glovewort [5] - up E path, NE of left camp on ledge",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Spread Crossbow - down E path, in SW corner of lower camp by tent",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Smithing Stone [6] x3 - down E path, in SW corner of lower camp, behind tent on hidden cliff",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Swift Spear - up E path, by left camp",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Fire Knight's Cookbook [2] - in tent in W camp",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Spelldrake Talisman +3 - in room under CE, down path under bridge",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Scadutree Fragment - to S, in front of statue",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Firespark Perfume Bottle - in chest in S camp",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Black Pyrefly x5 - down NW path, in tent under FRF bridge",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Smithing Stone [7] x3 - down NW path, up on left cliff under FRF bridge",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Messmerfire Grease - down NW path, up on left cliff under FRF bridge",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CC: Fire Coil x2 - E of CC, in camp",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CC: Blessing of Marika - NW of CC, inside small cave",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SP: Smithing Stone [6] x4 - in camp S of SP",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(CC): Scadutree Fragment x2 - front of marika statue",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(SP): Ancient Dragon Smithing Stone - in chest top of pillar",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(CC): Black Steel Greathammer - enemy drop",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Festive Grease - to E in lower swamp area, upper S swamp in far S corner",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PPW: Gravebird Bracelets - to S up stairs on left",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/SP: Larval Tear - blue graves NE of SP",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Deep-Purple Lily - to E in lower swamp area, W of water in cave",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Toxic Mossling x8 - to E in lower swamp area, in upper S swamp under PPC grace",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Shadow Realm Rune [1] - up E path, NE of left camp, near bottom of drop down path",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Grave Glovewort [6] - up E path, by big right grave",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/PPC: Scadutree Fragment - by cross",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/(EH): Talisman of the Dread - in hovel",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "GP/CF: Greater Potentate's Cookbook [7] - to E in lower swamp area, in last poison swamp before sealed spiritspring",
      { groups: ["DLC", "Post Leyndell"], region: "Gravesite Plain" },
    ],
    [
      "ScV/SKBG: Remembrance of the Wild Boar Rider - mainboss drop",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SBS: Somber Smithing Stone [9] - to NE by elevator",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SBS: Glintslab Firefly x3 - to NW by left wall",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SBS: Carian Thrusting Shield - to NW by back wall",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SBS: Fire Coil x3 - upper back section, up stairs, to SW",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SBS: Ghost Glovewort [7] - upper back section, up stairs, on left",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SBS: Fire Serpent - upper back section, up stairs, by N balcony",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SL: Shadow Sunflower x6 - outside to left on lower scaffolding",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SL: Blessed Bone Shard - outside to left in corner",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SL: Thin Beast Bones x7 - lower NW rafters, left side",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SL: Smithing Stone [8] x4 - upper SW rafters",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SL: Somber Smithing Stone [8] - lower N rafters",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    ["SK/SL: Wrath from Afar - SE cog", { groups: ["DLC"], region: "Shadow Keep Storehouse Back" }],
    [
      "SK/SL: Rune of an Unsung Hero - down NE elevator",
      { groups: ["DLC"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SL: Fire Knight Hilde - upper NE rafters, above elevator",
      { groups: ["DLC", "Out of the Way"], region: "Shadow Keep Storehouse Back" },
    ],
    [
      "SK/SFF: Hefty Cracked Pot - to NW down elevator, on bed",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/SFF: Battlefield Priest's Cookbook [4] - to NW down elevator, behind illusory wall next to stairs",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/SFF: Gold-Pickled Fowl Foot - to NW down elevator, to W in dead-end",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/SFF: Ash of War: Wall of Sparks - to NW down elevator, on balcony",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/SFF: Iris of Grace - to NW down elevator, by altar",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/SFF: Innard Meat - to NW down elevator, down stairs on right",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Smithing Stone [7] x3 1 - to W, on bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Beast Liver x3 - to W, on bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Beast Blood x3 - to W, on bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Smithing Stone [7] x3 2 - to W, on bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Redflesh Mushroom x5 - to W, on bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Thin Beast Bones x8 - to W, on bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Somber Smithing Stone [6] - to W, on bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Somber Smithing Stone [9] - to W, end of bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/SFF: Raw Meat Dumpling - enemy drop to NW down elevator, to W in dead-end",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/SFF: Living Jar Shard - enemy drop to NW down elevator, to W in dead-end",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Salza's Hood - enemy drop to W end of bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SK/WR: Rain of Fire - enemy drop to W end of bridge",
      { groups: ["DLC"], region: "Shadow Keep, West Rampart" },
    ],
    [
      "SCF/GDP: St. Trina Disciple's Cookbook [3] - right of St. Trina",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/GDP: St. Trina's Smile - Thiollier invader drop, after you die to St. Trina four times and tell him your findings",
      { groups: ["DLC"], isMissable: true, region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/GDP: St. Trina's Blossom - on St. Trina's body after EI mainboss",
      { groups: ["DLC"], isMissable: true, region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FD: Remembrance of Putrescence - mainboss drop",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    ["SCF/FC: Scadutree Fragment - by cross", { groups: ["DLC"], region: "Stone Coffin Fissure" }],
    [
      "SCF/SCF: Congealed Putrescence x5 - to S up right path on ledge",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/SCF: St. Trina's Arrow x10 - to SE after boat",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FC: Deep-Purple Lily x2 - to W on lower right cliff",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    ["SCF/FC: Shadow Realm Rune [3] - to SW", { groups: ["DLC"], region: "Stone Coffin Fissure" }],
    [
      "SCF/FC: Grave Glovewort [8] - far to N on top of left boat",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FC: Velvet Sword of St. Trina - to NW down boats, to E in cave",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FC: Grave Glovewort [8] - to N down right path at lower boat",
      { groups: ["DLC", "Hidden"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FC: Grave Glovewort [5] - to N on top of left boat",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FC: Smithing Stone [6] x3 - to N between upper 2 boats",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FW: Grave Glovewort [7] - to S on left boat",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FW: Mass of Putrescence - to NE down lower path, bottom of rock",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FW: Congealed Putrescence x2 -  to NE down lower path, up on cliff to N",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    ["SCF/FW: Dewgem x3 - to NE up in cave", { groups: ["DLC"], region: "Stone Coffin Fissure" }],
    [
      "SCF/FC: Grave Glovewort [7] - to NW down boats, to E in boat on left",
      { groups: ["DLC", "Hidden"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FW: Multilayered Ring of Light - enemy drop to NE up through cave out to SE",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FW: Smithing Stone [8] x7 - enemy drop to NE up in cave",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "SCF/FW: Congealed Putrescence x5 - enemy drop to NE up in cave",
      { groups: ["DLC"], region: "Stone Coffin Fissure" },
    ],
    [
      "FRM: Remembrance of the Mother of Fingers - mainboss drop",
      { groups: ["DLC"], region: "Finger Ruins of Miyr" },
    ],
    [
      "SA/(CMM): Maternal Staff - kill invader Ymir",
      { groups: ["DLC"], region: "Finger Ruins of Miyr" },
    ],
    [
      "SA/(CMM): High Priest Hat - kill invader Ymir",
      { groups: ["DLC"], region: "Finger Ruins of Miyr" },
    ],
    [
      "SA/(CMM): High Priest Robe - kill invader Ymir",
      { groups: ["DLC"], region: "Finger Ruins of Miyr" },
    ],
    [
      "SA/(CMM): High Priest Gloves - kill invader Ymir",
      { groups: ["DLC"], region: "Finger Ruins of Miyr" },
    ],
    [
      "SA/(CMM): High Priest Undergarments - kill invader Ymir",
      { groups: ["DLC"], region: "Finger Ruins of Miyr" },
    ],
    [
      "MM/ML: Mad Craftsman's Cookbook [3] - to E, corpse in room only accessible by jumping from rafters",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/SFC: Remembrance of the Lord of Frenzied Flame - mainboss drop",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/MH: Swollen Grape - to N, room immediately to right when entering manse",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/MH: Torn Diary Page - to E, room on left after fake wall painting",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/MH: Swollen Grape x2 - to E, room on left after fake wall painting, up bookshelves",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/MH: Thin Beast Bones x4 - to SE, corpse in front of fireplace in dining room",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/MH: Shadow Realm Rune [6] - to SE, rafters after taking hidden ladder",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/ML: Surging Frenzied Flame x3 - to SE, corpse on balcony overlooking dining room",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/ML: Golden Horn Tender x2 - to W, central pillar of library",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/ML: Shadow Realm Rune [7] - to W, pillar W of central pillar",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    ["MM/ML: Swollen Grape x2 - W wall of library", { groups: ["DLC"], region: "Midra's Manse" }],
    [
      "MM/ML: Nanaya's Torch - to W, corpse sitting in chair only accessible after pulling lever behind second fake painting",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/SFC: Revered Spirit Ash - chandelier directly N",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "MM/SFC: Revered Spirit Ash - enemy drop to W, in library by S wall",
      { groups: ["DLC"], region: "Midra's Manse" },
    ],
    [
      "WP/(TCC): Nomadic Warrior's Cookbook [9] - behind imp statue",
      { groups: ["Dungeon"], region: "Tombsward Catacombs" },
    ],
    [
      "WP/(TCC): Lhutel the Headless - boss drop",
      { groups: ["Dungeon"], region: "Tombsward Catacombs" },
    ],
    [
      "WP/(TCC): Human Bone Shard x5 - in path of fire spitter",
      { groups: ["Dungeon"], region: "Tombsward Catacombs" },
    ],
    [
      "WP/(TCC): Golden Rune [2] -  above fire spitter",
      { groups: ["Dungeon"], region: "Tombsward Catacombs" },
    ],
    [
      'WP/(TCC): Prattling Pate "Thank you" - room past fire spitter',
      { groups: ["Dungeon"], region: "Tombsward Catacombs" },
    ],
    [
      "WP/(IC): Demi-Human Ashes - boss drop",
      { groups: ["Dungeon"], region: "Impaler's Catacombs" },
    ],
    [
      "WP/(IC): Root Resin x3 - back SW of sewer area",
      { groups: ["Dungeon"], region: "Impaler's Catacombs" },
    ],
    [
      'WP/(IC): Prattling Pate "Please help" - start of sewer area',
      { groups: ["Dungeon"], region: "Impaler's Catacombs" },
    ],
    [
      "LG/(SC): Noble Sorcerer Ashes - boss drop",
      { groups: ["Dungeon"], region: "Stormfoot Catacombs" },
    ],
    ["LG/(SC): Root Resin x2 - first room", { groups: ["Dungeon"], region: "Stormfoot Catacombs" }],
    [
      "LG/(SC): Smoldering Butterfly x3 - behind second fire spitter",
      { groups: ["Dungeon"], region: "Stormfoot Catacombs" },
    ],
    [
      "LG/(SC): Wandering Noble Ashes - room at end of hall after latter",
      { groups: ["Dungeon"], region: "Stormfoot Catacombs" },
    ],
    [
      'LG/(SC): Prattling Pate "Hello" - behind first fire spitter',
      { groups: ["Dungeon"], region: "Stormfoot Catacombs" },
    ],
    [
      "LL/(REC): Glintstone Sorcerer Ashes - boss drop",
      { groups: ["Dungeon"], region: "Road's End Catacombs" },
    ],
    [
      "LL/(REC): Root Resin x3 - on path towards boss room",
      { groups: ["Dungeon"], region: "Road's End Catacombs" },
    ],
    [
      "LL/(REC): Raya Lucaria Soldier Ashes - in chest in hidden dead-end room",
      { groups: ["Dungeon"], region: "Road's End Catacombs" },
    ],
    [
      "LL/(REC): Human Bone Shard x5 - under second platform",
      { groups: ["Dungeon"], region: "Road's End Catacombs" },
    ],
    [
      "LL/(REC): Rune Arc - in illusory room under lever",
      { groups: ["Dungeon"], region: "Road's End Catacombs" },
    ],
    [
      "LL/(REC): Watchdog's Staff - under second platform",
      { groups: ["Dungeon"], region: "Road's End Catacombs" },
    ],
    [
      "LG/(MCC): Banished Knight Engvall - boss drop",
      { groups: ["Dungeon"], region: "Murkwater Catacombs" },
    ],
    ["LG/(MCC): Root Resin x5 - by lever", { groups: ["Dungeon"], region: "Murkwater Catacombs" }],
    [
      "LL/(BKC): Twinsage Sorcerer Ashes - boss drop",
      { groups: ["Dungeon"], region: "Black Knife Catacombs" },
    ],
    [
      "LL/(BKC): Assassin's Cerulean Dagger - alt boss drop",
      { groups: ["Dungeon"], region: "Black Knife Catacombs" },
    ],
    [
      "LL/(BKC): Black Knifeprint - alt boss drop",
      { groups: ["Dungeon"], region: "Black Knife Catacombs" },
    ],
    [
      "LL/(BKC): Rosus' Axe - behind imp statue near boss door",
      { groups: ["Dungeon"], region: "Black Knife Catacombs" },
    ],
    [
      "LL/(BKC): Rune Arc - W side of water area",
      { groups: ["Dungeon"], region: "Black Knife Catacombs" },
    ],
    [
      "LL/(BKC): Deathroot - in chest after boss",
      { groups: ["Dungeon"], region: "Black Knife Catacombs" },
    ],
    [
      "LL/(BKC): Spellproof Dried Liver - in middle of cleaver room",
      { groups: ["Dungeon"], region: "Black Knife Catacombs" },
    ],
    [
      "LL/(CC): Kaiden Sellsword Ashes - boss drop",
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      "LL/(CC): Root Resin x5 - W from first elevator",
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      "LL/(CC): Nox Mirrorhelm - behind imp statue, in SW corner",
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      "LL/(CC): Golden Rune [3] - dead-end at top of main room",
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      "LL/(CC): Page Ashes - on alter S of lever",
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      "LL/(CC): Rune Arc - understairs next to imp statue, in SW corner",
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      "LL/(CC): Old Fang x3 - next to lever",
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      "LL/(CC): Hefty Beast Bone x3 - bottom of main room, S side",
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      "LL/(CC): Scythe - dead-end room at top of main room",
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      'LL/(CC): Prattling Pate "Wonderful" - bottom of main room, N side',
      { groups: ["Dungeon"], region: "Cliffbottom Catacombs" },
    ],
    [
      "AP/(WC): Ancient Dragon Apostle's Cookbook [1] - path under huge crusher",
      { groups: ["Dungeon"], region: "Wyndham Catacombs" },
    ],
    [
      "AP/(WC): Glovewort Picker's Bell Bearing [1] - boss drop",
      { groups: ["Dungeon"], region: "Wyndham Catacombs" },
    ],
    [
      "AP/(WC): Golden Rune [5] - path under huge crusher",
      { groups: ["Dungeon"], region: "Wyndham Catacombs" },
    ],
    [
      "AP/(WC): Magic Grease x2 - path under huge crusher",
      { groups: ["Dungeon"], region: "Wyndham Catacombs" },
    ],
    [
      "AP/(WC): Lightning Scorpion Charm - behind imp statue",
      { groups: ["Dungeon"], region: "Wyndham Catacombs" },
    ],
    [
      "AP/(SHG): Ancient Dragon Knight Kristoff - boss drop",
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      "AP/(SHG): Crimson Seed Talisman - behind imp statue",
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      "AP/(SHG): Leyndell Soldier Ashes - behind breakable floor",
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      "AP/(SHG): Dragoncrest Shield Talisman +1 - ride up first cleaver, behind imp statue",
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      "AP/(SHG): Root Resin x3 - after ladder drop down on bridge",
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      'AP/(SHG): Prattling Pate "Let\'s get to it" - big dead-end room after bridge',
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      "AP/(SHG): Human Bone Shard x5 - after ladder drop down",
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      "AP/(SHG): Ghost Glovewort [4] - enemy drop after ladder drop down, only after boss door is open",
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      "AP/(SHG): Ghost Glovewort [4] - enemy drop left path under stairs",
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      "AP/(SHG): Ghost Glovewort [4] - enemy drop after ladder drop down",
      { groups: ["Dungeon"], region: "Sainted Hero's Grave" },
    ],
    [
      "MtG/(GHG): Bloodhound Knight Floh - boss drop",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Deathroot - chest after boss",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Ringed Finger - chest bottom of first chariot ramp",
      { groups: ["Out of the Way", "Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Golden Rune [6] - dead-end S of fire spitter",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Smoldering Butterfly x6 - drop down to ledge second chariot ramp",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Stonesword Key - top of second chariot ramp",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Gelmir Knight Helm - after drop down second chariot ramp by coffin",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Gelmir Knight Armor - after drop down second chariot ramp by coffin",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Gelmir Knight Gauntlets - after drop down second chariot ramp by coffin",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Gelmir Knight Greaves - after drop down second chariot ramp by coffin",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Root Resin x5 - after drop down second chariot ramp, behind some pots of ladder",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Beast Blood x3 - by ladder after chariot ride",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Mantis Blade - enemy drop before lava section of second chariot ramp",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Bloodhound Knight Helm - enemy drop after drop down second chariot ramp",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Bloodhound Knight Armor - enemy drop after drop down second chariot ramp",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Bloodhound Knight Gauntlets - enemy drop after drop down second chariot ramp",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "MtG/(GHG): Bloodhound Knight Greaves - enemy drop after drop down second chariot ramp",
      { groups: ["Dungeon"], region: "Gelmir Hero's Grave" },
    ],
    [
      "CO/(AHG): Ordovis's Greatsword - boss drop",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Crucible Axe Helm - boss drop",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Crucible Axe Armor - boss drop",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Crucible Gauntlets - boss drop",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Crucible Greaves - boss drop",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Holy Grease x2 - on beams bottom of big ramp",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Fan Daggers x5 - by small bridge first ramp",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Golden Rune [7] - bottom of big ramp",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Crucible Feather Talisman - bottom of ramp after beam parkour, E dead-end",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Golden Epitaph - behind imp statue",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Great Dragonfly Head x3 - after you raise the light to destroy the chariots",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Stonesword Key - middle of big ramp",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Vulgar Militia Ashes - down dead-end N end of beams bottom of big ramp",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Tree Sentinel Helm - destroy chariots",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Tree Sentinel Armor - destroy chariots",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Tree Sentinel Gauntlets - destroy chariots",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Tree Sentinel Greaves - destroy chariots",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "CO/(AHG): Ash of War: Holy Ground - destroy chariots",
      { groups: ["Dungeon"], region: "Auriza Hero's Grave" },
    ],
    [
      "LG/(DC): Assassin's Crimson Dagger - boss drop",
      { groups: ["Dungeon"], region: "Deathtouched Catacombs" },
    ],
    ["LG/(DC): Deathroot - boss chest", { groups: ["Dungeon"], region: "Deathtouched Catacombs" }],
    ["LG/(DC): Bloodrose x3 - by lever", { groups: ["Dungeon"], region: "Deathtouched Catacombs" }],
    [
      "LG/(DC): Uchigatana - down small tunnel on ledge",
      { groups: ["Dungeon"], region: "Deathtouched Catacombs" },
    ],
    [
      "AP/(UC): Perfumer Tricia - boss drop",
      { groups: ["Dungeon"], region: "Unsightly Catacombs" },
    ],
    [
      "AP/(UC): Winged Misbegotten Ashes - main path, in corner staircase pit",
      { groups: ["Dungeon"], region: "Unsightly Catacombs" },
    ],
    [
      "AP/(UC): Rune Arc - left of the lever",
      { groups: ["Dungeon"], region: "Unsightly Catacombs" },
    ],
    [
      'AP/(UC): Prattling Pate "Apologies" - across from the lever',
      { groups: ["Dungeon"], region: "Unsightly Catacombs" },
    ],
    [
      "CO/(AST): Cracked Pot - illusory wall chest, normal chest, in sewer area, left item",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Cracked Pot - illusory wall chest, normal chest, in sewer area, right item",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Cracked Pot - sewer room after second trap chest, left item",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Cracked Pot - sewer room after second trap chest, right item",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Ritual Pot - illusory wall chest x2 then up ladder, follow to dead-end",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      'CO/(AST): Ritual Pot - after illusory wall chest, head N from place lever "would" be',
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Perfumer's Cookbook [3] - sewer room after second trap chest",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Soldjars of Fortune Ashes - boss drop",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Golden Rune [7] - after illusory wall chest",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Smithing Stone [5] - illusory wall chest x2 then up ladder, follow to dead-end",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      'CO/(AST): Root Resin x2 - after illusory wall chest, head N from place lever "would" be',
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Raw Meat Dumpling - enemy drop 1 sewer room after second trap chest",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Living Jar Shard - enemy drop 1 sewer room after second trap chest",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Raw Meat Dumpling - enemy drop 2 sewer room after second trap chest",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Living Jar Shard - enemy drop 2 sewer room after second trap chest",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      'CO/(AST): Raw Meat Dumpling - enemy drop after illusory wall chest, head N from place lever "would" be',
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      'CO/(AST): Living Jar Shard - enemy drop after illusory wall chest, head N from place lever "would" be',
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Raw Meat Dumpling - enemy drop illusory wall chest x2 then up ladder, follow to dead-end",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CO/(AST): Living Jar Shard - enemy drop illusory wall chest x2 then up ladder, follow to dead-end",
      { groups: ["Dungeon"], region: "Auriza Side Tomb" },
    ],
    [
      "CL/(MEC): Mad Pumpkin Head Ashes - boss drop",
      { groups: ["Dungeon"], region: "Minor Erdtree Catacombs" },
    ],
    [
      "CL/(MEC): Imp Head (Wolf) - under elevator, right exit from rot room, up ladder, at end",
      { groups: ["Dungeon"], region: "Minor Erdtree Catacombs" },
    ],
    [
      "CL/(MEC): Grave Violet x3 - under elevator, in rot room",
      { groups: ["Dungeon"], region: "Minor Erdtree Catacombs" },
    ],
    [
      "CL/(MEC): Sacramental Bud x2 - upper rot room behind elevator, take long way",
      { groups: ["Dungeon"], region: "Minor Erdtree Catacombs" },
    ],
    [
      "CL/(MEC): Aeonian Butterfly - rot room behind elevator",
      { groups: ["Dungeon"], region: "Minor Erdtree Catacombs" },
    ],
    [
      "CL/(MEC): Golden Rune [4] - under elevator, right exit from rot room, at end",
      { groups: ["Dungeon"], region: "Minor Erdtree Catacombs" },
    ],
    [
      "CL/(CCC): Kindred of Rot Ashes - boss drop",
      { groups: ["Dungeon"], region: "Caelid Catacombs" },
    ],
    [
      "CL/(CCC): Miranda Sprout Ashes - illusory wall under stairs",
      { groups: ["Dungeon"], region: "Caelid Catacombs" },
    ],
    ["CL/(WDC): Golden Seed - boss drop", { groups: ["Dungeon"], region: "War-Dead Catacombs" }],
    [
      "CL/(WDC): Redmane Knight Ogha - boss drop",
      { groups: ["Dungeon"], region: "War-Dead Catacombs" },
    ],
    [
      "CL/(WDC): Golden Rune [6] - lower fight room NE from middle",
      { groups: ["Dungeon"], region: "War-Dead Catacombs" },
    ],
    [
      "CL/(WDC): Magic Grease x3 - middle of fight room",
      { groups: ["Dungeon"], region: "War-Dead Catacombs" },
    ],
    [
      "CL/(WDC): Radahn Soldier Ashes - small rot room near lever",
      { groups: ["Dungeon"], region: "War-Dead Catacombs" },
    ],
    [
      "CL/(WDC): Silver-Pickled Fowl Foot - lower fight room SE side",
      { groups: ["Dungeon"], region: "War-Dead Catacombs" },
    ],
    [
      "CL/(WDC): Collapsing Stars - lower fight room W side",
      { groups: ["Dungeon"], region: "War-Dead Catacombs" },
    ],
    [
      "FP/(GCHG): Zamor Curved Sword - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "FP/(GCHG): Zamor Mask - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "FP/(GCHG): Zamor Armor - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "FP/(GCHG): Zamor Bracelets - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "FP/(GCHG): Zamor Legwraps - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "FP/(GCHG): Cranial Vessel Candlestand - upper room after fire spitter, behind imp statue",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "FP/(GCHG): Flame, Protect Me - behind imp statue",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "FP/(GCHG): Giant's Seal - below the bridge to the boss door",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "FP/(GCHG): Freezing Grease - upper room after fire spitter, next to imp statue",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "FP/(GCHG): Golden Rune [11] - first illusory wall to right at start, in window",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giant-Conquering Hero's Grave" },
    ],
    [
      "MotG/(GMC): Ritual Pot - down chain elevator, follow path to dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Glovewort Picker's Bell Bearing [2] - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Golden Seed - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Golden Rune [10] - next to lever",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Stimulating Boluses - down chain elevator, next to drop down near dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Nascent Butterfly - down chain elevator, go down drop down near dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Root Resin x5 - down chain elevator, go down drop down near dead-end, up second chain elevator",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Fire Monk Ashes - in chest down main elevator x2, follow path to dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Deathroot - in chest after boss",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Raw Meat Dumpling - enemy drop, down chain elevator, go down drop down near dead-end, halfway along path in dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Living Jar Shard - enemy drop, down chain elevator, go down drop down near dead-end, halfway along path in dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Raw Meat Dumpling - enemy drop, down chain elevator, go down drop down near dead-end, follow path to dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Living Jar Shard - enemy drop, down chain elevator, go down drop down near dead-end, follow path to dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Raw Meat Dumpling - enemy drop down chain elevator, follow path to dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Living Jar Shard - enemy drop down chain elevator, follow path to dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Raw Meat Dumpling - enemy drop, down chain elevator, go down drop down near dead-end, under second chain elevator",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Living Jar Shard - enemy drop, down chain elevator, go down drop down near dead-end, under second chain elevator",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Raw Meat Dumpling - enemy drop sewer room after chain elevator",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "MotG/(GMC): Living Jar Shard - enemy drop sewer room after chain elevator",
      { groups: ["Dungeon", "Post Leyndell"], region: "Giants' Mountaintop Catacombs" },
    ],
    [
      "CS/(CSC): Rotten Gravekeeper Cloak - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Consecrated Snowfield Catacombs" },
    ],
    [
      "CS/(CSC): Great Grave Glovewort x2 - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Consecrated Snowfield Catacombs" },
    ],
    [
      "CS/(CSC): Golden Rune [12] - next to lever",
      { groups: ["Dungeon", "Post Leyndell"], region: "Consecrated Snowfield Catacombs" },
    ],
    [
      "CS/(CSC): Rejuvenating Boluses - ride up the first frost spitter",
      { groups: ["Dungeon", "Post Leyndell"], region: "Consecrated Snowfield Catacombs" },
    ],
    [
      "CS/(CSC): Root Resin x4 - bottom of the big room",
      { groups: ["Dungeon", "Post Leyndell"], region: "Consecrated Snowfield Catacombs" },
    ],
    [
      "CS/(CSC): Human Bone Shard x8 - W from big room, up to dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Consecrated Snowfield Catacombs" },
    ],
    [
      "CS/(CSC): Imp Head (Elder) - W from big room, up to dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Consecrated Snowfield Catacombs" },
    ],
    [
      "CS/(HPH): Blackflame Monk Amon - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    [
      "CS/(HPH): Warming Stone x2 - N from wood door",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    [
      "CS/(HPH): Sacramental Bud x3 - N from drop off",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    [
      "CS/(HPH): Hero's Rune [1] - drop off of invisable walkway to platform",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    [
      "CS/(HPH): Old Fang x6 - next to lever",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    [
      "CS/(HPH): Root Resin x4 - under lever",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    [
      "CS/(HPH): Freezing Grease x5 - on stairs heading towards CS",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    [
      "CS/(HPH): Spelldrake Talisman +2 - W from boss door up elevator",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    [
      "CS/(HPH): Silver Scarab - in chest S from drop off behind illusory wall",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    [
      "CS/(HPH): Deathroot - in chest after boss",
      { groups: ["Dungeon", "Post Leyndell"], region: "Hidden Path to the Haligtree" },
    ],
    ["WP/(EC): Spelldrake Talisman - boss drop", { groups: ["Dungeon"], region: "Earthbore Cave" }],
    [
      "WP/(EC): Golden Rune [1] - right path from entrance chest",
      { groups: ["Dungeon"], region: "Earthbore Cave" },
    ],
    ["WP/(EC): Glowstone x5 - past skylight", { groups: ["Dungeon"], region: "Earthbore Cave" }],
    ["WP/(EC): Kukri x8 - past skylight", { groups: ["Dungeon"], region: "Earthbore Cave" }],
    [
      "WP/(EC): Smoldering Butterfly x5 - in boss room",
      { groups: ["Dungeon"], region: "Earthbore Cave" },
    ],
    ["WP/(EC): Trina's Lily - in boss room", { groups: ["Dungeon"], region: "Earthbore Cave" }],
    [
      "WP/(EC): Pickled Turtle Neck x3 - entrance chest",
      { groups: ["Dungeon"], region: "Earthbore Cave" },
    ],
    [
      "WP/(TCV): Nomadic Warrior's Cookbook [8] - item 2 right of big room",
      { groups: ["Dungeon"], region: "Tombsward Cave" },
    ],
    [
      "WP/(TCV): Viridian Amber Medallion - boss drop",
      { groups: ["Dungeon"], region: "Tombsward Cave" },
    ],
    [
      "WP/(TCV): Golden Rune [2] - before big room",
      { groups: ["Dungeon"], region: "Tombsward Cave" },
    ],
    [
      "WP/(TCV): Furlcalling Finger Remedy - big room",
      { groups: ["Dungeon"], region: "Tombsward Cave" },
    ],
    [
      "WP/(TCV): Poisonbone Dart x6 - room after big room",
      { groups: ["Dungeon"], region: "Tombsward Cave" },
    ],
    [
      "WP/(TCV): Arteria Leaf - right of big room",
      { groups: ["Dungeon"], region: "Tombsward Cave" },
    ],
    [
      "WP/(TCV): Immunizing White Cured Meat - item 1 right of big room",
      { groups: ["Dungeon"], region: "Tombsward Cave" },
    ],
    ["LG/(GC): Cracked Pot - first room", { groups: ["Dungeon"], region: "Groveside Cave" }],
    ["LG/(GC): Flamedrake Talisman - boss drop", { groups: ["Dungeon"], region: "Groveside Cave" }],
    ["LG/(GC): Golden Rune [1] - first room", { groups: ["Dungeon"], region: "Groveside Cave" }],
    ["LG/(GC): Glowstone x3 - first room", { groups: ["Dungeon"], region: "Groveside Cave" }],
    [
      "LL/(SC): Winged Sword Insignia - boss drop",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Golden Rune [3] - near entrance",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Golden Rune [4] - in middle of first room poison",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Serpent Arrow x15 - first room middle dead-end exit, middle item",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Golden Rune [5] - first room middle dead-end exit, right item",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Glowstone x5 - upper part near first room second exit",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Poison Grease x2 - near boss room",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Sage Hood - first room middle dead-end exit, left item",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Sage Robe - first room middle dead-end exit, left item",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Sage Trousers - first room middle dead-end exit, left item",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(SC): Golden Rune [6] - first room middle dead-end exit, NE enemy drop",
      { groups: ["Dungeon"], region: "Stillwater Cave" },
    ],
    [
      "LL/(LCC): Cerulean Amber Medallion - boss drop",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "LL/(LCC): Hefty Beast Bone x3 - upper W side of first room",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "LL/(LCC): Throwing Dagger x5 - room after dropdown path",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "LL/(LCC): Golden Rune [5] - after room after dropdown path",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "LL/(LCC): Soft Cotton x2 - ledge near bottom of pit",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "LL/(LCC): Smithing Stone [4] - bottom of pit",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "LL/(LCC): Smithing Stone [2] - bottom of pit",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "LL/(LCC): Lump of Flesh - bottom of pit",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "LL/(LCC): Arteria Leaf - in chest beside grace",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "LL/(LCC): Spear Talisman - in chest W path from first room",
      { groups: ["Dungeon"], region: "Lakeside Crystal Cave" },
    ],
    [
      "MtG/(SC): Kindred of Rot's Exultation - boss drop",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Poison Grease x3 - to NE in first big cave",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Lump of Flesh x4 - first big cave, up left path in dead-end",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Preserving Boluses - first big cave, right path, on left in alcove",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Mushroom Head - poison waterfall, follow left path to dead-end",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Mushroom Body - poison waterfall, follow left path to dead-end",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Mushroom Arms - poison waterfall, follow left path to dead-end",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Mushroom Legs - poison waterfall, follow left path to dead-end",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Poisonbone Dart x10 - halfway down hole on corpse",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Golden Rune [6] - bottom of hole to W",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Golden Rune [7] - poison waterfall, left path, on cliff",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    [
      "MtG/(SC): Immunizing Cured Meat - poison waterfall, follow left path to dead-end",
      { groups: ["Dungeon"], region: "Seethewater Cave" },
    ],
    ["MtG/(VC): Jar Cannon - boss drop", { groups: ["Dungeon"], region: "Volcano Cave" }],
    [
      "MtG/(VC): Golden Rune [6] - right path of 3 way",
      { groups: ["Dungeon"], region: "Volcano Cave" },
    ],
    [
      "MtG/(VC): Sliver of Meat x6 - right path of 3 way, drop to ledge, in dead-end",
      { groups: ["Dungeon"], region: "Volcano Cave" },
    ],
    [
      "MtG/(VC): Arteria Leaf x3 - right path of 3 way, drop to ledge, in dead-end",
      { groups: ["Dungeon"], region: "Volcano Cave" },
    ],
    [
      "MtG/(VC): Lump of Flesh x5 - SW of boss door",
      { groups: ["Dungeon"], region: "Volcano Cave" },
    ],
    [
      "MtG/(VC): Coil Shield - right path of 3 way, drop to ledge, in dead-end",
      { groups: ["Dungeon"], region: "Volcano Cave" },
    ],
    [
      "DB/(DC): Flamedrake Talisman +2 - boss drop",
      { groups: ["Dungeon"], region: "Dragonbarrow Cave" },
    ],
    ["DB/(DC): Warming Stone - first room", { groups: ["Dungeon"], region: "Dragonbarrow Cave" }],
    [
      "DB/(DC): Golden Rune [12] - first room",
      { groups: ["Dungeon"], region: "Dragonbarrow Cave" },
    ],
    [
      "DB/(DC): Bull-Goat's Talisman - second room, before dropdown",
      { groups: ["Dungeon"], region: "Dragonbarrow Cave" },
    ],
    [
      "DB/(DC): Golden Rune [8] - bottom of dropdown",
      { groups: ["Dungeon"], region: "Dragonbarrow Cave" },
    ],
    [
      "DB/(DC): Beast Blood x3 - bottom of dropdown",
      { groups: ["Dungeon"], region: "Dragonbarrow Cave" },
    ],
    [
      "DB/(SH): Stars of Ruin - lower first big room N side, need Sellian Sealbreaker, given by Lusat",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Lusat's Glintstone Crown - side with Sellen, lower first big room N side, where Lusat was",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Lusat's Robe - side with Sellen, lower first big room N side, where Lusat was",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Lusat's Manchettes - side with Sellen, lower first big room N side, where Lusat was",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Old Sorcerer's Legwraps - side with Sellen, lower first big room N side, where Lusat was",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    ["DB/(SH): Crystal Torrent - boss drop", { groups: ["Dungeon"], region: "Sellia Hideaway" }],
    [
      "DB/(SH): Golden Rune [3] - in front of the illusory wall",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Lost Ashes of War - lower first big room",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Golden Rune [5] - lower first big room",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Stimulating Boluses - lower first big room",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Somber Smithing Stone [4] - route from lower first big room back up",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Preserving Boluses x3 - second big room, follow right side",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Crystal Dart x10 - lower second big room",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Golden Rune [5] - first big room, drop to left crystal",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Glowstone x4 - first big room, by camp",
      { groups: ["Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Crystal Spear - chest second big room, follow right side, behind illusory wall near corpse",
      { groups: ["Hidden", "Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Crystalian Ashes - second big room, right of entrance follow crystal drop down path",
      { groups: ["Hidden", "Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "DB/(SH): Ghost Glovewort [4] - enemy drop lower first big room",
      { groups: ["Drop", "Dungeon"], region: "Sellia Hideaway" },
    ],
    [
      "CS/(CF): Golden Order Greatsword - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Golden Rune [7] - next to grace",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Freezing Grease - left path from upper ice sheet",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Hero's Rune [2] - on ice pillar upper ice sheet",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Rune Arc - past ice pillar area, in dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Miquella's Lily x3 - under the ice sheet",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Nascent Butterfly - NE alcove of upper ice sheet",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Thawfrost Boluses x3 - under the ice sheet, next to hole",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Crystal Dart x8 - under the ice sheet",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Thawfrost Boluses x2 - under the ice sheet",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Freezing Grease x6 - under the ice sheet in hole",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Freezing Grease x4 - middle of upper ice sheet",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Golden Rune [10] - SE side of upper ice sheet",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    [
      "CS/(CF): Spiritflame Arrow x10 - past ice pillar area, in dead-end",
      { groups: ["Dungeon", "Post Leyndell"], region: "Cave of the Forlorn" },
    ],
    ["LG/(CC): Tailoring Tools - boss drop", { groups: ["Dungeon"], region: "Coastal Cave" }],
    ["LG/(CC): Sewing Needle - boss drop", { groups: ["Dungeon"], region: "Coastal Cave" }],
    ["LG/(CC): Land Octopus Ovary - before boss", { groups: ["Dungeon"], region: "Coastal Cave" }],
    ["LG/(CC): Smoldering Butterfly - after boss", { groups: ["Dungeon"], region: "Coastal Cave" }],
    ["LG/(HC): Blue Dancer Charm - boss drop", { groups: ["Dungeon"], region: "Highroad Cave" }],
    [
      "LG/(HC): Golden Rune [1] - past second hole",
      { groups: ["Dungeon"], region: "Highroad Cave" },
    ],
    [
      "LG/(HC): Arteria Leaf x3 - on ledge before water area",
      { groups: ["Dungeon"], region: "Highroad Cave" },
    ],
    [
      "LG/(HC): Smithing Stone [1] x3 - below water entrance ledge",
      { groups: ["Dungeon"], region: "Highroad Cave" },
    ],
    [
      "LG/(HC): Smithing Stone [2] - top of small waterfall area",
      { groups: ["Dungeon"], region: "Highroad Cave" },
    ],
    [
      "LG/(HC): Golden Rune [4] - top of small waterfall area",
      { groups: ["Dungeon"], region: "Highroad Cave" },
    ],
    [
      "LG/(HC): Fire Grease x2 - below ledge before water area",
      { groups: ["Dungeon"], region: "Highroad Cave" },
    ],
    [
      "LG/(HC): Furlcalling Finger Remedy - past miniboss on ledge",
      { groups: ["Dungeon"], region: "Highroad Cave" },
    ],
    ["LG/(HC): Shamshir - center of water area", { groups: ["Dungeon"], region: "Highroad Cave" }],
    [
      "AP/(PG): Perfume Bottle - in chest next to root in second room",
      { groups: ["Dungeon"], region: "Perfumer's Grotto" },
    ],
    [
      "AP/(PG): Great Omenkiller Cleaver - boss drop",
      { groups: ["Dungeon"], region: "Perfumer's Grotto" },
    ],
    [
      "AP/(PG): Living Jar Shard x10 - in chest next to root in second room",
      { groups: ["Dungeon"], region: "Perfumer's Grotto" },
    ],
    [
      "AP/(PG): Living Jar Shard x5 - first room in water",
      { groups: ["Dungeon"], region: "Perfumer's Grotto" },
    ],
    [
      "AP/(PG): Arteria Leaf x3 - on root in massive chasm",
      { groups: ["Dungeon"], region: "Perfumer's Grotto" },
    ],
    [
      "AP/(PG): Golden Rune [5] - next to boss door, left item",
      { groups: ["Dungeon"], region: "Perfumer's Grotto" },
    ],
    [
      "AP/(PG): Miranda Powder x6 - next to boss door, far item",
      { groups: ["Dungeon"], region: "Perfumer's Grotto" },
    ],
    [
      "AP/(PG): Warming Stone - next to boss door, right item",
      { groups: ["Dungeon"], region: "Perfumer's Grotto" },
    ],
    [
      "AP/(PG): Golden Rune [5] - next to boss door, by door",
      { groups: ["Dungeon"], region: "Perfumer's Grotto" },
    ],
    ["AP/(SCV): Concealing Veil - boss drop", { groups: ["Dungeon"], region: "Sage's Cave" }],
    ["AP/(SCV): Family Heads - hidden boss drop", { groups: ["Dungeon"], region: "Sage's Cave" }],
    [
      "AP/(SCV): Rejuvenating Boluses x5 - in chest next to another chest, right chest",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Lost Ashes of War - in chest next to another chest, left chest",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Candletree Wooden Shield - in chest behind illusory wall near double chests, chest 3",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Silver-Pickled Fowl Foot x5 - in chest behind illusory wall near double chests, chest 1",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Black Hood - in chest behind illusory wall near double chests, chest 2",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Nascent Butterfly - in chest behind illusory wall near double chests, chest 4",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Stonesword Key - in chest behind illusory wall in sand room",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Dragonwound Grease x4 - in chest next to two chests, left chest",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Raptor Talons - in chest next to two chests, right chest",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Golden Great Arrow x10 - in chest next to two chests, single chest",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Raptor's Black Feathers - in chest S of hidden boss door, left chest",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Skeletal Mask - in chest S of hidden boss door, right chest",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Golden Rune [5] - just past chests, middle of water",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    [
      "AP/(SCV): Golden Rune [5] - just past chests, by wall",
      { groups: ["Dungeon"], region: "Sage's Cave" },
    ],
    ["CL/(AC): Gold Scarab - boss drop", { groups: ["Dungeon"], region: "Abandoned Cave" }],
    [
      "CL/(AC): Dragonwound Grease - right of first dead abductor",
      { groups: ["Dungeon"], region: "Abandoned Cave" },
    ],
    [
      "CL/(AC): Venomous Fang - on ledge after climbing dead abductors",
      { groups: ["Dungeon"], region: "Abandoned Cave" },
    ],
    [
      "CL/(AC): Serpent Bow - in front of dead abductor",
      { groups: ["Dungeon"], region: "Abandoned Cave" },
    ],
    [
      "CL/(AC): Fire Grease - in alcove after long dark room",
      { groups: ["Dungeon"], region: "Abandoned Cave" },
    ],
    ["CL/(GC): Putrid Corpse Ashes - boss drop", { groups: ["Dungeon"], region: "Gaol Cave" }],
    ["CL/(GC): Golden Rune [2] - first room", { groups: ["Dungeon"], region: "Gaol Cave" }],
    [
      "CL/(GC): Golden Rune [2] - cage across from broken floor, after lever",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    [
      "CL/(GC): Old Fang x5 - cage beside lever, after lever",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    [
      "CL/(GC): Golden Rune [2] - cage next to dropdown, after lever",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    [
      "CL/(GC): Golden Rune [4] - cage with 3 items after dropdown, after lever",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    [
      "CL/(GC): Stonesword Key - cage with 3 items after dropdown, after lever",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    [
      "CL/(GC): Wakizashi - cage with 3 items after dropdown, after lever",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    [
      "CL/(GC): Golden Rune [4] - alcove before cage lever room",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    [
      "CL/(GC): Turtle Neck Meat x2 - alcove before cage lever room",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    ["CL/(GC): Golden Rune [5] - within lever room", { groups: ["Dungeon"], region: "Gaol Cave" }],
    [
      "CL/(GC): Rainbow Stone - room before boss drop, after lever",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    [
      "CL/(GC): Golden Rune [4] - room before boss drop, after lever",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    ["CL/(GC): Glowstone x3 - after boss", { groups: ["Dungeon"], region: "Gaol Cave" }],
    [
      "CL/(GC): Somber Smithing Stone [5] - chest in lever room",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    [
      "CL/(GC): Pillory Shield - cage beside lever, after lever",
      { groups: ["Dungeon"], region: "Gaol Cave" },
    ],
    ["CL/(GC): Regalia of Eochaid - after boss", { groups: ["Dungeon"], region: "Gaol Cave" }],
    ["CL/(GC): Rune Arc - chest by grace", { groups: ["Dungeon"], region: "Gaol Cave" }],
    [
      "MotG/(SC): Godskin Swaddling Cloth - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): Black Flame Ritual - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): White Reed Armor - middle of big water area, next to tree",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): White Reed Gauntlets - middle of big water area, next to tree",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): White Reed Greaves - middle of big water area, next to tree",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): Golden Rune [6] - middle of big water area, in bushes",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): Golden Rune [12] - under cliff in pond",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): Freezing Grease x2 - under cliff in pond",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): Golden Rune [10] - past pond in dead-end on left",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): Hero's Rune [1] - past pond in dead-end on left",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): Rune Arc - past pond in dead-end on left",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): Invigorating White Cured Meat - middle of big water area",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    [
      "MotG/(SC): Arteria Leaf x5 - past hole in small pond",
      { groups: ["Dungeon", "Post Leyndell"], region: "Spiritcaller Cave" },
    ],
    ["WP/(MT): Rusted Anchor - boss drop", { groups: ["Dungeon"], region: "Morne Tunnel" }],
    [
      "WP/(MT): Golden Rune [2] - second room, on wooden platform",
      { groups: ["Dungeon"], region: "Morne Tunnel" },
    ],
    [
      "WP/(MT): Golden Rune [4] - third room in hut",
      { groups: ["Dungeon"], region: "Morne Tunnel" },
    ],
    [
      "WP/(MT): Large Glintstone Scrap x2 - third room W of hut",
      { groups: ["Dungeon"], region: "Morne Tunnel" },
    ],
    [
      "WP/(MT): Stanching Boluses - lower second room under platform",
      { groups: ["Dungeon"], region: "Morne Tunnel" },
    ],
    [
      "WP/(MT): Soft Cotton - lower first room to W",
      { groups: ["Dungeon"], region: "Morne Tunnel" },
    ],
    [
      "WP/(MT): Arteria Leaf x2 - lower first room",
      { groups: ["Dungeon"], region: "Morne Tunnel" },
    ],
    ["WP/(MT): Exalted Flesh - third room chest", { groups: ["Dungeon"], region: "Morne Tunnel" }],
    ["LG/(LT): Roar Medallion - boss drop", { groups: ["Dungeon"], region: "Limgrave Tunnels" }],
    [
      "LG/(LT): Smithing Stone [1] - room with rats",
      { groups: ["Dungeon"], region: "Limgrave Tunnels" },
    ],
    [
      "LG/(LT): Golden Rune [4] - off side of entrance elevator",
      { groups: ["Dungeon"], region: "Limgrave Tunnels" },
    ],
    [
      "LG/(LT): Large Glintstone Scrap x5 - room after second elevator",
      { groups: ["Dungeon"], region: "Limgrave Tunnels" },
    ],
    [
      "LG/(LT): Golden Rune [1] - off side of third elevator",
      { groups: ["Dungeon"], region: "Limgrave Tunnels" },
    ],
    [
      "LG/(LT): Glintstone Scrap x3 - off side of second elevator",
      { groups: ["Dungeon"], region: "Limgrave Tunnels" },
    ],
    [
      "LL/(RLCT): Smithing-Stone Miner's Bell Bearing [1] - boss drop",
      { groups: ["Dungeon"], region: "Raya Lucaria Crystal Tunnel" },
    ],
    [
      "LL/(RLCT): Somber Smithing Stone [2] - in chest on platform near grace",
      { groups: ["Dungeon"], region: "Raya Lucaria Crystal Tunnel" },
    ],
    [
      "LL/(RLCT): Somber Smithing Stone [3] - the parkour item near top",
      { groups: ["Dungeon"], region: "Raya Lucaria Crystal Tunnel" },
    ],
    [
      "LL/(RLCT): Golden Rune [3] - room before first elevator, under platforms",
      { groups: ["Dungeon"], region: "Raya Lucaria Crystal Tunnel" },
    ],
    [
      "LL/(RLCT): Smithing Stone [3] - room before first elevator, dead-end to S",
      { groups: ["Dungeon"], region: "Raya Lucaria Crystal Tunnel" },
    ],
    [
      "LL/(RLCT): Somber Smithing Stone [3] - off side of first elevator, down path then drop down",
      { groups: ["Dungeon"], region: "Raya Lucaria Crystal Tunnel" },
    ],
    [
      "LL/(RLCT): Smithing Stone [1] x3 - bottom of shortcut elevator, side room 1",
      { groups: ["Dungeon"], region: "Raya Lucaria Crystal Tunnel" },
    ],
    [
      "LL/(RLCT): Shatter Earth - room before last elevator, dead-end to N",
      { groups: ["Dungeon"], region: "Raya Lucaria Crystal Tunnel" },
    ],
    [
      "LL/(RLCT): Crystal Knife - bottom of shortcut elevator, in chest side room 2",
      { groups: ["Dungeon"], region: "Raya Lucaria Crystal Tunnel" },
    ],
    ["AP/(OAT): Great Club - boss drop", { groups: ["Dungeon"], region: "Old Altus Tunnel" }],
    [
      "AP/(OAT): Golden Rune [6] - S side of tall mining room",
      { groups: ["Dungeon"], region: "Old Altus Tunnel" },
    ],
    [
      "AP/(OAT): Stanching Boluses - beside hut in sand room",
      { groups: ["Dungeon"], region: "Old Altus Tunnel" },
    ],
    [
      "AP/(OAT): Somber Smithing Stone [4] - N hut lower mining room",
      { groups: ["Dungeon"], region: "Old Altus Tunnel" },
    ],
    [
      "AP/(OAT): Explosive Stone Clump x3 - top of elevator",
      { groups: ["Dungeon"], region: "Old Altus Tunnel" },
    ],
    [
      "AP/(OAT): Boltdrake Talisman +1 - hut in sand room",
      { groups: ["Dungeon"], region: "Old Altus Tunnel" },
    ],
    [
      "AP/(OAT): Troll's Hammer - S hut lower mining room",
      { groups: ["Dungeon"], region: "Old Altus Tunnel" },
    ],
    [
      "AP/(AT): Somberstone Miner's Bell Bearing [2] - boss drop",
      { groups: ["Dungeon"], region: "Altus Tunnel" },
    ],
    [
      "AP/(AT): Crystal Dart x8 - side room 2 from grace",
      { groups: ["Dungeon"], region: "Altus Tunnel" },
    ],
    [
      "AP/(AT): Arteria Leaf x2 - dead-end up wood platform in mining room",
      { groups: ["Dungeon"], region: "Altus Tunnel" },
    ],
    [
      "AP/(AT): Golden Rune [7] - right path from mining room, middle chasm platform",
      { groups: ["Dungeon"], region: "Altus Tunnel" },
    ],
    [
      "AP/(AT): Arsenal Charm +1 - right path from mining room, upper chasm platform",
      { groups: ["Dungeon"], region: "Altus Tunnel" },
    ],
    [
      "AP/(AT): Glintstone Scrap x6 - right path from mining room, lower chasm platform",
      { groups: ["Dungeon"], region: "Altus Tunnel" },
    ],
    [
      "AP/(AT): Rune Arc - in big chest side room 1 from grace",
      { groups: ["Dungeon"], region: "Altus Tunnel" },
    ],
    ["CL/(GT): Moonveil - boss drop", { groups: ["Dungeon"], region: "Gael Tunnel" }],
    ["CL/(GT): Dragon Heart - boss drop", { groups: ["Dungeon"], region: "Gael Tunnel" }],
    [
      "CL/(GT): Somber Smithing Stone [2] - in entrance shaft",
      { groups: ["Dungeon"], region: "Gael Tunnel" },
    ],
    [
      "CL/(GT): Golden Rune [5] - first wood platform",
      { groups: ["Dungeon"], region: "Gael Tunnel" },
    ],
    [
      "CL/(GT): Cross-Naginata - dead-end to right from first room",
      { groups: ["Dungeon"], region: "Gael Tunnel" },
    ],
    [
      "CL/(GT): Gold-Pickled Fowl Foot - under first platform behind boxes",
      { groups: ["Dungeon"], region: "Gael Tunnel" },
    ],
    [
      "CL/(GT): Large Glintstone Scrap x5 - bottom of ladder",
      { groups: ["Dungeon"], region: "Gael Tunnel" },
    ],
    ["CL/(GT): Grace Mimic x5 - bottom of ladder", { groups: ["Dungeon"], region: "Gael Tunnel" }],
    [
      "CL/(SCT): Gravity Stone Chunk x10 - boss drop",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Somberstone Miner's Bell Bearing [1] - boss drop",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Smithing Stone [7] x5 - boss drop",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Somber Smithing Stone [6] - boss drop",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Rot Grease - next to grace",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Golden Rune [5] - in lower left hut",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Glintstone Scrap x6 - on lower left hut",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Rune Arc - above lower left hut on wood walkway",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Cuckoo Glintstone x5 - on beam during one way jump",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Somber Smithing Stone [4] - small room with ladder",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Golden Rune [4] - next to top of kick down ladder",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Dragonwound Grease - middle of room before boss",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Faithful's Canvas Talisman - on wood platform before boss",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Gravity Stone Fan x6 - chest in middle hut",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Gravity Stone Chunk x3 - chest in middle hut",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CL/(SCT): Rock Blaster - chest upper hut",
      { groups: ["Dungeon"], region: "Sellia Crystal Tunnel" },
    ],
    [
      "CS/(YAT): Meteorite of Astel - boss drop",
      { groups: ["Dungeon", "Post Leyndell"], region: "Yelough Anix Tunnel" },
    ],
    [
      "CS/(YAT): Freezing Grease x3 - on frozen elevator",
      { groups: ["Dungeon", "Post Leyndell"], region: "Yelough Anix Tunnel" },
    ],
    [
      "CS/(YAT): Golden Rune [10] - corpse on ice jump",
      { groups: ["Dungeon", "Post Leyndell"], region: "Yelough Anix Tunnel" },
    ],
    [
      "CS/(YAT): Ancient Dragon Smithing Stone - lower ice jump room N side",
      { groups: ["Dungeon", "Post Leyndell"], region: "Yelough Anix Tunnel" },
    ],
    [
      "CS/(YAT): Rune Arc - lower ice jump room E side",
      { groups: ["Dungeon", "Post Leyndell"], region: "Yelough Anix Tunnel" },
    ],
    [
      "CS/(YAT): Explosive Stone Clump x6 - after the ice jump room",
      { groups: ["Dungeon", "Post Leyndell"], region: "Yelough Anix Tunnel" },
    ],
    [
      "CS/(YAT): Hero's Rune [5] - E from boss door",
      { groups: ["Dungeon", "Post Leyndell"], region: "Yelough Anix Tunnel" },
    ],
    [
      "CS/(YAT): Alabaster Lord's Sword - enemy drop lower ice jump room",
      { groups: ["Dungeon", "Post Leyndell"], region: "Yelough Anix Tunnel" },
    ],
    [
      "SV/LTB: Warming Stone - to E down right side of bridge",
      { groups: [], region: "Divine Tower of Limgrave" },
    ],
    [
      "SV/LTB: Soft Cotton - to NE past warp gate",
      { groups: [], region: "Divine Tower of Limgrave" },
    ],
    [
      "SV/(DTL): Stormhawk Feather x5 - after teleport to SW at end",
      { groups: [], region: "Divine Tower of Limgrave" },
    ],
    [
      "SV/(DTL): Silver-Pickled Fowl Foot - after teleport to SW",
      { groups: [], region: "Divine Tower of Limgrave" },
    ],
    [
      "SV/(DTL): Golden Rune [2] - after teleport to SW on left side",
      { groups: [], region: "Divine Tower of Limgrave" },
    ],
    [
      "SV/LTB: Boltdrake Talisman - to NE up the stairs",
      { groups: [], region: "Divine Tower of Limgrave" },
    ],
    [
      "SV/LTB: Ash-of-War Scarab - to NE past warp gate",
      { groups: [], region: "Divine Tower of Limgrave" },
    ],
    [
      "LL/(CSH)N: Golden Rune [3] - right of start elevator",
      { groups: [], isMissable: true, region: "Carian Study Hall" },
    ],
    [
      "LL/(CSH)N: Golden Rune [4] - E side of upper level",
      { groups: [], isMissable: true, region: "Carian Study Hall" },
    ],
    [
      "LL/(CSH)N: Cerulean Seed Talisman - on upper rafters",
      { groups: ["Out of the Way"], region: "Carian Study Hall" },
    ],
    [
      "LL/(CSH)N: Carian Glintstone Staff - on altar before second elevator",
      { groups: [], isMissable: true, region: "Carian Study Hall" },
    ],
    ["LL/(CSH)N: Magic Downpour - hostile npc drop", { groups: [], region: "Carian Study Hall" }],
    [
      "LL/(CSH)I: Mask of Confidence - under first dropdown",
      { groups: [], isMissable: true, region: "Carian Study Hall (Inverted)" },
    ],
    [
      "LL/(CSH)I: Holyproof Dried Liver x2 - on lower rafters W side",
      { groups: [], isMissable: true, region: "Carian Study Hall (Inverted)" },
    ],
    [
      "LL/(CSH)I: Glintstone Firefly x8 - on lower rafters middle",
      { groups: [], isMissable: true, region: "Carian Study Hall (Inverted)" },
    ],
    [
      "LL/LTB: Godskin Noble Hood - enemy drop to E",
      { groups: [], region: "Carian Study Hall (Inverted)" },
    ],
    [
      "LL/LTB: Godskin Noble Robe - enemy drop to E",
      { groups: [], region: "Carian Study Hall (Inverted)" },
    ],
    [
      "LL/LTB: Godskin Noble Bracelets - enemy drop to E",
      { groups: [], region: "Carian Study Hall (Inverted)" },
    ],
    [
      "LL/LTB: Godskin Noble Trousers - enemy drop to E",
      { groups: [], region: "Carian Study Hall (Inverted)" },
    ],
    [
      "LL/(DV): Stargazer Heirloom - top of tower",
      { groups: [], region: "Carian Study Hall (Inverted)" },
    ],
    [
      "LL/(DV): Cursemark of Death - top of tower",
      { groups: [], region: "Carian Study Hall (Inverted)" },
    ],
    [
      "LL/(CSH)I: Lucidity - hostile npc drop",
      { groups: [], region: "Carian Study Hall (Inverted)" },
    ],
    [
      "CO/(ST): Onyx Lord's Greatsword - boss drop",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Golden Rune [5] - upper wood platform first room",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Golden Rune [5] - middle of illusory walls after elevator",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Gold-Pickled Fowl Foot - on root room after elevator",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Stonesword Key - side path from room after elevator",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Rune Arc - lower room after elevator",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Golden Rune [1] - lower room after elevator",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Furlcalling Finger Remedy x3 - lower room after elevator",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Old Fang x2 - stairs below roots after root climb",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Grace Mimic x5 - below plaform after root climb",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Large Glintstone Scrap x3 - NE corner after root climb",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Smithing Stone [6] x3 - breakable statue lower room after elevator",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Lightning Grease x4 - on side of root hole",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Golden Rune [9] - bottom of root hole",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    [
      "CO/(ST): Smithing-Stone Miner's Bell Bearing [2] - in chest W side of first room",
      { groups: ["Dungeon"], region: "Sealed Tunnel" },
    ],
    ["DB/(DT): Godskin Apostle Hood - boss drop", { groups: [], region: "Divine Tower of Caelid" }],
    ["DB/(DT): Godskin Apostle Robe - boss drop", { groups: [], region: "Divine Tower of Caelid" }],
    [
      "DB/(DT): Godskin Apostle Bracelets - boss drop",
      { groups: [], region: "Divine Tower of Caelid" },
    ],
    [
      "DB/(DT): Godskin Apostle Trousers - boss drop",
      { groups: [], region: "Divine Tower of Caelid" },
    ],
    ["DB/(DT): Stonesword Key - layer 2, S side", { groups: [], region: "Divine Tower of Caelid" }],
    [
      "DB/(DT): Rune Arc - in corridor after shortcut ladder",
      { groups: [], region: "Divine Tower of Caelid" },
    ],
    [
      "DB/(DT): Golden Rune [12] - after breakable platform",
      { groups: [], region: "Divine Tower of Caelid" },
    ],
    [
      "DB/(DT): Godslayer's Greatsword - chest after boss",
      { groups: [], region: "Divine Tower of Caelid" },
    ],
    [
      "DTEA: Omenkiller Rollo - boss drop on way to divine tower",
      { groups: ["Post Leyndell"], region: "Divine Tower of East Altus" },
    ],
    [
      "DTEA: Invigorating White Cured Meat - E of leyndell elevator just past gate on ground",
      { groups: ["Post Leyndell"], region: "Divine Tower of East Altus" },
    ],
    [
      "DTEA: Official's Attire - room mid small elevator in chair",
      { groups: ["Post Leyndell"], region: "Divine Tower of East Altus" },
    ],
    [
      "DTEA: Somber Smithing Stone [6] - scarab E of leyndell elevator",
      { groups: ["Scarab", "Post Leyndell"], region: "Divine Tower of East Altus" },
    ],
    [
      "DTEA: Golden Rune [9] - in boss arena",
      { groups: ["Post Leyndell"], region: "Divine Tower of East Altus" },
    ],
    [
      "DTEA: Blade of Calling - room mid small elevator on desk",
      { groups: ["Post Leyndell"], region: "Divine Tower of East Altus" },
    ],
    [
      "SSG/UR: Mending Rune of the Fell Curse - give Dung Eater 5 seedbed curses",
      { groups: [], isMissable: true, region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/FD: Ritual Pot - up elevator in corner",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Sword of Milos - kill Dung Eater or kill him during his invasion in CO",
      { groups: [], isMissable: true, region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Omen Helm - kill Dung Eater or finish his quest",
      { groups: [], isMissable: true, region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Omen Armor - kill Dung Eater or finish his quest",
      { groups: [], isMissable: true, region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Omen Gauntlets - kill Dung Eater or finish his quest",
      { groups: [], isMissable: true, region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Omen Greaves - kill Dung Eater or finish his quest",
      { groups: [], isMissable: true, region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/FD: Bloodflame Talons - boss drop",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Poisonbone Dart x6 - to right up ladder in room after door",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/(LC): Golden Rune [11] - end of first loop",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Bloodsoaked Manchettes - to left by some boxes",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Bloodsoaked Mask - to left by some boxes",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Preserving Boluses - drop to left, on right",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Furlcalling Finger Remedy - drop to left, at corner to left",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/(LC): Golden Rune [11] - boss room on second loop",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Rune Arc - drop to left, to left top of ladder",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Lost Ashes of War - drop to left, to left top of ladder middle of room",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Glass Shard - drop to left into pipe, after hole 1 at corner",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Stonesword Key - drop to left into pipe, drop in hole 1, end of mud room",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Rainbow Stone Arrow (Fletched) x10 - drop to left into pipe, after hole 2",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Grave Violet x5 - drop to left into pipe, drop in hole 2, middle item",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Smithing Stone [7] - drop to left into pipe, drop in hole 2, wall item",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Fireproof Dried Liver - drop to left into pipe, past holes, to right in dead-end",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Somber Smithing Stone [8] - drop to left into pipe, past holes, to right in exit room",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Smithing Stone [7] - to left past shortcut gate by statue",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Grace Mimic - to left past shortcut gate, to right down stairs",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: String - to left past shortcut gate, to right, drop to left, end of stairs",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Fire Grease x2 - to left past shortcut gate, to right, drop to left, follow path, right of ladder",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Nomad Ashes - to left past shortcut gate, to right, drop to left, follow path, after ladder in well room",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Preserving Boluses - to left past shortcut gate, to right, drop to left, follow path, turn around at ladder on left",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Glass Shard - straight past shortcut door, far item down ladder",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/LC: Mohg's Shackle - bottom of big room with pipes, SE wall item",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Dappled White Cured Meat - straight past shortcut door, left item down ladder",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Glass Shard x3 - straight past shortcut door, middle item down ladder",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Golden Centipede x2 - straight past shortcut door, right item down ladder",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Poisoned Stone x3 - straight past shortcut door on bridge",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Freezing Grease - to left down ladder, to left",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Serpent Arrow x10 - to left down ladder, to right on platform",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Fire Grease x5 - to left down ladder, to right up pipe on big platform",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Somber Smithing Stone [6] - to left down ladder, to right up pipe and drop to right",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Smithing Stone [7] - to left down ladder, to right up pipe on platform near exit",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Shadow Bait - to right past shortcut gate on sitting corpse",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Golden Rune [10] - straight past shortcut door, up pipe path, on left wood ledge",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/LC: Somber Smithing Stone [7] - bottom of big room with pipes, NW item",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/LC: Smithing Stone [7] x2 - bottom of big room with pipes, NE item",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/LC: Glass Shard x5 - bottom of big room with pipes, middle item",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/LC: Smithing Stone [7] x2 - bottom of big room with pipes, SE item",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/(LC): Golden Rune [11] - up elevator before grace, before shortcut lever",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Warming Stone - straight past shortcut door, into pipe up shortcut ladder, SW path, right, straight, left dead-end",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Smithing Stone [8] - straight past shortcut door, into pipe up shortcut ladder, SW path, right, straight, end of path",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Eye of Yelough - straight past shortcut door, into pipe up shortcut ladder, SW path, right, left, right",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Golden Rune [8] - straight past shortcut door, into pipe up shortcut ladder, SW path, straight, at next T",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Smithing Stone [7] x4 - straight past shortcut door, into pipe up shortcut ladder, SW path, straight, left on path",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Golden Rune [11] - straight past shortcut door, into pipe up shortcut ladder, SE path around corner",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Smithing Stone [5] - straight past shortcut door, into pipe up shortcut ladder, SE path down hole",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/FD: Smithing Stone [6] - on right before boss arena",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/FD: Erdtree's Favor +1 - in chest after boss",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Warming Stone - to left past shortcut gate, to right, drop to left, end of stairs to right",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Poisoned Stone x8 - to left past shortcut gate, to right, drop to left, follow path, after ladder in corner",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/(LC): Ghost Glovewort [6] - SE from boss door in dead-end on first loop",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/(LC): Root Resin x4 - start room on second loop",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/(LC): Sacramental Bud x2 - next to lever",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Somber Smithing Stone [6] - scarab to left past shortcut gate, to right, drop to left",
      { groups: ["Scarab"], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/LC: Somber Smithing Stone [7] - scarab bottom of big room with pipes",
      { groups: ["Scarab"], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Omen Bairn - enemy drop straight past shortcut door, down ladder",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Somber Smithing Stone [7] - enemy drop, drop to left, to left top of ladder middle of room",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/UR: Ghost Glovewort [6] - enemy drop, drop to left through pipe, drop in hole 2, far corner",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/FD: Raw Meat Dumpling - enemy drop, up elevator in corner",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "SSG/FD: Living Jar Shard - enemy drop, up elevator in corner",
      { groups: [], region: "Subterranean Shunning-Grounds" },
    ],
    [
      "FFP/CF: Frenzied's Cookbook [2] - to NE, top of third plank",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Note: Miquella's Needle - to NE, after landing on lowest coffin, behind breakable object",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/FFP: Frenzied Flame Seal - given by Hyetta at end of her quest",
      { groups: ["Post Leyndell"], isMissable: true, region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/FFP: Frenzyflame Stone x3 - given by Hyetta at end of her quest",
      { groups: ["Post Leyndell"], isMissable: true, region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Eye of Yelough x5 - to NE, drop to right, behind breakable object",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Grace Mimic x5 - to NE, across plank",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Golden Rune [11] - to NE, bottom of second plank",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Hefty Beast Bone x3 - to NE, bottom of third plank",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Inescapable Frenzy - to NE, on lowest coffin",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Nomadic Merchant's Chapeau - to NE, across plank behind breakable object",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Nomadic Merchant's Finery - to NE, across plank behind breakable object",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Nomadic Merchant's Trousers - to NE, across plank behind breakable object",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/CF: Fingerprint Stone Shield - to NE, after landing on lowest coffin, to right in dead-end",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "FFP/FFP: Rune Arc - in chest behind illusory wall to SE",
      { groups: ["Post Leyndell"], region: "Frenzied Flame Proscription" },
    ],
    [
      "WP/BS: Irina's Letter - talk to Irina to SE",
      { groups: [], isMissable: true, region: "Weeping Peninsula" },
    ],
    ["WP/(IMS): Zweihander - Isolated Merchant", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(IMS): Great Arrow x15 - Isolated Merchant", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(IMS): Ballista Bolt x15 - Isolated Merchant",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(IMS): Sacrificial Twig x3 - Isolated Merchant",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(IMS): Festering Bloody Finger x5 - Isolated Merchant",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/(IMS): Lantern - Isolated Merchant", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(IMS): Stonesword Key x3 - Isolated Merchant",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(IMS): Note: Wandering Mausoleum - Isolated Merchant",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(IMS): Lost Ashes of War - Isolated Merchant",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(IMS): Smithing Stone [2] x3 - Isolated Merchant",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/(IMS): Arteria Leaf x5 - Isolated Merchant", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(IMS): Steel Helm - Isolated Merchant", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(IMS): Steel Armor - Isolated Merchant", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(IMS): Steel Gauntlets - Isolated Merchant", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(IMS): Steel Greaves - Isolated Merchant", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ToR: Golden Rune [1] 1 - graveyard W of ToR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ToR: Golden Rune [1] 2 - graveyard W of ToR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ToR: Golden Rune [2] - graveyard W of ToR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ToR: Golden Rune [1] 3 - graveyard W of ToR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ToR: Golden Rune [1] 4 - graveyard W of ToR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ToR: Golden Rune [3] - graveyard W of ToR", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(WR): Sellen's Primal Glintstone - talk to Sellen",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/WR: Golden Rune [1] - W of WR on beach", { groups: [], region: "Weeping Peninsula" }],
    ["WP/WR: Golden Rune [5] - W of WR on beach", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(WR): Great Dragonfly Head - within ruins", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(WR): Ambush Shard - underground", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(FCM): Sacred Tear - by statue",
      { groups: ["Out of the Way"], region: "Weeping Peninsula" },
    ],
    ["WP/ToR: Great Dragonfly Head x3 - NE of ToR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ToR: Mushroom x4 - E of ToR", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/TwR: Divine Fortification - scarab SW of TwR, high on ruin",
      { groups: ["Scarab"], region: "Weeping Peninsula" },
    ],
    [
      "WP/ME: Eclipse Crest Heater Shield - W of ME, drop off 2 ledges",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(WE): Radagon's Scarseal - boss drop Evergaol",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/(CP): Blood Grease x2 - in graveyard", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(TwR): Beast Liver - within ruins", { groups: [], region: "Weeping Peninsula" }],
    ["WP/TwR: Golden Rune [2] -  on beach NW of TwR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(CP): Gilded Iron Shield - in graveyard", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(TwR): Winged Scythe - underground", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(CM): Grafted Blade Greatsword - boss drop", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(CM): Somber Smithing Stone [1] - after BRG, behind SW tower on beach",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Fire Arrow x15 - after BRG, N beach corner",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/(CM): Sacrificial Twig - talk to Edgar", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/BS: Banished Knight's Halberd - kill Edgar at Irina's body or at LL/RS",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/(CM): Fire Grease x2 - on pile of corpses", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(CM): Smithing Stone [2] - left up stairs from entrance",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Golden Rune [2] - SW roof area, corpse hanging from bridge",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Smithing Stone [2] x2 - SW roof area, down ladder to SW, far end to NW",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Golden Rune [2] - middle of SE roof area",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Pickled Turtle Neck - after BC, drop through grate",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Stonesword Key - after BC, off SW side of first building",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Tarnished Golden Sunflower x3 - after BC, drop to hexagonal building, beside broken tree",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Smithing Stone [2] - after BC, on wooden beam",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Throwing Dagger x8 - after BRG, across bridge",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Furlcalling Finger Remedy - NW roof area, SE from ladder",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Steel-Wire Torch - NW roof area, end of NE corridor",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Smithing Stone [1] x3 - S of corpse pile in corner",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Whip - after BC, room after wooden beam drops",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/CM: Golden Rune [1] - NW of CM", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(CM): Twinblade Talisman - after BC, chest top of W tower",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(CM): Claymore - chest NW of corpse pile in room",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/AV: Yellow Ember - on way to AV, W of AV", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ME: Sliver of Meat - S of ME", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ME: Golden Rune [6] - enemy drop S of ME", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ME: Opaline Bubbletear - boss drop", { groups: [], region: "Weeping Peninsula" }],
    ["WP/ME: Crimsonburst Crystal Tear - boss drop", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/ME: Lightning Strike - scarab E of ME, drop down gravestones",
      { groups: ["Scarab"], region: "Weeping Peninsula" },
    ],
    [
      "WP/AV: Golden Rune [2] - on way to AV, SW of AV",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/MT: Golden Rune [2] - N of MT under bridge", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/DHFR: Faith-knot Crystal Tear - N of DHFR in basin",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(DHFR): Shield of the Guilty - underground within S ruins",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(DHFR): Demi-Human Queen's Staff - enemy drop",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/(DHFR): Crystal Burst - enemy drop", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(CP): Sacred Tear - in front of statue",
      { groups: ["Out of the Way"], region: "Weeping Peninsula" },
    ],
    ["WP/CM: Golden Rune [4] -  NE of CM in swamp", { groups: [], region: "Weeping Peninsula" }],
    ["WP/CM: Arteria Leaf - E of CM", { groups: [], region: "Weeping Peninsula" }],
    ["WP/CM: Somber Smithing Stone [2] - E of CM", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/CMR: Map: Weeping Peninsula - map pillar to SW",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CM: Poison Mist - scarab NE of CM, N of swamp",
      { groups: ["Scarab"], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Smithing Stone [1] - other side of wall to S, long go around",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/CM: Golden Seed - seedtree N of CM", { groups: [], region: "Weeping Peninsula" }],
    ["WP/CMR: Warming Stone x2 - top of tower to SE", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/CMR: Great Turtle Shell - top of tower to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Sacrificial Axe - night boss drop far to SW",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Nightrider Flail - night boss drop to SW",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Ash of War: Barricade Shield - night boss drop to SW",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/CMR: Bastard Sword - Nomadic Merchant to SE", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/CMR: Red Thorn Roundshield - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/CMR: Round Shield - Nomadic Merchant to SE", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/CMR: Light Crossbow - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Great Arrow x8 - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Ballista Bolt x8 - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/CMR: Iron Helmet - Nomadic Merchant to SE", { groups: [], region: "Weeping Peninsula" }],
    ["WP/CMR: Scale Armor - Nomadic Merchant to SE", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/CMR: Iron Gauntlets - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Leather Trousers - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Crimson Amber Medallion - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Stonesword Key - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Note: Demi-human Mobs - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/CMR: Cracked Pot - Nomadic Merchant to SE", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/CMR: Smithing Stone [1] x3 - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Smithing Stone [2] - Nomadic Merchant to SE",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/CMR: Ash of War: Mighty Shot - scarab to N",
      { groups: ["Scarab"], region: "Weeping Peninsula" },
    ],
    ["WP/(AV): Flame Crest Wooden Shield - in house", { groups: [], region: "Weeping Peninsula" }],
    ["WP/SLT: Rainbow Stone x5 - to SE", { groups: [], region: "Weeping Peninsula" }],
    ["WP/CMR: Strip of White Flesh - to N", { groups: [], region: "Weeping Peninsula" }],
    ["WP/CMR: Golden Rune [2] - to N", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(CBC): The Flame of Frenzy - on corpse", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(CBC): Sacred Tear - by statue",
      { groups: ["Out of the Way"], region: "Weeping Peninsula" },
    ],
    ["WP/CMR: Smithing Stone [2] - to N", { groups: [], region: "Weeping Peninsula" }],
    ["WP/CMR: Morning Star - in caravan chest to N", { groups: [], region: "Weeping Peninsula" }],
    ["WP/(FLT): Hand Ballista - atop tower in chest", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/(FLT): Ballista Bolt x5 - atop tower in chest",
      { groups: [], region: "Weeping Peninsula" },
    ],
    [
      "WP/(OR): Memory Stone - kill the 3 spirits",
      { groups: ["Rise"], region: "Weeping Peninsula" },
    ],
    ["WP/OR: Starlight Shards - E of OR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/BCPG: Stonesword Key - head far N", { groups: [], region: "Weeping Peninsula" }],
    [
      'WP/CP: Warhawk Ashes - "Prophecy" Painting reward to N',
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/CP: Sliver of Meat - lower cliff NW of CP", { groups: [], region: "Weeping Peninsula" }],
    [
      "WP/CP: Bewitching Branch x3 - lower cliff NW of CP",
      { groups: [], region: "Weeping Peninsula" },
    ],
    ["WP/(DHFR): Arteria Leaf x2 - within N ruins", { groups: [], region: "Weeping Peninsula" }],
    ["WP/DHFR: Gold-Tinged Excrement x2 - SE of DHFR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/DHFR: String x5 - SE of DHFR", { groups: [], region: "Weeping Peninsula" }],
    ["WP/EC: Rainbow Stone - SE of EC", { groups: [], region: "Weeping Peninsula" }],
    ["WP/FLT: Golden Rune [1] x3 1 - E of FLT", { groups: [], region: "Weeping Peninsula" }],
    ["WP/FLT: Golden Rune [1] x3 2 - E of FLT", { groups: [], region: "Weeping Peninsula" }],
    [
      "SSG/(LC): Lord of Blood's Exultation - boss drop",
      { groups: ["Dungeon"], region: "Leyndell Catacombs" },
    ],
    [
      "SSG/(LC): Crucible Scale Talisman - ride up first loop fire spitter",
      { groups: ["Dungeon"], region: "Leyndell Catacombs" },
    ],
    [
      "SSG/(LC): Haligdrake Talisman +1 - behind 2 illusory walls up elevator before grace",
      { groups: ["Hidden", "Dungeon"], region: "Leyndell Catacombs" },
    ],
    [
      "RSP/RSPO: Magma Wyrm's Scalesword - boss drop",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    ["RSP/RSPO: Dragon Heart - boss drop", { groups: [], region: "Ruin-Strewn Precipice" }],
    [
      "RSP/RSP: Somber Smithing Stone [4] - scarab to S",
      { groups: ["Scarab"], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RVV: Smithing Stone [5] - off side of first elevator",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RVV: Rune Arc - after first elevator on platform by shrine",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Somber Smithing Stone [3] - on broken arches",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Serpent-God's Curved Sword - on roof to N of camp area",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RVV: Smithing Stone [4] - up to cave on right",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Golden Rune [4] - middle of lower broken arches",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Golden Rune [5] - after triangle roof ladder jump to pillar",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    ["RSP/RSP: Rune Arc - by ledge in camp area", { groups: [], region: "Ruin-Strewn Precipice" }],
    ["RSP/RSP: Soft Cotton - to S", { groups: [], region: "Ruin-Strewn Precipice" }],
    [
      "RSP/RVV: Golden Rune [5] - top of first elevator",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Golden Rune [5] - NE side of triangle roof",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Lost Ashes of War - behind platform in camp area",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Smithing Stone [3] - in tent in camp area",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Smithing Stone [3] - on roof to N of camp area",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RVV: Smithing Stone [3] - up to cave before elevator",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RVV: Lightning Grease x2 - after first elevator in left side room",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    ["RSP/RSPO: Bull-Goat Helm - invade Tragoth", { groups: [], region: "Ruin-Strewn Precipice" }],
    ["RSP/RSPO: Bull-Goat Armor - invade Tragoth", { groups: [], region: "Ruin-Strewn Precipice" }],
    [
      "RSP/RSPO: Bull-Goat Gauntlets - invade Tragoth",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSPO: Bull-Goat Greaves - invade Tragoth",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Golden Rune [6] - enemy drop on SW plaform of triangle roof",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Golden Rune [6] - enemy drop 1 on platform in camp area",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "RSP/RSP: Golden Rune [6] - enemy drop 2 on platform in camp area",
      { groups: [], region: "Ruin-Strewn Precipice" },
    ],
    [
      "GP/(FRC): Ancient Dragon Knight's Cookbook [1] - on corpse, room with second fulgurbloom",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Death Knight's Twin Axes - boss drop",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Crimson Amber Medallion +3 - boss drop",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Grave Glovewort [5] - on corpse after grace room",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Knot Resin x3 - second trap room, on top of trap",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Dragonbolt Grease x2 - on corpse in second trap room",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Grave Glovewort [6] - corpse past stairs after elevator",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Glass Shard - triple trap room third alcove",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Broken Rune - first room past triple trap room",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Ghost Glovewort [5] - on corpse in flooded basement, east",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Electrocharge - on corpse in flooded basement, west",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Ghost Glovewort [6] - corpse past sword altar",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Rada Fruit x4 - on corpse under stairs past elevator",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Great Ghost Glovewort - upper area, guarded by Black Knight",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Black Knight Commander Andreas - in coffin past top of trap",
      { groups: ["DLC", "Out of the Way", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Shadow Realm Rune [3] - coffin at end of triple trap room",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Ash of War: Blinkbolt - chest above south block in triple trap room",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "GP/(FRC): Stone-Sheathed Sword - above triple trap room, across traps",
      { groups: ["DLC", "Dungeon"], region: "Fog Rift Catacombs" },
    ],
    [
      "RB/(SRC): Ancient Dragon Knight's Cookbook [2] - drop off bridge past second eyes, in chest",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Death Knight's Longhaft Axe - boss drop",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Cerulean Amber Medallion +3 - boss drop",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Rejuvenating Boluses x3 - left room before Basilisk eyes bridge",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Grave Glovewort [7] - on corpse down stairs past Basilisk eyes",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Redflesh Mushroom x5 - on corpse, long room after Basilisk Eyes",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Ghost Glovewort [7] - third room past eyes, straight from second stairs",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Ghost Glovewort [6] - corpse under first impaling block",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Black Knight Captain Huw - altar past second impaling block",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Ghost Glovewort [9] - platform next to top of second impaling block",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Imp Head (Lion) - platform next to top of second impaling block",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Knight's Lightning Spear - corpse, first room behind second Basilisk eyes",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Yellow Fulgurbloom x6 - arched hallway past second Basilisk eyes",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Grave Glovewort [7] - room past moving Basilisk eyes",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Rejuvenating Boluses x2 - ledge overlooking T-shaped room",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Great Ghost Glovewort - down ladder in T-shaped room",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Ghost Glovewort [8] - coffin in T-shaped room past floating eyes",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Shadow Realm Rune [4] - drop off ledge SE of first impaling block",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RB/(SRC): Broken Rune - SE of ledge overlooking T-shaped room",
      { groups: ["DLC", "Dungeon"], region: "Scorpion River Catacombs" },
    ],
    [
      "RR/(DC): Grave Glovewort [6] - coffin in room after grace",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Grave Glovewort [7] - bottom of ladder in L-shaped room",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Viridian Amber Medallion +3 - jump over balcony, in hidden room",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Ghost Glovewort [7] - room out to the left of elevator",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Thin Beast Bones x4 - bottom of stair in big room past elevator",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Shadow Realm Rune [5] - top of ladder past first broken railing drop",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Death Knight Helm - on corpse down the second broken railing",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Death Knight Armor - on corpse down the second broken railing",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Death Knight Gauntlets - on corpse down the second broken railing",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Death Knight Greaves - on corpse down the second broken railing",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Ghost Glovewort [9] - balcony at end of second broken railing drop",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Ghost Glovewort [8] - in room with large plinth, turn around after drop",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Great Ghost Glovewort - E side of large plinth, NE corner",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Bigmouth Imp Ashes - chest S of large plinth",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    [
      "RR/(DC): Great Ghost Glovewort - dropped by enemy on large plinth",
      { groups: ["DLC", "Dungeon"], region: "Darklight Catacombs" },
    ],
    ["RR/(DC): Barbed Staff-Spear - boss drop", { groups: ["DLC"], region: "Darklight Catacombs" }],
    [
      "GP/(BG): Hefty Cracked Pot - chest on ledge near bottom of pot drop",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Hefty Cracked Pot - on top of pots in N side of maze",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Hefty Cracked Pot - on top of pots in S side of maze",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Greater Potentate's Cookbook [11] - NW corner of pot maze beside 3 collapsed pots",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Demi-Human Swordsman Yosh - boss drop",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Frozen Maggot x6 - room left of stairs past grace",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Silver Horn Tender - left room after collapsing stairs",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Frozen Maggot x4 - on ledge past first stone bridge",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Broken Rune - jump down broken grate, corpse in second room",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Thawfrost Boluses - on ledge past room with tables",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Shadow Realm Rune [3] - jail cell S before pot drop",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Glass Shard - corpse hanging on pot in first pot drop",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Smithing Stone [6] x3 - corpse N of pot maze exit",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Innard Meat - corpse on top of pot, S side of pot maze",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Greatjar - atop the jar altar",
      { groups: ["DLC", "Hidden", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Smithing Stone [6] x4 - corpse to the right after pot maze",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Lost Ashes of War - NW from collapsing bridge leading to giant pot",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Raw Meat Dumpling - enemy drop in front of jar altar",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Living Jar Shard - enemy drop in front of jar altar",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Raw Meat Dumpling - enemy drop after pot maze",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Living Jar Shard - enemy drop after pot maze",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Raw Meat Dumpling - enemy drop at bottom of pot drop",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "GP/(BG): Living Jar Shard - enemy drop at bottom of pot drop",
      { groups: ["DLC", "Dungeon"], region: "Belurat Gaol" },
    ],
    [
      "SA/(BG): Hefty Cracked Pot - NE jail cell after first pot drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    ["SA/(BG): Curseblade Meera - boss drop", { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" }],
    [
      "SA/(BG): Bolt x10 - room across from starting ramp",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Stalwart Horn Charm +2 - NE after wooden chute drop, up ladder",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Frozen Maggot x8 - jail cell bottom right of starting ramp",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Broken Rune - corpse at bottom of wooden chute",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Smithing Stone [8] x2 - NE after wooden chute drop, in side cave",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Invigorating Cured Meat - N from blood waterfall in the blood cave",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Broken Rune - W after dropping down wooden chute",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Broken Rune - corpse N of room past blood waterfall",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Lost Ashes of War - corpse on S side of room after blood waterfall drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Shield of Night - ledge overlooking blood river room",
      { groups: ["DLC", "Hidden", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Innard Meat - east from second blood waterfall drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Raw Meat Dumpling - inside large pot after second blood waterfall drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Helm of Night - corpse after riding pot elevator back up to top",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Armor of Night - corpse after riding pot elevator back up to top",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Gauntlets of Night - corpse after riding pot elevator back up to top",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Greaves of Night - corpse after riding pot elevator back up to top",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Silver Horn Tender - left of stairs after room with many pots",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Raw Meat Dumpling - enemy drop on S side of room past blood waterfall drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Living Jar Shard - enemy drop on S side of room past blood waterfall drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Raw Meat Dumpling - enemy drop on N side of room past blood waterfall drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Living Jar Shard - enemy drop on N side of room past blood waterfall drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Raw Meat Dumpling - enemy drop in middle of room past blood waterfall drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "SA/(BG): Living Jar Shard - enemy drop in middle of room past blood waterfall drop",
      { groups: ["DLC", "Dungeon"], region: "Bonny Gaol" },
    ],
    [
      "CHG/(LG): Hefty Cracked Pot - top of large corpse pile in corpse room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Chilling Perfume Bottle - first room on right after upper gaol locked door",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Call of Tibia - upstairs after collapsing floor, first right then left room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Innard Meat x2 - corpse SE corner of blood cave",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Clarifying Horn Charm +2 - blood cave, NW then N then E from ladder",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Living Jar Shard x6 - corpse in SW corner of corpse room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Gaol Lower Level Key - chest in corpse room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Raw Meat Dumpling - drop from enemy guarding chest in corpse room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Living Jar Shard - drop from enemy guarding chest in corpse room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Raw Meat Dumpling - drop from enemy guarding corpse item in corpse room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Living Jar Shard - drop from enemy guarding corpse item in corpse room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Raw Meat Dumpling - drop from enemy S of large corpse pile in corpse room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Living Jar Shard - drop from enemy S of large corpse pile in corpse room",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Upper)" },
    ],
    [
      "CHG/(LG): Shadow Realm Rune [4] - from middle part of the V stairs, illusory wall right of dead-end gate, lower key gate",
      { groups: ["DLC", "Hidden", "Dungeon"], region: "Lamenter's Gaol (Lower)" },
    ],
    [
      "CHG/(LG): Lamenting Visage - from middle part of the V stairs, illusory wall right of dead-end gate, lower key gate",
      { groups: ["DLC", "Hidden", "Dungeon"], region: "Lamenter's Gaol (Lower)" },
    ],
    [
      "CHG/(LG): Lamenter's Mask - boss drop",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Lower)" },
    ],
    [
      "CHG/(LG): Gaol Upper Level Key - second room on right from left chamber past locked door",
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Entrance)" },
    ],
    [
      'CHG/(LG): Prattling Pate "Lamentation" - final room down left hall past locked door',
      { groups: ["DLC", "Dungeon"], region: "Lamenter's Gaol (Entrance)" },
    ],
    [
      "GP/(RFLI): Greater Potentate's Cookbook [13] - N corner of room past second ladder",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Anvil Hammer - forge altar reward",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Ancient Dragon Smithing Stone - forge altar reward",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Smithing Stone [6] x6 - left room after first ladder",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Smithing Stone [5] x4 - right hallway after first ladder",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Smithing Stone [7] x5 - corpse on mantlepiece overlooking room after second ladder",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Smithing Stone [7] x3 - SW ledge overlooking room after second ladder",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Smithscript Dagger - corpse in first room overlooking lava",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Somber Smithing Stone [7] - corpse in S corner of room after second ladder",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Somber Smithing Stone [5] - left of stairs after second ladder",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "GP/(RFLI): Glass Shard - left of opening past third ladder",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge Lava Intake" },
    ],
    [
      "SA/(RFSP): Ancient Meteoric Ore Greatsword - forge altar reward, up second gate",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "SA/(RFSP): Ancient Dragon Smithing Stone - forge altar reward, up second gate",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "SA/(RFSP): Glass Shard - by lever for second gate",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "SA/(RFSP): Somber Smithing Stone [8] - end of long hallway",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "SA/(RFSP): Smithing Talisman - up ladder long hallway, left at metal platform",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "SA/(RFSP): Somber Smithing Stone [8] - up ladder long hallway, under platform",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "SA/(RFSP): Smithscript Spear - across walkway in first room",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "SA/(RFSP): Smithscript Cirque - by waterfall after second gate",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "SA/(RFSP): Smithing Stone [6] x5 - left in first rookm",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "SA/(RFSP): Smithing Stone [8] x3 - up ladder long hallway, under metal platform below",
      { groups: ["DLC", "Dungeon"], region: "Ruined Forge of Starfall Past" },
    ],
    [
      "RB/(TRF): Ancient Dragon Smithing Stone - forge altar reward",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Taylew the Golem Smith - forge altar reward",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Smithscript Axe - after first ladder jump across gap and go left",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Ancient Dragon Smithing Stone - top of lava funnel (inital position), to left by balcony",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Smithscript Shield - top of lava funnel (inital position), to right, straight and up rumble on right",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Somber Smithing Stone [9] - top of lava funnel (inital position), to right, drop down to left, up ladder behind at top",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Somber Smithing Stone [8] - top of lava funnel (inital position), to right, down right stairs",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Shadow Realm Rune [3] - E of grace",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Smithscript Greathammer - after first ladder go down and straight across lava funnel",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Smithing Stone [8] x2 - top of lava funnel (inital position), to left by metal platform",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "RB/(TRF): Smithing Stone [8] x3 - top of lava funnel (inital position), to right, drop down to left",
      { groups: ["DLC", "Dungeon"], region: "Taylew's Ruined Forge" },
    ],
    [
      "ER/(RC): Bloodfiend Hexer's Ashes - boss drop",
      { groups: ["DLC", "Dungeon"], region: "Rivermouth Cave" },
    ],
    [
      "ER/(RC): Sliver of Meat x3 - right at intersection",
      { groups: ["DLC", "Dungeon"], region: "Rivermouth Cave" },
    ],
    [
      "ER/(RC): Hefty Beast Bone x2 - room 1",
      { groups: ["DLC", "Dungeon"], region: "Rivermouth Cave" },
    ],
    [
      "ER/(RC): Shadow Realm Rune [1] - on breakable floor",
      { groups: ["DLC", "Dungeon"], region: "Rivermouth Cave" },
    ],
    [
      "ER/(RC): Sanguine Amaryllis x6 - NE corner of blood pool",
      { groups: ["DLC", "Dungeon"], region: "Rivermouth Cave" },
    ],
    [
      "ER/(RC): Sacred Bloody Flesh x3 - on blood pool altar",
      { groups: ["DLC", "Dungeon"], region: "Rivermouth Cave" },
    ],
    [
      "ER/(RC): Sacred Bloody Flesh - after entering blood pool room follow path right",
      { groups: ["DLC", "Out of the Way", "Dungeon"], region: "Rivermouth Cave" },
    ],
    [
      "GP/(DP): Dragon-Hunter's Great Katana - boss drop",
      { groups: ["DLC"], region: "Dragon's Pit" },
    ],
    [
      "GP/(DP): Smithing Stone [7] x4 - room 1 under drop down",
      { groups: ["DLC", "Dungeon"], region: "Dragon's Pit" },
    ],
    [
      "GP/(DP): Shadow Realm Rune [2] - room 2 by brazier",
      { groups: ["DLC", "Dungeon"], region: "Dragon's Pit" },
    ],
    [
      "GP/(DP): Knot Resin x4 - room 4 upstairs near stairs",
      { groups: ["DLC", "Dungeon"], region: "Dragon's Pit" },
    ],
    [
      "GP/(DP): Smithing Stone [5] x3 - room 4 upstairs by hole",
      { groups: ["DLC", "Dungeon"], region: "Dragon's Pit" },
    ],
    [
      "GP/(DP): Smithing Stone [7] x3 - down pit by boss",
      { groups: ["DLC", "Dungeon"], region: "Dragon's Pit" },
    ],
    [
      "GP/(DP): Dragon Heart - enemy drop room 4 upstairs",
      { groups: ["DLC", "Dungeon"], region: "Dragon's Pit" },
    ],
    [
      "GP/(DP): Ancient Dragon Smithing Stone - enemy drop room 4 upstairs",
      { groups: ["DLC", "Dungeon"], region: "Dragon's Pit" },
    ],
    [
      "MA/(CR): Ranni's Dark Moon - in chest top of rise, just google this puzzle :)",
      { groups: ["Rise"], region: "Moonlight Altar" },
    ],
    [
      "MA/MA: Smithing Stone [7] x3 - to SW in the 3 gazebos, left",
      { groups: [], region: "Moonlight Altar" },
    ],
    [
      "MA/MA: Smithing Stone [8] x3 - to SW in the 3 gazebos, middle",
      { groups: [], region: "Moonlight Altar" },
    ],
    [
      "MA/MA: Smithing Stone [7] x3 - to SW in the 3 gazebos, right",
      { groups: [], region: "Moonlight Altar" },
    ],
    ["MA/MA: Dragon Heart - enemy drop 1 to W", { groups: [], region: "Moonlight Altar" }],
    ["MA/MA: Dragon Heart - enemy drop 2 to W", { groups: [], region: "Moonlight Altar" }],
    ["MA/(RE): Black Knife Tiche - boss drop Evergaol", { groups: [], region: "Moonlight Altar" }],
    ["MA/MA: Gravel Stone x5 - to W under tilted stone", { groups: [], region: "Moonlight Altar" }],
    ["MA/MA: Adula's Moonblade - boss drop to NE", { groups: [], region: "Moonlight Altar" }],
    ["MA/MA: Dragon Heart x3 - boss drop to NE", { groups: [], region: "Moonlight Altar" }],
    ["MA/(MR): Golden Rune [9] - SW side of ruins", { groups: [], region: "Moonlight Altar" }],
    ["MA/(MR): Magic Grease - NW side of ruins", { groups: [], region: "Moonlight Altar" }],
    ["MA/(MR): Rune Arc - SW side of ruins", { groups: [], region: "Moonlight Altar" }],
    [
      "MA/(MR): Somber Smithing Stone [8] - in chest under illusory floor NE side of ruins",
      { groups: [], region: "Moonlight Altar" },
    ],
    ["MA/MA: Dragon Heart - enemy drop 3 to W", { groups: [], region: "Moonlight Altar" }],
    ["MA/(LER): Golden Rune [10] - middle of ruins", { groups: [], region: "Moonlight Altar" }],
    [
      "MA/(LER): Glintstone Firefly x5 - W side of ruins",
      { groups: [], region: "Moonlight Altar" },
    ],
    [
      "MA/(LER): Cerulean Amber Medallion +2 - in chest under illusory floor behind imp statue",
      { groups: ["Out of the Way"], region: "Moonlight Altar" },
    ],
    [
      "MA/(LER): Smithing Stone [8] x3 - in chest under illusory floor E ruins",
      { groups: [], region: "Moonlight Altar" },
    ],
    [
      "MA/(LER): Ghost Glovewort [2] - enemy drop middle of ruins",
      { groups: [], region: "Moonlight Altar" },
    ],
    [
      "MA/(LER): Ghost Glovewort [2] - enemy drop E ruins",
      { groups: [], region: "Moonlight Altar" },
    ],
    [
      "MA/(CMC): Dark Moon Greatsword - give Ranni Darkmoon Ring under CMC",
      { groups: [], region: "Moonlight Altar" },
    ],
    ["MA/(CMC): Starlight Shards 1 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards 2 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards 3 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards 4 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards 5 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards 6 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards 7 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards 8 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards 9 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards 10 - inside", { groups: [], region: "Moonlight Altar" }],
    ["MA/(CMC): Starlight Shards - outside to N", { groups: [], region: "Moonlight Altar" }],
    [
      "LL/(SR): Carian Phalanx - Seluvis shop after potion used",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Glintstone Icecrag - Seluvis shop after potion used",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Freezing Mist - Seluvis shop after potion used",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Carian Retaliation - Seluvis shop after potion used",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Dolores the Sleeping Arrow Puppet - Seluvis shop, after you give potion to Nepheli",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Dung Eater Puppet - Seluvis shop, after you give potion to Dung Eater",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Finger Maiden Therolina Puppet - Seluvis shop after finding puppet room",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Jarwight Puppet - Seluvis shop after finding puppet room",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Memory Stone - in chest top of rise",
      { groups: ["Rise"], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Seluvis's Potion - talk to Seluvis",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Magic Scorpion Charm - given by Seluvis after giving Amber Starlight",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Seluvis's Introduction - talk to Seluvis after talking to Blaidd in SR",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Amber Draught - given by Seluvis after giving Amber Starlight",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Preceptor's Big Hat - Seluvis death",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Preceptor's Long Gown - Seluvis death",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Preceptor's Gloves - Seluvis death",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(SR): Preceptor's Trousers - Seluvis death",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/RaR: Royal Greatsword - kill angry Blaidd",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/RaR: Blaidd's Armor - kill angry Blaidd",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/RaR: Blaidd's Gauntlets - kill angry Blaidd",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/RaR: Blaidd's Greaves - kill angry Blaidd",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(RaR): Carian Inverted Statue - given by Ranni after giving Fingerslayer Blade",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(RaR): Spectral Steed Regalia: Carian Silver - in chest near grace",
      { groups: [], region: "Caria Manor" },
    ],
    [
      "LL/RMG: Ash of War: Chilling Mist - scarab to W",
      { groups: ["Scarab"], region: "Caria Manor" },
    ],
    ["LL/RM: Golden Rune [3] 1 - graveyard to NW", { groups: [], region: "Caria Manor" }],
    ["LL/RM: Golden Rune [4] - graveyard to NW", { groups: [], region: "Caria Manor" }],
    ["LL/RM: Golden Rune [5] - graveyard to NW", { groups: [], region: "Caria Manor" }],
    ["LL/RM: Golden Rune [1] - graveyard to NW", { groups: [], region: "Caria Manor" }],
    ["LL/RM: Golden Rune [3] 2 - graveyard to NW", { groups: [], region: "Caria Manor" }],
    ["LL/RM: Golden Rune [3] 3 - graveyard to NW", { groups: [], region: "Caria Manor" }],
    ["LL/RM: Golden Rune [2] - graveyard to NW", { groups: [], region: "Caria Manor" }],
    ["LL/RM: Golden Rune [3] 4 - graveyard to NW", { groups: [], region: "Caria Manor" }],
    ["LL/SR: Black Wolf Mask - on SE wall behind SR", { groups: [], region: "Caria Manor" }],
    [
      "LL/(ReR): Snow Witch Hat - in chest, after giving Fingerslayer Blade to Ranni",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(ReR): Snow Witch Robe - in chest, after giving Fingerslayer Blade to Ranni",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(ReR): Snow Witch Skirt - in chest, after giving Fingerslayer Blade to Ranni",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    ["LL/(CM): Ripple Blade - Pidia shop", { groups: [], region: "Caria Manor" }],
    ["LL/(CM): Black Leather Shield - Pidia shop", { groups: [], region: "Caria Manor" }],
    ["LL/(CM): Celestial Dew - Pidia shop", { groups: [], region: "Caria Manor" }],
    ["LL/(CM): Larval Tear - Pidia shop", { groups: [], region: "Caria Manor" }],
    ["LL/(CM): Weathered Map - Pidia shop", { groups: [], region: "Caria Manor" }],
    [
      "LL/(CM): Glintstone Craftsman's Cookbook [7] - Pidia shop",
      { groups: [], region: "Caria Manor" },
    ],
    ["LL/(CM): Ritual Pot - Pidia shop", { groups: [], region: "Caria Manor" }],
    ["LL/(CM): Old Fang x3 - Pidia shop", { groups: [], region: "Caria Manor" }],
    ["LL/(CM): Budding Horn x2 - Pidia shop", { groups: [], region: "Caria Manor" }],
    ["LL/(CM): Slumbering Egg x2 - Pidia shop", { groups: [], region: "Caria Manor" }],
    ["LL/(CM): Ash of War: Carian Retaliation - Pidia shop", { groups: [], region: "Caria Manor" }],
    [
      "LL/(SR): Nepheli Loux Puppet - on Seluvis's body",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    [
      "LL/(CM): Dolores the Sleeping Arrow Puppet - dropped by Pidia after Seluvis dies",
      { groups: [], isMissable: true, region: "Caria Manor" },
    ],
    ["LL/(RGE): Meteorite - boss drop Evergaol", { groups: [], region: "Caria Manor" }],
    [
      'LL/BCM: Juvenile Scholar Cap - "Resurrection" Painting reward to S by graves',
      { groups: [], region: "Caria Manor" },
    ],
    [
      'LL/BCM: Juvenile Scholar Robe - "Resurrection" Painting reward to S by graves',
      { groups: [], region: "Caria Manor" },
    ],
    [
      'LL/BCM: Larval Tear - "Resurrection" Painting reward to S by graves',
      { groups: [], region: "Caria Manor" },
    ],
    ["LL/BCM: Golden Rune [3] - to SE by group of enemies", { groups: [], region: "Caria Manor" }],
    ["LL/BCM: Thawfrost Boluses - to SE on tip of rock", { groups: [], region: "Caria Manor" }],
    ["LL/BCM: Albinauric Ashes - to S by graves", { groups: [], region: "Caria Manor" }],
    [
      "CO/OWPT: Giant-Crusher - in caravan chest to S in camp",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWPT: Golden Seed - enemy drop to S middle of camp",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWPT: Map: Leyndell, Royal Capital - map pillar",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/OWPT: Holy Grease x2 - to SE on platform", { groups: [], region: "Capital Outskirts" }],
    ["CO/OWPT: Golden Seed 1 - seedtree", { groups: [], region: "Capital Outskirts" }],
    ["CO/OWPT: Golden Seed 2 - seedtree", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/OWPT: Gargoyle's Great Axe - enemy drop to NE halfway up stairs",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/(MEC): Missionary's Cookbook [4] - by big pot",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/(MEC): Golden Order Seal - by small erd tree",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/MEC: Smoldering Butterfly x3 - NE of MEC by gravestone",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWPT: Ash of War: Prayerful Strike - scarab to E down below in water",
      { groups: ["Scarab"], region: "Capital Outskirts" },
    ],
    [
      "CO/OWPT: Ash of War: Golden Parry - scarab to NE up stairs right of seedtree",
      { groups: ["Scarab"], region: "Capital Outskirts" },
    ],
    [
      "CO/OWPT: Lost Ashes of War - to NE up stairs, top of stairs right of seedtree",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWB: Old Fang x3 - to SW in graveyard on big gravestone",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWB: Golden Rune [4] - to SW in graveyard, right item",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWB: Rainbow Stone x4 - to SW in graveyard, left item",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWB: Golden Rune [10] - to SW in middle of camp",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/OWB: Arteria Leaf x3 - to SW on catapult", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/OWB: Golden Rune [9] - enemy drop to SW in middle of cam",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWPT: Golden Seed 1 - seedtree to NE top of stairs",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWPT: Golden Seed 2 - seedtree to NE top of stairs",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/OWB: Viridian Amber Medallion +1 - enemy drop to S middle of path to seedtree",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/HMS: Golden Rune [10] - to E on high tip of cliff",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/HMS: Grace Mimic x3 - to SE on path to SE grave area area",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/HMS: Drawstring Holy Grease x3 - to SE behind right gravestone",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/HMS: Smithing Stone [5] - to SE along left cliff",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/HMS: Golden Rune [5] - to NE behind a massive gravestone",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/OWB: Golden Rune [7] - to E close by", { groups: [], region: "Capital Outskirts" }],
    ["CO/OWB: Mushroom x8 - to E in tent near stairs", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/HMS: Twinbird Kite Shield - night boss drop to NE in block flower field",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/OWB: Golden Rune [5] - to SE", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/OWB: Golden Rune [12] - enemy drop to S, follow left cliff around",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/(HMS): Sentry's Torch - Hermit Merchant", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/(HMS): Distinguished Greatshield - Hermit Merchant",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/(HMS): Prophet Blindfold - Hermit Merchant", { groups: [], region: "Capital Outskirts" }],
    ["CO/(HMS): Prophet Trousers - Hermit Merchant", { groups: [], region: "Capital Outskirts" }],
    ["CO/(HMS): Prophet Robe - Hermit Merchant", { groups: [], region: "Capital Outskirts" }],
    ["CO/(HMS): Consort's Trousers - Hermit Merchant", { groups: [], region: "Capital Outskirts" }],
    ["CO/(HMS): Upper-Class Robe - Hermit Merchant", { groups: [], region: "Capital Outskirts" }],
    ["CO/(HMS): Rune Arc x3 - Hermit Merchant", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/(HMS): Note: Below the Capital - Hermit Merchant",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/(HMS): Perfume Bottle - Hermit Merchant", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/(HMS): Golden Sunflower x10 - Hermit Merchant",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/(HMS): Medicine Peddler's Bell Bearing - night boss drop",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/AHG: Seedbed Curse - on Boggart's body after becoming Dung Eater's victim",
      { groups: [], isMissable: true, region: "Capital Outskirts" },
    ],
    ["CO/ME: Great Arrow x10 - to S on rock", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/AHG: Golden Rune [6] - NW of AHG end of water",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/HMS: Golden Rune [2] - to SE in far SE grave area",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/HMS: Spectral Steed Regalia: Funereal Night - to SE by sword monument",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/(ME): Crimson Crystal Tear - in basin", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/HMS: Winged Crystal Tear - in basin to NE in black flower field",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/(ME): Twiggy Cracked Tear - in basin", { groups: [], region: "Capital Outskirts" }],
    [
      "CO/HMS: Golden Rune [4] - to SE end of left cliff behind gravestone",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO: Dragon Greatclaw - capital great rune gate boss drop",
      { groups: [], isMissable: true, region: "Capital Outskirts" },
    ],
    [
      "CO: Dragonclaw Shield - capital great rune gate boss drop",
      { groups: [], isMissable: true, region: "Capital Outskirts" },
    ],
    [
      "CO/AHG: Gravity Stone Fan x3 - NE of AHG up on left cliff",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO: Gravel Stone - around right cliff from capital great rune gate",
      { groups: [], region: "Capital Outskirts" },
    ],
    [
      "CO/AHG: Smithing Stone [6] x2 - breakable statue N of AHG",
      { groups: [], region: "Capital Outskirts" },
    ],
    ["CO/ME: Smithing Stone [5] - to SE on rock", { groups: [], region: "Capital Outskirts" }],
    [
      "LG/(CDC): Dragonfire - Dragon Communion",
      { groups: ["Dungeon"], region: "Church of Dragon Communion" },
    ],
    [
      "LG/(CDC): Dragonclaw - Dragon Communion",
      { groups: ["Dungeon"], region: "Church of Dragon Communion" },
    ],
    [
      "LG/(CDC): Dragonmaw - Dragon Communion",
      { groups: ["Dungeon"], region: "Church of Dragon Communion" },
    ],
    [
      "LG/(CDC): Somber Smithing Stone [1] - scarab to S",
      { groups: ["Scarab", "Dungeon"], region: "Church of Dragon Communion" },
    ],
    [
      "LG/(CDC): Great Dragonfly Head x4 - to W",
      { groups: ["Dungeon"], region: "Church of Dragon Communion" },
    ],
    [
      "LG/(CDC): Smithing Stone [2] - to S",
      { groups: ["Dungeon"], region: "Church of Dragon Communion" },
    ],
    [
      "LG/(CDC): Exalted Flesh - to S up high",
      { groups: ["Dungeon"], region: "Church of Dragon Communion" },
    ],
    [
      "CS/AD: Golden Rune [1] x6 - to SW, above breakable statue on cliff",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AD: Smithing Stone [7] x3 - breakable statue to SW",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AD: Smithing Stone [8] - breakable statue to SW",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/YAT: Smithing Stone [7] - E of YAT, by broken cart",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(YAR): Rimed Rowa x8 - in corner on SW side of middle ruins",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(YAR): Golden Rune [13] - middle of ruins",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(YAR): Stonesword Key - in tower NW ruins",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(YAR): Unendurable Frenzy - in chest underground",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/YAR: Hero's Rune [2] - NW of YAR, W of second big tree on fallen tree over cliff edge",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/YAR: Smithing Stone [8] - NW of YAR, right of big tree by small one",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/YAR: Thawfrost Boluses x2 - NW of YAR, on stump S side of second big tree",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/YAR: Crystal Dart x4 - NW of YAR, NE of big tree",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/YAR: Sanguine Noble Hood - invader drop NW of Yar, between big trees",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/YAR: Sanguine Noble Robe - invader drop NW of Yar, between big trees",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/YAR: Sanguine Noble Waistcloth - invader drop NW of Yar, between big trees",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AD: Golden Rune [7] - to SE on right cliff wall",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AD: Golden Rune [12] - to SE on cliff ledge",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(AD): Somber Ancient Dragon Smithing Stone - summon Latenna at her sister and talk to her",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AD: Somber Smithing Stone [9] - in chair to E",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(AD): Silver Mirrorshield - by Latenna's sister",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Rune [1] - graveyard to W",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Rune [3] - graveyard to W",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Rune [6] - graveyard to W",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Rune [9] - graveyard to W",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Rune [11] - graveyard to W",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Rotten Battle Hammer - enemy drop, graveyard to W",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Rotten Duelist Helm - enemy drop, graveyard to W",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Golden Rune [13] - to SW on right side of big tree",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Stalwart Horn Charm +1 - to SW on back side of big tree",
      { groups: ["Out of the Way", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Ancient Dragon Smithing Stone - night boss drop, following caravan to SW",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Night's Cavalry Helm - night boss drop, following caravan to SW",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Night's Cavalry Armor - night boss drop, following caravan to SW",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Night's Cavalry Gauntlets - night boss drop, following caravan to SW",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Night's Cavalry Greaves - night boss drop, following caravan to SW",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Flowing Curved Sword - in caravan chest to SW",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Map: Consecrated Snowfield - map pillar to N",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Ash of War: White Shadow's Lure - scarab to NW",
      { groups: ["Scarab", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Stonesword Key - to W in chair on cliff overlooking river",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Somber Ancient Dragon Smithing Stone - invader drop to NW middle of frozen river",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Rune Arc - SE side of town on balcony",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Golden Rune [13] - SW of evergaol on roof",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Hefty Beast Bone x3 - SE side of town under balcony behind boxes",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Golden Rune [13] - SW of evergaol between buildings",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Freezing Grease x2 - NW side of town middle of buildings",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/OLT: Cuckoo Glintstone x8 - on ruin to E",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Crystal Dart x5 - W side of town on platform by tower",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Old Fang x3 - SW of evergaol on right side of building",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/OLT: Slumbering Egg x3 - up stairs to NE, on left roof",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Golden Rune [12] - middle of NW tower",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Invigorating Cured Meat - on stairs to haligtree seal",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/OLT: Golden Rune [10] - up stairs to NE",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AD: Explosive Ghostflame - night boss drop to SE on frozen river",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/OLT: Golden Seed - seedtree SW of OLT",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Black Knife Hood - under stairs to haligtree seal",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Black Knife Armor - under stairs to haligtree seal",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Black Knife Gauntlets - under stairs to haligtree seal",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Black Knife Greaves - under stairs to haligtree seal",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Ghost Glovewort [9] - enemy drop in evergaol, NW side of town middle of buildings",
      { groups: ["Post Leyndell"], isMissable: true, region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Ghost Glovewort [9] - enemy drop in evergaol, S side of town by fog wall",
      { groups: ["Post Leyndell"], isMissable: true, region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Ghost Glovewort [9] - enemy drop in evergaol, up stairs from where the grace would be",
      { groups: ["Post Leyndell"], isMissable: true, region: "Consecrated Snowfield" },
    ],
    [
      "CS/(OLT): Ghost Glovewort [9] - enemy drop in evergaol, under stairs to haligtree seal",
      { groups: ["Post Leyndell"], isMissable: true, region: "Consecrated Snowfield" },
    ],
    [
      "CS/OLT: Rotten Greataxe - enemy drop NW of OLT",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/OLT: Rotten Duelist Greaves - enemy drop NW of OLT",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AD: Golden Rune [13] - to E, drop down",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Nomadic Warrior's Cookbook [23] - to N on torch hollow body",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/HPH: Golden Rune [13] - follow right path after exiting dungeon",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Rune [11] - to E, follow right path up cliff",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Somber Smithing Stone [8] - scarab to NE",
      { groups: ["Blizzard", "Scarab", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: St. Trina's Torch - in caravan chest to NE",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Rune [13] - enemy drop to NE, E of big tree",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Rune [13] - enemy drop to NE, NW of big tree",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Somber Smithing Stone [9] - to NE, NW of big tree on fallen tree",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CSC: Old Fang x2 - W of CSC",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CSC: Fire Blossom x6 - NW of CSC, after drop down to N",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AR: Miquella's Lily x3 - SW of AR a litte left of pillar",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Larval Tear - enemy drop to NE, N of big tree",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Seed - seedtree to NE next to big tree",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CS: Golden Rune [11] - to NE in grave near seedtree",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AR: Glintstone Craftsman's Cookbook [8] - SW of AR close by",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ME: Albinauric Bloodclot x2 - drop down twice NW of ME follow left cliff wall, right of dead-end drop off left cliff, left at end",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AR: Old Fang x3 - NW of AR halfway down gravestone drop downs",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CF: Strip of White Flesh x2 - W of CF on ice river",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ME: Dragonwound Grease x2 - W of ME below in camp",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ME: Nascent Butterfly x3 - drop down twice NW of ME follow left cliff wall, right of dead-end on ledge",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ICS: Smithing Stone [8] - to N, NE of map pillar behind tree",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ME: Somber Smithing Stone [7] - scarab W of ME below on rocks, SW scarab",
      { groups: ["Scarab", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ME: Somber Smithing Stone [8] - scarab W of ME below on rocks, NW scarab",
      { groups: ["Scarab", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ME: Somber Smithing Stone [9] - scarab W of ME below on rocks, E scarab",
      { groups: ["Scarab", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CSC: Hefty Beast Bone x2 - follow right cliff till small drop down, item 1",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CSC: Golden Rune [9] - follow right cliff till small drop down, item 2",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CSC: Lump of Flesh x4 - just down the path NW of CSC",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CSC: Somber Smithing Stone [8] - follow right cliff till small drop down, to NW top of stone tower",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/AR: Rune Arc - in chest SE of AR on cliff above",
      { groups: ["Blizzard", "Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(AR): Graven-Mass Talisman - top of rise, use Fanged Imp Ashes or bewitching branch to make spirit enemies fight",
      {
        groups: ["Rise", "Blizzard", "Post Leyndell"],
        isMissable: true,
        region: "Consecrated Snowfield",
      },
    ],
    [
      "CS/CF: Smithing Stone [8] x3 - breakable statue W of CF",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CF: Ancient Dragon Smithing Stone - E of CF on upper cliff",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/CF: Dragon Heart x3 - boss drop E of CF",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ME: Thorny Cracked Tear - boss drop N of ME",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/ME: Ruptured Crystal Tear - boss drop N of ME",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(ME): Tarnished Golden Sunflower x3 - on S side of erdtree",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CS/(ME): Warming Stone x4 - on NW root of erdtree",
      { groups: ["Post Leyndell"], region: "Consecrated Snowfield" },
    ],
    [
      "CL/CCO: Ritual Thrusting Shield - in colo behind Great-Jar",
      { groups: [], region: "Great-Jar" },
    ],
    ["CL/CCO: Great-Jar's Arsenal - beat Great-Jar's knights", { groups: [], region: "Great-Jar" }],
    ["CL/DW: Map: Dragonbarrow - map pillar to E", { groups: [], region: "Great-Jar" }],
    ["CL/DW: Golden Rune [5] - in lake to E", { groups: [], region: "Great-Jar" }],
    ["CL/DW: Gravel Stone - in lake to E", { groups: [], region: "Great-Jar" }],
    ["CL/DW: Sliver of Meat x3 - in lake to E", { groups: [], region: "Great-Jar" }],
    ["CL/SE: Smithing Stone [5] x3 - breakable statue to N", { groups: [], region: "Great-Jar" }],
    [
      "FL/FL: Drawstring Fire Grease x2 - to W",
      { groups: ["Post Leyndell"], region: "Forbidden Lands" },
    ],
    [
      "FL/FL: Golden Rune [7] - to E on broken pillar",
      { groups: ["Post Leyndell"], region: "Forbidden Lands" },
    ],
    [
      "FL/FL: Dragonwound Grease - to NE on pillar",
      { groups: ["Post Leyndell"], region: "Forbidden Lands" },
    ],
    [
      "FL/GLR: Somber Smithing Stone [7] - to S in skull just past seedtree",
      { groups: ["Post Leyndell"], region: "Forbidden Lands" },
    ],
    [
      "FL/FL: Ash of War: Phantom Slash - night boss drop to E",
      { groups: ["Post Leyndell"], region: "Forbidden Lands" },
    ],
    [
      "FL/GLR: Gargoyle's Black Blades - boss drop to S",
      { groups: ["Post Leyndell"], region: "Forbidden Lands" },
    ],
    [
      "FL/GLR: Gargoyle's Black Axe - boss drop to S",
      { groups: ["Post Leyndell"], region: "Forbidden Lands" },
    ],
    [
      "FL/GLR: Freezing Grease - to S around to right",
      { groups: ["Post Leyndell"], region: "Forbidden Lands" },
    ],
    [
      "FL/GLR: Golden Seed - seedtree to S",
      { groups: ["Post Leyndell"], region: "Forbidden Lands" },
    ],
    ["DB/(IMS): Spiked Caestus - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    ["DB/(IMS): Beast-Repellent Torch - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    ["DB/(IMS): Land of Reeds Helm - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    ["DB/(IMS): Land of Reeds Armor - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/(IMS): Land of Reeds Gauntlets - Isolated Merchant",
      { groups: [], region: "Dragonbarrow" },
    ],
    ["DB/(IMS): Land of Reeds Greaves - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    ["DB/(IMS): Sacrificial Twig x3 - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/(IMS): Festering Bloody Finger x8 - Isolated Merchant",
      { groups: [], region: "Dragonbarrow" },
    ],
    ["DB/(IMS): Dragonwound Grease x2 - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    ["DB/(IMS): Note: Hidden Cave - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    ["DB/(IMS): Note: Gateway - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    ["DB/(IMS): Ritual Pot - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    ["DB/(IMS): Lost Ashes of War x2 - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    ["DB/(IMS): Gravel Stone x10 - Isolated Merchant", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/IMS: Ash of War: Sky Shot - scarab W of IMS",
      { groups: ["Scarab"], region: "Dragonbarrow" },
    ],
    [
      "DB/(IMS): Gravity Stone Peddler's Bell Bearing - night boss drop",
      { groups: [], region: "Dragonbarrow" },
    ],
    ["DB/(SE): Battlemage Hugues - boss drop Evergaol", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/DW: Somber Smithing Stone [8] - scarab to NE",
      { groups: ["Scarab"], region: "Dragonbarrow" },
    ],
    ["DB/DT: Arteria Leaf x2 - chair circle S of DT", { groups: [], region: "Dragonbarrow" }],
    ["DB/DT: Dragonwound Grease - chair circle S of DT", { groups: [], region: "Dragonbarrow" }],
    ["DB/DT: Rune Arc - chair circle S of DT", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/DT: Somber Smithing Stone [9] - chair circle S of DT",
      { groups: [], region: "Dragonbarrow" },
    ],
    ["DB/(DT): Numen's Rune - layer 3, N side", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/FF: Smithing Stone [7] - on skull SW of FF item 1",
      { groups: [], region: "Dragonbarrow" },
    ],
    [
      "DB/FF: Smithing Stone [7] - on skull SW of FF item 2",
      { groups: [], region: "Dragonbarrow" },
    ],
    ["DB/FF: Stonesword Key - on skull SW of FF", { groups: [], region: "Dragonbarrow" }],
    ["DB/FF: Smithing Stone [8] - on skull SW of FF", { groups: [], region: "Dragonbarrow" }],
    ["DB/FF: Reed Great Katana - N of FF on top of mound", { groups: [], region: "Dragonbarrow" }],
    ["DB/FF: Dragon Heart x5 - enemy drop W of FF", { groups: [], region: "Dragonbarrow" }],
    ["DB/(FF): Golden Rune [12] - on fort rafters", { groups: [], region: "Dragonbarrow" }],
    ["DB/(FF): Neutralizing Boluses x2 - top of fort", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/(FF): Radagon's Soreseal - after rafters jump in room",
      { groups: [], region: "Dragonbarrow" },
    ],
    [
      "DB/(FF): Dectus Medallion (Right) - chest top of ladder",
      { groups: [], region: "Dragonbarrow" },
    ],
    [
      "DB/(FF): Golden Rune [9] - enemy drop 1 in lower room",
      { groups: [], region: "Dragonbarrow" },
    ],
    [
      "DB/(FF): Golden Rune [9] - enemy drop 2 in lower room",
      { groups: [], region: "Dragonbarrow" },
    ],
    [
      "DB/(FF): Golden Rune [9] - enemy drop 3 in lower room",
      { groups: [], region: "Dragonbarrow" },
    ],
    ["DB/FF: Golden Rune [9] - enemy drop SE of FF", { groups: [], region: "Dragonbarrow" }],
    ["DB/MEE: Opaline Hardtear - boss drop", { groups: [], region: "Dragonbarrow" }],
    ["DB/MEE: Stonebarb Cracked Tear - boss drop", { groups: [], region: "Dragonbarrow" }],
    [
      'DB/MEE: Ash of War: Rain of Arrows - "Redmane" Painting reward down hidden cliff E of MEE',
      { groups: [], region: "Dragonbarrow" },
    ],
    ["DB/MEE: Rune Arc - down hidden cliff E of MEE", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/LR: Bestial Constitution - scarab W of LR",
      { groups: ["Scarab"], region: "Dragonbarrow" },
    ],
    [
      "DB/FG: Somber Smithing Stone [9] - scarab to W",
      { groups: ["Scarab"], region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Ancient Dragon Smithing Stone - Gurranq, deathroot reward 9 or kill Gurranq",
      { groups: [], region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Gurranq's Beast Claw - Gurranq, deathroot reward 8",
      { groups: [], isMissable: true, region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Beastclaw Greathammer - Gurranq, deathroot reward 7",
      { groups: [], isMissable: true, region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Stone of Gurranq - Gurranq, deathroot reward 6",
      { groups: [], isMissable: true, region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Beast Claw (Incantation) - Gurranq, deathroot reward 5",
      { groups: [], isMissable: true, region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Ash of War: Beast's Roar - Gurranq, deathroot reward 4",
      { groups: [], isMissable: true, region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Bestial Vitality - Gurranq, deathroot reward 3",
      { groups: [], isMissable: true, region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Bestial Sling - Gurranq, deathroot reward 2",
      { groups: [], isMissable: true, region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Clawmark Seal - Gurranq, deathroot reward 1",
      { groups: [], isMissable: true, region: "Dragonbarrow" },
    ],
    [
      "DB/(BS): Beast Eye - Gurranq, deathroot reward 1 or kill Gurranq",
      { groups: [], region: "Dragonbarrow" },
    ],
    ["DB/BS: Gargoyle's Blackblade - boss drop SE of BS", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/BS: Gargoyle's Black Halberd - boss drop SE of BS",
      { groups: [], region: "Dragonbarrow" },
    ],
    [
      "DB/BS: Soft Cotton x3 - down cliff NW of BS, second layer",
      { groups: [], region: "Dragonbarrow" },
    ],
    [
      "DB/BS: Cinquedea - down cliff NW of BS, bottom layer",
      { groups: [], region: "Dragonbarrow" },
    ],
    [
      "DB/BS: Dragoncrest Shield Talisman - down cliff N of BS, bottom layer",
      { groups: ["Hidden"], region: "Dragonbarrow" },
    ],
    ["DB/BS: Golden Seed - seedtree SE of BS", { groups: [], region: "Dragonbarrow" }],
    ["DB/(LR): Memory Stone - in chest top of tower", { groups: ["Rise"], region: "Dragonbarrow" }],
    ["DB/FG: Dragon Heart - boss drop to S", { groups: [], region: "Dragonbarrow" }],
    ["DB/LR: Golden Rune [8] - graveyard SW of LR", { groups: [], region: "Dragonbarrow" }],
    ["DB/LR: Golden Rune [6] - graveyard SW of LR", { groups: [], region: "Dragonbarrow" }],
    ["DB/LR: Golden Rune [3] - graveyard SW of LR", { groups: [], region: "Dragonbarrow" }],
    ["DB/LR: Golden Rune [1] - graveyard SW of LR", { groups: [], region: "Dragonbarrow" }],
    [
      "DB/LR: Ash of War: Bloodhound's Step - night boss drop N of LR",
      { groups: [], region: "Dragonbarrow" },
    ],
    ["DB/FG: Starlight Shards - to NE", { groups: [], region: "Dragonbarrow" }],
    [
      "MotG/(GLR): Map: Mountaintops of the Giants, West - map pillar NE of GLR",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ZR: Iron Kasa - kill Shabriri, or on ground later",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ZR: Ronin's Armor - kill Shabriri, or on ground later",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ZR: Ronin's Gauntlets - kill Shabriri, or on ground later",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ZR: Ronin's Greaves - kill Shabriri, or on ground later",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(ZR): Sliver of Meat x2 - NW of ZR middle of upper hill",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ZR: Invigorating Cured Meat - to SE by ruin",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(ZR): Golden Rune [10] - NW of ZR over looking GLR by tree",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(ZR): Zamor Ice Storm - middle of ruins",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GLR): Beast Blood x2 - S of GLR over wall",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(ZR): Smithing-Stone Miner's Bell Bearing [3] - in chest underground",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(ZR): Smoldering Butterfly x4 - NE of ZR by left tree before drop down to long bridge area",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ZR: Somber Smithing Stone [7] - scarab to SE in tree",
      { groups: ["Scarab", "Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GMC): Lost Ashes of War - N of GMC in chair on left of bridge",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GMC): Arteria Leaf x3 - to NW of GMC on ledge",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GMC): Briars of Punishment - to NW of GMC by tree",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SR: Greathood - Painting reward NW of SR on bridge",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Warming Stone x3 - on golem bodies, item 1",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Invigorating White Cured Meat - on golem bodies, item 2",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Smithing Stone [7] - by golem bodies",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Traveling Maiden Hood - in shack",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Traveling Maiden Robe - in shack",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Traveling Maiden Gloves - in shack",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Traveling Maiden Boots - in shack",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SL: Hoslow's Petal Whip - invade Juno Hoslow",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SL: Hoslow's Helm - invade Juno Hoslow",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SL: Hoslow's Armor - invade Juno Hoslow",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SL: Hoslow's Gauntlets - invade Juno Hoslow",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SL: Hoslow's Greaves - invade Juno Hoslow",
      { groups: ["Post Leyndell"], isMissable: true, region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/CSMG: Death Ritual Spear - boss drop to W by statue",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/CSMG: Starlight Shards - to W by statue",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ASVR: Golden Rune [7] - to SW on right side of bridge, near end",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ASVR: Drawstring Holy Grease x2 - to SW on right side of bridge, on ground",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ASVR: Rainbow Stone x4 - to SW on right side of bridge, by wall",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ASVR: Golden Rune [13] - to SW to right before bridge",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Vagabond Knight Helm - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Vagabond Knight Armor - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Vagabond Knight Gauntlets - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Vagabond Knight Greaves - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Rune Arc x3 - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Thawfrost Boluses x10 - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Stonesword Key x3 - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SL): Missionary's Cookbook [7] - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SR: Somber Smithing Stone [9] - SE of SR on bridge",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SR): Freezing Grease x2 - SE corner of ruins",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ASVR: Formic Rock x2 - to SE by rock",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ASVR: Soft Cotton x6 - to S on left by broken pillar",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ME: Golden Rune [10] - S of ME",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/ASVR: Somber Smithing Stone [8] - scarab to S",
      { groups: ["Scarab", "Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(SR): Primal Glintstone Blade - in chest underground behind jellyfish seal",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Haligtree Secret Medallion (Left) - after boss",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Veteran's Prosthesis - mainboss drop",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      'MotG/(CS): "Sorcerer" Painting - painting NW of main gate, inside up ladder, follow SW path across bridge, down ladder',
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Freezing Grease x5 - NE of main gate on NW end of wooden platform ",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Golden Rune [10] - SE of main gate in corner",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Smithing Stone [5] - E of main gate under wood platform",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Fan Daggers x5 - NW of main gate, inside up ladder near top",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Golden Rune [10] - NW of main gate, inside up ladder, to SW at corner",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Golden Rune [10] - N of church across bridge up stairs",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Nascent Butterfly - NW of main gate, inside by ladder",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Cerulean Amber Medallion +1 - up ladder S of church, on wood platform at end of outerwall path",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Smithing Stone [7] x3 - drop down S of church, inside to SW ",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Smithing Stone [5] - up ladder NE of church, to SE on ledge",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Smithing Stone [6] - inside E of church",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Somber Smithing Stone [8] - up ladder S of church, drop off outerwall to S, to W on ledge",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SVRO: Golden Rune [10] - to W on right side of path",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SVRO: Human Bone Shard x5 - to W on right side of path behind tree stump",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SVRO: Golden Rune [11] - to W on left side of path by tree stump",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Thawfrost Boluses x3 - under tent N of wood platform E of main gate",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Furlcalling Finger Remedy - under bridge to shortcut elevator",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Smithing Stone [6] - NW of main gate, inside up ladder, follow SW path across bridge, near top of ladder",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Thawfrost Boluses - N of church on wall",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Somber Smithing Stone [8] - S of church, up wall along edge of church to N",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Golden Rune [9] - up ladder NE of church, N across bridge",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Rune Arc - drop down S of church",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Stormhawk Axe - NW of main gate, inside up ladder, follow SW path across bridge, over E wall",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SVRO: Golden Rune [10] - to W on left side of path",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Stonesword Key - up ladder NE of church, follow N path, top of outerwall",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Eclipse Shotel - by church altar",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SVRO: Helphen's Steeple - enemy drop to W in lower area overlooking CS",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SVRO: Deathroot - enemy drop to W in lower area overlooking CS",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Somber Smithing Stone [7] - enemy drop N of main gate",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Beast Blood - enemy drop N of main gate",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Old Fang x2 - enemy drop N of main gate",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Somber Smithing Stone [7] - enemy drop SE of main gate",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Beast Blood - enemy drop SE of main gate",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Old Fang x2 - enemy drop SE of main gate",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/GG: Ash of War: Prelate's Charge - scarab E of GG high on thorn",
      { groups: ["Scarab", "Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GG): Smoldering Butterfly x5 - drop down NE from highest tower end of platform",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GG): Smithing Stone [7] - NE end of upper floor",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GG): Golden Rune [10] - NW lower platform overlooking MotG",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GG): Smoldering Butterfly x6 - under wooden walkway",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/GG: Golden Rune [8] - SE of GG by tall thorn",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/GG: Stonesword Key - SE of GG by group of enemies",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GG): One-Eyed Shield - hostile npc drop highest tower",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GG): Gravel Stone x2 - drop down NE from highest tower, jump back over wall and follow right side",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(GG): Giant's Prayerbook - in chest top of highest tower",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(ME): Cerulean Crystal Tear - boss drop",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(ME): Crimson Bubbletear - boss drop",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/WR: Explosive Greatbolt x5 - to NE by end of walls",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(ME): Rune Arc - on minor edrtree's W roots",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/SVRO: Stimulating Boluses x3 - to NE on broken bridge",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(HR): Thawfrost Boluses x2 - below tower to left",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(HR): Old Fang x5 - middle of outer tower",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FR: Golden Seed - seedtree to SW",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FR: Smithing Stone [7] x3 - breakable statue to S below",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(HR): Founding Rain of Stars - in chest after crossing invisible bridge",
      { groups: ["Rise", "Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Golden Rune [4] - up ladder S of church, drop off outerwall to S, in graveyard to NE",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Golden Rune [5] - up ladder S of church, drop off outerwall to S, in graveyard to NE",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(CS): Golden Rune [10] - up ladder S of church, drop off outerwall to S, in graveyard to NE",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(LCE): Fingerprint Helm - boss drop Evergaol",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(LCE): Fingerprint Armor - boss drop Evergaol",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(LCE): Fingerprint Gauntlets - boss drop Evergaol",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(LCE): Fingerprint Greaves - boss drop Evergaol",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(LCE): Vyke's Dragonbolt - boss drop Evergaol",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FCM: Somber Smithing Stone [8] - NW of FCM on ice lake",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FCM: Golden Rune [10] - graveyard W of FCM",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/LCE: Golden Rune [12] - balloon drop N of LCE",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/LCE: Golden Rune [12] - balloon drop NW of LCE",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/HR: Golden Rune [12] - balloon drop S of HR",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FCM: Golden Rune [7] 1 - graveyard W of FCM",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FCM: Golden Rune [7] 2 - graveyard W of FCM",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FR: Ash of War: Seppuku - scarab to E",
      { groups: ["Scarab", "Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FR: Golden Rune [11] - to E on top of hill",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FCM: Smithing Stone [7] x3 - on hill E of FCM",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(FCM): Somberstone Miner's Bell Bearing [3] - out front of church",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/(FCM): Sacred Tear - by statue",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    [
      "MotG/FR: Dragon Heart - boss drop to SE",
      { groups: ["Post Leyndell"], region: "Mountaintops of the Giants" },
    ],
    ["CL/(RC): Ruins Greatsword - boss drop", { groups: [], region: "Redmane Castle Post Radahn" }],
    ["CL/(WD): Radahn's Spear x4 - in desert, N of RC", { groups: [], region: "Wailing Dunes" }],
    ["CL/(WD): Radahn's Spear x6 - in desert, N of RC", { groups: [], region: "Wailing Dunes" }],
    ["CL/(WD): Radahn's Spear x10 - in desert, N of RC", { groups: [], region: "Wailing Dunes" }],
    ["CL/(WD): Radahn's Great Rune - mainboss drop", { groups: [], region: "Wailing Dunes" }],
    [
      "CL/(WD): Remembrance of the Starscourge - mainboss drop",
      { groups: [], region: "Wailing Dunes" },
    ],
    [
      "CL/(WD): Leontiel's Greatsword - in desert, invader drop N of SR",
      { groups: [], region: "Wailing Dunes" },
    ],
    [
      "CL/(WD): Leontiel's Hat - in desert, invader drop N of SR",
      { groups: [], region: "Wailing Dunes" },
    ],
    [
      "CL/(WD): Leontiel's Armor - in desert, invader drop N of SR",
      { groups: [], region: "Wailing Dunes" },
    ],
    [
      "CL/(WD): Leontiel's Leather Gloves - in desert, invader drop N of SR",
      { groups: [], region: "Wailing Dunes" },
    ],
    [
      "CL/(WD): Leontiel's Boots - in desert, invader drop N of SR",
      { groups: [], region: "Wailing Dunes" },
    ],
    [
      "FP/GCHG: Somber Smithing Stone [7] - E of GCHG, to S after jump",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GCHG: Somber Smithing Stone [7] - enemy drop E of GCHG by jump",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GCHG: Somber Smithing Stone [7] - enemy drop E of GCHG, to SE after jump",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/CR: Ancient Dragon Smithing Stone - SE of CR in skull",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Smithing Stone [7] - close to NW",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GCHG: Drawstring Holy Grease x2 - E of GCHG, to E after jump near rocks",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/(CR): Rivers of Blood - invader drop",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    ["FP/(CR): Okina Mask - invader drop", { groups: ["Post Leyndell"], region: "Flame Peak" }],
    [
      "FP/CR: Ash of War: Troll's Roar - SE of CR on top of skull",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Somber Smithing Stone [8] - scarab to W",
      { groups: ["Scarab", "Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/(CR): Sacred Tear - by statue",
      { groups: ["Out of the Way", "Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GG: Warming Stone x2 - to SW middle of path",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/CR: Somber Smithing Stone [7] 1 - enemy drop N of CR, group of 3 on rock",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/CR: Somber Smithing Stone [7] 2 - enemy drop N of CR, group of 3 on rock",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/CR: Somber Smithing Stone [7] 3 - enemy drop N of CR, group of 3 on rock",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GCHG: Somber Smithing Stone [7] - enemy drop E of GCHG, to E after jump under arch",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GCHG: Somber Smithing Stone [7] - enemy drop E of GCHG, to E after jump by rock",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GCHG: Invigorating White Cured Meat x3 - E of GCHG, to E by small tree",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GG: Fan Daggers x5 - to SW middle of path",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GG: Somber Smithing Stone [7] - enemy drop to SW on cliff",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GCHG: Somber Smithing Stone [7] - enemy drop E of GCHG, to E behind tree giant",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GG: Somber Smithing Stone [7] - enemy drop to W, enemy up on ledge",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/GG: Somber Smithing Stone [7] - enemy drop to W, lower enemy",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Remembrance of the Fire Giant - mainboss drop",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Golden Rune [10] - to N in alcove",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    ["FP/FF: Golden Seed - seedtree to NE", { groups: ["Post Leyndell"], region: "Flame Peak" }],
    [
      "FP/GG: Map: Mountaintops of the Giants, East - map pillar",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Crimsonwhorl Bubbletear - in basin overlooking chain from MotG, follow N path to lower area",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Grace Mimic x3 - down N path, in lower alcove on right",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Golden Rune [10] - down N path, on rock left of lower alcove",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Golden Rune [10] - down N path, NE of lower alcove on ground",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Starlight Shards - to NE past seedtree by statue",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Somber Smithing Stone [7] - enemy drop near basin overlooking chain from MotG, follow N path to lower area",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "FP/FF: Somber Smithing Stone [7] - enemy drop to NE past seedtree near statue",
      { groups: ["Post Leyndell"], region: "Flame Peak" },
    ],
    [
      "ARR/CBME: Rauh Ruins Spiritspring Stone - drop to E till cliff then up ledge to N",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/CBME: Remembrance of the Saint of the Bud - mainboss drop",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Scadutree Fragment - to W up stairs, by NW monument",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/CBME: Four-Toed Fowl Foot x3 - to N downstairs, outside to S, drop right of elevator, forward 2 down 1",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Spiritgrave Stone x2 - to W up stairs, down left hall",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/CMBE: Talisman of All Crucibles - in chest to N downstairs, outside to S, drop right of elevator, follow path to elevator, continue down S pillar walkway, inside hole on left",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Spirit Calculus x3 - enemy drop to W up stairs, on right",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Greater Potentate's Cookbook [9] - to W up stairs, outside to N, rot area, right path, right room, outside to NE",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Revered Spirit Ash - to W up stairs, outside to N in gazebo",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Dappled White Cured Meat x2 - to W up stairs, outside to N, rot area, end of long hallway",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Immunizing Cured Meat x3 - to W up stairs, outside to N, rot area, right path, right room, 2 items",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/CBME: Shadow Realm Rune [4] - to N downstairs, outside to SE on lower gazebo",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/CBME: Pest-Thread Spears - to N downstairs, under stairs",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Knot Resin x3 - to W up stairs, outside to N, down right of rot area, down left path by pillar",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Smithing Stone [8] x6 - to W up stairs, outside to N, rot area, right path, right room left item",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Fly Mold x4 - to W up stairs, outside to N, rot area, right path, right room 2 items",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/CBME: Scarlet Bud x6 - to N downstairs, to left",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Divine Bird Feathers - to W up stairs, down left hall up elevator, by gazebo to N",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Silver Horn Tender - enemy drop to W up stairs, outside to N, down right of rot area, down left path, up elevator, SE enemy",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Revered Spirit Ash - enemy drop to W up stairs, outside to N, down right of rot area, down left path, up elevator, SE enemy",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Somber Smithing Stone [9] - to W up stairs, outside to N, down right of rot area, down left path, lowest area W of tower on rocks",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    ["ARR/RARW: Kukri x6 - to W on stairs", { groups: ["DLC"], region: "Ancient Ruins of Rauh" }],
    [
      "ARR/ARGS: Spirit Calculus - to SE down below, use stairs to NE",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/ARGS: Smithing Stone [7] x3 - to NE down stairs on right side",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Golden Horn Tender - to W up stairs, outside to N, down right of rot area, right across bridge middle of pillars",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/ARGS: Shadow Realm Rune [7] - to NE, NE side of lower bridge",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Sacred Bloody Flesh x5 - enemy drop to W up stairs, outside to N, down right of rot area, right across bridge middle of pillars",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARE: Shadow Realm Rune [7] - to NW, up root on right side",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARE: Flight Pinion x2 - to SW on bridge",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARW: Aspects of the Crucible: Bloom - to W up stairs, outside to N, down right of rot area, down left path, lowest area in tower",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Broken Rune - down SW path, go right, left at door, below by pillar",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    ["ARR/RARE: Dewgem x4 - to SW on bridge", { groups: ["DLC"], region: "Ancient Ruins of Rauh" }],
    [
      "ARR/VMT: Rauh Burrow x5 - down SW path, go right, left at door, down below through door",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARE: Devonia's Hammer - enemy drop to NW on rock",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARE: Crucible Hammer-Helm - enemy drop to NW on rock",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/ARGS: Divine Beast Tornado - boss drop to NE",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Scadutree Fragment - enemy drop to SE down elevator follow path, left at intersection, to S in pond",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Throwing Dagger x5 - E corner of giant room second floor",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Shadow Realm Rune [6] - down W hall from giant room second floor, behind drop down",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Spider Scorpion Ashes -  NE of giant room second floor, left at intersection, under light beams",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Somber Smithing Stone [9] - down SW path, go right up roots",
      { groups: ["DLC", "Out of the Way"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Fire Spritestone - down SW path, go right, left at door, by drop ledge",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Somber Smithing Stone [8] - on rocks in sandy room NW of giant room second floor",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Dewgem x2 - NE of giant room second floor, right at intersection, on left",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Thin Beast Bones x8 - to SE down elevator follow path, left at intersection, to NW on ledge",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Sliver of Meat x2 - NE of giant room second floor, left at intersection, under light beams",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Scorpion Liver x3 - NE of giant room second floor, left at intersection, under light beams",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Glass Shard - NE of giant room second floor, left of intersection",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARE: Ash of War: Dryleaf Whirlwind - to NE behind pillar",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARE: Scadutree Fragment - by cross",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Silver Horn Tender - enemy drop down SW path, NW enemy down stairs",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Revered Spirit Ash - enemy drop down SW path, NW enemy down stairs",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Spirit Calculus x3 - enemy drop down SW path, go right, left at door, SW enemy below",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Golden Horn Tender - enemy drop in W hall from giant room second floor",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Scadutree Fragment - enemy drop in W hall from giant room second floor",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARE: Ancient Ruins Cross Message - near cross",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Antiquity Scholar's Cookbook [2] - to N, head left then drop down into pit",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Shadow Realm Rune [5] - to N, head left then drop down into pit, SW through illusory wall",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Bondstone - to N, head left then drop down into pit",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Somber Smithing Stone [8] - to SE down elevator follow path, right at intersection",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Sacred Bloody Flesh x3 - to SE down elevator follow path, right at intersection",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Golden Horn Tender - to N, behind entrance building to E",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Spirit Calculus - to SE on pillar behind elevator",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/CBME: Beast Horn x2 - up sealed spiritspring, on SW pillar walkway, seal is to N downstairs, outside to left",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/CBME: Mottled Necklace +2 - in chest up sealed spiritspring, top of stairs, seal is to N downstairs, outside to left",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARE: Crimson-Sapping Cracked Tear - furnace golem to SE",
      { groups: ["DLC", "Furnace Golem"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/RARE: Furnace Visage - furnace golem to SE",
      { groups: ["DLC", "Furnace Golem"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "ARR/VMT: Fine Crucible Feather Talisman - down W hall from giant room second floor, right at intersection, up on roots",
      { groups: ["DLC"], region: "Ancient Ruins of Rauh" },
    ],
    [
      "RB/(TTR): Rauh Base Spiritspring Stone - stone to E",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/SRC: Greater Potentate's Cookbook [8] - N of SRC on pile of brown",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    ["RB/RN: Roar of Rugalea - boss drop to NW", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/SRC: Ghost Glovewort [6] - just N of SRC", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/RN: Larval Tear - blue graves to W", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/RN: Leather Headband - to NW, SE of boss", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/RN: Gloried Attire - to NW, SE of boss", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/RN: Leather Arm Wraps - to NW, SE of boss", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/RN: Leather Leg Wraps - to NW, SE of boss", { groups: ["DLC"], region: "Rauh Base" }],
    [
      "RB/RN: Beast Blood x2 - to NW, on pile of rock in N forest",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/RN: Lump of Flesh x3 - to NW, on pile of rock in N forest",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/RN: Throwing Dagger x5 - to NW, on pile of rock in N forest",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    ["RB/TTR: Grave Glovewort [8] - to S by gravestones", { groups: ["DLC"], region: "Rauh Base" }],
    [
      "RB/TTR: Smithing Stone [7] x3 - to N up spiritspring, on wall",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TTR: Gravebird's Blackquill Armor - to N, up hill left of rot area by arch",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TTR: Whiteflesh Mushroom x5 - to N on right by spiritspring",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TTR: Preserving Boluses x2 - to N, N side of pillar in rot area",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TTR: Beast Horn x2 - in chest to N up spiritspring, middle of ruin",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/RN: Ash of War: The Poison Flower Blooms Twice - scarab to S",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TTR: Map: Rauh Ruins - map pillar to E behind wall",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/(TTR): Arrow x10 - lon left after crossing arch bridge",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    ["RB/(TTR): Beast Blood x3 - SE corner of courtyard", { groups: ["DLC"], region: "Rauh Base" }],
    [
      "RB/(TTR): Scadutree Fragment - hanging off lower level of bridge",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/(TTR): Spiritgrave Stone x3 - under TTR arch in corner",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/(TTR): Somber Smithing Stone [6] - NW corner of courtyard",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/(TTR): Smithing Stone [5] x6 - on ruin E side of TTR",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    ["RB/TTR: Revered Spirit Ash - S of TTR", { groups: ["DLC"], region: "Rauh Base" }],
    [
      "RB/(TTR): Two-Handed Sword Talisman - in chest top of ruins",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TTR: Divine Bird Warrior Ornis - in chest to N up spiritspring, through cave",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/(TTR): Silver Horn Tender - enemy drop to S after going up first stairs",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/(TTR): Rauh Burrow x4 - enemy drop to S after going up first stairs",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/ARB: Smithing Stone [8] x4 - to SW, up on a hill right side of ravine, NW of FRC below",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/ARB: Larval Tear - blue graves to SW overlooking FRC",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TTR: Antiquity Scholar's Cookbook [1] - enemy drop in cave NE of rot area",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TTR: Fire Spritestone x3 - enemy drop in cave NE of rot area",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/ARB: Rauh Burrow - to SW on ground just past some pillars",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    ["RB/ARB: Rauh Burrow - to SW on ruin close by", { groups: ["DLC"], region: "Rauh Base" }],
    [
      "RB/ARB: Sacred Bloody Flesh x5 - to NW, in cave near W side of bridge",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TRF: Sanguine Amaryllis x5 - W of TRF, middle of pond",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TRF: Smithing Stone [7] x4 - W of TRF, N side of pond",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TRF: Sacred Bloody Flesh x3 - W of TRF, N side of pond",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/ARB: Shadow Realm Rune [3] - to NW, under W side of bridge",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/ARB: Pearl Shield Talisman - in chest to W within camp",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TRF: Bloodfiend's Sacred Spear - enemy drop W of TRF, in pond",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/ARB: Sacred Bloody Flesh x5 - enemy drop to NW, in cave near W side of bridge",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/ARB: Ash of War: Scattershot Throw - scarab to NE, on pillar",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/TRF: Somber Smithing Stone [9] - scarab back right corner of TRF",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    [
      "RB/ARB: Somber Smithing Stone [7] - scarab to NE, middle of path",
      { groups: ["DLC"], region: "Rauh Base" },
    ],
    ["RB/(NNM): Red Bear's Claw - boss drop", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/(NNM): Iron Rivet Armor - boss drop", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/(NNM): Iron Rivet Gauntlets - boss drop", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/(NNM): Iron Rivet Greaves - boss drop", { groups: ["DLC"], region: "Rauh Base" }],
    ["RB/(NNM): Fang Helm - boss drop", { groups: ["DLC"], region: "Rauh Base" }],
    [
      'RB/NNM: Spiraltree Seal - "The Sacred Tower" Painting reward SW of NNM',
      { groups: ["DLC"], isMissable: true, region: "Rauh Base" },
    ],
    [
      "CC/CCW: Grave Keeper's Cookbook [1] - to E by giant tree",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    ["CC/CCW: Dancing Blade of Ranah - boss drop", { groups: ["DLC"], region: "Cerulean Coast" }],
    ["CC/CCW: Dancer's Hood - boss drop", { groups: ["DLC"], region: "Cerulean Coast" }],
    ["CC/CCW: Dancer's Dress - boss drop", { groups: ["DLC"], region: "Cerulean Coast" }],
    ["CC/CCW: Dancer's Bracer - boss drop", { groups: ["DLC"], region: "Cerulean Coast" }],
    ["CC/CCW: Dancer's Trousers - boss drop", { groups: ["DLC"], region: "Cerulean Coast" }],
    [
      "CC/CCW: Lost Ashes of War - to E in middle of lake",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCW: Shadow Realm Rune [3] - to E by grafted gravestone",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCW: String x3 - to E by grafted gravestone",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCW: Spiritgrave Stone x2 - to E by small gravestone",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCW: Crab Eggs x2 - to S inside hidden cave, left route towards mausoleum",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCW: Somber Smithing Stone [6] - to S inside hidden cave, right route",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCW: Perfumed Oil of Ranah - to S after hidden cave left route on top of hill",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    ["CC/CCW: Grave Glovewort [6] - to N by graves", { groups: ["DLC"], region: "Cerulean Coast" }],
    [
      "CC/CCW: Great Grave Glovewort - to E at end of hidden cave right route",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCW: Grave Glovewort [8] - to NE on giant coffin",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    ["CC/CCW: Star-Lined Sword - boss drop", { groups: ["DLC"], region: "Cerulean Coast" }],
    [
      "CC/CCW: Great Grave Glovewort - to N through ravine, on giant coffin",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: St. Trina Disciple's Cookbook [2] - to S, on corpse on fissure cliffside",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: Shadow Realm Rune [1] - to S on corpse inside fissure",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: Grave Glovewort [8] - to SW, on giant coffin",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: Deep-Purple Lily x3 - to S on corpse inside fissure",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    ["CC/CCC: Hefty Cracked Pot - enemy drop to S", { groups: ["DLC"], region: "Cerulean Coast" }],
    [
      "CC/CCC: Whiteflesh Mushroom x4 - to S, on path towards fissure",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    ["CC/CCW: Grave Glovewort [7] - to E on corpse", { groups: ["DLC"], region: "Cerulean Coast" }],
    [
      "CC/CC: Grave Glovewort [9] - to SW on giant coffin",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCW: Spirit Sword - to NE, on corpse by grafted graves in ravine",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CC: Grave Glovewort [9] - to S, on giant coffin",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CC: Smithing Stone [6] x4 - to NE, on corpse by grafted gravestone",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CC: Starlight Shards - enemy drop to NE in ravine by grafted gravestone",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCW: Scadutree Fragment - to N, in small cave through ravine",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: Map: Southern Shore - map pillar to N on path",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: St. Trina Disciple's Cookbook [1] - to N, on corpse under tree",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: Grave Glovewort [9] - to N on giant coffin",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: Great Grave Glovewort - to NE on giant coffin before beach",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: Grave Glovewort [9] - to NW on giant coffin",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    ["CC/CCC: Scadutree Fragment - by cross", { groups: ["DLC"], region: "Cerulean Coast" }],
    ["CC/CC: Dragon Heart - boss drop", { groups: ["DLC"], region: "Cerulean Coast" }],
    [
      "CC/CC: Somber Ancient Dragon Smithing Stone - boss drop",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    ["CC/CC: Grave Cricket x6 - to S on corpse 1", { groups: ["DLC"], region: "Cerulean Coast" }],
    [
      "CC/CCC: Great Grave Glovewort - to NE, on giant coffin on beach",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CC: Smithing Stone [7] x4 - to S on corpse",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    ["CC/CC: Grave Cricket x6 - to S on corpse 2", { groups: ["DLC"], region: "Cerulean Coast" }],
    ["CC/CC: Human Bone Shard - to S on corpse", { groups: ["DLC"], region: "Cerulean Coast" }],
    [
      "CC/CCC: Arrow x10 - to NE, on corpse in water on beach",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CC/CCC: Smithing Stone [6] x3 - to NE, on corpse on hill before FRR",
      { groups: ["DLC"], region: "Cerulean Coast" },
    ],
    [
      "CHG/CHG: Glovewort Crystal Tear - furnace golem to W above river",
      { groups: ["DLC", "Furnace Golem"], isMissable: true, region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Fireproof Pickled Liver - to W at top of river",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Gravebird Ashes - to W, after spirit spring",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Furnace Visage - furnace golem to W above river",
      { groups: ["DLC", "Furnace Golem"], isMissable: true, region: "Charo's Hidden Grave" },
    ],
    ["CHG/LG: Ghost Glovewort [8] - NW of LG", { groups: ["DLC"], region: "Charo's Hidden Grave" }],
    [
      "CHG/CHG: Ghost Glovewort [9] - to NW by multiple statues",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Greater Potentate's Cookbook [14] - to SW on wooden boards",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Ash of War: Ghostflame Call - boss drop to NW in lake",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Grave Glovewort [9] - to NW in pond by statues",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Ghostflame Bloom x4 - to W in pond with giant gravestone",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Scadutree Fragment - enemy drop to W in pond by giant gravestone",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Tibia's Cookbook - enemy drop to SW in river",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Great Grave Glovewort - to SE on giant coffin after drop",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Call of Tibia - to NE by graves",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Grave Glovewort [9] - to NE by large grave",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Rings of Spectral Light - to NE at giant gravebird statue",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Spirit Glaive - to N at end of path",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "CHG/CHG: Grave Keeper's Cookbook [2] - to SE at end of river",
      { groups: ["DLC"], region: "Charo's Hidden Grave" },
    ],
    [
      "ER/ERC: Silver Horn Tender - to NW on corpse pile",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/ERC: Fly Mold x3 - to NW in alcove on right after EG",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/RC: Mushroom-Seller's Bell Bearing [1] - hanging pot W of RC",
      { groups: ["DLC", "Hidden"], region: "Ellac River" },
    ],
    [
      "ER/RC: Two-Headed Turtle Talisman - NE of RC under waterfall",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/ERD: Thin Beast Bones x6 - to NE behind rock pillar",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/ERD: Mushroom-Seller's Bell Bearing [2] - hanging pot to SE hanging on rock infront of waterfall",
      { groups: ["DLC", "Hidden"], region: "Ellac River" },
    ],
    [
      "ER/ERC: Greater Potentate's Cookbook [12] - to S on rock pillars",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/ERC: Somber Smithing Stone [6] - to S middle of pillar path",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/ERC: Somber Ancient Dragon Smithing Stone - to S down below after rock pillars",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/ERC: Smithing Stone [8] x3 - enemy drop to S down below after rock pillars",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/ERC: Shadow Realm Rune [2] - to NW on rock under EG",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    ["ER/ERC: Revered Spirit Ash - to NE by statue", { groups: ["DLC"], region: "Ellac River" }],
    [
      "ER/ERC: Horned Bairn - enemy drop to NW under EG",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/ERD: Viridian Hidden Tear - furnace golem to SE",
      { groups: ["DLC", "Furnace Golem"], region: "Ellac River" },
    ],
    [
      "ER/ERD: Forager Brood Cookbook [3] - given by friendly Kindred of Rot to SE, NE corner of cliffs",
      { groups: ["DLC"], isMissable: true, region: "Ellac River" },
    ],
    [
      "ER/ERD: Yellow Fulgurbloom x3 - given by friendly Kindred of Rot to SE, NE corner of cliffs",
      { groups: ["DLC"], isMissable: true, region: "Ellac River" },
    ],
    [
      "ER/ERD: Lightning Perfume Bottle - to SE in lake",
      { groups: ["DLC"], region: "Ellac River" },
    ],
    [
      "ER/ERD: Furnace Visage - furnace golem to SE",
      { groups: ["DLC", "Furnace Golem"], region: "Ellac River" },
    ],
    [
      "SA/ARR: Redflesh Mushroom - E side of imbued sword key area by pillar",
      { groups: ["DLC"], region: "Rauh Ruins Limited" },
    ],
    [
      "SA/ARR: Beast Horn x2 - NW side of imbued sword key area on rock left of waterfall",
      { groups: ["DLC"], region: "Rauh Ruins Limited" },
    ],
    [
      "SA/ARR: Verdigris Discus - NE side of imbued sword key area by altar",
      { groups: ["DLC"], region: "Rauh Ruins Limited" },
    ],
    [
      "SA/(MR): Scaduview Cross Spiritspring Stone - stone to SE",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(RR): Rabbath's Rise Spiritspring Stone - stone to S",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SK/SKMG: Aspects of the Crucible: Thorns - boss drop",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Lacerating Crossed-Tree - given by Leda after invading Hornsent alongside her",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/HC: Retaliatory Crossed-Tree - given by Leda after invading Ansbach alongside her",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CC): Prayer Room Key - invader drop",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CC): Ash of War: Flame Skewer - invader drop",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/HC: New Cross Map - given by Hornsent",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/HC: Shadow Realm Rune [2] - to SW in a spire below warp",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Starlight Shards - to SW down in upper area of CE, jump over to SW by statue",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Carian Sorcery Sword - in chest to SW down in upper area of CE, back left corner",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/SAW: Grave Glovewort [8] - to S by grave down below, cross river and head down",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Smithing Stone [8] x9 - enemy drop to NW down in river",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/CC: Larval Tear - blue graves S of CC", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/CC: Forager Brood Cookbook [4] - N of CC, given by friendly Kindred of Rot after you heal it",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/CC: Shadow Sunflower x3 - N of CC, given by friendly Kindred of Rot after you heal it",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    ["SA/(CC): Rune Arc - left of statue", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/(CC): Scadutree Fragment x2 - by statue", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/RFSP: Forager Brood Cookbook [1] - given by friendly Kindred of Rot NW of RFSP",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/RFSP: Glintslab Firefly x3 - given by friendly Kindred of Rot NW of RFSP",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/RFSP: Ash of War: Piercing Throw - scarab E of RFSP",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/RFSP: Somber Smithing Stone [8] - scarab NE of RFSP",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/RFSP: Somber Smithing Stone [8] - scarab SE of RFSP",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Shadow Realm Rune [2] - to SW in pond by tree",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Hefty Beast Bone x4 - to SW in pond by fallen tree",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/MR: Lump of Flesh x2 - to SW in pond, E side", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/RFSP: Ghost Glovewort [7] - NW of RFSP", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/HC: Scadutree Fragment - by cross", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/HC: Map: Scadu Altus - map pillar to N", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/HC: Black Pyrefly x3 - to N at entrance to camp",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/HC: Monk's Missive - to N by cross", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/MR: Scadutree Fragment - to W by statue in camp",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Crimsonburst Dried Tear - furnace golem to N",
      { groups: ["DLC", "Furnace Golem"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Battlefield Priest's Cookbook [3] - to N last left big tent of camp",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Ash of War: Rolling Sparks - scarab to N in upper E camp",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Golden Vow x2 - to N in upper W camp, left in tent",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Somber Smithing Stone [7] - to N in upper E camp, in top tent",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Perfumer's Bolt x20 - to N in upper E camp, in top tent",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Ember of Messmer x6 - to N near last right tents of camp",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Drawstring Messmerfire Grease - to N middle of camp on left side",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Smithing Stone [7] x2 - to NE, through cave, by third arch in cave",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Shadow Sunflower x2 - to N in upper E camp, by lower tents",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Shadow Realm Rune [4] - to N in last left tent of camp",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Scadutree Fragment - to N by statue right of entrance",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Furnace Visage - furnace golem to N",
      { groups: ["DLC", "Furnace Golem"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Black Steel Twinblade - enemy drop to N in upper W camp, top area",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Battlefield Priest's Cookbook [2] - in chest to S inside, very top of tower",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/MR: Dragon Heart - boss drop to S", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/MR: Somber Ancient Dragon Smithing Stone - boss drop to S",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Ash of War: Aspects of the Crucible: Wings - boss drop to S inside",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Repeating Crossbow - to S back right of burnt camp",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/MHS: Rune Arc - to SW along cliff", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/FR: Blessed Bone Shard - to NW, hanging off scaffolding",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Broken Rune - to SE, right before going inside",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(FR): Messmer Soldier Ashes - down chute by gallows, outside by grave",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(FR): Knot Resin x6 - down chute by gallows, left item on corpse pile",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(FR): Marika's Rune - down chute by gallows, top of corpse pile",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(FR): Broken Rune - down chute by gallows, right item on corpse pile",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Flamedrake Talisman +3 - in chest to SE inside, left of bottom of stairs over cages",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Spiritgrave Stone x3 - to SE inside, in center room below, outside of cage",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/FR: Dewgem x3 - to S on wall", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/(FR): Fireproof Pickled Liver - down stairs from gallows, on left",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/(FR): Blessed Bone Shard - on gallows", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/(FR): Broken Rune - under a cart by gallows", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/(FR): Ghost Glovewort [6] - on small gallows", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/(FR): Broken Rune - by gallows on skulls", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/(FR): Redflesh Mushroom x5 - E of gallows", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/(FR): Throwing Dagger x8 - by small gallows", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/(FR): Shadow Realm Rune [4] - in chute below gallows",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Festive Grease x2 - to SE inside, left of bottom of stairs",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Smithing Stone [7] x6 - in chest to SE inside, in center room below, inside cage",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Sunwarmth Stone x3 - in chest to SE inside, in center room below, inside cage",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/BFR: Ancient Dragon Smithing Stone - in chest up ladder to N",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Smithing Stone [6] x6 - to SE inside, in center room below, inside cage",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/FR: Blessing of Marika - SE of FR", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/FR: Broken Rune x5 - enemy drop NE of FR, by cliff",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Shadow Realm Rune [2] - enemy drop NE of FR, by cliff",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Shadow Realm Rune [3] - enemy drop NE of FR, by cliff",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Broken Rune x4 - enemy drop E of FR, in corner",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Shadow Realm Rune [1] x2 - enemy drop E of FR, in corner",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Shadow Realm Rune [4] - enemy drop E of FR, in corner",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(FR): Blessed Bone Shard x3 - enemy drop by gallows",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/FR: Blessed Bone Shard x4 - enemy drop to SE, right before going inside",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(FR): Iris of Occultation - enemy drop down chute by gallows",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Fire Knight's Cookbook [1] - to W in camp tent",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Dane's Hat - challenge Dane with May the Best Win",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/MR: Dryleaf Arts - challenge Dane with May the Best Win",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(MR): Golden Horn Tender - enemy drop upper SE side",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(MR): Scadutree Fragment - enemy drop upper SE side",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(MR): Shadow Sunflower x4 - bottom of hole under balcony",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(MR): String x2 - down side tunnel, on upper balcony",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(MR): Shadow Realm Rune [3] - upper N side on building",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(MR): Golden Horn Tender - down side tunnel, behind at one way tunnel drop",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(MR): Whiteflesh Mushroom x3 - down side tunnel, in building",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/RFSP: Smithing Stone [7] x2 - E of RFSP", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/(MR): Shattered Stone Talisman - down main hole stairs, outside to left",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/MR: Revered Spirit Ash - E of MR by statue", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/MR: Scadutree Fragment - by cross", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/(MR): Golden Arcs - inside a chest E side of lower hole",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Pelt of Ralva - boss drop to N, E before camp, deep woods",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Shadow Sunflower x2 - to NE, in cave item 2",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Shadow Realm Rune [3] - to NE, in cave item 1",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Four-Toed Fowl Foot - to NE, E side of pond",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Leather Arm Wraps - to N, E before camp, near stake in woods",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Leather Leg Wraps - to N, E before camp, near stake in woods",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Leather Crown - to N, E before camp, near stake in woods",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Highland Attire - to N, E before camp, near stake in woods",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Heal from Afar - to NE, in cave by golden tree",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Scadutree Fragment - to NE, N side of pond by statue",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/MR: Forager Brood Cookbook [5] - given by friendly Kindred of Rot, to NE, through cave, on NE ledge",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/MR: Pearlescent Scale - given by friendly Kindred of Rot, to NE, through cave, on NE ledge",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/MR: Gravebird Anklets - to NE, through cave, by second arch",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Furnace Visage - to N past camp, by left hand of golem",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Furnace Visage - to N past camp, by SW leg",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Furnace Visage - to N past camp, by S leg",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Larval Tear - blue graves to N, E of camp",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/HC: Furnace Keeper's Note - to N past camp, in tent by golem",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/FR: Smithing Stone [6] x8 - E of FR", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/BV: Hefty Cracked Pot - to SE by pot", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/(BV): Hefty Cracked Pot - in shack NE side of village",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(BV): Living Jar Shard x3 - under broken bridge",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(BV): Living Jar Shard x2 - under broken bridge",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/(BV): Raw Meat Dumpling - SE end of crevice", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/(BV): Bonny Butchering Knife - in shack W side of broken bridge",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(BV): Human Bone Shard x2 - under broken bridge",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/BV: Broken Rune - to SE on pot", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/(BV): Kukri x5 - on front step W side of broken bridge",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/(BV): Revered Spirit Ash - NW end of crevice", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/(CMM): Glintstone Nail - Ymir shop after ringing one of the hanging bells",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Glintstone Nails - Ymir shop after ringing one of the hanging bells",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Glintstone Pebble - Ymir shop",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Great Glintstone Shard - Ymir shop",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Glintblade Phalanx - Ymir shop",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Carian Phalanx - Ymir shop",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Carian Retaliation - Ymir shop",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Miriam's Vanishing - Ymir shop",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Fleeting Microcosm - Ymir shop after ringing both hanging bells",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Hole-Laden Necklace - given by Ymir on first meeting",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Ruins Map - given by Ymir on first meeting",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Beloved Stardust - given by Ymir after ringing the hanging bell in FRR",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Ruins Map (2nd) - given by Ymir after ringing the hanging bell in FRR",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Ruins Map (3rd) - given by Ymir after ringing both hanging bells",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/CMM: Cherishing Fingers - in graveyard W of CMM after Ymir dead",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/CDH: Ash of War: Carian Sovereignty - to SW, down right path, in cave near left end",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/BV: O Mother - N of BV by tree", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/CDH: Larval Tear - blue graves to W", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/CDH: Forager Brood Cookbook [6] - given by friendly Kindred of Rot to NW above entrance to SKCD, in W corner",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/CDH: Dewgem x3 - given by friendly Kindred of Rot to NW above entrance to SKCD, in W corner",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/CDH: Grave Glovewort [7] - to NW above entrance to SKCD, by grave to right",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/CDH: Blessed Bone Shard - to NW above entrance to SKCD, in E corner on rock",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    ["SA/(WH): Tooth Whip - in shack", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/BLV: Cerulean-Sapping Cracked Tear - furnace golem to NE along path",
      { groups: ["DLC", "Furnace Golem"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/CMM: Greater Potentate's Cookbook [4] - E of CMM",
      { groups: ["DLC"], region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Swordhand of Night Jolán - on Jolán after killing Ymir, give Iris of Grace",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/(CMM): Sword of Night - on Jolán after killing Ymir, give Iris of Occultation",
      { groups: ["DLC"], isMissable: true, region: "Scadu Altus" },
    ],
    ["SA/BLV: Ash of War: Raging Beast - scarab to NE", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/CMM: Glinting Nail x2 - on SE ledge of CMM", { groups: ["DLC"], region: "Scadu Altus" }],
    ["SA/CMM: Starlight Shards - SE of CMM by statue", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "SA/BLV: Furnace Visage - furnace golem to NE along path",
      { groups: ["DLC", "Furnace Golem"], isMissable: true, region: "Scadu Altus" },
    ],
    [
      "SA/CDH: Greasemonger's Bell Bearing - hanging pot to S",
      { groups: ["DLC", "Hidden"], region: "Scadu Altus" },
    ],
    [
      "SA/(RR): Rabbath's Cannon - in chest top of rise",
      { groups: ["DLC", "Rise"], region: "Scadu Altus" },
    ],
    ["SA/SC: Scadutree Fragment - by cross", { groups: ["DLC"], region: "Scadu Altus" }],
    [
      "CE/CEC: Loyal Knight's Cookbook - in chest below grace",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Moonrithyll's Knight Sword - hostile npc drop to SE, at church building entrance",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CF: Black Pyrefly x3 - to NE on left side of bridge",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CF: Somber Smithing Stone [5] - to N on left cliff over bridge",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CF: Broken Rune - to NE on cliff, right of stairs",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Glintslab Firefly x3 - to W, drop down, end of cave",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    ["CE/CEC: Flight Pinion x2 - to NW below by cave", { groups: ["DLC"], region: "Castle Ensis" }],
    [
      "CE/CEC: Silver-Pickled Fowl Foot - to SW between buildings",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CF: Somber Smithing Stone [6] - to NE behind right building",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Somber Smithing Stone [7] - to SE, right before hostile npc top of tower",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Glintblade Trio - to SE, left after opening gate, drop down to N",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Somber Smithing Stone [8] - to SE, left after opening gate, on W roof",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Glintslab Firefly - to SE, on stairs after church building",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Dewgem x3 - to SE, on cliff left after opening gate",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Somber Smithing Stone [5] - to NW by wall",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    ["CE/CEC: Arrow x10 - to S down hole drop", { groups: ["DLC"], region: "Castle Ensis" }],
    ["CE/CEC: Bolt x10 - to W, drop down", { groups: ["DLC"], region: "Castle Ensis" }],
    [
      "CE/CEC: Shadow Realm Rune [2] - to SE, in hallway after church",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Glintslab Firefly - to SE, on left cliff before hostile npc",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Drawstring Royal Magic Grease x3 - to S, on rock under waterfall",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    ["CE/CEC: Knot Resin x3 - to S before hole drop", { groups: ["DLC"], region: "Castle Ensis" }],
    [
      "CE/CF: Shadow Realm Rune [4] - to NE in right room over bridge",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Starlight Shards - to S, take a right before waterfall",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Rellana's Cameo - to SE, on church altar",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    ["CE/CEC: Castle Cross Message - to NE by cross", { groups: ["DLC"], region: "Castle Ensis" }],
    ["CE/CEC: Scadutree Fragment - to NE by cross", { groups: ["DLC"], region: "Castle Ensis" }],
    [
      "CE/CF: Milady - in chest top of tower left before cave",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Wolf Crest Shield - in chest to SE, down W stairs before entering church building",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CF: Somber Smithing Stone [9] - enemy drop to NE just over bridge",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CF: Royal Magic Grease x3 - enemy drop to NE just over bridge",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CLC: Remembrance of the Twin Moon Knight - mainboss drop",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Knot Resin x4 - to S, in waterfall cave",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    ["CE/CEC: String x3 - to SE, left after bridge", { groups: ["DLC"], region: "Castle Ensis" }],
    [
      "CE/CEC: Somber Smithing Stone [7] - to SE, after opening gate, lower castle wall",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CEC: Somber Smithing Stone [6] - to SE, after opening gate, lower castle wall",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    ["CE/CLC: Somber Smithing Stone [7] - to E", { groups: ["DLC"], region: "Castle Ensis" }],
    [
      "CE/CEC: Imbued Sword Key - in chest just before elevator to boss area",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/CLC: Ash of War: Wing Stance - in chest to E, top of tower after jumping down",
      { groups: ["DLC"], region: "Castle Ensis" },
    ],
    [
      "CE/(FRF): Greater Potentate's Cookbook [3] - across the valley bridge",
      { groups: ["DLC"], region: "Fog Rift Fort" },
    ],
    ["CE/(FRF): Black Steel Greatshield - boss drop", { groups: ["DLC"], region: "Fog Rift Fort" }],
    [
      "CE/(FRF): Somber Smithing Stone [7] - in NW corner of S wall",
      { groups: ["DLC"], region: "Fog Rift Fort" },
    ],
    [
      "CE/(FRF): Messmerfire Grease - middle of lower courtyard",
      { groups: ["DLC"], region: "Fog Rift Fort" },
    ],
    [
      "CE/(FRF): Redflesh Mushroom x8 - in first tower",
      { groups: ["DLC"], region: "Fog Rift Fort" },
    ],
    [
      "CE/(FRF): Fire Arrow x10 - just after first ladder",
      { groups: ["DLC"], region: "Fog Rift Fort" },
    ],
    [
      "CE/(FRF): Serpent Flail - in chest lower courtyard",
      { groups: ["DLC"], region: "Fog Rift Fort" },
    ],
    [
      "CE/(FRF): Arrow's Soaring Sting Talisman - in chest top of boss building",
      { groups: ["DLC"], region: "Fog Rift Fort" },
    ],
    [
      "CE/(FRF): Smithing Stone [8] x6 - in chest by boss",
      { groups: ["DLC"], region: "Fog Rift Fort" },
    ],
    [
      "CE/(FRF): Blessed Bone Shard x3 - in chest by boss",
      { groups: ["DLC"], region: "Fog Rift Fort" },
    ],
    [
      "AW/DF: Mad Craftsman's Cookbook [1] - to SW up on ledge",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/DF: Great Grave Glovewort - to SW, up on right cliff next to medium tree",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/DF: Swollen Grape - enemy drop to SW, E enemy",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/DF: Swollen Grape - enemy drop to SW, W enemy",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/MM: Mad Craftsman's Cookbook [2] - head up NE path from MM, at top go SE, behind tree at end",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AW: Clarifying Boluses x3 - to SW in low vis area, along S wall next to big tree",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AW: Swollen Grape - enemy drop to SW in low vis area",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AW: Swollen Grape - enemy drop to W down below",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    ["AW/AW: Scadutree Fragment - to N, by W tree", { groups: ["DLC"], region: "Abyssal Woods" }],
    [
      "AW/AW: Smithing Stone [7] x2 - to N, by N wall",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AW: Clarifying Cured Meat x2 - to N, by N wall",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AC: Ghost Glovewort [9] - W of AC, S of WT grace, behind giant tree by small tree",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AC: Clarifying Cured Meat x2 - W of AC, S of WT grace, behind giant tree by small tree",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/WT: Aged One's Exultation - enemy drop to S, E enemy in sneak bushes area",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/WT: Swollen Grape - enemy drop to S, W enemy in sneak bushes area",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AW: Shadow Realm Rune [7] - to SE and left up hill, S of WT grace between 2 giant",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AC: Somber Smithing Stone [9] - S of AC in dead-end",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AC: Surging Frenzied Flame - S of AC in dead-end",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    ["AW/AC: Map: Abyss - map pillar NW of AC", { groups: ["DLC"], region: "Abyssal Woods" }],
    [
      "AW/AC: Shadow Realm Rune [7] - W of AC up on ledge",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AC: Clarifying Boluses - SW of AC up on ledge behide medium tree",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    ["AW/WT: Madding Hand - hostile npc drop to S", { groups: ["DLC"], region: "Abyssal Woods" }],
    [
      "AW/(AC): Frenzyflame Perfume Bottle - N side of church",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    [
      "AW/AC: Clarifying Boluses x2 - N of AC left of tree",
      { groups: ["DLC"], region: "Abyssal Woods" },
    ],
    ["AW/(AC): Scadutree Fragment x2 - by altar", { groups: ["DLC"], region: "Abyssal Woods" }],
    [
      "JP/FJP: Igon's Furled Finger - given by Igon after defeating boss",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Dragon Communion Harpoon - to W on wing, right item",
      { groups: ["DLC"], region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Dragon Communion Harpoon - to W on lower wing",
      { groups: ["DLC"], region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Dragon Communion Grease - to SE on otherside of giant dragons corpse by smaller corpse",
      { groups: ["DLC"], region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Dragon Communion Harpoon - to W on wing, left item",
      { groups: ["DLC"], region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Bayle's Tyranny - Dragon Communion, Heart of Bayle",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Bayle's Flame Lightning - Dragon Communion, Heart of Bayle",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Ghostflame Breath - Grand Dragon Communion",
      { groups: ["DLC"], region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Igon's Cookbook [1] - to N in ruined tower",
      { groups: ["DLC"], region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Ancient Dragon Florissax - admit to putting Florissax to sleep with Thiollier's Concoction",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Dragonbolt of Florissax - given by Florissax if you gave her Thiollier's Concoction before JP mainboss",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Flowerstone Gavel - dead Florissax after JP mainboss if not talked to",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Priestess Heart - dead Florissax after JP mainboss if not talked to",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak Foot" },
    ],
    [
      "JP/GADC: Red Fulgurbloom x3 - to N on right cliff",
      { groups: ["DLC"], region: "Jagged Peak Foot" },
    ],
    ["JP/DPT: Dragon Heart - boss drop to E", { groups: ["DLC"], region: "Jagged Peak Foot" }],
    ["JP/DPT: Dragonscale Flesh - boss drop to E", { groups: ["DLC"], region: "Jagged Peak Foot" }],
    [
      "JP/FJP: Greater Potentate's Cookbook [6] - to NW across bridge, N of spirit spring",
      { groups: ["DLC"], region: "Jagged Peak Foot" },
    ],
    ["JP/FJP: Dragon Heart - boss drop to SE", { groups: ["DLC"], region: "Jagged Peak Foot" }],
    [
      "JP/FJP: Dragonscale Flesh - boss drop to SE",
      { groups: ["DLC"], region: "Jagged Peak Foot" },
    ],
    [
      "JP/FJP: Igon's Greatbow - to E on Igon's corpse after JP mainboss",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak" },
    ],
    [
      "JP/FJP: Igon's Helm - to E on Igon's corpse after JP mainboss",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak" },
    ],
    [
      "JP/FJP: Igon's Armor - to E on Igon's corpse after JP mainboss",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak" },
    ],
    [
      "JP/FJP: Igon's Gauntlets - to E on Igon's corpse after JP mainboss",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak" },
    ],
    [
      "JP/FJP: Igon's Loincloth - to E on Igon's corpse after JP mainboss",
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak" },
    ],
    [
      'JP/JPM: Rock Heart - "Domain of Dragons" Painting reward, after first spirit spring head down return path',
      { groups: ["DLC"], isMissable: true, region: "Jagged Peak" },
    ],
    [
      "JP/JPM: Somber Ancient Dragon Smithing Stone - up second spirit sping, to N down below",
      { groups: ["DLC"], region: "Jagged Peak" },
    ],
    [
      "JP/FJP: Scadutree Fragment - under where the boulder spawns",
      { groups: ["DLC"], region: "Jagged Peak" },
    ],
    [
      "JP/FJP: Red Fulgurbloom x8 - to E after 2 spirit spings",
      { groups: ["DLC"], region: "Jagged Peak" },
    ],
    ["JP/JPS: Heart of Bayle - mainboss drop", { groups: ["DLC"], region: "Jagged Peak" }],
    [
      "JP/JPM: Ancient Dragon Smithing Stone - boss drop to S",
      { groups: ["DLC"], region: "Jagged Peak" },
    ],
    [
      "JP/JPM: Somber Ancient Dragon Smithing Stone - boss drop to S",
      { groups: ["DLC"], region: "Jagged Peak" },
    ],
    [
      "JP/JPM: Ancient Dragon Smithing Stone - up second spirit sping, to E",
      { groups: ["DLC"], region: "Jagged Peak" },
    ],
    ["JP/JPM: Igon's Cookbook [2] - to NE", { groups: ["DLC"], region: "Jagged Peak" }],
    [
      "FRR/(FWH): Finger-Weaver's Cookbook [1] - in shack",
      { groups: ["DLC"], region: "Finger Ruins of Rhia" },
    ],
    [
      "CC/FRR: Shadow Realm Rune [2] - to S on beach",
      { groups: ["DLC"], region: "Finger Ruins of Rhia" },
    ],
    [
      "CC/FRR: Grave Glovewort [9] - to SW top of coffin boat",
      { groups: ["DLC"], region: "Finger Ruins of Rhia" },
    ],
    [
      "FRR: Crimson Seed Talisman +1 - use Hole-Laden Necklace at the hanging bell in the center",
      { groups: ["DLC"], isMissable: true, region: "Finger Ruins of Rhia" },
    ],
    [
      "RR/CWH: Furnace Visage 1 - to S in SW furnace golem bodies",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/CWH: Furnace Visage 2 - to S in SW furnace golem bodies, by SW edge",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/CWH: Furnace Visage 3 - to S in SW furnace golem bodies",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/CWH: Furnace Visage 4 - to S in SW furnace golem bodies, by SW edge",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/CWH: Furnace Visage 5 - to S in SW furnace golem bodies, by SW edge",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/CWH: Furnace Visage 6 - to S in SW furnace golem bodies",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/CWH: Furnace Visage 7 - to S in SW furnace golem bodies",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    ["RR/CWH: Furnace Visage - close to S", { groups: ["DLC"], region: "Recluses' River" }],
    ["RR/CWH: Furnace Visage - close to E", { groups: ["DLC"], region: "Recluses' River" }],
    [
      "RR/(VF): Silver Horn Tender - just SE of statue",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    ["RR/(VF): Revered Spirit Ash - by statue", { groups: ["DLC"], region: "Recluses' River" }],
    [
      "RR/RRU: Smithing Stone [7] x2 - on a ledge above RRD grace",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/(VF): Shadow Realm Rune [4] - upper area by E ledge",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Glass Shard - NE after going down half of gravestones",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Human Bone Shard - lower RR, SE of waterfall",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/(VF): Golden Horn Tender - upper area behind altar around right side",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/(VF): Man-Fly Ashes - upper area on altar",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Dryleaf Robe - lower RR, under waterfall",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Dryleaf Arm Wraps - lower RR, under waterfall",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Dryleaf Cuissardes - lower RR, under waterfall",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Moldmonger's Bell Bearing - hanging pot to NE of grace",
      { groups: ["DLC", "Hidden"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Somber Smithing Stone [8] - scarab lower RR, E of waterfall",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRU: Thin Beast Bones x6 - down S path on left before right jump",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRU: Dryleaf Seal - down NE path, on first leadge down from graves",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRU: Fly Mold x4 - down S path, to W after right jump",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Somber Smithing Stone [7] - lower RR, up river by left wall near end",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Scadutree Fragment - lower RR, up river in coffin",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/CWH: Oil-Soaked Tear - furnace golem to SE",
      { groups: ["DLC", "Furnace Golem"], region: "Recluses' River" },
    ],
    [
      "RR/(RU): Bloodsucking Cracked Tear - inactive furnace golem, use Hefty Furnace Pot",
      { groups: ["DLC", "Furnace Golem"], isMissable: true, region: "Recluses' River" },
    ],
    [
      "RR/(RU): Smithing Stone [8] x3 - on balcony overlooking inactive furnace golem",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/(RU): Lost Ashes of War - on wall leading to balcony overlooking inactive furnace golem",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RU: Ember of Messmer x5 - on building S of RU",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    ["RR/RU: Whiteflesh Mushroom x3 - SE of RU", { groups: ["DLC"], region: "Recluses' River" }],
    [
      "RR/(RU): Furnace Visage - inactive furnace golem, use Hefty Furnace Pot",
      { groups: ["DLC", "Furnace Golem"], isMissable: true, region: "Recluses' River" },
    ],
    [
      "RR/CWH: Furnace Visage - furnace golem to SE",
      { groups: ["DLC", "Furnace Golem"], region: "Recluses' River" },
    ],
    [
      "RR/RU: Revered Spirit Ash - SE of RU by statue",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RU: Furnace Visage 1 - S of RU by furnace golem bodies",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RU: Furnace Visage 2 - S of RU by furnace golem bodies",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/(RU): Furnace Visage - by inactive furnace golem",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/(RU): Giant Golden Arc - in chest within building behind inactive furnace golem",
      { groups: ["DLC"], isMissable: true, region: "Recluses' River" },
    ],
    [
      "RR/(ENM): Rakshasa's Great Katana - boss drop",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    ["RR/(ENM): Rakshasa Helm - boss drop", { groups: ["DLC"], region: "Recluses' River" }],
    ["RR/(ENM): Rakshasa Armor - boss drop", { groups: ["DLC"], region: "Recluses' River" }],
    ["RR/(ENM): Rakshasa Gauntlets - boss drop", { groups: ["DLC"], region: "Recluses' River" }],
    ["RR/(ENM): Rakshasa Greaves - boss drop", { groups: ["DLC"], region: "Recluses' River" }],
    [
      "RR/RRD: Nascent Butterfly x2 - down NE path, SE of graves in cave",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Smithing Stone [8] x4 - RR swamp, on island middle of swamp",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Fly Mold x3 - down NE path, SE of graves",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Scorpion Liver x4 - RR swamp, in NW alcove",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Scadutree Fragment - enemy drop RR swamp, W side of swamp",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    [
      "RR/RRD: Scadutree Fragment - enemy drop RR swamp, E side of swamp",
      { groups: ["DLC"], region: "Recluses' River" },
    ],
    ["ScV/SKBG: Scadutree Fragment - to SE", { groups: ["DLC"], region: "Scaduview" }],
    ["ScV/(AS): Gaius's Greaves - enemy drop by shack", { groups: ["DLC"], region: "Scaduview" }],
    [
      "ScV/(AS): Albinauric Bloodclot - enemy drop by shack",
      { groups: ["DLC"], region: "Scaduview" },
    ],
    ["ScV/(SC): Scadutree Fragment 1 - by chalice", { groups: ["DLC"], region: "Scaduview" }],
    ["ScV/(AS): Sharpshot Talisman - in shack", { groups: ["DLC"], region: "Scaduview" }],
    ["ScV/(SC): Scadutree Fragment 2 - by chalice", { groups: ["DLC"], region: "Scaduview" }],
    ["ScV/(SC): Scadutree Fragment 3 - by chalice", { groups: ["DLC"], region: "Scaduview" }],
    ["ScV/(SC): Scadutree Fragment 4 - by chalice", { groups: ["DLC"], region: "Scaduview" }],
    ["ScV/(SC): Scadutree Fragment 5 - by chalice", { groups: ["DLC"], region: "Scaduview" }],
    ["HL/HL: Blessing of Marika - boss drop on hill", { groups: ["DLC"], region: "Hinterland" }],
    ["HL/HL: Blessing of Marika - boss drop by bridge", { groups: ["DLC"], region: "Hinterland" }],
    [
      "SA/(RR): Spellmachinist's Bell Bearing - very top of rise, drop down from HL/SV",
      { groups: ["DLC"], region: "Hinterland" },
    ],
    [
      "HL/HB: Shadow Sunflower x3 - to SE, down left of wall gravestones",
      { groups: ["DLC"], region: "Hinterland" },
    ],
    [
      "HL/HB: Pearlescent Scale - to SE, down left of wall gravestones",
      { groups: ["DLC"], region: "Hinterland" },
    ],
    [
      "HL/HB: Fingerprint Nostrum x2 - to SE, down left of wall gravestones",
      { groups: ["DLC"], region: "Hinterland" },
    ],
    ["HL/(SV): Minor Erdtree - by small erdtree", { groups: ["DLC"], region: "Hinterland" }],
    ["HL/(SV): Golden Braid - inside the big tree", { groups: ["DLC"], region: "Hinterland" }],
    ["HL/FH: Gravitational Missile - boss drop to NE", { groups: ["DLC"], region: "Hinterland" }],
    [
      "HL/FH: Fingercreeper Ashes - to E in the massive cave",
      { groups: ["DLC"], region: "Hinterland" },
    ],
    [
      "HL/FH: Shadow Realm Rune [6] - to E in the massive cave, on exit ledge",
      { groups: ["DLC"], region: "Hinterland" },
    ],
    [
      "SB/TWS: Remembrance of the Shadow Sunflower - mainboss drop",
      { groups: ["DLC"], region: "Scadutree Base" },
    ],
    [
      "SB/TWS: Miquella's Great Rune - mainboss drop",
      { groups: ["DLC"], region: "Scadutree Base" },
    ],
    [
      "SA/(CMM): Claws of Night - invader drop under CMM",
      { groups: ["DLC"], isMissable: true, region: "Cathedral of Manus Metyr" },
    ],
    [
      "SA/(CMM): Finger-Weaver's Cookbook [2] - left of hanging bell under CMM",
      { groups: ["DLC"], region: "Cathedral of Manus Metyr" },
    ],
    [
      "FRD: Cerulean Seed Talisman +1 - use Hole-Laden Necklace at the hanging bell in the center",
      { groups: ["DLC"], isMissable: true, region: "Finger Ruins of Dheo" },
    ],
  ]
);
