import type { ReactiveController, ReactiveControllerHost } from "lit";

// The room between what opens a popover and the popover, in CSS pixels.
const GAP_PX = 6;

// Sets `--left` and `--right` on the anchor's edges, for the popover's styles to pick from.
function setEdges({ style }: HTMLElement, box: DOMRect): void {
  style.setProperty("--left", `${box.left}px`);
  style.setProperty("--right", `${document.documentElement.clientWidth - box.right}px`);
}

/**
 * Places a popover under `anchor`: `--top` under it, or flush with the foot of
 * `foot` when one is given, and `--left` and `--right` on its edges, for the
 * popover's styles to pick from.
 */
export function placeBelow(popover: HTMLElement, anchor: Element, foot?: Element | null): void {
  const box = anchor.getBoundingClientRect();
  const top = foot?.getBoundingClientRect().bottom ?? box.bottom + GAP_PX;
  popover.style.setProperty("--top", `${top}px`);
  setEdges(popover, box);
}

/**
 * Places a popover under what opens it, as it opens, as `placeBelow` does.
 * Called from the popover's `beforetoggle`.
 */
export function placeUnder(event: Event, anchor: Element | null, foot?: Element | null): void {
  if ((event as ToggleEvent).newState !== "open" || anchor === null) {
    return;
  }
  placeBelow(event.target as HTMLElement, anchor, foot);
}

/**
 * Places a popover above `anchor`: `--bottom` over it, and `--left` and
 * `--right` on its edges, for the popover's styles to pick from.
 */
export function placeOver(popover: HTMLElement, anchor: Element): void {
  const box = anchor.getBoundingClientRect();
  const bottom = document.documentElement.clientHeight - box.top + GAP_PX;
  popover.style.setProperty("--bottom", `${bottom}px`);
  setEdges(popover, box);
}

/**
 * Keeps an open popover in place, for a Lit element: `follow` places it, and
 * places it again as what it's watching changes size, until `stop` or the
 * element leaves the page.
 */
export class PopoverFollower implements ReactiveController {
  private watcher: ResizeObserver | undefined;

  constructor(host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostDisconnected(): void {
    this.stop();
  }

  /** Runs `place`, and runs it again whenever one of `watched` changes size. */
  follow(place: () => void, ...watched: readonly Element[]): void {
    this.stop();
    place();
    this.watcher = new ResizeObserver(place);
    for (const element of watched) {
      this.watcher.observe(element);
    }
  }

  /** Stops following, as the popover closes. */
  stop(): void {
    this.watcher?.disconnect();
    this.watcher = undefined;
  }
}
