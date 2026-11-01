/**
 * ─ Entry ─
 *
 * The way in, as the card under the mark shows it. A pasted link is looked
 * up. A room asleep waits, checked again every minute, until the player wakes
 * it. The slots are offered, only Elden Ring's pickable, with a password asked
 * for only when the room wants one. Connecting sets the tracker up part by
 * part, and a returning visit offers the last room and slot again. A link
 * handed in by the page's address fills the form, unless it's the room of the
 * last visit, which is offered as before. The password is held here in memory
 * only, for trying again. The demo takes the same way in, on stand-ins for
 * archipelago.gg loaded only when it's asked for, and keeps nothing.
 */

import type { StateStorage } from "zustand/middleware";
import { subscribeWithSelector } from "zustand/middleware";
import { createStore, type Mutate, type StoreApi } from "zustand/vanilla";
import { lookUp, type Found, type LookUpOptions, type RoomSlot } from "../archipelago/look-up.js";
import {
  isDemo,
  linkPage,
  readRoomLink,
  type LinkProblem,
  type RoomLink,
} from "../archipelago/room-link.js";
import { forgetVisit, lastVisit, rememberVisit, type Visit } from "./last-visit.js";
import {
  PARTS,
  partsFor,
  Setup,
  type Choice,
  type EldenRingData,
  type Part,
  type PartState,
  type SetupFailure,
} from "./setup.js";
import { forgetKept, type TrackerStore } from "./store.js";

/** Why the way in went back to the link: the link itself, or what archipelago.gg said of it. */
export type EntryProblem =
  | { readonly kind: "link"; readonly problem: LinkProblem; readonly host?: string }
  | { readonly kind: "gone" }
  | { readonly kind: "unreachable" }
  | { readonly kind: "unexpected"; readonly field: string };

/** Where the way in stands, as the card shows it. */
export type EntryPhase =
  /** Reading the last visit from this device. */
  | { readonly phase: "starting" }
  | { readonly phase: "entry"; readonly problem?: EntryProblem }
  | { readonly phase: "returning"; readonly visit: Visit; readonly needsPassword: boolean }
  | { readonly phase: "looking" }
  | {
      readonly phase: "asleep";
      /** When the room was last active, in milliseconds since 1970. */
      readonly since: number;
      /** The room's page, where the player wakes it. */
      readonly page: string;
    }
  /** Made with an Elden Ring world the tracker can't read: this is as far as it goes. */
  | {
      readonly phase: "unsupported";
      /** The room's or tracker's own page. */
      readonly page: string;
    }
  | {
      readonly phase: "slots";
      readonly slots: readonly RoomSlot[];
      /** A tracker link, which leads to the reduced tracker. */
      readonly isTracker: boolean;
      readonly chosen: { readonly team: number; readonly player: number } | undefined;
      readonly needsPassword: boolean;
    }
  | { readonly phase: "loading" }
  | { readonly phase: "failed"; readonly failure: SetupFailure }
  | {
      readonly phase: "ready";
      readonly store: TrackerStore;
      readonly data: EldenRingData;
      /** Says something to the room, a chat line or a command such as !hint, while it's connected. */
      readonly say: (text: string) => void;
    };

/** One part of setting up, and where it stands. */
export interface PartStanding {
  readonly part: Part;
  readonly state: PartState;
}

/** The way in, and what can be done there. */
export interface EntryState {
  readonly phase: EntryPhase;
  /** The parts being set up, in the loader's order; empty until connecting. */
  readonly parts: readonly PartStanding[];
  /** The link the page's address handed in, for the form to start with. */
  readonly linked: string | undefined;
  /** Reads the last visit, and offers it when there is one and no link leads elsewhere. */
  start(): Promise<void>;
  /** Looks up a pasted link. */
  lookUp(text: string): void;
  /** Picks an Elden Ring slot from those offered. */
  choose(team: number, player: number): void;
  /** Connects on the slot picked, with the room's password when it asks for one. */
  connect(password?: string): void;
  /** Connects on the last visit's room and slot. */
  connectLast(password?: string): void;
  /** Asks a sleeping room's status again now, rather than at the next minute. */
  checkAgain(): void;
  /** After a failure: back to the password when it was refused, or sets up again. */
  tryAgain(): void;
  /** Leaves this room for another link, stopping whatever was under way. */
  anotherRoom(): void;
}

