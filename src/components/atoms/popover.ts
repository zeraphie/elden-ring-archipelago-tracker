import { css } from "lit";

/**
 * A native popover floating over the page, under what opens it: `.popover` on
 * an element with `popover`. It's placed by `--top`, and by `--left` or
 * `--right` or both, as `placeUnder` sets them; its size is set where it's used.
 */
export const popoverStyles = css`
  .popover {
    position: fixed;
    inset: auto;
    top: var(--top, 64px);
    margin: 0;
    overflow-y: auto;
    background: var(--er-overlay);
    border: 1px solid var(--er-line);
    box-shadow: var(--er-overlay-shadow);
    color: var(--er-ink);
    font: inherit;
  }
`;
