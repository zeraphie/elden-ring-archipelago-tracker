/**
 * ─ Split row ─
 *
 * One of the run's rows: its goal, in a frame in Comfort, then its difference
 * and its time. A row gotten can open what it leads to, and banded while it's
 * the latest. A row left has no difference, so a count's tally takes that place.
 */

import { html, nothing } from "lit";
import type { Pace, RowPace } from "../../../state/utils/run-compare.js";
import { clockFace, signedTime, splitTime } from "./run-words.js";

/** A time or a difference with nothing to show. */
export const DASH = "-";

/** A goal as its row shows it: its name, in full and as it's written there, how it stands, and its icon, framed in Comfort. */
export interface RowFace {
  readonly label: string;
  readonly shown: string;
  readonly line: string;
  readonly icon: string | undefined;
  readonly isFramed: boolean;
}

/** What a row gotten shows beyond its goal: whether it's the latest, and its time and how it stands. */
export interface RowMarks {
  readonly isLatest?: boolean;
  readonly time: number | undefined;
  readonly pace?: RowPace | undefined;
}

const timeText = (time: number | undefined): string =>
  time === undefined ? DASH : splitTime(time);

function goalCells({ label, shown, icon, isFramed }: RowFace) {
  const frame = isFramed
    ? html`<span class="frame" aria-hidden="true">
        ${icon === undefined ? nothing : html`<img src=${icon} alt="" />`}
      </span>`
    : nothing;
  return html`${frame}<span class="label" title=${label}>${shown}</span>`;
}

/** The large timer's figures, the hundredths apart, at a time in milliseconds, tinted by `pace` where it's given. */
export function runClock(ms: number, pace?: Pace) {
  const { whole, hundredths } = clockFace(ms);
  return html`<div class="clock fig" role="timer" data-pace=${pace ?? nothing}>
    <span class="whole">${whole}</span><span class="small">${hundredths}</span>
  </div>`;
}

/** A row left, with the time it came in the run compared with, and `line` beside it for a count. */
export function splitLeft(face: RowFace, time: number | undefined, isCount: boolean) {
  const { label, line } = face;
  return html`<li class="row" data-left aria-label=${`${label}: ${line}`}>
    ${goalCells(face)}<span class="fig">${isCount ? line : nothing}</span
    ><span class="fig">${timeText(time)}</span>
  </li>`;
}

/** A row gotten, opening what it leads to where `onOpen` is given. */
export function splitGotten(
  face: RowFace,
  { isLatest, time, pace }: RowMarks,
  onOpen: (() => void) | undefined
) {
  const { label, line } = face;
  const current = isLatest === true ? "true" : "false";
  const cells = html`${goalCells(face)}<span class="fig" data-pace=${pace?.pace ?? nothing}
      >${pace === undefined ? DASH : signedTime(pace.diffMs)}</span
    ><span class="fig">${timeText(time)}</span>`;
  return html`<li>
    ${
      onOpen === undefined
        ? html`<div class="row band-row" aria-current=${current}>${cells}</div>`
        : html`<button
            class="row band-row"
            aria-current=${current}
            aria-label=${`${label}: ${line}`}
            @click=${onOpen}
          >
            ${cells}
          </button>`
    }
  </li>`;
}
