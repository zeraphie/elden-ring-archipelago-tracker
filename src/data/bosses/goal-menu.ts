/**
 * ─ Goal menu ─
 *
 * What the goal menu holds for a room: the main path's gates still between
 * the player and the goal's bosses, those the way from the start needed and
 * are now met, and each goal boss with how it stands. The items come from the
 * ported rules, kept where they're the main path's. A main-path boss counts
 * where its arena lies on a goal boss's way, or the rules ask for it, and
 * stands until one of its drops is checked.
 */

import { bossNeeds, regionsOnTheWay, type RoomReach } from "../rules/area-status.js";
import { reachOf, startOf, type Room } from "../rules/room-reach.js";
import { location, type Need } from "../rules/rules.js";
import { BOSSES, type Boss } from "./bosses.js";
import { bossDropping, goalBosses, type GoalBoss } from "./goal.js";
import { isMainPathItemNeed, MAIN_PATH_BOSSES } from "./main-path.js";

/** What the goal menu holds: what's still needed, what's met, and the goal's bosses. */
export interface GoalMenu {
  /** What still stands between the player and a goal boss not yet defeated, each once, nearest first. */
  readonly needed: readonly Need[];
  /** What the way from the start needed and is now met: an item received, a count made up, a region reached. */
  readonly met: readonly Need[];
  readonly bosses: readonly GoalBoss[];
}

/** The goal menu for a room, with these items received and these checks, by name, done. */
export function goalMenu(
  room: Room,
  items: ReadonlyMap<string, number>,
  checked: ReadonlySet<string>
): GoalMenu {
  const start = startOf(room);
  const now = reachOf(room, items);
  const bosses = goalBosses(room.goal, room.locations, checked);
  const open = bosses.filter(({ state }) => state !== "defeated");
  const dropsOf = (boss: Boss | undefined): string[] =>
    (boss?.drops ?? []).filter((drop) => room.locations.has(drop));
  const goalDrops = (flag: number): string[] => dropsOf(BOSSES.get(flag));

  const neededItems = unique(
    open.flatMap(({ flag }) => leaves(bossNeeds(goalDrops(flag), now))).filter(isMainPathItemNeed)
  );
  const stillNeeded = new Set(neededItems.map(needKey));
  const metItems = unique(
    bosses
      .flatMap(({ flag }) => leaves(bossNeeds(goalDrops(flag), start)))
      .filter(isMainPathItemNeed)
  )
    .filter((need) => !stillNeeded.has(needKey(need)) && isMet(need, items))
    .map((need) => (need.kind === "count" ? { ...need, have: need.needs } : need));

  // The main path's bosses on a goal boss's way, as the need to defeat each: by its first drop in the room.
  const isDefeated = (boss: Boss): boolean => dropsOf(boss).some((drop) => checked.has(drop));
  const asNeed = (boss: Boss): Need => location(dropsOf(boss)[0] ?? "");
  const ways = new Map(
    bosses.map(({ flag }) => [flag, mainPathBossesOnTheWay(goalDrops(flag), room, start)])
  );
  const wayOf = (flag: number): Boss[] => ways.get(flag) ?? [];
  const neededBosses = unique(
    open.flatMap(({ flag }) =>
      wayOf(flag)
        .filter((boss) => !isDefeated(boss))
        .map(asNeed)
    )
  );
  const metBosses = unique(
    bosses.flatMap(({ flag }) => wayOf(flag).filter(isDefeated).map(asNeed))
  );
  return {
    needed: [...neededItems, ...neededBosses],
    met: [...metItems, ...metBosses],
    bosses,
  };
}

// The main path's bosses in the room standing in the way of a goal boss's drops, in the order the
// path meets them: those whose arena lies on its way, and those the rules ask to defeat on it. A
// boss the goal names itself is its own row, so it's left out.
function mainPathBossesOnTheWay(drops: readonly string[], room: Room, start: RoomReach): Boss[] {
  const [first] = drops;
  const region = first === undefined ? undefined : start.rules.regionOf(first);
  if (region === undefined) {
    return [];
  }
  const way = new Set(regionsOnTheWay(region, start.graph));
  const asked = new Set(
    leaves(bossNeeds(drops, start)).flatMap((need) =>
      need.kind === "location" ? [bossDropping(need.location, MAIN_PATH_BOSSES)?.flag] : []
    )
  );
  return [...MAIN_PATH_BOSSES].flatMap(([flag, boss]) => {
    const arenaDrop = boss.drops.find((drop) => room.locations.has(drop));
    const arena = arenaDrop === undefined ? undefined : start.rules.regionOf(arenaDrop);
    const isOnTheWay = asked.has(flag) || (arena !== undefined && way.has(arena));
    return isOnTheWay && !room.goal.includes(flag) && arenaDrop !== undefined ? [boss] : [];
  });
}

/** The goal menu's need an item serves: an item need by its name, or a count that counts it; undefined for an item the goal doesn't wait on. */
export function goalNeedOf(menu: GoalMenu, item: string): Need | undefined {
  for (const need of [...menu.needed, ...menu.met]) {
    const served = servedBy(need, item);
    if (served !== undefined) {
      return served;
    }
  }
  return undefined;
}

// The part of a need that `item` is, or counts for, looking into each part of a choice.
function servedBy(need: Need, item: string): Need | undefined {
  switch (need.kind) {
    case "item":
      return need.item === item ? need : undefined;
    case "count":
      return need.items.includes(item) ? need : undefined;
    case "all":
    case "any":
      for (const part of need.needs) {
        const served = servedBy(part, item);
        if (served !== undefined) {
          return served;
        }
      }
      return undefined;
    default:
      return undefined;
  }
}

// A need's parts, with every "all" opened up; an "any" stays whole, as its choices go together.
function leaves(need: Need | undefined): Need[] {
  if (need === undefined) {
    return [];
  }
  return need.kind === "all" ? need.needs.flatMap(leaves) : [need];
}

/** What makes two needs the same one, as a key: a count by its label, as its tally moves. */
export function needKey(need: Need): string {
  switch (need.kind) {
    case "item":
      return `item:${need.item}`;
    case "count":
      return `count:${need.label}`;
    case "area":
      return `area:${need.area}`;
    case "location":
      return `location:${need.location}`;
    case "all":
    case "any":
      return `${need.kind}:(${need.needs.map(needKey).join("|")})`;
  }
}

function unique(needs: readonly Need[]): Need[] {
  const seen = new Set<string>();
  return needs.filter((need) => {
    const key = needKey(need);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// An item no longer in the way counts as met only once it's received; anything else that's left the way is met.
function isMet(need: Need, items: ReadonlyMap<string, number>): boolean {
  return need.kind !== "item" || (items.get(need.item) ?? 0) > 0;
}
