/**
 * ─ Goal words ─
 *
 * What the goal menu says of each row: what a need is and how it stands, and
 * how a boss stands; and, once the goal's achieved, what becomes of the items
 * left in the slot's world. A boss's drop the rules ask for reads as the
 * boss, and a choice of needs reads as each of them, joined with "or".
 */

import type { ReleaseState } from "../../archipelago/release.js";
import type { GoalBoss, GoalState } from "../../data/bosses/goal.js";
import type { Need } from "../../data/rules/rules.js";
import { listed } from "../../data/words.js";
import type { EldenRingData } from "../../state/setup.js";
import type { RowView } from "./goal-rows.js";

const BOSS_LINES: Readonly<Record<GoalState, string>> = {
  defeated: "Defeated",
  "to do": "Not defeated",
  unknown: "Can't tell from this room's checks",
};

/** What a need is: an item or a count by its name, a region, or the boss a drop asks to defeat. */
export function needName(need: Need, data: EldenRingData): string {
  switch (need.kind) {
    case "item":
      return need.item;
    case "count":
      return need.label;
    case "area":
      return need.area;
    case "location":
      return data.bossDropping(need.location)?.name ?? need.location;
    case "all":
      return listed(
        need.needs.map((part) => needName(part, data)),
        "and"
      );
    case "any":
      return listed(
        need.needs.map((part) => needName(part, data)),
        "or"
      );
  }
}

/**
 * How a need stands: a count's tally, or whether it's obtained, received or defeated. An item is
 * obtained when the slot found it in its own world, and received when it came from anyone else.
 * Anything else is a boss's drop, as the goal menu holds no other need.
 */
export function needLine(
  need: Need,
  isMet: boolean,
  ownFinds: ReadonlyMap<string | undefined, number>
): string {
  switch (need.kind) {
    case "count":
      return `${need.have} of ${need.needs}`;
    case "item":
      if (!isMet) {
        return "Not obtained";
      }
      return ownFinds.has(need.item) ? "Obtained" : "Received";
    default:
      return isMet ? "Defeated" : "Not defeated";
  }
}

/** A goal boss's name, or its flag for one the Elden Ring data doesn't know. */
export function bossName({ name, flag }: GoalBoss): string {
  return name ?? `Boss ${flag}`;
}

/** How a goal boss stands. */
export function bossLine({ state }: GoalBoss): string {
  return BOSS_LINES[state];
}

/** A goal's name where there's little room, up to its first comma: "Godfrey", for "Godfrey, First Elden Lord". */
export function shortName(name: string): string {
  return name.split(",", 1)[0] ?? name;
}

/** What a goal row says: its name, and how it stands. */
export function rowWords(
  view: RowView,
  data: EldenRingData,
  ownFinds: ReadonlyMap<string | undefined, number>
): { readonly label: string; readonly line: string } {
  return view.kind === "need"
    ? { label: needName(view.need, data), line: needLine(view.need, view.isGotten, ownFinds) }
    : { label: bossName(view.boss), line: bossLine(view.boss) };
}

/** What becomes of the items left in the slot's world, its goal achieved, as the goal menu's band says it. */
export const RELEASE_LINES: Readonly<Record<ReleaseState, string>> = {
  "can release": "Release sends the items still in your world to their owners. It can't be undone.",
  released: "The items still in your world have gone to their owners.",
  "admin only": "Only the room's admin can release the items still in your world.",
  unknown:
    "A tracker link can't see the room's release setting. Open the room's link to release from here.",
};
