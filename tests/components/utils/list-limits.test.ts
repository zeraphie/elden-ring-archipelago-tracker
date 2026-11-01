import { describe, expect, test } from "bun:test";
import { listLimits } from "../../../src/components/utils/list-limits.js";

describe("listLimits", () => {
  test("leaves the list beside it what it needs", () => {
    const list = { offsetHeight: 200, scrollHeight: 2_000 };
    expect(listLimits(list, { offsetHeight: 300 }, 60, 80)).toEqual([60, 420]);
  });

  test("goes no further than the list's rows take", () => {
    const list = { offsetHeight: 200, scrollHeight: 260 };
    expect(listLimits(list, { offsetHeight: 300 }, 60, 80)).toEqual([60, 260]);
  });

  test("never asks for less than the least, with no room to give", () => {
    const list = { offsetHeight: 40, scrollHeight: 400 };
    expect(listLimits(list, { offsetHeight: 40 }, 60, 80)).toEqual([60, 60]);
  });
});
