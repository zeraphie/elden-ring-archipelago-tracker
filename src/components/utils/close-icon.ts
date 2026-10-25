import { html } from "lit";

/** A close button's cross, drawn in the button's own colour, 12 pixels square. */
export const closeIcon = html`<svg
  width="12"
  height="12"
  viewBox="0 0 12 12"
  fill="none"
  stroke="currentColor"
  stroke-width="1.4"
  stroke-linecap="round"
  aria-hidden="true"
>
  <path d="M2 2l8 8M10 2l-8 8"></path>
</svg>`;
