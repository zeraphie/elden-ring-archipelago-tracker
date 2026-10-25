/**
 * ─ Key checks ─
 *
 * A room's key checks, the spots that can hold a key item, rebuilt from its
 * slot_data. slot_data carries the host's choices, not the apworld's final
 * priority set, so this does what the apworld does: it reads the excluded
 * groups back from the exclude list, keeps the priority spots that are in the
 * room, can't be missed and aren't excluded, adds the spots generation tops
 * up and duplicates, and adds the vanilla spots an option pins a key item to.
 * Exact for a solo room; a multiworld's random trim isn't recorded anywhere.
 */

import { isBaseOn } from "../rules/regions/region-graph.js";
import { LOCATION_GROUPS, type LocationGroups } from "./location-groups.js";

/** The options rebuilding a room's key checks reads from its slot_data, with the apworld's names. */
export interface KeyCheckOptions {
  readonly priority_location_groups: readonly string[];
  readonly exclude_locations: readonly string[];
  /** 0 for region lock. */
  readonly world_logic: number;
  readonly enable_dlc: number | boolean;
  /** 1 when the run starts in the DLC. */
  readonly dlc_start: number;
  /** 2 for "do not randomize". */
  readonly crafting_kit_option: number;
  /** 2 for "do not randomize". */
  readonly physick_flask_option: number;
}

/** What rebuilding a room's key checks reads from its Elden Ring slot_data. */
export interface KeyCheckSlotData {
  readonly options: KeyCheckOptions;
  /** Every check in the room, by location id. */
  readonly locationIdsToName: Readonly<Record<string, string>>;
  /** The generator's extra copies of priority spots, each to the spot it copies. */
  readonly duplicatedLocations?: Readonly<Record<string, string>>;
}

// An excluded group still lists most of its members once the apworld has
// taken back the ones whose vanilla item it counts important: 82 to 100% in
// the rooms measured, where groups nobody chose list 15 to 26%.
const EXCLUDED_SHARE = 0.5;
// The priority spots generation adds when a region the run starts in has none.
const LIMGRAVE_TOP_UP = "LG/(SG): Finger Severer - beside grace";
const GRAVESITE_TOP_UP = "GP/TPC: Scadutree Fragment - by cross";
// The spots "do not randomize" leaves the Crafting Kit and the Physick Flask on,
// in the base game and among the DLC's Twin Maiden Husks.
const DO_NOT_RANDOMIZE = 2;
const CRAFTING_KIT_SPOTS = [
  "LG/(CE): Crafting Kit - Kalé Shop",
  "RH/DLC: Dagger - Twin maiden shop",
];
const PHYSICK_SPOTS = [
  "LG/(TCM): Flask of Wondrous Physick - in basin or at RH after 2 great runes",
  "RH/DLC: Longsword - Twin maiden shop",
];

/** The apworld's final priority set for a room, by location name: what generation printed as its priority locations. */
export function prioritySpots(
  slot: KeyCheckSlotData,
  groups: ReadonlyMap<string, LocationGroups> = LOCATION_GROUPS
): Set<string> {
  const { options } = slot;
  const room = new Set(Object.values(slot.locationIdsToName));
  const excluded = excludedGroups(options, groups);
  const spots = new Set(
    options.priority_location_groups.filter((name) => {
      const facts = groups.get(name);
      return (
        room.has(name) &&
        facts?.isMissable !== true &&
        !(facts?.groups ?? []).some((group) => excluded.has(group))
      );
    })
  );
  if (options.world_logic === 0) {
    const hasSpotIn = (region: string): boolean =>
      [...spots].some((name) => groups.get(name)?.region === region);
    if (isBaseOn(options) && options.dlc_start === 0 && !hasSpotIn("Limgrave")) {
      spots.add(LIMGRAVE_TOP_UP);
    }
    if (Boolean(options.enable_dlc) && !hasSpotIn("Gravesite Plain")) {
      spots.add(GRAVESITE_TOP_UP);
    }
  }
  for (const copy of Object.keys(slot.duplicatedLocations ?? {})) {
    spots.add(copy);
  }
  return spots;
}

/** A room's key checks, by location id: its priority spots, and the vanilla spots its options pin a key item to. */
export function keyChecks(
  slot: KeyCheckSlotData,
  groups: ReadonlyMap<string, LocationGroups> = LOCATION_GROUPS
): Set<number> {
  const { options } = slot;
  const names = prioritySpots(slot, groups);
  if (options.crafting_kit_option === DO_NOT_RANDOMIZE) {
    CRAFTING_KIT_SPOTS.forEach((name) => names.add(name));
  }
  if (options.physick_flask_option === DO_NOT_RANDOMIZE) {
    PHYSICK_SPOTS.forEach((name) => names.add(name));
  }
  const ids = new Set<number>();
  for (const [id, name] of Object.entries(slot.locationIdsToName)) {
    if (names.has(name)) {
      ids.add(Number(id));
    }
  }
  return ids;
}

/**
 * The groups the host excluded, read back from slot_data's exclude list: those
 * with at least half their members still listed. Only members the list could
 * hold count: the apworld clears the DLC's spots off it when the DLC is off,
 * and the base game's when the run is the DLC's alone.
 */
export function excludedGroups(
  options: KeyCheckOptions,
  groups: ReadonlyMap<string, LocationGroups> = LOCATION_GROUPS
): Set<string> {
  const listed = new Set(options.exclude_locations);
  const members = new Map<string, { total: number; listed: number }>();
  for (const [name, facts] of groups) {
    const isDlc = facts.groups.includes("DLC");
    if (isDlc ? !options.enable_dlc : !isBaseOn(options)) {
      continue;
    }
    for (const group of facts.groups) {
      const count = members.get(group) ?? { total: 0, listed: 0 };
      members.set(group, {
        total: count.total + 1,
        listed: count.listed + (listed.has(name) ? 1 : 0),
      });
    }
  }
  return new Set(
    [...members]
      .filter(([, count]) => count.listed / count.total >= EXCLUDED_SHARE)
      .map(([group]) => group)
  );
}
