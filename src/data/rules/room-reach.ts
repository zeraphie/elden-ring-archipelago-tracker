/**
 * ─ Room reach ─
 *
 * A room's rules and how far the player reaches in them, for whatever reads
 * the room as a whole: the goal menu and the map. The rules and the start's
 * reach depend only on the room, so they're built once for each. The reach
 * with the items received is worked out again only for a new set of items, so
 * the menu and the map share one working out.
 */

import type { RoomReach } from "./area-status.js";
import type { ForcedBosses } from "./gates/boss-gates.js";
import { reach } from "./reachability.js";
import { regionGraph } from "./regions/region-graph.js";
import { worldRules, type WorldRuleOptions } from "./world-rules.js";

/** A room as its rules read it: its options, the bosses forced into arenas, its goal, and every check it has, by name. */
export interface Room {
  readonly options: WorldRuleOptions & Readonly<Record<string, unknown>>;
  readonly forced: ForcedBosses;
  /** The goal bosses, by defeat flag. */
  readonly goal: readonly number[];
  readonly locations: ReadonlySet<string>;
}

// Each room's rules, and what its start reaches with nothing received.
const BUILT = new WeakMap<Room, { readonly start: RoomReach }>();

// The last reach worked out, and the room and items it was for.
let last:
  | { readonly room: Room; readonly items: ReadonlyMap<string, number>; readonly now: RoomReach }
  | undefined;

/** What the room's start reaches with nothing received. */
export function startOf(room: Room): RoomReach {
  let found = BUILT.get(room);
  if (found === undefined) {
    const graph = regionGraph(room.options);
    const rules = worldRules(room.options, room.forced);
    found = { start: { graph, rules, reached: reach(graph, rules, new Map(), room.options) } };
    BUILT.set(room, found);
  }
  return found.start;
}

/** What the room reaches with these items received; the same items give the same reach back. */
export function reachOf(room: Room, items: ReadonlyMap<string, number>): RoomReach {
  if (last !== undefined && last.room === room && last.items === items) {
    return last.now;
  }
  const { graph, rules } = startOf(room);
  const now = { graph, rules, reached: reach(graph, rules, items, room.options) };
  last = { room, items, now };
  return now;
}
