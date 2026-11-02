/**
 * ─ Region picker ─
 *
 * Regions in their groups behind a button: the Lands Between's, the
 * underground and the legacy dungeons, then the Realm of Shadow's. Each shows
 * how it stands and a count of what's done in it, as the one who holds the
 * picker counts: key checks in the panel, bosses in the goal menu. The list is
 * a native popover, so Escape or a click outside closes it, and it opens under
 * what holds the picker, as wide as it, and no lower than the screen's foot,
 * and stays there while the window changes size. The button is a quiet "All
 * regions", a region's name as a heading shows it, or a select that names the
 * region picked and its count.
 */

import { LitElement, css, html, nothing } from "lit";
import { bandRowStyles } from "../atoms/band.js";
import { narrow } from "../atoms/layout.js";
import { buttonStyles } from "../atoms/button.js";
import { figures } from "../atoms/figures.js";
import { focusRing } from "../atoms/focus.js";
import { bandHeadingStyles } from "../atoms/heading.js";
import { popoverStyles } from "../atoms/popover.js";
import { swatchStyles } from "../atoms/swatch.js";
import { chevronIcon } from "../utils/chevron-icon.js";
import { emit } from "../utils/emit.js";
import { figure } from "../utils/figure.js";
import { placeBelow, PopoverFollower } from "../utils/popover.js";
import type { PickerGroup, PickerRegion } from "../utils/region-groups.js";

/** How the picker's button looks: a quiet button, a region's name as a heading shows it, or a select naming the region picked and its count. */
export type PickerLook = "button" | "title" | "select";

/**
 * The button and the list of regions it opens.
 *
 * @fires er-region - A region was picked; `detail` is its code.
 */
export class ErRegionPicker extends LitElement {
  static override properties = {
    groups: { attribute: false },
    label: { attribute: false },
    count: { attribute: false },
    look: { attribute: false },
  };

  static override styles = [
    bandHeadingStyles,
    bandRowStyles,
    buttonStyles,
    figures,
    focusRing,
    popoverStyles,
    swatchStyles,
    css`
      :host {
        display: block;
      }
      .button {
        min-height: 40px;
        white-space: nowrap;
      }
      .title {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 44px;
        padding: 0;
        background: none;
        border: none;
        color: var(--er-ink-bright);
        font: inherit;
        font-weight: 600;
        font-size: 1.45em;
        line-height: 1.1;
        text-align: left;
        cursor: pointer;
      }
      .title svg,
      .select svg {
        flex-shrink: 0;
        width: 10px;
        height: 10px;
        color: var(--er-ink-muted);
      }
      .title svg {
        margin-top: 3px;
      }
      /* The select fills its row: the region's name, its count, then the chevron. */
      .select {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        min-height: 40px;
        text-align: left;
      }
      .select .name {
        font-weight: 600;
      }
      /* As wide as what it's placed under, and kept above the screen's foot. */
      .popover {
        left: var(--left, 16px);
        right: var(--right, 16px);
        max-height: min(520px, 70vh, calc(100dvh - var(--top, 64px) - 12px));
        padding: 6px 0 10px;
      }
      h3 {
        margin: 8px 60px 4px 0;
        padding: 5px 16px;
        font-size: 1.05em;
      }
      ul {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 2px 8px;
        margin: 0;
        padding: 0 8px;
        list-style: none;
      }
      /* Under a select, as narrow as a column, one region to a line. */
      .popover[data-look="select"] ul {
        grid-template-columns: minmax(0, 1fr);
      }
      /* At a tablet's width and below, each region is at least 44 px, for a finger. */
      @media ${narrow} {
        :host .region {
          min-height: 44px;
        }
      }
      .region {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        min-height: 36px;
        padding: 4px 8px;
        background: transparent;
        border: none;
        color: var(--er-ink);
        font: inherit;
        font-size: 0.9em;
        text-align: left;
        cursor: pointer;
      }
      .swatch {
        width: 9px;
        height: 9px;
      }
      .name {
        flex-grow: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .count {
        font-size: 0.9em;
        color: var(--er-ink-muted);
      }
    `,
  ];

  groups: readonly PickerGroup[] = [];
  /** What the button says. */
  label = "All regions";
  /** What the select counts in the region picked, beside its name, such as "2/9". */
  count: string | undefined;
  look: PickerLook = "button";
  // Follows the window's size while the list is open, as what holds the picker moves with it.
  private readonly follower = new PopoverFollower(this);

  override render() {
    return html`${this.button()}
      <div
        id="regions"
        class="popover"
        popover
        data-look=${this.look}
        @beforetoggle=${this.toggling}
      >
        ${this.groups.map(({ title, regions }) =>
          regions.length === 0
            ? nothing
            : html`<h3 class="band-heading">${title}</h3>
                <ul>
                  ${regions.map((region) => this.region(region))}
                </ul>`
        )}
      </div>`;
  }

  // It watches the page as well as what holds the picker: the panel keeps its width as the window
  // changes, so what holds the picker moves with no change of size of its own.
  private readonly toggling = (event: ToggleEvent): void => {
    this.follower.stop();
    const anchor = this.parentElement ?? this.renderRoot.querySelector("button");
    if (event.newState !== "open" || anchor === null) {
      return;
    }
    const list = event.target as HTMLElement;
    this.follower.follow(() => placeBelow(list, anchor), document.documentElement, anchor);
  };

  private button() {
    switch (this.look) {
      case "title":
        return html`<button class="title" popovertarget="regions">
          ${this.label} ${chevronIcon}
        </button>`;
      case "select":
        return html`<button class="button select" popovertarget="regions">
          <span class="name">${this.label}</span>
          ${this.count === undefined ? nothing : html`<span class="count fig">${this.count}</span>`}
          ${chevronIcon}
        </button>`;
      default:
        return html`<button class="button" data-tone="quiet" popovertarget="regions">
          ${this.label}
        </button>`;
    }
  }

  private region({ code, name, state, done, of, what }: PickerRegion) {
    return html`<li>
      <button
        class="region band-row"
        aria-label=${`${name}: ${figure(done)} of ${figure(of)} ${what}`}
        @click=${() => {
          this.renderRoot.querySelector<HTMLElement>("[popover]")?.hidePopover();
          emit<string>(this, "er-region", code);
        }}
      >
        <span class="swatch" data-state=${state}></span>
        <span class="name">${name}</span>
        <span class="count fig">${figure(done)}/${figure(of)}</span>
      </button>
    </li>`;
  }
}

customElements.define("er-region-picker", ErRegionPicker);

declare global {
  interface HTMLElementTagNameMap {
    "er-region-picker": ErRegionPicker;
  }
}
