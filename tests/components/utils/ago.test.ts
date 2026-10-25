import { describe, expect, test } from "bun:test";
import { ago, elapsed } from "../../../src/components/utils/ago.js";

const NOW = Date.UTC(2026, 9, 22, 20, 0, 0);
const s = 1000;
const m = 60 * s;
const h = 60 * m;
const d = 24 * h;

describe("elapsed", () => {
  test("an event with no stamp, seen before the tracker was watching, has no time", () => {
    expect(elapsed(undefined, NOW)).toEqual({ kind: "unknown" });
  });

  test("under a second is now", () => {
    expect(elapsed(NOW, NOW)).toEqual({ kind: "now" });
    expect(elapsed(NOW - 999, NOW)).toEqual({ kind: "now" });
  });

  test("seconds count up to a minute, whole seconds gone", () => {
    expect(elapsed(NOW - s, NOW)).toEqual({ kind: "past", count: 1, unit: "second" });
    expect(elapsed(NOW - (12 * s + 900), NOW)).toEqual({ kind: "past", count: 12, unit: "second" });
    expect(elapsed(NOW - (59 * s + 999), NOW)).toEqual({ kind: "past", count: 59, unit: "second" });
  });

  test("a stamp ahead of the clock is now, never a negative time", () => {
    expect(elapsed(NOW + 5 * m, NOW)).toEqual({ kind: "now" });
  });

  test("minutes round to the nearest, from one", () => {
    expect(elapsed(NOW - m, NOW)).toEqual({ kind: "past", count: 1, unit: "minute" });
    expect(elapsed(NOW - 89 * s, NOW)).toEqual({ kind: "past", count: 1, unit: "minute" });
    expect(elapsed(NOW - 90 * s, NOW)).toEqual({ kind: "past", count: 2, unit: "minute" });
    expect(elapsed(NOW - 5 * m, NOW)).toEqual({ kind: "past", count: 5, unit: "minute" });
    expect(elapsed(NOW - (59 * m + 29 * s), NOW)).toEqual({
      kind: "past",
      count: 59,
      unit: "minute",
    });
  });

  test("minutes give way to an hour once they would round to sixty", () => {
    expect(elapsed(NOW - (59 * m + 31 * s), NOW)).toEqual({ kind: "past", count: 1, unit: "hour" });
    expect(elapsed(NOW - 3 * h, NOW)).toEqual({ kind: "past", count: 3, unit: "hour" });
    expect(elapsed(NOW - (23 * h + 29 * m), NOW)).toEqual({
      kind: "past",
      count: 23,
      unit: "hour",
    });
  });

  test("hours give way to days once they would round to twenty-four", () => {
    expect(elapsed(NOW - (23 * h + 31 * m), NOW)).toEqual({ kind: "past", count: 1, unit: "day" });
    expect(elapsed(NOW - 35 * h, NOW)).toEqual({ kind: "past", count: 1, unit: "day" });
    expect(elapsed(NOW - 40 * h, NOW)).toEqual({ kind: "past", count: 2, unit: "day" });
    expect(elapsed(NOW - 10 * d, NOW)).toEqual({ kind: "past", count: 10, unit: "day" });
  });
});

describe("ago", () => {
  const intl = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });

  test("a past moment is said the way Intl says its unit and count", () => {
    expect(ago(NOW - 12 * s, NOW)).toBe(intl.format(-12, "second"));
    expect(ago(NOW - 5 * m, NOW)).toBe(intl.format(-5, "minute"));
    expect(ago(NOW - 3 * h, NOW)).toBe(intl.format(-3, "hour"));
    expect(ago(NOW - 26 * h, NOW)).toBe(intl.format(-1, "day"));
  });

  test("no time, now and a past moment are each said differently", () => {
    const sayings = new Set([ago(undefined, NOW), ago(NOW, NOW), ago(NOW - 5 * m, NOW)]);
    expect(sayings.size).toBe(3);
  });
});
