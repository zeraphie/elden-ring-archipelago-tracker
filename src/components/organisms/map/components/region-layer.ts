/**
 * ─ Region layer ─
 *
 * The map's land, drawn into its world: each region its tiles, filled for how
 * it stands, under the borders between regions, the coast, and the selected
 * region's border in gold. The lines let the pointer through to the land.
 */

import { css, nothing, svg } from "lit";
import type { RegionTiles, SheetTiles } from "../../../../data/checks/map-tiles.js";
import type { AreaState } from "../../../../data/rules/area-status.js";
import { AREA_STATE_WORDS } from "../../../utils/area-words.js";
import { edgesPath, tilesPath } from "../utils/map-paths.js";

/** What the layer reads of its regions, by code: how each stands and its name; and a click on one. */
export interface RegionHandlers {
  readonly stateOf: (region: string) => AreaState;
  readonly nameOf: (region: string) => string;
  readonly onPick: (region: string) => void;
}

/** The regions' look: each filled for how it stands, lighter when hovered, and the lines over them. */
export const regionStyles = css`
  .region {
    stroke: var(--er-map);
    stroke-width: 0.8;
    cursor: pointer;
  }
  .region[data-state="locked"] {
    fill: var(--er-region-locked);
  }
  .region[data-state="locked"]:hover {
    fill: var(--er-region-locked-hover);
  }
  .region[data-state="open"] {
    fill: var(--er-region-open);
  }
  .region[data-state="open"]:hover {
    fill: var(--er-region-open-hover);
  }
  .region[data-state="done"] {
    fill: var(--er-region-done);
  }
  .region[data-state="done"]:hover {
    fill: var(--er-region-done-hover);
  }
  .lines {
    fill: none;
    stroke-linecap: square;
    pointer-events: none;
  }
  .edge {
    stroke: var(--er-region-edge);
    stroke-width: 1;
  }
  .coast {
    stroke: var(--er-coast);
    stroke-width: 1.5;
  }
  .selected {
    stroke: var(--er-gold);
    stroke-width: 2.5;
  }
`;

/** A sheet's regions and their lines, for the map's world. */
export function regionLayer(
  { regions, coast }: SheetTiles,
  selected: RegionTiles | undefined,
  { stateOf, nameOf, onPick }: RegionHandlers
) {
  return svg`${regions.map(({ region, tiles }) => {
    const state = stateOf(region);
    return svg`<path
      class="region"
      data-state=${state}
      d=${tilesPath(tiles)}
      @click=${() => onPick(region)}
    ><title>${nameOf(region)}: ${AREA_STATE_WORDS[state]}</title></path>`;
  })}
  <g class="lines" aria-hidden="true">
    ${regions.map(({ edges }) => svg`<path class="edge" d=${edgesPath(edges)}></path>`)}
    <path class="coast" d=${edgesPath(coast)}></path>
    ${
      selected === undefined
        ? nothing
        : svg`<path class="selected" d=${edgesPath(selected.edges)}></path>`
    }
  </g>`;
}
