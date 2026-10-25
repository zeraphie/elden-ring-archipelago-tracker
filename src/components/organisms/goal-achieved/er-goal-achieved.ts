/**
 * ─ Goal achieved ─
 *
 * Over the whole page once the slot's goal is done while the tracker
 * watches: the page dims, the sigil draws itself, the wordmark comes up over
 * it, and "Goal achieved" rises beneath. It's a modal dialog, so nothing
 * under it can be used until it's dismissed, by its button or Escape; then
 * it fades, and the goal menu's band takes its place. Under reduced motion
 * it stands drawn, and goes at once.
 */

import { LitElement, css, html } from "lit";
import { buttonStyles } from "../../atoms/button.js";
import { focusRing } from "../../atoms/focus.js";
import "../../molecules/er-sigil.js";
import { emit } from "../../utils/emit.js";
import { isMotionReduced } from "../../utils/motion.js";
import { WORDMARK_PATH, WORDMARK_VIEW_BOX } from "./wordmark.js";

// How long it takes to fade, as its styles have it.
const LEAVE_MS = 600;

/**
 * The goal achieved, over the whole page until dismissed.
 *
 * @fires er-dismiss - Dismissed, once it has gone; `detail` is undefined.
 * @cssproperty --er-sigil-draw - How long the sigil takes to draw; the wordmark and the words come after.
 */
export class ErGoalAchieved extends LitElement {
  static override styles = [
    buttonStyles,
    focusRing,
    css`
      :host {
        --er-sigil-draw: 4.5s;
        display: contents;
      }
      /* The whole window, the scrim inside it standing in for the backdrop, so the two fade together. */
      dialog {
        position: fixed;
        inset: 0;
        box-sizing: border-box;
        width: 100%;
        max-width: none;
        height: 100%;
        max-height: none;
        margin: 0;
        padding: 0;
        overflow: clip;
        background: transparent;
        border: none;
        color: inherit;
        font: inherit;
      }
      dialog::backdrop {
        background: transparent;
      }
      .scrim {
        position: absolute;
        inset: 0;
        background: var(--er-goal-scrim);
        animation: show 0.6s ease;
      }
      .scrim[data-leaving],
      .reaction[data-leaving] {
        opacity: 0;
        transition: opacity 0.6s ease;
      }
      .reaction {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        width: min(420px, 90%);
        transform: translate(-50%, -50%);
      }
      .wordmark {
        width: 100%;
        fill: var(--er-gold);
        opacity: 0;
        animation: show 0.9s ease var(--er-sigil-draw) forwards;
      }
      er-sigil {
        --er-sigil-weight: 3.5;
        height: clamp(160px, 36vh, 330px);
      }
      .words {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 100%;
        opacity: 0;
        animation: rise 0.7s ease calc(var(--er-sigil-draw) + 0.4s) forwards;
      }
      .rule {
        width: 90%;
        height: 1px;
        background: var(--er-gold-rule);
      }
      /* Smaller on a narrow screen, so it stays on one line. */
      h2 {
        margin: 0;
        font-size: min(2.3em, 7vw);
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--er-gold-bright);
      }
      .button {
        margin-top: 10px;
      }
      @keyframes show {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes rise {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: none;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .scrim,
        .wordmark,
        .words {
          animation: none;
          opacity: 1;
        }
      }
    `,
  ];

  // Whether it's been dismissed, and is fading; and whether it's said so.
  private isLeaving = false;
  private hasLeft = false;

  // Shown as a modal, so the page under it can't be used, and Escape asks to dismiss it.
  protected override firstUpdated(): void {
    this.renderRoot.querySelector("dialog")?.showModal();
  }

  override render() {
    const { isLeaving } = this;
    return html`<dialog
      aria-label="Goal achieved"
      autofocus
      @cancel=${(event: Event) => {
        event.preventDefault();
        this.dismiss();
      }}
      @close=${this.leave}
    >
      <div class="scrim" ?data-leaving=${isLeaving}></div>
      <section class="reaction" ?data-leaving=${isLeaving}>
        <svg class="wordmark" viewBox=${WORDMARK_VIEW_BOX} aria-hidden="true">
          <path d=${WORDMARK_PATH}></path>
        </svg>
        <er-sigil drawing></er-sigil>
        <div class="words">
          <span class="rule"></span>
          <h2>Goal achieved</h2>
          <span class="rule"></span>
          <button class="button" data-tone="overlay" @click=${this.dismiss}>Dismiss</button>
        </div>
      </section>
    </dialog>`;
  }

  // Fades, then says it's gone; at once under reduced motion.
  private readonly dismiss = (): void => {
    if (this.isLeaving) {
      return;
    }
    if (isMotionReduced()) {
      this.leave();
      return;
    }
    this.isLeaving = true;
    this.requestUpdate();
    setTimeout(this.leave, LEAVE_MS);
  };

  // Says it's gone, once, whether it faded or the browser closed it outright.
  private readonly leave = (): void => {
    if (this.hasLeft) {
      return;
    }
    this.hasLeft = true;
    emit(this, "er-dismiss", undefined);
  };
}

customElements.define("er-goal-achieved", ErGoalAchieved);

declare global {
  interface HTMLElementTagNameMap {
    "er-goal-achieved": ErGoalAchieved;
  }
}
