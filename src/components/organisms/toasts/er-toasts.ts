/**
 * ─ Toasts ─
 *
 * A toast for each item another player sends this slot as it arrives, "Jo
 * sent you", the item, and where in their world it was, stacked newest on
 * top, and for each item it finds for itself that matters: in a key check, or
 * a key item or a goal item from anywhere, "You found". A goal item, one a row of the goal menu counts or waits on, is
 * larger, glows gold, and shows that row's icon in its frame; a key item, one
 * Archipelago flags as progression, says so; every other is compact. Key and
 * other items carry the sack in the gold of a check made, as they're
 * obtained. Each can be closed, or swiped away either way. Only items that
 * arrive live toast: not those the room had already sent, nothing from a
 * tracker link, which has no websocket, and none of the slot's own once its
 * goal is done, when a release brings everything left at once. Reaching the
 * goal takes every toast showing away, for the goal's screen.
 */

import { LitElement, css, html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { shallow } from "zustand/vanilla/shallow";
import type { Need } from "../../../data/rules/rules.js";
import type { EldenRingData } from "../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../state/store.js";
import { feedOf, ownFindsOf, type FeedEntry, type OwnFind } from "../../../state/utils/feed.js";
import { goalMenuOf, isGoalDone } from "../../../state/utils/goal.js";
import { buttonStyles } from "../../atoms/button.js";
import { narrow } from "../../atoms/layout.js";
import { focusRing } from "../../atoms/focus.js";
import { frameStyles } from "../../atoms/frame.js";
import { sackStyles } from "../../atoms/sack.js";
import { closeIcon } from "../../utils/close-icon.js";
import { checkLine } from "../../utils/check-words.js";
import { iconUrl } from "../../utils/icons.js";
import { foundIn, playerName, UNNAMED_ITEM } from "../../utils/item-words.js";
import { StoreController } from "../../utils/store-controller.js";
import { ToastQueue, type QueuedToast } from "./toast-queue.js";

type Received = Extract<FeedEntry, { kind: "received" }>;
type Toast = Received | OwnFind;

// How much a toast stands out: an item the goal waits on, a key item, or any other.
type Tier = "goal" | "key" | "other";

const TIER_WORDS: Readonly<Record<Tier, string | undefined>> = {
  goal: "Goal item",
  key: "Key item",
  other: undefined,
};

const SACK = iconUrl("sack");
// A swipe past this many pixels sends the toast away; a shorter one lets it spring back.
const SWIPE_PX = 70;
// How far a swipe fades a toast: it's faint by this many pixels, though never gone while held.
const FADE_PX = 280;

/**
 * The items others send, and the slot's own finds that matter, as toasts.
 */
export class ErToasts extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
  };

  static override styles = [
    buttonStyles,
    focusRing,
    frameStyles,
    sackStyles,
    css`
      :host {
        display: block;
        pointer-events: none;
      }
      section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .toast {
        position: relative;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 9px 52px 9px 12px;
        background: var(--er-scrim);
        border: 1px solid var(--er-line);
        box-shadow: var(--er-toast-shadow);
        pointer-events: auto;
        touch-action: pan-y;
        user-select: none;
        cursor: grab;
        transform: translateX(var(--dx, 0px));
        opacity: var(--fade, 1);
        transition:
          transform 220ms ease,
          opacity 220ms ease;
      }
      .toast[data-dragging] {
        cursor: grabbing;
        transition: none;
      }
      .toast[data-leaving="1"] {
        transform: translateX(420px);
        opacity: 0;
      }
      .toast[data-leaving="-1"] {
        transform: translateX(-420px);
        opacity: 0;
      }
      .toast[data-tier="goal"] {
        gap: 16px;
        padding: 14px 56px 14px 14px;
        border-color: var(--er-gold-edge);
        box-shadow: var(--er-toast-goal-shadow);
      }
      .icon {
        flex-shrink: 0;
        width: 34px;
        height: 34px;
      }
      .frame {
        border-color: var(--er-gold-edge);
      }
      .words {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .tier {
        font-size: 0.72em;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--er-gold);
      }
      .toast[data-tier="goal"] .tier {
        color: var(--er-gold-bright);
      }
      .from {
        font-size: 0.82em;
        color: var(--er-ink-muted);
      }
      .item {
        font-weight: 600;
        font-size: 1.05em;
        line-height: 1.15;
        color: var(--er-ink-bright);
      }
      .toast[data-tier="goal"] .item {
        font-size: 1.4em;
      }
      .where {
        font-size: 0.8em;
        color: var(--er-ink-muted);
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
        top: 8px;
        right: 8px;
        width: 36px;
        min-height: 36px;
      }
      @media (prefers-reduced-motion: reduce) {
        .toast {
          transition: none;
        }
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  private readonly queue = new ToastQueue<Toast>(() => this.requestUpdate());
  private watch: StoreController<TrackerState, unknown[]> | undefined;
  // Items the tracker saw arrive after this moment toast; what came before was already there.
  private since = Date.now();
  // Whether the goal was done at the last look: the toasts showing go as it's reached.
  private wasDone = false;
  // The toast being swiped, the pointer swiping it and where it went down, and how far it's gone.
  private swipe: { readonly id: number; readonly pointer: number; readonly x: number } | undefined;
  private dx = 0;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.queue.stop();
  }

  protected override willUpdate(): void {
    const { store, data } = this;
    if (store === undefined || data === undefined) {
      return;
    }
    this.watch ??= new StoreController(
      this,
      store,
      (state): unknown[] => [
        feedOf(data, state),
        state.received,
        isGoalDone(state),
        state.link,
        goalMenuOf(data, state),
      ],
      shallow
    );
    const state = store.getState();
    if (state.link.kind !== "room") {
      return;
    }
    const isNew = ({ at }: Toast): boolean => (at ?? 0) > this.since;
    const others = feedOf(data, state).filter(
      (entry): entry is Received => entry.kind === "received" && isNew(entry)
    );
    const isDone = isGoalDone(state);
    if (isDone && !this.wasDone) {
      this.queue.clear();
    }
    this.wasDone = isDone;
    const found = isDone
      ? []
      : ownFindsOf(data, state).filter(
          (find) =>
            isNew(find) &&
            (find.isKeyCheck || find.isProgression || this.goalNeed(find) !== undefined)
        );
    const arrived = [...others, ...found].sort((a, b) => (a.at ?? 0) - (b.at ?? 0));
    for (const entry of arrived) {
      this.queue.add(entry);
      this.since = Math.max(this.since, entry.at ?? 0);
    }
  }

  override render() {
    return html`<section role="status" aria-label="Items received">
      ${repeat(
        this.queue.shown,
        ({ id }) => id,
        (toast) => this.toast(toast)
      )}
    </section>`;
  }

  private toast({ id, value, leaving }: QueuedToast<Toast>) {
    const isSwiped = this.swipe?.id === id;
    const isOwn = value.kind === "found";
    const where = isOwn
      ? value.check && checkLine(value.check)
      : foundIn(value.game, value.location);
    const goal = this.goalNeed(value);
    const tier: Tier = goal !== undefined ? "goal" : value.isProgression ? "key" : "other";
    const label = TIER_WORDS[tier];
    return html`<article
      class="toast"
      data-tier=${tier}
      ?data-dragging=${isSwiped}
      data-leaving=${leaving ?? nothing}
      style=${isSwiped ? `--dx: ${this.dx}px; --fade: ${Math.max(0.25, 1 - Math.abs(this.dx) / FADE_PX)}` : ""}
      @pointerdown=${(event: PointerEvent) => this.grab(event, id)}
      @pointermove=${this.drag}
      @pointerup=${this.letGo}
      @pointercancel=${this.letGo}
    >
      ${
        goal === undefined
          ? html`<img
              class="icon sack"
              data-state="collected"
              src=${SACK}
              alt=""
              draggable="false"
            />`
          : this.frame(goal)
      }
      <div class="words">
        ${label === undefined ? nothing : html`<span class="tier">${label}</span>`}
        <span class="from">${isOwn ? "You found" : `${playerName(value.from)} sent you`}</span>
        <span class="item">${value.item ?? UNNAMED_ITEM}</span>
        ${where === undefined ? nothing : html`<span class="where">${where}</span>`}
      </div>
      <button
        class="button"
        data-tone="quiet"
        aria-label="Dismiss"
        @click=${() => this.queue.dismiss(id, 1)}
      >
        ${closeIcon}
      </button>
    </article>`;
  }

  // The goal menu's need a received item serves, when the goal waits on it.
  private goalNeed(value: Toast): Need | undefined {
    const { store, data } = this;
    if (store === undefined || data === undefined || value.item === undefined) {
      return undefined;
    }
    const menu = goalMenuOf(data, store.getState());
    return menu && data.goalNeedOf(menu, value.item);
  }

  // A goal item's icon in the goal menu's frame, or the frame alone until its icon is in.
  private frame(need: Need) {
    const icon = iconUrl(this.data?.needIcon(need));
    return html`<div class="frame" aria-hidden="true">
      ${icon === undefined ? nothing : html`<img src=${icon} alt="" draggable="false" />`}
    </div>`;
  }

  // A press on a toast, but not on its close button, starts a swipe, and holds the clearing.
  private grab(event: PointerEvent, id: number): void {
    if ((event.target as Element).closest("button") !== null) {
      return;
    }
    (event.currentTarget as Element).setPointerCapture(event.pointerId);
    this.swipe = { id, pointer: event.pointerId, x: event.clientX };
    this.dx = 0;
    this.queue.hold();
    this.requestUpdate();
  }

  private readonly drag = (event: PointerEvent): void => {
    if (this.swipe?.pointer === event.pointerId) {
      this.dx = event.clientX - this.swipe.x;
      this.requestUpdate();
    }
  };

  // Past the swipe's reach, the toast goes its way; short of it, it springs back.
  private readonly letGo = (event: PointerEvent): void => {
    const { swipe, dx } = this;
    if (swipe?.pointer !== event.pointerId) {
      return;
    }
    this.swipe = undefined;
    this.dx = 0;
    if (Math.abs(dx) > SWIPE_PX) {
      this.queue.dismiss(swipe.id, dx < 0 ? -1 : 1);
    }
    this.queue.release();
    this.requestUpdate();
  };
}

customElements.define("er-toasts", ErToasts);

declare global {
  interface HTMLElementTagNameMap {
    "er-toasts": ErToasts;
  }
}
