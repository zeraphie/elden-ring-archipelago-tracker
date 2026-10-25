/**
 * ─ Setup ─
 *
 * Opening the tracker on the slot picked. Each request is a part of a roll
 * call: the room's status, every game's data package, slot_data, the Elden
 * Ring data, the history, the websocket's Connected and what this device kept. They load side by
 * side, and nothing is written to the store before it has loaded, so nothing
 * kept is written over. A part that fails stops the setup and says which,
 * but for the device's own store, which carries on empty when it fails.
 */

import type { StateStorage } from "zustand/middleware";
import type { Found, FoundRoom } from "../archipelago/look-up.js";
import type { RoomLink } from "../archipelago/room-link.js";
import type { RoomWatch } from "../archipelago/room-watch.js";
import type { LoginProblem, SocketOpener } from "../archipelago/room-socket.js";
import type { TrackerPoll } from "../archipelago/tracker-poll.js";
import { getDataPackage, getSlotData, type Fetcher } from "../archipelago/web-api.js";
import {
  isRecord,
  WebApiError,
  type DataPackage,
  type SlotData,
  type WebApiProblem,
} from "../archipelago/web-responses.js";
import { follow, followHistory } from "./follow.js";
import type { ConnectionPhase } from "./slices/connection.js";
import { createTrackerStore, type TrackerStore } from "./store.js";
import { keyChecksFrom } from "./utils/key-checks.js";

/** A part of setting up, as the loader names it. */
export type Part =
  | "status"
  | "data package"
  | "slot data"
  | "elden ring data"
  | "history"
  | "connected"
  | "saved";

/** Every part, in the order the loader lists them. */
export const PARTS: readonly Part[] = [
  "status",
  "data package",
  "slot data",
  "elden ring data",
  "history",
  "connected",
  "saved",
];

/** The parts setting up from this link takes: a tracker link has no room status or websocket. */
export function partsFor(link: RoomLink): readonly Part[] {
  return link.kind === "room"
    ? PARTS
    : PARTS.filter((part) => part !== "status" && part !== "connected");
}

/** Where a part stands. */
export type PartState = "loading" | "in" | "failed";

/** Why a setup stopped: the part that failed, and how. */
export type SetupFailure =
  | { readonly part: Part; readonly problem: WebApiProblem | LoginProblem | "gone" }
  | {
      readonly part: "status";
      readonly problem: "asleep";
      /** When the room was last active, in milliseconds since 1970. */
      readonly since: number;
      /** The room's page, where the player wakes it. */
      readonly page: string;
    };

/** The slot picked to track, and the room's password when it asks for one. */
export interface Choice {
  readonly team: number;
  readonly player: number;
  /** The slot's name, which the login names it by. */
  readonly name: string;
  /** Held in memory for logging in, and never kept. */
  readonly password?: string;
}

/** What setting up needs: who to tell, and the ways to ask, connect, wait, tell the time and keep. */
export interface SetupOptions {
  readonly onPart: (part: Part, state: PartState) => void;
  readonly onReady: () => void;
  readonly onStopped: (failure: SetupFailure) => void;
  /** This tracker's version, such as "0.6.8+2", which a login says as the Archipelago release it's tested against. */
  readonly version: string;
  readonly fetcher?: Fetcher;
  readonly opener?: SocketOpener;
  /** Runs a callback after a while: setTimeout, or a test's own. */
  readonly timer?: (callback: () => void, ms: number) => unknown;
  readonly now?: () => number;
  /** The tracker's database when left out. */
  readonly storage?: StateStorage;
  /** How long, in ms, each part is held back once it's in, so a person can watch them arrive; none when left out. */
  readonly pace?: () => number;
  /** Loads the Elden Ring data: its own file, built apart from the page's code, unless a test hands in its own. */
  readonly loadEldenRing?: () => Promise<EldenRingData>;
}

/** The Elden Ring data the page reads, as its own file loads it. */
export type EldenRingData = typeof import("../data/elden-ring.js");

