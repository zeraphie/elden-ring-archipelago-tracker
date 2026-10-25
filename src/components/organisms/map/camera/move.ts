/**
 * ─ Move ─
 *
 * How the camera goes somewhere by itself: a glide of one length, or a jump
 * for a person who asked for less motion. The zoom buttons and the whole-map
 * button come through here, so they take the same time, honour the same
 * preference, and step by the same amount.
 */

import type { Camera } from "./camera.js";
import type { CameraState, ViewSize } from "./camera-math.js";
import { isMotionReduced } from "../../../utils/motion.js";
import { glide } from "./glide.js";

/** How long a move takes: long enough to follow, short enough not to wait for. */
export const MOVE_MS = 600;

/** A quarter per press of a zoom button, the step Figma's zoom buttons take. */
export const ZOOM_STEP = 1.25;

/** Take the camera to `to`, gliding, or at once under reduced motion; returns a function that stops the move. */
export function moveTo(camera: Camera, to: CameraState, size: ViewSize): () => void {
  return glide(camera, to, size, isMotionReduced() ? 0 : MOVE_MS);
}
