/**
 * ─ World rules ─
 *
 * A room's rules, put together for the reachability engine from its options.
 * Archipelago's add_rule joins each new rule onto what an entrance or a
 * location already has, so where several rules fall on one, all of them must
 * hold.
 */

import { baseGameEntrances, type BaseGameRuleOptions } from "./gates/base-game-rules.js";
import {
  bossGateEntrances,
  bossGateLocations,
  type BossGateOptions,
  type ForcedBosses,
} from "./gates/boss-gates.js";
import { dlcEntrances, type DlcRuleOptions } from "./gates/dlc-rules.js";
import { regionOf } from "./regions/location-region.js";
import type { WorldRules } from "./reachability.js";
import { REGION_LOCK_ENTRANCES, REGION_LOCK_LOCATIONS } from "./gates/region-locks.js";
import type { Rule } from "./rules.js";

/** The options a room's rules read, with the apworld's names. */
export type WorldRuleOptions = BaseGameRuleOptions & DlcRuleOptions & BossGateOptions;

/**
 * A room's rules for its options and slot_data's forceBosses: each region's
 * way in, each location's own rule, and where each location is.
 */
export function worldRules(options: WorldRuleOptions, forced: ForcedBosses = {}): WorldRules {
  return {
    entrances: joined([
      ...REGION_LOCK_ENTRANCES,
      ...baseGameEntrances(options),
      ...dlcEntrances(options),
      ...bossGateEntrances(options),
    ]),
    locations: joined([...REGION_LOCK_LOCATIONS, ...bossGateLocations(options, forced)]),
    regionOf,
  };
}

// Each name's rules joined into one, so that all of them must hold. A rule
// added twice, as the apworld does for Rykard's drops, counts once.
function joined(rules: readonly (readonly [string, Rule])[]): Map<string, Rule> {
  const byName = new Map<string, Rule[]>();
  for (const [name, rule] of rules) {
    const parts = byName.get(name) ?? [];
    if (!parts.some((part) => JSON.stringify(part) === JSON.stringify(rule))) {
      byName.set(name, [...parts, rule]);
    }
  }
  const joinedRules = new Map<string, Rule>();
  for (const [name, parts] of byName) {
    const [only, ...others] = parts;
    joinedRules.set(
      name,
      only !== undefined && others.length === 0 ? only : { kind: "all", rules: parts }
    );
  }
  return joinedRules;
}
