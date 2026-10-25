import { describe, expect, test } from "bun:test";
import { routePath, RouteSketch } from "../../../../src/components/organisms/map/route.js";

const LINE = [
  { x: 36, y: -45.5 },
  { x: 37.25, y: -44 },
  { x: 39, y: -40 },
];

describe("routePath", () => {
  test("moves to the first point, then runs a line through the rest in order", () => {
    expect(routePath(LINE)).toBe("M36 -45.5L37.25 -44L39 -40");
  });
});

describe("RouteSketch", () => {
  test("keeps each sheet's lines apart, oldest first", () => {
    const sketch = new RouteSketch();
    sketch.add("surface", LINE);
    sketch.add("surface", LINE.slice(1));
    sketch.add("dlc", LINE);
    expect(sketch.on("surface")).toEqual([LINE, LINE.slice(1)]);
    expect(sketch.on("dlc")).toEqual([LINE]);
  });

  test("a line of a single point, a press that never moved, isn't kept", () => {
    const sketch = new RouteSketch();
    sketch.add("surface", LINE.slice(0, 1));
    expect(sketch.on("surface")).toEqual([]);
  });

  test("undo takes the sheet's last line away, and only that sheet's", () => {
    const sketch = new RouteSketch();
    sketch.add("surface", LINE);
    sketch.add("surface", LINE.slice(1));
    sketch.add("dlc", LINE);
    sketch.undo("surface");
    expect(sketch.on("surface")).toEqual([LINE]);
    expect(sketch.on("dlc")).toEqual([LINE]);
  });

  test("undo on a sheet with no lines leaves it with none", () => {
    const sketch = new RouteSketch();
    sketch.undo("surface");
    expect(sketch.on("surface")).toEqual([]);
  });

  test("clear takes every line off the sheet, and only that sheet", () => {
    const sketch = new RouteSketch();
    sketch.add("surface", LINE);
    sketch.add("dlc", LINE);
    sketch.clear("surface");
    expect(sketch.on("surface")).toEqual([]);
    expect(sketch.on("dlc")).toEqual([LINE]);
  });
});
