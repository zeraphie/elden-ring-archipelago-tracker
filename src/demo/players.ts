/**
 * ─ Demo players ─
 *
 * The room's other players, made up, each in another game with a short data
 * package of its own: enough for the slot list, the players' list, and what
 * moves between them and the demo's slot to read as it would in a real room.
 */

import { ELDEN_RING } from "../archipelago/look-up.js";
import { RULES_APWORLD } from "../data/rules/apworld.js";
import { DEMO_PLAYER } from "./room.js";

/** A made-up player in the room: who they are, how far they've got, and their game's names. */
export interface DemoPlayer {
  readonly team: number;
  readonly player: number;
  readonly name: string;
  readonly game: string;
  /** Their game's data package checksum. */
  readonly checksum: string;
  readonly checksDone: number;
  readonly total: number;
  readonly items: readonly string[];
  readonly locations: readonly string[];
}

/** The room's other players, in slot order after the demo's own. */
export const OTHER_PLAYERS: readonly DemoPlayer[] = [
  {
    ...DEMO_PLAYER,
    player: 2,
    name: "Sam",
    game: "A Link to the Past",
    checksum: "demo-a-link-to-the-past",
    checksDone: 88,
    total: 216,
    items: ["Hookshot", "Moon Pearl", "Lamp"],
    locations: ["Link's House", "Sanctuary", "Eastern Palace - Big Chest", "Kakariko Well - Top"],
  },
  {
    ...DEMO_PLAYER,
    player: 3,
    name: "Jo",
    game: "Super Metroid",
    checksum: "demo-super-metroid",
    checksDone: 41,
    total: 100,
    items: ["Varia Suit", "Grapple Beam", "Morph Ball"],
    locations: ["Morphing Ball", "Energy Tank, Brinstar Ceiling", "Missile (blue Brinstar top)"],
  },
];

/** Every game's data package checksum in the room, by game. */
export const DEMO_CHECKSUMS: Readonly<Record<string, string>> = {
  [ELDEN_RING]: RULES_APWORLD.checksum,
  ...Object.fromEntries(OTHER_PLAYERS.map(({ game, checksum }) => [game, checksum])),
};

/** A name's id in one of these short lists: ids start from 1 in each. */
export function idIn(names: readonly string[], name: string): number {
  return names.indexOf(name) + 1;
}
