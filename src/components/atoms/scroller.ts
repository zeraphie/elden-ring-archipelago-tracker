import { css } from "lit";

/**
 * A list that scrolls up and down, with a thin scrollbar in the lines' colour:
 * `.scroller`, its height set where it's used. `.scroller-frame` around one
 * gives it all the room going, and something to float over it from.
 */
export const scrollerStyles = css`
  .scroller {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--er-line) transparent;
  }
  .scroller-frame {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 0;
  }
  .scroller-frame > .scroller {
    flex-grow: 1;
    min-height: 0;
  }
`;
