import type { ReuseConfig } from "./reuse.js";

/** What the reuse check reads: the source it scans, the shared pieces, and the import rules. */
export default {
  mode: "robust",
  // The UI's atoms, molecules and utils exist to be taken, so every name in them is listed. So is
  // every part an organism holds, since a part another piece needs moves out to a shared layer.
  catalogue: {
    offered: [
      "src/components/atoms",
      "src/components/molecules",
      "src/components/organisms",
      "src/components/utils",
    ],
  },
  // The repo's own tools too, so a new one can't read the apworld's source a second way.
  sources: ["src", "tools"],
  imports: [
    // The page puts the organisms together, over the layers under them, the protocol, the state and
    // the domain; it holds the intro's curtain until the way in is ready.
    {
      from: "src/components",
      mayTake: [
        "src/components",
        "src/components/atoms",
        "src/components/molecules",
        "src/components/organisms",
        "src/components/utils",
        "src/archipelago",
        "src/state",
        "src/data",
      ],
    },
    // An organism is a piece of the screen that owns a flow, in a folder with all its own parts. It
    // takes its own folder and the shared layers, never another organism's parts.
    {
      from: "src/components/organisms",
      mayTake: [
        "src/components/atoms",
        "src/components/molecules",
        "src/components/utils",
        "src/archipelago",
        "src/state",
        "src/data",
      ],
      ownFolder: true,
    },
    // A molecule is a few atoms with one purpose, knowing one thing of the domain.
    {
      from: "src/components/molecules",
      mayTake: [
        "src/components/atoms",
        "src/components/utils",
        "src/archipelago",
        "src/state",
        "src/data",
      ],
    },
    // An atom is one look, and knows nothing else.
    { from: "src/components/atoms", mayTake: ["src/components/atoms"] },
    // The UI's utils hold no elements, so they take from no layer of elements.
    {
      from: "src/components/utils",
      mayTake: ["src/components/utils", "src/archipelago", "src/state", "src/data"],
    },
    // The state takes the protocol's events, the domain and the database; never the UI.
    { from: "src/state", mayTake: ["src/state", "src/archipelago", "src/data", "src/storage"] },
    // The demo is mock data for the page and the tests to take: it speaks the protocol from the
    // static domain, and takes the state's way of making events.
    { from: "src/demo", mayTake: ["src/demo", "src/state", "src/archipelago", "src/data"] },
    // The database stands alone.
    { from: "src/storage", mayTake: ["src/storage"] },
    // The protocol takes from the static domain and from itself; it never reaches back into the UI or the state.
    { from: "src/archipelago", mayTake: ["src/data", "src/archipelago"] },
    // The static domain stands alone, taking only from itself.
    { from: "src/data", mayTake: ["src/data"] },
  ],
  // Each row arrives with the piece it guards.
  table: [
    {
      what: "the apworld's Python source read by hand",
      // A bracket-depth walk, or a search for one of the apworld's data classes being called.
      pattern: /"\(\[\{"\.includes\(|\b(?:ERLocationData|ERBossInfo)\\?\(/,
      home: "tools/apworld-source.ts",
      instead: "`callsIn()`, `listAt()`, `piecesFrom()` and `pythonString()`",
    },
    {
      what: "the apworld's region orders read by hand",
      // The bracket keeps this row from matching itself.
      pattern: /region_orde[r]/,
      home: "tools/apworld-source.ts",
      instead: "`regionOrdersFrom()`",
    },
    {
      what: "the apworld's licence line written into a generator by hand",
      pattern: /Copyright \(c\) \d{4} Bedrock/,
      home: "tools/apworld-source.ts",
      instead: "`APWORLD_LICENCE`",
      // The modules written by hand carry the same line as a comment, which can't import it.
      within: ["tools"],
    },
    {
      what: "an item, area or location rule written out by hand",
      // The name may follow as a shorthand property too.
      pattern: /kind: "(?:item|area|location)", (?:item|area|location)\b/,
      home: "src/data/rules/rules.ts",
      instead: "`item()`, `area()` and `location()`",
    },
    {
      what: "a key's shards worked out by hand",
      pattern: /key_item_shards\[/,
      home: "src/data/rules/gates/key-rules.ts",
      instead: "`keyOrShards()`",
    },
    {
      what: "the great runes listed by hand",
      // A list's entry, not a location named for the rune.
      pattern: /"Great Rune of the Unborn"[,]/,
      home: "src/data/rules/gates/key-rules.ts",
      instead: "`GREAT_RUNE_NAMES`",
    },
    {
      what: "a region's way back to the start walked by hand",
      pattern: /\.set\(to, fro[m]\)/,
      home: "src/data/rules/area-status.ts",
      instead: "`regionsOnTheWay(region, graph)`",
    },
    {
      what: "whether a room has the base game worked out by hand",
      pattern: /!\(options\.dlc_start === 1 &&/,
      home: "src/data/rules/regions/region-graph.ts",
      instead: "`isBaseOn()`",
    },
    {
      what: "whether a spot is randomized worked out by hand",
      pattern: /(?:missable|excluded)_location_behavior >= /,
      home: "src/data/rules/regions/region-graph.ts",
      instead: "`isPurebloodMedalRandomized()`",
    },
    {
      what: "a room's websocket address written by hand",
      pattern: /wss:\/\/archipelago\.gg:/,
      home: "src/archipelago/room-socket.ts",
      instead: "`roomAddress(port)`",
    },
    {
      what: "a map tile's key written by hand",
      // A template of two names with a comma between, as a tile's column and row.
      pattern: /`\$\{\w+\},\$\{\w+\}`/,
      home: "src/data/checks/map-tiles.ts",
      instead: "`cell(x, y)`",
    },
    {
      what: "a map control's button look written by hand",
      // The overlay tone, or the square icon shape.
      pattern:
        /background: var\(--er-overlay\);\s*border-color: var\(--er-line\);|width: 44px;\s*padding: 0;/,
      home: "src/components/atoms/button.ts",
      instead: '`buttonStyles`, with `data-tone="overlay"` and `data-shape="icon"`',
    },
    {
      what: "a count's figures formatted by hand",
      pattern: /new Intl\.NumberFormat\(/,
      home: "src/components/utils/figure.ts",
      instead: "`figure(count)`",
    },
    {
      what: "a share of a whole worked out by hand",
      pattern: /=== 0 \? 0 : \(100 \*/,
      home: "src/components/utils/figure.ts",
      instead: "`percentDone(done, all)`",
    },
    {
      what: "a bar of how much is done written by hand",
      pattern: /width: var\(--done/,
      home: "src/components/atoms/bar.ts",
      instead: "`barStyles`, with `.track` holding a `.fill` and its `--done`",
    },
    {
      what: "how a region or a key check stands put in words by hand",
      // As a string, or as text in markup.
      pattern: /["'>](?:Every key check done|Out of reach for now)/i,
      home: "src/components/utils/area-words.ts",
      instead: "`AREA_STATE_WORDS` or `PIN_STATE_WORDS`",
    },
    {
      what: "a check's place and encounter joined by hand",
      pattern: /\} – \$\{/,
      home: "src/components/utils/check-words.ts",
      instead: "`checkLine(name)`",
    },
    {
      what: "joined buttons written by hand",
      pattern: /margin-left: -1px[;]/,
      home: "src/components/atoms/segments.ts",
      instead: "`segmentStyles`, with `.segment` on each button",
    },
    {
      what: "a heading's band written by hand",
      pattern: /background: var\(--er-heading-band\)/,
      home: "src/components/atoms/heading.ts",
      instead: "`bandHeadingStyles`, with `.band-heading`",
    },
    {
      what: "a thin scrollbar written by hand",
      pattern: /scrollbar-width: thi[n]/,
      home: "src/components/atoms/scroller.ts",
      instead: "`scrollerStyles`, with `.scroller`",
    },
    {
      what: "a region's swatch coloured by hand",
      pattern: /border-color: var\(--er-region-locked-edge\)/,
      home: "src/components/atoms/swatch.ts",
      instead: "`swatchStyles`, with `.swatch` and its `data-state`",
    },
    {
      what: "the page's width written by hand",
      pattern: /max-width: 90[0]px\)/,
      home: "src/components/atoms/layout.ts",
      instead: "`narrow` in a css `@media`, or `NARROW_MEDIA` for a `MediaController`",
    },
    {
      what: "the Elden Ring's sigil drawn by hand",
      // A ring of the sigil, as its path draws it.
      pattern: /A71 71 0 1 [1]/,
      home: "src/components/molecules/er-sigil.ts",
      instead: "`<er-sigil>`, with `drawing` to draw it",
    },
    {
      what: "a close button's cross drawn by hand",
      pattern: /M2 2l8 8M10 2l-8 [8]/,
      home: "src/components/utils/close-icon.ts",
      instead: "`closeIcon`",
    },
    {
      what: "an icon's frame written by hand",
      pattern: /inset 0 0 0 4px var\(--er-frame-inner\)/,
      home: "src/components/atoms/frame.ts",
      instead: "`frameStyles`, with `.frame` round the icon",
    },
    {
      what: "a goal need's icon looked up by hand",
      pattern: /NEED_ICONS\.get\(/,
      home: "src/data/bosses/boss-icons.ts",
      instead: "`needIcon(need)`",
    },
    {
      what: "a slot's key checks worked out by hand",
      pattern: /data\.keyCheck[s]\(/,
      home: "src/state/utils/key-checks.ts",
      instead: "`keyChecksFrom(data, slotData)`",
    },
    {
      what: "a panel's title written by hand",
      pattern: /font-size: 1\.9em;\s+line-height: 1\.1/,
      home: "src/components/atoms/heading.ts",
      instead: "`panelTitleStyles`, with `.panel-title` and a `.rule`",
    },
    {
      what: "a button with no edge or fill written by hand",
      pattern: /background: transparent;\s+border-color: transparent/,
      home: "src/components/atoms/button.ts",
      instead: '`buttonStyles`, with `data-tone="bare"`',
    },
    {
      what: "a pressed overlay button's glow written by hand",
      pattern:
        /\[aria-pressed="true"\] \{\s+background: var\(--er-glow-fil[l]\);\s+box-shadow: var\(--er-glow\);\s+border-color/,
      home: "src/components/atoms/button.ts",
      instead: '`buttonStyles`, with `data-tone="overlay"` and `aria-pressed`',
    },
    {
      what: "a fold's easing written by hand",
      pattern: /details::details-conten[t]/,
      home: "src/components/atoms/fold.ts",
      instead: "`foldStyles`, with a `details` whose `summary` is a `.band-heading`",
    },
    {
      what: "a boss's icon looked up by hand",
      pattern: /BOSS_ICONS\.get\(/,
      home: "src/data/bosses/boss-icons.ts",
      instead: "`bossIcon(flag)`, which falls back to the icon every boss without its own shares",
    },
    {
      what: "the reduced-motion preference read by hand",
      pattern: /matchMedia\("\(prefers-reduced-motion/,
      home: "src/components/utils/motion.ts",
      instead: "`isMotionReduced()`",
    },
    {
      what: "a popover's look written by hand",
      pattern: /box-shadow: var\(--er-overlay-shadow\)/,
      home: "src/components/atoms/popover.ts",
      instead: "`popoverStyles`, with `.popover`",
    },
    {
      what: "a popover placed under its anchor by hand",
      pattern: /setProperty\("--top"/,
      home: "src/components/utils/popover.ts",
      instead: "`placeUnder(event, anchor)` on `beforetoggle`",
    },
    {
      what: "a map sheet named by hand",
      pattern: /["'>](?:Lands Between|Realm of Shadow)["'<]/,
      home: "src/components/utils/sheet-names.ts",
      instead: "`SHEET_NAMES`",
    },
    {
      what: "a row's band written by hand",
      pattern: /box-shadow: var\(--er-band-lines\)/,
      home: "src/components/atoms/band.ts",
      instead: "`bandRowStyles`, with `.band-row`",
    },
    {
      what: "an item or its sender named by hand",
      // The words for an item no package names, or for the server as a sender.
      pattern: /["']An item its game doesn't nam[e]["']|"the serve[r]"/,
      home: "src/components/utils/item-words.ts",
      instead: "`UNNAMED_ITEM` and `playerName(player)`",
    },
    {
      what: "a list joined into English by hand",
      // A last part joined on after the rest, or the platform's list format made again.
      pattern: /slice\(0, -1\)\.join\(|new Intl\.ListFormat\(/,
      home: "src/data/words.ts",
      instead: '`listed(parts, "and")`',
    },
    {
      what: "a plain object checked for by hand",
      pattern: /typeof [\w.]+ [!=]== "object"/,
      home: "src/archipelago/web-responses.ts",
      instead: "`isRecord(value)`",
    },
    {
      what: "an event dispatched by hand",
      pattern: /new CustomEvent\(/,
      home: "src/components/utils/emit.ts",
      instead: "`emit(this, name, detail)`",
    },
    {
      what: "text hidden for a screen reader by hand",
      pattern: /clip-path: inset\(50%\)/,
      home: "src/components/atoms/visually-hidden.ts",
      instead: "`visuallyHidden`, and `.sr` on the text",
    },
    {
      what: "a handle that resizes part of the page written by hand",
      pattern: /role="separato[r]"/,
      home: "src/components/molecules/er-resize-handle.ts",
      instead: "`<er-resize-handle>`, with its `axis`, `grows`, `measure` and `limits`",
    },
    {
      what: "a wheel's delta read in its own unit by hand",
      pattern: /deltaMode ==[=]/,
      home: "src/components/utils/wheel.ts",
      instead: "`wheelDeltaToPixels(delta, deltaMode, pageSize)`",
    },
    {
      what: "a list kept at its bottom by hand",
      pattern: /scrollTop = [\w.]+\.scrollHeight/,
      home: "src/components/utils/stick-to-bottom.ts",
      instead: "`StickToBottom`",
    },
    {
      what: "a Material Symbols icon drawn by hand",
      // Material Symbols' own view box, which every one of its icons is drawn on.
      pattern: /viewBox="0 -960 960 96[0]"/,
      home: "src/components/utils/material-icons.ts",
      instead:
        "`backpackIcon`, `forumIcon`, `arrowDownIcon` or `logoutIcon`, or a new icon beside them under the same notice",
    },
    {
      what: "a bar slid under a row of filters by hand",
      // The bar placed from the filter it sits under, as drawn.
      pattern: /offsetLef[t]\}px/,
      home: "src/components/molecules/er-toggle-row.ts",
      instead: "`<er-toggle-row>`, with its `options` and `chosen`",
    },
    {
      what: "the region picker's groups made by hand",
      pattern: /\.regionGroup[s]\(/,
      home: "src/components/utils/region-groups.ts",
      instead: "`pickerGroups(data, state)`",
    },
    {
      what: "what a region needs put in English by hand",
      // Its checks named in full, as the heading names them.
      pattern: /location: \(\w+\) => checkLin[e]\(/,
      home: "src/components/organisms/panel/region-parts.ts",
      instead: "`needsText(data, summary)`",
    },
    {
      what: "a focus ring written by hand",
      pattern: /outline: 2px solid var\(--er-gold\)/,
      home: "src/components/atoms/focus.ts",
      instead: "`focusRing`",
    },
  ],
} satisfies ReuseConfig;
