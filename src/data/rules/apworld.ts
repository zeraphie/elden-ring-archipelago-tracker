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

// Releases the tracker has moved on from, by checksum, so a notice can name them.
const PAST_RELEASES: ReadonlyMap<string, string> = new Map([
  ["c3ab8b33b4e26448022dd43b79b231082699e63b", "0.1.3"],
]);

/** A release's page, with its notes and downloads. */
export function apworldReleasePage(release: string): string {
  return `https://github.com/thefifthmatt/SoulsRandomizers/releases/tag/eldenring-ap-${release}`;
}

/** Whether the tracker can read a room's Elden Ring world, with the release when it's one it knows. */
export type ApworldSupport =
  | { readonly isSupported: true }
  | { readonly isSupported: false; readonly release: string | undefined };

/** Whether the tracker can read a room, by its Elden Ring data package checksum; a room with none has no Elden Ring slot to read wrongly. */
export function apworldSupportOf(checksum: string | undefined): ApworldSupport {
  return checksum === undefined || checksum === RULES_APWORLD.checksum
    ? { isSupported: true }
    : { isSupported: false, release: PAST_RELEASES.get(checksum) };
}
