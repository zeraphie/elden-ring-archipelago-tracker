import { describe, expect, test } from "bun:test";
import { createJSONStorage } from "zustand/middleware";
import { quietStorage } from "../../../src/state/utils/quiet-storage.js";
import { memory } from "../../fixtures/stores.js";

const value = (count: number) => ({ state: { count }, version: 1 });

// Quiet storage over memory, its waits held to run, and its leaving handler to call.
function quiet() {
  const kept = memory();
  const waits: { run: () => void; ms: number }[] = [];
  let leave: () => void = () => {};
  let writes = 0;
  const json = createJSONStorage<{ count: number }>(() => ({
    ...kept,
    setItem: (name, text) => {
      writes += 1;
      return kept.setItem(name, text);
    },
  }));
  if (json === undefined) {
    throw new Error("JSON storage needs a storage");
  }
  const storage = quietStorage(json, {
    timer: (run, ms) => waits.push({ run, ms }),
    onLeaving: (write) => {
      leave = write;
    },
  });
  return { kept, storage, waits, leave: () => leave(), writes: () => writes };
}

describe("quietStorage", () => {
  test("a burst of changes is one write, of the newest, once the last wait is over", () => {
    const run = quiet();
    for (let count = 1; count <= 3700; count += 1) {
      void run.storage.setItem("room", value(count));
    }
    expect(run.writes()).toBe(0);
    run.waits.forEach((wait) => wait.run());
    expect(run.writes()).toBe(1);
    expect(run.kept.items.get("room")).toContain('"count":3700');
  });

  test("waits ten seconds after the last change", () => {
    const run = quiet();
    void run.storage.setItem("room", value(1));
    expect(run.waits[0]?.ms).toBe(10_000);
  });

  test("an older wait ending writes nothing while a newer one runs", () => {
    const run = quiet();
    void run.storage.setItem("room", value(1));
    void run.storage.setItem("room", value(2));
    run.waits[0]?.run();
    expect(run.writes()).toBe(0);
  });

  test("the page closing writes what's held at once, and nothing twice", () => {
    const run = quiet();
    void run.storage.setItem("room", value(1));
    run.leave();
    expect(run.writes()).toBe(1);
    run.waits.forEach((wait) => wait.run());
    run.leave();
    expect(run.writes()).toBe(1);
  });

  test("clearing a room drops what's held", async () => {
    const run = quiet();
    void run.storage.setItem("room", value(1));
    await run.storage.removeItem("room");
    run.waits.forEach((wait) => wait.run());
    expect(run.writes()).toBe(0);
  });

  test("reads go straight through", async () => {
    const run = quiet();
    run.kept.items.set("room", JSON.stringify(value(5)));
    expect(await run.storage.getItem("room")).toEqual(value(5));
  });
});
