/**
 * ─ Goal chips ─
 *
 * A long goal at the map's foot on a phone or a tablet: the bosses defeated
 * out of all, over a row of chips, one for each region holding a goal boss,
 * its short name over its count, scrolling sideways. The chip of the page's
 * picked region is lit. A chip picks its region on the page and opens a sheet
 * over the panel with that region's bosses; Escape, a tap outside or its
 * close button shuts it.
 */

import { LitElement, css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { buttonStyles } from "../../atoms/button.js";
import { figures } from "../../atoms/figures.js";
import { focusRing } from "../../atoms/focus.js";
import { popoverStyles } from "../../atoms/popover.js";
import { closeIcon } from "../../utils/close-icon.js";
import { emit } from "../../utils/emit.js";
import { figure } from "../../utils/figure.js";
import { placeUnder } from "../../utils/popover.js";
import "./er-region-bosses.js";
import type { RegionBossRow } from "./er-region-bosses.js";
import { StripScroll } from "./strip-scroll.js";

/** A region's chip: its code, its names, and its bosses defeated out of all. */
export interface GoalChip {
  readonly code: string;
  readonly name: string;
  readonly short: string;
  readonly done: number;
  readonly of: number;
}

/**
 * The tally, the region chips, and the sheet a chip opens.
 *
 * @fires er-region - A chip was picked; `detail` is its region's code.
 */
export class ErGoalChips extends LitElement {
  static override properties = {
    chips: { attribute: false },
    picked: { attribute: false },
    label: { attribute: false },
    count: { attribute: false },
    toDo: { attribute: false },
    defeated: { attribute: false },
    defeatedOf: { attribute: false },
    sheetUnder: { attribute: false },
  };

  static override styles = [
    buttonStyles,
    figures,
    focusRing,
    popoverStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
      }
      .tally {
        margin: 0;
        font-size: 0.9em;
        color: var(--er-ink-muted);
        text-shadow: var(--er-map-text-shadow);
      }
      .tally .label {
        font-weight: 600;
        color: var(--er-ink-heading);
      }
      .chips {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
      }
      .chips[data-scrolls] {
        cursor: grab;
      }
      .chips[data-dragging] {
        cursor: grabbing;
      }
      .chip {
        flex-shrink: 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 1px;
        padding: 4px 10px;
        line-height: 1.1;
        text-align: left;
        white-space: nowrap;
      }
      .chip .count {
        font-size: 0.8em;
        color: var(--er-ink-muted);
      }
      /* Over the panel, from the map's foot to the screen's, rather than a popover's own fit to its contents. */
      .sheet {
        left: 0;
        right: 0;
        bottom: 0;
        width: auto;
        height: auto;
        padding: 0 0 16px;
        border-width: 1px 0 0;
        border-top-color: var(--er-edge);
        --er-region-bosses-inset: 16px;
      }
      .head {
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;
        padding: 6px 6px 6px 16px;
        background: var(--er-overlay);
        border-bottom: 1px solid var(--er-divider);
      }
      .head h3 {
        flex-grow: 1;
        min-width: 0;
        margin: 0;
        font-size: 1.15em;
        color: var(--er-ink-heading);
      }
      .head .count {
        color: var(--er-ink-muted);
      }
    `,
  ];

  chips: readonly GoalChip[] = [];
  /** The page's picked region, by code. */
  picked: string | undefined;
  /** The picked region's name, which heads the sheet. */
  label = "";
  /** Its bosses defeated out of all, such as "2/9"; undefined where it holds none. */
  count: string | undefined;
  toDo: readonly RegionBossRow[] = [];
  defeated: readonly RegionBossRow[] = [];
  /** The goal's bosses defeated, out of all. */
  defeatedOf = { defeated: 0, of: 0 };
  /** What the sheet opens under: the map, so it lies over the panel. */
  sheetUnder: Element | undefined;
  // The chips scroll sideways with a mouse too, as a finger swipes them.
  private readonly strip = new StripScroll(() => true);

  override render() {
    const { strip } = this;
    const { defeated, of } = this.defeatedOf;
    return html`<p class="tally">
        <span class="label">Bosses</span>
        <span class="fig">${figure(defeated)}</span>/<span class="fig">${figure(of)}</span>
      </p>
      <div
        class="chips"
        role="group"
        aria-label="Regions with goal bosses"
        @pointerenter=${strip.enter}
        @wheel=${strip.wheel}
        @pointerdown=${strip.down}
        @pointermove=${strip.move}
        @pointerup=${strip.up}
        @pointercancel=${strip.up}
      >
        ${repeat(
          this.chips,
          ({ code }) => code,
          ({ code, name, short, done, of: all }) =>
            html`<button
              class="button chip"
              data-tone="overlay"
              aria-pressed=${String(code === this.picked)}
              aria-label=${`${name}: ${figure(done)} of ${figure(all)} bosses defeated`}
              @click=${() => this.open(code)}
            >
              <span>${short}</span>
              <span class="count fig">${figure(done)}/${figure(all)}</span>
            </button>`
        )}
      </div>
      <div
        id="sheet"
        class="popover sheet"
        popover
        role="dialog"
        aria-label=${this.label}
        @beforetoggle=${(event: Event) => placeUnder(event, this.sheetUnder ?? this)}
      >
        <div class="head">
          <h3>${this.label}</h3>
          <span class="count fig">${this.count ?? ""}</span>
          <button
            class="button"
            data-tone="quiet"
            data-shape="icon"
            aria-label="Close"
            popovertarget="sheet"
            popovertargetaction="hide"
          >
            ${closeIcon}
          </button>
        </div>
        <er-region-bosses
          .toDo=${this.toDo}
          .defeated=${this.defeated}
          @er-drop=${this.closeSheet}
        ></er-region-bosses>
      </div>`;
  }

  // A boss opened goes to the panel the sheet lies over, so the sheet gets out of its way.
  private readonly closeSheet = (): void => {
    this.renderRoot.querySelector<HTMLElement>("#sheet")?.hidePopover();
  };

  // A chip picks its region on the page, and opens the sheet on it, at the top of its list.
  private open(code: string): void {
    emit<string>(this, "er-region", code);
    const sheet = this.renderRoot.querySelector<HTMLElement>("#sheet");
    if (sheet === null) {
      return;
    }
    if (!sheet.matches(":popover-open")) {
      sheet.showPopover();
    }
    sheet.scrollTop = 0;
  }
}

customElements.define("er-goal-chips", ErGoalChips);

declare global {
  interface HTMLElementTagNameMap {
    "er-goal-chips": ErGoalChips;
  }
}
