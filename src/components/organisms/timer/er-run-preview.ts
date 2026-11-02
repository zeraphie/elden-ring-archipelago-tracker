/**
 * ─ Run preview ─
 *
 * A timer style as the settings show it, the look the element's `data-look`
 * names: a goal gotten, a goal left and the timer, drawn with the column's own
 * rows and lists. The goals and times are made up here, so they're no room's
 * and give nothing away. It's a picture, for the settings to hold beside the
 * style's radio, and where it's narrow it leaves the difference out.
 */

import { LitElement, css, html, nothing } from "lit";
import { panelTitleStyles } from "../../atoms/heading.js";
import { iconUrl } from "../../utils/icons.js";
import { runSplitsStyles } from "./run-splits-styles.js";
import { comfortLists, compactLists } from "./split-lists.js";
import { runClock, splitGotten, splitLeft } from "./split-row.js";

const GOTTEN = {
  label: "Morgott",
  shown: "Morgott",
  line: "",
  icon: iconUrl("remembrance-of-the-omen-king"),
};
const LEFT = { label: "Godfrey", shown: "Godfrey", line: "", icon: iconUrl("godfrey") };
const GOTTEN_MS = 6_728_000;
const DIFF_MS = -72_000;
const LEFT_MS = 9_100_000;
const CLOCK_MS = 8_048_350;

/**
 * A timer style, on made-up goals, for the settings to show.
 */
export class ErRunPreview extends LitElement {
  static override styles = [
    panelTitleStyles,
    ...runSplitsStyles,
    css`
      :host,
      :host([data-look="comfort"]) {
        display: block;
        overflow: hidden;
        background: var(--er-ground);
        border: 1px solid var(--er-line);
        pointer-events: none;
        container: preview / inline-size;
      }
      .foot {
        padding: 6px 12px 8px;
        border-top: 1px solid var(--er-line);
      }
      .clock {
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
        line-height: 1;
        color: var(--er-gold);
      }
      .whole {
        font-size: 32px;
      }
      .small {
        font-size: 18px;
      }
      :host([data-look="comfort"]) .foot {
        padding: 6px 0 10px;
        border-top: none;
      }
      :host([data-look="comfort"]) .clock {
        justify-content: center;
        padding: 6px 12px;
      }
      :host([data-look="comfort"]) .whole {
        font-size: 28px;
      }
      :host([data-look="comfort"]) .small {
        font-size: 16px;
      }
      .rule {
        margin: 0 14%;
      }
      /* Side by side on a phone there's no room for a difference, or for the row's padding. */
      @container preview (max-width: 240px) {
        .row,
        :host([data-look="comfort"]) .row {
          grid-template-columns: minmax(0, 1fr) auto;
          column-gap: 6px;
        }
        :host([data-look="comfort"]) .row {
          grid-template-columns: 28px minmax(0, 1fr) auto;
          column-gap: 4px;
          padding: 2px 4px;
        }
        .row > .fig:nth-last-child(2) {
          display: none;
        }
        .band {
          margin-right: 12px;
        }
        .whole {
          font-size: 24px;
        }
        .small {
          font-size: 14px;
        }
      }
    `,
  ];

  override render() {
    const isComfort = this.dataset.look === "comfort";
    const isFramed = { isFramed: isComfort };
    const lists = {
      gotten: splitGotten(
        { ...GOTTEN, ...isFramed },
        { isLatest: true, time: GOTTEN_MS, pace: { diffMs: DIFF_MS, pace: "ahead" } },
        undefined
      ),
      doneCount: 1,
      toDo: [LEFT.label],
      left: () => splitLeft({ ...LEFT, ...isFramed }, LEFT_MS, false),
      handle: undefined,
    };
    const rule = isComfort ? html`<div class="rule" aria-hidden="true"></div>` : nothing;
    return html`${isComfort ? comfortLists(lists) : compactLists(lists)}
      <div class="foot">${rule}${runClock(CLOCK_MS, isComfort ? undefined : "ahead")}${rule}</div>`;
  }
}

customElements.define("er-run-preview", ErRunPreview);

declare global {
  interface HTMLElementTagNameMap {
    "er-run-preview": ErRunPreview;
  }
}