/** The tracker being opened on a slot: its store, and the room's watch and history feeding it. */
export class Setup {
  /** The room's store, which the page reads once the setup is ready. */
  readonly store: TrackerStore;
  /** The Elden Ring data, once it's loaded; the page reads it with the store. */
  eldenRing: EldenRingData | undefined;
  private readonly parts: readonly Part[];
  private readonly states = new Map<Part, PartState>();
  private readonly unsubscribes: (() => void)[] = [];
  private watch: RoomWatch | undefined;
  private poll: TrackerPoll | undefined;
  private isReady = false;
  private isStopped = false;

  constructor(
    private readonly found: Found,
    private readonly choice: Choice,
    private readonly options: SetupOptions
  ) {
    this.parts = partsFor(found.link);
    let isLoaded: () => void = () => {};
    const loaded = new Promise<void>((resolve) => {
      isLoaded = resolve;
    });
    this.store = createTrackerStore(found.link, {
      now: options.now,
      storage: options.storage,
      onLoaded: (error) => {
        this.mark("saved", error === undefined ? "in" : "failed");
        isLoaded();
      },
    });
    // Storage that answers at once has said its part already.
    for (const part of this.parts.filter((each) => !this.states.has(each))) {
      this.mark(part, "loading");
    }
    // The room's status, or a tracker link's slot_data, came with looking it up.
    this.mark(found.kind === "room" ? "status" : "slot data", "in");
    void this.run(loaded);
  }

  /** Says something to the room while it's connected: a chat line, or a command such as !hint; nothing from a tracker link. */
  say(text: string): void {
    this.watch?.say(text);
  }

  /** Stops setting up, or following once set up: the socket closes and the history stops. */
  stop(): void {
    this.isStopped = true;
    this.unsubscribes.splice(0).forEach((unsubscribe) => unsubscribe());
    this.watch?.stop();
    this.poll?.stop();
    if (this.watch === undefined && this.found.kind === "room") {
      this.found.socket.close();
    }
  }

  private async run(loaded: Promise<void>): Promise<void> {
    const { found, choice, options } = this;
    // In once it's in the store, so the tracker is never ready without its names.
    void this.ask("data package", async () => {
      const names = await dataPackages(found, options.fetcher);
      await loaded;
      if (!this.isStopped) {
        this.store.getState().takePackages(names);
      }
    });
    const slots =
      found.kind === "room"
        ? this.ask("slot data", () => getSlotData(found.status.tracker, options.fetcher))
        : Promise.resolve(found.slotData);
    // In once the slot's key checks are worked out from it and in the store.
    void this.ask("elden ring data", async () => {
      const [data, slotData] = await Promise.all([this.loadEldenRing(), slots]);
      this.eldenRing = data;
      await loaded;
      const mine = slotData?.find(({ player }) => player === choice.player);
      if (!this.isStopped && mine !== undefined) {
        this.store.getState().takeKeyChecks(keyChecksFrom(data, mine.slotData));
      }
    });
    await loaded;
    if (this.isStopped) {
      return;
    }
    this.unsubscribes.push(
      this.store.subscribe(
        (state) => state.connection,
        (phase) => this.onConnection(phase)
      ),
      this.store.subscribe(
        (state) => state.hasPolled,
        (hasPolled) => {
          if (hasPolled) {
            this.mark("history", "in");
          }
        }
      )
    );
    this.store.getState().chooseSlot(choice.team, choice.player);
    if (found.kind === "room") {
      this.logIn(found);
    }
    const slotData = await slots;
    if (slotData !== undefined && !this.isStopped) {
      this.history(slotData);
    }
  }

  // A file that wouldn't load reads as unreachable, as a request that got no answer does.
  private async loadEldenRing(): Promise<EldenRingData> {
    const { loadEldenRing = () => import("../data/elden-ring.js") } = this.options;
    try {
      return await loadEldenRing();
    } catch {
      throw new WebApiError("unreachable", "the Elden Ring data");
    }
  }

  private logIn(found: FoundRoom): void {
    const { choice, options } = this;
    this.watch = follow(this.store, {
      room: found.link.room,
      slot: choice.name,
      password: choice.password,
      version: options.version,
      opened: { socket: found.socket, port: found.status.lastPort },
      fetcher: options.fetcher,
      opener: options.opener,
      timer: options.timer,
      now: options.now,
    });
  }

