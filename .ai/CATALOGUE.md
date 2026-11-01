# Catalogue: what exists, before you write

Written by `bun run catalogue` from the doc comments, never by hand.
Listed is what is shared: every name a file in another folder takes,
and every name in a folder that exists to be taken. Grouped by folder,
then file; a file's takers are the folders that take from it. Look
here first, then search the source, then write.

## tools

**tools/apworld-source.ts**
- `SourceCall`: A call in the source: where its name starts, and its arguments as text, split at top-level commas.
- `callsIn()`: Every call to `callee` in the source, left out where its line is commented out.
- `piecesFrom()`: The top-level pieces of a bracketed run, from just inside its opening bracket to its close, split at commas, with comments dropped and empty pieces left out.
- `listAt()`: The pieces of the list that opens on `opening`, such as `region_order = [`; empty when it isn't there.
- `RegionOrders`: The base game's and the DLC's regions, in the apworld's order.
- `regionOrdersFrom()`: The regions in the apworld's region_names.py, in its order.
- `pythonString()`: A Python string literal's value: `"Fia's Champions"` or `'say \"hi\"'`.
- `trueKeywords()`: The names of a call's keyword arguments that are set to True.
- `APWORLD_LICENCE`: The apworld's copyright and licence, as the notice of a file built from its source ends.

**tools/archipelago-release.ts**
- `LATEST_RELEASE_URL`: Where GitHub's API gives Archipelago's latest release, pre-releases left out.
- `releaseVersion()`: A release's version, from its tag such as "0.6.8"; undefined for a tag in any other form.
- `watchOutputs()`: The watch's step outputs, one `name=value` to a line: the latest release, the release the tracker is tested against, and whether the latest is newer.

**tools/catalogue.ts**
- `CatalogueConfig`: How a project's catalogue is made, in `tools/reuse.config.ts`.
- `DEFAULT_OUT`: Where a catalogue is written when the config names nowhere.
- `Catalogue`: The catalogue's text, and every listed function or class with no doc comment.
- `openingOf()`: A doc comment's opening sentence: up to the first full stop outside code, or its first paragraph.
- `catalogueOf()`: The catalogue of `texts`, a map of path to file text, read from `sources`.

**tools/copies.ts**
- `COPIED`: The files a project's `tools/` gets, the plugin's names and the copy's.
- `stamped()`: `source` as a copy: the stamp, then the source as it is.
- `copyProblem()`: What is wrong with a copy, or `undefined` when it is a true copy: no stamp, or a body that no longer matches its hash.
- `isCurrent()`: Whether `copy` holds what the plugin's `source` holds now.

**tools/files.ts**
- `filesUnder()`: Every file under `folder` that `pattern` matches, as paths from `root` with forward slashes, in name order; none when the folder does not exist.
- `configIn()`: The project's `reuse.config.ts`, from the folder `tools` that holds it beside the tools.
- `textsUnder()`: The text of every file under `folders` that `pattern` matches, and of each of `files`, by path from `root`.

**tools/imports.ts**
- `ImportRule`: What one area of the project may take from the others.
- `areaOf()`: The deepest of `areas` that holds `path`, or `undefined` when none does.
- `importProblems()`: Every import in `texts`, a map of path to file text, that breaks a rule, and every rule that is written wrong.

**tools/key-spots-report.ts**
- `priorityGroupsOf()`: The priority groups a location is in, as the apworld's location_groups() puts it: a boss drop by `bossDrops`, the rest by its own keywords.
- `possibleKeySpots()`: Every location a host can make a key check: in a priority group, and not missable, in the apworld's order.
- `unnamedSpots()`: The spots with no full name yet, by the region each is listed under, in the order given.
- `possibleKeySpotsModule()`: The source of tests/fixtures/possible-key-spots.ts for these spots.
- `POSSIBLE_KEY_SPOTS`: Every location a host can make a key check, by Archipelago name: those in the 21 priority groups, missable spots left out.

**tools/place-names-report.ts**
- `PlaceUse`: A place key the apworld uses, how many location names use it, and the region it's listed under.
- `locationNamesIn()`: Every location name in the apworld's locations.py source: the first string each ERLocationData call is given.
- `unnamedPlaces()`: The place keys these names use, before their colon or inside their descriptions, and have no name for, in the order first used, each with its count.

**tools/reuse.ts**
- `Row`: One shared piece in a project's table.
- `ReuseMode`: How thorough a project's reuse is.
- `ReuseConfig`: What a project tells the reuse check, in `tools/reuse.config.ts`.
- `countsTypes()`: Whether a type-only import counts, from the config's own setting or else its mode.
- `catalogueSettings()`: How the catalogue is made, or `undefined` when the project has none.
- `DEFAULT_PATTERN`: The files a check reads when the config names no pattern.
- `lineOf()`: The line `at` falls on in `text`, counted from 1.
- `tableProblems()`: Every problem the table finds in `texts`, a map of path to file text: a copy outside its home, and a home or excused file that no longer writes its pattern.

**tools/write-bosses.ts**
- `GoalBoss`: A boss a goal can name, read from bosses.py.
- `BossArenas`: Every boss's arena from bosses.py, and the ids Rykard and the serpent have before enemy rando moves them.
- `goalBossesFrom()`: The bosses a goal can name from bosses.py's ERBossInfo calls: those with a defeat flag that can't be missed, names spelled as the game spells them.
- `bossArenasFrom()`: Every boss's arena from bosses.py's ERBossInfo calls, and the ids Rykard and the serpent start with.
- `bossesModule()`: The source of src/data/bosses/bosses.ts for these bosses and arenas.
- `Boss`: A boss a goal can name: its name, the area code its apworld name carries in brackets, and the locations its defeat drops.
- `BOSSES`: Every boss a goal can name, by the flag the game sets when it's defeated.
- `ARENA_DROPS`: What each boss's defeat drops, by the game's id for the boss, as slot_data's forceBosses names them: the drops a boss moved into its arena guards.
- `RYKARD_ID`: The game's id for Rykard, Lord of Blasphemy, before enemy rando moves him.
- `SERPENT_ID`: The game's id for the God-Devouring Serpent, before enemy rando moves it.

**tools/write-demo-room.ts**
- `CheckRun`: A run of checks: the first id, how many ids follow on from it, and their tile, or "" off the map.
- `DemoRoom`: What the demo keeps of a seed's Elden Ring slot.
- `demoRoomFrom()`: What the demo keeps of the Elden Ring slot in a decoded multidata, by the location table's order.
- `demoRoomModule()`: The source of src/demo/room-data.ts for this room.
- `ROOM_OPTIONS`: The room's options, as slot_data gives them, but for those that list locations.
- `ROOM_LOCATIONS`: The options that list locations, as indices into the location table.
- `ROOM_GOAL`: The room's goal bosses, by the flag the game sets when each is defeated.
- `ROOM_CHECKS`: Every check in the room, in order of id.

