// Shared by the state tests: storage in memory that answers later, as IndexedDB
// does, and a tracker store once it has loaded what that storage kept.
import type { StateStorage } from "zustand/middleware";
import type { RoomLink } from "../../src/archipelago/room-link.js";
import {
  createTrackerStore,
  type TrackerStore,
  type TrackerStoreOptions,
} from "../../src/state/store.js";

/** Storage in memory, in IndexedDB's place, with what it holds open to look at. */
export function memory(): StateStorage & { readonly items: Map<string, string> } {
  const items = new Map<string, string>();
  return {
    items,
    getItem: (key) => Promise.resolve(items.get(key) ?? null),
    setItem: (key, value) => {
      items.set(key, value);
      return Promise.resolve();
    },
    removeItem: (key) => {
      items.delete(key);
      return Promise.resolve();
    },
  };
}

/** A store for a room, by its id or its link, once it has loaded what its storage kept. */
export function loaded(
  room: string | RoomLink,
  options: TrackerStoreOptions
): Promise<TrackerStore> {
  const link: RoomLink = typeof room === "string" ? { kind: "room", room } : room;
  return new Promise((resolve) => {
    const store = createTrackerStore(link, { ...options, onLoaded: () => resolve(store) });
  });
}
