/**
 * ─ Roll call ─
 *
 * Named parts that something waits on. Each part is expected by name and
 * reports in when it's ready, and the call ends once every part expected has.
 * A part must be expected before the last one already expected reports in, or
 * the call ends without it.
 */

/** A roll call of named parts, which ends once every part expected has reported in. */
export class RollCall {
  private readonly pending = new Set<string>();
  private readonly done: Promise<void>;
  private settle: () => void = () => {};
  private isSettled = false;

  constructor() {
    this.done = new Promise((resolve) => {
      this.settle = () => {
        this.isSettled = true;
        resolve();
      };
    });
  }

  /** Wait for a part by this name. Too late once the call has ended. */
  expect(name: string): void {
    if (!this.isSettled) {
      this.pending.add(name);
    }
  }

  /** That part is ready. Saying so twice, or for a part never expected, is harmless. */
  arrived(name: string): void {
    if (this.pending.delete(name) && this.pending.size === 0) {
      this.settle();
    }
  }

  /** Resolves once every expected part has reported in; at once when none is waited on. */
  whenDone(): Promise<void> {
    if (this.pending.size === 0) {
      this.settle();
    }
    return this.done;
  }

  /** The parts still to report in, in the order they were expected, for naming what's loading. */
  get waiting(): readonly string[] {
    return [...this.pending];
  }
}