**tools/write-location-groups.ts**
- `EXCLUDABLE_GROUPS`: The groups a host can exclude locations by, in the apworld's own words.
- `LocationFacts`: What the key-check rebuild and the rules need to know of one location.
- `locationFactsFrom()`: Each location's facts from the apworld's locations.py and region_names.py sources, events left out.
- `locationGroupsModule()`: The source of src/data/checks/location-groups.ts: every location, with its region.
- `LocationGroups`: What a room's key checks and rules need to know of a location.
- `LOCATION_GROUPS`: Each location's groups and region, by its Archipelago name.

**tools/write-region-graph.ts**
- `RegionSource`: The regions and always-on connections of the base game and the DLC.
- `regionSourceFrom()`: The regions and always-on connections from the apworld's __init__.py and region_names.py.
- `regionConnectionsModule()`: The source of src/data/rules/regions/region-connections.ts.
- `BASE_REGIONS`: The base game's regions, in the apworld's order.
- `DLC_REGIONS`: The DLC's regions, in the apworld's order.
- `BASE_CONNECTIONS`: The base game's connections that hold whenever it's on, as [from, to].
- `DLC_CONNECTIONS`: The DLC's connections that hold whenever it's on, as [from, to].

## src/archipelago

**src/archipelago/elden-ring-slot.ts** (src/state)
- `readCheckNames()`: Each check in an Elden Ring slot's room, by id, named by the game's data package; undefined in any other shape.
- `readKeyCheckSlotData()`: The part of an Elden Ring slot's slot_data that its key checks are rebuilt from, with its checks' names; undefined in any other shape.
- `readRulesSlotData()`: The part of an Elden Ring slot's slot_data its rules and goal are read from; undefined in any other shape.
- `readMapSlotData()`: The part of an Elden Ring slot's slot_data that places its checks on the map: each check's key and name, by id; undefined in any other shape.

**src/archipelago/hints.ts** (src/components/organisms, src/state)
- `hintsAvailable()`: How many hints these points buy, at a cost above nothing.
- `pointsToNextHint()`: How many more points the next hint takes, at a cost above nothing.

**src/archipelago/live-events.ts** (src/components/organisms, src/demo, src/state)
- `MessagePart`: One part of a message's text: plain, or an id to name, with what's known of it.
- `LiveEvent`: Something the room said, as the tracker reads it.

**src/archipelago/look-up.ts** (src/components/organisms, src/components/utils, src/demo, src/state, tools)
- `ELDEN_RING`: Elden Ring's name as Archipelago gives a slot's game.

**src/archipelago/release.ts** (src/components/organisms, src/state)
- `ReleaseState`: What becomes of a slot's items left after its goal: sent already, the slot's to send, the admin's alone, or not known.
- `releaseAfterGoal()`: What becomes of the slot's items left, its goal done, by the room's release permission (undefined when no login has said it) and whether the room has announced their release.

**src/archipelago/room-link.ts** (src/components, src/components/organisms, src/components/utils, src/state)
- `RoomLink`: A link the tracker can follow: a room by its id, or a tracker page by its id, with the slot a player's page shows.
- `LinkProblem`: Why a link can't be followed.
- `isDemo()`: Whether a link leads to the demo room, rather than to archipelago.gg.
- `readRoomLink()`: Where a link pasted in leads, taken without its scheme too, or why it can't be followed.
- `linkPage()`: A link's own page on archipelago.gg: the room's, or the tracker's.
- `linkProblemMessage()`: What to tell the person who pasted a link the tracker can't follow.

**src/archipelago/room-socket.ts** (src/demo, src/state, tools)
- `SocketLike`: What the socket needs of a WebSocket: the browser's own, or one a test hands in.
- `SocketOpener`: How a socket is opened to a room's address, such as "wss://archipelago.gg:61475".
- `LoginProblem`: Why a login failed: a wrong password or slot, another refusal, or a socket that closed first.
- `clientVersion()`: The client version a login says, from this tracker's own: its first three numbers, the Archipelago release it's tested against, so "0.6.8+2" says 0.6.8.

**src/archipelago/room-watch.ts** (src/state)
- `RoomPhase`: Where following a room stands.
- `RoomWatchOptions`: What following a room needs: who to log in as, where to tell, and the ways to ask, connect, wait and tell the time.
- `RoomWatch`: A room followed: logged into while it's awake, waited on while it sleeps.

**src/archipelago/tracker-poll.ts** (src/components/utils, src/state)
- `History`: What the web API says of a room so far: its tracker, its static tracker, and the slot names known, by slot.
- `WEB_ONLY_UNAVAILABLE`: What a tracker link alone can't give without the room's websocket, as the person is told.
- `PollPhase`: Where following a room on the web API alone stands.
- `TrackerPollOptions`: What polling a room's history needs: its tracker, where to tell, and the ways to ask and wait.
- `TrackerPoll`: A room's history, asked for every minute until stopped.

**src/archipelago/versions.ts** (src/state, tools)
- `Version`: An Archipelago version, by its three numbers.
- `isNewer()`: Whether a room's version is newer than the release the tracker is tested against, by its own version.
- `versionText()`: A version as a person reads it: "0.6.8".

**src/archipelago/web-api.ts** (src/demo, src/state)
- `Fetcher`: How a request is sent: the browser's fetch, or one a test hands in.
- `getDataPackage()`: A game's data package, by its checksum: the game's item and location names.
- `getSlotData()`: Each slot's slot_data, by tracker id.

**src/archipelago/web-responses.ts** (src/demo, src/state, tools)
- `WebApiProblem`: Why a web API request failed: no such room or tracker, no answer, or an answer in a shape it shouldn't have.
- `WebApiError`: A web API request that failed, with what was asked for, or the field that was wrong.
- `DataPackage`: A game's data package: its item and location names, by Archipelago id.
- `SlotData`: One slot's slot_data, as its game wrote it.
- `NetworkItem`: An item sent: which item, from which location, by which player (0 for the server), and its flags.
- `isRecord()`: Whether a value is a plain object, as a JSON object reads: not null, and not a list.

## src/components/atoms

**src/components/atoms/band.ts** (src/components/molecules, src/components/organisms)
- `bandRowStyles`: A row in the game's merchant style: an olive band with hairlines when it's hovered or the one current, `.band-row`.

