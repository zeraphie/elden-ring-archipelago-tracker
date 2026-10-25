/**
 * ─ Map words ─
 *
 * What the map says under its legend: what's on the key-check pin pointed
 * at, each check by its place and encounter, and how many are checked, or how
 * to draw while the pen is on.
 */

import type { KeySpot } from "../../../data/names/key-spots.js";
import { listed } from "../../../data/words.js";
import { checkLine } from "../../utils/check-words.js";

/** What's on a pin: its checks, a spot named once however many copies it holds, and how many are checked. */
export function pinLine(names: readonly KeySpot[], done: number): string {
  const lines = [...new Set(names.map(checkLine))];
  return `${listed(lines, "and")}: ${done} of ${names.length} checked`;
}

/** What the line under the legend says while the pen is on. */
export const DRAWING_LINE =
  "Drawing: drag on the map to sketch a route. Right-drag draws at any time.";
