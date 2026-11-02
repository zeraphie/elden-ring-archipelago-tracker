/**
 * ─ Settings ─
 *
 * Everything that can be set, in a panel laid over the right-hand panel at its
 * size, its title between gold rules and a cross to close it. Each section has
 * a band heading and a gold rule under it, and nothing folds. Map checks is how
 * checks look in the map's tooltip: a row for each look, showing it on a sample
 * check, the one chosen banded. Timer is a checkbox on its heading, and its
 * options show once it's ticked, each style with the preview slotted for it,
 * the one chosen banded. The panel stays in the page while it's closed,
 * so it can fade in and out. At a tablet's width and below the title's smaller
 * and to the left, its rules go, and the rows sit side by side.
 */

import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { shallow } from "zustand/vanilla/shallow";
import { SETTINGS, type Look, type SettingsState } from "../../../state/settings.js";
import { buttonStyles } from "../../atoms/button.js";
import { diamondStyles } from "../../atoms/diamond.js";
import { focusRing } from "../../atoms/focus.js";
import { panelTitleStyles } from "../../atoms/heading.js";
import { narrow } from "../../atoms/layout.js";
import { scrollerStyles } from "../../atoms/scroller.js";
import { checkTip, checkTipStyles, type TipSpot } from "../../molecules/check-row.js";
import { closeIcon } from "../../utils/close-icon.js";
import { emit } from "../../utils/emit.js";
import { StoreController } from "../../utils/store-controller.js";

// Each look, as its row names it.
const LOOKS: readonly (readonly [Look, string])[] = [
  ["compact", "Compact"],
  ["comfort", "Comfort"],
];

// What each look is shown on: made up here, so it's no room's and gives nothing away.
const SAMPLE: TipSpot = {
  row: {
    id: 0,
    name: { place: "By the Church of Elleh", encounter: "Tree Sentinel" },
    copy: undefined,
    vanilla: "Golden Halberd",
    isKey: true,
    state: "collected",
    finding: undefined,
  },
  findings: [{ item: "Margit's Shackle", to: undefined }],
};

/**
 * The settings panel, over the right-hand panel.
 *
 * @fires er-settings - The cross was pressed; `detail` is undefined.
 * @slot compact - What shows the timer's Compact style, under its radio.
 * @slot comfort - What shows the timer's Comfort style, under its radio.
 */
export class ErSettings extends LitElement {
  static override properties = { open: { type: Boolean, reflect: true } };

  static override styles = [
    buttonStyles,
    checkTipStyles,
    diamondStyles,
    focusRing,
    panelTitleStyles,
    scrollerStyles,
    css`
      :host {
        position: absolute;
        z-index: 3;
        inset: 0;
        display: flex;
        flex-direction: column;
        background: var(--er-panel);
        opacity: 0;
        visibility: hidden;
        transition:
          opacity 0.22s ease,
          visibility 0s linear 0.22s;
      }
      :host([open]) {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.22s ease;
      }
      @media (prefers-reduced-motion: reduce) {
        :host,
        :host([open]) {
          transition: none;
        }
      }
      .head {
        position: relative;
        flex-shrink: 0;
        padding: 18px 16px 14px;
        border-bottom: 1px solid var(--er-panel-divider);
        text-align: center;
      }
      .panel-title + .rule {
        margin-bottom: 0;
      }
      .close {
        position: absolute;
        top: 8px;
        right: 8px;
      }
      .scroller {
        flex-grow: 1;
        min-height: 0;
      }
      .scroller .rule {
        margin: 14px 8%;
      }
      h3 {
        margin: 0;
        padding: 7px 16px;
        font-size: 1.15em;
      }
      .look {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
        padding: 10px 16px 14px;
        border-bottom: 1px solid var(--er-panel-divider);
        cursor: pointer;
      }
      .choice {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
      }
      /* The section's own checkbox, on its heading's right. */
      .on-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        cursor: pointer;
      }
      .splits {
        min-height: 44px;
        box-sizing: border-box;
        padding: 0 16px;
        border-bottom: 1px solid var(--er-panel-divider);
        cursor: pointer;
      }
      .local {
        margin: 0;
        padding: 10px 16px 0;
        font-size: 0.92em;
        color: var(--er-ink-soft);
      }
      @media ${narrow} {
        .head {
          padding: 12px 16px;
          text-align: left;
        }
        .head .rule {
          display: none;
        }
        .panel-title {
          margin: 0;
          font-size: 1.45em;
        }
        .close {
          top: 4px;
        }
        .looks {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `,
  ];

