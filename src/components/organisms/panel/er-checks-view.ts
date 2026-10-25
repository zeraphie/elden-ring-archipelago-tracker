/**
 * ─ Checks view ─
 *
 * The panel's Checks tab: a search across every check, and the "All regions"
 * picker, over the region picked: its name, how it stands, what it still
 * needs in English while it's locked, how many of its checks are done, and
 * its checks themselves, the one picked banded. While a search is typed, its
 * matches take the region's place; picking one opens its region. At a
 * tablet's width and below, the tab is the checks alone: the panel names the
 * region over every tab, and there's no search.
 */

import { LitElement, css, html, type PropertyValues } from "lit";
import { shallow } from "zustand/vanilla/shallow";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { regionChecksOf, searchChecks } from "../../../state/utils/checks.js";
import { findingsOf } from "../../../state/utils/findings.js";
import { regionsOf } from "../../../state/utils/regions.js";
import { fieldStyles } from "../../atoms/field.js";
import { NARROW_MEDIA } from "../../atoms/layout.js";
import { focusRing } from "../../atoms/focus.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import "../../molecules/er-region-picker.js";
import { MediaController } from "../../utils/media.js";
import { pickerGroups } from "../../utils/region-groups.js";
import { StoreController } from "../../utils/store-controller.js";
import "./er-check-list.js";
import "./er-check-results.js";
import "./er-region-heading.js";
import { needsText } from "./region-parts.js";
import type { CheckFilter } from "./row-words.js";

// A search starts at this many letters; fewer would match most of the room.
const SEARCH_FROM = 2;
// The most matches a search lists.
const MATCHES_SHOWN = 60;

/**
 * The search, the region picker, and the region picked with its checks.
 */
export class ErChecksView extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    region: { attribute: false },
    picked: { attribute: false },
    filter: { attribute: false },
    query: { state: true },
  };

  static override styles = [
    fieldStyles,
    focusRing,
    visuallyHidden,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      .search {
        display: flex;
        gap: 8px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--er-panel-divider);
      }
      .field {
        flex-grow: 1;
        min-width: 0;
        min-height: 40px;
        font-size: 0.95em;
      }
      er-check-list,
      er-check-results {
        flex-grow: 1;
      }
      .empty {
        margin: 0;
        padding: 18px 16px;
        color: var(--er-ink-muted);
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  /** The region picked, by its code. */
  region: string | undefined;
  /** The check picked, by id. */
  picked: number | undefined;
  /** Which of the region's checks are shown. */
  filter: CheckFilter = "todo";
  private query = "";
  // Draws the view again whenever the regions or what the checks held change.
  private watch: StoreController<TrackerState, unknown[]> | undefined;
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);

  protected override willUpdate(changed: PropertyValues<this>): void {
    const { store, data } = this;
    if (store !== undefined && data !== undefined && this.watch === undefined) {
      this.watch = new StoreController(
        this,
        store,
        (state): unknown[] => [regionsOf(data, state), findingsOf(state)],
        shallow
      );
    }
    // A region or a check picked from elsewhere ends the search, to show it.
    if (changed.has("region") || changed.has("picked")) {
      this.query = "";
    }
  }

  override render() {
    const { store, data } = this;
    const state = store?.getState();
    if (data === undefined || state === undefined) {
      return html``;
    }
    if (this.isNarrow.matches) {
      return this.regionView(data, state);
    }
    const isSearching = this.query.trim().length >= SEARCH_FROM;
    return html`<div class="search">
        <label class="sr" for="search">Search checks</label>
        <input
          id="search"
          class="field"
          type="search"
          placeholder="Search checks, items, places"
          .value=${this.query}
          @input=${(event: Event) => {
            this.query = (event.target as HTMLInputElement).value;
          }}
        />
        <er-region-picker .groups=${pickerGroups(data, state)}></er-region-picker>
      </div>
      ${
        isSearching
          ? html`<er-check-results
              .search=${searchChecks(data, state, this.query, MATCHES_SHOWN)}
              .regionName=${(code: string) => data.regionName(code)}
            ></er-check-results>`
          : this.regionView(data, state)
      }`;
  }

  private regionView(data: EldenRingData, state: TrackerState) {
    const { region } = this;
    const summary = region === undefined ? undefined : regionsOf(data, state)?.get(region);
    if (region === undefined || summary === undefined) {
      return html`<p class="empty">Pick a region on the map to see its checks.</p>`;
    }
    const list = html`<er-check-list
      .region=${region}
      .checks=${regionChecksOf(data, state, region)}
      .picked=${this.picked}
      .filter=${this.filter}
    ></er-check-list>`;
    if (this.isNarrow.matches) {
      return list;
    }
    return html`<er-region-heading
        .name=${data.regionName(region)}
        .summary=${summary}
        .needs=${needsText(data, summary)}
      ></er-region-heading>
      ${list}`;
  }
}

customElements.define("er-checks-view", ErChecksView);

declare global {
  interface HTMLElementTagNameMap {
    "er-checks-view": ErChecksView;
  }
}
