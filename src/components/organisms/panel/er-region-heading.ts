/**
 * ─ Region heading ─
 *
 * The heading of the region picked: its name centred between gold rules, a
 * badge for how it stands with what it still needs beside it while it's
 * locked, and how many of its key checks and of all its checks are done.
 * Marked `compact`, as under the map, it's one line: the name, given in its
 * slot as the region picker, the badge, and the counts stacked at the end,
 * with what it needs under them while it's locked.
 */

import { LitElement, css, html, nothing } from "lit";
import type { RegionSummary } from "../../../data/rules/region-summary.js";
import { barStyles } from "../../atoms/bar.js";
import { figures } from "../../atoms/figures.js";
import { AREA_STATE_WORDS } from "../../utils/area-words.js";
import { figure, percentDone } from "../../utils/figure.js";

/**
 * The picked region's name, how it stands, what it needs, and its progress.
 *
 * @slot name - The region's name, when the heading is marked `compact`: the region picker, as a title.
 */
export class ErRegionHeading extends LitElement {
  static override properties = {
    name: { attribute: false },
    summary: { attribute: false },
    needs: { attribute: false },
  };

  static override styles = [
    barStyles,
    figures,
    css`
      :host {
        display: block;
        padding: 18px 16px 14px;
        border-bottom: 1px solid var(--er-panel-divider);
        text-align: center;
      }
      .rule {
        height: 1px;
        margin: 0 8% 12px;
        background: var(--er-gold-rule);
      }
      h2 {
        margin: 0 0 12px;
        font-weight: 600;
        font-size: 1.9em;
        line-height: 1.1;
        color: var(--er-ink-bright);
      }
      .standing {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 8px;
        font-size: 0.92em;
      }
      .badge {
        padding: 2px 9px;
        font-weight: 600;
        color: var(--er-ink);
      }
      .badge[data-state="locked"] {
        background: var(--er-badge-locked);
      }
      .badge[data-state="open"] {
        background: var(--er-badge-open);
      }
      .badge[data-state="done"] {
        background: var(--er-badge-done);
        color: var(--er-ink-on-gold);
      }
      .muted {
        color: var(--er-ink-muted);
      }
      .progress {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 12px;
        font-size: 0.9em;
        white-space: nowrap;
      }
      .track {
        flex-grow: 1;
      }
      :host([compact]) {
        padding: 4px 16px 0;
        border-bottom: none;
        text-align: left;
      }
      .line {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .line h2 {
        min-width: 0;
        margin: 0;
        font-size: inherit;
      }
      .line .badge {
        flex-shrink: 0;
        padding: 1px 7px;
        font-size: 0.78em;
      }
      .counts {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex-shrink: 0;
        margin-left: auto;
        font-size: 0.82em;
        line-height: 1.25;
        white-space: nowrap;
        color: var(--er-ink-muted);
      }
      .counts .done {
        color: var(--er-ink-bright);
      }
      .needs {
        margin: 0 0 8px;
        font-size: 0.88em;
        color: var(--er-ink-muted);
      }
    `,
  ];

  /** The region's full name. */
  name = "";
  summary: RegionSummary | undefined;
  /** What the region still needs, in English, while it's locked. */
  needs: string | undefined;

  override render() {
    const { summary } = this;
    if (summary === undefined) {
      return nothing;
    }
    const { state, keyChecks, keyDone, checks, done } = summary;
    if (this.hasAttribute("compact")) {
      return html`<div class="line">
          <h2><slot name="name"></slot></h2>
          <span class="badge" data-state=${state}>${AREA_STATE_WORDS[state]}</span>
          <span class="counts">
            <span
              >Key <span class="fig done">${figure(keyDone)}</span> of
              <span class="fig">${figure(keyChecks)}</span></span
            >
            <span
              >All <span class="fig done">${figure(done)}</span> of
              <span class="fig">${figure(checks)}</span></span
            >
          </span>
        </div>
        ${this.needs === undefined ? nothing : html`<p class="needs">${this.needs}</p>`}`;
    }
    return html`<div class="rule" aria-hidden="true"></div>
      <h2>${this.name}</h2>
      <div class="rule" aria-hidden="true"></div>
      <div class="standing">
        <span class="badge" data-state=${state}>${AREA_STATE_WORDS[state]}</span>
        ${this.needs === undefined ? nothing : html`<span class="muted">${this.needs}</span>`}
      </div>
      <div class="progress">
        <span class="muted"
          >Key checks <span class="fig">${figure(keyDone)}</span> of
          <span class="fig">${figure(keyChecks)}</span></span
        >
        <div class="track" aria-hidden="true">
          <div class="fill" style="--done: ${percentDone(keyDone, keyChecks)}%"></div>
        </div>
        <span class="muted"
          >All <span class="fig">${figure(done)}</span> of
          <span class="fig">${figure(checks)}</span></span
        >
      </div>`;
  }
}

customElements.define("er-region-heading", ErRegionHeading);

declare global {
  interface HTMLElementTagNameMap {
    "er-region-heading": ErRegionHeading;
  }
}
