import { describe, expect, test } from "bun:test";
import { versionNoticesOf } from "../../../src/state/utils/version-notice.js";

describe("versionNoticesOf", () => {
  test("nothing when the room runs the tested release", () => {
    expect(
      versionNoticesOf({ serverVersion: { major: 0, minor: 6, build: 8 } }, "0.6.8+1")
    ).toEqual([]);
  });

  test("a newer Archipelago, with both versions", () => {
    expect(
      versionNoticesOf({ serverVersion: { major: 0, minor: 6, build: 9 } }, "0.6.8+1")
    ).toEqual([{ room: "0.6.9", tested: "0.6.8" }]);
  });

  test("nothing it can't tell: no login, as on a tracker link", () => {
    expect(versionNoticesOf({ serverVersion: undefined }, "0.6.8")).toEqual([]);
  });
});
