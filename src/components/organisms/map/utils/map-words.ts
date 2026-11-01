/**
 * ─ Map words ─
 *
 * What the map says of its pins: how many of a pin's checks are checked, on
 * its tooltip.
 */

/** How many of a pin's checks are checked, as its tooltip's foot says it. */
export function pinCount(done: number, of: number): string {
  return `${done} of ${of} checked`;
}
