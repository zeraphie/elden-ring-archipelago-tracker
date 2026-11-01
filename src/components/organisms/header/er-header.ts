/**
 * ─ Header ─
 *
 * The bar over the page. The tracker's name shortens as the bar narrows: the
 * full name, then "ER Archipelago Tracker", then "ERA Tracker", and a screen
 * reader always hears the full name. Once a room is open, beside it are how
 * the tracker is keeping up with the room, the slot's key checks and all its
 * checks done, the room's players, and the way to leave, which reloads the
 * page, so the card offers the room again or another. At a tablet's width and
 * below, how the tracker is keeping up and the key checks sit under a line.
 */

import { LitElement, css, html, nothing } from "lit";
import { shallow } from "zustand/vanilla/shallow";
import type { ConnectionPhase } from "../../../state/slices/connection.js";
import type { RosterEntry } from "../../../state/slices/roster.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { progressOf, type Progress } from "../../../state/utils/progress.js";
import { buttonStyles } from "../../atoms/button.js";
import { focusRing } from "../../atoms/focus.js";
import { narrow } from "../../atoms/layout.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import "./er-players.js";
import "./er-progress.js";
import { liveState } from "./header-words.js";
import { closeIcon } from "../../utils/close-icon.js";
import { StoreController } from "../../utils/store-controller.js";

// The room's players, and which of them this slot is, as the header reads them from the store.
interface Room {
  readonly roster: readonly RosterEntry[];
  readonly team: number | undefined;
  readonly slot: number | undefined;
}

/**
 * The bar over the page: the tracker's name, and the room it's open on.
 */
export class ErHeader extends LitElement {
  static override properties = { store: { attribute: false } };

  static override styles = [
    buttonStyles,
    focusRing,
    visuallyHidden,
    css`
      :host {
        display: block;
      }
      .leave {
        color: var(--er-ink);
      }
      .leave:hover {
        border-color: var(--er-gold-edge);
      }
      .leave-icon {
        display: none;
      }
      .bar {
        /* The bar's room, for the name to shorten in. */
        container: bar / inline-size;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 22px;
        padding: 10px 20px;
        background: var(--er-surface);
        border-bottom: 1px solid var(--er-divider);
      }
      .title {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 14px;
      }
      h1 {
        margin: 0;
        font-size: var(--er-name-size);
        font-weight: 600;
        letter-spacing: 0.02em;
        line-height: 1.2;
        color: var(--er-ink);
        white-space: nowrap;
      }
      .mid,
      .short {
        display: none;
      }
      /* Where the name and everything beside it stop fitting on one line, as the design found
         them: windows of 1380 and 1180 px, at the page's 16.5 px text. The query measures the
         bar inside its padding, so 40 px less. */
      @container bar (max-width: 81.25em) {
        .full {
          display: none;
        }
        .mid {
          display: inline;
        }
      }
      @container bar (max-width: 69.1em) {
        .mid {
          display: none;
        }
        .short {
          display: inline;
        }
      }
      .small {
        font-size: 0.9em;
      }
      .live {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--er-ink-soft);
      }
      .light {
        width: 8px;
        height: 8px;
        box-sizing: border-box;
        border: 1px solid var(--er-ink-muted);
        border-radius: 50%;
      }
      .live[data-kind="live"] {
        color: var(--er-live-ink);
      }
      .live[data-kind="live"] .light {
        background: var(--er-live);
        border-color: var(--er-live);
      }
      .live[data-kind="trouble"] {
        color: var(--er-error);
      }
      .live[data-kind="trouble"] .light {
        background: var(--er-error);
        border-color: var(--er-error);
      }
      a {
        color: var(--er-gold);
      }
      a:hover {
        color: var(--er-gold-bright);
      }
      .grow {
        flex-grow: 1;
      }
      /* At a tablet's width and below the header is closer set, and with a room open it's two rows:
         the name, the way to leave and the players, then under a line, how the tracker is keeping
         up and the key checks' count. */
      @media ${narrow} {
        .bar {
          flex-wrap: nowrap;
          gap: 12px;
          padding: 8px 12px;
        }
        .leave-word {
          display: none;
        }
        .leave-icon {
          display: inline-flex;
        }
        .title {
          flex-wrap: nowrap;
          gap: 10px;
        }
        .bar[data-room] {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 0 12px;
          padding-bottom: 0;
        }
        .bar[data-room]::before {
          content: "";
          grid-area: 2 / 1 / 3 / -1;
          height: 1px;
          margin: 8px -12px 0;
          background: var(--er-divider);
        }
        .bar[data-room] .title {
          display: contents;
        }
        .bar[data-room] .grow {
          display: none;
        }
        .bar[data-room] h1 {
          grid-area: 1 / 1;
        }
        .bar[data-room] .leave {
          grid-area: 1 / 2;
        }
        .bar[data-room] er-players {
          grid-area: 1 / 3;
        }
        .bar[data-room] .live,
        .bar[data-room] er-progress {
          grid-area: 3 / 1 / 4 / -1;
          padding: 7px 0;
        }
        .bar[data-room] .live {
          justify-self: start;
        }
        .bar[data-room] er-progress {
          justify-self: end;
        }
      }
    `,
  ];

