/*! Key spots' names are built on the Elden Ring apworld 0.1.3's location names, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

import type { KeySpot } from "../../key-spots.js";
import { placeName } from "../../place-names.js";

/** Liurnia's key spots by exact Archipelago name, with the Academy's, the Moonlight Altar's and the Ruin-Strewn Precipice's. */
export const LIURNIA_KEY_SPOTS: ReadonlyMap<string, KeySpot> = new Map([
  [
    "LL/(CM): Golden Seed - seedtree W of MUL grace",
    { place: "Caria Manor, west of Manor Upper Level", encounter: "Golden Seed tree" },
  ],
  [
    "LL/(AGT): Golden Seed - seedtree SE of upper AGT main stairs",
    {
      place: "Academy Gate Town, south east of the upper main stairs",
      encounter: "Golden Seed tree",
    },
  ],
  [
    "LL/RVV: Golden Seed - seedtree to SW ",
    { place: "South west of Ravine-Veiled Village", encounter: "Golden Seed tree" },
  ],
  ["LL/(CIr): Sacred Tear - at statue", { place: "Church of Irith", encounter: "Sacred Tear" }],
  ["LL/(BC): Sacred Tear - by statue", { place: "Bellum Church", encounter: "Sacred Tear" }],
  [
    "LL/(CIn): Sacred Tear - by statue",
    { place: "Church of Inhibition", encounter: "Sacred Tear" },
  ],
  [
    "RLA/DB: Golden Seed - seedtree outside to NW",
    { place: "Outside the Debate Parlor, to the north west", encounter: "Golden Seed tree" },
  ],
  [
    "RLA/MAG: Golden Seed - seedtree to NE",
    { place: "North east of Main Academy Gate", encounter: "Golden Seed tree" },
  ],
  [
    "LL/MEW: Cerulean Crystal Tear - boss drop, Minor Erdtree W",
    { place: placeName("LL/MEW"), encounter: "Erdtree Avatar" },
  ],
  [
    "LL/MEW: Ruptured Crystal Tear - boss drop, Minor Erdtree W",
    { place: placeName("LL/MEW"), encounter: "Erdtree Avatar" },
  ],
  [
    "LL/(CE): Greatblade Phalanx - boss drop Evergaol",
    { place: "Cuckoo's Evergaol", encounter: "Bols, Carian Knight" },
  ],
  [
    "LL/TQ: Dragon Heart - boss drop to N",
    { place: "North of Temple Quarter", encounter: "Glintstone Dragon Smarag" },
  ],
  [
    "LL/(VA): Crucible Knot Talisman - boss drop",
    { place: "Village of the Albinaurics", encounter: "Omenkiller" },
  ],
  [
    "LL/(CM): Loretta's Greatbow - boss drop",
    { place: "Caria Manor", encounter: "Loretta, Royal Knight" },
  ],
  [
    "LL/(CM): Ash of War: Loretta's Slash - boss drop",
    { place: "Caria Manor", encounter: "Loretta, Royal Knight" },
  ],
  [
    "LL/GTN: Ancient Death Rancor - night boss drop to S",
    { place: "South of Gate Town North", encounter: "Death Rite Bird" },
  ],
  [
    "LL/SeI: Red-Feathered Branchsword - night boss drop to NE",
    { place: "North east of Scenic Isle", encounter: "Deathbird" },
  ],
  [
    "LL/(CV): Meat Peddler's Bell Bearing - night boss drop",
    { place: "Church of Vows", encounter: "Bell Bearing Hunter" },
  ],
  [
    "LL/(ME): Flame of the Fell God - boss drop Evergaol",
    { place: "Malefactor's Evergaol", encounter: "Adan, Thief of Fire" },
  ],
  [
    "LL/GTB: Ash of War: Ice Spear - night boss drop to SE",
    { place: "Gate Town Bridge", encounter: "Night's Cavalry" },
  ],
  [
    "LL/AS: Deathroot - boss drop SE of AS",
    { place: `South east of ${placeName("LL/AS")}`, encounter: "Tibia Mariner" },
  ],
  [
    "LL/AS: Skeletal Bandit Ashes - boss drop SE of AS",
    { place: `South east of ${placeName("LL/AS")}`, encounter: "Tibia Mariner" },
  ],
  [
    "LL/BC: Nightrider Glaive - night boss drop S of BC",
    { place: "Bellum Highway, near Bellum Church", encounter: "Night's Cavalry" },
  ],
  [
    "LL/BC: Ash of War: Giant Hunt - night boss drop S of BC",
    { place: "Bellum Highway, near Bellum Church", encounter: "Night's Cavalry" },
  ],
  [
    "LL/MEE: Magic-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
    { place: placeName("LL/MEE"), encounter: "Erdtree Avatar" },
  ],
  [
    "LL/MEE: Lightning-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
    { place: placeName("LL/MEE"), encounter: "Erdtree Avatar" },
  ],
  [
    "LL/MEE: Holy-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
    { place: placeName("LL/MEE"), encounter: "Erdtree Avatar" },
  ],
  [
    "LL/(RGE): Meteorite - boss drop Evergaol",
    { place: "Royal Grave Evergaol", encounter: "Onyx Lord" },
  ],
  [
    "LL/(KR): Frozen Needle - in chest E side of ruins underground behind illusory floor",
    { place: "Kingsrealm Ruins", encounter: "Royal Revenant" },
  ],
  [
    "RSP/RSPO: Magma Wyrm's Scalesword - boss drop",
    { place: "End of Ruin-Strewn Precipice", encounter: "Magma Wyrm Makar" },
  ],
  [
    "RSP/RSPO: Dragon Heart - boss drop",
    { place: "End of Ruin-Strewn Precipice", encounter: "Magma Wyrm Makar" },
  ],
  [
    "LL/(TFB/CA): Ornamental Straight Sword - boss drop",
    { place: placeName("LL/(TFB/CA)"), encounter: "Grafted Scion" },
  ],
  [
    "LL/(TFB/CA): Golden Beast Crest Shield - boss drop",
    { place: placeName("LL/(TFB/CA)"), encounter: "Grafted Scion" },
  ],
  [
    "MA/(RE): Black Knife Tiche - boss drop Evergaol",
    { place: "Ringleader's Evergaol", encounter: "Alecto, Black Knife Ringleader" },
  ],
  [
    "MA/MA: Adula's Moonblade - boss drop to NE",
    { place: "North east of Moonlight Altar", encounter: "Glintstone Dragon Adula" },
  ],
  [
    "MA/MA: Dragon Heart x3 - boss drop to NE",
    { place: "North east of Moonlight Altar", encounter: "Glintstone Dragon Adula" },
  ],
  [
    "RLA/SC: Memory Stone - boss drop",
    { place: "Raya Lucaria, before the Schoolhouse Classroom", encounter: "Red Wolf of Radagon" },
  ],
  [
    "RLA/DB: Great Rune of the Unborn - mainboss drop",
    { place: "Raya Lucaria Grand Library", encounter: "Rennala, Queen of the Full Moon" },
  ],
  [
    "RLA/DB: Remembrance of the Full Moon Queen - mainboss drop",
    { place: "Raya Lucaria Grand Library", encounter: "Rennala, Queen of the Full Moon" },
  ],
  [
    "LL/REC: Ash of War: Sword Dance - scarab N of REC",
    { place: "North of Road's End Catacombs", encounter: "Scarab" },
  ],
  [
    "LL/TQ: Somber Smithing Stone [2] - scarab to NW on island",
    { place: "Island north west of Temple Quarter", encounter: "Scarab" },
  ],
  [
    "LL/FFB: Smithing Stone [4] - in right chest to N in upper camp",
    { place: "Upper camp north of Foot of the Four Belfries", encounter: "Right chest" },
  ],
  ["LL/(TFB): Imbued Sword Key - in chest", { place: placeName("LL/(TFB)"), encounter: "Chest" }],
  [
    "LL/FFB: Carian Knight's Sword - in caravan chest to N, NE of camp",
    { place: "North of Foot of the Four Belfries", encounter: "Caravan chest" },
  ],
  [
    "LL/FFB: Albinauric Bloodclot x6 - in left chest to N in upper camp",
    { place: "Upper camp north of Foot of the Four Belfries", encounter: "Left chest" },
  ],
  [
    "LL/FFB: Cuckoo Glintstone x10 - in chest to N in camp",
    { place: "Camp north of Foot of the Four Belfries", encounter: "Chest" },
  ],
  [
    "LL/(CT): Memory Stone - top of tower, requires Erudition gesture",
    { place: "Top of Converted Tower", encounter: "Chest" },
  ],
  [
    "LL/VA: Somber Smithing Stone [2] - scarab to N, cross bridge, drop from island and head N",
    { place: "North of Village of the Albinaurics", encounter: "Scarab" },
  ],
  [
    "LL/RC: Bloodflame Blade - scarab NW of RC",
    { place: "North west of Rose Church", encounter: "Scarab" },
  ],
  [
    "LL/TQ: Academy Glintstone Key - to N by boss",
    { place: "Behind Glintstone Dragon Smarag", encounter: "Corpse" },
  ],
  [
    "LL/NLLS: Map: Liurnia, West - to NE on map pillar",
    { place: "North east of Northern Liurnia Lake Shore", encounter: "Map fragment" },
  ],
  [
    "LL/RM: Somber Smithing Stone [3] x3 - Iji shop",
    { place: "Road to the Manor", encounter: "Iji" },
  ],
  [
    "LL/VA: Haligtree Secret Medallion (Right) - given by Albus",
    { place: "Village of the Albinaurics", encounter: "Albus" },
  ],
  [
    "LL/FL: Ash of War: Vow of the Indomitable - scarab to S",
    { place: "South of Folly on the Lake", encounter: "Scarab" },
  ],
  [
    "LL/SoI: Memory Stone - in chest top of tower, solve puzzle",
    { place: "Top of Testu's Rise", encounter: "Chest" },
  ],
  [
    "LL/EGBT: Ash of War: Shield Bash - scarab to NE",
    { place: "North east of East Gate Bridge Trestle", encounter: "Scarab" },
  ],
  [
    "LL/RM: Intelligence-knot Crystal Tear - to NE below in a basin, follow cliff side",
    { place: "Below the cliff north east of Road to the Manor", encounter: "Basin" },
  ],
  [
    "LL/(CM): Carian Piercer - scarab NE of fountain",
    { place: "Caria Manor, north east of the fountain", encounter: "Scarab" },
  ],
  [
    "LL/BCM: Frozen Armament - scarab to NW",
    { place: "North west of Behind Caria Manor", encounter: "Scarab" },
  ],
  [
    "LL/BS: Dexterity-knot Crystal Tear - to SW in basin",
    { place: "South west of Boilprawn Shack", encounter: "Basin" },
  ],
  [
    "LL/AGT: Glintstone Craftsman's Cookbook [4] - in chest to NW on L-shaped building",
    { place: "North west of Academy Gate Town", encounter: "Chest" },
  ],
  [
    "LL/FRL: Ash of War: Charge Forth - scarab to N hanging under bridge",
    { place: "Under the bridge north of Fallen Ruins of the Lake", encounter: "Scarab" },
  ],
  [
    "LL/AGT: Map: Liurnia, North - map pillar near grace",
    { place: "Academy Gate Town", encounter: "Map fragment" },
  ],
  [
    "LL/AGT: Somber Smithing Stone [2] - scarab to NW, N of L-shaped building with chest",
    { place: "North west of Academy Gate Town", encounter: "Scarab" },
  ],
  [
    "LL/(CV): Golden Tailoring Tools - in chest within CV",
    { place: "Church of Vows", encounter: "Chest" },
  ],
  [
    "LL/(CV): Gold Sewing Needle - in chest within CV",
    { place: "Church of Vows", encounter: "Chest" },
  ],
  [
    "LL/FFV: Frenzied Burst - scarab NW of FFV",
    { place: "North west of Frenzied Flame Village", encounter: "Scarab" },
  ],
  [
    "LL/MC: Somber Smithing Stone [2] - scarab to NW",
    { place: "North west of Mausoleum Compound", encounter: "Scarab" },
  ],
  [
    "LL/RVV: Ash of War: Barbaric Roar - scarab to N",
    { place: "North of Ravine-Veiled Village", encounter: "Scarab" },
  ],
  [
    "LL/LLS: Estoc - Nomadic Merchant shop",
    { place: "Liurnia Lake Shore", encounter: "Nomadic Merchant" },
  ],
  [
    "LL/LLS: Kite Shield - Nomadic Merchant shop",
    { place: "Liurnia Lake Shore", encounter: "Nomadic Merchant" },
  ],
  [
    "LL/LLS: Map: Liurnia, East - map pillar to N",
    { place: "North of Liurnia Lake Shore", encounter: "Map fragment" },
  ],
  [
    "LL/(HLT): Glintstone Craftsman's Cookbook [3] - in chest second floor",
    { place: `${placeName("LL/(HLT)")}, second floor`, encounter: "Chest" },
  ],
  [
    "LL/GLD: Somber Smithing Stone [3] - scarab to NW",
    { place: "North west of Grand Lift of Dectus", encounter: "Scarab" },
  ],
  [
    "LL/(CIr): Ash of War: Thops's Barrier - scarab in church after Thops moves",
    { place: "Church of Irith", encounter: "Scarab" },
  ],
  [
    "LL/(PR): Two Fingers Heirloom - in chest underground",
    { place: "Below Purified Ruins", encounter: "Chest" },
  ],
  [
    "LL/GTB: Somber Smithing Stone [2] - scarab to SE",
    { place: "South east of Gate Town Bridge", encounter: "Scarab" },
  ],
  [
    "LL/SHE: Somber Smithing Stone [3] - scarab NW of SHE",
    { place: "North west of Study Hall Entrance", encounter: "Scarab" },
  ],
  [
    "LL/LHS: Treespear - to SE in caravan chest",
    { place: "South east of Liurnia Highway South", encounter: "Caravan chest" },
  ],
  [
    "LL/BC: Rift Shield - Nomadic Merchant shop N of BC",
    { place: "North of Bellum Church", encounter: "Nomadic Merchant" },
  ],
  [
    "LL/BC: Blue Crest Heater Shield - Nomadic Merchant shop N of BC",
    { place: "North of Bellum Church", encounter: "Nomadic Merchant" },
  ],
  [
    "LL/BC: Composite Bow - Nomadic Merchant shop N of BC",
    { place: "North of Bellum Church", encounter: "Nomadic Merchant" },
  ],
  [
    "LL/(FFT): Howl of Shabriri - in chest near top of tower",
    { place: "Top of Frenzy-Flaming Tower", encounter: "Chest" },
  ],
  [
    "LL/(TFB/CA): Stormhawk Deenh - chest top of church",
    { place: placeName("LL/(TFB/CA)"), encounter: "Chest" },
  ],
  [
    "RLA/RLGL: Dark Moon Ring - in chest, requires Discarded Palace Key",
    { place: "Raya Lucaria Grand Library", encounter: "Chest" },
  ],
  [
    "RLA/DB: Imbued Sword Key - in a tower E before jumping to church roof in rooftop section",
    { place: "Rooftops east of Debate Parlor", encounter: "Corpse" },
  ],
  [
    "RLA/DB: Glintstone Scarab - in chest up ladder down hidden path in courtyard on way to unlock shortcut door",
    { place: "Hidden path off the courtyard by Debate Parlor", encounter: "Chest" },
  ],
  [
    "RLA/DB: Radagon Icon - in chest outside, around to right up ladder, upper DB",
    { place: "Above Debate Parlor", encounter: "Chest" },
  ],
  [
    "RLA/SC: Ritual Pot - in chest to S, follow corridor, S in 4-way",
    { place: "South of Schoolhouse Classroom", encounter: "Chest" },
  ],
  [
    "RLA/SC: Glintstone Craftsman's Cookbook [5] - in chest to S within left room",
    { place: "South of Schoolhouse Classroom", encounter: "Chest" },
  ],
  [
    "RLA/CC: Ash of War: Spectral Lance - scarab outside, E after bridge over some graves",
    { place: "Graves east of Church of the Cuckoo", encounter: "Scarab" },
  ],
  [
    "RLA/SC: Comet - in chest behind illusory bookshelf before boss room",
    { place: "Behind an illusory bookshelf by Schoolhouse Classroom", encounter: "Chest" },
  ],
  [
    "RLA/DB: Full Moon Crossbow - in chest after making the insane long jump to upper W roofs, top of tower after long ladder in rooftop section",
    { place: "Tower atop the west rooftops", encounter: "Chest" },
  ],
  [
    "RLA/MAG: St. Trina's Arrow x20 - Isolated Merchant down SE ramp",
    { place: "South east of Main Academy Gate", encounter: "Isolated Merchant" },
  ],
  [
    "RLA/MAG: Blue Cloth Cowl - Isolated Merchant down SE ramp",
    { place: "South east of Main Academy Gate", encounter: "Isolated Merchant" },
  ],
  [
    "RLA/MAG: Blue Cloth Vest - Isolated Merchant down SE ramp",
    { place: "South east of Main Academy Gate", encounter: "Isolated Merchant" },
  ],
  [
    "LL/(ACC): Terra Magica - in chest atop tower after boss",
    { place: "Academy Crystal Cave", encounter: "Chest" },
  ],
  [
    "LL/(ACC): Crystal Release - boss drop",
    { place: "Academy Crystal Cave", encounter: "Crystalians" },
  ],
  [
    "LL/(REC): Glintstone Sorcerer Ashes - boss drop",
    { place: "Road's End Catacombs", encounter: "Spirit-Caller Snail" },
  ],
  [
    "LL/(BKC): Twinsage Sorcerer Ashes - boss drop",
    { place: "Black Knife Catacombs", encounter: "Cemetery Shade" },
  ],
  [
    "LL/(BKC): Assassin's Cerulean Dagger - alt boss drop",
    { place: "Black Knife Catacombs", encounter: "Black Knife Assassin" },
  ],
  [
    "LL/(BKC): Black Knifeprint - alt boss drop",
    { place: "Black Knife Catacombs", encounter: "Black Knife Assassin" },
  ],
  [
    "LL/(BKC): Deathroot - in chest after boss",
    { place: "Black Knife Catacombs", encounter: "Chest" },
  ],
  [
    "LL/(CC): Kaiden Sellsword Ashes - boss drop",
    { place: "Cliffbottom Catacombs", encounter: "Erdtree Burial Watchdog" },
  ],
  [
    "LL/(SC): Winged Sword Insignia - boss drop",
    { place: "Stillwater Cave", encounter: "Cleanrot Knight" },
  ],
  [
    "LL/(LCC): Cerulean Amber Medallion - boss drop",
    { place: "Lakeside Crystal Cave", encounter: "Bloodhound Knight" },
  ],
  [
    "LL/(LCC): Spear Talisman - in chest W path from first room",
    { place: "Lakeside Crystal Cave", encounter: "Chest" },
  ],
  [
    "LL/(RLCT): Smithing-Stone Miner's Bell Bearing [1] - boss drop",
    { place: "Raya Lucaria Crystal Tunnel", encounter: "Crystalian (Ringblade)" },
  ],
  [
    "LL/(DV): Cursemark of Death - top of tower",
    { place: "Top of the Divine Tower of Liurnia", encounter: "Ranni's body" },
  ],
  [
    "RSP/RSP: Somber Smithing Stone [4] - scarab to S",
    { place: "South of Ruin-Strewn Precipice", encounter: "Scarab" },
  ],
  [
    "MA/(CR): Ranni's Dark Moon - in chest top of rise, just google this puzzle :)",
    { place: "Top of Chelona's Rise", encounter: "Chest" },
  ],
  [
    "MA/(MR): Somber Smithing Stone [8] - in chest under illusory floor NE side of ruins",
    { place: "Below Moonfolk Ruins, north east", encounter: "Chest" },
  ],
  [
    "MA/(LER): Cerulean Amber Medallion +2 - in chest under illusory floor behind imp statue",
    { place: "Below Lunar Estate Ruins, behind the imp statue", encounter: "Chest" },
  ],
  [
    "MA/(LER): Smithing Stone [8] x3 - in chest under illusory floor E ruins",
    { place: "Below Lunar Estate Ruins, east", encounter: "Chest" },
  ],
  [
    "LL/(RaR): Spectral Steed Regalia: Carian Silver - in chest near grace",
    { place: "Ranni's Rise", encounter: "Chest" },
  ],
  [
    "LL/RMG: Ash of War: Chilling Mist - scarab to W",
    { place: "West of Royal Moongazing Grounds", encounter: "Scarab" },
  ],
  [
    "LL/(CM): Ripple Blade - Pidia shop",
    { place: "Caria Manor", encounter: "Pidia, Carian Servant" },
  ],
  [
    "LL/(CM): Black Leather Shield - Pidia shop",
    { place: "Caria Manor", encounter: "Pidia, Carian Servant" },
  ],
]);
