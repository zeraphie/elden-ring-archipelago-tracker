/**
 * ─ Version notice ─
 *
 * A band across the top of the map when the room runs on an Archipelago newer
 * than the release the tracker is tested against. It says what differs and
 * what it might mean, and once closed it stays closed for that room until the
 * page next opens.
 */

import { LitElement, css, html, nothing } from "lit";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { versionNoticesOf, type VersionNotice } from "../../../state/utils/version-notice.js";
import { buttonStyles } from "../../atoms/button.js";
import { narrow } from "../../atoms/layout.js";
import { focusRing } from "../../atoms/focus.js";
import { closeIcon } from "../../utils/close-icon.js";
import { StoreController } from "../../utils/store-controller.js";
import { noticeLine } from "./version-words.js";

// Two lists of notices are the same when they say the same.
const isSame = (a: readonly VersionNotice[], b: readonly VersionNotice[]): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

/**
 * What the room has that the tracker isn't sure of, over the map, until closed.
 */
export class ErVersionNotice extends LitElement {
  static override properties = {
    store: { attribute: false },
    tracker: { attribute: false },
    coveredLeft: { attribute: false },
    isClosed: { state: true },
  };

  static override styles = [
    buttonStyles,
    focusRing,
    css`
      :host {
        display: block;
        pointer-events: none;
      }
      /* In the middle of the map clear of the goal menu where there's room, and over the menu where there isn't. */
      .band {
        --width: min(560px, calc(100% - 32px));
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 6px;
        box-sizing: border-box;
        width: var(--width);
        margin-left: max(
          16px,
          min(
            calc(var(--covered-left) + (100% - var(--covered-left) - var(--width)) / 2),
            calc(100% - var(--width) - 16px)
          )
        );
        padding: 10px 56px 10px 20px;
        background: var(--er-scrim);
        border-top: 1px solid var(--er-gold-edge);
        border-bottom: 1px solid var(--er-gold-edge);
        pointer-events: auto;
      }
      p {
        margin: 0;
        font-size: 0.95em;
        color: var(--er-ink);
      }
      /* At a tablet's width and below, the close button is at least 44 px, for a finger. */
      @media ${narrow} {
        :host .button {
          top: 4px;
          right: 4px;
          width: 44px;
          min-height: 44px;
        }
      }
      .button {
        position: absolute;
        top: 6px;
        right: 8px;
        width: 36px;
        min-height: 36px;
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The tracker's own version, which names the Archipelago release it's tested against. */
  tracker = "";
  /** How much of the map's left the goal menu covers, in CSS pixels, so the band centres in the rest. */
  coveredLeft = 0;
  private isClosed = false;
  private notices: StoreController<TrackerState, VersionNotice[]> | undefined;
  private watched: TrackerStore | undefined;

  // A new room is watched afresh, and its notice shows again.
  protected override willUpdate(): void {
    const { store } = this;
    if (store !== undefined && store !== this.watched) {
      if (this.notices !== undefined) {
        this.notices.hostDisconnected();
        this.removeController(this.notices);
      }
      this.watched = store;
      this.isClosed = false;
      this.notices = new StoreController(
        this,
        store,
        (state: TrackerState) => versionNoticesOf(state, this.tracker),
        isSame
      );
    }
  }

  override render() {
    const notices = this.notices?.value ?? [];
    if (this.isClosed || notices.length === 0) {
      return nothing;
    }
    return html`<div class="band" role="status" style=${`--covered-left: ${this.coveredLeft}px`}>
      ${notices.map((notice) => html`<p>${noticeLine(notice)}</p>`)}
      <button
        class="button"
        data-tone="quiet"
        data-shape="icon"
        aria-label="Dismiss"
        @click=${() => {
          this.isClosed = true;
        }}
      >
        ${closeIcon}
      </button>
    </div>`;
  }
}

customElements.define("er-version-notice", ErVersionNotice);

declare global {
  interface HTMLElementTagNameMap {
    "er-version-notice": ErVersionNotice;
  }
}
