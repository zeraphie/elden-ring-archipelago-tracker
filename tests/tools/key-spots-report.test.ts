import { describe, expect, test } from "bun:test";
import {
  possibleKeySpots,
  possibleKeySpotsModule,
  priorityGroupsOf,
  unnamedSpots,
} from "../../tools/key-spots-report.js";
import type { LocationFacts } from "../../tools/write-location-groups.js";

// A location's facts, as the apworld's source would give them.
function fact(
  name: string,
  flags: readonly string[],
  { isDlc = false, isMissable = false } = {}
): LocationFacts {
  return { name, groups: [], isMissable, isDlc, flags: new Set(flags), table: "Limgrave" };
}

const NO_BOSSES: ReadonlySet<string> = new Set();

describe("priorityGroupsOf", () => {
  test("a boss's drop is a Boss Reward, the DLC's a DLC Boss Reward", () => {
    const drops = new Set(["LG/A: Drop - boss drop", "GP/A: Drop - boss drop"]);
    expect(priorityGroupsOf(fact("LG/A: Drop - boss drop", []), drops)).toEqual(["Boss Reward"]);
    expect(priorityGroupsOf(fact("GP/A: Drop - boss drop", [], { isDlc: true }), drops)).toEqual([
      "DLC Boss Reward",
    ]);
  });

  test("the DLC's chests, scarabs, shops, maps and key items are groups of their own", () => {
    const flags = ["chest", "scarab", "progshop", "map", "keyitem"];
    expect(priorityGroupsOf(fact("LG/A: Item - x", flags), NO_BOSSES)).toEqual([
      "Key Items",
      "Chest",
      "Scarab",
      "Shop",
      "Map",
    ]);
    expect(priorityGroupsOf(fact("GP/A: Item - x", flags, { isDlc: true }), NO_BOSSES)).toEqual([
      "DLC Key Items",
      "DLC Chest",
      "DLC Scarab",
      "DLC Shop",
      "DLC Map",
    ]);
  });

  test("a remembrance is a group in the DLC alone", () => {
    expect(priorityGroupsOf(fact("LG/A: Item - x", ["remembrance"]), NO_BOSSES)).toEqual([]);
    expect(
      priorityGroupsOf(fact("GP/A: Item - x", ["remembrance"], { isDlc: true }), NO_BOSSES)
    ).toEqual(["DLC Remembrance Boss"]);
  });

  test("a Scadutree Fragment an enemy drops is a Fragment", () => {
    expect(priorityGroupsOf(fact("GP/A: Item - x", ["enemyfragment"]), NO_BOSSES)).toEqual([
      "Fragment",
    ]);
  });

  test("a missable key item isn't a Key Item", () => {
    expect(
      priorityGroupsOf(fact("LG/A: Item - x", ["keyitem"], { isMissable: true }), NO_BOSSES)
    ).toEqual([]);
  });

  test("a shop that isn't a progression shop is in no group", () => {
    expect(priorityGroupsOf(fact("LG/(WR): Item - Sellen Shop", ["shop"]), NO_BOSSES)).toEqual([]);
  });
});

describe("possibleKeySpots", () => {
  test("keeps the spots in a group, missable ones left out, in the order given", () => {
    const facts = [
      fact("LG/A: Seed - seedtree", ["seedtree"]),
      fact("LG/A: Rune - on a corpse", []),
      fact("LG/A: Gone - missable chest", ["chest"], { isMissable: true }),
      fact("LG/A: Tear - by statue", ["church"]),
    ];
    expect(possibleKeySpots(facts, NO_BOSSES)).toEqual([
      "LG/A: Seed - seedtree",
      "LG/A: Tear - by statue",
    ]);
  });
});

describe("unnamedSpots", () => {
  test("lists the spots with no name, by the first region each is listed under", () => {
    const spots = [
      "LG/WS: Rune - by grace",
      "LG/WS: Seed - seedtree",
      "LRC|LAC/RC: Rune - by grace",
      "LR: Remembrance - mainboss drop",
    ];
    const named = new Map([["LG/WS: Seed - seedtree", {}]]);
    expect(unnamedSpots(spots, named)).toEqual(
      new Map([
        ["LG", ["LG/WS: Rune - by grace"]],
        ["LRC", ["LRC|LAC/RC: Rune - by grace"]],
        ["LR", ["LR: Remembrance - mainboss drop"]],
      ])
    );
  });
});

describe("possibleKeySpotsModule", () => {
  test("writes each spot as a string, in order, a trailing space kept", () => {
    const module = possibleKeySpotsModule(["LG/A: Seed - seedtree ", 'LG/A: "Quoted" - x']);
    const seed = module.indexOf('  "LG/A: Seed - seedtree ",');
    const quoted = module.indexOf('  "LG/A: \\"Quoted\\" - x",');
    expect(seed).toBeGreaterThan(-1);
    expect(quoted).toBeGreaterThan(seed);
  });
});
