/**
 * ─ Lost watch ─
 *
 * Says when a view has been left with no land in it, so the fit can offer the
 * way back. A drag or a glide passes over open sea on its way, so it waits for
 * the view to stop moving before it says so, and lets go the moment land is
 * back. It only ever says: the camera stays where the person left it.
 */

// Past the gaps between the moves of a drag, and short enough to read as the map having stopped.
const SETTLE_MS = 500;

/** Tells when a view stops moving with no land in it, and when land is back. */
export class LostWatch {
  private isLost = false;
  // Each move is a new wait; only the newest one's timer counts.
  private wait = 0;

  /**
   * @param hasLand - Whether any land is in the view now.
   * @param onChange - Told each change, with whether the view is lost.
   * @param timer - Runs a callback after a while: setTimeout, or a test's own.
   */
  constructor(
    private readonly hasLand: () => boolean,
    private readonly onChange: (isLost: boolean) => void,
    private readonly timer: (callback: () => void, ms: number) => unknown = setTimeout
  ) {}

  /** Told each time the view moves. */
  moved(): void {
    this.wait += 1;
    if (this.hasLand()) {
      this.say(false);
      return;
    }
    if (!this.isLost) {
      // Called off `this`, as the browser's setTimeout refuses any other.
      const { timer, wait } = this;
      timer(() => {
        if (wait === this.wait) {
          this.say(true);
        }
      }, SETTLE_MS);
    }
  }

  private say(isLost: boolean): void {
    if (isLost !== this.isLost) {
      this.isLost = isLost;
      this.onChange(isLost);
    }
  }
}
