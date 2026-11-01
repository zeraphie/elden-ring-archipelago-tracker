/**
 * ─ Check row ─
 *
 * One check in the panel's lists: its marker, a key check's sack in its
 * three states or a small ring for any other, filled once checked; its place
 * with its encounter dimmed, and which copy it is of a spot the generator
 * copied; its region, in search results; the item it holds in the unrandomised
 * game; and once checked, what it held. The row picked carries the olive band.
 */

import { css, html, nothing } from "lit";
import type { CheckRow } from "../../../state/utils/checks.js";
import { bandRowStyles } from "../../atoms/band.js";
import { sackStyles } from "../../atoms/sack.js";
import { PIN_STATE_WORDS } from "../../utils/area-words.js";
import { iconUrl } from "../../utils/icons.js";
import { findingLine, spotLine } from "./row-words.js";

const SACK = iconUrl("sack");

/** The rows' look: a two-column grid of marker and words, banded when hovered or picked. */
export const checkRowStyles = [
  bandRowStyles,
  sackStyles,
  css`
    .row {
      display: grid;
      grid-template-columns: 26px minmax(0, 1fr);
      gap: 2px 12px;
      width: 100%;
      padding: 9px 16px;
      background: transparent;
      border: none;
      border-bottom: 1px solid var(--er-panel-divider);
      color: var(--er-ink);
      font: inherit;
      text-align: left;
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
  `,
];

/** A check's row, picked or not, with its region under its name when it's given, telling `onPick` when it's clicked. */
export function checkRow(
  row: CheckRow,
  isPicked: boolean,
  onPick: (row: CheckRow) => void,
  region?: string
) {
  const { name, copy, vanilla, isKey, state, finding } = row;
  const found = finding === undefined ? undefined : findingLine(finding);
  const spot = spotLine(name.encounter, copy);
  return html`<button
    class="row band-row"
    id=${`check-${row.id}`}
    ?data-key=${isKey}
    aria-current=${isPicked ? "true" : nothing}
    @click=${() => onPick(row)}
  >
    ${
      isKey
        ? html`<img class="sack" data-state=${state} src=${SACK} alt=${PIN_STATE_WORDS[state]} />`
        : html`<span class="mark" ?data-done=${state === "collected"} aria-hidden="true"></span>`
    }
    <span class="words">
      <span class="title"
        >${name.place}${spot === "" ? nothing : html`<span class="spot">${spot}</span>`}</span
      >
      ${region === undefined ? nothing : html`<span class="region">${region}</span>`}
      ${
        vanilla === undefined
          ? nothing
          : html`<span class="line"><span class="label">Vanilla:</span> ${vanilla}</span>`
      }
      ${
        found === undefined
          ? nothing
          : html`<span class="line"
              ><span class="label">${found.label}</span>
              <span class="got">${found.text}</span></span
            >`
      }
    </span>
  </button>`;
}
