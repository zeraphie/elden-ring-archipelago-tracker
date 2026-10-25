import type { Sheet } from "../../data/checks/map-tiles.js";

/** Each map sheet in order, with its name in the game: on the map's tabs and the region picker's groups. */
export const SHEET_NAMES: readonly (readonly [Sheet, string])[] = [
  ["surface", "Lands Between"],
  ["dlc", "Realm of Shadow"],
];
