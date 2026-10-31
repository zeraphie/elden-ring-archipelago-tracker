import { describe, expect, test } from "bun:test";
import { PRESETS } from "../../../fixtures/presets.js";
import {
  all,
  any,
  area,
  count,
  item,
  location,
  needsFor,
  opens,
  rulesOf,
  type Options,
} from "../../../fixtures/rooms.js";

const IZZY: Options = PRESETS["Early legacy dungeons"];
const DEFAULT: Options = PRESETS.Default;
// Izzy's way to Altus: region lock, with early legacy dungeons on.
const TO_ALTUS = [
  "Rusty Key",
  "Liurnia Lock",
  "Academy Glintstone Key",
  "Dectus Medallion (Left)",
  "Dectus Medallion (Right)",
];
const RADAHN = "CL/(WD): Remembrance of the Starscourge - mainboss drop";

describe("the base game's rules, on Izzy's preset", () => {
  // Each row: a region, and every item that opens the way to it, from the
  // research's unlock table (region lock, soft logic, early legacy dungeons).
  const ROWS: [string, string[]][] = [
    ["Stormveil Castle", ["Rusty Key"]],
    ["Weeping Peninsula", ["Weeping Lock"]],
    ["Liurnia of The Lakes", ["Liurnia Lock", "Rusty Key"]],
    ["Raya Lucaria Academy", ["Liurnia Lock", "Rusty Key", "Academy Glintstone Key"]],
    ["Altus Plateau", TO_ALTUS],
    ["Capital Outskirts", TO_ALTUS],
    ["Leyndell, Royal Capital", [...TO_ALTUS, "Godrick's Great Rune", "Rykard's Great Rune"]],
    ["Caelid", [...TO_ALTUS, "Caelid Lock"]],
    ["Siofra River", ["Siofra Lock"]],
    ["Nokron, Eternal City Start", ["Siofra Lock", ...TO_ALTUS, "Caelid Lock"]],
    ["Deeproot Depths", ["Siofra Lock", ...TO_ALTUS, "Caelid Lock", "Deeproot Lock"]],
    ["Lake of Rot", ["Siofra Lock", ...TO_ALTUS, "Caelid Lock", "Deeproot Lock", "Ainsel Lock"]],
    [
      "Moonlight Altar",
      ["Siofra Lock", ...TO_ALTUS, "Caelid Lock", "Deeproot Lock", "Ainsel Lock", "Dark Moon Ring"],
    ],
    ["Ainsel River", ["Liurnia Lock", "Rusty Key", "Ainsel Lock"]],
    ["Mt. Gelmir", [...TO_ALTUS, "Mt. Gelmir Lock"]],
    [
      "Subterranean Shunning-Grounds",
      [...TO_ALTUS, "Godrick's Great Rune", "Rykard's Great Rune", "Sewer Lock"],
    ],
  ];

  test.each(ROWS)(
    "%s opens with what the unlock table names, and not without any of it",
    (region, keys) => {
      expect(opens(region, IZZY, ...keys)).toBe(true);
      for (const missing of keys) {
        expect(opens(region, IZZY, ...keys.filter((key) => key !== missing))).toBe(false);
      }
    }
  );

  test("Stormveil Castle waits for the Rusty Key past Stormveil's gate", () => {
    expect(opens("Stormveil Start", IZZY)).toBe(true);
    expect(needsFor("Stormveil Castle", IZZY)).toEqual(item("Rusty Key"));
  });

  test("Caelid's lock, Altus and the Rusty Key must all hold", () => {
    expect(needsFor("Caelid", IZZY, "Caelid Lock")).toEqual(
      all(area("Altus Plateau"), item("Rusty Key"))
    );
    expect(needsFor("Caelid", IZZY, ...TO_ALTUS)).toEqual(item("Caelid Lock"));
  });

  test("Leyndell takes two great runes, counted", () => {
    expect(needsFor("Leyndell, Royal Capital", IZZY, "Godrick's Great Rune")).toEqual(
      count("Great Runes", 1, 2)
    );
  });

  test("the Mountaintops take the Rold Medallion, and the Snowfield it too under soft logic", () => {
    expect(needsFor("Mountaintops of the Giants", IZZY)).toEqual(item("Rold Medallion"));
    expect(needsFor("Hidden Path to the Haligtree", IZZY)).toEqual(
      all(item("Haligtree Secret Medallion (Left)"), item("Haligtree Secret Medallion (Right)"))
    );
    expect(needsFor("Consecrated Snowfield", IZZY)).toEqual(item("Rold Medallion"));
    expect(needsFor("Consecrated Snowfield", { ...IZZY, soft_logic: 0 })).toBeUndefined();
  });

  test("the Erdtree takes no great runes", () => {
    expect(rulesOf(IZZY).entrances.has("Erdtree")).toBe(false);
  });

  test("Altus's imp statues take 25 keys and Caelid's 28, each counting those before it", () => {
    expect(needsFor("Old Altus Tunnel", IZZY, ...TO_ALTUS)).toEqual(
      count("Stonesword Keys in logic", 0, 25)
    );
    expect(needsFor("Gaol Cave", IZZY, ...TO_ALTUS, "Caelid Lock")).toEqual(
      count("Stonesword Keys in logic", 0, 28)
    );
  });

  test("a side dungeon behind an imp statue takes Stonesword Keys, an x3 counting for three", () => {
    expect(needsFor("Fringefolk Hero's Grave", IZZY, ["Stonesword Key", 2])).toEqual(
      count("Stonesword Keys in logic", 2, 3)
    );
    expect(opens("Fringefolk Hero's Grave", IZZY, "Stonesword Key x3")).toBe(true);
  });

  test("Nokron waits for Radahn's remembrance", () => {
    expect(needsFor("Nokron, Eternal City Start", IZZY, "Siofra Lock")).toEqual(location(RADAHN));
  });

  test("Volcano Manor opens with the Drawing-Room Key, or from Raya Lucaria's side", () => {
    // Without early legacy dungeons, Altus doesn't need Raya Lucaria's key.
    const later: Options = { ...IZZY, early_legacy_dungeons: 0 };
    const toManor = ["Liurnia Lock", "Dectus Medallion (Left)", "Dectus Medallion (Right)"];
    toManor.push("Mt. Gelmir Lock", "Volcano Lock");
    expect(opens("Volcano Manor", later, ...toManor)).toBe(false);
    expect(opens("Volcano Manor", later, ...toManor, "Drawing-Room Key")).toBe(true);
    expect(opens("Volcano Manor", later, ...toManor, "Academy Glintstone Key")).toBe(true);
  });

  test("the key items on Liurnia's doors, and Deeproot's upper part, need what the apworld says", () => {
    expect(needsFor("Raya Lucaria Academy", IZZY)).toEqual(item("Academy Glintstone Key"));
    expect(needsFor("Carian Study Hall (Inverted)", IZZY)).toEqual(item("Carian Inverted Statue"));
    expect(needsFor("Moonlight Altar", IZZY)).toEqual(item("Dark Moon Ring"));
    expect(needsFor("Deeproot Depths Upper", IZZY, "Deeproot Lock")).toEqual(
      area("Frenzied Flame Proscription")
    );
  });
});

