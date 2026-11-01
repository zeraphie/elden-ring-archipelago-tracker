// The room between what opens a popover and the popover, in CSS pixels.
const GAP_PX = 6;

// Sets `--left` and `--right` on the anchor's edges, for the popover's styles to pick from.
function setEdges({ style }: HTMLElement, box: DOMRect): void {
  style.setProperty("--left", `${box.left}px`);
  style.setProperty("--right", `${document.documentElement.clientWidth - box.right}px`);
}

/**
 * Places a popover under what opens it, as it opens: `--top` under the
 * anchor, or flush with the foot of `foot` when one is given, and `--left` and
 * `--right` on the anchor's edges, for its styles to pick from. Called from the
 * popover's `beforetoggle`.
 */
export function placeUnder(event: Event, anchor: Element | null, foot?: Element | null): void {
  const box = anchor?.getBoundingClientRect();
  const popover = event.target as HTMLElement;
  if ((event as ToggleEvent).newState !== "open" || box === undefined) {
    return;
  }
  const top = foot?.getBoundingClientRect().bottom ?? box.bottom + GAP_PX;
  popover.style.setProperty("--top", `${top}px`);
  setEdges(popover, box);
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
