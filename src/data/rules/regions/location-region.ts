import { LOCATION_GROUPS } from "../../checks/location-groups.js";

/**
 * The region a location sits in, so a rule that asks for a location is decided
 * by whether that region is reached. The apworld makes a region of each
 * location table, so this is the table it's listed in; undefined for a name
 * the apworld doesn't list.
 */
export function regionOf(location: string): string | undefined {
  return LOCATION_GROUPS.get(location)?.region;
}