/** The way in's store, subscribed to by selector. */
export type EntryStore = Mutate<StoreApi<EntryState>, [["zustand/subscribeWithSelector", never]]>;

/** What the way in needs: the ways to ask, connect, wait, tell the time and keep. */
export interface EntryOptions extends LookUpOptions {
  /** This tracker's version, such as "0.6.8+2", which a login says as the Archipelago release it's tested against. */
  readonly version: string;
  /** Runs a callback after a while: setTimeout, or a test's own. */
  readonly timer?: (callback: () => void, ms: number) => unknown;
  /** The tracker's database when left out. */
  readonly storage?: StateStorage;
  /** How long, in ms, each part is held back once it's in, so a person can watch them arrive; none when left out. */
  readonly pace?: () => number;
  /** A link the page's address hands in, such as `?room=` holds. */
  readonly linked?: string;
  /** Loads what the demo goes by in place of these, once it's asked for. */
  readonly demo?: () => Promise<DemoWays>;
}

/** What the demo goes by: how it asks, connects and keeps, with no room behind them. */
export type DemoWays = Required<Pick<EntryOptions, "fetcher" | "opener" | "storage">>;

// How often a sleeping room's status is asked again.
const ASLEEP_MS = 60_000;

/** A way in, starting from nothing until `start` reads the last visit. */
export function createEntryStore(options: EntryOptions): EntryStore {
  const { timer = setTimeout, storage, linked, demo } = options;
  // What's under way, held here rather than in the state: a socket and a password aren't for showing.
  let link: RoomLink | undefined;
  // The ways the link being followed goes by: these, or the demo's.
  let ways: EntryOptions = options;
  let visit: Visit | undefined;
  let found: Found | undefined;
  let choice: Choice | undefined;
  let setup: Setup | undefined;
  let isReturning = false;
  // What a sleeping room goes on to once it wakes: its slots, or connecting on the slot chosen.
  let afterSleep: "slots" | "connect" = "slots";
  // Each new course of action is a new attempt; an answer to an older one is let go.
  let attempt = 0;

  return createStore<EntryState>()(
    subscribeWithSelector((set, get) => {
      const halt = (): number => {
        attempt += 1;
        setup?.stop();
        setup = undefined;
        if (found?.kind === "room") {
          found.socket.close();
        }
        found = undefined;
        return attempt;
      };

      const showSlots = (looked: Found): void => {
        found = looked;
        const offered = looked.slots.filter(({ isEldenRing }) => isEldenRing);
        const named = looked.kind === "tracker" ? looked.link : undefined;
        const pick =
          offered.find((slot) => slot.team === choice?.team && slot.player === choice.player) ??
          offered.find((slot) => slot.team === named?.team && slot.player === named.slot) ??
          (offered.length === 1 ? offered[0] : undefined);
        set({
          phase: {
            phase: "slots",
            slots: looked.slots,
            isTracker: looked.kind === "tracker",
            chosen: pick && { team: pick.team, player: pick.player },
            needsPassword: looked.kind === "room" && looked.needsPassword,
          },
          parts: [],
        });
      };

      const setUp = (looked: Found, chosen: Choice): void => {
        const token = halt();
        const states = new Map<Part, PartState>();
        const needsPassword = looked.kind === "room" && looked.needsPassword;
        set({ phase: { phase: "loading" }, parts: [] });
        const { storage: keeping } = ways;
        setup = new Setup(looked, chosen, {
          ...ways,
          onPart: (part, state) => {
            if (token !== attempt) {
              return;
            }
            states.set(part, state);
            set({ parts: PARTS.flatMap((each) => standing(each, states.get(each))) });
          },
          onReady: () => {
            const ready = setup;
            const data = ready?.eldenRing;
            if (token !== attempt || ready === undefined || data === undefined) {
              return;
            }
            set({
              phase: { phase: "ready", store: ready.store, data, say: (text) => ready.say(text) },
            });
            const { team, player, name } = chosen;
            void rememberVisit({ link: looked.link, team, player, name, needsPassword }, keeping);
          },
          onStopped: (failure) => {
            if (token !== attempt) {
              return;
            }
            setup = undefined;
            if (failure.problem === "asleep") {
              sleep(failure, "connect");
              return;
            }
            if (failure.problem === "gone") {
              forget(looked.link);
            }
            set({ phase: { phase: "failed", failure } });
          },
        });
      };

      // Connects on the slot chosen, when the room still has it and has its password.
      const connectTo = (looked: Found): void => {
        const slot = looked.slots.find(
          ({ team, player, name, isEldenRing }) =>
            isEldenRing && team === choice?.team && player === choice.player && name === choice.name
        );
        if (slot === undefined || choice === undefined) {
          showSlots(looked);
          return;
        }
        if (looked.kind === "room" && looked.needsPassword && !choice.password) {
          if (isReturning && visit !== undefined) {
            looked.socket.close();
            set({ phase: { phase: "returning", visit, needsPassword: true }, parts: [] });
            return;
          }
          showSlots(looked);
          return;
        }
        setUp(looked, choice);
      };

      // The ways a link goes by; undefined when the demo's wouldn't load.
      const waysFor = async (following: RoomLink): Promise<EntryOptions | undefined> => {
        if (!isDemo(following) || demo === undefined) {
          return options;
        }
        try {
          return { ...options, ...(await demo()) };
        } catch {
          return undefined;
        }
      };

      // Looks the link up, then offers its slots or connects on the slot already chosen.
      const look = async (then: "slots" | "connect"): Promise<void> => {
        if (link === undefined) {
          return;
        }
        const token = halt();
        const following = link;
        set(
          then === "slots"
            ? { phase: { phase: "looking" }, parts: [] }
            : {
                phase: { phase: "loading" },
                parts: partsFor(following).map((part) => ({ part, state: "loading" })),
              }
        );
        const opened = await waysFor(following);
        if (token !== attempt) {
          return;
        }
        if (opened === undefined) {
          back({ kind: "unreachable" }, then);
          return;
        }
        ways = opened;
        const result = await lookUp(following, ways);
        if (token !== attempt) {
          if (result.kind === "found" && result.found.kind === "room") {
            result.found.socket.close();
          }
          return;
        }
        switch (result.kind) {
          case "found":
            if (then === "slots") {
              showSlots(result.found);
            } else {
              connectTo(result.found);
            }
            return;
          case "unsupported":
            set({ phase: { phase: "unsupported", page: result.page }, parts: [] });
            return;
          case "asleep":
            sleep(result, then);
            return;
          case "gone":
            forget(following);
            back({ kind: "gone" }, then);
            return;
          default:
            back(result, then);
        }
      };

      const sleep = (asleep: { since: number; page: string }, then: "slots" | "connect"): void => {
        const token = attempt;
        set({ phase: { phase: "asleep", since: asleep.since, page: asleep.page }, parts: [] });
        afterSleep = then;
        timer(() => {
          if (token === attempt) {
            void look(then);
          }
        }, ASLEEP_MS);
      };

      // Looking up came to nothing: back to the link with why, or, while connecting, a failure.
      const back = (
        problem: Exclude<EntryProblem, { kind: "link" }>,
        then: "slots" | "connect"
      ) => {
        if (then === "slots") {
          set({ phase: { phase: "entry", problem }, parts: [] });
          return;
        }
        const part = link?.kind === "tracker" ? "slot data" : "status";
        const failure: SetupFailure =
          problem.kind === "unexpected"
            ? { part, problem: "unexpected" }
            : { part, problem: problem.kind };
        set({ phase: { phase: "failed", failure }, parts: standing(part, "failed") });
      };

      // Whether the page's address leads somewhere other than the last visit's room.
      const leadsElsewhere = (kept: Visit): boolean => {
        const reading = linked === undefined ? undefined : readRoomLink(linked);
        return (
          reading !== undefined &&
          (!("link" in reading) || linkPage(reading.link) !== linkPage(kept.link))
        );
      };

      // A room archipelago.gg no longer has: what this device kept of it goes, and the visit with it.
      const forget = (gone: RoomLink): void => {
        void forgetKept(gone, storage);
        if (isReturning) {
          void forgetVisit(storage);
          visit = undefined;
        }
      };

      return {
        phase: { phase: "starting" },
        parts: [],
        linked,
        start: async () => {
          const kept = await lastVisit(storage);
          if (get().phase.phase !== "starting") {
            return;
          }
          visit = kept;
          set({
            phase:
              kept === undefined || leadsElsewhere(kept)
                ? { phase: "entry" }
                : { phase: "returning", visit: kept, needsPassword: kept.needsPassword },
          });
        },
        lookUp: (text) => {
          const reading = readRoomLink(text);
          if ("problem" in reading) {
            halt();
            set({ phase: { phase: "entry", problem: { kind: "link", ...reading } }, parts: [] });
            return;
          }
          link = reading.link;
          choice = undefined;
          isReturning = false;
          void look("slots");
        },
        choose: (team, player) => {
          const { phase } = get();
          const slot =
            phase.phase === "slots"
              ? phase.slots.find((each) => each.team === team && each.player === player)
              : undefined;
          if (phase.phase === "slots" && slot?.isEldenRing) {
            set({ phase: { ...phase, chosen: { team, player } } });
          }
        },
        connect: (password) => {
          const { phase } = get();
          if (phase.phase !== "slots" || phase.chosen === undefined || found === undefined) {
            return;
          }
          const { team, player } = phase.chosen;
          const slot = phase.slots.find((each) => each.team === team && each.player === player);
          if (slot?.name === undefined) {
            return;
          }
          const looked = found;
          // The socket goes to the setup now, so stopping what was under way mustn't close it.
          found = undefined;
          choice = { team, player, name: slot.name, password };
          setUp(looked, choice);
        },
        connectLast: (password) => {
          const { phase } = get();
          if (phase.phase !== "returning") {
            return;
          }
          const { link: last, team, player, name } = phase.visit;
          link = last;
          choice = { team, player, name, password };
          isReturning = true;
          void look("connect");
        },
        checkAgain: () => {
          if (get().phase.phase === "asleep") {
            void look(afterSleep);
          }
        },
        tryAgain: () => {
          const { phase } = get();
          if (phase.phase !== "failed" || choice === undefined) {
            return;
          }
          const { problem } = phase.failure;
          if (problem === "invalid password") {
            choice = { ...choice, password: undefined };
            if (isReturning && visit !== undefined) {
              halt();
              set({ phase: { phase: "returning", visit, needsPassword: true }, parts: [] });
              return;
            }
          }
          const isPicking = problem === "invalid password" || problem === "invalid slot";
          void look(isPicking ? "slots" : "connect");
        },
        anotherRoom: () => {
          halt();
          link = undefined;
          choice = undefined;
          isReturning = false;
          set({ phase: { phase: "entry" }, parts: [] });
        },
      };
    })
  );
}

function standing(part: Part, state: PartState | undefined): PartStanding[] {
  return state === undefined ? [] : [{ part, state }];
}
