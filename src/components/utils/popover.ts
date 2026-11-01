// The room between what opens a popover and the popover, in CSS pixels.
const GAP_PX = 6;

// The anchor's box as a popover opens, with `--left` and `--right` set on its edges, for the
// popover's styles to pick from; undefined on closing, or with no anchor.
function openingBeside(event: Event, anchor: Element | null): DOMRect | undefined {
  const box = anchor?.getBoundingClientRect();
  if ((event as ToggleEvent).newState !== "open" || box === undefined) {
    return undefined;
  }
  const { style } = event.target as HTMLElement;
  style.setProperty("--left", `${box.left}px`);
  style.setProperty("--right", `${document.documentElement.clientWidth - box.right}px`);
  return box;
}

/**
 * Places a popover under what opens it, as it opens: `--top` under the
 * anchor, or flush with the foot of `foot` when one is given, and `--left` and
 * `--right` on the anchor's edges, for its styles to pick from. Called from the
 * popover's `beforetoggle`.
 */
export function placeUnder(event: Event, anchor: Element | null, foot?: Element | null): void {
  const box = openingBeside(event, anchor);
  if (box !== undefined) {
    const top = foot?.getBoundingClientRect().bottom ?? box.bottom + GAP_PX;
    (event.target as HTMLElement).style.setProperty("--top", `${top}px`);
  }
}

/**
 * Places a popover above what opens it, as it opens: `--bottom` over the
 * anchor, and `--left` and `--right` on the anchor's edges, for its styles to
 * pick from. Called from the popover's `beforetoggle`.
 */
export function placeOver(event: Event, anchor: Element | null): void {
  const box = openingBeside(event, anchor);
  if (box !== undefined) {
    const bottom = document.documentElement.clientHeight - box.top + GAP_PX;
    (event.target as HTMLElement).style.setProperty("--bottom", `${bottom}px`);
  }
}
