/**
 * ─ Resize handle ─
 *
 * A handle between two parts of the page that resizes one of them: dragged by
 * a mouse or a finger, or moved by the arrow keys while it has the focus,
 * Home and End taking it to the least and the most it can be. It's a
 * separator, as screen readers know a window splitter, saying the size and
 * its bounds. It wears the double-line grip such handles do. It resizes
 * nothing itself: it says the size it's moved to, for its holder to set.
 */

import { LitElement, css, html } from "lit";
import { focusRing } from "../atoms/focus.js";
import { emit } from "../utils/emit.js";

// How far an arrow key moves the handle, in CSS pixels; with Shift, four times as far.
const STEP_PX = 16;

/** Which way a handle moves: sideways, sizing a width, or up and down, sizing a height. */
export type ResizeAxis = "x" | "y";

/**
 * A handle that resizes a part of the page, by drag or by key.
 *
 * @fires er-resize - The handle was moved; `detail` is the size it asks for, in CSS pixels, within its limits.
 */
export class ErResizeHandle extends LitElement {
  static override properties = {
    axis: { attribute: false },
    grows: { attribute: false },
    measure: { attribute: false },
    limits: { attribute: false },
    label: { attribute: false },
    isDragging: { state: true },
  };

  static override styles = [
    focusRing,
    css`
      :host {
        display: block;
      }
      [role="separator"] {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        color: var(--er-ink-muted);
        touch-action: none;
        user-select: none;
      }
      [data-axis="x"] {
        cursor: col-resize;
      }
      [data-axis="y"] {
        cursor: row-resize;
      }
      [role="separator"]:hover,
      [role="separator"]:focus-visible,
      [data-dragging] {
        color: var(--er-gold);
      }
      /* Two lines across the way it moves, on a small plate of the panel's ground. */
      .grip {
        box-sizing: border-box;
        background: var(--er-panel);
        border: 1px solid var(--er-line);
      }
      .grip::before {
        content: "";
        display: block;
        box-sizing: border-box;
        border-color: currentColor;
        border-style: solid;
      }
      [data-axis="x"] .grip {
        padding: 9px 3px;
      }
      [data-axis="x"] .grip::before {
        width: 6px;
        height: 16px;
        border-width: 0 2px;
      }
      [data-axis="y"] .grip {
        padding: 3px 9px;
      }
      [data-axis="y"] .grip::before {
        width: 16px;
        height: 6px;
        border-width: 2px 0;
      }
    `,
  ];

  axis: ResizeAxis = "x";
  /** Whether moving right or down makes the size larger, 1, or smaller, -1. */
  grows: 1 | -1 = 1;
  /** The size of what the handle resizes, as it's drawn now. */
  measure: () => number = () => 0;
  /** The least and the most the size can be, as the page now stands. */
  limits: () => readonly [number, number] = () => [0, 0];
  /** What the handle resizes, for a screen reader. */
  label = "";
  // Whether a pointer holds the handle.
  private isDragging = false;
  // The pointer holding the handle, where it went down, and the size it started from.
  private drag:
    | { readonly pointer: number; readonly from: number; readonly size: number }
    | undefined;

  // The size and its bounds follow the window, so a screen reader hears them as they are.
  override connectedCallback(): void {
    super.connectedCallback();
    addEventListener("resize", this.refresh);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    removeEventListener("resize", this.refresh);
  }

  override render() {
    const [min, max] = this.limits();
    return html`<div
      role="separator"
      tabindex="0"
      aria-label=${this.label}
      aria-orientation=${this.axis === "x" ? "vertical" : "horizontal"}
      aria-valuenow=${Math.round(this.measure())}
      aria-valuemin=${Math.round(min)}
      aria-valuemax=${Math.round(max)}
      data-axis=${this.axis}
      ?data-dragging=${this.isDragging}
      @pointerdown=${this.down}
      @pointermove=${this.move}
      @pointerup=${this.up}
      @pointercancel=${this.up}
      @keydown=${this.key}
    >
      <span class="grip" aria-hidden="true"></span>
    </div>`;
  }

  private readonly down = (event: PointerEvent): void => {
    if (event.button !== 0) {
      return;
    }
    const handle = event.currentTarget as HTMLElement;
    event.preventDefault();
    handle.setPointerCapture(event.pointerId);
    this.drag = { pointer: event.pointerId, from: this.along(event), size: this.measure() };
    this.isDragging = true;
  };

  private readonly move = (event: PointerEvent): void => {
    const { drag } = this;
    if (drag?.pointer === event.pointerId) {
      this.ask(drag.size + this.grows * (this.along(event) - drag.from));
    }
  };

  private readonly up = (event: PointerEvent): void => {
    if (this.drag?.pointer === event.pointerId) {
      this.drag = undefined;
      this.isDragging = false;
    }
  };

  // The arrows along its axis move it a step, Home and End to its least and most.
  private readonly key = (event: KeyboardEvent): void => {
    const [back, forth] =
      this.axis === "x" ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
    const step = event.shiftKey ? STEP_PX * 4 : STEP_PX;
    const [min, max] = this.limits();
    const size =
      event.key === back
        ? this.measure() - this.grows * step
        : event.key === forth
          ? this.measure() + this.grows * step
          : event.key === "Home"
            ? min
            : event.key === "End"
              ? max
              : undefined;
    if (size === undefined) {
      return;
    }
    event.preventDefault();
    this.ask(size);
  };

  // Asks for a size within the limits, and draws again to say it.
  private ask(size: number): void {
    const [min, max] = this.limits();
    emit<number>(this, "er-resize", Math.min(max, Math.max(min, size)));
    this.requestUpdate();
  }

  private readonly refresh = (): void => {
    this.requestUpdate();
  };

  private along(event: PointerEvent): number {
    return this.axis === "x" ? event.clientX : event.clientY;
  }
}

customElements.define("er-resize-handle", ErResizeHandle);

declare global {
  interface HTMLElementTagNameMap {
    "er-resize-handle": ErResizeHandle;
  }
}
