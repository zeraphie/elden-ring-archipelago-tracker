/**
 * ─ Check list ─
 *
 * A region's checks under a filter: To do, Done or All. Key checks come first
 * under their own heading; the other checks are folded under theirs, and
 * shown 80 at a time until asked for all. A check picked, in a list or on the
 * map, is banded and scrolled to, and the filter widens to All when it would
 * hide it. At a tablet's width and below, the filters are text toggles, each
 * with its count of key checks, which stand in for the key checks' heading.
 */

import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import type { CheckRow, RegionChecks } from "../../../state/utils/checks.js";
import { figures } from "../../atoms/figures.js";
import { NARROW_MEDIA } from "../../atoms/layout.js";
import { bandHeadingStyles } from "../../atoms/heading.js";
import { moreStyles } from "../../atoms/more.js";
import { scrollerStyles } from "../../atoms/scroller.js";
import { focusRing } from "../../atoms/focus.js";
import { segmentStyles } from "../../atoms/segments.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import "../../molecules/er-toggle-row.js";
import type { CheckPick } from "../../utils/check-pick.js";
import { emit } from "../../utils/emit.js";
import { figure } from "../../utils/figure.js";
import { MediaController } from "../../utils/media.js";
import { checkRow, checkRowStyles } from "../../molecules/check-row.js";
import { FILTERS, NO_KEY_CHECKS, ROWS_SHOWN, type CheckFilter } from "./row-words.js";

/**
 * A region's key checks and other checks, under a filter.
 *
 * @fires er-check - A row was clicked; `detail` is a `CheckPick`, its region and its check's id.
 * @fires er-filter - A filter was chosen, or widened to All to show the check picked; `detail` is the filter.
 */
export class ErCheckList extends LitElement {
  static override properties = {
    region: { attribute: false },
    checks: { attribute: false },
    picked: { attribute: false },
    filter: { attribute: false },
    areOthersShown: { state: true },
    areAllOthersShown: { state: true },
  };

