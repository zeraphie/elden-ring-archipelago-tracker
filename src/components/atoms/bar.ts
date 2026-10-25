import { css } from "lit";

/**
 * A thin bar of how much is done: `.track` holding a `.fill`, whose width is
 * its `--done` custom property, as a percentage.
 */
export const barStyles = css`
  .track {
    height: 4px;
    overflow: hidden;
    background: var(--er-raised);
  }
  .fill {
    width: var(--done, 0%);
    height: 100%;
    background: var(--er-gold);
  }
`;
