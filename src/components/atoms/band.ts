import { css } from "lit";

/**
 * A row in the game's merchant style: an olive band with hairlines when it's
 * hovered or the one current, `.band-row`. It's current by
 * `aria-current="true"`, or by holding a checked input; one holding a disabled
 * input isn't banded on hover.
 */
export const bandRowStyles = css`
  .band-row:hover:not(:has(:disabled)),
  .band-row[aria-current="true"],
  .band-row:has(:checked) {
    background: var(--er-band);
    box-shadow: var(--er-band-lines);
  }
`;
