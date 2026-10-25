import { describe, expect, test } from "bun:test";
import { BOSSES } from "../../../src/data/bosses/bosses.js";
import { isMainPathItemNeed, MAIN_PATH_BOSSES } from "../../../src/data/bosses/main-path.js";
import { LOCATION_GROUPS } from "../../../src/data/checks/location-groups.js";
import { GREAT_RUNE_NAMES } from "../../../src/data/rules/gates/key-rules.js";
import type { Need } from "../../../src/data/rules/rules.js";
import { any, area, item, location } from "../../fixtures/rooms.js";

const DRACONIC_TREE_SENTINEL = 1045520800;
const countOf = (label: string, ...items: string[]): Need => ({
  kind: "count",
  label,
  have: 0,
  needs: 2,
  items,
});

describe("isMainPathItemNeed", () => {
  test("holds for the main path's items, and not for a key or a lock", () => {
    expect(isMainPathItemNeed(item("Dectus Medallion (Left)"))).toBe(true);
    expect(isMainPathItemNeed(item("Rold Medallion"))).toBe(true);
    expect(isMainPathItemNeed(item("Messmer's Kindling"))).toBe(true);
    expect(isMainPathItemNeed(item("Rusty Key"))).toBe(false);
    expect(isMainPathItemNeed(item("Liurnia Lock"))).toBe(false);
  });

  test("holds for a count of great runes or of the main path's shards, and not of keys", () => {
    expect(isMainPathItemNeed(countOf("Great Runes", ...GREAT_RUNE_NAMES))).toBe(true);
    expect(isMainPathItemNeed(countOf("Rold Medallion Shards", "Rold Medallion Shard"))).toBe(true);
    expect(
      isMainPathItemNeed(countOf("Messmer's Kindling Shards", "Messmer's Kindling Shard"))
    ).toBe(true);
    expect(isMainPathItemNeed(countOf("Stonesword Keys", "Stonesword Key"))).toBe(false);
    expect(isMainPathItemNeed(countOf("Nothing"))).toBe(false);
  });

  test("holds for a choice only when every part is the main path's", () => {
    expect(
      isMainPathItemNeed(any(item("Dectus Medallion (Left)"), item("Dectus Medallion (Right)")))
    ).toBe(true);
    expect(
      isMainPathItemNeed(any(item("Rold Medallion"), item("Haligtree Secret Medallion (Left)")))
    ).toBe(false);
  });

  test("never holds for a region or a location, which the region graph places", () => {
    expect(isMainPathItemNeed(area("Altus Plateau"))).toBe(false);
    expect(
      isMainPathItemNeed(location("FP/FF: Remembrance of the Fire Giant - mainboss drop"))
    ).toBe(false);
  });
});

describe("MAIN_PATH_BOSSES", () => {
  test("holds eleven bosses, each a goal boss but the Draconic Tree Sentinel", () => {
    expect(MAIN_PATH_BOSSES.size).toBe(11);
    const notGoals = [...MAIN_PATH_BOSSES.keys()].filter((flag) => !BOSSES.has(flag));
    expect(notGoals).toEqual([DRACONIC_TREE_SENTINEL]);
  });

  test("every drop is a location the apworld lists", () => {
    const unknown = [...MAIN_PATH_BOSSES.values()]
      .flatMap(({ drops }) => drops)
      .filter((drop) => !LOCATION_GROUPS.has(drop));
    expect(unknown).toEqual([]);
  });
});