**src/components/atoms/bar.ts** (src/components/organisms)
- `barStyles`: A thin bar of how much is done: `.track` holding a `.fill`, whose width is its `--done` custom property, as a percentage.

**src/components/atoms/button.ts** (src/components/molecules, src/components/organisms)
- `buttonStyles`: A button in the game's menu style: square and raised, with an inner glow when hovered.

**src/components/atoms/diamond.ts** (src/components/organisms)
- `diamondStyles`: A radio or a checkbox as the game's own diamond: `.diamond` on the input.

**src/components/atoms/dot.ts** (src/components/organisms)
- `dotStyles`: A small square that says how a part stands: `.dot` with `data-state`.

**src/components/atoms/field.ts** (src/components/organisms)
- `fieldStyles`: A text field on the ground, edged with a fine line, in the page's own face: `.field` on an input.

**src/components/atoms/figures.ts** (src/components/molecules, src/components/organisms)
- `figures`: Figures set apart from the words around them, in the page's figure face: `.fig` on a number.

**src/components/atoms/focus.ts** (src/components/molecules, src/components/organisms)
- `focusRing`: The ring a control wears when the keyboard brings it into focus: a gold outline, clear of its edge.

**src/components/atoms/fold.ts** (src/components/organisms)
- `foldStyles`: A fold under a quieter band heading, as the goal menu folds what's done: a native `details` whose `summary.band-heading` opens it, easing open and shut to its contents' height, at once when motion is reduced.

**src/components/atoms/frame.ts** (src/components/organisms)
- `frameStyles`: An icon in the game's frame, as the goal menu shows it: `.frame` holding an `img`, edged with a fine line, the ground, then the frame's own inner line, which `--er-frame-edges` holds for a glow to add to.

**src/components/atoms/heading.ts** (src/components/molecules, src/components/organisms)
- `panelTitleStyles`: A panel's title between gold rules, as the region picked is headed: an `h2.panel-title` with a `.rule` over and under it.
- `bandHeadingStyles`: A section heading on a band that fades out to the right, as the game's "Purchase Item": `.band-heading`, its size and room set where it's used.

**src/components/atoms/layout.ts** (src/components, src/components/molecules, src/components/organisms)
- `NARROW_MEDIA`: Where the page stacks, at a tablet's width and below: the map on top, the panel under it, and the goal menu a strip along the map's foot.
- `narrow`: `NARROW_MEDIA` for a css template's `@media`.

**src/components/atoms/more.ts** (src/components/organisms)
- `moreStyles`: A long list's way to its other rows: `.more` holding a `.segment`, at least 44 px at a tablet's width and below, for a finger.

**src/components/atoms/popover.ts** (src/components/molecules, src/components/organisms)
- `popoverStyles`: A native popover floating over the page, under what opens it: `.popover` on an element with `popover`.

**src/components/atoms/sack.ts** (src/components/molecules, src/components/organisms)
- `sackStyles`: The sack a key check shows, as it stands: `.sack` with `data-state` "todo", "collected" or "locked".

**src/components/atoms/scroller.ts** (src/components/organisms)
- `scrollerStyles`: A list that scrolls up and down, with a thin scrollbar in the lines' colour: `.scroller`, its height set where it's used.

**src/components/atoms/segments.ts** (src/components/organisms)
- `segmentStyles`: Buttons joined edge to edge, sharing the width, the one chosen glowing as a hovered one does: `.segment` on each, chosen by `aria-selected="true"` as a tab or `aria-pressed="true"` as a toggle.

**src/components/atoms/swatch.ts** (src/components/molecules, src/components/organisms)
- `swatchStyles`: A region's fill and edge as a small block, by how it stands: `.swatch` with `data-state` "locked", "open" or "done", its size set where it's used.

**src/components/atoms/visually-hidden.ts** (src/components/organisms)
- `visuallyHidden`: Text for a screen reader alone: `.sr` keeps it in the page, out of sight; `.sr-narrow` does so only at a tablet's width and below.

## src/components/molecules

**src/components/molecules/check-row.ts** (src/components/organisms)
- `checkRowStyles`: The rows' look: a two-column grid of marker and words, banded when hovered or picked.
- `TipSpot`: One spot in a tooltip: the row to show for it, and what its checks have held.
- `checkTipStyles`: A tooltip's look: a popover's, where it's put, with a line at its foot.
- `checkRow()`: A check's row, picked or not, with its region under its name when it's given, telling `onPick` when it's clicked.
- `checkBlock()`: A check to read rather than click, with what each of its copies held.
- `checkBand()`: A check to read under a heading band: its marker and place on the band, its encounter and the rest beneath.
- `checkTip()`: Spots as a tooltip shows them, in `look`, with `foot` under them where it's given.

**src/components/molecules/er-ago.ts**
- `ErAgo`: How long ago a moment was, as a `<time>`, current to the second.

**src/components/molecules/er-region-picker.ts**
- `PickerLook`: How the picker's button looks: a quiet button, a region's name as a heading shows it, or a select naming the region picked and its count.
- `ErRegionPicker`: The button and the list of regions it opens.

**src/components/molecules/er-resize-handle.ts**
- `ResizeAxis`: Which way a handle moves: sideways, sizing a width, or up and down, sizing a height.
- `ErResizeHandle`: A handle that resizes a part of the page, by drag or by key.

**src/components/molecules/er-sigil.ts**
- `ErSigil`: The Elden Ring's sigil, still, or drawing itself with the `drawing` attribute.

**src/components/molecules/er-to-bottom.ts**
- `ErToBottom`: A button over a list's foot that takes it back to the bottom.

**src/components/molecules/er-toggle-row.ts**
- `ToggleOption`: One toggle of the row: its key, its name, and how many it holds, when that's shown.
- `ErToggleRow`: A row of filters as text toggles, the one chosen marked by a bar that slides between them.

## src/components/organisms

**src/components/organisms/goal-achieved/er-goal-achieved.ts**
- `ErGoalAchieved`: The goal achieved, over the whole page until dismissed.

**src/components/organisms/goal-achieved/wordmark.ts**
- `WORDMARK_VIEW_BOX`: Where the wordmark lies, in its logo's units, as an SVG view box.
- `WORDMARK_PATH`: The wordmark's letters, as one path to fill.

**src/components/organisms/goal-menu/er-goal-band.ts**
- `ErGoalBand`: The goal achieved, at the top of the goal menu, and what becomes of the items left.

**src/components/organisms/goal-menu/er-goal-chips.ts**
- `GoalChip`: A region's chip: its code, its names, and its bosses defeated out of all.
- `ErGoalChips`: The tally, the region chips, and the sheet a chip opens.

