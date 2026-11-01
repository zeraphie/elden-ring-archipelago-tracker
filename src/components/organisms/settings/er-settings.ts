/**
 * ─ Settings ─
 *
 * Everything that can be set, in a panel laid over the right-hand panel at its
 * size, its title between gold rules and a cross to close it. For now that's
 * how checks look in the map's tooltip: a row for each look, showing it on a
 * sample check, the one chosen banded. The panel stays in the page while it's
 * closed, so it can fade in and out. At a tablet's width and below the title's
 * smaller and to the left, the rules go, and the rows sit side by side.
 */

import { LitElement, css, html, type PropertyValues } from "lit";
import { SETTINGS, type CheckLook, type SettingsState } from "../../../state/settings.js";
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
const LOOKS: readonly (readonly [CheckLook, string])[] = [
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
      @media ${narrow} {
        .head {
          padding: 12px 16px;
          text-align: left;
        }
        .rule {
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
        <h3 id="checks" class="band-heading">Checks on the map</h3>
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
      </div>`;
  }
}

customElements.define("er-settings", ErSettings);

declare global {
  interface HTMLElementTagNameMap {
    "er-settings": ErSettings;
  }
}
