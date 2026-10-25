/** Whether the person has asked the system for less motion. */
export function isMotionReduced(): boolean {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}
