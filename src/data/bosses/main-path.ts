/**
 * ─ Main path ─
 *
 * What the goal menu shows standing between the player and the goal: the
 * main path's gates, not every rule on the way. Those are the items it waits
 * on, as items or as a count of them, and the bosses whose arenas bar it. The
 * apworld's default settings make no boss a rule, so the bosses are a list of
 * our own; whether one stands in a goal boss's way is the region graph's to say.
 */

import { GREAT_RUNE_NAMES } from "../rules/gates/key-rules.js";
import type { Need } from "../rules/rules.js";
import { BOSSES, type Boss } from "./bosses.js";

// The items the main path waits on, and the shards a room can split two of them into.
const MAIN_PATH_ITEMS: ReadonlySet<string> = new Set([
  ...GREAT_RUNE_NAMES,
  "Dectus Medallion (Left)",
  "Dectus Medallion (Right)",
  "Rold Medallion",
  "Rold Medallion Shard",
  "Messmer's Kindling",
  "Messmer's Kindling Shard",
]);

// The Draconic Tree Sentinel at the capital's gate, by its defeat flag. bosses.py marks it
// missable "for now" and comments its drops out, so it's no goal boss and its drops are named here.
const DRACONIC_TREE_SENTINEL: readonly [number, Boss] = [
  1045520800,
  {
    name: "Draconic Tree Sentinel",
    where: "CO",
    drops: [
      "CO: Dragon Greatclaw - capital great rune gate boss drop",
      "CO: Dragonclaw Shield - capital great rune gate boss drop",
    ],
  },
];

// The main path's other bosses, by defeat flag, in the order it meets them: Godfrey's golden
// shade, Morgott, the Fire Giant, the Godskin Duo, Maliketh, Sir Gideon Ofnir and Hoarah Loux;
// then the DLC's Starscourge Radahn and Mohg, for the way in, and Romina.
const GOAL_BOSS_FLAGS = [
  11000850, 11000800, 1252520800, 13000850, 13000800, 11050850, 11050800, 1252380800, 12050800,
  2044450800,
];

/** The bosses whose arenas bar the main path, by defeat flag, in the order it meets them. */
export const MAIN_PATH_BOSSES: ReadonlyMap<number, Boss> = new Map([
  DRACONIC_TREE_SENTINEL,
  ...GOAL_BOSS_FLAGS.flatMap((flag) => {
    const boss = BOSSES.get(flag);
    return boss === undefined ? [] : [[flag, boss] as const];
  }),
]);

/** Whether a need is one of the items the main path waits on: one of them, a count of nothing else, or a choice of nothing else. */
export function isMainPathItemNeed(need: Need): boolean {
  switch (need.kind) {
    case "item":
      return MAIN_PATH_ITEMS.has(need.item);
    case "count":
      return need.items.length > 0 && need.items.every((name) => MAIN_PATH_ITEMS.has(name));
    case "all":
    case "any":
      return need.needs.every(isMainPathItemNeed);
    default:
      return false;
  }
}
