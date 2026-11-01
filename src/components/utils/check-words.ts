import type { SpotCopy } from "../../data/names/location-name.js";
import type { KeySpot } from "../../data/names/key-spots.js";
import type { Finding } from "../../state/utils/findings.js";
import { slotName } from "./entry-words.js";
import { UNNAMED_ITEM } from "./item-words.js";

/** A check's place and encounter on one line, the encounter after a dash where there is one. */
export function checkLine({ place, encounter }: KeySpot): string {
  return encounter === "" ? place : `${place} – ${encounter}`;
}

/** What follows a check's place: its encounter after a dash, and which copy it is: " – drop, 2 of 4". */
export function spotLine(encounter: string, copy: SpotCopy | undefined): string {
  const where = encounter === "" ? "" : ` – ${encounter}`;
  return copy === undefined ? where : `${where}, ${copy.nth} of ${copy.of}`;
}

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
