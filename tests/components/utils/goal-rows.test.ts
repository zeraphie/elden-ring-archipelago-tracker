import { describe, expect, test } from "bun:test";
import {
  byTimeCame,
  placeRows,
  rowLeft,
  rowTarget,
  rowViewsOf,
  settleRows,
  type RowView,
} from "../../../src/components/utils/goal-rows.js";
import type { GoalMenu } from "../../../src/data/bosses/goal-menu.js";
import type { Need } from "../../../src/data/rules/rules.js";

describe("byTimeCame", () => {
  const TIMES = new Map([
    ["a", 300],
    ["b", 100],
  ]);
  const timeOf = (key: string) => TIMES.get(key);

  test("the latest comes last", () => {
    expect(byTimeCame(["a", "b"], timeOf)).toEqual(["b", "a"]);
  });

  test("a row with no time comes before any with one, and those with none stay as they were", () => {
    expect(byTimeCame(["a", "x", "b", "y"], timeOf)).toEqual(["x", "y", "b", "a"]);
  });

  test("rows at the same time stay as they were", () => {
    expect(byTimeCame(["y", "x"], () => 5)).toEqual(["y", "x"]);
  });

  test("a time of nought comes after no time at all", () => {
    expect(byTimeCame(["a", "x"], (key) => (key === "a" ? 0 : undefined))).toEqual(["x", "a"]);
  });
});

describe("settleRows", () => {
  test("a row done goes straight to the end of what's obtained, with nothing leaving", () => {
    const before = settleRows(undefined, ["a", "b", "c"], ["x"]);
    expect(settleRows(before, ["a", "c"], ["x", "b"])).toEqual({
      toDo: ["a", "c"],
      leaving: [],
      obtained: ["x", "b"],
    });
  });

  test("rows done keep the order they came in, whatever order the goal lists them in", () => {
    const first = settleRows(settleRows(undefined, ["a", "b"], []), ["a"], ["b"]);
    expect(settleRows(first, [], ["a", "b"]).obtained).toEqual(["b", "a"]);
  });

  test("a row undone goes back among those to do", () => {
    const before = settleRows(undefined, ["a"], ["b"]);
    expect(settleRows(before, ["a", "b"], [])).toEqual({
      toDo: ["a", "b"],
      leaving: [],
      obtained: [],
    });
  });
});

describe("placeRows", () => {
  test("the rows the menu opens on take their places at once, with nothing leaving", () => {
    expect(placeRows(undefined, ["a", "b"], ["c"])).toEqual({
      rows: { toDo: ["a", "b"], leaving: [], obtained: ["c"] },
      started: [],
    });
  });

  test("a row achieved keeps its place while it leaves, and isn't obtained yet", () => {
    const { rows: before } = placeRows(undefined, ["a", "b", "c"], ["x"]);
    const { rows, started } = placeRows(before, ["a", "c"], ["x", "b"]);
    expect(started).toEqual(["b"]);
    expect(rows).toEqual({ toDo: ["a", "b", "c"], leaving: ["b"], obtained: ["x"] });
  });

  test("rows achieved together start leaving together, in the order shown", () => {
    const { rows: before } = placeRows(undefined, ["a", "b", "c"], []);
    expect(placeRows(before, ["b"], ["c", "a"]).started).toEqual(["a", "c"]);
  });

  test("a row already leaving doesn't start again", () => {
    const { rows: first } = placeRows(undefined, ["a"], []);
    const { rows: leaving } = placeRows(first, [], ["a"]);
    expect(placeRows(leaving, [], ["a"]).started).toEqual([]);
  });

  test("a row done that the list never had is obtained at once, last", () => {
    const { rows: before } = placeRows(undefined, ["a"], ["x"]);
    expect(placeRows(before, ["a"], ["x", "y"]).rows.obtained).toEqual(["x", "y"]);
  });

  test("a row undone while leaving goes back to being to do", () => {
    const { rows: first } = placeRows(undefined, ["a"], []);
    const { rows: leaving } = placeRows(first, [], ["a"]);
    expect(placeRows(leaving, ["a"], []).rows).toEqual({ toDo: ["a"], leaving: [], obtained: [] });
  });
});

