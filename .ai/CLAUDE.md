# Elden Ring Tracker — CLAUDE.md

A static GitHub Pages site. A person pastes an archipelago.gg room or
tracker URL and gets a live, readable Elden Ring Archipelago tracker:
checks grouped by area with full names, a map overview, a goal
checklist, a multiworld overview, areas ticking live as locks and keys
arrive, and a `!hint` command box whose results are the only thing that
reveals unfound items or hint lists. The stack is Bun, TypeScript, Vite
and Lit. The shared base (the workflow, reuse, style, testing and
security, and the stack layers named in `.ai/base.json`) comes from the
ai-usage plugin; this file holds only what is this project's own.
**Local until Izzy asks: never create a remote, push or deploy
unprompted.**

## House rules

- **The websocket is the source of truth.** Whatever a new message
  from Archipelago says about a check, a hint, an item, an area's lock
  or the goal replaces whatever the UI held before, no reconciliation
  with earlier state. State the UI shows is what the latest message
  says.
- **Nothing unfound is revealed.** Items not yet found, and hints not
  yet returned by a `!hint`, are not shown and not hinted at in the UI,
  the DOM or the console. A successful `!hint` is the only path from
  unknown to known.
- **Full names over abbreviations** in anything a person reads. The
  mapping from Archipelago's short names to Elden Ring's full names
  lives beside the static domain data.

## Where things live

- `src/components/` holds the Lit custom elements: the room entry,
  the map, the area panels, the goal checklist, the multiworld
  overview, the hint box. They sort by atomic design's layers:
  `atoms/` (style fragments), `molecules/`, `organisms/` and
  `utils/`, with the page, `er-app`, at the root. Each organism is a
  folder holding all its own parts, its smaller elements and helpers
  included: `organisms/map/`, `organisms/intro/` (the room card and
  the curtain), `organisms/header/`, `organisms/goal-menu/`. What
  more than one organism takes sits in the shared `atoms/`,
  `molecules/` and `utils/`.
- `src/archipelago/` holds the Archipelago protocol code: the
  websocket client, the web API and the message types.
- `src/state/` holds the zustand store of what the tracker knows of a
  room, made of slices, with what they share in `utils/`.
- `src/storage/` holds the IndexedDB database the store persists to,
  and what's kept for the person on this device through localStorage.
- `src/data/` holds the Elden Ring static domain data: areas, their
  checks, the item name map, the goal list.
- `src/demo/` holds what typing `demo` opens: a room with no server,
  the mock data the tests and demos run on.
- Import rules, as `tools/reuse.config.ts` holds them: `src/components`
  may take from its own layers, `src/archipelago`, `src/state` and
  `src/data`; its molecules from atoms, utils and those three; its
  atoms from atoms alone; its utils from utils and those three; an
  organism from its own folder, the shared layers and those three,
  never another organism's parts; the page from every layer, the
  intro's curtain included;
  `src/state` from `src/archipelago`, `src/data` and `src/storage`;
  `src/archipelago` from `src/data`; `src/demo` from `src/state`,
  `src/archipelago` and `src/data`; `src/data` and `src/storage` take
  from nothing else in the app.

## What exists

@CATALOGUE.md

## Key paths

- `.ai/base.json`: the stack layers and options this project takes
- `.ai/CATALOGUE.md`: what's shared, written by `bun run catalogue`
- `tools/reuse.config.ts`: the reuse table and the import rules
- `.plan/`: local-only research, ADRs and plans (gitignored)
- `.claude/threads/`: saved Claude conversations kept for the claude.ai Project (gitignored)
- `src/archipelago/`: the live protocol client and the web API
- `src/state/`: the tracker's store and its slices
- `src/storage/`: the IndexedDB database and the device's own storage
- `src/data/`: static Elden Ring domain data
- `src/demo/`: the demo room, the mock data the tests and demos run on
- `src/components/`: the Lit elements the page is made of
