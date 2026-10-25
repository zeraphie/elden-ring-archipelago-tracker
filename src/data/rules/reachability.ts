/**
 * ─ Reachability ─
 *
 * What's reachable in a room, given what's been received: as Archipelago
 * decides it, a region is reached once a reached region leads to it and the
 * rule on its way in is met, and a location can be got once its region is
 * reached and its own rule is met. Rules can ask about other regions and
 * locations, so this grows the reached regions until a pass adds none. No
 * rule says "not", so reaching more never takes anything away.
 */

import type { RegionGraph } from "./regions/region-graph.js";
import { decide, type Rule, type RuleState } from "./rules.js";

/** A room's rules: each region's way in, each location's own rule, and where each location is. */
export interface WorldRules {
  /** The rule on the way into each region, by the region it leads to; a region without one is open. */
  readonly entrances: ReadonlyMap<string, Rule>;
  /** Each location's own rule, by name; a location without one needs only its region. */
  readonly locations: ReadonlyMap<string, Rule>;
  /** The region a location sits in, or undefined for one the room doesn't have. */
  regionOf(location: string): string | undefined;
}

/** What's reachable in a room: its regions, whether a location can be got, and the state its rules were decided in. */
export interface Reach {
  readonly regions: ReadonlySet<string>;
  canGet(location: string): boolean;
  readonly state: RuleState;
}

/** Everything reachable from the start with these items and options. */
export function reach(
  graph: RegionGraph,
  rules: WorldRules,
  items: ReadonlyMap<string, number>,
  options: Readonly<Record<string, unknown>>
): Reach {
  const regions = new Set<string>([graph.start]);
  const canGet = (location: string): boolean => {
    const region = rules.regionOf(location);
    const rule = rules.locations.get(location);
    return (
      region !== undefined && regions.has(region) && (rule === undefined || decide(rule, state))
    );
  };
  const state: RuleState = {
    items,
    options,
    canReach: (area) => regions.has(area),
    canGet,
  };
  for (let grew = true; grew;) {
    grew = false;
    // A region added during a pass is walked in the same pass, as a Set's iterator visits it.
    for (const from of regions) {
      for (const to of graph.exits.get(from) ?? []) {
        const rule = rules.entrances.get(to);
        if (!regions.has(to) && (rule === undefined || decide(rule, state))) {
          regions.add(to);
          grew = true;
        }
      }
    }
  }
  return { regions, canGet, state };
}
