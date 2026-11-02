/**
 * ─ Demo snapshot ─
 *
 * The run the demo room opens on, partway through, played out once by
 * Simulate's own ways of making a check. Key checks go region by region: most
 * hold their own item from the unrandomised game, every so often one holds the
 * next of Simulate's key items or an item for another player, and the others
 * send a few in turn. A share of every open region's other checks follow, each
 * with its own item. It leaves later locks in Simulate's list for the buttons.
 */

import type { LiveEvent } from "../archipelago/live-events.js";
import { ELDEN_RING } from "../archipelago/look-up.js";
import { PROGRESSION, type NetworkItem } from "../archipelago/web-responses.js";
import * as data from "../data/elden-ring.js";
import { readLocationName } from "../data/names/location-name.js";
import { RULES_APWORLD } from "../data/rules/apworld.js";
import { keyChecksFrom } from "../state/utils/key-checks.js";
import { regionsOf } from "../state/utils/regions.js";
import { checkMade, itemSent, nextCheck, type SimulateInputs } from "../state/utils/simulate.js";
import { idIn, OTHER_PLAYERS } from "./players.js";
import { demoItemNames, demoLocationNames, demoSlotData, DEMO_PLAYER } from "./room.js";

/** An item the demo's slot found for another player. */
export interface SentItem {
  readonly receiving: number;
  readonly item: NetworkItem;
}

/** Where the run stands as the room opens. */
export interface Snapshot {
  readonly checked: readonly number[];
  /** Every item the slot holds, in the order it came. */
  readonly received: readonly NetworkItem[];
  readonly sent: readonly SentItem[];
  /** The key checks still to make, for a hint to name. */
  readonly keyChecksLeft: readonly number[];
  /** The item the opening hint names, in the first of those. */
  readonly hint: NetworkItem;
}

// A bit under a third of the run's key checks.
const KEY_CHECKS = 48;
// Which key checks hold what, out of every eight: a key item of Simulate's, an item that arrives
// from another player alongside, and an item for another player.
const KEY_ITEM_AT = [0, 4];
const ARRIVAL_AT = 3;
const SENT_AT = 7;
// The share of each open region's other checks made, about what a player has passed on the way.
const OTHERS_MADE = 0.3;
const HINTED_ITEM = "Dectus Medallion (Left)";

let made: Snapshot | undefined;

/** The run the demo room opens on; it's played out once. */
export function demoSnapshot(): Snapshot {
  made ??= played();
  return made;
}

function played(): Snapshot {
  const slotData = demoSlotData();
  const locationNames = demoLocationNames();
  const itemNames = demoItemNames();
  const checksum = RULES_APWORLD.checksum;
  const packages = new Map([[ELDEN_RING, { checksum, itemNames, locationNames }]]);
  const keyChecks = keyChecksFrom(data, slotData, locationNames);
  const checked: number[] = [];
  const received: NetworkItem[] = [];
  const sent: SentItem[] = [];
  const inputs = (): SimulateInputs => ({
    slotData,
    packages,
    keyChecks,
    slot: DEMO_PLAYER.player,
    checked: [...checked],
    received: received.map((value) => ({ value })),
  });
  const take = (events: readonly LiveEvent[], change = (item: NetworkItem) => item): void => {
    for (const event of events) {
      if (event.kind === "room update") {
        checked.push(...(event.update.checked_locations ?? []));
      }
      if (event.kind === "items received") {
        received.push(...event.added.map(change));
      }
    }
  };
  const ownItem = (id: number): LiveEvent[] => {
    const vanilla = readLocationName(locationNames.get(id) ?? "")?.vanilla;
    return checkMade(inputs(), id, 0, vanilla === undefined ? [] : [vanilla]);
  };

  let keyItems = 0;
  let arrivals = 0;
  for (let step = 0; step < KEY_CHECKS; step += 1) {
    const next = nextCheck(data, inputs(), undefined);
    if (next === undefined) {
      break;
    }
    const beat = step % 8;
    if (beat === SENT_AT) {
      checked.push(next.id);
      const to = OTHER_PLAYERS[sent.length % OTHER_PLAYERS.length];
      if (to !== undefined) {
        sent.push(sentTo(to.player, to.items, sent.length, next.id));
      }
    } else if (KEY_ITEM_AT.includes(beat)) {
      take(checkMade(inputs(), next.id, keyItems));
      keyItems += 1;
    } else {
      take(ownItem(next.id));
    }
    if (beat === ARRIVAL_AT) {
      const from = OTHER_PLAYERS[arrivals % OTHER_PLAYERS.length];
      const location = from === undefined ? 0 : (arrivals % from.locations.length) + 1;
      take(itemSent(inputs(), arrivals), (item) => ({
        ...item,
        player: from?.player ?? item.player,
        location,
      }));
      arrivals += 1;
    }
  }
  for (const [, { state, ids, outOfReach }] of regionsOf(data, inputs()) ?? []) {
    if (state !== "locked") {
      const others = ids.filter((id) => keyChecks?.has(id) !== true && !outOfReach.has(id));
      others.slice(0, Math.ceil(others.length * OTHERS_MADE)).forEach((id) => take(ownItem(id)));
    }
  }
  const done = new Set(checked);
  return {
    checked,
    received,
    sent,
    keyChecksLeft: [...(keyChecks ?? [])].filter((id) => !done.has(id)),
    hint: {
      item: [...itemNames].find(([, name]) => name === HINTED_ITEM)?.[0] ?? 0,
      location: nextCheck(data, inputs(), undefined)?.id ?? 0,
      player: DEMO_PLAYER.player,
      flags: PROGRESSION,
    },
  };
}

// The `nth` item found for a player: the next of their game's items, from this check.
function sentTo(
  receiving: number,
  items: readonly string[],
  nth: number,
  location: number
): SentItem {
  const name = items[nth % items.length] ?? "";
  return {
    receiving,
    item: { item: idIn(items, name), location, player: DEMO_PLAYER.player, flags: PROGRESSION },
  };
}