  // The slot's own slot_data, unless the login has said it already, and the history from then on.
  private history(slotData: readonly SlotData[]): void {
    const { found, choice, options } = this;
    const mine = slotData.find(({ player }) => player === choice.player);
    if (mine === undefined) {
      this.fail({ part: "slot data", problem: "unexpected" });
      return;
    }
    if (this.store.getState().slotData === undefined) {
      this.store.getState().takeSlotData(mine.slotData);
    }
    this.poll =
      found.kind === "room"
        ? followHistory(this.store, {
            tracker: found.status.tracker,
            names: new Map(
              found.slots.flatMap(({ player, name }) => (name ? [[player, name]] : []))
            ),
            slots: slotData,
            fetcher: options.fetcher,
            timer: options.timer,
          })
        : followHistory(
            this.store,
            {
              tracker: found.link.tracker,
              statics: found.statics,
              slots: slotData,
              fetcher: options.fetcher,
              timer: options.timer,
            },
            true
          );
  }

  // The connection as the watch, or the poll for a tracker link, keeps it. Retrying is still loading.
  private onConnection(phase: ConnectionPhase): void {
    switch (phase.phase) {
      case "connected":
        this.mark("connected", "in");
        return;
      case "refused":
        this.fail({ part: "connected", problem: phase.error.problem });
        return;
      case "gone":
        this.fail({ part: this.found.kind === "room" ? "connected" : "history", problem: "gone" });
        return;
      case "asleep":
        this.fail({ part: "status", problem: "asleep", since: phase.since, page: phase.page });
        return;
      default:
        return;
    }
  }

  // Asks for a part, marking it in once answered; a failure stops the setup, and gives undefined.
  private async ask<T>(part: Part, asking: () => Promise<T>): Promise<T | undefined> {
    try {
      const answer = await asking();
      this.mark(part, "in");
      return answer;
    } catch (error) {
      if (!(error instanceof WebApiError)) {
        throw error;
      }
      this.fail({ part, problem: error.problem });
      return undefined;
    }
  }

  // A part coming in waits out the pace first, when there is one; loading shows at once.
  private mark(part: Part, state: PartState): void {
    const { pace, timer = setTimeout } = this.options;
    const wait = state === "loading" ? 0 : (pace?.() ?? 0);
    if (wait > 0) {
      timer(() => this.settle(part, state), wait);
      return;
    }
    this.settle(part, state);
  }

  private settle(part: Part, state: PartState): void {
    if (this.isReady || this.isStopped || !this.parts.includes(part)) {
      return;
    }
    this.states.set(part, state);
    this.options.onPart(part, state);
    // The device's own store carries on empty when it fails, so it doesn't hold the rest up.
    const isDone = this.parts.every((each) => {
      const done = this.states.get(each);
      return done === "in" || (each === "saved" && done === "failed");
    });
    if (isDone) {
      this.isReady = true;
      this.unsubscribes.splice(0).forEach((unsubscribe) => unsubscribe());
      this.options.onReady();
    }
  }

  private fail(failure: SetupFailure): void {
    if (this.isReady || this.isStopped) {
      return;
    }
    this.states.set(failure.part, "failed");
    this.options.onPart(failure.part, "failed");
    this.stop();
    this.options.onStopped(failure);
  }
}

// Every game's data package in the room, by game: their checksums are in RoomInfo, or the static tracker.
async function dataPackages(
  found: Found,
  fetcher: Fetcher | undefined
): Promise<ReadonlyMap<string, DataPackage>> {
  const checksums =
    found.kind === "room" ? roomChecksums(found.socket.info) : [...found.statics.checksums];
  return new Map(
    await Promise.all(
      checksums.map(
        async ([game, checksum]) => [game, await getDataPackage(checksum, fetcher)] as const
      )
    )
  );
}

// RoomInfo's checksums, by game, read with care: it comes straight from the server, unchecked.
function roomChecksums(info: { readonly datapackage_checksums?: unknown }): [string, string][] {
  const field = "RoomInfo.datapackage_checksums";
  const { datapackage_checksums: checksums } = info;
  if (!isRecord(checksums)) {
    throw new WebApiError("unexpected", field);
  }
  return Object.entries(checksums).map(([game, checksum]) => {
    if (typeof checksum !== "string") {
      throw new WebApiError("unexpected", `${field}.${game}`);
    }
    return [game, checksum];
  });
}
