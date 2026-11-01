const pixels = (length: string): number => Number.parseFloat(length);

// How high a list's rows reach, for a list cut short or stretched past them.
function rowsHeight(list: Element): number {
  const { paddingTop, paddingBottom } = getComputedStyle(list);
  const top = list.firstElementChild?.getBoundingClientRect().top ?? 0;
  const bottom = list.lastElementChild?.getBoundingClientRect().bottom ?? 0;
  return bottom - top + pixels(paddingTop) + pixels(paddingBottom);
}

/** How high the parts of a column would be with nothing cut: each list by its rows, the rest as they stand. */
export function fullHeight(parts: readonly Element[]): number {
  return parts.reduce(
    (all, part) =>
      all +
      (part.matches("ul") ? rowsHeight(part) : part.clientHeight) +
      pixels(getComputedStyle(part).marginTop),
    0
  );
}
