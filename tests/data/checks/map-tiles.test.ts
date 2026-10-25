import { describe, expect, test } from "bun:test";
import {
  placedLocations,
  sheetTiles,
  tileOf,
  type Edge,
  type PlacedLocation,
} from "../../../src/data/checks/map-tiles.js";
import fixture from "../../fixtures/map-tiles.json";

describe("tileOf", () => {
  test("reads the sheet, column and row from the head of a key", () => {
    expect(tileOf("603649,0:0000000000:100000,10009516:")).toEqual({
      sheet: "surface",
      x: 36,
      y: 49,
    });
    expect(tileOf("614942,0:1032507000::")).toEqual({ sheet: "dlc", x: 49, y: 42 });
  });

  test("a legacy dungeon's or the underground's key isn't on the open-world map", () => {
    expect(tileOf("100000,0:0000400220::")).toBeUndefined();
    expect(tileOf("120200,0:0000000000::")).toBeUndefined();
  });
});

describe("placedLocations", () => {
  test("places each location on the open-world map under its first region, by id", () => {
    const placed = placedLocations({
      locationIdsToKeys: { "1": "603649,0::", "2": "100000,0::", "3": "614942,0::" },
      locationIdsToName: {
        "1": "LG/WS: Golden Rune [1] - graveyard SW of WS",
        "2": "SV/GG: Item - in the castle",
        "3": "LRC|LAC/RC: Flail - kill Brother Corhyn",
      },
    });
    expect([...placed]).toEqual([
      [1, { region: "LG", sheet: "surface", x: 36, y: 49 }],
      [3, { region: "LRC", sheet: "dlc", x: 49, y: 42 }],
    ]);
  });
});

const at = (region: string, x: number, y: number): PlacedLocation => ({
  region,
  sheet: "surface",
  x,
  y,
});
const sorted = (edges: readonly Edge[]): string[] => edges.map((edge) => edge.join(",")).sort();

describe("sheetTiles", () => {
  test("a tile goes to the region with the most locations on it", () => {
    const sheet = sheetTiles([at("LL", 0, 0), at("LG", 0, 0), at("LG", 0, 0)]).get("surface");
    expect(sheet?.regions.map((region) => region.region)).toEqual(["LG"]);
  });

  test("a tie goes to the region that came first", () => {
    const sheet = sheetTiles([at("LL", 0, 0), at("LG", 0, 0)]).get("surface");
    expect(sheet?.regions.map((region) => region.region)).toEqual(["LL"]);
  });

  test("a region's border runs round its tiles, and between it and its neighbours", () => {
    const sheet = sheetTiles([at("LG", 0, 0), at("LL", 1, 0)]).get("surface");
    const limgrave = sheet?.regions.find((region) => region.region === "LG");
    expect(sorted(limgrave?.edges ?? [])).toEqual(
      sorted([
        [0, 0, 1, 0],
        [0, 1, 1, 1],
        [0, 0, 0, 1],
        [1, 0, 1, 1],
      ])
    );
  });

  test("the coastline runs round every tile together, not between regions", () => {
    const sheet = sheetTiles([at("LG", 0, 0), at("LL", 1, 0)]).get("surface");
    expect(sheet?.coast).toHaveLength(6);
    expect(sorted(sheet?.coast ?? [])).not.toContain("1,0,1,1");
  });

  test("a region's own tiles share no border", () => {
    const block = [at("LG", 0, 0), at("LG", 1, 0), at("LG", 0, 1), at("LG", 1, 1)];
    expect(sheetTiles(block).get("surface")?.regions[0]?.edges).toHaveLength(8);
  });
});

describe("sheetTiles on the every-group seed", () => {
  const placed = (fixture.locations as [string, string][]).map(([region, head]) => {
    const tile = tileOf(`${head},`);
    if (tile === undefined) {
      throw new Error(`The map-tile fixture holds a key off the map: ${head}`);
    }
    return { region, ...tile };
  });
  const sheets = sheetTiles(placed);

  test("both sheets have their regions and tiles", () => {
    const summary = [...sheets].map(([sheet, { regions }]) => [
      sheet,
      regions.length,
      regions.reduce((total, region) => total + region.tiles.length, 0),
    ]);
    expect(summary).toEqual([
      ["surface", 15, 237],
      ["dlc", 16, 88],
    ]);
  });

  test("no tile belongs to two regions", () => {
    for (const { regions } of sheets.values()) {
      const tiles = regions.flatMap((region) => region.tiles.map((tile) => tile.join(",")));
      expect(new Set(tiles).size).toBe(tiles.length);
    }
  });

  test("every coast edge is also an edge of some region", () => {
    for (const { regions, coast } of sheets.values()) {
      const borders = new Set(regions.flatMap((region) => sorted(region.edges)));
      expect(sorted(coast).filter((edge) => !borders.has(edge))).toEqual([]);
    }
  });
});
