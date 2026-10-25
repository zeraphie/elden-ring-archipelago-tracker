/**
 * ─ Simulate ─
 *
 * For a development build only, a column of icons under the map's pen, their
 * edges dashed as a tool that isn't part of the page. The sack makes the next
 * key check left in an open region, the selected region first, and picks it;
 * the Rune of Death does the same for the next goal boss's drop, defeating
 * it; the backpack has another player send this slot an item. Those go
 * through the store as the websocket's own events would, so the page reacts
 * as it would live. The list swaps the room's options and goal for the All
 * Bosses preset's, its key checks worked out again, and back, in the store
 * alone, so the goal menu goes by region and the map reads its rules; the
 * room's own slot_data puts it right on the next visit. The sigil marks the
 * goal done on the page alone, never in the store, so its Release can't
 * reach the room. The map loads it only in a development build, so a built
 * page never has it.
 */

import { LitElement, css, html, nothing } from "lit";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerStore } from "../../../state/store.js";
import { keyChecksFrom } from "../../../state/utils/key-checks.js";
import {
  checkMade,
  itemSent,
  nextBossDefeat,
  nextCheck,
  withAllBosses,
} from "../../../state/utils/simulate.js";
import { buttonStyles } from "../../atoms/button.js";
import { focusRing } from "../../atoms/focus.js";
import { sackStyles } from "../../atoms/sack.js";
import "../../molecules/er-sigil.js";
import type { CheckPick } from "../../utils/check-pick.js";
import { emit } from "../../utils/emit.js";
import { iconUrl } from "../../utils/icons.js";
import { backpackIcon } from "../../utils/material-icons.js";

// A list, for the long goal: three lines, each by a square, drawn in the button's own colour.
const listIcon = html`<svg
  viewBox="0 0 22 22"
  fill="none"
  stroke="currentColor"
  stroke-width="1.6"
  aria-hidden="true"
>
  <path d="M3 5h3v3H3zM3 10h3v3H3zM3 15h3v3H3zM9 6.5h10M9 11.5h10M9 16.5h10"></path>
</svg>`;

/**
 * Buttons that make a check, defeat a goal boss, send an item, or swap in the All Bosses preset, as the room would.
 *
 * @fires er-check - A check was made; `detail` is a `CheckPick`, the check, to pick it.
 * @fires er-simulate-goal - The goal is to be marked done on the page alone; `detail` is undefined.
 */
export class ErSimulate extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    region: { attribute: false },
    ownSlotData: { state: true },
  };

  static override styles = [
    buttonStyles,
    focusRing,
    sackStyles,
    css`
      :host {
        display: block;
      }
      [role="group"] {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      /* Dashed, as a tool that isn't part of the page. */
      .button {
        border-style: dashed;
        border-color: var(--er-edge);
        color: var(--er-gold);
      }
      img,
      svg {
        width: 22px;
        height: 22px;
      }
      /* The sigil's lines are drawn thicker, to hold at this size. */
      er-sigil {
        --er-sigil-weight: 32;
        height: 24px;
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  /** The region selected, whose key checks are made first. */
  region: string | undefined;
  // Which item of its list each button gives next.
  private step = 0;
  // The room's own slot_data while the All Bosses preset stands in for it; undefined while it's the room's.
  private ownSlotData: Readonly<Record<string, unknown>> | undefined;

  override render() {
    return html`<div role="group" aria-label="Simulate">
      ${this.button(
        "Simulate a check",
        this.check,
        html`<img class="sack" data-state="collected" src=${iconUrl("sack")} alt="" />`
      )}
      ${this.button(
        "Simulate a goal boss defeated",
        this.boss,
        html`<img src=${iconUrl("rune-of-death")} alt="" />`
      )}
      ${this.button("Simulate a received item", this.item, backpackIcon)}
      ${this.button(
        "Simulate the All Bosses preset",
        this.allBosses,
        listIcon,
        this.ownSlotData !== undefined
      )}
      ${this.button("Simulate the goal achieved", this.goal, html`<er-sigil></er-sigil>`)}
    </div>`;
  }

  private button(label: string, onClick: () => void, icon: unknown, isOn?: boolean) {
    return html`<button
      class="button"
      data-tone="overlay"
      data-shape="icon"
      aria-pressed=${isOn === undefined ? nothing : String(isOn)}
      aria-label=${label}
      title=${label}
      @click=${onClick}
    >
      ${icon}
    </button>`;
  }

  private readonly check = (): void => {
    const { store, data } = this;
    const state = store?.getState();
    const next =
      data === undefined || state === undefined ? undefined : nextCheck(data, state, this.region);
    if (state === undefined || next === undefined) {
      return;
    }
    checkMade(state, next.id, this.step).forEach((event) => state.take(event));
    this.step += 1;
    emit<CheckPick>(this, "er-check", next);
  };

  // The next goal boss's drop checked, the selected region first, and picked.
  private readonly boss = (): void => {
    const { store, data } = this;
    const state = store?.getState();
    const next =
      data === undefined || state === undefined
        ? undefined
        : nextBossDefeat(data, state, this.region);
    if (state === undefined || next === undefined) {
      return;
    }
    checkMade(state, next.id, this.step).forEach((event) => state.take(event));
    this.step += 1;
    emit<CheckPick>(this, "er-check", next);
  };

  // The room's options and goal swapped for the All Bosses preset's, or back for its own, the key checks worked out again.
  private readonly allBosses = (): void => {
    const { store, data } = this;
    const state = store?.getState();
    const slotData = state?.slotData;
    if (state === undefined || data === undefined || slotData === undefined) {
      return;
    }
    const next = this.ownSlotData ?? withAllBosses(data, slotData);
    this.ownSlotData = this.ownSlotData === undefined ? slotData : undefined;
    state.takeSlotData(next);
    state.takeKeyChecks(keyChecksFrom(data, next));
  };

  private readonly goal = (): void => {
    emit(this, "er-simulate-goal", undefined);
  };

  private readonly item = (): void => {
    const state = this.store?.getState();
    if (state === undefined) {
      return;
    }
    itemSent(state, this.step).forEach((event) => state.take(event));
    this.step += 1;
  };
}

customElements.define("er-simulate", ErSimulate);

declare global {
  interface HTMLElementTagNameMap {
    "er-simulate": ErSimulate;
  }
}
