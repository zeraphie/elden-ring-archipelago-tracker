/*! Region codes and names from the Elden Ring apworld 0.1.4 and its region guide, Copyright (c) 2026 Bedrock, under its Modified MIT License, in src/data/apworld-licence.txt. */

/**
 * ─ Regions ─
 *
 * The code every Elden Ring location name starts with, and the region's full
 * name. The names are the region guide's, spelled as the game spells them.
 * The guide leaves seven codes out; their names come from the apworld's own
 * tables and the places its names describe. A region's short name, the main
 * word of its full name or what players call it, stands in for it inside a
 * compound such as "Liurnia from Stormveil".
 */

/** Each region code a location name can start with, and its full name: base game first, then the DLC. */
export const REGION_NAMES: ReadonlyMap<string, string> = new Map([
  ["LG", "Limgrave"],
  ["RH", "Roundtable Hold"],
  ["SV", "Stormveil Castle"],
  ["WP", "Weeping Peninsula"],
  ["SR", "Siofra River"],
  ["LL", "Liurnia of the Lakes"],
  ["AR", "Ainsel River"],
  ["RSP", "Ruin-Strewn Precipice"],
  ["RLA", "Raya Lucaria Academy"],
  ["CL", "Caelid"],
  ["DB", "Dragonbarrow"],
  ["NR", "Nokron, Eternal City"],
  ["DD", "Deeproot Depths"],
  ["ARM", "Ainsel River Main"],
  ["NS", "Nokstella, Eternal City"],
  ["LR", "Lake of Rot"],
  ["MA", "Moonlight Altar"],
  ["AP", "Altus Plateau"],
  ["TSC", "The Shaded Castle"],
  ["DTEA", "Divine Tower of East Altus"],
  ["MtG", "Mt. Gelmir"],
  ["VM", "Volcano Manor"],
  ["CO", "Capital Outskirts"],
  ["LRC", "Leyndell, Royal Capital"],
  ["SSG", "Subterranean Shunning-Grounds"],
  ["FFP", "Frenzied Flame Proscription"],
  ["FL", "Forbidden Lands"],
  ["MotG", "Mountaintops of the Giants"],
  ["FP", "Flame Peak"],
  ["FA", "Farum Azula"],
  ["CS", "Consecrated Snowfield"],
  ["MP", "Mohgwyn Palace"],
  ["MH", "Miquella's Haligtree"],
  ["EBH", "Elphael, Brace of the Haligtree"],
  ["LAC", "Leyndell, Ashen Capital"],
  ["ET", "Erdtree"],
  ["GP", "Gravesite Plain"],
  ["BTS", "Belurat, Tower Settlement"],
  ["CE", "Castle Ensis"],
  ["JP", "Jagged Peak"],
  ["CHG", "Charo's Hidden Grave"],
  ["SA", "Scadu Altus"],
  ["RB", "Rauh Base"],
  ["ER", "Ellac River"],
  ["CC", "Cerulean Coast"],
  ["SCF", "Stone Coffin Fissure"],
  ["SK", "Shadow Keep"],
  ["ScV", "Scaduview"],
  ["SB", "Scadutree Base"],
  ["ARR", "Ancient Ruins of Rauh"],
  ["HL", "Hinterland"],
  ["RR", "Recluses' River"],
  ["AW", "Abyssal Woods"],
  ["MM", "Midra's Manse"],
  ["EI", "Enir-Ilim"],
  ["FRR", "Finger Ruins of Rhia"],
  ["FRM", "Finger Ruins of Miyr"],
  ["FRD", "Finger Ruins of Dheo"],
  // Leda's message waits by any of Miquella's crosses, so it belongs to none of the regions.
  ["Cross", "Miquella's Crosses"],
]);

/** A region code's full name, or the code itself for one the table doesn't know. */
export function regionName(code: string): string {
  return REGION_NAMES.get(code) ?? code;
}

/** Each region's short name, where it isn't its full name: the main word, or what players call the place. */
export const REGION_SHORT_NAMES: ReadonlyMap<string, string> = new Map([
  ["RH", "Roundtable"],
  ["SV", "Stormveil"],
  ["SR", "Siofra"],
  ["LL", "Liurnia"],
  ["RSP", "Precipice"],
  ["RLA", "Raya Lucaria"],
  ["NR", "Nokron"],
  ["DD", "Deeproot"],
  ["NS", "Nokstella"],
  ["AP", "Altus"],
  ["TSC", "Shaded Castle"],
  ["DTEA", "East Altus Tower"],
  ["MtG", "Gelmir"],
  ["CO", "Outskirts"],
  ["LRC", "Leyndell"],
  ["SSG", "Sewers"],
  ["FFP", "Three Fingers"],
  ["MotG", "Mountaintops"],
  ["CS", "Snowfield"],
  ["MP", "Mohg's Palace"],
  ["MH", "Haligtree"],
  ["EBH", "Elphael"],
  ["LAC", "Ashen Capital"],
  ["GP", "Gravesite"],
  ["BTS", "Belurat"],
  ["CE", "Ensis"],
  ["CHG", "Charo's Grave"],
  ["ER", "Ellac"],
  ["SCF", "Fissure"],
  ["SB", "Scadubase"],
  ["ARR", "Rauh Ruins"],
  ["FRR", "Rhia"],
  ["FRM", "Miyr"],
  ["FRD", "Dheo"],
]);

/** A region's name inside a compound place name: its short name, or its full name where it has none. */
export function shortRegionName(code: string): string {
  return REGION_SHORT_NAMES.get(code) ?? regionName(code);
}
