import { describe, expect, test } from "bun:test";
import { BOSSES, RYKARD_ID } from "../../../src/data/bosses/bosses.js";
import { keyChecks } from "../../../src/data/checks/key-checks.js";
import { withoutExtra } from "../../../src/data/names/location-name.js";
import {
  areaStatuses,
  bossNeeds,
  locationNeeds,
  regionNeeds,
  regionsOnTheWay,
} from "../../../src/data/rules/area-status.js";
import { PRESETS } from "../../fixtures/presets.js";
import {
  all,
  arenaDropping,
  count,
  everyItem,
  item,
  location,
  roomReach,
  type Options,
} from "../../fixtures/rooms.js";
import { nameOf, seed, slotOf } from "../../fixtures/seeds.js";

const IZZY: Options = PRESETS["Izzy's preset"];
const EVERY: Options = PRESETS["Every priority group"];
const MORGOTT = 11000800;
// Izzy's way to Altus: region lock, with early legacy dungeons on.
const TO_ALTUS = [
  "Rusty Key",
  "Liurnia Lock",
  "Academy Glintstone Key",
  "Dectus Medallion (Left)",
  "Dectus Medallion (Right)",
];

// A seed's key checks, by name, from the key-check fixture.
const keyCheckNames = (label: string): string[] => [...keyChecks(slotOf(seed(label)))].map(nameOf);

// Each room: its rule options from the presets, and its key checks from the same seed.
const ROOMS: [string, Options, string[]][] = [
  ["Izzy's preset", IZZY, keyCheckNames("Izzy's preset")],
  ["the every-group seed, DLC on", EVERY, keyCheckNames("every priority group, nothing excluded")],
];

describe("areaStatuses, end to end", () => {
  test.each(ROOMS)("on %s, every key check sits in a region of the graph", (_, options, keys) => {
    const statuses = areaStatuses(roomReach(options), keys, new Set());
    const counted = [...statuses.values()].reduce((total, status) => total + status.keyChecks, 0);
    expect(counted).toBe(keys.length);
  });

  test.each(ROOMS)("on %s, with every item in, nothing is locked", (_, options, keys) => {
    const statuses = areaStatuses(roomReach(options, ...everyItem(options)), keys, new Set());
    expect([...statuses].filter(([, status]) => status.state === "locked")).toEqual([]);
  });

  test.each(ROOMS)(
    "on %s, with every key check checked, every region holding one is done",
    (_, options, keys) => {
      const statuses = areaStatuses(roomReach(options, ...everyItem(options)), keys, new Set(keys));
      const notDone = [...statuses].filter(
        ([, status]) => status.keyChecks > 0 && status.state !== "done"
      );
      expect(notDone).toEqual([]);
    }
  );

  test("on Izzy's preset with nothing in, Limgrave is open and Liurnia waits for its lock and the Rusty Key", () => {
    const statuses = areaStatuses(roomReach(IZZY), keyCheckNames("Izzy's preset"), new Set());
    expect(statuses.get("Limgrave")?.state).toBe("open");
    expect(statuses.get("Liurnia of The Lakes")).toMatchObject({
      state: "locked",
      needs: all(item("Liurnia Lock"), item("Rusty Key")),
    });
  });

  test("a region counts its checked key checks, an extra copy in its spot's region", () => {
    const keys = keyCheckNames("Izzy's live room");
    const copy = keys.find((name) => withoutExtra(name).extra !== undefined) ?? "";
    const room = roomReach(IZZY, ...everyItem(IZZY));
    const region = room.rules.regionOf(withoutExtra(copy).base) ?? "";
    const before = areaStatuses(room, keys, new Set()).get(region);
    const after = areaStatuses(room, keys, new Set([copy])).get(region);
    expect(after?.checked).toBe((before?.checked ?? 0) + 1);
    expect(after?.keyChecks).toBe(before?.keyChecks);
  });

  test("a region whose every key check is checked is done, even one the rules hold locked", () => {
    const keys = keyCheckNames("Izzy's preset");
    const room = roomReach(IZZY);
    const inLiurnia = keys.filter(
      (name) => room.rules.regionOf(withoutExtra(name).base) === "Liurnia of The Lakes"
    );
    expect(inLiurnia.length).toBeGreaterThan(0);
    expect(areaStatuses(room, keys, new Set(inLiurnia)).get("Liurnia of The Lakes")?.state).toBe(
      "done"
    );
  });
});

