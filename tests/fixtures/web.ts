// Shared by the tests that ask the web API: the demo room's stand-in for
// archipelago.gg, with what only a test wants of it: a route that answers as
// the test says, and what was asked.
import type { Fetcher } from "../../src/archipelago/web-api.js";
import { demoFetcher, routeOf, type Route } from "../../src/demo/web.js";

/** What a route answers in a test: a body, a body made afresh each time it's asked, or a status with no body. */
export type Answer =
  | { readonly body: unknown }
  | { readonly fresh: () => unknown }
  | { readonly status: number };

/** When the room in a test was last active, as the recorded room was, so a test's clock can put it awake or asleep. */
export const LAST_ACTIVE = Date.parse("Thu, 22 Oct 2026 20:39:03 GMT");

/** The demo room's web API, with these routes answering as the test says, and every URL asked kept in order. */
export function standInWeb(answers: Partial<Record<Route, Answer>> = {}): {
  readonly fetcher: Fetcher;
  readonly asked: string[];
} {
  const asked: string[] = [];
  const room = demoFetcher(() => LAST_ACTIVE);
  const fetcher: Fetcher = (url) => {
    asked.push(url);
    const route = routeOf(url);
    const answer = route === undefined ? undefined : answers[route];
    if (answer === undefined) {
      return room(url);
    }
    if ("status" in answer) {
      return Promise.resolve(new Response("", { status: answer.status }));
    }
    const body = "fresh" in answer ? answer.fresh() : answer.body;
    return Promise.resolve(new Response(JSON.stringify(body)));
  };
  return { fetcher, asked };
}
