/**
 * ─ Sheet tabs ─
 *
 * The map's sheets as tabs, the one shown pressed: the Lands Between and the
 * Realm of Shadow, as many as the room has tiles on.
 */

import { LitElement, css, html } from "lit";
import type { Sheet } from "../../../data/checks/map-tiles.js";
import { buttonStyles } from "../../atoms/button.js";
import { narrow } from "../../atoms/layout.js";
import { focusRing } from "../../atoms/focus.js";
import { emit } from "../../utils/emit.js";

/**
 * A tab for each of the map's sheets, the one shown pressed.
 *
 * @fires er-sheet - A tab was pressed; `detail` is its `Sheet`.
 */
export class ErSheetTabs extends LitElement {
  static override properties = {
    sheets: { attribute: false },
    shown: { attribute: false },
  };

  static override styles = [
    buttonStyles,
    focusRing,
    css`
      :host {
        display: block;
      }
      [role="group"] {
        display: flex;
        gap: 6px;
      }
      /* At a tablet's width and below, the tabs are at least 44 px, for a finger. */
      @media ${narrow} {
        :host .button {
          min-height: 44px;
        }
      }
      .button {
        min-height: 38px;
        padding: 6px 14px;
        background: var(--er-scrim);
        border-color: var(--er-line);
        color: var(--er-ink-muted);
        font-size: 1.05em;
        font-weight: 600;
      }
      .button[aria-pressed="true"] {
        border-color: var(--er-gold-edge);
        color: var(--er-ink-bright);
      }
    `,
  ];

  /** Each sheet, with its name in the game. */
  sheets: readonly (readonly [Sheet, string])[] = [];
  shown: Sheet | undefined;

  override render() {
    return html`<div role="group" aria-label="Map sheet">
      ${this.sheets.map(
        ([sheet, label]) =>
          html`<button
            class="button"
            aria-pressed=${String(sheet === this.shown)}
            @click=${() => emit<Sheet>(this, "er-sheet", sheet)}
          >
            ${label}
          </button>`
      )}
    </div>`;
  }
}

customElements.define("er-sheet-tabs", ErSheetTabs);

declare global {
  interface HTMLElementTagNameMap {
    "er-sheet-tabs": ErSheetTabs;
  }
}
