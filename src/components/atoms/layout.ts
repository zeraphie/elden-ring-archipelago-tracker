import { unsafeCSS } from "lit";

/**
 * Where the page stacks, at a tablet's width and below: the map on top, the panel under it, and the goal menu a strip along the map's foot.
 */
export const NARROW_MEDIA = "(max-width: 900px)";

/** `NARROW_MEDIA` for a css template's `@media`. */
export const narrow = unsafeCSS(NARROW_MEDIA);
