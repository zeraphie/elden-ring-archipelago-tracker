// Shared by the tests that wait on answers: letting the promises waiting on
// them run, once or until something holds.

/** Lets every promise already waiting run, as the next turn of the event loop. */
export const settle = () => new Promise((done) => setTimeout(done, 0));

/** Lets promises run until `check` holds, failing the test once it hasn't after a hundred turns. */
export async function until(check: () => boolean): Promise<void> {
  for (let turn = 0; turn < 100; turn += 1) {
    if (check()) {
      return;
    }
    await settle();
  }
  throw new Error("What the test waited for never came.");
}
