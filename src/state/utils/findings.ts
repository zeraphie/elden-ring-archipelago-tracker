/**
 * ─ Findings ─
 *
 * What each of this slot's checks held, once it's checked: an item it found
 * for itself, from the items received, or one it sent another player, from
 * the items sent. Each item is named by its own game's data package, and a
 * receiver by the roster. Only what's been found is here, so nothing unfound
 * is ever named.
 */

import { ELDEN_RING } from "../../archipelago/look-up.js";
import type { TrackerState } from "../store.js";

/** What a check held: the item, and who it went to when that's another player. */
export interface Finding {
  /** The item's name, from its game's data package; undefined when the package doesn't name it. */
  readonly item: string | undefined;
  /** The player it went to, by slot, with their name as the roster has it; undefined when it's this slot's own. */
  readonly to: { readonly slot: number; readonly name: string | undefined } | undefined;
}

/** What findings are worked out from, in the store. */
export type FindingInputs = Pick<
  TrackerState,
  "received" | "sent" | "roster" | "packages" | "team" | "slot"
>;

// The last findings worked out, and what they were worked out from.
let last: { inputs: FindingInputs; findings: ReadonlyMap<number, Finding> } | undefined;

/** What each of this slot's checks held, by location id, for the checks it's known of. */
export function findingsOf(inputs: FindingInputs): ReadonlyMap<number, Finding> {
  if (last !== undefined && isSame(last.inputs, inputs)) {
    return last.findings;
  }
  const { received, sent, roster, packages, team, slot } = inputs;
  const findings = new Map<number, Finding>();
  const own = packages.get(ELDEN_RING)?.itemNames;
  for (const { value } of received) {
    if (value.player === slot) {
      findings.set(value.location, {
        item: own?.get(value.item),
        to: undefined,
      });
    }
  }
  for (const { value } of sent) {
    const receiver = roster.find((entry) => entry.team === team && entry.slot === value.receiving);
    const names = receiver?.game === undefined ? undefined : packages.get(receiver.game)?.itemNames;
    findings.set(value.item.location, {
      item: names?.get(value.item.item),
      to: { slot: value.receiving, name: receiver?.name },
    });
  }
  last = { inputs, findings };
  return findings;
}

function isSame(a: FindingInputs, b: FindingInputs): boolean {
  return (
    a.received === b.received &&
    a.sent === b.sent &&
    a.roster === b.roster &&
    a.packages === b.packages &&
    a.team === b.team &&
    a.slot === b.slot
  );
}
