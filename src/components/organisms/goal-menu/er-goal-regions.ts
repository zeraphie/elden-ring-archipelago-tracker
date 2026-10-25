/**
 * ─ Goal regions ─
 *
 * The goal menu's bosses for a long goal on the desktop, one region at a
 * time: a select of the regions holding a goal boss, each with its bosses
 * defeated out of all, then the picked region's bosses. The region picked is
 * the page's own, so the map and the panel move with it.
 */

import { LitElement, css, html } from "lit";
import "../../molecules/er-region-picker.js";
import type { PickerGroup } from "../../utils/region-groups.js";
import "./er-region-bosses.js";
import type { RegionBossRow } from "./er-region-bosses.js";

/**
 * The select of regions, and the picked region's goal bosses.
 *
 * @fires er-region - A region was picked in the select; `detail` is its code.
 */
export class ErGoalRegions extends LitElement {
  static override properties = {
    groups: { attribute: false },
    label: { attribute: false },
    count: { attribute: false },
    toDo: { attribute: false },
    defeated: { attribute: false },
  };

  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .select {
      padding-left: 22px;
    }
  `;

  /** The regions holding a goal boss, in the picker's groups. */
  groups: readonly PickerGroup[] = [];
  /** The region picked, by name. */
  label = "";
  /** Its bosses defeated out of all, such as "2/9"; undefined where it holds none. */
  count: string | undefined;
  toDo: readonly RegionBossRow[] = [];
  defeated: readonly RegionBossRow[] = [];

  override render() {
    return html`<div class="select">
        <er-region-picker
          .look=${"select"}
          .groups=${this.groups}
          .label=${this.label}
          .count=${this.count}
        ></er-region-picker>
      </div>
      <er-region-bosses .toDo=${this.toDo} .defeated=${this.defeated}></er-region-bosses>`;
  }
}

customElements.define("er-goal-regions", ErGoalRegions);

declare global {
  interface HTMLElementTagNameMap {
    "er-goal-regions": ErGoalRegions;
  }
}
