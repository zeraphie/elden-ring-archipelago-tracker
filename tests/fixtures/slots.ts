// Shared by the tests that read a room as its rules do: Izzy's preset's
// slot_data with Godfrey and Morgott as its goal, an Elden Ring data package
// naming three items, and the store's inputs built from them.
import type { DataPackage } from "../../src/archipelago/web-responses.js";
import type { CheckInputs } from "../../src/state/utils/checks.js";
import { PRESETS } from "./presets.js";
import { arrivingSlot, LOCATION_NAMES, seed, slotOf } from "./seeds.js";

export const GODFREY = 11000850;
export const MORGOTT = 11000800;

// The preset's key-check slot_data, each check's id its index in the fixture's names.
const SLOT = slotOf(seed("Izzy's preset"));

/** Izzy's preset's slot_data, with its rules' options and Godfrey and Morgott as its goal. */
export const SLOT_DATA: Readonly<Record<string, unknown>> = {
  ...arrivingSlot(seed("Izzy's preset")),
  options: { ...SLOT.options, ...PRESETS["Early legacy dungeons"] },
  goal: [GODFREY, MORGOTT],
};

/** A check's id in the slot_data, by its name. */
export const idOf = (name: string): number =>
  Number(Object.entries(SLOT.locationIdsToName).find(([, each]) => each === name)?.[0]);

/** The id of the first check in the slot_data whose name starts with this region code. */
export const firstCoded = (code: string): number =>
  Number(
    Object.entries(SLOT.locationIdsToName).find(([, name]) => name.startsWith(`${code}/`))?.[0]
  );

/** An Elden Ring data package naming the Rusty Key (1), Godrick's Great Rune (2) and the Dectus Medallion's left half (3). */
export const PACKAGES = new Map<string, DataPackage>([
  [
    "EldenRing",
    {
      checksum: "test",
      itemNames: new Map([
        [1, "Rusty Key"],
        [2, "Godrick's Great Rune"],
        [3, "Dectus Medallion (Left)"],
      ]),
      locationNames: LOCATION_NAMES,
    },
  ],
]);

/** Items received, by their ids in the package. */
export const received = (...ids: number[]) =>
  ids.map((id) => ({ value: { item: id, location: 0, player: 1, flags: 0 } }));

/** The store's inputs for the room, slot 1 of team 0, as the tests change them. */
export const inputs = (overrides: Partial<CheckInputs> = {}): CheckInputs => ({
  slotData: SLOT_DATA,
  received: [],
  checked: [],
  packages: PACKAGES,
  keyChecks: undefined,
  sent: [],
  roster: [],
  team: 0,
  slot: 1,
  ...overrides,
});
