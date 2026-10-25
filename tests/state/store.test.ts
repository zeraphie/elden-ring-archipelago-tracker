import { describe, expect, test } from "bun:test";
import type { ConnectedPacket, RoomUpdatePacket } from "archipelago.js";
import type { StateStorage } from "zustand/middleware";
import type { LiveEvent } from "../../src/archipelago/live-events.js";
import { LiveRoom } from "../../src/archipelago/live-room.js";
import { RoomSocket } from "../../src/archipelago/room-socket.js";
import {
  readDataPackage,
  readStaticTracker,
  readTracker,
  type TrackerData,
} from "../../src/archipelago/web-responses.js";
import { createTrackerStore, forgetKept } from "../../src/state/store.js";
import type { History } from "../../src/archipelago/tracker-poll.js";
import fixture from "../fixtures/live-packets.json";
import { roomInfo, TestSocket } from "../fixtures/sockets.js";
import { loaded, memory } from "../fixtures/stores.js";
import webApi from "../fixtures/web-api.json";

const ROOM = "q3Xh8sJm2PzK0tLw9RbVcA";

// A clock a test moves by hand.
function clock(start = 1_000) {
  let time = start;
  return {
    now: () => time,
    tick: (ms: number) => {
      time += ms;
    },
  };
}

const item = (n: number, player = 1) => ({ item: n, location: n, player, flags: 0 });
const PLAYERS = [{ team: 0, slot: 1, alias: "Tarnished", name: "Tarnished" }];
const LOGIN: LiveEvent = {
  kind: "connected",
  connected: {
    cmd: "Connected",
    team: 0,
    slot: 1,
    players: PLAYERS,
    checked_locations: [1, 2],
    missing_locations: [3, 4, 5],
    hint_points: 7,
  } as unknown as ConnectedPacket,
  hintPercent: 40,
  releasePermission: 2,
  serverVersion: { major: 0, minor: 6, build: 8 },
};
const whole = (...items: ReturnType<typeof item>[]): LiveEvent => ({
  kind: "items received",
  items,
  added: [],
  isWholeList: true,
});
const arriving = (
  held: ReturnType<typeof item>[],
  ...added: ReturnType<typeof item>[]
): LiveEvent => ({ kind: "items received", items: [...held, ...added], added, isWholeList: false });
const sent = (found: ReturnType<typeof item>, receiving: number): LiveEvent => ({
  kind: "item sent",
  item: found,
  receiving,
  parts: [{ text: "sent" }],
});

