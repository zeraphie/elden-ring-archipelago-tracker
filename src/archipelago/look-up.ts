/**
 * ─ Look up ─
 *
 * What a link leads to, before a slot is picked. A room's status says whether
 * it's asleep, and an awake room's websocket is opened, so its RoomInfo can
 * say whether a password is needed; the socket stays open for the login. A
 * tracker link reaches only the web API, so its static tracker and slot_data
 * name the slots instead. Either way, it never wakes a room.
 */

import { roomPage, type RoomLink } from "./room-link.js";
import { LoginError, roomAddress, RoomSocket, type SocketOpener } from "./room-socket.js";
import { slotNames } from "./tracker-poll.js";
import { getRoomStatus, getSlotData, getStaticTracker, type Fetcher } from "./web-api.js";
import {
  isAsleep,
  isRecord,
  WebApiError,
  type RoomStatus,
  type SlotData,
  type StaticTracker,
} from "./web-responses.js";

/** Elden Ring's name as Archipelago gives a slot's game. */
export const ELDEN_RING = "EldenRing";

/** One slot of a room, as the picker offers it: its team and number, its name when known, and its game. */
export interface RoomSlot {
  readonly team: number;
  readonly player: number;
  /** Undefined for another game's slot on a tracker link, which only an alias would name. */
  readonly name: string | undefined;
  readonly game: string;
  /** Only an Elden Ring slot can be tracked. */
  readonly isEldenRing: boolean;
}

/** An awake room, looked up: its status, its socket left open, its slots, and whether it needs a password. */
export interface FoundRoom {
  readonly kind: "room";
  readonly link: Extract<RoomLink, { kind: "room" }>;
  readonly status: RoomStatus;
  readonly socket: RoomSocket;
  readonly slots: readonly RoomSlot[];
  readonly needsPassword: boolean;
}

/** A tracker page, looked up: its static tracker, every slot's slot_data, and its slots. */
export interface FoundTracker {
  readonly kind: "tracker";
  readonly link: Extract<RoomLink, { kind: "tracker" }>;
  readonly statics: StaticTracker;
  readonly slotData: readonly SlotData[];
  readonly slots: readonly RoomSlot[];
}

/** A link that leads somewhere the tracker can follow. */
export type Found = FoundRoom | FoundTracker;

/** Every game's data package checksum in a room, by game, from its RoomInfo or its static tracker. */
export function checksumsOf(found: Found): [string, string][] {
  return found.kind === "room" ? roomChecksums(found.socket.info) : [...found.statics.checksums];
}

// RoomInfo's checksums, by game, read with care: it comes straight from the server, unchecked.
function roomChecksums(info: { readonly datapackage_checksums?: unknown }): [string, string][] {
  const field = "RoomInfo.datapackage_checksums";
  const { datapackage_checksums: checksums } = info;
  if (!isRecord(checksums)) {
    throw new WebApiError("unexpected", field);
  }
  return Object.entries(checksums).map(([game, checksum]) => {
    if (typeof checksum !== "string") {
      throw new WebApiError("unexpected", `${field}.${game}`);
    }
    return [game, checksum];
  });
}

/** What looking a link up came to. */
export type LookUp =
  | { readonly kind: "found"; readonly found: Found }
  | {
      readonly kind: "asleep";
      /** When it was last active, in milliseconds since 1970. */
      readonly since: number;
      /** The room's page, where the player wakes it. */
      readonly page: string;
    }
  /** archipelago.gg has no such room or tracker. */
  | { readonly kind: "gone" }
  /** archipelago.gg or the room's socket didn't answer. */
  | { readonly kind: "unreachable" }
  /** archipelago.gg answered in a shape the tracker doesn't read, at this field. */
  | { readonly kind: "unexpected"; readonly field: string };

/** The ways looking up asks, connects and tells the time: the browser's own, or a test's. */
export interface LookUpOptions {
  readonly fetcher?: Fetcher;
  readonly opener?: SocketOpener;
  readonly now?: () => number;
}

/** Where a link leads: a room awake or asleep, a tracker page, or why it can't be followed. */
export async function lookUp(link: RoomLink, options: LookUpOptions = {}): Promise<LookUp> {
  try {
    return link.kind === "room"
      ? await lookUpRoom(link, options)
      : { kind: "found", found: await lookUpTracker(link, options.fetcher) };
  } catch (error) {
    if (error instanceof WebApiError) {
      return webFailure(error);
    }
    if (error instanceof LoginError) {
      return { kind: "unreachable" };
    }
    throw error;
  }
}

async function lookUpRoom(
  link: Extract<RoomLink, { kind: "room" }>,
  { fetcher, opener, now = Date.now }: LookUpOptions
): Promise<LookUp> {
  const status = await getRoomStatus(link.room, fetcher);
  if (isAsleep(status, now())) {
    return { kind: "asleep", since: status.lastActivity, page: roomPage(link.room) };
  }
  const socket = await RoomSocket.open(roomAddress(status.lastPort), opener);
  // room_status lists the slots in order, from slot 1, all on the first team.
  const slots = status.players.map(({ name, game }, i) => ({
    team: 0,
    player: i + 1,
    name,
    game,
    isEldenRing: game === ELDEN_RING,
  }));
  return {
    kind: "found",
    found: { kind: "room", link, status, socket, slots, needsPassword: socket.info.password },
  };
}

async function lookUpTracker(
  link: Extract<RoomLink, { kind: "tracker" }>,
  fetcher: Fetcher | undefined
): Promise<FoundTracker> {
  const [statics, slotData] = await Promise.all([
    getStaticTracker(link.tracker, fetcher),
    getSlotData(link.tracker, fetcher),
  ]);
  const names = slotNames(slotData);
  const slots = statics.games.map(({ team, player, game }) => ({
    team,
    player,
    name: names.get(player),
    game,
    isEldenRing: game === ELDEN_RING,
  }));
  return { kind: "tracker", link, statics, slotData, slots };
}

// A web API request that failed, as what looking up came to.
function webFailure({ problem, field }: WebApiError): LookUp {
  switch (problem) {
    case "not found":
      return { kind: "gone" };
    case "unreachable":
      return { kind: "unreachable" };
    case "unexpected":
      return { kind: "unexpected", field };
  }
}
