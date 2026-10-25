/**
 * ─ Map ─
 *
 * The map for the store's room: each sheet's regions and coast, from where
 * slot_data places the checks, how each region stands, and the key checks'
 * pins. The tiles depend only on slot_data, so they're laid out once for it;
 * the pins are worked out again only when the regions or the checks done change.
 */

import { readMapSlotData } from "../../archipelago/elden-ring-slot.js";
import type { MapPin } from "../../data/checks/map-pins.js";
import type { PlacedLocation, Sheet, SheetTiles } from "../../data/checks/map-tiles.js";
import type { RegionSummary } from "../../data/rules/region-summary.js";
import type { EldenRingData } from "../setup.js";
import { regionsOf, type RegionInputs } from "./regions.js";
import { roomViewOf, type RoomView } from "./room.js";

/** What the map is worked out from, in the store. */
export type MapInputs = RegionInputs;

/** Each sheet's regions and coast, how each region stands by its code, and each sheet's key-check pins. */
export interface MapView {
  readonly sheets: ReadonlyMap<Sheet, SheetTiles>;
  readonly regions: ReadonlyMap<string, RegionSummary>;
  readonly pins: ReadonlyMap<Sheet, readonly MapPin[]>;
  /** Where each check on the open-world map sits, by id. */
  readonly placed: ReadonlyMap<number, PlacedLocation>;
  /** Each check's Archipelago name, by id. */
  readonly names: Readonly<Record<string, string>>;
}

interface Layout {
  readonly placed: ReadonlyMap<number, PlacedLocation>;
  readonly sheets: ReadonlyMap<Sheet, SheetTiles>;
}

// Each slot_data's tiles; undefined when it doesn't place its checks.
const LAYOUTS = new WeakMap<object, Layout | undefined>();
const NO_KEY_CHECKS: ReadonlySet<number> = new Set();

// The last map worked out, and what it was worked out from.
let last:
  | {
      data: EldenRingData;
      view: RoomView | undefined;
      regions: ReadonlyMap<string, RegionSummary> | undefined;
      map: MapView | undefined;
    }
  | undefined;

/** The map for the store's room; undefined until slot_data and the data package are in, or when they can't be read. */
export function mapOf(data: EldenRingData, inputs: MapInputs): MapView | undefined {
  const view = roomViewOf(inputs);
  const regions = regionsOf(data, inputs);
  if (last !== undefined && last.data === data && last.view === view && last.regions === regions) {
    return last.map;
  }
  const { keyChecks = NO_KEY_CHECKS, slotData } = inputs;
  const layout = slotData === undefined ? undefined : layoutOf(data, slotData);
  const map =
    view === undefined || layout === undefined || regions === undefined
      ? undefined
      : {
          sheets: layout.sheets,
          regions,
          pins: data.mapPins(layout.placed, layout.sheets, keyChecks, view.checkedIds, regions),
          placed: layout.placed,
          names: view.names,
        };
  last = { data, view, regions, map };
  return map;
}

function layoutOf(data: EldenRingData, slotData: Readonly<Record<string, unknown>>) {
  if (!LAYOUTS.has(slotData)) {
    const read = readMapSlotData(slotData);
    const placed = read === undefined ? undefined : data.placedLocations(read);
    LAYOUTS.set(
      slotData,
      placed === undefined ? undefined : { placed, sheets: data.sheetTiles(placed.values()) }
    );
  }
  return LAYOUTS.get(slotData);
}
