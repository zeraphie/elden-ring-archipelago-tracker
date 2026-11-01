import { describe, expect, test } from "bun:test";
import { readRulesSlotData } from "../../src/archipelago/elden-ring-slot.js";
import { ELDEN_RING } from "../../src/archipelago/look-up.js";
import {
  getDataPackage,
  getRoomStatus,
  getSlotData,
  getStaticTracker,
  getTracker,
} from "../../src/archipelago/web-api.js";
import { isAsleep } from "../../src/archipelago/web-responses.js";
import { isApworldSupported, RULES_APWORLD } from "../../src/data/rules/apworld.js";
import { OTHER_PLAYERS } from "../../src/demo/players.js";
import { demoItemNames, demoLocationNames, DEMO_SLOT } from "../../src/demo/room.js";
import { demoSnapshot } from "../../src/demo/snapshot.js";
import { demoFetcher, routeOf } from "../../src/demo/web.js";
import { SIMULATED_ITEMS } from "../../src/state/utils/simulate.js";

const NOW = Date.UTC(2026, 10, 1, 12);
const fetcher = demoFetcher(() => NOW);
const SNAPSHOT = demoSnapshot();

describe("demoFetcher", () => {
  test("says the room is awake at whatever time it's asked", async () => {
    expect(isAsleep(await getRoomStatus("demo", fetcher), NOW)).toBe(false);
  });

  test("has the demo's slot playing Elden Ring, then the others in slot order", async () => {
    const { players } = await getRoomStatus("demo", fetcher);
    expect(players).toEqual([
      { name: DEMO_SLOT, game: ELDEN_RING },
      ...OTHER_PLAYERS.map(({ name, game }) => ({ name, game })),
    ]);
  });

  test("gives a data package checksum the tracker can read", async () => {
    const { checksums } = await getStaticTracker("demo", fetcher);
    expect(isApworldSupported(checksums.get(ELDEN_RING))).toBe(true);
  });

  test("gives every player's game and total", async () => {
    const { games, totals } = await getStaticTracker("demo", fetcher);
    expect(games.map(({ game }) => game)).toEqual([
      ELDEN_RING,
      ...OTHER_PLAYERS.map(({ game }) => game),
    ]);
    expect(totals.map(({ total }) => total)).toEqual([
      demoLocationNames().size,
      ...OTHER_PLAYERS.map(({ total }) => total),
    ]);
  });

  test("names the room's checks and every item Simulate gives", async () => {
    const { itemNames, locationNames } = await getDataPackage(RULES_APWORLD.checksum, fetcher);
    expect(locationNames).toEqual(new Map(demoLocationNames()));
    expect(itemNames).toEqual(new Map(demoItemNames()));
    expect(SIMULATED_ITEMS.every((name) => [...itemNames.values()].includes(name))).toBe(true);
  });

  test("gives each other player's game a package of its own", async () => {
    const [sam] = OTHER_PLAYERS;
    const { itemNames, locationNames } = await getDataPackage(sam?.checksum ?? "", fetcher);
    expect([...itemNames.values()]).toEqual([...(sam?.items ?? [])]);
    expect([...locationNames.values()]).toEqual([...(sam?.locations ?? [])]);
  });

  test("gives slot_data the rules can read", async () => {
    const [slot] = await getSlotData("demo", fetcher);
    expect(slot?.player).toBe(1);
    expect(readRulesSlotData(slot?.slotData ?? {})?.goal).toHaveLength(2);
  });

  test("has everyone playing", async () => {
    const tracker = await getTracker("demo", fetcher);
    expect(tracker.status).toHaveLength(1 + OTHER_PLAYERS.length);
    expect(tracker.status.every(({ status }) => status === 20)).toBe(true);
  });

  test("tells the slot's checks and items as the snapshot has them", async () => {
    const tracker = await getTracker("demo", fetcher);
    const mine = tracker.checksDone.find(({ player }) => player === 1);
    expect(mine?.locations).toEqual([...SNAPSHOT.checked]);
    const items = tracker.itemsReceived.find(({ player }) => player === 1);
    expect(items?.items).toEqual([...SNAPSHOT.received]);
  });

  test("tells what the slot found for the others among their items", async () => {
    const tracker = await getTracker("demo", fetcher);
    const theirs = tracker.itemsReceived
      .filter(({ player }) => player !== 1)
      .flatMap(({ items }) => items);
    expect(theirs).toHaveLength(SNAPSHOT.sent.length);
    expect(theirs.every(({ player }) => player === 1)).toBe(true);
  });

  test("counts the others' checks as they stand", async () => {
    const tracker = await getTracker("demo", fetcher);
    for (const { player, checksDone } of OTHER_PLAYERS) {
      const theirs = tracker.checksDone.find((each) => each.player === player);
      expect(theirs?.locations).toHaveLength(checksDone);
    }
  });

  test("has no data package for a game nobody here plays", async () => {
    await expect(getDataPackage("another", fetcher)).rejects.toMatchObject({
      problem: "not found",
    });
  });

  test("answers any other address as the site does", async () => {
    const { status } = await fetcher("https://archipelago.gg/api/generate");
    expect(status).toBe(404);
  });
});

describe("routeOf", () => {
  test("tells a tracker route from the routes with tracker in their names", () => {
    expect(routeOf("https://archipelago.gg/api/tracker/demo")).toBe("tracker");
    expect(routeOf("https://archipelago.gg/api/static_tracker/demo")).toBe("static_tracker");
    expect(routeOf("https://archipelago.gg/api/slot_data_tracker/demo")).toBe("slot_data_tracker");
  });
});
