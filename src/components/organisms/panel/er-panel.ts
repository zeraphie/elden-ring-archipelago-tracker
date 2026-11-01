/**
 * ─ Panel ─
 *
 * The right-hand panel: tabs for Checks, Items and Chat, and the view of the
 * one chosen, with the search and the region picker over them on a desktop,
 * whichever is up, and a search bringing up Checks for its matches. The tabs
 * follow the usual keys: the arrows move between them, and Home and End go to
 * the first and the last. At a tablet's width and below there's no search, the
 * region picked is a line over every tab, and the tabs are a rail
 * on the right edge: the one chosen stands out with its icon and name, and the others
 * peek in, dimmed, as icons. What's laid over it goes in its `over` slot.
 */

import { LitElement, css, html, type PropertyValues, type TemplateResult } from "lit";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerStore } from "../../../state/store.js";
import { focusRing } from "../../atoms/focus.js";
import { narrow, NARROW_MEDIA } from "../../atoms/layout.js";
import { sackStyles } from "../../atoms/sack.js";
import { segmentStyles } from "../../atoms/segments.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import { iconUrl } from "../../utils/icons.js";
import { backpackIcon, forumIcon } from "../../utils/material-icons.js";
import { MediaController } from "../../utils/media.js";
import "./er-chat-view.js";
import "./er-checks-view.js";
import "./er-items-view.js";
import "./er-panel-search.js";
import "./er-region-line.js";
import type { FeedFilter } from "./feed-words.js";
import type { CheckFilter } from "./row-words.js";

type View = "checks" | "items" | "chat";

// The tabs in order, each with its name.
const VIEWS: readonly (readonly [View, string])[] = [
  ["checks", "Checks"],
  ["items", "Items"],
  ["chat", "Chat"],
];

// Each tab's icon on the rail: the game's sack, gold as a collected check's, a backpack, and speech.
const ICONS: Readonly<Record<View, TemplateResult>> = {
  checks: html`<img class="sack" data-state="collected" src=${iconUrl("sack")} alt="" />`,
  items: backpackIcon,
  chat: forumIcon,
};

/**
 * The panel beside the map, its tabs and the view chosen.
 *
 * @slot over - What's laid over the panel at its size, placed by itself.
 */
