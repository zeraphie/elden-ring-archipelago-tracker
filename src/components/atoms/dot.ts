import { css } from "lit";

/**
 * A small square that says how a part stands: `.dot` with `data-state`. An
 * outline while it waits, pulsing gold while it loads, gold once it's in, and
 * the error's colour once it's failed. Held still when motion is reduced.
 */
export const dotStyles = css`
  .dot {
    flex: none;
    width: 9px;
    height: 9px;
    box-sizing: border-box;
    border: 1px solid var(--er-edge);
  }
  .dot[data-state="loading"] {
    border-color: var(--er-gold);
    animation: dot-pulse 900ms ease-in-out infinite alternate;
  }
  .dot[data-state="in"] {
    background: var(--er-gold);
    border-color: var(--er-gold);
  }
  .dot[data-state="failed"] {
    background: var(--er-error);
    border-color: var(--er-error);
  }
  @keyframes dot-pulse {
    from {
      background: transparent;
    }
    to {
      background: color-mix(in srgb, var(--er-gold) 70%, transparent);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .dot[data-state="loading"] {
      animation: none;
    }
  }
`;
