/**
 * ─ Run splits ─
 *
 * The goal menu's place on a desktop where splits are on: the slot's name and
 * how far the goal has got over a row for each goal, those gotten over those
 * left, the latest banded, in the timer's column. It follows the look set:
 * Compact's rows are text on a solid ground, with a line between the two, and
 * Comfort's are framed, under Done and To do bands, on the menu's shade. A row
 * gotten sorts up at once, by the time it came, a dash for one the tracker
 * didn't see come, and opens its check, or the items for what came from
 * elsewhere. Each is compared with the fastest finished run of its preset: its
 * difference, a row left that run's time, and Previous Segment under the timer,
 * a dash for each with nothing to compare. Once the goal's achieved, what becomes of the items left comes
 * under the rows. Where the rows don't all fit, the two lists scroll apart,
 * Done keeping to its latest, and Comfort's To do band or Compact's line drags
 * to give either more room; Compact holds the goal's last row apart too.
 */

import { LitElement, html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { ReleaseState } from "../../../archipelago/release.js";
import type { GoalMenu } from "../../../data/bosses/goal-menu.js";
import { SETTINGS, type SettingsState } from "../../../state/settings.js";
import type { EldenRingData } from "../../../state/setup.js";
import type { FinishedRun } from "../../../state/run-history.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import type { Run } from "../../../state/slices/run.js";
import { goalMenuOf, releaseOf } from "../../../state/utils/goal.js";
import { comparisonOf, previousSegment } from "../../../state/utils/run-compare.js";
import { rowTimesOf } from "../../../state/utils/run-times.js";
import "../../molecules/er-release.js";
import "../../molecules/er-resize-handle.js";
import { slotName } from "../../utils/entry-words.js";
import { figure } from "../../utils/figure.js";
import {
  byTimeCame,
  openRow,
  ownFindChecks,
  rowIcon,
  rowTarget,
  rowViewsOf,
  settleRows,
  type GoalRows,
  type RowTarget,
  type RowView,
} from "../../utils/goal-rows.js";
import { rowWords } from "../../utils/goal-words.js";
import { iconUrl } from "../../utils/icons.js";
import { listLimits } from "../../utils/list-limits.js";
import { StickToBottom } from "../../utils/stick-to-bottom.js";
import { StoreController } from "../../utils/store-controller.js";
import "./er-run-timer.js";
import { runSplitsStyles } from "./run-splits-styles.js";
import { signedTime } from "./run-words.js";
import { DASH, splitGotten, splitLeft, type RowMarks } from "./split-row.js";

// The least either list can be dragged to: about two rows.
const LIST_LEAST_PX = 60;

/**
 * The run's splits: the goal's rows, in the timer's column.
 *
 * @fires er-check - A row gotten was clicked; `detail` is a `CheckPick`, the check it opens.
 * @fires er-items - A row gotten was clicked whose item has no check here, as it came from elsewhere.
 * @cssproperty --er-run-column-width - How wide the column is, where the host is wider, for a shade spreading past it; the host's width by default.
 */
export class ErRunSplits extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    achieved: { attribute: false },
    allDone: { attribute: false },
    say: { attribute: false },
    isLong: { state: true },
    doneHeight: { state: true },
  };

  static override styles = runSplitsStyles;

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
  private earlier: StoreController<TrackerState, readonly FinishedRun[]> | undefined;
  private readonly look = new StoreController(
    this,
    SETTINGS,
    ({ timerLook }: SettingsState) => timerLook
  );
  // Where the rows stand, each row as it now reads by its key, and what they were placed from.
  private rows: GoalRows = { toDo: [], leaving: [], obtained: [] };
  private views = new Map<string, RowView>();
  // The check each item the slot found in its own world was in, by the item's name, as the rows were placed.
  private ownFinds: ReadonlyMap<string | undefined, number> = new Map();
  private placedFrom: { readonly menu: GoalMenu; readonly isAllDone: boolean } | undefined;
  // Whether the rows don't all fit, so the lists scroll apart, and the height Done was dragged to, for the visit.
  private isLong = false;
  private doneHeight: number | undefined;
  private readonly doneStays = new StickToBottom(this, () => this.doneList());
  private readonly sized = new ResizeObserver(() => this.checkFit());

  override connectedCallback(): void {
    super.connectedCallback();
    this.sized.observe(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.sized.disconnect();
  }

  protected override willUpdate(): void {
    this.dataset.look = this.look.value;
    this.toggleAttribute("data-long", this.isLong);
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
      this.earlier = new StoreController(
        this,
        store,
        ({ earlierRuns }: TrackerState) => earlierRuns
      );
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

  // On the next frame, so what this finds can change what's drawn.
  protected override updated(): void {
    requestAnimationFrame(this.checkFit);
  }

  private readonly checkFit = (): void => {
    const { obtained, toDo } = this.rows;
    const column = this.renderRoot.querySelector("er-run-timer");
    this.isLong = obtained.length > 0 && toDo.length > 0 && column?.fitsColumn() === false;
  };

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
    const compared = comparisonOf(this.earlier?.value ?? []);
    const paceOf = (key: string) => {
      const time = timeOf(key);
      return time === undefined ? undefined : compared.paceOf(key, time);
    };
    const gotten = repeat(
      obtained,
      (key) => key,
      (key) =>
        this.row(key, data, { isLatest: key === latest, time: timeOf(key), pace: paceOf(key) })
    );
    const left = (keys: readonly string[]) =>
      repeat(
        keys,
        (key) => key,
        (key) => this.row(key, data, { time: compared.timeOf(key) })
      );
    const diffs = obtained
      .filter((key) => timeOf(key) !== undefined)
      .map((key) => paceOf(key)?.diffMs);
    const latestDiff = diffs.at(-1);
    const height = this.isLong ? this.doneHeight : undefined;
    return html`<er-run-timer
      column
      .store=${store}
      data-pace=${latestDiff === undefined ? nothing : aheadOrBehind(latestDiff)}
      style=${height === undefined ? nothing : `--done-height: ${height}px`}
    >
      <div slot="top">
        <h2 class="name">${this.name?.value}</h2>
        <p class="goal">
          Goal: <span class="fig">${figure(obtained.length)}</span> of
          <span class="fig">${figure(obtained.length + toDo.length)}</span>
        </p>
      </div>
      ${
        this.look.value === "comfort"
          ? this.comfortRows(gotten, left(toDo), obtained.length, toDo.length)
          : this.compactRows(gotten, left, obtained.length, toDo)
      }
      ${this.previous(previousSegment(diffs))}
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

  // Each list under its band, and neither when it has no rows. On a long goal the To do band is
  // what moves the line between them.
  private comfortRows(gotten: unknown, left: unknown, doneCount: number, leftCount: number) {
    const words = (word: string, count: number) =>
      html`${word} <span class="fig">${figure(count)}</span>`;
    return html`${
      doneCount === 0
        ? nothing
        : html`<h3 class="band band-heading">${words("Done", doneCount)}</h3>
            <ul class="rows done scroller">
              ${gotten}
            </ul>`
    }
    ${
      leftCount === 0
        ? nothing
        : html`${
              this.isLong
                ? html`<div class="band band-heading">
                    ${this.handle("", html`<span class="band-words">${words("To do", leftCount)}</span>`)}
                  </div>`
                : html`<h3 class="band band-heading">${words("To do", leftCount)}</h3>`
            }
            <ul class="rows left scroller">
              ${left}
            </ul>`
    }`;
  }

  // The lists with a line between them, which moves on a long goal, and the goal's last row then
  // held apart under them.
  private compactRows(
    gotten: unknown,
    left: (keys: readonly string[]) => unknown,
    doneCount: number,
    toDo: readonly string[]
  ) {
    const line = html`<div class="line" aria-hidden="true"></div>`;
    return html`<ul class="rows done scroller" aria-label="Goal rows done">
        ${gotten}
      </ul>
      ${doneCount === 0 || toDo.length === 0 ? nothing : this.isLong ? this.handle("divider", line) : line}
      <ul class="rows left scroller" aria-label="Goal rows left">
        ${left(this.isLong ? toDo.slice(0, -1) : toDo)}
      </ul>
      ${
        this.isLong
          ? html`<ul class="rows last">
              ${left(toDo.slice(-1))}
            </ul>`
          : nothing
      }`;
  }

  // How much the latest row gained or lost on the one before it.
  private previous(gainedMs: number | undefined) {
    return html`<div class="previous" slot="foot">
      <span>Previous Segment</span>
      <span class="fig" data-pace=${gainedMs === undefined ? nothing : aheadOrBehind(gainedMs)}
        >${gainedMs === undefined ? DASH : signedTime(gainedMs)}</span
      >
    </div>`;
  }

  // What moves the line between the lists, dragged by `by`.
  private handle(handleClass: string, by: unknown) {
    return html`<er-resize-handle
      class=${handleClass}
      .axis=${"y"}
      .grows=${1}
      .measure=${this.doneHeightNow}
      .limits=${this.doneLimits}
      .label=${"Goal rows done"}
      @er-resize=${this.setDoneHeight}
      >${by}</er-resize-handle
    >`;
  }

  private doneList(): HTMLElement | null {
    return this.renderRoot.querySelector(".done");
  }

  private readonly doneHeightNow = (): number => this.doneList()?.offsetHeight ?? 0;

  private readonly doneLimits = (): readonly [number, number] => {
    const done = this.doneList();
    const left = this.renderRoot.querySelector<HTMLElement>(".left");
    return done === null || left === null
      ? [LIST_LEAST_PX, LIST_LEAST_PX]
      : listLimits(done, left, LIST_LEAST_PX, LIST_LEAST_PX);
  };

  private readonly setDoneHeight = ({ detail }: CustomEvent<number>): void => {
    this.doneHeight = detail;
  };

  private row(key: string, data: EldenRingData, marks: RowMarks) {
    const view = this.views.get(key);
    if (view === undefined) {
      return nothing;
    }
    const face = {
      ...rowWords(view, data, this.ownFinds),
      icon: iconUrl(rowIcon(view, data)),
      isFramed: this.look.value === "comfort",
    };
    if (!view.isGotten) {
      return splitLeft(face, marks.time, view.kind === "need" && view.need.kind === "count");
    }
    const target = rowTarget(view, this.ownFinds);
    return splitGotten(face, marks, target && (() => this.open(target)));
  }

  // A row gotten opens its check, as a click on the map does, or the items.
  private open(target: RowTarget): void {
    const { store, data } = this;
    if (store !== undefined && data !== undefined) {
      openRow(this, target, data, store.getState());
    }
  }
}

const aheadOrBehind = (ms: number): "ahead" | "behind" => (ms < 0 ? "ahead" : "behind");

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