describe("the base game's rules, on other presets and options", () => {
  test("Great Rune Hunt's Leyndell takes three great runes", () => {
    const runeHunt: Options = PRESETS["Great Rune Hunt"];
    expect(needsFor("Leyndell, Royal Capital", runeHunt, "Godrick's Great Rune")).toEqual(
      count("Great Runes", 1, 3)
    );
  });

  test("[Long]'s Mountaintops take four great runes in place of the medallion, and its Erdtree seven", () => {
    const long: Options = PRESETS["[Long]"];
    expect(needsFor("Mountaintops of the Giants", long, "Rold Medallion")).toEqual(
      count("Great Runes", 0, 4)
    );
    expect(needsFor("Erdtree", long)).toEqual(count("Great Runes", 0, 7));
  });

  test("Default's side dungeons take their region's master key, not Stonesword Keys", () => {
    expect(needsFor("Fringefolk Hero's Grave", DEFAULT, ["Stonesword Key x5", 9])).toEqual(
      item("Limgrave Master Key")
    );
  });

  test("with a single master key, it opens every side dungeon", () => {
    expect(needsFor("Gaol Cave", { ...IZZY, use_master_key: 2 })).toEqual(
      item("Stonesword Master Key")
    );
  });

  test("a Rusty Key split into shards takes enough of them, and the key itself doesn't count", () => {
    const shards: Options = { ...IZZY, key_item_shards: { RustyKeyShards: { Req: 3, Max: 5 } } };
    expect(needsFor("Stormveil Castle", shards, "Rusty Key", ["Rusty Key Shard", 2])).toEqual(
      count("Rusty Key Shards", 2, 3)
    );
    expect(opens("Stormveil Castle", shards, ["Rusty Key Shard", 3])).toBe(true);
  });

  test("a key with one shard at most isn't split", () => {
    const oneShard: Options = { ...IZZY, key_item_shards: { RustyKeyShards: { Req: 1, Max: 1 } } };
    expect(needsFor("Stormveil Castle", oneShard)).toEqual(item("Rusty Key"));
  });
});

