/**
 * ─ Demo socket ─
 *
 * A room's websocket with no network behind it. `LocalSocket` is the plain
 * one, which speaks for the server when told to, and the tests drive it by
 * hand. The demo room's says RoomInfo as it opens, and answers a login with
 * the slot's standing and the items it holds, in one message, as a server does,
 * then what the room has to say, and it answers what the slot says.
 */

import type { SocketLike, SocketOpener } from "../archipelago/room-socket.js";
import type { NetworkItem } from "../archipelago/web-responses.js";
import { answersTo, openingLines } from "./chat.js";
import { DEMO_CHECKSUMS, OTHER_PLAYERS } from "./players.js";
import { demoLocationNames, demoSlotData, DEMO_PLAYER, DEMO_SLOT } from "./room.js";
import { demoSnapshot, type Snapshot } from "./snapshot.js";

/** The room as a server says it: on the release the tracker is tested against, so no notice shows, with a hint at a tenth of the slot's checks, and a release allowed once the goal is done. */
export const DEMO_ROOM_INFO = {
  cmd: "RoomInfo",
  version: { class: "Version", major: 0, minor: 6, build: 8 },
  password: false,
  hint_cost: 10,
  permissions: { release: 2, collect: 2, remaining: 1 },
  datapackage_checksums: DEMO_CHECKSUMS,
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

/** The demo room's end of a socket, which says this as it opens; it waits a moment to speak, as whoever opened it listens next. */
export class DemoSocket extends LocalSocket {
  constructor(info: unknown = DEMO_ROOM_INFO) {
    super();
    queueMicrotask(() => this.serve(info));
  }

  override send(data: string): void {
    const packets = JSON.parse(data) as readonly { readonly cmd: string; readonly text?: string }[];
    for (const { cmd, text = "" } of packets) {
      if (cmd === "Connect") {
        const snapshot = demoSnapshot();
        queueMicrotask(() => {
          this.serve(connected(snapshot), itemsReceived(snapshot.received));
          this.serve(...openingLines(snapshot));
        });
      }
      if (cmd === "Say") {
        queueMicrotask(() => this.serve(...answersTo(text, demoSnapshot())));
      }
    }
  }
}

/** Opens a socket to the demo room, whatever the address. */
export function demoOpener(): SocketOpener {
  return () => new DemoSocket();
}

function connected({ checked }: Snapshot): unknown {
  const { team, player: slot } = DEMO_PLAYER;
  const done = new Set(checked);
  return {
    cmd: "Connected",
    team,
    slot,
    players: [
      { team, slot, alias: DEMO_SLOT, name: DEMO_SLOT },
      ...OTHER_PLAYERS.map(({ player, name }) => ({ team, slot: player, alias: name, name })),
    ],
    checked_locations: checked,
    missing_locations: [...demoLocationNames().keys()].filter((id) => !done.has(id)),
    // A point a check, as the recorded room earned them.
    hint_points: checked.length,
    slot_data: demoSlotData(),
    slot_info: {},
  };
}

// The whole list, as a login is given it.
function itemsReceived(items: readonly NetworkItem[]): unknown {
  return { cmd: "ReceivedItems", index: 0, items };
}
