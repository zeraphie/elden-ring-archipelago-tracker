import { describe, expect, test } from "bun:test";
import { mapPins, type MapPin } from "../../../src/data/checks/map-pins.js";
import { cell, sheetTiles, type PlacedLocation } from "../../../src/data/checks/map-tiles.js";
import type { AreaState } from "../../../src/data/rules/area-status.js";

// Two checks on one Limgrave tile (1 and 2), one more Limgrave check that lands on a
// Liurnia tile (3), a Liurnia check (4, 5 and 6 share its tile), and one in the DLC (7).
const PLACED = new Map<number, PlacedLocation>([
  [1, { region: "LG", sheet: "surface", x: 40, y: 38 }],
  [2, { region: "LG", sheet: "surface", x: 40, y: 38 }],
  [3, { region: "LG", sheet: "surface", x: 36, y: 49 }],
  [4, { region: "LL", sheet: "surface", x: 36, y: 49 }],
  [5, { region: "LL", sheet: "surface", x: 36, y: 49 }],
  [6, { region: "LL", sheet: "surface", x: 36, y: 49 }],
  [7, { region: "GP", sheet: "dlc", x: 45, y: 40 }],
]);
const SHEETS = sheetTiles(PLACED.values());

const pinsOf = (
  keyChecks: number[],
  checked: number[] = [],
  states: [string, AreaState][] = [
    ["LG", "open"],
    ["LL", "open"],
    ["GP", "open"],
  ]
) =>
  mapPins(
    PLACED,
    SHEETS,
    new Set(keyChecks),
    new Set(checked),
    new Map(states.map(([region, state]) => [region, { state }]))
  );

const surfacePin = (pins: Map<string, MapPin[]>, x: number, y: number) =>
  pins.get("surface")?.find((pin) => pin.x === x && pin.y === y);

describe("mapPins", () => {
  test("key checks on one tile share one pin, and every other check gets none", () => {
    const pins = pinsOf([1, 2, 7]);
    expect(pins.get("surface")?.map(({ x, y, ids }) => ({ x, y, ids }))).toEqual([
      { x: 40, y: 38, ids: [1, 2] },
    ]);
    expect(pins.get("dlc")?.map(({ ids }) => ids)).toEqual([[7]]);
  });

  test("a pin belongs to the region its tile is drawn for, whatever its checks' own regions", () => {
    // The tile at 36, 49 holds three Liurnia checks and one Limgrave one, so it's Liurnia's.
    expect(surfacePin(pinsOf([3]), 36, 49)?.region).toBe("LL");
  });

  test("a pin is collected only once every key check on its tile is checked", () => {
    expect(surfacePin(pinsOf([1, 2], [1]), 40, 38)).toMatchObject({ done: 1, state: "todo" });
    expect(surfacePin(pinsOf([1, 2], [1, 2]), 40, 38)).toMatchObject({
      done: 2,
      state: "collected",
    });
  });

  test("a pin with checks left is locked while its tile's region is locked", () => {
    const locked: [string, AreaState][] = [
      ["LG", "locked"],
      ["LL", "open"],
    ];
    expect(surfacePin(pinsOf([1, 4], [], locked), 40, 38)?.state).toBe("locked");
    expect(surfacePin(pinsOf([1, 4], [], locked), 36, 49)?.state).toBe("todo");
  });

  test("a pin in an open region is locked once none of its checks left can be got", () => {
    const pins = mapPins(
      PLACED,
      SHEETS,
      new Set([1]),
      new Set(),
      new Map([["LG", { state: "open" as const, outOfReach: new Set([1]) }]])
    );
    expect(pins.get("surface")?.[0]?.state).toBe("locked");
  });

  test("a pin whose checks are all collected stays collected in a locked region", () => {
    expect(surfacePin(pinsOf([1], [1], [["LG", "locked"]]), 40, 38)?.state).toBe("collected");
  });

  test("a click opens the tile's first check not yet checked, or else its first", () => {
    expect(surfacePin(pinsOf([4, 5, 6], [4]), 36, 49)?.opens).toBe(5);
    expect(surfacePin(pinsOf([4, 5], [4, 5]), 36, 49)?.opens).toBe(4);
  });

  test("each pin is keyed by its tile", () => {
    expect(
      pinsOf([1, 4])
        .get("surface")
        ?.map(({ tile }) => tile)
    ).toEqual([cell(40, 38), cell(36, 49)]);
  });
});
