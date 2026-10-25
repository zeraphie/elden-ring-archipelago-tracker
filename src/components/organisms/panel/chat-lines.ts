/**
 * ─ Chat lines ─
 *
 * The room's log as the Chat tab shows it: player chat, this slot's own
 * commands as it sent them, their replies, hints, and the room's events,
 * oldest first. Items sent stay in the Items tab. A message's parts are read
 * as plain text, its ids named: a player by the room's list, an item or a
 * location by its game. Nothing is ever read as markup.
 */

import type { MessagePart } from "../../../archipelago/live-events.js";
import type { PrintedEvent } from "../../../state/slices/log.js";
import type { Stamped } from "../../../state/utils/stamped.js";

/** How a line reads: a player's chat, one of this slot's commands, a reply to one, a hint, or the room's own. */
export type ChatKind = "chat" | "command" | "reply" | "hint" | "room";

/** One line of the chat: its kind, who said it when a player did, its text, and when the tracker saw it. */
export interface ChatLine {
  readonly kind: ChatKind;
  /** The player who said it, for chat and commands. */
  readonly who: string | undefined;
  readonly text: string;
  readonly at: number | undefined;
}

/** How a message's ids are named: a player by slot, and an item or a location by its id and the slot whose game it's in. */
export interface ChatNames {
  readonly slot: number | undefined;
  player(slot: number): string;
  item(id: number, owner: number): string;
  location(id: number, owner: number): string;
}

/** The log's lines, oldest first, items sent left out. */
export function chatLines(log: readonly Stamped<PrintedEvent>[], names: ChatNames): ChatLine[] {
  return log.flatMap(({ value: event, at }): ChatLine[] => {
    switch (event.kind) {
      case "item sent":
        return [];
      case "chat": {
        const isCommand = event.slot === names.slot && event.message.startsWith("!");
        return [
          {
            kind: isCommand ? "command" : "chat",
            who: names.player(event.slot),
            text: event.message,
            at,
          },
        ];
      }
      case "command result":
        return [{ kind: "reply", who: undefined, text: partsText(event.parts, names), at }];
      case "hint":
        return [{ kind: "hint", who: undefined, text: partsText(event.parts, names), at }];
      default:
        return [{ kind: "room", who: undefined, text: partsText(event.parts, names), at }];
    }
  });
}

/** A message's parts as plain text, each id named. */
export function partsText(parts: readonly MessagePart[], names: ChatNames): string {
  return parts
    .map(({ text, type, player }) => {
      const id = Number(text);
      if (!Number.isFinite(id)) {
        return text;
      }
      switch (type) {
        case "player_id":
          return names.player(id);
        case "item_id":
          return player === undefined ? text : names.item(id, player);
        case "location_id":
          return player === undefined ? text : names.location(id, player);
        default:
          return text;
      }
    })
    .join("");
}
