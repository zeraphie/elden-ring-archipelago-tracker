import { describe, expect, test } from "bun:test";
import type { DataPackage } from "../../../src/archipelago/web-responses.js";
import type { RosterEntry } from "../../../src/state/slices/roster.js";
import { findingsOf } from "../../../src/state/utils/findings.js";
import { inputs, PACKAGES } from "../../fixtures/slots.js";

// Sam, slot 2, plays a game whose package names its item 77.
const SAM: RosterEntry = {
  team: 0,
  slot: 2,
  name: "Sam",
  game: "Ocarina",
  checksDone: 0,
  total: undefined,
  status: 0,
  lastActive: undefined,
};
const WITH_SAMS_GAME = new Map<string, DataPackage>([
  ...PACKAGES,
  [
    "Ocarina",
    { checksum: "oot", itemNames: new Map([[77, "Hookshot"]]), locationNames: new Map() },
  ],
]);
const item = (id: number, location: number, player: number, flags = 0) => ({
  item: id,
  location,
  player,
  flags,
});

describe("findingsOf", () => {
  test("an item this slot found in its own world is found at its location, named by its package", () => {
    const findings = findingsOf(inputs({ received: [{ value: item(1, 500, 1, 1) }] }));
    expect(findings.get(500)).toEqual({ item: "Rusty Key", to: undefined });
  });

  test("an item another player found for this slot isn't one of this slot's checks", () => {
    const findings = findingsOf(inputs({ received: [{ value: item(1, 500, 2) }] }));
    expect(findings.has(500)).toBe(false);
  });

  test("an item sent to another player is named by their game's package, with them", () => {
    const findings = findingsOf(
      inputs({
        sent: [{ value: { item: item(77, 600, 1), receiving: 2 } }],
        roster: [SAM],
        packages: WITH_SAMS_GAME,
      })
    );
    expect(findings.get(600)).toEqual({
      item: "Hookshot",
      to: { slot: 2, name: "Sam" },
    });
  });

  test("an item its game's package doesn't name, or a receiver the roster doesn't know, is left unnamed", () => {
    const findings = findingsOf(
      inputs({ sent: [{ value: { item: item(77, 600, 1), receiving: 3 } }] })
    );
    expect(findings.get(600)).toEqual({
      item: undefined,
      to: { slot: 3, name: undefined },
    });
  });

  test("the same inputs give the same findings back", () => {
    const same = inputs({ received: [{ value: item(1, 500, 1) }] });
    expect(findingsOf(same)).toBe(findingsOf(same));
  });
});
