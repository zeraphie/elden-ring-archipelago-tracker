import { describe, expect, test } from "bun:test";
import { RYKARD_ID, SERPENT_ID } from "../../../src/data/bosses/bosses.js";
import { LOCATION_GROUPS } from "../../../src/data/checks/location-groups.js";
import { regionGraph } from "../../../src/data/rules/regions/region-graph.js";
import { PRESETS } from "../../fixtures/presets.js";
import {
  arenaDropping,
  everyItem,
  namesIn,
  reached,
  rulesOf,
  type Options,
} from "../../fixtures/rooms.js";

const IZZY: Options = PRESETS["Izzy's preset"];
// Two rooms where the boss gates apply: Rykard where he starts, and Rykard and the serpent moved.
const UNMOVED: Options = {
  ...IZZY,
  enemy_rando: 0,
  rykard_encounter: 0,
  forceBosses: { [RYKARD_ID]: RYKARD_ID, [SERPENT_ID]: SERPENT_ID },
};
const MOVED: Options = {
  ...IZZY,
  rykard_encounter: 0,
  forceBosses: {
    [arenaDropping("SV/CT: Talisman Pouch - boss drop")]: RYKARD_ID,
    [arenaDropping("FP/FF: Remembrance of the Fire Giant - mainboss drop")]: SERPENT_ID,
  },
};
const ROOMS: [string, Options][] = [
  ...Object.entries(PRESETS),
  ["Izzy's preset without enemy rando or the Rykard encounter", UNMOVED],
  ["Izzy's preset with Rykard and the serpent moved", MOVED],
];

function allNames(options: Options) {
  const rules = rulesOf(options);
  const names = [...rules.entrances.values(), ...rules.locations.values()].map(namesIn);
  return {
    rules,
    areas: names.flatMap((name) => name.areas),
    locations: names.flatMap((name) => name.locations),
  };
}

describe("worldRules", () => {
  test("a region's lock and its other rules join, so all must hold", () => {
    expect(rulesOf(IZZY).entrances.get("Caelid")?.kind).toBe("all");
  });

  test("a region with one rule keeps it as it is", () => {
    expect(rulesOf(IZZY).entrances.get("Stormveil Castle")).toEqual({
      kind: "item",
      item: "Rusty Key",
    });
  });

  test("a rule added twice counts once", () => {
    const rykardsRune = "VM/AP: Rykard's Great Rune - mainboss drop";
    expect(rulesOf(UNMOVED).locations.get(rykardsRune)).toEqual({
      kind: "item",
      item: "Serpent-Hunter",
    });
  });

  test.each(ROOMS)(
    "on %s, every rule names a region and location the apworld has",
    (_, options) => {
      const known = new Set([
        ...regionGraph({ ...options, enable_dlc: 1, dlc_start: 0 }).regions,
        ...regionGraph({ ...options, enable_dlc: 1, dlc_start: 1 }).regions,
      ]);
      const { rules, areas, locations } = allNames(options);
      expect([...rules.entrances.keys(), ...areas].filter((region) => !known.has(region))).toEqual(
        []
      );
      expect(
        [...rules.locations.keys(), ...locations].filter((name) => !LOCATION_GROUPS.has(name))
      ).toEqual([]);
    }
  );

  test.each(ROOMS)("on %s, every region opens once every item is in", (_, options) => {
    expect(reached(options, ...everyItem(options)).regions.size).toBe(
      regionGraph(options).regions.size
    );
  });
});
