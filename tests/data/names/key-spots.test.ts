import { describe, expect, test } from "bun:test";
import { KEY_SPOTS, keySpot } from "../../../src/data/names/key-spots.js";
import { readLocationName, spellCompass } from "../../../src/data/names/location-name.js";
import { POSSIBLE_KEY_SPOTS } from "../../fixtures/possible-key-spots.js";

// Sellen's shop, which no priority group makes key checks: bosses.py has them
// as the Mad Pumpkin Head's drops, commented out. A host can still name each one.
const ADDED_ONE_BY_ONE: ReadonlySet<string> = new Set([
  "LG/(WR): Glintstone Pebble - Sellen Shop",
  "LG/(WR): Glintstone Stars - Sellen Shop",
  "LG/(WR): Crystal Barrage - Sellen Shop",
  "LG/(WR): Glintstone Arc - Sellen Shop",
  "LG/(WR): Scholar's Armament - Sellen Shop",
  "LG/(WR): Scholar's Shield - Sellen Shop",
]);

describe("KEY_SPOTS", () => {
  test("holds the 821 key spots", () => {
    expect(KEY_SPOTS.size).toBe(821);
  });

  test("every spot a host's groups can make a key check has a full name", () => {
    const unnamed = POSSIBLE_KEY_SPOTS.filter((name) => !KEY_SPOTS.has(name));
    expect(unnamed).toEqual([]);
  });

  test("every key is an Elden Ring location name, with a known form", () => {
    const unread = [...KEY_SPOTS.keys()].filter((name) => readLocationName(name) === undefined);
    expect(unread).toEqual([]);
  });

  test("every place has its compass points spelled out already", () => {
    const abbreviated = [...KEY_SPOTS.values()].filter(
      ({ place }) => spellCompass(place) !== place
    );
    expect(abbreviated).toEqual([]);
  });

  test("every place and encounter has text", () => {
    const empty = [...KEY_SPOTS.values()].filter(({ place, encounter }) => !place || !encounter);
    expect(empty).toEqual([]);
  });

  test("every key spot is one a host's groups can make, but Sellen's shop, added one by one", () => {
    const possible = new Set(POSSIBLE_KEY_SPOTS);
    const outside = [...KEY_SPOTS.keys()].filter((name) => !possible.has(name));
    expect(outside.sort()).toEqual([...ADDED_ONE_BY_ONE].sort());
  });
});

describe("keySpot", () => {
  test("finds a key spot by its exact name", () => {
    expect(keySpot("LG/(SE): Aspects of the Crucible: Tail - boss drop Evergaol")).toBe(
      KEY_SPOTS.get("LG/(SE): Aspects of the Crucible: Tail - boss drop Evergaol")
    );
  });

  test("a name the apworld ends with a space is found with it", () => {
    expect(keySpot("LL/RVV: Golden Seed - seedtree to SW ")).toBeDefined();
  });

  test("the generator's extra copy of a key spot gives the spot's name", () => {
    const spot = keySpot("SV/SeC: Golden Seed - seedtree to SE");
    expect(spot).toBeDefined();
    expect(keySpot("SV/SeC: Golden Seed - seedtree to SE, extra item 3")).toBe(spot);
  });

  test("a spot that isn't listed has no full name", () => {
    expect(keySpot("LG/WS: Golden Rune [1] 2 - graveyard SW of WS")).toBeUndefined();
  });
});
