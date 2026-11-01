/**
 * ─ Run splits ─
 *
 * The goal menu's place on a desktop where splits are on: the slot's name and
 * how far the goal has got over a row for each goal, those gotten over those
 * left, the latest banded, in the timer's column. A row gotten sorts up at
 * once, by the time it came, a dash for one the tracker didn't see come, and
 * opens its check, or the items for what came from elsewhere. Once
 * the goal's achieved, what becomes of the items left comes under the rows.
 */

import { LitElement, css, html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { ReleaseState } from "../../../archipelago/release.js";
import type { GoalMenu } from "../../../data/bosses/goal-menu.js";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import type { Run } from "../../../state/slices/run.js";
import { goalMenuOf, releaseOf } from "../../../state/utils/goal.js";
import { rowTimesOf } from "../../../state/utils/run-times.js";
import { bandRowStyles } from "../../atoms/band.js";
import { figures } from "../../atoms/figures.js";
import { focusRing } from "../../atoms/focus.js";
import { scrollerStyles } from "../../atoms/scroller.js";
import "../../molecules/er-release.js";
import { slotName } from "../../utils/entry-words.js";
import { figure } from "../../utils/figure.js";
import {
  byTimeCame,
  openRow,
  ownFindChecks,
  rowTarget,
  rowViewsOf,
  settleRows,
  type GoalRows,
  type RowTarget,
  type RowView,
} from "../../utils/goal-rows.js";
import { rowWords } from "../../utils/goal-words.js";
import { StoreController } from "../../utils/store-controller.js";
import "./er-run-timer.js";
import { clockFace } from "./run-words.js";

// A time or a difference with nothing to show.
const DASH = "-";

/**
 * The run's splits: the goal's rows, in the timer's column.
 *
 * @fires er-check - A row gotten was clicked; `detail` is a `CheckPick`, the check it opens.
 * @fires er-items - A row gotten was clicked whose item has no check here, as it came from elsewhere.
 */
export class ErRunSplits extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    achieved: { attribute: false },
    allDone: { attribute: false },
    say: { attribute: false },
  };

  static override styles = [
    bandRowStyles,
    figures,
    focusRing,
    scrollerStyles,
    css`
      :host {
        display: block;
      }
      .name {
        margin: 0;
        font-size: 1.15em;
        font-weight: 600;
        line-height: 1.2;
        color: var(--er-ink-bright);
      }
      .goal {
        margin: 0;
        color: var(--er-ink-soft);
      }
      .rows {
        flex: 0 1 auto;
        min-height: 0;
        margin: 0;
        padding: 4px 0;
        list-style: none;
      }
      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 58px 70px;
        align-items: center;
        column-gap: 8px;
        box-sizing: border-box;
        width: 100%;
        height: 28px;
        padding: 0 12px;
        background: none;
        border: none;
        color: var(--er-ink);
        font: inherit;
        text-align: left;
      }
      button.row {
        cursor: pointer;
      }
      .row[data-left] {
        color: var(--er-ink-muted);
      }
      .row > span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .row > .fig {
        text-align: right;
      }
      .row:not([data-left]) > :last-child {
        color: var(--er-ink-bright);
      }
      .line {
        height: 1px;
        margin: 3px 0;
        background: var(--er-line);
      }
      .release {
        flex: none;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px 12px 12px;
        background: var(--er-goal-band);
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  /** Whether the goal's achieved, and its reaction gone, so Release shows. */
  achieved = false;
  /** Whether every row counts as done, its need met or its boss defeated, as when Simulate marks the goal. */
  allDone = false;
  /** Says a command to the room, such as !release; undefined where there's no room to send to. */
  say: ((text: string) => void) | undefined;
  private menu: StoreController<TrackerState, GoalMenu | undefined> | undefined;
  private release: StoreController<TrackerState, ReleaseState> | undefined;
  private live: StoreController<TrackerState, boolean> | undefined;
  private name: StoreController<TrackerState, string | undefined> | undefined;
  private run: StoreController<TrackerState, Run> | undefined;
  // Where the rows stand, each row as it now reads by its key, and what they were placed from.
  private rows: GoalRows = { toDo: [], leaving: [], obtained: [] };
  private views = new Map<string, RowView>();
  // The check each item the slot found in its own world was in, by the item's name, as the rows were placed.
  private ownFinds: ReadonlyMap<string | undefined, number> = new Map();
  private placedFrom: { readonly menu: GoalMenu; readonly isAllDone: boolean } | undefined;

  protected override willUpdate(): void {
    const { store, data } = this;
    if (store !== undefined && data !== undefined && this.menu === undefined) {
      this.menu = new StoreController(this, store, (state) => goalMenuOf(data, state));
      this.release = new StoreController(this, store, (state: TrackerState) => releaseOf(state));
      this.live = new StoreController(
        this,
        store,
        (state) => state.connection.phase === "connected"
      );
      this.name = new StoreController(this, store, ownName);
      this.run = new StoreController(this, store, ({ run }: TrackerState) => run);
    }
    const menu = this.menu?.value;
    if (menu !== undefined && data !== undefined) {
      this.place(menu, data, this.achieved || this.allDone);
    }
  }

  private place(menu: GoalMenu, data: EldenRingData, isAllDone: boolean): void {
    const from = this.placedFrom;
    if (from?.menu === menu && from.isAllDone === isAllDone) {
      return;
    }
    this.placedFrom = { menu, isAllDone };
    const { toDo, done } = rowViewsOf(menu, data.needKey, isAllDone);
    this.views = new Map([...toDo, ...done].map((view) => [view.key, view]));
    const state = this.store?.getState();
    this.ownFinds = state === undefined ? new Map() : ownFindChecks(data, state);
    this.rows = settleRows(
      this.rows,
      toDo.map(({ key }) => key),
      done.map(({ key }) => key)
    );
  }

  override render() {
    const { store, data, rows } = this;
    if (store === undefined || data === undefined) {
      return nothing;
    }
    const { toDo } = rows;
    const times = rowTimesOf(data, store.getState());
    const timeOf = (key: string) => {
      const view = this.views.get(key);
      if (view === undefined) {
        return undefined;
      }
      return view.kind === "need" ? times.need(view.need) : times.boss(view.boss);
    };
    const obtained = byTimeCame(rows.obtained, timeOf);
    const latest = obtained.at(-1);
    return html`<er-run-timer column .store=${store}>
      <div slot="top">
        <h2 class="name">${this.name?.value}</h2>
        <p class="goal">
          Goal: <span class="fig">${figure(obtained.length)}</span> of
          <span class="fig">${figure(obtained.length + toDo.length)}</span>
        </p>
      </div>
      <ul class="rows scroller" aria-label="Goal">
        ${repeat(
          obtained,
          (key) => key,
          (key) => this.row(key, data, key === latest, timeOf(key))
        )}
        ${
          obtained.length > 0 && toDo.length > 0
            ? html`<li class="line" aria-hidden="true"></li>`
            : nothing
        }
        ${repeat(
          toDo,
          (key) => key,
          (key) => this.row(key, data, false, undefined)
        )}
      </ul>
      ${
        this.achieved
          ? html`<div class="release">
              <er-release
                .release=${this.release?.value ?? "unknown"}
                .say=${this.live?.value === true ? this.say : undefined}
              ></er-release>
            </div>`
          : nothing
      }
    </er-run-timer>`;
  }

  private row(key: string, data: EldenRingData, isLatest: boolean, time: number | undefined) {
    const view = this.views.get(key);
    if (view === undefined) {
      return nothing;
    }
    const { label, line } = rowWords(view, data, this.ownFinds);
    if (!view.isGotten) {
      // A count's tally has this column to itself, as a row left has no difference.
      const tally = view.kind === "need" && view.need.kind === "count" ? line : nothing;
      return html`<li class="row" data-left aria-label=${`${label}: ${line}`}>
        <span title=${label}>${label}</span><span class="fig">${tally}</span
        ><span class="fig">${DASH}</span>
      </li>`;
    }
    const target = rowTarget(view, this.ownFinds);
    const cells = html`<span title=${label}>${label}</span><span class="fig">${DASH}</span
      ><span class="fig">${time === undefined ? DASH : clockFace(time).whole}</span>`;
    return html`<li>
      ${
        target === undefined
          ? html`<div class="row band-row" aria-current=${isLatest ? "true" : "false"}>
              ${cells}
            </div>`
          : html`<button
              class="row band-row"
              aria-current=${isLatest ? "true" : "false"}
              aria-label=${`${label}: ${line}`}
              @click=${() => this.open(target)}
            >
              ${cells}
            </button>`
      }
    </li>`;
  }

  // A row gotten opens its check, as a click on the map does, or the items.
  private open(target: RowTarget): void {
    const { store, data } = this;
    if (store !== undefined && data !== undefined) {
      openRow(this, target, data, store.getState());
    }
  }
}

function ownName({ roster, team, slot }: TrackerState): string | undefined {
  const mine = roster.find((entry) => entry.team === team && entry.slot === slot);
  return slot === undefined ? undefined : slotName(mine?.name, slot);
}

customElements.define("er-run-splits", ErRunSplits);

declare global {
  interface HTMLElementTagNameMap {
    "er-run-splits": ErRunSplits;
  }
}
