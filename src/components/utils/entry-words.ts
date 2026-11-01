/**
 * ─ Entry words ─
 *
 * What the room's card says: each part's name, a game's and a slot's names,
 * the line naming what's still loading, what a tracker link can't give, and
 * what went wrong, in words a person can act on.
 */

import { ELDEN_RING } from "../../archipelago/look-up.js";
import { linkProblemMessage } from "../../archipelago/room-link.js";
import { WEB_ONLY_UNAVAILABLE } from "../../archipelago/tracker-poll.js";
import type { EntryProblem, PartStanding } from "../../state/entry.js";
import type { Part, SetupFailure } from "../../state/setup.js";
import { listed } from "../../data/words.js";

/** Each part as the loader names it. */
export const PART_LABELS: Readonly<Record<Part, string>> = {
  status: "Room status",
  "data package": "Data package",
  "slot data": "Slot data",
  "elden ring data": "Elden Ring data",
  history: "History",
  connected: "Live connection",
  saved: "Saved events",
};

// What each part asks archipelago.gg for, as the person would put it.
const ASKED_FOR: Readonly<Record<Exclude<Part, "elden ring data">, string>> = {
  status: "the room's status",
  "data package": "the room's item and location names",
  "slot data": "the slot's options",
  history: "the room's history",
  connected: "the live connection",
  saved: "what this device kept",
};

/** A game as a person reads it: Archipelago writes Elden Ring's name without its space. */
export function gameName(game: string): string {
  return game === ELDEN_RING ? "Elden Ring" : game;
}

/** A slot's name, or its number when only an alias would name it. */
export function slotName(name: string | undefined, number: number): string {
  return name ?? `Slot ${number}`;
}

/** What a tracker link leads to, said before connecting. */
export function reducedTrackerNote(): string {
  return `A tracker page doesn't lead to the room itself, so this reads archipelago.gg every minute instead. There are no ${listed(WEB_ONLY_UNAVAILABLE, "or")}. The room's page gives those.`;
}

/** The line over the parts: what's still loading, that it stopped, or that the tracker is opening. */
export function loadingLine(parts: readonly PartStanding[], isStopped: boolean): string {
  if (isStopped) {
    return "Stopped";
  }
  const loading = parts
    .filter(({ state }) => state === "loading")
    .map(({ part }) => PART_LABELS[part].toLowerCase());
  return loading.length === 0 ? "Opening the tracker" : `Waiting on ${listed(loading, "and")}`;
}

/** Why the way in went back to the link, and what to do about it. */
export function entryProblemText(problem: EntryProblem): string {
  switch (problem.kind) {
    case "link":
      return linkProblemMessage(problem);
    case "gone":
      return "archipelago.gg has no room or tracker with that id. It may have been closed: ask whoever made the room for its link again.";
    case "unreachable":
      return "archipelago.gg didn't answer. Check the connection, then look it up again.";
    case "unexpected":
      return `archipelago.gg answered with ${problem.field} in a shape the tracker doesn't read. The tracker may need updating for a newer archipelago.gg.`;
  }
}

/** Why setting up stopped, and what to do about it. */
export function failureText(failure: SetupFailure): string {
  // The tracker's own file, from this site rather than archipelago.gg.
  if (failure.part === "elden ring data") {
    return "The tracker's own Elden Ring data didn't load. Check the connection, then try again.";
  }
  const asked = ASKED_FOR[failure.part];
  switch (failure.problem) {
    case "unreachable":
      return `archipelago.gg didn't answer when asked for ${asked}. The room may be restarting, so try again in a moment.`;
    case "not found":
      return `archipelago.gg has none of ${asked} for this room, so the tracker can't read it.`;
    case "unexpected":
      return `archipelago.gg answered with ${asked} in a shape the tracker doesn't read. The tracker may need updating for a newer archipelago.gg.`;
    case "gone":
      return "archipelago.gg no longer has this room, so what this device kept of it has been cleared.";
    case "invalid password":
      return "The room turned the password down. Check it with whoever made the room, then try again.";
    case "invalid slot":
      return "The room has no slot by that name any more. Pick your slot again.";
    case "refused":
      return "The room turned the tracker away. It may be running a version of Archipelago the tracker can't speak to.";
    case "closed":
      return "The room closed the connection before letting the tracker in. Try again.";
    case "asleep":
      return "The room went inactive while the tracker was connecting.";
  }
}

/** How a part stands, for a screen reader beside its dot; "stopped" is one left loading when setting up stopped. */
export const PART_STATE_WORDS: Readonly<Record<PartStanding["state"] | "stopped", string>> = {
  loading: "loading",
  in: "loaded",
  failed: "failed",
  stopped: "not asked for",
};
