/**
 * ─ Archipelago release ─
 *
 * Whether Archipelago has a release newer than the one the tracker is tested
 * against, which package.json's version names ("0.6.8+2" is tested against
 * 0.6.8). The weekly workflow runs it, and opens an issue when there is. It
 * asks GitHub for the latest release and writes what it found as the step's
 * outputs; a tag in a form it can't read fails the run rather than pass it.
 */

import { isRecord } from "../src/archipelago/web-responses.js";
import { clientVersion } from "../src/archipelago/room-socket.js";
import { isNewer, versionText, type Version } from "../src/archipelago/versions.js";
import { version as trackerVersion } from "../package.json";

/** Where GitHub's API gives Archipelago's latest release, pre-releases left out. */
export const LATEST_RELEASE_URL =
  "https://api.github.com/repos/ArchipelagoMW/Archipelago/releases/latest";

/** A release's version, from its tag such as "0.6.8"; undefined for a tag in any other form. */
export function releaseVersion(tag: string): Version | undefined {
  return /^\d+\.\d+\.\d+$/.test(tag) ? clientVersion(tag) : undefined;
}

/**
 * The watch's step outputs, one `name=value` to a line: the latest release,
 * the release the tracker is tested against, and whether the latest is newer.
 *
 * @throws Error for a tag not in the form "0.6.8", so the run fails where a person sees it.
 */
export function watchOutputs(tag: string, tracker: string): string {
  const latest = releaseVersion(tag);
  if (latest === undefined) {
    throw new Error(`A release tag such as 0.6.8 was expected, and "${tag}" came.`);
  }
  return [
    `latest=${versionText(latest)}`,
    `tested=${versionText(clientVersion(tracker))}`,
    `newer=${isNewer(latest, tracker)}`,
    "",
  ].join("\n");
}

if (import.meta.main) {
  // The runner's own token, where it's given, so the shared runners don't meet the API's limit for strangers.
  const token = process.env["GH_TOKEN"];
  const response = await fetch(LATEST_RELEASE_URL, {
    headers: {
      accept: "application/vnd.github+json",
      ...(token === undefined || token === "" ? {} : { authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    throw new Error(
      `GitHub answered ${response.status} for Archipelago's latest release, at ${LATEST_RELEASE_URL}.`
    );
  }
  const release: unknown = await response.json();
  const tag =
    isRecord(release) && typeof release["tag_name"] === "string" ? release["tag_name"] : "";
  process.stdout.write(watchOutputs(tag, trackerVersion));
}
