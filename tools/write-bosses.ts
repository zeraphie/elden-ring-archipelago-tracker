/**
 * ─ Write bosses ─
 *
 * Reads the Elden Ring apworld's bosses.py and writes src/data/bosses/bosses.ts: the
 * name of every boss a goal can name, by the flag the game sets when it's
 * defeated, and every boss's arena by the game's id for it, for where enemy
 * rando moves Rykard and the serpent. Then it lists the bosses with no icon yet. Run it as
 * `bun run bosses <path to bosses.py>`, the file taken out of the .apworld (a
 * zip). A few names are spelled as the game spells them; NAME_FIXES has them.
 */

import { $ } from "bun";
import { BOSS_ICONS, isOwnIconMeant } from "../src/data/bosses/boss-icons.js";
import {
  APWORLD_LICENCE,
  callsIn,
  piecesFrom,
  pythonString,
  trueKeywords,
  type SourceCall,
} from "./apworld-source.js";

/** A boss a goal can name, read from bosses.py. */
export interface GoalBoss {
  readonly flag: number;
  readonly name: string;
  readonly where: string | undefined;
  /** The locations its defeat drops, by Archipelago name. */
  readonly drops: readonly string[];
}

/** Every boss's arena from bosses.py, and the ids Rykard and the serpent have before enemy rando moves them. */
export interface BossArenas {
  readonly arenas: readonly { readonly id: number; readonly drops: readonly string[] }[];
  readonly rykard: number;
  readonly serpent: number;
}

const OUTPUT = "src/data/bosses/bosses.ts";
// The names bosses.py finds Rykard and the serpent by.
const RYKARD = "Rykard, Lord of Blasphemy (VM)";
const SERPENT = "God-Devouring Serpent (VM)";

// The apworld's names where the game spells them otherwise: a typo, with the
// region bracket it lacks, and ", The" where the game says ", the".
const NAME_FIXES: ReadonlyMap<string, string> = new Map([
  ["Solder of Godrick", "Soldier of Godrick (LG)"],
]);
const LOWER_THE = /, The /g;
// "Rennala, Queen of the Full Moon (Phase 2) (RLA)": the phase is how the
// apworld tells a boss's two flags apart, and only the second is a goal.
const PHASE = / \(Phase \d\)/;
// The area code a name ends on, in brackets.
const WHERE = /^(.*) \(([^()]+)\)$/;

/** The bosses a goal can name from bosses.py's ERBossInfo calls: those with a defeat flag that can't be missed, names spelled as the game spells them. */
export function goalBossesFrom(calls: readonly SourceCall[]): GoalBoss[] {
  const bosses: GoalBoss[] = [];
  for (const { args } of calls) {
    const [quoted = '""', , , flag = "None"] = args;
    if (flag === "None" || trueKeywords(args).has("missable")) {
      continue;
    }
    const written = pythonString(quoted);
    const name = (NAME_FIXES.get(written) ?? written)
      .replace(LOWER_THE, ", the ")
      .replace(PHASE, "");
    const parts = WHERE.exec(name);
    bosses.push({
      flag: Number(flag),
      name: parts?.[1] ?? name,
      where: parts?.[2],
      drops: dropsOf(args),
    });
  }
  return bosses;
}

/** Every boss's arena from bosses.py's ERBossInfo calls, and the ids Rykard and the serpent start with. */
export function bossArenasFrom(calls: readonly SourceCall[]): BossArenas {
  const ids = new Map<string, number>();
  const arenas = calls.map(({ args }) => {
    const [quoted = '""', , id = "None"] = args;
    ids.set(pythonString(quoted), Number(id));
    return { id: Number(id), drops: dropsOf(args) };
  });
  return { arenas, rykard: ids.get(RYKARD) ?? Number.NaN, serpent: ids.get(SERPENT) ?? Number.NaN };
}

// A boss's locations=[...]: what its defeat drops, by Archipelago name.
function dropsOf(args: readonly string[]): string[] {
  const locations = args.find((arg) => /^locations\s*=/.test(arg)) ?? "";
  return piecesFrom(locations, locations.indexOf("[") + 1).map(pythonString);
}

/** The source of src/data/bosses/bosses.ts for these bosses and arenas. */
export function bossesModule(
  bosses: readonly GoalBoss[],
  { arenas, rykard, serpent }: BossArenas
): string {
  const rows = bosses.map(
    ({ flag, name, where, drops }) =>
      `  [${flag}, { name: ${JSON.stringify(name)}, where: ${where === undefined ? "undefined" : JSON.stringify(where)}, drops: ${JSON.stringify(drops)} }],`
  );
  const arenaRows = arenas.map(({ id, drops }) => `  [${id}, ${JSON.stringify(drops)}],`);
  return `/*! Boss names, defeat flags and arenas from the Elden Ring apworld 0.1.4's bosses.py, ${APWORLD_LICENCE} */

// Written by tools/write-bosses.ts from the apworld's bosses.py: run \`bun run bosses\` again rather than editing it.

/** A boss a goal can name: its name, the area code its apworld name carries in brackets, and the locations its defeat drops. */
export interface Boss {
  readonly name: string;
  readonly where: string | undefined;
  readonly drops: readonly string[];
}

/** Every boss a goal can name, by the flag the game sets when it's defeated. */
export const BOSSES: ReadonlyMap<number, Boss> = new Map([
${rows.join("\n")}
]);

/** What each boss's defeat drops, by the game's id for the boss, as slot_data's forceBosses names them: the drops a boss moved into its arena guards. */
export const ARENA_DROPS: ReadonlyMap<number, readonly string[]> = new Map<number, readonly string[]>([
${arenaRows.join("\n")}
]);

/** The game's id for Rykard, Lord of Blasphemy, before enemy rando moves him. */
export const RYKARD_ID = ${rykard};

/** The game's id for the God-Devouring Serpent, before enemy rando moves it. */
export const SERPENT_ID = ${serpent};
`;
}

if (import.meta.main) {
  const path = process.argv[2];
  if (path === undefined) {
    console.error("Usage: bun run bosses <path to the apworld's bosses.py>");
    process.exit(1);
  }
  const calls = callsIn(await Bun.file(path).text(), "ERBossInfo");
  const bosses = goalBossesFrom(calls);
  const arenas = bossArenasFrom(calls);
  await Bun.write(OUTPUT, bossesModule(bosses, arenas));
  // Formatted as written, so the file in the repo is exactly this tool's.
  await $`oxfmt ${OUTPUT}`.quiet();
  const meant = bosses.filter((boss) => isOwnIconMeant(boss.flag, boss.drops));
  const missing = meant.filter((boss) => !BOSS_ICONS.has(boss.flag));
  for (const boss of missing) {
    console.log(`${boss.where ?? "?"}: ${boss.name} (${boss.flag})`);
  }
  console.log(
    `Wrote ${OUTPUT}: ${bosses.length} bosses a goal can name, ${meant.length} meant to have an icon of their own, ${missing.length} of them still to find; ${arenas.arenas.length} arenas.`
  );
}
