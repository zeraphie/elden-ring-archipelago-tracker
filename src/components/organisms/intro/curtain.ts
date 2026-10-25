/**
 * ─ Curtain ─
 *
 * The mark covers the window from the first byte until the page is ready. It
 * draws itself once, the moment the page paints, and the app's code waits to
 * run until it is done, since both share the main thread; the bar under it
 * sweeps on the compositor, for one full sweep at least. The curtain opens
 * once its roll call is whole, and its halves leave with their share of the
 * letters. The lengths are written twice: here, and in index.html's rules.
 */

import { RollCall } from "./roll-call.js";

// How long a letter takes to draw, the head start the first letter has on the
// last (26 letters on, 60 ms apart), one sweep of the bar, and how long the
// halves take to leave.
const DRAW_MS = 700;
const LAST_LETTER_MS = 1560;
const SWEEP_MS = 1200;
const OPEN_MS = 520;

/**
 * The parts the curtain waits on before it opens. It starts with the mark
 * drawn, one sweep of the bar and the page's first frame; what else the page
 * needs before it shows is expected here too, before those are in.
 */
export const curtain = new RollCall();

let drawn: Promise<void> | undefined;

/** Resolves once the mark has finished drawing; at once when there is no mark or motion is reduced. */
export function whenMarkDrawn(): Promise<void> {
  drawn ??= drawnOnce(document.querySelector("#loading use:last-of-type"));
  return drawn;
}

/** Start the curtain's roll call, and open it once every part is in. */
export function startCurtain(): void {
  curtain.expect("draw");
  curtain.expect("sweep");
  curtain.expect("frame");
  void whenMarkDrawn().then(() => curtain.arrived("draw"));
  void whenBarSwept().then(() => curtain.arrived("sweep"));
  void curtain.whenDone().then(open);
}

/** Say the load failed, under the mark; only a reload helps from here. */
export function failLoader(): void {
  const loading = document.getElementById("loading");
  if (loading !== null) {
    loading.dataset["state"] = "failed";
  }
}

/** Stills the bar under the mark while the curtain waits on the person, at the room's card, rather than on the network. */
export function setCurtainAsking(isAsking: boolean): void {
  const loading = document.getElementById("loading");
  if (loading === null || loading.dataset["state"] === "failed") {
    return;
  }
  if (isAsking) {
    loading.dataset["state"] = "asking";
  } else {
    delete loading.dataset["state"];
  }
}

// The halves part, and the node comes off once they have left. On a timer
// rather than transitionend, which doesn't fire while the page isn't being
// painted, and the curtain would then sit over the page for good.
function open(): void {
  const loading = document.getElementById("loading");
  if (loading === null || loading.dataset["state"] === "failed") {
    return;
  }
  loading.classList.add("done");
  setTimeout(() => loading.remove(), OPEN_MS);
}

// The bar is up from the first paint and stays for one full sweep at least,
// so a fast load never flashes it. Its own animation clock says how much of
// the sweep is left; with motion reduced there is no animation to wait on.
function whenBarSwept(): Promise<void> {
  return new Promise((resolve) => {
    const sweep = document.querySelector("#loading .sweep")?.getAnimations()[0];
    const clock = sweep?.currentTime;
    const elapsed = clock === undefined || clock === null ? SWEEP_MS : Number(clock);
    setTimeout(resolve, Math.max(0, SWEEP_MS - elapsed));
  });
}

// The last letter's draw, as the animation the page's rules started: its own
// promise says when it is done. Nothing animates while the page is
// unpainted, so a timer bounds the wait.
function drawnOnce(lastLetter: Element | null): Promise<void> {
  const animation = lastLetter?.getAnimations()[0];
  if (animation === undefined || animation.playState === "finished") {
    return Promise.resolve();
  }
  return Promise.race([
    animation.finished.then(() => undefined),
    new Promise<void>((resolve) => {
      setTimeout(resolve, DRAW_MS + LAST_LETTER_MS + OPEN_MS);
    }),
  ]);
}
