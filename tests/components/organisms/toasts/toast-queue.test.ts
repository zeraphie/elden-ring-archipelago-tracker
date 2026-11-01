import { describe, expect, test } from "bun:test";
import {
  ALONE_MIN_MS,
  LEAVE_MS,
  QUICK_MS,
  TOAST_MS,
  ToastQueue,
  type QueueClock,
} from "../../../../src/components/organisms/toasts/toast-queue.js";

// A clock the test moves on, running each wait whose time has come.
function clockOf() {
  const waits: { at: number; run: () => void; isCancelled: boolean }[] = [];
  const clock = {
    time: 0,
    now: () => clock.time,
    after: (ms: number, run: () => void) => {
      const wait = { at: clock.time + ms, run, isCancelled: false };
      waits.push(wait);
      return () => {
        wait.isCancelled = true;
      };
    },
    // Moves the clock on by `ms`, running each wait that comes due, in order.
    pass: (ms: number) => {
      const until = clock.time + ms;
      for (;;) {
        const due = waits
          .filter((wait) => !wait.isCancelled && wait.at <= until)
          .sort((a, b) => a.at - b.at)[0];
        if (due === undefined) {
          break;
        }
        due.isCancelled = true;
        clock.time = due.at;
        due.run();
      }
      clock.time = until;
    },
  };
  return clock satisfies QueueClock;
}

const valuesOf = (queue: ToastQueue<string>) => queue.shown.map(({ value }) => value);

describe("ToastQueue", () => {
  test("shows the newest on top", () => {
    const queue = new ToastQueue<string>(() => {}, clockOf());
    queue.add("first");
    queue.add("second");
    expect(valuesOf(queue)).toEqual(["second", "first"]);
  });

  test("a toast alone stays its full time, slides out, then goes", () => {
    const clock = clockOf();
    const queue = new ToastQueue<string>(() => {}, clock);
    queue.add("only");
    clock.pass(TOAST_MS - 1);
    expect(queue.shown[0]?.leaving).toBeUndefined();
    clock.pass(1);
    expect(queue.shown[0]?.leaving).toBe(1);
    clock.pass(LEAVE_MS);
    expect(queue.shown).toEqual([]);
  });

  test("while more than one is up, the oldest clears quickly, one at a time", () => {
    const clock = clockOf();
    const queue = new ToastQueue<string>(() => {}, clock);
    queue.add("first");
    queue.add("second");
    queue.add("third");
    clock.pass(QUICK_MS);
    expect(queue.shown.find(({ value }) => value === "first")?.leaving).toBe(1);
    clock.pass(QUICK_MS);
    expect(queue.shown.find(({ value }) => value === "second")?.leaving).toBe(1);
    clock.pass(LEAVE_MS);
    expect(valuesOf(queue)).toEqual(["third"]);
  });

  test("the last left stays until its own time is up", () => {
    const clock = clockOf();
    const queue = new ToastQueue<string>(() => {}, clock);
    queue.add("first");
    clock.pass(1000);
    queue.add("second");
    clock.pass(QUICK_MS + LEAVE_MS);
    expect(valuesOf(queue)).toEqual(["second"]);
    // The second came at 1,000 ms, so it goes at 1,000 + TOAST_MS, not sooner.
    clock.pass(1000 + TOAST_MS - clock.now() - 1);
    expect(queue.shown[0]?.leaving).toBeUndefined();
    clock.pass(1);
    expect(queue.shown[0]?.leaving).toBe(1);
  });

  test("one alone past its time still keeps the least moment", () => {
    const clock = clockOf();
    const queue = new ToastQueue<string>(() => {}, clock);
    queue.add("first");
    queue.hold();
    clock.pass(TOAST_MS * 2);
    queue.release();
    clock.pass(ALONE_MIN_MS - 1);
    expect(queue.shown[0]?.leaving).toBeUndefined();
    clock.pass(1);
    expect(queue.shown[0]?.leaving).toBe(1);
  });

  test("held, nothing clears; let go, the clearing goes on", () => {
    const clock = clockOf();
    const queue = new ToastQueue<string>(() => {}, clock);
    queue.add("first");
    queue.add("second");
    queue.hold();
    clock.pass(TOAST_MS * 2);
    expect(queue.shown.every(({ leaving }) => leaving === undefined)).toBe(true);
    queue.release();
    clock.pass(QUICK_MS);
    expect(queue.shown.find(({ value }) => value === "first")?.leaving).toBe(1);
  });

  test("clearing takes every toast away at once, and leaves nothing waiting", () => {
    const clock = clockOf();
    const queue = new ToastQueue<string>(() => {}, clock);
    queue.add("a");
    queue.add("b");
    queue.clear();
    expect(queue.shown).toEqual([]);
    clock.pass(TOAST_MS);
    queue.add("c");
    expect(queue.shown.map(({ value }) => value)).toEqual(["c"]);
  });

  test("a toast dismissed leaves its own way, and the rest are unchanged", () => {
    const clock = clockOf();
    const queue = new ToastQueue<string>(() => {}, clock);
    queue.add("first");
    queue.add("second");
    const second = queue.shown[0]?.id ?? 0;
    queue.dismiss(second, -1);
    expect(queue.shown[0]).toMatchObject({ value: "second", leaving: -1 });
    clock.pass(LEAVE_MS);
    expect(valuesOf(queue)).toEqual(["first"]);
  });

  test("tells its listener each time the toasts change", () => {
    const clock = clockOf();
    let changes = 0;
    const queue = new ToastQueue<string>(() => {
      changes += 1;
    }, clock);
    queue.add("only");
    clock.pass(TOAST_MS + LEAVE_MS);
    // Added, leaving, gone.
    expect(changes).toBe(3);
  });

  test("stopped, no wait runs", () => {
    const clock = clockOf();
    const queue = new ToastQueue<string>(() => {}, clock);
    queue.add("only");
    queue.stop();
    clock.pass(TOAST_MS * 2);
    expect(queue.shown[0]?.leaving).toBeUndefined();
  });
});
