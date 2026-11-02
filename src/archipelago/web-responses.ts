/**
 * ─ Web responses ─
 *
 * archipelago.gg's web API answers, read into typed shapes at the boundary: a
 * room's status, its static tracker, a game's data package, slot_data and the
 * tracker. An item or a hint arrives as an array and is named field by field,
 * and a time arrives as an RFC 1123 date. An answer in any other shape is an
 * error naming the field that was wrong.
 */

/** Why a web API request failed: no such room or tracker, no answer, or an answer in a shape it shouldn't have. */
export type WebApiProblem = "not found" | "unreachable" | "unexpected";

/** A web API request that failed, with what was asked for, or the field that was wrong. */
export class WebApiError extends Error {
  constructor(
    readonly problem: WebApiProblem,
    readonly field: string
  ) {
    super(`${problem}: ${field}`);
    this.name = "WebApiError";
  }
}

/** A room's status: its tracker, its slots, the port its websocket was last on, and when it was last active. */
export interface RoomStatus {
  readonly tracker: string;
  readonly players: readonly { readonly name: string; readonly game: string }[];
  readonly lastPort: number;
  /** In milliseconds since 1970. */
  readonly lastActivity: number;
  /** How long the room stays up with nothing happening, in seconds. */
  readonly timeout: number;
}

/** One slot of a room, by team and player number. */
export interface Slot {
  readonly team: number;
  readonly player: number;
}

/** A room's static tracker: each game's data package checksum, each slot's game and location count, and its groups. */
export interface StaticTracker {
  readonly checksums: ReadonlyMap<string, string>;
  readonly games: readonly (Slot & { readonly game: string })[];
  readonly totals: readonly (Slot & { readonly total: number })[];
  readonly groups: readonly {
    readonly slot: number;
    readonly name: string;
    readonly members: readonly number[];
  }[];
}

/** A game's data package: its item and location names, by Archipelago id. */
export interface DataPackage {
  readonly checksum: string;
  readonly itemNames: ReadonlyMap<number, string>;
  readonly locationNames: ReadonlyMap<number, string>;
}

/** One slot's slot_data, as its game wrote it. */
export interface SlotData {
  readonly player: number;
  readonly slotData: Readonly<Record<string, unknown>>;
}

/** An item sent: which item, from which location, by which player (0 for the server), and its flags. */
export interface NetworkItem {
  readonly item: number;
  readonly location: number;
  readonly player: number;
  readonly flags: number;
}

/** NetworkItem.flags: the item can unlock logical advancement. */
export const PROGRESSION = 0b001;

/** A hint: whose item is where, whether it's been found, and the status its receiver gave it. */
export interface Hint {
  readonly receivingPlayer: number;
  readonly findingPlayer: number;
  readonly location: number;
  readonly item: number;
  readonly found: boolean;
  readonly entrance: string;
  readonly itemFlags: number;
  readonly status: number;
}

/** A room's tracker: each slot's alias, items received, checks done, hints, activity and client status. */
export interface TrackerData {
  readonly aliases: readonly (Slot & { readonly alias: string | undefined })[];
  readonly itemsReceived: readonly (Slot & { readonly items: readonly NetworkItem[] })[];
  readonly checksDone: readonly (Slot & { readonly locations: readonly number[] })[];
  readonly totalChecksDone: readonly { readonly team: number; readonly checksDone: number }[];
  readonly hints: readonly (Slot & { readonly hints: readonly Hint[] })[];
  /** When each slot last sent a check, in milliseconds since 1970; undefined if never. */
  readonly activity: readonly (Slot & { readonly time: number | undefined })[];
  /** When each slot last connected, in milliseconds since 1970; undefined if never. */
  readonly connection: readonly (Slot & { readonly time: number | undefined })[];
  /** Each slot's client status: 0 unknown, 5 connected, 10 ready, 20 playing, 30 goal. */
  readonly status: readonly (Slot & { readonly status: number })[];
}

/** Whether a value is a plain object, as a JSON object reads: not null, and not a list. */
export function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Whether a room has gone to sleep: nothing has happened in it for longer than its timeout. */
export function isAsleep(room: RoomStatus, now: number): boolean {
  return now - room.lastActivity > room.timeout * 1000;
}

/** `/api/room_status/<room>`, read. */
export function readRoomStatus(answer: unknown): RoomStatus {
  const room = record(answer, "room_status");
  return {
    tracker: text(room.tracker, "tracker"),
    players: list(room.players, "players").map((player, i) => {
      const [name, game] = list(player, `players[${i}]`);
      return { name: text(name, `players[${i}][0]`), game: text(game, `players[${i}][1]`) };
    }),
    lastPort: number(room.last_port, "last_port"),
    lastActivity: time(room.last_activity, "last_activity"),
    timeout: number(room.timeout, "timeout"),
  };
}

/** `/api/static_tracker/<tracker>`, read. */
export function readStaticTracker(answer: unknown): StaticTracker {
  const tracker = record(answer, "static_tracker");
  const packages = record(tracker.datapackage, "datapackage");
  return {
    checksums: new Map(
      Object.entries(packages).map(([game, data]) => [
        game,
        text(record(data, `datapackage.${game}`).checksum, `datapackage.${game}.checksum`),
      ])
    ),
    games: slots(tracker.player_game, "player_game", (entry, at) => ({
      game: text(entry.game, `${at}.game`),
    })),
    totals: slots(tracker.player_locations_total, "player_locations_total", (entry, at) => ({
      total: number(entry.total_locations, `${at}.total_locations`),
    })),
    groups: list(tracker.groups, "groups").map((group, i) => {
      const entry = record(group, `groups[${i}]`);
      return {
        slot: number(entry.slot, `groups[${i}].slot`),
        name: text(entry.name, `groups[${i}].name`),
        members: list(entry.members, `groups[${i}].members`).map((member, j) =>
          number(member, `groups[${i}].members[${j}]`)
        ),
      };
    }),
  };
}

