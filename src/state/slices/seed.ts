/**
 * ─ Seed slice ─
 *
 * What the room's seed fixes, which the page reads everything else through:
 * each game's data package, naming its items and locations, this slot's
 * slot_data, with the room's options, and the key checks worked out from it.
 * All are asked for or worked out on each visit rather than kept on the
 * device. slot_data comes from the web API, and the websocket's login says it
 * again.
 */

import { castDraft } from "immer";
import type { DataPackage } from "../../archipelago/web-responses.js";
import type { TrackerSlice } from "../store.js";

export interface SeedSlice {
  /** Each game's names, by the game's name. */
  readonly packages: ReadonlyMap<string, DataPackage>;
  /** This slot's slot_data, as its game wrote it; undefined until it's in. */
  readonly slotData: Readonly<Record<string, unknown>> | undefined;
  /** This slot's key checks, by location id; undefined until worked out, or when its slot_data isn't in a shape they can be. */
  readonly keyChecks: ReadonlySet<number> | undefined;
  takePackages(packages: ReadonlyMap<string, DataPackage>): void;
  takeSlotData(slotData: Readonly<Record<string, unknown>>): void;
  takeKeyChecks(keyChecks: ReadonlySet<number> | undefined): void;
}

export const createSeedSlice: TrackerSlice<SeedSlice> = (set) => ({
  packages: new Map(),
  slotData: undefined,
  keyChecks: undefined,
  takePackages: (packages) =>
    set((state) => {
      state.packages = castDraft(packages);
    }),
  takeSlotData: (slotData) =>
    set((state) => {
      state.slotData = castDraft(slotData);
    }),
  takeKeyChecks: (keyChecks) =>
    set((state) => {
      state.keyChecks = castDraft(keyChecks);
    }),
});
