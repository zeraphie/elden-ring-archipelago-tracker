import { describe, expect, test } from "bun:test";
import { pinSpots, tipPlace } from "../../../../src/components/organisms/map/pin-tip.js";
import type { CheckRow } from "../../../../src/state/utils/checks.js";

const row = (id: number, overrides: Partial<CheckRow> = {}): CheckRow => ({
  id,
  name: { place: `Place ${id}`, encounter: "" },
  copy: undefined,
  vanilla: undefined,
  isKey: true,
  state: "todo",
  finding: undefined,
  ...overrides,
});
const copy = (first: number, nth: number) => ({ first, nth, of: 3 });

describe("pinSpots", () => {
  test("gives a spot of its own to each check that isn't a copy", () => {
    expect(pinSpots([row(1), row(2)]).map((spot) => spot.row.id)).toEqual([1, 2]);
  });

  test("reads a spot's copies as one spot, with no copy number", () => {
    const spots = pinSpots([row(1, { copy: copy(1, 1) }), row(2, { copy: copy(1, 2) })]);
    expect(spots).toHaveLength(1);
    expect(spots[0]?.row.copy).toBeUndefined();
  });

  test("shows a spot as still to do while any of its copies is", () => {
    const spots = pinSpots([
      row(1, { copy: copy(1, 1), state: "collected" }),
      row(2, { copy: copy(1, 2), state: "todo" }),
    ]);
    expect(spots[0]?.row.state).toBe("todo");
  });

  test("gathers what each copy has held", () => {
    const held = { item: "Rusty Key", to: undefined };
    const spots = pinSpots([
      row(1, { copy: copy(1, 1), state: "collected", finding: held }),
      row(2, { copy: copy(1, 2), state: "collected", finding: held }),
      row(3, { copy: copy(1, 3) }),
    ]);
    expect(spots[0]?.findings).toEqual([held, held]);
  });
});

describe("tipPlace", () => {
  const VIEW = { width: 1000, height: 600 };
  const TIP = { width: 300, height: 120 };

  test("sits to the right of its pin, level with its top", () => {
    expect(tipPlace({ left: 100, right: 120, top: 200 }, TIP, VIEW)).toEqual({
      left: 130,
      top: 200,
    });
  });

  test("goes to the left when the right has no room", () => {
    expect(tipPlace({ left: 900, right: 920, top: 200 }, TIP, VIEW).left).toBe(590);
  });

  test("stays inside the view's foot", () => {
    expect(tipPlace({ left: 100, right: 120, top: 580 }, TIP, VIEW).top).toBe(470);
  });

  test("stays inside the view's top and left, whatever else it gives up", () => {
    const narrow = { width: 280, height: 100 };
    expect(tipPlace({ left: 100, right: 120, top: 200 }, TIP, narrow)).toEqual({
      left: 10,
      top: 10,
    });
  });
});
