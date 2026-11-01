/**
 * ─ Run slice ─
 *
 * The run's clock, started by hand, as the room gives no start time. It counts
 * only while the tracker's open: what's kept is the time so far and whether it
 * was running, so a tracker reopened goes on from there by itself. The time is
 * brought up to date as the page is left, so what's written is current.
 */

import type { TrackerSlice } from "../store.js";

/** Where the run stands: not started, its clock running, or paused. */
export type RunPhase = "before" | "running" | "paused";

/** The run's clock. */
export interface Run {
  readonly phase: RunPhase;
  /** The time counted up to `since`, in milliseconds. */
  readonly bankedMs: number;
  /** When it last started counting, in milliseconds since 1970; undefined unless it's running. */
  readonly since: number | undefined;
}

export interface RunSlice {
  readonly run: Run;
  /** Starts the clock, from `fromMs` for a run already under way. */
  startRun(fromMs: number): void;
  pauseRun(): void;
  resumeRun(): void;
  resetRun(): void;
  /** Brings the time up to date, and goes on counting. */
  bankRun(): void;
  /** Counts from now, for a run kept running by a tracker that's just reopened. */
  reopenRun(): void;
}

const NOT_STARTED: Run = { phase: "before", bankedMs: 0, since: undefined };

/** The run's time at `now`, both in milliseconds. */
export function runTimeOf({ bankedMs, since }: Run, now: number): number {
  return since === undefined ? bankedMs : bankedMs + Math.max(0, now - since);
}

export const createRunSlice =
  (now: () => number): TrackerSlice<RunSlice> =>
  (set) => ({
    run: NOT_STARTED,
    startRun: (fromMs) =>
      set((state) => {
        state.run = { phase: "running", bankedMs: fromMs, since: now() };
      }),
    pauseRun: () =>
      set((state) => {
        state.run = { phase: "paused", bankedMs: runTimeOf(state.run, now()), since: undefined };
      }),
    resumeRun: () =>
      set((state) => {
        state.run = { ...state.run, phase: "running", since: now() };
      }),
    resetRun: () =>
      set((state) => {
        state.run = NOT_STARTED;
      }),
    bankRun: () =>
      set((state) => {
        if (state.run.phase === "running") {
          state.run = { ...state.run, bankedMs: runTimeOf(state.run, now()), since: now() };
        }
      }),
    reopenRun: () =>
      set((state) => {
        if (state.run.phase === "running") {
          state.run = { ...state.run, since: now() };
        }
      }),
  });
