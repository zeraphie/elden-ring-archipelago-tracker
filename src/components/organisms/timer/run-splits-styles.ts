import { css } from "lit";
import { bandRowStyles } from "../../atoms/band.js";
import { figures } from "../../atoms/figures.js";
import { focusRing } from "../../atoms/focus.js";
import { frameStyles } from "../../atoms/frame.js";
import { bandHeadingStyles } from "../../atoms/heading.js";
import { scrollerStyles } from "../../atoms/scroller.js";

/** The run splits' look, in Compact and in Comfort, as the element's `data-look` says. */
export const runSplitsStyles = [
  bandHeadingStyles,
  bandRowStyles,
  figures,
  focusRing,
  frameStyles,
  scrollerStyles,
  css`
    :host {
      display: block;
    }
    /* The shade lets the map have the pointer; the column takes it as far as it reaches. */
    :host([data-look="comfort"]) {
      background: var(--er-menu-shade);
      pointer-events: none;
    }
    er-run-timer {
      width: var(--er-run-column-width, 100%);
      pointer-events: auto;
    }
    .name {
      margin: 0;
      font-size: 1.15em;
      font-weight: 600;
      line-height: 1.2;
      color: var(--er-ink-bright);
    }
    .goal {
      margin: 0;
      color: var(--er-ink-soft);
    }
    .rows {
      flex: 0 1 auto;
      min-height: 0;
      margin: 0;
      padding: 4px 0;
      list-style: none;
    }
    /* The figures' columns hold a difference past the hour: "-1:02:33". */
    .row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 70px 70px;
      align-items: center;
      column-gap: 8px;
      box-sizing: border-box;
      width: 100%;
      height: 28px;
      padding: 0 12px;
      background: none;
      border: none;
      color: var(--er-ink);
      font: inherit;
      text-align: left;
    }
    button.row {
      cursor: pointer;
    }
    .row[data-left] {
      color: var(--er-ink-muted);
    }
    .row > span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .row > .fig {
      text-align: right;
    }
    .row:not([data-left]) > :last-child {
      color: var(--er-ink-bright);
    }
    [data-pace="ahead"] {
      color: var(--er-live-ink);
    }
    [data-pace="behind"] {
      color: var(--er-error);
    }
    [data-pace="best"] {
      color: var(--er-gold-bright);
    }
    .previous {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      padding-top: 4px;
      color: var(--er-ink-soft);
    }
    :host([data-look="comfort"]) .previous {
      padding: 6px 12px 0;
    }
    .line {
      height: 1px;
      margin: 3px 0;
      background: var(--er-line);
    }
    .band {
      flex: none;
      margin: 6px 40px 0 0;
      padding: 4px 16px 4px 12px;
      font-size: 1.1em;
    }
    .band er-resize-handle {
      --er-resize-justify: flex-start;
    }
    .band-words {
      color: var(--er-ink-heading);
    }
    .divider {
      flex: none;
      height: 7px;
    }
    .divider .line {
      flex-grow: 1;
      margin: 0;
    }
    .divider:hover .line {
      background: var(--er-gold);
    }
    :host([data-look="comfort"]) .rows {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 4px 0 0;
    }
    :host([data-look="comfort"]) .done:not(:last-of-type) {
      flex: none;
      max-height: 45%;
    }
    :host([data-look="comfort"]) .row {
      grid-template-columns: 28px minmax(0, 1fr) 70px 70px;
      height: auto;
      padding: 2px 8px 2px 12px;
    }
    :host([data-look="comfort"]) .row:not([data-left]) > .label {
      font-weight: 600;
      color: var(--er-ink-bright);
    }
    :host([data-look="comfort"]) .row:not([data-left]) > :last-child {
      color: var(--er-ink);
    }
    .frame {
      --er-frame-edges: inset 0 0 0 2px var(--er-ground), inset 0 0 0 3px var(--er-frame-inner);
      width: 28px;
      height: 28px;
    }
    .frame img {
      width: 24px;
      height: 24px;
    }
    .row:not([data-left]) .frame {
      border-color: var(--er-gold-edge);
    }
    .row[data-left] .frame img {
      filter: grayscale(1) brightness(0.85);
    }
    /* On a long goal the two lists scroll apart, Done as high as it's dragged to, and the rows
       left taking what remains. */
    :host([data-long]) .done:not(:last-of-type) {
      flex: 0 1 var(--done-height, 150px);
      max-height: none;
    }
    :host([data-long]) .left {
      flex: 1 1 0;
      min-height: 60px;
    }
    /* Held apart from the rows left, as LiveSplit holds a run's last split. */
    .last {
      flex: none;
      margin-top: 10px;
    }
    .release {
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 10px 12px 12px;
      background: var(--er-goal-band);
    }
  `,
];
