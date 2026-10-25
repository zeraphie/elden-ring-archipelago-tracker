/**
 * ─ Place names report ─
 *
 * Which place codes the Elden Ring apworld's location names use, those
 * inside their descriptions included, and which of them still have no full
 * name in src/data/names/place-names.ts. Hand it the
 * apworld's locations.py, taken out of its .apworld (a zip):
 * `bun run places <path to locations.py>`. It reads the file and writes
 * nothing.
 */

import { readLocationName, withoutExtra } from "../src/data/names/location-name.js";
import {
  DESCRIPTION_EXCEPTIONS,
  PLACE_NAMES,
  unnamedCodesIn,
} from "../src/data/names/place-names.js";
import { callsIn, pythonString } from "./apworld-source.js";

/** A place key the apworld uses, how many location names use it, and the region it's listed under. */
export interface PlaceUse {
  readonly key: string;
  readonly region: string;
  readonly uses: number;
}

/** Every location name in the apworld's locations.py source: the first string each ERLocationData call is given. */
export function locationNamesIn(source: string): string[] {
  return callsIn(source, "ERLocationData").map(({ args }) => pythonString(args[0] ?? '""'));
}

/** The place keys these names use, before their colon or inside their descriptions, and have no name for, in the order first used, each with its count. */
export function unnamedPlaces(
  names: readonly string[],
  known: ReadonlyMap<string, string>
): PlaceUse[] {
  const uses = new Map<string, PlaceUse>();
  for (const name of names) {
    const read = readLocationName(name);
    if (read === undefined) {
      continue;
    }
    const prefix = read.placeKey === undefined || known.has(read.placeKey) ? [] : [read.placeKey];
    const fixes = DESCRIPTION_EXCEPTIONS.get(withoutExtra(name).base) ?? [];
    const described = new Map([...known, ...fixes]);
    for (const key of [...prefix, ...unnamedCodesIn(read.description, read.regions, described)]) {
      const seen = uses.get(key);
      uses.set(key, {
        key,
        region: seen?.region ?? key.slice(0, key.indexOf("/")).split("|")[0] ?? "",
        uses: (seen?.uses ?? 0) + 1,
      });
    }
  }
  return [...uses.values()];
}

if (import.meta.main) {
  const path = process.argv[2];
  if (path === undefined) {
    console.error("Usage: bun run places <path to the apworld's locations.py>");
    process.exit(1);
  }
  const names = locationNamesIn(await Bun.file(path).text());
  const missing = unnamedPlaces(names, PLACE_NAMES);
  const byRegion = new Map<string, PlaceUse[]>();
  for (const place of missing) {
    byRegion.set(place.region, [...(byRegion.get(place.region) ?? []), place]);
  }
  for (const [region, places] of byRegion) {
    console.log(`${region}: ${places.map((place) => `${place.key} (${place.uses})`).join(", ")}`);
  }
  console.log(
    `${names.length} location names: ${PLACE_NAMES.size} places named, ${missing.length} still to name, codes inside descriptions included.`
  );
}
