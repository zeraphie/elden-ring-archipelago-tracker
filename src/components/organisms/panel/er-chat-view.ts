/**
 * ─ Chat view ─
 *
 * The panel's Chat tab: the room's chat, this slot's commands and their
 * replies, every hint that concerns it, and the room's events, newest at the
 * bottom, each with how long ago the tracker saw it. The list stays at the
 * bottom as lines come, unless it's been scrolled up to read, when a button
 * takes it back. Under it, the input sends a chat line or a command such as
 * !hint, with the hints available over it, and a !hint begun lists the items
 * it can name, to pick from with the arrow keys and Enter, or a press; Escape
 * shuts the list. From a tracker link, which has no websocket, a note says
 * where to open the tracker to send.
 */

import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { shallow } from "zustand/vanilla/shallow";
import { ELDEN_RING } from "../../../archipelago/look-up.js";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { HINT_COMMAND, hintItemsOf, hintMatches } from "../../../state/utils/hint-items.js";
import { buttonStyles } from "../../atoms/button.js";
import { fieldStyles } from "../../atoms/field.js";
import { focusRing } from "../../atoms/focus.js";
import { scrollerStyles } from "../../atoms/scroller.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import "../../molecules/er-ago.js";
import "../../molecules/er-to-bottom.js";
import { checkLine } from "../../utils/check-words.js";
import { playerName, UNNAMED_ITEM } from "../../utils/item-words.js";
import { StickToBottom } from "../../utils/stick-to-bottom.js";
import { StoreController } from "../../utils/store-controller.js";
import { chatLines, type ChatLine, type ChatNames } from "./chat-lines.js";
import { hintLine, SPEAKERS } from "./chat-words.js";
import { HINT_LIST, hintList, hintListStyles, hintRowId } from "./hint-list.js";

/**
 * The chat log and its input.
 */
