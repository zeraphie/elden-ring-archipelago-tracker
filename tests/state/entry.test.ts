import { describe, expect, test } from "bun:test";
import type { Fetcher } from "../../src/archipelago/web-api.js";
import { demoWays } from "../../src/demo/ways.js";
import { createEntryStore, type EntryOptions } from "../../src/state/entry.js";
import { lastVisit, rememberVisit, type Visit } from "../../src/state/last-visit.js";
import { testRoom, TRACKER_VERSION } from "../fixtures/sockets.js";
import { memory } from "../fixtures/stores.js";
import { until } from "../fixtures/waits.js";
import webApi from "../fixtures/web-api.json";
import { standInWeb } from "../fixtures/web.js";

const ROOM = "q3Xh8sJm2PzK0tLw9RbVcA";
const ROOM_URL = `https://archipelago.gg/room/${ROOM}`;
const TRACKER_URL = `https://archipelago.gg/tracker/${ROOM}`;
// 21 minutes after the recorded room was last active, inside its two-hour timeout.
const AWAKE = Date.parse("Thu, 22 Oct 2026 21:00:00 GMT");
const ASLEEP = Date.parse("Fri, 23 Oct 2026 12:00:00 GMT");
const VISIT: Visit = {
  link: { kind: "room", room: ROOM },
  team: 0,
  player: 1,
  name: "Tarnished",
  needsPassword: false,
};

// A way in on the recorded web API and a test room with this password, with its waits open to run.
function entering(
  options: { fetcher?: Fetcher; password?: string; now?: () => number; linked?: string } = {}
) {
  const room = testRoom(options.password);
  const storage = memory();
  const waits: (() => void)[] = [];
  const store = createEntryStore({
    version: TRACKER_VERSION,
    fetcher: options.fetcher ?? standInWeb().fetcher,
    opener: room.opener,
    timer: (run) => waits.push(run),
    now: options.now ?? (() => AWAKE),
    storage,
    linked: options.linked,
  });
  const phase = () => store.getState().phase;
  return { store, room, storage, waits, phase };
}

const OLD_RELEASE = "c3ab8b33b4e26448022dd43b79b231082699e63b";

describe("the demo", () => {
  // A way in that tells of anything asked of archipelago.gg, with this way of loading the demo.
  const demoEntering = (demo: EntryOptions["demo"] = () => Promise.resolve(demoWays())) => {
    const web = standInWeb();
    const room = testRoom();
    const storage = memory();
    const store = createEntryStore({
      version: TRACKER_VERSION,
      fetcher: web.fetcher,
      opener: room.opener,
      timer: () => undefined,
      now: () => AWAKE,
      storage,
      demo,
    });
    const phase = () => store.getState().phase;
    const inDemo = async () => {
      store.getState().lookUp("demo");
      await until(() => phase().phase === "slots");
      store.getState().connect();
      await until(() => phase().phase === "ready");
    };
    return { store, web, room, storage, phase, inDemo };
  };

  test("takes the real way in on the word, its slot picked", async () => {
    const run = demoEntering();
    run.store.getState().lookUp("demo");
    await until(() => run.phase().phase === "slots");
    expect(run.phase()).toMatchObject({ phase: "slots", chosen: { team: 0, player: 1 } });
  });

  test("opens with nothing asked of archipelago.gg", async () => {
    const run = demoEntering();
    await run.inDemo();
    expect(run.web.asked).toEqual([]);
    expect(run.room.sockets).toEqual([]);
  });

  test("keeps nothing on the device", async () => {
    const run = demoEntering();
    await run.inDemo();
    await until(() => run.phase().phase === "ready");
    expect(run.storage.items.size).toBe(0);
  });

  test("leaves the real last visit where it was", async () => {
    const run = demoEntering();
    await rememberVisit(VISIT, run.storage);
    await run.store.getState().start();
    await run.inDemo();
    expect(await lastVisit(run.storage)).toEqual(VISIT);
  });

  test("isn't loaded for a real room", async () => {
    let loads = 0;
    const run = demoEntering(() => {
      loads += 1;
      return Promise.resolve(demoWays());
    });
    run.store.getState().lookUp(ROOM_URL);
    await until(() => run.phase().phase === "slots");
    expect(loads).toBe(0);
  });

  test("goes back to archipelago.gg for a real room after it", async () => {
    const run = demoEntering();
    await run.inDemo();
    run.store.getState().anotherRoom();
    run.store.getState().lookUp(ROOM_URL);
    await until(() => run.phase().phase === "slots");
    expect(run.web.asked.length).toBeGreaterThan(0);
  });

  test("goes back to the link, unreachable, when its file won't load", async () => {
    const run = demoEntering(() => Promise.reject(new Error("no file")));
    run.store.getState().lookUp("demo");
    await until(() => run.phase().phase === "entry");
    expect(run.phase()).toEqual({ phase: "entry", problem: { kind: "unreachable" } });
  });
});

