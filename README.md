# Elden Ring Archipelago Tracker

## What it is

[Archipelago](https://archipelago.gg/) is a multiworld, multi-game randomiser, distributing drops across games with "sphere" progression (i.e. early checks in one game should be early checks in another game). Elden Ring has a [release](https://github.com/thefifthmatt/SoulsRandomizers/releases) for Archipelago gameplay and has a [setup guide](https://github.com/fswap/Archipelago/blob/er/worlds/eldenring/docs/en_setup_guide.md) since it's not officially supported (when this readme was written).

Elden Ring can be an incredibly long game for Archipelago gameplay, and has up to ~5k checks, with many kinds of presets available to it with the randomiser. This repo is meant to give information to the player of what checks exist, and roughly where they are, information gotten from the Archipelago room, but displayed in a more readable way.

## Setting up Elden Ring Archipelago

You need the latest Elden Ring version (1.17.2) with Shadow of the Erdtree (if randomising with the dlc), and the [randomizer v0.1.4](https://github.com/thefifthmatt/SoulsRandomizers/releases/tag/eldenring-ap-0.1.4).

0. Install Archipelago from [https://github.com/ArchipelagoMW/Archipelago/releases](https://github.com/ArchipelagoMW/Archipelago/releases), this tracker is tested on version 0.6.8.
1. Extract the randomizer zip to its own folder.
2. If it's open, close the Archipelago Launcher. Copy the eldenring.apworld in the randomizer folder over C:\ProgramData\Archipelago\custom_worlds\eldenring.apworld. Repeat this whenever you update the randomizer, because the apworld and the randomizer versions must match.
3. (if hosting) Put the options.yml (your preset) in C:\ProgramData\Archipelago\Players.
   - (if not hosting) Send the host your preset, and skip to step 6
4. In the Launcher, click Generate. This makes C:\ProgramData\Archipelago\output\AP_XXXXXXXXXXXXXXXXXXXX.zip.
5. Upload the zip at [https://archipelago.gg/uploads](https://archipelago.gg/uploads), then click Create New Room. Note the room address, such as archipelago.gg:51021.
6. Open EldenRingArchipelagoRandomizer.exe and click Refresh Archipelago data. Enter the room address and the slot name: the name: in the preset, 16 characters at most, as longer gets cut. Enter a password if the host uses one and click Load.
7. (optional but recommended) In the randomizer folder's dll\RandomizerHelper_config.ini, set autoUpgradeEquipped = true. Your equipped weapons and spirit ashes then match your highest upgrade level.
8. Click Randomize for Archipelago, then Launch Elden Ring.
9. Create a new character.
10. Play!

## Using it

This repo connects to the room that is set up with Archipelago, utilising websockets and the api to have live information. Simply open [this link](https://izelya.me/elden-ring-archipelago-tracker/), paste in the room link, or a tracker link. Generally it's more preferable to use a room link since that also allows the usage of websockets and has the fullest experience. Using the tracker link means you don't get toasts, live updates, can't chat or `!hint`.

> The room link looks something like https://archipelago.gg/room/xxxxxxxxxxxxxxxxxxxxxx

> The tracker link looks something like https://archipelago.gg/tracker/xxxxxxxxxxxxxxxxxxxxxx

It will then load all the information for you, displaying main goals on the left, the map in the middle, and key item checks/item checks in general on the right. Checks as a whole have been expanded to be full names rather than the standard Archipelago syntax. It's also usable on mobile devices.

Having the tracker on a 2nd screen or other device will then give you information about what checks other players are sending you via toasts (although these will appear in game as well), as well as live updating when you make a check as well, you don't need to interact with it, but if you're looking for a particular item the search can be used or you can click on each region in the map and scroll through the list of checks.

A goal completed screen will come up when you've successfully cleared your game - in some setups, this may not release the items from the rest of your game, but the host can release the items for you. If you have permissions to release the game, and are using the room link, you can do so from the tracker.

## Running it locally

This repo is built on Bun, Node, Vite, TypeScript & Lit.

```bash
bun install
bun run dev # serves http://localhost:5173/elden-ring-archipelago-tracker/
bun run build # writes dist/
bun run preview # serves the build
bun run check # checks formatting, lint, typecheck, tests, the reuse check, the catalogue
bun run format
```

The development build includes a few helper buttons, to trigger a fake version of making a check, defeating a goal boss, receiving an item, finishing the run and a swap to an all bosses preset.

As part of the setup for [Elden Ring Archipelago](https://github.com/thefifthmatt/SoulsRandomizers/releases), an eldenring.apworld file is included. There are a few commands that can be used to regenerate the data in the repo when there's an update. First make sure to unzip the eldenring.apworld file somewhere, then point to the relevant files for the command in that folder.

```bash
# Update the repo's data
bun run bosses <bosses.py>
bun run location-groups <locations.py>
bun run region-graph <__init__.py> <locations.py>

# Runs a report, listing what's still to name
bun run places <locations.py>
bun run key-spots <apworld folder> # also writes a test fixture
```

## AI disclosure

Claude Code was used to write the code, alongside my [ai-usage](https://github.com/zeraphie/ai-usage) plugin for Claude. The route I have for working with it is:

- A detailed research step - led from my own experience/intuition as a developer of 13+ years, and a place to compile all that research into the project
- An ADR is made to list all the questions and decisions made for the project - decisions vary from as wide reaching as what architecture/libraries to use, to the smallest of details like how much border radius should be used for a button
- A mockup phase is done to test the ui/ux - I decide on a design language to use, in this case I wanted something Elden Ring flavoured, and all of the interactions/layout etc
- A plan is made for implementation, stopping at each step listing questions, changes, reuse and a QA step handled by myself

Places and key spots were drafted by Claude from [Bedrock's apworld](https://github.com/thefifthmatt/SoulsRandomizers/releases)'s codes, and then cross referenced and checked individually by myself against the [Elden Ring wiki](https://eldenring.wiki.gg/), [FextraLife](https://eldenring.wiki.fextralife.com/Elden_Ring_Wiki), [Mapgenie](https://mapgenie.io/elden-ring/maps/the-lands-between) and my own knowledge of the game. Item names come from the room's data package, and boss names from the apworld's `bosses.py`.

I go through every change made via Claude Code myself, so that I don't have gaps in my own knowledge of the project, and can own the codebase as well as support it.

## Credits

- This repo uses some [images](./src/icons/credits.txt) from the [Elden Ring Wiki](https://eldenring.wiki.gg/), most of which it tags as copyrighted game content (by FromSoftware and Bandai Namco) used under fair use.
  - Elden Ring wiki's editor Torbi has uploaded two of the emblems used
- This repo uses data from the [Elden Ring apworld](./src/data/apworld-licence.txt), copyright (c) 2026 Bedrock, under its Modified MIT License.
- This repo uses fonts under the SIL Open Font License 1.1 in [`src/fonts/licences`](./src/fonts/licences)
- This repo is built with Lit (BSD-3-Clause), zustand (MIT) and immer (MIT), with archipelago.js (MIT) for the protocol's types.

This repo's code is under the MIT licence in [LICENSE](./LICENSE), [NOTICE](./NOTICE) says what it doesn't cover, and each built copy of the site carries every licence it ships in [licences.txt](https://izelya.me/elden-ring-archipelago-tracker/licences.txt).
