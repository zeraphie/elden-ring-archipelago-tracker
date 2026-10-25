import { describe, expect, test } from "bun:test";
import { percentDone } from "../../../src/components/utils/figure.js";

describe("percentDone", () => {
  test("is how much of the whole is done, as a percentage", () => {
    expect(percentDone(1, 4)).toBe(25);
    expect(percentDone(14, 14)).toBe(100);
  });

  test("is none of a whole of nothing, rather than dividing by it", () => {
    expect(percentDone(0, 0)).toBe(0);
  });
});
