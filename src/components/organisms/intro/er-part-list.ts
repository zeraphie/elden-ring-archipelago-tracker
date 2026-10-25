/**
 * ─ Part list ─
 *
 * The parts of setting the tracker up, each with its dot, under a line that
 * names what's still loading and counts how many are in. The line is a live
 * region, so a screen reader hears it change; each dot's state is said
 * beside it in words. Once setting up has stopped, a part that was still
 * loading stands still, as nothing more is asked for it.
 */

import { LitElement, css, html } from "lit";
import type { PartStanding } from "../../../state/entry.js";
import { dotStyles } from "../../atoms/dot.js";
import { figures } from "../../atoms/figures.js";
import { visuallyHidden } from "../../atoms/visually-hidden.js";
import { loadingLine, PART_LABELS, PART_STATE_WORDS } from "../../utils/entry-words.js";

/** The parts of setting the tracker up, and how each stands. */
export class ErPartList extends LitElement {
  static override properties = {
    parts: { attribute: false },
    isStopped: { attribute: false },
  };

  static override styles = [
    dotStyles,
    figures,
    visuallyHidden,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 12px;
      }
      .line {
        font-size: 1.05em;
        color: var(--er-ink-heading);
      }
      .count {
        color: var(--er-ink-muted);
        white-space: nowrap;
      }
      ul {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px 20px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        display: flex;
        align-items: center;
        gap: 9px;
        color: var(--er-ink-muted);
      }
      li[data-state="in"] {
        color: var(--er-ink);
      }
      li[data-state="failed"] {
        color: var(--er-error);
      }
    `,
  ];

  parts: readonly PartStanding[] = [];
  isStopped = false;

  override render() {
    const inCount = this.parts.filter(({ state }) => state === "in").length;
    return html`<div class="head">
        <span class="line" role="status">${loadingLine(this.parts, this.isStopped)}</span>
        <span class="count"
          ><span class="fig">${inCount}</span> of
          <span class="fig">${this.parts.length}</span></span
        >
      </div>
      <ul>
        ${this.parts.map(({ part, state: standing }) => {
          const state = this.isStopped && standing === "loading" ? "stopped" : standing;
          return html`<li data-state=${state}>
            <span class="dot" data-state=${state} aria-hidden="true"></span>
            <span>${PART_LABELS[part]}</span>
            <span class="sr">${PART_STATE_WORDS[state]}</span>
          </li>`;
        })}
      </ul>`;
  }
}

customElements.define("er-part-list", ErPartList);

declare global {
  interface HTMLElementTagNameMap {
    "er-part-list": ErPartList;
  }
}
