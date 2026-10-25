import { describe, expect, test } from "bun:test";
import {
  placeRows,
  rowLeft,
  rowViewsOf,
} from "../../../../src/components/organisms/goal-menu/goal-rows.js";
import type { GoalMenu } from "../../../../src/data/bosses/goal-menu.js";
import type { Need } from "../../../../src/data/rules/rules.js";

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
