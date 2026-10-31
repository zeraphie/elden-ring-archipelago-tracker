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
  // Izzy's preset with what the rule tests lean on switched on: a harder way into Liurnia, Caelid
  // and Altus, and two great runes for Leyndell, which the preset itself has since dropped to one.
  "Early legacy dungeons": {
    ...fixture.presets["Izzy's preset"],
    early_legacy_dungeons: 1,
    great_runes_required_leyndell: 2,
  },
  "[Very Long] All Bosses": ALL_BOSSES_OPTIONS as unknown as PresetOptions,
};
