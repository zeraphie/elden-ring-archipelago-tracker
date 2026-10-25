/**
 * ─ Entry curtain ─
 *
 * Holds the curtain for the way in. The room's card holds it until the
 * tracker is ready, and each part being set up joins its roll call while it
 * loads, so the roll call says what's still loading. While the card waits on
 * the person rather than the network, the bar under the mark is stilled.
 */

import type { EntryPhase, EntryStore } from "../../../state/entry.js";
import { PARTS } from "../../../state/setup.js";
import { curtain, setCurtainAsking } from "./curtain.js";

// A beat once the last part is in, as the design has it, so its dot is seen before the halves part.
const READY_BEAT_MS = 250;

/** Holds the curtain until the way in is ready; call it before the curtain's own parts are all in. */
export function holdCurtainFor(entry: EntryStore): void {
  curtain.expect("room");
  entry.subscribe(
    (state) => state.parts,
    (parts) => {
      // A part no longer listed, as after another room is picked, has nothing left to wait on.
      for (const part of PARTS) {
        if (parts.some((each) => each.part === part && each.state === "loading")) {
          curtain.expect(part);
        } else {
          curtain.arrived(part);
        }
      }
    }
  );
  entry.subscribe(
    (state) => state.phase,
    (phase) => {
      setCurtainAsking(isAsking(phase));
      if (phase.phase === "ready") {
        setTimeout(() => curtain.arrived("room"), READY_BEAT_MS);
      }
    },
    { fireImmediately: true }
  );
}

// Whether the card is waiting on the person: for a link, a slot, a password, a sleeping room or a choice after a failure.
function isAsking({ phase }: EntryPhase): boolean {
  return phase !== "looking" && phase !== "loading" && phase !== "ready";
}
