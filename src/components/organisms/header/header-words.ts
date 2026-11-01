/**
 * ─ Header words ─
 *
 * What the header says of the room: how the tracker is keeping up with it,
 * and how each player stands by the client status Archipelago keeps for them.
 * The status is live feedback, so a tracker link, which has none, says nothing.
 * The demo's room is always there, so it says what it is instead.
 */

import { isDemo, type RoomLink } from "../../../archipelago/room-link.js";
import type { ConnectionPhase } from "../../../state/slices/connection.js";
import { GOAL_STATUS } from "../../../state/slices/roster.js";
import { failureText } from "../../utils/entry-words.js";

/** How the tracker is keeping up with the room, as the header shows it. */
export interface LiveState {
  readonly kind: "live" | "waiting" | "asleep" | "trouble";
  readonly text: string;
  /** More on it, for a hover and a screen reader. */
  readonly detail?: string;
}

const STATUS_WORDS: Readonly<Record<number, string>> = {
  5: "Connected",
  10: "Ready",
  20: "Playing",
  [GOAL_STATUS]: "Goal complete",
};

/** How the tracker is keeping up with the room, from where following it stands; nothing on a tracker link that's reading the web API as it should. */
export function liveState(phase: ConnectionPhase, link: RoomLink): LiveState | undefined {
  switch (phase.phase) {
    case "connected":
      return { kind: "live", text: isDemo(link) ? "Demo" : "Live" };
    case "web only":
      return undefined;
    case "looking":
    case "connecting":
      return {
        kind: "waiting",
        text: "Reconnecting",
        detail: "The room's connection closed, so the tracker is finding the room again.",
      };
    case "asleep":
      return {
        kind: "asleep",
        text: "Inactive",
        detail:
          "Nobody has played for a while, so archipelago.gg has made the room inactive. Opening its page reopens it, and the tracker reconnects once it's up.",
      };
    case "unreachable":
      return {
        kind: "trouble",
        text: "Unreachable",
        detail: "archipelago.gg or the room didn't answer. The tracker asks again shortly.",
      };
    case "gone":
      return {
        kind: "trouble",
        text: "Room closed",
        detail: "archipelago.gg no longer has this room.",
      };
    case "refused":
      return {
        kind: "trouble",
        text: "Turned away",
        detail: failureText({ part: "connected", problem: phase.error.problem }),
      };
  }
}

/** A player's client status in words; 0 is a client that hasn't connected, or hasn't said. */
export function statusText(status: number): string {
  return STATUS_WORDS[status] ?? "Not connected";
}
