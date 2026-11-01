/**
 * ─ Feed ─
 *
 * The items that moved between this slot and the others, newest last: each
 * item another player found for it, with where in their world, and each item
 * it found for another player, with the check it was in. Items it found for
 * itself are its checks' own, and aren't here. Each item is named by its own
 * game's data package, and a player by the roster; one the tracker saw come
 * before it was watching has no time, and comes first.
 */

import { ELDEN_RING } from "../../archipelago/look-up.js";
import type { KeySpot } from "../../data/names/key-spots.js";
import type { RegionSummary } from "../../data/rules/region-summary.js";
import type { EldenRingData } from "../setup.js";
import { findingsOf, type Finding, type FindingInputs } from "./findings.js";
import { regionsById, regionsOf, type RegionInputs } from "./regions.js";
import { roomViewOf } from "./room.js";

/** A player in the feed, by slot, with their name as the roster has it; slot 0 is the server. */
export interface FeedPlayer {
  readonly slot: number;
  readonly name: string | undefined;
}

/** An item that moved: received from another player, or sent to one. */
export type FeedEntry =
  | {
      readonly kind: "received";
      readonly at: number | undefined;
      readonly item: string | undefined;
      /** Whether it's a key item: one Archipelago flags as progression. */
      readonly isProgression: boolean;
      readonly from: FeedPlayer;
      /** Their game, and the location in their world it was in, as their package names them. */
      readonly game: string | undefined;
      readonly location: string | undefined;
    }
  | {
      readonly kind: "sent";
      readonly at: number | undefined;
      readonly item: string | undefined;
      readonly to: FeedPlayer;
      /** The check it was in: its region, by code, its id, and its name. */
      readonly check: { readonly region: string; readonly id: number; readonly name: KeySpot };
    };

/** An item the slot found in its own world: what it was, how it counts, and the check it was in. */
export interface OwnFind {
  readonly kind: "found";
  readonly at: number | undefined;
  readonly item: string | undefined;
  /** Whether it's a key item: one Archipelago flags as progression. */
  readonly isProgression: boolean;
  /** Whether it was in one of the slot's key checks. */
  readonly isKeyCheck: boolean;
  /** The id of the check it was in. */
  readonly location: number;
  /** The check it was in, once the room's names are in. */
  readonly check: KeySpot | undefined;
}

// NetworkItem.flags: the item can unlock logical advancement.
const PROGRESSION = 0b001;

/** What the feed is worked out from, in the store. */
export type FeedInputs = RegionInputs & FindingInputs;

// The last feed worked out, and the findings and regions it was worked out with, which change
// whenever anything it reads does.
let last:
  | {
      findings: ReadonlyMap<number, Finding>;
      regions: ReadonlyMap<string, RegionSummary> | undefined;
      feed: readonly FeedEntry[];
    }
  | undefined;

/** The items received from the others and sent to them, newest last. */
export function feedOf(data: EldenRingData, inputs: FeedInputs): readonly FeedEntry[] {
  const findings = findingsOf(inputs);
  const regions = regionsOf(data, inputs);
  if (last !== undefined && last.findings === findings && last.regions === regions) {
    return last.feed;
  }
  const { received, sent, roster, packages, team, slot } = inputs;
  const player = (other: number): FeedPlayer => ({
    slot: other,
    name: roster.find((entry) => entry.team === team && entry.slot === other)?.name,
  });
  const gameOf = (other: number) =>
    roster.find((entry) => entry.team === team && entry.slot === other)?.game;
  const own = packages.get(ELDEN_RING)?.itemNames;
  const feed: FeedEntry[] = [];
  for (const { value, at } of received) {
    if (value.player !== slot) {
      const game = gameOf(value.player);
      feed.push({
        kind: "received",
        at,
        item: own?.get(value.item),
        isProgression: (value.flags & PROGRESSION) !== 0,
        from: player(value.player),
        game,
        location:
          game === undefined ? undefined : packages.get(game)?.locationNames.get(value.location),
      });
    }
  }
  const regionOf = regionsById(regions);
  const names = roomViewOf(inputs)?.names;
  for (const { value, at } of sent) {
    const id = value.item.location;
    const region = regionOf.get(id);
    if (region !== undefined) {
      feed.push({
        kind: "sent",
        at,
        item: findings.get(id)?.item,
        to: player(value.receiving),
        check: { region, id, name: data.checkName(names?.[String(id)] ?? "") },
      });
    }
  }
  // Newest last, and those with no time first, each kind in the order it came.
  const ordered = feed
    .map((entry, order) => ({ entry, order }))
    .sort((a, b) => (a.entry.at ?? -1) - (b.entry.at ?? -1) || a.order - b.order)
    .map(({ entry }) => entry);
  last = { findings, regions, feed: ordered };
  return ordered;
}

/** The items the slot found for itself, in the order they came; the feed leaves these out, as they're its checks' own. */
export function ownFindsOf(data: EldenRingData, inputs: FeedInputs): OwnFind[] {
  const { received, packages, keyChecks, slot } = inputs;
  const itemNames = packages.get(ELDEN_RING)?.itemNames;
  const names = roomViewOf(inputs)?.names;
  return received.flatMap(({ value, at }) => {
    if (value.player !== slot) {
      return [];
    }
    const name = names?.[String(value.location)];
    return [
      {
        kind: "found",
        at,
        item: itemNames?.get(value.item),
        isProgression: (value.flags & PROGRESSION) !== 0,
        isKeyCheck: keyChecks?.has(value.location) === true,
        location: value.location,
        check: name === undefined ? undefined : data.checkName(name),
      } as const,
    ];
  });
}
