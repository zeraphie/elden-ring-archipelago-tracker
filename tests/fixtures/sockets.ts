// Shared by the websocket tests: a socket a test drives in the server's place,
// and the demo room's sockets, with what only a test wants of them: a password,
// a slot that's refused, an older checksum, and what was sent.
import type { SocketOpener } from "../../src/archipelago/room-socket.js";
import { DEMO_CHECKSUMS } from "../../src/demo/players.js";
import { DEMO_SLOT } from "../../src/demo/room.js";
import { DemoSocket, DEMO_ROOM_INFO, LocalSocket } from "../../src/demo/socket.js";

/** A socket that keeps what's sent to the server, and lets a test speak for it. */
export class TestSocket extends LocalSocket {
  readonly sent: unknown[] = [];
  /** Whether the tracker has closed it. */
  isClosed = false;

  override send(data: string): void {
    this.sent.push(...(JSON.parse(data) as unknown[]));
  }

  override close(): void {
    this.isClosed = true;
    super.close();
  }
}

/** The version a test tracker logs in as: the Archipelago release its fixtures were recorded on, and a build of its own. */
export const TRACKER_VERSION = "0.6.8+1";

/** The demo room's RoomInfo, for a room that has, or hasn't, a password. */
export const roomInfo = (password: boolean) => ({ ...DEMO_ROOM_INFO, password });

// The demo room with a password and a checksum of the test's, turning away a login it wouldn't take.
class RoomSideSocket extends DemoSocket {
  readonly sent: unknown[] = [];
  /** Whether the tracker has closed it. */
  isClosed = false;

  constructor(
    private readonly password: string | undefined,
    eldenRingChecksum: string | undefined
  ) {
    super({
      ...roomInfo(password !== undefined),
      datapackage_checksums: {
        ...DEMO_CHECKSUMS,
        EldenRing: eldenRingChecksum ?? DEMO_CHECKSUMS.EldenRing,
      },
    });
  }

  override send(data: string): void {
    const packets = JSON.parse(data) as { cmd: string; name?: string; password?: string }[];
    this.sent.push(...packets);
    const login = packets.find(({ cmd }) => cmd === "Connect");
    const errors = [
      ...(login === undefined || login.password === (this.password ?? "")
        ? []
        : ["InvalidPassword"]),
      ...(login === undefined || login.name === DEMO_SLOT ? [] : ["InvalidSlot"]),
    ];
    if (errors.length === 0) {
      super.send(data);
      return;
    }
    queueMicrotask(() => this.serve({ cmd: "ConnectionRefused", errors }));
  }

  override close(): void {
    this.isClosed = true;
    super.close();
  }
}

/** A room in a test, with this password or none: every socket opened to it, and the opener. */
export function testRoom(
  password?: string,
  eldenRingChecksum?: string
): {
  readonly sockets: { readonly url: string; readonly socket: RoomSideSocket }[];
  readonly opener: SocketOpener;
} {
  const sockets: { url: string; socket: RoomSideSocket }[] = [];
  const opener: SocketOpener = (url) => {
    const socket = new RoomSideSocket(password, eldenRingChecksum);
    sockets.push({ url, socket });
    return socket;
  };
  return { sockets, opener };
}
