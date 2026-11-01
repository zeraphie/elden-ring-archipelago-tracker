/**
 * ─ Settings ─
 *
 * Everything that can be set, in a panel laid over the right-hand panel at its
 * size, its title between gold rules and a cross to close it. It stays in the
 * page while it's closed, so it can fade in and out. At a tablet's width and
 * below the title's smaller and to the left, and the rules go.
 */

import { LitElement, css, html, type PropertyValues } from "lit";
import { buttonStyles } from "../../atoms/button.js";
import { focusRing } from "../../atoms/focus.js";
import { panelTitleStyles } from "../../atoms/heading.js";
import { narrow } from "../../atoms/layout.js";
import { scrollerStyles } from "../../atoms/scroller.js";
import { closeIcon } from "../../utils/close-icon.js";
import { emit } from "../../utils/emit.js";

/**
 * The settings panel, over the right-hand panel.
 *
 * @fires er-settings - The cross was pressed; `detail` is undefined.
 */
export class ErSettings extends LitElement {
  static override properties = { open: { type: Boolean, reflect: true } };

  static override styles = [
    buttonStyles,
    focusRing,
    panelTitleStyles,
    scrollerStyles,
    css`
      :host {
        position: absolute;
        z-index: 3;
        inset: 0;
        display: flex;
        flex-direction: column;
        background: var(--er-panel);
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 0.22s ease,
          visibility 0s linear 0.22s;
      }
      :host([open]) {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.22s ease;
      }
      @media (prefers-reduced-motion: reduce) {
        :host,
        :host([open]) {
          transition: none;
        }
      }
      .head {
        position: relative;
        flex-shrink: 0;
        padding: 18px 16px 14px;
        border-bottom: 1px solid var(--er-panel-divider);
        text-align: center;
      }
      .panel-title + .rule {
        margin-bottom: 0;
      }
      .close {
        position: absolute;
        top: 8px;
        right: 8px;
      }
      .scroller {
        flex-grow: 1;
        min-height: 0;
      }
      @media ${narrow} {
        .head {
          padding: 12px 16px;
          text-align: left;
        }
        .rule {
          display: none;
        }
        .panel-title {
          margin: 0;
          font-size: 1.45em;
        }
        .close {
          top: 4px;
        }
      }
    `,
  ];

  /** Whether the panel shows. */
  open = false;

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("open") && this.open) {
      this.renderRoot.querySelector<HTMLElement>(".close")?.focus();
    }
  }

  override render() {
    return html`<div class="head">
        <div class="rule" aria-hidden="true"></div>
        <h2 class="panel-title">Settings</h2>
        <div class="rule" aria-hidden="true"></div>
        <button
          class="button close"
          data-tone="quiet"
          data-size="small"
          data-shape="icon"
          aria-label="Close settings"
          @click=${() => emit(this, "er-settings", undefined)}
        >
          ${closeIcon}
        </button>
      </div>
      <div class="scroller"></div>`;
  }
}

customElements.define("er-settings", ErSettings);

declare global {
  interface HTMLElementTagNameMap {
    "er-settings": ErSettings;
  }
}
