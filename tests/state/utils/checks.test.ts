import { describe, expect, test } from "bun:test";
import * as data from "../../../src/data/elden-ring.js";
import { regionChecksOf, searchChecks } from "../../../src/state/utils/checks.js";
import { firstCoded, inputs, received } from "../../fixtures/slots.js";

// The first Limgrave and Liurnia checks the slot_data lists.
const LIMGRAVE = firstCoded("LG");
const LIURNIA = firstCoded("LL");

describe("regionChecksOf", () => {
  test("lists a region's key checks apart from its others", () => {
    const checks = regionChecksOf(data, inputs({ keyChecks: new Set([LIMGRAVE]) }), "LG");
    expect(checks.key.map(({ id }) => id)).toEqual([LIMGRAVE]);
    expect(checks.other.some(({ id }) => id === LIMGRAVE)).toBe(false);
    expect(checks.other.length).toBeGreaterThan(0);
  });

  test("a check is collected once checked, locked while its region is, and to do otherwise", () => {
    const keyChecks = new Set([LIMGRAVE, LIURNIA]);
    const before = inputs({ keyChecks });
    expect(regionChecksOf(data, before, "LG").key[0]?.state).toBe("todo");
    expect(regionChecksOf(data, before, "LL").key[0]?.state).toBe("locked");
    const after = inputs({ keyChecks, checked: [LIURNIA] });
    expect(regionChecksOf(data, after, "LL").key[0]?.state).toBe("collected");
  });

  test("a part of an open region behind a rule of its own stays locked until that's met", () => {
    const states = (held: ReturnType<typeof received>) => {
      const { key, other } = regionChecksOf(data, inputs({ received: held }), "SV");
      return new Set([...key, ...other].map(({ state }) => state));
    };
    expect(states([])).toEqual(new Set(["todo", "locked"]));
    expect(states(received(1))).toEqual(new Set(["todo"]));
  });

  test("what a check held is given only once it's checked", () => {
    const held = [{ value: { item: 1, location: LIMGRAVE, player: 1, flags: 0 } }];
    const keyChecks = new Set([LIMGRAVE]);
    const unchecked = regionChecksOf(data, inputs({ keyChecks, received: held }), "LG");
    expect(unchecked.key[0]?.finding).toBeUndefined();
    const checked = regionChecksOf(
      data,
      inputs({ keyChecks, received: held, checked: [LIMGRAVE] }),
      "LG"
    );
    expect(checked.key[0]?.finding?.item).toBe("Rusty Key");
  });

  test("a spot's copies come straight after it, numbered in their order", () => {
    const { key, other } = regionChecksOf(data, inputs(), "CL");
    for (const rows of [key, other]) {
      rows.forEach((row, i) => {
        if (row.copy !== undefined && row.copy.nth > 1) {
          expect(rows[i - 1]?.copy).toMatchObject({ first: row.copy.first, nth: row.copy.nth - 1 });
        }
      });
    }
    expect([...key, ...other].filter(({ copy }) => copy !== undefined).length).toBeGreaterThan(0);
  });

  test("a region the room has no checks in has none", () => {
    expect(regionChecksOf(data, inputs(), "nowhere")).toEqual({ key: [], other: [] });
  });
});

describe("searchChecks", () => {
  const ids = (query: string, most = 1000, overrides = {}) =>
    searchChecks(data, inputs(overrides), query, most).hits.map(({ row }) => row.id);

  test("finds a check by a word of its region's name, in any case", () => {
    expect(ids("LIMGRAVE")).toContain(LIMGRAVE);
    expect(ids("limgrave")).not.toContain(LIURNIA);
  });

  test("needs every word, in any order", () => {
    const both = ids("lakes liurnia");
    expect(both).toContain(LIURNIA);
    expect(ids("liurnia limgrave")).toEqual([]);
  });

  test("gives key checks first", () => {
    const hits = searchChecks(
      data,
      inputs({ keyChecks: new Set([LIURNIA]) }),
      "liurnia",
      1000
    ).hits;
    expect(hits[0]?.row.id).toBe(LIURNIA);
  });

  test("gives at most so many, and says when there were more", () => {
    const search = searchChecks(data, inputs(), "limgrave", 5);
    expect(search.hits).toHaveLength(5);
    expect(search.isCapped).toBe(true);
  });

  test("finds what a check held only once it's checked", () => {
    const received = [{ value: { item: 2, location: LIMGRAVE, player: 1, flags: 0 } }];
    expect(ids("godrick's great rune", 1000, { received })).not.toContain(LIMGRAVE);
    expect(ids("godrick's great rune", 1000, { received, checked: [LIMGRAVE] })).toContain(
      LIMGRAVE
    );
  });

  test("an empty query finds nothing", () => {
    expect(ids("  ")).toEqual([]);
  });
});
