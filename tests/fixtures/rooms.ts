// Shared by the rules tests: a room's options, what its items reach, what a
// region or location still needs in needs()' own shapes, and the names a rule
// holds.
import { expect } from "bun:test";
import { ARENA_DROPS } from "../../src/data/bosses/bosses.js";
import type { RoomReach } from "../../src/data/rules/area-status.js";
import type { ForcedBosses } from "../../src/data/rules/gates/boss-gates.js";
import { reach, type WorldRules } from "../../src/data/rules/reachability.js";
import { regionGraph } from "../../src/data/rules/regions/region-graph.js";
import { namesIn, needs, type Need } from "../../src/data/rules/rules.js";
import { worldRules, type WorldRuleOptions } from "../../src/data/rules/world-rules.js";

export { namesIn };

/** A room's options, with slot_data's forceBosses when a test moves Rykard or the serpent. */
export type Options = WorldRuleOptions &
  Readonly<Record<string, unknown>> & { readonly forceBosses?: ForcedBosses };

/** Items received: a name on its own is one of it. */
export type Items = (string | [string, number])[];

/** The game's id for the boss whose defeat drops this location, as forceBosses names arenas. */
export function arenaDropping(drop: string): number {
  const [id] = [...ARENA_DROPS].find(([, drops]) => drops.includes(drop)) ?? [];
  if (id === undefined) {
    throw new Error(`No boss drops ${drop}`);
  }
  return id;
}

export function rulesOf(options: Options): WorldRules {
  return worldRules(options, options.forceBosses);
}

/** A room's graph, rules and what these items reach in it, as area status reads them. */
export function roomReach(options: Options, ...items: Items): RoomReach {
  const counts = new Map(items.map((item) => (typeof item === "string" ? [item, 1] : item)));
  const graph = regionGraph(options);
  const rules = rulesOf(options);
  return { graph, rules, reached: reach(graph, rules, counts, options) };
}

/** Ten of every item a room's rules name, enough for any count they ask for. */
export function everyItem(options: Options): [string, number][] {
  const rules = rulesOf(options);
  const items = [...rules.entrances.values(), ...rules.locations.values()].flatMap(
    (rule) => namesIn(rule).items
  );
  return [...new Set(items)].map((name) => [name, 10]);
}

export function reached(options: Options, ...items: Items) {
  return roomReach(options, ...items).reached;
}

export function opens(region: string, options: Options, ...items: Items): boolean {
  return reached(options, ...items).regions.has(region);
}

/** What a region's way in still needs, in the state these items reach. */
export function needsFor(region: string, options: Options, ...items: Items): Need | undefined {
  const rule = rulesOf(options).entrances.get(region);
  return rule && needs(rule, reached(options, ...items).state);
}

export const item = (name: string): Need => ({ kind: "item", item: name });
export const area = (name: string): Need => ({ kind: "area", area: name });
export const location = (name: string): Need => ({ kind: "location", location: name });
/** A count need as a test expects it, by its label and tally; the items it counts are the rules' own test's to check. */
export const count = (label: string, have: number, needed: number): Need =>
  expect.objectContaining({ kind: "count", label, have, needs: needed });
export const all = (...parts: Need[]): Need => ({ kind: "all", needs: parts });
export const any = (...parts: Need[]): Need => ({ kind: "any", needs: parts });
