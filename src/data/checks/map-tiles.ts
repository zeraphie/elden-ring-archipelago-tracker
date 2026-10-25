/**
 * ─ Map tiles ─
 *
 * Where a room's checks sit on the game's two open-world map sheets, and the
 * regions those tiles make. Each location's static-randomizer key opens on
 * its map tile: "603649" is sheet 60, column 36, row 49, a 256 m square.
 * Each tile goes to the region with the most checks on it, and each region is
 * its squares with a border wherever the next tile is another region's or
 * open sea. The tiles are drawn as they are, nothing smoothed or placed by
 * hand; legacy dungeons and the underground have their own maps, not these.
 */

import { readLocationName } from "../names/location-name.js";

/** One of the game's two open-world map sheets: the Lands Between, and the Realm of Shadow. */
export type Sheet = "surface" | "dlc";

/** A location placed on a map: its region, its sheet, and its tile's column and row. */
export interface PlacedLocation {
  readonly region: string;
  readonly sheet: Sheet;
  readonly x: number;
  readonly y: number;
}

/** A tile side on a border, as its two corners in tile units: [x1, y1, x2, y2]. */
export type Edge = readonly [number, number, number, number];

/** One region's share of a sheet: its tiles, and the sides of them that border another region or the sea. */
export interface RegionTiles {
  readonly region: string;
  readonly tiles: readonly (readonly [number, number])[];
  readonly edges: readonly Edge[];
}

/** A sheet's regions, and its coastline: the sides of its tiles with no tile beyond. */
export interface SheetTiles {
  readonly regions: readonly RegionTiles[];
  readonly coast: readonly Edge[];
}

// The map ids of the two open-world sheets, as the keys write them.
const SHEETS: ReadonlyMap<string, Sheet> = new Map([
  ["60", "surface"],
  ["61", "dlc"],
]);
const TILE = /^(\d\d)(\d\d)(\d\d),/;

/** The sheet and tile a static-randomizer key places a location on; undefined off the open-world map. */
export function tileOf(key: string): Omit<PlacedLocation, "region"> | undefined {
  const parts = TILE.exec(key);
  const sheet = SHEETS.get(parts?.[1] ?? "");
  if (parts === null || sheet === undefined) {
    return undefined;
  }
  return { sheet, x: Number(parts[2]), y: Number(parts[3]) };
}

/** Every location of a room's slot_data that sits on the open-world map, by location id. */
export function placedLocations(slot: {
  readonly locationIdsToKeys: Readonly<Record<string, string>>;
  readonly locationIdsToName: Readonly<Record<string, string>>;
}): Map<number, PlacedLocation> {
  const placed = new Map<number, PlacedLocation>();
  for (const [id, key] of Object.entries(slot.locationIdsToKeys)) {
    const tile = tileOf(key);
    const region = readLocationName(slot.locationIdsToName[id] ?? "")?.regions[0];
    if (tile !== undefined && region !== undefined) {
      placed.set(Number(id), { region, ...tile });
    }
  }
  return placed;
}

/**
 * Each sheet's regions and coastline from the placed locations. A tile goes
 * to the region with the most locations on it; a tie goes to the region that
 * came first in the input, which follows the apworld's own order.
 */
export function sheetTiles(placed: Iterable<PlacedLocation>): Map<Sheet, SheetTiles> {
  const votes = new Map<Sheet, Map<string, Map<string, number>>>();
  for (const { region, sheet, x, y } of placed) {
    const tiles = votes.get(sheet) ?? new Map<string, Map<string, number>>();
    const counts = tiles.get(cell(x, y)) ?? new Map<string, number>();
    counts.set(region, (counts.get(region) ?? 0) + 1);
    tiles.set(cell(x, y), counts);
    votes.set(sheet, tiles);
  }
  const sheets = new Map<Sheet, SheetTiles>();
  for (const [sheet, tiles] of votes) {
    const owner = new Map<string, string>();
    for (const [at, counts] of tiles) {
      let best = "";
      let most = 0;
      for (const [region, count] of counts) {
        if (count > most) {
          best = region;
          most = count;
        }
      }
      owner.set(at, best);
    }
    const byRegion = new Map<string, (readonly [number, number])[]>();
    for (const [at, region] of owner) {
      byRegion.set(region, [...(byRegion.get(region) ?? []), coordinates(at)]);
    }
    const regions = [...byRegion].map(([region, cells]) => ({
      region,
      tiles: cells,
      edges: bordersOf(cells, (x, y) => owner.get(cell(x, y)) === region),
    }));
    const coast = bordersOf([...owner.keys()].map(coordinates), (x, y) => owner.has(cell(x, y)));
    sheets.set(sheet, { regions, coast });
  }
  return sheets;
}

// The sides of these tiles where the tile beyond doesn't belong, each as its two corners.
function bordersOf(
  cells: readonly (readonly [number, number])[],
  belongs: (x: number, y: number) => boolean
): Edge[] {
  const edges: Edge[] = [];
  for (const [x, y] of cells) {
    if (!belongs(x, y - 1)) {
      edges.push([x, y, x + 1, y]);
    }
    if (!belongs(x, y + 1)) {
      edges.push([x, y + 1, x + 1, y + 1]);
    }
    if (!belongs(x - 1, y)) {
      edges.push([x, y, x, y + 1]);
    }
    if (!belongs(x + 1, y)) {
      edges.push([x + 1, y, x + 1, y + 1]);
    }
  }
  return edges;
}

/** A tile${String.fromCharCode(39)}s key in a map of tiles: its column and row, as "36,49". */
export function cell(x: number, y: number): string {
  return `${x},${y}`;
}

function coordinates(at: string): readonly [number, number] {
  const [x = 0, y = 0] = at.split(",").map(Number);
  return [x, y];
}
