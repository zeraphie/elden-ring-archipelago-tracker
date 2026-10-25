import { describe, expect, test } from "bun:test";
import { locationNamesIn, unnamedPlaces } from "../../tools/place-names-report.js";

// Lines shaped as the apworld's locations.py writes them.
const SOURCE = `
    "Limgrave": [
        ERLocationData("LG/WS: Golden Rune [1] 1 - graveyard SW of WS", "Golden Rune [1]", key="1"),
        ERLocationData("LG/WS: Golden Rune [1] 2 - graveyard SW of WS", "Golden Rune [1]", key="2"),
        # ERLocationData("LG/OLD: Cut Item - no longer used", "Cut Item"),
        ERLocationData("TSC/SCR: \\"Gravity Stone\\" - in a \\"quoted\\" spot", "Gravity Stone"),
        ERLocationData("RH: Black Flame - Godskin Prayerbook", "Black Flame"),
    ],
`;

describe("locationNamesIn", () => {
  test("reads each location's name, quotes unescaped, and skips commented-out lines", () => {
    expect(locationNamesIn(SOURCE)).toEqual([
      "LG/WS: Golden Rune [1] 1 - graveyard SW of WS",
      "LG/WS: Golden Rune [1] 2 - graveyard SW of WS",
      'TSC/SCR: "Gravity Stone" - in a "quoted" spot',
      "RH: Black Flame - Godskin Prayerbook",
    ]);
  });
});

describe("unnamedPlaces", () => {
  test("counts each place key's uses, before the colon and inside descriptions", () => {
    // The two Limgrave spots each name WS twice: as their place, and in "graveyard SW of WS".
    expect(unnamedPlaces(locationNamesIn(SOURCE), new Map())).toEqual([
      { key: "LG/WS", region: "LG", uses: 4 },
      { key: "TSC/SCR", region: "TSC", uses: 1 },
    ]);
  });

  test("counts a code written with its region under that region", () => {
    const names = ["RH: Maliketh's Helm - Enia shop, defeat FA/BGB mainboss"];
    expect(unnamedPlaces(names, new Map())).toEqual([{ key: "FA/BGB", region: "FA", uses: 1 }]);
  });

  test("leaves out the places that already have a name", () => {
    const known = new Map([["LG/WS", "Warmaster's Shack"]]);
    expect(unnamedPlaces(locationNamesIn(SOURCE), known).map((place) => place.key)).toEqual([
      "TSC/SCR",
    ]);
  });
});
