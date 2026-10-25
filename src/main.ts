/**
 * ─ Entry ─
 *
 * As little as can be: the faces, tokens and ground, and the curtain. The app
 * comes as its own chunk, run only once the mark has drawn, since running it
 * shares the thread the draw runs on. Its first frame, faces in hand, is the
 * curtain's last part so far.
 */

import "./fonts.css";
import "./tokens.css";
import "./base.css";
import {
  curtain,
  failLoader,
  startCurtain,
  whenMarkDrawn,
} from "./components/organisms/intro/curtain.js";

async function boot(): Promise<void> {
  startCurtain();
  await whenMarkDrawn();
  await import("./components/er-app.js");
  const app = document.querySelector("er-app");
  if (app === null) {
    throw new Error("index.html has no <er-app> element for the page to start in");
  }
  await app.updateComplete;
  await document.fonts.ready;
  await new Promise((resolve) => requestAnimationFrame(resolve));
  curtain.arrived("frame");
}

boot().catch((error: unknown) => {
  failLoader();
  reportError(error);
});
