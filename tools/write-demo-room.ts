/**
 * ─ Write demo room ─
 *
 * Reads a test seed's decoded multidata and writes src/demo/room-data.ts: what
 * the tracker reads of its Elden Ring slot, kept light, as a demo loads it on
 * the built site. Each list of locations becomes indices into the location
 * table, and the checks become runs of neighbouring ids on one tile. It reads
 * slot_data alone, never what the seed placed. Run it as
 * `bun run demo-room <path to multidata.json>`.
 */

import { $ } from "bun";
import { ELDEN_RING } from "../src/archipelago/look-up.js";
import { isRecord } from "../src/archipelago/web-responses.js";
import { LOCATION_GROUPS } from "../src/data/checks/location-groups.js";
import { tileOf } from "../src/data/checks/map-tiles.js";
import { APWORLD_LICENCE } from "./apworld-source.js";

/** A run of checks: the first id, how many ids follow on from it, and their tile, or "" off the map. */
export type CheckRun = readonly [first: number, count: number, tile: string];

/** What the demo keeps of a seed's Elden Ring slot. */
export interface DemoRoom {
  readonly options: Readonly<Record<string, unknown>>;
  /** The options that list locations, as indices into the location table. */
  readonly locations: Readonly<Record<string, readonly number[]>>;
  readonly goal: readonly number[];
  readonly checks: readonly CheckRun[];
}

const OUTPUT = "src/demo/room-data.ts";
// The options that list locations, the longest by far.
const LOCATION_LISTS = ["exclude_locations", "priority_location_groups"];
// The next longest, a list of items that nothing here reads.
const UNREAD = ["local_item_only"];

/**
 * What the demo keeps of the Elden Ring slot in a decoded multidata, by the location table's order.
 *
 * @throws Error for a multidata with no Elden Ring slot, or a location the table doesn't name.
 */
export function demoRoomFrom(multidata: unknown, locations: readonly string[]): DemoRoom {
  const slot = eldenRingSlot(multidata);
  const { options, goal, locationIdsToKeys } = slot;
  if (!isRecord(options) || !Array.isArray(goal) || !isRecord(locationIdsToKeys)) {
    throw new Error("The Elden Ring slot's slot_data isn't in the shape the demo reads.");
  }
  const indexOf = new Map(locations.map((name, index) => [name, index]));
  const indices = (names: unknown): number[] =>
    (Array.isArray(names) ? names : []).map((name: string) => {
      const index = indexOf.get(name);
      if (index === undefined) {
        throw new Error(`The location table has no "${name}".`);
      }
      return index;
    });
  return {
    options: Object.fromEntries(
      Object.entries(options).filter(
        ([name]) => !UNREAD.includes(name) && !LOCATION_LISTS.includes(name)
      )
    ),
    locations: Object.fromEntries(LOCATION_LISTS.map((name) => [name, indices(options[name])])),
    goal: goal as readonly number[],
    checks: runsOf(locationIdsToKeys as Readonly<Record<string, string>>),
  };
}

/** The source of src/demo/room-data.ts for this room. */
export function demoRoomModule({ options, locations, goal, checks }: DemoRoom): string {
  return `/*! A test seed's options and checks, generated on the Elden Ring apworld 0.1.4 and never played. Its location names are the apworld's, ${APWORLD_LICENCE} */

// Written by tools/write-demo-room.ts from the seed's multidata: run \`bun run demo-room\` again rather than editing it.

/** A run of checks: the first id, how many ids follow on from it, and their tile, or "" off the map. */
export type CheckRun = readonly [first: number, count: number, tile: string];

/** The room's options, as slot_data gives them, but for those that list locations. */
export const ROOM_OPTIONS: Readonly<Record<string, unknown>> = ${JSON.stringify(options)};

/** The options that list locations, as indices into the location table. */
export const ROOM_LOCATIONS: Readonly<Record<string, readonly number[]>> = ${JSON.stringify(locations)};

/** The room's goal bosses, by the flag the game sets when each is defeated. */
export const ROOM_GOAL: readonly number[] = ${JSON.stringify(goal)};

/** Every check in the room, in order of id. */
export const ROOM_CHECKS: readonly CheckRun[] = ${JSON.stringify(checks)};
`;
}

// The slot_data of the seed's Elden Ring slot.
function eldenRingSlot(multidata: unknown): Readonly<Record<string, unknown>> {
  const { slot_info: info, slot_data: slots } = isRecord(multidata)
    ? multidata
    : { slot_info: undefined, slot_data: undefined };
  const [player] =
    Object.entries(isRecord(info) ? info : {}).find(
      ([, slot]) => Array.isArray(slot) && slot[1] === ELDEN_RING
    ) ?? [];
  const slot = player !== undefined && isRecord(slots) ? slots[player] : undefined;
  if (!isRecord(slot)) {
    throw new Error("That multidata has no Elden Ring slot.");
  }
  return slot;
}

// Neighbouring ids on one tile as one run; a key off the open-world map has no tile to keep.
function runsOf(keys: Readonly<Record<string, string>>): CheckRun[] {
  const ordered = Object.entries(keys)
    .map(([id, key]) => [Number(id), key] as const)
    .sort(([a], [b]) => a - b);
  const runs: [number, number, string][] = [];
  for (const [id, key] of ordered) {
    const tile = tileOf(key) === undefined ? "" : key.slice(0, key.indexOf(","));
    const last = runs.at(-1);
    if (last !== undefined && last[2] === tile && last[0] + last[1] === id) {
      last[1] += 1;
    } else {
      runs.push([id, 1, tile]);
    }
  }
  return runs;
}

if (import.meta.main) {
  const [path] = process.argv.slice(2);
  if (path === undefined) {
    console.error("Usage: bun run demo-room <path to multidata.json>");
    process.exit(1);
  }
  const room = demoRoomFrom(await Bun.file(path).json(), [...LOCATION_GROUPS.keys()]);
  await Bun.write(OUTPUT, demoRoomModule(room));
  // Formatted as written, so the file in the repo is exactly this tool's.
  await $`oxfmt ${OUTPUT}`.quiet();
  console.log(`Wrote ${OUTPUT}: ${room.checks.length} runs of checks.`);
}
