/**
 * ─ Release ─
 *
 * What becomes of the items left in the slot's world, its goal achieved. Where
 * the room lets the slot release them, a Release button sends `!release`, which
 * can't be undone; it's held back while there's no room to send to, and once
 * sent. Its parts lie directly in whatever holds it, for that to lay out.
 */

import { LitElement, css, html, nothing } from "lit";
import type { ReleaseState } from "../../archipelago/release.js";
import { buttonStyles } from "../atoms/button.js";
import { focusRing } from "../atoms/focus.js";
import { visuallyHidden } from "../atoms/visually-hidden.js";
import { RELEASE_LINES } from "../utils/goal-words.js";

/**
 * What becomes of the items left, and the button that releases them.
 */
export class ErRelease extends LitElement {
  static override properties = {
    release: { attribute: false },
    say: { attribute: false },
    isSent: { state: true },
  };

  static override styles = [
    buttonStyles,
    focusRing,
    visuallyHidden,
    css`
      :host {
        display: contents;
      }
      p {
        margin: 0;
        font-size: 0.9em;
        color: var(--er-ink-soft);
      }
      .button {
        align-self: flex-start;
      }
    `,
  ];

  /** What becomes of the items left in the slot's world. */
  release: ReleaseState = "unknown";
  /** Says a command to the room; undefined while there's no room to send to. */
  say: ((text: string) => void) | undefined;
  private isSent = false;

  override render() {
    return html`<p class="sr-narrow">${RELEASE_LINES[this.release]}</p>
      ${
        this.release === "can release"
          ? html`<button
              class="button"
              data-tone="overlay"
              ?disabled=${this.say === undefined || this.isSent}
              @click=${this.sendRelease}
            >
              Release
            </button>`
          : nothing
      }`;
  }

  private readonly sendRelease = (): void => {
    this.say?.("!release");
    this.isSent = true;
  };
}

customElements.define("er-release", ErRelease);

declare global {
  interface HTMLElementTagNameMap {
    "er-release": ErRelease;
  }
}
