import { css } from "lit";

/**
 * The sack a key check shows, as it stands: `.sack` with `data-state` "todo", "collected" or "locked".
 */
export const sackStyles = css`
  .sack[data-state="todo"] {
    filter: var(--er-pin-todo);
  }
  .sack[data-state="collected"] {
    filter: var(--er-pin-collected);
  }
  .sack[data-state="locked"] {
    filter: var(--er-pin-locked);
    opacity: var(--er-pin-locked-opacity);
  }
`;
