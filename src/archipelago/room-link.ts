/**
 * ─ Room link ─
 *
 * What a pasted archipelago.gg link leads to: a room, which the live tracker
 * connects to, or a tracker page, which leads only to the web API and so to
 * the reduced tracker. A player's tracker page also names the slot it shows.
 * Anything else is turned away with the reason why.
 */

/** A link the tracker can follow: a room by its id, or a tracker page by its id, with the slot a player's page shows. */
export type RoomLink =
  | { readonly kind: "room"; readonly room: string }
  | {
      readonly kind: "tracker";
      readonly tracker: string;
      readonly team?: number;
      readonly slot?: number;
    };

/** Why a link can't be followed. */
export type LinkProblem = "not a link" | "another site" | "not a room or tracker" | "not an id";

/** A pasted link, read: where it leads, or why it can't be followed. */
export type LinkReading =
  | { readonly link: RoomLink }
  | { readonly problem: LinkProblem; readonly host?: string };

const HOSTS = new Set(["archipelago.gg", "www.archipelago.gg"]);
// archipelago.gg's ids: a UUID's 16 bytes in URL-safe base64, unpadded.
const ID = /^[A-Za-z0-9_-]{22}$/;
const NUMBER = /^\d+$/;
const SCHEME = /^[a-z][a-z\d+.-]*:\/\//i;

/** Where a link pasted in leads, taken without its scheme too, or why it can't be followed. */
export function readRoomLink(text: string): LinkReading {
  const pasted = text.trim();
  const url = urlOf(SCHEME.test(pasted) ? pasted : `https://${pasted}`);
  if (url === undefined || !/^https?:$/.test(url.protocol) || !url.hostname.includes(".")) {
    return { problem: "not a link" };
  }
  if (!HOSTS.has(url.hostname)) {
    return { problem: "another site", host: url.hostname };
  }
  const [page = "", id = "", ...rest] = url.pathname.split("/").filter(Boolean);
  if (!isRoomOrTrackerPath(page, rest)) {
    return { problem: "not a room or tracker" };
  }
  if (!ID.test(id)) {
    return { problem: "not an id" };
  }
  if (page === "room") {
    return { link: { kind: "room", room: id } };
  }
  const [team, slot] = rest.length === 2 ? rest.map(Number) : [];
  return {
    link:
      team === undefined
        ? { kind: "tracker", tracker: id }
        : { kind: "tracker", tracker: id, team, slot },
  };
}

/** The room's own page on archipelago.gg, where a player wakes a sleeping room. */
export function roomPage(room: string): string {
  return `https://archipelago.gg/room/${room}`;
}

/** A link's own page on archipelago.gg: the room's, or the tracker's. */
export function linkPage(link: RoomLink): string {
  return link.kind === "room"
    ? roomPage(link.room)
    : `https://archipelago.gg/tracker/${link.tracker}`;
}

/** The link a page's address hands in as `?room=`, a whole link or a room's bare id; undefined without one. */
export function roomInQuery(search: string): string | undefined {
  const room = new URLSearchParams(search).get("room")?.trim();
  if (room === undefined || room === "") {
    return undefined;
  }
  return ID.test(room) ? roomPage(room) : room;
}

/** What to tell the person who pasted a link the tracker can't follow. */
export function linkProblemMessage(reading: {
  readonly problem: LinkProblem;
  readonly host?: string;
}): string {
  switch (reading.problem) {
    case "not a link":
      return "That isn't a link. Paste the address of your room on archipelago.gg, which looks like https://archipelago.gg/room/ and then its id.";
    case "another site":
      return `That link is to ${reading.host ?? "another site"}, not archipelago.gg. The tracker follows rooms hosted on archipelago.gg, so paste the room's link from there.`;
    case "not a room or tracker":
      return "That archipelago.gg page isn't a room or a tracker. Open your room there and paste its address, which has /room/ in it.";
    case "not an id":
      return "That link's id isn't one archipelago.gg makes, which is 22 letters, digits, dashes or underscores. Check the link wasn't cut short when it was copied.";
  }
}

// The routes archipelago.gg serves a room or a tracker on, by what follows the id.
function isRoomOrTrackerPath(page: string, rest: readonly string[]): boolean {
  switch (page) {
    case "room":
    case "sphere_tracker":
      return rest.length === 0;
    case "tracker":
      // The whole room, one game's view of it, or one player's.
      return rest.length <= 1 || (rest.length === 2 && rest.every((part) => NUMBER.test(part)));
    case "generic_tracker":
      return rest.length === 2 && rest.every((part) => NUMBER.test(part));
    default:
      return false;
  }
}

function urlOf(text: string): URL | undefined {
  try {
    return new URL(text);
  } catch {
    return undefined;
  }
}
