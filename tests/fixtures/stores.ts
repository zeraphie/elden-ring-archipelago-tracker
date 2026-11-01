// Shared by the state tests: storage in memory that answers later, as IndexedDB
// does, and a tracker store once it has loaded what that storage kept.
import type { RoomLink } from "../../src/archipelago/room-link.js";
import {
  createTrackerStore,
  type TrackerStore,
  type TrackerStoreOptions,
} from "../../src/state/store.js";

export { memoryStorage as memory } from "../../src/storage/memory.js";

/** A store for a room, by its id or its link, once it has loaded what its storage kept. */
export function loaded(
  room: string | RoomLink,
  options: TrackerStoreOptions
): Promise<TrackerStore> {
  const link: RoomLink = typeof room === "string" ? { kind: "room", room } : room;
  return new Promise((resolve) => {
    const store = createTrackerStore(link, {
      // Kept at once, as a test has no room to go quiet.
      quiet: { timer: (run) => run() },
      ...options,
      onLoaded: () => resolve(store),
    });
  });
}
