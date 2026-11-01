/**
 * ─ Demo run ─
 *
 * The run the demo opens on, under way, as if the tracker had watched from the
 * start: each check in the order the snapshot made it, a stretch of play apart,
 * and each item with the check that held it, or the check before it when it
 * came from another player. The room keeps no times, so these are made up here.
 */

import type { Run } from "../state/slices/run.js";
import { DEMO_PLAYER } from "./room.js";
import { demoSnapshot } from "./snapshot.js";

// About a player's pace, which puts the run a little over three hours in.
const CHECK_MS = 27_000;
// How far a check strays from that pace, so the times don't read as a sequence. It's under
// `CHECK_MS`, so they still rise.
const STRAY_SECONDS = 13;
const STRIDE = 7;
// How long the clock has gone on past the latest check.
const SINCE_LATEST_MS = 240_000;

/** The run's clock as the demo opens on it. */
export function demoRun(): Run {
  const { checked, received } = demoSnapshot();
  const checkTimes = new Map(
    checked.map((id, i) => [id, (i + 1) * CHECK_MS + ((i * STRIDE) % STRAY_SECONDS) * 1000])
  );
  let latest = 0;
  const itemTimes = received.map(({ location, player }) => {
    latest = (player === DEMO_PLAYER.player ? checkTimes.get(location) : undefined) ?? latest;
    return latest;
  });
  return {
    phase: "running",
    bankedMs: Math.max(0, ...checkTimes.values()) + SINCE_LATEST_MS,
    since: undefined,
    checkTimes: Object.fromEntries(checkTimes),
    itemTimes: { ...itemTimes },
  };
}
