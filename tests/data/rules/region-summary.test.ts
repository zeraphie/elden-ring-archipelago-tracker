import { describe, expect, test } from "bun:test";
import { LOCATION_GROUPS } from "../../../src/data/checks/location-groups.js";
import { sheetTiles } from "../../../src/data/checks/map-tiles.js";
import {
  firstToDo,
  regionGroups,
  regionSummaries,
} from "../../../src/data/rules/region-summary.js";
import type { Room } from "../../../src/data/rules/room-reach.js";
import { PRESETS } from "../../fixtures/presets.js";
import { everyItem, needsFor, type Options } from "../../fixtures/rooms.js";

const OPTIONS = PRESETS["Izzy's preset"] as unknown as Options;
const ROOM: Room = { options: OPTIONS, forced: {}, goal: [], locations: new Set() };

// The first location the apworld lists in a rules region whose name starts with this code.
const firstIn = (region: string, code: string): string => {
  const found = [...LOCATION_GROUPS].find(
    ([name, facts]) => facts.region === region && /^\(?([A-Za-z]+)/.exec(name)?.[1] === code
  );
  if (found === undefined) {
    throw new Error(`No ${code} location in ${region}`);
  }
  return found[0];
};

// Liurnia's lakes (1) and one of its caves, off the open-world map (2), then Limgrave (3).
const NAMES = {
  1: firstIn("Liurnia of The Lakes", "LL"),
  2: firstIn("Stillwater Cave", "LL"),
  3: firstIn("Limgrave", "LG"),
};
const summaries = (keyChecks: number[] = [], checked: number[] = [], items = new Map()) =>
  regionSummaries(ROOM, items, NAMES, new Set(keyChecks), new Set(checked));

describe("regionSummaries", () => {
  test("every check of a code counts, on the open-world map or off it", () => {
    expect(summaries([1, 2], [1]).get("LL")).toMatchObject({
      keyChecks: 2,
      keyDone: 1,
      checks: 2,
      done: 1,
    });
  });

  test("from the start, Limgrave is open and Liurnia locked, needing the way into its lakes", () => {
    const regions = summaries();
    expect(regions.get("LG")).toMatchObject({ state: "open", needs: undefined });
    expect(regions.get("LL")).toMatchObject({
      state: "locked",
      needs: needsFor("Liurnia of The Lakes", OPTIONS),
    });
  });

  test("a region opens once a region its checks sit in is reached", () => {
    const regions = summaries([], [], new Map(everyItem(OPTIONS)));
    expect(regions.get("LL")).toMatchObject({ state: "open", needs: undefined });
  });

  test("a region is done only once every key check of its code is checked, off the map too", () => {
    expect(summaries([1, 2], [1]).get("LL")?.state).toBe("locked");
    expect(summaries([1, 2], [1, 2]).get("LL")?.state).toBe("done");
  });

  test("a region with no key checks is never done, however much is checked", () => {
    expect(summaries([], [3]).get("LG")?.state).toBe("open");
  });

  test("a region holds its checks by id, in id order", () => {
    expect(summaries().get("LL")?.ids).toEqual([1, 2]);
    expect(summaries().get("LG")?.ids).toEqual([3]);
  });

  test("regions come in the region table's order, base game first", () => {
    expect([...summaries().keys()]).toEqual(["LG", "LL"]);
  });
});

describe("firstToDo", () => {
  test("is the first open region with key checks left", () => {
    expect(firstToDo(summaries([3]))).toBe("LG");
  });

  test("passes over a region with every key check done, and one that's locked", () => {
    expect(firstToDo(summaries([1, 3], [3]))).toBe("LG");
    const opened = summaries([1, 3], [3], new Map(everyItem(OPTIONS)));
    expect(firstToDo(opened)).toBe("LL");
  });

  test("with nothing left to do, is the first region", () => {
    expect(firstToDo(summaries())).toBe("LG");
  });

  test("with no regions, is none", () => {
    expect(firstToDo(new Map())).toBeUndefined();
  });
});

describe("regionGroups", () => {
  // Liurnia and Limgrave on the Lands Between, Gravesite Plain on the Realm of Shadow, and
  // Stormveil and Belurat with no tiles: one the base game's, one the DLC's.
  const names = {
    1: firstIn("Liurnia of The Lakes", "LL"),
    3: firstIn("Limgrave", "LG"),
    4: firstIn("Stormveil Castle", "SV"),
    5: firstIn("Gravesite Plain", "GP"),
    6: firstIn("Belurat", "BTS"),
  };
  const regions = regionSummaries(ROOM, new Map(), names, new Set(), new Set());
  const sheets = sheetTiles([
    { region: "LL", sheet: "surface", x: 36, y: 49 },
    { region: "LG", sheet: "surface", x: 40, y: 38 },
    { region: "GP", sheet: "dlc", x: 45, y: 40 },
  ]);

  test("a region is the DLC's when most of its checks are", () => {
    expect(regions.get("GP")?.isDlc).toBe(true);
    expect(regions.get("BTS")?.isDlc).toBe(true);
    expect(regions.get("SV")?.isDlc).toBe(false);
  });

  test("groups regions by their tiles' sheet, and those with none by their game, each in the table's order", () => {
    expect(regionGroups(regions, sheets)).toEqual({
      surface: ["LG", "LL"],
      underground: ["SV"],
      dlc: ["GP", "BTS"],
    });
  });
});
