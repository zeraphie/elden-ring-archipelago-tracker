/**
 * ─ Camera ─
 *
 * One transform for the map, as state and listeners and nothing else: it
 * draws nothing. Pan and zoom go through the pure camera math, and every
 * change reaches each listener once, so whatever draws the map follows the
 * same numbers in the same frame.
 */

import {
  fitToRect,
  pan,
  zoomAbout,
  type CameraState,
  type Point,
  type ViewSize,
  type WorldRect,
  type ZoomLimits,
} from "./camera-math.js";

/** Told each new camera state. */
export type CameraListener = (state: CameraState) => void;

/** Owns the view transform and tells its listeners when it changes. */
export class Camera {
  private readonly listeners = new Set<CameraListener>();
  private state: CameraState = { x: 0, y: 0, zoom: 1 };

  constructor(private readonly limits: ZoomLimits) {}

  get current(): CameraState {
    return this.state;
  }

  /** Shift the view by a screen-space delta. */
  panBy(dx: number, dy: number): void {
    this.set(pan(this.state, dx, dy));
  }

  /** Scale the view by `factor`, keeping the world point under `anchor` (screen space) fixed. */
  zoomAt(anchor: Point, factor: number): void {
    this.set(zoomAbout(this.state, anchor, factor, this.limits));
  }

  /** The state that shows all of `rect` centred in a view of `size`, with `padding` screen pixels clear. */
  fitted(size: ViewSize, rect: WorldRect, padding = 0): CameraState {
    return fitToRect(size, rect, this.limits, padding);
  }

  /** The state a zoom by `factor` about `anchor` moves to, for a move over time. */
  zoomed(anchor: Point, factor: number): CameraState {
    return zoomAbout(this.state, anchor, factor, this.limits);
  }

  /** Replace the whole state, for example at the end of a glide. */
  set(state: CameraState): void {
    this.state = state;
    for (const listener of this.listeners) {
      listener(state);
    }
  }

  /** Subscribe to changes; returns the unsubscribe function. */
  onChange(listener: CameraListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}
