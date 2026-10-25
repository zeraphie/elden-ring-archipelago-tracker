/*! Boss names, defeat flags and arenas from the Elden Ring apworld 0.1.3's bosses.py, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

// Written by tools/write-bosses.ts from the apworld's bosses.py: run `bun run bosses` again rather than editing it.

/** A boss a goal can name: its name, the area code its apworld name carries in brackets, and the locations its defeat drops. */
export interface Boss {
  readonly name: string;
  readonly where: string | undefined;
  readonly drops: readonly string[];
}

/** Every boss a goal can name, by the flag the game sets when it's defeated. */
export const BOSSES: ReadonlyMap<number, Boss> = new Map([
  [18000850, { name: "Soldier of Godrick", where: "LG", drops: [] }],
  [
    1042360800,
    { name: "Tree Sentinel", where: "LG", drops: ["LG/TFS: Golden Halberd - first field boss"] },
  ],
  [
    1043360800,
    {
      name: "Flying Dragon Agheel",
      where: "LG",
      drops: ["LG/DBR: Dragon Heart - boss drop N of DBR"],
    },
  ],
  [
    1043370800,
    {
      name: "Night's Cavalry",
      where: "LG",
      drops: ["LG/ALN: Ash of War: Repeating Thrust - night boss drop to SE"],
    },
  ],
  [
    1044350800,
    {
      name: "Bloodhound Knight Darriwil",
      where: "LG",
      drops: ["LG/(FHE): Bloodhound's Fang - boss drop Evergaol"],
    },
  ],
  [
    1045390800,
    {
      name: "Tibia Mariner",
      where: "LG",
      drops: ["LG/(SWV): Deathroot - boss drop", "LG/(SWV): Skeletal Militiaman Ashes - boss drop"],
    },
  ],
  [1044360800, { name: "Mad Pumpkin Head", where: "LG/WR", drops: [] }],
  [
    1042370800,
    {
      name: "Crucible Knight",
      where: "LG",
      drops: ["LG/(SE): Aspects of the Crucible: Tail - boss drop Evergaol"],
    },
  ],
  [
    1042380800,
    {
      name: "Deathbird",
      where: "LG",
      drops: ["LG/WS: Blue-Feathered Branchsword - night boss drop SE of WS"],
    },
  ],
  [
    1042380850,
    {
      name: "Bell Bearing Hunter",
      where: "LG",
      drops: ["LG/(WS): Bone Peddler's Bell Bearing - night boss drop"],
    },
  ],
  [
    18000800,
    {
      name: "Ulcerated Tree Spirit",
      where: "LG/FHG",
      drops: ["LG/(FHG): Golden Seed - boss drop", "LG/(FHG): Banished Knight Oleg - boss drop"],
    },
  ],
  [
    30020800,
    {
      name: "Erdtree Burial Watchdog",
      where: "LG/SC",
      drops: ["LG/(SC): Noble Sorcerer Ashes - boss drop"],
    },
  ],
  [
    30040800,
    {
      name: "Grave Warden Duelist",
      where: "LG/MCC",
      drops: ["LG/(MCC): Banished Knight Engvall - boss drop"],
    },
  ],
  [
    30110800,
    {
      name: "Black Knife Assassin",
      where: "LG/DC",
      drops: ["LG/(DC): Assassin's Crimson Dagger - boss drop"],
    },
  ],
  [
    31030800,
    {
      name: "Beastman of Farum Azula",
      where: "LG/GC",
      drops: ["LG/(GC): Flamedrake Talisman - boss drop"],
    },
  ],
  [
    31150800,
    {
      name: "Demi-Human Chief",
      where: "LG/CC",
      drops: ["LG/(CC): Tailoring Tools - boss drop", "LG/(CC): Sewing Needle - boss drop"],
    },
  ],
  [
    31170800,
    { name: "Guardian Golem", where: "LG/HC", drops: ["LG/(HC): Blue Dancer Charm - boss drop"] },
  ],
  [
    32010800,
    { name: "Stonedigger Troll", where: "LG/LT", drops: ["LG/(LT): Roar Medallion - boss drop"] },
  ],
  [
    10000850,
    { name: "Margit, the Fell Omen", where: "SV", drops: ["SV/CT: Talisman Pouch - boss drop"] },
  ],
  [
    10000800,
    {
      name: "Godrick the Grafted",
      where: "SV",
      drops: [
        "SV/SeC: Godrick's Great Rune - mainboss drop",
        "SV/SeC: Remembrance of the Grafted - mainboss drop",
      ],
    },
  ],
  [
    1042330800,
    {
      name: "Ancient Hero of Zamor",
      where: "WP",
      drops: ["WP/(WE): Radagon's Scarseal - boss drop Evergaol"],
    },
  ],
  [
    1043300800,
    {
      name: "Leonine Misbegotten",
      where: "WP/CM",
      drops: ["WP/(CM): Grafted Blade Greatsword - boss drop"],
    },
  ],
  [
    1043330800,
    {
      name: "Erdtree Avatar",
      where: "WP",
      drops: [
        "WP/ME: Opaline Bubbletear - boss drop",
        "WP/ME: Crimsonburst Crystal Tear - boss drop",
      ],
    },
  ],
  [
    1044320800,
    {
      name: "Deathbird",
      where: "WP",
      drops: ["WP/CMR: Sacrificial Axe - night boss drop far to SW"],
    },
  ],
  [
    1044320850,
    {
      name: "Night's Cavalry",
      where: "WP",
      drops: [
        "WP/CMR: Nightrider Flail - night boss drop to SW",
        "WP/CMR: Ash of War: Barricade Shield - night boss drop to SW",
      ],
    },
  ],
  [
    30000800,
    {
      name: "Cemetery Shade",
      where: "WP/TCC",
      drops: ["WP/(TCC): Lhutel the Headless - boss drop"],
    },
  ],
  [
    30010800,
    {
      name: "Erdtree Burial Watchdog",
      where: "WP/IC",
      drops: ["WP/(IC): Demi-Human Ashes - boss drop"],
    },
  ],
  [
    31010800,
    { name: "Runebear", where: "WP/EC", drops: ["WP/(EC): Spelldrake Talisman - boss drop"] },
  ],
  [
    31020800,
    {
      name: "Miranda the Blighted Bloom",
      where: "WP/TCV",
      drops: ["WP/(TCV): Viridian Amber Medallion - boss drop"],
    },
  ],
  [
    32000800,
    { name: "Scaly Misbegotten", where: "WP/MT", drops: ["WP/(MT): Rusted Anchor - boss drop"] },
  ],
  [
    12080800,
    {
      name: "Ancestor Spirit",
      where: "SR",
      drops: ["SR/(HG): Ancestral Follower Ashes - boss drop"],
    },
  ],
  [
    12020830,
    {
      name: "Dragonkin Soldier",
      where: "SR",
      drops: ["SR/WW: Dragon Halberd - upper siofra, boss drop"],
    },
  ],
  [
    12020850,
    {
      name: "Mimic Tear",
      where: "NR",
      drops: ["NR/NEC: Silver Tear Mask - boss drop", "NR/NEC: Larval Tear x2 - boss drop"],
    },
  ],
  [
    12020800,
    {
      name: "Valiant Gargoyles",
      where: "NR",
      drops: [
        "NR/(SA): Gargoyle's Greatsword - boss drop",
        "NR/(SA): Gargoyle's Twinblade - boss drop",
      ],
    },
  ],
  [
    12090800,
    {
      name: "Regal Ancestor Spirit",
      where: "NR",
      drops: ["NR/(HG): Remembrance of the Regal Ancestor - boss drop"],
    },
  ],
  [
    12030390,
    {
      name: "Crucible Knight Siluria",
      where: "DD",
      drops: ["DD/TNEC: Siluria's Tree - boss drop way to W by tree stump"],
    },
  ],
  [12030800, { name: "Fia's Champions", where: "DD", drops: ["DD/AR: Fia's Mist - boss drop"] }],
  [
    1033430800,
    {
      name: "Erdtree Avatar",
      where: "LL/MEW",
      drops: [
        "LL/MEW: Cerulean Crystal Tear - boss drop, Minor Erdtree W",
        "LL/MEW: Ruptured Crystal Tear - boss drop, Minor Erdtree W",
      ],
    },
  ],
  [
    1033450800,
    {
      name: "Bols, Carian Knight",
      where: "LL",
      drops: ["LL/(CE): Greatblade Phalanx - boss drop Evergaol"],
    },
  ],
  [
    1034450800,
    {
      name: "Glintstone Dragon Smarag",
      where: "LL",
      drops: ["LL/TQ: Dragon Heart - boss drop to N"],
    },
  ],
  [
    1035420800,
    { name: "Omenkiller", where: "LL", drops: ["LL/(VA): Crucible Knot Talisman - boss drop"] },
  ],
  [
    1035500800,
    {
      name: "Loretta, Royal Knight",
      where: "LL",
      drops: [
        "LL/(CM): Loretta's Greatbow - boss drop",
        "LL/(CM): Ash of War: Loretta's Slash - boss drop",
      ],
    },
  ],
  [
    1036450800,
    {
      name: "Death Rite Bird",
      where: "LL",
      drops: ["LL/GTN: Ancient Death Rancor - night boss drop to S"],
    },
  ],
  [
    1037420800,
    {
      name: "Deathbird",
      where: "LL",
      drops: ["LL/SeI: Red-Feathered Branchsword - night boss drop to NE"],
    },
  ],
  [
    1037460800,
    {
      name: "Bell Bearing Hunter",
      where: "LL",
      drops: ["LL/(CV): Meat Peddler's Bell Bearing - night boss drop"],
    },
  ],
  [
    1038410800,
    {
      name: "Adan, Thief of Fire",
      where: "LL",
      drops: ["LL/(ME): Flame of the Fell God - boss drop Evergaol"],
    },
  ],
  [
    1036480800,
    {
      name: "Night's Cavalry",
      where: "LL/GTB",
      drops: ["LL/GTB: Ash of War: Ice Spear - night boss drop to SE"],
    },
  ],
  [
    1039440800,
    {
      name: "Tibia Mariner",
      where: "LL",
      drops: [
        "LL/AS: Deathroot - boss drop SE of AS",
        "LL/AS: Skeletal Bandit Ashes - boss drop SE of AS",
      ],
    },
  ],
  [
    1039430800,
    {
      name: "Night's Cavalry",
      where: "LL/BC",
      drops: [
        "LL/BC: Nightrider Glaive - night boss drop S of BC",
        "LL/BC: Ash of War: Giant Hunt - night boss drop S of BC",
      ],
    },
  ],
  [
    1038480800,
    {
      name: "Erdtree Avatar",
      where: "LL/MEE",
      drops: [
        "LL/MEE: Magic-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
        "LL/MEE: Lightning-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
        "LL/MEE: Holy-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
      ],
    },
  ],
  [
    1036500800,
    { name: "Onyx Lord", where: "LL", drops: ["LL/(RGE): Meteorite - boss drop Evergaol"] },
  ],
  [
    1034480800,
    {
      name: "Royal Revenant",
      where: "LL/KR",
      drops: [
        "LL/(KR): Frozen Needle - in chest E side of ruins underground behind illusory floor",
      ],
    },
  ],
  [
    31060800,
    { name: "Crystalians", where: "LL/ACC", drops: ["LL/(ACC): Crystal Release - boss drop"] },
  ],
  [
    30030800,
    {
      name: "Spirit-Caller Snail",
      where: "LL/REC",
      drops: ["LL/(REC): Glintstone Sorcerer Ashes - boss drop"],
    },
  ],
  [
    30050800,
    {
      name: "Cemetery Shade",
      where: "LL/BKC",
      drops: ["LL/(BKC): Twinsage Sorcerer Ashes - boss drop"],
    },
  ],
  [
    30050850,
    {
      name: "Black Knife Assassin",
      where: "LL/BKC",
      drops: [
        "LL/(BKC): Assassin's Cerulean Dagger - alt boss drop",
        "LL/(BKC): Black Knifeprint - alt boss drop",
      ],
    },
  ],
  [
    30060800,
    {
      name: "Erdtree Burial Watchdog",
      where: "LL/CC",
      drops: ["LL/(CC): Kaiden Sellsword Ashes - boss drop"],
    },
  ],
  [
    31040800,
    {
      name: "Cleanrot Knight",
      where: "LL/SC",
      drops: ["LL/(SC): Winged Sword Insignia - boss drop"],
    },
  ],
  [
    31050800,
    {
      name: "Bloodhound Knight",
      where: "LL/LCC",
      drops: ["LL/(LCC): Cerulean Amber Medallion - boss drop"],
    },
  ],
  [
    32020800,
    {
      name: "Crystalian - Ring Blade",
      where: "LL/RLCT",
      drops: ["LL/(RLCT): Smithing-Stone Miner's Bell Bearing [1] - boss drop"],
    },
  ],
  [
    39200800,
    {
      name: "Magma Wyrm Makar",
      where: "RSP",
      drops: [
        "RSP/RSPO: Magma Wyrm's Scalesword - boss drop",
        "RSP/RSPO: Dragon Heart - boss drop",
      ],
    },
  ],
  [
    10010800,
    {
      name: "Grafted Scion",
      where: "CA",
      drops: [
        "LL/(TFB/CA): Ornamental Straight Sword - boss drop",
        "LL/(TFB/CA): Golden Beast Crest Shield - boss drop",
      ],
    },
  ],
  [
    12010800,
    {
      name: "Dragonkin Soldier of Nokstella",
      where: "AR",
      drops: ["AR/ARD: Frozen Lightning Spear - boss drop"],
    },
  ],
  [
    12010850,
    { name: "Dragonkin Soldier", where: "LR", drops: ["LR/LRS: Dragonscale Blade - boss drop"] },
  ],
  [
    12040800,
    {
      name: "Astel, Naturalborn of the Void",
      where: "LR",
      drops: ["LR: Remembrance of the Naturalborn - mainboss drop"],
    },
  ],
  [
    1033420800,
    {
      name: "Alecto, Black Knife Ringleader",
      where: "MA",
      drops: ["MA/(RE): Black Knife Tiche - boss drop Evergaol"],
    },
  ],
  [
    1034420800,
    {
      name: "Glintstone Dragon Adula",
      where: "MA",
      drops: [
        "MA/MA: Adula's Moonblade - boss drop to NE",
        "MA/MA: Dragon Heart x3 - boss drop to NE",
      ],
    },
  ],
  [
    14000850,
    { name: "Red Wolf of Radagon", where: "RLA", drops: ["RLA/SC: Memory Stone - boss drop"] },
  ],
  [
    14000800,
    {
      name: "Rennala, Queen of the Full Moon",
      where: "RLA",
      drops: [
        "RLA/DB: Great Rune of the Unborn - mainboss drop",
        "RLA/DB: Remembrance of the Full Moon Queen - mainboss drop",
      ],
    },
  ],
  [
    1047400800,
    {
      name: "Erdtree Avatar",
      where: "CL",
      drops: [
        "CL/MEW: Greenburst Crystal Tear - boss drop",
        "CL/MEW: Flame-Shrouding Cracked Tear - boss drop",
      ],
    },
  ],
  [
    1048370800,
    { name: "Decaying Ekzykes", where: "CL", drops: ["CL/CHS: Dragon Heart - boss drop to SE"] },
  ],
  [
    1048400800,
    {
      name: "Mad Pumpkin Head Duo",
      where: "CL/CR",
      drops: ["CL/(CR): Visage Shield - in chest after boss"],
    },
  ],
  [
    1049370800,
    {
      name: "Night's Cavalry",
      where: "CL",
      drops: ["CL/SASB: Ash of War: Poison Moth Flight - night boss drop to SW"],
    },
  ],
  [
    1049370850,
    {
      name: "Death Rite Bird",
      where: "CL",
      drops: ["CL/SASB: Death's Poker - night boss drop to SE"],
    },
  ],
  [
    1049380800,
    {
      name: "Commander O'Neil",
      where: "CL",
      drops: [
        "CL/IA: Commander's Standard - boss drop to SE",
        "CL/IA: Unalloyed Gold Needle (Broken) - boss drop to SE",
      ],
    },
  ],
  [
    1049390800,
    {
      name: "Nox Swordstress & Nox Priest",
      where: "CL",
      drops: ["CL/(STS): Nox Flowing Sword - boss drop"],
    },
  ],
  [
    30140800,
    {
      name: "Erdtree Burial Watchdog",
      where: "CL/MEC",
      drops: ["CL/(MEC): Mad Pumpkin Head Ashes - boss drop"],
    },
  ],
  [
    30150800,
    {
      name: "Cemetery Shade",
      where: "CL/CCC",
      drops: ["CL/(CCC): Kindred of Rot Ashes - boss drop"],
    },
  ],
  [
    30160800,
    {
      name: "Putrid Tree Spirit",
      where: "CL/WDC",
      drops: ["CL/(WDC): Golden Seed - boss drop", "CL/(WDC): Redmane Knight Ogha - boss drop"],
    },
  ],
  [
    31200800,
    { name: "Cleanrot Knight Duo", where: "CL/AC", drops: ["CL/(AC): Gold Scarab - boss drop"] },
  ],
  [
    31210800,
    {
      name: "Frenzied Duelist",
      where: "CL/GC",
      drops: ["CL/(GC): Putrid Corpse Ashes - boss drop"],
    },
  ],
  [
    32070800,
    {
      name: "Magma Wyrm",
      where: "CL/GT",
      drops: ["CL/(GT): Moonveil - boss drop", "CL/(GT): Dragon Heart - boss drop"],
    },
  ],
  [
    32080800,
    {
      name: "Fallingstar Beast",
      where: "CL/SCT",
      drops: [
        "CL/(SCT): Gravity Stone Chunk x10 - boss drop",
        "CL/(SCT): Somberstone Miner's Bell Bearing [1] - boss drop",
        "CL/(SCT): Smithing Stone [7] x5 - boss drop",
        "CL/(SCT): Somber Smithing Stone [6] - boss drop",
      ],
    },
  ],
  [
    1051360800,
    {
      name: "Crucible Knight / Misbegotten Warrior",
      where: "CL/RC",
      drops: ["CL/(RC): Ruins Greatsword - boss drop"],
    },
  ],
  [
    1252380800,
    {
      name: "Starscourge Radahn",
      where: "CL",
      drops: [
        "CL/(WD): Radahn's Great Rune - mainboss drop",
        "CL/(WD): Remembrance of the Starscourge - mainboss drop",
      ],
    },
  ],
  [
    1048410800,
    {
      name: "Bell Bearing Hunter",
      where: "DB",
      drops: ["DB/(IMS): Gravity Stone Peddler's Bell Bearing - night boss drop"],
    },
  ],
  [
    1049390850,
    {
      name: "Battlemage Hugues",
      where: "DB",
      drops: ["DB/(SE): Battlemage Hugues - Sellia Evergaol"],
    },
  ],
  [
    1051400800,
    {
      name: "Putrid Avatar",
      where: "DB",
      drops: ["DB/MEE: Opaline Hardtear - boss drop", "DB/MEE: Stonebarb Cracked Tear - boss drop"],
    },
  ],
  [
    1051430800,
    {
      name: "Black Blade Kindred",
      where: "DB",
      drops: [
        "DB/BS: Gargoyle's Blackblade - boss drop SE of BS",
        "DB/BS: Gargoyle's Black Halberd - boss drop SE of BS",
      ],
    },
  ],
  [
    1052410800,
    { name: "Flying Dragon Greyll", where: "DB", drops: ["DB/FG: Dragon Heart - boss drop to S"] },
  ],
  [
    1052410850,
    {
      name: "Night's Cavalry",
      where: "DB",
      drops: ["DB/LR: Ash of War: Bloodhound's Step - night boss drop N of LR"],
    },
  ],
  [
    31100800,
    {
      name: "Beastman of Farum Azula",
      where: "DB/DC",
      drops: ["DB/(DC): Flamedrake Talisman +2 - boss drop"],
    },
  ],
  [
    31110800,
    { name: "Crystalians - Trio", where: "DB/SH", drops: ["DB/(SH): Crystal Torrent - boss drop"] },
  ],
  [
    34130800,
    {
      name: "Godskin Apostle",
      where: "DB/DT",
      drops: [
        "DB/(DT): Godskin Apostle Hood - boss drop",
        "DB/(DT): Godskin Apostle Robe - boss drop",
        "DB/(DT): Godskin Apostle Bracelets - boss drop",
        "DB/(DT): Godskin Apostle Trousers - boss drop",
      ],
    },
  ],
  [
    1038510800,
    {
      name: "Demi-Human Queen Gilika",
      where: "AP/LR",
      drops: ["AP/LR: Ritual Sword Talisman - in chest after boss underground"],
    },
  ],
  [
    1041520800,
    {
      name: "Ancient Dragon Lansseax",
      where: "AP",
      drops: ["AP/RP: Lansseax's Glaive - boss drop up hill to SW or NE of AC grace"],
    },
  ],
  [
    1038520800,
    {
      name: "Tibia Mariner",
      where: "AP",
      drops: ["AP/WhR: Deathroot - boss drop", "AP/WhR: Tibia's Summons - boss drop"],
    },
  ],
  [
    1039500800,
    {
      name: "Godefroy the Grafted",
      where: "AP",
      drops: ["AP/GLE: Godfrey Icon - boss drop Evergaol"],
    },
  ],
  [
    1039510800,
    {
      name: "Night's Cavalry",
      where: "AP",
      drops: ["AP/AHJ: Ash of War: Shared Order - night boss drop to SW"],
    },
  ],
  [
    1039540800,
    {
      name: "Elemer of the Briar",
      where: "AP",
      drops: [
        "TSC/SCIG: Marais Executioner's Sword - boss drop",
        "TSC/SCIG: Briar Greatshield - boss drop",
      ],
    },
  ],
  [
    1040520800,
    {
      name: "Black Knife Assassin",
      where: "AP",
      drops: ["AP/SHG: Black Knife - boss drop guarding SHG"],
    },
  ],
  [
    1040530800,
    {
      name: "Sanguine Noble",
      where: "AP/WbR",
      drops: ["AP/(WbR): Bloody Helice - in chest after boss underground"],
    },
  ],
  [
    1041500800,
    {
      name: "Fallingstar Beast",
      where: "AP",
      drops: [
        "AP/AHJ: Gravity Stone Chunk x10 - boss drop S of great stairs in meteor crater",
        "AP/AHJ: Smithing Stone [6] x5 - boss drop S of great stairs in meteor crater",
        "AP/AHJ: Somber Smithing Stone [5] - boss drop S of great stairs in meteor crater",
      ],
    },
  ],
  [
    1041510800,
    {
      name: "Tree Sentinels",
      where: "AP",
      drops: [
        "AP/AHJ: Erdtree Greatshield - boss drop duo to E top of great stairs",
        "AP/AHJ: Hero's Rune [1] - boss drop duo to E top of great stairs",
      ],
    },
  ],
  [
    1041530800,
    {
      name: "Wormface",
      where: "AP",
      drops: [
        "AP/ME: Crimsonspill Crystal Tear - boss drop, Minor Erdtree",
        "AP/ME: Speckled Hardtear - boss drop, Minor Erdtree",
      ],
    },
  ],
  [
    1042550800,
    {
      name: "Godskin Apostle",
      where: "AP",
      drops: ["AP/(DWV): Godskin Peeler - boss drop", "AP/(DWV): Scouring Black Flame - boss drop"],
    },
  ],
  [
    30080800,
    {
      name: "Ancient Hero of Zamor",
      where: "AP/SHG",
      drops: ["AP/(SHG): Ancient Dragon Knight Kristoff - boss drop"],
    },
  ],
  [
    30120800,
    {
      name: "Perfumer Tricia & Misbegotten Warrior",
      where: "AP/UC",
      drops: ["AP/(UC): Perfumer Tricia - boss drop"],
    },
  ],
  [
    31180800,
    {
      name: "Omenkiller & Miranda the Blighted Bloom",
      where: "AP/PG",
      drops: ["AP/(PG): Great Omenkiller Cleaver - boss drop"],
    },
  ],
  [
    31190800,
    {
      name: "Black Knife Assassin",
      where: "AP/SCV",
      drops: ["AP/(SCV): Concealing Veil - boss drop"],
    },
  ],
  [
    31190850,
    {
      name: "Necromancer Garris",
      where: "AP/SCV",
      drops: ["AP/(SCV): Family Heads - hidden boss drop"],
    },
  ],
  [
    32040800,
    { name: "Stonedigger Troll", where: "AP/OAT", drops: ["AP/(OAT): Great Club - boss drop"] },
  ],
  [
    32050800,
    {
      name: "Crystalians - Ringblade/Spear",
      where: "AP/AT",
      drops: ["AP/(AT): Somberstone Miner's Bell Bearing [2] - boss drop"],
    },
  ],
  [
    1044530800,
    {
      name: "Deathbird",
      where: "CO",
      drops: ["CO/HMS: Twinbird Kite Shield - night boss drop to NE in block flower field"],
    },
  ],
  [
    1043530800,
    {
      name: "Bell Bearing Hunter",
      where: "CO",
      drops: ["CO/(HMS): Medicine Peddler's Bell Bearing - night boss drop"],
    },
  ],
  [
    30100800,
    {
      name: "Crucible Knight & Crucible Knight Ordovis",
      where: "CO/AHG",
      drops: [
        "CO/(AHG): Ordovis's Greatsword - boss drop",
        "CO/(AHG): Crucible Axe Helm - boss drop",
        "CO/(AHG): Crucible Axe Armor - boss drop",
        "CO/(AHG): Crucible Gauntlets - boss drop",
        "CO/(AHG): Crucible Greaves - boss drop",
      ],
    },
  ],
  [
    30130800,
    {
      name: "Grave Warden Duelist",
      where: "CO/AST",
      drops: ["CO/(AST): Soldjars of Fortune Ashes - boss drop"],
    },
  ],
  [
    34120800,
    { name: "Onyx Lord", where: "CO/ST", drops: ["CO/(ST): Onyx Lord's Greatsword - boss drop"] },
  ],
  [
    1035530800,
    {
      name: "Magma Wyrm",
      where: "MtG",
      drops: ["MtG/FL: Dragon Heart - boss drop S of FL in magma lake"],
    },
  ],
  [
    1036540800,
    {
      name: "Full-Grown Fallingstar Beast",
      where: "MtG",
      drops: [
        "MtG/NMGC: Fallingstar Beast Jaw - boss drop",
        "MtG/NMGC: Smithing Stone [6] x5 - boss drop",
        "MtG/NMGC: Somber Smithing Stone [6] - boss drop",
      ],
    },
  ],
  [
    1037530800,
    {
      name: "Demi-Human Queen Maggie",
      where: "MtG",
      drops: ["MtG/PSA: Memory Stone - boss drop to S"],
    },
  ],
  [
    1037540810,
    {
      name: "Ulcerated Tree Spirit",
      where: "MtG",
      drops: [
        "MtG/ME: Leaden Hardtear - boss drop, Minor Erdtree",
        "MtG/ME: Cerulean Hidden Tear - boss drop, Minor Erdtree",
      ],
    },
  ],
  [
    30070800,
    {
      name: "Erdtree Burial Watchdog",
      where: "MtG/WC",
      drops: ["MtG/(WC): Glovewort Picker's Bell Bearing [1] - boss drop"],
    },
  ],
  [
    30090800,
    {
      name: "Red Wolf of the Champion",
      where: "MtG/GHG",
      drops: ["MtG/(GHG): Bloodhound Knight Floh - boss drop"],
    },
  ],
  [
    31070800,
    {
      name: "Kindred of Rot",
      where: "MtG/SC",
      drops: ["MtG/(SC): Kindred of Rot's Exultation - boss drop"],
    },
  ],
  [
    31090800,
    {
      name: "Demi-Human Queen Margot",
      where: "MtG/VC",
      drops: ["MtG/(VC): Jar Cannon - boss drop"],
    },
  ],
  [
    16000800,
    {
      name: "Rykard, Lord of Blasphemy",
      where: "VM",
      drops: [
        "VM/AP: Rykard's Great Rune - mainboss drop",
        "VM/AP: Remembrance of the Blasphemous - mainboss drop",
      ],
    },
  ],
  [
    16000860,
    {
      name: "Abductor Virgins",
      where: "VM",
      drops: ["(VM)/SIC: Inquisitor's Girandole - boss drop, from RLA warp"],
    },
  ],
  [
    16000850,
    {
      name: "Godskin Noble",
      where: "VM",
      drops: ["VM/GH: Godskin Stitcher - boss drop", "VM/GH: Noble Presence - boss drop"],
    },
  ],
  [
    11000850,
    {
      name: "Godfrey, First Elden Lord",
      where: "LRC",
      drops: ["LRC/WCR: Talisman Pouch - mainboss drop"],
    },
  ],
  [
    11000800,
    {
      name: "Morgott, the Omen King",
      where: "LRC",
      drops: [
        "LRC/QB: Morgott's Great Rune - mainboss drop",
        "LRC/QB: Remembrance of the Omen King - mainboss drop",
      ],
    },
  ],
  [
    35000800,
    { name: "Mohg, the Omen", where: "SSG", drops: ["SSG/FD: Bloodflame Talons - boss drop"] },
  ],
  [
    35000850,
    {
      name: "Esgar, Priest of Blood",
      where: "SSG/LC",
      drops: ["SSG/(LC): Lord of Blood's Exultation - boss drop"],
    },
  ],
  [
    34140850,
    {
      name: "Fell Twins",
      where: "FL",
      drops: ["DTEA: Omenkiller Rollo - boss drop on way to divine tower"],
    },
  ],
  [
    1048510800,
    {
      name: "Night's Cavalry",
      where: "FL",
      drops: ["FL/FL: Ash of War: Phantom Slash - night boss drop to E"],
    },
  ],
  [
    1049520800,
    {
      name: "Black Blade Kindred",
      where: "FL",
      drops: [
        "FL/GLR: Gargoyle's Black Blades - boss drop to S",
        "FL/GLR: Gargoyle's Black Axe - boss drop to S",
      ],
    },
  ],
  [
    1050570800,
    {
      name: "Death Rite Bird",
      where: "MotG",
      drops: ["MotG/CSMG: Death Ritual Spear - boss drop to W by statue"],
    },
  ],
  [
    1051570800,
    {
      name: "Commander Niall",
      where: "MotG/CS",
      drops: [
        "MotG/(CS): Veteran's Prosthesis - mainboss drop",
        "MotG/(CS): Haligtree Secret Medallion (Left) - after boss",
      ],
    },
  ],
  [
    1052560800,
    {
      name: "Erdtree Avatar",
      where: "MotG",
      drops: [
        "MotG/(ME): Cerulean Crystal Tear - boss drop",
        "MotG/(ME): Crimson Bubbletear - boss drop",
      ],
    },
  ],
  [
    1053560800,
    {
      name: "Roundtable Knight Vyke",
      where: "MotG",
      drops: [
        "MotG/(LCE): Fingerprint Helm - boss drop Evergaol",
        "MotG/(LCE): Fingerprint Armor - boss drop Evergaol",
        "MotG/(LCE): Fingerprint Gauntlets - boss drop Evergaol",
        "MotG/(LCE): Fingerprint Greaves - boss drop Evergaol",
        "MotG/(LCE): Vyke's Dragonbolt - boss drop Evergaol",
      ],
    },
  ],
  [
    1254560800,
    {
      name: "Borealis the Freezing Fog",
      where: "MotG",
      drops: ["MotG/FR: Dragon Heart - boss drop to SE"],
    },
  ],
  [
    1252520800,
    {
      name: "Fire Giant",
      where: "FP",
      drops: ["FP/FF: Remembrance of the Fire Giant - mainboss drop"],
    },
  ],
  [
    30170800,
    {
      name: "Ancient Hero of Zamor",
      where: "FP/GCHG",
      drops: [
        "FP/(GCHG): Zamor Curved Sword - boss drop",
        "FP/(GCHG): Zamor Mask - boss drop",
        "FP/(GCHG): Zamor Armor - boss drop",
        "FP/(GCHG): Zamor Bracelets - boss drop",
        "FP/(GCHG): Zamor Legwraps - boss drop",
      ],
    },
  ],
  [
    30180800,
    {
      name: "Ulcerated Tree Spirit",
      where: "MotG/GMC",
      drops: [
        "MotG/(GMC): Glovewort Picker's Bell Bearing [2] - boss drop",
        "MotG/(GMC): Golden Seed - boss drop",
      ],
    },
  ],
  [
    31220800,
    {
      name: "Spirit-Caller Snail",
      where: "MotG/SC",
      drops: [
        "MotG/(SC): Godskin Swaddling Cloth - boss drop",
        "MotG/(SC): Black Flame Ritual - boss drop",
      ],
    },
  ],
  [
    13000830,
    {
      name: "Dragonlord Placidusax",
      where: "FA",
      drops: ["FA/BGB: Remembrance of the Dragonlord - alt mainboss drop"],
    },
  ],
  [
    13000800,
    {
      name: "Maliketh, the Black Blade",
      where: "FA",
      drops: ["FA/BGB: Remembrance of the Black Blade - mainboss drop"],
    },
  ],
  [
    13000850,
    {
      name: "Godskin Duo",
      where: "FA",
      drops: [
        "FA/DTT: Smithing-Stone Miner's Bell Bearing [4] - boss drop",
        "FA/DTT: Ash of War: Black Flame Tornado - boss drop",
      ],
    },
  ],
  [
    1248550800,
    {
      name: "Night's Cavalry Duo",
      where: "CS",
      drops: [
        "CS/ICS: Ancient Dragon Smithing Stone - night boss drop, following caravan to SW",
        "CS/ICS: Night's Cavalry Helm - night boss drop, following caravan to SW",
        "CS/ICS: Night's Cavalry Armor - night boss drop, following caravan to SW",
        "CS/ICS: Night's Cavalry Gauntlets - night boss drop, following caravan to SW",
        "CS/ICS: Night's Cavalry Greaves - night boss drop, following caravan to SW",
      ],
    },
  ],
  [
    1048570800,
    {
      name: "Death Rite Bird",
      where: "CS",
      drops: ["CS/AD: Explosive Ghostflame - night boss drop to SE on frozen river"],
    },
  ],
  [
    1050560800,
    {
      name: "Great Wyrm Theodorix",
      where: "CS",
      drops: ["CS/CF: Dragon Heart x3 - boss drop E of CF"],
    },
  ],
  [
    1050570850,
    {
      name: "Putrid Avatar",
      where: "CS",
      drops: [
        "CS/ME: Thorny Cracked Tear - boss drop N of ME",
        "CS/ME: Ruptured Crystal Tear - boss drop N of ME",
      ],
    },
  ],
  [
    30190800,
    {
      name: "Putrid Grave Warden Duelist",
      where: "CS/CSC",
      drops: [
        "CS/(CSC): Rotten Gravekeeper Cloak - boss drop",
        "CS/(CSC): Great Grave Glovewort x2 - boss drop",
      ],
    },
  ],
  [
    30200800,
    {
      name: "Stray Mimic Tear",
      where: "CS/HPH",
      drops: ["CS/(HPH): Blackflame Monk Amon - boss drop"],
    },
  ],
  [
    31120800,
    {
      name: "Misbegotten Crusader",
      where: "CS/CF",
      drops: ["CS/(CF): Golden Order Greatsword - boss drop"],
    },
  ],
  [
    32110800,
    {
      name: "Astel, Stars of Darkness",
      where: "CS/YAT",
      drops: ["CS/(YAT): Meteorite of Astel - boss drop"],
    },
  ],
  [
    12050800,
    {
      name: "Mohg, Lord of Blood",
      where: "MP",
      drops: [
        "MP/(MDM): Mohg's Great Rune - mainboss drop",
        "MP/(MDM): Remembrance of the Blood Lord - mainboss drop",
      ],
    },
  ],
  [
    15000800,
    {
      name: "Malenia, Blade of Miquella",
      where: "EBH",
      drops: [
        "EBH/HR: Malenia's Great Rune - mainboss drop",
        "EBH/HR: Remembrance of the Rot Goddess - mainboss drop",
      ],
    },
  ],
  [
    15000850,
    {
      name: "Loretta, Knight of the Haligtree",
      where: "MH",
      drops: ["MH/HTP: Loretta's War Sickle - boss drop", "MH/HTP: Loretta's Mastery - boss drop"],
    },
  ],
  [
    11050850,
    {
      name: "Sir Gideon Ofnir, the All-Knowing",
      where: "LAC",
      drops: [
        "LAC/LCA: Scepter of the All-Knowing - boss drop",
        "LAC/LCA: All-Knowing Helm - boss drop",
        "LAC/LCA: All-Knowing Armor - boss drop",
        "LAC/LCA: All-Knowing Gauntlets - boss drop",
        "LAC/LCA: All-Knowing Greaves - boss drop",
      ],
    },
  ],
  [
    11050800,
    {
      name: "Hoarah Loux",
      where: "LAC",
      drops: ["LAC/QB: Remembrance of Hoarah Loux - mainboss drop"],
    },
  ],
  [
    19000800,
    { name: "Elden Beast", where: "ET", drops: ["ET: Elden Remembrance - mainboss drop"] },
  ],
  [
    2045440800,
    { name: "Ghostflame Dragon", where: "GP", drops: ["GP/BG: Dragon Heart - boss drop E of BG"] },
  ],
  [
    2046410800,
    {
      name: "Knight of the Solitary Gaol",
      where: "GP",
      drops: [
        "GP/(WNM): Greatsword of Solitude - boss drop",
        "GP/(WNM): Helm of Solitude - boss drop",
        "GP/(WNM): Armor of Solitude - boss drop",
        "GP/(WNM): Gauntlets of Solitude - boss drop",
        "GP/(WNM): Greaves of Solitude - boss drop",
      ],
    },
  ],
  [
    40000800,
    {
      name: "Death Knight",
      where: "GP/FRC",
      drops: [
        "GP/(FRC): Death Knight's Twin Axes - boss drop",
        "GP/(FRC): Crimson Amber Medallion +3 - boss drop",
      ],
    },
  ],
  [
    41000800,
    {
      name: "Demi-Human Swordmaster Onze",
      where: "GP/BG",
      drops: ["GP/(BG): Demi-Human Swordsman Yosh - boss drop"],
    },
  ],
  [
    43010800,
    {
      name: "Ancient Dragon-Man",
      where: "GP/DP",
      drops: ["GP/(DP): Dragon-Hunter's Great Katana - boss drop"],
    },
  ],
  [
    20000800,
    {
      name: "Divine Beast Dancing Lion",
      where: "BTS",
      drops: [
        "BTS/SF: Remembrance of the Dancing Lion - mainboss drop",
        "BTS/BTS: Divine Beast Head - boss drop",
        "BTS/TDB: Revered Spirit Ash - on statue after boss",
        "BTS/TDB: Tower of Shadow Message - at the top of the stairs after boss",
      ],
    },
  ],
  [
    2048440800,
    {
      name: "Rellana, Twin Moon Knight",
      where: "CE",
      drops: ["CE/CLC: Remembrance of the Twin Moon Knight - mainboss drop"],
    },
  ],
  [
    2047450800,
    {
      name: "Black Knight Garrew",
      where: "CE",
      drops: ["CE/(FRF): Black Steel Greatshield - boss drop"],
    },
  ],
  [
    43000800,
    {
      name: "Chief Bloodfiend",
      where: "ER",
      drops: ["ER/(RC): Bloodfiend Hexer's Ashes - boss drop"],
    },
  ],
  [
    2046380800,
    {
      name: "Dancer of Ranah",
      where: "CC",
      drops: [
        "CC/CCW: Dancing Blade of Ranah - boss drop",
        "CC/CCW: Dancer's Hood - boss drop",
        "CC/CCW: Dancer's Dress - boss drop",
        "CC/CCW: Dancer's Bracer - boss drop",
        "CC/CCW: Dancer's Trousers - boss drop",
      ],
    },
  ],
  [
    2046400800,
    {
      name: "Demi-Human Queen Marigga",
      where: "CC",
      drops: ["CC/CCW: Star-Lined Sword - boss drop"],
    },
  ],
  [
    2048380850,
    {
      name: "Ghostflame Dragon",
      where: "CC",
      drops: [
        "CC/CC: Dragon Heart - boss drop",
        "CC/CC: Somber Ancient Dragon Smithing Stone - boss drop",
      ],
    },
  ],
  [
    22000800,
    {
      name: "Putrescent Knight",
      where: "SCF",
      drops: [
        "SCF/FD: Remembrance of Putrescence - mainboss drop",
        "SCF/GDP: St. Trina Disciple's Cookbook [3] - right of St. Trina",
        "SCF/GDP: St. Trina's Smile - Thiollier invader drop, after you die to St. Trina four times and tell him your findings",
        "SCF/GDP: St. Trina's Blossom - on St. Trina's body after EI mainboss",
      ],
    },
  ],
  [
    2049410800,
    {
      name: "Jagged Peak Drake",
      where: "JP/DPT",
      drops: [
        "JP/DPT: Dragon Heart - boss drop to E",
        "JP/DPT: Dragonscale Flesh - boss drop to E",
      ],
    },
  ],
  [
    2052400800,
    {
      name: "Jagged Peak Drake",
      where: "JP/FJP",
      drops: [
        "JP/FJP: Dragon Heart - boss drop to SE",
        "JP/FJP: Dragonscale Flesh - boss drop to SE",
      ],
    },
  ],
  [
    2054390800,
    { name: "Bayle the Dread", where: "JP", drops: ["JP/JPS: Heart of Bayle - mainboss drop"] },
  ],
  [
    2054390850,
    {
      name: "Ancient Dragon Senessax",
      where: "JP",
      drops: [
        "JP/JPM: Ancient Dragon Smithing Stone - boss drop to S",
        "JP/JPM: Somber Ancient Dragon Smithing Stone - boss drop to S",
      ],
    },
  ],
  [
    2047390800,
    {
      name: "Death Rite Bird",
      where: "CHG",
      drops: ["CHG/CHG: Ash of War: Ghostflame Call - boss drop to NW in lake"],
    },
  ],
  [
    41020800,
    { name: "Lamenter", where: "CHG/LG", drops: ["CHG/(LG): Lamenter's Mask - boss drop"] },
  ],
  [
    2049430800,
    {
      name: "Ghostflame Dragon",
      where: "SA",
      drops: [
        "SA/MR: Dragon Heart - boss drop to S",
        "SA/MR: Somber Ancient Dragon Smithing Stone - boss drop to S",
      ],
    },
  ],
  [
    2049430850,
    {
      name: "Black Knight Edreed",
      where: "SA",
      drops: ["SA/FR: Ash of War: Aspects of the Crucible: Wings - boss drop to S inside"],
    },
  ],
  [
    2049450800,
    {
      name: "Ralva the Great Red Bear",
      where: "SA",
      drops: ["SA/HC: Pelt of Ralva - boss drop to N, E before camp, deep woods"],
    },
  ],
  [
    41010800,
    {
      name: "Curseblade Labirith",
      where: "SA/BG",
      drops: ["SA/(BG): Curseblade Meera - boss drop"],
    },
  ],
  [
    2044470800,
    {
      name: "Rugalea the Great Red Bear",
      where: "RB",
      drops: ["RB/RN: Roar of Rugalea - boss drop to NW"],
    },
  ],
  [
    2046450800,
    {
      name: "Red Bear",
      where: "RB",
      drops: [
        "RB/(NNM): Red Bear's Claw - boss drop",
        "RB/(NNM): Iron Rivet Armor - boss drop",
        "RB/(NNM): Iron Rivet Gauntlets - boss drop",
        "RB/(NNM): Iron Rivet Greaves - boss drop",
        "RB/(NNM): Fang Helm - boss drop",
      ],
    },
  ],
  [
    40010800,
    {
      name: "Death Knight",
      where: "RB/SRC",
      drops: [
        "RB/(SRC): Death Knight's Longhaft Axe - boss drop",
        "RB/(SRC): Cerulean Amber Medallion +3 - boss drop",
      ],
    },
  ],
  [
    21010800,
    {
      name: "Base Serpent Messmer",
      where: "SK",
      drops: [
        "SK/DCE: Remembrance of the Impaler - mainboss drop",
        "SK/DCE: Messmer's Kindling - mainboss drop",
      ],
    },
  ],
  [
    21000850,
    {
      name: "Golden Hippopotamus",
      where: "SK",
      drops: [
        "SK/SKMG: Aspects of the Crucible: Thorns - boss drop",
        "SK/SKMG: Scadutree Fragment x2 - boss drop",
      ],
    },
  ],
  [
    2049480800,
    {
      name: "Commander Gaius",
      where: "ScV",
      drops: ["ScV/SKBG: Remembrance of the Wild Boar Rider - mainboss drop"],
    },
  ],
  [
    2050480800,
    {
      name: "Scadutree Avatar",
      where: "SB",
      drops: [
        "SB/TWS: Remembrance of the Shadow Sunflower - mainboss drop",
        "SB/TWS: Miquella's Great Rune - mainboss drop",
      ],
    },
  ],
  [
    2050470800,
    {
      name: "Tree Sentinel",
      where: "HL hill",
      drops: ["HL/HL: Blessing of Marika - boss drop on hill"],
    },
  ],
  [
    2050480860,
    {
      name: "Tree Sentinel",
      where: "HL bridge",
      drops: ["HL/HL: Blessing of Marika - boss drop by bridge"],
    },
  ],
  [
    2052480800,
    {
      name: "Fallingstar Beast",
      where: "HL",
      drops: ["HL/FH: Gravitational Missile - boss drop to NE"],
    },
  ],
  [
    25000800,
    {
      name: "Metyr, Mother of Fingers",
      where: "FRM",
      drops: [
        "FRM: Remembrance of the Mother of Fingers - mainboss drop",
        "SA/(CMM): Maternal Staff - kill invader Ymir",
        "SA/(CMM): High Priest Hat - kill invader Ymir",
        "SA/(CMM): High Priest Robe - kill invader Ymir",
        "SA/(CMM): High Priest Gloves - kill invader Ymir",
        "SA/(CMM): High Priest Undergarments - kill invader Ymir",
      ],
    },
  ],
  [
    2051450800,
    {
      name: "Count Ymir, Mother of Fingers",
      where: "CMM",
      drops: [
        "SA/(CMM): Maternal Staff - kill invader Ymir",
        "SA/(CMM): High Priest Hat - kill invader Ymir",
        "SA/(CMM): High Priest Robe - kill invader Ymir",
        "SA/(CMM): High Priest Gloves - kill invader Ymir",
        "SA/(CMM): High Priest Undergarments - kill invader Ymir",
      ],
    },
  ],
  [
    2051440800,
    {
      name: "Rakshasa",
      where: "RR",
      drops: [
        "RR/(ENM): Rakshasa's Great Katana - boss drop",
        "RR/(ENM): Rakshasa Helm - boss drop",
        "RR/(ENM): Rakshasa Armor - boss drop",
        "RR/(ENM): Rakshasa Gauntlets - boss drop",
        "RR/(ENM): Rakshasa Greaves - boss drop",
      ],
    },
  ],
  [
    2052430800,
    {
      name: "Jori, Elder Inquisitor",
      where: "RR/DC",
      drops: ["RR/(DC): Barbed Staff-Spear - boss drop"],
    },
  ],
  [
    28000800,
    {
      name: "Midra, Lord of Frenzied Flame",
      where: "MM",
      drops: ["MM/SFC: Remembrance of the Lord of Frenzied Flame - mainboss drop"],
    },
  ],
  [
    2044450800,
    {
      name: "Romina, Saint of the Bud",
      where: "ARR",
      drops: ["ARR/CBME: Remembrance of the Saint of the Bud - mainboss drop"],
    },
  ],
  [
    2046460800,
    {
      name: "Divine Beast Dancing Lion",
      where: "ARR",
      drops: ["ARR/ARGS: Divine Beast Tornado - boss drop to NE"],
    },
  ],
  [
    20010800,
    {
      name: "Radahn, Consort of Miquella",
      where: "EI",
      drops: ["EI/DGFS: Remembrance of a God and a Lord - mainboss drop"],
    },
  ],
]);

