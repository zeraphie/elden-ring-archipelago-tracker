/**
 * ─ Version notice ─
 *
 * Whether the room runs on an Archipelago newer than the release the tracker
 * is tested against, as the login says, which can mean it misreads something.
 */

import { clientVersion } from "../../archipelago/room-socket.js";
import { isNewer, versionText } from "../../archipelago/versions.js";
import type { TrackerState } from "../store.js";

/** What the room has that the tracker isn't sure of: a newer Archipelago, with both versions. */
export interface VersionNotice {
  readonly room: string;
  readonly tested: string;
}

/** What telling the room's versions reads, in the store. */
export type VersionInputs = Pick<TrackerState, "serverVersion">;

/** What the room has that the tracker isn't sure of, by the tracker's own version; none when all is as tested. */
export function versionNoticesOf(
  { serverVersion }: VersionInputs,
  tracker: string
): VersionNotice[] {
  return serverVersion !== undefined && isNewer(serverVersion, tracker)
    ? [{ room: versionText(serverVersion), tested: versionText(clientVersion(tracker)) }]
    : [];
}