**src/components/organisms/goal-menu/er-goal-menu.ts**
- `ErGoalMenu`: The goal menu: what's needed, the goal's bosses, and what's been obtained.

**src/components/organisms/goal-menu/er-goal-regions.ts**
- `ErGoalRegions`: The select of regions, and the picked region's goal bosses.

**src/components/organisms/goal-menu/er-goal-row.ts**
- `ErGoalRow`: A row of the goal menu: its icon in a frame, its name and how it stands.

**src/components/organisms/goal-menu/er-region-bosses.ts**
- `RegionBossRow`: A goal boss as a region's lists show it: its key, its name, where it is, and its drop's location.
- `ErRegionBosses`: A region's goal bosses to defeat, and those defeated folded beneath.

**src/components/organisms/goal-menu/goal-regions.ts**
- `BY_REGION_PAST`: Past this many goal bosses the goal menu goes by region: about where its rows stop reading at a glance.
- `isByRegion()`: Whether a goal of these bosses goes by region.
- `RegionBosses`: A region's goal bosses: those still to defeat and those defeated, each in the goal's order.
- `bossesByRegion()`: The goal's bosses by the code of the region their drop is a check in.
- `bossTally()`: How many of the goal's placed bosses are defeated, out of all of them.
- `goalPickerGroups()`: The picker's groups for the goal: the regions holding a goal boss, each counting its bosses defeated out of all.

**src/components/organisms/goal-menu/goal-rows.ts** (src/components)
- `GLOW_IN_MS`: How long a leaving row's frame takes to light up.
- `HOLD_MS`: How long it holds the glow, long enough to be seen in passing.
- `SLIDE_MS`: How long the row takes to slide off the menu's edge, as long as a toast takes to leave.
- `LEAVE_MS`: How long a row takes to leave, all told.
- `STAGGER_MS`: How far apart rows achieved together start leaving, so each is seen.
- `GoalRows`: Where the goal rows stand, by key, each list in the order shown.
- `placeRows()`: Where the rows stand once the menu has the rows to do and done: a row done that was to do starts leaving, and stays in its place until it's left.
- `rowLeft()`: The rows once `key` has left: gone from the list, and last in Done; as they were when it isn't leaving.
- `RowView`: A goal row as the menu shows it: a need or a boss, by its key, and whether it's gotten.
- `RowTarget`: Where a finished row leads: a check, by its name or its id, or the items, for what came from elsewhere.
- `rowTarget()`: Where a finished row leads, given the check each of the slot's own finds was in, by the item's name; undefined for a boss with no drop in the room.
- `rowViewsOf()`: The menu's rows to do and done, needs before bosses.

**src/components/organisms/goal-menu/goal-words.ts**
- `needName()`: What a need is: an item or a count by its name, a region, or the boss a drop asks to defeat.
- `needLine()`: How a need stands: a count's tally, or whether it's obtained, received or defeated.
- `bossName()`: A goal boss's name, or its flag for one the Elden Ring data doesn't know.
- `bossLine()`: How a goal boss stands.
- `RELEASE_LINES`: What becomes of the items left in the slot's world, its goal achieved, as the goal menu's band says it.

**src/components/organisms/goal-menu/strip-scroll.ts**
- `StripScroll`: The handlers that scroll a strip sideways with a mouse, for its wheel and pointer events.

**src/components/organisms/header/er-header.ts**
- `ErHeader`: The bar over the page: the tracker's name, and the room it's open on.

**src/components/organisms/header/er-players.ts**
- `ErPlayers`: The room's players, counted on a button that opens the list of them.

**src/components/organisms/header/er-progress.ts**
- `ErProgress`: The slot's key checks and all its checks, done out of all.

**src/components/organisms/header/header-words.ts**
- `LiveState`: How the tracker is keeping up with the room, as the header shows it.
- `liveState()`: How the tracker is keeping up with the room, from where following it stands; nothing on a tracker link that's reading the web API as it should.
- `statusText()`: A player's client status in words; 0 is a client that hasn't connected, or hasn't said.

**src/components/organisms/intro/curtain.ts** (src, src/components)
- `curtain`: The parts the curtain waits on before it opens.
- `whenMarkDrawn()`: Resolves once the mark has finished drawing; at once when there is no mark or motion is reduced.
- `startCurtain()`: Start the curtain's roll call, and open it once every part is in.
- `failLoader()`: Say the load failed, under the mark; only a reload helps from here.
- `setCurtainAsking()`: Stills the bar under the mark while the curtain waits on the person, at the room's card, rather than on the network.

**src/components/organisms/intro/entry-curtain.ts** (src/components)
- `holdCurtainFor()`: Holds the curtain until the way in is ready; call it before the curtain's own parts are all in.

**src/components/organisms/intro/er-part-list.ts**
- `ErPartList`: The parts of setting the tracker up, and how each stands.

**src/components/organisms/intro/er-room-card.ts**
- `ErRoomCard`: The room's card, under the mark until the tracker is ready.

**src/components/organisms/intro/er-slot-list.ts**
- `SlotChoice`: A slot picked from the list, by its team and number.
- `ErSlotList`: A room's slots, to pick an Elden Ring slot from.

**src/components/organisms/intro/roll-call.ts**
- `RollCall`: A roll call of named parts, which ends once every part expected has reported in.

**src/components/organisms/map/camera/camera-math.ts**
- `Point`: A point, in the world or on the screen.
- `WorldRect`: A rect in world units, by its edges.
- `CameraState`: Screen position of the world origin, and screen pixels per world unit.
- `ZoomLimits`: Inclusive zoom bounds.
- `ViewSize`: The view's size in CSS pixels.
- `worldToScreen()`: Project a world point onto the screen.
- `screenToWorld()`: Unproject a screen point into the world.
- `worldInView()`: The part of the world a view of `size` shows, leaving out `inset` screen pixels on its left.
- `pan()`: Shift the view by a screen-space delta.
- `clampZoom()`: Bring a zoom value inside the limits.
- `zoomAbout()`: Scale the view by `factor` while the world point under `anchor`, a screen point, stays put.
- `fitToRect()`: The camera that shows all of `rect` centred in a view of `size`, with `padding` screen pixels kept clear around it.

**src/components/organisms/map/camera/camera.ts**
- `CameraListener`: Told each new camera state.
- `Camera`: Owns the view transform and tells its listeners when it changes.

**src/components/organisms/map/camera/gesture-math.ts**
- `PinchStep`: One camera step from two pointers: pan by `dx` and `dy`, then zoom by `factor` about `anchor`.
- `isTap()`: Whether a press that went down at `origin` and is now at `end` has stayed still enough to be a click.
- `pinchStep()`: The camera step for two pointers that moved from `prev` to `next`.
- `wheelZoomFactor()`: The zoom factor for a wheel delta in pixels: a wheel up, a scroll up or a pinch out zooms in.