export class ErPanel extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    region: { attribute: false },
    picked: { attribute: false },
    say: { attribute: false },
    view: { state: true },
    query: { state: true },
    checkFilter: { state: true },
    itemFilter: { state: true },
  };

  static override styles = [
    focusRing,
    sackStyles,
    segmentStyles,
    visuallyHidden,
    css`
      :host {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 0;
        background: var(--er-panel);
        border-left: 1px solid var(--er-divider);
      }
      .tabs {
        display: flex;
        padding: 12px 16px 0;
      }
      /* At a tablet's width and below, the panel sits under the map. */
      @media ${narrow} {
        :host {
          border-top: 1px solid var(--er-divider);
          border-left: none;
        }
      }
      .tabs [role="tab"] {
        min-height: 40px;
        font-weight: 600;
        font-size: 1.12em;
      }
      /* Under the rail, the views keep their lists clear of it over their right edge, and the
         tabs that peek in are cut at the screen's edge rather than widening the page. */
      .body {
        position: relative;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        min-height: 0;
        overflow: clip;
        --er-panel-clear: 40px;
      }
      .rail {
        position: absolute;
        top: 8px;
        right: 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 6px;
      }
      /* A tab not chosen peeks in from the edge, dimmed and see-through. */
      .plate {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        box-sizing: border-box;
        width: 44px;
        height: 44px;
        padding: 0;
        background: var(--er-rail-peek);
        border: 1px solid var(--er-line);
        border-right: none;
        color: var(--er-gold-bright);
        font: inherit;
        font-weight: 600;
        opacity: 0.6;
        transform: translateX(10px);
        cursor: pointer;
        transition:
          transform 0.18s ease,
          opacity 0.18s ease;
      }
      .plate[aria-selected="true"] {
        width: auto;
        height: 46px;
        padding: 0 14px 0 12px;
        background: var(--er-overlay);
        border-color: var(--er-gold-edge);
        box-shadow: var(--er-rail-shadow);
        opacity: 1;
        transform: none;
      }
      .plate svg,
      .plate img {
        width: 20px;
        height: 20px;
        color: var(--er-gold);
      }
      .plate[aria-selected="true"] svg,
      .plate[aria-selected="true"] img {
        width: 22px;
        height: 22px;
      }
      @media (prefers-reduced-motion: reduce) {
        .plate {
          transition: none;
        }
      }
      [role="tabpanel"] {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        min-height: 0;
      }
      er-chat-view,
      er-checks-view,
      er-items-view {
        flex-grow: 1;
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
  /** Says something to the room. */
  say: (text: string) => void = () => {};
  private view: View = "checks";
  private query = "";
  // The filters chosen on Checks and Items, kept here so they hold while another tab is shown.
  private checkFilter: CheckFilter = "todo";
  private itemFilter: FeedFilter = "received";
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);

  // A region or a check picked from elsewhere ends the search, to show it.
  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("region") || changed.has("picked")) {
      this.query = "";
    }
  }

  /** Shows the Checks tab, for a check picked from outside the panel. */
  showChecks(): void {
    this.view = "checks";
  }

  /** Shows the Items tab, on a filter that holds what's been received. */
  showItems(): void {
    this.view = "items";
    if (this.itemFilter !== "all") {
      this.itemFilter = "received";
    }
  }

  override render() {
    if (this.isNarrow.matches) {
      return html`<er-region-line
          .store=${this.store}
          .data=${this.data}
          .region=${this.region}
        ></er-region-line>
        <div class="body">
          <div
            role="tablist"
            class="rail"
            aria-label="Panel"
            aria-orientation="vertical"
            @keydown=${this.onTabKey}
          >
            ${VIEWS.map(([view, name]) =>
              this.tab(
                view,
                "plate",
                html`${ICONS[view]}<span class=${view === this.view ? "name" : "sr"}>${name}</span>`
              )
            )}
          </div>
          ${this.tabPanel()}
        </div>
        <slot name="over"></slot>`;
    }
    return html`<er-panel-search
        .store=${this.store}
        .data=${this.data}
        .query=${this.query}
        @er-search=${this.search}
      ></er-panel-search>
      <div role="tablist" class="tabs" aria-label="Panel" @keydown=${this.onTabKey}>
        ${VIEWS.map(([view, name]) => this.tab(view, "segment", name))}
      </div>
      ${this.tabPanel()}
      <slot name="over"></slot>`;
  }

  // A tab: joined to the others as a segment, or a plate on the rail.
  private tab(view: View, look: "segment" | "plate", content: unknown) {
    return html`<button
      role="tab"
      class=${look}
      id=${`tab-${view}`}
      aria-selected=${String(view === this.view)}
      aria-controls="view"
      tabindex=${view === this.view ? 0 : -1}
      @click=${() => {
        this.view = view;
      }}
    >
      ${content}
    </button>`;
  }

  private tabPanel() {
    return html`<div role="tabpanel" id="view" aria-labelledby=${`tab-${this.view}`}>
      ${
        this.view === "checks"
          ? html`<er-checks-view
              .store=${this.store}
              .data=${this.data}
              .region=${this.region}
              .picked=${this.picked}
              .query=${this.query}
              .filter=${this.checkFilter}
              @er-filter=${({ detail }: CustomEvent<CheckFilter>) => {
                this.checkFilter = detail;
              }}
            ></er-checks-view>`
          : this.view === "items"
            ? html`<er-items-view
                .store=${this.store}
                .data=${this.data}
                .filter=${this.itemFilter}
                @er-filter=${({ detail }: CustomEvent<FeedFilter>) => {
                  this.itemFilter = detail;
                }}
                @er-check=${() => {
                  this.view = "checks";
                }}
              ></er-items-view>`
            : html`<er-chat-view
                .store=${this.store}
                .data=${this.data}
                .say=${this.say}
              ></er-chat-view>`
      }
    </div>`;
  }

  // The matches show on Checks, whichever tab the search was typed over.
  private readonly search = ({ detail }: CustomEvent<string>): void => {
    this.query = detail;
    if (detail !== "") {
      this.view = "checks";
    }
  };

  // The arrows move between the tabs, round from the last to the first, sideways or, on the rail,
  // up and down; Home and End go to the ends.
  private readonly onTabKey = (event: KeyboardEvent): void => {
    const at = VIEWS.findIndex(([view]) => view === this.view);
    const to =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (at + 1) % VIEWS.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (at - 1 + VIEWS.length) % VIEWS.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? VIEWS.length - 1
              : undefined;
    const view = to === undefined ? undefined : VIEWS[to]?.[0];
    if (view === undefined) {
      return;
    }
    event.preventDefault();
    this.view = view;
    void this.updateComplete.then(() => {
      this.renderRoot.querySelector<HTMLElement>(`#tab-${view}`)?.focus();
    });
  };
}

customElements.define("er-panel", ErPanel);

declare global {
  interface HTMLElementTagNameMap {
    "er-panel": ErPanel;
  }
}
