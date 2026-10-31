import { describe, expect, test } from "bun:test";
import { dlcEntrances } from "../../../../src/data/rules/gates/dlc-rules.js";
import { regionGraph } from "../../../../src/data/rules/regions/region-graph.js";
import { PRESETS } from "../../../fixtures/presets.js";
import {
  all,
  any,
  area,
  count,
  item,
  location,
  needsFor,
  opens,
  type Options,
} from "../../../fixtures/rooms.js";

const IZZY: Options = PRESETS["Izzy's preset"];
const DEFAULT: Options = PRESETS.Default;
const LONG: Options = PRESETS["[Long]"];
const DLC_ONLY: Options = PRESETS["[Short] DLC Only"];
const MEDIUM: Options = PRESETS["[Medium]"];
const TOGETHER: Options = { ...IZZY, seperate_imbued_key: 0 };
const CHAPEL = "The Four Belfries (Chapel of Anticipation)";
// Izzy's way into Liurnia: region lock, with early legacy dungeons on.
const TO_LIURNIA = ["Liurnia Lock", "Rusty Key"];

describe("the DLC's rules", () => {
  test("with the keys split, each belfry and Rauh's limited ruins take a key of their own", () => {
    const needed = (region: string): unknown =>
      dlcEntrances(IZZY).find(([name]) => name === region)?.[1];
    expect(needed(CHAPEL)).toEqual({ kind: "item", item: "Chapel Sword Key" });
    expect(needed("The Four Belfries (Nokron)")).toEqual({
      kind: "item",
      item: "Eternal Sword Key",
    });
    expect(needed("The Four Belfries (Farum Azula)")).toEqual({
      kind: "item",
      item: "Crumbling Sword Key",
    });
    expect(opens(CHAPEL, IZZY, ...TO_LIURNIA, "Chapel Sword Key")).toBe(true);
    expect(needsFor("Rauh Ruins Limited", DLC_ONLY)).toEqual(
      any(item("Ancient Sword Key"), area("Ancient Ruins of Rauh"))
    );
    expect(needsFor("Rauh Ruins Limited", IZZY)).toEqual(
      any(item("Ancient Sword Key"), area("Ancient Ruins of Rauh"))
    );
  });

  test("with the keys together and the DLC on, the Four Belfries take four Imbued Sword Keys", () => {
    expect(opens(CHAPEL, TOGETHER, ...TO_LIURNIA, ["Imbued Sword Key", 4])).toBe(true);
    expect(needsFor(CHAPEL, TOGETHER, ...TO_LIURNIA, ["Imbued Sword Key", 3])).toEqual(
      count("Imbued Sword Keys", 3, 4)
    );
  });

  test("with the DLC off, the Four Belfries take three, and none of the DLC's other rules apply", () => {
    const medium: Options = { ...MEDIUM, seperate_imbued_key: 0 };
    expect(opens(CHAPEL, medium, ...TO_LIURNIA, ["Imbued Sword Key", 3])).toBe(true);
    expect(dlcEntrances(MEDIUM).map(([region]) => region)).toEqual([
      CHAPEL,
      "The Four Belfries (Nokron)",
      "The Four Belfries (Farum Azula)",
    ]);
    expect(regionGraph(MEDIUM).regions.has("Enir-Ilim")).toBe(false);
  });

  test("with the keys together, Rauh's limited ruins take four, or one with the DLC alone, or the way round", () => {
    const aroundRauh = area("Ancient Ruins of Rauh");
    expect(needsFor("Rauh Ruins Limited", TOGETHER)).toEqual(
      any(count("Imbued Sword Keys", 0, 4), aroundRauh)
    );
    expect(needsFor("Rauh Ruins Limited", { ...DLC_ONLY, seperate_imbued_key: 0 })).toEqual(
      any(count("Imbued Sword Keys", 0, 1), aroundRauh)
    );
  });

  test("Enir-Ilim takes Messmer's Kindling, or enough of its shards where the room splits it", () => {
    expect(needsFor("Enir-Ilim", IZZY)).toEqual(item("Messmer's Kindling"));
    expect(needsFor("Enir-Ilim", DEFAULT, "Messmer's Kindling")).toEqual(
      count("Messmer's Kindling Shards", 0, 3)
    );
  });

  test("with spiritspring stones, Scadu Altus also takes the Fort of Reprimand's stone or Rellana beaten", () => {
    const lock = "Ensis & Scadu Altus Lock";
    expect(needsFor("Scadu Altus", LONG, lock)).toEqual(
      any(
        item("Fort of Reprimand Spiritspring Stone"),
        location("CE/CLC: Remembrance of the Twin Moon Knight - mainboss drop")
      )
    );
    expect(needsFor("Scadu Altus", IZZY, lock)).toBeUndefined();
  });

  test("under soft logic, Jagged Peak waits for Belurat, Ellac River or Castle Ensis", () => {
    expect(needsFor("Jagged Peak Foot", IZZY, "Jagged Peak Lock")).toEqual(
      any(area("Belurat"), area("Ellac River"), area("Castle Ensis"))
    );
    expect(needsFor("Jagged Peak Foot", { ...IZZY, soft_logic: 0 }, "Jagged Peak Lock")).toBe(
      undefined
    );
  });

  test("the swamp opens with the Well Depths Key, or from Enir-Ilim above", () => {
    expect(needsFor("Belurat Swamp", IZZY, "Belurat Lock")).toEqual(
      any(item("Well Depths Key"), area("Enir-Ilim"))
    );
  });

  test("the Hinterland, Manus Metyr and the gaol take their keys", () => {
    expect(needsFor("Hinterland", IZZY)).toEqual(item("O Mother"));
    expect(needsFor("Cathedral of Manus Metyr", IZZY)).toEqual(
      all(item("Hole-Laden Necklace"), area("Finger Ruins of Rhia"), area("Finger Ruins of Dheo"))
    );
    expect(needsFor("Lamenter's Gaol (Upper)", IZZY)).toEqual(item("Gaol Upper Level Key"));
    expect(needsFor("Lamenter's Gaol (Lower)", IZZY)).toEqual(item("Gaol Lower Level Key"));
  });
});