**src/components/organisms/map/camera/glide.ts**
- `Frame`: Runs its callback at the next frame with the time: requestAnimationFrame.
- `eased()`: Ease in and out, as a cubic: slow to start, slow to arrive.
- `centredOn()`: The camera that puts `point` at the centre of a view of `size` at `zoom`.
- `between()`: The state `t` of the way from `from` to `to`, 0 to 1, for a view of `size`.
- `glide()`: Move `camera` to `to` over `ms`.

**src/components/organisms/map/camera/lost-watch.ts**
- `LostWatch`: Tells when a view stops moving with no land in it, and when land is back.

**src/components/organisms/map/camera/map-camera.ts**
- `ZoomTo`: Where a zoom button takes the camera: in or out a step, or the fit, the whole of what's shown or its focus.
- `MapCameraParts`: What the map camera reads of its host: its view, its world, what lies over the view, and its pen.
- `MapCamera`: A map element's camera: gestures, size, transform and fit.

**src/components/organisms/map/camera/map-input.ts**
- `Pen`: Where the map's strokes go: one begun at a world point, carried on, and ended.
- `MapInput`: Binds the map's gestures on `element` to `camera` until `dispose` is called.

**src/components/organisms/map/camera/move.ts**
- `MOVE_MS`: How long a move takes: long enough to follow, short enough not to wait for.
- `ZOOM_STEP`: A quarter per press of a zoom button, the step Figma's zoom buttons take.
- `moveTo()`: Take the camera to `to`, gliding, or at once under reduced motion; returns a function that stops the move.

**src/components/organisms/map/components/er-map-controls.ts**
- `ErMapControls`: The map's tabs, tools, legend and zoom buttons, over its view.

**src/components/organisms/map/components/er-map-legend.ts**
- `ErMapLegend`: The map's legend, behind the button that opens it.

**src/components/organisms/map/components/er-map.ts**
- `ErMap`: The map of the room's open-world regions, how each stands, and the one selected.

**src/components/organisms/map/components/er-pin-tip.ts**
- `ErPinTip`: The tooltip of the pin pointed at.

**src/components/organisms/map/components/er-route-tools.ts**
- `ErRouteTools`: The pen, and undo and clear once there's a line.

**src/components/organisms/map/components/er-sheet-tabs.ts**
- `ErSheetTabs`: A tab for each of the map's sheets, the one shown pressed.

**src/components/organisms/map/components/er-simulate.ts**
- `ErSimulate`: Buttons that make a check, defeat a goal boss, send an item, or swap in the All Bosses preset, as the room would.

**src/components/organisms/map/components/er-zoom-buttons.ts**
- `ErZoomButtons`: Zoom in, zoom out, and fit: the whole map, or the region selected.

**src/components/organisms/map/components/pin-layer.ts**
- `PinHandlers`: What the map is told of its pins: the pointer coming onto one, given its element, or leaving it, and a click on one.
- `pinStyles`: The pins' look: the sack as it stands, sized on the screen from the camera's `--zoom`, enlarged when pointed at or picked, and the ring round a picked tile.
- `pinLayer()`: A sheet's pins, for the map's world, the one picked drawn last.
- `pickRing()`: A gold ring round a picked check's tile, at its middle in world units; nothing without one.

**src/components/organisms/map/components/region-layer.ts**
- `RegionHandlers`: What the layer reads of its regions, by code: how each stands and its name; and a click on one.
- `regionStyles`: The regions' look: each filled for how it stands, lighter when hovered, and the lines over them.
- `regionLayer()`: A sheet's regions and their lines, for the map's world.

**src/components/organisms/map/components/route-pen.ts**
- `RouteAction`: What a route tool asks for: the pen on or off, the last line taken away, or every line.
- `routeStyles`: The route's look: its lines over the map, and a crosshair while the pen is on.
- `RoutePen`: The map's pen: where its strokes go, and the lines it keeps for each sheet.

**src/components/organisms/map/utils/map-paths.ts**
- `tilesPath()`: A region's tiles as one path of squares.
- `edgesPath()`: Tile sides as one path of lines.
- `tileCentre()`: A tile's centre, in tile units, north up.
- `boundsOf()`: The rect holding every tile given, such as a sheet's or a region's, in tile units, north up.
- `anyTileIn()`: Whether any tile given lies at least partly inside `rect`, in tile units, north up.

**src/components/organisms/map/utils/map-words.ts**
- `pinCount()`: How many of a pin's checks are checked, as its tooltip's foot says it.

**src/components/organisms/map/utils/pin-tip.ts**
- `TipBox`: A box on the screen, by its edges, in pixels.
- `TipSize`: A width and a height, in pixels.
- `pinSpots()`: A pin's spots, each once and with no copy number, in the order they first come.
- `tipPlace()`: Where a tooltip goes, in the view: beside the pin, past it on the left where the right has no room, kept inside the view.

**src/components/organisms/map/utils/route.ts**
- `RouteLine`: One line of a route, as world points in the order drawn.
- `routePath()`: A line as an SVG path through its points.
- `RouteSketch`: The lines sketched on each sheet, by its key.

**src/components/organisms/panel/chat-lines.ts**
- `ChatKind`: How a line reads: a player's chat, one of this slot's commands, a reply to one, a hint, or the room's own.
- `ChatLine`: One line of the chat: its kind, who said it when a player did, its text, and when the tracker saw it.
- `ChatNames`: How a message's ids are named: a player by slot, and an item or a location by its id and the slot whose game it's in.
- `chatLines()`: The log's lines, oldest first, items sent left out.
- `partsText()`: A message's parts as plain text, each id named.

**src/components/organisms/panel/chat-words.ts**
- `SPEAKERS`: Who a line is from when no player said it.
- `hintLine()`: The hints over the input: how many the points buy, and how many points off the next is; undefined until the login says.

**src/components/organisms/panel/er-chat-view.ts**
- `ErChatView`: The chat log and its input.

**src/components/organisms/panel/er-check-list.ts**
- `ErCheckList`: A region's key checks and other checks, under a filter.

**src/components/organisms/panel/er-check-results.ts**
- `ErCheckResults`: A search's matches.

**src/components/organisms/panel/er-checks-view.ts**
- `ErChecksView`: The search, the region picker, and the region picked with its checks.

**src/components/organisms/panel/er-items-view.ts**
- `ErItemsView`: The items received, obtained and sent, under a filter.

