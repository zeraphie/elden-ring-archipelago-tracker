/**
 * ─ The app ─
 *
 * The page's root. It holds the way in, with the room's card over the curtain
 * until the curtain opens, and hands the room's store to the page once it's
 * ready. It holds the region picked too, which the map shows, the panel
 * opens and a long goal's menu lists, and the check picked in the map or the
 * panel: a room starts on its first open region with key checks left. And it holds where the goal stands: a goal
 * done while the page watches is marked over the map until dismissed, then
 * the goal menu's band keeps it; one done before the page opened goes
 * straight to the band. A handle between the map and the panel resizes them,
 * as the page splits.
 */

import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { roomInQuery } from "../archipelago/room-link.js";
import { createEntryStore, type EntryPhase, type EntryState } from "../state/entry.js";
import type { TrackerState, TrackerStore } from "../state/store.js";
import { goalMenuOf, isGoalReached } from "../state/utils/goal.js";
import { regionsOf } from "../state/utils/regions.js";
import type { CheckPick } from "./utils/check-pick.js";
import "./organisms/goal-achieved/er-goal-achieved.js";
import "./organisms/goal-menu/er-goal-menu.js";
import { LEAVE_MS, STAGGER_MS } from "./organisms/goal-menu/goal-rows.js";
import "./organisms/header/er-header.js";
import "./organisms/map/map/er-map.js";
import "./organisms/intro/er-room-card.js";
import "./organisms/panel/er-panel.js";
import "./organisms/toasts/er-toasts.js";
import "./organisms/version-notice/er-version-notice.js";
import { curtain } from "./organisms/intro/curtain.js";
import { holdCurtainFor } from "./organisms/intro/entry-curtain.js";
import { NARROW_MEDIA, narrow } from "./atoms/layout.js";
import "./molecules/er-resize-handle.js";
import { MAP_MIN_PX, PANEL_MIN_HEIGHT_PX, PanelSplit } from "./panel-split.js";
import { MediaController } from "./utils/media.js";
import { StoreController } from "./utils/store-controller.js";

// How wide the goal menu lies over the map's left side, in CSS pixels.
const GOAL_MENU_PX = 440;
// How high the map's legend lies over the goal menu's foot, in CSS pixels: its two lines, and the
// line naming what's pointed at, which takes two at most.
const MAP_LEGEND_PX = 116;

// Seeing locally only: a development build reads it from .env.development.local, and a built page has none.
const PART_DELAY_MS = import.meta.env.DEV ? import.meta.env.VITE_PART_DELAY_MS : undefined;

/**
 * The tracker's root element, which every part of the page sits in.
 */
export class ErApp extends LitElement {
  static override properties = {
    isOpen: { state: true },
    region: { state: true },
    picked: { state: true },
    goalPhase: { state: true },
  };

  static override styles = css`
    /* The page is the window's height, so the panel's lists scroll in it rather than the page. */
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    /* The map, with the goal menu over its left side, and the panel beside it. */
    .stage {
      display: flex;
      flex: 1 1 0;
      min-height: 480px;
    }
    /* Clipped, so a toast leaving off its right edge goes under the panel without widening the page. */
    .map {
      position: relative;
      flex: 999 1 560px;
      min-width: 0;
      overflow: clip;
    }
    /* Over the map's lower right, above its zoom buttons. */
    er-toasts {
      position: absolute;
      z-index: 3;
      right: 16px;
      bottom: 72px;
      width: min(380px, calc(100% - 32px));
    }
    /* Its width its border included, as the handle measures it. It keeps the width it's dragged
       to as the window narrows, the map giving way, but never so wide the map is too narrow to use. */
    er-panel {
      box-sizing: border-box;
      flex: 0 0 var(--er-panel-width, 380px);
      min-width: 0;
      max-width: calc(100% - ${unsafeCSS(MAP_MIN_PX)}px);
    }
    /* Between the map and the panel, over the edge of each, the panel's border its line. */
    er-resize-handle {
      position: relative;
      z-index: 5;
      flex: none;
      width: 12px;
      margin: 0 -6px;
    }
    er-map {
      position: absolute;
      inset: 0;
    }
    er-goal-menu {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: min(${unsafeCSS(GOAL_MENU_PX)}px, 100%);
      --er-goal-menu-foot: ${unsafeCSS(MAP_LEGEND_PX)}px;
    }
    /* Across the top of the map, under its sheet tabs and route tools. */
    er-version-notice {
      position: absolute;
      top: 72px;
      left: 0;
      right: 0;
      z-index: 3;
    }
    /* At a tablet's width and below, the map on top and the panel under it, the goal menu a strip
       along the map's foot clear of its zoom buttons, and the toasts and notice under its tabs. */
    @media ${narrow} {
      .stage {
        flex-direction: column;
        min-height: 0;
      }
      /* As tall as it's dragged to, but never so tall the panel under it is too short to use. */
      .map {
        flex: none;
        height: var(--er-map-height, clamp(300px, 46vh, 520px));
        max-height: calc(100% - ${unsafeCSS(PANEL_MIN_HEIGHT_PX)}px);
      }
      er-panel {
        flex: 1 1 auto;
        max-width: none;
        min-height: 0;
        border-top: none;
      }
      /* A bar along the panel's top edge, as a sheet's grip, taking the panel's border. */
      er-resize-handle {
        width: auto;
        height: 24px;
        margin: 0;
        background: var(--er-panel);
        border-top: 1px solid var(--er-divider);
      }
      /* Clear of the zoom buttons: three of 44 px, 6 px apart, 10 px in, and a gap. */
      er-goal-menu {
        top: auto;
        right: 164px;
        bottom: 10px;
        left: 10px;
        width: auto;
        --er-goal-menu-foot: 0px;
      }
      er-toasts {
        top: 62px;
        right: 10px;
        bottom: auto;
        left: 10px;
        width: auto;
      }
      er-version-notice {
        top: 62px;
      }
    }
  `;

