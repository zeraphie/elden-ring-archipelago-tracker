/**
 * ─ Checks ─
 *
 * The room's checks as the panel lists them, region by region: key checks
 * apart from the rest, each by its place and encounter, which copy it is of a
 * spot the generator copied, the item it holds in the unrandomised game, how
 * it stands, and once it's checked, what it held.
 * A check's names are read once for each slot_data; the rows are worked out
 * again only when the regions or the findings change. Search looks through
 * them all, by every word of what a row says.
 */

import type { PinState } from "../../data/checks/map-pins.js";
import type { KeySpot } from "../../data/names/key-spots.js";
import type { SpotCopy } from "../../data/names/location-name.js";
import type { RegionSummary } from "../../data/rules/region-summary.js";
import type { EldenRingData } from "../setup.js";
import { findingsOf, type Finding, type FindingInputs } from "./findings.js";
import { regionsOf, type RegionInputs } from "./regions.js";
import { roomViewOf } from "./room.js";

/** One check as the panel lists it. */
export interface CheckRow {
  readonly id: number;
  readonly name: KeySpot;
  /** Which copy it is, of a spot the generator copied. */
  readonly copy: SpotCopy | undefined;
  /** The item it holds in the unrandomised game. */
  readonly vanilla: string | undefined;
  readonly isKey: boolean;
  /** Collected once checked, locked while its region is, to do otherwise. */
  readonly state: PinState;
  /** What it held, once it's checked and the tracker knows. */
  readonly finding: Finding | undefined;
}

/** A region's key checks and its other checks, each in id order, with a spot's copies straight after it. */
export interface RegionChecks {
  readonly key: readonly CheckRow[];
  readonly other: readonly CheckRow[];
}

/** A check search found, with the region it's in, by code. */
export interface CheckHit {
  readonly region: string;
  readonly row: CheckRow;
}

/** What search found: its hits, key checks first, and whether there were more than it gives. */
export interface CheckSearch {
  readonly hits: readonly CheckHit[];
  readonly isCapped: boolean;
}

/** What the checks are worked out from, in the store. */
export type CheckInputs = RegionInputs & FindingInputs;

const NO_CHECKS: RegionChecks = { key: [], other: [] };

// What a check's names give its row.
type RowNames = Pick<CheckRow, "name" | "copy" | "vanilla">;

// Each check's place, encounter, copy and vanilla item, by id, for each slot_data's names.
const NAMES = new WeakMap<
  object,
  { readonly read: Map<number, RowNames>; readonly copies: ReadonlyMap<number, SpotCopy> }
>();

// The last rows worked out, and what they were worked out from.
let last:
  | {
      summaries: ReadonlyMap<string, RegionSummary> | undefined;
      findings: ReadonlyMap<number, Finding>;
      checks: ReadonlyMap<string, RegionChecks>;
    }
  | undefined;

/** Every region's checks, by its code; none until slot_data and the data package are in. */
export function roomChecksOf(
  data: EldenRingData,
  inputs: CheckInputs
): ReadonlyMap<string, RegionChecks> {
  const summaries = regionsOf(data, inputs);
  const findings = findingsOf(inputs);
  if (last !== undefined && last.summaries === summaries && last.findings === findings) {
    return last.checks;
  }
  const view = roomViewOf(inputs);
  const checks = new Map<string, RegionChecks>();
  if (summaries !== undefined && view !== undefined) {
    const names = namesOf(data, view.names);
    const keyChecks = inputs.keyChecks ?? new Set<number>();
    for (const [region, summary] of summaries) {
      const key: CheckRow[] = [];
      const other: CheckRow[] = [];
      for (const id of summary.ids) {
        const isDone = view.checkedIds.has(id);
        const isKey = keyChecks.has(id);
        const row: CheckRow = {
          id,
          ...names(id),
          isKey,
          state: isDone
            ? "collected"
            : summary.state === "locked" || summary.outOfReach.has(id)
              ? "locked"
              : "todo",
          finding: isDone ? findings.get(id) : undefined,
        };
        (isKey ? key : other).push(row);
      }
      checks.set(region, { key: key.sort(bySpot), other: other.sort(bySpot) });
    }
  }
  last = { summaries, findings, checks };
  return checks;
}

// In id order, but for a spot's copies, which come straight after it in their own order.
function bySpot(a: CheckRow, b: CheckRow): number {
  const spot = ({ id, copy }: CheckRow) => copy?.first ?? id;
  return spot(a) - spot(b) || (a.copy?.nth ?? 0) - (b.copy?.nth ?? 0);
}

/** A region's checks, by its code; none until slot_data and the data package are in. */
export function regionChecksOf(
  data: EldenRingData,
  inputs: CheckInputs,
  region: string
): RegionChecks {
  return roomChecksOf(data, inputs).get(region) ?? NO_CHECKS;
}

/**
 * The checks whose row holds every word of the query, in any order and any
 * case: its place, encounter, vanilla item and region, and once it's checked,
 * what it held and who it went to. Key checks come first, then the rest, each
 * in the regions' order; at most `most` are given.
 */
export function searchChecks(
  data: EldenRingData,
  inputs: CheckInputs,
  query: string,
  most: number
): CheckSearch {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word !== "");
  const key: CheckHit[] = [];
  const other: CheckHit[] = [];
  for (const [region, checks] of roomChecksOf(data, inputs)) {
    const regionName = data.regionName(region);
    for (const row of [...checks.key, ...checks.other]) {
      const said = [
        row.name.place,
        row.name.encounter,
        row.vanilla,
        regionName,
        row.finding?.item,
        row.finding?.to?.name,
      ]
        .join(" ")
        .toLowerCase();
      if (words.length > 0 && words.every((word) => said.includes(word))) {
        (row.isKey ? key : other).push({ region, row });
      }
    }
  }
  const hits = [...key, ...other];
  return { hits: hits.slice(0, most), isCapped: hits.length > most };
}

// A check's names by id, read from its Archipelago name once for each slot_data.
function namesOf(data: EldenRingData, names: Readonly<Record<string, string>>) {
  let kept = NAMES.get(names);
  if (kept === undefined) {
    kept = { read: new Map(), copies: data.spotCopies(names) };
    NAMES.set(names, kept);
  }
  const { read, copies } = kept;
  return (id: number): RowNames => {
    let found = read.get(id);
    if (found === undefined) {
      const name = names[String(id)] ?? "";
      found = {
        name: data.checkName(name),
        copy: copies.get(id),
        vanilla: data.readLocationName(name)?.vanilla,
      };
      read.set(id, found);
    }
    return found;
  };
}
