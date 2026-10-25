/**
 * What a hint costs a slot, in points: RoomInfo's `hint_cost`, a percentage,
 * of the slot's locations, at least one, or nothing when hints are free. It's
 * worked out as the server does, `int(hint_cost * 0.01 * locations)` in
 * floating point, so it matches to the point even where whole-number
 * arithmetic would differ by one (29% of 100 is 28 there).
 */
export function hintCost(percent: number, locations: number): number {
  return percent > 0 ? Math.max(1, Math.trunc(percent * 0.01 * locations)) : 0;
}