describe("rowLeft", () => {
  test("a row that has left goes from the list to the end of what's obtained", () => {
    const { rows: before } = placeRows(undefined, ["a", "b"], ["x"]);
    const { rows: leaving } = placeRows(before, ["a"], ["x", "b"]);
    expect(rowLeft(leaving, "b")).toEqual({ toDo: ["a"], leaving: [], obtained: ["x", "b"] });
  });

  test("a row that isn't leaving stays as it is", () => {
    const { rows } = placeRows(undefined, ["a"], []);
    expect(rowLeft(rows, "a")).toBe(rows);
  });
});

describe("rowTarget", () => {
  const OWN = new Map([["Rusty Key", 42]]);
  const need = (each: Need): RowView => ({ key: "k", isGotten: true, kind: "need", need: each });
  const boss = (drop: string | undefined): RowView => ({
    key: "k",
    isGotten: true,
    kind: "boss",
    boss: { flag: 1, name: "Godfrey", where: undefined, drop, state: "defeated" },
  });

  test("a boss leads to its drop's check", () => {
    expect(rowTarget(boss("LRC: Drop"), OWN)).toEqual({ kind: "named", name: "LRC: Drop" });
  });

  test("a boss with no drop in the room leads nowhere", () => {
    expect(rowTarget(boss(undefined), OWN)).toBeUndefined();
  });

  test("a main-path boss's need leads to its drop's check", () => {
    expect(rowTarget(need({ kind: "location", location: "LRC: Drop" }), OWN)).toEqual({
      kind: "named",
      name: "LRC: Drop",
    });
  });

  test("an item the slot found itself leads to the check it was in", () => {
    expect(rowTarget(need({ kind: "item", item: "Rusty Key" }), OWN)).toEqual({
      kind: "check",
      id: 42,
    });
  });

  test("an item from elsewhere leads to the items, having no check here", () => {
    expect(rowTarget(need({ kind: "item", item: "Rold Medallion" }), OWN)).toEqual({
      kind: "items",
    });
  });

  test("a count leads to the items, being made of several", () => {
    const count: Need = { kind: "count", label: "Great Runes", have: 2, needs: 2, items: [] };
    expect(rowTarget(need(count), OWN)).toEqual({ kind: "items" });
  });
});

describe("rowViewsOf", () => {
  const key = (need: Need) => (need.kind === "item" ? need.item : need.kind);
  const menu: GoalMenu = {
    needed: [{ kind: "count", label: "Great Runes", have: 1, needs: 2, items: [] }],
    met: [{ kind: "item", item: "Rusty Key" }],
    bosses: [
      { flag: 1, name: "Godfrey", where: undefined, drop: undefined, state: "to do" },
      { flag: 2, name: "Morgott", where: undefined, drop: undefined, state: "defeated" },
    ],
  };

  test("needs and bosses not yet done are to do; those done are, needs before bosses", () => {
    const { toDo, done } = rowViewsOf(menu, key, false);
    expect(toDo.map(({ key: k, isGotten }) => [k, isGotten])).toEqual([
      ["count", false],
      ["boss:1", false],
    ]);
    expect(done.map(({ key: k, isGotten }) => [k, isGotten])).toEqual([
      ["Rusty Key", true],
      ["boss:2", true],
    ]);
  });

  test("once all's done, every need is met, a count in full, and every boss defeated", () => {
    const { toDo, done } = rowViewsOf(menu, key, true);
    expect(toDo).toEqual([]);
    expect(done.map(({ key: k }) => k)).toEqual(["Rusty Key", "count", "boss:1", "boss:2"]);
    expect(done.find(({ key: k }) => k === "count")).toMatchObject({ need: { have: 2, needs: 2 } });
    expect(done.find(({ key: k }) => k === "boss:1")).toMatchObject({
      boss: { state: "defeated" },
    });
  });
});
