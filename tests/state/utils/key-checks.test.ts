import { describe, expect, test } from "bun:test";
import * as data from "../../../src/data/elden-ring.js";
import { keyChecksFrom } from "../../../src/state/utils/key-checks.js";
import { arrivingSlot, LOCATION_NAMES, seed } from "../../fixtures/seeds.js";

describe("keyChecksFrom", () => {
  test("works a slot's key checks out from its slot_data", () => {
    const slot = arrivingSlot(seed("Izzy's preset"));
    expect(keyChecksFrom(data, slot, LOCATION_NAMES)?.size).toBeGreaterThan(0);
  });

  test("is undefined for slot_data in a shape they can't be worked out from", () => {
    expect(keyChecksFrom(data, { options: {} }, LOCATION_NAMES)).toBeUndefined();
  });
});
