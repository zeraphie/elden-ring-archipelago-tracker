/**
 * ─ Demo web API ─
 *
 * archipelago.gg's web API as the demo room answers it, handed in where the
 * browser's fetch would go, so nothing leaves the page. Each route answers in
 * the real one's shape, and the real readers read it, with the run as the
 * snapshot has it. Any other address, or a game's data package no player here
 * has, is a 404, as the real site gives.
 */

import { ELDEN_RING } from "../archipelago/look-up.js";
import type { Fetcher } from "../archipelago/web-api.js";
import type { NetworkItem } from "../archipelago/web-responses.js";
import { RULES_APWORLD } from "../data/rules/apworld.js";
import { DEMO_CHECKSUMS, OTHER_PLAYERS } from "./players.js";
import { demoItemNames, demoLocationNames, demoSlotData, DEMO_PLAYER, DEMO_SLOT } from "./room.js";
import { demoSnapshot } from "./snapshot.js";

/** The web API's routes, by the part of the path that names each. */
export type Route =
  | "room_status"
  | "static_tracker"
  | "datapackage"
  | "slot_data_tracker"
  | "tracker";

// The longest names first, as "tracker" is in "static_tracker" and "slot_data_tracker".
const ROUTES: readonly Route[] = [
  "slot_data_tracker",
  "static_tracker",
  "room_status",
  "datapackage",
  "tracker",
];

// The room's tracker and port. Nothing is listening on either: they only have to read as real.
const TRACKER = "demo";
const PORT = 38281;
// How long archipelago.gg keeps a room awake, in seconds, as it told the recorded room.
const TIMEOUT = 7200;
// A slot's client status once it's playing.
const PLAYING = 20;
// How long ago each player after the first was last active, a few minutes further back each.
const IDLE_MS = 7 * 60_000;

/** The route a web API address asks for; undefined for any other address. */
export function routeOf(url: string): Route | undefined {
  return ROUTES.find((name) => url.includes(`/api/${name}/`));
}

/** archipelago.gg's web API as the demo room answers it, telling the time by the clock given. */
export function demoFetcher(now: () => number = Date.now): Fetcher {
  return (url) => {
    const route = routeOf(url);
    const body = route === undefined ? undefined : answer(route, url, now());
    return Promise.resolve(
      body === undefined ? new Response("", { status: 404 }) : new Response(JSON.stringify(body))
    );
  };
}

function answer(route: Route, url: string, now: number): unknown {
  switch (route) {
    case "room_status":
      return {
        tracker: TRACKER,
        players: [[DEMO_SLOT, ELDEN_RING], ...OTHER_PLAYERS.map(({ name, game }) => [name, game])],
        last_port: PORT,
        last_activity: new Date(now).toUTCString(),
        timeout: TIMEOUT,
      };
    case "static_tracker":
      return staticTracker();
    case "datapackage":
      return dataPackage(url);
    case "slot_data_tracker":
      return [
        { player: DEMO_PLAYER.player, slot_data: demoSlotData() },
        ...OTHER_PLAYERS.map(({ player }) => ({ player, slot_data: {} })),
      ];
    case "tracker":
      return tracker(now);
  }
}

function staticTracker(): unknown {
  return {
    datapackage: Object.fromEntries(
      Object.entries(DEMO_CHECKSUMS).map(([game, checksum]) => [game, { checksum }])
    ),
    groups: [],
    player_game: [
      { ...DEMO_PLAYER, game: ELDEN_RING },
      ...OTHER_PLAYERS.map(({ team, player, game }) => ({ team, player, game })),
    ],
    player_locations_total: [
      { ...DEMO_PLAYER, total_locations: demoLocationNames().size },
      ...OTHER_PLAYERS.map(({ team, player, total }) => ({
        team,
        player,
        total_locations: total,
      })),
    ],
  };
}

// A game's names, by the checksum the address ends on.
function dataPackage(url: string): unknown {
  const checksum = url.slice(url.lastIndexOf("/") + 1);
  if (checksum === RULES_APWORLD.checksum) {
    return {
      checksum,
      item_name_to_id: idsByName(demoItemNames()),
      location_name_to_id: idsByName(demoLocationNames()),
    };
  }
  const other = OTHER_PLAYERS.find((each) => each.checksum === checksum);
  return (
    other && {
      checksum,
      item_name_to_id: Object.fromEntries(other.items.map((name, i) => [name, i + 1])),
      location_name_to_id: Object.fromEntries(other.locations.map((name, i) => [name, i + 1])),
    }
  );
}

// How the run stands: the demo's slot as the snapshot has it, and the others by their counts.
function tracker(now: number): unknown {
  const { checked, received, sent } = demoSnapshot();
  const others = OTHER_PLAYERS.map(({ team, player }) => ({ team, player }));
  const everyone = [DEMO_PLAYER, ...others];
  const times = everyone.map((slot, i) => ({
    ...slot,
    time: new Date(now - i * IDLE_MS).toUTCString(),
  }));
  return {
    aliases: [],
    player_items_received: [
      { ...DEMO_PLAYER, items: received.map(itemRow) },
      ...others.map((slot) => ({
        ...slot,
        items: sent
          .filter(({ receiving }) => receiving === slot.player)
          .map(({ item }) => itemRow(item)),
      })),
    ],
    player_checks_done: [
      { ...DEMO_PLAYER, locations: checked },
      ...OTHER_PLAYERS.map(({ team, player, checksDone }) => ({
        team,
        player,
        locations: Array.from({ length: checksDone }, (_, i) => i + 1),
      })),
    ],
    total_checks_done: [
      {
        team: DEMO_PLAYER.team,
        checks_done: OTHER_PLAYERS.reduce((all, each) => all + each.checksDone, checked.length),
      },
    ],
    hints: [],
    activity_timers: times,
    connection_timers: times,
    player_status: everyone.map((slot) => ({ ...slot, status: PLAYING })),
  };
}

function idsByName(names: ReadonlyMap<number, string>): Readonly<Record<string, number>> {
  return Object.fromEntries([...names].map(([id, name]) => [name, id]));
}

// An item as the web API lists one.
function itemRow({ item, location, player, flags }: NetworkItem): readonly number[] {
  return [item, location, player, flags];
}
