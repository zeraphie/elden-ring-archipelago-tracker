import { regionName, shortRegionName } from "../../regions.js";

/** The underground's places by key: Siofra and Ainsel, the Eternal Cities, the Deeproot Depths and the Lake of Rot. */
export const UNDERGROUND_PLACES: ReadonlyMap<string, string> = new Map<string, string>([
  // Siofra River.
  ["SR/BW", "Below the Well"],
  ["SR/SRB", "Siofra River Bank"],
  ["SR/SRWD", "Siofra River Well Depths"],
  ["SR/WW", "Worshippers' Woods"],
  ["SR/(HG)", `${shortRegionName("SR")} Hallowhorn Grounds`],

  // Nokron, Eternal City.
  ["NR/AFC", "Aqueduct-Facing Cliffs"],
  ["NR/AW", "Ancestral Woods"],
  ["NR/HG", `${shortRegionName("NR")} Hallowhorn Grounds`],
  ["NR/LG", `${shortRegionName("NR")} from ${shortRegionName("LG")}`],
  ["NR/LL", regionName("LL")],
  ["NR/MT", "Mimic Tear"],
  ["NR/NEC", regionName("NR")],
  ["NR/SA", "Siofra Aqueduct"],
  ["NR/(HG)", `${shortRegionName("NR")} Hallowhorn Grounds`],
  ["NR/(NSG)", "Night's Sacred Ground"],
  ["NR/(SA)", "Siofra Aqueduct"],

  // Ainsel River and Ainsel River Main.
  ["AR/ARD", "Ainsel River Downstream"],
  ["AR/ARSG", "Ainsel River Sluice Gate"],
  ["AR/ARWD", "Ainsel River Well Depths"],
  ["AR/LR", regionName("LR")],
  ["AR/UPR", "Uhl Palace Ruins"],
  ["AR/(UPR)", "Uhl Palace Ruins"],
  ["ARM/ARM", regionName("ARM")],
  ["ARM/UPR", "Uhl Palace Ruins"],
  ["ARM/(UPR)", "Uhl Palace Ruins"],

  // Nokstella, Eternal City.
  ["NS/AR", regionName("AR")],
  ["NS/NEC", regionName("NS")],
  ["NS/NS", regionName("NS")],
  ["NS/NWB", "Nokstella Waterfall Basin"],

  // Deeproot Depths, where AR is Across the Roots, and NEC, in a description, Nokron.
  ["DD/AR", "Across the Roots"],
  ["DD/DD", regionName("DD")],
  ["DD/GWC", "Great Waterfall Crest"],
  ["DD/NEC", regionName("NR")],
  ["DD/PDT", "Prince of Death's Throne"],
  ["DD/RFC", "Root-Facing Cliffs"],
  ["DD/TNEC", "The Nameless Eternal City"],

  // The Lake of Rot.
  ["LR/GC", "Grand Cloister"],
  ["LR/LR", regionName("LR")],
  ["LR/LRS", "Lake of Rot Shoreside"],
]);
