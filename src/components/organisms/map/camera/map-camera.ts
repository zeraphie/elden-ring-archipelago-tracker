/**
 * ─ Map camera ─
 *
 * The camera of an element that draws a map, as a Lit controller: it binds
 * the gestures to the element's view, follows the view's size, writes the
 * camera's transform onto the element's world, and fits what's shown. Each
 * thing shown, such as a sheet, is fitted as it's first shown, clear of
 * whatever covers the view's left side, and goes back to where it was left
 * when it's shown again. A thing shown with a focus, such as the region
 * selected, fits the focus rather than the whole, and glides to it when
 * asked. A new size, as the window or the panel beside the view is resized,
 * moves nothing: the scale stays, and so does the world at the view's top
 * left, the view showing more or less of it, as an infinite canvas does.
 */

import type { ReactiveController, ReactiveControllerHost } from "lit";
import { Camera } from "./camera.js";
import {
  fitToRect,
  screenToWorld,
  type CameraState,
  type Point,
  type ViewSize,
  type WorldRect,
  type ZoomLimits,
} from "./camera-math.js";
import { centredOn } from "./glide.js";
import { MapInput, type Pen } from "./map-input.js";
import { moveTo, ZOOM_STEP } from "./move.js";

/** Where a zoom button takes the camera: in or out a step, or the fit, the whole of what's shown or its focus. */
export type ZoomTo = "in" | "out" | "whole";

/** What the map camera reads of its host: its view, its world, what lies over the view, and its pen. */
export interface MapCameraParts {
  /** The element the gestures are read on, once it's drawn. */
  readonly view: () => HTMLElement | undefined;
  /** The SVG group the camera's transform is written onto, once it's drawn, with the zoom as `--zoom`. */
  readonly world: () => SVGGElement | undefined;
  /** How much of the view's left side, in CSS pixels, something lies over. */
  readonly coveredLeft: () => number;
  /** Where the view's strokes go, for a host that draws on it. */
  readonly pen?: Pen;
  /** Told each time the world moves on the screen, for what follows it. */
  readonly onPlace?: () => void;
}

// Screen pixels kept clear round what's shown when the view fits it.
const FIT_PADDING = 24;
// Round a focus, enough to keep it clear of the controls along the view's edges: the sheet tabs, the
// tools and the goal strip, each 44 px from 10 px in.
const FOCUS_PADDING = 56;
// The closest a focus is framed, in screen pixels per tile: about four tiles across a phone's map,
// so a region of a tile or two shows what's round it.
const FOCUS_MAX_ZOOM = 70;
// What's left of the view beside its covered side must be at least this wide to fit into; else the
// fit takes the whole view, under the cover.
const UNCOVERED_MIN_PX = 320;

/** A map element's camera: gestures, size, transform and fit. */
export class MapCamera implements ReactiveController {
  private readonly camera: Camera;
  private input: MapInput | undefined;
  private view: HTMLElement | undefined;
  private size: ViewSize = { width: 0, height: 0 };
  // What's shown, with the part to fit where it's not the whole, and the key of the last thing the
  // view was placed on.
  private shown:
    | { readonly key: string; readonly bounds: WorldRect; readonly focus: WorldRect | undefined }
    | undefined;
  private placedKey: string | undefined;
  // Where the view was left on each thing shown before and moved from its fit: the world point at
  // the view's middle, kept rather than the offset so a new size still shows it, and the zoom.
  private readonly left = new Map<string, { readonly middle: Point; readonly zoom: number }>();
  // Whether the view still shows the fit, so leaving it forgets where it was, to fit it again on return.
  private isFitted = false;
  private stopMove: () => void = () => {};
  private readonly sizer = new ResizeObserver(([entry]) => {
    const box = entry?.contentRect;
    if (box !== undefined) {
      this.size = { width: box.width, height: box.height };
      this.placeNew();
    }
  });

  constructor(
    host: ReactiveControllerHost,
    private readonly parts: MapCameraParts,
    private readonly limits: ZoomLimits
  ) {
    this.camera = new Camera(limits);
    this.camera.onChange((state) => this.place(state));
    host.addController(this);
  }

  /**
   * Show `bounds`, under `key`, fitting `focus` where it's given rather than the whole. Once the
   * view has a size, a key not shown before is fitted, and one shown before goes back to where it
   * was left.
   */
  show(key: string, bounds: WorldRect, focus?: WorldRect): void {
    if (this.placedKey !== undefined && this.placedKey !== key) {
      this.leave(this.placedKey);
    }
    this.shown = { key, bounds, focus };
  }

