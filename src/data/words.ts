/**
 * ─ Words ─
 *
 * The plain English the page reads out in more than one place. Lists are
 * joined by the platform's own list format, in British English, so there's
 * no comma before the last "and".
 */

const LISTS = {
  and: new Intl.ListFormat("en-GB", { type: "conjunction" }),
  or: new Intl.ListFormat("en-GB", { type: "disjunction" }),
};

/** Parts read out as one list: "A", "A and B", "A, B and C", or with "or". */
export function listed(parts: readonly string[], joiner: "and" | "or"): string {
  return LISTS[joiner].format(parts);
}
