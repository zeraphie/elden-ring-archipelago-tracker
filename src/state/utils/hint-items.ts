/**
 * ─ Hint items ─
 *
 * What the hint box suggests: what the goal still waits on, nearest first, then
 * every other key item the room's rules can ask for. What's already held is
 * left out, and so is anything the Elden Ring data package doesn't name, as a
 * hint for it would come to nothing. They're names from the rules alone, so
 * they say nothing of where an item is.
 */

import { ELDEN_RING } from "../../archipelago/look-up.js";
import type { EldenRingData } from "../setup.js";
import { goalMenuOf } from "./goal.js";
import { roomViewOf, type RoomInputs, type RoomView } from "./room.js";

// The last list worked out, and the room's view it was worked out from.
let last: { view: RoomView; items: readonly string[] } | undefined;

/** The items the hint box suggests, by name; none until the room can be read. */
export function hintItemsOf(data: EldenRingData, inputs: RoomInputs): readonly string[] {
  const view = roomViewOf(inputs);
  if (view === undefined) {
    return [];
  }
  if (last !== undefined && last.view === view) {
    return last.items;
  }
  const menu = goalMenuOf(data, inputs);
  const named = new Set(inputs.packages.get(ELDEN_RING)?.itemNames.values());
  const items = [...(menu === undefined ? [] : data.goalItems(menu)), ...data.keyItems(view.room)];
  const offered = [...new Set(items)].filter((name) => named.has(name) && !view.items.has(name));
  last = { view, items: offered };
  return offered;
}
