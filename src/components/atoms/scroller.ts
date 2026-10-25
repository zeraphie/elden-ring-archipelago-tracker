import { css } from "lit";

/**
 * A list that scrolls up and down, with a thin scrollbar in the lines' colour:
 * `.scroller`, its height set where it's used.
 */
export const scrollerStyles = css`
  .scroller {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--er-line) transparent;
  }
`;
