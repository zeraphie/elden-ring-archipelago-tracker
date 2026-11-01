/**
 * ─ Feed words ─
 *
 * What the Items tab says of its filters, and which items each keeps: what
 * another player gave is received, what the slot got for itself is obtained.
 */

import type { ItemEntry } from "../../../state/utils/feed.js";

/** Which items the tab shows: those received, those obtained, those sent, or every one. */
export type FeedFilter = "received" | "obtained" | "sent" | "all";

/** Each filter, as its button names it, in order. */
export const FEED_FILTERS: readonly (readonly [FeedFilter, string])[] = [
  ["received", "Received"],
  ["obtained", "Obtained"],
  ["sent", "Sent"],
  ["all", "All"],
];

// The kind of item each filter keeps, where it keeps one kind.
const KINDS: Readonly<Record<Exclude<FeedFilter, "all">, ItemEntry["kind"]>> = {
  received: "received",
  obtained: "found",
  sent: "sent",
};

/** Whether a filter keeps an item. */
export function keeps(filter: FeedFilter, { kind }: ItemEntry): boolean {
  return filter === "all" || KINDS[filter] === kind;
}

/** How many items each filter keeps. */
export function filterCounts(items: readonly ItemEntry[]): Readonly<Record<FeedFilter, number>> {
  const count = (filter: FeedFilter) => items.filter((item) => keeps(filter, item)).length;
  return {
    received: count("received"),
    obtained: count("obtained"),
    sent: count("sent"),
    all: items.length,
  };
}

/** Each filter's button, with how many items it holds where it holds one kind. */
export function filterLabel(
  filter: FeedFilter,
  counts: Readonly<Record<FeedFilter, number>>
): string {
  const name = FEED_FILTERS.find(([key]) => key === filter)?.[1] ?? filter;
  return filter === "all" ? name : `${name} ${counts[filter]}`;
}
