// Shared by the tests that read each preset's rules: the options of each
// preset's seed, by preset. The All Bosses preset's are kept in src, where the
// development build's Simulate takes them too.
import { ALL_BOSSES_OPTIONS } from "../../src/data/presets/all-bosses.js";
import fixture from "./presets.json";

// A preset's options as the fixture gives them, which the All Bosses preset's are a superset of.
type PresetOptions = (typeof fixture.presets)["Izzy's preset"];

/** Each preset's rules options, by its name. */
export const PRESETS = {
  ...fixture.presets,
  "[Very Long] All Bosses": ALL_BOSSES_OPTIONS as unknown as PresetOptions,
};
