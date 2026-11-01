/**
 * ─ Toast queue ─
 *
 * The toasts showing, newest first, and when each goes. A toast stays a few
 * seconds; while more than one is up, the oldest clears quickly, so the
 * newest is soon the only one, and it then keeps a moment of its own. One
 * held, as while it's being swiped, stops the clearing until it's let go. A
 * toast leaving slides out its way, and goes once it has.
 */

/** How the queue reads the time and waits: the browser's, or a test's. */
export interface QueueClock {
  readonly now: () => number;
  /** Calls `run` after `ms`, until the function it returns is called. */
  readonly after: (ms: number, run: () => void) => () => void;
}

/** A toast in the queue: its value, and, once it's going, the way it leaves, -1 left or 1 right. */
export interface QueuedToast<T> {
  readonly id: number;
  readonly value: T;
  readonly leaving: -1 | 1 | undefined;
}

// How long a toast stays when nothing comes after it.
export const TOAST_MS = 4500;
// How soon the oldest clears while more than one is up.
export const QUICK_MS = 900;
// The least a toast left alone keeps, however long it has already shown.
export const ALONE_MIN_MS = 2500;
// How long a toast takes to slide out.
export const LEAVE_MS = 220;

const BROWSER: QueueClock = {
  now: () => Date.now(),
  after: (ms, run) => {
    const timer = setTimeout(run, ms);
    return () => clearTimeout(timer);
  },
};

/** The toasts showing, told to `onChange` each time they change. */
export class ToastQueue<T> {
  private toasts: (QueuedToast<T> & { readonly until: number })[] = [];
  private next = 1;
  private isHeld = false;
  private cancel: () => void = () => {};
  private readonly leaving = new Set<() => void>();

  constructor(
    private readonly onChange: () => void,
    private readonly clock: QueueClock = BROWSER
  ) {}

  /** The toasts showing, newest first. */
  get shown(): readonly QueuedToast<T>[] {
    return this.toasts;
  }

  /** Show a toast on top. */
  add(value: T): void {
    this.toasts = [
      { id: this.next, value, leaving: undefined, until: this.clock.now() + TOAST_MS },
      ...this.toasts,
    ];
    this.next += 1;
    this.changed();
  }

  /** Send a toast out, to the left or the right. */
  dismiss(id: number, way: -1 | 1 = 1): void {
    if (!this.toasts.some((toast) => toast.id === id && toast.leaving === undefined)) {
      return;
    }
    this.toasts = this.toasts.map((toast) =>
      toast.id === id ? { ...toast, leaving: way } : toast
    );
    const stop = this.clock.after(LEAVE_MS, () => {
      this.leaving.delete(stop);
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
      this.onChange();
    });
    this.leaving.add(stop);
    this.changed();
  }

  /** Take every toast away at once, as the goal's screen comes up. */
  clear(): void {
    this.toasts = [];
    this.stop();
    this.onChange();
  }

  /** Stop the clearing, as while a toast is being swiped. */
  hold(): void {
    this.isHeld = true;
    this.cancel();
  }

  /** Let the clearing go on. */
  release(): void {
    this.isHeld = false;
    this.schedule();
  }

  /** Stop every wait, as the page closes. */
  stop(): void {
    this.cancel();
    this.leaving.forEach((stop) => stop());
    this.leaving.clear();
  }

  private changed(): void {
    this.schedule();
    this.onChange();
  }

  // The oldest toast still showing goes next: soon while others wait, or once its time is up.
  private schedule(): void {
    this.cancel();
    const showing = this.toasts.filter((toast) => toast.leaving === undefined);
    const oldest = showing.at(-1);
    if (oldest === undefined || this.isHeld) {
      return;
    }
    const wait =
      showing.length > 1 ? QUICK_MS : Math.max(oldest.until - this.clock.now(), ALONE_MIN_MS);
    this.cancel = this.clock.after(wait, () => this.dismiss(oldest.id, 1));
  }
}
