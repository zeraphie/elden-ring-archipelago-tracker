import { describe, expect, test } from "bun:test";
import { ELDEN_RING } from "../../src/archipelago/look-up.js";
import { DEMO_LINK } from "../../src/archipelago/room-link.js";
import * as data from "../../src/data/elden-ring.js";
import {
  demoItemNames,
  demoLocationNames,
  demoSlotData,
  DEMO_PLAYER,
} from "../../src/demo/room.js";
import { demoEarlierRuns, demoRun } from "../../src/demo/run.js";
import { demoSnapshot } from "../../src/demo/snapshot.js";
import { demoWays } from "../../src/demo/ways.js";
import { runTimeOf } from "../../src/state/slices/run.js";
import { goalMenuOf } from "../../src/state/utils/goal.js";
import { comparisonOf } from "../../src/state/utils/run-compare.js";
import { rowTimesOf } from "../../src/state/utils/run-times.js";
import { loaded } from "../fixtures/stores.js";

const { checked, received } = demoSnapshot();
const RUN = demoRun();
const CHECK_TIMES = checked.map((id) => RUN.checkTimes[id] ?? 0);

describe("the demo's run", () => {
  test("is under way, past every check made", () => {
    expect(RUN.phase).toBe("running");
    expect(RUN.bankedMs).toBeGreaterThan(Math.max(...CHECK_TIMES));
  });

  test("has a time for every check, rising in the order they were made", () => {
    expect(CHECK_TIMES.every((time) => time > 0)).toBe(true);
    expect(CHECK_TIMES).toEqual([...CHECK_TIMES].sort((a, b) => a - b));
  });

  test("has a time for every item, the slot's own finds with the check that held them", () => {
    received.forEach(({ location, player }, place) => {
      expect(RUN.itemTimes[place]).toBeGreaterThan(0);
      if (player === DEMO_PLAYER.player) {
        expect(RUN.itemTimes[place]).toBe(RUN.checkTimes[location]);
      }
    });
  });

  test("comes back in the demo's room, going on by itself", async () => {
    const clock = { now: 1_000 };
    const store = await loaded(DEMO_LINK, { now: () => clock.now, storage: demoWays().storage });
    clock.now += 5_000;
    const { run } = store.getState();
    expect(run.phase).toBe("running");
    expect(runTimeOf(run, clock.now)).toBe(RUN.bankedMs + 5_000);
  });

  test("gives every row of the goal gotten so far a time", () => {
    const names = demoLocationNames();
    const state = {
      slotData: demoSlotData(),
      packages: new Map([
        [ELDEN_RING, { checksum: "demo", itemNames: demoItemNames(), locationNames: names }],
      ]),
      received: received.map((value) => ({ value })),
      checked,
      run: RUN,
    };
    const times = rowTimesOf(data, state);
    const met = goalMenuOf(data, state)?.met ?? [];
    expect(met.length).toBeGreaterThan(0);
    expect(met.map(times.need).every((time) => time !== undefined)).toBe(true);
  });
});

describe("the runs behind the demo's", () => {
  test("come in with the room, by its preset", async () => {
    const store = await loaded(DEMO_LINK, { storage: demoWays().storage });
    store.getState().takeSlotData(demoSlotData());
    await new Promise((resolve) => setTimeout(resolve));
    expect(store.getState().earlierRuns).toHaveLength(2);
  });

  test("have every row of the goal", () => {
    const [fastest, slower] = demoEarlierRuns();
    expect(Object.keys(fastest?.rows ?? {})).toHaveLength(6);
    expect(Object.keys(slower?.rows ?? {})).toHaveLength(6);
  });

  test("hold a row of each kind against the run, so each colour shows on the demo", () => {
    const [fastest] = demoEarlierRuns();
    const compared = comparisonOf(demoEarlierRuns());
    const paces = Object.keys(fastest?.rows ?? {}).map(
      (key) => compared.paceOf(key, RUN.bankedMs)?.pace
    );
    expect(paces).toContain("ahead");
    expect(paces).toContain("behind");
    expect(paces).toContain("best");
  });
});
