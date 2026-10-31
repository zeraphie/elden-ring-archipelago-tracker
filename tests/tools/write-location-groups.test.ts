import { describe, expect, test } from "bun:test";
import { locationFactsFrom, locationGroupsModule } from "../../tools/write-location-groups.js";

// A small region_names.py and locations.py in the apworld's own shape: 22 base tables,
// so the Post Leyndell range (the last 21 base tables and the first DLC one) is real.
const BASE = ["Limgrave", ...Array.from({ length: 20 }, (_, i) => `Late ${i + 1}`), "Late 21"];
const REGION_NAMES = `
region_order = [
    # Limgrave
${BASE.map((table) => `    "${table}",`).join("\n")}
]

region_order_dlc = [
    #DLC
    "Gravesite Plain",
    "Belurat",
]
`;
const SOURCE = `
location_tables: Dict[str, List[ERLocationData]] = {
    "Limgrave": [
        ERLocationData("LG/(SGr): Finger Severer - beside grace", "Finger Severer"),
        ERLocationData("LG/A: Pot Item - in a hanging pot", "Pot Item", hangingpot=True),
        ERLocationData("LG/A: Rise Item - top of rise", "Rise Item", rise=True),
        ERLocationData("LG/A: Scarab Item - scarab", "Scarab Item", scarab=True, exclusive=True),
        ERLocationData("LG/A: An Event", None),
        # ERLocationData("LG/A: Cut - commented out", "Cut"),
    ],
    "Coastal Cave": [
        ERLocationData("LG/CC: Cave Item - in cave", "Cave Item"),
        ERLocationData("LG/CC: Path Boss - critical path", "Path Boss", criticalpath=True),
    ],
    "Late 1": [
        ERLocationData("CS/A: Snow Item - in blizzard", "Snow Item", blizzard=True, missable=True),
    ],
    "Leyndell, Royal Capital": [
        ERLocationData("LRC/A: Capital Item - in the capital", "Capital Item"),
    ],
    "Gravesite Plain": [
        ERLocationData("GP/TPC: Scadutree Fragment - by cross", "Scadutree Fragment", fragment=True),
    ],
    "Belurat": [
        ERLocationData("BTS/A: DLC Scarab - scarab", "DLC Scarab", scarab=True),
    ],
    "Roundtable Hold DLC Only": [
        ERLocationData("RH/DLC: Shop Item - Twin maiden shop", "Shop Item"),
    ],
}

for region in [ # dungeons
    # base
    "Coastal Cave",
]:
    pass
`;

describe("locationFactsFrom", () => {
  const facts = new Map(locationFactsFrom(SOURCE, REGION_NAMES).map((fact) => [fact.name, fact]));

  test("reads every location but events and commented-out lines", () => {
    expect(facts.size).toBe(11);
    expect(facts.has("LG/A: An Event")).toBe(false);
    expect(facts.has("LG/A: Cut - commented out")).toBe(false);
  });

  test("a hanging pot is hidden, and an exclusive spot missable", () => {
    expect(facts.get("LG/A: Pot Item - in a hanging pot")?.groups).toEqual(["Hidden"]);
    expect(facts.get("LG/A: Scarab Item - scarab")?.isMissable).toBe(true);
  });

  test("a rise's spot is in the Rise group", () => {
    expect(facts.get("LG/A: Rise Item - top of rise")?.groups).toEqual(["Rise"]);
  });

  test("stops when the regions aren't there, rather than reading every spot as Post Leyndell", () => {
    expect(() => locationFactsFrom(SOURCE, SOURCE)).toThrow();
  });

  test("a dungeon table's spots are Dungeon, except on the critical path", () => {
    expect(facts.get("LG/CC: Cave Item - in cave")?.groups).toContain("Dungeon");
    expect(facts.get("LG/CC: Path Boss - critical path")?.groups).not.toContain("Dungeon");
  });

  test("Post Leyndell runs over the last 21 base tables and the first DLC one", () => {
    expect(facts.get("LG/(SGr): Finger Severer - beside grace")?.groups).toEqual([]);
    expect(facts.get("CS/A: Snow Item - in blizzard")?.groups).toEqual([
      "Blizzard",
      "Post Leyndell",
    ]);
    expect(facts.get("GP/TPC: Scadutree Fragment - by cross")?.groups).toEqual([
      "DLC",
      "Post Leyndell",
    ]);
    expect(facts.get("BTS/A: DLC Scarab - scarab")?.groups).toEqual(["DLC"]);
  });

  test("the DLC's Roundtable merchants are DLC, valued as Gravesite Plain", () => {
    expect(facts.get("RH/DLC: Shop Item - Twin maiden shop")?.groups).toEqual([
      "DLC",
      "Post Leyndell",
    ]);
  });

  test("a DLC scarab isn't in the base game's Scarab group", () => {
    expect(facts.get("LG/A: Scarab Item - scarab")?.groups).toEqual(["Scarab"]);
    expect(facts.get("BTS/A: DLC Scarab - scarab")?.groups).not.toContain("Scarab");
  });

  test("every spot in the Royal Capital's own table counts as missable", () => {
    expect(facts.get("LRC/A: Capital Item - in the capital")?.isMissable).toBe(true);
  });

  test("a spot carries the keywords its entry sets to True, and whether it's the DLC's", () => {
    expect([...(facts.get("LG/A: Scarab Item - scarab")?.flags ?? [])]).toEqual([
      "scarab",
      "exclusive",
    ]);
    expect(facts.get("LG/A: Scarab Item - scarab")?.isDlc).toBe(false);
    expect(facts.get("BTS/A: DLC Scarab - scarab")?.isDlc).toBe(true);
    expect(facts.get("RH/DLC: Shop Item - Twin maiden shop")?.isDlc).toBe(true);
  });
});

describe("locationGroupsModule", () => {
  const module = locationGroupsModule(locationFactsFrom(SOURCE, REGION_NAMES));

  test("lists every location with the table it's in as its region", () => {
    expect(module).toContain(
      '["LG/(SGr): Finger Severer - beside grace", { groups: [], region: "Limgrave" }]'
    );
    expect(module).toContain(
      '["LG/CC: Path Boss - critical path", { groups: [], region: "Coastal Cave" }]'
    );
    expect(module).toContain(
      '["CS/A: Snow Item - in blizzard", { groups: ["Blizzard","Post Leyndell"], isMissable: true, region: "Late 1" }]'
    );
  });
});
