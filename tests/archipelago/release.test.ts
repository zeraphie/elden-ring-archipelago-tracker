import { describe, expect, test } from "bun:test";
import { releaseAfterGoal, releasePermissionOf } from "../../src/archipelago/release.js";

describe("releasePermissionOf", () => {
  test("reads RoomInfo's release permission", () => {
    expect(releasePermissionOf({ permissions: { release: 2, collect: 2, remaining: 1 } })).toBe(2);
  });

  test("is undefined for a RoomInfo without one, or with one in another shape", () => {
    expect(releasePermissionOf({})).toBeUndefined();
    expect(releasePermissionOf({ permissions: null })).toBeUndefined();
    expect(releasePermissionOf({ permissions: { release: "goal" } })).toBeUndefined();
  });
});

describe("releaseAfterGoal", () => {
  test("a room that releases on the goal by itself has released", () => {
    expect(releaseAfterGoal(6, false)).toBe("released");
    expect(releaseAfterGoal(7, false)).toBe("released");
  });

  test("a room that lets the slot release, any time or after its goal, leaves it to the slot", () => {
    expect(releaseAfterGoal(1, false)).toBe("can release");
    expect(releaseAfterGoal(2, false)).toBe("can release");
  });

  test("a room with release disabled leaves it to the admin", () => {
    expect(releaseAfterGoal(0, false)).toBe("admin only");
  });

  test("a release the room announced holds, whatever the permission", () => {
    expect(releaseAfterGoal(0, true)).toBe("released");
    expect(releaseAfterGoal(undefined, true)).toBe("released");
  });

  test("with no login to say the permission, it isn't known", () => {
    expect(releaseAfterGoal(undefined, false)).toBe("unknown");
  });
});