**src/components/organisms/panel/er-panel.ts**
- `ErPanel`: The panel beside the map, its tabs and the view chosen.

**src/components/organisms/panel/er-region-heading.ts**
- `ErRegionHeading`: The picked region's name, how it stands, what it needs, and its progress.

**src/components/organisms/panel/er-region-line.ts**
- `ErRegionLine`: The region picked as one line, its name the picker of every region.

**src/components/organisms/panel/feed-words.ts**
- `FeedFilter`: Which items the tab shows: those received, those obtained, those sent, or every one.
- `FEED_FILTERS`: Each filter, as its button names it, in order.
- `keeps()`: Whether a filter keeps an item.
- `filterCounts()`: How many items each filter keeps.
- `filterLabel()`: Each filter's button, with how many items it holds where it holds one kind.

**src/components/organisms/panel/hint-list.ts**
- `HINT_LIST`: The id of the list, for the input to name it.
- `hintRowId()`: The id of a row, for the input to say which is picked.
- `hintListStyles`: The list's look, laid over the foot of its nearest positioned parent.
- `hintList()`: The rows of a list of items, `active` the one picked, telling `onPick` of the one pressed.

**src/components/organisms/panel/region-parts.ts**
- `needsText()`: What a region still needs while it's locked, in English, its checks named in full; undefined once it's open.

**src/components/organisms/panel/row-words.ts**
- `ROWS_SHOWN`: How many rows a long list shows before it's asked for all of them.
- `CheckFilter`: Which checks a list shows: those still to do, those done, or all.
- `FILTERS`: Each filter, as its button names it, in order.
- `NO_KEY_CHECKS`: What the key checks' list says when its filter leaves none.
- `matchesLine()`: How many checks a search found: "3 matches", or "The first 60 matches" when there were more.

**src/components/organisms/settings/er-settings.ts**
- `ErSettings`: The settings panel, over the right-hand panel.

**src/components/organisms/toasts/er-toasts.ts**
- `ErToasts`: The items others send, and the slot's own finds that matter, as toasts.

**src/components/organisms/toasts/toast-queue.ts**
- `QueueClock`: How the queue reads the time and waits: the browser's, or a test's.
- `QueuedToast`: A toast in the queue: its value, and, once it's going, the way it leaves, -1 left or 1 right.
- `MAX_SHOWN`: How many toasts show at once, as more wait their turn.
- `ToastQueue`: The toasts showing, told to `onChange` each time they change.
- Also: `TOAST_MS`, `QUICK_MS`, `ALONE_MIN_MS`, `LEAVE_MS`

**src/components/organisms/version-notice/er-version-notice.ts**
- `ErVersionNotice`: What the room has that the tracker isn't sure of, over the map, until closed.

**src/components/organisms/version-notice/version-words.ts**
- `noticeLine()`: What a version notice says: what differs from what the tracker is sure of, and what it might mean.

## src/components/utils

**src/components/utils/ago.ts** (src/components/molecules, src/components/organisms)
- `Elapsed`: How long ago a moment was: not known, now, or a count of the one unit a person would say it in.
- `elapsed()`: How long before `now` the moment `at` was, both in milliseconds since the epoch.
- `ago()`: `at` as said at `now`: "now", "12 seconds ago", "5 minutes ago", "yesterday", or "earlier" when it has no time.

**src/components/utils/area-words.ts** (src/components/molecules, src/components/organisms)
- `AREA_STATE_WORDS`: How a region stands, in words: on the map's titles, its legend and the panel's heading.
- `PIN_STATE_WORDS`: How a key check stands, in words: on the map's legend and beside its sack in the panel.

**src/components/utils/can-simulate.ts** (src/components/organisms)
- `canSimulate()`: Whether a room shows Simulate's buttons: a demo in any build, a real room in a development build, and a real room on the built site never.

**src/components/utils/check-pick.ts** (src/components, src/components/organisms)
- `CheckPick`: A check picked, on the map or in the panel: its region, by code, and its id.

**src/components/utils/check-words.ts** (src/components/molecules, src/components/organisms)
- `checkLine()`: A check's place and encounter on one line, the encounter after a dash where there is one.
- `spotLine()`: What follows a check's place: its encounter after a dash, and which copy it is: " – drop, 2 of 4".
- `findingLine()`: What a checked check held, as its row says it: "Found: Rusty Key", or "Sent: Hookshot to Sam".

**src/components/utils/clock.ts** (src/components/molecules)
- `Ticker`: How a clock reads the time and ticks: the browser's, or a test's.
- `PageClock`: A clock its listeners share, ticking only while it has one.
- `PAGE_CLOCK`: The page's one clock.

**src/components/utils/close-icon.ts** (src/components/organisms)
- `closeIcon`: A close button's cross, drawn in the button's own colour, 12 pixels square.

**src/components/utils/emit.ts** (src/components/molecules, src/components/organisms)
- `emit()`: Sends an event from an element that bubbles and crosses shadow roots, so whatever holds the element hears it.

**src/components/utils/entry-words.ts** (src/components/organisms)
- `PART_LABELS`: Each part as the loader names it.
- `gameName()`: A game as a person reads it: Archipelago writes Elden Ring's name without its space.
- `slotName()`: A slot's name, or its number when only an alias would name it.
- `reducedTrackerNote()`: What a tracker link leads to, said before connecting.
- `loadingLine()`: The line over the parts: what's still loading, that it stopped, or that the tracker is opening.
- `entryProblemText()`: Why the way in went back to the link, and what to do about it.
- `failureText()`: Why setting up stopped, and what to do about it.
- `PART_STATE_WORDS`: How a part stands, for a screen reader beside its dot; "stopped" is one left loading when setting up stopped.

**src/components/utils/figure.ts** (src/components/molecules, src/components/organisms)
- `figure()`: A count as a person reads it, with its thousands set apart: "3,765".
- `percentDone()`: How much of a whole is done, as a percentage; none of nothing.

**src/components/utils/icons.ts** (src/components/molecules, src/components/organisms)
- `iconUrl()`: An icon's URL by its name, such as "sack"; undefined when there's no icon by that name.

**src/components/utils/item-words.ts** (src/components/organisms)
- `UNNAMED_ITEM`: An item whose game's data package doesn't name it.
- `playerName()`: A player as an item's sender or receiver is named; slot 0 is the room's server, which hands out starting items.
- `foundIn()`: Where a received item was found: in which game, at which of its locations, as far as they're known.

