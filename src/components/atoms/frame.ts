import { css } from "lit";

/**
 * An icon in the game's frame, as the goal menu shows it: `.frame` holding an `img`, edged with a fine line, the ground, then the frame's own inner line, which `--er-frame-edges` holds for a glow to add to.
 */
export const frameStyles = css`
  .frame {
    --er-frame-edges: inset 0 0 0 3px var(--er-ground), inset 0 0 0 4px var(--er-frame-inner);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 62px;
    height: 62px;
    box-sizing: border-box;
    background: var(--er-frame);
    border: 1px solid var(--er-line);
    box-shadow: var(--er-frame-edges);
  }
  .frame img {
    width: 54px;
    height: 54px;
    object-fit: cover;
  }
`;
