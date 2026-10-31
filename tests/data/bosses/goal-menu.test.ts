import { describe, expect, test } from "bun:test";
import { bossDropping } from "../../../src/data/bosses/goal.js";
import { goalMenu, goalNeedOf, type GoalMenu } from "../../../src/data/bosses/goal-menu.js";
import { isMainPathItemNeed } from "../../../src/data/bosses/main-path.js";
import type { Room } from "../../../src/data/rules/room-reach.js";
import type { Need } from "../../../src/data/rules/rules.js";
import { LOCATION_GROUPS } from "../../../src/data/checks/location-groups.js";
import { PRESETS } from "../../fixtures/presets.js";
import { count, everyItem, item, location, type Options } from "../../fixtures/rooms.js";

const GODFREY = 11000850;
const MORGOTT = 11000800;
const ELDEN_BEAST = 19000800;
const PROMISED_CONSORT = 20010800;
const DRACONIC_TREE_SENTINEL = 1045520800;
const FIRE_GIANT = 1252520800;
const GODSKIN_DUO = 13000850;
const MALIKETH = 13000800;
const GIDEON = 11050850;
const HOARAH_LOUX = 11050800;
const STARSCOURGE_RADAHN = 1252380800;
const MOHG = 12050800;
const ROMINA = 2044450800;
const MORGOTTS_DROP = "LRC/QB: Morgott's Great Rune - mainboss drop";
const SENTINELS_DROP = "CO: Dragon Greatclaw - capital great rune gate boss drop";

// A room with these options and goal, every location in it.
const roomOf = (options: string, ...goal: number[]): Room => ({
  options: PRESETS[options as keyof typeof PRESETS] as unknown as Options,
  forced: {},
  goal,
  locations: new Set(LOCATION_GROUPS.keys()),
});
// Izzy's preset with Godfrey and Morgott as its goal.
const ROOM = roomOf("Early legacy dungeons", GODFREY, MORGOTT);
const items = (...names: string[]) => new Map(names.map((name) => [name, 1]));
// The main-path bosses among some needs, by flag, in their order.
const bossesIn = (needs: readonly Need[]): (number | undefined)[] =>
  needs.flatMap((need) => (need.kind === "location" ? [bossDropping(need.location)?.flag] : []));

