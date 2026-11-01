/**
 * ─ Goal rows ─
 *
 * Where each goal row stands, by its key: still to do, leaving, or obtained.
 * A row achieved while the menu watches doesn't go at once. Its frame glows
 * and holds, then the row slides off the menu's left edge, still lit, as a
 * toast leaves, and only then does it join the end of Done. So the rows
 * around it close up at once rather than slide, and nothing already obtained
 * moves. The rows the menu opens on take their places straight away. Where
 * nothing plays its way out, as in the run's splits, a row done goes straight to
 * the end of what's obtained.
 */

import type { GoalBoss } from "../../data/bosses/goal.js";
import type { GoalMenu } from "../../data/bosses/goal-menu.js";
import type { Need } from "../../data/rules/rules.js";
import type { EldenRingData } from "../../state/setup.js";
import type { TrackerState } from "../../state/store.js";
import { ownFindsOf } from "../../state/utils/feed.js";
import { checkNamed, checkOf } from "../../state/utils/goal.js";
import type { CheckPick } from "./check-pick.js";
import { emit } from "./emit.js";

/** How long a leaving row's frame takes to light up. */
export const GLOW_IN_MS = 500;
/** How long it holds the glow, long enough to be seen in passing. */
export const HOLD_MS = 2500;
/** How long the row takes to slide off the menu's edge, as long as a toast takes to leave. */
export const SLIDE_MS = 220;
/** How long a row takes to leave, all told. */
export const LEAVE_MS = GLOW_IN_MS + HOLD_MS + SLIDE_MS;
/** How far apart rows achieved together start leaving, so each is seen. */
export const STAGGER_MS = 900;

/** Where the goal rows stand, by key, each list in the order shown. */
export interface GoalRows {
  /** The rows in the list, those leaving included, in their places. */
  readonly toDo: readonly string[];
  readonly leaving: readonly string[];
  /** The rows obtained, the latest last. */
  readonly obtained: readonly string[];
}

/**
 * Where the rows stand once the menu has the rows to do and done: a row done
 * that was to do starts leaving, and stays in its place until it's left.
 * `started` is the rows that have just started leaving, in the order shown.
 */
export function placeRows(
  before: GoalRows | undefined,
  toDo: readonly string[],
  done: readonly string[]
): { readonly rows: GoalRows; readonly started: readonly string[] } {
  if (before === undefined) {
    return { rows: { toDo: [...toDo], leaving: [], obtained: [...done] }, started: [] };
  }
  const isDone = new Set(done);
  const isToDo = new Set(toDo);
  const started = before.toDo.filter((key) => isDone.has(key) && !before.leaving.includes(key));
  // A row undone while leaving goes back to being to do.
  const leaving = [...before.leaving.filter((key) => isDone.has(key)), ...started];
  const shown = [
    ...before.toDo.filter((key) => isToDo.has(key) || leaving.includes(key)),
    ...toDo.filter((key) => !before.toDo.includes(key)),
  ];
  const obtained = [
    ...before.obtained.filter((key) => isDone.has(key)),
    ...done.filter((key) => !before.obtained.includes(key) && !before.toDo.includes(key)),
  ];
  return { rows: { toDo: shown, leaving, obtained }, started };
}

/** The rows once `key` has left: gone from the list, and last in Done; as they were when it isn't leaving. */
export function rowLeft(rows: GoalRows, key: string): GoalRows {
  if (!rows.leaving.includes(key)) {
    return rows;
  }
  return {
    toDo: rows.toDo.filter((each) => each !== key),
    leaving: rows.leaving.filter((each) => each !== key),
    obtained: [...rows.obtained.filter((each) => each !== key), key],
  };
}

/** Where the rows stand with none leaving: a row done goes straight to the end of what's obtained. */
export function settleRows(
  before: GoalRows | undefined,
  toDo: readonly string[],
  done: readonly string[]
): GoalRows {
  const { rows, started } = placeRows(before, toDo, done);
  return started.reduce(rowLeft, rows);
}

