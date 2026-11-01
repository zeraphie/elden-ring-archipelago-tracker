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
import { demoLocationNames, DEMO_SLOT } from "../../src/demo/room.js";
import { demoFetcher, routeOf } from "../../src/demo/web.js";
import { SIMULATED_ITEMS } from "../../src/state/utils/simulate.js";

const NOW = Date.UTC(2026, 10, 1, 12);
const fetcher = demoFetcher(() => NOW);

describe("demoFetcher", () => {
  test("says the room is awake at whatever time it's asked", async () => {
    expect(isAsleep(await getRoomStatus("demo", fetcher), NOW)).toBe(false);
  });

  test("has the demo's slot playing Elden Ring", async () => {
    const { players } = await getRoomStatus("demo", fetcher);
    expect(players).toEqual([{ name: DEMO_SLOT, game: ELDEN_RING }]);
  });

  test("gives a data package checksum the tracker can read", async () => {
    const { checksums } = await getStaticTracker("demo", fetcher);
    expect(isApworldSupported(checksums.get(ELDEN_RING))).toBe(true);
  });

  test("counts every check in the slot's total", async () => {
    const { totals } = await getStaticTracker("demo", fetcher);
    expect(totals[0]?.total).toBe(demoLocationNames().size);
  });

  test("names the room's checks and every item Simulate gives", async () => {
    const { itemNames, locationNames } = await getDataPackage(RULES_APWORLD.checksum, fetcher);
    expect(locationNames).toEqual(new Map(demoLocationNames()));
    expect(new Set(itemNames.values())).toEqual(new Set(SIMULATED_ITEMS));
  });

  test("gives slot_data the rules can read", async () => {
    const [slot] = await getSlotData("demo", fetcher);
    expect(slot?.player).toBe(1);
    expect(readRulesSlotData(slot?.slotData ?? {})?.goal).toHaveLength(2);
  });

  test("has the slot playing, with nothing done", async () => {
    const tracker = await getTracker("demo", fetcher);
    expect(tracker.status).toEqual([{ team: 0, player: 1, status: 20 }]);
    expect(tracker.checksDone).toEqual([]);
  });

  test("has no data package for another checksum", async () => {
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
