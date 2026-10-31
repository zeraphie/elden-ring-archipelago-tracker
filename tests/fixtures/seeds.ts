// Shared by the tests that rebuild a room from the key-check fixture: each
// seed's slot_data, a location's id being its index in the fixture's names.
import type { KeyCheckOptions, KeyCheckSlotData } from "../../src/data/checks/key-checks.js";
import { ALL_BOSSES_OPTIONS } from "../../src/data/presets/all-bosses.js";
import fixture from "./key-checks.json";

/** A seed as the key-check fixture holds it, its locations by index into the names. */
export interface FixtureSeed {
  readonly label: string;
  readonly generatorPrinted: number | null;
  readonly notChecks: number;
  readonly trimmed: number;
  readonly options: Omit<KeyCheckOptions, "priority_location_groups" | "exclude_locations"> & {
    readonly priority_location_groups: readonly number[];
    readonly exclude_locations: readonly number[];
  };
  readonly room: readonly number[];
  readonly duplicatedLocations: readonly (readonly [number, number])[];
  readonly important: readonly number[] | null;
}

const NAMES: readonly string[] = fixture.names;

/** The location name a fixture index stands for. */
export const nameOf = (index: number): string => NAMES[index] ?? "";

/** Every location the fixture names, by id, as the Elden Ring data package gives them. */
export const LOCATION_NAMES: ReadonlyMap<number, string> = new Map(
  NAMES.map((name, index) => [index, name])
);

// The All Bosses seed's options are the preset's own, which src keeps for the development build's
// Simulate; here they take indices into the names, as every other seed's do.
const ALL_BOSSES = "[Very Long] All Bosses";
function withOptions(seed: FixtureSeed): FixtureSeed {
  if (seed.label !== ALL_BOSSES) {
    return seed;
  }
  const {
    world_logic,
    enable_dlc,
    dlc_start,
    crafting_kit_option,
    physick_flask_option,
    ...lists
  } = ALL_BOSSES_OPTIONS as unknown as KeyCheckOptions;
  const indexOf = (name: string) => NAMES.indexOf(name);
  // The key checks' options alone, as the fixture keeps every other seed's.
  return {
    ...seed,
    options: {
      world_logic,
      enable_dlc,
      dlc_start,
      crafting_kit_option,
      physick_flask_option,
      priority_location_groups: lists.priority_location_groups.map(indexOf),
      exclude_locations: lists.exclude_locations.map(indexOf),
    },
  };
}

/** Every seed in the key-check fixture. */
export const SEEDS = (fixture.seeds as unknown as readonly FixtureSeed[]).map(withOptions);

/** A seed's slot_data as the apworld writes it: its checks by id with their keys, which the fixture leaves blank, and no names. */
export function arrivingSlot(seed: FixtureSeed): Readonly<Record<string, unknown>> {
  const { locationIdsToName, ...rest } = slotOf(seed);
  const locationIdsToKeys = Object.fromEntries(
    Object.keys(locationIdsToName).map((id) => [id, ""])
  );
  return { ...rest, locationIdsToKeys };
}

/** A seed's slot_data as key checks read it, each location's id being its index in the fixture's names. */
export function slotOf(seed: FixtureSeed): KeyCheckSlotData {
  return {
    options: {
      ...seed.options,
      priority_location_groups: seed.options.priority_location_groups.map(nameOf),
      exclude_locations: seed.options.exclude_locations.map(nameOf),
    },
    locationIdsToName: Object.fromEntries(seed.room.map((index) => [String(index), nameOf(index)])),
    duplicatedLocations: Object.fromEntries(
      seed.duplicatedLocations.map(([copy, spot]) => [nameOf(copy), nameOf(spot)])
    ),
  };
}

/** The fixture's seed with this label. */
export function seed(label: string): FixtureSeed {
  const found = SEEDS.find((each) => each.label === label);
  if (found === undefined) {
    throw new Error(`The key-check fixture has no seed labelled "${label}"`);
  }
  return found;
}
