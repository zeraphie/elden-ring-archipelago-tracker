/*! Key spots' names are built on the Elden Ring apworld 0.1.3's location names, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

import type { KeySpot } from "../../key-spots.js";
import { placeName } from "../../place-names.js";

/** Caelid's key spots by exact Archipelago name, with Dragonbarrow's. */
export const CAELID_KEY_SPOTS: ReadonlyMap<string, KeySpot> = new Map([
  [
    "CL/SASB: Golden Seed - seedtree to S",
    { place: "South of Southern Aeonia Swamp Bank", encounter: "Golden Seed tree" },
  ],
  ["CL/(CP): Sacred Tear - by statue", { place: "Church of the Plague", encounter: "Sacred Tear" }],
  [
    "CL/(STS): Golden Seed - seedtree by SB grace",
    { place: "Sellia, by Sellia Backstreets", encounter: "Golden Seed tree" },
  ],
  [
    "DB/BS: Golden Seed - seedtree SE of BS",
    { place: "South east of Bestial Sanctum", encounter: "Golden Seed tree" },
  ],
  [
    "CL/MEW: Greenburst Crystal Tear - boss drop",
    { place: placeName("CL/MEW"), encounter: "Erdtree Avatar" },
  ],
  [
    "CL/MEW: Flame-Shrouding Cracked Tear - boss drop",
    { place: placeName("CL/MEW"), encounter: "Erdtree Avatar" },
  ],
  [
    "CL/CHS: Dragon Heart - boss drop to SE",
    { place: "South east of Caelid Highway South", encounter: "Decaying Ekzykes" },
  ],
  [
    "CL/(CR): Visage Shield - in chest after boss",
    { place: "Caelem Ruins cellar", encounter: "Mad Pumpkin Head Duo" },
  ],
  [
    "CL/SASB: Ash of War: Poison Moth Flight - night boss drop to SW",
    { place: "South west of Southern Aeonia Swamp Bank", encounter: "Night's Cavalry" },
  ],
  [
    "CL/SASB: Death's Poker - night boss drop to SE",
    { place: "Southern Aeonia Swamp Bank", encounter: "Death Rite Bird" },
  ],
  [
    "CL/IA: Commander's Standard - boss drop to SE",
    { place: "Heart of Aeonia, Swamp of Aeonia", encounter: "Commander O'Neil" },
  ],
  [
    "CL/IA: Unalloyed Gold Needle (Broken) - boss drop to SE",
    { place: "Heart of Aeonia, Swamp of Aeonia", encounter: "Commander O'Neil" },
  ],
  [
    "CL/(STS): Nox Flowing Sword - boss drop",
    { place: "Sellia, Town of Sorcery", encounter: "Nox Swordstress & Nox Priest" },
  ],
  [
    "CL/(RC): Ruins Greatsword - boss drop",
    { place: "Redmane Castle plaza", encounter: "Crucible Knight / Misbegotten Warrior" },
  ],
  [
    "CL/(WD): Radahn's Great Rune - mainboss drop",
    { place: "Wailing Dunes, Radahn Festival", encounter: "Starscourge Radahn" },
  ],
  [
    "CL/(WD): Remembrance of the Starscourge - mainboss drop",
    { place: "Wailing Dunes, Radahn Festival", encounter: "Starscourge Radahn" },
  ],
  [
    "DB/(IMS): Gravity Stone Peddler's Bell Bearing - night boss drop",
    { place: placeName("DB/(IMS)"), encounter: "Bell Bearing Hunter" },
  ],
  [
    "DB/(SE): Battlemage Hugues - Sellia Evergaol",
    { place: "Sellia Evergaol", encounter: "Battlemage Hugues" },
  ],
  [
    "DB/MEE: Opaline Hardtear - boss drop",
    { place: placeName("DB/MEE"), encounter: "Putrid Avatar" },
  ],
  [
    "DB/MEE: Stonebarb Cracked Tear - boss drop",
    { place: placeName("DB/MEE"), encounter: "Putrid Avatar" },
  ],
  [
    "DB/BS: Gargoyle's Blackblade - boss drop SE of BS",
    { place: "South east of Bestial Sanctum", encounter: "Black Blade Kindred" },
  ],
  [
    "DB/BS: Gargoyle's Black Halberd - boss drop SE of BS",
    { place: "South east of Bestial Sanctum", encounter: "Black Blade Kindred" },
  ],
  [
    "DB/FG: Dragon Heart - boss drop to S",
    { place: "Farum Greatbridge", encounter: "Flying Dragon Greyll" },
  ],
  [
    "DB/LR: Ash of War: Bloodhound's Step - night boss drop N of LR",
    { place: "Lenne's Rise", encounter: "Night's Cavalry" },
  ],
  [
    "DB/(DT): Godskin Apostle Hood - boss drop",
    { place: "Divine Tower of Caelid", encounter: "Godskin Apostle" },
  ],
  [
    "DB/(DT): Godskin Apostle Robe - boss drop",
    { place: "Divine Tower of Caelid", encounter: "Godskin Apostle" },
  ],
  [
    "DB/(DT): Godskin Apostle Bracelets - boss drop",
    { place: "Divine Tower of Caelid", encounter: "Godskin Apostle" },
  ],
  [
    "DB/(DT): Godskin Apostle Trousers - boss drop",
    { place: "Divine Tower of Caelid", encounter: "Godskin Apostle" },
  ],
  [
    "CL/(FG): Starscourge Heirloom - chest upper platform",
    { place: "Fort Gael, upper platform", encounter: "Chest" },
  ],
  [
    "CL/FGN: Ash of War: Flame of the Redmanes - scarab to NE",
    { place: "North east of Fort Gael North", encounter: "Scarab" },
  ],
  [
    "CL/FR: Somber Smithing Stone [4] - scarab on root arch S of FR",
    { place: "Root arch south of Forsaken Ruins", encounter: "Scarab" },
  ],
  [
    "CL/SW: Slumbering Egg x2 - in chest within camp to SW",
    { place: "Camp south west of Smoldering Wall", encounter: "Chest" },
  ],
  [
    "CL/CR: Whirl, O Flame! - scarab to NW",
    { place: "North west of Caelem Ruins", encounter: "Scarab" },
  ],
  [
    "CL/CR: Rune Arc - in chest within camp to N",
    { place: "Camp north of Caelem Ruins", encounter: "Chest" },
  ],
  [
    "CL/(FR): Sword of St. Trina - in chest underground behind imp statue",
    { place: "Below Forsaken Ruins, behind the imp statue", encounter: "Chest" },
  ],
  [
    "CL/CR: Greatsword - in caravan chest to NW",
    { place: "North west of Caelem Ruins", encounter: "Caravan chest" },
  ],
  [
    "CL/ASS: Ash of War: Poisonous Mist - scarab to SE",
    { place: "South east of Aeonia Swamp Shore", encounter: "Scarab" },
  ],
  [
    "CL/ACHN: Preserving Boluses x3 - Nomadic Merchant to E",
    { place: "East of Astray from Caelid Highway North", encounter: "Nomadic Merchant" },
  ],
  [
    "CL/ACHN: Ash of War: Lifesteal Fist - scarab to N",
    { place: "North of Astray from Caelid Highway North", encounter: "Scarab" },
  ],
  [
    "CL/(SSR): Rock Sling - in chest underground",
    { place: "Below Street of Sages Ruins", encounter: "Chest" },
  ],
  [
    "CL/IG: Ash of War: Cragblade - scarab to W",
    { place: "West of Impassable Greatbridge", encounter: "Scarab" },
  ],
  [
    "CL/CCC: Somber Smithing Stone [4] - scarab E of CCC",
    { place: "East of Caelid Catacombs", encounter: "Scarab" },
  ],
  [
    "CL/SASB: Champion Headband - Nomadic Merchant to SW",
    { place: "South west of Southern Aeonia Swamp Bank", encounter: "Nomadic Merchant" },
  ],
  [
    "CL/SASB: Champion Pauldron - Nomadic Merchant to SW",
    { place: "South west of Southern Aeonia Swamp Bank", encounter: "Nomadic Merchant" },
  ],
  [
    "CL/SASB: Map: Caelid - to SW",
    { place: "South west of Southern Aeonia Swamp Bank", encounter: "Map fragment" },
  ],
  [
    "CL/SASB: Windy Crystal Tear - to S",
    { place: "South of Southern Aeonia Swamp Bank", encounter: "Basin" },
  ],
  [
    "CL/IA: Ash of War: Sacred Ring of Light - scarab to SE",
    { place: "South east of Inner Aeonia", encounter: "Scarab" },
  ],
  [
    "CL/SUS: Poison Armament - scarab to W",
    { place: "West of Sellia Under-Stair", encounter: "Scarab" },
  ],
  [
    "CL/(STS): Ash of War: Double Slash - scarab above SUS grace root",
    { place: "Above Sellia Under-Stair", encounter: "Scarab" },
  ],
  [
    "CL/(STS): Lusat's Glintstone Staff - in chest after boss",
    { place: "Sellia, Town of Sorcery", encounter: "Chest" },
  ],
  [
    "CL/(STS): Spelldrake Talisman +1 - in chest behind seal above SUS grace to NE",
    { place: "Sealed room north east of Sellia Under-Stair", encounter: "Chest" },
  ],
  [
    "CL/IG: Arrow's Sting Talisman - chest top of tower",
    { place: "Tower top by Impassable Greatbridge", encounter: "Chest" },
  ],
  [
    "CL/(STS): Night Comet - in chest behind seal upstairs from SUS grace",
    { place: "Sealed room above Sellia Under-Stair", encounter: "Chest" },
  ],
  [
    "CL/(STS): Imbued Sword Key - in chest behind seal E side of STS",
    { place: "Sealed room on Sellia's east side", encounter: "Chest" },
  ],
  [
    "CL/(RC): Ash of War: Flaming Strike - scarab graveyard by back entrance",
    { place: "Redmane Castle, graveyard by the back entrance", encounter: "Scarab" },
  ],
  [
    "CL/(RC): Smithing Stone [6] - upper front courtyard NW room, follow upper path till chest",
    { place: "Redmane Castle, above the front courtyard", encounter: "Chest" },
  ],
  [
    "CL/(MEC): Mad Pumpkin Head Ashes - boss drop",
    { place: "Minor Erdtree Catacombs", encounter: "Erdtree Burial Watchdog" },
  ],
  [
    "CL/(CCC): Kindred of Rot Ashes - boss drop",
    { place: "Caelid Catacombs", encounter: "Cemetery Shade" },
  ],
  [
    "CL/(WDC): Golden Seed - boss drop",
    { place: "War-Dead Catacombs", encounter: "Putrid Tree Spirit" },
  ],
  [
    "CL/(WDC): Redmane Knight Ogha - boss drop",
    { place: "War-Dead Catacombs", encounter: "Putrid Tree Spirit" },
  ],
  [
    "DB/(DC): Flamedrake Talisman +2 - boss drop",
    { place: "Dragonbarrow Cave", encounter: "Beastman of Farum Azula" },
  ],
  [
    "DB/(SH): Crystal Torrent - boss drop",
    { place: "Sellia Hideaway", encounter: "Putrid Crystalian trio" },
  ],
  [
    "CL/(AC): Gold Scarab - boss drop",
    { place: "Abandoned Cave", encounter: "Cleanrot Knight Duo" },
  ],
  [
    "CL/(GC): Putrid Corpse Ashes - boss drop",
    { place: "Gaol Cave", encounter: "Frenzied Duelist" },
  ],
  [
    "CL/(GC): Somber Smithing Stone [5] - chest in lever room",
    { place: "Gaol Cave, lever room", encounter: "Chest" },
  ],
  ["CL/(GC): Rune Arc - chest by grace", { place: "Gaol Cave", encounter: "Chest" }],
  ["CL/(GT): Moonveil - boss drop", { place: "Gael Tunnel", encounter: "Magma Wyrm" }],
  ["CL/(GT): Dragon Heart - boss drop", { place: "Gael Tunnel", encounter: "Magma Wyrm" }],
  [
    "CL/(SCT): Gravity Stone Chunk x10 - boss drop",
    { place: "Sellia Crystal Tunnel", encounter: "Fallingstar Beast" },
  ],
  [
    "CL/(SCT): Somberstone Miner's Bell Bearing [1] - boss drop",
    { place: "Sellia Crystal Tunnel", encounter: "Fallingstar Beast" },
  ],
  [
    "CL/(SCT): Smithing Stone [7] x5 - boss drop",
    { place: "Sellia Crystal Tunnel", encounter: "Fallingstar Beast" },
  ],
  [
    "CL/(SCT): Somber Smithing Stone [6] - boss drop",
    { place: "Sellia Crystal Tunnel", encounter: "Fallingstar Beast" },
  ],
  [
    "CL/DW: Map: Dragonbarrow - to E",
    { place: "East of Dragonbarrow West", encounter: "Map fragment" },
  ],
  [
    "DB/(IMS): Spiked Caestus - Isolated Merchant",
    { place: placeName("DB/(IMS)"), encounter: "Isolated Merchant" },
  ],
  [
    "DB/(IMS): Beast-Repellent Torch - Isolated Merchant",
    { place: placeName("DB/(IMS)"), encounter: "Isolated Merchant" },
  ],
  [
    "DB/(IMS): Land of Reeds Helm - Isolated Merchant",
    { place: placeName("DB/(IMS)"), encounter: "Isolated Merchant" },
  ],
  [
    "DB/IMS: Ash of War: Sky Shot - scarab W of IMS",
    { place: `West of ${placeName("DB/IMS")}`, encounter: "Scarab" },
  ],
  [
    "DB/DW: Somber Smithing Stone [8] - scarab to NE",
    { place: "North east of Dragonbarrow West", encounter: "Scarab" },
  ],
  [
    "DB/(FF): Dectus Medallion (Right) - chest top of ladder",
    { place: "Top of Fort Faroth", encounter: "Chest" },
  ],
  [
    "DB/LR: Bestial Constitution - scarab W of LR",
    { place: "West of Lenne's Rise", encounter: "Scarab" },
  ],
  [
    "DB/FG: Somber Smithing Stone [9] - scarab to W",
    { place: "West of Farum Greatbridge", encounter: "Scarab" },
  ],
  [
    "DB/(LR): Memory Stone - in chest top of tower",
    { place: "Top of Lenne's Rise", encounter: "Chest" },
  ],
]);
