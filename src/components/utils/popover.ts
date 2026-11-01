// The room between what opens a popover and the popover, in CSS pixels.
const GAP_PX = 6;

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
  popover.style.setProperty("--left", `${box.left}px`);
  popover.style.setProperty("--right", `${document.documentElement.clientWidth - box.right}px`);
}
