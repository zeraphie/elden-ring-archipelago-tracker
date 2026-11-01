/**
 * ─ Demo chat ─
 *
 * What the demo room prints as the tracker comes in, as PrintJSON packets in
 * the server's own shape: the other players joining and talking, and the slot's
 * hint for what its goal still needs.
 */

import { OTHER_PLAYERS } from "./players.js";
import { DEMO_PLAYER, DEMO_SLOT } from "./room.js";
import type { Snapshot } from "./snapshot.js";

const { team, player: slot } = DEMO_PLAYER;

/** The messages the room opens on, oldest first. */
export function openingLines({ hint }: Snapshot): readonly unknown[] {
  const [sam, jo] = OTHER_PLAYERS;
  return [
    ...OTHER_PLAYERS.map(({ player, name, game }) => ({
      cmd: "PrintJSON",
      type: "Join",
      team,
      slot: player,
      tags: ["AP"],
      data: [{ text: `${name} (Team #1) playing ${game} has joined. Client(0.6.8), ['AP'].` }],
    })),
    chat(sam?.player ?? slot, sam?.name ?? "", "Moon Pearl came through, thanks."),
    chat(jo?.player ?? slot, jo?.name ?? "", "Anyone seen the Ice Beam?"),
    chat(slot, DEMO_SLOT, "!hint Dectus Medallion (Left)"),
    {
      cmd: "PrintJSON",
      type: "Hint",
      receiving: slot,
      found: false,
      item: { ...hint, class: "NetworkItem" },
      data: [
        { text: "[Hint]: " },
        { text: String(slot), type: "player_id" },
        { text: "'s " },
        { text: String(hint.item), player: slot, flags: hint.flags, type: "item_id" },
        { text: " is at " },
        { text: String(hint.location), player: slot, type: "location_id" },
        { text: " in " },
        { text: String(slot), type: "player_id" },
        { text: "'s World." },
      ],
    },
  ];
}

// A line a player said, as the room prints it.
function chat(speaker: number, name: string, message: string): unknown {
  return {
    cmd: "PrintJSON",
    type: "Chat",
    team,
    slot: speaker,
    message,
    data: [{ text: `${name}: ${message}` }],
  };
}
