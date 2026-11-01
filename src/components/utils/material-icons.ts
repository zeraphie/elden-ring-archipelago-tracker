/*! The backpack, forum, logout, keyboard arrow down, settings and info icons are Material Symbols, copyright Google LLC, under the Apache License 2.0, https://www.apache.org/licenses/LICENSE-2.0 */

/**
 * ─ Material icons ─
 *
 * The page's icons from Material Symbols, each one path on its view box,
 * filled in the text's colour and sized where they're used: a backpack for
 * items, speech for the chat, a door to leave by, an arrow down to a list's
 * foot, a cog for the settings, and an i for the legend. Checks keep the
 * game's own sack.
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

/** A cog, for the header's settings button. */
export const settingsIcon = html`<svg viewBox="0 -960 960 960" aria-hidden="true">
  <path
    fill="currentColor"
    d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
  ></path>
</svg>`;