  /** Whether the panel shows. */
  open = false;
  private readonly look = new StoreController(
    this,
    SETTINGS,
    ({ checkLook }: SettingsState) => checkLook
  );
  private readonly timer = new StoreController(this, SETTINGS, timerOf, shallow);

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("open") && this.open) {
      this.renderRoot.querySelector<HTMLElement>(".close")?.focus();
    }
  }

  override render() {
    return html`<div class="head">
        <div class="rule" aria-hidden="true"></div>
        <h2 class="panel-title">Settings</h2>
        <div class="rule" aria-hidden="true"></div>
        <button
          class="button close"
          data-tone="quiet"
          data-size="small"
          data-shape="icon"
          aria-label="Close settings"
          @click=${() => emit(this, "er-settings", undefined)}
        >
          ${closeIcon}
        </button>
      </div>
      <div class="scroller">
        <h3 id="checks" class="band-heading">Map checks</h3>
        <div class="looks" role="radiogroup" aria-labelledby="checks">
          ${LOOKS.map(
            ([look, name]) =>
              html`<label class="look band-row ring-within">
                <span class="choice">
                  <input
                    class="diamond"
                    type="radio"
                    name="check-look"
                    .checked=${look === this.look.value}
                    @change=${() => SETTINGS.getState().setCheckLook(look)}
                  />
                  ${name}
                </span>
                ${checkTip([SAMPLE], look)}
              </label>`
          )}
        </div>
        <div class="rule" aria-hidden="true"></div>
        ${this.timerSection()}
        <div class="rule" aria-hidden="true"></div>
      </div>`;
  }

  private timerSection() {
    const { isTimerOn, hasSplits, timerLook } = this.timer.value;
    const { setTimerOn, setHasSplits, setTimerLook } = SETTINGS.getState();
    return html`<h3 class="band-heading">
        <label class="on-heading ring-within">
          <span id="timer">Timer</span>
          <input
            class="diamond"
            type="checkbox"
            .checked=${isTimerOn}
            @change=${(event: Event) => setTimerOn(isTicked(event))}
          />
        </label>
      </h3>
      ${
        isTimerOn
          ? html`<label class="choice splits ring-within">
                <input
                  class="diamond"
                  type="checkbox"
                  .checked=${hasSplits}
                  @change=${(event: Event) => setHasSplits(isTicked(event))}
                />
                Enable splits
              </label>
              <div class="looks" role="radiogroup" aria-labelledby="timer">
                ${LOOKS.map(
                  ([look, name]) =>
                    html`<label class="look band-row ring-within">
                      <span class="choice">
                        <input
                          class="diamond"
                          type="radio"
                          name="timer-look"
                          .checked=${look === timerLook}
                          @change=${() => setTimerLook(look)}
                        />
                        ${name}
                      </span>
                      <slot name=${look}></slot>
                    </label>`
                )}
              </div>
              <p class="local">Times are local only</p>`
          : nothing
      }`;
  }
}

function timerOf({ isTimerOn, hasSplits, timerLook }: SettingsState) {
  return { isTimerOn, hasSplits, timerLook };
}

function isTicked({ target }: Event): boolean {
  return (target as HTMLInputElement).checked;
}

customElements.define("er-settings", ErSettings);

declare global {
  interface HTMLElementTagNameMap {
    "er-settings": ErSettings;
  }
}
