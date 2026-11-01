/**
 * ─ Stick to bottom ─
 *
 * A list with its newest line at the bottom opens there, and stays there as
 * lines come. Once it's been scrolled up to read, it stays where it was put,
 * and `isAway` says so, until it's scrolled back or sent back with `toBottom`.
 */

import type { ReactiveController, ReactiveControllerHost } from "lit";
import { isMotionReduced } from "./motion.js";

// Within this many pixels of the bottom, a list counts as at the bottom, and stays there.
const BOTTOM_SLACK_PX = 8;

/** Whether a list is at its bottom, or so near that it counts as there. */
export function isAtBottom({
  scrollTop,
  clientHeight,
  scrollHeight,
}: Pick<Element, "scrollTop" | "clientHeight" | "scrollHeight">): boolean {
  return scrollTop + clientHeight >= scrollHeight - BOTTOM_SLACK_PX;
}

/**
 * Keeps a list at its bottom, for a Lit element, unless it's been scrolled up:
 * `isAway` says when it has, and the element updates when that changes.
 */
export class StickToBottom implements ReactiveController {
  /** Whether the list has been scrolled up from its bottom, so it stays where it is. */
  isAway = false;
  private list: Element | undefined;

  constructor(
    private readonly host: ReactiveControllerHost,
    private readonly find: () => Element | null
  ) {
    host.addController(this);
  }

  hostUpdated(): void {
    const list = this.find() ?? undefined;
    if (list !== this.list) {
      this.list?.removeEventListener("scroll", this.scrolled);
      list?.addEventListener("scroll", this.scrolled, { passive: true });
      this.list = list;
    }
    this.pin();
    // A new row's own elements draw after this one, and can make it taller.
    requestAnimationFrame(this.pin);
  }

  hostDisconnected(): void {
    this.list?.removeEventListener("scroll", this.scrolled);
    this.list = undefined;
    this.isAway = false;
  }

  /** Puts the list back at its bottom at its next update, as when what it shows changes. */
  stay(): void {
    this.isAway = false;
  }

  /** Scrolls the list back to its bottom, gliding unless the person has asked for less motion. */
  toBottom(): void {
    this.list?.scrollTo({
      top: this.list.scrollHeight,
      behavior: isMotionReduced() ? "auto" : "smooth",
    });
  }

  private readonly pin = (): void => {
    if (this.list !== undefined && !this.isAway) {
      this.list.scrollTop = this.list.scrollHeight;
    }
  };

  private readonly scrolled = (): void => {
    const isAway = this.list !== undefined && !isAtBottom(this.list);
    if (isAway !== this.isAway) {
      this.isAway = isAway;
      this.host.requestUpdate();
    }
  };
}
