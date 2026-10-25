/**
 * ─ Version notice ─
 *
 * Whether the room runs on, or was made by, something the tracker isn't sure
 * of: an Archipelago newer than the release it's tested against, as the login
 * says, or an Elden Ring apworld other than the one its rules are ported
 * from, as slot_data says. Either can mean the tracker misreads something.
 */

import { readSlotVersions } from "../../archipelago/elden-ring-slot.js";
import { clientVersion } from "../../archipelago/room-socket.js";
import { isNewer, versionText } from "../../archipelago/versions.js";
import { RULES_APWORLD } from "../../data/rules/apworld.js";
import type { TrackerState } from "../store.js";

/** What the room has that the tracker isn't sure of: a newer Archipelago, or another apworld, each with both versions. */
export type VersionNotice =
  | { readonly kind: "archipelago"; readonly room: string; readonly tested: string }
  | { readonly kind: "apworld"; readonly room: string; readonly rules: string };

/** What telling the room's versions reads, in the store. */
export type VersionInputs = Pick<TrackerState, "serverVersion" | "slotData">;

/** What the room has that the tracker isn't sure of, by the tracker's own version; none when all is as tested. */
export function versionNoticesOf(
  { serverVersion, slotData }: VersionInputs,
  tracker: string
): VersionNotice[] {
  const notices: VersionNotice[] = [];
  if (serverVersion !== undefined && isNewer(serverVersion, tracker)) {
    notices.push({
      kind: "archipelago",
      room: versionText(serverVersion),
      tested: versionText(clientVersion(tracker)),
    });
  }
  const versions = slotData === undefined ? undefined : readSlotVersions(slotData);
  if (versions !== undefined && versions !== RULES_APWORLD.versions) {
    notices.push({ kind: "apworld", room: versions, rules: RULES_APWORLD.release });
  }
  return notices;
}