describe("goalMenu", () => {
  test("from the start, the main path's gates on the way to Leyndell are needed, and nothing's met", () => {
    const menu = goalMenu(ROOM, new Map(), new Set());
    expect(menu.needed).toEqual([
      item("Dectus Medallion (Left)"),
      item("Dectus Medallion (Right)"),
      count("Great Runes", 0, 2),
      location(SENTINELS_DROP),
    ]);
    expect(menu.met).toEqual([]);
    expect(menu.bosses.map(({ flag, state }) => [flag, state])).toEqual([
      [GODFREY, "to do"],
      [MORGOTT, "to do"],
    ]);
  });

  test("region locks, keys and bell bearings never show, on any preset's way", () => {
    const rooms = [
      ROOM,
      roomOf("[Long]", ELDEN_BEAST, PROMISED_CONSORT),
      roomOf("Every priority group", ELDEN_BEAST, PROMISED_CONSORT),
    ];
    for (const room of rooms) {
      const menu = goalMenu(room, new Map(), new Set());
      const others = menu.needed.filter(
        (need) => need.kind !== "location" && !isMainPathItemNeed(need)
      );
      expect(others).toEqual([]);
    }
  });

  test("what's received leaves the needed list for the met one, and a count moves on its own", () => {
    const menu = goalMenu(
      ROOM,
      items("Dectus Medallion (Left)", "Godrick's Great Rune"),
      new Set()
    );
    expect(menu.needed).toEqual([
      item("Dectus Medallion (Right)"),
      count("Great Runes", 1, 2),
      location(SENTINELS_DROP),
    ]);
    expect(menu.met).toEqual([item("Dectus Medallion (Left)")]);
  });

  test("with everything received, only the bosses on the way are left, and every count is met in full", () => {
    const menu = goalMenu(ROOM, new Map(everyItem(ROOM.options)), new Set());
    expect(menu.needed).toEqual([location(SENTINELS_DROP)]);
    expect(menu.met).toContainEqual(count("Great Runes", 2, 2));
    expect(menu.met).toHaveLength(3);
  });

  test("a main-path boss stands until one of its drops is checked, then it's met", () => {
    const menu = goalMenu(ROOM, new Map(), new Set([SENTINELS_DROP]));
    expect(bossesIn(menu.needed)).toEqual([]);
    expect(bossesIn(menu.met)).toEqual([DRACONIC_TREE_SENTINEL]);
  });

  test("a goal boss with a drop checked is defeated, and only the bosses left keep needing", () => {
    const menu = goalMenu(ROOM, new Map(), new Set([MORGOTTS_DROP]));
    expect(menu.bosses.map(({ flag, state }) => [flag, state])).toEqual([
      [GODFREY, "to do"],
      [MORGOTT, "defeated"],
    ]);
    expect(menu.needed).toHaveLength(4);
  });

  test("once every goal boss is defeated, nothing stands in the way", () => {
    const godfreysDrop = "LRC/WCR: Talisman Pouch - mainboss drop";
    const menu = goalMenu(ROOM, new Map(), new Set([MORGOTTS_DROP, godfreysDrop]));
    expect(menu.needed).toEqual([]);
  });

  test("the Elden Beast's way passes the bosses whose arenas lie on it, not Godfrey's or Morgott's", () => {
    const menu = goalMenu(roomOf("Early legacy dungeons", ELDEN_BEAST), new Map(), new Set());
    expect(bossesIn(menu.needed)).toEqual([
      DRACONIC_TREE_SENTINEL,
      FIRE_GIANT,
      GODSKIN_DUO,
      MALIKETH,
      GIDEON,
      HOARAH_LOUX,
    ]);
  });

  test("the DLC's way in asks for Starscourge Radahn and Mohg, unless the run starts in the DLC", () => {
    const fromTheBase = goalMenu(roomOf("[Long]", PROMISED_CONSORT), new Map(), new Set());
    expect(bossesIn(fromTheBase.needed)).toEqual(
      expect.arrayContaining([STARSCOURGE_RADAHN, MOHG, ROMINA])
    );
    const fromTheDlc = goalMenu(roomOf("[Short] DLC Only", PROMISED_CONSORT), new Map(), new Set());
    expect(bossesIn(fromTheDlc.needed)).toEqual([ROMINA]);
  });

  test("a main-path boss the goal names is its own row, not a need too", () => {
    const menu = goalMenu(
      roomOf("Early legacy dungeons", MALIKETH, ELDEN_BEAST),
      new Map(),
      new Set()
    );
    expect(bossesIn(menu.needed)).not.toContain(MALIKETH);
    expect(menu.bosses.map(({ flag }) => flag)).toEqual([MALIKETH, ELDEN_BEAST]);
  });
});

describe("bossDropping", () => {
  test("names the boss whose defeat drops a location, and none for any other", () => {
    expect(bossDropping(MORGOTTS_DROP)).toEqual({ flag: MORGOTT, name: "Morgott, the Omen King" });
    expect(bossDropping("LG/(SGr): Finger Severer - beside grace")).toBeUndefined();
  });

  test("names the Draconic Tree Sentinel, which no goal can name, by its drops", () => {
    expect(bossDropping(SENTINELS_DROP)).toEqual({
      flag: DRACONIC_TREE_SENTINEL,
      name: "Draconic Tree Sentinel",
    });
  });
});

describe("goalNeedOf", () => {
  test("is the need an item is, or the count it counts for", () => {
    const menu = goalMenu(ROOM, new Map(), new Set());
    expect(goalNeedOf(menu, "Dectus Medallion (Left)")).toEqual(item("Dectus Medallion (Left)"));
    expect(goalNeedOf(menu, "Rykard's Great Rune")).toEqual(count("Great Runes", 0, 2));
  });

  test("finds an item the goal no longer waits on among what's met", () => {
    const menu = goalMenu(ROOM, items("Dectus Medallion (Left)"), new Set());
    expect(goalNeedOf(menu, "Dectus Medallion (Left)")).toEqual(item("Dectus Medallion (Left)"));
  });

  test("is undefined for an item the goal doesn't wait on, a key or a lock among them", () => {
    const menu = goalMenu(ROOM, new Map(), new Set());
    expect(goalNeedOf(menu, "Larval Tear")).toBeUndefined();
    expect(goalNeedOf(menu, "Rusty Key")).toBeUndefined();
    expect(goalNeedOf(menu, "Liurnia Lock")).toBeUndefined();
  });

  test("looks into each part of a choice", () => {
    const menu: GoalMenu = {
      needed: [
        {
          kind: "any",
          needs: [item("Rold Medallion"), item("Haligtree Secret Medallion (Left)")],
        },
      ],
      met: [],
      bosses: [],
    };
    expect(goalNeedOf(menu, "Haligtree Secret Medallion (Left)")).toEqual(
      item("Haligtree Secret Medallion (Left)")
    );
  });
});
