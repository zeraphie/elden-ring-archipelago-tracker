import { describe, expect, test } from "bun:test";
import { LOCATION_GROUPS } from "../../../src/data/checks/location-groups.js";
import { readLocationName } from "../../../src/data/names/location-name.js";
import {
  DESCRIPTION_EXCEPTIONS,
  DESCRIPTION_NAMES,
  descriptionNames,
  expandPlaces,
  PLACE_NAMES,
  placeName,
  unnamedCodesIn,
} from "../../../src/data/names/place-names.js";

describe("placeName", () => {
  test("a named place gives its full name", () => {
    const names = new Map([["LG/WS", "Warmaster's Shack"]]);
    expect(placeName("LG/WS", names)).toBe("Warmaster's Shack");
  });

  test("a place with no name yet shows its code as written", () => {
    const none = new Map<string, string>();
    expect(placeName("LG/(AS)", none)).toBe("(AS)");
    expect(placeName("LL/(TFB/CA)", none)).toBe("(TFB/CA)");
    expect(placeName("LRC|LAC/RC", none)).toBe("RC");
    expect(placeName("(VM)/SIC", none)).toBe("SIC");
  });

  test("the same code in another region is another place", () => {
    const names = new Map([["LG/WS", "Warmaster's Shack"]]);
    expect(placeName("LL/WS", names)).toBe("WS");
  });
});

describe("expandPlaces", () => {
  const names = new Map([
    ["LG/WR", "Waypoint"],
    ["LG/(FH)", "Fort"],
    ["FA/BGB", "Beside the Great Bridge"],
    ["LRC|LAC/RC", "Both capitals"],
    ["LAC/RC", "Ashen capital"],
  ]);

  test("a code alone is named under the check's region", () => {
    expect(expandPlaces("graveyard south of WR", ["LG"], names)).toBe(
      `graveyard south of ${names.get("LG/WR")}`
    );
  });

  test("a code alone with no grace of its name is named as the landmark", () => {
    expect(expandPlaces("kill FH enemy", ["LG"], names)).toBe(`kill ${names.get("LG/(FH)")} enemy`);
  });

  test("a code written with its region is named under that region, wherever the check is", () => {
    expect(expandPlaces("defeat FA/BGB mainboss", ["RH"], names)).toBe(
      `defeat ${names.get("FA/BGB")} mainboss`
    );
  });

  test("a check under two regions looks under both together first", () => {
    expect(expandPlaces("by RC", ["LRC", "LAC"], names)).toBe(`by ${names.get("LRC|LAC/RC")}`);
  });

  test("a code with no name yet, and words that aren't codes, stay as written", () => {
    const text = "Golden Rune - by XY, North of the Tree";
    expect(expandPlaces(text, ["LG"], names)).toBe(text);
  });
});

describe("DESCRIPTION_NAMES", () => {
  test("a code with a name of its own for descriptions reads by it there, and by its place name as a place", () => {
    const [key, described] = [...DESCRIPTION_NAMES][0] ?? ["", ""];
    const [region = "", code = ""] = key.split("/");
    expect(expandPlaces(`east of ${code}`, [region])).toBe(`east of ${described}`);
    expect(placeName(key)).toBe(PLACE_NAMES.get(key) ?? "");
  });

  test("names only codes that have a place name too", () => {
    expect([...DESCRIPTION_NAMES.keys()].filter((key) => !PLACE_NAMES.has(key))).toEqual([]);
  });
});

describe("DESCRIPTION_EXCEPTIONS", () => {
  test("each is one of the apworld's locations, fixing a code its description uses", () => {
    const wrong = [...DESCRIPTION_EXCEPTIONS].filter(([location, fixes]) => {
      const read = readLocationName(location);
      const codes = unnamedCodesIn(read?.description ?? "", read?.regions ?? [], new Map());
      return (
        !LOCATION_GROUPS.has(location) || [...fixes.keys()].some((key) => !codes.includes(key))
      );
    });
    expect(wrong).toEqual([]);
  });

  test("a location's description is read with its own fix, and any other's without", () => {
    const [location, fixes] = [...DESCRIPTION_EXCEPTIONS][0] ?? ["", new Map<string, string>()];
    const [key, fixed] = [...fixes][0] ?? ["", ""];
    expect(descriptionNames(location).get(key)).toBe(fixed);
    expect(descriptionNames("Somewhere else").get(key)).toBe(PLACE_NAMES.get(key));
  });
});

describe("unnamedCodesIn", () => {
  test("gives each code with no name as the key it's tried under first", () => {
    const names = new Map([["LG/WR", "Waypoint"]]);
    expect(unnamedCodesIn("south of WR, past (SS) and FA/(BGB)", ["LG"], names)).toEqual([
      "LG/SS",
      "FA/(BGB)",
    ]);
    expect(unnamedCodesIn("south of WR and SS", ["LG"], names)).toEqual(["LG/SS"]);
  });

  test('leaves out capital words that are no place, as "AND" written for emphasis', () => {
    expect(unnamedCodesIn("in the swamp AND by the elevator", ["MP"], new Map())).toEqual([]);
  });
});

describe("PLACE_NAMES", () => {
  test("names only places the apworld's location names use, before their colon or in their description", () => {
    const used = new Set<string>();
    for (const name of LOCATION_GROUPS.keys()) {
      const read = readLocationName(name);
      if (read?.placeKey !== undefined) {
        used.add(read.placeKey);
      }
      for (const key of unnamedCodesIn(read?.description ?? "", read?.regions ?? [], new Map())) {
        used.add(key);
        used.add(
          key.replace(/\/(?:\((.*)\)|(.*))$/, (_, inBrackets, bare) =>
            bare === undefined ? `/${inBrackets}` : `/(${bare})`
          )
        );
      }
    }
    expect([...PLACE_NAMES.keys()].filter((key) => !used.has(key))).toEqual([]);
  });
});
