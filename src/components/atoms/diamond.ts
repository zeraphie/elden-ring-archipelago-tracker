import { css } from "lit";

/**
 * A radio or a checkbox as the game's own diamond: `.diamond` on the input. An
 * outline when it's off and filled when it's on, with a thin ring and a soft
 * glow when pointed at.
 */
export const diamondStyles = css`
  .diamond {
    flex-shrink: 0;
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    margin: 2px;
    background: transparent;
    border: 1px solid var(--er-gold);
    rotate: 45deg;
    cursor: pointer;
    appearance: none;
  }
  .diamond:checked {
    background: var(--er-gold);
  }
  .diamond:hover {
    outline: 1px solid var(--er-gold-bright);
    outline-offset: 2px;
    box-shadow: 0 0 8px 1px var(--er-sigil-glow);
  }
`;
