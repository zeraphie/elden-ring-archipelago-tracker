import { describe, expect, test } from "bun:test";
import {
  slotNames,
  TrackerPoll,
  WEB_ONLY_UNAVAILABLE,
  type History,
  type PollPhase,
} from "../../src/archipelago/tracker-poll.js";
import type { Fetcher } from "../../src/archipelago/web-api.js";
import { readSlotData, readStaticTracker } from "../../src/archipelago/web-responses.js";
import { OTHER_PLAYERS } from "../../src/demo/players.js";
import { demoSnapshot } from "../../src/demo/snapshot.js";
import webApi from "../fixtures/web-api.json";
import { standInWeb } from "../fixtures/web.js";
import { settle } from "../fixtures/waits.js";

const TRACKER = "q3Xh8sJm2PzK0tLw9RbVcA";

// A poll on this web API, with what it hands on and the waits it asks for.
function polling(fetcher: Fetcher, names?: ReadonlyMap<number, string>) {
  const histories: History[] = [];
  const phases: PollPhase[] = [];
  const waits: { run: () => void; ms: number }[] = [];
  const poll = new TrackerPoll({
    tracker: TRACKER,
    names,
    fetcher,
    timer: (run, ms) => waits.push({ run, ms }),
    onHistory: (history) => histories.push(history),
    onPhase: (phase) => phases.push(phase),
  });
  return { histories, phases, waits, poll };
}

describe("TrackerPoll", () => {
  test("asks the static tracker and slot_data once, the tracker every minute", async () => {
    const api = standInWeb();
    const run = polling(api.fetcher);
    run.poll.start();
    await settle();
    expect(api.asked.map((url) => url.split("/api/")[1])).toEqual([
      `static_tracker/${TRACKER}`,
      `slot_data_tracker/${TRACKER}`,
      `tracker/${TRACKER}`,
    ]);
    expect(run.waits.map(({ ms }) => ms)).toEqual([60_000]);
    run.waits.shift()?.run();
    await settle();
    expect(api.asked.slice(3).map((url) => url.split("/api/")[1])).toEqual([`tracker/${TRACKER}`]);
    expect(run.histories.length).toBe(2);
  });

  test("the static tracker and slot_data handed in aren't asked again", async () => {
    const api = standInWeb();
    const histories: History[] = [];
    const poll = new TrackerPoll({
      tracker: TRACKER,
      statics: readStaticTracker(webApi.static_tracker),
      slots: readSlotData(webApi.slot_data_tracker),
      fetcher: api.fetcher,
      timer: () => undefined,
      onHistory: (history) => histories.push(history),
    });
    poll.start();
    await settle();
    expect(api.asked.map((url) => url.split("/api/")[1])).toEqual([`tracker/${TRACKER}`]);
    expect(histories[0]?.names.get(1)).toBe("Tarnished");
  });

  test("names each Elden Ring slot from its slot_data, and says what a tracker link can't give", async () => {
    const run = polling(standInWeb().fetcher);
    run.poll.start();
    await settle();
    expect([...(run.histories[0]?.names ?? [])]).toEqual([[1, "Tarnished"]]);
    const others = OTHER_PLAYERS.reduce((all, { checksDone }) => all + checksDone, 0);
    expect(run.histories[0]?.tracker.totalChecksDone).toEqual([
      { team: 0, checksDone: demoSnapshot().checked.length + others },
    ]);
    expect(run.phases).toEqual([{ phase: "web only", unavailable: WEB_ONLY_UNAVAILABLE }]);
  });

  test("room_status's names, when the room is known, stand over slot_data's", async () => {
    const run = polling(standInWeb().fetcher, new Map([[1, "Room name"]]));
    run.poll.start();
    await settle();
    expect(run.histories[0]?.names.get(1)).toBe("Room name");
  });

  test("a tracker archipelago.gg no longer has is gone, and nothing more is asked", async () => {
    const run = polling(standInWeb({ static_tracker: { status: 404 } }).fetcher);
    run.poll.start();
    await settle();
    expect(run.phases).toEqual([{ phase: "gone" }]);
    expect(run.waits).toEqual([]);
  });

  test("no answer is unreachable, and asked again shortly", async () => {
    const run = polling(() => Promise.reject(new TypeError("Failed to fetch")));
    run.poll.start();
    await settle();
    expect(run.phases).toEqual([{ phase: "unreachable" }]);
    expect(run.waits.map(({ ms }) => ms)).toEqual([15_000]);
  });

  test("once stopped, it hands on nothing more", async () => {
    const run = polling(standInWeb().fetcher);
    run.poll.start();
    run.poll.stop();
    await settle();
    run.waits.splice(0).forEach(({ run: again }) => again());
    await settle();
    expect(run.histories).toEqual([]);
  });
});

describe("slotNames", () => {
  test("takes a name only from slot_data that writes one", () => {
    expect([
      ...slotNames([
        { player: 1, slotData: { slot: "Tarnished" } },
        { player: 2, slotData: { seed: "1" } },
      ]),
    ]).toEqual([[1, "Tarnished"]]);
  });
});