describe("the tracker store", () => {
  test("a login sets the slot, the players, the checks, the hint points, a hint's cost and the release permission", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().take(LOGIN);
    expect(store.getState()).toMatchObject({
      team: 0,
      slot: 1,
      players: PLAYERS,
      checked: [1, 2],
      missing: [3, 4, 5],
      hintPoints: 7,
      // 40% of its 5 locations.
      hintCost: 2,
      releasePermission: 2,
      serverVersion: { major: 0, minor: 6, build: 8 },
    });
  });

  test("the whole list sent on login reads earlier, and items arriving after are stamped as they come", async () => {
    const time = clock();
    const store = await loaded(ROOM, { now: time.now, storage: memory() });
    store.getState().take(whole(item(1)));
    time.tick(5_000);
    store.getState().take(arriving([item(1)], item(2)));
    expect(store.getState().received).toStrictEqual([
      { value: item(1) },
      { value: item(2), at: 6_000 },
    ]);
  });

  test("a whole list sent again keeps the times of items held, and one it adds reads earlier", async () => {
    const time = clock();
    const store = await loaded(ROOM, { now: time.now, storage: memory() });
    store.getState().take(whole(item(1)));
    store.getState().take(arriving([item(1)], item(2)));
    time.tick(60_000);
    store.getState().take(whole(item(1), item(2), item(3)));
    expect(store.getState().received.map(({ at }) => at)).toEqual([undefined, 1_000, undefined]);
  });

  test("a room update adds what's newly checked, and replaces the hint points and players", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().take(LOGIN);
    const update = { cmd: "RoomUpdate", checked_locations: [3], hint_points: 8, players: [] };
    store.getState().take({ kind: "room update", update: update as unknown as RoomUpdatePacket });
    expect(store.getState()).toMatchObject({
      checked: [1, 2, 3],
      missing: [4, 5],
      hintPoints: 8,
      players: [],
    });
  });

  test("printed messages go to the log, stamped, and only an item found for another player is sent", async () => {
    const time = clock();
    const store = await loaded(ROOM, { now: time.now, storage: memory() });
    store.getState().take(LOGIN);
    store.getState().take(sent(item(10, 1), 2));
    store.getState().take(sent(item(11, 1), 1));
    store.getState().take(sent(item(12, 2), 1));
    expect(store.getState().log.map(({ at }) => at)).toEqual([1_000, 1_000, 1_000]);
    expect(store.getState().sent).toEqual([
      { value: { item: item(10, 1), receiving: 2 }, at: 1_000 },
    ]);
  });

  test("a room's stamped items and its whole log are kept, and only those", async () => {
    const storage = memory();
    const first = await loaded(ROOM, { storage });
    first.getState().take(LOGIN);
    first.getState().take(whole(item(1)));
    first.getState().take(sent(item(10, 1), 2));
    expect([...storage.items.keys()]).toEqual([`room:${ROOM}`]);

    const reloaded = await loaded(ROOM, { storage });
    const { received, sent: sentItems, log } = first.getState();
    expect(reloaded.getState()).toMatchObject({ received, sent: sentItems, log });
    expect(reloaded.getState()).toMatchObject({
      slot: undefined,
      checked: [],
      hintPoints: undefined,
    });

    const otherRoom = await loaded("AAAAAAAAAAAAAAAAAAAAAA", { storage });
    expect(otherRoom.getState().log).toEqual([]);
  });

  test("a store whose storage fails still says it has loaded, and carries on empty", async () => {
    const failing: StateStorage = {
      getItem: () => Promise.reject(new Error("no database")),
      setItem: () => Promise.resolve(),
      removeItem: () => Promise.resolve(),
    };
    const error = await new Promise((resolve) => {
      createTrackerStore({ kind: "room", room: ROOM }, { storage: failing, onLoaded: resolve });
    });
    expect(error).toBeInstanceOf(Error);
  });

  test("the connection holds the phase the room's watch says", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().setConnection({ phase: "connecting", port: 61475 });
    expect(store.getState().connection).toEqual({ phase: "connecting", port: 61475 });
  });

  test("a recorded session plays into the store", async () => {
    const time = clock();
    const store = await loaded(ROOM, { now: time.now, storage: memory() });
    const socket = new TestSocket();
    const opening = RoomSocket.open("wss://archipelago.gg:61475", () => socket);
    socket.serve(roomInfo(false));
    new LiveRoom(await opening, (event) => store.getState().take(event));
    const messages = fixture.messages as unknown as { message: { cmd: string }[] }[];
    for (const { message } of messages) {
      time.tick(1_000);
      socket.serve(...message);
    }
    const printed = messages
      .flatMap(({ message }) => message)
      .filter((packet) => packet.cmd === "PrintJSON");
    expect(store.getState().log.length).toBe(printed.length);
    // The starting item came in the list sent on login; the check's and the collect's arrived live.
    expect(store.getState().received.map(({ at }) => at === undefined)).toEqual([
      true,
      false,
      false,
      false,
      false,
    ]);
  });
});

// A two-player room's history in the web API's shape: what each slot received, its checks and its status.
function twoPlayers(
  received: Record<number, ReturnType<typeof item>[]>,
  status: Record<number, number> = { 1: 20, 2: 20 },
  checks: Record<number, number> = { 1: 0, 2: 0 }
): History {
  const slots = [1, 2];
  const tracker: TrackerData = {
    aliases: slots.map((player) => ({ team: 0, player, alias: undefined })),
    itemsReceived: slots.map((player) => ({ team: 0, player, items: received[player] ?? [] })),
    checksDone: slots.map((player) => ({
      team: 0,
      player,
      locations: Array.from({ length: checks[player] ?? 0 }, (_, i) => i),
    })),
    totalChecksDone: [{ team: 0, checksDone: 0 }],
    hints: [],
    activity: slots.map((player) => ({ team: 0, player, time: undefined })),
    connection: slots.map((player) => ({ team: 0, player, time: undefined })),
    status: slots.map((player) => ({ team: 0, player, status: status[player] ?? 0 })),
  };
  const statics = readStaticTracker(webApi.static_tracker);
  return {
    tracker,
    statics,
    names: new Map([
      [1, "Tarnished"],
      [2, "Other"],
    ]),
  };
}

