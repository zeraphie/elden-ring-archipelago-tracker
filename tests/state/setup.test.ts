import { describe, expect, test } from "bun:test";
import type { StateStorage } from "zustand/middleware";
import { lookUp, type Found } from "../../src/archipelago/look-up.js";
import type { Fetcher } from "../../src/archipelago/web-api.js";
import {
  Setup,
  type Choice,
  type Part,
  type PartState,
  type EldenRingData,
  type SetupFailure,
} from "../../src/state/setup.js";
import { keyChecks } from "../../src/data/checks/key-checks.js";
import { arrivingSlot, LOCATION_NAMES, seed, slotOf } from "../fixtures/seeds.js";
import { testRoom, TRACKER_VERSION } from "../fixtures/sockets.js";
import { memory } from "../fixtures/stores.js";
import { settle, until } from "../fixtures/waits.js";
import { recordedWeb } from "../fixtures/web.js";
import webApi from "../fixtures/web-api.json";

const ROOM = "q3Xh8sJm2PzK0tLw9RbVcA";
const NOW = () => Date.parse("Thu, 22 Oct 2026 21:00:00 GMT");
const TARNISHED: Choice = { team: 0, player: 1, name: "Tarnished" };

// A link looked up on the recorded web API and a test room with this password.
async function found(kind: "room" | "tracker", password?: string) {
  const room = testRoom(password);
  const link = kind === "room" ? { kind, room: ROOM } : { kind, tracker: ROOM };
  const result = await lookUp(link, {
    fetcher: recordedWeb().fetcher,
    opener: room.opener,
    now: NOW,
  });
  if (result.kind !== "found") {
    throw new Error(`The test's ${kind} wasn't found: ${result.kind}`);
  }
  return { found: result.found, room };
}

// A setup on what was found, with every part it named and how it ended open to look at.
function settingUp(
  looked: { found: Found; room: ReturnType<typeof testRoom> },
  options: {
    choice?: Choice;
    fetcher?: Fetcher;
    storage?: StateStorage;
    pace?: () => number;
    timer?: (run: () => void, ms: number) => unknown;
    loadEldenRing?: () => Promise<EldenRingData>;
  } = {}
) {
  const parts: [Part, PartState][] = [];
  const ended: { isReady: boolean; failure?: SetupFailure } = { isReady: false };
  const setup = new Setup(looked.found, options.choice ?? TARNISHED, {
    version: TRACKER_VERSION,
    onPart: (part, state) => parts.push([part, state]),
    onReady: () => {
      ended.isReady = true;
    },
    onStopped: (failure) => {
      ended.failure = failure;
    },
    fetcher: options.fetcher ?? recordedWeb().fetcher,
    opener: looked.room.opener,
    timer: options.timer ?? (() => undefined),
    now: NOW,
    storage: options.storage ?? memory(),
    pace: options.pace,
    loadEldenRing: options.loadEldenRing,
  });
  // Where each part stands last.
  const latest = () => Object.fromEntries(parts);
  return { setup, parts, ended, latest };
}

