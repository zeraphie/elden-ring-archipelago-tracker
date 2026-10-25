/**
 * ─ Live room ─
 *
 * A logged-in room, live: every packet the socket hears becomes an event, the
 * items received are held so a missed one can be noticed, and a Sync goes out
 * when one is, which makes the server send the whole list again. Chat lines
 * and commands such as !hint go out as Say.
 */

import type { ConnectedPacket, RoomUpdatePacket } from "archipelago.js";
import { eventOf, networkItemOf, receiveItems, type LiveEvent } from "./live-events.js";
import { releasePermissionOf } from "./release.js";
import { serverVersionOf } from "./versions.js";
import type { RoomSocket, ServerPacket } from "./room-socket.js";
import type { NetworkItem } from "./web-responses.js";

/** A room's socket read live, handing each event on as it comes. */
export class LiveRoom {
  private held: readonly NetworkItem[] = [];

  /** Starts listening; make it before logging in, so the items sent with Connected are heard. */
  constructor(
    private readonly socket: RoomSocket,
    private readonly onEvent: (event: LiveEvent) => void
  ) {
    socket.listen((packet) => this.take(packet));
  }

  /** Says something to the room: a chat line, or a command such as "!hint Rusty Key". */
  say(text: string): void {
    this.socket.send({ cmd: "Say", text });
  }

  private take(packet: ServerPacket): void {
    switch (packet.cmd) {
      case "Connected":
        this.onEvent({
          kind: "connected",
          connected: packet as unknown as ConnectedPacket,
          hintPercent: hintPercentOf(this.socket.info),
          releasePermission: releasePermissionOf(this.socket.info),
          serverVersion: serverVersionOf(this.socket.info),
        });
        return;
      case "RoomUpdate":
        this.onEvent({ kind: "room update", update: packet as unknown as RoomUpdatePacket });
        return;
      case "ReceivedItems":
        this.receive(packet);
        return;
      default: {
        const event = eventOf(packet);
        if (event !== undefined) {
          this.onEvent(event);
        }
      }
    }
  }

  private receive(packet: ServerPacket): void {
    const items = (Array.isArray(packet.items) ? packet.items : []).flatMap(
      (item) => networkItemOf(item) ?? []
    );
    const index = typeof packet.index === "number" ? packet.index : Number.NaN;
    const after = receiveItems(this.held, index, items);
    if (after.missed) {
      this.socket.send({ cmd: "Sync" });
      return;
    }
    this.held = after.held;
    this.onEvent({
      kind: "items received",
      items: after.held,
      added: after.added,
      isWholeList: index === 0,
    });
  }
}

// RoomInfo's hint price, read with care: it comes straight from the server, unchecked.
function hintPercentOf(info: { readonly hint_cost?: unknown }): number {
  const { hint_cost: percent } = info;
  return typeof percent === "number" && Number.isFinite(percent) ? percent : 0;
}
