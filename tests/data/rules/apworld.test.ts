import { describe, expect, test } from "bun:test";
import { apworldSupportOf, RULES_APWORLD } from "../../../src/data/rules/apworld.js";

describe("apworldSupportOf", () => {
  test("a room on the release the rules come from is supported", () => {
    expect(apworldSupportOf(RULES_APWORLD.checksum)).toEqual({ isSupported: true });
  });

  test("a room with no Elden Ring checksum isn't judged", () => {
    expect(apworldSupportOf(undefined)).toEqual({ isSupported: true });
  });

  test("a past release is unsupported, and named", () => {
    expect(apworldSupportOf("c3ab8b33b4e26448022dd43b79b231082699e63b")).toEqual({
      isSupported: false,
      release: "0.1.3",
    });
  });

  test("a checksum it has never seen is unsupported, with no release to name", () => {
    expect(apworldSupportOf("a release yet to come")).toEqual({
      isSupported: false,
      release: undefined,
    });
  });
});
