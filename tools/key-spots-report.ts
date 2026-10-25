/**
 * ─ Key spots report ─
 *
 * Every location a host can make a key check, read from the Elden Ring
 * apworld's locations.py and bosses.py: those in the 21 groups its
 * priority_location_groups option documents, missable spots left out. It
 * writes them to tests/fixtures/possible-key-spots.ts, then lists those with
 * no full name yet in src/data/names/key-spots.ts, by region. Run it as
 * `bun run key-spots <path to the apworld's eldenring folder>`.
 */

import { $ } from "bun";
import { KEY_SPOTS } from "../src/data/names/key-spots.js";
import { readLocationName } from "../src/data/names/location-name.js";
import { APWORLD_LICENCE, callsIn } from "./apworld-source.js";
import { bossArenasFrom } from "./write-bosses.js";
import { locationFactsFrom, type LocationFacts } from "./write-location-groups.js";

const OUTPUT = "tests/fixtures/possible-key-spots.ts";

/** The priority groups a location is in, as the apworld's location_groups() puts it: a boss drop by `bossDrops`, the rest by its own keywords. */
export function priorityGroupsOf(fact: LocationFacts, bossDrops: ReadonlySet<string>): string[] {
  const { flags, isDlc } = fact;
  // The groups the apworld splits in two, the DLC's under its own name.
  const split = (group: string): string => (isDlc ? `DLC ${group}` : group);
  return [
    bossDrops.has(fact.name) && split("Boss Reward"),
    flags.has("achievement") && "Achievement Boss",
    flags.has("remembrance") && isDlc && "DLC Remembrance Boss",
    flags.has("keyitem") && !fact.isMissable && split("Key Items"),
    flags.has("chest") && split("Chest"),
    flags.has("scarab") && split("Scarab"),
    flags.has("progshop") && split("Shop"),
    flags.has("map") && split("Map"),
    flags.has("church") && "Church",
    flags.has("cross") && "Cross",
    flags.has("seedtree") && "Seedtree",
    flags.has("basin") && "Basin",
    (flags.has("fragment") || flags.has("enemyfragment")) && "Fragment",
    flags.has("revered") && "Revered",
    flags.has("spiritspring_stone") && "Spiritspring Stones",
  ].filter((group): group is string => group !== false);
}

/** Every location a host can make a key check: in a priority group, and not missable, in the apworld's order. */
export function possibleKeySpots(
  facts: readonly LocationFacts[],
  bossDrops: ReadonlySet<string>
): string[] {
  return facts
    .filter((fact) => !fact.isMissable && priorityGroupsOf(fact, bossDrops).length > 0)
    .map((fact) => fact.name);
}

/** The spots with no full name yet, by the region each is listed under, in the order given. */
export function unnamedSpots(
  spots: readonly string[],
  named: ReadonlyMap<string, unknown>
): Map<string, string[]> {
  const byRegion = new Map<string, string[]>();
  for (const spot of spots) {
    if (named.has(spot)) {
      continue;
    }
    const region = readLocationName(spot)?.regions[0] ?? spot.slice(0, spot.indexOf(":"));
    byRegion.set(region, [...(byRegion.get(region) ?? []), spot]);
  }
  return byRegion;
}

/** The source of tests/fixtures/possible-key-spots.ts for these spots. */
export function possibleKeySpotsModule(spots: readonly string[]): string {
  return `/*! Location names from the Elden Ring apworld 0.1.3's locations.py, ${APWORLD_LICENCE} */

// Written by tools/key-spots-report.ts from the apworld's locations.py and bosses.py: run \`bun run key-spots\` again rather than editing it.

/** Every location a host can make a key check, by Archipelago name: those in the 21 priority groups, missable spots left out. */
export const POSSIBLE_KEY_SPOTS: readonly string[] = [
${spots.map((spot) => `  ${JSON.stringify(spot)},`).join("\n")}
];
`;
}

if (import.meta.main) {
  const folder = process.argv[2];
  if (folder === undefined) {
    console.error("Usage: bun run key-spots <path to the apworld's eldenring folder>");
    process.exit(1);
  }
  const facts = locationFactsFrom(await Bun.file(`${folder}/locations.py`).text());
  const calls = callsIn(await Bun.file(`${folder}/bosses.py`).text(), "ERBossInfo");
  const bossDrops = new Set(bossArenasFrom(calls).arenas.flatMap((arena) => arena.drops));
  const spots = possibleKeySpots(facts, bossDrops);
  await Bun.write(OUTPUT, possibleKeySpotsModule(spots));
  // Formatted as written, so the file in the repo is exactly this tool's.
  await $`oxfmt ${OUTPUT}`.quiet();
  const missing = unnamedSpots(spots, KEY_SPOTS);
  for (const [region, names] of missing) {
    console.log(`${region} (${names.length})`);
    for (const name of names) {
      console.log(`  ${name}`);
    }
  }
  const left = [...missing.values()].flat().length;
  console.log(
    `Wrote ${OUTPUT}: ${spots.length} possible key spots, ${spots.length - left} named, ${left} still to name.`
  );
}
