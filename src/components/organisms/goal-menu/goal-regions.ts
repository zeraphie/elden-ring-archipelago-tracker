/**
 * ─ Goal regions ─
 *
 * The goal's bosses by region, for a goal of more bosses than the menu's rows
 * read well. A boss is in the region its drop is a check in, as the panel
 * lists that check. A boss with no drop in the room can't be placed, and the
 * apworld's goal leaves it out too, so the regions and their counts do.
 */

import type { GoalBoss } from "../../../data/bosses/goal.js";
import type { PickerGroup } from "../../utils/region-groups.js";

/** Past this many goal bosses the goal menu goes by region: about where its rows stop reading at a glance. */
export const BY_REGION_PAST = 15;

/** Whether a goal of these bosses goes by region. */
export function isByRegion(bosses: readonly GoalBoss[]): boolean {
  return bosses.length > BY_REGION_PAST;
}

/** A region's goal bosses: those still to defeat and those defeated, each in the goal's order. */
export interface RegionBosses {
  readonly toDo: readonly GoalBoss[];
  readonly defeated: readonly GoalBoss[];
}

/**
 * The goal's bosses by the code of the region their drop is a check in. With
 * `isAllDone`, as once the goal's achieved, every boss counts as defeated.
 */
export function bossesByRegion(
  bosses: readonly GoalBoss[],
  regionOf: (drop: string) => string | undefined,
  isAllDone: boolean
): ReadonlyMap<string, RegionBosses> {
  const regions = new Map<string, { toDo: GoalBoss[]; defeated: GoalBoss[] }>();
  for (const boss of bosses) {
    const code = boss.drop === undefined ? undefined : regionOf(boss.drop);
    if (code === undefined) {
      continue;
    }
    const region = regions.get(code) ?? { toDo: [], defeated: [] };
    if (isAllDone || boss.state === "defeated") {
      region.defeated.push(isAllDone ? { ...boss, state: "defeated" } : boss);
    } else {
      region.toDo.push(boss);
    }
    regions.set(code, region);
  }
  return regions;
}

/** How many of the goal's placed bosses are defeated, out of all of them. */
export function bossTally(byRegion: ReadonlyMap<string, RegionBosses>): {
  readonly defeated: number;
  readonly of: number;
} {
  let defeated = 0;
  let of = 0;
  for (const region of byRegion.values()) {
    defeated += region.defeated.length;
    of += region.defeated.length + region.toDo.length;
  }
  return { defeated, of };
}

/** The picker's groups for the goal: the regions holding a goal boss, each counting its bosses defeated out of all. */
export function goalPickerGroups(
  groups: readonly PickerGroup[],
  byRegion: ReadonlyMap<string, RegionBosses>
): PickerGroup[] {
  return groups.map(({ title, regions }) => ({
    title,
    regions: regions.flatMap((region) => {
      const bosses = byRegion.get(region.code);
      return bosses === undefined
        ? []
        : [
            {
              ...region,
              done: bosses.defeated.length,
              of: bosses.defeated.length + bosses.toDo.length,
              what: "bosses defeated",
            },
          ];
    }),
  }));
}
