/**
 * ─ Row words ─
 *
 * What the panel says of its lists of checks: what a list says when its filter
 * leaves nothing in it, and how many checks a search found.
 */

/** How many rows a long list shows before it's asked for all of them. */
export const ROWS_SHOWN = 80;

/** Which checks a list shows: those still to do, those done, or all. */
export type CheckFilter = "todo" | "done" | "all";

/** Each filter, as its button names it, in order. */
export const FILTERS: readonly (readonly [CheckFilter, string])[] = [
  ["todo", "To do"],
  ["done", "Done"],
  ["all", "All"],
];

/** What the key checks' list says when its filter leaves none. */
export const NO_KEY_CHECKS: Readonly<Record<CheckFilter, string>> = {
  todo: "Nothing left here.",
  done: "None found yet.",
  all: "This region has no key checks.",
};

/** How many checks a search found: "3 matches", or "The first 60 matches" when there were more. */
export function matchesLine(count: number, isCapped: boolean): string {
  if (count === 0) {
    return "No checks match.";
  }
  if (isCapped) {
    return `The first ${count} matches`;
  }
  return count === 1 ? "1 match" : `${count} matches`;
}
