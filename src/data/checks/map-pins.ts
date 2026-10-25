/**
 * ─ Map pins ─
 *
 * The key checks on the open-world map, one pin per tile. A pin is collected
 * once every key check on its tile is checked, to do while any is left, and
 * locked while the region its tile belongs to is locked, so it dims with the
 * fill under it. Checks that aren't key checks get no pin; they're reached
 * from the panel.
 */

import type { AreaState } from "../rules/area-status.js";
import { cell, type PlacedLocation, type Sheet, type SheetTiles } from "./map-tiles.js";

/** How a pin stands: every key check on its tile checked, some left, or some left in a locked region. */
export type PinState = "collected" | "todo" | "locked";

/** The key checks on one map tile: where it is, the region it belongs to, the checks by id, and how many are checked. */
export interface MapPin {
  /** Its tile's key, as `cell` writes it. */
  readonly tile: string;
  readonly x: number;
  readonly y: number;
  readonly region: string;
  readonly ids: readonly number[];
  /** The check a click opens: the first not yet checked, or else the first. */
  readonly opens: number;
  readonly done: number;
  readonly state: PinState;
}

/**
 * Each sheet's pins, given where each check sits, the regions each sheet's
 * tiles belong to, the key checks and the checks done, by id, and how each
 * region stands.
 */
export function mapPins(
  placed: ReadonlyMap<number, PlacedLocation>,
  sheets: ReadonlyMap<Sheet, SheetTiles>,
  keyChecks: ReadonlySet<number>,
  checked: ReadonlySet<number>,
  regions: ReadonlyMap<string, { readonly state: AreaState }>
): Map<Sheet, MapPin[]> {
  const owners = ownersOf(sheets);
  const tiles = new Map<Sheet, Map<string, { x: number; y: number; ids: number[] }>>();
  for (const id of keyChecks) {
    const where = placed.get(id);
    if (where === undefined) {
      continue;
    }
    const onSheet =
      tiles.get(where.sheet) ?? new Map<string, { x: number; y: number; ids: number[] }>();
    const at = cell(where.x, where.y);
    const tile = onSheet.get(at) ?? { x: where.x, y: where.y, ids: [] };
    tile.ids.push(id);
    onSheet.set(at, tile);
    tiles.set(where.sheet, onSheet);
  }
  const pins = new Map<Sheet, MapPin[]>();
  for (const [sheet, onSheet] of tiles) {
    pins.set(
      sheet,
      [...onSheet].map(([at, { x, y, ids }]) => {
        const region = owners.get(sheet)?.get(at) ?? "";
        const done = ids.filter((id) => checked.has(id)).length;
        const state: PinState =
          done === ids.length
            ? "collected"
            : regions.get(region)?.state === "locked"
              ? "locked"
              : "todo";
        const opens = ids.find((id) => !checked.has(id)) ?? ids[0] ?? 0;
        return { tile: at, x, y, region, ids, opens, done, state };
      })
    );
  }
  return pins;
}

// Each sheet's tiles, by cell, with the region each belongs to.
function ownersOf(sheets: ReadonlyMap<Sheet, SheetTiles>): Map<Sheet, Map<string, string>> {
  const owners = new Map<Sheet, Map<string, string>>();
  for (const [sheet, { regions }] of sheets) {
    const owner = new Map<string, string>();
    for (const { region, tiles } of regions) {
      for (const [x, y] of tiles) {
        owner.set(cell(x, y), region);
      }
    }
    owners.set(sheet, owner);
  }
  return owners;
}
