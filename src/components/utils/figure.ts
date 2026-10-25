const FIGURES = new Intl.NumberFormat("en-GB");

/** A count as a person reads it, with its thousands set apart: "3,765". */
export function figure(count: number): string {
  return FIGURES.format(count);
}

/** How much of a whole is done, as a percentage; none of nothing. */
export function percentDone(done: number, all: number): number {
  return all === 0 ? 0 : (100 * done) / all;
}
