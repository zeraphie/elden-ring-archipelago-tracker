import { css } from "lit";

/**
 * The ring a control wears when the keyboard brings it into focus: a gold
 * outline, clear of its edge. `.ring-within` wears it for a control inside,
 * such as a row whose radio is hidden.
 */
export const focusRing = css`
  :focus-visible,
  .ring-within:has(:focus-visible) {
    outline: 2px solid var(--er-gold);
    outline-offset: 2px;
  }
`;
