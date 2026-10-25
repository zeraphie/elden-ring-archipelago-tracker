/**
 * ─ Log slice ─
 *
 * Every message the room printed, in the order it came, each stamped as it
 * arrived: items found, hints, chat, commands' answers, joins, goals and the
 * rest. All of it is kept, for as long as a run lasts.
 */

import { castDraft } from "immer";
import type { LiveEvent } from "../../archipelago/live-events.js";
import type { TrackerSlice } from "../store.js";
import type { Stamped } from "../utils/stamped.js";

/** A message the room printed: every live event but the login, the room's changes and the items received. */
export type PrintedEvent = Exclude<
  LiveEvent,
  { readonly kind: "connected" | "room update" | "items received" }
>;

export interface LogSlice {
  readonly log: readonly Stamped<PrintedEvent>[];
  /** A message the room printed, added to the log as it arrives. */
  takeMessage(event: PrintedEvent): void;
}

export const createLogSlice =
  (now: () => number): TrackerSlice<LogSlice> =>
  (set) => ({
    log: [],
    takeMessage: (event) =>
      set((state) => {
        state.log.push(castDraft({ value: event, at: now() }));
      }),
  });
