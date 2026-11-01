/**
 * ─ Panel search ─
 *
 * Over the panel's tabs on a desktop, whichever is up: a search across every
 * check, and the "All regions" picker, which opens a region and its map.
 */

import { LitElement, css, html, nothing } from "lit";
import type { RegionSummary } from "../../../data/rules/region-summary.js";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { regionsOf } from "../../../state/utils/regions.js";
import { fieldStyles } from "../../atoms/field.js";
import { focusRing } from "../../atoms/focus.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import "../../molecules/er-region-picker.js";
import { emit } from "../../utils/emit.js";
import { pickerGroups } from "../../utils/region-groups.js";
import { StoreController } from "../../utils/store-controller.js";

/**
 * The search and the region picker, over the panel's tabs.
 *
 * @fires er-search - The search changed; `detail` is what's typed.
 */
export class ErPanelSearch extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    query: { attribute: false },
  };

  static override styles = [
    fieldStyles,
    focusRing,
    visuallyHidden,
    css`
      :host {
        display: flex;
        gap: 8px;
        padding: 12px 16px 0;
      }
      .field {
        flex-grow: 1;
        min-width: 0;
        min-height: 40px;
        font-size: 0.95em;
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  /** What's typed in the search. */
  query = "";
  // Draws the picker again whenever the regions change.
  private watch:
    | StoreController<TrackerState, ReadonlyMap<string, RegionSummary> | undefined>
    | undefined;

  protected override willUpdate(): void {
    const { store, data } = this;
    if (store !== undefined && data !== undefined && this.watch === undefined) {
      this.watch = new StoreController(this, store, (state) => regionsOf(data, state));
    }
  }

  override render() {
    const { data } = this;
    const state = this.store?.getState();
    if (data === undefined || state === undefined) {
      return nothing;
    }
    return html`<label class="sr" for="search">Search checks</label>
      <input
        id="search"
        class="field"
        type="search"
        placeholder="Search checks, items, places"
        .value=${this.query}
        @input=${({ target }: Event) => {
          emit<string>(this, "er-search", (target as HTMLInputElement).value);
        }}
      />
      <er-region-picker .groups=${pickerGroups(data, state)}></er-region-picker>`;
  }
}

customElements.define("er-panel-search", ErPanelSearch);

declare global {
  interface HTMLElementTagNameMap {
    "er-panel-search": ErPanelSearch;
  }
}
