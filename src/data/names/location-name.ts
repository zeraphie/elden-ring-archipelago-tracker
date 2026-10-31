/**
 * ─ Location names ─
 *
 * An Elden Ring location's Archipelago name, read into its parts:
 * `<regions>[/<place>]: <vanilla item>[ <copy>] - <description>`, with
 * `, extra item <n>` on the copies the generator makes of a priority spot.
 * A name can sit under two regions (`LRC|LAC`), put its region in brackets
 * (`(VM)/SIC`), or have no place code at all (`RH: …`). The apworld's items
 * never hold " - " or end in a bare number, which is what makes the split safe.
 */

/** An Elden Ring location's name, read into the parts a check is shown with. */
export interface LocationName {
  /** The region codes it sits under, the first being where it's listed: `LRC|LAC` gives both capitals. */
  readonly regions: readonly string[];
  /** The place code after the slash, as written ("WS", "(AS)", "(TFB/CA)"), or undefined where the name has none. */
  readonly place: string | undefined;
  /** The regions and place code as the name writes them, which the place is named under: "LG/(AS)", "LRC|LAC/RC", "(VM)/SIC". Undefined where there's no place code. */
  readonly placeKey: string | undefined;
  /** The item the spot holds in the unrandomised game. */
  readonly vanilla: string;
  /** Which copy of that item this is, where a spot holds several ("Golden Rune [1] 2"). */
  readonly copy: number | undefined;
  /** Where the spot is, compass points spelled out and the first letter a capital. */
  readonly description: string;
  /** Which extra item this is, on a copy the generator made of a priority spot. */
  readonly extra: number | undefined;
}

// The whole prefix as written, the regions, the place, and the rest of the name.
const PREFIX = /^(\(?([A-Za-z]+(?:\|[A-Za-z]+)*)\)?(?:\/([^:]+))?): (.+)$/;
// The generator's copies of a priority spot.
const EXTRA = /^(.+), extra item (\d+)$/;
// The item, any copy number, and where. The item is read lazily, so it ends
// at the first " - " and leaves the copy number out.
const ITEM = /^(.+?)(?: (\d+))? - (.+)$/;

// The only compass points the apworld's descriptions use.
const COMPASS: ReadonlyMap<string, string> = new Map([
  ["N", "north"],
  ["S", "south"],
  ["E", "east"],
  ["W", "west"],
  ["NE", "north east"],
  ["NW", "north west"],
  ["SE", "south east"],
  ["SW", "south west"],
]);

/** An Elden Ring location's name in its parts, or undefined for a name not in that form. */
export function readLocationName(name: string): LocationName | undefined {
  const { base, extra } = withoutExtra(name);
  const prefix = PREFIX.exec(base);
  if (prefix === null) {
    return undefined;
  }
  const [, written = "", regions = "", place, rest = ""] = prefix;
  const [, vanilla, copy, description] = ITEM.exec(rest) ?? [];
  if (vanilla === undefined || description === undefined) {
    return undefined;
  }
  const where = spellCompass(description);
  return {
    regions: regions.split("|"),
    place,
    placeKey: place === undefined ? undefined : written,
    vanilla,
    copy: copy === undefined ? undefined : Number(copy),
    description: where.charAt(0).toUpperCase() + where.slice(1),
    extra,
  };
}

/** A location name apart from the generator's ", extra item N", and that N, so a copy reads as the spot it copies. */
export function withoutExtra(name: string): {
  readonly base: string;
  readonly extra: number | undefined;
} {
  const parts = EXTRA.exec(name);
  return parts === null
    ? { base: name, extra: undefined }
    : { base: parts[1] ?? name, extra: Number(parts[2]) };
}

/** Text with its compass points spelled out: "graveyard SW of WS" reads "graveyard south west of WS". */
export function spellCompass(text: string): string {
  return text.replace(/\b(NE|NW|SE|SW|N|S|E|W)\b/g, (point) => COMPASS.get(point) ?? point);
}
