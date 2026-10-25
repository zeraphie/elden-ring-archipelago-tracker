import { describe, expect, test } from "bun:test";
import * as data from "../../../src/data/elden-ring.js";
import { mapOf } from "../../../src/state/utils/map.js";
import { firstCoded, inputs, SLOT_DATA } from "../../fixtures/slots.js";

// One Limgrave check and one Liurnia check, each given a tile on the surface sheet.
const LIMGRAVE = firstCoded("LG");
const LIURNIA = firstCoded("LL");
const PLACED_SLOT = {
  ...SLOT_DATA,
  locationIdsToKeys: {
    [LIMGRAVE]: "604038,0:0000000000::",
    [LIURNIA]: "603649,0:0000000000::",
  },
};

describe("mapOf", () => {
  test("lays out each placed check's tile, and each region's state from the start", () => {
    const map = mapOf(data, inputs({ slotData: PLACED_SLOT }));
    expect(
      map?.sheets
        .get("surface")
        ?.regions.map(({ region }) => region)
        .sort()
    ).toEqual(["LG", "LL"]);
    expect(map?.regions.get("LG")?.state).toBe("open");
    expect(map?.regions.get("LL")?.state).toBe("locked");
  });

  test("a region whose every key check is checked is done", () => {
    const map = mapOf(
      data,
      inputs({ slotData: PLACED_SLOT, keyChecks: new Set([LIURNIA]), checked: [LIURNIA] })
    );
    expect(map?.regions.get("LL")?.state).toBe("done");
  });

  test("a key check gets a pin on its tile, dimmed in a locked region, and other checks get none", () => {
    const map = mapOf(data, inputs({ slotData: PLACED_SLOT, keyChecks: new Set([LIURNIA]) }));
    expect(map?.pins.get("surface")?.map(({ ids, state }) => ({ ids, state }))).toEqual([
      { ids: [LIURNIA], state: "locked" },
    ]);
  });

  test("the same inputs give the same map back", () => {
    const same = inputs({ slotData: PLACED_SLOT });
    expect(mapOf(data, same)).toBe(mapOf(data, same));
  });

  test("slot_data that doesn't place its checks has no map", () => {
    expect(mapOf(data, inputs())).toBeUndefined();
  });
});
