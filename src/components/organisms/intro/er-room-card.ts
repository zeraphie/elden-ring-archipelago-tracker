/**
 * ─ Room card ─
 *
 * The card under the mark before the curtain opens. A link is pasted and
 * looked up; a sleeping room gives its page to wake it; the slots are picked
 * from, with the password only when the room asks; then each part loads, and
 * a failure says what to do. It shows the way in as it stands, and hands
 * each press to it. Each phase brings the focus to its first control, and
 * the card eases to the height of whatever it holds next.
 */

import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import type { RoomLink } from "../../../archipelago/room-link.js";
import { APWORLD_RELEASE_PAGE, RULES_APWORLD } from "../../../data/rules/apworld.js";
import type { EntryPhase, EntryState, EntryStore } from "../../../state/entry.js";
import { buttonStyles } from "../../atoms/button.js";
import { dotStyles } from "../../atoms/dot.js";
import { fieldStyles } from "../../atoms/field.js";
import { figures } from "../../atoms/figures.js";
import { focusRing } from "../../atoms/focus.js";
import "./er-part-list.js";
import "./er-slot-list.js";
import type { SlotChoice } from "./er-slot-list.js";
import { ago } from "../../utils/ago.js";
import { entryProblemText, failureText, reducedTrackerNote } from "../../utils/entry-words.js";
import { StoreController } from "../../utils/store-controller.js";

// Testing locally only: a development build reads it from .env.development.local, and a built page has none.
const SAMPLE_ROOM = import.meta.env.DEV ? import.meta.env.VITE_SAMPLE_ROOM : undefined;

/**
 * The room's card, under the mark until the tracker is ready.
 */
export class ErRoomCard extends LitElement {
  static override properties = {
    entry: { attribute: false },
    url: { state: true },
    password: { state: true },
  };

  static override styles = [
    buttonStyles,
    dotStyles,
    fieldStyles,
    figures,
    focusRing,
    css`
      /* Under the mark: it stands at 36% of the window, as wide as min(72vw, 640px) and 0.16359
         of that tall, so its foot is half that below. The loader's own rules in index.html place
         its message there too. */
      :host {
        position: fixed;
        z-index: 1000;
        left: 50%;
        top: calc(36% + min(72vw, 640px) * 0.16359 / 2 + 36px);
        transform: translateX(-50%);
        width: min(31rem, calc(100% - 32px));
        max-height: calc(64% - min(72vw, 640px) * 0.16359 / 2 - 52px);
        overflow-y: auto;
      }
      /* As tall as its content, measured as it changes, so the height eases from one phase or
         part to the next rather than snapping. Before the first measure it takes its own. */
      .card {
        height: var(--content-height, auto);
        overflow: hidden;
        padding: 18px 22px 20px;
        background: var(--er-scrim);
        border-block: 1px solid var(--er-edge);
        outline: none;
        animation: card-in 320ms ease-out;
        transition: height 240ms ease-out;
      }
      .content {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      form,
      .stack {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .tight {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .inline {
        display: flex;
        gap: 8px;
      }
      .inline .field {
        flex-grow: 1;
      }
      .buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
      }
      .title {
        font-size: 1.08em;
        color: var(--er-ink-heading);
      }
      .name {
        font-size: 1.15em;
        color: var(--er-ink-bright);
      }
      .soft {
        color: var(--er-ink-soft);
      }
      .muted {
        color: var(--er-ink-muted);
      }
      .small {
        font-size: 0.9em;
      }
      .aside {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        color: var(--er-ink-muted);
        font-size: 0.9em;
      }
      .problem {
        margin: 0;
        color: var(--er-error);
      }
      .note {
        margin: 0;
        padding: 8px 12px;
        border: 1px solid var(--er-line);
        color: var(--er-ink-soft);
        font-size: 0.95em;
      }
      .link {
        padding: 0;
        background: none;
        border: none;
        color: var(--er-gold);
        font: inherit;
        text-decoration: underline;
        cursor: pointer;
      }
      .link:hover {
        color: var(--er-gold-bright);
      }
      .status {
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 44px;
      }
      @keyframes card-in {
        from {
          opacity: 0;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .card {
          animation: none;
          transition: none;
        }
      }
    `,
  ];

  /** The way in this card shows; set once, as it's placed. */
  entry: EntryStore | undefined;
  private url = "";
  // Held for the press that sends it, and never kept.
  private password = "";
  private way: StoreController<EntryState, EntryState> | undefined;
  // The phase the focus was last brought in for.
  private focusedFor: string | undefined;
  // The card's content, measured as it changes so the card can ease to its height.
  private measured: Element | undefined;
  private readonly sizer = new ResizeObserver(([entry]) => {
    const height = entry?.borderBoxSize[0]?.blockSize;
    const card = this.renderRoot.querySelector<HTMLElement>(".card");
    if (height !== undefined && card !== null) {
      card.style.setProperty("--content-height", `${height}px`);
    }
  });

