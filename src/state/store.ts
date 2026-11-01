/**
 * ─ Tracker store ─
 *
 * One store for what the tracker knows of a room, made of seven slices: the
 * connection, the seed's names and options, the slot's standing, the items
 * received and sent, the log, the roster of every slot, and the run's clock. A live event goes to the slices it changes, the
 * latest word replacing what was held; the web API's history fills in what
 * the websocket didn't see, and never overrules it. The run keeps its time for
 * what a live message brings, and what a poll after the first finds, never for
 * what a login or a first history tells of. What persists is what's
 * stamped, the items and the whole log, with the run's clock, per room in the
 * tracker's database, written once the room goes quiet; the password is never
 * part of it. The
 * store says when it has loaded, so the socket opens only onto a store that's
 * ready.
 */

import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
  type StateStorage,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createStore, type Mutate, type StateCreator, type StoreApi } from "zustand/vanilla";
import type { LiveEvent } from "../archipelago/live-events.js";
import type { RoomLink } from "../archipelago/room-link.js";
import type { History } from "../archipelago/tracker-poll.js";
import { isRecord } from "../archipelago/web-responses.js";
import { stateStorage } from "../storage/db.js";
import { createConnectionSlice, type ConnectionSlice } from "./slices/connection.js";
import { createItemsSlice, type ItemsSlice } from "./slices/items.js";
import { createLogSlice, type LogSlice } from "./slices/log.js";
import { createRosterSlice, type RosterSlice } from "./slices/roster.js";
import { createRunSlice, type RunSlice } from "./slices/run.js";
import { createSeedSlice, type SeedSlice } from "./slices/seed.js";
import { createStandingSlice, type StandingSlice } from "./slices/standing.js";
import { quietStorage, type QuietOptions } from "./utils/quiet-storage.js";

/** What the tracker knows of a room, and the ways the room's word comes in. */
export type TrackerState = ConnectionSlice &
  SeedSlice &
  StandingSlice &
  ItemsSlice &
  LogSlice &
  RosterSlice &
  RunSlice & {
    /** Takes a live event into the slices it changes. */
    take(event: LiveEvent): void;
    /** Takes the web API's history, filling in what the websocket didn't see. */
    takeHistory(history: History): void;
  };

// The store's middleware, outermost first: subscribing by selector, persisting, and immer's drafts.
type Middleware = [
  ["zustand/subscribeWithSelector", never],
  ["zustand/persist", unknown],
  ["zustand/immer", never],
];

/** How a slice of the tracker's store is made, under its middleware. */
export type TrackerSlice<T> = StateCreator<TrackerState, Middleware, [], T>;

/** A tracker store: subscribed to by selector, with zustand's persist controls, such as clearing what it kept. */
export type TrackerStore = Mutate<StoreApi<TrackerState>, Middleware>;

/** What a tracker store can be handed: a clock, where to keep a room, and who to tell once it's loaded. */
export interface TrackerStoreOptions {
  readonly now?: () => number;
  /** The tracker's database when left out. */
  readonly storage?: StateStorage;
  /** Called once what this device kept has loaded, or failed to, with the error, and the store carries on empty. */
  readonly onLoaded?: (error?: unknown) => void;
  /** How what's kept waits to be written; the browser's own timer and page events when left out. */
  readonly quiet?: QuietOptions;
}

/**
 * A store for one room, by the link it was opened from, its stamped items and
 * its whole log kept on this device from one visit to the next. A tracker link
 * has no room id, so what it keeps is kept under the tracker's.
 */
export function createTrackerStore(
  link: RoomLink,
  { now = Date.now, storage = stateStorage, onLoaded, quiet }: TrackerStoreOptions = {}
): TrackerStore {
  const kept = createJSONStorage(() => storage);
  const store: TrackerStore = createStore<TrackerState>()(
    subscribeWithSelector(
      persist(
        immer((...slice) => ({
          ...createConnectionSlice(link)(...slice),
          ...createSeedSlice(...slice),
          ...createStandingSlice(...slice),
          ...createItemsSlice(now)(...slice),
          ...createLogSlice(now)(...slice),
          ...createRosterSlice(...slice),
          ...createRunSlice(now)(...slice),
          take: (event) => {
            const before = slice[1]();
            const { takeStanding, takeSlotData, takeItems, takeSent, takeMessage, markGoal } =
              before;
            switch (event.kind) {
              case "connected":
                takeStanding(event);
                if (isRecord(event.connected.slot_data)) {
                  takeSlotData(event.connected.slot_data);
                }
                return;
              case "room update":
                takeStanding(event);
                before.stampArrivals(before);
                return;
              case "items received":
                takeItems(event);
                if (!event.isWholeList) {
                  before.stampArrivals(before);
                }
                return;
              default:
                takeMessage(event);
                if (event.kind === "item sent") {
                  takeSent(event);
                }
                if (event.kind === "goal") {
                  markGoal(event.team, event.slot);
                }
            }
          },
          takeHistory: (history) => {
            const before = slice[1]();
            before.takeItemHistory(history);
            before.takeCheckHistory(history);
            before.takeRoster(history);
            if (before.hasPolled) {
              before.stampArrivals(before);
            }
          },
        })),
        {
          name: keptName(link),
          version: 1,
          storage:
            kept &&
            quietStorage(kept, { ...quiet, beforeLeaving: () => store.getState().bankRun() }),
          partialize: ({ received, sent, log, run }) => ({
            received,
            sent,
            log,
            run: { ...run, since: undefined },
          }),
          onRehydrateStorage: () => (state, error) => {
            state?.reopenRun();
            onLoaded?.(error);
          },
        }
      )
    )
  );
  return store;
}

/** Clears what this device kept for a room, by the link it was opened from, as when archipelago.gg no longer has it. */
export async function forgetKept(
  link: RoomLink,
  storage: StateStorage = stateStorage
): Promise<void> {
  await storage.removeItem(keptName(link));
}

// The name a room is kept under on this device.
function keptName(link: RoomLink): string {
  return link.kind === "room" ? `room:${link.room}` : `tracker:${link.tracker}`;
}
