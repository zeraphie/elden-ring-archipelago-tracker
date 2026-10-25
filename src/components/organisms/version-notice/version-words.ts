import type { VersionNotice } from "../../../state/utils/version-notice.js";

/** What a version notice says: what differs from what the tracker is sure of, and what it might mean. */
export function noticeLine(notice: VersionNotice): string {
  switch (notice.kind) {
    case "archipelago":
      return `This room runs Archipelago ${notice.room}, newer than the ${notice.tested} the tracker is tested against. If something here looks wrong, that may be why.`;
    case "apworld":
      return `This room was made with an Elden Ring world for versions ${notice.room}, while the tracker's rules come from ${notice.rules}. Areas may open differently from how they show here.`;
  }
}
