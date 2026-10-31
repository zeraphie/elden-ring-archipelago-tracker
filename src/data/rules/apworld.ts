/**
 * The Elden Ring apworld the rules are ported from: its release, and the Elden
 * Ring data package checksum its rooms carry.
 */
export const RULES_APWORLD = {
  release: "0.1.4",
  // Nothing tells a client a world's version, so a release is known by this: taken from a seed
  // generated on it, and the same in every room on it, whatever its options.
  checksum: "aa7fdd7568d86f91512f039e1b5e2a7228a61f7a",
} as const;

/** The supported release's page, with its notes and downloads. */
export const APWORLD_RELEASE_PAGE = `https://github.com/thefifthmatt/SoulsRandomizers/releases/tag/eldenring-ap-${RULES_APWORLD.release}`;

/** Whether the tracker can read a room, by its Elden Ring data package checksum; a room with none has no Elden Ring slot to read wrongly. */
export function isApworldSupported(checksum: string | undefined): boolean {
  return checksum === undefined || checksum === RULES_APWORLD.checksum;
}
