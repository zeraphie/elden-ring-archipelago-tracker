/**
 * ─ Map input ─
 *
 * The map's pointer and wheel, made into camera moves: the left button or one
 * finger drags the map, two fingers pinch, and the wheel zooms about the
 * cursor. A press is a drag only once it travels, so one that never does is
 * an ordinary click on whatever's under it, and a drag's own click is
 * swallowed, so letting go over a region doesn't select it. With a pen, the
 * right button draws, and so does any press while the pen is on; a stroke's
 * points go to the pen in world units, each once the pointer has travelled a
 * click's few pixels from the last. The browser's menu is kept off the map. The element must set `touch-action: none`, or the browser takes
 * touch gestures for itself. While a drag lasts, the element is marked
 * `data-dragging`.
 */

import type { Camera } from "./camera.js";
import { screenToWorld, type Point } from "./camera-math.js";
import { wheelDeltaToPixels } from "../../../utils/wheel.js";
import { isTap, pinchStep, wheelZoomFactor } from "./gesture-math.js";

// PointerEvent.button for the left and the right mouse buttons.
const LEFT_BUTTON = 0;
const RIGHT_BUTTON = 2;

/** Where the map's strokes go: one begun at a world point, carried on, and ended. */
export interface Pen {
  /** Whether a left press or one finger draws rather than pans. */
  readonly isOn: () => boolean;
  readonly begin: (at: Point) => void;
  readonly extend: (at: Point) => void;
  readonly end: () => void;
}

/** Binds the map's gestures on `element` to `camera` until `dispose` is called. */
export class MapInput {
  // Each press under way, by pointer id, where it was last seen.
  private readonly presses = new Map<number, Point>();
  private origin: Point = { x: 0, y: 0 };
  private hasTravelled = false;
  // The stroke under way: its pointer, and where its last point was taken, on the screen.
  private stroke: { readonly id: number; last: Point } | undefined;

  constructor(
    private readonly element: HTMLElement,
    private readonly camera: Camera,
    /** Told whenever a gesture moves the camera, so a view fitted on its own knows it's been moved. */
    private readonly onMoved: () => void = () => {},
    /** Where strokes go; with none, the map only moves. */
    private readonly pen?: Pen
  ) {
    element.addEventListener("pointerdown", this.onDown);
    element.addEventListener("pointermove", this.onMove);
    element.addEventListener("pointerup", this.onUp);
    element.addEventListener("pointercancel", this.onUp);
    // Not passive, so the page itself never scrolls or zooms under the map.
    element.addEventListener("wheel", this.onWheel, { passive: false });
    element.addEventListener("contextmenu", this.onMenu);
    // Capturing, so a drag's click is swallowed before it reaches a region.
    element.addEventListener("click", this.onClick, { capture: true });
  }

  dispose(): void {
    this.element.removeEventListener("pointerdown", this.onDown);
    this.element.removeEventListener("pointermove", this.onMove);
    this.element.removeEventListener("pointerup", this.onUp);
    this.element.removeEventListener("pointercancel", this.onUp);
    this.element.removeEventListener("wheel", this.onWheel);
    this.element.removeEventListener("contextmenu", this.onMenu);
    this.element.removeEventListener("click", this.onClick, { capture: true });
  }

  private readonly onDown = (event: PointerEvent): void => {
    const isRight = event.pointerType === "mouse" && event.button === RIGHT_BUTTON;
    if (this.pen !== undefined && this.stroke === undefined && this.presses.size === 0) {
      if (isRight || this.pen.isOn()) {
        this.beginStroke(event, isRight);
        return;
      }
    }
    if (event.pointerType === "mouse" && event.button !== LEFT_BUTTON) {
      return;
    }
    const at = this.pointOf(event);
    this.presses.set(event.pointerId, at);
    if (this.presses.size === 1) {
      this.origin = at;
      this.hasTravelled = false;
    } else {
      // A second finger makes a pinch, which is never a click.
      this.hasTravelled = true;
    }
  };

  private readonly onMove = (event: PointerEvent): void => {
    if (this.stroke?.id === event.pointerId) {
      const at = this.pointOf(event);
      if (!isTap(this.stroke.last, at)) {
        this.stroke.last = at;
        this.pen?.extend(screenToWorld(this.camera.current, at));
      }
      return;
    }
    const was = this.presses.get(event.pointerId);
    if (was === undefined) {
      return;
    }
    const at = this.pointOf(event);
    if (this.presses.size > 1) {
      this.pinch(event.pointerId, was, at);
    } else if (this.hasTravelled || !isTap(this.origin, at)) {
      if (!this.hasTravelled) {
        // Only now a drag: held, so it keeps its pointer even off the map.
        this.hasTravelled = true;
        this.element.setPointerCapture(event.pointerId);
        this.element.dataset["dragging"] = "";
      }
      this.camera.panBy(at.x - was.x, at.y - was.y);
      this.onMoved();
    } else {
      // Still within a click's few pixels: the map waits, and the press keeps its first point.
      return;
    }
    this.presses.set(event.pointerId, at);
  };

  private readonly onUp = (event: PointerEvent): void => {
    if (this.stroke?.id === event.pointerId) {
      this.stroke = undefined;
      this.pen?.end();
      return;
    }
    if (!this.presses.delete(event.pointerId)) {
      return;
    }
    const [left] = this.presses.values();
    if (left !== undefined) {
      // A pinch down to one finger carries on as that finger's drag.
      this.origin = left;
    } else {
      delete this.element.dataset["dragging"];
    }
  };

  private readonly onWheel = (event: WheelEvent): void => {
    event.preventDefault();
    const pixels = wheelDeltaToPixels(event.deltaY, event.deltaMode, this.element.clientHeight);
    this.camera.zoomAt(this.pointOf(event), wheelZoomFactor(pixels));
    this.onMoved();
  };

  private readonly onMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  // A drag's click comes after its pointerup; it's swallowed, and the next press starts afresh.
  private readonly onClick = (event: MouseEvent): void => {
    if (this.hasTravelled) {
      event.stopPropagation();
      event.preventDefault();
      this.hasTravelled = false;
    }
  };

  // A stroke holds its pointer, even off the map. A left one's click is swallowed, so a stroke, or a
  // press with the pen on, never selects what's under it.
  private beginStroke(event: PointerEvent, isRight: boolean): void {
    const at = this.pointOf(event);
    this.stroke = { id: event.pointerId, last: at };
    this.hasTravelled = !isRight;
    this.element.setPointerCapture(event.pointerId);
    this.pen?.begin(screenToWorld(this.camera.current, at));
  }

  private pinch(id: number, was: Point, at: Point): void {
    const other = [...this.presses].find(([key]) => key !== id)?.[1];
    if (other === undefined) {
      return;
    }
    const step = pinchStep([was, other], [at, other]);
    this.camera.panBy(step.dx, step.dy);
    this.camera.zoomAt(step.anchor, step.factor);
    this.onMoved();
  }

  // Where an event fell, in CSS pixels from the element's top left, whatever inside it took the event.
  private pointOf(event: MouseEvent): Point {
    const box = this.element.getBoundingClientRect();
    return { x: event.clientX - box.left, y: event.clientY - box.top };
  }
}
