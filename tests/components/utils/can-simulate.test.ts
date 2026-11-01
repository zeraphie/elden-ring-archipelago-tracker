import { describe, expect, test } from "bun:test";
import { DEMO_LINK, type RoomLink } from "../../../src/archipelago/room-link.js";
import { canSimulate } from "../../../src/components/utils/can-simulate.js";

const ID = "q3Xh8sJm2PzK0tLw9RbVcA";
const ROOM: RoomLink = { kind: "room", room: ID };
const TRACKER: RoomLink = { kind: "tracker", tracker: ID };

describe("canSimulate", () => {
  test("never lets a real room on the built site have the buttons", () => {
    expect(canSimulate(ROOM, false)).toBe(false);
    expect(canSimulate(TRACKER, false)).toBe(false);
  });

  test("lets a demo have them on the built site", () => {
    expect(canSimulate(DEMO_LINK, false)).toBe(true);
  });

  test("lets any room have them in a development build", () => {
    expect(canSimulate(ROOM, true)).toBe(true);
    expect(canSimulate(TRACKER, true)).toBe(true);
    expect(canSimulate(DEMO_LINK, true)).toBe(true);
  });
});
