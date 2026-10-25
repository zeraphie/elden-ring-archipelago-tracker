import { describe, expect, test } from "bun:test";
import {
  regionGraph,
  type RegionGraph,
  type RegionGraphOptions,
} from "../../../../src/data/rules/regions/region-graph.js";

const OPTIONS: RegionGraphOptions = {
  enable_dlc: 0,
  dlc_start: 0,
  dlc_timing: 0,
  missable_location_behavior: 2,
  excluded_location_behavior: 2,
  exclude_locations: [],
};

// Every region a new game can walk to, following exits.
function reachable(graph: RegionGraph): Set<string> {
  const seen = new Set([graph.start]);
  const todo = [graph.start];
  for (let region = todo.pop(); region !== undefined; region = todo.pop()) {
    for (const next of graph.exits.get(region) ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        todo.push(next);
      }
    }
  }
  return seen;
}

const COMBINATIONS: [string, Partial<RegionGraphOptions>, number][] = [
  ["base game only", {}, 116],
  ["base game then the DLC", { enable_dlc: 1, dlc_start: 0 }, 161],
  ["the DLC alone", { enable_dlc: 1, dlc_start: 1 }, 46],
  ["both, starting in the DLC", { enable_dlc: 1, dlc_start: 2 }, 161],
];

describe("regionGraph", () => {
  test.each(COMBINATIONS)("%s: every exit leads to one of its regions", (_, options, size) => {
    const graph = regionGraph({ ...OPTIONS, ...options });
    expect(graph.regions.size).toBe(size);
    const strays = [...graph.exits].flatMap(([from, to]) =>
      [from, ...to].filter((region) => !graph.regions.has(region))
    );
    expect(strays).toEqual([]);
  });

  test.each(COMBINATIONS)("%s: every region connects back to the start", (_, options) => {
    const graph = regionGraph({ ...OPTIONS, ...options });
    const seen = reachable(graph);
    expect([...graph.regions].filter((region) => !seen.has(region))).toEqual([]);
  });

  test("a new game starts in Limgrave, or in Gravesite Plain when the run starts in the DLC", () => {
    expect(regionGraph(OPTIONS).start).toBe("Limgrave");
    expect(regionGraph({ ...OPTIONS, enable_dlc: 1, dlc_start: 2 }).start).toBe("Gravesite Plain");
  });

  test("the DLC alone has its own Roundtable, off Gravesite Plain", () => {
    const graph = regionGraph({ ...OPTIONS, enable_dlc: 1, dlc_start: 1 });
    expect(graph.exits.get("Gravesite Plain")).toContain("Roundtable Hold DLC Only");
    expect(graph.regions.has("Limgrave")).toBe(false);
  });

  test("Mohgwyn Palace is reached from Limgrave, Altus or the Snowfield as dlc_timing says", () => {
    const from = (options: Partial<RegionGraphOptions>): string[] =>
      [...regionGraph({ ...OPTIONS, ...options }).exits]
        .filter(([, to]) => to.includes("Mohgwyn Palace"))
        .map(([region]) => region);
    expect(from({ dlc_timing: 0 })).toEqual(["Limgrave"]);
    expect(from({ dlc_timing: 1 })).toEqual(["Altus Plateau"]);
    expect(from({ dlc_timing: 2 })).toEqual(["Consecrated Snowfield"]);
  });

  test("Mohgwyn Palace waits for the Snowfield while Varré's medal isn't randomized", () => {
    const viaSnowfield = (options: Partial<RegionGraphOptions>): boolean =>
      regionGraph({ ...OPTIONS, ...options })
        .exits.get("Consecrated Snowfield")
        ?.includes("Mohgwyn Palace") ?? false;
    expect(viaSnowfield({ missable_location_behavior: 3 })).toBe(true);
    expect(
      viaSnowfield({
        excluded_location_behavior: 4,
        exclude_locations: [
          "LL/(RC): Pureblood Knight's Medal - talk to Varré after invading Magnus in AP and returning the bloodsoaked Lord of Blood's Favor",
        ],
      })
    ).toBe(true);
  });

  test("the DLC is entered from Mohgwyn Palace after the base game", () => {
    const graph = regionGraph({ ...OPTIONS, enable_dlc: 1, dlc_start: 0 });
    expect(graph.exits.get("Mohgwyn Palace")).toContain("Gravesite Plain");
  });
});
