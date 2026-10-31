/**
 * ─ Write location groups ─
 *
 * Reads the Elden Ring apworld's locations.py and writes
 * src/data/checks/location-groups.ts: for each location, what a room's key
 * checks and rules depend on. That's the groups a host can exclude it by,
 * whether the apworld counts it missable, and its region, the table it's
 * listed in. It mirrors the apworld's own location_groups() and the loops after
 * its tables. Run it as
 * `bun run location-groups <path to locations.py> <path to region_names.py>`.
 */

import { $ } from "bun";
import {
  APWORLD_LICENCE,
  callsIn,
  listAt,
  piecesFrom,
  pythonString,
  regionOrdersFrom,
  trueKeywords,
} from "./apworld-source.js";

/** The groups a host can exclude locations by, in the apworld's own words. */
export const EXCLUDABLE_GROUPS = [
  "DLC",
  "Hidden",
  "Rise",
  "Blizzard",
  "Scarab",
  "Furnace Golem",
  "Out of the Way",
  "Drop",
  "Dungeon",
  "Post Leyndell",
] as const;

/** What the key-check rebuild and the rules need to know of one location. */
export interface LocationFacts {
  readonly name: string;
  readonly groups: readonly string[];
  readonly isMissable: boolean;
  readonly isDlc: boolean;
  // The keywords its entry sets to True, as the apworld writes them: "chest", "seedtree".
  readonly flags: ReadonlySet<string>;
  readonly table: string;
}

const OUTPUT = "src/data/checks/location-groups.ts";
// Every spot in this table is given a missable test as a function, which the
// priority filter reads as true whatever the options say.
const CAPITAL = "Leyndell, Royal Capital";
// The DLC's merchants at the Roundtable, valued as Gravesite Plain.
const ROUNDTABLE_DLC = "Roundtable Hold DLC Only";

/** Each location's facts from the apworld's locations.py and region_names.py sources, events left out. */
export function locationFactsFrom(source: string, regionNames: string): LocationFacts[] {
  const { base: baseOrder, dlc: dlcOrder } = regionOrdersFrom(regionNames);
  const dungeons = new Set(listAt(source, "for region in [ # dungeons").map(pythonString));
  const order = [...baseOrder, ...dlcOrder];
  // A table's place in the order, as the apworld's region_value; 0 for a table not in it.
  const valueOf = (table: string): number =>
    Math.max(0, order.indexOf(table === ROUNDTABLE_DLC ? (dlcOrder[0] ?? "") : table));
  const isPostLeyndell = (value: number): boolean =>
    value >= baseOrder.length - 21 && value <= baseOrder.length;
  const opening = source.indexOf("{", source.indexOf("location_tables: Dict"));
  const facts: LocationFacts[] = [];
  for (const entry of piecesFrom(source, opening + 1)) {
    const colon = entry.indexOf(":");
    const table = pythonString(entry.slice(0, colon).trim());
    const isDlcTable = dlcOrder.includes(table) || table === ROUNDTABLE_DLC;
    for (const { args } of callsIn(entry, "ERLocationData")) {
      const [quoted = '""', item = "None"] = args;
      if (item === "None") {
        continue;
      }
      const flags = trueKeywords(args);
      const isDlc = isDlcTable || flags.has("dlc");
      const groups = [
        isDlc && "DLC",
        (flags.has("hidden") || flags.has("hangingpot")) && "Hidden",
        flags.has("rise") && "Rise",
        flags.has("blizzard") && "Blizzard",
        flags.has("scarab") && !isDlc && "Scarab",
        flags.has("furnacegolem") && "Furnace Golem",
        flags.has("outoftheway") && "Out of the Way",
        flags.has("drop") && "Drop",
        dungeons.has(table) && !flags.has("criticalpath") && "Dungeon",
        isPostLeyndell(valueOf(table)) && "Post Leyndell",
      ].filter((group): group is string => group !== false);
      facts.push({
        name: pythonString(quoted),
        groups,
        isMissable: flags.has("missable") || flags.has("exclusive") || table === CAPITAL,
        isDlc,
        flags,
        table,
      });
    }
  }
  return facts;
}

/** The source of src/data/checks/location-groups.ts: every location, with its region. */
export function locationGroupsModule(facts: readonly LocationFacts[]): string {
  const rows = facts.map((fact) => {
    const parts = [`groups: ${JSON.stringify(fact.groups)}`];
    if (fact.isMissable) {
      parts.push("isMissable: true");
    }
    parts.push(`region: ${JSON.stringify(fact.table)}`);
    return `  [${JSON.stringify(fact.name)}, { ${parts.join(", ")} }],`;
  });
  return `/*! Location groups from the Elden Ring apworld 0.1.4's locations.py, ${APWORLD_LICENCE} */

// Written by tools/write-location-groups.ts from the apworld's locations.py: run \`bun run location-groups\` again rather than editing it.

/** What a room's key checks and rules need to know of a location. */
export interface LocationGroups {
  /** The groups a host can exclude it by. */
  readonly groups: readonly string[];
  /** Whether the apworld counts it missable, which keeps it out of the priority set. */
  readonly isMissable?: true;
  /** The region it sits in: the apworld's location table it's listed in. */
  readonly region: string;
}

/** Each location's groups and region, by its Archipelago name. */
export const LOCATION_GROUPS: ReadonlyMap<string, LocationGroups> = new Map<string, LocationGroups>([
${rows.join("\n")}
]);
`;
}

if (import.meta.main) {
  const [locationsPath, regionNamesPath] = process.argv.slice(2);
  if (locationsPath === undefined || regionNamesPath === undefined) {
    console.error(
      "Usage: bun run location-groups <path to locations.py> <path to region_names.py>"
    );
    process.exit(1);
  }
  const facts = locationFactsFrom(
    await Bun.file(locationsPath).text(),
    await Bun.file(regionNamesPath).text()
  );
  await Bun.write(OUTPUT, locationGroupsModule(facts));
  // Formatted as written, so the file in the repo is exactly this tool's.
  await $`oxfmt ${OUTPUT}`.quiet();
  const sizes = EXCLUDABLE_GROUPS.map(
    (group) => `${group} ${facts.filter((fact) => fact.groups.includes(group)).length}`
  );
  const missable = facts.filter((fact) => fact.isMissable).length;
  console.log(
    `Wrote ${OUTPUT} from ${facts.length} locations: ${sizes.join(", ")}, missable ${missable}.`
  );
}
