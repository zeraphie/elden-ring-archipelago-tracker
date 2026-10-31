/**
 * ─ Check names ─
 *
 * A check's full name, from its Archipelago location name: where it is, and
 * the encounter or object there. A key spot with a hand-written name reads
 * by it. Any other reads from its Archipelago name: the place by its code's
 * full name, or the region's where the name has no place code, and then
 * where the spot is, compass points spelled out and its place codes named.
 */

import { keySpot, type KeySpot } from "./key-spots.js";
import { readLocationName, withoutExtra } from "./location-name.js";
import { descriptionNames, expandPlaces, placeName } from "./place-names.js";
import { regionName } from "./regions.js";

/** A check's full name, by its Archipelago location name; a name in no form the tracker reads is its own place. */
export function checkName(locationName: string): KeySpot {
  const spot = keySpot(locationName);
  if (spot !== undefined) {
    return spot;
  }
  const read = readLocationName(locationName);
  if (read === undefined) {
    return { place: locationName, encounter: "" };
  }
  const { base } = withoutExtra(locationName);
  const { placeKey } = read;
  const place = placeKey === undefined ? regionName(read.regions[0] ?? "") : placeName(placeKey);
  return {
    place,
    encounter: expandPlaces(read.description, read.regions, descriptionNames(base)),
  };
}
