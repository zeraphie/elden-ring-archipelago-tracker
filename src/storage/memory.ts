import type { StateStorage } from "zustand/middleware";

/** Storage in memory, in the database's place, so nothing outlasts the page; what it holds, from `entries` on, is open to look at. */
export function memoryStorage(
  entries: Iterable<readonly [string, string]> = []
): StateStorage & { readonly items: Map<string, string> } {
  const items = new Map<string, string>(entries);
  return {
    items,
    getItem: (key) => Promise.resolve(items.get(key) ?? null),
    setItem: (key, value) => {
      items.set(key, value);
      return Promise.resolve();
    },
    removeItem: (key) => {
      items.delete(key);
      return Promise.resolve();
    },
  };
}
