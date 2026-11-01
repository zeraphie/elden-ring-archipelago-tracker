/**
 * ─ Row words ─
 *
 * What the panel says of a check and its lists: what follows its place, what
 * a checked one held, what a list says when its filter leaves nothing in it,
 * and how many checks a search found.
 */

import type { SpotCopy } from "../../../data/names/location-name.js";
import type { Finding } from "../../../state/utils/findings.js";
import { slotName } from "../../utils/entry-words.js";
import { UNNAMED_ITEM } from "../../utils/item-words.js";

/** What follows a check's place: its encounter after a dash, and which copy it is: " – drop, 2 of 4". */
export function spotLine(encounter: string, copy: SpotCopy | undefined): string {
  const where = encounter === "" ? "" : ` – ${encounter}`;
  return copy === undefined ? where : `${where}, ${copy.nth} of ${copy.of}`;
}

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

/** What a checked check held, as its row says it: "Found: Rusty Key", or "Sent: Hookshot to Sam". */
export function findingLine({ item, to }: Finding): {
  readonly label: string;
  readonly text: string;
} {
  const named = item ?? UNNAMED_ITEM;
  return to === undefined
    ? { label: "Found:", text: named }
    : { label: "Sent:", text: `${named} to ${slotName(to.name, to.slot)}` };
}

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
