import { css, unsafeCSS } from "lit";
import { buttonStyles } from "../../atoms/button.js";
import { figures } from "../../atoms/figures.js";
import { focusRing } from "../../atoms/focus.js";
import { panelTitleStyles } from "../../atoms/heading.js";

/** How long replay is held to end a run: long enough that it can't happen by accident. */
export const HOLD_MS = 1000;

/** The run timer's look, in Compact and in Comfort, as the element's `data-look` says, at the goal menu's foot or with `column`. */
export const runTimerStyles = [
  buttonStyles,
  figures,
  focusRing,
  panelTitleStyles,
  css`
    :host {
      display: flex;
      align-items: center;
      gap: 12px;
      box-sizing: border-box;
      padding: 10px 12px;
    }
    :host([data-look="compact"]) {
      background: var(--er-ground);
      border-top: 1px solid var(--er-line);
      border-right: 1px solid var(--er-line);
    }
    .face {
      flex: 1 1 0;
      min-width: 0;
    }
    /* The height of both buttons before there are two, so starting moves nothing. */
    .buttons {
      flex: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-height: 78px;
    }
    .button svg {
      width: 24px;
      height: 24px;
    }
    .clock {
      display: flex;
      align-items: baseline;
      justify-content: flex-end;
      line-height: 1;
      color: var(--er-gold);
    }
    /* Compact's timer takes on how the run stands. */
    :host([data-look="compact"][data-pace="ahead"]) .clock {
      color: var(--er-live-ink);
    }
    :host([data-look="compact"][data-pace="behind"]) .clock {
      color: var(--er-error);
    }
    .whole,
    .typed {
      font-size: 56px;
    }
    .small {
      font-size: 30px;
    }
    /* Before the run the field lies over the clock at nought, so the timer looks as it will when
       it runs, and what is typed takes the place of the nought. */
    .start {
      position: relative;
    }
    .start[data-typing] .clock {
      visibility: hidden;
    }
    .typed {
      position: absolute;
      inset: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0;
      background: transparent;
      border: none;
      color: var(--er-gold);
      line-height: 1;
      text-align: right;
    }
    .typed:hover {
      background: var(--er-glow-fill);
    }
    .typed[aria-invalid="true"] {
      color: var(--er-error);
    }
    .rule {
      margin: 0 8%;
    }
    :host([column]) {
      flex-direction: column;
      align-items: stretch;
      gap: 0;
      height: 100%;
      padding: 0;
      border-top: none;
    }
    :host([column]) .face {
      flex: none;
      margin-top: auto;
      padding: 8px 12px 10px;
      border-top: 1px solid var(--er-line);
    }
    :host([column][data-look="comfort"]) .face {
      padding: 8px 0 10px;
      border-top: none;
    }
    .top {
      flex: none;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 12px 9px;
      border-bottom: 1px solid var(--er-line);
    }
    /* The width of both buttons before there are two, so starting moves nothing. */
    .top .buttons {
      flex-direction: row;
      min-width: 78px;
      min-height: 0;
    }
    :host([data-look="comfort"]) .clock {
      justify-content: center;
      padding: 10px 0;
    }
    :host([data-look="comfort"]) .whole,
    :host([data-look="comfort"]) .typed {
      font-size: 50px;
    }
    :host([data-look="comfort"]) .small {
      font-size: 26px;
    }
    :host([data-look="comfort"]) .typed {
      text-align: center;
    }
    /* A press held rather than a click, by mouse, finger or key. It keeps to its end of the
       buttons, whether or not the other is there. */
    .hold {
      position: relative;
      margin: auto 0 0 auto;
      touch-action: none;
      user-select: none;
      -webkit-touch-callout: none;
    }
    /* Round the button by its edge, over its border, from the top clockwise. */
    .hold .edge {
      position: absolute;
      inset: -1px;
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      fill: none;
      stroke: var(--er-gold);
      stroke-width: 2;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
    }
    .hold[data-holding] .edge {
      animation: hold-fill ${unsafeCSS(HOLD_MS)}ms linear forwards;
    }
    @keyframes hold-fill {
      to {
        stroke-dashoffset: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .hold[data-holding] .edge {
        stroke-dashoffset: 0;
        animation: none;
      }
    }
  `,
];
