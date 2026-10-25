/**
 * ─ Slot list ─
 *
 * A room's slots to pick from, a row each with its name and game. The rows
 * are native radios, so the arrow keys move between them and a screen reader
 * hears a group of choices. Only Elden Ring's can be picked; another game's
 * row stays in the list, dimmed, and says why.
 */

import { LitElement, css, html } from "lit";
import type { RoomSlot } from "../../../archipelago/look-up.js";
import { bandRowStyles } from "../../atoms/band.js";
import { focusRing } from "../../atoms/focus.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import { emit } from "../../utils/emit.js";
import { gameName, slotName } from "../../utils/entry-words.js";

/** A slot picked from the list, by its team and number. */
export interface SlotChoice {
  readonly team: number;
  readonly player: number;
}

/**
 * A room's slots, to pick an Elden Ring slot from. Focusing it focuses the slot picked, or the first.
 *
 * @fires er-choose - An Elden Ring slot was picked; `detail` is its `SlotChoice`.
 */
export class ErSlotList extends LitElement {
  static override properties = {
    slots: { attribute: false },
    chosen: { attribute: false },
  };

  static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static override styles = [
    bandRowStyles,
    visuallyHidden,
    focusRing,
    css`
      :host {
        display: block;
      }
      fieldset {
        min-width: 0;
        margin: 0;
        padding: 0;
        border: 0;
        border-top: 1px solid var(--er-divider);
      }
      .row {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
        min-height: 44px;
        box-sizing: border-box;
        padding: 8px 12px;
        border-bottom: 1px solid var(--er-divider);
        color: var(--er-ink);
        cursor: pointer;
      }
      .row[data-on] {
        color: var(--er-ink-bright);
      }
      .row[data-off] {
        color: var(--er-ink-faint);
        cursor: default;
      }
      .game {
        color: var(--er-ink-muted);
        font-size: 0.92em;
        text-align: right;
      }
      .row[data-off] .game {
        color: inherit;
      }
    `,
  ];

  slots: readonly RoomSlot[] = [];
  chosen: SlotChoice | undefined;

  override render() {
    return html`<fieldset>
      <legend class="sr">Slots</legend>
      ${this.slots.map((slot) => {
        const isOn = slot.team === this.chosen?.team && slot.player === this.chosen.player;
        const game = gameName(slot.game);
        return html`<label
          class="row band-row ring-within"
          ?data-on=${isOn}
          ?data-off=${!slot.isEldenRing}
        >
          <input
            class="sr"
            type="radio"
            name="slot"
            .checked=${isOn}
            ?disabled=${!slot.isEldenRing}
            @change=${() => emit<SlotChoice>(this, "er-choose", { team: slot.team, player: slot.player })}
          />
          <span>${slotName(slot.name, slot.player)}</span>
          <span class="game">${slot.isEldenRing ? game : `${game}, not Elden Ring`}</span>
        </label>`;
      })}
    </fieldset>`;
  }
}

customElements.define("er-slot-list", ErSlotList);

declare global {
  interface HTMLElementTagNameMap {
    "er-slot-list": ErSlotList;
  }
}
