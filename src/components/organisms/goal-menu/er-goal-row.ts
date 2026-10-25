/**
 * ─ Goal row ─
 *
 * One row of the goal menu: an icon in its frame, or the frame alone until
 * its icon is in, and beside it what it is and how it stands. A gotten row,
 * marked `data-gotten`, sits on the band in colour; one not yet gotten is
 * dimmed and grey. A row achieved, marked `data-leaving`, plays its way out:
 * its frame glows in its own square shape and holds, then the row slides off
 * to the left, still lit, as a toast leaves; in the strip, its glow keeps
 * inside the frame. Under reduced motion it just goes.
 */

import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { frameStyles } from "../../atoms/frame.js";
import { narrow } from "../../atoms/layout.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import { GLOW_IN_MS, HOLD_MS, LEAVE_MS } from "./goal-rows.js";

// The leaving row's steps, as shares of its whole leaving: lit, held, then sliding off.
const LIT = unsafeCSS((GLOW_IN_MS / LEAVE_MS) * 100);
const HELD = unsafeCSS(((GLOW_IN_MS + HOLD_MS) / LEAVE_MS) * 100);

/**
 * A row of the goal menu: its icon in a frame, its name and how it stands. Mark it `data-gotten` once it's gotten, and `data-leaving` once it's achieved while shown.
 *
 * @cssproperty --er-goal-row-delay - How long a leaving row waits before it starts, so rows achieved together go one after another; none by default.
 */
export class ErGoalRow extends LitElement {
  static override properties = {
    icon: { attribute: false },
    label: { attribute: false },
    line: { attribute: false },
  };

  static override styles = [
    frameStyles,
    visuallyHidden,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: 18px;
        padding: 7px 0 7px 22px;
        opacity: 0.45;
      }
      :host([data-gotten]) {
        background: var(--er-gotten-band);
        opacity: 1;
      }
      :host([data-gotten]) .frame {
        border-color: var(--er-gold-edge);
      }
      img {
        filter: grayscale(1) brightness(0.85);
      }
      :host([data-gotten]) img {
        filter: none;
      }
      .text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .label {
        font-size: 1.3em;
        font-weight: 600;
        line-height: 1.1;
        color: var(--er-ink-soft);
      }
      :host([data-gotten]) .label {
        color: var(--er-ink-bright);
      }
      .line {
        font-size: 0.85em;
        color: var(--er-ink-muted);
      }
      :host([data-leaving]) {
        animation: leave ${unsafeCSS(LEAVE_MS)}ms linear var(--er-goal-row-delay, 0ms) forwards;
      }
      :host([data-leaving]) .frame {
        animation: glow ${unsafeCSS(LEAVE_MS)}ms linear var(--er-goal-row-delay, 0ms) forwards;
      }
      @keyframes leave {
        0%,
        ${HELD}% {
          transform: none;
          opacity: 1;
          animation-timing-function: ease;
        }
        100% {
          transform: translateX(-100%);
          opacity: 0;
        }
      }
      @keyframes glow {
        0% {
          border-color: var(--er-gold-edge);
          box-shadow: var(--er-frame-edges);
        }
        ${LIT}%,
        100% {
          border-color: var(--er-gold-bright);
          box-shadow:
            var(--er-frame-edges),
            inset 0 0 16px 3px var(--er-sigil-glow),
            0 0 22px 6px var(--er-sigil-glow-bright);
        }
      }
      /* In the strip, the icon alone in a smaller frame, its words kept for a screen reader; a row
         achieved glows inside its frame alone, clear of its neighbours, and drops off the map's
         foot rather than sliding over them. */
      @media ${narrow} {
        :host {
          padding: 0;
          background: none;
        }
        .frame {
          width: 44px;
          height: 44px;
        }
        .frame img {
          width: 38px;
          height: 38px;
        }
        :host([data-leaving]) {
          animation-name: drop;
        }
        :host([data-leaving]) .frame {
          animation-name: glow-inside;
        }
      }
      @keyframes glow-inside {
        0% {
          border-color: var(--er-gold-edge);
          box-shadow: var(--er-frame-edges);
        }
        ${LIT}%,
        100% {
          border-color: var(--er-gold-bright);
          box-shadow:
            var(--er-frame-edges),
            inset 0 0 10px 3px var(--er-sigil-glow-bright);
        }
      }
      @keyframes drop {
        0%,
        ${HELD}% {
          transform: none;
          opacity: 1;
          animation-timing-function: ease;
        }
        100% {
          transform: translateY(100%);
          opacity: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([data-leaving]),
        :host([data-leaving]) .frame {
          animation: none;
        }
      }
    `,
  ];

  /** The icon's URL; the frame stands empty without one. */
  icon: string | undefined;
  label = "";
  line = "";

  override render() {
    return html`<div class="frame" aria-hidden="true">
        ${this.icon === undefined ? nothing : html`<img src=${this.icon} alt="" />`}
      </div>
      <div class="text sr-narrow">
        <span class="label">${this.label}</span>
        <span class="line">${this.line}</span>
      </div>`;
  }
}

customElements.define("er-goal-row", ErGoalRow);

declare global {
  interface HTMLElementTagNameMap {
    "er-goal-row": ErGoalRow;
  }
}