  protected override willUpdate(): void {
    if (this.entry !== undefined && this.way === undefined) {
      this.way = new StoreController(this, this.entry, (state) => state);
      this.url = this.way.value.linked ?? "";
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.sizer.disconnect();
    this.measured = undefined;
  }

  protected override updated(changed: PropertyValues): void {
    const content = this.renderRoot.querySelector(".content") ?? undefined;
    if (content !== this.measured) {
      this.sizer.disconnect();
      if (content !== undefined) {
        this.sizer.observe(content);
      }
      this.measured = content;
    }
    const phase = this.way?.value.phase.phase;
    if (phase !== this.focusedFor && !changed.has("password") && !changed.has("url")) {
      this.focusedFor = phase;
      const root = this.renderRoot;
      (
        root.querySelector<HTMLElement>("[data-first]") ?? root.querySelector<HTMLElement>(".card")
      )?.focus();
    }
  }

  override render() {
    const state = this.way?.value;
    if (state === undefined || state.phase.phase === "starting") {
      return nothing;
    }
    return html`<section class="card" tabindex="-1" aria-label="Room">
      <div class="content">${this.body(state.phase, state)}</div>
    </section>`;
  }

  private body(phase: EntryPhase, state: EntryState) {
    switch (phase.phase) {
      case "starting":
        return nothing;
      case "entry":
        return this.linkForm(phase);
      case "returning":
        return this.returning(phase);
      case "looking":
        return html`<div class="status" role="status">
          <span class="dot" data-state="loading" aria-hidden="true"></span>
          <span>Checking the room</span>
        </div>`;
      case "asleep":
        return this.asleep(phase);
      case "unsupported":
        return this.unsupported(phase);
      case "slots":
        return this.slots(phase);
      case "loading":
      case "ready":
        return html`<er-part-list .parts=${state.parts}></er-part-list>`;
      case "failed":
        return html`<er-part-list .parts=${state.parts} .isStopped=${true}></er-part-list>
          <p class="problem" role="alert">${failureText(phase.failure)}</p>
          <div class="buttons">
            <button class="button" data-tone="primary" data-first @click=${this.tryAgain}>
              Try again
            </button>
            ${this.anotherRoomButton()}
          </div>`;
    }
  }

  private linkForm({ problem }: Extract<EntryPhase, { phase: "entry" }>) {
    return html`<form novalidate @submit=${this.lookUp}>
      <label class="title" for="url">Room or tracker URL</label>
      <div class="inline">
        <input
          id="url"
          class="field"
          type="url"
          placeholder="https://archipelago.gg/room/…"
          autocomplete="off"
          spellcheck="false"
          aria-describedby=${problem === undefined ? "url-help" : "url-help url-problem"}
          data-first
          .value=${this.url}
          @input=${(event: InputEvent) => {
            this.url = (event.target as HTMLInputElement).value;
          }}
        />
        <button class="button" type="submit">Look up</button>
      </div>
      ${
        problem === undefined
          ? nothing
          : html`<p id="url-problem" class="problem small" role="alert">
              ${entryProblemText(problem)}
            </p>`
      }
      <div class="aside">
        <span id="url-help">From the room's page on archipelago.gg, or its tracker page.</span>
        ${
          SAMPLE_ROOM === undefined
            ? nothing
            : html`<button type="button" class="link" @click=${() => (this.url = SAMPLE_ROOM)}>
                Use the sample room
              </button>`
        }
      </div>
    </form>`;
  }

  private returning({ visit, needsPassword }: Extract<EntryPhase, { phase: "returning" }>) {
    return html`<form novalidate @submit=${this.connectLast}>
      <div class="tight">
        <span class="muted small">Last time on this device</span>
        <span class="name">${visit.name} <span class="muted">${where(visit.link)}</span></span>
      </div>
      ${needsPassword ? this.passwordField(true) : nothing}
      <div class="buttons">
        <button
          class="button"
          data-tone="primary"
          type="submit"
          ?data-first=${!needsPassword}
          ?disabled=${needsPassword && this.password === ""}
        >
          Connect
        </button>
        ${this.anotherRoomButton()}
      </div>
    </form>`;
  }

  private unsupported({ page }: Extract<EntryPhase, { phase: "unsupported" }>) {
    return html`<div class="tight" role="alert">
        <span class="title">This room's version isn't supported</span>
        <span class="soft"
          >This ${externalLink(page, "room")} was made with an unsupported version of Elden Ring
          Archipelago. Use ${externalLink(APWORLD_RELEASE_PAGE, RULES_APWORLD.release)} and remake
          the room to use this tracker.</span
        >
      </div>
      <div class="buttons">
        <button
          type="button"
          class="button"
          data-tone="primary"
          data-first
          @click=${() => this.entry?.getState().anotherRoom()}
        >
          Another room
        </button>
      </div>`;
  }

  private asleep({ since, page }: Extract<EntryPhase, { phase: "asleep" }>) {
    return html`<div class="tight" role="status">
        <span class="title">The room is inactive</span>
        <span class="soft"
          >It was last active ${ago(since, Date.now())}, so archipelago.gg has made it inactive.
          Opening its page reopens it; the tracker never does that itself.</span
        >
      </div>
      <div class="buttons">
        <a
          class="button"
          data-tone="primary"
          data-first
          href=${page}
          target="_blank"
          rel="noopener noreferrer"
          >Open the room page</a
        >
        <button class="button" @click=${() => this.entry?.getState().checkAgain()}>
          Check again
        </button>
        ${this.anotherRoomButton()}
      </div>
      <span class="muted small">It checks again every minute.</span>`;
  }

  private slots(phase: Extract<EntryPhase, { phase: "slots" }>) {
    const { slots, isTracker, chosen, needsPassword } = phase;
    return html`<form novalidate @submit=${this.connect}>
      <div class="head">
        <span class="title">Pick your slot</span>
        <span class="muted small"
          >${isTracker ? "From the tracker page" : "In the room"},
          <span class="fig">${slots.length}</span>
          ${slots.length === 1 ? "player" : "players"}</span
        >
      </div>
      ${isTracker ? html`<p class="note" role="note">${reducedTrackerNote()}</p>` : nothing}
      <er-slot-list
        .slots=${slots}
        .chosen=${chosen}
        ?data-first=${chosen === undefined}
        @er-choose=${({ detail }: CustomEvent<SlotChoice>) =>
          this.entry?.getState().choose(detail.team, detail.player)}
      ></er-slot-list>
      ${needsPassword ? this.passwordField(false) : nothing}
      <div class="buttons">
        <button
          class="button"
          data-tone="primary"
          type="submit"
          ?data-first=${chosen !== undefined && !needsPassword}
          ?disabled=${chosen === undefined || (needsPassword && this.password === "")}
        >
          Connect
        </button>
        ${this.anotherRoomButton()}
      </div>
    </form>`;
  }

  private passwordField(isEachVisit: boolean) {
    return html`<div class="tight">
      <label for="password" class="title">Room password</label>
      <input
        id="password"
        class="field"
        type="password"
        autocomplete="off"
        aria-describedby="password-help"
        data-first
        .value=${this.password}
        @input=${(event: InputEvent) => {
          this.password = (event.target as HTMLInputElement).value;
        }}
      />
      <span id="password-help" class="muted small"
        >The room asks for one. It goes to the room only, and isn't
        kept${isEachVisit ? ", so it's asked for each visit" : ""}.</span
      >
    </div>`;
  }

  private anotherRoomButton() {
    return html`<button
      type="button"
      class="button"
      data-tone="quiet"
      @click=${() => this.entry?.getState().anotherRoom()}
    >
      Another room
    </button>`;
  }

  private readonly lookUp = (event: SubmitEvent): void => {
    event.preventDefault();
    this.entry?.getState().lookUp(this.url);
  };

  private readonly connect = (event: SubmitEvent): void => {
    event.preventDefault();
    this.entry?.getState().connect(this.takePassword());
  };

  private readonly connectLast = (event: SubmitEvent): void => {
    event.preventDefault();
    this.entry?.getState().connectLast(this.takePassword());
  };

  private readonly tryAgain = (): void => {
    this.entry?.getState().tryAgain();
  };

  // The password typed, handed on once and cleared from the field.
  private takePassword(): string | undefined {
    const typed = this.password;
    this.password = "";
    return typed === "" ? undefined : typed;
  }
}

// Where the last visit was, beside the slot's name.
function where(link: RoomLink) {
  return link.kind === "room"
    ? html`in room <span class="fig">${link.room}</span>`
    : html`on tracker page <span class="fig">${link.tracker}</span>`;
}

customElements.define("er-room-card", ErRoomCard);

declare global {
  interface HTMLElementTagNameMap {
    "er-room-card": ErRoomCard;
  }
}

// A link out of the tracker, in the card's own link style.
function externalLink(href: string, text: string) {
  return html`<a class="link" href=${href} target="_blank" rel="noopener noreferrer">${text}</a>`;
}
