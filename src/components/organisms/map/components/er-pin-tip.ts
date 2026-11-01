/**
 * ─ Pin tip ─
 *
 * The tooltip beside a pin pointed at: each spot on it as the panel lists it,
 * or under a heading band, as the settings say, and how many of its checks are
 * checked, where it holds more than one. It follows its pin as the map moves. A
 * touch points at nothing, so it never shows there.
 */

import { LitElement, css } from "lit";
import { SETTINGS, type SettingsState } from "../../../../state/settings.js";
import { checkTip, checkTipStyles, type TipSpot } from "../../../molecules/check-row.js";
import { StoreController } from "../../../utils/store-controller.js";
import { tipPlace } from "../utils/pin-tip.js";

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
    checkTipStyles,
    css`
      :host {
        position: absolute;
        z-index: 4;
        box-sizing: border-box;
        width: 300px;
        pointer-events: none;
      }
      @media (hover: none) {
        :host {
          display: none;
        }
      }
    `,
  ];

  /** The spots on the pin. */
  spots: readonly TipSpot[] = [];
  /** How many of its checks are checked, said at the foot; undefined for a pin of one check. */
  count: string | undefined;
  /** The pin it sits beside. */
  pin: Element | undefined;
  /** What it's placed within, which it stays inside. */
  frame: Element | undefined;
  private readonly look = new StoreController(
    this,
    SETTINGS,
    ({ checkLook }: SettingsState) => checkLook
  );

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
    return checkTip(this.spots, this.look.value, this.count);
  }
}

customElements.define("er-pin-tip", ErPinTip);

declare global {
  interface HTMLElementTagNameMap {
    "er-pin-tip": ErPinTip;
  }
}
