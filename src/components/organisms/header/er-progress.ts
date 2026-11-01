/**
 * ─ Progress ─
 *
 * How far the slot has got, read out: its key checks done out of all, over a
 * thin gold bar, and all its checks done out of all. A total not yet known is
 * left off, and key checks that can't be counted say so.
 */

import { LitElement, css, html, nothing } from "lit";
import type { Progress } from "../../../state/utils/progress.js";
import { barStyles } from "../../atoms/bar.js";
import { figures } from "../../atoms/figures.js";
import { narrow } from "../../atoms/layout.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import { figure, percentDone } from "../../utils/figure.js";

/** The slot's key checks and all its checks, done out of all. */
export class ErProgress extends LitElement {
  static override properties = { progress: { attribute: false } };

  static override styles = [
    barStyles,
    visuallyHidden,
    figures,
    css`
      :host {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 18px;
        font-size: 0.9em;
      }
      /* The count and its bar, centred together as one. */
      .key {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 150px;
      }
      .muted {
        color: var(--er-ink-muted);
      }
      strong {
        font-weight: 600;
      }
      /* At a tablet's width and below, the key checks' count alone; a screen reader still hears it
         all. */
      @media ${narrow} {
        .key {
          min-width: 0;
        }
        .track {
          display: none;
        }
      }
    `,
  ];

  progress: Progress | undefined;

  override render() {
    if (this.progress === undefined) {
      return nothing;
    }
    const { keyDone, keyAll, allDone, all } = this.progress;
    return html`${
        keyAll === undefined
          ? html`<span
              class="muted"
              title="This slot's slot_data isn't in a shape the tracker reads, so its key checks can't be counted."
              >Key checks not known</span
            >`
          : html`<div class="key">
              <span
                ><span class="muted">Key<span class="sr-narrow"> checks</span></span>
                <strong><span class="fig">${figure(keyDone)}</span></strong>
                <span class="muted">of <span class="fig">${figure(keyAll)}</span></span></span
              >
              <div class="track" aria-hidden="true">
                <div class="fill" style="--done: ${percentDone(keyDone, keyAll)}%"></div>
              </div>
            </div>`
      }
      <span class="sr-narrow"
        ><span class="muted">All checks</span> <span class="fig">${figure(allDone)}</span> ${
          all === undefined
            ? nothing
            : html`<span class="muted">of <span class="fig">${figure(all)}</span></span>`
        }</span
      >`;
  }
}

customElements.define("er-progress", ErProgress);

declare global {
  interface HTMLElementTagNameMap {
    "er-progress": ErProgress;
  }
}
