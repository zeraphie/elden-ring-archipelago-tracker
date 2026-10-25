/**
 * ─ Write region graph ─
 *
 * Reads the Elden Ring apworld's create_regions and region orders and writes
 * src/data/rules/regions/region-connections.ts: the base game's and the DLC's regions, and
 * the connections that hold whenever their half of the game is on. The few
 * connections that hang on other options (where the run starts, how Mohgwyn
 * Palace and the DLC are reached) are ported by hand in region-graph.ts; this
 * stops if it meets one it doesn't know. Run it as
 * `bun run region-graph <path to __init__.py> <path to locations.py>`.
 */

import { $ } from "bun";
import { APWORLD_LICENCE, callsIn, listAt, pythonString } from "./apworld-source.js";

/** The regions and always-on connections of the base game and the DLC. */
export interface RegionSource {
  readonly baseRegions: readonly string[];
  readonly dlcRegions: readonly string[];
  readonly baseConnections: readonly (readonly [string, string])[];
  readonly dlcConnections: readonly (readonly [string, string])[];
}

const OUTPUT = "src/data/rules/regions/region-connections.ts";
const BASE_BLOCK = "if self.base_enabled:";
const DLC_BLOCK = "if self.options.enable_dlc:";
// The connections under other conditions, which region-graph.ts ports by hand.
const BY_HAND = new Set([
  "Gravesite Plain > Roundtable Hold DLC Only",
  "Gravesite Plain > Roundtable Hold",
  "Limgrave > Roundtable Hold",
  "Consecrated Snowfield > Mohgwyn Palace",
  "Altus Plateau > Mohgwyn Palace",
  "Limgrave > Mohgwyn Palace",
  "Mohgwyn Palace > Gravesite Plain",
  "Gravesite Plain > Limgrave",
]);

/** The regions and always-on connections from the apworld's __init__.py and locations.py. */
export function regionSourceFrom(init: string, locations: string): RegionSource {
  const start = init.indexOf("    def create_regions");
  const end = init.indexOf("\n    def ", start + 1);
  const body = init.slice(start, end);
  const baseConnections: [string, string][] = [];
  const dlcConnections: [string, string][] = [];
  for (const { at, args } of callsIn(body, "create_connection")) {
    // The helper's own `def create_connection(from_region: str, ...)` has no strings to read.
    if (!args.every((arg) => arg.startsWith('"'))) {
      continue;
    }
    const [from = "", to = ""] = args.map(pythonString);
    const blocks = enclosingBlocks(body, at);
    if (blocks.length === 1 && blocks[0] === BASE_BLOCK) {
      baseConnections.push([from, to]);
    } else if (blocks.length === 1 && blocks[0] === DLC_BLOCK) {
      dlcConnections.push([from, to]);
    } else if (!BY_HAND.has(`${from} > ${to}`)) {
      throw new Error(
        `create_connection("${from}", "${to}") hangs on ${blocks.join(" / ")}, which region-graph.ts doesn't port yet`
      );
    }
  }
  return {
    baseRegions: listAt(locations, "\nregion_order = [").map(pythonString),
    dlcRegions: listAt(locations, "\nregion_order_dlc = [").map(pythonString),
    baseConnections,
    dlcConnections,
  };
}

// The block headers around a line, innermost first, up to the function's own
// body; a header on the call's own line ("if x: create_connection(...)") counts.
function enclosingBlocks(body: string, at: number): string[] {
  const lines = body.slice(0, at).split("\n");
  const own = lines.pop() ?? "";
  const headers: string[] = [];
  if (/^\s*(if|elif|else)\b/.test(own)) {
    headers.push(own.trim());
  }
  let indent = own.length - own.trimStart().length;
  for (let i = lines.length - 1; i >= 0 && indent > 8; i--) {
    const line = lines[i] ?? "";
    const text = line.trim();
    const depth = line.length - line.trimStart().length;
    if (text === "" || text.startsWith("#") || depth >= indent) {
      continue;
    }
    indent = depth;
    if (/^(if|elif|else)\b/.test(text)) {
      headers.push(text);
    }
  }
  return headers;
}

/** The source of src/data/rules/regions/region-connections.ts. */
export function regionConnectionsModule(source: RegionSource): string {
  const list = (values: readonly string[]): string =>
    values.map((value) => `  ${JSON.stringify(value)},`).join("\n");
  const pairs = (values: readonly (readonly [string, string])[]): string =>
    values.map(([from, to]) => `  [${JSON.stringify(from)}, ${JSON.stringify(to)}],`).join("\n");
  return `/*! Regions and connections from the Elden Ring apworld 0.1.3's create_regions and region orders, ${APWORLD_LICENCE} */

// Written by tools/write-region-graph.ts from the apworld's __init__.py and locations.py: run \`bun run region-graph\` again rather than editing it.

/** The base game's regions, in the apworld's order. */
export const BASE_REGIONS: readonly string[] = [
${list(source.baseRegions)}
];

/** The DLC's regions, in the apworld's order. */
export const DLC_REGIONS: readonly string[] = [
${list(source.dlcRegions)}
];

/** The base game's connections that hold whenever it's on, as [from, to]. */
export const BASE_CONNECTIONS: readonly (readonly [string, string])[] = [
${pairs(source.baseConnections)}
];

/** The DLC's connections that hold whenever it's on, as [from, to]. */
export const DLC_CONNECTIONS: readonly (readonly [string, string])[] = [
${pairs(source.dlcConnections)}
];
`;
}

if (import.meta.main) {
  const [initPath, locationsPath] = process.argv.slice(2);
  if (initPath === undefined || locationsPath === undefined) {
    console.error("Usage: bun run region-graph <path to __init__.py> <path to locations.py>");
    process.exit(1);
  }
  const source = regionSourceFrom(
    await Bun.file(initPath).text(),
    await Bun.file(locationsPath).text()
  );
  await Bun.write(OUTPUT, regionConnectionsModule(source));
  // Formatted as written, so the file in the repo is exactly this tool's.
  await $`oxfmt ${OUTPUT}`.quiet();
  console.log(
    `Wrote ${OUTPUT}: ${source.baseRegions.length} base regions, ${source.dlcRegions.length} DLC regions, ${source.baseConnections.length} base and ${source.dlcConnections.length} DLC connections, ${BY_HAND.size} more ported by hand.`
  );
}
