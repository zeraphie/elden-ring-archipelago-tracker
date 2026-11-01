import { describe, expect, test } from "bun:test";
import type { DataPackage } from "../../../src/archipelago/web-responses.js";
import * as data from "../../../src/data/elden-ring.js";
import {
  checkMade,
  itemSent,
  nextBossDefeat,
  nextCheck,
  withAllBosses,
} from "../../../src/state/utils/simulate.js";
import { keyChecksFrom } from "../../../src/state/utils/key-checks.js";
import { arrivingSlot, LOCATION_NAMES, seed, slotOf } from "../../fixtures/seeds.js";
import { firstCoded, GODFREY, idOf, inputs, SLOT_DATA } from "../../fixtures/slots.js";

const LIMGRAVE = firstCoded("LG");
const LIURNIA = firstCoded("LL");
// A package that also names the first item a check holds.
const WITH_FOUND = new Map<string, DataPackage>([
  [
    "EldenRing",
    {
      checksum: "test",
      itemNames: new Map([
        [1, "Rusty Key"],
        [5, "Dectus Medallion (Right)"],
      ]),
      locationNames: new Map(),
    },
  ],
]);

describe("nextCheck", () => {
  test("is the given region's next key check left, while it's open", () => {
    const keyChecks = new Set([LIMGRAVE]);
    expect(nextCheck(data, inputs({ keyChecks }), "LG")).toEqual({ region: "LG", id: LIMGRAVE });
  });

  test("passes over a locked region and one with every key check checked", () => {
    const keyChecks = new Set([LIURNIA, LIMGRAVE]);
    // Liurnia is locked from the start, so Limgrave's comes first even when Liurnia's asked for.
    expect(nextCheck(data, inputs({ keyChecks }), "LL")).toEqual({ region: "LG", id: LIMGRAVE });
    expect(nextCheck(data, inputs({ keyChecks, checked: [LIMGRAVE] }), "LG")).toBeUndefined();
  });
});

describe("nextBossDefeat", () => {
  const MARGIT = 10000850;
  const GODFREYS_DROP = idOf("LRC/WCR: Talisman Pouch - mainboss drop");
  const MORGOTTS_DROP = idOf("LRC/QB: Morgott's Great Rune - mainboss drop");
  const withGoal = (goal: number[]) => inputs({ slotData: { ...SLOT_DATA, goal } });

  test("is the drop of the goal's next boss still to defeat, in the goal's order", () => {
    expect(nextBossDefeat(data, inputs(), undefined)).toEqual({ region: "LRC", id: GODFREYS_DROP });
  });

  test("takes a boss in the given region first", () => {
    expect(nextBossDefeat(data, withGoal([GODFREY, MARGIT]), "SV")).toEqual({
      region: "SV",
      id: idOf("SV/CT: Talisman Pouch - boss drop"),
    });
  });

  test("passes over a boss defeated, and is undefined once none is left", () => {
    expect(nextBossDefeat(data, inputs({ checked: [GODFREYS_DROP] }), undefined)?.id).toBe(
      MORGOTTS_DROP
    );
    const both = inputs({ checked: [GODFREYS_DROP, MORGOTTS_DROP] });
    expect(nextBossDefeat(data, both, undefined)).toBeUndefined();
  });
});

describe("withAllBosses", () => {
  const room = arrivingSlot(seed("Izzy's preset"));
  const swapped = withAllBosses(data, room);

  test("takes the All Bosses preset's rules and every boss as the goal, keeping the room's checks", () => {
    expect(swapped["options"]).toMatchObject({
      great_runes_required_erdtree: 7,
      key_item_shards: { MessmerKindlingShards: { Max: 5, Req: 3 } },
    });
    expect(swapped["goal"]).toEqual([...data.BOSSES.keys()]);
    expect(swapped["locationIdsToKeys"]).toBe(room["locationIdsToKeys"]);
  });

  test("gives the room the preset's key checks, among its own checks", () => {
    const own = keyChecksFrom(data, room, LOCATION_NAMES);
    const preset = keyChecksFrom(data, swapped, LOCATION_NAMES);
    expect(preset?.size).toBeGreaterThan(0);
    expect(preset).not.toEqual(own);
    const { locationIdsToName } = slotOf(seed("Izzy's preset"));
    expect([...(preset ?? [])].every((id) => String(id) in locationIdsToName)).toBe(true);
  });
});

describe("checkMade", () => {
  test("checks the location, and gives this slot the item it held there", () => {
    const events = checkMade(inputs({ packages: WITH_FOUND }), LIMGRAVE, 0);
    expect(events[0]).toMatchObject({
      kind: "room update",
      update: { checked_locations: [LIMGRAVE] },
    });
    expect(events[1]).toMatchObject({
      kind: "items received",
      added: [{ item: 5, location: LIMGRAVE, player: 1, flags: 0b001 }],
      isWholeList: false,
    });
  });

  test("takes its item from the list it's given, in place of its own", () => {
    const events = checkMade(inputs({ packages: WITH_FOUND }), LIMGRAVE, 0, ["Rusty Key"]);
    expect(events[1]).toMatchObject({ added: [{ item: 1, location: LIMGRAVE, player: 1 }] });
  });

  test("with no item the package names, only checks the location", () => {
    const events = checkMade(inputs({ packages: new Map() }), LIMGRAVE, 0);
    expect(events.map(({ kind }) => kind)).toEqual(["room update"]);
  });
});

describe("itemSent", () => {
  test("sends this slot an item from another slot, a key item flagged progression", () => {
    expect(itemSent(inputs(), 0)).toMatchObject([
      { kind: "items received", added: [{ item: 1, player: 2, flags: 0b001 }] },
    ]);
  });

  test("goes on through its list, one step at a time", () => {
    const [first] = itemSent(inputs(), 0);
    const [second] = itemSent(inputs(), 1);
    expect(first).not.toEqual(second);
  });
});
