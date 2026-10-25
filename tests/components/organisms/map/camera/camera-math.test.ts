import { describe, expect, test } from "bun:test";
import {
  clampZoom,
  fitToRect,
  pan,
  screenToWorld,
  worldToScreen,
  zoomAbout,
  type CameraState,
  type Point,
  type ZoomLimits,
} from "../../../../../src/components/organisms/map/camera/camera-math.js";

const limits: ZoomLimits = { min: 0.25, max: 4 };
const camera: CameraState = { x: 100, y: 50, zoom: 2 };

// Two points the same to ten places.
function expectClose(actual: Point, expected: Point): void {
  expect(actual.x).toBeCloseTo(expected.x, 10);
  expect(actual.y).toBeCloseTo(expected.y, 10);
}

describe("worldToScreen and screenToWorld", () => {
  test("a world point lands on screen scaled by the zoom and shifted by the offset", () => {
    expect(worldToScreen(camera, { x: 10, y: -5 })).toEqual({ x: 120, y: 40 });
  });

  test("a screen point goes back to the world point it came from", () => {
    const world = { x: -37.5, y: 812.25 };
    expectClose(screenToWorld(camera, worldToScreen(camera, world)), world);
  });
});

describe("pan", () => {
  test("moves the origin by the screen delta and keeps the zoom", () => {
    expect(pan(camera, -30, 12)).toEqual({ x: 70, y: 62, zoom: 2 });
  });
});

describe("clampZoom", () => {
  test("passes values inside the limits through", () => {
    expect(clampZoom(1.5, limits)).toBe(1.5);
  });

  test("clamps below the minimum and above the maximum", () => {
    expect(clampZoom(0.01, limits)).toBe(0.25);
    expect(clampZoom(40, limits)).toBe(4);
  });
});

describe("zoomAbout", () => {
  const anchor: Point = { x: 400, y: 300 };

  test("keeps the world point under the anchor fixed", () => {
    const under = screenToWorld(camera, anchor);
    const next = zoomAbout(camera, anchor, 1.5, limits);
    expect(next.zoom).toBe(3);
    expectClose(worldToScreen(next, under), anchor);
  });

  test("keeps the anchor fixed when zooming out", () => {
    const under = screenToWorld(camera, anchor);
    const next = zoomAbout(camera, anchor, 0.5, limits);
    expect(next.zoom).toBe(1);
    expectClose(worldToScreen(next, under), anchor);
  });

  test("clamps to the limits and still keeps the anchor fixed", () => {
    const under = screenToWorld(camera, anchor);
    const next = zoomAbout(camera, anchor, 100, limits);
    expect(next.zoom).toBe(limits.max);
    expectClose(worldToScreen(next, under), anchor);
  });

  test("a factor of one changes nothing", () => {
    expect(zoomAbout(camera, anchor, 1, limits)).toEqual(camera);
  });
});

describe("fitToRect", () => {
  const wide: ZoomLimits = { min: 0.1, max: 8 };
  const size = { width: 1000, height: 500 };

  test("a wide rect fits the width and centres vertically", () => {
    const fitted = fitToRect(size, { left: 0, top: 0, right: 2000, bottom: 500 }, wide);
    expect(fitted.zoom).toBe(0.5);
    expect(worldToScreen(fitted, { x: 0, y: 0 })).toEqual({ x: 0, y: 125 });
    expect(worldToScreen(fitted, { x: 2000, y: 500 })).toEqual({ x: 1000, y: 375 });
  });

  test("a tall rect fits the height and centres horizontally", () => {
    const fitted = fitToRect(size, { left: 0, top: 0, right: 250, bottom: 1000 }, wide);
    expect(fitted.zoom).toBe(0.5);
    expect(worldToScreen(fitted, { x: 0, y: 0 })).toEqual({ x: 437.5, y: 0 });
  });

  test("padding keeps a clear margin on the tight axis", () => {
    const fitted = fitToRect(size, { left: 0, top: 0, right: 2000, bottom: 500 }, wide, 100);
    expect(fitted.zoom).toBe(0.4);
    expect(worldToScreen(fitted, { x: 0, y: 0 }).x).toBe(100);
  });

  test("a rect not at the origin is still centred", () => {
    const fitted = fitToRect(size, { left: 300, top: 200, right: 800, bottom: 450 }, wide);
    expect(fitted.zoom).toBe(2);
    expect(worldToScreen(fitted, { x: 550, y: 325 })).toEqual({ x: 500, y: 250 });
  });

  test("the zoom is clamped to the limits", () => {
    const fitted = fitToRect(size, { left: 0, top: 0, right: 10, bottom: 10 }, wide);
    expect(fitted.zoom).toBe(wide.max);
  });
});
