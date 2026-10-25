import { describe, expect, test } from "bun:test";
import { PageClock, type Ticker } from "../../../src/components/utils/clock.js";

// A clock the test moves on, and the timers it's been asked for.
function tickerOf() {
  const ticker = {
    time: 1000,
    timers: [] as { ms: number; tick: () => void; isStopped: boolean }[],
    now: () => ticker.time,
    every: (ms: number, tick: () => void) => {
      const timer = { ms, tick, isStopped: false };
      ticker.timers.push(timer);
      return () => {
        timer.isStopped = true;
      };
    },
  };
  return ticker satisfies Ticker;
}

describe("PageClock", () => {
  test("tells every listener the time on each tick, once a second, on one timer", () => {
    const ticker = tickerOf();
    const clock = new PageClock(ticker);
    const heard: number[] = [];
    clock.listen((now) => heard.push(now));
    clock.listen((now) => heard.push(-now));
    expect(ticker.timers).toHaveLength(1);
    expect(ticker.timers[0]?.ms).toBe(1000);
    ticker.time = 2000;
    ticker.timers[0]?.tick();
    expect(heard).toEqual([2000, -2000]);
  });

  test("stops ticking once its last listener goes, and starts again with a new one", () => {
    const ticker = tickerOf();
    const clock = new PageClock(ticker);
    const first = clock.listen(() => {});
    const second = clock.listen(() => {});
    first();
    expect(ticker.timers[0]?.isStopped).toBe(false);
    second();
    expect(ticker.timers[0]?.isStopped).toBe(true);
    clock.listen(() => {});
    expect(ticker.timers).toHaveLength(2);
  });

  test("a listener that's gone hears no more ticks", () => {
    const ticker = tickerOf();
    const clock = new PageClock(ticker);
    const heard: number[] = [];
    const stop = clock.listen((now) => heard.push(now));
    clock.listen(() => {});
    stop();
    ticker.timers[0]?.tick();
    expect(heard).toEqual([]);
  });
});
