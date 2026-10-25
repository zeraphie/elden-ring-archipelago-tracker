/**
 * ─ Route tools ─
 *
 * The pen for drawing a route on the map, pressed while it's on, and once
 * the sheet shown has a line, undo and clear below it.
 */

import { LitElement, css, html, nothing } from "lit";
import { buttonStyles } from "../../atoms/button.js";
import { focusRing } from "../../atoms/focus.js";
import { emit } from "../../utils/emit.js";
import type { RouteAction } from "./route-pen.js";

/**
 * The pen, and undo and clear once there's a line.
 *
 * @fires er-route - A tool was pressed; `detail` is its `RouteAction`: "pen", "undo" or "clear".
 */
export class ErRouteTools extends LitElement {
  static override properties = {
    isOn: { attribute: false },
    hasLines: { attribute: false },
  };

  static override styles = [
    buttonStyles,
    focusRing,
    css`
      :host {
        display: block;
      }
      [role="toolbar"] {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      svg {
        width: 18px;
        height: 18px;
        stroke: currentColor;
        stroke-width: 1.4;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
      }
    `,
  ];

  /** Whether the pen is on. */
  isOn = false;
  /** Whether the sheet shown has a line to undo or clear. */
  hasLines = false;

  override render() {
    return html`<div role="toolbar" aria-label="Route drawing" aria-orientation="vertical">
      <button
        class="button"
        data-tone="overlay"
        data-shape="icon"
        aria-pressed=${String(this.isOn)}
        aria-label="Draw a route"
        title="Draw a route (right-drag also draws)"
        @click=${() => this.act("pen")}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M3 13l1-4 7-7 3 3-7 7-4 1z"></path>
        </svg>
      </button>
      ${
        this.hasLines
          ? html`<button
                class="button"
                data-tone="overlay"
                data-shape="icon"
                aria-label="Undo the last line"
                title="Undo the last line"
                @click=${() => this.act("undo")}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3L3 6l3 3M3 6h6.5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </button>
              <button
                class="button"
                data-tone="overlay"
                data-shape="icon"
                aria-label="Clear every line"
                title="Clear every line"
                @click=${() => this.act("clear")}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8"></path>
                </svg>
              </button>`
          : nothing
      }
    </div>`;
  }

  private act(action: RouteAction): void {
    emit<RouteAction>(this, "er-route", action);
  }
}

customElements.define("er-route-tools", ErRouteTools);

declare global {
  interface HTMLElementTagNameMap {
    "er-route-tools": ErRouteTools;
  }
}
