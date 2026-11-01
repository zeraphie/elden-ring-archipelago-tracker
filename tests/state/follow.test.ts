import { describe, expect, test } from "bun:test";
import type { Fetcher } from "../../src/archipelago/web-api.js";
import { follow, followHistory } from "../../src/state/follow.js";
import { loaded, memory } from "../fixtures/stores.js";
import webApi from "../fixtures/web-api.json";
import { standInWeb } from "../fixtures/web.js";
import { settle } from "../fixtures/waits.js";
import { TRACKER_VERSION } from "../fixtures/sockets.js";

const ROOM = "q3Xh8sJm2PzK0tLw9RbVcA";

const answering =
  (status: number, body: unknown): Fetcher =>
  () =>
    Promise.resolve(new Response(JSON.stringify(body), { status }));

describe("follow", () => {
  test("keeps the watch's phase as the store's connection", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    // Asleep: last active hours before this clock, so no socket is opened.
    const watch = follow(store, {
      room: ROOM,
      slot: "Tarnished",
      version: TRACKER_VERSION,
      fetcher: answering(200, webApi.room_status),
      now: () => Date.parse("Fri, 23 Oct 2026 12:00:00 GMT"),
      timer: () => undefined,
    });
    await settle();
    expect(store.getState().connection).toMatchObject({ phase: "asleep" });
    watch.stop();
  });

  test("a room that's gone clears what this device kept for it", async () => {
    const storage = memory();
    const store = await loaded(ROOM, { storage });
    store.getState().take({ kind: "message", type: "Tutorial", parts: [{ text: "hello" }] });
    expect(storage.items.has(`room:${ROOM}`)).toBe(true);
    follow(store, {
      room: ROOM,
      slot: "Tarnished",
      version: TRACKER_VERSION,
      fetcher: answering(404, {}),
      timer: () => undefined,
    });
    await settle();
    expect(store.getState().connection).toEqual({ phase: "gone" });
    expect(storage.items.has(`room:${ROOM}`)).toBe(false);
  });
});

describe("followHistory, as the reduced tracker", () => {
  const TRACKER = "q3Xh8sJm2PzK0tLw9RbVcA";
  const ITEMS = webApi.tracker.player_items_received[0]?.items ?? [];

  // The recorded web API, its tracker answering with this slot's items received as they are now.
  const web = (received: () => unknown[]) =>
    standInWeb({
      tracker: {
        fresh: () => ({
          ...webApi.tracker,
          player_items_received: [{ team: 0, player: 1, items: received() }],
        }),
      },
    }).fetcher;

  test("a tracker link alone fills the same store: web only, the slot's items and checks, its name", async () => {
    const storage = memory();
    const store = await loaded(
      { kind: "tracker", tracker: TRACKER, team: 0, slot: 1 },
      { storage }
    );
    store.getState().chooseSlot(0, 1);
    followHistory(
      store,
      { tracker: TRACKER, fetcher: web(() => ITEMS), timer: () => undefined },
      true
    );
    await settle();
    expect(store.getState().connection).toMatchObject({ phase: "web only" });
    expect(store.getState().received.map(({ value }) => value.item)).toEqual([72080, 71400, 69042]);
    expect(store.getState().checked.length).toBe(5);
    expect(store.getState().roster[0]?.name).toBe("Tarnished");
    expect(storage.items.has(`tracker:${TRACKER}`)).toBe(true);
  });

  test("an item first seen at a later poll is stamped then; those from the first read earlier", async () => {
    let time = 1_000;
    let received = ITEMS.slice(0, 2);
    const waits: (() => void)[] = [];
    const store = await loaded(
      { kind: "tracker", tracker: TRACKER },
      { storage: memory(), now: () => time }
    );
    store.getState().chooseSlot(0, 1);
    followHistory(
      store,
      { tracker: TRACKER, fetcher: web(() => received), timer: (run) => waits.push(run) },
      true
    );
    await settle();
    time = 61_000;
    received = ITEMS;
    waits.shift()?.();
    await settle();
    expect(store.getState().received.map(({ at }) => at)).toEqual([undefined, undefined, 61_000]);
  });

  test("with a room, the history fills in and leaves the connection to the room's watch", async () => {
    const store = await loaded(ROOM, { storage: memory() });
    followHistory(store, { tracker: TRACKER, fetcher: web(() => ITEMS), timer: () => undefined });
    await settle();
    expect(store.getState().connection).toEqual({ phase: "looking" });
    expect(store.getState().roster.length).toBe(1);
  });
});
