/**
 * ─ Clock ─
 *
 * One clock for the whole page, ticking every second while anything listens
 * to it, and still while nothing does. Each listener is told the time on
 * every tick and does only what that time changes, so a page full of times
 * costs one timer, not one each.
 */

// Every second, so a time counting its seconds counts each one.
const TICK_MS = 1000;

/** How a clock reads the time and ticks: the browser's, or a test's. */
export interface Ticker {
  readonly now: () => number;
  /** Calls `tick` every `ms` until the function it returns is called. */
  readonly every: (ms: number, tick: () => void) => () => void;
}

const BROWSER: Ticker = {
  now: () => Date.now(),
  every: (ms, tick) => {
    const ticker = setInterval(tick, ms);
    return () => clearInterval(ticker);
  },
};

/** A clock its listeners share, ticking only while it has one. */
export class PageClock {
  private readonly listeners = new Set<(now: number) => void>();
  private stop: (() => void) | undefined;

  constructor(private readonly ticker: Ticker = BROWSER) {}

  /** The time, in milliseconds since 1970. */
  now(): number {
    return this.ticker.now();
  }

  /** Tell `listener` the time on every tick until the function returned is called. */
  listen(listener: (now: number) => void): () => void {
    this.listeners.add(listener);
    this.stop ??= this.ticker.every(TICK_MS, () => {
      const now = this.ticker.now();
      for (const each of this.listeners) {
        each(now);
      }
    });
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) {
        this.stop?.();
        this.stop = undefined;
      }
    };
  }
}

/** The page's one clock. */
export const PAGE_CLOCK = new PageClock();
