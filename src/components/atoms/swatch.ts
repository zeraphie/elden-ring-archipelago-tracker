import { css } from "lit";

/**
 * A region's fill and edge as a small block, by how it stands: `.swatch` with
 * `data-state` "locked", "open" or "done", its size set where it's used.
 */
export const swatchStyles = css`
  .swatch {
    flex: none;
    box-sizing: border-box;
    border: 1px solid;
  }
  .swatch[data-state="locked"] {
    background: var(--er-region-locked);
    border-color: var(--er-region-locked-edge);
  }
  .swatch[data-state="open"] {
    background: var(--er-region-open);
    border-color: var(--er-region-open-edge);
  }
  .swatch[data-state="done"] {
    background: var(--er-region-done);
    border-color: var(--er-region-done-edge);
  }
`;
