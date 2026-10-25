/**
 * ─ Feed words ─
 *
 * What the Items tab says of its filters.
 */

/** Which items the tab shows: those received, those sent, or both. */
export type FeedFilter = "received" | "sent" | "all";

/** Each filter, as its button names it, in order. */
export const FEED_FILTERS: readonly (readonly [FeedFilter, string])[] = [
  ["received", "Received"],
  ["sent", "Sent"],
  ["all", "All"],
];

/** Each filter's button, with how many items it holds where it holds one kind. */
export function filterLabel(filter: FeedFilter, received: number, sent: number): string {
  const name = FEED_FILTERS.find(([key]) => key === filter)?.[1] ?? filter;
  if (filter === "all") {
    return name;
  }
  return `${name} ${filter === "received" ? received : sent}`;
}
