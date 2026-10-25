/**
 * ─ Camera math ─
 *
 * Pure pan and zoom over one world-to-screen transform:
 * screen = world * zoom + offset. The offset is where the world origin lands
 * on screen, so a camera state is exactly an SVG group's translate and
 * scale, and the map applies it with no conversion.
 */

/** A point, in the world or on the screen. */
export interface Point {
  readonly x: number;
  readonly y: number;
}

/** A rect in world units, by its edges. */
export interface WorldRect {
  readonly left: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
}

/** Screen position of the world origin, and screen pixels per world unit. Zoom is positive. */
export interface CameraState {
  readonly x: number;
  readonly y: number;
  readonly zoom: number;
}

/** Inclusive zoom bounds. Both positive, min at or below max. */
export interface ZoomLimits {
  readonly min: number;
  readonly max: number;
}

/** The view's size in CSS pixels. */
export interface ViewSize {
  readonly width: number;
  readonly height: number;
}

/** Project a world point onto the screen. */
export function worldToScreen(camera: CameraState, point: Point): Point {
  return { x: point.x * camera.zoom + camera.x, y: point.y * camera.zoom + camera.y };
}

/** Unproject a screen point into the world. */
export function screenToWorld(camera: CameraState, point: Point): Point {
  return { x: (point.x - camera.x) / camera.zoom, y: (point.y - camera.y) / camera.zoom };
}

/** Shift the view by a screen-space delta. */
export function pan(camera: CameraState, dx: number, dy: number): CameraState {
  return { x: camera.x + dx, y: camera.y + dy, zoom: camera.zoom };
}

/** Bring a zoom value inside the limits. */
export function clampZoom(zoom: number, limits: ZoomLimits): number {
  return Math.min(limits.max, Math.max(limits.min, zoom));
}

/**
 * Scale the view by `factor` while the world point under `anchor`, a screen
 * point, stays put. Zoom is clamped first so the anchor still holds at a limit.
 */
export function zoomAbout(
  camera: CameraState,
  anchor: Point,
  factor: number,
  limits: ZoomLimits
): CameraState {
  const zoom = clampZoom(camera.zoom * factor, limits);
  const ratio = zoom / camera.zoom;
  return {
    x: anchor.x - (anchor.x - camera.x) * ratio,
    y: anchor.y - (anchor.y - camera.y) * ratio,
    zoom,
  };
}

/**
 * The camera that shows all of `rect` centred in a view of `size`, with
 * `padding` screen pixels kept clear around it. `rect` must have positive size.
 */
export function fitToRect(
  size: ViewSize,
  rect: WorldRect,
  limits: ZoomLimits,
  padding = 0
): CameraState {
  const rectWidth = rect.right - rect.left;
  const rectHeight = rect.bottom - rect.top;
  const zoom = clampZoom(
    Math.min((size.width - 2 * padding) / rectWidth, (size.height - 2 * padding) / rectHeight),
    limits
  );
  return {
    x: (size.width - rectWidth * zoom) / 2 - rect.left * zoom,
    y: (size.height - rectHeight * zoom) / 2 - rect.top * zoom,
    zoom,
  };
}
