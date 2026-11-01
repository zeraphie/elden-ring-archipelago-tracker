/**
 * ─ Demo room ─
 *
 * The room a demo opens on, as archipelago.gg would give it: its checks and
 * slot_data, read out of the light form the room's data is kept in. A check's
 * name comes from the location table, by the same numbering the apworld gives
 * its locations, so the names aren't kept twice.
 */

import { LOCATION_GROUPS } from "../data/checks/location-groups.js";
import { readLocationName } from "../data/names/location-name.js";
import { SIMULATED_ITEMS } from "../state/utils/simulate.js";
import { ROOM_CHECKS, ROOM_GOAL, ROOM_LOCATIONS, ROOM_OPTIONS } from "./room-data.js";

/** The name of the demo's own slot, which the tracker opens on. */
export const DEMO_SLOT = "Tarnished";

/** Where the demo's own slot sits in the room. */
export const DEMO_PLAYER = { team: 0, player: 1 };

// The apworld numbers its locations from here, in the table's order.
const FIRST_LOCATION = 7_000_000;
// And the generator's copies from here, a whole table further on for each extra item.
const FIRST_COPY = 8_000_000;
// The apworld numbers its items from here; the room's are counted from it, though not in its order.
const FIRST_ITEM = 69_000;

const LOCATIONS = [...LOCATION_GROUPS.keys()];

/** Every item the room can hold, by id, as the Elden Ring data package gives them: what Simulate gives, and each check's own item in the unrandomised game. */
export function demoItemNames(): ReadonlyMap<number, string> {
  const own = [...demoLocationNames().values()].flatMap(
    (name) => readLocationName(name)?.vanilla ?? []
  );
  return new Map(
    [...new Set([...SIMULATED_ITEMS, ...own])].map((name, i) => [FIRST_ITEM + i, name] as const)
  );
}

/** Every check in the room's name, by id, as the Elden Ring data package gives them. */
export function demoLocationNames(): ReadonlyMap<number, string> {
  return new Map(
    ROOM_CHECKS.flatMap(([first, count]) =>
      Array.from({ length: count }, (_, i) => [first + i, locationName(first + i)] as const)
    )
  );
}

/** The demo's slot_data, in the shape the apworld writes it, as far as the tracker reads it. */
export function demoSlotData(): Readonly<Record<string, unknown>> {
  const names = [...demoLocationNames()];
  return {
    options: {
      ...ROOM_OPTIONS,
      ...Object.fromEntries(
        Object.entries(ROOM_LOCATIONS).map(([name, indices]) => [name, indices.map(nameAt)])
      ),
    },
    goal: ROOM_GOAL,
    slot: DEMO_SLOT,
    locationIdsToKeys: Object.fromEntries(
      ROOM_CHECKS.flatMap(([first, count, tile]) =>
        Array.from({ length: count }, (_, i) => [first + i, tile === "" ? "" : `${tile},`] as const)
      )
    ),
    duplicatedLocations: Object.fromEntries(
      names
        .filter(([id]) => id >= FIRST_COPY)
        .map(([id, name]) => [name, nameAt((id - FIRST_COPY) % LOCATIONS.length)])
    ),
  };
}

// A location's name, by its id: a copy's names the spot it copies, and which extra item it is.
function locationName(id: number): string {
  if (id < FIRST_COPY) {
    return nameAt(id - FIRST_LOCATION);
  }
  const offset = id - FIRST_COPY;
  const extra = Math.floor(offset / LOCATIONS.length);
  return `${nameAt(offset % LOCATIONS.length)}, extra item ${extra}`;
}

function nameAt(index: number): string {
  return LOCATIONS[index] ?? "";
}
