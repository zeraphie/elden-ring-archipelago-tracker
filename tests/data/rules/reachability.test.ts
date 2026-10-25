import { describe, expect, test } from "bun:test";
import { reach, type WorldRules } from "../../../src/data/rules/reachability.js";
import type { RegionGraph } from "../../../src/data/rules/regions/region-graph.js";
import type { Rule } from "../../../src/data/rules/rules.js";

// A small world in the real one's shape: Limgrave leads to Stormveil, then
// Liurnia; Liurnia leads to the Academy, whose boss opens Altus.
const GRAPH: RegionGraph = {
  start: "Limgrave",
  regions: new Set(["Limgrave", "Stormveil", "Liurnia", "Academy", "Altus"]),
  exits: new Map([
    ["Limgrave", ["Stormveil", "Liurnia"]],
    ["Liurnia", ["Academy", "Altus"]],
  ]),
};
const item = (name: string): Rule => ({ kind: "item", item: name });
const RULES: WorldRules = {
  entrances: new Map<string, Rule>([
    ["Stormveil", item("Rusty Key")],
    ["Liurnia", { kind: "area", area: "Stormveil" }],
    ["Academy", item("Academy Glintstone Key")],
    ["Altus", { kind: "location", location: "RLA/DB: Great Rune of the Unborn - mainboss drop" }],
  ]),
  locations: new Map<string, Rule>([
    [
      "LL/A: Gated Chest - chest",
      { kind: "when", test: { option: "soft_logic", is: 1 }, rule: item("Torch") },
    ],
  ]),
  regionOf: (location) =>
    location.startsWith("RLA/") ? "Academy" : location.startsWith("LL/") ? "Liurnia" : undefined,
};
const items = (...names: string[]): ReadonlyMap<string, number> =>
  new Map(names.map((name) => [name, 1]));

describe("reach", () => {
  test("with nothing received, only the start and what's open from it", () => {
    expect([...reach(GRAPH, RULES, items(), {}).regions]).toEqual(["Limgrave"]);
  });

  test("an item opens the way it guards, and what lies past it", () => {
    expect([...reach(GRAPH, RULES, items("Rusty Key"), {}).regions].sort()).toEqual([
      "Limgrave",
      "Liurnia",
      "Stormveil",
    ]);
  });

  test("a region opened by a location's rule follows once that location can be got", () => {
    const reached = reach(GRAPH, RULES, items("Rusty Key", "Academy Glintstone Key"), {});
    expect(reached.regions.has("Academy")).toBe(true);
    expect(reached.canGet("RLA/DB: Great Rune of the Unborn - mainboss drop")).toBe(true);
    expect(reached.regions.has("Altus")).toBe(true);
  });

  test("a rule on an area found later in the same pass still opens, as passes repeat", () => {
    // Liurnia is checked before Stormveil is reached on the first pass.
    const backwards: RegionGraph = {
      ...GRAPH,
      exits: new Map([["Limgrave", ["Liurnia", "Stormveil"]]]),
    };
    expect(reach(backwards, RULES, items("Rusty Key"), {}).regions.has("Liurnia")).toBe(true);
  });

  test("a location needs its region reached and its own rule met", () => {
    const location = "LL/A: Gated Chest - chest";
    expect(reach(GRAPH, RULES, items(), { soft_logic: 1 }).canGet(location)).toBe(false);
    expect(reach(GRAPH, RULES, items("Rusty Key"), { soft_logic: 1 }).canGet(location)).toBe(false);
    expect(
      reach(GRAPH, RULES, items("Rusty Key", "Torch"), { soft_logic: 1 }).canGet(location)
    ).toBe(true);
    expect(reach(GRAPH, RULES, items("Rusty Key"), { soft_logic: 0 }).canGet(location)).toBe(true);
  });

  test("a location the room doesn't have can't be got", () => {
    expect(reach(GRAPH, RULES, items("Rusty Key"), {}).canGet("XX/A: Nowhere - anywhere")).toBe(
      false
    );
  });
});
