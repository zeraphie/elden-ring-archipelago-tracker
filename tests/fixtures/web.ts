// Shared by the tests that ask the web API: archipelago.gg in its place,
// answering each route with its recorded answer unless a test gives its own,
// and keeping what it was asked.
import type { Fetcher } from "../../src/archipelago/web-api.js";
import webApi from "./web-api.json";

/** The web API's routes, by the part of the path that names each. */
export type Route =
  | "room_status"
  | "static_tracker"
  | "datapackage"
  | "slot_data_tracker"
  | "tracker";

/** What a route answers in a test: a body, a body made afresh each time it's asked, or a status with no body. */
export type Answer =
  | { readonly body: unknown }
  | { readonly fresh: () => unknown }
  | { readonly status: number };

// The longest names first, as "tracker" is in "static_tracker" and "slot_data_tracker".
const ROUTES: readonly Route[] = [
  "slot_data_tracker",
  "static_tracker",
  "room_status",
  "datapackage",
  "tracker",
];

/** The recorded web API, with these routes answering as the test says, and every URL asked kept in order. */
export function recordedWeb(answers: Partial<Record<Route, Answer>> = {}): {
  readonly fetcher: Fetcher;
  readonly asked: string[];
} {
  const asked: string[] = [];
  const fetcher: Fetcher = (url) => {
    asked.push(url);
    const route = ROUTES.find((name) => url.includes(`/api/${name}/`));
    if (route === undefined) {
      return Promise.resolve(new Response("", { status: 404 }));
    }
    const answer = answers[route] ?? { body: webApi[route] };
    if ("status" in answer) {
      return Promise.resolve(new Response("", { status: answer.status }));
    }
    const body = "fresh" in answer ? answer.fresh() : answer.body;
    return Promise.resolve(new Response(JSON.stringify(body)));
  };
  return { fetcher, asked };
}
