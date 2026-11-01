import { describe, expect, test } from "bun:test";
import { DEMO_LINK, type RoomLink } from "../../../../src/archipelago/room-link.js";
import { liveState } from "../../../../src/components/organisms/header/header-words.js";
import type { ConnectionPhase } from "../../../../src/state/slices/connection.js";

const CONNECTED: ConnectionPhase = { phase: "connected", port: 38281 };
const ROOM: RoomLink = { kind: "room", room: "q3Xh8sJm2PzK0tLw9RbVcA" };

describe("liveState", () => {
  test("keeps a demo looking live, in words of its own", () => {
    const demo = liveState(CONNECTED, DEMO_LINK);
    const room = liveState(CONNECTED, ROOM);
    expect(demo?.kind).toBe("live");
    expect(demo?.text).not.toBe(room?.text);
  });

  test("still says when a demo isn't connected", () => {
    expect(liveState({ phase: "unreachable" }, DEMO_LINK)?.kind).toBe("trouble");
  });

  test("says nothing on a tracker link reading the web API", () => {
    const phase: ConnectionPhase = { phase: "web only", unavailable: [] };
    expect(
      liveState(phase, { kind: "tracker", tracker: "q3Xh8sJm2PzK0tLw9RbVcA" })
    ).toBeUndefined();
  });
});
