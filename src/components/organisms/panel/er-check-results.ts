/**
 * ─ Check results ─
 *
 * What a search across every check found: how many, then their rows, key
 * checks first, each with its region under its name. A row picked opens its
 * region with the row picked.
 */

import { LitElement, css, html } from "lit";
import type { CheckRow, CheckSearch } from "../../../state/utils/checks.js";
import { scrollerStyles } from "../../atoms/scroller.js";
import type { CheckPick } from "../../utils/check-pick.js";
import { emit } from "../../utils/emit.js";
import { checkRow, checkRowStyles } from "../../molecules/check-row.js";
import { matchesLine } from "./row-words.js";

/**
 * A search's matches.
 *
 * @fires er-check - A row was clicked; `detail` is a `CheckPick`, its region and its check's id.
 */
export class ErCheckResults extends LitElement {
  static override properties = {
    search: { attribute: false },
    regionName: { attribute: false },
  };

  static override styles = [
    checkRowStyles,
    scrollerStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      p {
        margin: 0;
        padding: 12px 16px;
        border-bottom: 1px solid var(--er-panel-divider);
        font-size: 0.92em;
        color: var(--er-ink-muted);
      }
      .scroller {
        flex-grow: 1;
        min-height: 0;
      }
    `,
  ];

  search: CheckSearch = { hits: [], isCapped: false };
  /** A region's full name, by its code. */
  regionName: (code: string) => string = (code) => code;

  override render() {
    const { hits, isCapped } = this.search;
    return html`<p role="status">${matchesLine(hits.length, isCapped)}</p>
      <div class="scroller">
        ${hits.map(({ region, row }) =>
          checkRow(
            row,
            false,
            (picked: CheckRow) => this.pick(region, picked),
            this.regionName(region)
          )
        )}
      </div>`;
  }

  private pick(region: string, { id }: CheckRow): void {
    emit<CheckPick>(this, "er-check", { region, id });
  }
}

customElements.define("er-check-results", ErCheckResults);

declare global {
  interface HTMLElementTagNameMap {
    "er-check-results": ErCheckResults;
  }
}
