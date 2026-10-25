/**
 * ─ Standing slice ─
 *
 * The slot's standing in the room: its team and number, the players, the
 * locations checked and still missing, the hint points, what a hint costs,
 * and the room's release permission and Archipelago version. A login sets
 * all of it; a room update replaces what it carries, and adds only the
 * locations newly checked, since that's all it sends of them. With no
 * websocket, as in the reduced tracker, the web API's history says the
 * slot's checks instead.
 */

import type { NetworkPlayer } from "archipelago.js";
import { hintCost } from "../../archipelago/hints.js";
import type { LiveEvent } from "../../archipelago/live-events.js";
import type { Version } from "../../archipelago/versions.js";
import type { History } from "../../archipelago/tracker-poll.js";
import type { TrackerSlice } from "../store.js";

export interface StandingSlice {
  readonly team: number | undefined;
  readonly slot: number | undefined;
  readonly players: readonly NetworkPlayer[];
  readonly checked: readonly number[];
  readonly missing: readonly number[];
  readonly hintPoints: number | undefined;
  /** What a hint costs this slot, in points, as the login said; 0 when hints are free. */
  readonly hintCost: number | undefined;
  /** The room's release permission, as the login said; undefined before one, and on a tracker link. */
  readonly releasePermission: number | undefined;
  /** The room's Archipelago version, the server's own, as the login said; undefined before one, and on a tracker link. */
  readonly serverVersion: Version | undefined;
  /** A login or a room update, as it changes the slot's standing. */
  takeStanding(event: Extract<LiveEvent, { kind: "connected" | "room update" }>): void;
  /** The slot picked before any login, or named by a player's tracker link; a login then says it again. */
  chooseSlot(team: number, slot: number): void;
  /** The slot's checks from the web API's history, while there's no websocket to say them. */
  takeCheckHistory(history: History): void;
}

export const createStandingSlice: TrackerSlice<StandingSlice> = (set) => ({
  team: undefined,
  slot: undefined,
  players: [],
  checked: [],
  missing: [],
  hintPoints: undefined,
  hintCost: undefined,
  releasePermission: undefined,
  serverVersion: undefined,
  takeStanding: (event) =>
    set((state) => {
      if (event.kind === "connected") {
        const { team, slot, players, checked_locations, missing_locations, hint_points } =
          event.connected;
        Object.assign(state, {
          team,
          slot,
          players,
          checked: checked_locations,
          missing: missing_locations,
          hintPoints: hint_points,
          hintCost: hintCost(
            event.hintPercent,
            checked_locations.length + missing_locations.length
          ),
          releasePermission: event.releasePermission,
          serverVersion: event.serverVersion,
        });
        return;
      }
      const { players, hint_points, checked_locations } = event.update;
      if (players !== undefined) {
        state.players = players;
      }
      if (hint_points !== undefined) {
        state.hintPoints = hint_points;
      }
      if (checked_locations !== undefined) {
        const newly = new Set(checked_locations);
        state.checked = [...new Set([...state.checked, ...checked_locations])];
        state.missing = state.missing.filter((id) => !newly.has(id));
      }
    }),
  chooseSlot: (team, slot) =>
    set((state) => {
      state.team = team;
      state.slot = slot;
    }),
  takeCheckHistory: ({ tracker }) =>
    set((state) => {
      if (state.connection.phase === "connected") {
        return;
      }
      const mine = tracker.checksDone.find(
        ({ team, player }) => team === state.team && player === state.slot
      );
      // A check can't be undone, so one already known stays.
      state.checked = [...new Set([...state.checked, ...(mine?.locations ?? [])])];
    }),
});
