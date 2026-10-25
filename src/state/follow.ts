/**
 * ─ Follow ─
 *
 * Joins what follows a room to its store. The room's watch hands in its live
 * events and its phase; the web API's poll hands in the history, every minute.
 * From a tracker link, the poll is all there is, so its phase is the store's
 * connection too. Either way, once archipelago.gg no longer has the room, what
 * this device kept for it is cleared.
 */

import { RoomWatch, type RoomWatchOptions } from "../archipelago/room-watch.js";
import { TrackerPoll, type TrackerPollOptions } from "../archipelago/tracker-poll.js";
import type { ConnectionPhase } from "./slices/connection.js";
import type { TrackerStore } from "./store.js";

/** Follows a room's websocket into its store. Returns the watch, to stop or to say through. */
export function follow(
  store: TrackerStore,
  options: Omit<RoomWatchOptions, "onEvent" | "onPhase">
): RoomWatch {
  const watch = new RoomWatch({
    ...options,
    onEvent: (event) => store.getState().take(event),
    onPhase: (phase) => keep(store, phase),
  });
  watch.start();
  return watch;
}

/**
 * Follows a room's history on the web API into its store, every minute. With
 * `isAll`, as for a tracker link alone, its phase is the store's connection.
 */
export function followHistory(
  store: TrackerStore,
  options: Omit<TrackerPollOptions, "onHistory" | "onPhase">,
  isAll = false
): TrackerPoll {
  const poll = new TrackerPoll({
    ...options,
    onHistory: (history) => store.getState().takeHistory(history),
    onPhase: isAll ? (phase) => keep(store, phase) : undefined,
  });
  poll.start();
  return poll;
}

// The phase kept as the connection; a room that's gone has what was kept cleared, after the last write.
function keep(store: TrackerStore, phase: ConnectionPhase): void {
  store.getState().setConnection(phase);
  if (phase.phase === "gone") {
    void store.persist.clearStorage();
  }
}