describe("history and live together", () => {
  test("the roster takes every slot from the web API, as recorded", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().takeHistory({
      tracker: readTracker(webApi.tracker),
      statics: readStaticTracker(webApi.static_tracker),
      names: new Map([[1, "Tarnished"]]),
    });
    expect(store.getState().roster).toEqual([
      {
        team: 0,
        slot: 1,
        name: "Tarnished",
        game: "EldenRing",
        checksDone: 5,
        total: 3765,
        status: 0,
        lastActive: Date.parse("Thu, 22 Oct 2026 14:48:07 GMT"),
      },
    ]);
  });

  test("items sent before connecting come from the history as earlier, and one seen live isn't doubled", async () => {
    const time = clock();
    const store = await loaded(ROOM, { now: time.now, storage: memory() });
    store.getState().take(LOGIN);
    store.getState().take(sent(item(11, 1), 2));
    const history = twoPlayers({ 2: [item(10, 1), item(11, 1), item(12, 2)] });
    store.getState().takeHistory(history);
    store.getState().takeHistory(history);
    expect(store.getState().sent).toStrictEqual([
      { value: { item: item(10, 1), receiving: 2 } },
      { value: { item: item(11, 1), receiving: 2 }, at: 1_000 },
    ]);
  });

  test("the history fills the items received until the websocket's own list replaces them", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().chooseSlot(0, 1);
    store.getState().takeHistory(twoPlayers({ 1: [item(1), item(2)] }));
    expect(store.getState().received).toStrictEqual([{ value: item(1) }, { value: item(2) }]);
    store.getState().setConnection({ phase: "connected", port: 61475 });
    store.getState().take(whole(item(1), item(2), item(3)));
    store.getState().takeHistory(twoPlayers({ 1: [item(1)] }));
    expect(store.getState().received.map(({ value }) => value.item)).toEqual([1, 2, 3]);
  });

  test("a goal the websocket announces holds against an older history, and checks never go down", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().takeHistory(twoPlayers({}, { 1: 20, 2: 20 }, { 1: 0, 2: 5 }));
    store.getState().take({ kind: "goal", team: 0, slot: 2, parts: [] });
    store.getState().takeHistory(twoPlayers({}, { 1: 20, 2: 20 }, { 1: 0, 2: 3 }));
    expect(store.getState().roster.find(({ slot }) => slot === 2)).toMatchObject({
      status: 30,
      checksDone: 5,
      name: "Other",
    });
  });

  test("a goal for a slot the web API hasn't listed yet is kept", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().take({ kind: "goal", team: 0, slot: 3, parts: [] });
    expect(store.getState().roster).toMatchObject([{ team: 0, slot: 3, status: 30 }]);
  });

  test("without a slot, the history leaves the items alone", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().takeHistory(twoPlayers({ 1: [item(1)], 2: [item(10, 1)] }));
    expect(store.getState()).toMatchObject({ received: [], sent: [] });
  });
});

describe("the seed", () => {
  test("each game's names are taken whole, and read back by id", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().takePackages(new Map([["EldenRing", readDataPackage(webApi.datapackage)]]));
    const names = store.getState().packages.get("EldenRing");
    expect(names?.itemNames.size).toBeGreaterThan(0);
    expect(names?.locationNames.size).toBeGreaterThan(0);
  });

  test("a login says the slot's slot_data, over what the web API said", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    store.getState().takeSlotData({ slot: "from the web API" });
    store.getState().take({
      ...LOGIN,
      connected: { ...LOGIN.connected, slot_data: { slot: "Tarnished" } },
    } as LiveEvent);
    expect(store.getState().slotData).toEqual({ slot: "Tarnished" });
  });

  test("neither is kept on this device", async () => {
    const storage = memory();
    const store = await loaded(ROOM, { storage });
    store.getState().takeSlotData({ slot: "Tarnished" });
    expect(storage.items.get(`room:${ROOM}`)).not.toContain("Tarnished");
  });

  test("forgetting a room clears what this device kept for it", async () => {
    const storage = memory();
    const store = await loaded(ROOM, { storage });
    store.getState().take({ kind: "message", type: "Tutorial", parts: [{ text: "hello" }] });
    await forgetKept({ kind: "room", room: ROOM }, storage);
    expect(storage.items.has(`room:${ROOM}`)).toBe(false);
  });
});
