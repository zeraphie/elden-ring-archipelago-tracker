/**
 * ─ Goal band ─
 *
 * The top of the goal menu once the goal's achieved: the sigil, "Goal
 * achieved", and what becomes of the items left in the slot's world. Where the
 * room lets the slot release them, a Release button sends `!release`, which
 * can't be undone; it's held back while there's no room to send to, and once
 * sent. It arrives with its sigil glowing in its own shape, as a goal row's
 * frame does, held, then fading slowly, as the band stays.
 */

import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import type { ReleaseState } from "../../../archipelago/release.js";
import { buttonStyles } from "../../atoms/button.js";
import { focusRing } from "../../atoms/focus.js";
import { narrow } from "../../atoms/layout.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import "../../molecules/er-sigil.js";
import { GLOW_IN_MS, HOLD_MS } from "./goal-rows.js";
import { RELEASE_LINES } from "./goal-words.js";

// How long the sigil's glow takes to fade, slowly, as the band stays where a row would leave.
const GLOW_FADE_MS = 1800;
// The sigil's glow on arriving, as a goal row's: lit, held, and faded, as shares of the whole.
const GLOW_MS = GLOW_IN_MS + HOLD_MS + GLOW_FADE_MS;
const LIT = unsafeCSS((GLOW_IN_MS / GLOW_MS) * 100);
const HELD = unsafeCSS(((GLOW_IN_MS + HOLD_MS) / GLOW_MS) * 100);

/**
 * The goal achieved, at the top of the goal menu, and what becomes of the items left.
 */
export class ErGoalBand extends LitElement {
  static override properties = {
    release: { attribute: false },
    say: { attribute: false },
    isSent: { state: true },
  };

  static override styles = [
    buttonStyles,
    focusRing,
    visuallyHidden,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px 16px 12px 22px;
        background: var(--er-goal-band);
        animation: arrive 0.4s ease;
      }
      .title {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      er-sigil {
        height: 42px;
        animation: glow ${unsafeCSS(GLOW_MS)}ms linear forwards;
      }
      h3 {
        margin: 0;
        font-size: 1.3em;
        font-weight: 600;
        letter-spacing: 0.04em;
        color: var(--er-gold-bright);
      }
      p {
        margin: 0;
        font-size: 0.9em;
        color: var(--er-ink-soft);
      }
      .button {
        align-self: flex-start;
      }
      @keyframes arrive {
        from {
          opacity: 0;
        }
      }
      @keyframes glow {
        0%,
        100% {
          filter: none;
        }
        ${LIT}%,
        ${HELD}% {
          filter: drop-shadow(0 0 4px var(--er-sigil-glow-bright)) drop-shadow(0 0 10px var(--er-sigil-glow));
        }
      }
      /* In the strip, one line: the sigil, the words, and Release where there's one; the line on
         what becomes of the items kept for a screen reader. */
      @media ${narrow} {
        :host {
          flex-direction: row;
          align-items: center;
          gap: 12px;
          padding: 6px 12px;
        }
        er-sigil {
          height: 36px;
        }
        h3 {
          font-size: 1.05em;
          white-space: nowrap;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host,
        er-sigil {
          animation: none;
        }
      }
    `,
  ];

  /** What becomes of the items left in the slot's world. */
  release: ReleaseState = "unknown";
  /** Says a command to the room; undefined while there's no room to send to. */
  say: ((text: string) => void) | undefined;
  private isSent = false;

  override render() {
    return html`<div class="title">
        <er-sigil></er-sigil>
        <h3>Goal achieved</h3>
      </div>
      <p class="sr-narrow">${RELEASE_LINES[this.release]}</p>
      ${
        this.release === "can release"
          ? html`<button
              class="button"
              data-tone="overlay"
              ?disabled=${this.say === undefined || this.isSent}
              @click=${this.sendRelease}
            >
              Release
            </button>`
          : nothing
      }`;
  }

  private readonly sendRelease = (): void => {
    this.say?.("!release");
    this.isSent = true;
  };
}

customElements.define("er-goal-band", ErGoalBand);

declare global {
  interface HTMLElementTagNameMap {
    "er-goal-band": ErGoalBand;
  }
}
