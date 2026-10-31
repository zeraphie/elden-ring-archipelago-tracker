import { describe, expect, test } from "bun:test";
import {
  REGION_NAMES,
  REGION_SHORT_NAMES,
  regionName,
  shortRegionName,
} from "../../../src/data/names/regions.js";

// Every region code the Elden Ring apworld 0.1.4's location names use.
const APWORLD_CODES = [
  "LL",
  "LG",
  "CL",
  "RH",
  "AP",
  "SA",
  "GP",
  "MotG",
  "WP",
  "SV",
  "MtG",
  "CS",
  "SK",
  "LRC",
  "CO",
  "RLA",
  "FA",
  "DB",
  "VM",
  "RB",
  "DD",
  "SR",
  "NR",
  "SSG",
  "BTS",
  "ARR",
  "EI",
  "RR",
  "EBH",
  "MP",
  "CC",
  "CE",
  "AR",
  "FP",
  "MH",
  "CHG",
  "NS",
  "MA",
  "JP",
  "TSC",
  "LR",
  "RSP",
  "ER",
  "AW",
  "SCF",
  "LAC",
  "MM",
  "FFP",
  "ARM",
  "ScV",
  "HL",
  "FL",
  "DTEA",
  "FRR",
  "SB",
  "ET",
  "Cross",
  "FRM",
  "FRD",
];

describe("REGION_NAMES", () => {
  test("names every region code the apworld uses, and no other", () => {
    expect([...REGION_NAMES.keys()].sort()).toEqual([...APWORLD_CODES].sort());
  });

  test("gives each region a name of its own", () => {
    expect(new Set(REGION_NAMES.values()).size).toBe(REGION_NAMES.size);
  });
});

describe("regionName", () => {
  test("a known code gives its region's name", () => {
    const known = REGION_NAMES.get("LL") ?? "";
    expect(known).not.toBe("");
    expect(regionName("LL")).toBe(known);
  });

  test("an unknown code is shown as it came", () => {
    expect(regionName("XX")).toBe("XX");
  });
});

describe("shortRegionName", () => {
  test("shortens only known regions, and gives each region a short name of its own", () => {
    expect([...REGION_SHORT_NAMES.keys()].filter((code) => !REGION_NAMES.has(code))).toEqual([]);
    const shorts = [...REGION_NAMES.keys()].map(shortRegionName);
    expect(new Set(shorts).size).toBe(shorts.length);
  });

  test("a region with no short name keeps its full name", () => {
    const whole = [...REGION_NAMES.keys()].find((code) => !REGION_SHORT_NAMES.has(code)) ?? "";
    expect(shortRegionName(whole)).toBe(regionName(whole));
  });
});
