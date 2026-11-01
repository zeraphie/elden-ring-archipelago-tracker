/**
 * ─ Map controls ─
 *
 * What floats over the map, each held to its own edge: the sheet tabs top
 * left, the legend bottom left, the route tools top right, with the simulate
 * buttons under them in a development build, and the zoom buttons bottom right.
 * It has no box of its own, so each lies against the map's, and what they
 * send reaches the map as if they were its own.
 */

import { LitElement, css, html, nothing } from "lit";
import type { Sheet } from "../../../../data/checks/map-tiles.js";
import type { EldenRingData } from "../../../../state/setup.js";
import type { TrackerStore } from "../../../../state/store.js";
import { narrow } from "../../../atoms/layout.js";
import "./er-map-legend.js";
import "../er-route-tools.js";
import "../er-sheet-tabs.js";
import "../er-zoom-buttons.js";
import { DRAWING_LINE } from "../map-words.js";

// The simulate buttons are for a development build only, so a built page never loads them.
if (import.meta.env.DEV) {
  void import("../er-simulate.js");
}

/**
 * The map's tabs, legend, tools and zoom buttons, over its view.
 *
 * @fires er-sheet - From the tabs: a sheet was chosen; `detail` is its `Sheet`.
 * @fires er-route - From the route tools; `detail` is a `RouteAction`.
 * @fires er-zoom - From the zoom buttons; `detail` is a `ZoomTo`.
 */
export class ErMapControls extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    sheets: { attribute: false },
    shown: { attribute: false },
    region: { attribute: false },
    isDrawing: { attribute: false },
    hasLines: { attribute: false },
    isLost: { attribute: false },
  };

  static override styles = css`
    :host {
      display: contents;
    }
    /* The tabs and the legend sit above the goal menu, which runs under them. */
    er-sheet-tabs {
      position: absolute;
      z-index: 2;
      top: 14px;
      left: 16px;
    }
    er-map-legend {
      position: absolute;
      z-index: 2;
      right: 240px;
      bottom: 14px;
      left: 16px;
      pointer-events: none;
    }
    /* The top right: the route tools, and in a development build the simulate buttons under them. */
    .tools {
      position: absolute;
      z-index: 3;
      top: 14px;
      right: 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
    }
    /* At a tablet's width and below the controls sit closer to the edges, and the legend goes:
       the goal strip has the map's foot, and a touch points at nothing. */
    @media ${narrow} {
      er-sheet-tabs {
        top: 10px;
        left: 10px;
      }
      .tools {
        top: 10px;
        right: 10px;
      }
      er-map-legend {
        display: none;
      }
      .corner {
        right: 10px;
        bottom: 10px;
      }
    }
    /* The bottom right: the zoom buttons. */
    .corner {
      position: absolute;
      z-index: 3;
      right: 16px;
      bottom: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
  `;

  /** The room's store, for the simulate buttons. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, for the simulate buttons. */
  data: EldenRingData | undefined;
  /** The sheets the room has tiles on, each with its name; with fewer than two, no tabs. */
  sheets: readonly (readonly [Sheet, string])[] = [];
  /** The sheet shown. */
  shown: Sheet | undefined;
  /** The region selected, by its code. */
  region: string | undefined;
  /** Whether the pen is on. */
  isDrawing = false;
  /** Whether there's a line to take away. */
  hasLines = false;
  /** Whether the map has no land in view. */
  isLost = false;

  override render() {
    return html`${
        this.sheets.length < 2
          ? nothing
          : html`<er-sheet-tabs .sheets=${this.sheets} .shown=${this.shown}></er-sheet-tabs>`
      }
      <er-map-legend .readout=${this.isDrawing ? DRAWING_LINE : undefined}></er-map-legend>
      <div class="tools">
        <er-route-tools .isOn=${this.isDrawing} .hasLines=${this.hasLines}></er-route-tools>
        ${
          import.meta.env.DEV
            ? html`<er-simulate
                .store=${this.store}
                .data=${this.data}
                .region=${this.region}
              ></er-simulate>`
            : nothing
        }
      </div>
      <div class="corner">
        <er-zoom-buttons .isLost=${this.isLost}></er-zoom-buttons>
      </div>`;
  }
}

customElements.define("er-map-controls", ErMapControls);

declare global {
  interface HTMLElementTagNameMap {
    "er-map-controls": ErMapControls;
  }
}
