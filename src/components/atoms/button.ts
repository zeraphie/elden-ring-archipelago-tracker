import { css } from "lit";
import { narrow } from "./layout.js";

/**
 * A button in the game's menu style: square and raised, with an inner glow
 * when hovered. `.button` on a button or a link; `data-tone="primary"` for the
 * way on, `data-tone="quiet"` for leaving, `data-tone="bare"` for one with no
 * edge or fill until it's hovered, `data-tone="overlay"` for a control floating
 * over the map, lit and edged in gold with `aria-pressed="true"`, that light
 * breathing with `data-attention` while it asks to be pressed,
 * `data-size="small"` for a bar, and `data-shape="icon"` for a square holding
 * an icon alone.
 */
export const buttonStyles = css`
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    box-sizing: border-box;
    padding: 6px 18px;
    background: var(--er-raised);
    border: 1px solid var(--er-edge);
    border-radius: var(--er-radius);
    color: var(--er-ink);
    font: inherit;
    font-size: 0.95em;
    text-decoration: none;
    cursor: pointer;
  }
  .button:hover:not(:disabled) {
    background: var(--er-glow-fill);
    box-shadow: var(--er-glow);
  }
  .button[data-tone="primary"] {
    padding-inline: 22px;
    border-color: var(--er-gold-edge);
  }
  .button[data-tone="quiet"] {
    padding-inline: 16px;
    background: transparent;
    border-color: var(--er-line);
    color: var(--er-ink-soft);
  }
  .button[data-tone="bare"] {
    background: transparent;
    border-color: transparent;
    color: var(--er-ink-soft);
  }
  .button[data-tone="overlay"] {
    background: var(--er-overlay);
    border-color: var(--er-line);
  }
  .button[data-tone="overlay"][data-attention],
  .button[data-tone="overlay"][aria-pressed="true"] {
    background: var(--er-glow-fill);
    box-shadow: var(--er-glow);
    border-color: var(--er-gold-edge);
  }
  .button[data-tone="overlay"][data-attention] {
    animation: breathe 2s ease-in-out infinite;
  }
  @keyframes breathe {
    50% {
      background: var(--er-overlay);
      box-shadow: none;
      border-color: var(--er-line);
    }
  }
  /* Under reduced motion the light holds still. */
  @media (prefers-reduced-motion: reduce) {
    .button[data-tone="overlay"][data-attention] {
      animation: none;
    }
  }
  .button[data-shape="icon"] {
    width: 44px;
    padding: 0;
  }
  .button[data-size="small"] {
    min-height: 36px;
    padding: 5px 12px;
    font-size: 0.88em;
  }
  .button[data-shape="icon"][data-size="small"] {
    width: 36px;
    padding: 0;
  }
  /* At a tablet's width and below, a small button is still 44 px tall, for a finger. */
  @media ${narrow} {
    .button[data-size="small"] {
      min-height: 44px;
    }
    .button[data-shape="icon"][data-size="small"] {
      width: 44px;
    }
  }
  .button:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;
