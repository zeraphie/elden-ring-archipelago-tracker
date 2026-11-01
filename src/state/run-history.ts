/**
 * ─ Run history ─
 *
 * The finished runs kept on this device, so they outlast their rooms, beside
 * the rooms in the tracker's database. They're kept by preset, a hash of the
 * room's options, so rooms of the same options compare with each other, what
 * their seeds give them. What's kept is read back with its shape checked, since
 * an older version may have written it.
 */

import type { StateStorage } from "zustand/middleware";
import { isRecord } from "../archipelago/web-responses.js";
import { stateStorage } from "../storage/db.js";

/** A run that reached the goal: its time, and each row seen come, by its key, in milliseconds. */
export interface FinishedRun {
  readonly timeMs: number;
  readonly rows: Readonly<Record<string, number>>;
}

// A value as text, whatever order its keys came in.
function canonical(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(canonical).join(",")}]`;
  }
  if (isRecord(value)) {
    const parts = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`);
    return `{${parts.join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

// FNV-1a, 32 bits: enough to tell one person's presets apart, and it answers at once.
function hash(text: string): string {
  let hashed = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hashed = Math.imul(hashed ^ text.charCodeAt(i), 0x01000193);
  }
  return (hashed >>> 0).toString(16);
}

/** The preset a room's slot_data is of: a hash of its options; undefined with none. */
export function presetOf(
  slotData: Readonly<Record<string, unknown>> | undefined
): string | undefined {
  const options = slotData?.["options"];
  return isRecord(options) ? hash(canonical(options)) : undefined;
}

const keyOf = (preset: string): string => `runs:${preset}`;

/** What's kept for a preset, name and value, so a room can open with runs behind it. */
export function runsEntry(preset: string, runs: readonly FinishedRun[]): readonly [string, string] {
  return [keyOf(preset), JSON.stringify(runs)];
}

/** The finished runs kept for a preset, oldest first; none when they can't be read. */
export async function keptRuns(
  preset: string,
  storage: StateStorage = stateStorage
): Promise<readonly FinishedRun[]> {
  let kept: unknown;
  try {
    kept = JSON.parse((await storage.getItem(keyOf(preset))) ?? "[]");
  } catch {
    return [];
  }
  return Array.isArray(kept) ? kept.filter(isFinishedRun) : [];
}

/** Adds a finished run to those kept for its preset. */
export async function keepRun(
  preset: string,
  run: FinishedRun,
  storage: StateStorage = stateStorage
): Promise<void> {
  const [name, value] = runsEntry(preset, [...(await keptRuns(preset, storage)), run]);
  await storage.setItem(name, value);
}

function isFinishedRun(run: unknown): run is FinishedRun {
  return (
    isRecord(run) &&
    typeof run.timeMs === "number" &&
    isRecord(run.rows) &&
    Object.values(run.rows).every((time) => typeof time === "number")
  );
}
