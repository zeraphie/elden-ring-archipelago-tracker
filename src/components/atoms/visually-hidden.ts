import { css } from "lit";
import { narrow, phone } from "./layout.js";

/**
 * Text for a screen reader alone: `.sr` keeps it in the page, out of sight; `.sr-narrow` and `.sr-phone` do so only at a tablet's width and below, or a phone's.
 */
export const visuallyHidden = css`
  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  @media ${narrow} {
    .sr-narrow {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }
  @media ${phone} {
    .sr-phone {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }
`;
