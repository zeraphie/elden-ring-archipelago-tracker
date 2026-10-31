/*! Key spots' names are built on the Elden Ring apworld 0.1.4's location names, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

import type { KeySpot } from "../../key-spots.js";

/** The Realm of Shadow's key spots by exact Archipelago name. */
export const REALM_OF_SHADOW_KEY_SPOTS: ReadonlyMap<string, KeySpot> = new Map([
  [
    "BTS/SF: Remembrance of the Dancing Lion - mainboss drop",
    { place: "End of Belurat", encounter: "Divine Beast Dancing Lion" },
  ],
  [
    "BTS/TDB: Revered Spirit Ash - on statue after boss",
    { place: "Theatre of the Divine Beast", encounter: "Statue" },
  ],
  [
    "BTS/BTS: Revered Spirit Ash x2 - to SE, statue by stairs",
    { place: "Stairs south east of Belurat, Tower Settlement", encounter: "Statue" },
  ],
  [
    "BTS/SPA: Well Depths Key - to NW, up ladder, jump onto bridge, room to E",
    { place: "Room north west of Small Private Altar", encounter: "Corpse" },
  ],
  [
    "BTS/SF: Scadutree Fragment - to S by cross",
    { place: "South of Stagefront", encounter: "Miquella's Cross" },
  ],
  [
    "BTS/SF: Revered Spirit Ash - to SW, statue",
    { place: "South west of Stagefront", encounter: "Statue" },
  ],
  [
    "BTS/BTS: Divine Beast Head - boss drop",
    { place: "End of Belurat", encounter: "Divine Beast Dancing Lion" },
  ],
  [
    "SK/DCE: Remembrance of the Impaler - mainboss drop",
    { place: "End of Shadow Keep", encounter: "Messmer the Impaler" },
  ],
  [
    "SK/DCE: Messmer's Kindling - mainboss drop",
    { place: "End of Shadow Keep", encounter: "Messmer the Impaler" },
  ],
  [
    "SK/SFiF: Revered Spirit Ash - on top of beast",
    { place: "Storehouse, First Floor", encounter: "Beast specimen" },
  ],
  [
    "SK/SFoF: Scadutree Fragment - by cross",
    { place: "Storehouse, Fourth Floor", encounter: "Miquella's Cross" },
  ],
  [
    "SK/SSF: Revered Spirit Ash - to E on beast",
    { place: "East of Storehouse, Seventh Floor", encounter: "Beast specimen" },
  ],
  [
    "SK/DCE: Scadutree Fragment - downstairs by statue",
    { place: "Below Dark Chamber Entrance", encounter: "Statue" },
  ],
  [
    "EI/DGFS: Remembrance of a God and a Lord - mainboss drop",
    { place: "End of Enir-Ilim", encounter: "Radahn, Consort of Miquella" },
  ],
  [
    "EI/FR: Revered Spirit Ash x2 - outside to SW, drop off broken bridge, to right on statue",
    { place: "Below the broken bridge south west of First Rise", encounter: "Statue" },
  ],
  ["EI/SR: Scadutree Fragment - by cross", { place: "Spiral Rise", encounter: "Miquella's Cross" }],
  [
    "EI/SR: Revered Spirit Ash - up outside, after first rooftops, in left building on statue",
    { place: "Building past Spiral Rise's first rooftops", encounter: "Statue" },
  ],
  [
    "EI/SR: Scadutree Fragment - up outside, behind at start of second rooftops",
    { place: "Spiral Rise's second rooftops", encounter: "Scadutree Fragment" },
  ],
  [
    "EI/CCA: Scadutree Fragment - by altar",
    { place: "Cleansing Chamber Anteroom", encounter: "Altar" },
  ],
  [
    "BTS|EI/SR: Scadutree Fragment - outside to SE downstairs, drop down from gazebo, after jump to window, by statue",
    { place: "Below Spiral Rise, past the window", encounter: "Statue" },
  ],
  [
    "SK/SKMG: Scadutree Fragment x2 - boss drop",
    { place: "Shadow Keep Main Gate", encounter: "Golden Hippopotamus" },
  ],
  [
    "SK/CDE: Scadutree Fragment - on the statue hand in church",
    { place: "Church by Church District Entrance", encounter: "Statue" },
  ],
  [
    "GP/(EH): Fort of Reprimand Spiritspring Stone - stone to NW",
    { place: "North west of Elder's Hovel", encounter: "Spiritspring" },
  ],
  [
    "GP/PT: Silver Horn Tender - enemy drop W of PT, near graves",
    { place: "Graveyard west of Prospect Town", encounter: "Shadowpot" },
  ],
  [
    "GP/PT: Scadutree Fragment - enemy drop W of PT, near graves",
    { place: "Graveyard west of Prospect Town", encounter: "Shadowpot" },
  ],
  [
    "GP/CRT: Revered Spirit Ash - to SE, overlooking WNM",
    {
      place: "South east of Cliffroad Terminus, above the Western Nameless Mausoleum",
      encounter: "Revered Spirit Ash",
    },
  ],
  [
    "GP/(PT): Outer God Heirloom - in chest top of PT, inside shrine",
    { place: "Shrine atop Prospect Town", encounter: "Chest" },
  ],
  ["GP/MGC: Rune Arc x3 - Moore Shop", { place: "Main Gate Cross", encounter: "Moore" }],
  [
    "GP/MGC: Spellproof Pickled Liver x2 - Moore Shop",
    { place: "Main Gate Cross", encounter: "Moore" },
  ],
  [
    "GP/MGC: Scadutree Fragment - by cross",
    { place: "Main Gate Cross", encounter: "Miquella's Cross" },
  ],
  [
    "GP/BG: Dragon Heart - boss drop E of BG",
    { place: "East of Belurat Gaol", encounter: "Ghostflame Dragon" },
  ],
  [
    "GP/(WNM): Greatsword of Solitude - boss drop",
    { place: "Western Nameless Mausoleum", encounter: "Knight of the Solitary Gaol" },
  ],
  [
    "GP/(WNM): Helm of Solitude - boss drop",
    { place: "Western Nameless Mausoleum", encounter: "Knight of the Solitary Gaol" },
  ],
  [
    "GP/(WNM): Armor of Solitude - boss drop",
    { place: "Western Nameless Mausoleum", encounter: "Knight of the Solitary Gaol" },
  ],
  [
    "GP/(WNM): Gauntlets of Solitude - boss drop",
    { place: "Western Nameless Mausoleum", encounter: "Knight of the Solitary Gaol" },
  ],
  [
    "GP/(WNM): Greaves of Solitude - boss drop",
    { place: "Western Nameless Mausoleum", encounter: "Knight of the Solitary Gaol" },
  ],
  [
    "GP/TPC: Scadutree Fragment - by cross",
    { place: "Three-Path Cross", encounter: "Miquella's Cross" },
  ],
  [
    "GP/(AAV): Revered Spirit Ash - on statue NE of village",
    { place: "North east of Abandoned Ailing Village", encounter: "Statue" },
  ],
  [
    "GP/SR: Map: Gravesite Plain - map pillar S of SR",
    { place: "South of Scorched Ruins", encounter: "Map fragment" },
  ],
  [
    "GP/SR: Revered Spirit Ash - E of SR, overlooking CC",
    {
      place: "East of Scorched Ruins, above the Church of Consolation",
      encounter: "Revered Spirit Ash",
    },
  ],
  [
    "GP/(SR): Blade of Mercy - in chest behind door atop SR",
    { place: "Top of Scorched Ruins", encounter: "Chest" },
  ],
  [
    "GP/SR: Silver Horn Tender - enemy drop NE of SR, near graves",
    { place: "Graveyard north east of Scorched Ruins", encounter: "Shadowpot" },
  ],
  [
    "GP/SR: Scadutree Fragment - enemy drop NE of SR, near graves",
    { place: "Graveyard north east of Scorched Ruins", encounter: "Shadowpot" },
  ],
  [
    "GP/CF: Scadutree Fragment - to S, in front of statue",
    { place: "South of Castle Front", encounter: "Statue" },
  ],
  [
    "GP/CF: Firespark Perfume Bottle - in chest in S camp",
    { place: "Camp south of Castle Front", encounter: "Chest" },
  ],
  [
    "GP/(CC): Scadutree Fragment x2 - front of marika statue",
    { place: "Church of Consolation", encounter: "Statue" },
  ],
  [
    "GP/(SP): Ancient Dragon Smithing Stone - in chest top of pillar",
    { place: "Top of Suppressing Pillar", encounter: "Chest" },
  ],
  [
    "GP/PPC: Scadutree Fragment - by cross",
    { place: "Pillar Path Cross", encounter: "Miquella's Cross" },
  ],
  [
    "ScV/SKBG: Remembrance of the Wild Boar Rider - mainboss drop",
    { place: "Shadow Keep, Back Gate", encounter: "Commander Gaius" },
  ],
  [
    "SCF/FD: Remembrance of Putrescence - mainboss drop",
    { place: "Fissure Depths", encounter: "Putrescent Knight" },
  ],
  [
    "SCF/FC: Scadutree Fragment - by cross",
    { place: "Fissure Cross", encounter: "Miquella's Cross" },
  ],
  [
    "FRM: Remembrance of the Mother of Fingers - mainboss drop",
    { place: "Finger Ruins of Miyr", encounter: "Metyr, Mother of Fingers" },
  ],
  [
    "SA/(CMM): Maternal Staff - kill invader Ymir",
    { place: "Cathedral of Manus Metyr", encounter: "Count Ymir, Mother of Fingers" },
  ],
  [
    "SA/(CMM): High Priest Hat - kill invader Ymir",
    { place: "Cathedral of Manus Metyr", encounter: "Count Ymir, Mother of Fingers" },
  ],
  [
    "SA/(CMM): High Priest Robe - kill invader Ymir",
    { place: "Cathedral of Manus Metyr", encounter: "Count Ymir, Mother of Fingers" },
  ],
  [
    "SA/(CMM): High Priest Gloves - kill invader Ymir",
    { place: "Cathedral of Manus Metyr", encounter: "Count Ymir, Mother of Fingers" },
  ],
  [
    "SA/(CMM): High Priest Undergarments - kill invader Ymir",
    { place: "Cathedral of Manus Metyr", encounter: "Count Ymir, Mother of Fingers" },
  ],
  [
    "MM/SFC: Remembrance of the Lord of Frenzied Flame - mainboss drop",
    { place: "End of Midra's Manse", encounter: "Midra, Lord of Frenzied Flame" },
  ],
  [
    "MM/SFC: Revered Spirit Ash - chandelier directly N",
    { place: "North of Second Floor Chamber", encounter: "Chandelier" },
  ],
  [
    "GP/(FRC): Death Knight's Twin Axes - boss drop",
    { place: "Fog Rift Catacombs", encounter: "Death Knight" },
  ],
  [
    "GP/(FRC): Crimson Amber Medallion +3 - boss drop",
    { place: "Fog Rift Catacombs", encounter: "Death Knight" },
  ],
  [
    "GP/(FRC): Ash of War: Blinkbolt - chest above south block in triple trap room",
    { place: "Fog Rift Catacombs, trap room", encounter: "Chest" },
  ],
  [
    "RB/(SRC): Ancient Dragon Knight's Cookbook [2] - drop off bridge past second eyes, in chest",
    { place: "Scorpion River Catacombs, below the bridge", encounter: "Chest" },
  ],
  [
    "RB/(SRC): Death Knight's Longhaft Axe - boss drop",
    { place: "Scorpion River Catacombs", encounter: "Death Knight" },
  ],
  [
    "RB/(SRC): Cerulean Amber Medallion +3 - boss drop",
    { place: "Scorpion River Catacombs", encounter: "Death Knight" },
  ],
  [
    "RR/(DC): Viridian Amber Medallion +3 - jump over balcony, in hidden room",
    { place: "Darklight Catacombs, hidden room", encounter: "Chest" },
  ],
  [
    "RR/(DC): Bigmouth Imp Ashes - chest S of large plinth",
    { place: "Darklight Catacombs, south of the plinth", encounter: "Chest" },
  ],
  [
    "RR/(DC): Barbed Staff-Spear - boss drop",
    { place: "Darklight Catacombs", encounter: "Jori, Elder Inquisitor" },
  ],
  [
    "GP/(BG): Hefty Cracked Pot - chest on ledge near bottom of pot drop",
    { place: "Belurat Gaol, by the pot drop", encounter: "Chest" },
  ],
  [
    "GP/(BG): Demi-Human Swordsman Yosh - boss drop",
    { place: "Belurat Gaol", encounter: "Demi-Human Swordmaster Onze" },
  ],
  [
    "SA/(BG): Curseblade Meera - boss drop",
    { place: "Bonny Gaol", encounter: "Curseblade Labirith" },
  ],
  [
    "CHG/(LG): Gaol Lower Level Key - chest in corpse room",
    { place: "Lamenter's Gaol, corpse room", encounter: "Chest" },
  ],
  ["CHG/(LG): Lamenter's Mask - boss drop", { place: "Lamenter's Gaol", encounter: "Lamenter" }],
  [
    "CHG/(LG): Gaol Upper Level Key - second room on right from left chamber past locked door",
    { place: "Lamenter's Gaol, past the locked door", encounter: "Chest" },
  ],
  [
    "ER/(RC): Bloodfiend Hexer's Ashes - boss drop",
    { place: "Rivermouth Cave", encounter: "Chief Bloodfiend" },
  ],
  [
    "GP/(DP): Dragon-Hunter's Great Katana - boss drop",
    { place: "Dragon's Pit", encounter: "Ancient Dragon-Man" },
  ],
  [
    "ARR/CBME: Rauh Ruins Spiritspring Stone - drop to E till cliff then up ledge to N",
    { place: "Ledge north east of Church of the Bud, Main Entrance", encounter: "Spiritspring" },
  ],
  [
    "ARR/CBME: Remembrance of the Saint of the Bud - mainboss drop",
    { place: "Church of the Bud", encounter: "Romina, Saint of the Bud" },
  ],
  [
    "ARR/RARW: Scadutree Fragment - to W up stairs, by NW monument",
    { place: "North west of Rauh Ancient Ruins, West", encounter: "Monument" },
  ],
  [
    "ARR/CMBE: Talisman of All Crucibles - in chest to N downstairs, outside to S, drop right of elevator, follow path to elevator, continue down S pillar walkway, inside hole on left",
    { place: "Pillar walkway below Church of the Bud, Main Entrance", encounter: "Chest" },
  ],
  [
    "ARR/RARW: Revered Spirit Ash - to W up stairs, outside to N in gazebo",
    { place: "North of Rauh Ancient Ruins, West", encounter: "Gazebo" },
  ],
  [
    "ARR/ARGS: Divine Beast Tornado - boss drop to NE",
    {
      place: "North east of Ancient Ruins, Grand Stairway",
      encounter: "Divine Beast Dancing Lion",
    },
  ],
  [
    "ARR/VMT: Scadutree Fragment - enemy drop to SE down elevator follow path, left at intersection, to S in pond",
    { place: "Lake south of Viaduct Minor Tower", encounter: "Lesser Golden Hippopotamus" },
  ],
  [
    "ARR/RARE: Scadutree Fragment - by cross",
    { place: "Rauh Ancient Ruins, East", encounter: "Miquella's Cross" },
  ],
  [
    "ARR/VMT: Golden Horn Tender - enemy drop in W hall from giant room second floor",
    { place: "West hall off the giant's room by Viaduct Minor Tower", encounter: "Shadowpot" },
  ],
  [
    "ARR/VMT: Scadutree Fragment - enemy drop in W hall from giant room second floor",
    { place: "West hall off the giant's room by Viaduct Minor Tower", encounter: "Shadowpot" },
  ],
  [
    "ARR/CBME: Mottled Necklace +2 - in chest up sealed spiritspring, top of stairs, seal is to N downstairs, outside to left",
    { place: "Up the sealed spiritspring by Church of the Bud, Main Entrance", encounter: "Chest" },
  ],
  [
    "RB/(TTR): Rauh Base Spiritspring Stone - stone to E",
    { place: "East of Temple Town Ruins", encounter: "Spiritspring" },
  ],
  [
    "RB/RN: Roar of Rugalea - boss drop to NW",
    { place: "North west of Ravine North", encounter: "Rugalea the Great Red Bear" },
  ],
  [
    "RB/TTR: Beast Horn x2 - in chest to N up spiritspring, middle of ruin",
    { place: "Middle of Temple Town Ruins", encounter: "Chest" },
  ],
  [
    "RB/TTR: Map: Rauh Ruins - map pillar to E behind wall",
    { place: "Behind a wall east of Temple Town Ruins", encounter: "Map fragment" },
  ],
  [
    "RB/(TTR): Scadutree Fragment - hanging off lower level of bridge",
    { place: "Under the bridge at Temple Town Ruins", encounter: "Scadutree Fragment" },
  ],
  [
    "RB/(TTR): Two-Handed Sword Talisman - in chest top of ruins",
    { place: "Top of Temple Town Ruins", encounter: "Chest" },
  ],
  [
    "RB/TTR: Divine Bird Warrior Ornis - in chest to N up spiritspring, through cave",
    { place: "Cave north of Temple Town Ruins", encounter: "Chest" },
  ],
  [
    "RB/ARB: Pearl Shield Talisman - in chest to W within camp",
    { place: "Camp west of Ancient Ruins Base", encounter: "Chest" },
  ],
  [
    "RB/(NNM): Red Bear's Claw - boss drop",
    { place: "Northern Nameless Mausoleum", encounter: "Red Bear" },
  ],
  [
    "RB/(NNM): Iron Rivet Armor - boss drop",
    { place: "Northern Nameless Mausoleum", encounter: "Red Bear" },
  ],
  [
    "RB/(NNM): Iron Rivet Gauntlets - boss drop",
    { place: "Northern Nameless Mausoleum", encounter: "Red Bear" },
  ],
  [
    "RB/(NNM): Iron Rivet Greaves - boss drop",
    { place: "Northern Nameless Mausoleum", encounter: "Red Bear" },
  ],
  [
    "RB/(NNM): Fang Helm - boss drop",
    { place: "Northern Nameless Mausoleum", encounter: "Red Bear" },
  ],
  [
    "CC/CCW: Dancing Blade of Ranah - boss drop",
    { place: "Cerulean Coast West", encounter: "Dancer of Ranah" },
  ],
  [
    "CC/CCW: Dancer's Hood - boss drop",
    { place: "Cerulean Coast West", encounter: "Dancer of Ranah" },
  ],
  [
    "CC/CCW: Dancer's Dress - boss drop",
    { place: "Cerulean Coast West", encounter: "Dancer of Ranah" },
  ],
  [
    "CC/CCW: Dancer's Bracer - boss drop",
    { place: "Cerulean Coast West", encounter: "Dancer of Ranah" },
  ],
  [
    "CC/CCW: Dancer's Trousers - boss drop",
    { place: "Cerulean Coast West", encounter: "Dancer of Ranah" },
  ],
  [
    "CC/CCW: Star-Lined Sword - boss drop",
    { place: "Cerulean Coast West", encounter: "Demi-Human Queen Marigga" },
  ],
  [
    "CC/CCW: Scadutree Fragment - to N, in small cave through ravine",
    { place: "Cave north of Cerulean Coast West", encounter: "Scadutree Fragment" },
  ],
  [
    "CC/CCC: Map: Southern Shore - map pillar to N on path",
    { place: "North of Cerulean Coast Cross", encounter: "Map fragment" },
  ],
  [
    "CC/CCC: Scadutree Fragment - by cross",
    { place: "Cerulean Coast Cross", encounter: "Miquella's Cross" },
  ],
  ["CC/CC: Dragon Heart - boss drop", { place: "Cerulean Coast", encounter: "Ghostflame Dragon" }],
  [
    "CC/CC: Somber Ancient Dragon Smithing Stone - boss drop",
    { place: "Cerulean Coast", encounter: "Ghostflame Dragon" },
  ],
  [
    "CHG/CHG: Ash of War: Ghostflame Call - boss drop to NW in lake",
    { place: "Lake north west of Charo's Hidden Grave", encounter: "Death Rite Bird" },
  ],
  [
    "CHG/CHG: Scadutree Fragment - enemy drop to W in pond by giant gravestone",
    { place: "Pond west of Charo's Hidden Grave", encounter: "Lesser Golden Hippopotamus" },
  ],
  [
    "ER/ERC: Revered Spirit Ash - to NE by statue",
    { place: "North east of Ellac River Cave", encounter: "Statue" },
  ],
  [
    "SA/(MR): Scaduview Cross Spiritspring Stone - stone to SE",
    { place: "South east of Moorth Ruins", encounter: "Spiritspring" },
  ],
  [
    "SA/(RR): Rabbath's Rise Spiritspring Stone - stone to S",
    { place: "South of Rabbath's Rise", encounter: "Spiritspring" },
  ],
  [
    "SK/SKMG: Aspects of the Crucible: Thorns - boss drop",
    { place: "Shadow Keep Main Gate", encounter: "Golden Hippopotamus" },
  ],
  [
    "SA/HC: Carian Sorcery Sword - in chest to SW down in upper area of CE, back left corner",
    { place: "Upper Castle Ensis, south west of Highroad Cross", encounter: "Chest" },
  ],
  [
    "SA/(CC): Scadutree Fragment x2 - by statue",
    { place: "Church of the Crusade", encounter: "Statue" },
  ],
  [
    "SA/RFSP: Ash of War: Piercing Throw - scarab E of RFSP",
    { place: "East of Ruined Forge of Starfall Past", encounter: "Scarab" },
  ],
  [
    "SA/RFSP: Somber Smithing Stone [8] - scarab NE of RFSP",
    { place: "North east of Ruined Forge of Starfall Past", encounter: "Scarab" },
  ],
  [
    "SA/RFSP: Somber Smithing Stone [8] - scarab SE of RFSP",
    { place: "South east of Ruined Forge of Starfall Past", encounter: "Scarab" },
  ],
  [
    "SA/HC: Scadutree Fragment - by cross",
    { place: "Highroad Cross", encounter: "Miquella's Cross" },
  ],
  [
    "SA/HC: Map: Scadu Altus - map pillar to N",
    { place: "North of Highroad Cross", encounter: "Map fragment" },
  ],
  [
    "SA/MR: Scadutree Fragment - to W by statue in camp",
    { place: "Camp west of Moorth Ruins", encounter: "Statue" },
  ],
  [
    "SA/HC: Ash of War: Rolling Sparks - scarab to N in upper E camp",
    { place: "Camp north of Highroad Cross", encounter: "Scarab" },
  ],
  [
    "SA/HC: Scadutree Fragment - to N by statue right of entrance",
    { place: "North of Highroad Cross", encounter: "Statue" },
  ],
  [
    "SA/FR: Battlefield Priest's Cookbook [2] - in chest to S inside, very top of tower",
    { place: "Top of Fort of Reprimand", encounter: "Chest" },
  ],
  [
    "SA/MR: Dragon Heart - boss drop to S",
    { place: "South of Moorth Ruins", encounter: "Ghostflame Dragon" },
  ],
  [
    "SA/MR: Somber Ancient Dragon Smithing Stone - boss drop to S",
    { place: "South of Moorth Ruins", encounter: "Ghostflame Dragon" },
  ],
  [
    "SA/FR: Ash of War: Aspects of the Crucible: Wings - boss drop to S inside",
    { place: "Fort of Reprimand", encounter: "Black Knight Edreed" },
  ],
  [
    "SA/FR: Flamedrake Talisman +3 - in chest to SE inside, left of bottom of stairs over cages",
    { place: "Fort of Reprimand, by the cages", encounter: "Chest" },
  ],
  [
    "SA/FR: Smithing Stone [7] x6 - in chest to SE inside, in center room below, inside cage",
    { place: "Fort of Reprimand, inside a cage", encounter: "Chest" },
  ],
  [
    "SA/FR: Sunwarmth Stone x3 - in chest to SE inside, in center room below, inside cage",
    { place: "Fort of Reprimand, inside a cage", encounter: "Chest" },
  ],
  [
    "SA/BFR: Ancient Dragon Smithing Stone - in chest up ladder to N",
    { place: "North of Behind the Fort of Reprimand", encounter: "Chest" },
  ],
  [
    "SA/(MR): Golden Horn Tender - enemy drop upper SE side",
    { place: "Moorth Ruins, upper south east", encounter: "Shadowpot" },
  ],
  [
    "SA/(MR): Scadutree Fragment - enemy drop upper SE side",
    { place: "Moorth Ruins, upper south east", encounter: "Shadowpot" },
  ],
  [
    "SA/MR: Revered Spirit Ash - E of MR by statue",
    { place: "East of Moorth Ruins", encounter: "Statue" },
  ],
  [
    "SA/MR: Scadutree Fragment - by cross",
    { place: "Moorth Ruins", encounter: "Miquella's Cross" },
  ],
  [
    "SA/(MR): Golden Arcs - inside a chest E side of lower hole",
    { place: "Moorth Ruins, lower hollow", encounter: "Chest" },
  ],
  [
    "SA/HC: Pelt of Ralva - boss drop to N, E before camp, deep woods",
    { place: "Woods north of Highroad Cross", encounter: "Ralva the Great Red Bear" },
  ],
  [
    "SA/MR: Scadutree Fragment - to NE, N side of pond by statue",
    { place: "Pond north east of Moorth Ruins", encounter: "Statue" },
  ],
  [
    "SA/(BV): Revered Spirit Ash - NW end of crevice",
    { place: "Crevice north west of Bonny Village", encounter: "Revered Spirit Ash" },
  ],
  [
    "SA/(CMM): Hole-Laden Necklace - given by Ymir on first meeting",
    { place: "Cathedral of Manus Metyr", encounter: "Count Ymir, High Priest" },
  ],
  [
    "SA/BV: O Mother - N of BV by tree",
    { place: "Tree north of Bonny Village", encounter: "Corpse" },
  ],
  [
    "SA/(RR): Rabbath's Cannon - in chest top of rise",
    { place: "Top of Rabbath's Rise", encounter: "Chest" },
  ],
  [
    "SA/SC: Scadutree Fragment - by cross",
    { place: "Scaduview Cross", encounter: "Miquella's Cross" },
  ],
  [
    "CE/CEC: Loyal Knight's Cookbook - in chest below grace",
    { place: "Below Castle Ensis Checkpoint", encounter: "Chest" },
  ],
  [
    "CE/CEC: Scadutree Fragment - to NE by cross",
    { place: "North east of Castle Ensis Checkpoint", encounter: "Miquella's Cross" },
  ],
  [
    "CE/CF: Milady - in chest top of tower left before cave",
    { place: "Tower by Castle Front", encounter: "Chest" },
  ],
  [
    "CE/CEC: Wolf Crest Shield - in chest to SE, down W stairs before entering church building",
    { place: "South east of Castle Ensis Checkpoint", encounter: "Chest" },
  ],
  [
    "CE/CLC: Remembrance of the Twin Moon Knight - mainboss drop",
    { place: "End of Castle Ensis", encounter: "Rellana, Twin Moon Knight" },
  ],
  [
    "CE/CEC: Imbued Sword Key - in chest just before elevator to boss area",
    { place: "Castle Ensis, by the lift to Rellana", encounter: "Chest" },
  ],
  [
    "CE/CLC: Ash of War: Wing Stance - in chest to E, top of tower after jumping down",
    { place: "Tower east of Castle-Lord's Chamber", encounter: "Chest" },
  ],
  [
    "CE/(FRF): Black Steel Greatshield - boss drop",
    { place: "Fog Rift Fort", encounter: "Black Knight Garrew" },
  ],
  [
    "CE/(FRF): Serpent Flail - in chest lower courtyard",
    { place: "Fog Rift Fort, lower courtyard", encounter: "Chest" },
  ],
  [
    "CE/(FRF): Arrow's Soaring Sting Talisman - in chest top of boss building",
    { place: "Fog Rift Fort, top of the boss building", encounter: "Chest" },
  ],
  [
    "CE/(FRF): Smithing Stone [8] x6 - in chest by boss",
    { place: "Fog Rift Fort, by the boss", encounter: "Chest" },
  ],
  [
    "CE/(FRF): Blessed Bone Shard x3 - in chest by boss",
    { place: "Fog Rift Fort, by the boss", encounter: "Chest" },
  ],
  [
    "AW/AW: Scadutree Fragment - to N, by W tree",
    { place: "North of Abyssal Woods", encounter: "Tree" },
  ],
  [
    "AW/AC: Map: Abyss - map pillar NW of AC",
    { place: "North west of Abandoned Church", encounter: "Map fragment" },
  ],
  ["AW/(AC): Scadutree Fragment x2 - by altar", { place: "Abandoned Church", encounter: "Altar" }],
  [
    "JP/DPT: Dragon Heart - boss drop to E",
    { place: "East of Dragon's Pit Terminus", encounter: "Jagged Peak Drake" },
  ],
  [
    "JP/DPT: Dragonscale Flesh - boss drop to E",
    { place: "East of Dragon's Pit Terminus", encounter: "Jagged Peak Drake" },
  ],
  [
    "JP/FJP: Dragon Heart - boss drop to SE",
    { place: "South east of Foot of the Jagged Peak", encounter: "Jagged Peak Drake" },
  ],
  [
    "JP/FJP: Dragonscale Flesh - boss drop to SE",
    { place: "South east of Foot of the Jagged Peak", encounter: "Jagged Peak Drake" },
  ],
  [
    "JP/FJP: Scadutree Fragment - under where the boulder spawns",
    { place: "Foot of the Jagged Peak, where the boulder falls", encounter: "Scadutree Fragment" },
  ],
  [
    "JP/JPS: Heart of Bayle - mainboss drop",
    { place: "Jagged Peak Summit", encounter: "Bayle the Dread" },
  ],
  [
    "JP/JPM: Ancient Dragon Smithing Stone - boss drop to S",
    { place: "South of Jagged Peak Mountainside", encounter: "Ancient Dragon Senessax" },
  ],
  [
    "JP/JPM: Somber Ancient Dragon Smithing Stone - boss drop to S",
    { place: "South of Jagged Peak Mountainside", encounter: "Ancient Dragon Senessax" },
  ],
  ["RR/(VF): Revered Spirit Ash - by statue", { place: "Village of Flies", encounter: "Statue" }],
  [
    "RR/RRD: Scadutree Fragment - lower RR, up river in coffin",
    { place: "Upriver from Recluses' River Downstream", encounter: "Coffin" },
  ],
  [
    "RR/RU: Revered Spirit Ash - SE of RU by statue",
    { place: "South east of Ruins of Unte", encounter: "Statue" },
  ],
  [
    "RR/(ENM): Rakshasa's Great Katana - boss drop",
    { place: "Eastern Nameless Mausoleum", encounter: "Rakshasa" },
  ],
  [
    "RR/(ENM): Rakshasa Helm - boss drop",
    { place: "Eastern Nameless Mausoleum", encounter: "Rakshasa" },
  ],
  [
    "RR/(ENM): Rakshasa Armor - boss drop",
    { place: "Eastern Nameless Mausoleum", encounter: "Rakshasa" },
  ],
  [
    "RR/(ENM): Rakshasa Gauntlets - boss drop",
    { place: "Eastern Nameless Mausoleum", encounter: "Rakshasa" },
  ],
  [
    "RR/(ENM): Rakshasa Greaves - boss drop",
    { place: "Eastern Nameless Mausoleum", encounter: "Rakshasa" },
  ],
  [
    "RR/RRD: Scadutree Fragment - enemy drop RR swamp, W side of swamp",
    { place: "Swamp by Recluses' River Downstream, west", encounter: "Lesser Golden Hippopotamus" },
  ],
  [
    "RR/RRD: Scadutree Fragment - enemy drop RR swamp, E side of swamp",
    { place: "Swamp by Recluses' River Downstream, east", encounter: "Lesser Golden Hippopotamus" },
  ],
  [
    "ScV/SKBG: Scadutree Fragment - to SE",
    { place: "South east of Shadow Keep, Back Gate", encounter: "Scadutree Fragment" },
  ],
  [
    "ScV/(SC): Scadutree Fragment 1 - by chalice",
    { place: "Scadutree Chalice", encounter: "Fragment 1" },
  ],
  [
    "ScV/(SC): Scadutree Fragment 2 - by chalice",
    { place: "Scadutree Chalice", encounter: "Fragment 2" },
  ],
  [
    "ScV/(SC): Scadutree Fragment 3 - by chalice",
    { place: "Scadutree Chalice", encounter: "Fragment 3" },
  ],
  [
    "ScV/(SC): Scadutree Fragment 4 - by chalice",
    { place: "Scadutree Chalice", encounter: "Fragment 4" },
  ],
  [
    "ScV/(SC): Scadutree Fragment 5 - by chalice",
    { place: "Scadutree Chalice", encounter: "Fragment 5" },
  ],
  [
    "HL/HL: Blessing of Marika - boss drop on hill",
    { place: "Hinterland, on the hill", encounter: "Tree Sentinel" },
  ],
  [
    "HL/HL: Blessing of Marika - boss drop by bridge",
    { place: "Hinterland, by the bridge", encounter: "Tree Sentinel" },
  ],
  [
    "HL/FH: Gravitational Missile - boss drop to NE",
    { place: "North east of Fingerstone Hill", encounter: "Fallingstar Beast" },
  ],
  [
    "SB/TWS: Remembrance of the Shadow Sunflower - mainboss drop",
    { place: "Scadutree Base", encounter: "Scadutree Avatar" },
  ],
  [
    "SB/TWS: Miquella's Great Rune - mainboss drop",
    { place: "Scadutree Base", encounter: "Scadutree Avatar" },
  ],
]);
