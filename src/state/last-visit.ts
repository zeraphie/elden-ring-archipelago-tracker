/**
 * ─ Last visit ─
 *
 * The room and slot this device last opened, so a returning visit is offered
 * them again: the link, the slot, and whether the room asked for a password.
 * Never the password itself. It's kept beside the rooms, in the tracker's
 * database, and read back with its shape checked, since an older version may
 * have written it.
 */

import type { StateStorage } from "zustand/middleware";
import type { RoomLink } from "../archipelago/room-link.js";
import { isRecord } from "../archipelago/web-responses.js";
import { stateStorage } from "../storage/db.js";

/** The room and slot this device last opened. */
export interface Visit {
  readonly link: RoomLink;
  readonly team: number;
  readonly player: number;
  /** The slot's name, which a login names it by. */
  readonly name: string;
  /** Whether the room asked for a password, so the field shows before connecting. */
  readonly needsPassword: boolean;
}

const KEY = "last visit";

/** The last visit kept on this device; undefined when there's none, or it can't be read. */
export async function lastVisit(storage: StateStorage = stateStorage): Promise<Visit | undefined> {
  let kept: unknown;
  try {
    kept = JSON.parse((await storage.getItem(KEY)) ?? "null");
  } catch {
    return undefined;
  }
  return isVisit(kept) ? kept : undefined;
}

/** Keeps this visit, in place of the last one: its own fields only, so nothing else handed in is kept. */
export async function rememberVisit(
  { link, team, player, name, needsPassword }: Visit,
  storage: StateStorage = stateStorage
): Promise<void> {
  await storage.setItem(KEY, JSON.stringify({ link, team, player, name, needsPassword }));
}

/** Forgets the last visit, as when its room is gone. */
export async function forgetVisit(storage: StateStorage = stateStorage): Promise<void> {
  await storage.removeItem(KEY);
}

function isVisit(visit: unknown): visit is Visit {
  return (
    isRecord(visit) &&
    isLink(visit.link) &&
    Number.isInteger(visit.team) &&
    Number.isInteger(visit.player) &&
    typeof visit.name === "string" &&
    typeof visit.needsPassword === "boolean"
  );
}

function isLink(link: unknown): link is RoomLink {
  if (!isRecord(link)) {
    return false;
  }
  return link.kind === "room"
    ? typeof link.room === "string"
    : link.kind === "tracker" && typeof link.tracker === "string";
}
