/**
 * ─ Regions ─
 *
 * How each region of the store's room stands, by its code, for the map's
 * fills and the panel's heading alike, so the two never disagree. It's worked
 * out again only when the room's view or the key checks change.
 */

import type { RegionSummary } from "../../data/rules/region-summary.js";
import type { EldenRingData } from "../setup.js";
import type { TrackerState } from "../store.js";
import { roomViewOf, type RoomInputs, type RoomView } from "./room.js";

/** What the regions are worked out from, in the store. */
export type RegionInputs = RoomInputs & Pick<TrackerState, "keyChecks">;

const NO_KEY_CHECKS: ReadonlySet<number> = new Set();

// The last regions worked out, and what they were worked out from.
let last:
  | {
      data: EldenRingData;
      view: RoomView | undefined;
      keyChecks: ReadonlySet<number> | undefined;
      regions: ReadonlyMap<string, RegionSummary> | undefined;
    }
  | undefined;

/** Each region of the store's room, by its code; undefined until slot_data and the data package are in, or when they can't be read. */
export function regionsOf(
  data: EldenRingData,
  inputs: RegionInputs
): ReadonlyMap<string, RegionSummary> | undefined {
  const view = roomViewOf(inputs);
  const { keyChecks } = inputs;
  if (
    last !== undefined &&
    last.data === data &&
    last.view === view &&
    last.keyChecks === keyChecks
  ) {
    return last.regions;
  }
  const regions =
    view === undefined
      ? undefined
      : data.regionSummaries(
          view.room,
          view.items,
          view.names,
          keyChecks ?? NO_KEY_CHECKS,
          view.checkedIds
        );
  last = { data, view, keyChecks, regions };
  return regions;
}

/** Each check's region, by its id. */
export function regionsById(
  regions: ReadonlyMap<string, RegionSummary> | undefined
): Map<number, string> {
  const regionOf = new Map<number, string>();
  for (const [region, { ids }] of regions ?? []) {
    for (const id of ids) {
      regionOf.set(id, region);
    }
  }
  return regionOf;
}
