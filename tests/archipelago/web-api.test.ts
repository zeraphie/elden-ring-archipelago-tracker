import { describe, expect, test } from "bun:test";
import {
  getDataPackage,
  getRoomStatus,
  getSlotData,
  getStaticTracker,
  getTracker,
  type Fetcher,
} from "../../src/archipelago/web-api.js";
import fixture from "../fixtures/web-api.json";

const ROOM = "q3Xh8sJm2PzK0tLw9RbVcA";

// A fetch that answers every request with this body and status, and remembers what was asked.
function answering(body: unknown, status = 200) {
  const asked: string[] = [];
  const fetcher: Fetcher = (url) => {
    asked.push(url);
    const text = typeof body === "string" ? body : JSON.stringify(body);
    return Promise.resolve(new Response(text, { status }));
  };
  return { asked, fetcher };
}

describe("the web API", () => {
  test("asks archipelago.gg's routes for each answer and reads it", async () => {
    const room = answering(fixture.room_status);
    expect((await getRoomStatus(ROOM, room.fetcher)).lastPort).toBe(61475);
    const staticTracker = answering(fixture.static_tracker);
    expect((await getStaticTracker(ROOM, staticTracker.fetcher)).totals[0]?.total).toBe(3765);
    const dataPackage = answering(fixture.datapackage);
    expect((await getDataPackage("c3ab8b", dataPackage.fetcher)).itemNames.size).toBe(3);
    const slotData = answering(fixture.slot_data_tracker);
    expect((await getSlotData(ROOM, slotData.fetcher))[0]?.player).toBe(1);
    const tracker = answering(fixture.tracker);
    expect((await getTracker(ROOM, tracker.fetcher)).totalChecksDone[0]?.checksDone).toBe(185);
    expect([
      ...room.asked,
      ...staticTracker.asked,
      ...dataPackage.asked,
      ...slotData.asked,
      ...tracker.asked,
    ]).toEqual([
      `https://archipelago.gg/api/room_status/${ROOM}`,
      `https://archipelago.gg/api/static_tracker/${ROOM}`,
      "https://archipelago.gg/api/datapackage/c3ab8b",
      `https://archipelago.gg/api/slot_data_tracker/${ROOM}`,
      `https://archipelago.gg/api/tracker/${ROOM}`,
    ]);
  });

  test("a room that isn't there fails as not found", async () => {
    const missing = answering("<h1>Not Found</h1>", 404);
    await expect(getRoomStatus(ROOM, missing.fetcher)).rejects.toMatchObject({
      problem: "not found",
    });
  });

  test("a request with no answer, or a server error, fails as unreachable", async () => {
    const offline: Fetcher = () => Promise.reject(new TypeError("Failed to fetch"));
    await expect(getRoomStatus(ROOM, offline)).rejects.toMatchObject({ problem: "unreachable" });
    const broken = answering("oops", 500);
    await expect(getRoomStatus(ROOM, broken.fetcher)).rejects.toMatchObject({
      problem: "unreachable",
    });
  });

  test("an answer that isn't JSON fails as unexpected", async () => {
    const page = answering("<html></html>");
    await expect(getRoomStatus(ROOM, page.fetcher)).rejects.toMatchObject({
      problem: "unexpected",
    });
  });
});