/** Rows gotten in the order they came: those with no time first, the rest by their times. */
export function byTimeCame(
  keys: readonly string[],
  timeOf: (key: string) => number | undefined
): readonly string[] {
  return [...keys].sort((a, b) => (timeOf(a) ?? -1) - (timeOf(b) ?? -1));
}

/** A goal row as the menu shows it: a need or a boss, by its key, and whether it's gotten. */
export type RowView = { readonly key: string; readonly isGotten: boolean } & (
  | { readonly kind: "need"; readonly need: Need }
  | { readonly kind: "boss"; readonly boss: GoalBoss }
);

/** Where a finished row leads: a check, by its name or its id, or the items, for what came from elsewhere. */
export type RowTarget =
  | { readonly kind: "named"; readonly name: string }
  | { readonly kind: "check"; readonly id: number }
  | { readonly kind: "items" };

/**
 * Where a finished row leads, given the check each of the slot's own finds was
 * in, by the item's name; undefined for a boss with no drop in the room.
 */
export function rowTarget(
  view: RowView,
  ownFinds: ReadonlyMap<string | undefined, number>
): RowTarget | undefined {
  if (view.kind === "boss") {
    const { drop } = view.boss;
    return drop === undefined ? undefined : { kind: "named", name: drop };
  }
  const { need } = view;
  if (need.kind === "location") {
    return { kind: "named", name: need.location };
  }
  const id = need.kind === "item" ? ownFinds.get(need.item) : undefined;
  return id === undefined ? { kind: "items" } : { kind: "check", id };
}

/** A goal row's icon, by name. */
export function rowIcon(view: RowView, data: EldenRingData) {
  return view.kind === "need" ? data.needIcon(view.need) : data.bossIcon(view.boss.flag);
}

/** The check each item the slot found in its own world was in, by the item's name. */
export function ownFindChecks(
  data: EldenRingData,
  state: TrackerState
): ReadonlyMap<string | undefined, number> {
  return new Map(ownFindsOf(data, state).map(({ item, location }) => [item, location]));
}

/**
 * Sends where a finished row leads from `host`: `er-check` with its check, or
 * `er-items` for what came from elsewhere, which has no check here.
 */
export function openRow(
  host: HTMLElement,
  target: RowTarget,
  data: EldenRingData,
  state: TrackerState
): void {
  if (target.kind === "items") {
    emit<undefined>(host, "er-items", undefined);
    return;
  }
  const check =
    target.kind === "check"
      ? checkOf(data, state, target.id)
      : checkNamed(data, state, target.name);
  if (check !== undefined) {
    emit<CheckPick>(host, "er-check", check);
  }
}

/**
 * The menu's rows to do and done, needs before bosses. With `isAllDone`, as
 * once the goal's achieved, every need counts as met, a count made up in
 * full, and every boss as defeated.
 */
export function rowViewsOf(
  menu: GoalMenu,
  needKey: (need: Need) => string,
  isAllDone: boolean
): { readonly toDo: readonly RowView[]; readonly done: readonly RowView[] } {
  const need = (each: Need, isGotten: boolean): RowView => ({
    key: needKey(each),
    isGotten,
    kind: "need",
    need: isGotten && each.kind === "count" ? { ...each, have: each.needs } : each,
  });
  const boss = (each: GoalBoss, isGotten: boolean): RowView => ({
    key: `boss:${each.flag}`,
    isGotten,
    kind: "boss",
    boss: isGotten ? { ...each, state: "defeated" } : each,
  });
  const isDefeated = (each: GoalBoss) => isAllDone || each.state === "defeated";
  return {
    toDo: isAllDone
      ? []
      : [
          ...menu.needed.map((each) => need(each, false)),
          ...menu.bosses.filter((each) => !isDefeated(each)).map((each) => boss(each, false)),
        ],
    done: [
      ...menu.met.map((each) => need(each, true)),
      ...(isAllDone ? menu.needed.map((each) => need(each, true)) : []),
      ...menu.bosses.filter(isDefeated).map((each) => boss(each, true)),
    ],
  };
}
