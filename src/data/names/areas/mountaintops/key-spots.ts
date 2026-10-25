/*! Key spots' names are built on the Elden Ring apworld 0.1.3's location names, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

import type { KeySpot } from "../../key-spots.js";
import { placeName } from "../../place-names.js";

/** The Mountaintops' key spots by exact Archipelago name, with the Forbidden Lands', Flame Peak's, the Snowfield's, the Haligtree's, Farum Azula's and Mohgwyn's. */
export const MOUNTAINTOPS_KEY_SPOTS: ReadonlyMap<string, KeySpot> = new Map([
  [
    "MP/(MDM): Festering Bloody Finger x10 - Imprisoned Merchant down first left in cave",
    { place: "Cave by Mohgwyn Dynasty Mausoleum", encounter: "Imprisoned Merchant" },
  ],
  [
    "MP/(MDM): Mohg's Great Rune - mainboss drop",
    { place: "Mohgwyn Dynasty Mausoleum", encounter: "Mohg, Lord of Blood" },
  ],
  [
    "MP/MDE: Map: Mohgwyn Palace - to NW",
    { place: `North west of ${placeName("MP/MDE")}`, encounter: "Map fragment" },
  ],
  [
    "MP/(MDM): Remembrance of the Blood Lord - mainboss drop",
    { place: "Mohgwyn Dynasty Mausoleum", encounter: "Mohg, Lord of Blood" },
  ],
  [
    "MP/PALR: Ash of War: Blood Tax - scarab to NE down path, first E dead-end in blood swamp",
    { place: "Blood swamp north east of Palace Approach Ledge-Road", encounter: "Scarab" },
  ],
  [
    "MP/(MDM): Somber Ancient Dragon Smithing Stone - in chest SE of boss elevator",
    { place: "Mohgwyn Dynasty Mausoleum, by the boss lift", encounter: "Chest" },
  ],
  [
    "FA/BGB: Remembrance of the Dragonlord - alt mainboss drop",
    { place: "Beside the Great Bridge", encounter: "Dragonlord Placidusax" },
  ],
  [
    "FA/BGB: Remembrance of the Black Blade - mainboss drop",
    { place: "End of Crumbling Farum Azula", encounter: "Maliketh, the Black Blade" },
  ],
  [
    "FA/DTL: Golden Lightning Fortification - scarab to SE up right path, SW of seedtree",
    { place: "South east of Dragon Temple Lift", encounter: "Scarab" },
  ],
  [
    "FA/DTR: Drake Knight Helm - in chest to E down ladder, down NE path behind elevator",
    { place: "East of Dragon Temple Rooftop", encounter: "Chest" },
  ],
  [
    "FA/DTR: Drake Knight Armor - in chest to E down ladder, down NE path behind elevator",
    { place: "East of Dragon Temple Rooftop", encounter: "Chest" },
  ],
  [
    "FA/DTR: Drake Knight Gauntlets - in chest to E down ladder, down NE path behind elevator",
    { place: "East of Dragon Temple Rooftop", encounter: "Chest" },
  ],
  [
    "FA/DTR: Drake Knight Greaves - in chest to E down ladder, down NE path behind elevator",
    { place: "East of Dragon Temple Rooftop", encounter: "Chest" },
  ],
  [
    "FA/DTR: Dragon Towershield - in chest to SE, down path E of courtyard, left at top of ladder",
    { place: "South east of Dragon Temple Rooftop", encounter: "Chest" },
  ],
  [
    "FA/BGB: Old Lord's Talisman - in chest to NE end of path",
    { place: "North east of Beside the Great Bridge", encounter: "Chest" },
  ],
  [
    "FA/DTR: Golden Seed - seedtree to SE, NE of courtyard above",
    { place: "South east of Dragon Temple Rooftop", encounter: "Golden Seed tree" },
  ],
  [
    "FA/DTL: Golden Seed - seedtree to SE up right path",
    { place: "South east of Dragon Temple Lift", encounter: "Golden Seed tree" },
  ],
  [
    "FA/DTT: Smithing-Stone Miner's Bell Bearing [4] - boss drop",
    { place: "Dragon Temple", encounter: "Godskin Duo" },
  ],
  [
    "FA/DTT: Ash of War: Black Flame Tornado - boss drop",
    { place: "Dragon Temple", encounter: "Godskin Duo" },
  ],
  [
    "EBH/HR: Malenia's Great Rune - mainboss drop",
    { place: "End of Elphael", encounter: "Malenia, Blade of Miquella" },
  ],
  [
    "EBH/HR: Remembrance of the Rot Goddess - mainboss drop",
    { place: "End of Elphael", encounter: "Malenia, Blade of Miquella" },
  ],
  [
    "EBH/HP: Ancient Dragon Smithing Stone - in chest up stairs after ladder",
    { place: "Haligtree Promenade, up the stairs", encounter: "Chest" },
  ],
  [
    "EBH/PR: Triple Rings of Light - drop down to E, in chest behind imp statue",
    { place: "Below Prayer Room, behind the imp statue", encounter: "Chest" },
  ],
  [
    "EBH/PR: Cleanrot Knight Finlay - in chest W of gazebo",
    { place: "West of the gazebo by Prayer Room", encounter: "Chest" },
  ],
  [
    "EBH/PR: Somber Ancient Dragon Smithing Stone - in chest up the buttress NW of gazebo",
    { place: "Buttress north west of the gazebo by Prayer Room", encounter: "Chest" },
  ],
  [
    "EBH/EIW: Rotten Crystal Sword - in chest to S past roots on left",
    { place: "South of Elphael Inner Wall", encounter: "Chest" },
  ],
  [
    "EBH/DC: Dragoncrest Greatshield Talisman - in chest after drop down on main building roof",
    { place: "Roof by Drainage Channel", encounter: "Chest" },
  ],
  [
    "MH/HTP: Loretta's War Sickle - boss drop",
    { place: "Haligtree Town Plaza", encounter: "Loretta, Knight of the Haligtree" },
  ],
  [
    "MH/HTP: Loretta's Mastery - boss drop",
    { place: "Haligtree Town Plaza", encounter: "Loretta, Knight of the Haligtree" },
  ],
  [
    "MH/HTP: Viridian Amber Medallion +2 - to NE first building lower floor in chest",
    { place: "Building north east of Haligtree Town Plaza", encounter: "Chest" },
  ],
  [
    "FP/(GCHG): Zamor Curved Sword - boss drop",
    { place: "Giant-Conquering Hero's Grave", encounter: "Ancient Hero of Zamor" },
  ],
  [
    "FP/(GCHG): Zamor Mask - boss drop",
    { place: "Giant-Conquering Hero's Grave", encounter: "Ancient Hero of Zamor" },
  ],
  [
    "FP/(GCHG): Zamor Armor - boss drop",
    { place: "Giant-Conquering Hero's Grave", encounter: "Ancient Hero of Zamor" },
  ],
  [
    "FP/(GCHG): Zamor Bracelets - boss drop",
    { place: "Giant-Conquering Hero's Grave", encounter: "Ancient Hero of Zamor" },
  ],
  [
    "FP/(GCHG): Zamor Legwraps - boss drop",
    { place: "Giant-Conquering Hero's Grave", encounter: "Ancient Hero of Zamor" },
  ],
  [
    "MotG/(GMC): Glovewort Picker's Bell Bearing [2] - boss drop",
    { place: "Giants' Mountaintop Catacombs", encounter: "Ulcerated Tree Spirit" },
  ],
  [
    "MotG/(GMC): Golden Seed - boss drop",
    { place: "Giants' Mountaintop Catacombs", encounter: "Ulcerated Tree Spirit" },
  ],
  [
    "MotG/(GMC): Fire Monk Ashes - in chest down main elevator x2, follow path to dead-end",
    { place: "Bottom of Giants' Mountaintop Catacombs", encounter: "Chest" },
  ],
  [
    "MotG/(GMC): Deathroot - in chest after boss",
    { place: "Giants' Mountaintop Catacombs", encounter: "Chest" },
  ],
  [
    "CS/(CSC): Rotten Gravekeeper Cloak - boss drop",
    { place: "Consecrated Snowfield Catacombs", encounter: "Putrid Grave Warden Duelist" },
  ],
  [
    "CS/(CSC): Great Grave Glovewort x2 - boss drop",
    { place: "Consecrated Snowfield Catacombs", encounter: "Putrid Grave Warden Duelist" },
  ],
  [
    "CS/(HPH): Blackflame Monk Amon - boss drop",
    { place: "Hidden Path to the Haligtree", encounter: "Stray Mimic Tear" },
  ],
  [
    "CS/(HPH): Silver Scarab - in chest S from drop off behind illusory wall",
    { place: "Hidden Path to the Haligtree, behind an illusory wall", encounter: "Chest" },
  ],
  [
    "CS/(HPH): Deathroot - in chest after boss",
    { place: "Hidden Path to the Haligtree", encounter: "Chest" },
  ],
  [
    "CS/(CF): Golden Order Greatsword - boss drop",
    { place: "Cave of the Forlorn", encounter: "Misbegotten Crusader" },
  ],
  [
    "MotG/(SC): Godskin Swaddling Cloth - boss drop",
    { place: "Spiritcaller's Cave", encounter: "Spirit-Caller Snail" },
  ],
  [
    "MotG/(SC): Black Flame Ritual - boss drop",
    { place: "Spiritcaller's Cave", encounter: "Spirit-Caller Snail" },
  ],
  [
    "CS/(YAT): Meteorite of Astel - boss drop",
    { place: "Yelough Anix Tunnel", encounter: "Astel, Stars of Darkness" },
  ],
  [
    "CS/(YAR): Unendurable Frenzy - in chest underground",
    { place: "Below Yelough Anix Ruins", encounter: "Chest" },
  ],
  [
    "CS/ICS: Ancient Dragon Smithing Stone - night boss drop, following caravan to SW",
    {
      place: "Caravan south west of Inner Consecrated Snowfield",
      encounter: "Night's Cavalry Duo",
    },
  ],
  [
    "CS/ICS: Night's Cavalry Helm - night boss drop, following caravan to SW",
    {
      place: "Caravan south west of Inner Consecrated Snowfield",
      encounter: "Night's Cavalry Duo",
    },
  ],
  [
    "CS/ICS: Night's Cavalry Armor - night boss drop, following caravan to SW",
    {
      place: "Caravan south west of Inner Consecrated Snowfield",
      encounter: "Night's Cavalry Duo",
    },
  ],
  [
    "CS/ICS: Night's Cavalry Gauntlets - night boss drop, following caravan to SW",
    {
      place: "Caravan south west of Inner Consecrated Snowfield",
      encounter: "Night's Cavalry Duo",
    },
  ],
  [
    "CS/ICS: Night's Cavalry Greaves - night boss drop, following caravan to SW",
    {
      place: "Caravan south west of Inner Consecrated Snowfield",
      encounter: "Night's Cavalry Duo",
    },
  ],
  [
    "CS/ICS: Flowing Curved Sword - in caravan chest to SW",
    { place: "South west of Inner Consecrated Snowfield", encounter: "Caravan chest" },
  ],
  [
    "CS/ICS: Map: Consecrated Snowfield - map pillar to N",
    { place: "North of Inner Consecrated Snowfield", encounter: "Map fragment" },
  ],
  [
    "CS/ICS: Ash of War: White Shadow's Lure - scarab to NW",
    { place: "North west of Inner Consecrated Snowfield", encounter: "Scarab" },
  ],
  [
    "CS/AD: Explosive Ghostflame - night boss drop to SE on frozen river",
    { place: "Frozen river south east of Apostate Derelict", encounter: "Death Rite Bird" },
  ],
  [
    "CS/OLT: Golden Seed - seedtree SW of OLT",
    { place: "South west of Ordina, Liturgical Town", encounter: "Golden Seed tree" },
  ],
  [
    "CS/CS: Somber Smithing Stone [8] - scarab to NE",
    { place: "North east of Consecrated Snowfield", encounter: "Scarab" },
  ],
  [
    "CS/CS: St. Trina's Torch - in caraven chest to NE",
    { place: "North east of Consecrated Snowfield", encounter: "Caravan chest" },
  ],
  [
    "CS/CS: Golden Seed - seedtree to NE next to big tree",
    { place: "North east of Consecrated Snowfield", encounter: "Golden Seed tree" },
  ],
  [
    "CS/ME: Somber Smithing Stone [7] - scarab W of ME below on rocks, SW scarab",
    { place: `Rocks west of ${placeName("CS/ME")}, south west`, encounter: "Scarab" },
  ],
  [
    "CS/ME: Somber Smithing Stone [8] - scarab W of ME below on rocks, NW scarab",
    { place: `Rocks west of ${placeName("CS/ME")}, north west`, encounter: "Scarab" },
  ],
  [
    "CS/ME: Somber Smithing Stone [9] - scarab W of ME below on rocks, E scarab",
    { place: `Rocks west of ${placeName("CS/ME")}, east`, encounter: "Scarab" },
  ],
  [
    "CS/AR: Rune Arc - in chest SE of AR on cliff above",
    { place: "Cliff south east of Albinauric Rise", encounter: "Chest" },
  ],
  [
    "CS/CF: Dragon Heart x3 - boss drop E of CF",
    { place: "East of Cave of the Forlorn", encounter: "Great Wyrm Theodorix" },
  ],
  [
    "CS/ME: Thorny Cracked Tear - boss drop N of ME",
    { place: `North of ${placeName("CS/ME")}`, encounter: "Putrid Avatar" },
  ],
  [
    "CS/ME: Ruptured Crystal Tear - boss drop N of ME",
    { place: `North of ${placeName("CS/ME")}`, encounter: "Putrid Avatar" },
  ],
  [
    "FL/FL: Ash of War: Phantom Slash - night boss drop to E",
    { place: "East of Forbidden Lands", encounter: "Night's Cavalry" },
  ],
  [
    "FL/GLR: Gargoyle's Black Blades - boss drop to S",
    { place: "South of Grand Lift of Rold", encounter: "Black Blade Kindred" },
  ],
  [
    "FL/GLR: Gargoyle's Black Axe - boss drop to S",
    { place: "South of Grand Lift of Rold", encounter: "Black Blade Kindred" },
  ],
  [
    "FL/GLR: Golden Seed - seedtree to S",
    { place: "South of Grand Lift of Rold", encounter: "Golden Seed tree" },
  ],
  [
    "MotG/(GLR): Map: Mountaintops of the Giants, West - map pillar NE of GLR",
    { place: "North east of Grand Lift of Rold", encounter: "Map fragment" },
  ],
  [
    "MotG/(ZR): Smithing-Stone Miner's Bell Bearing [3] - in chest underground",
    { place: "Below Zamor Ruins", encounter: "Chest" },
  ],
  [
    "MotG/ZR: Somber Smithing Stone [7] - scarab to SE in tree",
    { place: "Tree south east of Zamor Ruins", encounter: "Scarab" },
  ],
  [
    "MotG/CSMG: Death Ritual Spear - boss drop to W by statue",
    { place: "West of Castle Sol Main Gate", encounter: "Death Rite Bird" },
  ],
  [
    "MotG/(SL): Vagabond Knight Helm - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
    { place: "South of Shack of the Lofty", encounter: "Hermit Merchant" },
  ],
  [
    "MotG/(SL): Vagabond Knight Armor - Hermit Merchant S of SL up spiritsping above to W of ASVR grace",
    { place: "South of Shack of the Lofty", encounter: "Hermit Merchant" },
  ],
  [
    "MotG/ASVR: Somber Smithing Stone [8] - scarab to S",
    { place: "South of Ancient Snow Valley Ruins", encounter: "Scarab" },
  ],
  [
    "MotG/(SR): Primal Glintstone Blade - in chest underground behind jellyfish seal",
    { place: "Below Stargazer's Ruins", encounter: "Chest" },
  ],
  [
    "MotG/(CS): Haligtree Secret Medallion (Left) - after boss",
    { place: "Castle Sol", encounter: "Commander Niall" },
  ],
  [
    "MotG/(CS): Veteran's Prosthesis - mainboss drop",
    { place: "Castle Sol", encounter: "Commander Niall" },
  ],
  [
    "MotG/GG: Ash of War: Prelate's Charge - scarab E of GG high on thorn",
    { place: "Thorn east of Guardian's Garrison", encounter: "Scarab" },
  ],
  [
    "MotG/(GG): Giant's Prayerbook - in chest top of highest tower",
    { place: "Top of Guardian's Garrison", encounter: "Chest" },
  ],
  [
    "MotG/(ME): Cerulean Crystal Tear - boss drop",
    { place: placeName("MotG/(ME)"), encounter: "Erdtree Avatar" },
  ],
  [
    "MotG/(ME): Crimson Bubbletear - boss drop",
    { place: placeName("MotG/(ME)"), encounter: "Erdtree Avatar" },
  ],
  [
    "MotG/FR: Golden Seed - seedtree to SW",
    { place: "South west of Freezing Lake", encounter: "Golden Seed tree" },
  ],
  [
    "MotG/(HR): Founding Rain of Stars - in chest after crossing invisible bridge",
    { place: "Top of Heretical Rise", encounter: "Chest" },
  ],
  [
    "MotG/(LCE): Fingerprint Helm - boss drop Evergaol",
    { place: "Lord Contender's Evergaol", encounter: "Roundtable Knight Vyke" },
  ],
  [
    "MotG/(LCE): Fingerprint Armor - boss drop Evergaol",
    { place: "Lord Contender's Evergaol", encounter: "Roundtable Knight Vyke" },
  ],
  [
    "MotG/(LCE): Fingerprint Gauntlets - boss drop Evergaol",
    { place: "Lord Contender's Evergaol", encounter: "Roundtable Knight Vyke" },
  ],
  [
    "MotG/(LCE): Fingerprint Greaves - boss drop Evergaol",
    { place: "Lord Contender's Evergaol", encounter: "Roundtable Knight Vyke" },
  ],
  [
    "MotG/(LCE): Vyke's Dragonbolt - boss drop Evergaol",
    { place: "Lord Contender's Evergaol", encounter: "Roundtable Knight Vyke" },
  ],
  [
    "MotG/FR: Ash of War: Seppuku - scarab to E",
    { place: "East of Freezing Lake", encounter: "Scarab" },
  ],
  [
    "MotG/(FCM): Sacred Tear - by statue",
    { place: "First Church of Marika", encounter: "Sacred Tear" },
  ],
  [
    "MotG/FR: Dragon Heart - boss drop to SE",
    { place: "South east of Freezing Lake", encounter: "Borealis the Freezing Fog" },
  ],
  [
    "FP/FF: Somber Smithing Stone [8] - scarab to W",
    { place: "West of Foot of the Forge", encounter: "Scarab" },
  ],
  ["FP/(CR): Sacred Tear - by statue", { place: "Church of Repose", encounter: "Sacred Tear" }],
  [
    "FP/FF: Remembrance of the Fire Giant - mainboss drop",
    { place: "Flame Peak", encounter: "Fire Giant" },
  ],
  [
    "FP/FF: Golden Seed - seedtree to NE",
    { place: "North east of Foot of the Forge", encounter: "Golden Seed tree" },
  ],
  [
    "FP/GG: Map: Mountaintops of the Giants, East - map pillar",
    { place: "Giant's Gravepost", encounter: "Map fragment" },
  ],
  [
    "FP/FF: Crimsonwhorl Bubbletear - in basin overlooking chain from MotG, follow N path to lower area",
    { place: "North of Foot of the Forge, overlooking the chain", encounter: "Basin" },
  ],
]);
