import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import {
  BOSS_ICONS,
  bossIcon,
  isOwnIconMeant,
  NEED_ICONS,
  needIcon,
  SHARED_BOSS_ICON,
} from "../../../src/data/bosses/boss-icons.js";
import { BOSSES } from "../../../src/data/bosses/bosses.js";
import { MAIN_PATH_BOSSES } from "../../../src/data/bosses/main-path.js";
import { greatRunes, keyOrShards } from "../../../src/data/rules/gates/key-rules.js";

const ICONS = join(import.meta.dir, "../../../src/icons");
const FILES = readdirSync(ICONS, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".png"))
  .map((file) => basename(file, ".png"));

const MARGIT = 10000850;
const DRACONIC_TREE_SENTINEL = 1045520800;
const MOHG = 12050800;
const GODRICK = 10000800;
const BAYLE = 2054390800;

describe("the goal menu's icons", () => {
  test("every icon named is a file in src/icons", () => {
    const named = [...BOSS_ICONS.values(), ...NEED_ICONS.values(), SHARED_BOSS_ICON];
    expect(named.filter((name) => !FILES.includes(name))).toEqual([]);
  });

  test("every boss with an icon is one a goal can name, or one on the main path", () => {
    const known = (flag: number) => BOSSES.has(flag) || MAIN_PATH_BOSSES.has(flag);
    expect([...BOSS_ICONS.keys()].filter((flag) => !known(flag))).toEqual([]);
  });

  test("no two icons share a name, as the page finds each by its name alone", () => {
    expect(new Set(FILES).size).toBe(FILES.length);
  });

  test("every goal boss meant to have an icon of its own has one", () => {
    const lacking = [...BOSSES].filter(
      ([flag, boss]) => isOwnIconMeant(flag, boss.drops) && !BOSS_ICONS.has(flag)
    );
    expect(lacking.map(([, boss]) => boss.name)).toEqual([]);
  });

  test("every boss on the main path has an icon of its own", () => {
    expect([...MAIN_PATH_BOSSES.keys()].filter((flag) => !BOSS_ICONS.has(flag))).toEqual([]);
  });

  test("the great runes' icon is named by the count the rules give", () => {
    const rule = greatRunes(2);
    expect(rule.kind === "count" && NEED_ICONS.has(rule.label)).toBe(true);
  });

  test("the main path's keys have icons, whole and as the shards the rules count", () => {
    const shards = { Req: 2, Max: 3 };
    for (const key of ["Rold Medallion", "Messmer's Kindling"]) {
      const whole = keyOrShards(key, { key_item_shards: {}, great_runes_required_mountain: -1 });
      const split = keyOrShards(key, {
        key_item_shards: { RoldMedallionShards: shards, MessmerKindlingShards: shards },
        great_runes_required_mountain: -1,
      });
      expect(whole.kind === "item" && NEED_ICONS.has(whole.item)).toBe(true);
      expect(split.kind === "count" && NEED_ICONS.has(split.label)).toBe(true);
    }
  });

  test("every icon file has its credit beside it", () => {
    const credits = readFileSync(join(ICONS, "credits.txt"), "utf8");
    expect(FILES.filter((file) => !credits.includes(`${file}.png`))).toEqual([]);
  });
});

describe("bossIcon", () => {
  test("is a boss's own icon, or the shared one for a boss without its own", () => {
    expect(bossIcon(MOHG)).toBe("remembrance-of-the-blood-lord");
    expect(bossIcon(MARGIT)).toBe(SHARED_BOSS_ICON);
  });
});

describe("isOwnIconMeant", () => {
  const dropsOf = (flag: number) =>
    BOSSES.get(flag)?.drops ?? MAIN_PATH_BOSSES.get(flag)?.drops ?? [];

  test("holds for a boss with a remembrance, Bayle by his heart, and the main path's", () => {
    expect(isOwnIconMeant(GODRICK, dropsOf(GODRICK))).toBe(true);
    expect(isOwnIconMeant(BAYLE, dropsOf(BAYLE))).toBe(true);
    expect(isOwnIconMeant(DRACONIC_TREE_SENTINEL, dropsOf(DRACONIC_TREE_SENTINEL))).toBe(true);
  });

  test("doesn't hold for a boss with neither, who takes the shared icon", () => {
    expect(isOwnIconMeant(MARGIT, dropsOf(MARGIT))).toBe(false);
  });
});

describe("needIcon", () => {
  test("is an item's or a count's own icon, or the icon of the boss a drop asks to defeat", () => {
    expect(needIcon({ kind: "item", item: "Dectus Medallion (Left)" })).toBe(
      "dectus-medallion-left"
    );
    expect(needIcon({ kind: "count", label: "Great Runes", have: 0, needs: 2, items: [] })).toBe(
      "godricks-great-rune"
    );
    expect(
      needIcon({ kind: "location", location: "LRC/QB: Morgott's Great Rune - mainboss drop" })
    ).toBe("remembrance-of-the-omen-king");
  });

  test("names a boss by any of its drops, the Draconic Tree Sentinel's too", () => {
    const sentinel = MAIN_PATH_BOSSES.get(DRACONIC_TREE_SENTINEL)?.drops[0] ?? "";
    expect(needIcon({ kind: "location", location: sentinel })).toBe(
      BOSS_ICONS.get(DRACONIC_TREE_SENTINEL)
    );
    expect(
      needIcon({
        kind: "location",
        location: "MP/(MDM): Remembrance of the Blood Lord - mainboss drop",
      })
    ).toBe(bossIcon(MOHG));
  });

  test("is undefined for a need with no icon, as an item off the main path or a region", () => {
    expect(needIcon({ kind: "item", item: "Rusty Key" })).toBeUndefined();
    expect(needIcon({ kind: "area", area: "Altus Plateau" })).toBeUndefined();
  });
});
