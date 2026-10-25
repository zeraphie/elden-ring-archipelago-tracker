/**
 * ─ Boss icons ─
 *
 * The goal menu's icons, which its item toasts take too: each boss's own, by
 * defeat flag, the one every boss without its own shares, and those of what
 * stands between the player and a boss, by the item or count the rules name.
 * An icon is named by its file in src/icons, without ".png", so the data says
 * which picture and the page finds it, whichever folder it's sorted into.
 * `bun run bosses` lists the goal bosses meant to have an icon of their own
 * that still lack one.
 */

import type { Need } from "../rules/rules.js";
import { bossDropping } from "./goal.js";
import { MAIN_PATH_BOSSES } from "./main-path.js";

/** Each boss's own icon, the main path's and the remembrance bosses', by the flag the game sets when the boss is defeated. */
export const BOSS_ICONS: ReadonlyMap<number, string> = new Map([
  // Draconic Tree Sentinel: its drop, as it has no remembrance.
  [1045520800, "dragon-greatclaw"],
  // Godfrey, First Elden Lord: the wiki's own Godfrey icon, as the game has none in this style.
  [11000850, "godfrey"],
  // Morgott, the Omen King
  [11000800, "remembrance-of-the-omen-king"],
  // Fire Giant
  [1252520800, "remembrance-of-the-fire-giant"],
  // Godskin Duo: a drop, as they have no remembrance.
  [13000850, "black-flame-tornado"],
  // Maliketh, the Black Blade
  [13000800, "remembrance-of-the-black-blade"],
  // Sir Gideon Ofnir, the All-Knowing: his drop, as he has no remembrance.
  [11050850, "scepter-of-the-all-knowing"],
  // Hoarah Loux
  [11050800, "remembrance-of-hoarah-loux"],
  // Elden Beast
  [19000800, "elden-remembrance"],
  // Starscourge Radahn
  [1252380800, "remembrance-of-the-starscourge"],
  // Mohg, Lord of Blood
  [12050800, "remembrance-of-the-blood-lord"],
  // Romina, Saint of the Bud
  [2044450800, "remembrance-of-the-saint-of-the-bud"],
  // Radahn, Consort of Miquella
  [20010800, "remembrance-of-a-god-and-a-lord"],
  // Godrick the Grafted
  [10000800, "remembrance-of-the-grafted"],
  // Regal Ancestor Spirit
  [12090800, "remembrance-of-the-regal-ancestor"],
  // Astel, Naturalborn of the Void
  [12040800, "remembrance-of-the-naturalborn"],
  // Rennala, Queen of the Full Moon
  [14000800, "remembrance-of-the-full-moon-queen"],
  // Rykard, Lord of Blasphemy
  [16000800, "remembrance-of-the-blasphemous"],
  // Dragonlord Placidusax
  [13000830, "remembrance-of-the-dragonlord"],
  // Malenia, Blade of Miquella
  [15000800, "remembrance-of-the-rot-goddess"],
  // Divine Beast Dancing Lion
  [20000800, "remembrance-of-the-dancing-lion"],
  // Rellana, Twin Moon Knight
  [2048440800, "remembrance-of-the-twin-moon-knight"],
  // Putrescent Knight
  [22000800, "remembrance-of-putrescence"],
  // Bayle the Dread: his heart, as he has no remembrance.
  [2054390800, "heart-of-bayle"],
  // Base Serpent Messmer
  [21010800, "remembrance-of-the-impaler"],
  // Commander Gaius
  [2049480800, "remembrance-of-the-wild-boar-rider"],
  // Scadutree Avatar
  [2050480800, "remembrance-of-the-shadow-sunflower"],
  // Metyr, Mother of Fingers
  [25000800, "remembrance-of-the-mother-of-fingers"],
  // Midra, Lord of Frenzied Flame
  [28000800, "remembrance-of-the-lord-of-frenzied-flame"],
]);

// The drops that give a goal boss an icon of its own: a remembrance, or Bayle's heart, as he has none.
const OWN_ICON_DROP = /: (Elden Remembrance|Remembrance of |Heart of Bayle)/;

/** Whether a boss is meant to have an icon of its own: one on the main path, or one whose drops hold a remembrance or Bayle's heart. */
export function isOwnIconMeant(flag: number, drops: readonly string[]): boolean {
  return MAIN_PATH_BOSSES.has(flag) || drops.some((drop) => OWN_ICON_DROP.test(drop));
}

/** The icon every boss without one of its own shares: the wiki's Rune of Death emblem. */
export const SHARED_BOSS_ICON = "rune-of-death";

/** A boss's icon, by its defeat flag: its own, or the one every boss without its own shares. */
export function bossIcon(flag: number): string {
  return BOSS_ICONS.get(flag) ?? SHARED_BOSS_ICON;
}

/** The icon of each thing a goal boss can wait on, by the item or the count the rules name it by; a count of shards takes its whole item's icon. */
export const NEED_ICONS: ReadonlyMap<string, string> = new Map([
  ["Great Runes", "godricks-great-rune"],
  ["Dectus Medallion (Left)", "dectus-medallion-left"],
  ["Dectus Medallion (Right)", "dectus-medallion-right"],
  ["Rold Medallion", "rold-medallion"],
  ["Rold Medallion Shards", "rold-medallion"],
  ["Messmer's Kindling", "messmers-kindling"],
  ["Messmer's Kindling Shards", "messmers-kindling"],
]);

/** A goal menu need's icon: an item's or a count's own, or the icon of the boss a drop asks to defeat; undefined for none yet. */
export function needIcon(need: Need): string | undefined {
  switch (need.kind) {
    case "item":
      return NEED_ICONS.get(need.item);
    case "count":
      return NEED_ICONS.get(need.label);
    case "location": {
      const boss = bossDropping(need.location);
      return boss === undefined ? undefined : bossIcon(boss.flag);
    }
    default:
      return undefined;
  }
}
