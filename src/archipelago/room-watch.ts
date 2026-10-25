/**
 * ─ Room watch ─
 *
 * Keeps a tracker with a room for as long as it's followed. It logs in on the
 * socket looking the room up left open, or asks the room's status: a room
 * that's awake is logged into on its current port, and one that's asleep is
 * left asleep, with a link to its page for the player to wake it there, and
 * asked again until it's back. It never wakes the room itself. A socket that
 * closes sends it back to the status, since a room's port can change as it
 * wakes. A room archipelago.gg no longer has is gone, and a login refused for
 * a wrong password or slot ends the watch.
 */

import type { LiveEvent } from "./live-events.js";
import { LiveRoom } from "./live-room.js";
import { roomPage } from "./room-link.js";
import { LoginError, roomAddress, RoomSocket, type SocketOpener } from "./room-socket.js";
import { getRoomStatus, type Fetcher } from "./web-api.js";
import { isAsleep, WebApiError } from "./web-responses.js";

/** Where following a room stands. */
export type RoomPhase =
  | { readonly phase: "looking" }
  | { readonly phase: "connecting"; readonly port: number }
  | { readonly phase: "connected"; readonly port: number }
  | {
      readonly phase: "asleep";
      /** When it was last active, in milliseconds since 1970. */
      readonly since: number;
      /** The room's page, where the player wakes it. */
      readonly page: string;
    }
  /** archipelago.gg or the room's socket didn't answer; asked again shortly. */
  | { readonly phase: "unreachable" }
  /** archipelago.gg no longer has the room. */
  | { readonly phase: "gone" }
  | { readonly phase: "refused"; readonly error: LoginError };

/** What following a room needs: who to log in as, where to tell, and the ways to ask, connect, wait and tell the time. */
export interface RoomWatchOptions {
  readonly room: string;
  readonly slot: string;
  /** This tracker's version, such as "0.6.8+2", which a login says as the Archipelago release it's tested against. */
  readonly version: string;
  /** Kept here in memory, to log in again after the room sleeps, and nowhere else. */
  readonly password?: string;
  /** A socket already open to the room, on this port, for the first login, as looking the room up leaves one. */
  readonly opened?: { readonly socket: RoomSocket; readonly port: number };
  readonly onEvent: (event: LiveEvent) => void;
  readonly onPhase: (phase: RoomPhase) => void;
  readonly fetcher?: Fetcher;
  readonly opener?: SocketOpener;
  /** Runs a callback after a while: setTimeout, or a test's own. */
  readonly timer?: (callback: () => void, ms: number) => unknown;
  readonly now?: () => number;
}

// How long a sleeping room is left before its status is asked again.
const ASLEEP_MS = 30_000;
// How long after archipelago.gg or the socket didn't answer.
const RETRY_MS = 15_000;
// How long after a socket closes, as a waking room may still be starting.
const CLOSED_MS = 1_000;

/** A room followed: logged into while it's awake, waited on while it sleeps. */
export class RoomWatch {
  private live: LiveRoom | undefined;
  private socket: RoomSocket | undefined;
  private isStopped = false;

  constructor(private readonly options: RoomWatchOptions) {}

  /** Starts following: on the socket already open when there is one, else from the room's status. */
  start(): void {
    const { opened } = this.options;
    if (opened === undefined) {
      void this.look();
      return;
    }
    this.tell({ phase: "connecting", port: opened.port });
    void this.logIn(opened.socket, opened.port);
  }

  /** Stops following the room, and closes its socket. */
  stop(): void {
    this.isStopped = true;
    this.socket?.close();
  }

  /** Says something to the room while connected: a chat line, or a command such as !hint. */
  say(text: string): void {
    this.live?.say(text);
  }

  private async look(): Promise<void> {
    const { room, fetcher, now = Date.now } = this.options;
    this.tell({ phase: "looking" });
    try {
      const status = await getRoomStatus(room, fetcher);
      if (isAsleep(status, now())) {
        this.tell({ phase: "asleep", since: status.lastActivity, page: roomPage(room) });
        this.later(() => this.look(), ASLEEP_MS);
        return;
      }
      await this.connect(status.lastPort);
    } catch (error) {
      if (error instanceof WebApiError && error.problem === "not found") {
        this.tell({ phase: "gone" });
        this.isStopped = true;
        return;
      }
      this.tell({ phase: "unreachable" });
      this.later(() => this.look(), RETRY_MS);
    }
  }

  private async connect(port: number): Promise<void> {
    this.tell({ phase: "connecting", port });
    let socket: RoomSocket;
    try {
      socket = await RoomSocket.open(roomAddress(port), this.options.opener);
    } catch {
      this.tell({ phase: "unreachable" });
      this.later(() => this.look(), RETRY_MS);
      return;
    }
    await this.logIn(socket, port);
  }

  private async logIn(socket: RoomSocket, port: number): Promise<void> {
    const { slot, version, password, onEvent } = this.options;
    if (this.isStopped) {
      socket.close();
      return;
    }
    this.socket = socket;
    this.live = new LiveRoom(socket, onEvent);
    socket.onClosed(() => {
      this.socket = undefined;
      this.live = undefined;
      this.later(() => this.look(), CLOSED_MS);
    });
    try {
      await socket.logIn(slot, version, password);
      this.tell({ phase: "connected", port });
    } catch (error) {
      // A socket that closed mid-login goes back to the status through onClosed.
      if (error instanceof LoginError && error.problem !== "closed") {
        this.tell({ phase: "refused", error });
        this.stop();
      }
    }
  }

  private later(step: () => Promise<void>, ms: number): void {
    const { timer = setTimeout } = this.options;
    timer(() => {
      if (!this.isStopped) {
        void step();
      }
    }, ms);
  }

  private tell(phase: RoomPhase): void {
    if (!this.isStopped) {
      this.options.onPhase(phase);
    }
  }
}
