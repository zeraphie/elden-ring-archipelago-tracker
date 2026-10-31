// Shared by the websocket tests: a socket a test drives in the server's place,
// and a room whose sockets answer for themselves.
import type { SocketLike, SocketOpener } from "../../src/archipelago/room-socket.js";
import webApi from "./web-api.json";

/** A socket that keeps what's sent to the server, and lets a test speak for it. */
export class TestSocket implements SocketLike {
  readonly sent: unknown[] = [];
  /** Whether the tracker has closed it. */
  isClosed = false;
  private readonly listeners = new Map<string, ((event: { data: unknown }) => void)[]>();

  send(data: string): void {
    this.sent.push(...(JSON.parse(data) as unknown[]));
  }

  close(): void {
    this.isClosed = true;
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

/** A RoomInfo for a room that has, or hasn't, a password, with the recorded room's data packages. */
/** The version a test tracker logs in as: the Archipelago release its fixtures were recorded on, and a build of its own. */
export const TRACKER_VERSION = "0.6.8+1";

export const roomInfo = (password: boolean) => ({
  cmd: "RoomInfo",
  version: { class: "Version", major: 0, minor: 6, build: 8 },
  password,
  hint_cost: 10,
  permissions: { release: 2, collect: 2, remaining: 1 },
  datapackage_checksums: Object.fromEntries(
    Object.entries(webApi.static_tracker.datapackage).map(([game, { checksum }]) => [
      game,
      checksum,
    ])
  ),
});

/** The login a test room gives slot 1, "Tarnished", with its slot_data. */
export const CONNECTED = {
  cmd: "Connected",
  team: 0,
  slot: 1,
  players: [{ team: 0, slot: 1, alias: "Tarnished", name: "Tarnished" }],
  checked_locations: [],
  missing_locations: [],
  hint_points: 0,
  slot_data: webApi.slot_data_tracker[0]?.slot_data,
  slot_info: {},
};

// A socket that sends RoomInfo as it opens, and answers a Connect as the room would.
class RoomSideSocket extends TestSocket {
  constructor(
    private readonly password: string | undefined,
    eldenRingChecksum: string | undefined
  ) {
    super();
    queueMicrotask(() => {
      const info = roomInfo(password !== undefined);
      this.serve(
        eldenRingChecksum === undefined
          ? info
          : {
              ...info,
              datapackage_checksums: {
                ...info.datapackage_checksums,
                EldenRing: eldenRingChecksum,
              },
            }
      );
    });
  }

  override send(data: string): void {
    super.send(data);
    for (const packet of JSON.parse(data) as { cmd: string; name?: string; password?: string }[]) {
      if (packet.cmd !== "Connect") {
        continue;
      }
      const errors = [
        ...(packet.password === (this.password ?? "") ? [] : ["InvalidPassword"]),
        ...(packet.name === "Tarnished" ? [] : ["InvalidSlot"]),
      ];
      queueMicrotask(() =>
        this.serve(errors.length === 0 ? CONNECTED : { cmd: "ConnectionRefused", errors })
      );
    }
  }
}

/** A room in a test, with this password or none: every socket opened to it, and the opener. */
export function testRoom(
  password?: string,
  eldenRingChecksum?: string
): {
  readonly sockets: { readonly url: string; readonly socket: TestSocket }[];
  readonly opener: SocketOpener;
} {
  const sockets: { url: string; socket: TestSocket }[] = [];
  const opener: SocketOpener = (url) => {
    const socket = new RoomSideSocket(password, eldenRingChecksum);
    sockets.push({ url, socket });
    return socket;
  };
  return { sockets, opener };
}
