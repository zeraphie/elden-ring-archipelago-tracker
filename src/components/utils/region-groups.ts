/**
 * ─ Region groups ─
 *
 * The room's regions in the region picker's groups, from the store: the Lands
 * Between's, the underground and the legacy dungeons, then the Realm of
 * Shadow's, each region with how it stands and a count of what's done in it.
 * The panel counts key checks; the goal menu counts the goal's bosses.
 */

import type { AreaState } from "../../data/rules/area-status.js";
import type { RegionSummary } from "../../data/rules/region-summary.js";
import type { EldenRingData } from "../../state/setup.js";
import type { TrackerState } from "../../state/store.js";
import { mapOf } from "../../state/utils/map.js";
import { regionsOf } from "../../state/utils/regions.js";
import { SHEET_NAMES } from "./sheet-names.js";

/** One region of a picker group: its code and name, how it stands, and how much of what's counted in it is done. */
export interface PickerRegion {
  readonly code: string;
  readonly name: string;
  readonly state: AreaState;
  readonly done: number;
  readonly of: number;
  /** What the count counts, as a screen reader hears it after "3 of 5": "key checks done". */
  readonly what: string;
}

/** One group of the picker: its title, and its regions. */
export interface PickerGroup {
  readonly title: string;
  readonly regions: readonly PickerRegion[];
}

/** The picker's groups, each region counting its key checks done, or all its checks when it has no key checks. */
export function pickerGroups(data: EldenRingData, state: TrackerState): readonly PickerGroup[] {
  const summaries = regionsOf(data, state);
  const sheets = mapOf(data, state)?.sheets;
  if (summaries === undefined || sheets === undefined) {
    return [];
  }
  const { surface, underground, dlc } = data.regionGroups(summaries, sheets);
  const named = (codes: readonly string[]) =>
    codes.flatMap((code) => {
      const summary = summaries.get(code);
      return summary === undefined
        ? []
        : [{ code, name: data.regionName(code), ...count(summary) }];
    });
  const [lands = "", shadow = ""] = SHEET_NAMES.map(([, name]) => name);
  return [
    { title: lands, regions: named(surface) },
    { title: "Underground and dungeons", regions: named(underground) },
    { title: shadow, regions: named(dlc) },
  ];
}

// A region's key checks done, or all its checks when it has none.
function count({ state, keyChecks, keyDone, checks, done }: RegionSummary) {
  return keyChecks > 0
    ? { state, done: keyDone, of: keyChecks, what: "key checks done" }
    : { state, done, of: checks, what: "checks done" };
}
