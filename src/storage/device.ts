/**
 * ─ Device storage ─
 *
 * What's kept for the person on this device rather than for a room, through
 * localStorage, which is read at once, so the page starts with it. A private
 * window or blocked site data can refuse it, and the page then works the same
 * for the visit, with nothing kept.
 */

import type { StateStorage } from "zustand/middleware";

/** What the settings persist through: strings by name, in localStorage where it's allowed. */
export const deviceStorage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      // Without storage the value holds until the page is reloaded.
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // Nothing was kept, so there's nothing to remove.
    }
  },
};
