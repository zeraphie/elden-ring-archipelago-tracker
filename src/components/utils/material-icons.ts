/*! The backpack, forum, logout, keyboard arrow down, settings, info, timer play, timer pause and replay icons are Material Symbols, copyright Google LLC, under the Apache License 2.0, https://www.apache.org/licenses/LICENSE-2.0 */

/**
 * ─ Material icons ─
 *
 * The page's icons from Material Symbols, each one path on its view box,
 * filled in the text's colour and sized where they're used: a backpack for
 * items, speech for the chat, a door to leave by, an arrow down to a list's
 * foot, a cog for the settings, an i for the legend, and a stopwatch and an
 * arrow round for the run's timer. Checks keep the game's own sack.
 */

import { html } from "lit";

/** A backpack, for items: the Items tab, and the simulated item. */
export const backpackIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path
    fill="currentColor"
    d="M240-80q-33 0-56.5-23.5T160-160v-480q0-56 34-98t86-56v-86h120v80h160v-80h120v86q52 14 86 56t34 98v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480q0-33-23.5-56.5T640-720H320q-33 0-56.5 23.5T240-640v480Zm340-160h80v-160H300v80h280v80ZM480-440Z"
  ></path>
</svg>`;

/** Two speech bubbles, for the Chat tab. */
export const forumIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path
    fill="currentColor"
    d="M880-80 720-240H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v560ZM160-473l47-47h393v-280H160v327ZM80-280v-520q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240L80-280Zm80-240v-280 280Z"
  ></path>
</svg>`;

/** An arrow pointing down, for going to the foot of a list. */
export const arrowDownIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path fill="currentColor" d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"></path>
</svg>`;

/** An arrow out of a door, for leaving the room: the header's Disconnect. */
export const logoutIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path
    fill="currentColor"
    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
  ></path>
</svg>`;

/** An i in a ring, for the map's legend. */
export const infoIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path
    fill="currentColor"
    d="M453-280h60v-240h-60v240Zm50.5-323.2q9.5-9.2 9.5-22.8 0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2t23.52-9.2ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"
  ></path>
</svg>`;

/** A stopwatch with a play mark, for starting or going on with the run. */
export const timerPlayIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path
    fill="currentColor"
    d="M360-860v-60h240v60H360Zm-19.5 750.5Q275-138 226-187t-77.5-114.5Q120-367 120-441t28.5-139.5Q177-646 226-695t114.5-77.5Q406-801 480-801q67 0 126 22.5T711-716l51-51 42 42-51 51q36 40 61.5 97T840-441q0 74-28.5 139.5T734-187q-49 49-114.5 77.5T480-81q-74 0-139.5-28.5Zm352-119Q780-316 780-441t-87.5-212.5Q605-741 480-741t-212.5 87.5Q180-566 180-441t87.5 212.5Q355-141 480-141t212.5-87.5ZM480-440Zm-73 147 221-149-221-148v297Z"
  ></path>
</svg>`;

/** A stopwatch with a pause mark, for pausing the run. */
export const timerPauseIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path
    fill="currentColor"
    d="M360-860v-60h240v60H360Zm-19.5 750.5Q275-138 226-187t-77.5-114.5Q120-367 120-441t28.5-139.5Q177-646 226-695t114.5-77.5Q406-801 480-801q67 0 126 22.5T711-716l51-51 42 42-51 51q36 40 61.5 97T840-441q0 74-28.5 139.5T734-187q-49 49-114.5 77.5T480-81q-74 0-139.5-28.5Zm352-119Q780-316 780-441t-87.5-212.5Q605-741 480-741t-212.5 87.5Q180-566 180-441t87.5 212.5Q355-141 480-141t212.5-87.5ZM480-440ZM370-281h60v-320h-60v320Zm160 0h60v-320h-60v320Z"
  ></path>
</svg>`;

/** An arrow going back round, for resetting the run. */
export const replayIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path
    fill="currentColor"
    d="M339.5-108Q274-136 225-185t-77-114.5Q120-365 120-440h60q0 125 87.5 212.5T480-140q125 0 212.5-87.5T780-440q0-125-85-212.5T485-740h-23l73 73-41 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735-695q49 49 77 114.5T840-440q0 75-28 140.5T735-185q-49 49-114.5 77T480-80q-75 0-140.5-28Z"
  ></path>
</svg>`;

/** A cog, for the header's settings button. */
export const settingsIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path
    fill="currentColor"
    d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
  ></path>
</svg>`;
