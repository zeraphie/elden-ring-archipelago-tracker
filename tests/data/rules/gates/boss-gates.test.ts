import { describe, expect, test } from "bun:test";
import { ARENA_DROPS, RYKARD_ID, SERPENT_ID } from "../../../../src/data/bosses/bosses.js";
import {
  bossGateEntrances,
  bossGateLocations,
} from "../../../../src/data/rules/gates/boss-gates.js";
import { PRESETS } from "../../../fixtures/presets.js";
import {
  all,
  area,
  arenaDropping,
  item,
  namesIn,
  needsFor,
  opens,
  rulesOf,
  type Options,
} from "../../../fixtures/rooms.js";

const IZZY: Options = PRESETS["Izzy's preset"];
const MARGIT_DROP = "SV/CT: Talisman Pouch - boss drop";
const FIRE_GIANT_DROP = "FP/FF: Remembrance of the Fire Giant - mainboss drop";
const MORGOTT_DROP = "LRC/QB: Morgott's Great Rune - mainboss drop";
const RYKARDS_RUNE = "VM/AP: Rykard's Great Rune - mainboss drop";
const TO_ALTUS = [
  "Rusty Key",
  "Liurnia Lock",
  "Academy Glintstone Key",
  "Dectus Medallion (Left)",
  "Dectus Medallion (Right)",
];
const SERPENT_HUNTER = { kind: "item", item: "Serpent-Hunter" } as const;

const NO_ENEMY_RANDO: Options = { ...IZZY, enemy_rando: 0 };
// Enemy rando with the Serpent-Hunter randomized, not given at Rykard.
const NO_ENCOUNTER: Options = { ...IZZY, rykard_encounter: 0 };
// A room where enemy rando moved Rykard, and the serpent too, into these arenas.
const moved = (rykardArena: number, serpentArena?: number): Options => ({
  ...NO_ENCOUNTER,
  forceBosses: {
    [rykardArena]: RYKARD_ID,
    ...(serpentArena === undefined ? {} : { [serpentArena]: SERPENT_ID }),
  },
});

