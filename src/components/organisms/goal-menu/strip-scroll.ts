/**
 * ─ Strip scroll ─
 *
 * The goal strip scrolled sideways with a mouse, as a finger already swipes
 * it: the wheel's up and down turn it left and right, and a drag pulls it
 * along. A press on a button in it, such as the band's Release, is left to
 * the button, and nothing happens while the strip has nothing to scroll. It
 * marks the strip `data-scrolls` while it can be dragged, and
 * `data-dragging` while it is, for its cursor.
 */

import { wheelDeltaToPixels } from "../../utils/wheel.js";

/** The handlers that scroll a strip sideways with a mouse, for its wheel and pointer events. */
export class StripScroll {
  // The mouse pressed on the strip: which pointer, where it went down, and the scroll it started from.
  private drag:
    | { readonly pointer: number; readonly x: number; readonly scroll: number }
    | undefined;

  /** `isOn` says whether the strip is laid out sideways, so a list laid out down the page is left be. */
  constructor(private readonly isOn: () => boolean) {}

  /** Says whether the strip can be dragged, as the pointer comes onto it. */
  readonly enter = (event: PointerEvent): void => {
    const strip = event.currentTarget as HTMLElement;
    strip.toggleAttribute("data-scrolls", this.isOn() && canScroll(strip));
  };

  /** A wheel turned up or down scrolls the strip left or right; a sideways scroll is the browser's own. */
  readonly wheel = (event: WheelEvent): void => {
    const strip = event.currentTarget as HTMLElement;
    if (!this.isOn() || !canScroll(strip) || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }
    event.preventDefault();
    strip.scrollLeft += wheelDeltaToPixels(event.deltaY, event.deltaMode, strip.clientWidth);
  };

  /** A mouse pressed on the strip, anywhere but a button, takes hold of it. */
  readonly down = (event: PointerEvent): void => {
    const strip = event.currentTarget as HTMLElement;
    const isOnButton = event.composedPath().some((target) => target instanceof HTMLButtonElement);
    if (
      !this.isOn() ||
      event.pointerType !== "mouse" ||
      event.button !== 0 ||
      isOnButton ||
      !canScroll(strip)
    ) {
      return;
    }
    // Held, the press neither selects text nor picks up an icon to drag away.
    event.preventDefault();
    strip.setPointerCapture(event.pointerId);
    strip.toggleAttribute("data-dragging", true);
    this.drag = { pointer: event.pointerId, x: event.clientX, scroll: strip.scrollLeft };
  };

  /** The strip held follows the mouse sideways. */
  readonly move = (event: PointerEvent): void => {
    const { drag } = this;
    if (drag?.pointer === event.pointerId) {
      (event.currentTarget as HTMLElement).scrollLeft = drag.scroll - (event.clientX - drag.x);
    }
  };

  /** The mouse let go, or the browser took it away. */
  readonly up = (event: PointerEvent): void => {
    if (this.drag?.pointer === event.pointerId) {
      this.drag = undefined;
      (event.currentTarget as HTMLElement).toggleAttribute("data-dragging", false);
    }
  };
}

function canScroll(strip: HTMLElement): boolean {
  return strip.scrollWidth > strip.clientWidth;
}