/** `/api/datapackage/<checksum>`, read: one game's names, by id. */
export function readDataPackage(answer: unknown): DataPackage {
  const data = record(answer, "datapackage");
  const namesById = (field: string): Map<number, string> =>
    new Map(
      Object.entries(record(data[field], field)).map(([name, id]) => [
        number(id, `${field}.${name}`),
        name,
      ])
    );
  return {
    checksum: text(data.checksum, "checksum"),
    itemNames: namesById("item_name_to_id"),
    locationNames: namesById("location_name_to_id"),
  };
}

/** `/api/slot_data_tracker/<tracker>`, read: each slot's slot_data, its shape the game's own. */
export function readSlotData(answer: unknown): SlotData[] {
  return list(answer, "slot_data_tracker").map((entry, i) => {
    const slot = record(entry, `[${i}]`);
    return {
      player: number(slot.player, `[${i}].player`),
      slotData: record(slot.slot_data, `[${i}].slot_data`),
    };
  });
}

/** `/api/tracker/<tracker>`, read. */
export function readTracker(answer: unknown): TrackerData {
  const tracker = record(answer, "tracker");
  const times = (field: string) =>
    slots(tracker[field], field, (entry, at) => ({
      time: entry.time === null ? undefined : time(entry.time, `${at}.time`),
    }));
  return {
    aliases: slots(tracker.aliases, "aliases", (entry, at) => ({
      alias: entry.alias === null ? undefined : text(entry.alias, `${at}.alias`),
    })),
    itemsReceived: slots(tracker.player_items_received, "player_items_received", (entry, at) => ({
      items: list(entry.items, `${at}.items`).map((item, i) =>
        networkItem(item, `${at}.items[${i}]`)
      ),
    })),
    checksDone: slots(tracker.player_checks_done, "player_checks_done", (entry, at) => ({
      locations: list(entry.locations, `${at}.locations`).map((id, i) =>
        number(id, `${at}.locations[${i}]`)
      ),
    })),
    totalChecksDone: list(tracker.total_checks_done, "total_checks_done").map((team, i) => {
      const entry = record(team, `total_checks_done[${i}]`);
      return {
        team: number(entry.team, `total_checks_done[${i}].team`),
        checksDone: number(entry.checks_done, `total_checks_done[${i}].checks_done`),
      };
    }),
    hints: slots(tracker.hints, "hints", (entry, at) => ({
      hints: list(entry.hints, `${at}.hints`).map((hint, i) => hintOf(hint, `${at}.hints[${i}]`)),
    })),
    activity: times("activity_timers"),
    connection: times("connection_timers"),
    status: slots(tracker.player_status, "player_status", (entry, at) => ({
      status: number(entry.status, `${at}.status`),
    })),
  };
}

// A list of per-slot entries, each read with its team and player and the rest of what it holds.
function slots<T>(
  value: unknown,
  field: string,
  rest: (entry: Readonly<Record<string, unknown>>, at: string) => T
): (Slot & T)[] {
  return list(value, field).map((item, i) => {
    const at = `${field}[${i}]`;
    const entry = record(item, at);
    return {
      team: number(entry.team, `${at}.team`),
      player: number(entry.player, `${at}.player`),
      ...rest(entry, at),
    };
  });
}

// A NetworkItem, sent as [item, location, player, flags].
function networkItem(value: unknown, field: string): NetworkItem {
  const [item, location, player, flags = 0] = list(value, field);
  return {
    item: number(item, `${field}[0]`),
    location: number(location, `${field}[1]`),
    player: number(player, `${field}[2]`),
    flags: number(flags, `${field}[3]`),
  };
}

// A Hint, sent as [receiving_player, finding_player, location, item, found, entrance, item_flags, status].
function hintOf(value: unknown, field: string): Hint {
  const [receiving, finding, location, item, found, entrance = "", flags = 0, status = 0] = list(
    value,
    field
  );
  return {
    receivingPlayer: number(receiving, `${field}[0]`),
    findingPlayer: number(finding, `${field}[1]`),
    location: number(location, `${field}[2]`),
    item: number(item, `${field}[3]`),
    found: flag(found, `${field}[4]`),
    entrance: text(entrance, `${field}[5]`),
    itemFlags: number(flags, `${field}[6]`),
    status: number(status, `${field}[7]`),
  };
}

function record(value: unknown, field: string): Readonly<Record<string, unknown>> {
  if (!isRecord(value)) {
    throw new WebApiError("unexpected", field);
  }
  return value;
}

function list(value: unknown, field: string): readonly unknown[] {
  if (!Array.isArray(value)) {
    throw new WebApiError("unexpected", field);
  }
  return value;
}

function number(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new WebApiError("unexpected", field);
  }
  return value;
}

function text(value: unknown, field: string): string {
  if (typeof value !== "string") {
    throw new WebApiError("unexpected", field);
  }
  return value;
}

function flag(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") {
    throw new WebApiError("unexpected", field);
  }
  return value;
}

// A time as Flask sends it, "Thu, 22 Oct 2026 20:39:03 GMT".
function time(value: unknown, field: string): number {
  const at = Date.parse(text(value, field));
  if (Number.isNaN(at)) {
    throw new WebApiError("unexpected", field);
  }
  return at;
}
