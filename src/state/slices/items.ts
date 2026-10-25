/**
 * ─ Items slice ─
 *
 * The items received and the items sent, each stamped. An item arriving live
 * is stamped as it comes. The whole list, sent on login or after a Sync, keeps
 * the times of items already held, and one it adds came while the tracker
 * wasn't watching, so it has no time. An item counts as sent when this slot
 * found it in its world for another player. The web API's history adds the
 * items sent before the tracker connected, and the items received until the
 * websocket's own list comes; what the websocket already said stands.
 */

import type { LiveEvent } from "../../archipelago/live-events.js";
import type { NetworkItem } from "../../archipelago/web-responses.js";
import type { TrackerSlice } from "../store.js";
import type { History } from "../../archipelago/tracker-poll.js";
import type { Stamped } from "../utils/stamped.js";

/** An item this slot found in its world for another player. */
export interface SentItem {
  readonly item: NetworkItem;
  readonly receiving: number;
}

export interface ItemsSlice {
  readonly received: readonly Stamped<NetworkItem>[];
  readonly sent: readonly Stamped<SentItem>[];
  /** The items received, as the latest ReceivedItems says them. */
  takeItems(event: Extract<LiveEvent, { kind: "items received" }>): void;
  /** An item someone found: kept as sent when this slot found it for another player. */
  takeSent(event: Extract<LiveEvent, { kind: "item sent" }>): void;
  /** Whether a history has come in on this visit, so an item first seen at a later one is stamped as seen then. */
  readonly hasPolled: boolean;
  /** The web API's history: the items sent it knows of that the websocket didn't say, and the items received while there's no websocket to say them. */
  takeItemHistory(history: History): void;
}

export const createItemsSlice =
  (now: () => number): TrackerSlice<ItemsSlice> =>
  (set) => ({
    received: [],
    sent: [],
    hasPolled: false,
    takeItems: (event) =>
      set((state) => {
        if (!event.isWholeList) {
          const at = now();
          state.received.push(...event.added.map((value) => ({ value, at })));
          return;
        }
        state.received = event.items.map((value, i) => {
          const before = state.received[i];
          return before && isSameItem(before.value, value) ? { ...before, value } : { value };
        });
      }),
    takeSent: (event) =>
      set((state) => {
        if (event.item.player === state.slot && event.receiving !== state.slot) {
          state.sent.push({ value: { item: event.item, receiving: event.receiving }, at: now() });
        }
      }),
    takeItemHistory: ({ tracker }) =>
      set((state) => {
        const { team, slot } = state;
        if (team === undefined || slot === undefined) {
          return;
        }
        // The first history of a visit tells of what came before; a later one, of the last minute.
        const at = state.hasPolled ? now() : undefined;
        const stamped = <T>(value: T): Stamped<T> => (at === undefined ? { value } : { value, at });
        // What this slot found for the others: their items received, sent from its world.
        const sentBefore = tracker.itemsReceived.flatMap(({ team: theirs, player, items }) =>
          theirs === team && player !== slot
            ? items
                .filter((item) => item.player === slot)
                .map((item) => ({ item, receiving: player }))
            : []
        );
        const unseen = sentBefore
          .filter((sent) => !state.sent.some(({ value }) => isSameSent(value, sent)))
          .map(stamped);
        state.sent = at === undefined ? [...unseen, ...state.sent] : [...state.sent, ...unseen];
        // While the websocket's connected, its own list stands.
        if (state.connection.phase !== "connected") {
          const mine = tracker.itemsReceived.find(
            (entry) => entry.team === team && entry.player === slot
          );
          state.received = (mine?.items ?? []).map((value, i) => {
            const before = state.received[i];
            return before && isSameItem(before.value, value)
              ? { ...before, value }
              : stamped(value);
          });
        }
        state.hasPolled = true;
      }),
  });

function isSameItem(a: NetworkItem, b: NetworkItem): boolean {
  return a.item === b.item && a.location === b.location && a.player === b.player;
}

function isSameSent(a: SentItem, b: SentItem): boolean {
  return a.receiving === b.receiving && isSameItem(a.item, b.item);
}
