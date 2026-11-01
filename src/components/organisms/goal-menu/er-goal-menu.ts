/**
 * ─ Goal menu ─
 *
 * The left-hand menu over a wide shade, as the game's own: what still stands
 * between the player and the goal, then the goal's bosses, each in a framed
 * row, and what's been obtained folded away beneath. It's worked out from the
 * store and the Elden Ring data, and moves as items arrive and checks are
 * done. A boss or a need with no icon yet keeps its frame, empty. A row
 * achieved while the menu watches plays its way out before it joins the end
 * of what's obtained, so nothing slides. Once the goal's achieved, its band
 * takes the top, and every row is among what's obtained. A goal of more bosses
 * than rows read well at a glance goes by region: on the desktop its tally and
 * bar, the main path's rows, then one region's bosses at a time; at a tablet's
 * width and below, the main path's icons in the strip, with region chips under
 * them.
 */

import { LitElement, css, html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import type { ReleaseState } from "../../../archipelago/release.js";
import type { GoalBoss } from "../../../data/bosses/goal.js";
import type { GoalMenu } from "../../../data/bosses/goal-menu.js";
import type { RegionSummary } from "../../../data/rules/region-summary.js";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { ownFindsOf } from "../../../state/utils/feed.js";
import { goalMenuOf, releaseOf } from "../../../state/utils/goal.js";
import { regionsOf } from "../../../state/utils/regions.js";
import { barStyles } from "../../atoms/bar.js";
import { figures } from "../../atoms/figures.js";
import { foldStyles } from "../../atoms/fold.js";
import { bandHeadingStyles } from "../../atoms/heading.js";
import { scrollerStyles } from "../../atoms/scroller.js";
import { focusRing } from "../../atoms/focus.js";
import { narrow, NARROW_MEDIA } from "../../atoms/layout.js";
import "./er-goal-band.js";
import "./er-goal-chips.js";
import type { GoalChip } from "./er-goal-chips.js";
import "./er-goal-regions.js";
import type { RegionBossRow } from "./er-region-bosses.js";
import "./er-goal-row.js";
import { bossesByRegion, bossTally, goalPickerGroups, isByRegion } from "./goal-regions.js";
import {
  LEAVE_MS,
  placeRows,
  rowLeft,
  rowViewsOf,
  STAGGER_MS,
  type GoalRows,
  type RowView,
} from "./goal-rows.js";
import { bossLine, bossName, needLine, needName } from "./goal-words.js";
import { StripScroll } from "./strip-scroll.js";
import { figure, percentDone } from "../../utils/figure.js";
import { isMotionReduced } from "../../utils/motion.js";
import { iconUrl } from "../../utils/icons.js";
import { MediaController } from "../../utils/media.js";
import { pickerGroups, type PickerGroup } from "../../utils/region-groups.js";
import { StoreController } from "../../utils/store-controller.js";

// A long goal by region, as the menu shows it: its tally, the regions holding a goal boss, and the
// region picked on the page, with its bosses.
interface RegionView {
  readonly data: EldenRingData;
  readonly tally: { readonly defeated: number; readonly of: number };
  readonly groups: readonly PickerGroup[];
  readonly region: string | undefined;
  readonly label: string;
  readonly count: string | undefined;
  readonly toDo: readonly RegionBossRow[];
  readonly defeated: readonly RegionBossRow[];
}

/**
 * The goal menu: what's needed, the goal's bosses, and what's been obtained.
 *
 * @fires er-region - A region was picked in a long goal's select; `detail` is its code.
 * @cssproperty --er-goal-menu-foot - Room kept clear under the menu's list, for whatever lies over the menu's foot; none by default.
 */
export class ErGoalMenu extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    achieved: { attribute: false },
    allDone: { attribute: false },
    say: { attribute: false },
    region: { attribute: false },
  };

  static override styles = [
    bandHeadingStyles,
    barStyles,
    scrollerStyles,
    figures,
    focusRing,
    foldStyles,
    css`
      /* The shade spreads wide over the map, and lets the map have the pointer; the list in it
         takes the pointer only as far as its rows reach. It starts under the map's sheet tabs. */
      :host {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-top: 76px;
        padding-bottom: var(--er-goal-menu-foot, 0px);
        background: var(--er-menu-shade);
        pointer-events: none;
      }
      nav {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: 16px;
        box-sizing: border-box;
        width: calc(100% - 90px);
        min-height: 0;
        padding-bottom: 20px;
        /* The scrollbar's room is kept whether it's needed or not, so opening the fold never narrows the rows. */
        scrollbar-gutter: stable;
        pointer-events: auto;
      }
      h2,
      summary {
        margin: 0 60px 0 0;
        padding: 6px 16px 6px 22px;
        font-size: 1.25em;
      }
      ul {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      /* A long goal's heading carries its tally, with its bar under it. */
      .tally h2 {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
      }
      .tally .count {
        font-size: 0.7em;
        font-weight: 400;
        color: var(--er-ink-muted);
      }
      .tally .track {
        margin: 6px 60px 0 22px;
      }
      /* The gap under the fold's heading is part of its contents, so it eases too. */
      details ul {
        padding-top: 16px;
      }
      /* At a tablet's width and below, a strip of the icons along the map's foot, scrolling sideways:
         the rows left to do, or the band once the goal's achieved. It's as wide as they are, up to
         three icons and a half, so a fourth peeks in to say there are more. It shows no scrollbar,
         and a row dropping out of it is cut at its foot rather than scrolling it. */
      @media ${narrow} {
        :host {
          padding: 0;
          background: none;
        }
        :host nav {
          flex-direction: row;
          align-items: flex-end;
          gap: 6px;
          width: fit-content;
          max-width: 100%;
          padding: 0;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-gutter: auto;
          scrollbar-width: none;
        }
        /* The icons are 44 px, 6 px apart. */
        :host nav:not(:has(er-goal-band)) {
          max-width: min(100%, calc(3.5 * 44px + 3 * 6px));
        }
        /* A mouse drags it sideways, while there's more of it than shows. */
        :host nav[data-scrolls] {
          cursor: grab;
        }
        :host nav[data-dragging] {
          cursor: grabbing;
        }
        h2,
        details {
          display: none;
        }
        ul {
          flex-direction: row;
          gap: 6px;
        }
        er-goal-band {
          flex-shrink: 0;
        }
        /* A long goal's chips sit under the strip, and take the pointer as the strip does. */
        er-goal-chips {
          margin-top: 6px;
          pointer-events: auto;
        }
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  /** Whether the goal's achieved, and its reaction gone, so the band takes the menu's top. */
  achieved = false;
  /** Whether every row counts as done, its need met or its boss defeated, as when a development build simulates the goal. */
  allDone = false;
  /** Says a command to the room, such as !release; undefined where there's no room to send to. */
  say: ((text: string) => void) | undefined;
  /** The region picked on the page, by its code, which a long goal's regions follow. */
  region: string | undefined;
  private menu: StoreController<TrackerState, GoalMenu | undefined> | undefined;
  private release: StoreController<TrackerState, ReleaseState> | undefined;
  private live: StoreController<TrackerState, boolean> | undefined;
  // A long goal's select shows how each region stands, so the menu follows the regions too.
  private summaries:
    | StoreController<TrackerState, ReadonlyMap<string, RegionSummary> | undefined>
    | undefined;
  // Where the rows stand, each row as it now reads by its key, and what they were placed from.
  private rows: GoalRows | undefined;
  private views = new Map<string, RowView>();
  // The items the slot found in its own world, by name, as the rows were placed.
  private ownFinds: ReadonlySet<string | undefined> = new Set();
  private placedFrom:
    | { readonly menu: GoalMenu; readonly isAllDone: boolean; readonly byRegion: boolean }
    | undefined;
  // Each leaving row's wait before it starts, and the timer that lets it go.
  private delays = new Map<string, number>();
  private timers = new Map<string, ReturnType<typeof setTimeout>>();
  // At a tablet's width and below the menu is a strip, which a mouse's wheel and drag scroll sideways.
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);
  private readonly strip = new StripScroll(() => this.isNarrow.matches);

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }

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
      this.summaries = new StoreController(this, store, (state) => regionsOf(data, state));
    }
    const menu = this.menu?.value;
    if (menu !== undefined && data !== undefined) {
      this.place(menu, data, this.achieved || this.allDone, isByRegion(menu.bosses));
    }
  }

  // Places the rows for the menu as it now stands; a row just achieved starts leaving, rows achieved
  // together one after another. Going by region, the rows are the main path's alone, placed afresh.
  private place(menu: GoalMenu, data: EldenRingData, isAllDone: boolean, byRegion: boolean): void {
    const from = this.placedFrom;
    if (from?.menu === menu && from.isAllDone === isAllDone && from.byRegion === byRegion) {
      return;
    }
    if (from !== undefined && from.byRegion !== byRegion) {
      this.rows = undefined;
    }
    this.placedFrom = { menu, isAllDone, byRegion };
    const views = rowViewsOf(menu, data.needKey, isAllDone);
    const isShown = (view: RowView) => !byRegion || view.kind === "need";
    const toDo = views.toDo.filter(isShown);
    const done = views.done.filter(isShown);
    this.views = new Map([...toDo, ...done].map((view) => [view.key, view]));
    const state = this.store?.getState();
    this.ownFinds = new Set(state && ownFindsOf(data, state).map(({ item }) => item));
    const { rows, started } = placeRows(
      this.rows,
      toDo.map(({ key }) => key),
      done.map(({ key }) => key)
    );
    this.rows = rows;
    started.forEach((key, index) => {
      const delay = index * STAGGER_MS;
      this.delays.set(key, delay);
      const timer = setTimeout(() => this.letGo(key), isMotionReduced() ? 0 : LEAVE_MS + delay);
      this.timers.set(key, timer);
    });
  }

  // A row that has played its way out goes to the end of what's obtained.
  private letGo(key: string): void {
    this.timers.delete(key);
    this.delays.delete(key);
    if (this.rows !== undefined) {
      this.rows = rowLeft(this.rows, key);
      this.requestUpdate();
    }
  }

  override render() {
    const { rows, data } = this;
    if (rows === undefined || data === undefined) {
      return nothing;
    }
    const { strip } = this;
    // A long goal goes by region: in the column on the desktop, in chips under the strip below it.
    const view = this.placedFrom?.byRegion === true ? this.regionView(data) : undefined;
    const isNarrow = this.isNarrow.matches;
    return html`<nav
        class="scroller"
        aria-label="Goal"
        @pointerenter=${strip.enter}
        @wheel=${strip.wheel}
        @pointerdown=${strip.down}
        @pointermove=${strip.move}
        @pointerup=${strip.up}
        @pointercancel=${strip.up}
      >
        ${view === undefined || isNarrow ? html`<h2 class="band-heading">Goal</h2>` : this.tally(view)}
        ${this.achieved ? this.band(rows, data) : this.toDo(rows, data)}
        ${view === undefined || isNarrow ? nothing : this.regions(view)}
      </nav>
      ${view !== undefined && isNarrow ? this.chips(view) : nothing}`;
  }

  // A long goal by region: the tally, the regions holding a goal boss in the picker's groups, and
  // the region picked on the page, with its bosses. Every boss counts as defeated once the goal's achieved.
  private regionView(data: EldenRingData): RegionView {
    const bosses = this.menu?.value?.bosses ?? [];
    const regionOf = (drop: string) => data.readLocationName(drop)?.regions[0];
    const byRegion = bossesByRegion(bosses, regionOf, this.achieved || this.allDone);
    const state = this.store?.getState();
    const { region } = this;
    const picked = region === undefined ? undefined : byRegion.get(region);
    const row = (boss: GoalBoss): RegionBossRow => ({
      key: `boss:${boss.flag}`,
      name: bossName(boss),
      place: boss.drop === undefined ? "" : data.checkName(boss.drop).place,
    });
    return {
      data,
      tally: bossTally(byRegion),
      groups: state === undefined ? [] : goalPickerGroups(pickerGroups(data, state), byRegion),
      region,
      label: region === undefined ? "" : data.regionName(region),
      count:
        picked &&
        `${figure(picked.defeated.length)}/${figure(picked.defeated.length + picked.toDo.length)}`,
      toDo: (picked?.toDo ?? []).map(row),
      defeated: (picked?.defeated ?? []).map(row),
    };
  }

  // A long goal's heading, with its bosses defeated out of all and a bar.
  private tally({ tally: { defeated, of } }: RegionView) {
    return html`<div class="tally">
      <h2 class="band-heading">
        Goal
        <span class="count"
          ><span class="fig">${figure(defeated)}</span> of
          <span class="fig">${figure(of)}</span></span
        >
      </h2>
      <div class="track" aria-hidden="true">
        <div class="fill" style="--done: ${percentDone(defeated, of)}%"></div>
      </div>
    </div>`;
  }

  // A long goal's select of regions, and the bosses of the region picked on the page.
  private regions(view: RegionView) {
    return html`<er-goal-regions
      .groups=${view.groups}
      .label=${view.label}
      .count=${view.count}
      .toDo=${view.toDo}
      .defeated=${view.defeated}
    ></er-goal-regions>`;
  }

  // A long goal's chips under the strip, each region's short name and count, and the sheet they open over the panel.
  private chips(view: RegionView) {
    const chips: GoalChip[] = view.groups.flatMap(({ regions }) =>
      regions.map(({ code, name, done, of }) => ({
        code,
        name,
        short: view.data.shortRegionName(code),
        done,
        of,
      }))
    );
    return html`<er-goal-chips
      .chips=${chips}
      .picked=${view.region}
      .label=${view.label}
      .count=${view.count}
      .toDo=${view.toDo}
      .defeated=${view.defeated}
      .defeatedOf=${view.tally}
      .sheetUnder=${this.parentElement ?? undefined}
    ></er-goal-chips>`;
  }

  // Once the goal's achieved, its band, and every row among what's obtained, those still leaving included.
  private band(rows: GoalRows, data: EldenRingData) {
    return html`<er-goal-band
        .release=${this.release?.value ?? "unknown"}
        .say=${this.live?.value === true ? this.say : undefined}
      ></er-goal-band>
      ${this.obtained([...rows.obtained, ...rows.toDo], data)}`;
  }

  // The rows still to do, those leaving among them, then what's obtained.
  private toDo(rows: GoalRows, data: EldenRingData) {
    return html`<ul>
        ${repeat(
          rows.toDo,
          (key) => key,
          (key) => this.row(key, data, rows.leaving.includes(key))
        )}
      </ul>
      ${this.obtained(rows.obtained, data)}`;
  }

  // What's been obtained, folded away, the latest last; nothing when there's none.
  private obtained(keys: readonly string[], data: EldenRingData) {
    return keys.length === 0
      ? nothing
      : html`<details>
          <summary class="band-heading">Done <span class="fig">${keys.length}</span></summary>
          <ul>
            ${repeat(
              keys,
              (key) => key,
              (key) => this.row(key, data, false)
            )}
          </ul>
        </details>`;
  }

  private row(key: string, data: EldenRingData, isLeaving: boolean) {
    const view = this.views.get(key);
    if (view === undefined) {
      return nothing;
    }
    const delay = isLeaving ? (this.delays.get(key) ?? 0) : 0;
    const [icon, label, line] =
      view.kind === "need"
        ? [
            data.needIcon(view.need),
            needName(view.need, data),
            needLine(view.need, view.isGotten, this.ownFinds),
          ]
        : [data.bossIcon(view.boss.flag), bossName(view.boss), bossLine(view.boss)];
    return html`<li>
      <er-goal-row
        ?data-gotten=${view.isGotten}
        ?data-leaving=${isLeaving}
        style=${delay > 0 ? `--er-goal-row-delay: ${delay}ms` : nothing}
        .icon=${iconUrl(icon)}
        .label=${label}
        .line=${line}
      ></er-goal-row>
    </li>`;
  }
}

customElements.define("er-goal-menu", ErGoalMenu);

declare global {
  interface HTMLElementTagNameMap {
    "er-goal-menu": ErGoalMenu;
  }
}
