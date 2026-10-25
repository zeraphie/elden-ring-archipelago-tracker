import { describe, expect, test } from "bun:test";
import { LOCATION_GROUPS } from "../../../src/data/checks/location-groups.js";
import { checkName } from "../../../src/data/names/check-name.js";
import { keySpot } from "../../../src/data/names/key-spots.js";
import { readLocationName } from "../../../src/data/names/location-name.js";
import { expandPlaces, PLACE_EXCEPTIONS, placeName } from "../../../src/data/names/place-names.js";
import { regionName } from "../../../src/data/names/regions.js";

// The first location the apworld lists that has no hand-written name, with or without a place code.
const unnamed = (hasPlace: boolean): string => {
  const found = [...LOCATION_GROUPS.keys()].find(
    (name) =>
      keySpot(name) === undefined &&
      readLocationName(name) !== undefined &&
      (readLocationName(name)?.placeKey !== undefined) === hasPlace
  );
  if (found === undefined) {
    throw new Error("No such location");
  }
  return found;
};

describe("checkName", () => {
  test("a key spot reads by its hand-written name", () => {
    const name = "LG/(SE): Aspects of the Crucible: Tail - boss drop Evergaol";
    expect(checkName(name)).toEqual(keySpot(name) ?? { place: "", encounter: "" });
  });

  test("any other spot is its place code's name, then where it is, its codes named", () => {
    const name = unnamed(true);
    const read = readLocationName(name);
    expect(checkName(name)).toEqual({
      place: placeName(read?.placeKey ?? ""),
      encounter: expandPlaces(read?.description ?? "", read?.regions ?? []),
    });
  });

  test("a spot its code places wrongly is named by the place it's in", () => {
    const [location, key] = [...PLACE_EXCEPTIONS][0] ?? ["", ""];
    expect(checkName(location).place).toBe(placeName(key));
  });

  test("a spot with no place code is placed by its region", () => {
    const name = unnamed(false);
    const read = readLocationName(name);
    expect(checkName(name)).toEqual({
      place: regionName(read?.regions[0] ?? ""),
      encounter: expandPlaces(read?.description ?? "", read?.regions ?? []),
    });
  });

  test("a name in no form the tracker reads is its own place, with no encounter", () => {
    expect(checkName("Somewhere new")).toEqual({ place: "Somewhere new", encounter: "" });
  });
});
