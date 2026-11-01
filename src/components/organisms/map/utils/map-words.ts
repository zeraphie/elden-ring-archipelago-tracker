/**
 * ─ Map words ─
 *
 * What the map says of its pins: how many of a pin's checks are checked, on
 * its tooltip, and how to draw, under the legend while the pen is on.
 */

/** How many of a pin's checks are checked, as its tooltip's foot says it. */
export function pinCount(done: number, of: number): string {
  return `${done} of ${of} checked`;
}

/** What the line under the legend says while the pen is on. */
export const DRAWING_LINE =
  "Drawing: drag on the map to sketch a route. Right-drag draws at any time.";
