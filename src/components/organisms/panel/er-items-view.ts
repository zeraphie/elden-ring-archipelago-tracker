/**
 * ─ Items view ─
 *
 * The panel's Items tab: what the other players sent this slot, and what it
 * sent them, newest first, each with how long ago the tracker saw it, kept
 * current to the second. A
 * received item says where in the sender's world it was; a sent one names
 * the check it was in, and "Show" opens that check. At a tablet's width and
 * below, the filters are text toggles, each with its count.
 */

import { LitElement, css, html, nothing } from "lit";
import { shallow } from "zustand/vanilla/shallow";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { feedOf, type FeedEntry } from "../../../state/utils/feed.js";
import { bandRowStyles } from "../../atoms/band.js";
import { narrow, NARROW_MEDIA } from "../../atoms/layout.js";
import { buttonStyles } from "../../atoms/button.js";
import { figures } from "../../atoms/figures.js";
import { focusRing } from "../../atoms/focus.js";
import { sackStyles } from "../../atoms/sack.js";
import { scrollerStyles } from "../../atoms/scroller.js";
import { segmentStyles } from "../../atoms/segments.js";
import "../../molecules/er-ago.js";
import "../../molecules/er-toggle-row.js";
import type { CheckPick } from "../../utils/check-pick.js";
import { checkLine } from "../../utils/check-words.js";
import { emit } from "../../utils/emit.js";
import { iconUrl } from "../../utils/icons.js";
import { foundIn, playerName, UNNAMED_ITEM } from "../../utils/item-words.js";
import { MediaController } from "../../utils/media.js";
import { StoreController } from "../../utils/store-controller.js";
import { FEED_FILTERS, filterLabel, type FeedFilter } from "./feed-words.js";

const SACK = iconUrl("sack");

/**
 * The items received and sent, under a filter.
 *
 * @fires er-check - "Show" was pressed on a sent item; `detail` is a `CheckPick`, the check it was in.
 * @fires er-filter - A filter was chosen; `detail` is the filter.
 */
export class ErItemsView extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    filter: { attribute: false },
  };

  static override styles = [
    bandRowStyles,
    buttonStyles,
    figures,
    focusRing,
    sackStyles,
    scrollerStyles,
    segmentStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      [role="group"] {
        display: flex;
        padding: 12px 16px;
        border-bottom: 1px solid var(--er-panel-divider);
      }
      er-toggle-row {
        padding: 0 16px;
        border-bottom: 1px solid var(--er-panel-divider);
      }
      /* At a tablet's width and below, the buttons are at least 44 px, for a finger. */
      @media ${narrow} {
        :host .button {
          min-height: 44px;
        }
      }
      .segment {
        min-height: 38px;
        font-size: 0.92em;
      }
      /* Clear of whatever lies over the list's right edge, such as the rail of tabs under the map. */
      .scroller {
        flex-grow: 1;
        min-height: 0;
        margin: 0;
        padding: 0 var(--er-panel-clear, 0px) 0 0;
        list-style: none;
      }
      li {
        display: grid;
        grid-template-columns: 26px minmax(0, 1fr) auto;
        align-items: start;
        gap: 2px 12px;
        padding: 9px 16px;
        border-bottom: 1px solid var(--er-panel-divider);
      }
      img {
        width: 26px;
        height: 26px;
        margin-top: 1px;
      }
      .words {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .item {
        font-weight: 500;
      }
      .who,
      .where,
      .when {
        font-weight: 400;
        color: var(--er-ink-muted);
      }
      .when {
        flex-shrink: 0;
        font-size: 0.8em;
      }
      .where {
        font-size: 0.86em;
      }
      .button {
        align-self: center;
        min-height: 34px;
        padding: 2px 12px;
        font-size: 0.85em;
      }
      .empty {
        display: block;
        padding: 14px 16px;
        border: none;
        font-size: 0.92em;
        color: var(--er-ink-muted);
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  /** Which items the tab shows; it's told back with `er-filter` when it's chosen here. */
  filter: FeedFilter = "received";
  private feed: StoreController<TrackerState, readonly FeedEntry[]> | undefined;
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);

  protected override willUpdate(): void {
    const { store, data } = this;
    if (store !== undefined && data !== undefined && this.feed === undefined) {
      this.feed = new StoreController(this, store, (state) => feedOf(data, state), shallow);
    }
  }

  override render() {
    const feed = this.feed?.value ?? [];
    const received = feed.filter(({ kind }) => kind === "received").length;
    const shown = feed.filter(({ kind }) => this.filter === "all" || kind === this.filter);
    return html`${this.filters(received, feed.length - received)}
      <ul class="scroller" aria-label="Items">
        ${shown.length === 0 ? html`<li class="empty">Nothing yet.</li>` : nothing}
        ${shown.map((entry) => this.entry(entry))}
      </ul>`;
  }

  // Joined buttons, or at a tablet's width and below text toggles, each with how many items it keeps.
  private filters(received: number, sent: number) {
    if (this.isNarrow.matches) {
      const counts: Readonly<Record<FeedFilter, number>> = {
        received,
        sent,
        all: received + sent,
      };
      return html`<er-toggle-row
        .label=${"Show"}
        .options=${FEED_FILTERS.map(([key, label]) => ({ key, label, count: counts[key] }))}
        .chosen=${this.filter}
        @er-choose=${({ detail }: CustomEvent<string>) => {
          const chosen = FEED_FILTERS.find(([filter]) => filter === detail);
          if (chosen !== undefined) {
            this.choose(chosen[0]);
          }
        }}
      ></er-toggle-row>`;
    }
    return html`<div role="group" aria-label="Show">
      ${FEED_FILTERS.map(
        ([filter]) =>
          html`<button
            class="segment"
            aria-pressed=${String(filter === this.filter)}
            @click=${() => this.choose(filter)}
          >
            ${filterLabel(filter, received, sent)}
          </button>`
      )}
    </div>`;
  }

  private choose(filter: FeedFilter): void {
    this.filter = filter;
    emit<FeedFilter>(this, "er-filter", filter);
  }

  private entry(entry: FeedEntry) {
    const isReceived = entry.kind === "received";
    const who = isReceived ? `from ${playerName(entry.from)}` : `to ${playerName(entry.to)}`;
    const where = isReceived ? foundIn(entry.game, entry.location) : checkLine(entry.check.name);
    return html`<li class="band-row">
      <img class="sack" data-state=${isReceived ? "collected" : "todo"} src=${SACK} alt="" />
      <span class="words">
        <span class="top">
          <span
            ><span class="item">${entry.item ?? UNNAMED_ITEM}</span>
            <span class="who">– ${who}</span></span
          >
          <er-ago class="when" .at=${entry.at}></er-ago>
        </span>
        ${where === undefined ? nothing : html`<span class="where">${where}</span>`}
      </span>
      ${
        entry.kind === "sent"
          ? html`<button
              class="button"
              data-tone="quiet"
              aria-label=${`Show ${checkLine(entry.check.name)}`}
              @click=${() =>
                emit<CheckPick>(this, "er-check", {
                  region: entry.check.region,
                  id: entry.check.id,
                })}
            >
              Show
            </button>`
          : nothing
      }
    </li>`;
  }
}

customElements.define("er-items-view", ErItemsView);

declare global {
  interface HTMLElementTagNameMap {
    "er-items-view": ErItemsView;
  }
}