describe("an unsupported room", () => {
  const oldRoom = () => {
    const room = testRoom(undefined, OLD_RELEASE);
    const storage = memory();
    const store = createEntryStore({
      version: TRACKER_VERSION,
      fetcher: standInWeb().fetcher,
      opener: room.opener,
      timer: () => undefined,
      now: () => AWAKE,
      storage,
    });
    return { store, storage, phase: () => store.getState().phase };
  };
  const BLOCKED = { phase: "unsupported", page: ROOM_URL } as const;

  test("stops at its notice from a link, and another room is the way on", async () => {
    const run = oldRoom();
    run.store.getState().lookUp(ROOM_URL);
    await until(() => run.phase().phase === "unsupported");
    expect(run.phase()).toEqual(BLOCKED);
    run.store.getState().anotherRoom();
    expect(run.phase()).toEqual({ phase: "entry" });
  });

  test("stops at its notice from a kept visit too, connecting to nothing", async () => {
    const run = oldRoom();
    await rememberVisit(VISIT, run.storage);
    await run.store.getState().start();
    run.store.getState().connectLast();
    await until(() => run.phase().phase === "unsupported");
    expect(run.phase()).toEqual(BLOCKED);
    expect(run.store.getState().parts).toEqual([]);
  });
});

describe("the way in", () => {
  test("with no visit kept, it starts at the link", async () => {
    const run = entering();
    expect(run.phase()).toEqual({ phase: "starting" });
    await run.store.getState().start();
    expect(run.phase()).toEqual({ phase: "entry" });
  });

  test("a visit kept is offered again", async () => {
    const run = entering();
    await rememberVisit(VISIT, run.storage);
    await run.store.getState().start();
    expect(run.phase()).toEqual({ phase: "returning", visit: VISIT, needsPassword: false });
  });

  test("a link from the page's address starts at the form, and holds the link for it", async () => {
    const run = entering({ linked: ROOM_URL });
    await run.store.getState().start();
    expect(run.phase()).toEqual({ phase: "entry" });
    expect(run.store.getState().linked).toBe(ROOM_URL);
  });

  test("a link to another room starts at the form, over a visit kept", async () => {
    const run = entering({ linked: "https://archipelago.gg/room/AAAAAAAAAAAAAAAAAAAAAA" });
    await rememberVisit(VISIT, run.storage);
    await run.store.getState().start();
    expect(run.phase()).toEqual({ phase: "entry" });
  });

  test("a link to the room of the visit kept offers the visit, as that room's been logged into", async () => {
    const run = entering({ linked: ROOM_URL });
    await rememberVisit(VISIT, run.storage);
    await run.store.getState().start();
    expect(run.phase()).toEqual({ phase: "returning", visit: VISIT, needsPassword: false });
  });

  test("a link that leads nowhere starts at the form too, for the person to see it", async () => {
    const run = entering({ linked: "not a link" });
    await rememberVisit(VISIT, run.storage);
    await run.store.getState().start();
    expect(run.phase()).toEqual({ phase: "entry" });
  });

  test("a link the tracker can't follow says why, and asks archipelago.gg nothing", () => {
    const web = standInWeb();
    const run = entering({ fetcher: web.fetcher });
    run.store.getState().lookUp("https://example.com/room/abc");
    expect(run.phase()).toEqual({
      phase: "entry",
      problem: { kind: "link", problem: "another site", host: "example.com" },
    });
    expect(web.asked).toEqual([]);
  });

  test("a room's slots are offered, its one Elden Ring slot chosen, and another game's can't be", async () => {
    const two = {
      ...webApi.room_status,
      players: [
        ["Tarnished", "EldenRing"],
        ["Sam", "Ocarina of Time"],
      ],
    };
    const run = entering({ fetcher: standInWeb({ room_status: { body: two } }).fetcher });
    run.store.getState().lookUp(ROOM_URL);
    expect(run.phase().phase).toBe("looking");
    await until(() => run.phase().phase === "slots");
    run.store.getState().choose(0, 2);
    expect(run.phase()).toMatchObject({
      phase: "slots",
      isTracker: false,
      chosen: { team: 0, player: 1 },
      needsPassword: false,
    });
  });

  test("connecting sets up part by part, then it's ready and keeps the visit, never the password", async () => {
    const run = entering({ password: "secret" });
    run.store.getState().lookUp(ROOM_URL);
    await until(() => run.phase().phase === "slots");
    expect(run.phase()).toMatchObject({ needsPassword: true });
    run.store.getState().connect("secret");
    expect(run.phase().phase).toBe("loading");
    expect(run.store.getState().parts.map(({ part }) => part)).toEqual([
      "status",
      "data package",
      "slot data",
      "elden ring data",
      "history",
      "connected",
      "saved",
    ]);
    await until(() => run.phase().phase === "ready");
    expect(run.store.getState().parts.every(({ state }) => state === "in")).toBe(true);
    await until(() => run.storage.items.has("last visit"));
    expect(await lastVisit(run.storage)).toEqual({ ...VISIT, needsPassword: true });
    expect([...run.storage.items.values()].join()).not.toContain("secret");
    run.store.getState().anotherRoom();
  });

  test("a sleeping room waits with its page, checked again each minute and on asking", async () => {
    let now = ASLEEP;
    const web = standInWeb();
    const run = entering({ fetcher: web.fetcher, now: () => now });
    run.store.getState().lookUp(ROOM_URL);
    await until(() => run.phase().phase === "asleep");
    expect(run.phase()).toMatchObject({ page: ROOM_URL });
    expect(run.room.sockets).toEqual([]);
    run.store.getState().checkAgain();
    await until(() => run.waits.length === 2);
    expect(run.phase().phase).toBe("asleep");
    now = AWAKE;
    run.waits.at(-1)?.();
    await until(() => run.phase().phase === "slots");
    expect(web.asked.filter((url) => url.includes("/room_status/")).length).toBe(3);
  });

  test("a room that's gone goes back to the link, and what was kept for it is cleared", async () => {
    const run = entering({ fetcher: standInWeb({ room_status: { status: 404 } }).fetcher });
    run.storage.items.set(`room:${ROOM}`, "{}");
    run.store.getState().lookUp(ROOM_URL);
    await until(() => run.phase().phase === "entry");
    expect(run.phase()).toEqual({ phase: "entry", problem: { kind: "gone" } });
    await until(() => !run.storage.items.has(`room:${ROOM}`));
  });

  test("a wrong password fails at the live connection, and trying again asks for it on a fresh socket", async () => {
    const run = entering({ password: "secret" });
    run.store.getState().lookUp(ROOM_URL);
    await until(() => run.phase().phase === "slots");
    run.store.getState().connect("wrong");
    await until(() => run.phase().phase === "failed");
    expect(run.phase()).toEqual({
      phase: "failed",
      failure: { part: "connected", problem: "invalid password" },
    });
    run.store.getState().tryAgain();
    await until(() => run.phase().phase === "slots");
    expect(run.phase()).toMatchObject({ needsPassword: true, chosen: { team: 0, player: 1 } });
    expect(run.room.sockets.map(({ socket }) => socket.isClosed)).toEqual([true, false]);
  });

  test("a data package that didn't arrive can be tried again", async () => {
    let isDown = true;
    const { fetcher } = standInWeb();
    const failing: Fetcher = (url) =>
      isDown && url.includes("/datapackage/")
        ? Promise.resolve(new Response("", { status: 503 }))
        : fetcher(url);
    const run = entering({ fetcher: failing });
    run.store.getState().lookUp(ROOM_URL);
    await until(() => run.phase().phase === "slots");
    run.store.getState().connect();
    await until(() => run.phase().phase === "failed");
    expect(run.phase()).toMatchObject({
      failure: { part: "data package", problem: "unreachable" },
    });
    isDown = false;
    run.store.getState().tryAgain();
    await until(() => run.phase().phase === "ready");
    run.store.getState().anotherRoom();
  });

  test("a returning visit connects on its room and slot", async () => {
    const run = entering();
    await rememberVisit(VISIT, run.storage);
    await run.store.getState().start();
    run.store.getState().connectLast();
    expect(run.store.getState().parts.map(({ state }) => state)).toEqual(Array(7).fill("loading"));
    await until(() => run.phase().phase === "ready");
    run.store.getState().anotherRoom();
  });

  test("a returning visit to a room that now asks for a password goes back to ask for it", async () => {
    const run = entering({ password: "secret" });
    await rememberVisit(VISIT, run.storage);
    await run.store.getState().start();
    run.store.getState().connectLast();
    await until(() => run.phase().phase === "returning");
    expect(run.phase()).toEqual({ phase: "returning", visit: VISIT, needsPassword: true });
    expect(run.room.sockets[0]?.socket.isClosed).toBe(true);
  });

  test("a tracker link says it's the reduced tracker, and connects on the web API alone", async () => {
    const run = entering();
    run.store.getState().lookUp(TRACKER_URL);
    await until(() => run.phase().phase === "slots");
    expect(run.phase()).toMatchObject({ isTracker: true, chosen: { team: 0, player: 1 } });
    run.store.getState().connect();
    await until(() => run.phase().phase === "ready");
    const ready = run.phase();
    expect(ready.phase === "ready" && ready.store.getState().connection.phase).toBe("web only");
    expect(run.room.sockets).toEqual([]);
    run.store.getState().anotherRoom();
  });

  test("another room stops what was under way and closes its socket", async () => {
    const run = entering();
    run.store.getState().lookUp(ROOM_URL);
    await until(() => run.phase().phase === "slots");
    run.store.getState().anotherRoom();
    expect(run.phase()).toEqual({ phase: "entry" });
    expect(run.room.sockets[0]?.socket.isClosed).toBe(true);
  });
});
