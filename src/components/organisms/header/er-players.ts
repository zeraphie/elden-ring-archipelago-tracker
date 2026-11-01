/**
 * ─ Players ─
 *
 * The room's players behind a button that counts them: each one's name,
 * status, game and checks done, a completed goal in gold, and this slot marked
 * as "(You)". The list is a native popover, so Escape or a click outside
 * closes it, and it's placed under its button as it opens.
 */

import { LitElement, css, html, nothing } from "lit";
import { GOAL_STATUS, type RosterEntry } from "../../../state/slices/roster.js";
import { buttonStyles } from "../../atoms/button.js";
import { figures } from "../../atoms/figures.js";
import { focusRing } from "../../atoms/focus.js";
import { popoverStyles } from "../../atoms/popover.js";
import { gameName, slotName } from "../../utils/entry-words.js";
import { placeUnder } from "../../utils/popover.js";
import { statusText } from "./header-words.js";
import { figure } from "../../utils/figure.js";

/** The room's players, counted on a button that opens the list of them. */
export class ErPlayers extends LitElement {
  static override properties = {
    roster: { attribute: false },
    mine: { attribute: false },
  };

  static override styles = [
    buttonStyles,
    figures,
    focusRing,
    popoverStyles,
    css`
      :host {
        display: block;
      }
      .button {
        color: var(--er-ink);
      }
      .button:hover {
        border-color: var(--er-gold-edge);
      }
      /* Its right edge on the button's. */
      .popover {
        right: var(--right, 20px);
        width: min(340px, calc(100vw - 32px));
        max-height: min(60vh, 480px);
        padding: 8px 0;
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 2px 12px;
        padding: 8px 16px;
      }
      .name {
        font-weight: 600;
      }
      .you {
        font-weight: 400;
        color: var(--er-gold);
      }
      .small {
        font-size: 0.88em;
        color: var(--er-ink-muted);
      }
      .status[data-goal] {
        color: var(--er-gold);
      }
    `,
  ];

  roster: readonly RosterEntry[] = [];
  /** Which of them this slot is, by its team and number; none is marked without one. */
  mine: { readonly team: number | undefined; readonly slot: number | undefined } | undefined;

  override render() {
    const count = this.roster.length;
    return html`<button class="button" data-tone="quiet" data-size="small" popovertarget="players">
        <span><span class="fig">${figure(count)}</span> ${count === 1 ? "player" : "players"}</span>
      </button>
      <div
        id="players"
        class="popover"
        popover
        @beforetoggle=${(event: Event) => placeUnder(event, this.renderRoot.querySelector("button"))}
      >
        <ul aria-label="Players">
          ${this.roster.map(
            (entry) =>
              html`<li>
                <span class="name"
                  >${slotName(entry.name, entry.slot)}${
                    entry.team === this.mine?.team && entry.slot === this.mine?.slot
                      ? html` <span class="you">(You)</span>`
                      : nothing
                  }</span
                >
                <span class="small status" ?data-goal=${entry.status === GOAL_STATUS}
                  >${statusText(entry.status)}</span
                >
                <span class="small"
                  >${entry.game === undefined ? nothing : gameName(entry.game)}</span
                >
                <span class="small">${this.checks(entry)}</span>
              </li>`
          )}
        </ul>
      </div>`;
  }

  private checks({ checksDone, total }: RosterEntry) {
    return total === undefined
      ? html`<span class="fig">${figure(checksDone)}</span> checks`
      : html`<span class="fig">${figure(checksDone)}</span> of
          <span class="fig">${figure(total)}</span>`;
  }
}

customElements.define("er-players", ErPlayers);

declare global {
  interface HTMLElementTagNameMap {
    "er-players": ErPlayers;
  }
}