  /** Glide to fit the focus of what's shown, as when a new one is chosen; nothing without one. */
  frame(): void {
    const state = this.shown?.focus === undefined ? undefined : this.fitState();
    if (state === undefined) {
      return;
    }
    this.stopMove();
    this.stopMove = moveTo(this.camera, state, this.size);
    this.isFitted = true;
  }

  /** Glide in or out a step about the middle of what's uncovered, or to the whole of what's shown. */
  zoom(to: ZoomTo): void {
    const inset = this.inset();
    const middle = { x: inset + (this.size.width - inset) / 2, y: this.size.height / 2 };
    const state =
      to === "whole"
        ? this.fitState()
        : this.camera.zoomed(middle, to === "in" ? ZOOM_STEP : 1 / ZOOM_STEP);
    if (state === undefined) {
      return;
    }
    this.stopMove();
    this.stopMove = moveTo(this.camera, state, this.size);
    this.isFitted = to === "whole";
  }

  hostConnected(): void {
    this.bind();
  }

  hostUpdated(): void {
    this.bind();
    this.place(this.camera.current);
    this.placeNew();
  }

  hostDisconnected(): void {
    this.input?.dispose();
    this.input = undefined;
    this.sizer.disconnect();
    this.view = undefined;
  }

  // The gestures and the size are read from the view the host draws, once it's drawn.
  private bind(): void {
    const view = this.parts.view();
    if (view === this.view) {
      return;
    }
    this.input?.dispose();
    this.sizer.disconnect();
    this.view = view;
    if (view !== undefined) {
      this.input = new MapInput(view, this.camera, () => this.moved(), this.parts.pen);
      this.sizer.observe(view);
    }
  }

  // The camera's transform, written straight onto the world: it changes every frame of a drag. The
  // zoom goes on as `--zoom` too, for what's drawn at a size of its own on the screen.
  private place({ x, y, zoom }: CameraState): void {
    const world = this.parts.world();
    world?.setAttribute("transform", `translate(${x} ${y}) scale(${zoom})`);
    world?.style.setProperty("--zoom", String(zoom));
    this.parts.onPlace?.();
  }

  // What's newly shown goes back to where it was left, or is fitted.
  private placeNew(): void {
    const key = this.shown?.key;
    if (key === undefined || key === this.placedKey || this.size.width === 0) {
      return;
    }
    const left = this.left.get(key);
    if (left === undefined) {
      this.fit();
      return;
    }
    this.stopMove();
    this.camera.set(centredOn(left.middle, left.zoom, this.size));
    this.isFitted = false;
    this.placedKey = key;
  }

  // Keep where the view is on `key` as it's left; a view still on its fit is fitted again on return.
  private leave(key: string): void {
    this.stopMove();
    if (this.isFitted) {
      this.left.delete(key);
      return;
    }
    const { width, height } = this.size;
    const middle = screenToWorld(this.camera.current, { x: width / 2, y: height / 2 });
    this.left.set(key, { middle, zoom: this.camera.current.zoom });
  }

  private fit(): void {
    const state = this.fitState();
    if (state !== undefined) {
      this.stopMove();
      this.camera.set(state);
      this.isFitted = true;
      this.placedKey = this.shown?.key;
    }
  }

  // The camera that shows all of what's shown, or its focus, in the part of the view nothing covers.
  private fitState(): CameraState | undefined {
    if (this.shown === undefined || this.size.width === 0) {
      return undefined;
    }
    const inset = this.inset();
    const size = { width: this.size.width - inset, height: this.size.height };
    const { bounds, focus } = this.shown;
    const fitted =
      focus === undefined
        ? this.camera.fitted(size, bounds, FIT_PADDING)
        : fitToRect(size, focus, { ...this.limits, max: FOCUS_MAX_ZOOM }, FOCUS_PADDING);
    return { ...fitted, x: fitted.x + inset };
  }

  // The covered side, kept clear only while what's left beside it is wide enough to fit into.
  private inset(): number {
    const covered = this.parts.coveredLeft();
    return this.size.width - covered >= UNCOVERED_MIN_PX ? covered : 0;
  }

  private moved(): void {
    this.stopMove();
    this.isFitted = false;
  }
}
