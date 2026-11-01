import { describe, expect, test } from "bun:test";
import {
  readLocationName,
  spellCompass,
  spotCopies,
  withoutExtra,
} from "../../../src/data/names/location-name.js";

// Every name here is a real one from the Elden Ring apworld 0.1.4.
describe("readLocationName", () => {
  test("reads the common form: region, place, item and where", () => {
    expect(readLocationName("SV/LL: Shabriri Grape - from LL/LFC to E, inside by ghost")).toEqual({
      regions: ["SV"],
      place: "LL",
      placeKey: "SV/LL",
      vanilla: "Shabriri Grape",
      copy: undefined,
      description: "From LL/LFC to east, inside by ghost",
      extra: undefined,
    });
  });

  test("a name with no place code has none", () => {
    const name = readLocationName(
      "RH: Rogier's Rapier - talk Rogier after beating SV mainboss or on his body after he dies"
    );
    expect(name?.regions).toEqual(["RH"]);
    expect(name?.place).toBeUndefined();
    expect(name?.vanilla).toBe("Rogier's Rapier");
  });

  test("a name under two regions keeps both, the first where it's listed", () => {
    expect(readLocationName("LRC|LAC/RC: Flail - kill Brother Corhyn")?.regions).toEqual([
      "LRC",
      "LAC",
    ]);
    expect(readLocationName("BTS|EI/SR: Euporia - outside to SE downstairs")?.regions).toEqual([
      "BTS",
      "EI",
    ]);
  });

  test("a region in brackets is read without them", () => {
    const name = readLocationName("(VM)/SIC: Inquisitor's Girandole - boss drop, from RLA warp");
    expect(name?.regions).toEqual(["VM"]);
    expect(name?.place).toBe("SIC");
  });

  test("a place code is kept as written, brackets, slashes and choices included", () => {
    expect(readLocationName("LG/(AS): Golden Rune [1] - in shack")?.place).toBe("(AS)");
    expect(readLocationName("LL/(TFB/CA): The Stormhawk King - top of church")?.place).toBe(
      "(TFB/CA)"
    );
    expect(
      readLocationName(
        "MP/PALR|(MDM): Golden Seed - seedtree in S blood swamp AND SE of boss elevator behind statue down below on rocks, getting one and reloading area deletes the other"
      )?.place
    ).toBe("PALR|(MDM)");
  });

  test("the place key is the regions and code as the name writes them", () => {
    expect(readLocationName("LG/(AS): Golden Rune [1] - in shack")?.placeKey).toBe("LG/(AS)");
    expect(readLocationName("LRC|LAC/RC: Flail - kill Brother Corhyn")?.placeKey).toBe(
      "LRC|LAC/RC"
    );
    expect(
      readLocationName("(VM)/SIC: Inquisitor's Girandole - boss drop, from RLA warp")?.placeKey
    ).toBe("(VM)/SIC");
  });

  test("a name with no place code has no place key", () => {
    expect(readLocationName("RH: Black Flame - Godskin Prayerbook")?.placeKey).toBeUndefined();
  });

  test("an item with a colon of its own stays whole", () => {
    expect(
      readLocationName("SV/RT: Ash of War: Spinning Weapon - Rogier shop, in church or RH later")
        ?.vanilla
    ).toBe("Ash of War: Spinning Weapon");
  });

  test("a numbered copy of an item is read apart from the item", () => {
    const name = readLocationName("LG/WS: Golden Rune [1] 2 - graveyard SW of WS");
    expect(name?.vanilla).toBe("Golden Rune [1]");
    expect(name?.copy).toBe(2);
  });

  test("an item's own count is part of the item, not a copy", () => {
    const name = readLocationName("TSC/SCR: Poisonbloom x4 - to S on outer wall");
    expect(name?.vanilla).toBe("Poisonbloom x4");
    expect(name?.copy).toBeUndefined();
  });

  test("the generator's extra copy of a priority spot reads as that spot, with its number", () => {
    const name = readLocationName("LRC|LAC/WCR: Golden Seed - seedtree to SE, extra item 2");
    expect(name?.vanilla).toBe("Golden Seed");
    expect(name?.description).toBe("Seedtree to south east");
    expect(name?.extra).toBe(2);
  });

  test("a Spiritspring Stone is read like any other spot", () => {
    expect(
      readLocationName("GP/(EH): Fort of Reprimand Spiritspring Stone - stone to NW")
    ).toMatchObject({
      vanilla: "Fort of Reprimand Spiritspring Stone",
      description: "Stone to north west",
    });
    expect(
      readLocationName(
        "ARR/CBME: Rauh Ruins Spiritspring Stone - drop to E till cliff then up ledge to N"
      )
    ).toMatchObject({
      vanilla: "Rauh Ruins Spiritspring Stone",
      description: "Drop to east till cliff then up ledge to north",
    });
  });

  test("a name in no Elden Ring form is not read", () => {
    expect(readLocationName("Hyrule Castle: Map Chest")).toBeUndefined();
    expect(readLocationName("Mantis Lords")).toBeUndefined();
  });
});

describe("withoutExtra", () => {
  test("parts the generator's extra copy from the spot it copies", () => {
    expect(withoutExtra("SV/SeC: Golden Seed - seedtree to SE, extra item 3")).toEqual({
      base: "SV/SeC: Golden Seed - seedtree to SE",
      extra: 3,
    });
  });

  test("leaves a name with no extra copy as it is", () => {
    expect(withoutExtra("SV/SeC: Golden Seed - seedtree to SE")).toEqual({
      base: "SV/SeC: Golden Seed - seedtree to SE",
      extra: undefined,
    });
  });
});

describe("spotCopies", () => {
  const SPOT = "SV/SeC: Golden Seed - seedtree to SE";

  test("numbers a spot's checks, the spot itself first, then its copies in their order", () => {
    const copies = spotCopies({
      "30": `${SPOT}, extra item 2`,
      "10": SPOT,
      "20": `${SPOT}, extra item 1`,
    });
    expect(copies.get(10)).toEqual({ first: 10, nth: 1, of: 3 });
    expect(copies.get(20)).toEqual({ first: 10, nth: 2, of: 3 });
    expect(copies.get(30)).toEqual({ first: 10, nth: 3, of: 3 });
  });

  test("leaves out a spot with no copies", () => {
    expect(spotCopies({ "10": SPOT }).size).toBe(0);
  });

  test("keeps different spots apart", () => {
    const copies = spotCopies({
      "10": SPOT,
      "20": `${SPOT}, extra item 1`,
      "30": "SV/LL: Shabriri Grape - from LL/LFC to E, inside by ghost",
    });
    expect(copies.get(20)).toEqual({ first: 10, nth: 2, of: 2 });
    expect(copies.has(30)).toBe(false);
  });
});

describe("spellCompass", () => {
  test("spells out every compass point the apworld uses", () => {
    expect(spellCompass("N S E W NE NW SE SW")).toBe(
      "north south east west north east north west south east south west"
    );
  });

  test("leaves codes and words that only hold the letters alone", () => {
    expect(spellCompass("graveyard SW of WS, by NPC in SE corner")).toBe(
      "graveyard south west of WS, by NPC in south east corner"
    );
  });
});