describe("Setup", () => {
  test("a room's parts load side by side, and it's ready once every one is in", async () => {
    const run = settingUp(await found("room"));
    expect(run.parts.slice(0, 8)).toEqual([
      ["status", "loading"],
      ["data package", "loading"],
      ["slot data", "loading"],
      ["elden ring data", "loading"],
      ["history", "loading"],
      ["connected", "loading"],
      ["saved", "loading"],
      ["status", "in"],
    ]);
    await until(() => run.ended.isReady);
    expect(Object.values(run.latest())).toEqual(Array(7).fill("in"));
    const state = run.setup.store.getState();
    expect([...state.packages.keys()].sort()).toEqual(["Archipelago", "EldenRing"]);
    expect(state.slotData?.slot).toBe("Tarnished");
    expect([state.team, state.slot]).toEqual([0, 1]);
    expect(state.connection.phase).toBe("connected");
    expect(state.hasPolled).toBe(true);
    run.setup.stop();
  });

  test("a tracker link has no status or live connection, and its slot_data came with looking it up", async () => {
    const run = settingUp(await found("tracker"));
    await until(() => run.ended.isReady);
    expect(run.latest()).toEqual({
      "data package": "in",
      "slot data": "in",
      "elden ring data": "in",
      history: "in",
      saved: "in",
    });
    expect(run.setup.store.getState().connection.phase).toBe("web only");
    run.setup.stop();
  });

  test("a data package that doesn't arrive stops it, naming the part, and closes the socket", async () => {
    const looked = await found("room");
    const run = settingUp(looked, {
      fetcher: recordedWeb({ datapackage: { status: 503 } }).fetcher,
    });
    await until(() => run.ended.failure !== undefined);
    expect(run.ended).toEqual({
      isReady: false,
      failure: { part: "data package", problem: "unreachable" },
    });
    expect(looked.room.sockets[0]?.socket.isClosed).toBe(true);
  });

  test("a RoomInfo without its checksums stops it at the data package", async () => {
    const looked = await found("room");
    if (looked.found.kind !== "room") {
      throw new Error("The test's room wasn't a room.");
    }
    const { datapackage_checksums: _left, ...bare } = looked.found.socket.info;
    const run = settingUp({
      ...looked,
      found: { ...looked.found, socket: Object.assign(looked.found.socket, { info: bare }) },
    });
    await until(() => run.ended.failure !== undefined);
    expect(run.ended.failure).toEqual({ part: "data package", problem: "unexpected" });
  });

  test("a pace holds each part back once it's in, and it's ready only once the last is let through", async () => {
    const held: (() => void)[] = [];
    const run = settingUp(await found("room"), {
      pace: () => 300,
      timer: (wait, ms) => {
        if (ms === 300) {
          held.push(wait);
        }
      },
    });
    await until(() => held.length === 7);
    expect(Object.values(run.latest())).toEqual(Array(7).fill("loading"));
    held.splice(0, 6).forEach((wait) => wait());
    expect(run.ended.isReady).toBe(false);
    held.splice(0).forEach((wait) => wait());
    expect(run.ended.isReady).toBe(true);
    expect(Object.values(run.latest())).toEqual(Array(7).fill("in"));
    run.setup.stop();
  });

  test("the slot's key checks are worked out from its slot_data and names once the Elden Ring data is in", async () => {
    const preset = seed("Izzy's preset");
    const slot = slotOf(preset);
    const names = Object.fromEntries([...LOCATION_NAMES].map(([id, name]) => [name, id]));
    const run = settingUp(await found("room"), {
      fetcher: recordedWeb({
        datapackage: { body: { ...webApi.datapackage, location_name_to_id: names } },
        slot_data_tracker: {
          body: [{ player: 1, slot_data: { ...arrivingSlot(preset), slot: "Tarnished" } }],
        },
      }).fetcher,
    });
    await until(() => run.ended.isReady);
    expect(run.setup.store.getState().keyChecks).toEqual(keyChecks(slot));
    run.setup.stop();
  });

  test("Elden Ring data that won't load stops it, naming the part", async () => {
    const run = settingUp(await found("room"), {
      loadEldenRing: () =>
        Promise.reject(new TypeError("Failed to fetch dynamically imported module")),
    });
    await until(() => run.ended.failure !== undefined);
    expect(run.ended.failure).toEqual({ part: "elden ring data", problem: "unreachable" });
  });

  test("a wrong password stops it at the live connection", async () => {
    const run = settingUp(await found("room", "secret"), {
      choice: { ...TARNISHED, password: "wrong" },
    });
    await until(() => run.ended.failure !== undefined);
    expect(run.ended.failure).toEqual({ part: "connected", problem: "invalid password" });
  });

  test("the right password logs in", async () => {
    const run = settingUp(await found("room", "secret"), {
      choice: { ...TARNISHED, password: "secret" },
    });
    await until(() => run.ended.isReady);
    expect(run.setup.store.getState().connection.phase).toBe("connected");
    run.setup.stop();
  });

  test("nothing is written over what this device kept, while it's still loading", async () => {
    const kept = memory();
    const earlier = { value: { item: 72080, location: -1, player: 0, flags: 0 } };
    kept.items.set(
      `room:${ROOM}`,
      JSON.stringify({ state: { received: [earlier], sent: [], log: [] }, version: 1 })
    );
    let release = () => {};
    const writes: string[] = [];
    const slow: StateStorage = {
      getItem: (key) =>
        new Promise((resolve) => {
          release = () => resolve(kept.items.get(key) ?? null);
        }),
      setItem: (key, value) => {
        writes.push(key);
        return kept.setItem(key, value);
      },
      removeItem: (key) => kept.removeItem(key),
    };
    const run = settingUp(await found("room"), { storage: slow });
    for (let turn = 0; turn < 10; turn += 1) {
      await settle();
    }
    expect(run.latest()["slot data"]).toBe("in");
    expect(writes).toEqual([]);
    release();
    await until(() => run.ended.isReady);
    expect(run.setup.store.getState().received[0]).toEqual(earlier);
    run.setup.stop();
  });

  test("a database that fails is named, and the tracker carries on without it", async () => {
    const failing: StateStorage = {
      getItem: () => Promise.reject(new Error("no database")),
      setItem: () => Promise.resolve(),
      removeItem: () => Promise.resolve(),
    };
    const run = settingUp(await found("room"), { storage: failing });
    await until(() => run.ended.isReady);
    expect(run.latest().saved).toBe("failed");
    run.setup.stop();
  });

  test("stopped before it's ready, it closes the socket it was handed", async () => {
    const looked = await found("room");
    const run = settingUp(looked);
    run.setup.stop();
    await settle();
    expect(looked.room.sockets[0]?.socket.isClosed).toBe(true);
    expect(run.ended.isReady).toBe(false);
  });
});
