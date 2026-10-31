/*! The key rules follow the Elden Ring apworld 0.1.4's _has_key_or_shards and _has_enough_great_runes, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

/**
 * ─ Key rules ─
 *
 * The rules for keys a room can split into shards, and for great runes, which
 * the base game's rules and the DLC's both ask for.
 */

import { item, type Rule, type Weighted } from "../rules.js";

/** The options these rules read, with the apworld's names. */
export interface KeyRuleOptions {
  /** For each key that can be split up, how many shards there are and how many are needed. */
  readonly key_item_shards: Readonly<
    Record<string, { readonly Req: number; readonly Max: number }>
  >;
  /** -1 for the Rold Medallion, or how many great runes stand in for it. */
  readonly great_runes_required_mountain: number;
}

/** The great runes a count of them counts, by name. */
export const GREAT_RUNE_NAMES: readonly string[] = [
  "Godrick's Great Rune",
  "Rykard's Great Rune",
  "Radahn's Great Rune",
  "Morgott's Great Rune",
  "Mohg's Great Rune",
  "Malenia's Great Rune",
  "Great Rune of the Unborn",
];

const GREAT_RUNES: readonly Weighted[] = GREAT_RUNE_NAMES.map((item) => ({ item, weight: 1 }));

// The keys a room can split into shards, by the option that splits them: the apworld's shard_list.
const SHARD_OPTIONS: Readonly<Record<string, string>> = {
  "Rusty Key": "RustyKeyShards",
  "Rold Medallion": "RoldMedallionShards",
  "Messmer's Kindling": "MessmerKindlingShards",
};

/** A rule that holds once this many great runes are received. */
export function greatRunes(needs: number): Rule {
  return { kind: "count", label: "Great Runes", items: GREAT_RUNES, needs };
}

/**
 * The apworld's _has_key_or_shards: the key's shards when the room splits it,
 * for the Rold Medallion the great runes a room can set in its place, or else
 * the key itself.
 */
export function keyOrShards(key: string, options: KeyRuleOptions): Rule {
  const shards = options.key_item_shards[SHARD_OPTIONS[key] ?? ""];
  if (shards !== undefined && shards.Max > 1) {
    return {
      kind: "count",
      label: `${key} Shards`,
      items: [{ item: `${key} Shard`, weight: 1 }],
      needs: Math.min(shards.Req, shards.Max),
    };
  }
  if (key === "Rold Medallion" && options.great_runes_required_mountain !== -1) {
    return greatRunes(options.great_runes_required_mountain);
  }
  return item(key);
}
