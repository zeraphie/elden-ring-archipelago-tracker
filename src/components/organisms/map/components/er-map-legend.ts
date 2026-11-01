/**
 * ─ Map legend ─
 *
 * What the map's colours and pins mean, behind an info button beside the zoom
 * buttons: how a region stands, then how a key check stands. It's a native
 * popover, so it lies over everything, toasts included, and Escape or a click
 * outside closes it. It opens above the buttons, its right edge on theirs, and
 * stays there while the map changes size under it.
 */

import { LitElement, css, html } from "lit";
import type { PinState } from "../../../../data/checks/map-pins.js";
import type { AreaState } from "../../../../data/rules/area-status.js";
import { buttonStyles } from "../../../atoms/button.js";
import { focusRing } from "../../../atoms/focus.js";
import { popoverStyles } from "../../../atoms/popover.js";
import { sackStyles } from "../../../atoms/sack.js";
import { swatchStyles } from "../../../atoms/swatch.js";
import { AREA_STATE_WORDS, PIN_STATE_WORDS } from "../../../utils/area-words.js";
import { iconUrl } from "../../../utils/icons.js";
import { infoIcon } from "../../../utils/material-icons.js";
import { placeOver } from "../../../utils/popover.js";

const SACK = iconUrl("sack");
const AREAS: readonly AreaState[] = ["locked", "open", "done"];
const PINS: readonly PinState[] = ["todo", "collected", "locked"];

/**
 * The map's legend, behind the button that opens it.
 */
export class ErMapLegend extends LitElement {
  static override styles = [
    buttonStyles,
    focusRing,
    popoverStyles,
    sackStyles,
    swatchStyles,
    css`
      :host {
        display: block;
      }
      .button svg {
        width: 22px;
        height: 22px;
      }
      .popover {
        --width: min(280px, calc(100vw - 32px));
        top: auto;
        right: min(var(--right, 16px), calc(100vw - 16px - var(--width)));
        bottom: var(--bottom, 72px);
        width: var(--width);
        box-sizing: border-box;
        padding: 12px 14px;
      }
      ul {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 0.92em;
        color: var(--er-ink-muted);
      }
      ul + ul {
        margin-top: 10px;
      }
      li {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .swatch {
        flex: none;
        width: 14px;
        height: 10px;
      }
      img {
        flex: none;
        width: 18px;
        height: 18px;
      }
    `,
  ];

  // Follows the map's size while the legend's open, as the buttons move with it.
  private follower: ResizeObserver | undefined;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.follower?.disconnect();
  }

  override render() {
    return html`<button
        class="button"
        data-tone="overlay"
        data-shape="icon"
        aria-label="Map legend"
        popovertarget="legend"
      >
        ${infoIcon}
      </button>
      <div id="legend" class="popover" popover @beforetoggle=${this.toggling}>
        <ul aria-label="Regions">
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
      </div>`;
  }

  private readonly toggling = (event: ToggleEvent): void => {
    this.follower?.disconnect();
    const corner = this.closest<HTMLElement>(".corner");
    const map = corner?.offsetParent;
    if (event.newState !== "open" || !corner || !map) {
      return;
    }
    const legend = event.target as HTMLElement;
    placeOver(legend, corner);
    this.follower = new ResizeObserver(() => placeOver(legend, corner));
    this.follower.observe(map);
  };
}

customElements.define("er-map-legend", ErMapLegend);

declare global {
  interface HTMLElementTagNameMap {
    "er-map-legend": ErMapLegend;
  }
}
