import { describe, expect, test } from "bun:test";
import { RollCall } from "../../../../src/components/organisms/intro/roll-call.js";

// Whether a promise has settled, once the microtasks queued so far have run.
async function hasSettled(promise: Promise<unknown>): Promise<boolean> {
  let isSettled = false;
  void promise.then(() => {
    isSettled = true;
  });
  await Promise.resolve();
  await Promise.resolve();
  return isSettled;
}

describe("RollCall", () => {
  test("ends once every expected part has reported in, and not before", async () => {
    const call = new RollCall();
    call.expect("draw");
    call.expect("sweep");
    call.expect("frame");
    const done = call.whenDone();
    call.arrived("sweep");
    call.arrived("draw");
    expect(await hasSettled(done)).toBe(false);
    call.arrived("frame");
    expect(await hasSettled(done)).toBe(true);
  });

  test("names the parts still waited on, in the order they were expected", () => {
    const call = new RollCall();
    call.expect("draw");
    call.expect("sweep");
    call.expect("frame");
    call.arrived("sweep");
    expect(call.waiting).toEqual(["draw", "frame"]);
  });

  test("a part said twice, or never expected, changes nothing", async () => {
    const call = new RollCall();
    call.expect("draw");
    call.expect("frame");
    const done = call.whenDone();
    call.arrived("draw");
    call.arrived("draw");
    call.arrived("room");
    expect(call.waiting).toEqual(["frame"]);
    expect(await hasSettled(done)).toBe(false);
  });

  test("a part expected before the others are in holds the call open", async () => {
    const call = new RollCall();
    call.expect("draw");
    const done = call.whenDone();
    call.expect("room");
    call.arrived("draw");
    expect(await hasSettled(done)).toBe(false);
    call.arrived("room");
    expect(await hasSettled(done)).toBe(true);
  });

  test("a part expected once the call has ended is too late", async () => {
    const call = new RollCall();
    call.expect("draw");
    call.arrived("draw");
    call.expect("room");
    expect(call.waiting).toEqual([]);
    expect(await hasSettled(call.whenDone())).toBe(true);
  });

  test("with nothing expected, it ends at once", async () => {
    expect(await hasSettled(new RollCall().whenDone())).toBe(true);
  });
});
