/**
 * ─ Connection slice ─
 *
 * The link the store was opened from, and where following its room stands: as
 * the room's watch says, looking, connecting, connected, asleep, unreachable,
 * gone or refused; or, from a tracker link alone, on the web API only.
 */

import { castDraft } from "immer";
import type { RoomLink } from "../../archipelago/room-link.js";
import type { RoomPhase } from "../../archipelago/room-watch.js";
import type { PollPhase } from "../../archipelago/tracker-poll.js";
import type { TrackerSlice } from "../store.js";

/** Where following the room stands, live or on the web API only. */
export type ConnectionPhase = RoomPhase | PollPhase;

export interface ConnectionSlice {
  readonly link: RoomLink;
  readonly connection: ConnectionPhase;
  setConnection(connection: ConnectionPhase): void;
}

export const createConnectionSlice =
  (link: RoomLink): TrackerSlice<ConnectionSlice> =>
  (set) => ({
    link,
    connection: { phase: "looking" },
    setConnection: (connection) =>
      set((state) => {
        state.connection = castDraft(connection);
      }),
  });
