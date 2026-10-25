/**
 * ─ Key spots ─
 *
 * The full name of 164 key spots, the boss drops, Golden Seed trees and
 * Sacred Tears one common setup makes its priority locations: the place, then
 * the encounter or the object there, so a check reads "Stormhill Evergaol",
 * "Crucible Knight". The encounter is the unrandomised game's; which boss
 * replaced it is never shown. A key spot not listed here reads from its
 * Archipelago name instead.
 */

import { LIMGRAVE_KEY_SPOTS } from "./areas/limgrave/key-spots.js";
import { LIURNIA_KEY_SPOTS } from "./areas/liurnia/key-spots.js";
import { CAELID_KEY_SPOTS } from "./areas/caelid/key-spots.js";
import { UNDERGROUND_KEY_SPOTS } from "./areas/underground/key-spots.js";
import { ALTUS_KEY_SPOTS } from "./areas/altus/key-spots.js";
import { MOUNTAINTOPS_KEY_SPOTS } from "./areas/mountaintops/key-spots.js";
import { REALM_OF_SHADOW_KEY_SPOTS } from "./areas/realm-of-shadow/key-spots.js";
import { withoutExtra } from "./location-name.js";

/** A key spot's full name: where it is, and the encounter or object there. */
export interface KeySpot {
  /** The place, compass points spelled out: "Stormhill Evergaol", "South east of Secluded Cell". */
  readonly place: string;
  /** The unrandomised encounter or the object: "Crucible Knight", "Golden Seed tree". */
  readonly encounter: string;
}

/** Every key spot's full name, keyed by its exact Archipelago name, a trailing space included where the apworld has one. */
export const KEY_SPOTS: ReadonlyMap<string, KeySpot> = new Map([
  ...LIMGRAVE_KEY_SPOTS,
  ...LIURNIA_KEY_SPOTS,
  ...CAELID_KEY_SPOTS,
  ...UNDERGROUND_KEY_SPOTS,
  ...ALTUS_KEY_SPOTS,
  ...MOUNTAINTOPS_KEY_SPOTS,
  ...REALM_OF_SHADOW_KEY_SPOTS,
]);

/** A key spot's full name by its Archipelago location name, the generator's extra copies included; undefined for a spot not listed. */
export function keySpot(locationName: string): KeySpot | undefined {
  return KEY_SPOTS.get(withoutExtra(locationName).base);
}
