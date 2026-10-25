/**
 * ─ Wheel ─
 *
 * A wheel's delta comes in pixels, lines or pages by device, so it's made one
 * currency, pixels, before anything reads it.
 */

// WheelEvent.deltaMode values; the DOM's constants live on the event, not the type.
const DELTA_LINE = 1;
const DELTA_PAGE = 2;
// A line is roughly a text row; browsers that report lines don't say how tall.
const LINE_PX = 16;

/** A wheel delta in pixels, from whichever unit the device gave; `pageSize` is the size of what scrolls, along the delta. */
export function wheelDeltaToPixels(delta: number, deltaMode: number, pageSize: number): number {
  if (deltaMode === DELTA_LINE) {
    return delta * LINE_PX;
  }
  if (deltaMode === DELTA_PAGE) {
    return delta * pageSize;
  }
  return delta;
}
