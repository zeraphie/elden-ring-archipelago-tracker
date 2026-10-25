import { describe, expect, test } from "bun:test";
import {
  boundsOf,
  edgesPath,
  tileCentre,
  tilesPath,
} from "../../../../src/components/organisms/map/map-paths.js";

describe("map paths", () => {
  test("a tile is a unit square, its row counted northward up the page", () => {
    expect(tilesPath([[36, 49]])).toBe("M36 -50h1v1h-1Z");
    expect(tilesPath([[0, 0]])).toBe("M0 -1h1v1h-1Z");
  });

  test("a tile side runs between its two corners, north up", () => {
    expect(edgesPath([[36, 49, 37, 49]])).toBe("M36 -49L37 -49");
    expect(edgesPath([[0, 0, 0, 1]])).toBe("M0 0L0 -1");
  });

  test("a pin sits at the middle of the square its tile is drawn as", () => {
    // The square for column 36, row 49 runs from 36 to 37 across and -50 to -49 down.
    expect(tileCentre(36, 49)).toEqual({ x: 36.5, y: -49.5 });
    expect(tileCentre(0, 0)).toEqual({ x: 0.5, y: -0.5 });
  });

  test("the bounds of some tiles, a sheet's or a region's, are their outer edges", () => {
    // Columns 36 to 40 and rows 38 to 49: north edge at -50, south at -38.
    expect(
      boundsOf([
        [40, 38],
        [36, 49],
      ])
    ).toEqual({ left: 36, top: -50, right: 41, bottom: -38 });
  });
});
