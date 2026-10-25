/**
 * ─ Pin layer ─
 *
 * The map's key-check pins, drawn into its world: a sack on each tile's
 * middle, one tile wide, scaled by CSS to its size on the screen, which grows
 * with the square root of the camera's zoom. Pointing at a sack enlarges it,
 * as does picking one of its checks. The sack picked is drawn last, so it
 * enlarges over its neighbours; the one pointed at stays where it is, since a
 * sack moved under the pointer between its press and its release loses the
 * click. A check picked that has no sack, not being a key check, is ringed in
 * gold on its tile.
 */

import { css, nothing, svg } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { MapPin } from "../../../data/checks/map-pins.js";
import { sackStyles } from "../../atoms/sack.js";
import { iconUrl } from "../../utils/icons.js";
import type { Point } from "./camera/camera-math.js";
import { tileCentre } from "./map-paths.js";

const SACK = iconUrl("sack");

/** What the map is told of its pins: the pointer coming onto one or leaving it, and a click on one. */
export interface PinHandlers {
  readonly onPoint: (tile: string, isOn: boolean) => void;
  readonly onPick: (pin: MapPin) => void;
}

/** The pins' look: the sack as it stands, sized on the screen from the camera's `--zoom`, enlarged when pointed at or picked, and the ring round a picked tile. */
export const pinStyles = [
  sackStyles,
  css`
    /* A sack's size on the screen, in CSS pixels, grows with the square root of the zoom, so the
       sacks neither crowd the whole map nor swamp a close look. */
    .world {
      --sack-px: clamp(16, 4.2 * sqrt(var(--zoom)), 64);
    }
    .pin {
      cursor: pointer;
    }
    /* A sack and a ring are drawn a tile wide, so they're scaled by that size over the zoom,
       about their own middles. */
    .sack,
    .ring {
      transform-box: fill-box;
      transform-origin: center;
      transform: scale(calc(var(--sack-px) / var(--zoom)));
    }
    .sack {
      transition: scale 120ms ease-out;
    }
    .pin:hover .sack,
    .pin[data-picked] .sack {
      scale: 1.33;
    }
    .ring {
      fill: none;
      stroke: var(--er-gold);
      stroke-width: 3px;
      vector-effect: non-scaling-stroke;
      pointer-events: none;
    }
    @media (prefers-reduced-motion: reduce) {
      .sack {
        transition: none;
      }
    }
  `,
];

/** A sheet's pins, for the map's world, the one picked drawn last. */
export function pinLayer(
  pins: readonly MapPin[],
  picked: MapPin | undefined,
  { onPoint, onPick }: PinHandlers
) {
  return svg`<g class="pins">
    ${repeat(
      picked === undefined ? pins : [...pins.filter((pin) => pin !== picked), picked],
      ({ tile }) => tile,
      (pin) => {
        const centre = tileCentre(pin.x, pin.y);
        return svg`<g
          class="pin"
          ?data-picked=${pin === picked}
          transform=${`translate(${centre.x} ${centre.y})`}
          @pointerenter=${() => onPoint(pin.tile, true)}
          @pointerleave=${() => onPoint(pin.tile, false)}
          @click=${() => onPick(pin)}
        ><image class="sack" data-state=${pin.state} href=${SACK} x="-0.5" y="-0.5" width="1" height="1"></image></g>`;
      }
    )}
  </g>`;
}

/** A gold ring round a picked check's tile, at its middle in world units; nothing without one. */
export function pickRing(at: Point | undefined) {
  return at === undefined
    ? nothing
    : svg`<g transform=${`translate(${at.x} ${at.y})`}><circle class="ring" r="0.6"></circle></g>`;
}
