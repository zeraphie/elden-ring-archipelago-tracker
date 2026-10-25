/**
 * ─ Toggle row ─
 *
 * Filters as text toggles, each with its count, left-aligned at their own
 * widths, and one gold bar beneath them. The bar slides to the toggle pointed
 * at or focused, and back to the one chosen when the pointer leaves; only the
 * chosen one's text turns gold. The bar's place is measured from the toggles
 * as drawn, so it fits whatever they say.
 */

import { LitElement, css, html, nothing } from "lit";
import { figures } from "../atoms/figures.js";
import { focusRing } from "../atoms/focus.js";
import { emit } from "../utils/emit.js";
import { figure } from "../utils/figure.js";

/** One toggle of the row: its key, its name, and how many it holds, when that's shown. */
export interface ToggleOption {
  readonly key: string;
  readonly label: string;
  readonly count?: number;
}

/**
 * A row of filters as text toggles, the one chosen marked by a bar that slides between them.
 *
 * @fires er-choose - A toggle was chosen; `detail` is its key.
 */
export class ErToggleRow extends LitElement {
  static override properties = {
    options: { attribute: false },
    chosen: { attribute: false },
    label: { attribute: false },
    pointed: { state: true },
  };

  static override styles = [
    figures,
    focusRing,
    css`
      :host {
        display: block;
      }
      [role="group"] {
        position: relative;
        display: flex;
        gap: 20px;
      }
      button {
        min-height: 44px;
        padding: 0;
        background: none;
        border: none;
        font: inherit;
        color: var(--er-ink-muted);
        cursor: pointer;
        transition: color 0.2s ease;
      }
      button[aria-pressed="true"] {
        color: var(--er-gold-bright);
      }
      .bar {
        position: absolute;
        bottom: -1px;
        height: 2px;
        background: var(--er-gold);
        transition:
          left 0.25s ease,
          width 0.25s ease;
      }
      @media (prefers-reduced-motion: reduce) {
        .bar {
          transition: none;
        }
      }
    `,
  ];

  /** The toggles, in order. */
  options: readonly ToggleOption[] = [];
  /** The key of the toggle chosen. */
  chosen = "";
  /** What the row chooses, for a screen reader. */
  label = "";
  // The toggle pointed at or focused, by key; the bar goes there while it is.
  private pointed: string | undefined;

  override render() {
    return html`<div role="group" aria-label=${this.label}>
      ${this.options.map(
        ({ key, label, count }) =>
          html`<button
            data-key=${key}
            aria-pressed=${String(key === this.chosen)}
            @click=${() => emit(this, "er-choose", key)}
            @pointerenter=${() => this.point(key)}
            @pointerleave=${() => this.point(undefined)}
            @focus=${() => this.point(key)}
            @blur=${() => this.point(undefined)}
          >
            ${label}${count === undefined ? nothing : html` <span class="fig">${figure(count)}</span>`}
          </button>`
      )}
      <span class="bar" aria-hidden="true"></span>
    </div>`;
  }

  // The bar under the toggle pointed at, or else the one chosen, measured as drawn.
  protected override updated(): void {
    const key = this.pointed ?? this.chosen;
    const under = [...this.renderRoot.querySelectorAll<HTMLElement>("button")].find(
      (button) => button.dataset.key === key
    );
    const bar = this.renderRoot.querySelector<HTMLElement>(".bar");
    if (under !== undefined && bar !== null) {
      bar.style.left = `${under.offsetLeft}px`;
      bar.style.width = `${under.offsetWidth}px`;
    }
  }

  private point(key: string | undefined): void {
    this.pointed = key;
  }
}

customElements.define("er-toggle-row", ErToggleRow);

declare global {
  interface HTMLElementTagNameMap {
    "er-toggle-row": ErToggleRow;
  }
}
