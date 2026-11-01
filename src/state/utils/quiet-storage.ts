/**
 * ─ Quiet storage ─
 *
 * What the store persists through: it holds what's to be kept, and writes it
 * only once the room has been quiet a while. A goal's release sends thousands
 * of messages at once, and writing the whole log for each of them ran the tab
 * out of memory. Only the newest state is held, and it's turned into text only
 * when it's written. Closing or hiding the page writes it at once.
 */

import type { PersistStorage } from "zustand/middleware";

// Izzy's wait: long enough that a burst of checks is one write.
const QUIET_MS = 10_000;

/** How quiet storage waits, and when the page tells it to write now. */
export interface QuietOptions {
  /** Runs a callback after a while: setTimeout, or a test's own. */
  readonly timer?: (callback: () => void, ms: number) => unknown;
  /** Calls `write` whenever the page is closed or hidden; the browser's own events unless a test hands in its own. */
  readonly onLeaving?: (write: () => void) => void;
}

// The page's own events: hiding is the last a phone's browser is sure to send.
function onPageLeaving(write: () => void): void {
  globalThis.addEventListener?.("pagehide", write);
  globalThis.document?.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      write();
    }
  });
}

/** Storage that passes reads straight through, and writes the newest value once nothing has changed for a while. */
export function quietStorage<S>(
  storage: PersistStorage<S>,
  { timer = setTimeout, onLeaving = onPageLeaving }: QuietOptions = {}
): PersistStorage<S> {
  let held: Parameters<PersistStorage<S>["setItem"]> | undefined;
  // Each change is a new wait; only the newest one's timer writes.
  let wait = 0;

  const write = (): void => {
    if (held !== undefined) {
      void storage.setItem(...held);
      held = undefined;
    }
  };
  onLeaving(write);

  return {
    getItem: (name) => storage.getItem(name),
    setItem: (name, value) => {
      held = [name, value];
      wait += 1;
      const mine = wait;
      timer(() => {
        if (mine === wait) {
          write();
        }
      }, QUIET_MS);
    },
    removeItem: (name) => {
      held = undefined;
      return storage.removeItem(name);
    },
  };
}
