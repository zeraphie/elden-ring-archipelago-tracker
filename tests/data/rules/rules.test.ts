import { describe as group, expect, test } from "bun:test";
import {
  decide,
  describe,
  describeNeed,
  needs,
  type Rule,
  type RuleState,
} from "../../../src/data/rules/rules.js";

// A state from plain lists: items received with their counts, options, and what's reachable.
function stateOf(
  items: Record<string, number> = {},
  options: Record<string, unknown> = {},
  reachable: readonly string[] = [],
  gettable: readonly string[] = []
): RuleState {
  return {
    items: new Map(Object.entries(items)),
    options,
    canReach: (area) => reachable.includes(area),
    canGet: (location) => gettable.includes(location),
  };
}

const item = (name: string): Rule => ({ kind: "item", item: name });
const GREAT_RUNES: Rule = {
  kind: "count",
  label: "Great Runes",
  items: ["Godrick's Great Rune", "Radahn's Great Rune", "Rykard's Great Rune"].map((name) => ({
    item: name,
    weight: 1,
  })),
  needs: 2,
};

group("an item", () => {
  test("is met once it's received", () => {
    expect(decide(item("Rusty Key"), stateOf({ "Rusty Key": 1 }))).toBe(true);
    expect(needs(item("Rusty Key"), stateOf())).toEqual({ kind: "item", item: "Rusty Key" });
  });
});

group("all of several", () => {
  const liurnia: Rule = { kind: "all", rules: [item("Liurnia Lock"), item("Rusty Key")] };

  test("needs only the parts not yet met", () => {
    expect(needs(liurnia, stateOf({ "Rusty Key": 1 }))).toEqual({
      kind: "item",
      item: "Liurnia Lock",
    });
    expect(needs(liurnia, stateOf())).toEqual({
      kind: "all",
      needs: [
        { kind: "item", item: "Liurnia Lock" },
        { kind: "item", item: "Rusty Key" },
      ],
    });
  });

  test("is met when every part is", () => {
    expect(decide(liurnia, stateOf({ "Liurnia Lock": 1, "Rusty Key": 1 }))).toBe(true);
  });
});

group("any of several", () => {
  const altus: Rule = {
    kind: "any",
    rules: [
      { kind: "location", location: "RSP/RSPO: Dragon Heart - boss drop" },
      { kind: "all", rules: [item("Dectus Medallion (Left)"), item("Dectus Medallion (Right)")] },
    ],
  };

  test("is met by any one part", () => {
    expect(decide(altus, stateOf({}, {}, [], ["RSP/RSPO: Dragon Heart - boss drop"]))).toBe(true);
    expect(
      decide(altus, stateOf({ "Dectus Medallion (Left)": 1, "Dectus Medallion (Right)": 1 }))
    ).toBe(true);
  });

  test("needs one of all its parts while none is met", () => {
    const need = needs(altus, stateOf({ "Dectus Medallion (Left)": 1 }));
    expect(need).toEqual({
      kind: "any",
      needs: [
        { kind: "location", location: "RSP/RSPO: Dragon Heart - boss drop" },
        { kind: "item", item: "Dectus Medallion (Right)" },
      ],
    });
  });
});

group("a count", () => {
  test("counts each item by its weight, and shows how far along it is and what it counts", () => {
    const keys: Rule = {
      kind: "count",
      label: "Stonesword Keys",
      items: [
        { item: "Stonesword Key", weight: 1 },
        { item: "Stonesword Key x3", weight: 3 },
      ],
      needs: 5,
    };
    expect(needs(keys, stateOf({ "Stonesword Key": 1, "Stonesword Key x3": 1 }))).toEqual({
      kind: "count",
      label: "Stonesword Keys",
      have: 4,
      needs: 5,
      items: ["Stonesword Key", "Stonesword Key x3"],
    });
    expect(decide(keys, stateOf({ "Stonesword Key": 2, "Stonesword Key x3": 1 }))).toBe(true);
  });
});

group("an area or a location", () => {
  test("is met once it can be reached", () => {
    expect(
      decide({ kind: "area", area: "Altus Plateau" }, stateOf({}, {}, ["Altus Plateau"]))
    ).toBe(true);
    expect(
      needs({ kind: "location", location: "SV/CT: Talisman Pouch - boss drop" }, stateOf())
    ).toEqual({
      kind: "location",
      location: "SV/CT: Talisman Pouch - boss drop",
    });
  });
});

group("a rule under an option", () => {
  const regionLock: Rule = {
    kind: "when",
    test: { option: "world_logic", is: 0 },
    rule: item("Liurnia Lock"),
  };

  test("applies only when the option says so", () => {
    expect(decide(regionLock, stateOf({}, { world_logic: 0 }))).toBe(false);
    expect(decide(regionLock, stateOf({}, { world_logic: 1 }))).toBe(true);
  });

  test("falls back to its otherwise", () => {
    const sharded: Rule = {
      kind: "when",
      test: { option: "rusty_key_shards", atLeast: 2 },
      rule: {
        kind: "count",
        label: "Rusty Key Shards",
        items: [{ item: "Rusty Key Shard", weight: 1 }],
        needs: 2,
      },
      otherwise: item("Rusty Key"),
    };
    expect(needs(sharded, stateOf({}, { rusty_key_shards: 1 }))).toEqual({
      kind: "item",
      item: "Rusty Key",
    });
    expect(needs(sharded, stateOf({}, { rusty_key_shards: 3 }))?.kind).toBe("count");
  });

  test("reads true as 1 and tests inequality", () => {
    const dlcOn: Rule = {
      kind: "when",
      test: { option: "enable_dlc", isNot: 0 },
      rule: item("Messmer's Kindling"),
    };
    expect(decide(dlcOn, stateOf({}, { enable_dlc: true }))).toBe(false);
    expect(decide(dlcOn, stateOf({}, { enable_dlc: false }))).toBe(true);
  });
});

group("describe", () => {
  test("says something while the rule isn't met, and nothing once it is", () => {
    expect(describe(GREAT_RUNES, stateOf({ "Godrick's Great Rune": 1 }))).toBeDefined();
    expect(
      describe(GREAT_RUNES, stateOf({ "Godrick's Great Rune": 1, "Rykard's Great Rune": 1 }))
    ).toBeUndefined();
  });

  test("names a location through the words it's given", () => {
    const margit: Rule = { kind: "location", location: "SV/CT: Talisman Pouch - boss drop" };
    const named: string[] = [];
    describe(margit, stateOf(), { location: (name) => (named.push(name), name) });
    expect(named).toEqual(["SV/CT: Talisman Pouch - boss drop"]);
  });
});

group("describeNeed", () => {
  test("says what a rule's still-needed parts say, from the parts alone", () => {
    const state = stateOf({ "Godrick's Great Rune": 1 });
    const need = needs(GREAT_RUNES, state);
    expect(need === undefined ? undefined : describeNeed(need)).toBe(describe(GREAT_RUNES, state));
  });
});
