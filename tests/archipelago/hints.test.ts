import { describe, expect, test } from "bun:test";
import { hintCost } from "../../src/archipelago/hints.js";

describe("hintCost", () => {
  test("is the hint price's share of the slot's locations, rounded down", () => {
    expect(hintCost(10, 3765)).toBe(376);
  });

  test("matches the server's floating point, even where whole numbers would differ", () => {
    // 29 * 0.01 * 100 is 28.999999999999996 in floating point, so the server asks 28.
    expect(hintCost(29, 100)).toBe(28);
  });

  test("is at least one point when hints cost anything, and none when they're free", () => {
    expect(hintCost(1, 10)).toBe(1);
    expect(hintCost(0, 3765)).toBe(0);
  });
});
