/**
 * ─ Map legend ─
 *
 * What the map's colours and pins mean, on two lines: how a region stands,
 * then how a key check stands. Under them, a line that names what's on the
 * pin pointed at, or says to point at one.
 */

import { LitElement, css, html } from "lit";
import type { PinState } from "../../../data/checks/map-pins.js";
import type { AreaState } from "../../../data/rules/area-status.js";
import { sackStyles } from "../../atoms/sack.js";
import { swatchStyles } from "../../atoms/swatch.js";
import { AREA_STATE_WORDS, PIN_STATE_WORDS } from "../../utils/area-words.js";
import { iconUrl } from "../../utils/icons.js";

const SACK = iconUrl("sack");
const AREAS: readonly AreaState[] = ["locked", "open", "done"];
const PINS: readonly PinState[] = ["todo", "collected", "locked"];

/**
 * The map's legend, and the line naming what's pointed at.
 */
export class ErMapLegend extends LitElement {
  static override properties = { readout: { attribute: false } };

  static override styles = [
    sackStyles,
    swatchStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 0.82em;
        color: var(--er-ink-muted);
      }
      li {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .swatch {
        width: 14px;
        height: 10px;
      }
      img {
        width: 18px;
        height: 18px;
      }
      /* Two lines at most, so the legend keeps to the room the page gives it. */
      p {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin: 0;
        font-size: 0.95em;
        color: var(--er-ink-soft);
        text-shadow: var(--er-map-text-shadow);
      }
    `,
  ];

  /** What's on the pin pointed at; while none is, the line says to point at one. */
  readout: string | undefined;

  override render() {
    return html`<ul aria-label="Regions">
        ${AREAS.map(
          (state) =>
            html`<li>
              <span class="swatch" data-state=${state}></span>${AREA_STATE_WORDS[state]}
            </li>`
        )}
      </ul>
      <ul aria-label="Key checks">
        ${PINS.map(
          (state) =>
            html`<li>
              <img class="sack" data-state=${state} src=${SACK} alt="" />${PIN_STATE_WORDS[state]}
            </li>`
        )}
      </ul>
      <p>
        ${this.readout ?? "Point at a key check to see what's there. Right-drag to draw a route."}
      </p>`;
  }
}

customElements.define("er-map-legend", ErMapLegend);

declare global {
  interface HTMLElementTagNameMap {
    "er-map-legend": ErMapLegend;
  }
}
