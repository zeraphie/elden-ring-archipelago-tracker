/**
 * ─ Elden Ring slot_data ─
 *
 * What the apworld writes into an Elden Ring slot's slot_data, read at the
 * boundary into the shapes the domain code takes. It arrives untyped, from the
 * web API or the login, so each field is checked; slot_data in another shape,
 * as an older or newer apworld might write it, reads as nothing rather than as
 * a wrong answer. slot_data doesn't name a room's checks, so what needs their
 * names takes the Elden Ring data package's too.
 */

import type { KeyCheckSlotData } from "../data/checks/key-checks.js";
import type { ForcedBosses } from "../data/rules/gates/boss-gates.js";
import type { WorldRuleOptions } from "../data/rules/world-rules.js";
import { isRecord } from "./web-responses.js";

/** The part of an Elden Ring slot's slot_data its rules are built from: the options, the bosses forced into arenas, and the goal. */
export interface RulesSlotData {
  /** Every option the rules read, checked, with the rest of slot_data's options kept for the rules' own tests of them. */
  readonly options: WorldRuleOptions & Readonly<Record<string, unknown>>;
  readonly forced: ForcedBosses;
  /** The goal bosses, by the flag the game sets when each is defeated. */
  readonly goal: readonly number[];
}

// How each option the rules read is written: a number, a number or a boolean, a list of
// location names, or each key's shards. Every option the rules take must be here.
const OPTION_KINDS = {
  world_logic: "number",
  enable_dlc: "flag",
  dlc_start: "number",
  dlc_timing: "number",
  missable_location_behavior: "number",
  excluded_location_behavior: "number",
  exclude_locations: "names",
  key_item_shards: "shards",
  great_runes_required_mountain: "number",
  soft_logic: "flag",
  great_runes_required_leyndell: "number",
  great_runes_required_erdtree: "number",
  use_master_key: "number",
  smithing_bell_bearing_option: "number",
  early_legacy_dungeons: "flag",
  spiritspring_stones: "flag",
  seperate_imbued_key: "flag",
  enemy_rando: "flag",
  rykard_encounter: "flag",
} as const satisfies Record<keyof WorldRuleOptions, "number" | "flag" | "names" | "shards">;

/** Each check in an Elden Ring slot's room, by id, named by the game's data package; undefined in any other shape. */
export function readCheckNames(
  slotData: Readonly<Record<string, unknown>>,
  locationNames: ReadonlyMap<number, string>
): Readonly<Record<string, string>> | undefined {
  const { locationIdsToKeys } = slotData;
  if (!isNames(locationIdsToKeys)) {
    return undefined;
  }
  return Object.fromEntries(
    Object.keys(locationIdsToKeys).flatMap((id) => {
      const name = locationNames.get(Number(id));
      return name === undefined ? [] : [[id, name]];
    })
  );
}

/** The part of an Elden Ring slot's slot_data that its key checks are rebuilt from, with its checks' names; undefined in any other shape. */
export function readKeyCheckSlotData(
  slotData: Readonly<Record<string, unknown>>,
  locationNames: ReadonlyMap<number, string>
): KeyCheckSlotData | undefined {
  const { options, duplicatedLocations } = slotData;
  const locationIdsToName = readCheckNames(slotData, locationNames);
  if (!isRecord(options) || locationIdsToName === undefined) {
    return undefined;
  }
  if (duplicatedLocations !== undefined && !isNames(duplicatedLocations)) {
    return undefined;
  }
  const priority = strings(options.priority_location_groups);
  const excluded = strings(options.exclude_locations);
  const worldLogic = number(options.world_logic);
  const dlcStart = number(options.dlc_start);
  const craftingKit = number(options.crafting_kit_option);
  const physick = number(options.physick_flask_option);
  const { enable_dlc: dlc } = options;
  if (
    priority === undefined ||
    excluded === undefined ||
    worldLogic === undefined ||
    dlcStart === undefined ||
    craftingKit === undefined ||
    physick === undefined ||
    (typeof dlc !== "number" && typeof dlc !== "boolean")
  ) {
    return undefined;
  }
  return {
    options: {
      priority_location_groups: priority,
      exclude_locations: excluded,
      world_logic: worldLogic,
      enable_dlc: dlc,
      dlc_start: dlcStart,
      crafting_kit_option: craftingKit,
      physick_flask_option: physick,
    },
    locationIdsToName,
    duplicatedLocations,
  };
}

/** The part of an Elden Ring slot's slot_data its rules and goal are read from; undefined in any other shape. */
export function readRulesSlotData(
  slotData: Readonly<Record<string, unknown>>
): RulesSlotData | undefined {
  const { options, forceBosses = {}, goal } = slotData;
  if (!isRecord(options) || !isWorldRuleOptions(options) || !isForced(forceBosses)) {
    return undefined;
  }
  const flags = numbers(goal);
  return flags === undefined ? undefined : { options, forced: forceBosses, goal: flags };
}

/** The part of an Elden Ring slot's slot_data that places its checks on the map: each check's key and name, by id; undefined in any other shape. */
export function readMapSlotData(
  slotData: Readonly<Record<string, unknown>>,
  locationNames: ReadonlyMap<number, string>
):
  | {
      readonly locationIdsToKeys: Readonly<Record<string, string>>;
      readonly locationIdsToName: Readonly<Record<string, string>>;
    }
  | undefined {
  const { locationIdsToKeys } = slotData;
  const locationIdsToName = readCheckNames(slotData, locationNames);
  return isNames(locationIdsToKeys) && locationIdsToName !== undefined
    ? { locationIdsToKeys, locationIdsToName }
    : undefined;
}

function isWorldRuleOptions(
  options: Readonly<Record<string, unknown>>
): options is WorldRuleOptions & Readonly<Record<string, unknown>> {
  return Object.entries(OPTION_KINDS).every(([name, kind]) => {
    const value = options[name];
    switch (kind) {
      case "number":
        return typeof value === "number";
      case "flag":
        return typeof value === "number" || typeof value === "boolean";
      case "names":
        return strings(value) !== undefined;
      case "shards":
        return (
          isRecord(value) &&
          Object.values(value).every(
            (shards) =>
              isRecord(shards) && typeof shards.Req === "number" && typeof shards.Max === "number"
          )
        );
    }
  });
}

// forceBosses: each arena's forced boss, both by the game's id.
function isForced(value: unknown): value is ForcedBosses {
  return isRecord(value) && Object.values(value).every((id) => typeof id === "number");
}

function numbers(value: unknown): readonly number[] | undefined {
  return Array.isArray(value) && value.every((each) => typeof each === "number")
    ? value
    : undefined;
}

// A record of names: every value a string.
function isNames(value: unknown): value is Readonly<Record<string, string>> {
  return isRecord(value) && Object.values(value).every((name) => typeof name === "string");
}

function strings(value: unknown): readonly string[] | undefined {
  return Array.isArray(value) && value.every((each) => typeof each === "string")
    ? value
    : undefined;
}

function number(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

/** The apworld versions an Elden Ring slot's slot_data says made it, such as ">=0.1 <0.2"; undefined when it says none. */
export function readSlotVersions(slotData: Readonly<Record<string, unknown>>): string | undefined {
  const { versions } = slotData;
  return typeof versions === "string" ? versions : undefined;
}
