/*! Key spots' names are built on the Elden Ring apworld 0.1.3's location names, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

import type { KeySpot } from "../../key-spots.js";
import { placeName } from "../../place-names.js";

/** The underground's key spots by exact Archipelago name: Siofra and Ainsel, the Eternal Cities, the Deeproot Depths and the Lake of Rot. */
export const UNDERGROUND_KEY_SPOTS: ReadonlyMap<string, KeySpot> = new Map([
  [
    "NS/NEC: Golden Seed - seedtree to W by elevator from upper NS path",
    { place: "Nokstella, west by the elevator", encounter: "Golden Seed tree" },
  ],
  [
    "SR/BW: Golden Seed - to SW across rock bridge under seedtree",
    {
      place: "South west of Below the Well, across the rock bridge",
      encounter: "Golden Seed tree",
    },
  ],
  [
    "SR/(HG): Ancestral Follower Ashes - boss drop",
    { place: placeName("SR/(HG)"), encounter: "Ancestor Spirit" },
  ],
  [
    "SR/WW: Dragon Halberd - upper siofra, boss drop",
    { place: "Upper Siofra, Worshippers' Woods", encounter: "Dragonkin Soldier" },
  ],
  [
    "NR/NEC: Silver Tear Mask - boss drop",
    { place: "Nokron, Eternal City", encounter: "Mimic Tear" },
  ],
  [
    "NR/NEC: Larval Tear x2 - boss drop",
    { place: "Nokron, Eternal City", encounter: "Mimic Tear" },
  ],
  [
    "NR/(SA): Gargoyle's Greatsword - boss drop",
    { place: "Siofra Aqueduct", encounter: "Valiant Gargoyles" },
  ],
  [
    "NR/(SA): Gargoyle's Twinblade - boss drop",
    { place: "Siofra Aqueduct", encounter: "Valiant Gargoyles" },
  ],
  [
    "NR/(HG): Remembrance of the Regal Ancestor - boss drop",
    { place: placeName("NR/(HG)"), encounter: "Regal Ancestor Spirit" },
  ],
  [
    "DD/TNEC: Siluria's Tree - boss drop way to W by tree stump",
    {
      place: "By the tree stump, west of Nameless Eternal City",
      encounter: "Crucible Knight Siluria",
    },
  ],
  ["DD/AR: Fia's Mist - boss drop", { place: "Deeproot Depths", encounter: "Fia's Champions" }],
  [
    "AR/ARD: Frozen Lightning Spear - boss drop",
    { place: "Ainsel River Downstream", encounter: "Dragonkin Soldier of Nokstella" },
  ],
  [
    "LR/LRS: Dragonscale Blade - boss drop",
    { place: "Lake of Rot Shoreside", encounter: "Dragonkin Soldier" },
  ],
  [
    "LR: Remembrance of the Naturalborn - mainboss drop",
    { place: "Grand Cloister, Lake of Rot", encounter: "Astel, Naturalborn of the Void" },
  ],
  [
    "AR/UPR: Prisoner Iron Mask - Hermit Merchant NW of UPR in temple",
    { place: "Temple north west of Uhl Palace Ruins", encounter: "Hermit Merchant" },
  ],
  [
    "AR/UPR: Prisoner Clothing - Hermit Merchant NW of UPR in temple",
    { place: "Temple north west of Uhl Palace Ruins", encounter: "Hermit Merchant" },
  ],
  [
    "AR/UPR: Map: Ainsel River - NW of UPR in temple by merchant",
    { place: "Temple north west of Uhl Palace Ruins", encounter: "Map fragment" },
  ],
  [
    "AR/ARD: Great Ghost Glovewort - in chest after boss",
    { place: "Ainsel River Downstream", encounter: "Chest" },
  ],
  [
    "LR/LRS: Map: Lake of Rot - to S",
    { place: "South of Lake of Rot Shoreside", encounter: "Map fragment" },
  ],
  [
    "LR/LRS: Somber Smithing Stone [6] - scarab to S most part of LR",
    { place: "Southern end of the Lake of Rot", encounter: "Scarab" },
  ],
  [
    "LR/GC: Scorpion's Stinger - in chest within W temple",
    { place: "West temple by Grand Cloister", encounter: "Chest" },
  ],
  [
    "NS/NEC: Somber Smithing Stone [6] - scarab up stairs to W, on end stairs",
    { place: "Top of Nokstella's west stairs", encounter: "Scarab" },
  ],
  [
    "NS/NEC: Great Ghost Glovewort - in chest up stairs to W, after bridge to right in interior",
    { place: "Past Nokstella's bridge, to the right", encounter: "Chest" },
  ],
  [
    "NS/NEC: Somber Smithing Stone [7] - in chest up stairs to W, after bridge up stairs in interior",
    { place: "Upstairs past Nokstella's bridge", encounter: "Chest" },
  ],
  [
    "ARM/UPR: Wing of Astel - left path from corpse room after UPR, in chest on temple beam",
    { place: "Temple beam past Uhl Palace Ruins", encounter: "Chest" },
  ],
  [
    "NS/NEC: Somber Smithing Stone [7] - in chest up W stairs within interior through window in corridor",
    { place: "Through a window in Nokstella's corridor", encounter: "Chest" },
  ],
  [
    "NS/NEC: Ghost Glovewort [9] - in chest up stairs to NW in lower area",
    { place: "Lower Nokstella, north west", encounter: "Chest" },
  ],
  [
    "NS/NEC: Moon of Nokstella - in chest up stairs to W, within final interior",
    { place: "Nokstella's last room", encounter: "Chest" },
  ],
  [
    "NS/NEC: Ant's Skull Plate - in chest up stairs to W in first interior room",
    { place: "Nokstella's first room", encounter: "Chest" },
  ],
  [
    "NS/NEC: Ghost-Glovewort Picker's Bell Bearing [2] - in chest up stairs to W in second interior room",
    { place: "Nokstella's second room", encounter: "Chest" },
  ],
  [
    "NS/NEC: Nightmaiden & Swordstress Puppets - in chest behind imp statue to W up stairs, left before bridge",
    { place: "Behind Nokstella's imp statue", encounter: "Chest" },
  ],
  [
    "SR/WW: Shotel - Abandoned Merchant to W in upper interior area",
    { place: "West of Worshippers' Woods", encounter: "Abandoned Merchant" },
  ],
  [
    "SR/WW: Dwelling Arrow x30 - Abandoned Merchant to W in upper interior area",
    { place: "West of Worshippers' Woods", encounter: "Abandoned Merchant" },
  ],
  [
    "SR/SRB: Map: Siofra River - to SE by bottom of stairs",
    { place: "South east of Siofra River Bank", encounter: "Map fragment" },
  ],
  [
    "SR/WW: Great Oracular Bubble - scarab upper siofra, inside tower to SW",
    { place: "Tower south west of Worshippers' Woods", encounter: "Scarab" },
  ],
  [
    "SR/WW: Ash of War: Square Off - scarab to N looking at waterfall",
    { place: "North of Worshippers' Woods, by the waterfall", encounter: "Scarab" },
  ],
  [
    "SR/SRWD: Oracle Bubbles - scarab on statue in ruins",
    { place: "Ruins by Siofra River Well Depths", encounter: "Scarab" },
  ],
  [
    "NR/MT: Somber Smithing Stone [5] - scarab to NE",
    { place: "North east of Mimic Tear", encounter: "Scarab" },
  ],
  [
    "NR/AW: Ash of War: Enchanted Shot - scarab to N by fire monument",
    { place: "North of Ancestral Woods", encounter: "Scarab" },
  ],
  [
    "NR/(SA): Order Healing - scarab in SE most structure",
    { place: "Siofra Aqueduct, south east", encounter: "Scarab" },
  ],
  [
    "NR/(NSG): Fingerslayer Blade - in chest lower area, talk to Ranni in LL",
    { place: "Night's Sacred Ground", encounter: "Chest" },
  ],
  [
    "NR/(NSG): Great Ghost Glovewort - in chest lower area, talk to Ranni in LL",
    { place: "Night's Sacred Ground", encounter: "Chest" },
  ],
  [
    "NR/AW: Ancestral Infant's Head - in chest in NW ruin on water",
    { place: "Ruin north west of Ancestral Woods", encounter: "Chest" },
  ],
  [
    "DD/DD: Map: Deeproot Depths - path to NE in gazebo",
    { place: "Gazebo north east of Deeproot Depths", encounter: "Map fragment" },
  ],
  [
    "DD/GWC: Ash of War: Golden Land - scarab to S",
    { place: "South of Great Waterfall Crest", encounter: "Scarab" },
  ],
  [
    "DD/TNEC: Somber Smithing Stone [6] - scarab to NW on some roots",
    { place: "Roots north west of The Nameless Eternal City", encounter: "Scarab" },
  ],
  [
    "DD/TNEC: Somber Smithing Stone [6] - scarab to E, N of the gazebo",
    { place: "East of The Nameless Eternal City", encounter: "Scarab" },
  ],
  [
    "DD/TNEC: Crucible Gauntlets - in chest way to W within tree stump",
    { place: "Tree stump west of The Nameless Eternal City", encounter: "Chest" },
  ],
  [
    "DD/TNEC: Crucible Greaves - in chest way to W within tree stump",
    { place: "Tree stump west of The Nameless Eternal City", encounter: "Chest" },
  ],
  [
    "DD/TNEC: Crucible Tree Helm - in chest way to W within tree stump",
    { place: "Tree stump west of The Nameless Eternal City", encounter: "Chest" },
  ],
  [
    "DD/TNEC: Crucible Tree Armor - in chest way to W within tree stump",
    { place: "Tree stump west of The Nameless Eternal City", encounter: "Chest" },
  ],
  [
    "LR/GC: Nomadic Warrior's Cookbook [22] - in chest SW corner of LR within structure",
    { place: "Structure in the south west of Lake of Rot", encounter: "Chest" },
  ],
  [
    "NR/(NSG): Mimic Tear Ashes - in chest behind imp statue upper interior",
    { place: "Night's Sacred Ground, behind the imp statue", encounter: "Chest" },
  ],
]);