export class ErChatView extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    say: { attribute: false },
    draft: { state: true },
    hintRow: { state: true },
    isHintListShut: { state: true },
  };

  static override styles = [
    buttonStyles,
    fieldStyles,
    focusRing,
    scrollerStyles,
    visuallyHidden,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 0;
      }
      /* Clear of whatever lies over the list's right edge, such as the rail of tabs under the map. */
      .scroller {
        margin: 0;
        padding: 6px var(--er-panel-clear, 0px) 6px 0;
        list-style: none;
      }
      li {
        padding: 7px 16px;
        border-bottom: 1px solid var(--er-panel-divider);
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .who {
        font-size: 0.8em;
        letter-spacing: 0.04em;
        color: var(--er-ink-muted);
      }
      er-ago {
        flex-shrink: 0;
        font-size: 0.78em;
        color: var(--er-ink-muted);
      }
      /* A message keeps its own line breaks and indents, as the room's log shows them, and
         wraps where it's too long for the panel. */
      .text {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--er-ink-soft);
      }
      li[data-kind="chat"] .who,
      li[data-kind="command"] .who {
        color: var(--er-chat-name);
      }
      li[data-kind="chat"] .text {
        color: var(--er-ink);
      }
      li[data-kind="hint"] .who,
      li[data-kind="hint"] .text {
        color: var(--er-gold);
      }
      /* The server's own lines are dimmed under the players': its replies upright, its room events
         in italics. */
      li[data-kind="reply"] .text,
      li[data-kind="room"] .text {
        color: var(--er-ink-muted);
      }
      li[data-kind="room"] .text {
        font-style: italic;
      }
      .empty {
        border: none;
        color: var(--er-ink-muted);
      }
      form,
      .note {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin: 0;
        padding: 12px 16px 14px;
        border-top: 1px solid var(--er-divider);
        background: var(--er-surface);
        font-size: 0.92em;
      }
      .note {
        color: var(--er-ink-soft);
      }
      .label {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 0.92em;
        color: var(--er-ink-muted);
      }
      .send {
        display: flex;
        gap: 8px;
      }
      .field {
        flex-grow: 1;
        min-width: 0;
        min-height: 40px;
      }
      .button {
        min-height: 40px;
      }
      /* It gives up all its room before the hint list gives up any. */
      .scroller-frame {
        flex-basis: 0;
      }
    `,
    hintListStyles,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  /** Says something to the room. */
  say: (text: string) => void = () => {};
  private draft = "";
  // Which row of the hint list is picked, and whether Escape has shut it for this draft.
  private hintRow = 0;
  private isHintListShut = false;
  private watch: StoreController<TrackerState, unknown[]> | undefined;
  private readonly stick = new StickToBottom(this, () =>
    this.renderRoot.querySelector(".scroller")
  );

  protected override willUpdate(): void {
    const { store } = this;
    if (store !== undefined && this.watch === undefined) {
      this.watch = new StoreController(
        this,
        store,
        (state): unknown[] => [
          state.log,
          state.players,
          state.roster,
          state.packages,
          state.slot,
          state.hintPoints,
          state.hintCost,
          state.connection,
          state.received,
          state.checked,
        ],
        shallow
      );
    }
  }

  protected override updated(changed: PropertyValues): void {
    if (changed.has("hintRow")) {
      this.renderRoot
        .querySelector('.hint[aria-current="true"]')
        ?.scrollIntoView({ block: "nearest" });
    }
  }

  override render() {
    const state = this.store?.getState();
    const { data } = this;
    if (state === undefined || data === undefined) {
      return nothing;
    }
    const lines = chatLines(state.log, namesOf(state, data));
    return html`<div class="scroller-frame">
        <ul class="scroller" aria-label="Chat">
          ${lines.length === 0 ? html`<li class="empty">Nothing said yet.</li>` : nothing}
          ${lines.map((line) => this.line(line))}
        </ul>
        ${
          this.stick.isAway
            ? html`<er-to-bottom @er-to-bottom=${() => this.stick.toBottom()}></er-to-bottom>`
            : nothing
        }
      </div>
      ${state.link.kind === "tracker" ? this.trackerNote() : this.input(state)}`;
  }

  private line({ kind, who, text, at }: ChatLine) {
    return html`<li data-kind=${kind}>
      <div class="top">
        <span class="who">${kind === "chat" || kind === "command" ? who : SPEAKERS[kind]}</span>
        <er-ago .at=${at}></er-ago>
      </div>
      <div class="text">${text}</div>
    </li>`;
  }

  private input(state: TrackerState) {
    const isLive = state.connection.phase === "connected";
    const points = hintLine(state.hintPoints, state.hintCost);
    const rows = this.hintRows(state);
    const hasRows = rows.length > 0;
    return html`${hasRows ? hintList(rows, this.hintRow, this.pickHint) : nothing}
      <form @submit=${this.send}>
        <label class="sr" for="say">Chat, or a command such as !hint</label>
        ${points === undefined ? nothing : html`<span class="label">${points}</span>`}
        <div class="send">
          <input
            id="say"
            class="field"
            type="text"
            role="combobox"
            autocomplete="off"
            aria-autocomplete="list"
            aria-expanded=${String(hasRows)}
            aria-controls=${HINT_LIST}
            aria-activedescendant=${hasRows ? hintRowId(this.hintRow) : nothing}
            placeholder="!hint Dectus Medallion (Right)"
            .value=${this.draft}
            @input=${(event: Event) => {
              this.draft = (event.target as HTMLInputElement).value;
              this.hintRow = 0;
              this.isHintListShut = false;
            }}
            @keydown=${this.moveInHints}
          />
          <button class="button" type="submit" ?disabled=${!isLive}>Send</button>
        </div>
        ${isLive ? nothing : html`<span class="label">Sending waits for the room to connect.</span>`}
      </form>`;
  }

  private trackerNote() {
    return html`<p class="note" role="note">
      Chat and !hint need the live connection, which only the room's page leads to. Open the tracker
      from the room's URL to send them.
    </p>`;
  }

  private hintRows(state: TrackerState): readonly string[] {
    return this.data === undefined || this.isHintListShut
      ? []
      : hintMatches(this.draft, hintItemsOf(this.data, state));
  }

  // The list's keys, while it's open: the arrows move the row picked, Enter takes it, and Escape shuts the list.
  private readonly moveInHints = (event: KeyboardEvent): void => {
    const state = this.store?.getState();
    const rows = state === undefined ? [] : this.hintRows(state);
    if (rows.length === 0) {
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        this.hintRow = (this.hintRow + 1) % rows.length;
        break;
      case "ArrowUp":
        this.hintRow = (this.hintRow + rows.length - 1) % rows.length;
        break;
      case "Enter":
        this.pickHint(rows[this.hintRow] ?? "");
        break;
      case "Escape":
        this.isHintListShut = true;
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  private readonly pickHint = (item: string): void => {
    this.draft = `${HINT_COMMAND}${item}`;
    this.hintRow = 0;
  };

  private readonly send = (event: SubmitEvent): void => {
    event.preventDefault();
    const text = this.draft.trim();
    if (text === "" || this.store?.getState().connection.phase !== "connected") {
      return;
    }
    this.say(text);
    this.draft = "";
    this.hintRow = 0;
    this.isHintListShut = false;
  };
}

// How the log's ids are named from what the store knows: players by the room's list, items and
// locations by their game's data package, and an Elden Ring location by its full name.
function namesOf(state: TrackerState, data: EldenRingData): ChatNames {
  const gameOf = (slot: number) =>
    state.roster.find((entry) => entry.team === state.team && entry.slot === slot)?.game;
  return {
    slot: state.slot,
    player: (slot) => {
      const known = state.players.find((each) => each.team === state.team && each.slot === slot);
      const listed = state.roster.find((entry) => entry.team === state.team && entry.slot === slot);
      return playerName({ slot, name: known?.alias ?? listed?.name });
    },
    item: (id, owner) => {
      const game = gameOf(owner);
      return (
        (game === undefined ? undefined : state.packages.get(game)?.itemNames.get(id)) ??
        UNNAMED_ITEM
      );
    },
    location: (id, owner) => {
      const game = gameOf(owner);
      const name = game === undefined ? undefined : state.packages.get(game)?.locationNames.get(id);
      if (name === undefined) {
        return String(id);
      }
      return game === ELDEN_RING ? checkLine(data.checkName(name)) : name;
    },
  };
}

customElements.define("er-chat-view", ErChatView);

declare global {
  interface HTMLElementTagNameMap {
    "er-chat-view": ErChatView;
  }
}
