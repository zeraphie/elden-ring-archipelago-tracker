import type { PinState } from "../../data/checks/map-pins.js";
import type { AreaState } from "../../data/rules/area-status.js";

/** How a region stands, in words: on the map's titles, its legend and the panel's heading. */
export const AREA_STATE_WORDS: Readonly<Record<AreaState, string>> = {
  locked: "Locked",
  open: "Open",
  done: "Every key check done",
};

/** How a key check stands, in words: on the map's legend and beside its sack in the panel. */
export const PIN_STATE_WORDS: Readonly<Record<PinState, string>> = {
  todo: "Key check",
  collected: "Collected",
  locked: "Out of reach for now",
};
