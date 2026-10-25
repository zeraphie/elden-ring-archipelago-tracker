import { describe, expect, test } from "bun:test";
import { isNewer, serverVersionOf, versionText } from "../../src/archipelago/versions.js";

describe("serverVersionOf", () => {
  test("reads RoomInfo's version", () => {
    expect(
      serverVersionOf({ version: { class: "Version", major: 0, minor: 6, build: 9 } })
    ).toEqual({
      major: 0,
      minor: 6,
      build: 9,
    });
  });

  test("is undefined for a RoomInfo without one, or with one in another shape", () => {
    expect(serverVersionOf({})).toBeUndefined();
    expect(serverVersionOf({ version: "0.6.9" })).toBeUndefined();
    expect(serverVersionOf({ version: { major: 0, minor: 6 } })).toBeUndefined();
  });
});

describe("isNewer", () => {
  test("is newer only past the tested release, whatever the tracker's own changes since", () => {
    expect(isNewer({ major: 0, minor: 6, build: 9 }, "0.6.8+2")).toBe(true);
    expect(isNewer({ major: 0, minor: 7, build: 0 }, "0.6.8")).toBe(true);
    expect(isNewer({ major: 0, minor: 6, build: 8 }, "0.6.8+2")).toBe(false);
    expect(isNewer({ major: 0, minor: 5, build: 12 }, "0.6.8")).toBe(false);
  });
});

describe("versionText", () => {
  test("reads as its three numbers", () => {
    expect(versionText({ major: 0, minor: 6, build: 9 })).toBe("0.6.9");
  });
});
