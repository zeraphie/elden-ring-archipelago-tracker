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
import { isRecord } from "../archipelago/web-responses.js";
import { deviceStorage } from "../storage/device.js";

/** How much a thing shows, in the map's tooltip or the timer: the plainer look, or the fuller one. */
export type Look = "compact" | "comfort";

/** What the person has set, and the way to set it. */
export interface SettingsState {
  /** How a check looks in the map's tooltip: the panel's row, or its place on a heading band. */
  readonly checkLook: Look;
  readonly setCheckLook: (look: Look) => void;
  /** Whether the page has a run timer. */
  readonly isTimerOn: boolean;
  readonly setTimerOn: (isOn: boolean) => void;
  /** Whether the timer has a row for each goal, in the goal menu's place. */
  readonly hasSplits: boolean;
  readonly setHasSplits: (hasSplits: boolean) => void;
  /** How the timer looks: text rows on a solid column, or framed rows on the menu's shade. */
  readonly timerLook: Look;
  readonly setTimerLook: (look: Look) => void;
}

// What's kept of the settings: all but the ways to set them.
type Kept = Pick<SettingsState, "checkLook" | "isTimerOn" | "hasSplits" | "timerLook">;

// A new visitor's settings, and where they're kept.
const START: Kept = {
  checkLook: "compact",
  isTimerOn: false,
  hasSplits: true,
  timerLook: "comfort",
};
const KEPT_NAME = "er-settings";

function isLook(value: unknown): value is Look {
  return value === "compact" || value === "comfort";
}

// The kept settings the tracker can read.
function readable(kept: unknown): Partial<Kept> {
  if (!isRecord(kept)) {
    return {};
  }
  const { checkLook, isTimerOn, hasSplits, timerLook } = kept;
  return {
    ...(isLook(checkLook) ? { checkLook } : {}),
    ...(typeof isTimerOn === "boolean" ? { isTimerOn } : {}),
    ...(typeof hasSplits === "boolean" ? { hasSplits } : {}),
    ...(isLook(timerLook) ? { timerLook } : {}),
  };
}

/** A settings store, keeping to `storage`: the device's, or a test's. */
export function createSettingsStore(storage: StateStorage = deviceStorage) {
  return createStore<SettingsState>()(
    subscribeWithSelector(
      persist(
        (set) => ({
          ...START,
          setCheckLook: (checkLook) => set({ checkLook }),
          setTimerOn: (isTimerOn) => set({ isTimerOn }),
          setHasSplits: (hasSplits) => set({ hasSplits }),
          setTimerLook: (timerLook) => set({ timerLook }),
        }),
        {
          name: KEPT_NAME,
          storage: createJSONStorage(() => storage),
          partialize: ({ checkLook, isTimerOn, hasSplits, timerLook }) => ({
            checkLook,
            isTimerOn,
            hasSplits,
            timerLook,
          }),
          merge: (kept, current) => ({ ...current, ...readable(kept) }),
        }
      )
    )
  );
}

/** The page's one settings store. */
export const SETTINGS = createSettingsStore();