describe("the boss gates", () => {
  test("with enemy rando and the Rykard encounter, as in Izzy's preset, none apply", () => {
    expect(bossGateEntrances(IZZY)).toEqual([]);
    expect(bossGateLocations(IZZY, {})).toEqual([]);
  });

  test("without enemy rando, Stormveil's start takes Margit's Shackle, and Mohgwyn Mohg's and the Purifying Crystal Tear", () => {
    expect(needsFor("Stormveil Start", NO_ENEMY_RANDO)).toEqual(item("Margit's Shackle"));
    expect(needsFor("Mohgwyn Palace", NO_ENEMY_RANDO, "Mohgwyn Lock")).toEqual(
      all(
        area("Consecrated Snowfield"),
        all(item("Mohg's Shackle"), item("Purifying Crystal Tear"))
      )
    );
    expect(rulesOf(NO_ENEMY_RANDO).locations.has(RYKARDS_RUNE)).toBe(false);
  });

  test("without enemy rando or the Rykard encounter, Rykard's drops take the Serpent-Hunter", () => {
    const unmoved: Options = {
      ...NO_ENEMY_RANDO,
      rykard_encounter: 0,
      forceBosses: { [RYKARD_ID]: RYKARD_ID, [SERPENT_ID]: SERPENT_ID },
    };
    expect([...rulesOf(unmoved).locations.keys()]).toEqual(
      expect.arrayContaining([
        RYKARDS_RUNE,
        "VM/AP: Remembrance of the Blasphemous - mainboss drop",
      ])
    );
    expect(rulesOf(unmoved).locations.get(RYKARDS_RUNE)).toEqual(SERPENT_HUNTER);
  });

  // Each row: an area, and the drops of the bosses it waits for under enemy rando.
  const GATES: [string, string[]][] = [
    ["Stormveil Castle", [MARGIT_DROP]],
    ["Raya Lucaria Academy Main", ["RLA/SC: Memory Stone - boss drop"]],
    ["Nokron, Eternal City", ["NR/NEC: Silver Tear Mask - boss drop"]],
    ["Deeproot Depths", ["NR/(SA): Gargoyle's Greatsword - boss drop"]],
    ["War-Dead Catacombs", ["CL/(WD): Radahn's Great Rune - mainboss drop"]],
    ["Volcano Manor Upper", ["VM/GH: Godskin Stitcher - boss drop"]],
    ["Leyndell, Royal Capital Throne", ["LRC/WCR: Talisman Pouch - mainboss drop"]],
    ["Divine Tower of East Altus", [MORGOTT_DROP]],
    ["Frenzied Flame Proscription", [MORGOTT_DROP, "SSG/FD: Bloodflame Talons - boss drop"]],
    ["Elphael, Brace of the Haligtree", ["MH/HTP: Loretta's War Sickle - boss drop"]],
    ["Farum Azula", [FIRE_GIANT_DROP]],
    ["Farum Azula Main", ["FA/DTT: Smithing-Stone Miner's Bell Bearing [4] - boss drop"]],
    ["Leyndell, Ashen Capital", ["FA/BGB: Remembrance of the Black Blade - mainboss drop"]],
    ["Leyndell, Ashen Capital Throne", ["LAC/LCA: Scepter of the All-Knowing - boss drop"]],
    ["Erdtree", ["LAC/QB: Remembrance of Hoarah Loux - mainboss drop"]],
    ["Jagged Peak Foot", ["GP/(DP): Dragon-Hunter's Great Katana - boss drop"]],
    ["Shadow Keep", ["SK/SKMG: Aspects of the Crucible: Thorns - boss drop"]],
    ["Scaduview", ["ScV/SKBG: Remembrance of the Wild Boar Rider - mainboss drop"]],
    ["Abyssal Woods", ["RR/(DC): Barbed Staff-Spear - boss drop"]],
    ["Enir-Ilim", ["ARR/CBME: Remembrance of the Saint of the Bud - mainboss drop"]],
  ];

  // The locations a region's way in asks for.
  const locationsFor = (region: string, options: Options): string[] => {
    const rule = rulesOf(options).entrances.get(region);
    return rule ? namesIn(rule).locations : [];
  };

  test.each(GATES)(
    "with enemy rando and no Rykard encounter, %s waits for its boss",
    (region, drops) => {
      expect(locationsFor(region, NO_ENCOUNTER)).toEqual(expect.arrayContaining(drops));
      expect(locationsFor(region, IZZY).filter((name) => drops.includes(name))).toEqual([]);
    }
  );

  test("Rykard moved into Margit's arena keeps Stormveil Castle shut until the Serpent-Hunter", () => {
    const room = moved(arenaDropping(MARGIT_DROP));
    expect(opens("Stormveil Castle", NO_ENCOUNTER, "Rusty Key")).toBe(true);
    expect(opens("Stormveil Castle", room, "Rusty Key")).toBe(false);
    expect(opens("Stormveil Castle", room, "Rusty Key", "Serpent-Hunter")).toBe(true);
  });

  test("once Rykard is moved, his own drops need nothing", () => {
    expect(rulesOf(moved(arenaDropping(MARGIT_DROP))).locations.has(RYKARDS_RUNE)).toBe(false);
  });

  test("the serpent's new arena takes the Serpent-Hunter too", () => {
    const room = moved(arenaDropping(MARGIT_DROP), arenaDropping(FIRE_GIANT_DROP));
    expect(rulesOf(room).locations.get(FIRE_GIANT_DROP)).toEqual(SERPENT_HUNTER);
  });

  test("but not when Rykard's new arena drops nothing, as the apworld checks his drops for both", () => {
    const [dropless] = [...ARENA_DROPS].find(([, drops]) => drops.length === 0) ?? [];
    expect(dropless).toBeDefined();
    const room = moved(dropless ?? 0, arenaDropping(FIRE_GIANT_DROP));
    expect(rulesOf(room).locations.has(FIRE_GIANT_DROP)).toBe(false);
  });

  test("the open-world Altus rule is there under region lock too, where the Dectus halves meet it", () => {
    const altus = rulesOf(NO_ENCOUNTER).entrances.get("Altus Plateau");
    expect(altus && namesIn(altus).locations).toEqual(["RSP/RSPO: Dragon Heart - boss drop"]);
    expect(opens("Altus Plateau", NO_ENCOUNTER, ...TO_ALTUS)).toBe(true);
  });

  test("in open world, Altus opens once the Precipice's dragon can be fought, without the Dectus halves", () => {
    const openWorld: Options = { ...NO_ENCOUNTER, world_logic: 1, early_legacy_dungeons: 0 };
    expect(opens("Altus Plateau", openWorld)).toBe(true);
    expect(needsFor("Altus Plateau", openWorld)).toBeUndefined();
  });
});
