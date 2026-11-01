/**
 * ─ Goal ─
 *
 * A room's goal bosses and how each stands, from slot_data's `goal` flags and
 * the checks done. Archipelago sends no word when a boss falls, but its drops
 * are checks: one of them checked means it's defeated. A boss with no drop in
 * the room can't be read that way, so its state stays unknown, as the
 * apworld's own goal check leaves such bosses out. What stands in the way of
 * each boss comes from the rules, not from here.
 */

import { BOSSES, type Boss } from "./bosses.js";
import { MAIN_PATH_BOSSES } from "./main-path.js";

/** How a goal boss stands: defeated, still to do, or not knowable from the room's checks. */
export type GoalState = "defeated" | "to do" | "unknown";

/** One of a room's goal bosses, and how it stands. */
export interface GoalBoss {
  readonly flag: number;
  /** Its name; undefined for a flag the table doesn't know, such as one from a newer apworld. */
  readonly name: string | undefined;
  /** The area code its apworld name carries ("LRC", "LG/WR"), when the table knows it. */
  readonly where: string | undefined;
  /** The first of its drops in the room, which places it: its region and its spot; undefined with none. */
  readonly drop: string | undefined;
  readonly state: GoalState;
}

// The bosses whose drops name them: every boss a goal can name, and the main path's one that can't be.
const DROPPING: ReadonlyMap<number, Boss> = new Map([...BOSSES, ...MAIN_PATH_BOSSES]);

/** The boss whose defeat drops this location, by its flag and name, when a goal boss or a main-path boss does. */
export function bossDropping(
  location: string,
  bosses: ReadonlyMap<number, Boss> = DROPPING
): { readonly flag: number; readonly name: string } | undefined {
  const found = [...bosses].find(([, { drops }]) => drops.includes(location));
  return found && { flag: found[0], name: found[1].name };
}

/** The drops of the boss whose defeat drops this location; the location alone when none does. */
export function dropsBeside(location: string): readonly string[] {
  return [...DROPPING.values()].find(({ drops }) => drops.includes(location))?.drops ?? [location];
}

/**
 * The goal's bosses in slot_data's order, each with its state, given the
 * names of the room's checks and of those done.
 */
export function goalBosses(
  goal: readonly number[],
  room: ReadonlySet<string>,
  checked: ReadonlySet<string>,
  bosses: ReadonlyMap<number, Boss> = BOSSES
): GoalBoss[] {
  return goal.map((flag) => {
    const boss = bosses.get(flag);
    const drops = (boss?.drops ?? []).filter((drop) => room.has(drop));
    const state: GoalState =
      drops.length === 0
        ? "unknown"
        : drops.some((drop) => checked.has(drop))
          ? "defeated"
          : "to do";
    return {
      flag,
      name: boss?.name,
      where: boss?.where,
      drop: drops[0],
      state,
    };
  });
}
