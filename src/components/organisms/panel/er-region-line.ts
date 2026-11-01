/**
 * ─ Region line ─
 *
 * The line over the panel's tabs, where they have no region of their own: the
 * region picked, named by the region picker itself, how it stands, and how many
 * of its key checks and of all its checks are done. Before a region is picked,
 * the picker alone.
 */

import { LitElement, css, html, nothing } from "lit";
import type { RegionSummary } from "../../../data/rules/region-summary.js";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { regionsOf } from "../../../state/utils/regions.js";
import "../../molecules/er-region-picker.js";
import { pickerGroups } from "../../utils/region-groups.js";
import { StoreController } from "../../utils/store-controller.js";
import "./er-region-heading.js";
import { needsText } from "./region-parts.js";

/**
 * The region picked as one line, its name the picker of every region.
 */
export class ErRegionLine extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    region: { attribute: false },
  };

  static override styles = css`
    :host {
      display: block;
    }
    .bare {
      padding: 4px 16px 0;
    }
  `;

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  /** The region picked, by its code. */
  region: string | undefined;
  // Draws the line again whenever the regions change.
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
    const { data, region } = this;
    const state = this.store?.getState();
    if (data === undefined || state === undefined) {
      return nothing;
    }
    const groups = pickerGroups(data, state);
    const summary = region === undefined ? undefined : regionsOf(data, state)?.get(region);
    if (region === undefined || summary === undefined) {
      return html`<div class="bare">
        <er-region-picker .look=${"title"} .groups=${groups}></er-region-picker>
      </div>`;
    }
    return html`<er-region-heading compact .summary=${summary} .needs=${needsText(data, summary)}>
      <er-region-picker
        slot="name"
        .look=${"title"}
        .label=${data.regionName(region)}
        .groups=${groups}
      ></er-region-picker>
    </er-region-heading>`;
  }
}

customElements.define("er-region-line", ErRegionLine);

declare global {
  interface HTMLElementTagNameMap {
    "er-region-line": ErRegionLine;
  }
}