/** What each boss's defeat drops, by the game's id for the boss, as slot_data's forceBosses names them: the drops a boss moved into its arena guards. */
export const ARENA_DROPS: ReadonlyMap<number, readonly string[]> = new Map<
  number,
  readonly string[]
>([
  [18000850, []],
  [1042360800, ["LG/TFS: Golden Halberd - first field boss"]],
  [1043360800, ["LG/DBR: Dragon Heart - boss drop N of DBR"]],
  [1043370340, ["LG/ALN: Ash of War: Repeating Thrust - night boss drop to SE"]],
  [1044350800, ["LG/(FHE): Bloodhound's Fang - boss drop Evergaol"]],
  [
    1045390800,
    ["LG/(SWV): Deathroot - boss drop", "LG/(SWV): Skeletal Militiaman Ashes - boss drop"],
  ],
  [1044360800, []],
  [1042370800, ["LG/(SE): Aspects of the Crucible: Tail - boss drop Evergaol"]],
  [1042380800, ["LG/WS: Blue-Feathered Branchsword - night boss drop SE of WS"]],
  [1042380850, ["LG/(WS): Bone Peddler's Bell Bearing - night boss drop"]],
  [31000800, []],
  [18000800, ["LG/(FHG): Golden Seed - boss drop", "LG/(FHG): Banished Knight Oleg - boss drop"]],
  [30020800, ["LG/(SC): Noble Sorcerer Ashes - boss drop"]],
  [30040800, ["LG/(MCC): Banished Knight Engvall - boss drop"]],
  [30110800, ["LG/(DC): Assassin's Crimson Dagger - boss drop"]],
  [31030800, ["LG/(GC): Flamedrake Talisman - boss drop"]],
  [31150800, ["LG/(CC): Tailoring Tools - boss drop", "LG/(CC): Sewing Needle - boss drop"]],
  [31170800, ["LG/(HC): Blue Dancer Charm - boss drop"]],
  [32010800, ["LG/(LT): Roar Medallion - boss drop"]],
  [10000850, ["SV/CT: Talisman Pouch - boss drop"]],
  [
    10000800,
    [
      "SV/SeC: Godrick's Great Rune - mainboss drop",
      "SV/SeC: Remembrance of the Grafted - mainboss drop",
    ],
  ],
  [1042330800, ["WP/(WE): Radagon's Scarseal - boss drop Evergaol"]],
  [1043300800, ["WP/(CM): Grafted Blade Greatsword - boss drop"]],
  [
    1043330800,
    ["WP/ME: Opaline Bubbletear - boss drop", "WP/ME: Crimsonburst Crystal Tear - boss drop"],
  ],
  [1044320340, ["WP/CMR: Sacrificial Axe - night boss drop far to SW"]],
  [
    1044320342,
    [
      "WP/CMR: Nightrider Flail - night boss drop to SW",
      "WP/CMR: Ash of War: Barricade Shield - night boss drop to SW",
    ],
  ],
  [30000800, ["WP/(TCC): Lhutel the Headless - boss drop"]],
  [30010800, ["WP/(IC): Demi-Human Ashes - boss drop"]],
  [31010800, ["WP/(EC): Spelldrake Talisman - boss drop"]],
  [31020800, ["WP/(TCV): Viridian Amber Medallion - boss drop"]],
  [32000800, ["WP/(MT): Rusted Anchor - boss drop"]],
  [12080800, ["SR/(HG): Ancestral Follower Ashes - boss drop"]],
  [12020830, ["SR/WW: Dragon Halberd - upper siofra, boss drop"]],
  [12020850, ["NR/NEC: Silver Tear Mask - boss drop", "NR/NEC: Larval Tear x2 - boss drop"]],
  [
    12020800,
    ["NR/(SA): Gargoyle's Greatsword - boss drop", "NR/(SA): Gargoyle's Twinblade - boss drop"],
  ],
  [12090800, ["NR/(HG): Remembrance of the Regal Ancestor - boss drop"]],
  [12030390, ["DD/TNEC: Siluria's Tree - boss drop way to W by tree stump"]],
  [12030800, ["DD/AR: Fia's Mist - boss drop"]],
  [12030850, []],
  [
    1033430800,
    [
      "LL/MEW: Cerulean Crystal Tear - boss drop, Minor Erdtree W",
      "LL/MEW: Ruptured Crystal Tear - boss drop, Minor Erdtree W",
    ],
  ],
  [1033450800, ["LL/(CE): Greatblade Phalanx - boss drop Evergaol"]],
  [1034450800, ["LL/TQ: Dragon Heart - boss drop to N"]],
  [1035420800, ["LL/(VA): Crucible Knot Talisman - boss drop"]],
  [
    1035500800,
    ["LL/(CM): Loretta's Greatbow - boss drop", "LL/(CM): Ash of War: Loretta's Slash - boss drop"],
  ],
  [1036450340, ["LL/GTN: Ancient Death Rancor - night boss drop to S"]],
  [1037420340, ["LL/SeI: Red-Feathered Branchsword - night boss drop to NE"]],
  [1037460800, ["LL/(CV): Meat Peddler's Bell Bearing - night boss drop"]],
  [1038410800, ["LL/(ME): Flame of the Fell God - boss drop Evergaol"]],
  [1036480340, ["LL/GTB: Ash of War: Ice Spear - night boss drop to SE"]],
  [
    1039440800,
    ["LL/AS: Deathroot - boss drop SE of AS", "LL/AS: Skeletal Bandit Ashes - boss drop SE of AS"],
  ],
  [
    1039430340,
    [
      "LL/BC: Nightrider Glaive - night boss drop S of BC",
      "LL/BC: Ash of War: Giant Hunt - night boss drop S of BC",
    ],
  ],
  [
    1038480800,
    [
      "LL/MEE: Magic-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
      "LL/MEE: Lightning-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
      "LL/MEE: Holy-Shrouding Cracked Tear - boss drop, Minor Erdtree E",
    ],
  ],
  [1036500800, ["LL/(RGE): Meteorite - boss drop Evergaol"]],
  [
    1034480800,
    ["LL/(KR): Frozen Needle - in chest E side of ruins underground behind illusory floor"],
  ],
  [31060800, ["LL/(ACC): Crystal Release - boss drop"]],
  [30030800, ["LL/(REC): Glintstone Sorcerer Ashes - boss drop"]],
  [30050800, ["LL/(BKC): Twinsage Sorcerer Ashes - boss drop"]],
  [
    30050850,
    [
      "LL/(BKC): Assassin's Cerulean Dagger - alt boss drop",
      "LL/(BKC): Black Knifeprint - alt boss drop",
    ],
  ],
  [30060800, ["LL/(CC): Kaiden Sellsword Ashes - boss drop"]],
  [31040800, ["LL/(SC): Winged Sword Insignia - boss drop"]],
  [31050800, ["LL/(LCC): Cerulean Amber Medallion - boss drop"]],
  [32020800, ["LL/(RLCT): Smithing-Stone Miner's Bell Bearing [1] - boss drop"]],
  [
    39200800,
    ["RSP/RSPO: Magma Wyrm's Scalesword - boss drop", "RSP/RSPO: Dragon Heart - boss drop"],
  ],
  [
    10010800,
    [
      "LL/(TFB/CA): Ornamental Straight Sword - boss drop",
      "LL/(TFB/CA): Golden Beast Crest Shield - boss drop",
    ],
  ],
  [12010800, ["AR/ARD: Frozen Lightning Spear - boss drop"]],
  [12010850, ["LR/LRS: Dragonscale Blade - boss drop"]],
  [12040800, ["LR: Remembrance of the Naturalborn - mainboss drop"]],
  [1033420800, ["MA/(RE): Black Knife Tiche - boss drop Evergaol"]],
  [
    1034420800,
    ["MA/MA: Adula's Moonblade - boss drop to NE", "MA/MA: Dragon Heart x3 - boss drop to NE"],
  ],
  [14000850, ["RLA/SC: Memory Stone - boss drop"]],
  [14000801, []],
  [
    14000800,
    [
      "RLA/DB: Great Rune of the Unborn - mainboss drop",
      "RLA/DB: Remembrance of the Full Moon Queen - mainboss drop",
    ],
  ],
  [
    1047400800,
    [
      "CL/MEW: Greenburst Crystal Tear - boss drop",
      "CL/MEW: Flame-Shrouding Cracked Tear - boss drop",
    ],
  ],
  [1048370800, ["CL/CHS: Dragon Heart - boss drop to SE"]],
  [1048400800, ["CL/(CR): Visage Shield - in chest after boss"]],
  [1049370800, ["CL/SASB: Ash of War: Poison Moth Flight - night boss drop to SW"]],
  [1049370850, ["CL/SASB: Death's Poker - night boss drop to SE"]],
  [
    1049380800,
    [
      "CL/IA: Commander's Standard - boss drop to SE",
      "CL/IA: Unalloyed Gold Needle (Broken) - boss drop to SE",
    ],
  ],
  [1049390800, ["CL/(STS): Nox Flowing Sword - boss drop"]],
  [30140800, ["CL/(MEC): Mad Pumpkin Head Ashes - boss drop"]],
  [30150800, ["CL/(CCC): Kindred of Rot Ashes - boss drop"]],
  [30160800, ["CL/(WDC): Golden Seed - boss drop", "CL/(WDC): Redmane Knight Ogha - boss drop"]],
  [31200800, ["CL/(AC): Gold Scarab - boss drop"]],
  [31210800, ["CL/(GC): Putrid Corpse Ashes - boss drop"]],
  [32070800, ["CL/(GT): Moonveil - boss drop", "CL/(GT): Dragon Heart - boss drop"]],
  [
    32080800,
    [
      "CL/(SCT): Gravity Stone Chunk x10 - boss drop",
      "CL/(SCT): Somberstone Miner's Bell Bearing [1] - boss drop",
      "CL/(SCT): Smithing Stone [7] x5 - boss drop",
      "CL/(SCT): Somber Smithing Stone [6] - boss drop",
    ],
  ],
  [1051360800, ["CL/(RC): Ruins Greatsword - boss drop"]],
  [
    1052380800,
    [
      "CL/(WD): Radahn's Great Rune - mainboss drop",
      "CL/(WD): Remembrance of the Starscourge - mainboss drop",
    ],
  ],
  [1048410800, ["DB/(IMS): Gravity Stone Peddler's Bell Bearing - night boss drop"]],
  [1049390850, ["DB/(SE): Battlemage Hugues - Sellia Evergaol"]],
  [
    1051400800,
    ["DB/MEE: Opaline Hardtear - boss drop", "DB/MEE: Stonebarb Cracked Tear - boss drop"],
  ],
  [
    1051430800,
    [
      "DB/BS: Gargoyle's Blackblade - boss drop SE of BS",
      "DB/BS: Gargoyle's Black Halberd - boss drop SE of BS",
    ],
  ],
  [1052410800, ["DB/FG: Dragon Heart - boss drop to S"]],
  [1052410850, ["DB/LR: Ash of War: Bloodhound's Step - night boss drop N of LR"]],
  [31100800, ["DB/(DC): Flamedrake Talisman +2 - boss drop"]],
  [31110800, ["DB/(SH): Crystal Torrent - boss drop"]],
  [
    34130800,
    [
      "DB/(DT): Godskin Apostle Hood - boss drop",
      "DB/(DT): Godskin Apostle Robe - boss drop",
      "DB/(DT): Godskin Apostle Bracelets - boss drop",
      "DB/(DT): Godskin Apostle Trousers - boss drop",
    ],
  ],
  [1038510800, ["AP/LR: Ritual Sword Talisman - in chest after boss underground"]],
  [1041520800, ["AP/RP: Lansseax's Glaive - boss drop up hill to SW or NE of AC grace"]],
  [1038520340, ["AP/WhR: Deathroot - boss drop", "AP/WhR: Tibia's Summons - boss drop"]],
  [1039500800, ["AP/GLE: Godfrey Icon - boss drop Evergaol"]],
  [1039510800, ["AP/AHJ: Ash of War: Shared Order - night boss drop to SW"]],
  [
    1039540800,
    ["TSC/SCIG: Marais Executioner's Sword - boss drop", "TSC/SCIG: Briar Greatshield - boss drop"],
  ],
  [1040520800, ["AP/SHG: Black Knife - boss drop guarding SHG"]],
  [1040530800, ["AP/(WbR): Bloody Helice - in chest after boss underground"]],
  [
    1041500800,
    [
      "AP/AHJ: Gravity Stone Chunk x10 - boss drop S of great stairs in meteor crater",
      "AP/AHJ: Smithing Stone [6] x5 - boss drop S of great stairs in meteor crater",
      "AP/AHJ: Somber Smithing Stone [5] - boss drop S of great stairs in meteor crater",
    ],
  ],
  [
    1041510800,
    [
      "AP/AHJ: Erdtree Greatshield - boss drop duo to E top of great stairs",
      "AP/AHJ: Hero's Rune [1] - boss drop duo to E top of great stairs",
    ],
  ],
  [
    1041530800,
    [
      "AP/ME: Crimsonspill Crystal Tear - boss drop, Minor Erdtree",
      "AP/ME: Speckled Hardtear - boss drop, Minor Erdtree",
    ],
  ],
  [
    1042550800,
    ["AP/(DWV): Godskin Peeler - boss drop", "AP/(DWV): Scouring Black Flame - boss drop"],
  ],
  [30080800, ["AP/(SHG): Ancient Dragon Knight Kristoff - boss drop"]],
  [30120800, ["AP/(UC): Perfumer Tricia - boss drop"]],
  [31180800, ["AP/(PG): Great Omenkiller Cleaver - boss drop"]],
  [31190800, ["AP/(SCV): Concealing Veil - boss drop"]],
  [31190850, ["AP/(SCV): Family Heads - hidden boss drop"]],
  [32040800, ["AP/(OAT): Great Club - boss drop"]],
  [32050800, ["AP/(AT): Somberstone Miner's Bell Bearing [2] - boss drop"]],
  [1044530800, ["CO/HMS: Twinbird Kite Shield - night boss drop to NE in block flower field"]],
  [1043530800, ["CO/(HMS): Medicine Peddler's Bell Bearing - night boss drop"]],
  [1045520800, []],
  [
    30100800,
    [
      "CO/(AHG): Ordovis's Greatsword - boss drop",
      "CO/(AHG): Crucible Axe Helm - boss drop",
      "CO/(AHG): Crucible Axe Armor - boss drop",
      "CO/(AHG): Crucible Gauntlets - boss drop",
      "CO/(AHG): Crucible Greaves - boss drop",
    ],
  ],
  [30130800, ["CO/(AST): Soldjars of Fortune Ashes - boss drop"]],
  [34120800, ["CO/(ST): Onyx Lord's Greatsword - boss drop"]],
  [1035530800, ["MtG/FL: Dragon Heart - boss drop S of FL in magma lake"]],
  [
    1036540800,
    [
      "MtG/NMGC: Fallingstar Beast Jaw - boss drop",
      "MtG/NMGC: Smithing Stone [6] x5 - boss drop",
      "MtG/NMGC: Somber Smithing Stone [6] - boss drop",
    ],
  ],
  [1037530800, ["MtG/PSA: Memory Stone - boss drop to S"]],
  [
    1037540810,
    [
      "MtG/ME: Leaden Hardtear - boss drop, Minor Erdtree",
      "MtG/ME: Cerulean Hidden Tear - boss drop, Minor Erdtree",
    ],
  ],
  [30070800, ["MtG/(WC): Glovewort Picker's Bell Bearing [1] - boss drop"]],
  [30090800, ["MtG/(GHG): Bloodhound Knight Floh - boss drop"]],
  [31070800, ["MtG/(SC): Kindred of Rot's Exultation - boss drop"]],
  [31090800, ["MtG/(VC): Jar Cannon - boss drop"]],
  [16000801, []],
  [
    16000800,
    [
      "VM/AP: Rykard's Great Rune - mainboss drop",
      "VM/AP: Remembrance of the Blasphemous - mainboss drop",
    ],
  ],
  [16000860, ["(VM)/SIC: Inquisitor's Girandole - boss drop, from RLA warp"]],
  [16000850, ["VM/GH: Godskin Stitcher - boss drop", "VM/GH: Noble Presence - boss drop"]],
  [11000850, ["LRC/WCR: Talisman Pouch - mainboss drop"]],
  [
    11000800,
    [
      "LRC/QB: Morgott's Great Rune - mainboss drop",
      "LRC/QB: Remembrance of the Omen King - mainboss drop",
    ],
  ],
  [35000800, ["SSG/FD: Bloodflame Talons - boss drop"]],
  [35000850, ["SSG/(LC): Lord of Blood's Exultation - boss drop"]],
  [34140850, ["DTEA: Omenkiller Rollo - boss drop on way to divine tower"]],
  [1048510800, ["FL/FL: Ash of War: Phantom Slash - night boss drop to E"]],
  [
    1049520800,
    [
      "FL/GLR: Gargoyle's Black Blades - boss drop to S",
      "FL/GLR: Gargoyle's Black Axe - boss drop to S",
    ],
  ],
  [1050570800, ["MotG/CSMG: Death Ritual Spear - boss drop to W by statue"]],
  [
    1051570800,
    [
      "MotG/(CS): Veteran's Prosthesis - mainboss drop",
      "MotG/(CS): Haligtree Secret Medallion (Left) - after boss",
    ],
  ],
  [
    1052560800,
    ["MotG/(ME): Cerulean Crystal Tear - boss drop", "MotG/(ME): Crimson Bubbletear - boss drop"],
  ],
  [
    1053560800,
    [
      "MotG/(LCE): Fingerprint Helm - boss drop Evergaol",
      "MotG/(LCE): Fingerprint Armor - boss drop Evergaol",
      "MotG/(LCE): Fingerprint Gauntlets - boss drop Evergaol",
      "MotG/(LCE): Fingerprint Greaves - boss drop Evergaol",
      "MotG/(LCE): Vyke's Dragonbolt - boss drop Evergaol",
    ],
  ],
  [1054560800, ["MotG/FR: Dragon Heart - boss drop to SE"]],
  [1052520801, []],
  [1052520800, ["FP/FF: Remembrance of the Fire Giant - mainboss drop"]],
  [
    30170800,
    [
      "FP/(GCHG): Zamor Curved Sword - boss drop",
      "FP/(GCHG): Zamor Mask - boss drop",
      "FP/(GCHG): Zamor Armor - boss drop",
      "FP/(GCHG): Zamor Bracelets - boss drop",
      "FP/(GCHG): Zamor Legwraps - boss drop",
    ],
  ],
  [
    30180800,
    [
      "MotG/(GMC): Glovewort Picker's Bell Bearing [2] - boss drop",
      "MotG/(GMC): Golden Seed - boss drop",
    ],
  ],
  [
    31220800,
    ["MotG/(SC): Godskin Swaddling Cloth - boss drop", "MotG/(SC): Black Flame Ritual - boss drop"],
  ],
  [13000830, ["FA/BGB: Remembrance of the Dragonlord - alt mainboss drop"]],
  [13000801, []],
  [13000800, ["FA/BGB: Remembrance of the Black Blade - mainboss drop"]],
  [
    13000850,
    [
      "FA/DTT: Smithing-Stone Miner's Bell Bearing [4] - boss drop",
      "FA/DTT: Ash of War: Black Flame Tornado - boss drop",
    ],
  ],
  [
    1248550800,
    [
      "CS/ICS: Ancient Dragon Smithing Stone - night boss drop, following caravan to SW",
      "CS/ICS: Night's Cavalry Helm - night boss drop, following caravan to SW",
      "CS/ICS: Night's Cavalry Armor - night boss drop, following caravan to SW",
      "CS/ICS: Night's Cavalry Gauntlets - night boss drop, following caravan to SW",
      "CS/ICS: Night's Cavalry Greaves - night boss drop, following caravan to SW",
    ],
  ],
  [1048570800, ["CS/AD: Explosive Ghostflame - night boss drop to SE on frozen river"]],
  [1050560800, ["CS/CF: Dragon Heart x3 - boss drop E of CF"]],
  [
    1050570850,
    [
      "CS/ME: Thorny Cracked Tear - boss drop N of ME",
      "CS/ME: Ruptured Crystal Tear - boss drop N of ME",
    ],
  ],
  [
    30190800,
    [
      "CS/(CSC): Rotten Gravekeeper Cloak - boss drop",
      "CS/(CSC): Great Grave Glovewort x2 - boss drop",
    ],
  ],
  [30200800, ["CS/(HPH): Blackflame Monk Amon - boss drop"]],
  [31120800, ["CS/(CF): Golden Order Greatsword - boss drop"]],
  [32110800, ["CS/(YAT): Meteorite of Astel - boss drop"]],
  [
    12050800,
    [
      "MP/(MDM): Mohg's Great Rune - mainboss drop",
      "MP/(MDM): Remembrance of the Blood Lord - mainboss drop",
    ],
  ],
  [
    15000800,
    [
      "EBH/HR: Malenia's Great Rune - mainboss drop",
      "EBH/HR: Remembrance of the Rot Goddess - mainboss drop",
    ],
  ],
  [15000850, ["MH/HTP: Loretta's War Sickle - boss drop", "MH/HTP: Loretta's Mastery - boss drop"]],
  [
    11050850,
    [
      "LAC/LCA: Scepter of the All-Knowing - boss drop",
      "LAC/LCA: All-Knowing Helm - boss drop",
      "LAC/LCA: All-Knowing Armor - boss drop",
      "LAC/LCA: All-Knowing Gauntlets - boss drop",
      "LAC/LCA: All-Knowing Greaves - boss drop",
    ],
  ],
  [11050801, []],
  [11050800, ["LAC/QB: Remembrance of Hoarah Loux - mainboss drop"]],
  [19000810, []],
  [19000800, ["ET: Elden Remembrance - mainboss drop"]],
  [2045440800, ["GP/BG: Dragon Heart - boss drop E of BG"]],
  [
    2046410800,
    [
      "GP/(WNM): Greatsword of Solitude - boss drop",
      "GP/(WNM): Helm of Solitude - boss drop",
      "GP/(WNM): Armor of Solitude - boss drop",
      "GP/(WNM): Gauntlets of Solitude - boss drop",
      "GP/(WNM): Greaves of Solitude - boss drop",
    ],
  ],
  [
    40000800,
    [
      "GP/(FRC): Death Knight's Twin Axes - boss drop",
      "GP/(FRC): Crimson Amber Medallion +3 - boss drop",
    ],
  ],
  [41000800, ["GP/(BG): Demi-Human Swordsman Yosh - boss drop"]],
  [43010800, ["GP/(DP): Dragon-Hunter's Great Katana - boss drop"]],
  [
    20000800,
    [
      "BTS/SF: Remembrance of the Dancing Lion - mainboss drop",
      "BTS/BTS: Divine Beast Head - boss drop",
      "BTS/TDB: Revered Spirit Ash - on statue after boss",
      "BTS/TDB: Tower of Shadow Message - at the top of the stairs after boss",
    ],
  ],
  [2048440800, ["CE/CLC: Remembrance of the Twin Moon Knight - mainboss drop"]],
  [2047450800, ["CE/(FRF): Black Steel Greatshield - boss drop"]],
  [43000800, ["ER/(RC): Bloodfiend Hexer's Ashes - boss drop"]],
  [
    2046380800,
    [
      "CC/CCW: Dancing Blade of Ranah - boss drop",
      "CC/CCW: Dancer's Hood - boss drop",
      "CC/CCW: Dancer's Dress - boss drop",
      "CC/CCW: Dancer's Bracer - boss drop",
      "CC/CCW: Dancer's Trousers - boss drop",
    ],
  ],
  [2046400800, ["CC/CCW: Star-Lined Sword - boss drop"]],
  [
    2048380850,
    ["CC/CC: Dragon Heart - boss drop", "CC/CC: Somber Ancient Dragon Smithing Stone - boss drop"],
  ],
  [
    22000800,
    [
      "SCF/FD: Remembrance of Putrescence - mainboss drop",
      "SCF/GDP: St. Trina Disciple's Cookbook [3] - right of St. Trina",
      "SCF/GDP: St. Trina's Smile - Thiollier invader drop, after you die to St. Trina four times and tell him your findings",
      "SCF/GDP: St. Trina's Blossom - on St. Trina's body after EI mainboss",
    ],
  ],
  [
    2049410800,
    ["JP/DPT: Dragon Heart - boss drop to E", "JP/DPT: Dragonscale Flesh - boss drop to E"],
  ],
  [
    2052400800,
    ["JP/FJP: Dragon Heart - boss drop to SE", "JP/FJP: Dragonscale Flesh - boss drop to SE"],
  ],
  [2054390800, ["JP/JPS: Heart of Bayle - mainboss drop"]],
  [
    2054390850,
    [
      "JP/JPM: Ancient Dragon Smithing Stone - boss drop to S",
      "JP/JPM: Somber Ancient Dragon Smithing Stone - boss drop to S",
    ],
  ],
  [2047390800, ["CHG/CHG: Ash of War: Ghostflame Call - boss drop to NW in lake"]],
  [41020800, ["CHG/(LG): Lamenter's Mask - boss drop"]],
  [2049440710, []],
  [
    2049430800,
    [
      "SA/MR: Dragon Heart - boss drop to S",
      "SA/MR: Somber Ancient Dragon Smithing Stone - boss drop to S",
    ],
  ],
  [2049430850, ["SA/FR: Ash of War: Aspects of the Crucible: Wings - boss drop to S inside"]],
  [2049450800, ["SA/HC: Pelt of Ralva - boss drop to N, E before camp, deep woods"]],
  [41010800, ["SA/(BG): Curseblade Meera - boss drop"]],
  [2044470800, ["RB/RN: Roar of Rugalea - boss drop to NW"]],
  [
    2046450800,
    [
      "RB/(NNM): Red Bear's Claw - boss drop",
      "RB/(NNM): Iron Rivet Armor - boss drop",
      "RB/(NNM): Iron Rivet Gauntlets - boss drop",
      "RB/(NNM): Iron Rivet Greaves - boss drop",
      "RB/(NNM): Fang Helm - boss drop",
    ],
  ],
  [
    40010800,
    [
      "RB/(SRC): Death Knight's Longhaft Axe - boss drop",
      "RB/(SRC): Cerulean Amber Medallion +3 - boss drop",
    ],
  ],
  [21010801, []],
  [
    21010800,
    [
      "SK/DCE: Remembrance of the Impaler - mainboss drop",
      "SK/DCE: Messmer's Kindling - mainboss drop",
    ],
  ],
  [
    21000850,
    [
      "SK/SKMG: Aspects of the Crucible: Thorns - boss drop",
      "SK/SKMG: Scadutree Fragment x2 - boss drop",
    ],
  ],
  [2049480800, ["ScV/SKBG: Remembrance of the Wild Boar Rider - mainboss drop"]],
  [
    2050480800,
    [
      "SB/TWS: Remembrance of the Shadow Sunflower - mainboss drop",
      "SB/TWS: Miquella's Great Rune - mainboss drop",
    ],
  ],
  [2050470800, ["HL/HL: Blessing of Marika - boss drop on hill"]],
  [2050480860, ["HL/HL: Blessing of Marika - boss drop by bridge"]],
  [2052480800, ["HL/FH: Gravitational Missile - boss drop to NE"]],
  [
    25000800,
    [
      "FRM: Remembrance of the Mother of Fingers - mainboss drop",
      "SA/(CMM): Maternal Staff - kill invader Ymir",
      "SA/(CMM): High Priest Hat - kill invader Ymir",
      "SA/(CMM): High Priest Robe - kill invader Ymir",
      "SA/(CMM): High Priest Gloves - kill invader Ymir",
      "SA/(CMM): High Priest Undergarments - kill invader Ymir",
    ],
  ],
  [
    2051450720,
    [
      "SA/(CMM): Maternal Staff - kill invader Ymir",
      "SA/(CMM): High Priest Hat - kill invader Ymir",
      "SA/(CMM): High Priest Robe - kill invader Ymir",
      "SA/(CMM): High Priest Gloves - kill invader Ymir",
      "SA/(CMM): High Priest Undergarments - kill invader Ymir",
    ],
  ],
  [
    2051440800,
    [
      "RR/(ENM): Rakshasa's Great Katana - boss drop",
      "RR/(ENM): Rakshasa Helm - boss drop",
      "RR/(ENM): Rakshasa Armor - boss drop",
      "RR/(ENM): Rakshasa Gauntlets - boss drop",
      "RR/(ENM): Rakshasa Greaves - boss drop",
    ],
  ],
  [2052430800, ["RR/(DC): Barbed Staff-Spear - boss drop"]],
  [28000800, ["MM/SFC: Remembrance of the Lord of Frenzied Flame - mainboss drop"]],
  [2044450800, ["ARR/CBME: Remembrance of the Saint of the Bud - mainboss drop"]],
  [2046460800, ["ARR/ARGS: Divine Beast Tornado - boss drop to NE"]],
  [20010801, []],
  [20010800, ["EI/DGFS: Remembrance of a God and a Lord - mainboss drop"]],
]);

/** The game's id for Rykard, Lord of Blasphemy, before enemy rando moves him. */
export const RYKARD_ID = 16000800;

/** The game's id for the God-Devouring Serpent, before enemy rando moves it. */
export const SERPENT_ID = 16000801;
