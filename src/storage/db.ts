/**
 * ─ Database ─
 *
 * One IndexedDB database, the tracker's own on an origin its other projects
 * share, with a `state` store of the JSON strings the zustand store reads and
 * writes through `stateStorage`. IndexedDB rather than localStorage because a
 * long run's log is kept whole, and grows past what localStorage holds.
 * Opened once, on first use; every call is a promise.
 */

import type { StateStorage } from "zustand/middleware";

const NAME = "elden-ring-archipelago-tracker";
const VERSION = 1;
const STATE = "state";

let opening: Promise<IDBDatabase> | undefined;

// The stores are made the first time this version opens; a later version adds its own here.
function open(): Promise<IDBDatabase> {
  opening ??= new Promise((resolve, reject) => {
    const request = indexedDB.open(NAME, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STATE)) {
        db.createObjectStore(STATE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("The database would not open."));
    request.onblocked = () => {
      reject(new Error("The database is open in another tab at an older version."));
    };
  });
  return opening;
}

function settled<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("The database request failed."));
  });
}

async function read(key: string): Promise<string | undefined> {
  const db = await open();
  const found: unknown = await settled(
    db.transaction(STATE, "readonly").objectStore(STATE).get(key)
  );
  return typeof found === "string" ? found : undefined;
}

async function write(key: string, value: string): Promise<void> {
  const db = await open();
  await settled(db.transaction(STATE, "readwrite").objectStore(STATE).put(value, key));
}

async function remove(key: string): Promise<void> {
  const db = await open();
  await settled(db.transaction(STATE, "readwrite").objectStore(STATE).delete(key));
}

/** What the zustand store persists through: JSON strings by name, in the database's state store. */
export const stateStorage: StateStorage = {
  getItem: async (name) => (await read(name)) ?? null,
  setItem: (name, value) => write(name, value),
  removeItem: (name) => remove(name),
};
