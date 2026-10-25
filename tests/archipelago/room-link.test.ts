import { describe, expect, test } from "bun:test";
import {
  linkProblemMessage,
  readRoomLink,
  type LinkProblem,
} from "../../src/archipelago/room-link.js";

// A made-up id in the shape archipelago.gg gives rooms and trackers.
const ID = "q3Xh8sJm2PzK0tLw9RbVcA";
// Links the tracker can't follow, each with why.
const TURNED_AWAY: [string, LinkProblem][] = [
  ["", "not a link"],
  ["my room", "not a link"],
  ["hello", "not a link"],
  [`ftp://archipelago.gg/room/${ID}`, "not a link"],
  [`https://example.com/room/${ID}`, "another site"],
  [`https://archipelago.gg/seed/${ID}`, "not a room or tracker"],
  ["https://archipelago.gg/games", "not a room or tracker"],
  [`https://archipelago.gg/room/${ID}/extra`, "not a room or tracker"],
  [`https://archipelago.gg/generic_tracker/${ID}`, "not a room or tracker"],
  [`https://archipelago.gg/room/${ID.slice(0, 21)}`, "not an id"],
  ["https://archipelago.gg/room/q3Xh8sJm2PzK0tLw9RbVc!", "not an id"],
];

describe("readRoomLink", () => {
  test.each([
    `https://archipelago.gg/room/${ID}`,
    `http://archipelago.gg/room/${ID}`,
    `archipelago.gg/room/${ID}`,
    `  https://www.archipelago.gg/room/${ID}/  `,
    `https://archipelago.gg/room/${ID}?from=discord#top`,
  ])("reads %s as the room", (text) => {
    expect(readRoomLink(text)).toEqual({ link: { kind: "room", room: ID } });
  });

  test.each([
    `https://archipelago.gg/tracker/${ID}`,
    `https://archipelago.gg/tracker/${ID}/EldenRing`,
    `https://archipelago.gg/sphere_tracker/${ID}`,
  ])("reads %s as the room's tracker", (text) => {
    expect(readRoomLink(text)).toEqual({ link: { kind: "tracker", tracker: ID } });
  });

  test.each([
    `https://archipelago.gg/tracker/${ID}/0/1`,
    `https://archipelago.gg/generic_tracker/${ID}/0/1`,
  ])("reads %s as the tracker with the slot it shows", (text) => {
    expect(readRoomLink(text)).toEqual({
      link: { kind: "tracker", tracker: ID, team: 0, slot: 1 },
    });
  });

  test.each(TURNED_AWAY)("turns %p away: %s", (text, problem) => {
    expect(readRoomLink(text)).toMatchObject({ problem });
  });

  test("says which other site a link is to", () => {
    expect(readRoomLink(`https://example.com/room/${ID}`)).toEqual({
      problem: "another site",
      host: "example.com",
    });
  });
});

describe("linkProblemMessage", () => {
  const problems = [...new Set(TURNED_AWAY.map(([, problem]) => problem))];

  test.each(problems)("has something to say for %s", (problem) => {
    expect(linkProblemMessage({ problem }).length).toBeGreaterThan(0);
  });
});
