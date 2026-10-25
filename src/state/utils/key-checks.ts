import { readKeyCheckSlotData } from "../../archipelago/elden-ring-slot.js";
import type { EldenRingData } from "../setup.js";

/** A slot's key checks, by location id, worked out from its slot_data; undefined in a shape they can't be. */
export function keyChecksFrom(
  data: EldenRingData,
  slotData: Readonly<Record<string, unknown>>
): ReadonlySet<number> | undefined {
  const read = readKeyCheckSlotData(slotData);
  return read === undefined ? undefined : data.keyChecks(read);
}