describe("what stands in the way", () => {
  test("Leyndell names everything on its way in, the Dectus halves as well as its great runes", () => {
    expect(regionNeeds("Leyndell, Royal Capital", roomReach(IZZY))).toEqual(
      all(
        item("Liurnia Lock"),
        item("Rusty Key"),
        item("Dectus Medallion (Left)"),
        item("Dectus Medallion (Right)"),
        item("Academy Glintstone Key"),
        count("Great Runes", 0, 2)
      )
    );
    expect(regionNeeds("Leyndell, Royal Capital", roomReach(IZZY, ...TO_ALTUS))).toEqual(
      count("Great Runes", 0, 2)
    );
  });

  test("a goal boss stands as its arena does, and nothing stands in the way once it can be fought", () => {
    const drops = BOSSES.get(MORGOTT)?.drops ?? [];
    expect(bossNeeds(drops, roomReach(IZZY, ...TO_ALTUS, "Godrick's Great Rune"))).toEqual(
      count("Great Runes", 1, 2)
    );
    const twoRunes = roomReach(IZZY, ...TO_ALTUS, "Godrick's Great Rune", "Rykard's Great Rune");
    expect(bossNeeds(drops, twoRunes)).toBeUndefined();
  });

  test("a boss Rykard was moved onto also waits for the Serpent-Hunter", () => {
    const margit = "SV/CT: Talisman Pouch - boss drop";
    const moved: Options = {
      ...IZZY,
      rykard_encounter: 0,
      forceBosses: { [arenaDropping(margit)]: RYKARD_ID },
    };
    expect(bossNeeds([margit], roomReach(moved))).toEqual(item("Serpent-Hunter"));
    expect(bossNeeds([margit], roomReach(moved, "Serpent-Hunter"))).toBeUndefined();
  });

  test("on the every-group seed, Enir-Ilim waits for three of Messmer's Kindling Shards", () => {
    const enirIlim = regionNeeds("Enir-Ilim", roomReach(EVERY));
    expect(enirIlim?.kind === "all" ? enirIlim.needs : [enirIlim]).toContainEqual(
      count("Messmer's Kindling Shards", 0, 3)
    );
  });

  test("an extra copy of a spot stands as the spot does", () => {
    const radahn = "CL/(WD): Remembrance of the Starscourge - mainboss drop";
    const room = roomReach(IZZY);
    expect(locationNeeds(`${radahn}, extra item 1`, room)).toEqual(locationNeeds(radahn, room));
    expect(locationNeeds(radahn, room)).toBeDefined();
    expect(regionNeeds("Limgrave", room)).toBeUndefined();
  });

  test("Nokron's way in reads Radahn's remembrance as a location to get", () => {
    expect(regionNeeds("Nokron, Eternal City Start", roomReach(IZZY, "Siofra Lock"))).toEqual(
      location("CL/(WD): Remembrance of the Starscourge - mainboss drop")
    );
  });
});

describe("regionsOnTheWay", () => {
  test("is the region and each one it's entered from, back to the start", () => {
    const graph = {
      start: "A",
      regions: new Set(["A", "B", "C", "D"]),
      exits: new Map([
        ["A", ["B", "D"]],
        ["B", ["C"]],
      ]),
    };
    expect(regionsOnTheWay("C", graph)).toEqual(["C", "B", "A"]);
    expect(regionsOnTheWay("D", graph)).toEqual(["D", "A"]);
    expect(regionsOnTheWay("A", graph)).toEqual(["A"]);
  });

  test("stops where the way comes round on itself", () => {
    const graph = {
      start: "A",
      regions: new Set(["A", "B"]),
      exits: new Map([
        ["A", ["B"]],
        ["B", ["A"]],
      ]),
    };
    expect(regionsOnTheWay("B", graph)).toEqual(["B", "A"]);
  });

  test("on Izzy's preset, Leyndell's throne lies past the Capital Outskirts", () => {
    const way = regionsOnTheWay("Leyndell, Royal Capital Throne", roomReach(IZZY).graph);
    expect(way.slice(0, 3)).toEqual([
      "Leyndell, Royal Capital Throne",
      "Leyndell, Royal Capital",
      "Capital Outskirts",
    ]);
    expect(way).toContain("Limgrave");
  });
});
