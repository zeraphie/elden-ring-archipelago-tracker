/**
 * ─ Map paths ─
 *
 * A sheet's tiles as SVG, in tile units, north up: the game counts rows
 * northward, so a tile at row y spans from -(y + 1) to -y down the page. A
 * region is its squares; borders and the coast are tile sides; a pin sits at its
 * tile's centre; the bounds of a sheet or a region are its tiles' outer edges, for the camera to fit.
 */

import type { Edge } from "../../../data/checks/map-tiles.js";
import type { Point, WorldRect } from "./camera/camera-math.js";

/** A region's tiles as one path of squares. */
export function tilesPath(tiles: readonly (readonly [number, number])[]): string {
  return tiles.map(([x, y]) => `M${x} ${flip(y + 1)}h1v1h-1Z`).join("");
}

/** Tile sides as one path of lines. */
export function edgesPath(edges: readonly Edge[]): string {
  return edges.map(([x1, y1, x2, y2]) => `M${x1} ${flip(y1)}L${x2} ${flip(y2)}`).join("");
}

/** A tile's centre, in tile units, north up. */
export function tileCentre(x: number, y: number): Point {
  return { x: x + 0.5, y: flip(y) - 0.5 };
}

/** The rect holding every tile given, such as a sheet's or a region's, in tile units, north up. */
export function boundsOf(tiles: readonly (readonly [number, number])[]): WorldRect {
  const xs = tiles.map(([x]) => x);
  const ys = tiles.map(([, y]) => y);
  return {
    left: Math.min(...xs),
    top: flip(Math.max(...ys) + 1),
    right: Math.max(...xs) + 1,
    bottom: flip(Math.min(...ys)),
  };
}

// A row's line, north up; zero is kept unsigned, so a path never reads "-0".
function flip(y: number): number {
  return y === 0 ? 0 : -y;
}
