import { describe, expect, test } from "bun:test";
import type { DataPackage } from "../../../src/archipelago/web-responses.js";
import * as data from "../../../src/data/elden-ring.js";
import type { RosterEntry } from "../../../src/state/slices/roster.js";
import { feedOf, ownFindsOf } from "../../../src/state/utils/feed.js";
import { LOCATION_NAMES } from "../../fixtures/seeds.js";
import { firstCoded, inputs, PACKAGES } from "../../fixtures/slots.js";

// Sam, slot 2, plays a game whose package names its item 77 and its location 900.
const SAM: RosterEntry = {
  team: 0,
  slot: 2,
  name: "Sam",
  game: "Ocarina",
  checksDone: 0,
  total: undefined,
  status: 0,
  lastActive: undefined,
};
const WITH_SAMS_GAME = new Map<string, DataPackage>([
  ...PACKAGES,
  [
    "Ocarina",
    {
      checksum: "oot",
      itemNames: new Map([[77, "Hookshot"]]),
      locationNames: new Map([[900, "Mido's House"]]),
    },
  ],
]);
const LIMGRAVE = firstCoded("LG");
const nameOfLimgrave = (): string => LOCATION_NAMES.get(LIMGRAVE) ?? "";
const item = (id: number, location: number, player: number) => ({
  item: id,
  location,
  player,
  flags: 0,
});

describe("ownFindsOf", () => {
  const item = (id: number, player: number, flags = 0, location = LIMGRAVE) => ({
    value: { item: id, location, player, flags },
    at: 5,
  });

  test("gives the slot's own finds, with their check, and not what others sent", () => {
    const finds = ownFindsOf(data, inputs({ received: [item(1, 1), item(2, 2)] }));
    expect(finds.map(({ item: name }) => name)).toEqual(["Rusty Key"]);
    expect(finds[0]?.check).toEqual(data.checkName(nameOfLimgrave()));
    expect(finds[0]?.at).toBe(5);
  });

  test("says whether a find is a key item, and whether it was in a key check", () => {
    const key = inputs({ received: [item(1, 1, 1)], keyChecks: new Set([LIMGRAVE]) });
    expect(ownFindsOf(data, key)[0]).toMatchObject({ isProgression: true, isKeyCheck: true });
    const other = inputs({ received: [item(1, 1)], keyChecks: new Set() });
    expect(ownFindsOf(data, other)[0]).toMatchObject({ isProgression: false, isKeyCheck: false });
  });
});

describe("feedOf", () => {
  test("an item another player found for this slot is received, with where in their world", () => {
    const feed = feedOf(
      data,
      inputs({
        received: [{ value: item(1, 900, 2), at: 5 }],
        roster: [SAM],
        packages: WITH_SAMS_GAME,
      })
    );
    expect(feed).toEqual([
      {
        kind: "received",
        at: 5,
        item: "Rusty Key",
        isProgression: false,
        from: { slot: 2, name: "Sam" },
        game: "Ocarina",
        location: "Mido's House",
      },
    ]);
  });

  test("a received item is a key item when Archipelago flags it as progression", () => {
    const progression = { ...item(1, 900, 2), flags: 0b001 };
    const feed = feedOf(data, inputs({ received: [{ value: progression }], roster: [SAM] }));
    expect(feed[0]).toMatchObject({ kind: "received", isProgression: true });
  });

  test("an item this slot found for itself is its check's own, and not in the feed", () => {
    expect(feedOf(data, inputs({ received: [{ value: item(1, LIMGRAVE, 1) }] }))).toEqual([]);
  });

  test("an item sent to another player names the check it was in, with its region", () => {
    const feed = feedOf(
      data,
      inputs({
        sent: [{ value: { item: item(77, LIMGRAVE, 1), receiving: 2 }, at: 7 }],
        roster: [SAM],
        packages: WITH_SAMS_GAME,
      })
    );
    expect(feed[0]).toMatchObject({
      kind: "sent",
      at: 7,
      item: "Hookshot",
      to: { slot: 2, name: "Sam" },
      check: { region: "LG", id: LIMGRAVE },
    });
  });

  test("comes newest first, with those the tracker saw before it was watching last", () => {
    const feed = feedOf(
      data,
      inputs({
        received: [
          { value: item(1, 900, 2) },
          { value: item(2, 901, 2), at: 10 },
          { value: item(1, 902, 2), at: 20 },
        ],
        roster: [SAM],
      })
    );
    expect(feed.map(({ at }) => at)).toEqual([20, 10, undefined]);
  });

  test("the same inputs give the same feed back", () => {
    const same = inputs({ received: [{ value: item(1, 900, 2) }] });
    expect(feedOf(data, same)).toBe(feedOf(data, same));
  });
});
