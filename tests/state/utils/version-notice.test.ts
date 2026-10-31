import { describe, expect, test } from "bun:test";
import { RULES_APWORLD } from "../../../src/data/rules/apworld.js";
import { versionNoticesOf } from "../../../src/state/utils/version-notice.js";

const SLOT = { versions: ">=0.1 <0.2" };

describe("versionNoticesOf", () => {
  test("nothing when the room runs the tested release on the apworld the rules came from", () => {
    expect(
      versionNoticesOf(
        { serverVersion: { major: 0, minor: 6, build: 8 }, slotData: SLOT },
        "0.6.8+1"
      )
    ).toEqual([]);
  });

  test("a newer Archipelago, with both versions", () => {
    expect(
      versionNoticesOf(
        { serverVersion: { major: 0, minor: 6, build: 9 }, slotData: SLOT },
        "0.6.8+1"
      )
    ).toEqual([{ kind: "archipelago", room: "0.6.9", tested: "0.6.8" }]);
  });

  test("another apworld, with its range and the release the rules came from", () => {
    expect(
      versionNoticesOf({ serverVersion: undefined, slotData: { versions: ">=0.2 <0.3" } }, "0.6.8")
    ).toEqual([{ kind: "apworld", room: ">=0.2 <0.3", rules: RULES_APWORLD.release }]);
  });

  test("nothing it can't tell: no login, as on a tracker link, or slot_data without versions", () => {
    expect(versionNoticesOf({ serverVersion: undefined, slotData: {} }, "0.6.8")).toEqual([]);
    expect(versionNoticesOf({ serverVersion: undefined, slotData: undefined }, "0.6.8")).toEqual(
      []
    );
  });
});
