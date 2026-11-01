/**
 * ─ Items view ─
 *
 * The panel's Items tab: what the other players sent this slot, what it
 * obtained for itself, and what it sent them, newest at the bottom, each with
 * how long ago the tracker saw it, kept current to the second. The list stays
 * at the bottom as items come, unless it's been scrolled up to read, when a
 * button takes it back. A long list shows its newest rows, with the way to the
 * rest over them, as a release can bring thousands. A received item says where
 * in the sender's world it was; the others name the check they were in, and the
 * row opens it. At a tablet's width and below, the filters are text toggles,
 * each with its count.
 */

import { LitElement, css, html, nothing } from "lit";
import { shallow } from "zustand/vanilla/shallow";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { itemsOf, type ItemEntry } from "../../../state/utils/feed.js";
import { NARROW_MEDIA } from "../../atoms/layout.js";
import { figures } from "../../atoms/figures.js";
import { focusRing } from "../../atoms/focus.js";
import { moreStyles } from "../../atoms/more.js";
import { scrollerStyles } from "../../atoms/scroller.js";
import { segmentStyles } from "../../atoms/segments.js";
import { checkRowStyles } from "../../molecules/check-row.js";
import "../../molecules/er-ago.js";
import "../../molecules/er-to-bottom.js";
import "../../molecules/er-toggle-row.js";
import type { CheckPick } from "../../utils/check-pick.js";
import { checkLine } from "../../utils/check-words.js";
import { emit } from "../../utils/emit.js";
import { figure } from "../../utils/figure.js";
import { iconUrl } from "../../utils/icons.js";
import { foundIn, playerName, UNNAMED_ITEM } from "../../utils/item-words.js";
import { MediaController } from "../../utils/media.js";
import { StickToBottom } from "../../utils/stick-to-bottom.js";
import { StoreController } from "../../utils/store-controller.js";
import { FEED_FILTERS, filterCounts, filterLabel, keeps, type FeedFilter } from "./feed-words.js";
import { ROWS_SHOWN } from "./row-words.js";

const SACK = iconUrl("sack");

/**
 * The items received, obtained and sent, under a filter.
 *
 * @fires er-check - A row with a check was clicked; `detail` is a `CheckPick`, the check it was in.
 * @fires er-filter - A filter was chosen; `detail` is the filter.
 */
export class ErItemsView extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    filter: { attribute: false },
    isAllShown: { state: true },
  };

  static override styles = [
    checkRowStyles,
    figures,
    focusRing,
    moreStyles,
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
      .segment {
        min-height: 38px;
        font-size: 0.92em;
      }
      /* Clear of whatever lies over the list's right edge, such as the rail of tabs under the map. */
      .scroller {
        margin: 0;
        padding: 0 var(--er-panel-clear, 0px) 0 0;
        list-style: none;
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
      .empty {
        padding: 14px 16px;
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
  private items: StoreController<TrackerState, readonly ItemEntry[]> | undefined;
  // Whether a long list is showing all of its rows.
  private isAllShown = false;
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);
  private readonly stick = new StickToBottom(this, () =>
    this.renderRoot.querySelector(".scroller")
  );

  protected override willUpdate(): void {
    const { store, data } = this;
    if (store !== undefined && data !== undefined && this.items === undefined) {
      this.items = new StoreController(this, store, (state) => itemsOf(data, state), shallow);
    }
  }

  override render() {
    const items = this.items?.value ?? [];
    const kept = items.filter((item) => keeps(this.filter, item));
    const shown = this.isAllShown ? kept : kept.slice(-ROWS_SHOWN);
    return html`${this.filters(items)}
      <div class="scroller-frame">
        <ul class="scroller" aria-label="Items">
          ${shown.length === 0 ? html`<li class="empty">Nothing yet.</li>` : nothing}
          ${
            shown.length < kept.length
              ? html`<li class="more">
                  <button
                    class="segment"
                    @click=${() => {
                      this.isAllShown = true;
                    }}
                  >
                    Show all <span class="fig">${figure(kept.length)}</span>
                  </button>
                </li>`
              : nothing
          }
          ${shown.map((item) => this.row(item))}
        </ul>
        ${
          this.stick.isAway
            ? html`<er-to-bottom @er-to-bottom=${() => this.stick.toBottom()}></er-to-bottom>`
            : nothing
        }
      </div>`;
  }

  // Joined buttons, or at a tablet's width and below text toggles, each with how many items it keeps.
  private filters(items: readonly ItemEntry[]) {
    const counts = filterCounts(items);
    if (this.isNarrow.matches) {
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
            ${filterLabel(filter, counts)}
          </button>`
      )}
    </div>`;
  }

  private choose(filter: FeedFilter): void {
    this.filter = filter;
    this.isAllShown = false;
    this.stick.stay();
    emit<FeedFilter>(this, "er-filter", filter);
  }

  // A row with a check is a button that opens it; a received item's is in another world, so it's left to read.
  private row(item: ItemEntry) {
    const pick = this.pickOf(item);
    return pick === undefined
      ? html`<li class="row" data-key>${this.words(item)}</li>`
      : html`<li>
          <button
            class="row band-row"
            data-key
            @click=${() => emit<CheckPick>(this, "er-check", pick)}
          >
            ${this.words(item)}
          </button>
        </li>`;
  }

  private words(item: ItemEntry) {
    const where = this.placeOf(item);
    return html`<img
        class="sack"
        data-state=${item.kind === "sent" ? "todo" : "collected"}
        src=${SACK}
        alt=""
      />
      <span class="words">
        <span class="top">
          <span><span class="item">${item.item ?? UNNAMED_ITEM}</span>${this.who(item)}</span>
          <er-ago class="when" .at=${item.at}></er-ago>
        </span>
        ${where === undefined ? nothing : html`<span class="where">${where}</span>`}
      </span>`;
  }

  // Who it came from or went to; what's obtained says so only among the others.
  private who(item: ItemEntry) {
    switch (item.kind) {
      case "received":
        return html` <span class="who">– from ${playerName(item.from)}</span>`;
      case "sent":
        return html` <span class="who">– to ${playerName(item.to)}</span>`;
      case "found":
        return this.filter === "all" ? html` <span class="who">– Obtained</span>` : nothing;
    }
  }

  private placeOf(item: ItemEntry): string | undefined {
    switch (item.kind) {
      case "received":
        return foundIn(item.game, item.location);
      case "sent":
        return checkLine(item.check.name);
      case "found":
        return item.check && checkLine(item.check);
    }
  }

  private pickOf(item: ItemEntry): CheckPick | undefined {
    switch (item.kind) {
      case "received":
        return undefined;
      case "sent":
        return { region: item.check.region, id: item.check.id };
      case "found":
        return item.region === undefined ? undefined : { region: item.region, id: item.location };
    }
  }
}

customElements.define("er-items-view", ErItemsView);

declare global {
  interface HTMLElementTagNameMap {
    "er-items-view": ErItemsView;
  }
}
