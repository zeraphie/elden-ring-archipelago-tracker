/**
 * ─ Route ─
 *
 * A route sketched on the map: lines of world points, kept for each sheet
 * apart, for this visit only. A line of one point is a press that never
 * moved, and isn't kept. Undo takes a sheet's last line away, and clear takes
 * them all.
 */

import type { Point } from "../camera/camera-math.js";

/** One line of a route, as world points in the order drawn. */
export type RouteLine = readonly Point[];

/** A line as an SVG path through its points. */
export function routePath(line: RouteLine): string {
  return line.map(({ x, y }, at) => `${at === 0 ? "M" : "L"}${x} ${y}`).join("");
}

/** The lines sketched on each sheet, by its key. */
export class RouteSketch {
  private readonly lines = new Map<string, RouteLine[]>();

  /** The lines on a sheet, oldest first. */
  on(sheet: string): readonly RouteLine[] {
    return this.lines.get(sheet) ?? [];
  }

  /** Keep a line drawn on a sheet; one of a single point is left out. */
  add(sheet: string, line: RouteLine): void {
    if (line.length > 1) {
      this.lines.set(sheet, [...this.on(sheet), line]);
    }
  }

  /** Take a sheet's last line away. */
  undo(sheet: string): void {
    this.lines.set(sheet, this.on(sheet).slice(0, -1));
  }

  /** Take every line off a sheet. */
  clear(sheet: string): void {
    this.lines.delete(sheet);
  }
}
