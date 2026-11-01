import { DEMO_LINK } from "../archipelago/room-link.js";
import type { DemoWays } from "../state/entry.js";
import { presetOf, runsEntry } from "../state/run-history.js";
import { keptEntry } from "../state/store.js";
import { memoryStorage } from "../storage/memory.js";
import { demoSlotData } from "./room.js";
import { demoEarlierRuns, demoRun } from "./run.js";
import { demoOpener } from "./socket.js";
import { demoFetcher } from "./web.js";

/** What the demo goes by: the stand-ins for archipelago.gg, and storage that goes with the page, holding the run it opens on and the runs behind it. */
export function demoWays(): DemoWays {
  return {
    fetcher: demoFetcher(),
    opener: demoOpener(),
    storage: memoryStorage([
      keptEntry(DEMO_LINK, { run: demoRun() }),
      runsEntry(presetOf(demoSlotData()) ?? "", demoEarlierRuns()),
    ]),
  };
}
