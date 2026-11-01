/**
 * ─ Pin tip ─
 *
 * What the map's tooltip shows of a pin and where it goes. The generator's
 * copies of a spot read as one spot, with what each has held; the tooltip sits
 * beside its pin, on the far side when there's no room, and stays in the view.
 */

import type { CheckRow } from "../../../state/utils/checks.js";
import type { Finding } from "../../../state/utils/findings.js";

/** One spot on a pin: the row to show for it, with no copy number, and what its checks have held. */
export interface PinSpot {
  readonly row: CheckRow;
  readonly findings: readonly Finding[];
}

/** A box on the screen, by its edges, in pixels. */
export interface TipBox {
  readonly left: number;
  readonly right: number;
  readonly top: number;
}

/** A width and a height, in pixels. */
export interface TipSize {
  readonly width: number;
  readonly height: number;
}

// How far from its pin the tooltip sits, and how close it comes to the view's edges.
const GAP_PX = 10;

/** A pin's spots, each once, in the order they first come. */
export function pinSpots(rows: readonly CheckRow[]): PinSpot[] {
  const spots = new Map<number, CheckRow[]>();
  for (const row of rows) {
    const spot = row.copy?.first ?? row.id;
    spots.set(spot, [...(spots.get(spot) ?? []), row]);
  }
  return [...spots.values()].map((checks) => {
    const shown = checks.find(({ state }) => state !== "collected") ?? checks[0];
    return {
      row: { ...(shown as CheckRow), copy: undefined },
      findings: checks.flatMap(({ finding }) => finding ?? []),
    };
  });
}

/** Where a tooltip goes, in the view: beside the pin, past it on the left where the right has no room, kept inside the view. */
export function tipPlace(
  pin: TipBox,
  tip: TipSize,
  view: TipSize
): { readonly left: number; readonly top: number } {
  const right = pin.right + GAP_PX;
  const left = right + tip.width + GAP_PX <= view.width ? right : pin.left - GAP_PX - tip.width;
  return {
    left: Math.max(GAP_PX, left),
    top: Math.max(GAP_PX, Math.min(pin.top, view.height - tip.height - GAP_PX)),
  };
}
