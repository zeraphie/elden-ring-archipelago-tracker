/**
 * ─ Web API ─
 *
 * Asks archipelago.gg's web API, which answers any origin, for a room's
 * status, its static tracker, a game's data package, slot_data and the
 * tracker, and reads each answer into its typed shape. A room or tracker that
 * isn't there, a request that gets no answer, and an answer in the wrong shape
 * each fail with a WebApiError saying which.
 */

import {
  readDataPackage,
  readRoomStatus,
  readSlotData,
  readStaticTracker,
  readTracker,
  WebApiError,
  type DataPackage,
  type RoomStatus,
  type SlotData,
  type StaticTracker,
  type TrackerData,
} from "./web-responses.js";

/** How a request is sent: the browser's fetch, or one a test hands in. */
export type Fetcher = (url: string) => Promise<Response>;

const ORIGIN = "https://archipelago.gg";

/** A room's status, by room id. */
export async function getRoomStatus(room: string, fetcher: Fetcher = fetch): Promise<RoomStatus> {
  return readRoomStatus(await getJson(`/api/room_status/${room}`, fetcher));
}

/** A room's static tracker, by tracker id: the checksums its data packages are fetched by. */
export async function getStaticTracker(
  tracker: string,
  fetcher: Fetcher = fetch
): Promise<StaticTracker> {
  return readStaticTracker(await getJson(`/api/static_tracker/${tracker}`, fetcher));
}

/** A game's data package, by its checksum: the game's item and location names. */
export async function getDataPackage(
  checksum: string,
  fetcher: Fetcher = fetch
): Promise<DataPackage> {
  return readDataPackage(await getJson(`/api/datapackage/${checksum}`, fetcher));
}

/** Each slot's slot_data, by tracker id. */
export async function getSlotData(tracker: string, fetcher: Fetcher = fetch): Promise<SlotData[]> {
  return readSlotData(await getJson(`/api/slot_data_tracker/${tracker}`, fetcher));
}

/** A room's tracker, by tracker id: what each slot has received, checked and hinted. */
export async function getTracker(tracker: string, fetcher: Fetcher = fetch): Promise<TrackerData> {
  return readTracker(await getJson(`/api/tracker/${tracker}`, fetcher));
}

// The answer to a GET of this path, as JSON.
async function getJson(path: string, fetcher: Fetcher): Promise<unknown> {
  let response: Response;
  try {
    response = await fetcher(`${ORIGIN}${path}`);
  } catch {
    throw new WebApiError("unreachable", path);
  }
  if (response.status === 404) {
    throw new WebApiError("not found", path);
  }
  if (!response.ok) {
    throw new WebApiError("unreachable", path);
  }
  try {
    return await response.json();
  } catch {
    throw new WebApiError("unexpected", path);
  }
}
