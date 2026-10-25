/**
 * ─ Region summary ─
 *
 * How each region of a room stands, by the code its checks' names start with.
 * Every check of the code counts, on the open-world map or off it, so
 * Liurnia's caves and Caria Manor are Liurnia's. A region is open once any of
 * its checks sits in a region of the rules the player reaches, locked until
 * then, and done once every key check in it is checked. While it's locked, it
 * needs the way into its main region: the rules region most of its checks are in.
 * The regions are grouped as the picker lists them: by the map sheet their
 * tiles are on, and those with none by whether they're the DLC's.
 */

import { LOCATION_GROUPS } from "../checks/location-groups.js";
import type { Sheet, SheetTiles } from "../checks/map-tiles.js";
import { readLocationName, withoutExtra } from "../names/location-name.js";
import { REGION_NAMES } from "../names/regions.js";
import { regionNeeds, type AreaState } from "./area-status.js";
import { reachOf, type Room } from "./room-reach.js";
import type { Need } from "./rules.js";

/** How a region stands, what it needs while it's locked, its checks, and how many of its key checks and checks are done. */
export interface RegionSummary {
  /** Its checks, by id, in id order. */
  readonly ids: readonly number[];
  readonly state: AreaState;
  /** What stands between the player and the region; undefined unless it's locked. */
  readonly needs: Need | undefined;
  readonly keyChecks: number;
  readonly keyDone: number;
  readonly checks: number;
  readonly done: number;
  /** Whether most of its checks are the DLC's. */
  readonly isDlc: boolean;
}

/** The regions as the picker lists them, by code, each group in the region table's order. */
export interface RegionGroups {
  /** The regions with tiles on the Lands Between. */
  readonly surface: readonly string[];
  /** The base game's regions with no tiles: its legacy dungeons and the underground. */
  readonly underground: readonly string[];
  /** The regions with tiles on the Realm of Shadow, then the DLC's with none. */
  readonly dlc: readonly string[];
}

interface Tally {
  readonly ids: number[];
  keyChecks: number;
  keyDone: number;
  checks: number;
  done: number;
  dlcChecks: number;
  isOpen: boolean;
  // How many of its checks sit in each region of the rules.
  readonly inRules: Map<string, number>;
}

// The region table's order, base game first: the order regions are listed and picked in.
const ORDER = new Map([...REGION_NAMES.keys()].map((code, at) => [code, at]));

/**
 * Each region of the room with checks, by its code, in the region table's
 * order, given the room, the items received, the checks' names by id, and the
 * key checks and the checks done, by id.
 */
export function regionSummaries(
  room: Room,
  items: ReadonlyMap<string, number>,
  names: Readonly<Record<string, string>>,
  keyChecks: ReadonlySet<number>,
  checked: ReadonlySet<number>
): Map<string, RegionSummary> {
  const reach = reachOf(room, items);
  const tallies = new Map<string, Tally>();
  for (const [key, name] of Object.entries(names)) {
    const code = readLocationName(name)?.regions[0];
    if (code === undefined) {
      continue;
    }
    const id = Number(key);
    const tally = tallies.get(code) ?? {
      ids: [],
      keyChecks: 0,
      keyDone: 0,
      checks: 0,
      done: 0,
      dlcChecks: 0,
      isOpen: false,
      inRules: new Map<string, number>(),
    };
    const isDone = checked.has(id);
    tally.ids.push(id);
    tally.checks += 1;
    tally.done += isDone ? 1 : 0;
    if (keyChecks.has(id)) {
      tally.keyChecks += 1;
      tally.keyDone += isDone ? 1 : 0;
    }
    const base = withoutExtra(name).base;
    tally.dlcChecks += LOCATION_GROUPS.get(base)?.groups.includes("DLC") === true ? 1 : 0;
    const inRules = reach.rules.regionOf(base);
    if (inRules !== undefined) {
      tally.inRules.set(inRules, (tally.inRules.get(inRules) ?? 0) + 1);
      tally.isOpen ||= reach.reached.regions.has(inRules);
    }
    tallies.set(code, tally);
  }
  const ordered = [...tallies].sort(
    ([a], [b]) => (ORDER.get(a) ?? ORDER.size) - (ORDER.get(b) ?? ORDER.size)
  );
  const summaries = new Map<string, RegionSummary>();
  for (const [code, tally] of ordered) {
    const { ids, keyChecks: keys, keyDone, checks, done, dlcChecks, isOpen, inRules } = tally;
    const state: AreaState = keys > 0 && keyDone === keys ? "done" : isOpen ? "open" : "locked";
    const main = mainOf(inRules);
    const needs = state === "locked" && main !== undefined ? regionNeeds(main, reach) : undefined;
    const isDlc = dlcChecks * 2 > checks;
    summaries.set(code, { ids, state, needs, keyChecks: keys, keyDone, checks, done, isDlc });
  }
  return summaries;
}

/** The room's regions as the picker groups them, given the tiles on each map sheet. */
export function regionGroups(
  summaries: ReadonlyMap<string, RegionSummary>,
  sheets: ReadonlyMap<Sheet, SheetTiles>
): RegionGroups {
  const sheetOf = new Map<string, Sheet>();
  for (const [sheet, { regions }] of sheets) {
    for (const { region } of regions) {
      sheetOf.set(region, sheet);
    }
  }
  const codes = [...summaries.keys()];
  const offMap = (isDlc: boolean) =>
    codes.filter((code) => !sheetOf.has(code) && summaries.get(code)?.isDlc === isDlc);
  return {
    surface: codes.filter((code) => sheetOf.get(code) === "surface"),
    underground: offMap(false),
    dlc: [...codes.filter((code) => sheetOf.get(code) === "dlc"), ...offMap(true)],
  };
}

/** The region to start on: the first open one with key checks left, or else the first; undefined with none. */
export function firstToDo(summaries: ReadonlyMap<string, RegionSummary>): string | undefined {
  for (const [code, { state, keyChecks, keyDone }] of summaries) {
    if (state === "open" && keyDone < keyChecks) {
      return code;
    }
  }
  return summaries.keys().next().value;
}

// The rules region most of a region's checks are in; a tie goes to the one met first.
function mainOf(inRules: ReadonlyMap<string, number>): string | undefined {
  let main: string | undefined;
  let most = 0;
  for (const [region, count] of inRules) {
    if (count > most) {
      main = region;
      most = count;
    }
  }
  return main;
}
