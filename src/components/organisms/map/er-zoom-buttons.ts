/**
 * ─ Zoom buttons ─
 *
 * The map's zoom by button, for whoever has no wheel or pinch to hand: in,
 * out, and the fit, a frame's corners: the whole map, or at a tablet's width
 * and below the region selected.
 */

import { LitElement, css, html } from "lit";
import { buttonStyles } from "../../atoms/button.js";
import { focusRing } from "../../atoms/focus.js";
import { NARROW_MEDIA } from "../../atoms/layout.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import type { ZoomTo } from "./camera/map-camera.js";
import { emit } from "../../utils/emit.js";
import { MediaController } from "../../utils/media.js";

/**
 * Zoom in, zoom out, and fit: the whole map, or the region selected.
 *
 * @fires er-zoom - A button was pressed; `detail` is its `ZoomTo`: "in", "out" or "whole".
 */
export class ErZoomButtons extends LitElement {
  static override styles = [
    buttonStyles,
    focusRing,
    visuallyHidden,
    css`
      :host {
        display: flex;
        gap: 6px;
      }
      .whole svg {
        width: 18px;
        height: 18px;
      }
      svg {
        width: 16px;
        height: 16px;
        stroke: currentColor;
        stroke-width: 1.6;
        fill: none;
      }
    `,
  ];

  // Whether the fit is the region selected, for its button's name.
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);

  override render() {
    const fit = this.isNarrow.matches ? "Selected region" : "Whole map";
    return html`<button
        class="button"
        data-tone="overlay"
        data-shape="icon"
        aria-label="Zoom in"
        @click=${() => this.zoom("in")}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12"></path></svg>
      </button>
      <button
        class="button"
        data-tone="overlay"
        data-shape="icon"
        aria-label="Zoom out"
        @click=${() => this.zoom("out")}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h12"></path></svg>
      </button>
      <button
        class="button whole"
        data-tone="overlay"
        data-shape="icon"
        title=${fit}
        @click=${() => this.zoom("whole")}
      >
        <span class="sr">${fit}</span>
        <svg viewBox="0 0 18 18" aria-hidden="true">
          <path d="M2 6V2h4M12 2h4v4M16 12v4h-4M6 16H2v-4"></path>
        </svg>
      </button>`;
  }

  private zoom(to: ZoomTo): void {
    emit<ZoomTo>(this, "er-zoom", to);
  }
}

customElements.define("er-zoom-buttons", ErZoomButtons);

declare global {
  interface HTMLElementTagNameMap {
    "er-zoom-buttons": ErZoomButtons;
  }
}
