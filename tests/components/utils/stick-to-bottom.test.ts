import { describe, expect, test } from "bun:test";
import { isAtBottom } from "../../../src/components/utils/stick-to-bottom.js";

describe("isAtBottom", () => {
  test("holds when the list is scrolled all the way down", () => {
    expect(isAtBottom({ scrollTop: 700, clientHeight: 300, scrollHeight: 1000 })).toBe(true);
  });

  test("holds a few pixels short, as a fractional scroll can leave it", () => {
    expect(isAtBottom({ scrollTop: 692, clientHeight: 300, scrollHeight: 1000 })).toBe(true);
  });

  test("doesn't hold once it's been scrolled up", () => {
    expect(isAtBottom({ scrollTop: 691, clientHeight: 300, scrollHeight: 1000 })).toBe(false);
  });

  test("holds for a list too short to scroll", () => {
    expect(isAtBottom({ scrollTop: 0, clientHeight: 300, scrollHeight: 120 })).toBe(true);
  });
});