  static override styles = [
    bandHeadingStyles,
    scrollerStyles,
    checkRowStyles,
    figures,
    focusRing,
    moreStyles,
    segmentStyles,
    visuallyHidden,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      er-toggle-row {
        padding: 0 16px;
        border-bottom: 1px solid var(--er-panel-divider);
      }
      [role="group"] {
        display: flex;
        padding: 10px 16px;
        border-bottom: 1px solid var(--er-panel-divider);
      }
      .segment {
        min-height: 38px;
        font-size: 0.92em;
      }
      /* Clear of whatever lies over the list's right edge, such as the rail of tabs under the map. */
      .scroller {
        flex-grow: 1;
        min-height: 0;
        padding-right: var(--er-panel-clear, 0px);
      }
      .head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        box-sizing: border-box;
        width: 100%;
        margin: 10px 0 2px;
        padding: 7px 16px;
        border: none;
        font: inherit;
        font-weight: 600;
        font-size: 1.15em;
        text-align: left;
      }
      button.head {
        min-height: 44px;
        margin-top: 14px;
        cursor: pointer;
      }
      .count {
        font-size: 0.85em;
        color: var(--er-ink-soft);
      }
      .toggle {
        font-weight: 400;
        font-size: 0.8em;
        color: var(--er-ink-soft);
      }
      .empty {
        margin: 0;
        padding: 10px 16px 14px;
        font-size: 0.9em;
        color: var(--er-ink-muted);
      }
    `,
  ];

  /** The region the checks are of, by its code; a new one folds the other checks to 80 again. */
  region: string | undefined;
  checks: RegionChecks = { key: [], other: [] };
  /** The check picked, by id. */
  picked: number | undefined;
  /** Which checks the list shows; it's told back with `er-filter` when it changes here. */
  filter: CheckFilter = "todo";
  private areOthersShown = false;
  private areAllOthersShown = false;
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("region")) {
      this.areAllOthersShown = false;
    }
    const row = this.pickedRow();
    if (changed.has("picked") && row !== undefined) {
      if (!this.keeps(row)) {
        this.filter = "all";
        emit<CheckFilter>(this, "er-filter", "all");
      }
      if (!row.isKey) {
        this.areOthersShown = true;
        this.areAllOthersShown = true;
      }
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("picked") && this.picked !== undefined) {
      this.renderRoot.querySelector(`#check-${this.picked}`)?.scrollIntoView({ block: "nearest" });
    }
  }

  override render() {
    const key = this.checks.key.filter((row) => this.keeps(row));
    const others = this.checks.other.filter((row) => this.keeps(row));
    const shown = this.areAllOthersShown ? others : others.slice(0, ROWS_SHOWN);
    return html`${this.filters()}
      <div class="scroller">
        <h3 class="head band-heading sr-narrow">
          Key checks <span class="count fig">${figure(key.length)}</span>
        </h3>
        ${key.length === 0 ? html`<p class="empty">${NO_KEY_CHECKS[this.filter]}</p>` : nothing}
        ${key.map((row) => checkRow(row, row.id === this.picked, this.pick))}
        <button
          class="head band-heading"
          aria-expanded=${String(this.areOthersShown)}
          @click=${() => {
            this.areOthersShown = !this.areOthersShown;
          }}
        >
          <span>Other checks <span class="count fig">${figure(others.length)}</span></span>
          <span class="toggle">${this.areOthersShown ? "Hide" : "Show"}</span>
        </button>
        ${this.areOthersShown ? shown.map((row) => checkRow(row, row.id === this.picked, this.pick)) : nothing}
        ${
          this.areOthersShown && shown.length < others.length
            ? html`<div class="more">
                <button
                  class="segment"
                  @click=${() => {
                    this.areAllOthersShown = true;
                  }}
                >
                  Show all <span class="fig">${figure(others.length)}</span>
                </button>
              </div>`
            : nothing
        }
      </div>`;
  }

  // Joined buttons, or at a tablet's width and below text toggles with how many key checks each keeps.
  private filters() {
    if (this.isNarrow.matches) {
      const { key } = this.checks;
      const done = key.filter(({ state }) => state === "collected").length;
      const counts: Readonly<Record<CheckFilter, number>> = {
        todo: key.length - done,
        done,
        all: key.length,
      };
      return html`<er-toggle-row
        .label=${"Show"}
        .options=${FILTERS.map(([key, label]) => ({ key, label, count: counts[key] }))}
        .chosen=${this.filter}
        @er-choose=${({ detail }: CustomEvent<string>) => {
          const chosen = FILTERS.find(([filter]) => filter === detail);
          if (chosen !== undefined) {
            this.choose(chosen[0]);
          }
        }}
      ></er-toggle-row>`;
    }
    return html`<div role="group" aria-label="Show">
      ${FILTERS.map(
        ([filter, name]) =>
          html`<button
            class="segment"
            aria-pressed=${String(filter === this.filter)}
            @click=${() => this.choose(filter)}
          >
            ${name}
          </button>`
      )}
    </div>`;
  }

  private choose(filter: CheckFilter): void {
    this.filter = filter;
    emit<CheckFilter>(this, "er-filter", filter);
    this.areAllOthersShown = false;
  }

  private keeps(row: CheckRow): boolean {
    return this.filter === "all" || (this.filter === "done") === (row.state === "collected");
  }

  private pickedRow(): CheckRow | undefined {
    const { picked } = this;
    return picked === undefined
      ? undefined
      : [...this.checks.key, ...this.checks.other].find(({ id }) => id === picked);
  }

  private readonly pick = ({ id }: CheckRow): void => {
    if (this.region !== undefined) {
      emit<CheckPick>(this, "er-check", { region: this.region, id });
    }
  };
}

customElements.define("er-check-list", ErCheckList);

declare global {
  interface HTMLElementTagNameMap {
    "er-check-list": ErCheckList;
  }
}
