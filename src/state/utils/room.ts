/**
 * ─ Room ─
 *
 * The store's room as the rules read it, for the goal menu and the map alike:
 * the room from slot_data, the items received named by the Elden Ring data
 * package, and the checks done, by name and by id. It's worked out again only
 * when one of those changes, so both read the same items, and with them the
 * same reach.
 */

import { readCheckNames, readRulesSlotData } from "../../archipelago/elden-ring-slot.js";
import { ELDEN_RING } from "../../archipelago/look-up.js";
import type { DataPackage } from "../../archipelago/web-responses.js";
import type { Room } from "../../data/rules/room-reach.js";
import type { TrackerState } from "../store.js";

/** What the room is worked out from, in the store. */
export type RoomInputs = Pick<TrackerState, "slotData" | "received" | "checked" | "packages">;

/** The room, the items received by name, and the checks done by name and by id. */
export interface RoomView {
  readonly room: Room;
  /** Each check's name, by id. */
  readonly names: Readonly<Record<string, string>>;
  readonly items: ReadonlyMap<string, number>;
  readonly checked: ReadonlySet<string>;
  readonly checkedIds: ReadonlySet<number>;
}

// Each slot_data's room, and its checks' names by id; undefined in a shape the rules can't read.
const ROOMS = new WeakMap<
  object,
  { room: Room; names: Readonly<Record<string, string>> } | undefined
>();

// The last view worked out, and what it was worked out from.
let last: { inputs: RoomInputs; view: RoomView | undefined } | undefined;

/** The store's room as the rules read it; undefined until slot_data and the data package are in, or when they can't be read. */
export function roomViewOf(inputs: RoomInputs): RoomView | undefined {
  if (last !== undefined && isSame(last.inputs, inputs)) {
    return last.view;
  }
  const view = worked(inputs);
  last = { inputs, view };
  return view;
}

function worked({ slotData, received, checked, packages }: RoomInputs): RoomView | undefined {
  const elden = packages.get(ELDEN_RING);
  const found = slotData === undefined || elden === undefined ? undefined : roomOf(slotData, elden);
  if (found === undefined || elden === undefined) {
    return undefined;
  }
  const items = new Map<string, number>();
  for (const { value } of received) {
    const name = elden.itemNames.get(value.item);
    if (name !== undefined) {
      items.set(name, (items.get(name) ?? 0) + 1);
    }
  }
  return {
    ...found,
    items,
    checked: new Set(checked.flatMap((id) => found.names[String(id)] ?? [])),
    checkedIds: new Set(checked),
  };
}

function roomOf(slotData: Readonly<Record<string, unknown>>, { locationNames }: DataPackage) {
  if (!ROOMS.has(slotData)) {
    const rules = readRulesSlotData(slotData);
    const names = readCheckNames(slotData, locationNames);
    ROOMS.set(
      slotData,
      rules === undefined || names === undefined
        ? undefined
        : { room: { ...rules, locations: new Set(Object.values(names)) }, names }
    );
  }
  return ROOMS.get(slotData);
}

function isSame(a: RoomInputs, b: RoomInputs): boolean {
  return (
    a.slotData === b.slotData &&
    a.received === b.received &&
    a.checked === b.checked &&
    a.packages === b.packages
  );
}
