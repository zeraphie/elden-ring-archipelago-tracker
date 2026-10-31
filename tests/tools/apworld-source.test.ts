import { describe, expect, test } from "bun:test";
import {
  callsIn,
  listAt,
  piecesFrom,
  pythonString,
  regionOrdersFrom,
  trueKeywords,
} from "../../tools/apworld-source.js";

// Calls shaped as the apworld's bosses.py writes them.
const SOURCE = `
class ERBossInfo:
    name: str

base_bosses = [
    # MARK: Limgrave
    ERBossInfo("Solder of Godrick", ["Limgrave"], 18000850, 18000850, locations=[]), # emote spot
    ERBossInfo("Tree Sentinel (LG)", ["Limgrave", "Overworld"], 1042360800, 1042360800,
               locations=["LG/TFS: Golden Halberd - first field boss", # the first one
                          "LG/TFS: Erdtree Heater Shield - first field boss"]),
    # ERBossInfo("Cut Boss (LG)", ["Limgrave"], 1, 1),
    NotERBossInfo("Lookalike", [], 2, 2),
]
`;

describe("callsIn", () => {
  test("splits each call's arguments, over several lines and past comments", () => {
    const calls = callsIn(SOURCE, "ERBossInfo");
    expect(calls).toHaveLength(2);
    expect(calls[1]?.args.slice(0, 4)).toEqual([
      '"Tree Sentinel (LG)"',
      '["Limgrave", "Overworld"]',
      "1042360800",
      "1042360800",
    ]);
    expect(calls[1]?.args[4]?.startsWith("locations=[")).toBe(true);
    expect(calls[1]?.args[4]).not.toContain("# the first one");
  });

  test("leaves out a call on a commented-out line, and a longer name ending the same way", () => {
    const names = callsIn(SOURCE, "ERBossInfo").map((call) => call.args[0]);
    expect(names).not.toContain('"Cut Boss (LG)"');
    expect(names).not.toContain('"Lookalike"');
  });
});

describe("regionOrdersFrom", () => {
  const SOURCE =
    '# Regions\nregion_order = [\n    "Limgrave",\n]\n\nregion_order_dlc = [\n    "Belurat",\n]\n';

  test("reads both orders", () => {
    expect(regionOrdersFrom(SOURCE)).toEqual({ base: ["Limgrave"], dlc: ["Belurat"] });
  });

  test("stops when either is missing", () => {
    expect(() => regionOrdersFrom("nothing here")).toThrow();
    expect(() => regionOrdersFrom('\nregion_order = [\n    "Limgrave",\n]\n')).toThrow();
  });
});

describe("piecesFrom and listAt", () => {
  test("a list's pieces keep strings whole, commas and brackets inside them included", () => {
    expect(piecesFrom('"a, b", "c [d]", (1, 2)]', 0)).toEqual(['"a, b"', '"c [d]"', "(1, 2)"]);
  });

  test("a list found by its opening reads to its close, comments dropped", () => {
    const source =
      'region_order = [\n    # Limgrave\n    "Limgrave",\n    "Stormhill",\n]\nnext = 1';
    expect(listAt(source, "region_order = [")).toEqual(['"Limgrave"', '"Stormhill"']);
  });

  test("a list that isn't there is empty", () => {
    expect(listAt("nothing here", "region_order = [")).toEqual([]);
  });
});

describe("pythonString", () => {
  test("reads double- and single-quoted literals, escapes included", () => {
    expect(pythonString('"Fia\'s Champions"')).toBe("Fia's Champions");
    expect(pythonString('"TSC/SCR: \\"Gravity Stone\\" - spot"')).toBe(
      'TSC/SCR: "Gravity Stone" - spot'
    );
    expect(pythonString("'it\\'s \"here\"'")).toBe('it\'s "here"');
  });
});

describe("trueKeywords", () => {
  test("names only the keyword arguments set to True", () => {
    expect(trueKeywords(['"x"', "missable=True", "dlc = True", "chest=False", "key='1'"])).toEqual(
      new Set(["missable", "dlc"])
    );
  });
});