  private readonly entry = createEntryStore({
    version: import.meta.env.TRACKER_VERSION,
    pace: paceWithin(PART_DELAY_MS),
    linked: roomInQuery(location.search),
  });
  // The room's store and the Elden Ring data, once the way in is ready.
  private readonly ready = new StoreController(this, this.entry, readyPhase);
  // Whether the page is stacked, so the goal menu is a strip and covers none of the map's left.
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);
  // How the page splits between the map and the panel, as dragged.
  private readonly split = new PanelSplit(this);
  // Whether the curtain has opened, which takes the room's card away with it.
  private isOpen = false;
  private hasConnected = false;
  // The region picked, by its code, the check picked in it, by id, and the room they were picked in.
  private region: string | undefined;
  private picked: number | undefined;
  private regionStore: TrackerStore | undefined;
  // Where the goal stands: not done, marked over the map, or kept in the goal menu's band.
  private goalPhase: "none" | "reaction" | "settled" = "none";
  private goalStore: TrackerStore | undefined;
  private goalDone: StoreController<TrackerState, boolean> | undefined;
  // A goal the development build's Simulate made, on the page alone: the goals left achieved
  // first, then the goal, shown, but with no room to release in.
  private isGoalSimulated = false;
  private isRestSimulated = false;

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasConnected) {
      this.hasConnected = true;
      holdCurtainFor(this.entry);
      // The development build's Simulate marks a goal on the page alone, so no release can reach the room:
      // the goals left are achieved first, one after another, as a run's last would be, then the goal.
      if (import.meta.env.DEV) {
        this.addEventListener("er-simulate-goal", () => {
          const ready = this.ready.value;
          const menu = ready && goalMenuOf(ready.data, ready.store.getState());
          const left =
            menu === undefined
              ? 0
              : menu.needed.length + menu.bosses.filter(({ state }) => state !== "defeated").length;
          this.isRestSimulated = true;
          this.requestUpdate();
          setTimeout(
            () => {
              this.isGoalSimulated = true;
              this.requestUpdate();
            },
            left === 0 ? 0 : LEAVE_MS + (left - 1) * STAGGER_MS
          );
        });
      }
      void curtain.whenDone().then(() => {
        this.isOpen = true;
      });
      void this.entry.getState().start();
    }
  }

  // A room just ready starts on its first open region with key checks left.
  protected override willUpdate(): void {
    const ready = this.ready.value;
    if (ready !== undefined && ready.store !== this.regionStore) {
      this.regionStore = ready.store;
      const regions = regionsOf(ready.data, ready.store.getState());
      this.region = regions === undefined ? undefined : ready.data.firstToDo(regions);
      this.picked = undefined;
    }
    this.followGoal(ready);
  }

  // A room just ready with its goal done goes straight to the band; a goal done after marks it first.
  private followGoal(ready: ReturnType<typeof readyPhase>): void {
    const store = ready?.store;
    if (store !== this.goalStore) {
      if (this.goalDone !== undefined) {
        this.goalDone.hostDisconnected();
        this.removeController(this.goalDone);
      }
      this.goalStore = store;
      this.goalDone =
        ready &&
        new StoreController(this, ready.store, (state: TrackerState) =>
          isGoalReached(ready.data, state)
        );
      this.isGoalSimulated = false;
      this.isRestSimulated = false;
      this.goalPhase = this.goalDone?.value === true ? "settled" : "none";
    }
    const isDone = this.goalDone?.value === true || this.isGoalSimulated;
    if (!isDone) {
      this.goalPhase = "none";
    } else if (this.goalPhase === "none") {
      this.goalPhase = "reaction";
    }
  }

  override render() {
    const ready = this.ready.value;
    return html`<er-header .store=${ready?.store}></er-header>
      <main class="stage" style=${styleMap(this.split.styles)}>
        ${
          ready === undefined
            ? nothing
            : html`<div class="map">
                  <er-map
                    .store=${ready.store}
                    .data=${ready.data}
                    .coveredLeft=${this.isNarrow.matches ? 0 : GOAL_MENU_PX}
                    .selected=${this.region}
                    .picked=${this.picked}
                    @er-region=${this.selectRegion}
                    @er-check=${this.pick}
                  ></er-map>
                  <er-goal-menu
                    .store=${ready.store}
                    .data=${ready.data}
                    .achieved=${this.goalPhase === "settled"}
                    .allDone=${this.isRestSimulated}
                    .say=${this.isGoalSimulated ? undefined : ready.say}
                    .region=${this.region}
                    @er-region=${this.selectRegion}
                    @er-check=${this.pickFromGoal}
                    @er-items=${this.showItems}
                  ></er-goal-menu>
                  <er-toasts .store=${ready.store} .data=${ready.data}></er-toasts>
                  <er-version-notice
                    .store=${ready.store}
                    .tracker=${import.meta.env.TRACKER_VERSION}
                    .coveredLeft=${this.isNarrow.matches ? 0 : GOAL_MENU_PX}
                  ></er-version-notice>
                </div>
                ${this.handle()}
                <er-panel
                  .store=${ready.store}
                  .data=${ready.data}
                  .region=${this.region}
                  .picked=${this.picked}
                  .say=${ready.say}
                  @er-region=${this.selectRegion}
                  @er-check=${this.pick}
                ></er-panel>`
        }
      </main>
      ${
        ready !== undefined && this.goalPhase === "reaction"
          ? html`<er-goal-achieved @er-dismiss=${this.settleGoal}></er-goal-achieved>`
          : nothing
      }
      ${this.isOpen ? nothing : html`<er-room-card .entry=${this.entry}></er-room-card>`}`;
  }

  // The handle between the map and the panel: sizing the panel's width beside the map, or the map's
  // height over the panel when the page is stacked.
  private handle() {
    const { split } = this;
    const sizeOf = (selector: string, side: "width" | "height") => () =>
      this.renderRoot.querySelector(selector)?.getBoundingClientRect()[side] ?? 0;
    return this.isNarrow.matches
      ? html`<er-resize-handle
          .axis=${"y"}
          .grows=${1}
          .measure=${sizeOf(".map", "height")}
          .limits=${split.mapLimits}
          .label=${"Map height"}
          @er-resize=${split.setMapHeight}
        ></er-resize-handle>`
      : html`<er-resize-handle
          .axis=${"x"}
          .grows=${-1}
          .measure=${sizeOf("er-panel", "width")}
          .limits=${split.panelLimits}
          .label=${"Panel width"}
          @er-resize=${split.setPanelWidth}
        ></er-resize-handle>`;
  }

  // A region picked, on the map, in the panel or in the goal menu, with no check picked in it yet.
  private readonly selectRegion = ({ detail }: CustomEvent<string>): void => {
    this.region = detail;
    this.picked = undefined;
  };

  // The goal marked over the map, dismissed, goes to the goal menu's band.
  private readonly settleGoal = (): void => {
    this.goalPhase = "settled";
  };

  // A check picked, on the map or in the panel, picks its region too.
  private readonly pick = ({ detail }: CustomEvent<CheckPick>): void => {
    this.region = detail.region;
    this.picked = detail.id;
  };

  // A finished goal row's check, shown in the panel's Checks whichever tab was up.
  private readonly pickFromGoal = (event: CustomEvent<CheckPick>): void => {
    this.pick(event);
    this.renderRoot.querySelector("er-panel")?.showChecks();
  };

  private readonly showItems = (): void => {
    this.renderRoot.querySelector("er-panel")?.showItems();
  };
}

function readyPhase({ phase }: EntryState): Extract<EntryPhase, { phase: "ready" }> | undefined {
  return phase.phase === "ready" ? phase : undefined;
}

// A wait within a range such as "200-500", picked afresh for each part; none without one.
function paceWithin(range: string | undefined): (() => number) | undefined {
  if (range === undefined || range === "") {
    return undefined;
  }
  const [low = NaN, high = low] = range.split("-").map(Number);
  if (!Number.isFinite(low) || !Number.isFinite(high)) {
    return undefined;
  }
  return () => low + Math.random() * Math.max(0, high - low);
}

customElements.define("er-app", ErApp);

declare global {
  interface HTMLElementTagNameMap {
    "er-app": ErApp;
  }
}
