import { describe, expect, test } from "bun:test";
import { shortName } from "../../../src/components/utils/goal-words.js";

describe("shortName", () => {
  test("stops at the first comma, before a boss's title", () => {
    expect(shortName("Godfrey, First Elden Lord")).toBe("Godfrey");
    expect(shortName("Sir Gideon Ofnir, the All-Knowing")).toBe("Sir Gideon Ofnir");
  });

  test("leaves a name with no comma as it is", () => {
    expect(shortName("Draconic Tree Sentinel")).toBe("Draconic Tree Sentinel");
  });
});
