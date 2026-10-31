/*! Key spots' names are built on the Elden Ring apworld 0.1.4's location names, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

import type { KeySpot } from "../../key-spots.js";
import { placeName } from "../../place-names.js";

/** The Altus Plateau's key spots by exact Archipelago name, with Mt. Gelmir's, Volcano Manor's, the Shaded Castle's, the Capital Outskirts' and Leyndell's, above and below ground. */
export const ALTUS_KEY_SPOTS: ReadonlyMap<string, KeySpot> = new Map([
  [
    "AP/EGH: Golden Seed - seedtree to NE",
    { place: "North east of Erdtree-Gazing Hill", encounter: "Golden Seed tree" },
  ],
  [
    "AP/AHJ: Golden Seed - seedtree to N",
    { place: "North of Altus Highway Junction", encounter: "Golden Seed tree" },
  ],
  [
    "AP/(SCM): Sacred Tear - by statue",
    { place: "Second Church of Marika", encounter: "Sacred Tear" },
  ],
  ["AP/(ScC): Sacred Tear - by statue", { place: "Stormcaller Church", encounter: "Sacred Tear" }],
  [
    "AP/ME: Golden Seed - seedtree N of ME",
    { place: `North of ${placeName("AP/ME")}`, encounter: "Golden Seed tree" },
  ],
  [
    "AP/WV: Golden Seed - seedtree to SE",
    { place: "South east of Windmill Village", encounter: "Golden Seed tree" },
  ],
  [
    "LRC|LAC/WCR: Golden Seed - seedtree to SE",
    { place: "South east of West Capital Rampart", encounter: "Golden Seed tree" },
  ],
  [
    "MtG/VM: Golden Seed - seedtree NW of VM",
    { place: "North west of Volcano Manor", encounter: "Golden Seed tree" },
  ],
  [
    "MtG/SR: Golden Seed - seedtree to N",
    { place: "North of Seethewater River", encounter: "Golden Seed tree" },
  ],
  [
    "CO/OWPT: Golden Seed 1 - seedtree",
    { place: "Outer Wall Phantom Tree, 1st seed", encounter: "Golden Seed tree" },
  ],
  [
    "CO/OWPT: Golden Seed 2 - seedtree",
    { place: "Outer Wall Phantom Tree, 2nd seed", encounter: "Golden Seed tree" },
  ],
  [
    "CO/OWPT: Golden Seed 1 - seedtree to NE top of stairs",
    {
      place: "North east of the Phantom Tree at the top of the stairs, 1st seed",
      encounter: "Golden Seed tree",
    },
  ],
  [
    "CO/OWPT: Golden Seed 2 - seedtree to NE top of stairs",
    {
      place: "North east of the Phantom Tree at the top of the stairs, 2nd seed",
      encounter: "Golden Seed tree",
    },
  ],
  [
    "AP/LR: Ritual Sword Talisman - in chest after boss underground",
    { place: "Lux Ruins cellar", encounter: "Demi-Human Queen Gilika" },
  ],
  [
    "AP/RP: Lansseax's Glaive - boss drop up hill to SW or NE of AC grace",
    { place: "Rampartside Path / Abandoned Coffin", encounter: "Ancient Dragon Lansseax" },
  ],
  ["AP/WhR: Deathroot - boss drop", { place: "Wyndham Ruins", encounter: "Tibia Mariner" }],
  ["AP/WhR: Tibia's Summons - boss drop", { place: "Wyndham Ruins", encounter: "Tibia Mariner" }],
  [
    "AP/GLE: Godfrey Icon - boss drop Evergaol",
    { place: "Golden Lineage Evergaol", encounter: "Godefroy the Grafted" },
  ],
  [
    "AP/AHJ: Ash of War: Shared Order - night boss drop to SW",
    { place: "South west of Altus Highway Junction", encounter: "Night's Cavalry" },
  ],
  [
    "TSC/SCIG: Marais Executioner's Sword - boss drop",
    { place: "End of the Shaded Castle", encounter: "Elemer of the Briar" },
  ],
  [
    "TSC/SCIG: Briar Greatshield - boss drop",
    { place: "End of the Shaded Castle", encounter: "Elemer of the Briar" },
  ],
  [
    "AP/SHG: Black Knife - boss drop guarding SHG",
    { place: "Sainted Hero's Grave entrance", encounter: "Black Knife Assassin" },
  ],
  [
    "AP/(WbR): Bloody Helice - in chest after boss underground",
    { place: "Writheblood Ruins", encounter: "Sanguine Noble" },
  ],
  [
    "AP/AHJ: Gravity Stone Chunk x10 - boss drop S of great stairs in meteor crater",
    { place: "Crater south of the great stairs", encounter: "Fallingstar Beast" },
  ],
  [
    "AP/AHJ: Smithing Stone [6] x5 - boss drop S of great stairs in meteor crater",
    { place: "Crater south of the great stairs", encounter: "Fallingstar Beast" },
  ],
  [
    "AP/AHJ: Somber Smithing Stone [5] - boss drop S of great stairs in meteor crater",
    { place: "Crater south of the great stairs", encounter: "Fallingstar Beast" },
  ],
  [
    "AP/AHJ: Erdtree Greatshield - boss drop duo to E top of great stairs",
    { place: "Duo at the top of the great stairs", encounter: "Tree Sentinels" },
  ],
  [
    "AP/AHJ: Hero's Rune [1] - boss drop duo to E top of great stairs",
    { place: "Duo at the top of the great stairs", encounter: "Tree Sentinels" },
  ],
  [
    "AP/ME: Crimsonspill Crystal Tear - boss drop, Minor Erdtree",
    { place: placeName("AP/ME"), encounter: "Wormface" },
  ],
  [
    "AP/ME: Speckled Hardtear - boss drop, Minor Erdtree",
    { place: placeName("AP/ME"), encounter: "Wormface" },
  ],
  [
    "AP/(DWV): Godskin Peeler - boss drop",
    { place: "Dominula, Windmill Village", encounter: "Godskin Apostle" },
  ],
  [
    "AP/(DWV): Scouring Black Flame - boss drop",
    { place: "Dominula, Windmill Village", encounter: "Godskin Apostle" },
  ],
  [
    "CO/HMS: Twinbird Kite Shield - night boss drop to NE in block flower field",
    { place: "Flower field north east of Hermit Merchant's Shack", encounter: "Deathbird" },
  ],
  [
    "CO/(HMS): Medicine Peddler's Bell Bearing - night boss drop",
    { place: "Hermit Merchant's Shack", encounter: "Bell Bearing Hunter" },
  ],
  [
    "MtG/FL: Dragon Heart - boss drop S of FL in magma lake",
    { place: "Magma lake south of Fort Laiedd", encounter: "Magma Wyrm" },
  ],
  [
    "MtG/NMGC: Fallingstar Beast Jaw - boss drop",
    {
      place: "Summit crater by Ninth Mt. Gelmir Campsite",
      encounter: "Full-Grown Fallingstar Beast",
    },
  ],
  [
    "MtG/NMGC: Smithing Stone [6] x5 - boss drop",
    {
      place: "Summit crater by Ninth Mt. Gelmir Campsite",
      encounter: "Full-Grown Fallingstar Beast",
    },
  ],
  [
    "MtG/NMGC: Somber Smithing Stone [6] - boss drop",
    {
      place: "Summit crater by Ninth Mt. Gelmir Campsite",
      encounter: "Full-Grown Fallingstar Beast",
    },
  ],
  [
    "MtG/PSA: Memory Stone - boss drop to S",
    { place: "Hermit Village", encounter: "Demi-Human Queen Maggie" },
  ],
  [
    "MtG/ME: Leaden Hardtear - boss drop, Minor Erdtree",
    { place: placeName("MtG/ME"), encounter: "Ulcerated Tree Spirit" },
  ],
  [
    "MtG/ME: Cerulean Hidden Tear - boss drop, Minor Erdtree",
    { place: placeName("MtG/ME"), encounter: "Ulcerated Tree Spirit" },
  ],
  [
    "VM/AP: Rykard's Great Rune - mainboss drop",
    { place: "End of Volcano Manor", encounter: "Rykard, Lord of Blasphemy" },
  ],
  [
    "VM/AP: Remembrance of the Blasphemous - mainboss drop",
    { place: "End of Volcano Manor", encounter: "Rykard, Lord of Blasphemy" },
  ],
  [
    "(VM)/SIC: Inquisitor's Girandole - boss drop, from RLA warp",
    { place: placeName("(VM)/SIC"), encounter: "Abductor Virgins" },
  ],
  [
    "VM/GH: Godskin Stitcher - boss drop",
    { place: "Temple of Eiglay", encounter: "Godskin Noble" },
  ],
  ["VM/GH: Noble Presence - boss drop", { place: "Temple of Eiglay", encounter: "Godskin Noble" }],
  [
    "LRC/WCR: Talisman Pouch - mainboss drop",
    { place: "Leyndell, Royal Capital", encounter: "Godfrey, First Elden Lord" },
  ],
  [
    "LRC/QB: Morgott's Great Rune - mainboss drop",
    { place: "Elden Throne, by the Queen's Bedchamber", encounter: "Morgott, the Omen King" },
  ],
  [
    "LRC/QB: Remembrance of the Omen King - mainboss drop",
    { place: "Elden Throne, by the Queen's Bedchamber", encounter: "Morgott, the Omen King" },
  ],
  [
    "SSG/FD: Bloodflame Talons - boss drop",
    { place: "Cathedral of the Forsaken", encounter: "Mohg, the Omen" },
  ],
  [
    "AP/PR: Perfumer's Cookbook [1] - in chest middle of ruins",
    { place: "Perfumer's Ruins", encounter: "Chest" },
  ],
  [
    "AP/PR: Perfumer's Talisman - in chest underground",
    { place: "Below Perfumer's Ruins", encounter: "Chest" },
  ],
  [
    "AP/AC: Ash of War: Sacred Order - scarab to NW",
    { place: "North west of Abandoned Coffin", encounter: "Scarab" },
  ],
  [
    "AP/LR: Ash of War: Shield Crash - scarab N side of ruins",
    { place: "North of Lux Ruins", encounter: "Scarab" },
  ],
  [
    "AP/EGH: Greatshield Talisman - in caravan chest to E",
    { place: "East of Erdtree-Gazing Hill", encounter: "Caravan chest" },
  ],
  [
    "AP/WhR: Pearldrake Talisman +1 - in chest underground behind a imp statue",
    { place: "Below Wyndham Ruins, behind the imp statue", encounter: "Chest" },
  ],
  [
    "AP/AHJ: Ash of War: Earthshaker - scarab to SW on road",
    { place: "Road south east of Altus Highway Junction", encounter: "Scarab" },
  ],
  [
    "AP/AHJ: Troll's Golden Sword - in caravan chest to W in lower camp",
    { place: "Lower camp west of Altus Highway Junction", encounter: "Caravan chest" },
  ],
  [
    "AP/EGH: Ash of War: Blood Blade - scarab to NE in pond",
    { place: "Pond north east of Erdtree-Gazing Hill", encounter: "Scarab" },
  ],
  [
    "AP/(MR): Unseen Blade - in chest top of tower",
    { place: "Top of Mirage Rise", encounter: "Chest" },
  ],
  [
    "AP/(MR): Unseen Form -  in chest top of tower",
    { place: "Top of Mirage Rise", encounter: "Chest" },
  ],
  [
    "TSC/SCR: Valkyrie's Prosthesis - in chest NW inner wall tower",
    { place: "Shaded Castle, north west tower", encounter: "Chest" },
  ],
  [
    "AP/SHG: Ash of War: Lightning Ram - scarab SE of SHG",
    { place: "South east of Sainted Hero's Grave", encounter: "Scarab" },
  ],
  [
    "AP/FSG: Scorpion Kite Shield - Nomadic Merchant",
    { place: "Forest-Spanning Greatbridge", encounter: "Nomadic Merchant" },
  ],
  [
    "AP/FSG: Red Crest Heater Shield - Nomadic Merchant",
    { place: "Forest-Spanning Greatbridge", encounter: "Nomadic Merchant" },
  ],
  [
    "AP/AHJ: Map: Altus Plateau - to N by map pillar",
    { place: "North of Altus Highway Junction", encounter: "Map fragment" },
  ],
  [
    "AP/BB: Somber Smithing Stone [5] - scarab to SW",
    { place: "South west of Bower of Bounty", encounter: "Scarab" },
  ],
  [
    "AP/RISP: Protection of the Erdtree - scarab to SW",
    { place: "South west of Road of Iniquity Side Path", encounter: "Scarab" },
  ],
  [
    "AP/RISP: Great Stars - in caravan chest to SW",
    { place: "South west of Road of Iniquity Side Path", encounter: "Caravan chest" },
  ],
  [
    "AP/(WfR): Ash of War: Golden Slam - scarab in ruins N of ME",
    { place: "Woodfolk Ruins", encounter: "Scarab" },
  ],
  [
    "AP/(HLT): Greatbow - in chest top of tower",
    { place: `Top of ${placeName("AP/(HLT)")}`, encounter: "Chest" },
  ],
  [
    "AP/(HLT): Great Arrow x20 - in chest top of tower",
    { place: `Top of ${placeName("AP/(HLT)")}`, encounter: "Chest" },
  ],
  [
    "AP/HLT: Ash of War: Lightning Slash - scarab SE of HLT",
    { place: `South east of ${placeName("AP/HLT")}`, encounter: "Scarab" },
  ],
  [
    "AP/SR: Ash of War: Barrage - scarab to N",
    { place: "North of Seethewater River", encounter: "Scarab" },
  ],
  [
    "LRC/ET: Rold Medallion - talk to Melina after boss",
    { place: "Elden Throne", encounter: "Melina" },
  ],
  [
    "LRC|LAC/ES: Erdtree Bow - in chest second floor",
    { place: "Erdtree Sanctuary, upper floor", encounter: "Chest" },
  ],
  ["LRC|LAC/(DB): Blessed Dew Talisman - in chest", { place: "Divine Bridge", encounter: "Chest" }],
  [
    "LAC/LCA: Scepter of the All-Knowing - boss drop",
    { place: "Erdtree Sanctuary", encounter: "Sir Gideon Ofnir, the All-Knowing" },
  ],
  [
    "LAC/LCA: All-Knowing Helm - boss drop",
    { place: "Erdtree Sanctuary", encounter: "Sir Gideon Ofnir, the All-Knowing" },
  ],
  [
    "LAC/LCA: All-Knowing Armor - boss drop",
    { place: "Erdtree Sanctuary", encounter: "Sir Gideon Ofnir, the All-Knowing" },
  ],
  [
    "LAC/LCA: All-Knowing Gauntlets - boss drop",
    { place: "Erdtree Sanctuary", encounter: "Sir Gideon Ofnir, the All-Knowing" },
  ],
  [
    "LAC/LCA: All-Knowing Greaves - boss drop",
    { place: "Erdtree Sanctuary", encounter: "Sir Gideon Ofnir, the All-Knowing" },
  ],
  [
    "LAC/QB: Remembrance of Hoarah Loux - mainboss drop",
    { place: "Elden Throne, by the Queen's Bedchamber", encounter: "Hoarah Loux" },
  ],
  [
    "MtG/RI: Map: Mt. Gelmir - map pillar to W",
    { place: "West of Road of Iniquity", encounter: "Map fragment" },
  ],
  [
    "MtG/VM: Ash of War: Through and Through - scarab NW of VM",
    { place: "North west of Volcano Manor", encounter: "Scarab" },
  ],
  [
    "MtG/NMGC: Guilty Hood - Nomadic Merchant in ladder section to E",
    { place: "East of Ninth Mt. Gelmir Campsite", encounter: "Nomadic Merchant" },
  ],
  [
    "MtG/NMGC: Confessor Hood - Nomadic Merchant in ladder section to E",
    { place: "East of Ninth Mt. Gelmir Campsite", encounter: "Nomadic Merchant" },
  ],
  ["VM/VM: Drawing-Room Key - join volcano manor", { place: "Volcano Manor", encounter: "Tanith" }],
  [
    "VM/TE: Somber Smithing Stone [5] - scarab N of shortcut elevator below",
    { place: "Below Temple of Eiglay", encounter: "Scarab" },
  ],
  [
    "VM/PTC: Somber Smithing Stone [5] - scarab on NW lower rooftop",
    { place: "Rooftop north west of Prison Town Church", encounter: "Scarab" },
  ],
  [
    "ET: Elden Remembrance - mainboss drop",
    { place: "Inside the Erdtree", encounter: "Elden Beast" },
  ],
  [
    "AP/(WC): Glovewort Picker's Bell Bearing [1] - boss drop",
    { place: "Wyndham Catacombs", encounter: "Erdtree Burial Watchdog" },
  ],
  [
    "AP/(SHG): Ancient Dragon Knight Kristoff - boss drop",
    { place: "Sainted Hero's Grave", encounter: "Ancient Hero of Zamor" },
  ],
  [
    "MtG/(GHG): Bloodhound Knight Floh - boss drop",
    { place: "Gelmir Hero's Grave", encounter: "Red Wolf of the Champion" },
  ],
  ["MtG/(GHG): Deathroot - chest after boss", { place: "Gelmir Hero's Grave", encounter: "Chest" }],
  [
    "MtG/(GHG): Ringed Finger - chest bottom of first chariot ramp",
    { place: "Gelmir Hero's Grave, first chariot ramp", encounter: "Chest" },
  ],
  [
    "CO/(AHG): Ordovis's Greatsword - boss drop",
    { place: "Auriza Hero's Grave", encounter: "Crucible Knight & Crucible Knight Ordovis" },
  ],
  [
    "CO/(AHG): Crucible Axe Helm - boss drop",
    { place: "Auriza Hero's Grave", encounter: "Crucible Knight & Crucible Knight Ordovis" },
  ],
  [
    "CO/(AHG): Crucible Axe Armor - boss drop",
    { place: "Auriza Hero's Grave", encounter: "Crucible Knight & Crucible Knight Ordovis" },
  ],
  [
    "CO/(AHG): Crucible Gauntlets - boss drop",
    { place: "Auriza Hero's Grave", encounter: "Crucible Knight & Crucible Knight Ordovis" },
  ],
  [
    "CO/(AHG): Crucible Greaves - boss drop",
    { place: "Auriza Hero's Grave", encounter: "Crucible Knight & Crucible Knight Ordovis" },
  ],
  [
    "AP/(UC): Perfumer Tricia - boss drop",
    { place: "Unsightly Catacombs", encounter: "Perfumer Tricia & Misbegotten Warrior" },
  ],
  [
    "CO/(AST): Soldjars of Fortune Ashes - boss drop",
    { place: "Auriza Side Tomb", encounter: "Grave Warden Duelist" },
  ],
  [
    "MtG/(SC): Kindred of Rot's Exultation - boss drop",
    { place: "Seethewater Cave", encounter: "Kindred of Rot" },
  ],
  [
    "MtG/(VC): Jar Cannon - boss drop",
    { place: "Volcano Cave", encounter: "Demi-Human Queen Margot" },
  ],
  [
    "AP/(PG): Perfume Bottle - in chest next to root in second room",
    { place: "Perfumer's Grotto, second room", encounter: "Chest" },
  ],
  [
    "AP/(PG): Great Omenkiller Cleaver - boss drop",
    { place: "Perfumer's Grotto", encounter: "Omenkiller & Miranda the Blighted Bloom" },
  ],
  [
    "AP/(PG): Living Jar Shard x10 - in chest next to root in second room",
    { place: "Perfumer's Grotto, second room", encounter: "Chest" },
  ],
  [
    "AP/(SCV): Concealing Veil - boss drop",
    { place: "Sage's Cave", encounter: "Black Knife Assassin" },
  ],
  [
    "AP/(SCV): Family Heads - hidden boss drop",
    { place: "Sage's Cave", encounter: "Necromancer Garris" },
  ],
  [
    "AP/(SCV): Rejuvenating Boluses x5 - in chest next to another chest, right chest",
    { place: "Sage's Cave, a pair of chests", encounter: "Right chest" },
  ],
  [
    "AP/(SCV): Lost Ashes of War - in chest next to another chest, left chest",
    { place: "Sage's Cave, a pair of chests", encounter: "Left chest" },
  ],
  [
    "AP/(SCV): Candletree Wooden Shield - in chest behind illusory wall near double chests, chest 3",
    { place: "Sage's Cave, behind the illusory wall by the pair", encounter: "Third chest" },
  ],
  [
    "AP/(SCV): Silver-Pickled Fowl Foot x5 - in chest behind illusory wall near double chests, chest 1",
    { place: "Sage's Cave, behind the illusory wall by the pair", encounter: "First chest" },
  ],
  [
    "AP/(SCV): Black Hood - in chest behind illusory wall near double chests, chest 2",
    { place: "Sage's Cave, behind the illusory wall by the pair", encounter: "Second chest" },
  ],
  [
    "AP/(SCV): Nascent Butterfly - in chest behind illusory wall near double chests, chest 4",
    { place: "Sage's Cave, behind the illusory wall by the pair", encounter: "Fourth chest" },
  ],
  [
    "AP/(SCV): Stonesword Key - in chest behind illusory wall in sand room",
    { place: "Sage's Cave, behind the sand room's illusory wall", encounter: "Chest" },
  ],
  [
    "AP/(SCV): Dragonwound Grease x4 - in chest next to two chests, left chest",
    { place: "Sage's Cave, three chests", encounter: "Left chest" },
  ],
  [
    "AP/(SCV): Raptor Talons - in chest next to two chests, right chest",
    { place: "Sage's Cave, three chests", encounter: "Right chest" },
  ],
  [
    "AP/(SCV): Golden Great Arrow x10 - in chest next to two chests, single chest",
    { place: "Sage's Cave, three chests", encounter: "Lone chest" },
  ],
  [
    "AP/(SCV): Raptor's Black Feathers - in chest S of hidden boss door, left chest",
    { place: "Sage's Cave, south of the hidden boss door", encounter: "Left chest" },
  ],
  [
    "AP/(SCV): Skeletal Mask - in chest S of hidden boss door, right chest",
    { place: "Sage's Cave, south of the hidden boss door", encounter: "Right chest" },
  ],
  [
    "AP/(OAT): Great Club - boss drop",
    { place: "Old Altus Tunnel", encounter: "Stonedigger Troll" },
  ],
  [
    "AP/(AT): Somberstone Miner's Bell Bearing [2] - boss drop",
    { place: "Altus Tunnel", encounter: "Crystalian (Spear) & Crystalian (Ringblade)" },
  ],
  [
    "AP/(AT): Rune Arc - in big chest side room 1 from grace",
    { place: "Altus Tunnel, side room by the grace", encounter: "Chest" },
  ],
  [
    "CO/(ST): Onyx Lord's Greatsword - boss drop",
    { place: "Sealed Tunnel", encounter: "Onyx Lord" },
  ],
  [
    "CO/(ST): Smithing-Stone Miner's Bell Bearing [2] - in chest W side of first room",
    { place: "Sealed Tunnel, first room", encounter: "Chest" },
  ],
  [
    "DTEA: Omenkiller Rollo - boss drop on way to divine tower",
    { place: "Bridge to the Divine Tower of East Altus", encounter: "Fell Twins" },
  ],
  [
    "DTEA: Somber Smithing Stone [6] - scarab E of leyndell elevator",
    { place: "East of the lift from Leyndell", encounter: "Scarab" },
  ],
  [
    "SSG/FD: Erdtree's Favor +1 - in chest after boss",
    { place: "Cathedral of the Forsaken", encounter: "Chest" },
  ],
  [
    "SSG/UR: Somber Smithing Stone [6] - scarab to left past shortcut gate, to right, drop to left",
    { place: "Past the shortcut gate by Underground Roadside", encounter: "Scarab" },
  ],
  [
    "SSG/LC: Somber Smithing Stone [7] - scarab bottom of big room with pipes",
    { place: "Bottom of the pipe room by Leyndell Catacombs", encounter: "Scarab" },
  ],
  [
    "FFP/FFP: Rune Arc - in chest behind illusory wall to SE",
    { place: "Frenzied Flame Proscription, behind an illusory wall", encounter: "Chest" },
  ],
  [
    "SSG/(LC): Lord of Blood's Exultation - boss drop",
    { place: "Leyndell Catacombs", encounter: "Esgar, Priest of Blood" },
  ],
  [
    "CO/OWPT: Giant-Crusher - in caravan chest to S in camp",
    { place: "Camp south of Outer Wall Phantom Tree", encounter: "Caravan chest" },
  ],
  [
    "CO/OWPT: Map: Leyndell, Royal Capital - map pillar",
    { place: "Outer Wall Phantom Tree", encounter: "Map fragment" },
  ],
  [
    "CO/OWPT: Ash of War: Prayerful Strike - scarab to E down below in water",
    { place: "Water below Outer Wall Phantom Tree, east", encounter: "Scarab" },
  ],
  [
    "CO/OWPT: Ash of War: Golden Parry - scarab to NE up stairs right of seedtree",
    { place: "North east of Outer Wall Phantom Tree", encounter: "Scarab" },
  ],
  [
    "CO/(HMS): Sentry's Torch - Hermit Merchant",
    { place: "Hermit Merchant's Shack", encounter: "Hermit Merchant" },
  ],
  [
    "CO/(HMS): Distinguished Greatshield - Hermit Merchant",
    { place: "Hermit Merchant's Shack", encounter: "Hermit Merchant" },
  ],
  ["CO/(ME): Crimson Crystal Tear - in basin", { place: placeName("CO/(ME)"), encounter: "Basin" }],
  [
    "CO/HMS: Winged Crystal Tear - in basin to NE in black flower field",
    { place: "Flower field north east of Hermit Merchant's Shack", encounter: "Basin" },
  ],
  ["CO/(ME): Twiggy Cracked Tear - in basin", { place: placeName("CO/(ME)"), encounter: "Basin" }],
  [
    "AP/AHJ: Sacrificial Twig - in chest to W in N camp",
    { place: "North camp west of Altus Highway Junction", encounter: "Chest" },
  ],
  [
    "AP/(ScC): Dragonbolt Blessing - in chest",
    { place: placeName("AP/(ScC)"), encounter: "Chest" },
  ],
  [
    "AP/(WfR): Wrath of Gold - in chest underground in S most ruins",
    { place: "Below Woodfolk Ruins", encounter: "Chest" },
  ],
]);
