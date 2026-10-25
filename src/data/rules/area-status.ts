/**
 * ─ Area status ─
 *
 * How each region of a room stands for the player: locked until its way in
 * opens, open, or done once every key check in it is checked. What stands in
 * the way is every rule not yet met on the way in from the nearest region
 * reached, so Leyndell names the Dectus halves as well as its great runes. A
 * boss, or any location, stands as its region does, with its own rule too. A
 * generator's extra copy of a spot is the spot, as the apworld places it.
 */

import { withoutExtra } from "../names/location-name.js";
import type { Reach, WorldRules } from "./reachability.js";
import type { RegionGraph } from "./regions/region-graph.js";
import { needs, type Need } from "./rules.js";

/** A room as area status reads it: its graph, its rules, and what its items reach. */
export interface RoomReach {
  readonly graph: RegionGraph;
  readonly rules: WorldRules;
  readonly reached: Reach;
}

/** How a region stands: locked, open, or done once every key check in it is checked. */
export type AreaState = "locked" | "open" | "done";

/** How a region stands, what stands in its way, and how many of its key checks are checked. */
export interface AreaStatus {
  readonly state: AreaState;
  /** What stands between the player and the region; undefined once it's reached. */
  readonly needs: Need | undefined;
  readonly keyChecks: number;
  readonly checked: number;
}

/**
 * How each region of the room stands, given the names of its key checks and of
 * the checks done. A region whose every key check is checked is done, even one
 * the rules hold locked. A key check the apworld doesn't list is left out.
 */
export function areaStatuses(
  room: RoomReach,
  keyChecks: Iterable<string>,
  checked: ReadonlySet<string>
): Map<string, AreaStatus> {
  const counts = new Map<string, { keyChecks: number; checked: number }>();
  for (const name of keyChecks) {
    const region = room.rules.regionOf(withoutExtra(name).base);
    if (region !== undefined) {
      const count = counts.get(region) ?? { keyChecks: 0, checked: 0 };
      counts.set(region, {
        keyChecks: count.keyChecks + 1,
        checked: count.checked + (checked.has(name) ? 1 : 0),
      });
    }
  }
  const statuses = new Map<string, AreaStatus>();
  for (const region of room.graph.regions) {
    const count = counts.get(region) ?? { keyChecks: 0, checked: 0 };
    const need = regionNeeds(region, room);
    const isDone = count.keyChecks > 0 && count.checked === count.keyChecks;
    const state: AreaState = isDone ? "done" : need === undefined ? "open" : "locked";
    statuses.set(region, { state, needs: need, ...count });
  }
  return statuses;
}

/** What stands between the player and a region: each unmet rule on its way in; undefined once it's reached. */
export function regionNeeds(region: string, room: RoomReach): Need | undefined {
  return joined(wayIn(region, room));
}

/**
 * What stands between the player and a location: its region's way in and its
 * own rule; undefined once it can be got, or for a name the apworld doesn't list.
 */
export function locationNeeds(location: string, room: RoomReach): Need | undefined {
  const spot = withoutExtra(location).base;
  const region = room.rules.regionOf(spot);
  if (region === undefined || room.reached.canGet(spot)) {
    return undefined;
  }
  const rule = room.rules.locations.get(spot);
  return joined([...wayIn(region, room), ...leaves(rule && needs(rule, room.reached.state))]);
}

/** What stands between the player and a boss, given its drops in the room; undefined once one can be got. */
export function bossNeeds(drops: readonly string[], room: RoomReach): Need | undefined {
  const [first] = drops;
  if (first === undefined || drops.some((drop) => room.reached.canGet(withoutExtra(drop).base))) {
    return undefined;
  }
  return locationNeeds(first, room);
}

/** A region and each region on the way to it, back to the start: the way in the graph walks, each region entered from one other. */
export function regionsOnTheWay(region: string, graph: RegionGraph): string[] {
  const parents = new Map<string, string>();
  for (const [from, exits] of graph.exits) {
    for (const to of exits) {
      parents.set(to, from);
    }
  }
  const way: string[] = [];
  for (let at: string | undefined = region; at !== undefined && !way.includes(at);) {
    way.push(at);
    at = parents.get(at);
  }
  return way;
}

// Each unmet rule on the way into a region, the ones nearest the regions reached first.
function wayIn(region: string, room: RoomReach): Need[] {
  const parts: Need[][] = [];
  for (const at of regionsOnTheWay(region, room.graph)) {
    if (room.reached.regions.has(at)) {
      break;
    }
    const rule = room.rules.entrances.get(at);
    parts.unshift(leaves(rule && needs(rule, room.reached.state)));
  }
  return parts.flat();
}

// A need's parts that must all be met: an "all" opened up, anything else as it is.
function leaves(need: Need | undefined): Need[] {
  if (need === undefined) {
    return [];
  }
  return need.kind === "all" ? need.needs.flatMap(leaves) : [need];
}

// Needs joined into one, each counted once.
function joined(parts: readonly Need[]): Need | undefined {
  const unique = parts.filter(
    (part, i) => parts.findIndex((other) => JSON.stringify(other) === JSON.stringify(part)) === i
  );
  const [only, ...others] = unique;
  return others.length === 0 ? only : { kind: "all", needs: unique };
}
