/*! Key spots' names are built on the Elden Ring apworld 0.1.3's location names, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

import type { KeySpot } from "../../key-spots.js";
import { placeName } from "../../place-names.js";

/** Limgrave's key spots by exact Archipelago name, with the Weeping Peninsula's and Stormveil's. */
export const LIMGRAVE_KEY_SPOTS: ReadonlyMap<string, KeySpot> = new Map([
  [
    "SV/SeC: Golden Seed - seedtree to SE",
    { place: "South east of Secluded Cell", encounter: "Golden Seed tree" },
  ],
  [
    "LG/SS: Golden Seed - seedtree SE of SS",
    { place: "South east of Stormhill Shack", encounter: "Golden Seed tree" },
  ],
  [
    "LG/FHW: Golden Seed - seedtree to E",
    { place: "East of Fort Haight West", encounter: "Golden Seed tree" },
  ],
  [
    "LG/(TCM): Sacred Tear - by statue",
    { place: "Third Church of Marika", encounter: "Sacred Tear" },
  ],
  [
    "WP/(FCM): Sacred Tear - by statue",
    { place: "Fourth Church of Marika", encounter: "Sacred Tear" },
  ],
  [
    "WP/(CP): Sacred Tear - in front of statue",
    { place: "Church of Pilgrimage", encounter: "Sacred Tear" },
  ],
  [
    "WP/CM: Golden Seed - seedtree N of CM",
    { place: "North of Castle Morne", encounter: "Golden Seed tree" },
  ],
  [
    "WP/(CBC): Sacred Tear - by statue",
    { place: "Callu Baptismal Church", encounter: "Sacred Tear" },
  ],
  [
    "LG/TFS: Golden Halberd - first field boss",
    { place: "By the Church of Elleh", encounter: "Tree Sentinel" },
  ],
  [
    "LG/DBR: Dragon Heart - boss drop N of DBR",
    { place: "Agheel Lake, north of Dragon-Burnt Ruins", encounter: "Flying Dragon Agheel" },
  ],
  [
    "LG/ALN: Ash of War: Repeating Thrust - night boss drop to SE",
    { place: "Agheel Lake North", encounter: "Night's Cavalry" },
  ],
  [
    "LG/(FHE): Bloodhound's Fang - boss drop Evergaol",
    { place: "Forlorn Hound Evergaol", encounter: "Bloodhound Knight Darriwil" },
  ],
  ["LG/(SWV): Deathroot - boss drop", { place: "Summonwater Village", encounter: "Tibia Mariner" }],
  [
    "LG/(SWV): Skeletal Militiaman Ashes - boss drop",
    { place: "Summonwater Village", encounter: "Tibia Mariner" },
  ],
  [
    "LG/(WR): Glintstone Pebble - Sellen Shop",
    { place: "Waypoint Ruins cellar", encounter: "Mad Pumpkin Head" },
  ],
  [
    "LG/(WR): Glintstone Stars - Sellen Shop",
    { place: "Waypoint Ruins cellar", encounter: "Mad Pumpkin Head" },
  ],
  [
    "LG/(WR): Crystal Barrage - Sellen Shop",
    { place: "Waypoint Ruins cellar", encounter: "Mad Pumpkin Head" },
  ],
  [
    "LG/(WR): Glintstone Arc - Sellen Shop",
    { place: "Waypoint Ruins cellar", encounter: "Mad Pumpkin Head" },
  ],
  [
    "LG/(WR): Scholar's Armament - Sellen Shop",
    { place: "Waypoint Ruins cellar", encounter: "Mad Pumpkin Head" },
  ],
  [
    "LG/(WR): Scholar's Shield - Sellen Shop",
    { place: "Waypoint Ruins cellar", encounter: "Mad Pumpkin Head" },
  ],
  [
    "LG/(SE): Aspects of the Crucible: Tail - boss drop Evergaol",
    { place: "Stormhill Evergaol", encounter: "Crucible Knight" },
  ],
  [
    "LG/WS: Blue-Feathered Branchsword - night boss drop SE of WS",
    { place: "South east of Warmaster's Shack", encounter: "Deathbird" },
  ],
  [
    "LG/(WS): Bone Peddler's Bell Bearing - night boss drop",
    { place: "Warmaster's Shack", encounter: "Bell Bearing Hunter" },
  ],
  [
    "SV/CT: Talisman Pouch - boss drop",
    { place: "Stormveil gate", encounter: "Margit, the Fell Omen" },
  ],
  [
    "SV/SeC: Godrick's Great Rune - mainboss drop",
    { place: "End of Stormveil Castle", encounter: "Godrick the Grafted" },
  ],
  [
    "SV/SeC: Remembrance of the Grafted - mainboss drop",
    { place: "End of Stormveil Castle", encounter: "Godrick the Grafted" },
  ],
  [
    "WP/(WE): Radagon's Scarseal - boss drop Evergaol",
    { place: "Weeping Evergaol", encounter: "Ancient Hero of Zamor" },
  ],
  [
    "WP/(CM): Grafted Blade Greatsword - boss drop",
    { place: "Castle Morne", encounter: "Leonine Misbegotten" },
  ],
  [
    "WP/ME: Opaline Bubbletear - boss drop",
    { place: placeName("WP/ME"), encounter: "Erdtree Avatar" },
  ],
  [
    "WP/ME: Crimsonburst Crystal Tear - boss drop",
    { place: placeName("WP/ME"), encounter: "Erdtree Avatar" },
  ],
  [
    "WP/CMR: Sacrificial Axe - night boss drop far to SW",
    { place: "Far south west of Castle Morne Rampart", encounter: "Deathbird" },
  ],
  [
    "WP/CMR: Nightrider Flail - night boss drop to SW",
    { place: "South west of Castle Morne Rampart", encounter: "Night's Cavalry" },
  ],
  [
    "WP/CMR: Ash of War: Barricade Shield - night boss drop to SW",
    { place: "South west of Castle Morne Rampart", encounter: "Night's Cavalry" },
  ],
  [
    "SV/GG: Spectral Steed Regalia: Tree Sentinel - to NW in chest to right of throne",
    { place: "Stormveil throne room", encounter: "Chest" },
  ],
  [
    "SV/RT: Ash of War: Storm Assault - jump off raise part of outer wall to NW, scarab after breakable platform",
    { place: "Outer wall north west of Rampart Tower", encounter: "Scarab" },
  ],
  [
    "SV/SeC: Ash of War: Stormcaller - scarab to SW",
    { place: "South west of Secluded Cell", encounter: "Scarab" },
  ],
  [
    "SV/LC: Rancorcall - shortcut door to W, scarab at bottom to S",
    { place: "Below Liftside Chamber", encounter: "Scarab" },
  ],
  [
    "SV/RT: Pickled Turtle Neck x3 - shortcut elevator to SE, to NE, right of painting, up stairs to SE room, jump over wall with sandbags, follow path up ladder and drop down, in chest",
    { place: "Past the room east of Rampart Tower", encounter: "Chest" },
  ],
  [
    "SV/LC: Godslayer's Seal - left chest behind imp statue in storeroom SE of massive courtyard",
    { place: "Imp statue storeroom", encounter: "Left chest" },
  ],
  [
    "SV/RT: Mimic's Veil - shortcut elevator to SE, to NE, right of painting, up stairs to SE room in chest",
    { place: "Room east of Rampart Tower", encounter: "Chest" },
  ],
  [
    "SV/LC: Godskin Prayerbook - right chest behind imp statue in storeroom SE of massive courtyard",
    { place: "Imp statue storeroom", encounter: "Right chest" },
  ],
  [
    "LG/SV: Ash of War: Storm Wall - scarab E of SV after broken bridge",
    { place: "East of Stormveil, past the broken bridge", encounter: "Scarab" },
  ],
  [
    "LG/SS: Ash of War: Wild Strikes - scarab NW of SS",
    { place: "North west of Stormhill Shack", encounter: "Scarab" },
  ],
  [
    "LG/(SGa): Arrow's Reach Talisman - chest above gate",
    { place: "Above the Stormgate", encounter: "Chest" },
  ],
  [
    "LG/WS: Strength-knot Crystal Tear - in basin on cliff NW of WS",
    { place: "Cliff north west of Warmaster's Shack", encounter: "Basin" },
  ],
  [
    "LG/WS: Somber Smithing Stone [1] - scarab on ruin NE of WS",
    { place: "Ruin north east of Warmaster's Shack", encounter: "Scarab" },
  ],
  [
    "LG/WS: Beast Crest Heater Shield - chest within enemy camp NE of WS",
    { place: "Camp north east of Warmaster's Shack", encounter: "Chest" },
  ],
  [
    "SV/SMG: Caestus - Gostoc shop, after dark room or mainboss",
    { place: "Stormveil Main Gate", encounter: "Gatekeeper Gostoc" },
  ],
  [
    "SV/SMG: Buckler - Gostoc shop, after dark room or mainboss",
    { place: "Stormveil Main Gate", encounter: "Gatekeeper Gostoc" },
  ],
  [
    "SV/StC: Rusty Key - corpse in dark room",
    { place: "Dark room by Stormveil Cliffside", encounter: "Corpse" },
  ],
  [
    "SV/StC: Curved Sword Talisman - in chest in dark room",
    { place: "Dark room by Stormveil Cliffside", encounter: "Chest" },
  ],
  [
    "LG/CC: Broadsword - Nomadic Merchant SE of CC",
    { place: "South east of Coastal Cave", encounter: "Nomadic Merchant" },
  ],
  [
    "LG/CC: Club - Nomadic Merchant SE of CC",
    { place: "South east of Coastal Cave", encounter: "Nomadic Merchant" },
  ],
  [
    "LG/CC: Ash of War: Stamp (Sweep) - scarab NW of CC along beach",
    { place: "Beach north west of Coastal Cave", encounter: "Scarab" },
  ],
  ["LG/(CE): Crafting Kit - Kalé Shop", { place: "Church of Elleh", encounter: "Merchant Kalé" }],
  ["LG/(CE): Torch - Kalé Shop", { place: "Church of Elleh", encounter: "Merchant Kalé" }],
  [
    "LG/(CE): Large Leather Shield - Kalé Shop",
    { place: "Church of Elleh", encounter: "Merchant Kalé" },
  ],
  [
    "LG/(GR): Whetstone Knife - underground chest",
    { place: "Below Gatefront Ruins", encounter: "Chest" },
  ],
  [
    "LG/(GR): Map: Limgrave, West - map pillar",
    { place: "Gatefront Ruins", encounter: "Map fragment" },
  ],
  [
    "LG/(GR): Flail - in NE caravan chest",
    { place: "Gatefront Ruins, north east", encounter: "Caravan chest" },
  ],
  [
    "LG/(GR): Lordsworn's Greatsword - in NW caravan chest",
    { place: "Gatefront Ruins, north west", encounter: "Caravan chest" },
  ],
  [
    "LG/(GR): Ash of War: Storm Stomp - underground chest",
    { place: "Below Gatefront Ruins", encounter: "Chest" },
  ],
  [
    "LG/(DBR): Twinblade - underground chest hidden within ruin",
    { place: "Below Dragon-Burnt Ruins", encounter: "Chest" },
  ],
  [
    "LG/ALN: Ash of War: Determination - scarab to SE",
    { place: "South east of Agheel Lake North", encounter: "Scarab" },
  ],
  [
    "LG/ALS: Great Épée - to E in chest",
    { place: "East of Agheel Lake South", encounter: "Chest" },
  ],
  [
    "LG/ALS: Ash of War: Unsheathe - scarab to NW",
    { place: "North west of Agheel Lake South", encounter: "Scarab" },
  ],
  [
    "LG/WR: Greataxe - in caravan chest W of WR",
    { place: "West of Waypoint Ruins", encounter: "Caravan chest" },
  ],
  [
    "LG/AS: Somber Smithing Stone [1] - scarab W of AS",
    { place: `West of ${placeName("LG/AS")}`, encounter: "Scarab" },
  ],
  [
    "LG/SB: Short Sword - Nomadic Merchant to E",
    { place: "East of Saintsbridge", encounter: "Nomadic Merchant" },
  ],
  [
    "LG/SB: Halberd - Nomadic Merchant to E",
    { place: "East of Saintsbridge", encounter: "Nomadic Merchant" },
  ],
  [
    "LG/ME: Hand Axe - Nomadic Merchant S of ME",
    { place: `South of ${placeName("LG/ME")}`, encounter: "Nomadic Merchant" },
  ],
  [
    "LG/ME: Riveted Wooden Shield - Nomadic Merchant S of ME",
    { place: `South of ${placeName("LG/ME")}`, encounter: "Nomadic Merchant" },
  ],
  [
    "LG/SRW: Map: Limgrave, East - map pillar W of SRW",
    { place: "West of Siofra River Well", encounter: "Map fragment" },
  ],
  [
    "LG/ME: Greenspill Crystal Tear - in basin, Minor Erdtree",
    { place: placeName("LG/ME"), encounter: "Basin" },
  ],
  [
    "LG/ME: Spiked Cracked Tear - in basin, Minor Erdtree",
    { place: placeName("LG/ME"), encounter: "Basin" },
  ],
  [
    "LG/ME: Ash of War: Ground Slam - scarab W of ME",
    { place: `West of ${placeName("LG/ME")}`, encounter: "Scarab" },
  ],
  ["LG/(MR): Smithing Stone [2] - chest in ruins", { place: "Mistwood Ruins", encounter: "Chest" }],
  [
    "LG/(MR): Axe Talisman - chest underground",
    { place: "Below Mistwood Ruins", encounter: "Chest" },
  ],
  [
    "LG/(SWV): Green Turtle Talisman - behind imp statue",
    { place: "Summonwater Village, behind the imp statue", encounter: "Chest" },
  ],
  [
    "LG/(FH): Dectus Medallion (Left) - tower chest",
    { place: "Top of Fort Haight", encounter: "Chest" },
  ],
  [
    "LG/(TCM): Flask of Wondrous Physick - in basin or at RH after 2 great runes",
    { place: "Third Church of Marika", encounter: "Basin" },
  ],
  [
    "LG/(TCM): Crimson Crystal Tear - in basin",
    { place: "Third Church of Marika", encounter: "Basin" },
  ],
  [
    "LG/TCM: Ash of War: Sacred Blade - scarab N of TCM",
    { place: "North of Third Church of Marika", encounter: "Scarab" },
  ],
  ["RH: Dagger - Twin maiden shop", { place: "Roundtable Hold", encounter: "Twin Maiden Husks" }],
  [
    "RH: Longsword - Twin maiden shop",
    { place: "Roundtable Hold", encounter: "Twin Maiden Husks" },
  ],
  ["RH: Rapier - Twin maiden shop", { place: "Roundtable Hold", encounter: "Twin Maiden Husks" }],
  ["RH: Scimitar - Twin maiden shop", { place: "Roundtable Hold", encounter: "Twin Maiden Husks" }],
  [
    "RH: Assassin's Prayerbook - behind second imp statue in chest",
    { place: "Roundtable Hold, behind the second imp statue", encounter: "Chest" },
  ],
  [
    "RH: Crepus's Black-Key Crossbow - behind imp statue in chest",
    { place: "Roundtable Hold, behind the first imp statue", encounter: "Chest" },
  ],
  [
    "RH: Black-Key Bolt x20 - behind imp statue in chest",
    { place: "Roundtable Hold, behind the first imp statue", encounter: "Chest" },
  ],
  [
    "RH/DLC: Rapier - Twin maiden shop",
    { place: "Roundtable Hold, Shadow of the Erdtree", encounter: "Twin Maiden Husks" },
  ],
  [
    "RH/DLC: Scimitar - Twin maiden shop",
    { place: "Roundtable Hold, Shadow of the Erdtree", encounter: "Twin Maiden Husks" },
  ],
  [
    "RH/DLC: Mace - Twin maiden shop",
    { place: "Roundtable Hold, Shadow of the Erdtree", encounter: "Twin Maiden Husks" },
  ],
  [
    "RH/DLC: Battle Axe - Twin maiden shop",
    { place: "Roundtable Hold, Shadow of the Erdtree", encounter: "Twin Maiden Husks" },
  ],
  ["LG/(MCV): Parrying Dagger - Patches shop", { place: "Murkwater Cave", encounter: "Patches" }],
  [
    "LG/(MCV): Horse Crest Wooden Shield - Patches shop",
    { place: "Murkwater Cave", encounter: "Patches" },
  ],
  [
    "LG/(FHG): Golden Seed - boss drop",
    { place: "Fringefolk Hero's Grave", encounter: "Ulcerated Tree Spirit" },
  ],
  [
    "LG/(FHG): Banished Knight Oleg - boss drop",
    { place: "Fringefolk Hero's Grave", encounter: "Ulcerated Tree Spirit" },
  ],
  [
    "WP/(TCC): Lhutel the Headless - boss drop",
    { place: "Tombsward Catacombs", encounter: "Cemetery Shade" },
  ],
  [
    "WP/(IC): Demi-Human Ashes - boss drop",
    { place: "Impaler's Catacombs", encounter: "Erdtree Burial Watchdog" },
  ],
  [
    "LG/(SC): Noble Sorcerer Ashes - boss drop",
    { place: "Stormfoot Catacombs", encounter: "Erdtree Burial Watchdog" },
  ],
  [
    "LG/(MCC): Banished Knight Engvall - boss drop",
    { place: "Murkwater Catacombs", encounter: "Grave Warden Duelist" },
  ],
  [
    "LG/(DC): Assassin's Crimson Dagger - boss drop",
    { place: "Deathtouched Catacombs", encounter: "Black Knife Assassin" },
  ],
  ["LG/(DC): Deathroot - boss chest", { place: "Deathtouched Catacombs", encounter: "Chest" }],
  ["WP/(EC): Spelldrake Talisman - boss drop", { place: "Earthbore Cave", encounter: "Runebear" }],
  [
    "WP/(EC): Pickled Turtle Neck x3 - entrance chest",
    { place: "Earthbore Cave entrance", encounter: "Chest" },
  ],
  [
    "WP/(TCV): Viridian Amber Medallion - boss drop",
    { place: "Tombsward Cave", encounter: "Miranda the Blighted Bloom" },
  ],
  [
    "LG/(GC): Flamedrake Talisman - boss drop",
    { place: "Groveside Cave", encounter: "Beastman of Farum Azula" },
  ],
  [
    "LG/(CC): Tailoring Tools - boss drop",
    { place: "Coastal Cave", encounter: "Demi-Human Chief" },
  ],
  ["LG/(CC): Sewing Needle - boss drop", { place: "Coastal Cave", encounter: "Demi-Human Chief" }],
  [
    "LG/(HC): Blue Dancer Charm - boss drop",
    { place: "Highroad Cave", encounter: "Guardian Golem" },
  ],
  ["WP/(MT): Rusted Anchor - boss drop", { place: "Morne Tunnel", encounter: "Scaly Misbegotten" }],
  [
    "LG/(LT): Roar Medallion - boss drop",
    { place: "Limgrave Tunnels", encounter: "Stonedigger Troll" },
  ],
  [
    "WP/(IMS): Zweihander - Isolated Merchant",
    { place: placeName("WP/(IMS)"), encounter: "Isolated Merchant" },
  ],
  [
    "WP/(IMS): Great Arrow x15 - Isolated Merchant",
    { place: placeName("WP/(IMS)"), encounter: "Isolated Merchant" },
  ],
  [
    "WP/TwR: Divine Fortification - scarab SW of TwR, high on ruin",
    { place: "South west of Tombsward Ruins", encounter: "Scarab" },
  ],
  [
    "WP/(CM): Twinblade Talisman - after BC, chest top of W tower",
    { place: "Castle Morne, top of the west tower", encounter: "Chest" },
  ],
  [
    "WP/ME: Lightning Strike - scarab E of ME, drop down gravestones",
    { place: `East of ${placeName("WP/ME")}`, encounter: "Scarab" },
  ],
  [
    "WP/DHFR: Faith-knot Crystal Tear - N of DHFR in basin",
    { place: "North of Demi-Human Forest Ruins", encounter: "Basin" },
  ],
  [
    "WP/(DHFR): Shield of the Guilty - underground within S ruins",
    { place: "Below Demi-Human Forest Ruins", encounter: "Chest" },
  ],
  [
    "WP/CMR: Map: Weeping Peninsula - map pillar to SW",
    { place: "South west of Castle Morne Rampart", encounter: "Map fragment" },
  ],
  [
    "WP/CM: Poison Mist - scarab NE of CM, N of swamp",
    { place: "North east of Castle Morne", encounter: "Scarab" },
  ],
  [
    "WP/CMR: Bastard Sword - Nomadic Merchant to SE",
    { place: "South east of Castle Morne Rampart", encounter: "Nomadic Merchant" },
  ],
  [
    "WP/CMR: Red Thorn Roundshield - Nomadic Merchant to SE",
    { place: "South east of Castle Morne Rampart", encounter: "Nomadic Merchant" },
  ],
  [
    "WP/CMR: Round Shield - Nomadic Merchant to SE",
    { place: "South east of Castle Morne Rampart", encounter: "Nomadic Merchant" },
  ],
  [
    "WP/CMR: Ash of War: Mighty Shot - scarab to N",
    { place: "North of Castle Morne Rampart", encounter: "Scarab" },
  ],
  [
    "WP/CMR: Morning Star - in caravan chest to N",
    { place: "North of Castle Morne Rampart", encounter: "Caravan chest" },
  ],
  [
    "WP/(FLT): Hand Ballista - atop tower in chest",
    { place: "Top of Forest Lookout Tower", encounter: "Chest" },
  ],
  [
    "WP/(FLT): Ballista Bolt x5 - atop tower in chest",
    { place: "Top of Forest Lookout Tower", encounter: "Chest" },
  ],
  [
    "WP/(OR): Memory Stone - kill the 3 spirits",
    { place: "Top of Oridys's Rise", encounter: "Chest" },
  ],
  [
    "LG/(CDC): Somber Smithing Stone [1] - scarab to S",
    { place: `South of ${placeName("LG/(CDC)")}`, encounter: "Scarab" },
  ],
]);
