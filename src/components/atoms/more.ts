import { css } from "lit";
import { narrow } from "./layout.js";

/** A long list's way to its other rows: `.more` holding a `.segment`, at least 44 px at a tablet's width and below, for a finger. */
export const moreStyles = css`
  .more {
    padding: 12px 16px 18px;
  }
  .more .segment {
    width: 100%;
    margin: 0;
    min-height: 40px;
  }
  @media ${narrow} {
    :host .more .segment {
      min-height: 44px;
    }
  }
`;