**src/components/utils/material-icons.ts** (src/components/molecules, src/components/organisms)
- `backpackIcon`: A backpack, for items: the Items tab, and the simulated item.
- `forumIcon`: Two speech bubbles, for the Chat tab.
- `arrowDownIcon`: An arrow pointing down, for going to the foot of a list.
- `logoutIcon`: An arrow out of a door, for leaving the room: the header's Disconnect.
- `infoIcon`: An i in a ring, for the map's legend.
- `settingsIcon`: A cog, for the header's settings button.

**src/components/utils/media.ts** (src/components, src/components/organisms)
- `MediaController`: Whether a media query matches, for a Lit element: `matches`, kept current, and the element updated when it changes, while it's connected.

**src/components/utils/motion.ts** (src/components/organisms)
- `isMotionReduced()`: Whether the person has asked the system for less motion.

**src/components/utils/popover.ts** (src/components/molecules, src/components/organisms)
- `placeUnder()`: Places a popover under what opens it, as it opens: `--top` under the anchor, or flush with the foot of `foot` when one is given, and `--left` and `--right` on the anchor's edges, for its styles to pick from.
- `placeOver()`: Places a popover above `anchor`: `--bottom` over it, and `--left` and `--right` on its edges, for the popover's styles to pick from.

**src/components/utils/region-groups.ts** (src/components/molecules, src/components/organisms)
- `PickerRegion`: One region of a picker group: its code and name, how it stands, and how much of what's counted in it is done.
- `PickerGroup`: One group of the picker: its title, and its regions.
- `pickerGroups()`: The picker's groups, each region counting its key checks done, or all its checks when it has no key checks.

**src/components/utils/sheet-names.ts** (src/components/organisms)
- `SHEET_NAMES`: Each map sheet in order, with its name in the game: on the map's tabs and the region picker's groups.

**src/components/utils/stick-to-bottom.ts** (src/components/organisms)
- `isAtBottom()`: Whether a list is at its bottom, or so near that it counts as there.
- `StickToBottom`: Keeps a list at its bottom, for a Lit element, unless it's been scrolled up: `isAway` says when it has, and the element updates when that changes.

**src/components/utils/store-controller.ts** (src/components, src/components/organisms)
- `SelectableStore`: A store made with zustand's subscribeWithSelector, so a part of it can be subscribed to on its own.
- `StoreController`: Reads part of a store into a Lit element: `value` is the part selected, and the element updates whenever zustand finds it changed, while the element is connected.

**src/components/utils/wheel.ts** (src/components/organisms)
- `wheelDeltaToPixels()`: A wheel delta in pixels, from whichever unit the device gave; `pageSize` is the size of what scrolls, along the delta.

## src/data

**src/data/bosses/goal-menu.ts** (src/components/organisms, src/state)
- `GoalMenu`: What the goal menu holds: what's still needed, what's met, and the goal's bosses.

**src/data/bosses/goal.ts** (src/components/organisms)
- `GoalState`: How a goal boss stands: defeated, still to do, or not knowable from the room's checks.
- `GoalBoss`: One of a room's goal bosses, and how it stands.

**src/data/checks/key-checks.ts** (src/archipelago)
- `KeyCheckSlotData`: What rebuilding a room's key checks reads from its Elden Ring slot_data, with its checks' names from the data package.

**src/data/checks/location-groups.ts** (src/demo, tools)
- `LOCATION_GROUPS`: Each location's groups and region, by its Archipelago name.

**src/data/checks/map-pins.ts** (src/components/organisms, src/components/utils, src/state)
- `PinState`: How a pin stands: every key check on its tile checked, some left, or some left in a locked region.
- `MapPin`: The key checks on one map tile: where it is, the region it belongs to, the checks by id, and how many are checked.

**src/data/checks/map-tiles.ts** (src/components/organisms, src/components/utils, src/state, tools)
- `Sheet`: One of the game's two open-world map sheets: the Lands Between, and the Realm of Shadow.
- `PlacedLocation`: A location placed on a map: its region, its sheet, and its tile's column and row.
- `Edge`: A tile side on a border, as its two corners in tile units: [x1, y1, x2, y2].
- `SheetTiles`: A sheet's regions, and its coastline: the sides of its tiles with no tile beyond.
- `tileOf()`: The sheet and tile a static-randomizer key places a location on; undefined off the open-world map.

**src/data/names/key-spots.ts** (src/components/utils, src/state, tools)
- `KeySpot`: A key spot's full name: where it is, and the encounter or object there.

**src/data/names/location-name.ts** (src/components/utils, src/demo, src/state, tools)
- `readLocationName()`: An Elden Ring location's name in its parts, or undefined for a name not in that form.
- `withoutExtra()`: A location name apart from the generator's ", extra item N", and that N, so a copy reads as the spot it copies.
- `SpotCopy`: Which of a spot's checks this one is, the spot itself first and the generator's copies after it, and how many there are.

**src/data/names/place-names.ts** (tools)
- `PLACE_NAMES`: Each place's full name, keyed by its location names' regions and code as written.
- `DESCRIPTION_EXCEPTIONS`: The few descriptions whose code means something other than it does elsewhere in its region, by location name: each code's key, with the name it takes there.
- `unnamedCodesIn()`: The codes in text with no name yet, each as the key it would be named under first: what a report of places still to name counts.

**src/data/rules/apworld.ts** (src/archipelago, src/components/organisms, src/demo)
- `RULES_APWORLD`: The Elden Ring apworld the rules are ported from: its release, and the Elden Ring data package checksum its rooms carry.
- `APWORLD_RELEASE_PAGE`: The supported release's page, with its notes and downloads.
- `isApworldSupported()`: Whether the tracker can read a room, by its Elden Ring data package checksum; a room with none has no Elden Ring slot to read wrongly.

**src/data/rules/area-status.ts** (src/components/organisms, src/components/utils)
- `AreaState`: How a region stands: locked, open, or done once every key check in it is checked.

**src/data/rules/gates/boss-gates.ts** (src/archipelago)
- `ForcedBosses`: slot_data's forceBosses: the boss forced into each arena, both by the game's id.

**src/data/rules/region-summary.ts** (src/components/organisms, src/components/utils, src/state)
- `RegionSummary`: How a region stands, what it needs while it's locked, its checks, and how many of its key checks and checks are done.

**src/data/rules/room-reach.ts** (src/state)
- `Room`: A room as its rules read it: its options, the bosses forced into arenas, its goal, and every check it has, by name.

**src/data/rules/rules.ts** (src/components/organisms)
- `Need`: What a rule still needs: the parts of it not yet met, with a count's progress.

**src/data/rules/world-rules.ts** (src/archipelago)
- `WorldRuleOptions`: The options a room's rules read, with the apworld's names.

**src/data/words.ts** (src/components/organisms, src/components/utils)
- `listed()`: Parts read out as one list: "A", "A and B", "A, B and C", or with "or".

