/**
 * ─ Route pen ─
 *
 * Drawing a route on the map: the pen on or off, the stroke under way, and
 * the lines kept for each sheet, for this visit only. A stroke is written
 * straight onto its own path as the pointer moves, as the camera writes its
 * transform, so the map isn't drawn again for every point; it's drawn again
 * once the stroke ends and its line is kept.
 */

import { css, svg, type ReactiveControllerHost } from "lit";
import type { Point } from "./camera/camera-math.js";
import type { Pen } from "./camera/map-input.js";
import { routePath, RouteSketch } from "./route.js";

/** What a route tool asks for: the pen on or off, the last line taken away, or every line. */
export type RouteAction = "pen" | "undo" | "clear";

/** The route's look: its lines over the map, and a crosshair while the pen is on. */
export const routeStyles = css`
  .view[data-drawing],
  .view[data-drawing] .region,
  .view[data-drawing] .pin {
    cursor: crosshair;
  }
  /* A line's width on the screen grows with the square root of the zoom, as a sack's does. */
  .route {
    fill: none;
    stroke: var(--er-gold);
    stroke-width: calc(0.56px * sqrt(var(--zoom)));
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.9;
    pointer-events: none;
  }
`;

/** The map's pen: where its strokes go, and the lines it keeps for each sheet. */
export class RoutePen implements Pen {
  private readonly sketch = new RouteSketch();
  private isPenOn = false;
  private stroke: Point[] | undefined;
  // The sheet shown, which a stroke's line is kept on.
  private sheet = "";

  constructor(
    private readonly host: ReactiveControllerHost,
    /** The path a stroke under way is written onto, once it's drawn. */
    private readonly strokePath: () => SVGPathElement | undefined
  ) {}

  /** Whether the pen is on, so a left press or one finger draws rather than pans. */
  isOn(): boolean {
    return this.isPenOn;
  }

  /** Whether the sheet shown has a line on it. */
  hasLines(): boolean {
    return this.sketch.on(this.sheet).length > 0;
  }

  /** Show the lines of the sheet, by its key. */
  show(sheet: string): void {
    this.sheet = sheet;
  }

  /** Turn the pen on or off, or take the sheet's last line or every line away. */
  act(action: RouteAction): void {
    if (action === "pen") {
      this.isPenOn = !this.isPenOn;
    } else if (action === "undo") {
      this.sketch.undo(this.sheet);
    } else {
      this.sketch.clear(this.sheet);
    }
    this.host.requestUpdate();
  }

  begin(at: Point): void {
    this.stroke = [at];
    this.drawStroke();
  }

  extend(at: Point): void {
    this.stroke?.push(at);
    this.drawStroke();
  }

  end(): void {
    if (this.stroke !== undefined) {
      this.sketch.add(this.sheet, this.stroke);
    }
    this.stroke = undefined;
    this.drawStroke();
    this.host.requestUpdate();
  }

  /** The shown sheet's lines, and the path a stroke under way is written onto, for the map's world. */
  layer() {
    return svg`<g class="routes">
      ${this.sketch.on(this.sheet).map((line) => svg`<path class="route" d=${routePath(line)}></path>`)}
      <path class="route stroke"></path>
    </g>`;
  }

  private drawStroke(): void {
    const path = this.strokePath();
    if (this.stroke === undefined) {
      path?.removeAttribute("d");
    } else {
      path?.setAttribute("d", routePath(this.stroke));
    }
  }
}
