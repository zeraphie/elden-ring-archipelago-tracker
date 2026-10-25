/*! The backpack and forum icons are Material Symbols, copyright Google LLC, under the Apache License 2.0, https://www.apache.org/licenses/LICENSE-2.0 */

/**
 * ─ Material icons ─
 *
 * The page's icons from Material Symbols, each one path on its view box,
 * filled in the text's colour and sized where they're used: a backpack for
 * items, and speech for the chat. Checks keep the game's own sack.
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
