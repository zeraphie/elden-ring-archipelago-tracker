/*! The region graph follows the Elden Ring apworld 0.1.4's create_regions, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

/**
 * ─ Region graph ─
 *
 * A room's regions and how they connect, as the apworld's create_regions
 * builds them for its options. Most connections hold whenever their half of
 * the game is on, and come from region-connections.ts; the few that hang on
 * other options are ported here by hand: where a new game starts, where the
 * Roundtable hangs off it, how Mohgwyn Palace is reached, and how the DLC is.
 */

import {
  BASE_CONNECTIONS,
  BASE_REGIONS,
  DLC_CONNECTIONS,
  DLC_REGIONS,
} from "./region-connections.js";

/** The options create_regions reads, with the apworld's names. */
export interface RegionGraphOptions {
  /** 0 for region lock. */
  readonly world_logic: number;
  readonly enable_dlc: number | boolean;
  /** 0 for the base game first, 1 for the DLC alone, 2 for both from the DLC. */
  readonly dlc_start: number;
  /** When Mohgwyn Palace opens: 0 from the start, 1 from Altus, 2 from the Snowfield. */
  readonly dlc_timing: number;
  /** 3 or more leaves missable spots unrandomized. */
  readonly missable_location_behavior: number;
  /** 3 or more leaves excluded spots unrandomized. */
  readonly excluded_location_behavior: number;
  /** Every spot the host's choices exclude, before the apworld takes back any it counts important. */
  readonly exclude_locations: readonly string[];
}

/** A room's regions, the one a new game starts in, and each region's exits by the region they lead to. */
export interface RegionGraph {
  readonly start: string;
  readonly regions: ReadonlySet<string>;
  readonly exits: ReadonlyMap<string, readonly string[]>;
}

const DLC_ONLY_ROUNDTABLE = "Roundtable Hold DLC Only";
// Varré's medal opens Mohgwyn Palace early, unless it stays where it is.
const PUREBLOOD_MEDAL =
  "LL/(RC): Pureblood Knight's Medal - talk to Varré after invading Magnus in AP and returning the bloodsoaked Lord of Blood's Favor";
const UNRANDOMIZED = 3;

/** The region graph create_regions builds for these options. */
export function regionGraph(options: RegionGraphOptions): RegionGraph {
  const isDlcOn = Boolean(options.enable_dlc);
  const startsInDlc = isDlcOn && options.dlc_start !== 0;
  const regions = new Set<string>([
    ...(isBaseOn(options) ? BASE_REGIONS : [DLC_ONLY_ROUNDTABLE]),
    ...(isDlcOn ? DLC_REGIONS : []),
  ]);
  const connections: (readonly [string, string])[] = [];
  if (startsInDlc) {
    connections.push([
      "Gravesite Plain",
      options.dlc_start === 1 ? DLC_ONLY_ROUNDTABLE : "Roundtable Hold",
    ]);
  } else {
    connections.push(["Limgrave", "Roundtable Hold"]);
  }
  if (isBaseOn(options)) {
    connections.push(...BASE_CONNECTIONS, [mohgwynFrom(options), "Mohgwyn Palace"]);
  }
  if (isDlcOn) {
    if (options.dlc_start === 0) {
      connections.push(["Mohgwyn Palace", "Gravesite Plain"]);
    } else if (options.dlc_start === 2) {
      connections.push(["Gravesite Plain", "Limgrave"]);
    }
    connections.push(...DLC_CONNECTIONS);
  }
  const exits = new Map<string, string[]>();
  for (const [from, to] of connections) {
    exits.set(from, [...(exits.get(from) ?? []), to]);
  }
  return { start: startsInDlc ? "Gravesite Plain" : "Limgrave", regions, exits };
}

// Where Mohgwyn Palace is entered from: the Snowfield once the DLC's timing
// says so or Varré's medal isn't randomized, Altus earlier, or Limgrave from
// the start.
function mohgwynFrom(options: RegionGraphOptions): string {
  if (options.dlc_timing === 2 || !isPurebloodMedalRandomized(options)) {
    return "Consecrated Snowfield";
  }
  return options.dlc_timing === 1 ? "Altus Plateau" : "Limgrave";
}

/** Whether a room has the base game: all but a run of the DLC alone, as the apworld's base_enabled says. */
export function isBaseOn(options: Pick<RegionGraphOptions, "enable_dlc" | "dlc_start">): boolean {
  return !(options.dlc_start === 1 && Boolean(options.enable_dlc));
}

/**
 * Whether Varré's medal is randomized, as the apworld's should_randomize
 * decides it: not when missable spots, or excluded ones it's among, are left
 * unrandomized. The apworld takes an important item back off the exclude list
 * first, which slot_data's list doesn't show.
 */
export function isPurebloodMedalRandomized(options: RegionGraphOptions): boolean {
  return !(
    options.missable_location_behavior >= UNRANDOMIZED ||
    (options.excluded_location_behavior >= UNRANDOMIZED &&
      options.exclude_locations.includes(PUREBLOOD_MEDAL) &&
      !isPurebloodMedalImportant(options))
  );
}

// The apworld's is_important for the medal: it opens Mohgwyn on the way to the DLC.
function isPurebloodMedalImportant(options: RegionGraphOptions): boolean {
  return (
    Boolean(options.enable_dlc) &&
    (options.world_logic === 0 || (options.dlc_timing !== 2 && options.dlc_start !== 1))
  );
}
