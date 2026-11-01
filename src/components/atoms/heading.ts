import { css } from "lit";

/**
 * A panel's title between gold rules, as the region picked is headed: an
 * `h2.panel-title` with a `.rule` over and under it.
 */
export const panelTitleStyles = css`
  .rule {
    height: 1px;
    margin: 0 8% 12px;
    background: var(--er-gold-rule);
  }
  .panel-title {
    margin: 0 0 12px;
    font-weight: 600;
    font-size: 1.9em;
    line-height: 1.1;
    color: var(--er-ink-bright);
  }
`;

/**
 * A section heading on a band that fades out to the right, as the game's
 * "Purchase Item": `.band-heading`, its size and room set where it's used. One
 * holding a resize handle lifts and glows while it's pointed at.
 */
export const bandHeadingStyles = css`
  .band-heading {
    background: var(--er-heading-band);
    font-weight: 600;
    color: var(--er-ink-heading);
  }
  .band-heading:has(er-resize-handle:hover) {
    background-color: var(--er-raised);
    box-shadow: var(--er-glow);
  }
`;
