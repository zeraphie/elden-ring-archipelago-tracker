import { describe, expect, test } from "bun:test";
import { Camera } from "../../../../../src/components/organisms/map/camera/camera.js";
import {
  screenToWorld,
  worldToScreen,
  type CameraState,
} from "../../../../../src/components/organisms/map/camera/camera-math.js";

const limits = { min: 0.5, max: 4 };

describe("Camera", () => {
  test("starts at the origin at life size", () => {
    expect(new Camera(limits).current).toEqual({ x: 0, y: 0, zoom: 1 });
  });

  test("tells each listener about a change once, and not after it unsubscribes", () => {
    const camera = new Camera(limits);
    const heard: CameraState[] = [];
    const stop = camera.onChange((state) => heard.push(state));
    camera.panBy(10, -5);
    stop();
    camera.panBy(1, 1);
    expect(heard).toEqual([{ x: 10, y: -5, zoom: 1 }]);
  });

  test("zooming about a screen point keeps the world point under it fixed", () => {
    const camera = new Camera(limits);
    camera.panBy(120, 80);
    const anchor = { x: 300, y: 200 };
    const under = screenToWorld(camera.current, anchor);
    camera.zoomAt(anchor, 2);
    expect(camera.current.zoom).toBe(2);
    expect(worldToScreen(camera.current, under).x).toBeCloseTo(anchor.x, 10);
    expect(worldToScreen(camera.current, under).y).toBeCloseTo(anchor.y, 10);
  });

  test("zooming past a limit stops at it", () => {
    const camera = new Camera(limits);
    camera.zoomAt({ x: 0, y: 0 }, 100);
    expect(camera.current.zoom).toBe(4);
  });

  test("a zoom worked out ahead is where zoomAt goes, and leaves the camera where it is", () => {
    const camera = new Camera(limits);
    camera.panBy(40, 20);
    const before = camera.current;
    const ahead = camera.zoomed({ x: 100, y: 100 }, 2);
    expect(camera.current).toBe(before);
    camera.zoomAt({ x: 100, y: 100 }, 2);
    expect(camera.current).toEqual(ahead);
  });

  test("a fit shows all of the rect, centred", () => {
    const camera = new Camera(limits);
    const fitted = camera.fitted(
      { width: 1000, height: 500 },
      { left: 0, top: 0, right: 2000, bottom: 500 }
    );
    expect(worldToScreen(fitted, { x: 0, y: 0 })).toEqual({ x: 0, y: 125 });
    expect(worldToScreen(fitted, { x: 2000, y: 500 })).toEqual({ x: 1000, y: 375 });
  });
});
