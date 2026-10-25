import { css } from "lit";

/** A text field on the ground, edged with a fine line, in the page's own face: `.field` on an input. */
export const fieldStyles = css`
  .field {
    min-width: 0;
    min-height: 44px;
    box-sizing: border-box;
    padding: 6px 12px;
    background: var(--er-ground);
    border: 1px solid var(--er-line);
    border-radius: var(--er-radius);
    color: var(--er-ink);
    font: inherit;
    font-size: 0.95em;
  }
`;
