/**
 * ─ Ago ─
 *
 * A moment as how long ago it was, "12 seconds ago" or "yesterday", kept
 * current to the second by the page's one clock. On each tick it works out
 * its words again, and draws itself only when they've changed, so the list
 * it sits in is never drawn again for the time.
 */

import { LitElement, html, nothing } from "lit";
import { ago } from "../utils/ago.js";
import { PAGE_CLOCK } from "../utils/clock.js";

/** How long ago a moment was, as a `<time>`, current to the second. */
export class ErAgo extends LitElement {
  static override properties = { at: { attribute: false } };

  /** The moment, in milliseconds since 1970; undefined for one from before the tracker was watching. */
  at: number | undefined;
  // The words drawn last.
  private words = "";
  private stop: (() => void) | undefined;

  override connectedCallback(): void {
    super.connectedCallback();
    this.stop = PAGE_CLOCK.listen((now) => {
      if (ago(this.at, now) !== this.words) {
        this.requestUpdate();
      }
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stop?.();
    this.stop = undefined;
  }

  override render() {
    this.words = ago(this.at, PAGE_CLOCK.now());
    return html`<time datetime=${this.at === undefined ? nothing : new Date(this.at).toISOString()}
      >${this.words}</time
    >`;
  }
}

customElements.define("er-ago", ErAgo);

declare global {
  interface HTMLElementTagNameMap {
    "er-ago": ErAgo;
  }
}
