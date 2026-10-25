/**
 * ─ Region parts ─
 *
 * What the panel's region heading is given, from the store: what a locked
 * region still needs, in English.
 */

import type { RegionSummary } from "../../../data/rules/region-summary.js";
import type { EldenRingData } from "../../../state/setup.js";
import { checkLine } from "../../utils/check-words.js";

/** What a region still needs while it's locked, in English, its checks named in full; undefined once it's open. */
export function needsText(data: EldenRingData, summary: RegionSummary): string | undefined {
  return summary.needs === undefined
    ? undefined
    : data.describeNeed(summary.needs, {
        location: (location) => checkLine(data.checkName(location)),
      });
}
