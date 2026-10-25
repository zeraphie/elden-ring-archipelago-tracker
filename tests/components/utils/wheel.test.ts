import { describe, expect, test } from "bun:test";
import { wheelDeltaToPixels } from "../../../src/components/utils/wheel.js";

describe("wheelDeltaToPixels", () => {
  test("passes pixel deltas through unchanged", () => {
    expect(wheelDeltaToPixels(37, 0, 900)).toBe(37);
  });

  test("scales line deltas by a text row", () => {
    expect(wheelDeltaToPixels(3, 1, 900)).toBe(48);
  });

  test("scales page deltas by the size of what scrolls", () => {
    expect(wheelDeltaToPixels(-1, 2, 900)).toBe(-900);
  });
});
