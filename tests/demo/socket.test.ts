import { describe, expect, test } from "bun:test";
import { readRulesSlotData } from "../../src/archipelago/elden-ring-slot.js";
import type { LiveEvent } from "../../src/archipelago/live-events.js";
import { LiveRoom } from "../../src/archipelago/live-room.js";
import { ELDEN_RING, lookUp } from "../../src/archipelago/look-up.js";
import { roomAddress, RoomSocket } from "../../src/archipelago/room-socket.js";
import { isNewer, serverVersionOf } from "../../src/archipelago/versions.js";
import { isApworldSupported } from "../../src/data/rules/apworld.js";
import { demoLocationNames, DEMO_PLAYER, DEMO_SLOT } from "../../src/demo/room.js";
import { demoOpener } from "../../src/demo/socket.js";
import { demoFetcher } from "../../src/demo/web.js";
import { TRACKER_VERSION } from "../fixtures/sockets.js";

const open = () => RoomSocket.open(roomAddress(38281), demoOpener());

// The packets as the live room reads them, through a login.
async function loggedIn(): Promise<{ readonly events: LiveEvent[]; readonly socket: RoomSocket }> {
  const socket = await open();
  const events: LiveEvent[] = [];
  new LiveRoom(socket, (event) => events.push(event));
  await socket.logIn(DEMO_SLOT, TRACKER_VERSION);
  return { events, socket };
}

describe("demoOpener", () => {
  test("says a room with no password as it opens", async () => {
    expect((await open()).info.password).toBe(false);
  });

  test("says a data package checksum the tracker can read", async () => {
    const { info } = await open();
    const checksums = new Map(Object.entries(info.datapackage_checksums));
    expect(isApworldSupported(checksums.get(ELDEN_RING))).toBe(true);
  });

  test("says a version the tracker is sure of", async () => {
    const version = serverVersionOf((await open()).info);
    expect(version).toBeDefined();
    expect(version && isNewer(version, TRACKER_VERSION)).toBe(false);
  });

  test("logs the slot in, with every check still missing", async () => {
    const socket = await open();
    const connected = await socket.logIn(DEMO_SLOT, TRACKER_VERSION);
    expect(connected.slot).toBe(DEMO_PLAYER.player);
    expect(connected.team).toBe(DEMO_PLAYER.team);
    expect(connected.missing_locations).toHaveLength(demoLocationNames().size);
    expect(connected.checked_locations).toEqual([]);
  });

  test("gives slot_data the rules can read with the login", async () => {
    const { slot_data: slotData } = await (await open()).logIn(DEMO_SLOT, TRACKER_VERSION);
    expect(readRulesSlotData(slotData as Record<string, unknown>)?.goal).toHaveLength(2);
  });

  test("hands over the whole list of items with the login", async () => {
    const { events } = await loggedIn();
    expect(events.map(({ kind }) => kind)).toEqual(["connected", "items received"]);
    expect(events[1]).toMatchObject({ isWholeList: true, items: [] });
  });

  test("tells whoever's listening when it's closed", async () => {
    const socket = await open();
    let isClosed = false;
    socket.onClosed(() => {
      isClosed = true;
    });
    socket.close();
    expect(isClosed).toBe(true);
  });

  test("is found by looking the room up, with the web API's stand-in", async () => {
    const result = await lookUp(
      { kind: "room", room: "demo" },
      { fetcher: demoFetcher(), opener: demoOpener() }
    );
    expect(result).toMatchObject({
      kind: "found",
      found: {
        kind: "room",
        needsPassword: false,
        slots: [{ team: 0, player: 1, name: DEMO_SLOT, game: ELDEN_RING, isEldenRing: true }],
      },
    });
  });
});
