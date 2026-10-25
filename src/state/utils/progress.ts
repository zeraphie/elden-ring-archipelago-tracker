/**
 * ─ Progress ─
 *
 * How far the slot has got: its key checks done, out of those its slot_data
 * makes key checks, and all its checks done, out of all. The login says what's
 * still missing; without it, as in the reduced tracker, the web API's total
 * for the slot stands in.
 */

import type { TrackerState } from "../store.js";

/** How far the slot has got; a total is undefined until it's known. */
export interface Progress {
  readonly keyDone: number;
  /** Undefined until the key checks are worked out, or when they can't be. */
  readonly keyAll: number | undefined;
  readonly allDone: number;
  readonly all: number | undefined;
}

/** How far the slot has got, from what the store holds. */
export function progressOf(
  state: Pick<TrackerState, "keyChecks" | "checked" | "missing" | "roster" | "team" | "slot">
): Progress {
  const { keyChecks, checked, missing, roster } = state;
  const mine = roster.find(({ team, slot }) => team === state.team && slot === state.slot);
  return {
    keyDone: keyChecks === undefined ? 0 : checked.filter((id) => keyChecks.has(id)).length,
    keyAll: keyChecks?.size,
    allDone: checked.length,
    all: missing.length > 0 ? checked.length + missing.length : mine?.total,
  };
}
