/**
 * ─ Run timer ─
 *
 * The large timer, with its buttons stacked on its right. It never starts by
 * itself: before the run a long run's time can be typed into it, and timer play
 * starts it, and reaching the goal stops it for good. Reset takes holding replay
 * for a second, with its edge filling, as it ends a run of hours. It follows the look set: Compact on a solid ground,
 * right-aligned, and Comfort on the menu's shade, centred between gold rules.
 * With `column` it holds what's slotted in it, from the top of the page to the
 * foot: the buttons go up beside the top slot, and the timer stays at the foot.
 * At a tablet's width and below, it's a bar in either look, the timer beside its
 * buttons, with what's slotted under it.
 */

import { LitElement, html, nothing } from "lit";
import { SETTINGS, type SettingsState } from "../../../state/settings.js";
import { runTimeOf, type Run } from "../../../state/slices/run.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { NARROW_MEDIA } from "../../atoms/layout.js";
import { MediaController } from "../../utils/media.js";
import { replayIcon, timerPauseIcon, timerPlayIcon } from "../../utils/material-icons.js";
import { StoreController } from "../../utils/store-controller.js";
import { fullHeight } from "../../utils/column-height.js";
import { HOLD_MS, runTimerStyles } from "./run-timer-styles.js";
import { typedTime } from "./run-words.js";
import { runClock } from "./split-row.js";

/**
 * The run's large timer and its buttons.
 *
 * @slot top - What sits beside the buttons, in a column.
 * @slot - What sits between the buttons and the timer, in a column.
 * @slot foot - What sits under the timer, in a column.
 * @slot bar - What sits at the end of the bar, at a tablet's width and below.
 */
export class ErRunTimer extends LitElement {
  static override properties = {
    store: { attribute: false },
    draft: { state: true },
    isDraftBad: { state: true },
    isHolding: { state: true },
  };

  static override styles = runTimerStyles;

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
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);
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
    this.dataset.look = this.isNarrow.matches ? "compact" : this.look.value;
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
    const isRuled = this.dataset.look === "comfort";
    const rule = isRuled ? html`<div class="rule" aria-hidden="true"></div>` : nothing;
    const isColumn = this.hasAttribute("column");
    const isBar = this.isNarrow.matches;
    const foot = html`<slot name="foot"></slot>`;
    const face = html`<div class="face">
      ${rule} ${run.phase === "before" ? this.typed() : runClock(runTimeOf(run, Date.now()))}
      ${rule} ${isColumn && !isBar ? foot : nothing}
    </div>`;
    const buttons = html`<div class="buttons">
      ${this.press(run)} ${run.phase === "before" ? nothing : this.reset()}
    </div>`;
    if (!isColumn) {
      return html`${face}${buttons}`;
    }
    return isBar
      ? html`<div class="bar">${face}${buttons}<slot name="bar"></slot></div>
          <slot name="top"></slot>
          <slot></slot>
          ${foot}`
      : html`<div class="top"><slot name="top"></slot>${buttons}</div>
          <slot></slot>
          ${face}`;
  }

  // Before the run the timer is a field, so a long run's time goes in where it'll show.
  private typed() {
    return html`<div class="start" ?data-typing=${this.draft !== ""}>
      ${runClock(0)}
      <input
        class="typed fig"
        type="text"
        aria-label="Start from"
        aria-invalid=${String(this.isDraftBad)}
        .value=${this.draft}
        @input=${this.type}
        @keydown=${this.startOnEnter}
      />
    </div>`;
  }

  /** Whether what's slotted in a column would fit between the buttons and the timer at its full height. */
  fitsColumn(): boolean {
    const top = this.renderRoot.querySelector<HTMLElement>(".top");
    const face = this.renderRoot.querySelector<HTMLElement>(".face");
    if (top === null || face === null) {
      return true;
    }
    const parts = [...this.children].filter(({ slot }) => slot === "");
    return fullHeight(parts) <= this.clientHeight - top.offsetHeight - face.offsetHeight;
  }

  private press({ phase }: Run) {
    if (phase === "finished") {
      return nothing;
    }
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
