import { describe, expect, test } from "bun:test";
import { regionSourceFrom } from "../../tools/write-region-graph.js";

// A create_regions and region orders in the apworld's own shape.
const INIT = `
class EldenRing:
    def create_regions(self) -> None:
        def create_connection(from_region: str, to_region: str):
            pass

        if self.options.enable_dlc and self.options.dlc_start != 0:
            if self.options.dlc_start == 1: create_connection("Gravesite Plain", "Roundtable Hold DLC Only")
            else: create_connection("Gravesite Plain", "Roundtable Hold")
        else:
            create_connection("Limgrave", "Roundtable Hold")

        if self.base_enabled:
            create_connection("Limgrave", "Stormhill")
            # create_connection("Limgrave", "Cut Region")
            if (self.options.dlc_timing == 2
                or not something):
                create_connection("Consecrated Snowfield", "Mohgwyn Palace")
            else:
                create_connection("Limgrave", "Mohgwyn Palace")

        if self.options.enable_dlc:
            create_connection("Gravesite Plain", "Belurat")

    def create_region(self, name):
        pass
`;
const REGION_NAMES = `
region_order = [
    "Limgrave",
    "Stormhill",
]

region_order_dlc = [
    "Gravesite Plain",
]
`;

describe("regionSourceFrom", () => {
  test("splits the always-on connections by their half of the game", () => {
    const source = regionSourceFrom(INIT, REGION_NAMES);
    expect(source.baseConnections).toEqual([["Limgrave", "Stormhill"]]);
    expect(source.dlcConnections).toEqual([["Gravesite Plain", "Belurat"]]);
    expect(source.baseRegions).toEqual(["Limgrave", "Stormhill"]);
    expect(source.dlcRegions).toEqual(["Gravesite Plain"]);
  });

  test("stops when the regions aren't there", () => {
    expect(() => regionSourceFrom(INIT, "nothing here")).toThrow();
  });

  test("stops at a connection under a condition it doesn't port", () => {
    const changed = INIT.replace(
      '            create_connection("Limgrave", "Stormhill")',
      '            if self.options.soft_logic:\n                create_connection("Limgrave", "Stormhill")'
    );
    expect(() => regionSourceFrom(changed, REGION_NAMES)).toThrow("Stormhill");
  });
});
