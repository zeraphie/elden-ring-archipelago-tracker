/** A list's height as it's drawn, and as all its rows would take. */
type DrawnList = Pick<HTMLElement, "offsetHeight" | "scrollHeight">;

/**
 * The least and the most a list can be dragged to, against what's beside it:
 * `least` of it, `leastBeside` left of the other, and no more than its rows take.
 */
export function listLimits(
  { offsetHeight, scrollHeight }: DrawnList,
  beside: Pick<HTMLElement, "offsetHeight">,
  least: number,
  leastBeside: number
): readonly [number, number] {
  const room = offsetHeight + beside.offsetHeight - leastBeside;
  return [least, Math.max(least, Math.min(scrollHeight, room))];
}
