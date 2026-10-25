import { describe, expect, test } from "bun:test";
import {
  isAsleep,
  readDataPackage,
  readRoomStatus,
  readSlotData,
  readStaticTracker,
  readTracker,
  WebApiError,
} from "../../src/archipelago/web-responses.js";
import fixture from "../fixtures/web-api.json";

const LAST_ACTIVITY = Date.parse("Thu, 22 Oct 2026 20:39:03 GMT");

describe("readRoomStatus", () => {
  const room = readRoomStatus(fixture.room_status);

  test("reads the tracker, the slots, the port and the times", () => {
    expect(room).toEqual({
      tracker: "q3Xh8sJm2PzK0tLw9RbVcA",
      players: [{ name: "Tarnished", game: "EldenRing" }],
      lastPort: 61475,
      lastActivity: LAST_ACTIVITY,
      timeout: 7200,
    });
  });

  test("a room is asleep once nothing has happened in it for longer than its timeout", () => {
    expect(isAsleep(room, LAST_ACTIVITY + 7200 * 1000)).toBe(false);
    expect(isAsleep(room, LAST_ACTIVITY + 7200 * 1000 + 1)).toBe(true);
  });

  test("an answer missing a field fails, naming the field", () => {
    const { last_port: _, ...noPort } = fixture.room_status;
    expect(() => readRoomStatus(noPort)).toThrow(WebApiError);
    expect(catchOf(() => readRoomStatus(noPort))).toMatchObject({
      problem: "unexpected",
      field: "last_port",
    });
  });

  test("a time that isn't a date fails", () => {
    const badTime = { ...fixture.room_status, last_activity: "yesterday" };
    expect(catchOf(() => readRoomStatus(badTime))).toMatchObject({ field: "last_activity" });
  });
});

describe("readStaticTracker", () => {
  test("reads each game's checksum, and each slot's game and location count", () => {
    const tracker = readStaticTracker(fixture.static_tracker);
    expect(tracker.checksums.get("EldenRing")).toBe("c3ab8b33b4e26448022dd43b79b231082699e63b");
    expect(tracker.games).toEqual([{ team: 0, player: 1, game: "EldenRing" }]);
    expect(tracker.totals).toEqual([{ team: 0, player: 1, total: 3765 }]);
    expect(tracker.groups).toEqual([]);
  });
});

describe("readDataPackage", () => {
  test("names each item and location by its id, a generator's extra copies included", () => {
    const names = readDataPackage(fixture.datapackage);
    for (const [name, id] of Object.entries(fixture.datapackage.item_name_to_id)) {
      expect(names.itemNames.get(id)).toBe(name);
    }
    expect([...names.locationNames.values()].some((name) => name.includes(", extra item 1"))).toBe(
      true
    );
  });
});

describe("readSlotData", () => {
  test("keeps each slot's slot_data as its game wrote it", () => {
    const [slot] = readSlotData(fixture.slot_data_tracker);
    expect(slot?.player).toBe(1);
    expect(slot?.slotData.slot).toBe("Tarnished");
    expect(slot?.slotData.versions).toBe(">=0.1 <0.2");
  });
});

describe("readTracker", () => {
  const tracker = readTracker(fixture.tracker);

  test("names an item's fields, a starting item coming from location -1 and the server", () => {
    expect(tracker.itemsReceived[0]?.items[0]).toEqual({
      item: 72080,
      location: -1,
      player: 0,
      flags: 0,
    });
  });

  test("names a hint's fields", () => {
    expect(tracker.hints[0]?.hints[0]).toEqual({
      receivingPlayer: 1,
      findingPlayer: 1,
      location: 7000117,
      item: 69706,
      found: false,
      entrance: "",
      itemFlags: 0,
      status: 0,
    });
  });

  test("reads the checks done, the times, an unset alias and the client status", () => {
    expect(tracker.checksDone[0]?.locations.length).toBe(5);
    expect(tracker.totalChecksDone).toEqual([{ team: 0, checksDone: 185 }]);
    expect(tracker.activity[0]?.time).toBe(Date.parse("Thu, 22 Oct 2026 14:48:07 GMT"));
    expect(tracker.aliases[0]?.alias).toBeUndefined();
    expect(tracker.status[0]?.status).toBe(0);
  });

  test("a slot that never connected has no time", () => {
    const never = { ...fixture.tracker, connection_timers: [{ player: 1, team: 0, time: null }] };
    expect(readTracker(never).connection[0]?.time).toBeUndefined();
  });

  test("an item that isn't an array fails, naming where it was", () => {
    const bad = {
      ...fixture.tracker,
      player_items_received: [{ team: 0, player: 1, items: [{ item: 1 }] }],
    };
    expect(catchOf(() => readTracker(bad))).toMatchObject({
      problem: "unexpected",
      field: "player_items_received[0].items[0]",
    });
  });
});

// What a call throws.
function catchOf(call: () => unknown): unknown {
  try {
    call();
  } catch (error) {
    return error;
  }
  return undefined;
}
