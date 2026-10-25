import { describe, expect, test } from "bun:test";
import * as data from "../../../src/data/elden-ring.js";
import { keyChecksFrom } from "../../../src/state/utils/key-checks.js";
import { seed, slotOf } from "../../fixtures/seeds.js";

describe("keyChecksFrom", () => {
  test("works a slot's key checks out from its slot_data", () => {
    expect(keyChecksFrom(data, { ...slotOf(seed("Izzy's preset")) })?.size).toBeGreaterThan(0);
  });

  test("is undefined for slot_data in a shape they can't be worked out from", () => {
    expect(keyChecksFrom(data, { options: {} })).toBeUndefined();
  });
});
