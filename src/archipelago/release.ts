/**
 * ─ Release ─
 *
 * What becomes of the items still in a slot's world once its goal is done,
 * from the room's release setting, which RoomInfo gives as a permission:
 * disabled (0), enabled (1), goal (2), auto (6) or auto with enabled (7). Auto
 * releases on the goal by itself; enabled or goal lets the slot's own client
 * send `!release`; disabled leaves it to the room's admin.
 */

import { isRecord } from "./web-responses.js";

// The permission's flags, as archipelago.js names them.
const ENABLED = 0b001;
const GOAL = 0b010;
const AUTO = 0b100;

/** What becomes of a slot's items left after its goal: sent already, the slot's to send, the admin's alone, or not known. */
export type ReleaseState = "released" | "can release" | "admin only" | "unknown";

/** RoomInfo's release permission, read with care: it comes straight from the server, unchecked. */
export function releasePermissionOf(info: { readonly permissions?: unknown }): number | undefined {
  const { permissions } = info;
  if (!isRecord(permissions)) {
    return undefined;
  }
  const { release } = permissions;
  return typeof release === "number" && Number.isInteger(release) ? release : undefined;
}

/**
 * What becomes of the slot's items left, its goal done, by the room's release
 * permission (undefined when no login has said it) and whether the room has
 * announced their release.
 */
export function releaseAfterGoal(
  permission: number | undefined,
  isReleased: boolean
): ReleaseState {
  if (isReleased) {
    return "released";
  }
  if (permission === undefined) {
    return "unknown";
  }
  if ((permission & AUTO) !== 0) {
    return "released";
  }
  return (permission & (ENABLED | GOAL)) !== 0 ? "can release" : "admin only";
}
