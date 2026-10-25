/**
 * ─ Elden Ring data ─
 *
 * What the page reads from the Elden Ring data, in one place, so it's built
 * as a file of its own and loaded while the room loads, as a part of the
 * loader, rather than carried in the page's own code. The page takes it only
 * through the setup's loading of this module, never by a plain import.
 */

export { bossIcon, needIcon } from "./bosses/boss-icons.js";
export { BOSSES } from "./bosses/bosses.js";
export { bossDropping } from "./bosses/goal.js";
export { goalMenu, goalNeedOf, needKey } from "./bosses/goal-menu.js";
export { keyChecks } from "./checks/key-checks.js";
export { mapPins } from "./checks/map-pins.js";
export { placedLocations, sheetTiles } from "./checks/map-tiles.js";
export { checkName } from "./names/check-name.js";
export { readLocationName } from "./names/location-name.js";
export { regionName, shortRegionName } from "./names/regions.js";
export { firstToDo, regionGroups, regionSummaries } from "./rules/region-summary.js";
export { describeNeed } from "./rules/rules.js";
