/**
 * ─ Demo run ─
 *
 * The run the demo opens on, under way, as if the tracker had watched from the
 * start: each check in the order the snapshot made it, a stretch of play apart,
 * and each item with the check that held it, or the check before it when it
 * came from another player. Two finished runs of its preset lie behind it, so
 * there's something to compare with. The room keeps no times, so these are made
 * up here.
 */

import { ELDEN_RING } from "../archipelago/look-up.js";
import { bossKey } from "../data/bosses/boss-key.js";
import * as data from "../data/elden-ring.js";
import { RULES_APWORLD } from "../data/rules/apworld.js";
import type { FinishedRun } from "../state/run-history.js";
import type { Run } from "../state/slices/run.js";
import { goalMenuOf } from "../state/utils/goal.js";
import { demoItemNames, demoLocationNames, demoSlotData, DEMO_PLAYER } from "./room.js";
import { demoSnapshot } from "./snapshot.js";

// About a player's pace, which puts the run a little over three hours in.
const CHECK_MS = 27_000;
// How far a check strays from that pace, so the times don't read as a sequence. It's under
// `CHECK_MS`, so they still rise.
const STRAY_SECONDS = 13;
const STRIDE = 7;
// How long the clock has gone on past the latest check.
const SINCE_LATEST_MS = 240_000;

const MINUTE_MS = 60_000;
// The two earlier runs, each row's time in minutes in the goal's order: what's been met, what's still
// needed, then the bosses. The first is the faster, and the second is sooner on one row, so a row
// can read as ahead of the fastest without being the soonest it has come.
const EARLIER_MINUTES = [
  { total: 270, rows: [1, 5, 220, 232, 245, 260] },
  { total: 295, rows: [2, 7, 235, 250, 190, 280] },
];

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

/** The finished runs behind the demo's, by its goal's rows as the room opens. */
export function demoEarlierRuns(): readonly FinishedRun[] {
  const { checked, received } = demoSnapshot();
  const menu = goalMenuOf(data, {
    slotData: demoSlotData(),
    packages: new Map([
      [
        ELDEN_RING,
        {
          checksum: RULES_APWORLD.checksum,
          itemNames: demoItemNames(),
          locationNames: demoLocationNames(),
        },
      ],
    ]),
    received: received.map((value) => ({ value })),
    checked,
  });
  const keys = [
    ...[...(menu?.met ?? []), ...(menu?.needed ?? [])].map(data.needKey),
    ...(menu?.bosses ?? []).map(({ flag }) => bossKey(flag)),
  ];
  return EARLIER_MINUTES.map(({ total, rows }) => ({
    timeMs: total * MINUTE_MS,
    rows: Object.fromEntries(keys.map((key, i) => [key, (rows[i] ?? total) * MINUTE_MS])),
  }));
}
