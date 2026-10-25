import { describe, expect, test } from "bun:test";
import { releaseVersion, watchOutputs } from "../../tools/archipelago-release.js";

describe("releaseVersion", () => {
  test("reads a release tag of three numbers", () => {
    expect(releaseVersion("0.6.8")).toMatchObject({ major: 0, minor: 6, build: 8 });
  });

  test("reads no other form, such as a prefix or a pre-release", () => {
    expect(releaseVersion("v0.6.8")).toBeUndefined();
    expect(releaseVersion("0.6.9-rc1")).toBeUndefined();
    expect(releaseVersion("")).toBeUndefined();
  });
});

describe("watchOutputs", () => {
  const outputs = (tag: string, tracker: string) =>
    Object.fromEntries(
      watchOutputs(tag, tracker)
        .trim()
        .split("\n")
        .map((line) => line.split("="))
    );

  test("says a later release is newer than the one the tracker is tested against", () => {
    expect(outputs("0.6.9", "0.6.8")).toEqual({ latest: "0.6.9", tested: "0.6.8", newer: "true" });
  });

  test("says the same release, or an older one, isn't newer, the tracker's own changes aside", () => {
    expect(outputs("0.6.8", "0.6.8+2").newer).toBe("false");
    expect(outputs("0.6.7", "0.6.8").newer).toBe("false");
  });

  test("fails on a tag it can't read, rather than say it isn't newer", () => {
    expect(() => watchOutputs("next", "0.6.8")).toThrow();
  });
});
