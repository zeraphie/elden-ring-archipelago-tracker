/**
 * ─ Run compare ─
 *
 * How a run stands against the finished runs of its preset: the fastest gives
 * each row its difference, row by row by goal, and a row left its time. A row
 * sooner than it has ever come, in any of them, is the best of all. Rows match
 * by goal, so a goal an earlier run didn't have has nothing to compare with.
 */

import type { FinishedRun } from "../run-history.js";

/** How a row stands: ahead of the run compared with, behind it, or sooner than it has ever come. */
export type Pace = "ahead" | "behind" | "best";

/** How far a row is from the run compared with, in milliseconds, under if it's ahead, and how it stands. */
export interface RowPace {
  readonly diffMs: number;
  readonly pace: Pace;
}

/** What a run is compared with. */
export interface Comparison {
  /** When a row came in the run compared with; undefined where it didn't. */
  timeOf(key: string): number | undefined;
  /** How a row stands, at this time; undefined with nothing to compare it with. */
  paceOf(key: string, time: number): RowPace | undefined;
}

/** What a run is compared with, from the finished runs of its preset. */
export function comparisonOf(runs: readonly FinishedRun[]): Comparison {
  const fastest = runs.reduce<FinishedRun | undefined>(
    (best, run) => (best === undefined || run.timeMs < best.timeMs ? run : best),
    undefined
  );
  return {
    timeOf: (key) => fastest?.rows[key],
    paceOf: (key, time) => {
      const then = fastest?.rows[key];
      if (then === undefined) {
        return undefined;
      }
      const soonest = Math.min(...runs.flatMap(({ rows }) => rows[key] ?? []));
      const pace = time < soonest ? "best" : time < then ? "ahead" : "behind";
      return { diffMs: time - then, pace };
    },
  };
}

/** How much the latest row gained or lost on the one before it, by each row's difference in the order they came; undefined when the latest has none. */
export function previousSegment(diffs: readonly (number | undefined)[]): number | undefined {
  const latest = diffs.at(-1);
  return latest === undefined ? undefined : latest - (diffs.at(-2) ?? 0);
}
