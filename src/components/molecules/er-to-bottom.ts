/**
 * ─ To bottom ─
 *
 * A button floating over the foot of a list that's been scrolled up from its
 * newest line, as a `.scroller-frame` holds it. It only says it was pressed;
 * the list is the element's that shows it.
 */

import { LitElement, css, html } from "lit";
import { buttonStyles } from "../atoms/button.js";
import { focusRing } from "../atoms/focus.js";
import { emit } from "../utils/emit.js";

/**
 * A button over a list's foot that takes it back to the bottom.
 *
 * @fires er-to-bottom - It was pressed.
 */
export class ErToBottom extends LitElement {
  static override styles = [
    buttonStyles,
    focusRing,
    css`
      :host {
        position: absolute;
        z-index: 1;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
      }
      .button {
        white-space: nowrap;
      }
    `,
  ];

  override render() {
    return html`<button
      class="button"
      data-tone="overlay"
      data-size="small"
      @click=${() => emit<undefined>(this, "er-to-bottom", undefined)}
    >
      Scroll to bottom
    </button>`;
  }
}

customElements.define("er-to-bottom", ErToBottom);

declare global {
  interface HTMLElementTagNameMap {
    "er-to-bottom": ErToBottom;
  }
}
