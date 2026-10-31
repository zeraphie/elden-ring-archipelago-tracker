import { describe, expect, test } from "bun:test";
import { isApworldSupported, RULES_APWORLD } from "../../../src/data/rules/apworld.js";

describe("isApworldSupported", () => {
  test("a room on the release the rules come from is supported", () => {
    expect(isApworldSupported(RULES_APWORLD.checksum)).toBe(true);
  });

  test("a room with no Elden Ring checksum isn't judged", () => {
    expect(isApworldSupported(undefined)).toBe(true);
  });

  test("any other checksum is unsupported, a past release's or one yet to come", () => {
    expect(isApworldSupported("c3ab8b33b4e26448022dd43b79b231082699e63b")).toBe(false);
    expect(isApworldSupported("a release yet to come")).toBe(false);
  });
});
