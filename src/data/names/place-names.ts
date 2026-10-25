/**
 * ─ Place names ─
 *
 * The full name behind each place code in Elden Ring's location names,
 * keyed by the regions and code as the names write them: "LG/WS" is a grace
 * in Limgrave, "LG/(AS)" a landmark, "LRC|LAC/RC" a place both capitals
 * share. A code reused in another region is another key. A code inside a
 * description is named the same way, under the check's own region, or under
 * the region written with it, as "FA/BGB"; one that's a region's own, as in
 * "SV mainboss", takes the region's name. The few spots their code places
 * wrongly are named by the place they're in, and the few descriptions that
 * use a code otherwise are read by their own names. Until a code has its
 * name, the code itself is shown; `bun run places` reports which are left.
 */

import { LIMGRAVE_PLACES } from "./areas/limgrave/places.js";
import { LIURNIA_PLACES } from "./areas/liurnia/places.js";
import { CAELID_PLACES } from "./areas/caelid/places.js";
import { UNDERGROUND_PLACES } from "./areas/underground/places.js";
import { ALTUS_PLACES } from "./areas/altus/places.js";
import { MOUNTAINTOPS_PLACES } from "./areas/mountaintops/places.js";
import { REALM_OF_SHADOW_PLACES } from "./areas/realm-of-shadow/places.js";
import { regionName } from "./regions.js";

/** Each place's full name, keyed by its location names' regions and code as written. */
export const PLACE_NAMES: ReadonlyMap<string, string> = new Map<string, string>([
  ...LIMGRAVE_PLACES,
  ...LIURNIA_PLACES,
  ...CAELID_PLACES,
  ...UNDERGROUND_PLACES,
  ...ALTUS_PLACES,
  ...MOUNTAINTOPS_PLACES,
  ...REALM_OF_SHADOW_PLACES,
]);

/** The names a code takes inside a description, where the place a spot is in reads otherwise: spots under LG/SV are outside Stormveil, but a description that names SV points at the castle. */
export const DESCRIPTION_NAMES: ReadonlyMap<string, string> = new Map<string, string>([
  ["LG/SV", regionName("SV")],
  ["MtG/VM", regionName("VM")],
  ["CC/FRR", regionName("FRR")],
]);

// What a description's codes are named by: each place's name, or its own where it has one.
const DESCRIBED: ReadonlyMap<string, string> = new Map([...PLACE_NAMES, ...DESCRIPTION_NAMES]);

/** The few descriptions whose code means something other than it does elsewhere in its region, by location name: each code's key, with the name it takes there. */
export const DESCRIPTION_EXCEPTIONS: ReadonlyMap<string, ReadonlyMap<string, string>> = new Map([
  // Blaidd waits in Siofra River; SR is Seluvis's Rise everywhere else in Liurnia.
  [
    "LL/(SR): Seluvis's Introduction - talk to Seluvis after talking to Blaidd in SR",
    new Map([["LL/SR", regionName("SR")]]),
  ],
  // NEW is a slip for MEW, the Minor Erdtree the spot is under.
  ["CL/MEW: Cracked Pot - N of NEW on root", new Map([["CL/NEW", placeName("CL/MEW")]])],
]);

/** The names a location's description is read with: every place's, and its own exceptions over them. */
export function descriptionNames(locationName: string): ReadonlyMap<string, string> {
  const fixes = DESCRIPTION_EXCEPTIONS.get(locationName);
  return fixes === undefined ? DESCRIBED : new Map([...DESCRIBED, ...fixes]);
}

/** The few spots whose code names a place near them rather than theirs, by location name, each with the key of the place it's in. */
export const PLACE_EXCEPTIONS: ReadonlyMap<string, string> = new Map<string, string>([
  // Under the Stormgate's code, but beside the Stranded Graveyard's grace.
  ["LG/(SG): Tarnished's Furled Finger - beside grace", "LG/SG"],
  ["LG/(SG): Finger Severer - beside grace", "LG/SG"],
]);

/** A place's full name by its key, or its code as written while it has no name yet. */
export function placeName(key: string, names: ReadonlyMap<string, string> = PLACE_NAMES): string {
  return names.get(key) ?? key.slice(key.indexOf("/") + 1);
}

// A place code inside a description: a region and code written together, as "FA/BGB" or
// "MotG/(CS)", or a code alone, as "WR", "SeC", "DHFR" or "MotG": a word that starts and ends with
// a capital. A lone capital is a compass point, already spelled out, and a word with no name stays.
const CODE = /\b([A-Z][A-Za-z]*)\/(\(?[A-Z][A-Za-z]*\)?)|\b([A-Z][A-Za-z]*[A-Z])\b/g;

/**
 * The keys a code inside a description is named under, in the order they're tried: a code with its
 * region under that region, and a code alone under the check's regions, as written and then each
 * alone; each as a grace and then as a landmark, or the other way about where it's written in
 * brackets.
 */
function keysOf(
  region: string | undefined,
  paired: string | undefined,
  alone: string | undefined,
  regions: readonly string[]
): string[] {
  const asBoth = (prefix: string, code: string) => {
    const bare = code.replace(/^\((.*)\)$/, "$1");
    return code.startsWith("(")
      ? [`${prefix}/(${bare})`, `${prefix}/${bare}`]
      : [`${prefix}/${bare}`, `${prefix}/(${bare})`];
  };
  if (region !== undefined && paired !== undefined) {
    return asBoth(region, paired);
  }
  const prefixes = new Set([regions.join("|"), ...regions]);
  return [...prefixes].flatMap((prefix) => asBoth(prefix, alone ?? ""));
}

/** Text with each place code in it named, as a check in `regions` reads it: "graveyard south of WR" in Limgrave reads "graveyard south of Waypoint Ruins". A code with no name yet stays as written. */
export function expandPlaces(
  text: string,
  regions: readonly string[],
  names: ReadonlyMap<string, string> = DESCRIBED
): string {
  return text.replace(
    CODE,
    (written, region?: string, paired?: string, alone?: string) =>
      names.get(keysOf(region, paired, alone, regions).find((key) => names.has(key)) ?? "") ??
      written
  );
}

// Capital words the descriptions use that are no place, as "AND" written for emphasis.
const NOT_CODES: ReadonlySet<string> = new Set(["AND"]);

/** The codes in text with no name yet, each as the key it would be named under first: what a report of places still to name counts. */
export function unnamedCodesIn(
  text: string,
  regions: readonly string[],
  names: ReadonlyMap<string, string> = DESCRIBED
): string[] {
  return [...text.matchAll(CODE)].flatMap(([, region, paired, alone]) => {
    if (alone !== undefined && NOT_CODES.has(alone)) {
      return [];
    }
    const keys = keysOf(region, paired, alone, regions);
    return keys.some((key) => names.has(key)) ? [] : keys.slice(0, 1);
  });
}
