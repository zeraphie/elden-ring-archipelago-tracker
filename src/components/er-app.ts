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
 * straight to the band. Either way, the run's clock stops there. A handle between the map and the panel resizes them,
 * as the page splits, and the settings lie over the panel while they're open.
 * With the timer on, it lies at the goal menu's foot, or in Compact's column
 * in the menu's place where splits are on.
 */

import { LitElement, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { roomInQuery } from "../archipelago/room-link.js";
import { createEntryStore, type EntryPhase, type EntryState } from "../state/entry.js";
import { SETTINGS, type SettingsState } from "../state/settings.js";
import type { TrackerState, TrackerStore } from "../state/store.js";
import { goalMenuOf, isGoalReached } from "../state/utils/goal.js";
import { regionsOf } from "../state/utils/regions.js";
import type { CheckPick } from "./utils/check-pick.js";
import "./organisms/goal-achieved/er-goal-achieved.js";
import "./organisms/goal-menu/er-goal-menu.js";
import "./organisms/header/er-header.js";
import "./organisms/map/components/er-map.js";
import "./organisms/intro/er-room-card.js";
import "./organisms/panel/er-panel.js";
import "./organisms/settings/er-settings.js";
import "./organisms/timer/er-run-splits.js";
import "./organisms/timer/er-run-timer.js";
import "./organisms/toasts/er-toasts.js";
import "./organisms/version-notice/er-version-notice.js";
import { curtain } from "./organisms/intro/curtain.js";
import { holdCurtainFor } from "./organisms/intro/entry-curtain.js";
import { appStyles, GOAL_MENU_PX, RUN_TIMER_WIDTH_PX } from "./app-styles.js";
import { NARROW_MEDIA } from "./atoms/layout.js";
import "./molecules/er-resize-handle.js";
import { PanelSplit } from "./panel-split.js";
import { SettingsOpen } from "./settings-open.js";
import { LEAVE_MS, STAGGER_MS } from "./utils/goal-rows.js";
import { MediaController } from "./utils/media.js";
import { StoreController } from "./utils/store-controller.js";

// Where the run's timer lies: nowhere, at the goal menu's foot, or in the menu's place.
type TimerPlace = "none" | "foot" | "column";

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

  static override styles = appStyles;

  private readonly entry = createEntryStore({
    version: import.meta.env.TRACKER_VERSION,
    pace: paceWithin(PART_DELAY_MS),
    linked: roomInQuery(location.search),
    // A file of its own, so a real room's visit loads none of it.
    demo: () => import("../demo/ways.js").then(({ demoWays }) => demoWays()),
  });
  // The room's store and the Elden Ring data, once the way in is ready.
  private readonly ready = new StoreController(this, this.entry, readyPhase);
  // Whether the page is stacked, so the goal menu is a strip and covers none of the map's left.
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);
  // How the page splits between the map and the panel, as dragged.
  private readonly split = new PanelSplit(this);
  // Where the run's timer lies, which its accordion brings to the stacked page.
  private readonly timerPlace = new StoreController(this, SETTINGS, timerPlaceOf);
  // Whether the settings panel is open, and the cog to go back to as it closes.
  private readonly settings = new SettingsOpen(this, () =>
    this.renderRoot.querySelector("er-header")?.focusCog()
  );
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
  // A goal Simulate made, on the page alone: the goals left achieved
  // first, then the goal, shown, but with no room to release in.
  private isGoalSimulated = false;
  private isRestSimulated = false;

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasConnected) {
      this.hasConnected = true;
      holdCurtainFor(this.entry);
      // Simulate marks a goal on the page alone, so no release can reach the room: the goals left
      // are achieved first, one after another, as a run's last would be, then the goal.
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
      if (this.goalPhase === "settled") {
        store?.getState().endRun();
      }
    }
    const isDone = this.goalDone?.value === true || this.isGoalSimulated;
    if (!isDone) {
      this.goalPhase = "none";
    } else if (this.goalPhase === "none") {
      this.goalPhase = "reaction";
      store?.getState().endRun();
    }
  }

  override render() {
    const ready = this.ready.value;
    const isNarrow = this.isNarrow.matches;
    const timerPlace = isNarrow ? "none" : this.timerPlace.value;
    const coveredLeft = isNarrow ? 0 : timerPlace === "column" ? RUN_TIMER_WIDTH_PX : GOAL_MENU_PX;
    return html`<er-header
        .store=${ready?.store}
        .isSettingsOpen=${this.settings.isOpen}
      ></er-header>
      <main class="stage" style=${styleMap(this.split.styles)}>
        ${
          ready === undefined
            ? nothing
            : html`<div class="map" ?data-timer=${timerPlace !== "none"}>
                  <er-map
                    .store=${ready.store}
                    .data=${ready.data}
                    .coveredLeft=${coveredLeft}
                    .selected=${this.region}
                    .picked=${this.picked}
                    @er-region=${this.selectRegion}
                    @er-check=${this.pick}
                  ></er-map>
                  ${this.goal(ready, timerPlace)}
                  <er-toasts .store=${ready.store} .data=${ready.data}></er-toasts>
                  <er-version-notice
                    .store=${ready.store}
                    .tracker=${import.meta.env.TRACKER_VERSION}
                    .coveredLeft=${coveredLeft}
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
                >
                  <er-settings slot="over" .open=${this.settings.isOpen}></er-settings>
                </er-panel>`
        }
      </main>
      ${
        ready !== undefined && this.goalPhase === "reaction"
          ? html`<er-goal-achieved @er-dismiss=${this.settleGoal}></er-goal-achieved>`
          : nothing
      }
      ${this.isOpen ? nothing : html`<er-room-card .entry=${this.entry}></er-room-card>`}`;
  }

  // The goal menu, with the timer at its foot where it's on, or the timer's column in its place.
  private goal(ready: NonNullable<ReturnType<typeof readyPhase>>, timerPlace: TimerPlace) {
    const achieved = this.goalPhase === "settled";
    const say = this.isGoalSimulated ? undefined : ready.say;
    return timerPlace === "column"
      ? html`<er-run-splits
          .store=${ready.store}
          .data=${ready.data}
          .achieved=${achieved}
          .allDone=${this.isRestSimulated}
          .say=${say}
          @er-check=${this.pickFromGoal}
          @er-items=${this.showItems}
        ></er-run-splits>`
      : html`<er-goal-menu
            .store=${ready.store}
            .data=${ready.data}
            .achieved=${achieved}
            .allDone=${this.isRestSimulated}
            .say=${say}
            .region=${this.region}
            @er-region=${this.selectRegion}
            @er-check=${this.pickFromGoal}
            @er-items=${this.showItems}
          ></er-goal-menu>
          ${timerPlace === "foot" ? html`<er-run-timer .store=${ready.store}></er-run-timer>` : nothing}`;
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

// Compact's column stands in for the goal menu where splits are on; Comfort's has yet to.
function timerPlaceOf({ isTimerOn, hasSplits, timerLook }: SettingsState): TimerPlace {
  if (!isTimerOn) {
    return "none";
  }
  return hasSplits && timerLook === "compact" ? "column" : "foot";
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