  /** The room's store, once it's open; the name stands alone until then. */
  store: TrackerStore | undefined;
  private connection: StoreController<TrackerState, ConnectionPhase> | undefined;
  private progress: StoreController<TrackerState, Progress> | undefined;
  private room: StoreController<TrackerState, Room> | undefined;

  protected override willUpdate(): void {
    if (this.store !== undefined && this.connection === undefined) {
      this.connection = new StoreController(this, this.store, (state) => state.connection);
      this.progress = new StoreController<TrackerState, Progress>(
        this,
        this.store,
        progressOf,
        shallow
      );
      this.room = new StoreController(this, this.store, roomOf, shallow);
    }
  }

  override render() {
    return html`<header class="bar" ?data-room=${this.room !== undefined}>
      <div class="title">
        <h1>
          <span class="sr">Elden Ring Archipelago Tracker</span>
          <span class="full" aria-hidden="true">Elden Ring Archipelago Tracker</span>
          <span class="mid" aria-hidden="true">ER Archipelago Tracker</span>
          <span class="short" aria-hidden="true">ERA Tracker</span>
        </h1>
        ${this.connection === undefined ? nothing : this.live(this.connection.value)}
      </div>
      <er-progress .progress=${this.progress?.value}></er-progress>
      <div class="grow"></div>
      ${
        this.room === undefined || this.progress === undefined
          ? nothing
          : html`<button
                class="button leave"
                data-tone="quiet"
                data-size="small"
                aria-label="Disconnect"
                @click=${() => location.reload()}
              >
                <span class="leave-word">Disconnect</span
                ><span class="leave-icon">${closeIcon}</span>
              </button>
              <er-players
                .roster=${withMine(this.room.value, this.progress.value.allDone)}
                .mine=${this.room.value}
              ></er-players>`
      }
    </header>`;
  }

  private live(phase: ConnectionPhase) {
    const { kind, text, detail, page } = liveState(phase);
    return html`<span class="small live" data-kind=${kind} title=${detail ?? nothing}>
      <span class="light" aria-hidden="true"></span>
      <span
        >${text}${
          page === undefined
            ? nothing
            : html`, <a href=${page} target="_blank" rel="noopener noreferrer">reopen the room</a>`
        }</span
      >
      ${detail === undefined ? nothing : html`<span class="sr">${detail}</span>`}
    </span>`;
  }
}

function roomOf({ roster, team, slot }: TrackerState): Room {
  return { roster, team, slot };
}

// The roster with this slot's own checks as the login keeps them, fresher than the web API's.
function withMine({ roster, team, slot }: Room, checksDone: number): readonly RosterEntry[] {
  return roster.map((entry) =>
    entry.team === team && entry.slot === slot ? { ...entry, checksDone } : entry
  );
}

customElements.define("er-header", ErHeader);

declare global {
  interface HTMLElementTagNameMap {
    "er-header": ErHeader;
  }
}
