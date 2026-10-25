/**
 * ─ Live events ─
 *
 * What the room says over the websocket, read into events: the login, the
 * room's changes, the items received with Archipelago's index check, and each
 * PrintJSON as an item sent, a hint, a chat line, a command's result, a join,
 * a goal or a release. Any other message keeps its type and text, so nothing
 * the room says is dropped. A packet in a shape it shouldn't have is read as
 * far as it can be.
 */

import type { ConnectedPacket, RoomUpdatePacket } from "archipelago.js";
import type { ServerPacket } from "./room-socket.js";
import type { Version } from "./versions.js";
import { isRecord, type NetworkItem } from "./web-responses.js";

/** One part of a message's text: plain, or an id to name, with what's known of it. */
export interface MessagePart {
  readonly text: string;
  /** "text" when left out; "player_id", "item_id", "location_id", "hint_status" and the like. */
  readonly type?: string;
  readonly player?: number;
  readonly flags?: number;
  readonly color?: string;
  readonly hint_status?: number;
}

/** Something the room said, as the tracker reads it. */
export type LiveEvent =
  | {
      readonly kind: "connected";
      readonly connected: ConnectedPacket;
      /** RoomInfo's `hint_cost`: a hint's price, as a percentage of the slot's locations; 0 when hints are free. */
      readonly hintPercent: number;
      /** RoomInfo's release permission; undefined when it didn't say one. */
      readonly releasePermission: number | undefined;
      /** RoomInfo's Archipelago version, the server's own; undefined when it didn't say one. */
      readonly serverVersion: Version | undefined;
    }
  | { readonly kind: "room update"; readonly update: RoomUpdatePacket }
  | {
      readonly kind: "items received";
      /** Every item received so far, as the server now has it. */
      readonly items: readonly NetworkItem[];
      /** The ones this message added. */
      readonly added: readonly NetworkItem[];
      /** Whether this was the whole list, sent on login or after a Sync, rather than items arriving as they came. */
      readonly isWholeList: boolean;
    }
  | {
      readonly kind: "item sent";
      readonly item: NetworkItem;
      readonly receiving: number;
      readonly parts: readonly MessagePart[];
    }
  | {
      readonly kind: "hint";
      readonly item: NetworkItem;
      readonly receiving: number;
      readonly found: boolean;
      readonly parts: readonly MessagePart[];
    }
  | {
      readonly kind: "chat";
      readonly team: number;
      readonly slot: number;
      readonly message: string;
      readonly parts: readonly MessagePart[];
    }
  | { readonly kind: "command result"; readonly parts: readonly MessagePart[] }
  | {
      readonly kind: "join";
      readonly team: number;
      readonly slot: number;
      readonly tags: readonly string[];
      readonly parts: readonly MessagePart[];
    }
  | {
      readonly kind: "goal";
      readonly team: number;
      readonly slot: number;
      readonly parts: readonly MessagePart[];
    }
  | {
      /** A slot's items left in its world, sent to their owners. */
      readonly kind: "release";
      readonly team: number;
      readonly slot: number;
      readonly parts: readonly MessagePart[];
    }
  | {
      readonly kind: "message";
      /** The PrintJSON type, such as "Part", "Collect" or "Release"; undefined when it has none. */
      readonly type: string | undefined;
      readonly parts: readonly MessagePart[];
    };

/** The items received after a ReceivedItems: the list now held, what was added, and whether one was missed. */
export interface ItemsAfter {
  readonly held: readonly NetworkItem[];
  readonly added: readonly NetworkItem[];
  /** True when the index shows an item went astray: nothing is taken, and a Sync is due. */
  readonly missed: boolean;
}

/**
 * Takes a ReceivedItems into the items held. Index 0 is the whole list, sent on
 * login and after a Sync, and replaces what was held. Any other index must be
 * where the held list ends; one that isn't means an item was missed.
 */
export function receiveItems(
  held: readonly NetworkItem[],
  index: number,
  items: readonly NetworkItem[]
): ItemsAfter {
  if (index === 0) {
    return { held: items, added: items.slice(held.length), missed: false };
  }
  if (index === held.length) {
    return { held: [...held, ...items], added: items, missed: false };
  }
  return { held, added: [], missed: true };
}

/** A PrintJSON packet as an event; undefined for any other packet. */
export function eventOf(packet: ServerPacket): LiveEvent | undefined {
  if (packet.cmd !== "PrintJSON") {
    return undefined;
  }
  const parts = partsOf(packet.data);
  const type = typeof packet.type === "string" ? packet.type : undefined;
  const item = networkItemOf(packet.item);
  const { receiving, team, slot } = packet;
  const message: LiveEvent = { kind: "message", type, parts };
  switch (type) {
    case "ItemSend":
      return item && isNumber(receiving) ? { kind: "item sent", item, receiving, parts } : message;
    case "Hint":
      return item && isNumber(receiving) && typeof packet.found === "boolean"
        ? { kind: "hint", item, receiving, found: packet.found, parts }
        : message;
    case "Chat":
      return isNumber(team) && isNumber(slot) && typeof packet.message === "string"
        ? { kind: "chat", team, slot, message: packet.message, parts }
        : message;
    case "CommandResult":
      return { kind: "command result", parts };
    case "Join":
      return isNumber(team) && isNumber(slot)
        ? { kind: "join", team, slot, tags: stringsOf(packet.tags), parts }
        : message;
    case "Goal":
      return isNumber(team) && isNumber(slot) ? { kind: "goal", team, slot, parts } : message;
    case "Release":
      return isNumber(team) && isNumber(slot) ? { kind: "release", team, slot, parts } : message;
    default:
      return message;
  }
}

/** A NetworkItem as the websocket sends it, an object tagged with its class, without the tag; undefined if it isn't one. */
export function networkItemOf(value: unknown): NetworkItem | undefined {
  if (!isRecord(value)) {
    return undefined;
  }
  const { item, location, player, flags = 0 } = value;
  return isNumber(item) && isNumber(location) && isNumber(player) && isNumber(flags)
    ? { item, location, player, flags }
    : undefined;
}

// A message's text parts, keeping those with text.
function partsOf(value: unknown): MessagePart[] {
  return (Array.isArray(value) ? value : []).filter(
    (part): part is MessagePart => isRecord(part) && typeof part.text === "string"
  );
}

function stringsOf(value: unknown): string[] {
  return (Array.isArray(value) ? value : []).filter(
    (each): each is string => typeof each === "string"
  );
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
