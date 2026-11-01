import { describe, expect, test } from "bun:test";
import * as data from "../../../src/data/elden-ring.js";
import type { GoalBoss } from "../../../src/data/bosses/goal.js";
import type { Need } from "../../../src/data/rules/rules.js";
import type { Run } from "../../../src/state/slices/run.js";
import { rowTimesOf } from "../../../src/state/utils/run-times.js";
import { idOf, inputs, MORGOTT, received } from "../../fixtures/slots.js";

const RUSTY_KEY = 1;
const GREAT_RUNE = 2;
const DECTUS = 3;
const GREAT_RUNE_DROP = "LRC/QB: Morgott's Great Rune - mainboss drop";
const REMEMBRANCE_DROP = "LRC/QB: Remembrance of the Omen King - mainboss drop";

const run = (times: Partial<Pick<Run, "checkTimes" | "itemTimes">>): Run => ({
  phase: "running",
  bankedMs: 0,
  since: undefined,
  checkTimes: {},
  itemTimes: {},
  ...times,
});

const item = (name: string): Need => ({ kind: "item", item: name });
const count = (needs: number): Need => ({
  kind: "count",
  label: "Runes",
  have: 0,
  needs,
  items: ["Rusty Key", "Godrick's Great Rune"],
});
const MORGOTT_BOSS: GoalBoss = {
  flag: MORGOTT,
  name: "Morgott, the Omen King",
  where: "LRC/QB",
  drop: GREAT_RUNE_DROP,
  state: "defeated",
};

describe("a row's time", () => {
  test("a boss came with the first of its drops, whichever the room names it by", () => {
    const checkTimes = { [idOf(GREAT_RUNE_DROP)]: 9_000, [idOf(REMEMBRANCE_DROP)]: 4_000 };
    const times = rowTimesOf(data, { ...inputs(), run: run({ checkTimes }) });
    expect(times.boss(MORGOTT_BOSS)).toBe(4_000);
  });

  test("a boss with no drop seen, or no drop at all, has no time", () => {
    const times = rowTimesOf(data, { ...inputs(), run: run({}) });
    expect(times.boss(MORGOTT_BOSS)).toBeUndefined();
    expect(times.boss({ ...MORGOTT_BOSS, drop: undefined })).toBeUndefined();
  });

  test("a boss the way needs came with its drops as well", () => {
    const checkTimes = { [idOf(REMEMBRANCE_DROP)]: 4_000 };
    const times = rowTimesOf(data, { ...inputs(), run: run({ checkTimes }) });
    expect(times.need({ kind: "location", location: GREAT_RUNE_DROP })).toBe(4_000);
  });

  test("an item came with the first of it, so a second copy seen doesn't time one that came unseen", () => {
    const state = { ...inputs({ received: received(RUSTY_KEY, RUSTY_KEY) }) };
    const times = rowTimesOf(data, { ...state, run: run({ itemTimes: { 1: 7_000 } }) });
    expect(times.need(item("Rusty Key"))).toBeUndefined();
  });

  test("an item seen coming has that time", () => {
    const state = inputs({ received: received(DECTUS, RUSTY_KEY) });
    const times = rowTimesOf(data, { ...state, run: run({ itemTimes: { 1: 7_000 } }) });
    expect(times.need(item("Rusty Key"))).toBe(7_000);
  });

  test("a count was made up by the item that reached what it needs, whatever came after", () => {
    const state = inputs({ received: received(DECTUS, RUSTY_KEY, GREAT_RUNE, RUSTY_KEY) });
    const itemTimes = { 1: 1_000, 2: 2_000, 3: 3_000 };
    const times = rowTimesOf(data, { ...state, run: run({ itemTimes }) });
    expect(times.need(count(2))).toBe(2_000);
  });

  test("a count made up by heavier items came with the last of them", () => {
    const state = inputs({ received: received(RUSTY_KEY) });
    const times = rowTimesOf(data, { ...state, run: run({ itemTimes: { 0: 1_000 } }) });
    expect(times.need(count(3))).toBe(1_000);
  });

  test("a choice came with the first of its parts seen", () => {
    const state = inputs({ received: received(RUSTY_KEY, DECTUS) });
    const times = rowTimesOf(data, { ...state, run: run({ itemTimes: { 0: 5_000, 1: 2_000 } }) });
    const choice: Need = {
      kind: "any",
      needs: [item("Rusty Key"), item("Dectus Medallion (Left)")],
    };
    expect(times.need(choice)).toBe(2_000);
  });

  test("a set of needs came with the last of them, and has no time if one came unseen", () => {
    const set: Need = { kind: "all", needs: [item("Rusty Key"), item("Dectus Medallion (Left)")] };
    const state = inputs({ received: received(RUSTY_KEY, DECTUS) });
    const both = rowTimesOf(data, { ...state, run: run({ itemTimes: { 0: 5_000, 1: 2_000 } }) });
    expect(both.need(set)).toBe(5_000);
    const one = rowTimesOf(data, { ...state, run: run({ itemTimes: { 1: 2_000 } }) });
    expect(one.need(set)).toBeUndefined();
  });

  test("a region reached has no time, as no message says when", () => {
    const times = rowTimesOf(data, { ...inputs(), run: run({}) });
    expect(times.need({ kind: "area", area: "Liurnia of the Lakes" })).toBeUndefined();
  });
});
