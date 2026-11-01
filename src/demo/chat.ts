/**
 * ─ Demo chat ─
 *
 * What the demo room prints, as PrintJSON packets in the server's own shape.
 * As the tracker comes in, the other players join and talk, and the slot's
 * hint for what its goal still needs is there. After that, a line the slot says
 * comes back, as a server sends it back, and `!hint` names one of the key checks
 * left for any item of the room's. A hint costs nothing here, and the place is
 * made up, as the demo holds no real one.
 */

import type { NetworkItem } from "../archipelago/web-responses.js";
import { OTHER_PLAYERS } from "./players.js";
import { demoItemNames, DEMO_PLAYER, DEMO_SLOT } from "./room.js";
import type { Snapshot } from "./snapshot.js";

const { team, player: slot } = DEMO_PLAYER;
const HINT = /^!hint(?:\s+(.*))?$/i;

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
    hinted(hint),
  ];
}

/** What the room prints when the demo's slot says this: the line itself, and a command's answer. */
export function answersTo(text: string, snapshot: Snapshot): readonly unknown[] {
  const said = chat(slot, DEMO_SLOT, text);
  return text.startsWith("!") ? [said, answerTo(text, snapshot)] : [said];
}

// A command's answer: a hint for an item of the room's, or a line saying why not.
function answerTo(command: string, { keyChecksLeft, hint }: Snapshot): unknown {
  const parts = HINT.exec(command);
  if (parts === null) {
    return result("The demo room only answers !hint.");
  }
  const asked = parts[1]?.trim().toLowerCase();
  if (asked === undefined || asked === "") {
    return result("Name an item after !hint.");
  }
  const [item] = [...demoItemNames()].find(([, name]) => name.toLowerCase() === asked) ?? [];
  const location = keyChecksLeft[(item ?? 0) % Math.max(1, keyChecksLeft.length)];
  return item === undefined || location === undefined
    ? result(`There's no item called ${parts[1]?.trim()} in this room.`)
    : hinted({ ...hint, item, location });
}

// A hint for an item of this slot's, in its own world, as the server prints it.
function hinted(item: NetworkItem): unknown {
  return {
    cmd: "PrintJSON",
    type: "Hint",
    receiving: slot,
    found: false,
    item: { ...item, class: "NetworkItem" },
    data: [
      { text: "[Hint]: " },
      { text: String(slot), type: "player_id" },
      { text: "'s " },
      { text: String(item.item), player: slot, flags: item.flags, type: "item_id" },
      { text: " is at " },
      { text: String(item.location), player: slot, type: "location_id" },
      { text: " in " },
      { text: String(slot), type: "player_id" },
      { text: "'s World." },
    ],
  };
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

function result(text: string): unknown {
  return { cmd: "PrintJSON", type: "CommandResult", data: [{ text }] };
}
