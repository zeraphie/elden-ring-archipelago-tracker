/**
 * ─ Sigil ─
 *
 * The ring of the game's logo, traced from it as clean strokes: four rings,
 * the bowl, the spine, and the arc through its knot at the top. It stands
 * still, or with `drawing` draws itself in the order the game's logo does:
 * light sweeps in from far off onto each ring and draws it round, then the
 * spine rises through the bowl, which spreads both ways, up to the top arc.
 * The logo is FromSoftware's artwork.
 */

import { LitElement, css, html } from "lit";

/**
 * The Elden Ring's sigil, still, or drawing itself with the `drawing` attribute.
 *
 * @cssproperty --er-sigil-draw - How long the drawing takes; 4.5s by default.
 * @cssproperty --er-sigil-weight - Its lines' width, in the logo's units, wider for a small sigil; 16 by default.
 */
export class ErSigil extends LitElement {
  static override styles = css`
    :host {
      --er-sigil-draw: 4.5s;
      --er-sigil-weight: 16;
      display: inline-block;
      aspect-ratio: 448 / 486;
      color: var(--er-gold);
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    .line,
    .comet {
      fill: none;
      stroke-width: var(--er-sigil-weight);
      stroke-linecap: round;
    }
    .line {
      stroke: currentColor;
    }
    .knot {
      fill: currentColor;
    }
    .comet {
      display: none;
      stroke: var(--er-comet);
    }
    /* Drawing: each line is laid down along its length, and a comet is a short streak travelling its path. */
    :host([drawing]) svg {
      filter: drop-shadow(0 0 3px var(--er-sigil-glow));
      animation: glow 1.4s ease var(--er-sigil-draw) forwards;
    }
    :host([drawing]) .line {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      animation: draw var(--length) var(--easing, ease-out) var(--at) forwards;
    }
    :host([drawing]) .comet {
      display: inline;
      stroke-dasharray: 0.25 2;
      stroke-dashoffset: 0.25;
      opacity: 0;
      animation: sweep calc(var(--er-sigil-draw) * 0.3) ease-in var(--at) forwards;
    }
    :host([drawing]) .knot {
      fill-opacity: 0;
      animation: show 0.5s ease calc(var(--er-sigil-draw) * 0.92) forwards;
    }
    /* When each part starts, and how long it takes, as shares of the whole drawing. A ring starts as its comet arrives. */
    .c1 {
      --at: 0s;
    }
    .c2 {
      --at: calc(var(--er-sigil-draw) * 0.04);
    }
    .c3 {
      --at: calc(var(--er-sigil-draw) * 0.08);
    }
    .c4 {
      --at: calc(var(--er-sigil-draw) * 0.12);
    }
    .ring {
      --length: calc(var(--er-sigil-draw) * 0.28);
    }
    .r1 {
      --at: calc(var(--er-sigil-draw) * 0.26);
    }
    .r2 {
      --at: calc(var(--er-sigil-draw) * 0.3);
    }
    .r3 {
      --at: calc(var(--er-sigil-draw) * 0.34);
    }
    .r4 {
      --at: calc(var(--er-sigil-draw) * 0.38);
    }
    .spine {
      --at: calc(var(--er-sigil-draw) * 0.6);
      --length: calc(var(--er-sigil-draw) * 0.32);
      --easing: linear;
    }
    .bowl {
      --at: calc(var(--er-sigil-draw) * 0.64);
      --length: calc(var(--er-sigil-draw) * 0.26);
    }
    .arc {
      --at: calc(var(--er-sigil-draw) * 0.89);
      --length: calc(var(--er-sigil-draw) * 0.12);
    }
    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }
    @keyframes sweep {
      0% {
        stroke-dashoffset: 0.25;
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      100% {
        stroke-dashoffset: -1;
        opacity: 0;
      }
    }
    @keyframes show {
      to {
        fill-opacity: 1;
      }
    }
    @keyframes glow {
      0% {
        filter: drop-shadow(0 0 3px var(--er-sigil-glow));
      }
      40% {
        filter: drop-shadow(0 0 14px var(--er-sigil-glow-bright));
      }
      100% {
        filter: drop-shadow(0 0 6px var(--er-sigil-glow));
      }
    }
    @media (prefers-reduced-motion: reduce) {
      :host([drawing]) svg,
      :host([drawing]) .line,
      :host([drawing]) .knot {
        animation: none;
        stroke-dashoffset: 0;
        fill-opacity: 1;
      }
      :host([drawing]) .comet {
        display: none;
      }
    }
  `;

  // The logo's own units: the spine at x 519, each ring of radius 71, drawn from where its comet meets it.
  override render() {
    return html`<svg viewBox="296 224 448 486" aria-hidden="true">
      <path class="comet c1" pathLength="1" d="M-800 60Q300 360.5 519 360.5"></path>
      <path class="comet c2" pathLength="1" d="M-800 1050Q416.5 860 416.5 492.5"></path>
      <path class="comet c3" pathLength="1" d="M1250 -250Q621.5 150 621.5 492.5"></path>
      <path class="comet c4" pathLength="1" d="M1250 1000Q860 535.5 519 535.5"></path>
      <path
        class="line ring r1"
        pathLength="1"
        d="M519 360.5A71 71 0 1 1 519 502.5A71 71 0 1 1 519 360.5"
      ></path>
      <path
        class="line ring r2"
        pathLength="1"
        d="M416.5 492.5A71 71 0 1 1 558.5 492.5A71 71 0 1 1 416.5 492.5"
      ></path>
      <path
        class="line ring r3"
        pathLength="1"
        d="M621.5 492.5A71 71 0 1 1 479.5 492.5A71 71 0 1 1 621.5 492.5"
      ></path>
      <path
        class="line ring r4"
        pathLength="1"
        d="M519 535.5A71 71 0 1 1 519 393.5A71 71 0 1 1 519 535.5"
      ></path>
      <path class="line spine" pathLength="1" d="M519 705V228"></path>
      <path class="line bowl" pathLength="1" d="M519 641.5A244.5 244.5 0 0 0 730.7 519.3"></path>
      <path class="line bowl" pathLength="1" d="M519 641.5A244.5 244.5 0 0 1 307.3 519.3"></path>
      <path class="line arc" pathLength="1" d="M519 273A211 211 0 0 0 643 232.7"></path>
      <path class="line arc" pathLength="1" d="M519 273A211 211 0 0 1 395 232.7"></path>
      <path
        class="knot"
        d="M519 250.5Q522.9 263.5 533 268.5Q522.9 273.5 519 286.5Q515.1 273.5 505 268.5Q515.1 263.5 519 250.5Z"
      ></path>
    </svg>`;
  }
}

customElements.define("er-sigil", ErSigil);

declare global {
  interface HTMLElementTagNameMap {
    "er-sigil": ErSigil;
  }
}
