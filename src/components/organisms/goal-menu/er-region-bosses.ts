/**
 * ─ Region bosses ─
 *
 * One region's goal bosses, as a long goal lists them: those still to defeat,
 * each with its place, then those defeated, folded. The desktop's goal column
 * and the phone's sheet show them alike.
 */

import { LitElement, css, html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { dotStyles } from "../../atoms/dot.js";
import { figures } from "../../atoms/figures.js";
import { foldStyles } from "../../atoms/fold.js";
import { bandHeadingStyles } from "../../atoms/heading.js";

/** A goal boss as a region's lists show it: its key, its name, and where it is. */
export interface RegionBossRow {
  readonly key: string;
  readonly name: string;
  readonly place: string;
}

/**
 * A region's goal bosses to defeat, and those defeated folded beneath.
 *
 * @cssproperty --er-region-bosses-inset - How far the lists sit in from the left, to line up with what's around them; 22px by default.
 */
export class ErRegionBosses extends LitElement {
  static override properties = {
    toDo: { attribute: false },
    defeated: { attribute: false },
  };

  static override styles = [
    bandHeadingStyles,
    dotStyles,
    figures,
    foldStyles,
    css`
      :host {
        --inset: var(--er-region-bosses-inset, 22px);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      h3,
      summary {
        margin: 0 60px 0 0;
        padding: 6px 16px 6px var(--inset);
      }
      h3 {
        font-size: 1em;
        color: var(--er-ink-soft);
      }
      ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 0;
        padding: 0 0 0 var(--inset);
        list-style: none;
      }
      details ul {
        padding-top: 10px;
      }
      li {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }
      .text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .name {
        color: var(--er-ink);
      }
      .defeated .name {
        color: var(--er-ink-soft);
      }
      .place {
        font-size: 0.85em;
        color: var(--er-ink-muted);
      }
      .none {
        margin: 0;
        padding-left: var(--inset);
        color: var(--er-ink-muted);
      }
    `,
  ];

  toDo: readonly RegionBossRow[] = [];
  defeated: readonly RegionBossRow[] = [];

  override render() {
    const { toDo, defeated } = this;
    return html`${
      toDo.length === 0 && defeated.length === 0
        ? html`<p class="none">None of the goal's bosses are here.</p>`
        : nothing
    }
    ${
      toDo.length === 0
        ? nothing
        : html`<h3 class="band-heading">To defeat <span class="fig">${toDo.length}</span></h3>
            <ul>
              ${repeat(
                toDo,
                ({ key }) => key,
                ({ name, place }) =>
                  html`<li>
                    <span class="dot" role="img" aria-label="To defeat"></span>
                    <span class="text">
                      <span class="name">${name}</span>
                      <span class="place">${place}</span>
                    </span>
                  </li>`
              )}
            </ul>`
    }
    ${
      defeated.length === 0
        ? nothing
        : html`<details>
            <summary class="band-heading">
              Defeated <span class="fig">${defeated.length}</span>
            </summary>
            <ul class="defeated">
              ${repeat(
                defeated,
                ({ key }) => key,
                ({ name }) =>
                  html`<li>
                    <span class="dot" data-state="in" role="img" aria-label="Defeated"></span>
                    <span class="name">${name}</span>
                  </li>`
              )}
            </ul>
          </details>`
    }`;
  }
}

customElements.define("er-region-bosses", ErRegionBosses);

declare global {
  interface HTMLElementTagNameMap {
    "er-region-bosses": ErRegionBosses;
  }
}