describe("the option rules", () => {
  test("early legacy dungeons hold Liurnia and Caelid for the Rusty Key and Altus for the Academy key", () => {
    expect(needsFor("Liurnia of The Lakes", IZZY, "Liurnia Lock")).toEqual(item("Rusty Key"));
    const dectus = ["Dectus Medallion (Left)", "Dectus Medallion (Right)"];
    expect(needsFor("Altus Plateau", IZZY, "Rusty Key", "Liurnia Lock", ...dectus)).toEqual(
      item("Academy Glintstone Key")
    );
    const off: Options = { ...IZZY, early_legacy_dungeons: 0 };
    expect(needsFor("Liurnia of The Lakes", off, "Liurnia Lock")).toBeUndefined();
    expect(needsFor("Altus Plateau", off, "Liurnia Lock", ...dectus)).toBeUndefined();
  });

  test("progression bell bearings hold each area for the bearings found before it", () => {
    const dectus = ["Liurnia Lock", "Dectus Medallion (Left)", "Dectus Medallion (Right)"];
    expect(needsFor("Altus Plateau", DEFAULT, ...dectus)).toEqual(
      item("Smithing-Stone Miner's Bell Bearing [1]")
    );
    expect(
      needsFor("Capital Outskirts", DEFAULT, "Smithing-Stone Miner's Bell Bearing [1]")
    ).toEqual(
      all(
        item("Smithing-Stone Miner's Bell Bearing [2]"),
        all(
          item("Somberstone Miner's Bell Bearing [1]"),
          item("Somberstone Miner's Bell Bearing [2]")
        )
      )
    );
    expect(
      needsFor(
        "Leyndell, Ashen Capital",
        { ...DEFAULT, smithing_bell_bearing_option: 2 },
        "Ashen Lock"
      )
    ).toBeUndefined();
  });

  test("starting in the base game, the DLC takes every bell bearing as well as its lock and Wailing Dunes", () => {
    const bearings = [1, 2, 3, 4].map((n) => `Smithing-Stone Miner's Bell Bearing [${n}]`);
    bearings.push(...[1, 2, 3, 4, 5].map((n) => `Somberstone Miner's Bell Bearing [${n}]`));
    expect(needsFor("Gravesite Plain", DEFAULT, ...bearings)).toEqual(
      all(item("Gravesite Lock"), area("Wailing Dunes"))
    );
  });

  test("with Mohgwyn open from the Snowfield, the DLC also takes the Rold Medallion", () => {
    expect(needsFor("Mohgwyn Palace", IZZY, "Mohgwyn Lock")).toEqual(area("Consecrated Snowfield"));
    expect(needsFor("Gravesite Plain", IZZY, "Gravesite Lock")).toEqual(
      all(item("Rold Medallion"), area("Wailing Dunes"))
    );
  });

  test("with Mohgwyn open from Altus, it takes Varré's medal and Altus", () => {
    expect(needsFor("Mohgwyn Palace", DEFAULT, "Mohgwyn Lock")).toEqual(
      all(item("Pureblood Knight's Medal"), area("Altus Plateau"))
    );
  });

  test("with Mohgwyn open from the start, it takes the medal, and so do Altus and Caelid when missables count", () => {
    const fromStart: Options = { ...DEFAULT, dlc_timing: 0 };
    expect(needsFor("Mohgwyn Palace", fromStart, "Mohgwyn Lock")).toEqual(
      item("Pureblood Knight's Medal")
    );
    expect(rulesOf(fromStart).entrances.get("Caelid")).toEqual(
      rulesOf(DEFAULT).entrances.get("Caelid")
    );
    const early: Options = { ...fromStart, missable_location_behavior: 1 };
    const toAltus = [...TO_ALTUS, "Smithing-Stone Miner's Bell Bearing [1]"];
    expect(needsFor("Altus Plateau", early, ...toAltus)).toEqual(item("Pureblood Knight's Medal"));
    // Caelid waits for Altus under soft logic, so it needs the medal twice over.
    expect(needsFor("Caelid", early, ...toAltus, "Caelid Lock")).toEqual(
      all(area("Altus Plateau"), item("Pureblood Knight's Medal"))
    );
  });

  test("without the DLC after the base game, Mohgwyn takes the medal or the Snowfield", () => {
    const medium: Options = PRESETS["[Medium]"];
    expect(needsFor("Mohgwyn Palace", medium, "Mohgwyn Lock")).toEqual(
      any(item("Pureblood Knight's Medal"), area("Consecrated Snowfield"))
    );
  });

  test("when the medal stays where it is, Mohgwyn takes the Snowfield, and the DLC Wailing Dunes", () => {
    const fixed: Options = { ...IZZY, missable_location_behavior: 3 };
    expect(needsFor("Mohgwyn Palace", fixed, "Mohgwyn Lock")).toEqual(
      area("Consecrated Snowfield")
    );
    expect(needsFor("Gravesite Plain", fixed, "Gravesite Lock")).toEqual(area("Wailing Dunes"));
  });
});
