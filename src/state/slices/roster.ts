/**
 * ─ Roster slice ─
 *
 * Every slot in the room as the web API last told it: its name and game, its
 * checks done out of its total, its client status, and when it was last active.
 * The web API's answers can be a minute old, so a goal the websocket announces
 * holds, and neither checks nor status ever go back down. This slot's own
 * checks are the standing slice's, which the websocket keeps live.
 */

import type { TrackerSlice } from "../store.js";
import type { History } from "../../archipelago/tracker-poll.js";

/** The client status a slot reaches once it's done its goal; it can't be undone. */
export const GOAL_STATUS = 30;

/** One slot of the room, as the web API last told it. */
export interface RosterEntry {
  readonly team: number;
  readonly slot: number;
  /** Its alias, or its name from its slot_data or room_status; undefined when none is known. */
  readonly name: string | undefined;
  readonly game: string | undefined;
  readonly checksDone: number;
  readonly total: number | undefined;
  /** 0 unknown, 5 connected, 10 ready, 20 playing, 30 goal. */
  readonly status: number;
  /** When it last sent a check, in milliseconds since 1970. */
  readonly lastActive: number | undefined;
}

export interface RosterSlice {
  readonly roster: readonly RosterEntry[];
  /** The web API's word on every slot, never undoing a goal or checks already seen. */
  takeRoster(history: History): void;
  /** A slot's goal, announced over the websocket. */
  markGoal(team: number, slot: number): void;
}

export const createRosterSlice: TrackerSlice<RosterSlice> = (set) => ({
  roster: [],
  takeRoster: ({ tracker, statics, names }) =>
    set((state) => {
      const of = <T extends { readonly team: number; readonly player: number }>(
        list: readonly T[],
        team: number,
        player: number
      ) => list.find((entry) => entry.team === team && entry.player === player);
      state.roster = tracker.status.map(({ team, player, status }) => {
        const before = state.roster.find((entry) => entry.team === team && entry.slot === player);
        return {
          team,
          slot: player,
          name: of(tracker.aliases, team, player)?.alias ?? names.get(player) ?? before?.name,
          game: of(statics.games, team, player)?.game,
          checksDone: Math.max(
            before?.checksDone ?? 0,
            of(tracker.checksDone, team, player)?.locations.length ?? 0
          ),
          total: of(statics.totals, team, player)?.total,
          status: Math.max(before?.status ?? 0, status),
          lastActive: of(tracker.activity, team, player)?.time,
        };
      });
    }),
  markGoal: (team, slot) =>
    set((state) => {
      const entry = state.roster.find((each) => each.team === team && each.slot === slot);
      if (entry === undefined) {
        state.roster.push({
          team,
          slot,
          name: undefined,
          game: undefined,
          checksDone: 0,
          total: undefined,
          status: GOAL_STATUS,
          lastActive: undefined,
        });
        return;
      }
      entry.status = GOAL_STATUS;
    }),
});
