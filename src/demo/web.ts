/**
 * ─ Demo web API ─
 *
 * archipelago.gg's web API as the demo room answers it, handed in where the
 * browser's fetch would go, so nothing leaves the page. Each route answers in
 * the real one's shape, and the real readers read it. Any other address, or
 * another game's data package, is a 404, as the real site gives.
 */

import { ELDEN_RING } from "../archipelago/look-up.js";
import type { Fetcher } from "../archipelago/web-api.js";
import { RULES_APWORLD } from "../data/rules/apworld.js";
import { SIMULATED_ITEMS } from "../state/utils/simulate.js";
import { demoLocationNames, demoSlotData, DEMO_PLAYER, DEMO_SLOT } from "./room.js";

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
// The apworld numbers its items from here; the demo's own are numbered from it in the same way.
const FIRST_ITEM = 69_000;

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
        players: [[DEMO_SLOT, ELDEN_RING]],
        last_port: PORT,
        last_activity: new Date(now).toUTCString(),
        timeout: TIMEOUT,
      };
    case "static_tracker":
      return {
        datapackage: { [ELDEN_RING]: { checksum: RULES_APWORLD.checksum } },
        groups: [],
        player_game: [{ ...DEMO_PLAYER, game: ELDEN_RING }],
        player_locations_total: [{ ...DEMO_PLAYER, total_locations: demoLocationNames().size }],
      };
    case "datapackage":
      return url.endsWith(`/${RULES_APWORLD.checksum}`) ? dataPackage() : undefined;
    case "slot_data_tracker":
      return [{ player: DEMO_PLAYER.player, slot_data: demoSlotData() }];
    case "tracker":
      return {
        aliases: [],
        player_items_received: [],
        player_checks_done: [],
        total_checks_done: [{ team: DEMO_PLAYER.team, checks_done: 0 }],
        hints: [],
        activity_timers: [],
        connection_timers: [],
        player_status: [{ ...DEMO_PLAYER, status: PLAYING }],
      };
  }
}

// Elden Ring's names: the room's checks, and the items Simulate gives.
function dataPackage(): unknown {
  return {
    checksum: RULES_APWORLD.checksum,
    item_name_to_id: Object.fromEntries(
      SIMULATED_ITEMS.map((name, i) => [name, FIRST_ITEM + i] as const)
    ),
    location_name_to_id: Object.fromEntries(
      [...demoLocationNames()].map(([id, name]) => [name, id] as const)
    ),
  };
}
