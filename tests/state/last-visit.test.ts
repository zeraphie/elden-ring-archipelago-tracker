import { describe, expect, test } from "bun:test";
import { forgetVisit, lastVisit, rememberVisit, type Visit } from "../../src/state/last-visit.js";
import { memory } from "../fixtures/stores.js";

const VISIT: Visit = {
  link: { kind: "room", room: "q3Xh8sJm2PzK0tLw9RbVcA" },
  team: 0,
  player: 1,
  name: "Tarnished",
  needsPassword: true,
};

describe("the last visit", () => {
  test("is read back as it was kept, until it's forgotten", async () => {
    const storage = memory();
    expect(await lastVisit(storage)).toBeUndefined();
    await rememberVisit(VISIT, storage);
    expect(await lastVisit(storage)).toEqual(VISIT);
    await forgetVisit(storage);
    expect(await lastVisit(storage)).toBeUndefined();
  });

  test("keeps whether the room needed a password, and never a password", async () => {
    const storage = memory();
    await rememberVisit({ ...VISIT, password: "secret" } as Visit, storage);
    expect([...storage.items.values()].join()).not.toContain("secret");
  });

  test("anything else under its name reads as no visit", async () => {
    for (const kept of ["not json", "null", '{"link":{"kind":"room"},"team":0}', "[]"]) {
      const storage = memory();
      storage.items.set("last visit", kept);
      expect(await lastVisit(storage)).toBeUndefined();
    }
  });
});
