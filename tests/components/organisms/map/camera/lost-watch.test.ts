import { describe, expect, test } from "bun:test";
import { LostWatch } from "../../../../../src/components/organisms/map/camera/lost-watch.js";

// A watch over a view whose land the test sets, with its timers held until the test runs them.
function watchOf(land = true) {
  const view = { land };
  const said: boolean[] = [];
  const timers: (() => void)[] = [];
  const watch = new LostWatch(
    () => view.land,
    (isLost) => said.push(isLost),
    (callback) => timers.push(callback)
  );
  const settle = () => timers.splice(0).forEach((run) => run());
  return { view, said, timers, watch, settle };
}

describe("lost watch", () => {
  test("says nothing while land stays in view", () => {
    const { said, timers, watch } = watchOf();
    watch.moved();
    expect(timers).toHaveLength(0);
    expect(said).toEqual([]);
  });

  test("says lost only once the view has stopped with no land", () => {
    const { said, watch, settle } = watchOf(false);
    watch.moved();
    expect(said).toEqual([]);
    settle();
    expect(said).toEqual([true]);
  });

  test("each move starts the wait again, so a drag over the sea says nothing", () => {
    const { said, timers, watch } = watchOf(false);
    watch.moved();
    const [first] = timers.splice(0);
    watch.moved();
    first?.();
    expect(said).toEqual([]);
    timers.splice(0).forEach((run) => run());
    expect(said).toEqual([true]);
  });

  test("land back before the wait ends means it was never lost", () => {
    const { view, said, watch, settle } = watchOf(false);
    watch.moved();
    view.land = true;
    watch.moved();
    settle();
    expect(said).toEqual([]);
  });

  test("land back lets go at once, with no wait", () => {
    const { view, said, timers, watch, settle } = watchOf(false);
    watch.moved();
    settle();
    view.land = true;
    watch.moved();
    expect(timers).toHaveLength(0);
    expect(said).toEqual([true, false]);
  });

  test("moving on over the sea while lost says nothing more", () => {
    const { said, timers, watch, settle } = watchOf(false);
    watch.moved();
    settle();
    watch.moved();
    expect(timers).toHaveLength(0);
    expect(said).toEqual([true]);
  });
});
