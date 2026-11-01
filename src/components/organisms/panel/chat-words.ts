/**
 * ─ Chat words ─
 *
 * What the Chat tab says: who a line is from when no player said it, the
 * hints over the input, and what it says when it can't send.
 */

import { hintsAvailable, pointsToNextHint } from "../../../archipelago/hints.js";
import { figure } from "../../utils/figure.js";
import type { ChatKind } from "./chat-lines.js";

/** Who a line is from when no player said it. */
export const SPEAKERS: Readonly<Record<Exclude<ChatKind, "chat" | "command">, string>> = {
  reply: "Server",
  hint: "Hint",
  room: "Room",
};

/** The hints over the input: how many the points buy, and how many points off the next is; undefined until the login says. */
export function hintLine(points: number | undefined, cost: number | undefined): string | undefined {
  if (points === undefined || cost === undefined) {
    return undefined;
  }
  if (cost === 0) {
    return "Hints are free";
  }
  const available = figure(hintsAvailable(points, cost));
  return `Available Hints: ${available} - Next hint in: ${figure(pointsToNextHint(points, cost))}`;
}
