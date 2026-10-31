import type { VersionNotice } from "../../../state/utils/version-notice.js";

/** What a version notice says: what differs from what the tracker is sure of, and what it might mean. */
export function noticeLine({ room, tested }: VersionNotice): string {
  return `This room runs Archipelago ${room}, newer than the ${tested} the tracker is tested against. If something here looks wrong, that may be why.`;
}
