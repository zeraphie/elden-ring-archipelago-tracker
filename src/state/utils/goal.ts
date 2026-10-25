/**
 * ─ Goal ─
 *
 * The goal menu for the store's room, once the Elden Ring data is in, worked
 * out from the room as the rules read it. It's worked out again only when the
 * room's view changes, as working out how far the player reaches walks the
 * whole region graph. Beside it, whether the slot's goal is done, as the room
 * or the web API says, and what has become of the items left in its world.
 */

import { releaseAfterGoal, type ReleaseState } from "../../archipelago/release.js";
import type { GoalMenu } from "../../data/bosses/goal-menu.js";
import { GOAL_STATUS } from "../slices/roster.js";
import type { EldenRingData } from "../setup.js";
import type { TrackerState } from "../store.js";
import { roomViewOf, type RoomInputs, type RoomView } from "./room.js";

// The last menu worked out, and the data and view it was worked out from.
let last:
  | { data: EldenRingData; view: RoomView | undefined; menu: GoalMenu | undefined }
  | undefined;

/** The goal menu for the store's room; undefined until slot_data is in, or when it can't be read. */
export function goalMenuOf(data: EldenRingData, inputs: RoomInputs): GoalMenu | undefined {
  const view = roomViewOf(inputs);
  if (last !== undefined && last.data === data && last.view === view) {
    return last.menu;
  }
  const menu = view && data.goalMenu(view.room, view.items, view.checked);
  last = { data, view, menu };
  return menu;
}

/** What telling whether the slot's goal is done reads, in the store. */
export type GoalDoneInputs = Pick<TrackerState, "roster" | "team" | "slot">;

/** Whether the slot's goal is done: the room announced it, or the web API gives the slot the goal's status. */
export function isGoalDone({ roster, team, slot }: GoalDoneInputs): boolean {
  return roster.some(
    (entry) => entry.team === team && entry.slot === slot && entry.status >= GOAL_STATUS
  );
}

/** What telling what became of the slot's items left reads, in the store. */
export type ReleaseInputs = Pick<TrackerState, "log" | "team" | "slot" | "releasePermission">;

/** What becomes of the items left in the slot's world, its goal done: by the room's permission, or a release it announced. */
export function releaseOf({ log, team, slot, releasePermission }: ReleaseInputs): ReleaseState {
  const isReleased = log.some(
    ({ value }) => value.kind === "release" && value.team === team && value.slot === slot
  );
  return releaseAfterGoal(releasePermission, isReleased);
}
