/**
 * ─ Tracker poll ─
 *
 * A room's history from the web API, asked again every minute, as long as
 * /api/tracker caches its answer: what each slot has received and checked,
 * its status and its hints. The static tracker and slot_data don't change, so
 * they're asked once, or not at all when looking the room up already has. Slot names come from Elden Ring's slot_data, which
 * carries each slot's name, then from room_status when the room is known.
 * Alone, from a tracker link, it's the reduced tracker; with a room, it fills
 * in what the websocket doesn't say.
 */

import { getSlotData, getStaticTracker, getTracker, type Fetcher } from "./web-api.js";
import {
  WebApiError,
  type SlotData,
  type StaticTracker,
  type TrackerData,
} from "./web-responses.js";

/** What the web API says of a room so far: its tracker, its static tracker, and the slot names known, by slot. */
export interface History {
  readonly tracker: TrackerData;
  readonly statics: StaticTracker;
  readonly names: ReadonlyMap<number, string>;
}

/** What a tracker link alone can't give without the room's websocket, as the person is told. */
export const WEB_ONLY_UNAVAILABLE = ["live checks", "item toasts", "chat", "!hint"] as const;

/** Where following a room on the web API alone stands. */
export type PollPhase =
  | { readonly phase: "web only"; readonly unavailable: readonly string[] }
  /** archipelago.gg didn't answer; asked again shortly. */
  | { readonly phase: "unreachable" }
  /** archipelago.gg no longer has the tracker. */
  | { readonly phase: "gone" };

/** What polling a room's history needs: its tracker, where to tell, and the ways to ask and wait. */
export interface TrackerPollOptions {
  readonly tracker: string;
  /** room_status's names, by slot, when the room is known. */
  readonly names?: ReadonlyMap<number, string>;
  /** The static tracker, when it's already been asked. */
  readonly statics?: StaticTracker;
  /** Every slot's slot_data, when it's already been asked. */
  readonly slots?: readonly SlotData[];
  readonly onHistory: (history: History) => void;
  readonly onPhase?: (phase: PollPhase) => void;
  readonly fetcher?: Fetcher;
  /** Runs a callback after a while: setTimeout, or a test's own. */
  readonly timer?: (callback: () => void, ms: number) => unknown;
}

// As long as /api/tracker caches its answer.
const EVERY_MS = 60_000;
// How long after archipelago.gg didn't answer.
const RETRY_MS = 15_000;

/** A room's history, asked for every minute until stopped. */
export class TrackerPoll {
  private statics: StaticTracker | undefined;
  private names: ReadonlyMap<number, string> = new Map();
  private isStopped = false;

  constructor(private readonly options: TrackerPollOptions) {}

  start(): void {
    void this.ask();
  }

  stop(): void {
    this.isStopped = true;
  }

  private async ask(): Promise<void> {
    const { tracker, fetcher, onHistory, onPhase } = this.options;
    try {
      if (this.statics === undefined) {
        const [statics, slots] = await Promise.all([
          this.options.statics ?? getStaticTracker(tracker, fetcher),
          this.options.slots ?? getSlotData(tracker, fetcher),
        ]);
        this.statics = statics;
        this.names = new Map([...slotNames(slots), ...(this.options.names ?? [])]);
      }
      const history = {
        tracker: await getTracker(tracker, fetcher),
        statics: this.statics,
        names: this.names,
      };
      if (this.isStopped) {
        return;
      }
      onHistory(history);
      onPhase?.({ phase: "web only", unavailable: WEB_ONLY_UNAVAILABLE });
      this.later(EVERY_MS);
    } catch (error) {
      if (this.isStopped) {
        return;
      }
      if (error instanceof WebApiError && error.problem === "not found") {
        onPhase?.({ phase: "gone" });
        this.isStopped = true;
        return;
      }
      onPhase?.({ phase: "unreachable" });
      this.later(RETRY_MS);
    }
  }

  private later(ms: number): void {
    const { timer = setTimeout } = this.options;
    timer(() => {
      if (!this.isStopped) {
        void this.ask();
      }
    }, ms);
  }
}

/** Each slot's name from its slot_data, where its game writes one there, as Elden Ring does. */
export function slotNames(slots: readonly SlotData[]): Map<number, string> {
  return new Map(
    slots.flatMap(({ player, slotData }) =>
      typeof slotData.slot === "string" ? [[player, slotData.slot] as const] : []
    )
  );
}
