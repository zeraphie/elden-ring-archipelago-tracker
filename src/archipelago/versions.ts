/**
 * ─ Versions ─
 *
 * Archipelago versions as a room gives them: the server's own, in its
 * RoomInfo, read with care and set beside the release the tracker is tested
 * against, which its own version names ("0.6.8+2" is tested against 0.6.8).
 */

import { clientVersion } from "./room-socket.js";
import { isRecord } from "./web-responses.js";

/** An Archipelago version, by its three numbers. */
export interface Version {
  readonly major: number;
  readonly minor: number;
  readonly build: number;
}

/** RoomInfo's version, read with care: it comes straight from the server, unchecked. */
export function serverVersionOf(info: { readonly version?: unknown }): Version | undefined {
  const { version } = info;
  if (!isRecord(version)) {
    return undefined;
  }
  const { major, minor, build } = version;
  return isWhole(major) && isWhole(minor) && isWhole(build) ? { major, minor, build } : undefined;
}

/** Whether a room's version is newer than the release the tracker is tested against, by its own version. */
export function isNewer(version: Version, tracker: string): boolean {
  const tested = clientVersion(tracker);
  const order = [
    version.major - tested.major,
    version.minor - tested.minor,
    version.build - tested.build,
  ];
  return (order.find((difference) => difference !== 0) ?? 0) > 0;
}

/** A version as a person reads it: "0.6.8". */
export function versionText({ major, minor, build }: Version): string {
  return `${major}.${minor}.${build}`;
}

function isWhole(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}
