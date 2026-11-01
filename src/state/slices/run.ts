/**
 * ─ Run slice ─
 *
 * The run's clock, started by hand, as the room gives no start time. It counts
 * only while the tracker's open: what's kept is the time so far and whether it
 * was running, so a tracker reopened goes on from there by itself. The time is
 * brought up to date as the page is left, so what's written is current. While
 * it's under way, it keeps its time as each check is made and each item comes
 * while the tracker watches, which is what times the goal's rows. Reaching the
 * goal finishes it.
 */

import type { TrackerSlice, TrackerState } from "../store.js";

/** Where the run stands: not started, its clock running, paused, or finished by reaching the goal. */
export type RunPhase = "before" | "running" | "paused" | "finished";

/** The run's clock. */
export interface Run {
  readonly phase: RunPhase;
  /** The time counted up to `since`, in milliseconds. */
  readonly bankedMs: number;
  /** When it last started counting, in milliseconds since 1970; undefined unless it's running. */
  readonly since: number | undefined;
  /** The run's time as each check was made, by its id, for those the tracker saw made. */
  readonly checkTimes: Readonly<Record<number, number>>;
  /** The run's time as each item came, by its place in the items received, for those the tracker saw come. */
  readonly itemTimes: Readonly<Record<number, number>>;
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
  /** Stops the clock for good, the goal reached. */
  endRun(): void;
  /** Keeps the run's time for the checks and items new since `before`, while it's under way. */
  stampArrivals(before: Pick<TrackerState, "checked" | "received">): void;
}

const NOT_STARTED: Run = {
  phase: "before",
  bankedMs: 0,
  since: undefined,
  checkTimes: {},
  itemTimes: {},
};

/** The run's time at `now`, both in milliseconds. */
export function runTimeOf({ bankedMs, since }: Run, now: number): number {
  return since === undefined ? bankedMs : bankedMs + Math.max(0, now - since);
}

const isUnderWay = ({ phase }: Run): boolean => phase === "running" || phase === "paused";

export const createRunSlice =
  (now: () => number): TrackerSlice<RunSlice> =>
  (set) => ({
    run: NOT_STARTED,
    startRun: (fromMs) =>
      set((state) => {
        state.run = { ...NOT_STARTED, phase: "running", bankedMs: fromMs, since: now() };
      }),
    pauseRun: () =>
      set((state) => {
        state.run = {
          ...state.run,
          phase: "paused",
          bankedMs: runTimeOf(state.run, now()),
          since: undefined,
        };
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
        // What's kept may be older than the times, so it's laid over a run with none.
        state.run = { ...NOT_STARTED, ...state.run };
        if (state.run.phase === "running") {
          state.run.since = now();
        }
      }),
    endRun: () =>
      set((state) => {
        if (isUnderWay(state.run)) {
          state.run = {
            ...state.run,
            phase: "finished",
            bankedMs: runTimeOf(state.run, now()),
            since: undefined,
          };
        }
      }),
    stampArrivals: ({ checked, received }) =>
      set((state) => {
        if (!isUnderWay(state.run)) {
          return;
        }
        const time = runTimeOf(state.run, now());
        const known = new Set(checked);
        for (const id of state.checked) {
          if (!known.has(id)) {
            state.run.checkTimes[id] = time;
          }
        }
        for (let place = received.length; place < state.received.length; place += 1) {
          state.run.itemTimes[place] = time;
        }
      }),
  });
