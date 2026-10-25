/**
 * ─ Room socket ─
 *
 * A tracker's websocket to a room. It opens, and waits for the RoomInfo the
 * server sends first, which says whether the room has a password. It then
 * logs in on a slot with the Tracker tag, which lets the game be left empty,
 * the server's own version, and every item flag. A refusal for a wrong
 * password or slot is an error of its own. The password is used for Connect
 * and kept nowhere else.
 */

import type {
  ClientPacket,
  ConnectedPacket,
  ConnectionError,
  ConnectPacket,
  NetworkVersion,
  RoomInfoPacket,
} from "archipelago.js";
import { isRecord } from "./web-responses.js";

/** A packet from the server: a command, and whatever it carries. */
export type ServerPacket = Readonly<Record<string, unknown>> & { readonly cmd: string };

/** What the socket needs of a WebSocket: the browser's own, or one a test hands in. */
export interface SocketLike {
  send(data: string): void;
  close(): void;
  addEventListener(type: "message", listener: (event: { readonly data: unknown }) => void): void;
  addEventListener(type: "close" | "error", listener: () => void): void;
}

/** How a socket is opened to a room's address, such as "wss://archipelago.gg:61475". */
export type SocketOpener = (url: string) => SocketLike;

/** Why a login failed: a wrong password or slot, another refusal, or a socket that closed first. */
export type LoginProblem = "invalid password" | "invalid slot" | "refused" | "closed";

/** A login that failed, with the server's own reasons when it refused. */
export class LoginError extends Error {
  constructor(
    readonly problem: LoginProblem,
    readonly reasons: readonly ConnectionError[] = []
  ) {
    super(problem);
    this.name = "LoginError";
  }
}

// Every item: from other worlds, from this one, and the starting inventory.
const EVERY_ITEM = 0b111;

// This tracker's own name, so a room's join line says what joined, and "Tracker", which the server
// reads as a client that follows a slot without playing it: it says "tracking", and asks no game.
const TAGS = ["EldenRingTracker", "Tracker"];

/**
 * The client version a login says, from this tracker's own: its first three numbers, the
 * Archipelago release it's tested against, so "0.6.8+2" says 0.6.8.
 *
 * @throws Error for a version not in that form, which only a wrongly written package.json gives.
 */
export function clientVersion(version: string): NetworkVersion {
  const [major, minor, build] = (/^(\d+)\.(\d+)\.(\d+)/.exec(version) ?? []).slice(1).map(Number);
  if (major === undefined || minor === undefined || build === undefined) {
    throw new Error(`A version such as 0.6.8 was expected, and "${version}" came.`);
  }
  return { class: "Version", major, minor, build };
}

/** A room's websocket address on archipelago.gg, on the port its status gives. */
export function roomAddress(port: number): string {
  return `wss://archipelago.gg:${port}`;
}

/** A tracker's open websocket to a room, logged in once logIn succeeds. */
export class RoomSocket {
  // What's waiting for a packet: each takes the one it wants and says so.
  private readonly waiting: ((packet: ServerPacket) => boolean)[] = [];
  private readonly listeners: ((packet: ServerPacket) => void)[] = [];
  private readonly closeListeners: (() => void)[] = [];
  private isClosed = false;
  private onClose: () => void = () => {};

  private constructor(
    private readonly socket: SocketLike,
    /** What the server said of the room as the socket opened. */
    readonly info: RoomInfoPacket
  ) {
    socket.addEventListener("message", (event) => {
      for (const packet of packetsIn(event.data)) {
        this.waiting.splice(0).forEach((take) => {
          if (!take(packet)) {
            this.waiting.push(take);
          }
        });
        this.listeners.forEach((listener) => listener(packet));
      }
    });
    socket.addEventListener("close", () => this.closed());
    socket.addEventListener("error", () => this.closed());
  }

  /** Opens a socket to a room's address and waits for its RoomInfo. */
  static open(url: string, opener: SocketOpener = (to) => new WebSocket(to)): Promise<RoomSocket> {
    return new Promise((resolve, reject) => {
      const socket = opener(url);
      let isOpen = false;
      socket.addEventListener("message", (event) => {
        const info = packetsIn(event.data).find((packet) => packet.cmd === "RoomInfo");
        if (!isOpen && info !== undefined) {
          isOpen = true;
          resolve(new RoomSocket(socket, info as unknown as RoomInfoPacket));
        }
      });
      const fail = () => {
        if (!isOpen) {
          isOpen = true;
          reject(new LoginError("closed"));
        }
      };
      socket.addEventListener("close", fail);
      socket.addEventListener("error", fail);
    });
  }

  /**
   * Logs in on a slot by its exact name, as this tracker's version, such as "0.6.8+2", with the
   * room's password when RoomInfo says it has one.
   */
  logIn(slot: string, version: string, password = ""): Promise<ConnectedPacket> {
    return new Promise((resolve, reject) => {
      if (this.isClosed) {
        reject(new LoginError("closed"));
        return;
      }
      this.waiting.push((packet) => {
        if (packet.cmd === "Connected") {
          resolve(packet as unknown as ConnectedPacket);
          return true;
        }
        if (packet.cmd === "ConnectionRefused") {
          reject(refusal(packet.errors));
          return true;
        }
        return false;
      });
      this.onClose = () => reject(new LoginError("closed"));
      const connect: ConnectPacket = {
        cmd: "Connect",
        password: this.info.password ? password : "",
        game: "",
        name: slot,
        uuid: crypto.randomUUID(),
        tags: TAGS,
        version: clientVersion(version),
        items_handling: EVERY_ITEM,
        slot_data: true,
      };
      this.send(connect);
    });
  }

  /**
   * Hands every packet the server sends from now on to the listener. Listen
   * before logging in: the server sends the items received in the same
   * message as Connected.
   */
  listen(listener: (packet: ServerPacket) => void): void {
    this.listeners.push(listener);
  }

  /** Sends packets to the server, in one message. */
  send(...packets: readonly ClientPacket[]): void {
    this.socket.send(JSON.stringify(packets));
  }

  /** Calls the listener once the socket has closed, at once if it already has. */
  onClosed(listener: () => void): void {
    if (this.isClosed) {
      listener();
      return;
    }
    this.closeListeners.push(listener);
  }

  close(): void {
    this.socket.close();
  }

  // An error is usually followed by a close; either one closes the socket, once.
  private closed(): void {
    if (this.isClosed) {
      return;
    }
    this.isClosed = true;
    this.onClose();
    this.closeListeners.splice(0).forEach((listener) => listener());
  }
}

// A refusal, its reasons kept, named for the two the person can fix.
function refusal(errors: unknown): LoginError {
  const reasons = (Array.isArray(errors) ? errors : []).filter(
    (reason): reason is ConnectionError => typeof reason === "string"
  );
  if (reasons.includes("InvalidPassword")) {
    return new LoginError("invalid password", reasons);
  }
  if (reasons.includes("InvalidSlot")) {
    return new LoginError("invalid slot", reasons);
  }
  return new LoginError("refused", reasons);
}

// The packets in one websocket message: a JSON array of commands, each with its cmd.
function packetsIn(data: unknown): ServerPacket[] {
  if (typeof data !== "string") {
    return [];
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch {
    return [];
  }
  return (Array.isArray(parsed) ? parsed : []).filter(
    (packet): packet is ServerPacket => isRecord(packet) && typeof packet.cmd === "string"
  );
}
