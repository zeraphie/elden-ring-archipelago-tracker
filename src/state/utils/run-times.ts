/**
 * ─ Run times ─
 *
 * When each of the goal's rows came, by the run's clock, from what the run kept
 * of the checks made and the items that came while the tracker watched. A boss
 * falls with the first of its drops, a count is made up by the item that took
 * it there, and a choice by the first of its parts. What came unseen has no
 * time.
 */

import { ELDEN_RING } from "../../archipelago/look-up.js";
import type { GoalBoss } from "../../data/bosses/goal.js";
import type { Need } from "../../data/rules/rules.js";
import type { EldenRingData } from "../setup.js";
import type { TrackerState } from "../store.js";
import { roomViewOf, type RoomInputs } from "./room.js";

/** What reading a row's time reads, in the store. */
export type RowTimeInputs = RoomInputs & Pick<TrackerState, "run">;

/** When the goal's rows came, by the run's clock, in milliseconds; undefined for one the tracker didn't see come. */
export interface RowTimes {
  need(need: Need): number | undefined;
  boss(boss: GoalBoss): number | undefined;
}

/** When the store's goal rows came. */
export function rowTimesOf(data: EldenRingData, inputs: RowTimeInputs): RowTimes {
  const { run, received, packages } = inputs;
  const names = roomViewOf(inputs)?.names ?? {};
  const itemNames = packages.get(ELDEN_RING)?.itemNames;
  const checkTimes = new Map(Object.entries(run.checkTimes).map(([id, time]) => [names[id], time]));
  const arrivals = received.map(({ value }, place) => ({
    name: itemNames?.get(value.item),
    time: run.itemTimes[place],
  }));
  const fallTime = (drop: string) =>
    earliest(data.dropsBeside(drop).map((each) => checkTimes.get(each)));
  const needTime = (need: Need): number | undefined => {
    switch (need.kind) {
      case "item":
        return arrivals.find(({ name }) => name === need.item)?.time;
      case "count": {
        const counted = arrivals.filter(({ name }) => name && need.items.includes(name));
        // A heavier item makes a count up with fewer items than it needs.
        return counted[Math.min(need.needs, counted.length) - 1]?.time;
      }
      case "location":
        return fallTime(need.location);
      case "area":
        return undefined;
      case "any":
        return earliest(need.needs.map(needTime));
      case "all": {
        const times = need.needs.map(needTime);
        const seen = known(times);
        return seen.length < times.length ? undefined : Math.max(...seen);
      }
    }
  };
  return {
    need: needTime,
    boss: ({ drop }) => (drop === undefined ? undefined : fallTime(drop)),
  };
}

function known(times: readonly (number | undefined)[]): number[] {
  return times.filter((time) => time !== undefined);
}

function earliest(times: readonly (number | undefined)[]): number | undefined {
  const seen = known(times);
  return seen.length === 0 ? undefined : Math.min(...seen);
}
