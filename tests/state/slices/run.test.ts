import { describe, expect, test } from "bun:test";
import type { RoomLink } from "../../../src/archipelago/room-link.js";
import { runTimeOf } from "../../../src/state/slices/run.js";
import { createTrackerStore } from "../../../src/state/store.js";
import { memory } from "../../fixtures/stores.js";

const LINK: RoomLink = { kind: "room", room: "run-room" };

// A store on a clock the test moves, with the page's leaving in its hands.
function setUp(kept = memory()) {
  const clock = { now: 1_000 };
  let leave: () => void = () => {};
  const store = createTrackerStore(LINK, {
    now: () => clock.now,
    storage: kept,
    quiet: {
      timer: () => {},
      onLeaving: (write) => {
        leave = write;
      },
    },
  });
  const time = () => runTimeOf(store.getState().run, clock.now);
  return { clock, kept, store, time, leave: () => leave() };
}

describe("the run's clock", () => {
  test("waits to be started", () => {
    const { clock, store, time } = setUp();
    clock.now += 5_000;
    expect(store.getState().run.phase).toBe("before");
    expect(time()).toBe(0);
  });

  test("counts once it's started", () => {
    const { clock, store, time } = setUp();
    store.getState().startRun(0);
    clock.now += 5_000;
    expect(time()).toBe(5_000);
  });

  test("starts from a typed time", () => {
    const { clock, store, time } = setUp();
    store.getState().startRun(60_000);
    clock.now += 5_000;
    expect(time()).toBe(65_000);
  });

  test("holds still while paused, and goes on from there", () => {
    const { clock, store, time } = setUp();
    store.getState().startRun(0);
    clock.now += 5_000;
    store.getState().pauseRun();
    clock.now += 60_000;
    expect(time()).toBe(5_000);
    store.getState().resumeRun();
    clock.now += 1_000;
    expect(time()).toBe(6_000);
  });

  test("goes back to the start on a reset", () => {
    const { clock, store, time } = setUp();
    store.getState().startRun(60_000);
    clock.now += 5_000;
    store.getState().resetRun();
    expect(store.getState().run.phase).toBe("before");
    expect(time()).toBe(0);
  });

  test("banking changes nothing about the time, and it counts on", () => {
    const { clock, store, time } = setUp();
    store.getState().startRun(0);
    clock.now += 5_000;
    store.getState().bankRun();
    expect(time()).toBe(5_000);
    clock.now += 1_000;
    expect(time()).toBe(6_000);
  });

  test("banking a paused run leaves it paused", () => {
    const { clock, store } = setUp();
    store.getState().startRun(0);
    clock.now += 5_000;
    store.getState().pauseRun();
    store.getState().bankRun();
    expect(store.getState().run.phase).toBe("paused");
  });
});

describe("the run's clock over a closed page", () => {
  // Starts a run, leaves the page 5 seconds in, and reopens it an hour later.
  async function reopened() {
    const before = setUp();
    before.store.getState().startRun(0);
    before.clock.now += 5_000;
    before.leave();
    const after = setUp(before.kept);
    after.clock.now = before.clock.now + 3_600_000;
    await after.store.persist.rehydrate();
    return after;
  }

  test("what was counted comes back, and the time away doesn't", async () => {
    const { time } = await reopened();
    expect(time()).toBe(5_000);
  });

  test("a running clock goes on by itself", async () => {
    const { clock, store, time } = await reopened();
    expect(store.getState().run.phase).toBe("running");
    clock.now += 1_000;
    expect(time()).toBe(6_000);
  });

  test("a paused clock stays paused", async () => {
    const before = setUp();
    before.store.getState().startRun(0);
    before.clock.now += 5_000;
    before.store.getState().pauseRun();
    before.leave();
    const after = setUp(before.kept);
    after.clock.now += 3_600_000;
    await after.store.persist.rehydrate();
    expect(after.store.getState().run.phase).toBe("paused");
    expect(after.time()).toBe(5_000);
  });

  test("a room kept before there was a timer starts with none", async () => {
    const kept = memory();
    await kept.setItem("room:run-room", "{}");
    const { store } = setUp(kept);
    await store.persist.rehydrate();
    expect(store.getState().run.phase).toBe("before");
  });
});

describe("a finished run", () => {
  test("stops the clock where the goal was reached", () => {
    const { clock, store, time } = setUp();
    store.getState().startRun(0);
    clock.now += 5_000;
    store.getState().endRun();
    clock.now += 60_000;
    expect(store.getState().run.phase).toBe("finished");
    expect(time()).toBe(5_000);
  });

  test("stops a paused clock where it was", () => {
    const { clock, store, time } = setUp();
    store.getState().startRun(0);
    clock.now += 5_000;
    store.getState().pauseRun();
    clock.now += 60_000;
    store.getState().endRun();
    expect(store.getState().run.phase).toBe("finished");
    expect(time()).toBe(5_000);
  });

  test("leaves a run not started as it is", () => {
    const { store } = setUp();
    store.getState().endRun();
    expect(store.getState().run.phase).toBe("before");
  });

  test("banking changes nothing about it", () => {
    const { clock, store, time } = setUp();
    store.getState().startRun(0);
    clock.now += 5_000;
    store.getState().endRun();
    clock.now += 5_000;
    store.getState().bankRun();
    expect(store.getState().run.phase).toBe("finished");
    expect(time()).toBe(5_000);
  });

  test("stays finished over a closed page", async () => {
    const before = setUp();
    before.store.getState().startRun(0);
    before.clock.now += 5_000;
    before.store.getState().endRun();
    before.leave();
    const after = setUp(before.kept);
    after.clock.now += 3_600_000;
    await after.store.persist.rehydrate();
    expect(after.store.getState().run.phase).toBe("finished");
    expect(after.time()).toBe(5_000);
  });

  test("goes back to the start on a reset", () => {
    const { store, time } = setUp();
    store.getState().startRun(0);
    store.getState().endRun();
    store.getState().resetRun();
    expect(store.getState().run.phase).toBe("before");
    expect(time()).toBe(0);
  });
});

describe("a run kept before it had times", () => {
  test("comes back with none, and takes them from there", async () => {
    const kept = memory();
    const state = { run: { phase: "paused", bankedMs: 5_000 } };
    await kept.setItem("room:run-room", JSON.stringify({ state, version: 1 }));
    const { store, time } = setUp(kept);
    await store.persist.rehydrate();
    expect(time()).toBe(5_000);
    expect(store.getState().run).toMatchObject({ checkTimes: {}, itemTimes: {} });
  });
});
