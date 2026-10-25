import type { KeySpot } from "../../data/names/key-spots.js";

/** A check's place and encounter on one line, the encounter after a dash where there is one. */
export function checkLine({ place, encounter }: KeySpot): string {
  return encounter === "" ? place : `${place} – ${encounter}`;
}
