/**
 * ─ Gesture math ─
 *
 * The pure arithmetic of the map's gestures. A press that travelled under a
 * few pixels is a click, not a drag. Two pointers moving between frames are
 * one camera step: pan by how far their midpoint moved, then zoom about the
 * new midpoint by how much their separation changed, which keeps the world
 * under the fingers still. A wheel's delta, in pixels, becomes a zoom.
 */

import type { Point } from "./camera-math.js";

// Pointer travel under this is a click on the map rather than a pan.
const TAP_THRESHOLD_PX = 4;

// Pixels of wheel delta that double the zoom, about a pinch that doubles the fingers' spread.
const WHEEL_DOUBLING_PX = 100;
// The most one wheel event counts: a mouse notch is a hundred pixels at once, so it's a step, not a doubling.
const WHEEL_EVENT_MOST_PX = 20;

/** One camera step from two pointers: pan by `dx` and `dy`, then zoom by `factor` about `anchor`. */
export interface PinchStep {
  readonly anchor: Point;
  readonly factor: number;
  readonly dx: number;
  readonly dy: number;
}

/** Whether a press that went down at `origin` and is now at `end` has stayed still enough to be a click. */
export function isTap(origin: Point, end: Point): boolean {
  return Math.hypot(end.x - origin.x, end.y - origin.y) < TAP_THRESHOLD_PX;
}

/** The camera step for two pointers that moved from `prev` to `next`. */
export function pinchStep(prev: readonly [Point, Point], next: readonly [Point, Point]): PinchStep {
  const before = midpoint(prev[0], prev[1]);
  const after = midpoint(next[0], next[1]);
  const spread = separation(prev[0], prev[1]);
  // Two pointers on one spot have no separation to compare: a pure pan.
  const factor = spread === 0 ? 1 : separation(next[0], next[1]) / spread;
  return { anchor: after, factor, dx: after.x - before.x, dy: after.y - before.y };
}

/** The zoom factor for a wheel delta in pixels: a wheel up, a scroll up or a pinch out zooms in. */
export function wheelZoomFactor(deltaPixels: number): number {
  const capped = Math.max(-WHEEL_EVENT_MOST_PX, Math.min(WHEEL_EVENT_MOST_PX, deltaPixels));
  return 2 ** (-capped / WHEEL_DOUBLING_PX);
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function separation(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}
