import { describe, expect, test } from "bun:test";
import type { Point } from "../../../../../src/components/organisms/map/camera/camera-math.js";
import {
  isTap,
  pinchStep,
  wheelZoomFactor,
} from "../../../../../src/components/organisms/map/camera/gesture-math.js";

const pair = (a: Point, b: Point): readonly [Point, Point] => [a, b];

describe("isTap", () => {
  test("a press that stayed within a few pixels is a click; one that travelled is a drag", () => {
    expect(isTap({ x: 10, y: 10 }, { x: 12, y: 11 })).toBe(true);
    expect(isTap({ x: 10, y: 10 }, { x: 14, y: 10 })).toBe(false);
  });
});

describe("pinchStep", () => {
  test("fingers spreading evenly zoom about a still midpoint", () => {
    const step = pinchStep(
      pair({ x: 100, y: 100 }, { x: 200, y: 100 }),
      pair({ x: 50, y: 100 }, { x: 250, y: 100 })
    );
    expect(step.factor).toBe(2);
    expect(step.anchor).toEqual({ x: 150, y: 100 });
    expect([step.dx, step.dy]).toEqual([0, 0]);
  });

  test("fingers moving together pan without zooming", () => {
    const step = pinchStep(
      pair({ x: 100, y: 100 }, { x: 200, y: 100 }),
      pair({ x: 130, y: 90 }, { x: 230, y: 90 })
    );
    expect(step.factor).toBe(1);
    expect([step.dx, step.dy]).toEqual([30, -10]);
    expect(step.anchor).toEqual({ x: 180, y: 90 });
  });

  test("closing fingers zoom out by the ratio of their separations", () => {
    const step = pinchStep(
      pair({ x: 0, y: 0 }, { x: 0, y: 400 }),
      pair({ x: 0, y: 100 }, { x: 0, y: 300 })
    );
    expect(step.factor).toBe(0.5);
  });

  test("two pointers on one spot are a pan alone", () => {
    const step = pinchStep(
      pair({ x: 10, y: 10 }, { x: 10, y: 10 }),
      pair({ x: 20, y: 10 }, { x: 40, y: 10 })
    );
    expect(step.factor).toBe(1);
    expect(step.dx).toBe(20);
  });
});

describe("wheelZoomFactor", () => {
  test("a hundred pixels of pinch, in small events, doubles the zoom", () => {
    let zoom = 1;
    for (let i = 0; i < 20; i += 1) {
      zoom *= wheelZoomFactor(-5);
    }
    expect(zoom).toBeCloseTo(2, 10);
  });

  test("one event is capped, so a mouse notch is a step, not a doubling", () => {
    expect(wheelZoomFactor(-100)).toBeCloseTo(2 ** 0.2, 10);
    expect(wheelZoomFactor(100)).toBeCloseTo(2 ** -0.2, 10);
  });

  test("no delta means no change, and opposite deltas cancel", () => {
    expect(wheelZoomFactor(0)).toBe(1);
    expect(wheelZoomFactor(7) * wheelZoomFactor(-7)).toBeCloseTo(1, 10);
  });
});