## src/state

**src/state/entry.ts** (src/components, src/components/organisms, src/components/utils, src/demo)
- `EntryProblem`: Why the way in went back to the link: the link itself, or what archipelago.gg said of it.
- `EntryPhase`: Where the way in stands, as the card shows it.
- `PartStanding`: One part of setting up, and where it stands.
- `EntryState`: The way in, and what can be done there.
- `EntryStore`: The way in's store, subscribed to by selector.
- `DemoWays`: What the demo goes by: how it asks, connects and keeps, with no room behind them.
- `createEntryStore()`: A way in, starting from nothing until `start` reads the last visit.

**src/state/setup.ts** (src/components/organisms, src/components/utils)
- `Part`: A part of setting up, as the loader names it.
- `PARTS`: Every part, in the order the loader lists them.
- `SetupFailure`: Why a setup stopped: the part that failed, and how.
- `EldenRingData`: The Elden Ring data the page reads, as its own file loads it.

**src/state/slices/connection.ts** (src/components/organisms)
- `ConnectionPhase`: Where following the room stands, live or on the web API only.

**src/state/slices/log.ts** (src/components/organisms)
- `PrintedEvent`: A message the room printed: every live event but the login, the room's changes and the items received.

**src/state/slices/roster.ts** (src/components/organisms)
- `GOAL_STATUS`: The client status a slot reaches once it's done its goal; it can't be undone.
- `RosterEntry`: One slot of the room, as the web API last told it.

**src/state/store.ts** (src/components, src/components/organisms, src/components/utils)
- `TrackerState`: What the tracker knows of a room, and the ways the room's word comes in.
- `TrackerStore`: A tracker store: subscribed to by selector, with zustand's persist controls, such as clearing what it kept.

**src/state/utils/checks.ts** (src/components/molecules, src/components/organisms)
- `CheckRow`: One check as the panel lists it.
- `regionChecksOf()`: A region's checks, by its code; none until slot_data and the data package are in.
- `searchChecks()`: The checks whose row holds every word of the query, in any order and any case: its place, encounter, vanilla item and region, and once it's checked, what it held and who it went to.

**src/state/utils/feed.ts** (src/components/organisms, src/components/utils)
- `FeedPlayer`: A player in the feed, by slot, with their name as the roster has it; slot 0 is the server.
- `FeedEntry`: An item that moved: received from another player, or sent to one.
- `OwnFind`: An item the slot found in its own world: what it was, how it counts, and the check it was in.
- `ItemEntry`: An item the Items tab lists: one that moved, or one the slot found for itself.
- `feedOf()`: The items received from the others and sent to them, newest last.
- `itemsOf()`: Every item that moved, and every item the slot found for itself, newest last.
- `ownFindsOf()`: The items the slot found for itself, in the order they came; the feed leaves these out, as they're its checks' own.

**src/state/utils/findings.ts** (src/components/molecules, src/components/organisms, src/components/utils)
- `Finding`: What a check held: the item, and who it went to when that's another player.
- `findingsOf()`: What each of this slot's checks held, by location id, for the checks it's known of.

**src/state/utils/goal.ts** (src/components, src/components/organisms)
- `goalMenuOf()`: The goal menu for the store's room; undefined until slot_data is in, or when it can't be read.
- `checkOf()`: The check of this id, with its region; undefined where the room has no such check.
- `checkNamed()`: The check of this location's name, with its region; undefined where the room has no such check.
- `isGoalReached()`: Whether the goal is reached: done as the room says, or every goal boss defeated, which a release can show before the game does.
- `releaseOf()`: What becomes of the items left in the slot's world, its goal done: by the room's permission, or a release it announced.

**src/state/utils/hint-items.ts** (src/components/organisms)
- `HINT_COMMAND`: The command a hint is asked for with, with the space before its item.
- `hintMatches()`: The items a draft leads to, in the order given.
- `hintItemsOf()`: The items the hint box suggests, by name; none until the room can be read.

**src/state/utils/key-checks.ts** (src/components/organisms, src/demo)
- `keyChecksFrom()`: A slot's key checks, by location id, worked out from its slot_data and the names of its game's data package; undefined in a shape they can't be.

**src/state/utils/map.ts** (src/components/organisms, src/components/utils)
- `MapView`: Each sheet's regions and coast, how each region stands by its code, and each sheet's key-check pins.
- `mapOf()`: The map for the store's room; undefined until slot_data and the data package are in, or when they can't be read.

**src/state/utils/progress.ts** (src/components/organisms)
- `Progress`: How far the slot has got; a total is undefined until it's known.
- `progressOf()`: How far the slot has got, from what the store holds.

**src/state/utils/regions.ts** (src/components, src/components/organisms, src/components/utils, src/demo)
- `regionsOf()`: Each region of the store's room, by its code; undefined until slot_data and the data package are in, or when they can't be read.

**src/state/utils/simulate.ts** (src/components/organisms, src/demo)
- `SimulateInputs`: What simulating reads, in the store.
- `SIMULATED_ITEMS`: Every item the lists can give, by name, for a data package to name.
- `PROGRESSION`: NetworkItem.flags: the item can unlock logical advancement.
- `nextCheck()`: The next key check left in an open region, the region given first; undefined when none is left.
- `nextBossDefeat()`: The next goal boss still to defeat, the region given first, as its drop's check and that check's region; undefined when none is left.
- `withAllBosses()`: slot_data with the All Bosses preset's options and goal, every boss a goal can name, in place of the room's own; its checks stay the room's.
- `checkMade()`: The websocket's events for making check `id`, its item the `step`th of the list; none without a slot.
- `itemSent()`: The websocket's event for an item another player sent, the `step`th of the list; none when the package names none.

**src/state/utils/stamped.ts** (src/components/organisms)
- `Stamped`: Something with the time the tracker saw it, in milliseconds since 1970.

**src/state/utils/version-notice.ts** (src/components/organisms)
- `VersionNotice`: What the room has that the tracker isn't sure of: a newer Archipelago, with both versions.
- `versionNoticesOf()`: What the room has that the tracker isn't sure of, by the tracker's own version; none when all is as tested.

## src/storage

**src/storage/db.ts** (src/state)
- `stateStorage`: What the zustand store persists through: JSON strings by name, in the database's state store.

**src/storage/device.ts** (src/state)
- `deviceStorage`: What the settings persist through: strings by name, in localStorage where it's allowed.

**src/storage/memory.ts** (src/demo)
- `memoryStorage()`: Storage in memory, in the database's place, so nothing outlasts the page; what it holds is open to look at.
