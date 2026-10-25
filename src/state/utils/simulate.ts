/**
 * ─ Simulate ─
 *
 * For a development build only: the events the websocket would send for a
 * check made, or an item another player sent, so the page reacts as it would
 * live. A check is the next key check not yet checked in an open region, the
 * region given first, or the drop of the next goal boss still to defeat, and
 * it holds an item for this slot; an item sent comes from a slot other than
 * this one. A room's slot_data can also take the All Bosses preset's options
 * and goal in place of its own, on the page alone. The items are picked from a short list by
 * name, from those the Elden Ring data package names. What they add is put
 * right by the room: checks aren't kept on the device, and the next whole
 * list of items received replaces what was added.
 */

import type { RoomUpdatePacket } from "archipelago.js";
import type { LiveEvent } from "../../archipelago/live-events.js";
import { ELDEN_RING } from "../../archipelago/look-up.js";
import { isRecord } from "../../archipelago/web-responses.js";
// Taken straight from its module, not through the Elden Ring data the page loads, so it's in the
// development build alone.
import { ALL_BOSSES_OPTIONS } from "../../data/presets/all-bosses.js";
import type { NetworkItem } from "../../archipelago/web-responses.js";
import type { EldenRingData } from "../setup.js";
import type { TrackerState } from "../store.js";
import { goalMenuOf } from "./goal.js";
import { regionsOf } from "./regions.js";
import { roomViewOf } from "./room.js";

/** What simulating reads, in the store. */
export type SimulateInputs = Pick<
  TrackerState,
  "slotData" | "received" | "checked" | "packages" | "keyChecks" | "slot"
>;

// The items a check made, or an item sent, holds in turn, by name; a key item is flagged progression.
const FOUND = [
  "Dectus Medallion (Right)",
  "Caelid Lock",
  "Rune Arc",
  "Golden Seed",
  "Smithing Stone [5]",
];
const SENT = [
  "Rusty Key",
  "Larval Tear",
  "Rold Medallion",
  "Godrick's Great Rune",
  "Somber Smithing Stone [1]",
  "Rune Arc",
];
const KEY_ITEM = /Lock|Key|Medallion|Great Rune/;

// NetworkItem.flags: the item can unlock logical advancement.
const PROGRESSION = 0b001;

/** The next key check left in an open region, the region given first; undefined when none is left. */
export function nextCheck(
  data: EldenRingData,
  inputs: SimulateInputs,
  region: string | undefined
): { readonly region: string; readonly id: number } | undefined {
  const summaries = [...(regionsOf(data, inputs) ?? [])];
  const checked = new Set(inputs.checked);
  const ordered = [
    ...summaries.filter(([code]) => code === region),
    ...summaries.filter(([code]) => code !== region),
  ];
  for (const [code, { state, ids }] of ordered) {
    const id =
      state === "locked"
        ? undefined
        : ids.find((each) => inputs.keyChecks?.has(each) === true && !checked.has(each));
    if (id !== undefined) {
      return { region: code, id };
    }
  }
  return undefined;
}

/** The next goal boss still to defeat, the region given first, as its drop's check and that check's region; undefined when none is left. */
export function nextBossDefeat(
  data: EldenRingData,
  inputs: SimulateInputs,
  region: string | undefined
): { readonly region: string; readonly id: number } | undefined {
  const bosses = goalMenuOf(data, inputs)?.bosses ?? [];
  const names = roomViewOf(inputs)?.names ?? {};
  const idOf = new Map(Object.entries(names).map(([id, name]) => [name, Number(id)]));
  const left = bosses.flatMap(({ state, drop }) => {
    const id = drop === undefined ? undefined : idOf.get(drop);
    const code = drop === undefined ? undefined : data.readLocationName(drop)?.regions[0];
    return state !== "to do" || id === undefined || code === undefined
      ? []
      : [{ region: code, id }];
  });
  return left.find((each) => each.region === region) ?? left[0];
}

/** slot_data with the All Bosses preset's options and goal, every boss a goal can name, in place of the room's own; its checks stay the room's. */
export function withAllBosses(
  data: EldenRingData,
  slotData: Readonly<Record<string, unknown>>
): Readonly<Record<string, unknown>> {
  const options = isRecord(slotData["options"]) ? slotData["options"] : {};
  return {
    ...slotData,
    options: { ...options, ...ALL_BOSSES_OPTIONS },
    goal: [...data.BOSSES.keys()],
  };
}

/** The websocket's events for making check `id`, its item the `step`th of the list; none without a slot. */
export function checkMade(inputs: SimulateInputs, id: number, step: number): LiveEvent[] {
  const { slot } = inputs;
  const item = itemFor(inputs, FOUND, step, id, slot ?? 0);
  return [
    // A RoomUpdate carries only what changed, as the server sends it and the live room reads it.
    {
      kind: "room update",
      update: { cmd: "RoomUpdate", checked_locations: [id] } as unknown as RoomUpdatePacket,
    },
    ...(item === undefined || slot === undefined ? [] : [arrival(inputs, item)]),
  ];
}

/** The websocket's event for an item another player sent, the `step`th of the list; none when the package names none. */
export function itemSent(inputs: SimulateInputs, step: number): LiveEvent[] {
  const from = inputs.slot === 2 ? 3 : 2;
  const item = itemFor(inputs, SENT, step, 0, from);
  return item === undefined ? [] : [arrival(inputs, item)];
}

// The `step`th item of a list the Elden Ring package names, found at `location` by `player`.
function itemFor(
  inputs: SimulateInputs,
  names: readonly string[],
  step: number,
  location: number,
  player: number
): NetworkItem | undefined {
  const named = inputs.packages.get(ELDEN_RING)?.itemNames;
  const known = names.flatMap((name) => {
    const id = [...(named ?? [])].find(([, each]) => each === name)?.[0];
    return id === undefined ? [] : [{ id, name }];
  });
  const picked = known[step % Math.max(1, known.length)];
  return picked === undefined
    ? undefined
    : { item: picked.id, location, player, flags: KEY_ITEM.test(picked.name) ? PROGRESSION : 0 };
}

// An item arriving, as a ReceivedItems after the items held.
function arrival(inputs: SimulateInputs, item: NetworkItem): LiveEvent {
  return {
    kind: "items received",
    items: [...inputs.received.map(({ value }) => value), item],
    added: [item],
    isWholeList: false,
  };
}
