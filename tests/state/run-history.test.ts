import { describe, expect, test } from "bun:test";
import { keepRun, keptRuns, presetOf, runsEntry } from "../../src/state/run-history.js";
import { memory } from "../fixtures/stores.js";

const RUN = { timeMs: 5_000, rows: { "boss:1": 2_000 } };

describe("a room's preset", () => {
  test("is the same for rooms of the same options, whatever else their seeds hold", () => {
    const options = { goal_count: 3, dlc: true };
    expect(presetOf({ options, goal: [1] })).toBe(presetOf({ options, goal: [2], slot: "Other" }));
  });

  test("doesn't change with the order the options came in, at any depth", () => {
    const first = { a: 1, b: { c: 2, d: [3, 4] } };
    const second = { b: { d: [3, 4], c: 2 }, a: 1 };
    expect(presetOf({ options: first })).toBe(presetOf({ options: second }));
  });

  test("changes with any option", () => {
    expect(presetOf({ options: { a: 1 } })).not.toBe(presetOf({ options: { a: 2 } }));
    expect(presetOf({ options: { a: [1, 2] } })).not.toBe(presetOf({ options: { a: [2, 1] } }));
  });

  test("is nothing for slot_data with no options, or none yet", () => {
    expect(presetOf({ goal: [1] })).toBeUndefined();
    expect(presetOf(undefined)).toBeUndefined();
  });
});

describe("the runs kept", () => {
  test("start with none", async () => {
    expect(await keptRuns("a", memory())).toEqual([]);
  });

  test("come back in the order they finished", async () => {
    const storage = memory();
    await keepRun("a", RUN, storage);
    await keepRun("a", { ...RUN, timeMs: 3_000 }, storage);
    expect((await keptRuns("a", storage)).map(({ timeMs }) => timeMs)).toEqual([5_000, 3_000]);
  });

  test("stay apart by preset", async () => {
    const storage = memory();
    await keepRun("a", RUN, storage);
    expect(await keptRuns("b", storage)).toEqual([]);
  });

  test("leave out what can't be read, and come back as none when nothing can", async () => {
    const [name] = runsEntry("a", []);
    const good = JSON.stringify([
      { timeMs: "soon", rows: {} },
      RUN,
      { timeMs: 1, rows: { x: "y" } },
    ]);
    expect(await keptRuns("a", memory([[name, good]]))).toEqual([RUN]);
    expect(await keptRuns("a", memory([[name, "{not json"]]))).toEqual([]);
    expect(await keptRuns("a", memory([[name, "{}"]]))).toEqual([]);
  });
});
