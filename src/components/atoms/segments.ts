import { css } from "lit";

/**
 * Buttons joined edge to edge, sharing the width, the one chosen glowing as
 * a hovered one does: `.segment` on each, chosen by `aria-selected="true"` as
 * a tab or `aria-pressed="true"` as a toggle.
 */
export const segmentStyles = css`
  .segment {
    flex-grow: 1;
    margin-left: -1px;
    padding: 4px 10px;
    background: transparent;
    border: 1px solid var(--er-line);
    border-radius: var(--er-radius);
    color: var(--er-ink-muted);
    font: inherit;
    cursor: pointer;
  }
  .segment:hover,
  .segment[aria-selected="true"],
  .segment[aria-pressed="true"] {
    background: var(--er-glow-fill);
    box-shadow: var(--er-glow);
  }
  .segment[aria-selected="true"],
  .segment[aria-pressed="true"] {
    color: var(--er-ink-bright);
  }
`;
