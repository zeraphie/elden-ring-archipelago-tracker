/**
 * ─ Demo socket ─
 *
 * A room's websocket with no network behind it. `LocalSocket` is the plain
 * one, which speaks for the server when told to, and the tests drive it by
 * hand. The demo room's says RoomInfo as it opens, and answers a login with
 * the slot's standing and the items it holds, in one message, as a server does.
 */

import { ELDEN_RING } from "../archipelago/look-up.js";
import type { SocketLike, SocketOpener } from "../archipelago/room-socket.js";
import { RULES_APWORLD } from "../data/rules/apworld.js";
import { demoLocationNames, demoSlotData, DEMO_PLAYER, DEMO_SLOT } from "./room.js";

// The room as a server says it: on the release the tracker is tested against, so no notice shows,
// with a hint at a tenth of the slot's checks, and a release allowed once the goal is done.
const ROOM_INFO = {
  cmd: "RoomInfo",
  version: { class: "Version", major: 0, minor: 6, build: 8 },
  password: false,
  hint_cost: 10,
  permissions: { release: 2, collect: 2, remaining: 1 },
  datapackage_checksums: { [ELDEN_RING]: RULES_APWORLD.checksum },
};

/** A websocket with no network behind it: `serve` speaks for the server, and what's sent to it goes nowhere. */
export class LocalSocket implements SocketLike {
  private readonly listeners = new Map<string, ((event: { data: unknown }) => void)[]>();

  send(_data: string): void {}

  close(): void {
    this.emit("close");
  }

  addEventListener(type: string, listener: (event: { data: unknown }) => void): void {
    this.listeners.set(type, [...(this.listeners.get(type) ?? []), listener]);
  }

  /** The server sending these packets in one message. */
  serve(...packets: unknown[]): void {
    this.emit("message", JSON.stringify(packets));
  }

  emit(type: string, data?: unknown): void {
    for (const listener of this.listeners.get(type) ?? []) {
      listener({ data });
    }
  }
}

// The demo room's end of a socket. It waits a moment to speak, as whoever opened it listens next.
class DemoSocket extends LocalSocket {
  constructor() {
    super();
    queueMicrotask(() => this.serve(ROOM_INFO));
  }

  override send(data: string): void {
    const packets = JSON.parse(data) as readonly { readonly cmd: string }[];
    if (packets.some(({ cmd }) => cmd === "Connect")) {
      queueMicrotask(() => this.serve(connected(), itemsReceived()));
    }
  }
}

/** Opens a socket to the demo room, whatever the address. */
export function demoOpener(): SocketOpener {
  return () => new DemoSocket();
}

function connected(): unknown {
  const { team, player: slot } = DEMO_PLAYER;
  return {
    cmd: "Connected",
    team,
    slot,
    players: [{ team, slot, alias: DEMO_SLOT, name: DEMO_SLOT }],
    checked_locations: [],
    missing_locations: [...demoLocationNames().keys()],
    hint_points: 0,
    slot_data: demoSlotData(),
    slot_info: {},
  };
}

// The whole list, as a login is given it.
function itemsReceived(): unknown {
  return { cmd: "ReceivedItems", index: 0, items: [] };
}
