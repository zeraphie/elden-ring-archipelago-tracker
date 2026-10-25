/**
 * ─ Chat words ─
 *
 * What the Chat tab says: who a line is from when no player said it, the
 * hint points beside the input, and what it says when it can't send.
 */

import { figure } from "../../utils/figure.js";
import type { ChatKind } from "./chat-lines.js";

/** Who a line is from when no player said it. */
export const SPEAKERS: Readonly<Record<Exclude<ChatKind, "chat" | "command">, string>> = {
  reply: "Server",
  hint: "Hint",
  room: "Room",
};

/** The hint points beside the input: how many there are, and what a hint costs; undefined until the login says. */
export function hintLine(points: number | undefined, cost: number | undefined): string | undefined {
  if (points === undefined || cost === undefined) {
    return undefined;
  }
  return cost === 0 ? "Hints are free" : `Hint points ${figure(points)} of ${figure(cost)}`;
}
