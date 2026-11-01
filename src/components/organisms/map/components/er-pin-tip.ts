/**
 * ─ Pin tip ─
 *
 * The tooltip beside a pin pointed at: each spot on it as the panel lists it,
 * and how many of its checks are checked, where it holds more than one. It
 * follows its pin as the map moves. A touch points at nothing, so it never
 * shows there.
 */

import { LitElement, css, html, nothing } from "lit";
import { popoverStyles } from "../../../atoms/popover.js";
import { checkBlock, checkRowStyles } from "../../../molecules/check-row.js";
import { tipPlace, type PinSpot } from "../utils/pin-tip.js";

/**
 * The tooltip of the pin pointed at.
 */
export class ErPinTip extends LitElement {
  static override properties = {
    spots: { attribute: false },
    count: { attribute: false },
    pin: { attribute: false },
    frame: { attribute: false },
  };

  static override styles = [
    checkRowStyles,
    popoverStyles,
    css`
      :host {
        position: absolute;
        z-index: 4;
        box-sizing: border-box;
        width: 300px;
        pointer-events: none;
      }
      /* The popover's look, placed by the map rather than by a popover's own place on the page. */
      .popover {
        position: static;
      }
      @media (hover: none) {
        :host {
          display: none;
        }
      }
      .row:last-of-type {
        border-bottom: none;
      }
      p {
        margin: 0;
        padding: 6px 16px 8px;
        border-top: 1px solid var(--er-panel-divider);
        font-size: 0.8em;
        color: var(--er-ink-muted);
      }
    `,
  ];

  /** The spots on the pin. */
  spots: readonly PinSpot[] = [];
  /** How many of its checks are checked, said at the foot; undefined for a pin of one check. */
  count: string | undefined;
  /** The pin it sits beside. */
  pin: Element | undefined;
  /** What it's placed within, which it stays inside. */
  frame: Element | undefined;

  protected override updated(): void {
    this.follow();
  }

  /** Goes back beside its pin, as when the map has moved. */
  follow(): void {
    if (this.pin === undefined || this.frame === undefined) {
      return;
    }
    const inner = this.pin.getBoundingClientRect();
    const outer = this.frame.getBoundingClientRect();
    const { left, top } = tipPlace(
      {
        left: inner.left - outer.left,
        right: inner.right - outer.left,
        top: inner.top - outer.top,
      },
      { width: this.offsetWidth, height: this.offsetHeight },
      outer
    );
    this.style.left = `${left}px`;
    this.style.top = `${top}px`;
  }

  override render() {
    return html`<div class="popover">
      ${this.spots.map(({ row, findings }) => checkBlock(row, findings))}
      ${this.count === undefined ? nothing : html`<p>${this.count}</p>`}
    </div>`;
  }
}

customElements.define("er-pin-tip", ErPinTip);

declare global {
  interface HTMLElementTagNameMap {
    "er-pin-tip": ErPinTip;
  }
}
