/**
 * ─ Run timer ─
 *
 * The large timer, with its buttons stacked on its right. It never starts by
 * itself: before the run a long run's time can be typed into it, and timer play
 * starts it. Reset takes holding replay for a second, with its edge filling, as
 * it ends a run of hours. It follows the look set: Compact on a solid ground,
 * right-aligned, and Comfort on the menu's shade, centred between gold rules.
 */

import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { SETTINGS, type SettingsState } from "../../../state/settings.js";
import { runTimeOf, type Run } from "../../../state/slices/run.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { buttonStyles } from "../../atoms/button.js";
import { figures } from "../../atoms/figures.js";
import { focusRing } from "../../atoms/focus.js";
import { panelTitleStyles } from "../../atoms/heading.js";
import { replayIcon, timerPauseIcon, timerPlayIcon } from "../../utils/material-icons.js";
import { StoreController } from "../../utils/store-controller.js";
import { clockFace, typedTime } from "./run-words.js";

// How long replay is held to end a run: long enough that it can't happen by accident.
const HOLD_MS = 1000;

/**
 * The run's large timer and its buttons.
 */
export class ErRunTimer extends LitElement {
  static override properties = {
    store: { attribute: false },
    draft: { state: true },
    isDraftBad: { state: true },
    isHolding: { state: true },
  };

  static override styles = [
    buttonStyles,
    figures,
    focusRing,
    panelTitleStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: 12px;
        box-sizing: border-box;
        padding: 10px 12px;
      }
      :host([data-look="compact"]) {
        background: var(--er-ground);
        border-top: 1px solid var(--er-line);
        border-right: 1px solid var(--er-line);
      }
      .face {
        flex: 1 1 0;
        min-width: 0;
      }
      .buttons {
        flex: none;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .button svg {
        width: 24px;
        height: 24px;
      }
      .clock {
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        line-height: 1;
        color: var(--er-gold);
      }
      .whole,
      .typed {
        font-size: 56px;
      }
      .small {
        font-size: 30px;
      }
      .typed {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 0;
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--er-line);
        color: var(--er-gold);
        line-height: 1;
        text-align: right;
      }
      .typed::placeholder {
        color: var(--er-gold);
        opacity: 0.7;
      }
      .typed:hover {
        background: var(--er-glow-fill);
      }
      .typed[aria-invalid="true"] {
        color: var(--er-error);
      }
      .rule {
        margin: 0 8%;
      }
      :host([data-look="comfort"]) .clock {
        justify-content: center;
        padding: 10px 0;
      }
      :host([data-look="comfort"]) .whole,
      :host([data-look="comfort"]) .typed {
        font-size: 50px;
      }
      :host([data-look="comfort"]) .small {
        font-size: 26px;
      }
      :host([data-look="comfort"]) .typed {
        margin: 10px 0;
        border-bottom: none;
        text-align: center;
      }
      /* A press held rather than a click, by mouse, finger or key. */
      .hold {
        position: relative;
        touch-action: none;
        user-select: none;
        -webkit-touch-callout: none;
      }
      /* Round the button by its edge, over its border, from the top clockwise. */
      .hold .edge {
        position: absolute;
        inset: -1px;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        fill: none;
        stroke: var(--er-gold);
        stroke-width: 2;
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
      }
      .hold[data-holding] .edge {
        animation: hold-fill ${unsafeCSS(HOLD_MS)}ms linear forwards;
      }
      @keyframes hold-fill {
        to {
          stroke-dashoffset: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .hold[data-holding] .edge {
          stroke-dashoffset: 0;
          animation: none;
        }
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  private draft = "";
  private isDraftBad = false;
  private isHolding = false;
  // What ends the run once replay has been held long enough.
  private hold: ReturnType<typeof setTimeout> | undefined;
  private run: StoreController<TrackerState, Run> | undefined;
  private readonly look = new StoreController(
    this,
    SETTINGS,
    ({ timerLook }: SettingsState) => timerLook
  );
  // The next frame's redraw, while the clock runs.
  private frame: number | undefined;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this.hold);
    if (this.frame !== undefined) {
      cancelAnimationFrame(this.frame);
      this.frame = undefined;
    }
  }

