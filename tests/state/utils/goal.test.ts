import { describe, expect, test } from "bun:test";
import * as data from "../../../src/data/elden-ring.js";
import type { RosterEntry } from "../../../src/state/slices/roster.js";
import { goalMenuOf, isGoalDone, isGoalReached, releaseOf } from "../../../src/state/utils/goal.js";
import { item } from "../../fixtures/rooms.js";
import { GODFREY, idOf, inputs, MORGOTT, received } from "../../fixtures/slots.js";

describe("goalMenuOf", () => {
  test("names the items received by the data package, and what they meet", () => {
    const menu = goalMenuOf(data, inputs({ received: received(3) }));
    expect(menu?.met).toEqual([item("Dectus Medallion (Left)")]);
    expect(menu?.needed).not.toContainEqual(item("Dectus Medallion (Left)"));
  });

  test("a key the main path doesn't wait on meets nothing in the menu", () => {
    const menu = goalMenuOf(data, inputs({ received: received(1) }));
    expect(menu?.met).toEqual([]);
    expect(menu?.needed).not.toContainEqual(item("Rusty Key"));
  });

  test("names the checks done by slot_data, so a boss's drop checked defeats it", () => {
    const menu = goalMenuOf(
      data,
      inputs({ checked: [idOf("LRC/QB: Morgott's Great Rune - mainboss drop")] })
    );
    expect(menu?.bosses.find(({ flag }) => flag === MORGOTT)?.state).toBe("defeated");
  });

  test("the same inputs give the same menu back, without working it out again", () => {
    const same = inputs({ received: received(2) });
    expect(goalMenuOf(data, same)).toBe(goalMenuOf(data, same));
  });

  test("no menu until slot_data is in, or with no Elden Ring data package", () => {
    expect(goalMenuOf(data, inputs({ slotData: undefined }))).toBeUndefined();
    expect(goalMenuOf(data, inputs({ packages: new Map() }))).toBeUndefined();
  });
});

const entry = (slot: number, status: number): RosterEntry => ({
  team: 0,
  slot,
  name: undefined,
  game: undefined,
  checksDone: 0,
  total: undefined,
  status,
  lastActive: undefined,
});
const releaseOfSlot = (slot: number) => ({
  value: { kind: "release" as const, team: 0, slot, parts: [] },
  at: 1,
});

describe("isGoalReached", () => {
  test("holds once the room says so, or once every goal boss's drop is checked", () => {
    const room = inputs();
    expect(isGoalReached(data, room)).toBe(false);
    expect(isGoalReached(data, { ...room, roster: [entry(1, 30)] })).toBe(true);
    const drops = [GODFREY, MORGOTT].flatMap((flag) => data.BOSSES.get(flag)?.drops ?? []);
    const checked = drops.map(idOf).filter((id) => !Number.isNaN(id));
    expect(isGoalReached(data, inputs({ checked }))).toBe(true);
  });
});

describe("isGoalDone", () => {
  test("is the slot's own goal status, not another slot's", () => {
    expect(isGoalDone({ roster: [entry(1, 30)], team: 0, slot: 1 })).toBe(true);
    expect(isGoalDone({ roster: [entry(2, 30), entry(1, 20)], team: 0, slot: 1 })).toBe(false);
    expect(isGoalDone({ roster: [], team: 0, slot: 1 })).toBe(false);
  });
});

describe("releaseOf", () => {
  test("follows the room's permission until it announces a release of the slot's items", () => {
    const base = { team: 0, slot: 1, releasePermission: 2 };
    expect(releaseOf({ ...base, log: [] })).toBe("can release");
    expect(releaseOf({ ...base, log: [releaseOfSlot(2)] })).toBe("can release");
    expect(releaseOf({ ...base, log: [releaseOfSlot(1)] })).toBe("released");
  });

  test("isn't known without a login to say the permission", () => {
    expect(releaseOf({ team: 0, slot: 1, releasePermission: undefined, log: [] })).toBe("unknown");
  });
});
