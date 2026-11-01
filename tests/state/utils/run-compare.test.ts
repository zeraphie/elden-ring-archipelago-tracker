import { describe, expect, test } from "bun:test";
import { comparisonOf, previousSegment } from "../../../src/state/utils/run-compare.js";

const FASTEST = { timeMs: 100_000, rows: { a: 10_000, b: 20_000 } };
const SLOWER = { timeMs: 200_000, rows: { a: 30_000, b: 15_000, c: 40_000 } };
const RUNS = [SLOWER, FASTEST];

describe("the comparison", () => {
  test("gives a row left the fastest run's time, whichever order the runs came in", () => {
    expect(comparisonOf(RUNS).timeOf("a")).toBe(10_000);
    expect(comparisonOf([FASTEST, SLOWER]).timeOf("a")).toBe(10_000);
  });

  test("has no time for a row the fastest run didn't have, though a slower one did", () => {
    expect(comparisonOf(RUNS).timeOf("c")).toBeUndefined();
  });

  test("is sooner than a row has ever come: the best", () => {
    expect(comparisonOf(RUNS).paceOf("a", 9_000)).toEqual({ diffMs: -1_000, pace: "best" });
  });

  test("is ahead of the fastest run but not sooner than a slower run was on that row", () => {
    expect(comparisonOf(RUNS).paceOf("b", 18_000)).toEqual({ diffMs: -2_000, pace: "ahead" });
  });

  test("is behind the fastest run, or level with it", () => {
    expect(comparisonOf(RUNS).paceOf("a", 12_000)).toEqual({ diffMs: 2_000, pace: "behind" });
    expect(comparisonOf(RUNS).paceOf("a", 10_000)?.pace).toBe("behind");
  });

  test("has nothing to say of a row the fastest run didn't have", () => {
    expect(comparisonOf(RUNS).paceOf("c", 1_000)).toBeUndefined();
  });

  test("has nothing to say with no earlier run", () => {
    expect(comparisonOf([]).timeOf("a")).toBeUndefined();
    expect(comparisonOf([]).paceOf("a", 1_000)).toBeUndefined();
  });
});

describe("the previous segment", () => {
  test("is what the latest row gained or lost on the one before", () => {
    expect(previousSegment([5_000, 3_000])).toBe(-2_000);
    expect(previousSegment([-1_000, 4_000])).toBe(5_000);
  });

  test("is the whole difference for the first row, or one after a row with nothing to compare", () => {
    expect(previousSegment([2_000])).toBe(2_000);
    expect(previousSegment([undefined, 2_000])).toBe(2_000);
  });

  test("is nothing when the latest row has nothing to compare", () => {
    expect(previousSegment([2_000, undefined])).toBeUndefined();
    expect(previousSegment([])).toBeUndefined();
  });
});
