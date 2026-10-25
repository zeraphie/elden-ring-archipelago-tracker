import { css } from "lit";

/**
 * A fold under a quieter band heading, as the goal menu folds what's done: a
 * native `details` whose `summary.band-heading` opens it, easing open and shut
 * to its contents' height, at once when motion is reduced.
 */
export const foldStyles = css`
  details {
    interpolate-size: allow-keywords;
  }
  details::details-content {
    block-size: 0;
    overflow: hidden;
    transition:
      block-size 240ms ease-out,
      content-visibility 240ms allow-discrete;
  }
  details[open]::details-content {
    block-size: auto;
  }
  summary.band-heading {
    font-size: 1em;
    color: var(--er-ink-soft);
    cursor: pointer;
  }
  @media (prefers-reduced-motion: reduce) {
    details::details-content {
      transition: none;
    }
  }
`;
