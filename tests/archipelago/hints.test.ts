import { describe, expect, test } from "bun:test";
import { hintCost, hintsAvailable, pointsToNextHint } from "../../src/archipelago/hints.js";

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

describe("hintsAvailable", () => {
  test("counts the whole hints the points buy", () => {
    expect(hintsAvailable(82, 75)).toBe(1);
    expect(hintsAvailable(150, 75)).toBe(2);
  });

  test("is none just short of a hint", () => {
    expect(hintsAvailable(74, 75)).toBe(0);
  });
});

describe("pointsToNextHint", () => {
  test("is what's left to earn after the hints the points already buy", () => {
    expect(pointsToNextHint(82, 75)).toBe(68);
  });

  test("is a whole hint's cost from nothing, and from an exact number of hints", () => {
    expect(pointsToNextHint(0, 75)).toBe(75);
    expect(pointsToNextHint(150, 75)).toBe(75);
  });

  test("is one point just short of a hint", () => {
    expect(pointsToNextHint(74, 75)).toBe(1);
  });
});
