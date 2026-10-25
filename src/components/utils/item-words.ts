/**
 * ─ Item words ─
 *
 * How an item that moved between players is told: the item when its game
 * doesn't name it, the player it came from or went to, and where in their
 * world it was found.
 */

import type { FeedPlayer } from "../../state/utils/feed.js";
import { gameName, slotName } from "./entry-words.js";

/** An item whose game's data package doesn't name it. */
export const UNNAMED_ITEM = "An item its game doesn't name";

/** A player as an item's sender or receiver is named; slot 0 is the room's server, which hands out starting items. */
export function playerName({ slot, name }: FeedPlayer): string {
  return slot === 0 ? "the server" : slotName(name, slot);
}

/** Where a received item was found: in which game, at which of its locations, as far as they're known. */
export function foundIn(
  game: string | undefined,
  location: string | undefined
): string | undefined {
  if (game === undefined) {
    return location;
  }
  return location === undefined ? gameName(game) : `${gameName(game)}: ${location}`;
}
