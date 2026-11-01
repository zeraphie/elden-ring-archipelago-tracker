import { describe, expect, test } from "bun:test";
import {
  FEED_FILTERS,
  filterCounts,
  filterLabel,
  keeps,
} from "../../../../src/components/organisms/panel/feed-words.js";
import type { ItemEntry } from "../../../../src/state/utils/feed.js";

const RECEIVED = { kind: "received" } as ItemEntry;
const FOUND = { kind: "found" } as ItemEntry;
const SENT = { kind: "sent" } as ItemEntry;
const ITEMS = [RECEIVED, FOUND, FOUND, SENT, SENT, SENT];

describe("keeps", () => {
  test("keeps each kind under its own filter alone", () => {
    expect(ITEMS.filter((item) => keeps("received", item))).toEqual([RECEIVED]);
    expect(ITEMS.filter((item) => keeps("obtained", item))).toEqual([FOUND, FOUND]);
    expect(ITEMS.filter((item) => keeps("sent", item))).toEqual([SENT, SENT, SENT]);
  });

  test("keeps every kind under All", () => {
    expect(ITEMS.filter((item) => keeps("all", item))).toEqual(ITEMS);
  });
});

describe("filterCounts", () => {
  test("counts what each filter keeps", () => {
    expect(filterCounts(ITEMS)).toEqual({ received: 1, obtained: 2, sent: 3, all: 6 });
  });
});

describe("filterLabel", () => {
  const counts = filterCounts(ITEMS);

  test("has a count for each kind", () => {
    expect(filterLabel("obtained", counts)).toContain("2");
  });

  test("has no count on All", () => {
    expect(filterLabel("all", counts)).not.toMatch(/\d/);
  });

  test("lists the filters with obtained between received and sent", () => {
    expect(FEED_FILTERS.map(([filter]) => filter)).toEqual(["received", "obtained", "sent", "all"]);
  });
});
