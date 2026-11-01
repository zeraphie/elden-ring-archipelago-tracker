/**
 * ─ Check row ─
 *
 * One check as the panel lists it and the map's tooltip shows it: its marker,
 * a key check's sack in its three states or a small ring for any other, filled
 * once checked; its place with its encounter dimmed, and which copy it is of a
 * spot the generator copied; its region, in search results; the item it holds
 * in the unrandomised game; and once checked, what it held. In a list it's a
 * button, and the row picked carries the olive band. To read rather than click,
 * it can also sit under a heading band, with its place on the band, which is
 * the Comfort look of a tooltip: a popover's look that stays where it's put,
 * for the map to place beside a pin, or the settings to show as a sample.
 */

import { css, html, nothing } from "lit";
import type { CheckLook } from "../../state/settings.js";
import type { CheckRow } from "../../state/utils/checks.js";
import type { Finding } from "../../state/utils/findings.js";
import { bandRowStyles } from "../atoms/band.js";
import { bandHeadingStyles } from "../atoms/heading.js";
import { popoverStyles } from "../atoms/popover.js";
import { sackStyles } from "../atoms/sack.js";
import { PIN_STATE_WORDS } from "../utils/area-words.js";
import { findingLine, spotLine } from "../utils/check-words.js";
import { iconUrl } from "../utils/icons.js";

const SACK = iconUrl("sack");

/** The rows' look: a two-column grid of marker and words, banded when hovered or picked. */
export const checkRowStyles = [
  bandHeadingStyles,
  bandRowStyles,
  sackStyles,
  css`
    .row {
      display: grid;
      grid-template-columns: 26px minmax(0, 1fr);
      gap: 2px 12px;
      box-sizing: border-box;
      width: 100%;
      padding: 9px 16px;
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--er-panel-divider);
      color: var(--er-ink);
      font: inherit;
      text-align: left;
    }
    button.row {
      cursor: pointer;
    }
    .row:not([data-key]) {
      grid-template-columns: 14px minmax(0, 1fr);
    }
    .row img {
      width: 26px;
      height: 26px;
      margin-top: 1px;
    }
    /* Any other check's marker: a small ring, filled in gold once it's checked. */
    .mark {
      justify-self: center;
      width: 8px;
      height: 8px;
      margin-top: 6px;
      border: 1.5px solid var(--er-ink-faint);
      border-radius: 50%;
    }
    .mark[data-done] {
      background: var(--er-gold);
      border-color: var(--er-gold);
    }
    .words {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .row[data-key] .title {
      font-weight: 500;
    }
    .spot,
    .label {
      font-weight: 400;
      color: var(--er-ink-muted);
    }
    .region {
      font-size: 0.9em;
      color: var(--er-ink-muted);
    }
    .line {
      font-size: 0.86em;
      color: var(--er-ink-soft);
    }
    .got {
      color: var(--er-gold);
    }
    .band-place {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 5px 16px;
    }
    .band-place img {
      flex-shrink: 0;
      width: 22px;
      height: 22px;
    }
    .band-place .mark {
      flex-shrink: 0;
      margin-top: 0;
    }
    .beneath {
      padding: 8px 16px 10px;
    }
  `,
];

/** One spot in a tooltip: the row to show for it, and what its checks have held. */
export interface TipSpot {
  readonly row: CheckRow;
  readonly findings: readonly Finding[];
}

/** A tooltip's look: a popover's, where it's put, with a line at its foot. */
export const checkTipStyles = [
  checkRowStyles,
  popoverStyles,
  css`
    .popover.tip {
      position: static;
    }
    .tip .row:last-of-type {
      border-bottom: none;
    }
    .tip p {
      margin: 0;
      padding: 6px 16px 8px;
      border-top: 1px solid var(--er-panel-divider);
      font-size: 0.8em;
      color: var(--er-ink-muted);
    }
  `,
];

/** A check's row, picked or not, with its region under its name when it's given, telling `onPick` when it's clicked. */
export function checkRow(
  row: CheckRow,
  isPicked: boolean,
  onPick: (row: CheckRow) => void,
  region?: string
) {
  return html`<button
    class="row band-row"
    id=${`check-${row.id}`}
    ?data-key=${row.isKey}
    aria-current=${isPicked ? "true" : nothing}
    @click=${() => onPick(row)}
  >
    ${face(row, region === undefined ? nothing : html`<span class="region">${region}</span>`)}
  </button>`;
}

/** A check to read rather than click, with what each of its copies held. */
export function checkBlock(row: CheckRow, findings: readonly Finding[]) {
  return html`<div class="row" ?data-key=${row.isKey}>${face(row, nothing, findings)}</div>`;
}

/** A check to read under a heading band: its marker and place on the band, its encounter and the rest beneath. */
export function checkBand(row: CheckRow, findings: readonly Finding[]) {
  const { name, vanilla } = row;
  return html`<div class="band-heading band-place">${marker(row)}${name.place}</div>
    <div class="words beneath">
      ${name.encounter === "" ? nothing : html`<span>${name.encounter}</span>`}
      ${lines(vanilla, findings)}
    </div>`;
}

/** Spots as a tooltip shows them, in `look`, with `foot` under them where it's given. */
export function checkTip(spots: readonly TipSpot[], look: CheckLook, foot?: string) {
  const spot = look === "comfort" ? checkBand : checkBlock;
  return html`<div class="popover tip">
    ${spots.map(({ row, findings }) => spot(row, findings))}
    ${foot === undefined ? nothing : html`<p>${foot}</p>`}
  </div>`;
}

// A row's marker and words, what it held by its own finding unless it's told otherwise.
function face(
  row: CheckRow,
  region: unknown,
  findings: readonly Finding[] = row.finding === undefined ? [] : [row.finding]
) {
  const { name, copy } = row;
  const spot = spotLine(name.encounter, copy);
  return html`${marker(row)}
    <span class="words">
      <span class="title"
        >${name.place}${spot === "" ? nothing : html`<span class="spot">${spot}</span>`}</span
      >
      ${region} ${lines(row.vanilla, findings)}
    </span>`;
}

// A check's marker: a key check's sack as it stands, or a small ring for any other.
function marker({ isKey, state }: CheckRow) {
  return isKey
    ? html`<img class="sack" data-state=${state} src=${SACK} alt=${PIN_STATE_WORDS[state]} />`
    : html`<span class="mark" ?data-done=${state === "collected"} aria-hidden="true"></span>`;
}

// What a check holds in the unrandomised game, and what it's been found to hold.
function lines(vanilla: string | undefined, findings: readonly Finding[]) {
  return html`${
    vanilla === undefined
      ? nothing
      : html`<span class="line"><span class="label">Vanilla:</span> ${vanilla}</span>`
  }
  ${findings.map((finding) => {
    const found = findingLine(finding);
    return html`<span class="line"
      ><span class="label">${found.label}</span> <span class="got">${found.text}</span></span
    >`;
  })}`;
}