  protected override willUpdate(): void {
    if (this.store !== undefined && this.run === undefined) {
      this.run = new StoreController(this, this.store, (state: TrackerState) => state.run);
    }
    this.dataset.look = this.look.value;
  }

  protected override updated(): void {
    if (this.run?.value.phase === "running" && this.frame === undefined) {
      this.frame = requestAnimationFrame(() => {
        this.frame = undefined;
        this.requestUpdate();
      });
    }
  }

  override render() {
    const run = this.run?.value;
    if (run === undefined) {
      return nothing;
    }
    const isRuled = this.look.value === "comfort";
    const rule = isRuled ? html`<div class="rule" aria-hidden="true"></div>` : nothing;
    return html`<div class="face">
        ${rule} ${run.phase === "before" ? this.typed() : this.clock(run)} ${rule}
      </div>
      <div class="buttons">
        ${this.press(run)} ${run.phase === "before" ? nothing : this.reset()}
      </div>`;
  }

  private clock(run: Run) {
    const { whole, hundredths } = clockFace(runTimeOf(run, Date.now()));
    return html`<div class="clock fig" role="timer">
      <span class="whole">${whole}</span><span class="small">${hundredths}</span>
    </div>`;
  }

  // Before the run the timer is a field, so a long run's time goes in where it'll show.
  private typed() {
    return html`<input
      class="typed fig"
      type="text"
      inputmode="numeric"
      aria-label="Start from"
      aria-invalid=${String(this.isDraftBad)}
      placeholder="0.00"
      .value=${this.draft}
      @input=${this.type}
      @keydown=${this.startOnEnter}
    />`;
  }

  private press({ phase }: Run) {
    const [label, icon, action] =
      phase === "before"
        ? (["Start", timerPlayIcon, this.start] as const)
        : phase === "paused"
          ? (["Resume", timerPlayIcon, this.resume] as const)
          : (["Pause", timerPauseIcon, this.pause] as const);
    return html`<button
      class="button"
      data-tone="quiet"
      data-size="small"
      data-shape="icon"
      aria-label=${label}
      @click=${action}
    >
      ${icon}
    </button>`;
  }

  private reset() {
    return html`<button
      class="button hold"
      data-tone="quiet"
      data-size="small"
      data-shape="icon"
      aria-label="Hold to reset"
      title="Hold to reset"
      ?data-holding=${this.isHolding}
      @pointerdown=${this.startHolding}
      @pointerup=${this.stopHolding}
      @pointerleave=${this.stopHolding}
      @pointercancel=${this.stopHolding}
      @keydown=${this.holdKey}
      @keyup=${this.stopHolding}
      @blur=${this.stopHolding}
      @contextmenu=${(event: Event) => event.preventDefault()}
    >
      ${replayIcon}
      <svg class="edge" viewBox="0 0 36 36" aria-hidden="true">
        <path d="M18 1H35V35H1V1H18" pathLength="1"></path>
      </svg>
    </button>`;
  }

  private readonly type = ({ target }: Event): void => {
    this.draft = (target as HTMLInputElement).value;
    this.isDraftBad = false;
  };

  private readonly startOnEnter = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      this.start();
    }
  };

  private readonly start = (): void => {
    const fromMs = typedTime(this.draft);
    if (fromMs === undefined) {
      this.isDraftBad = true;
      return;
    }
    this.draft = "";
    this.store?.getState().startRun(fromMs);
  };

  private readonly pause = (): void => {
    this.store?.getState().pauseRun();
  };

  private readonly resume = (): void => {
    this.store?.getState().resumeRun();
  };

  private readonly startHolding = ({ button }: PointerEvent): void => {
    if (button === 0) {
      this.beginHold();
    }
  };

  // Space or Enter held stands in for a pointer, and its repeats change nothing.
  private readonly holdKey = (event: KeyboardEvent): void => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (!event.repeat) {
        this.beginHold();
      }
    }
  };

  private beginHold(): void {
    this.isHolding = true;
    this.hold = setTimeout(() => {
      this.isHolding = false;
      this.store?.getState().resetRun();
    }, HOLD_MS);
  }

  private readonly stopHolding = (): void => {
    clearTimeout(this.hold);
    this.isHolding = false;
  };
}

customElements.define("er-run-timer", ErRunTimer);

declare global {
  interface HTMLElementTagNameMap {
    "er-run-timer": ErRunTimer;
  }
}
