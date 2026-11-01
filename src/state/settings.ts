/**
 * ─ Settings ─
 *
 * What the person has set, apart from any room: it outlasts rooms, and it's
 * kept on this device. A kept value the tracker can't read is left out, and
 * that setting starts as a new visitor's does.
 */

import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
  type StateStorage,
} from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { deviceStorage } from "../storage/device.js";

/** How a check looks in the map's tooltip: the panel's row, or its place on a heading band. */
export type CheckLook = "compact" | "comfort";

/** What the person has set, and the way to set it. */
export interface SettingsState {
  readonly checkLook: CheckLook;
  readonly setCheckLook: (look: CheckLook) => void;
}

// A new visitor's look, and where the settings are kept.
const START_LOOK: CheckLook = "compact";
const KEPT_NAME = "er-settings";

function isCheckLook(value: unknown): value is CheckLook {
  return value === "compact" || value === "comfort";
}

/** A settings store, keeping to `storage`: the device's, or a test's. */
export function createSettingsStore(storage: StateStorage = deviceStorage) {
  return createStore<SettingsState>()(
    subscribeWithSelector(
      persist(
        (set) => ({
          checkLook: START_LOOK,
          setCheckLook: (checkLook) => set({ checkLook }),
        }),
        {
          name: KEPT_NAME,
          storage: createJSONStorage(() => storage),
          partialize: ({ checkLook }) => ({ checkLook }),
          merge: (kept, current) => {
            const look = (kept as { readonly checkLook?: unknown } | undefined)?.checkLook;
            return isCheckLook(look) ? { ...current, checkLook: look } : current;
          },
        }
      )
    )
  );
}

/** The page's one settings store. */
export const SETTINGS = createSettingsStore();
