import { describe, expect, test } from "bun:test";
import { keyChecks } from "../../../src/data/checks/key-checks.js";
import type { RosterEntry } from "../../../src/state/slices/roster.js";
import { progressOf } from "../../../src/state/utils/progress.js";
import { seed, slotOf } from "../../fixtures/seeds.js";

// Izzy's preset: its key checks, and every other check in the room, by id.
const SLOT = slotOf(seed("Izzy's preset"));
const KEYS = keyChecks(SLOT);
const OTHERS = Object.keys(SLOT.locationIdsToName)
  .map(Number)
  .filter((id) => !KEYS.has(id));

const entry = (total: number): RosterEntry => ({
  team: 0,
  slot: 1,
  name: "Tarnished",
  game: "EldenRing",
  checksDone: 0,
  total,
  status: 20,
  lastActive: undefined,
});

describe("progressOf", () => {
  test("counts the key checks done out of all of them, and every check done out of all", () => {
    const keys = [...KEYS];
    const checked = [...keys.slice(0, 3), ...OTHERS.slice(0, 5)];
    const missing = [...keys.slice(3), ...OTHERS.slice(5)];
    expect(progressOf({ keyChecks: KEYS, checked, missing, roster: [], team: 0, slot: 1 })).toEqual(
      {
        keyDone: 3,
        keyAll: KEYS.size,
        allDone: 8,
        all: KEYS.size + OTHERS.length,
      }
    );
  });

  test("without the login's missing list, the web API's total for the slot stands in", () => {
    const progress = progressOf({
      keyChecks: KEYS,
      checked: [1, 2],
      missing: [],
      roster: [entry(3765)],
      team: 0,
      slot: 1,
    });
    expect(progress.all).toBe(3765);
  });

  test("the key checks aren't known until they're worked out", () => {
    const progress = progressOf({
      keyChecks: undefined,
      checked: [1],
      missing: [2],
      roster: [],
      team: 0,
      slot: 1,
    });
    expect(progress).toMatchObject({ keyDone: 0, keyAll: undefined });
  });
});
