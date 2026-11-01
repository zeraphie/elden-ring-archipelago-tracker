/**
 * ─ Hint list ─
 *
 * The items a !hint can name, as rows laid over the foot of the chat, on the
 * input's line and as wide as the panel, in the words' look of the hints line
 * under them. Four show and the rest scroll, or fewer where the panel's short,
 * as the list never leaves the chat. The row picked carries the olive band. It
 * stays in the chat's own shadow root, so the input can name its rows to a
 * screen reader, and pressing a row leaves the focus in the input.
 */

import { css, html, nothing } from "lit";
import { bandRowStyles } from "../../atoms/band.js";
import { narrow } from "../../atoms/layout.js";
import { scrollerStyles } from "../../atoms/scroller.js";

/** The id of the list, for the input to name it. */
export const HINT_LIST = "hint-list";

/** The id of a row, for the input to say which is picked. */
export function hintRowId(index: number): string {
  return `hint-${index}`;
}

/** The list's look, laid over the foot of its nearest positioned parent. */
export const hintListStyles = [
  bandRowStyles,
  scrollerStyles,
  css`
    .hints {
      --hint-row: 38px;
      position: absolute;
      z-index: 3;
      right: 0;
      bottom: 0;
      left: 0;
      max-height: min(calc(4 * var(--hint-row) + 1px), 100%);
      box-sizing: border-box;
      margin: 0;
      padding: 0 var(--er-panel-clear, 0px) 0 0;
      background: var(--er-overlay);
      border-top: 1px solid var(--er-divider);
      box-shadow: var(--er-overlay-shadow-up);
      list-style: none;
    }
    .hint {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: var(--hint-row);
      padding: 0 16px;
      border-bottom: 1px solid var(--er-panel-divider);
      /* The hints line's size: 0.92em of the form's own 0.92em. */
      font-size: 0.846em;
      color: var(--er-ink-muted);
      cursor: pointer;
    }
    .hint:last-child {
      border-bottom: none;
    }
    .hint:hover,
    .hint[aria-current="true"] {
      color: var(--er-ink);
    }
    @media ${narrow} {
      .hints {
        --hint-row: 44px;
      }
    }
  `,
];

/** The rows of a list of items, `active` the one picked, telling `onPick` of the one pressed. */
export function hintList(items: readonly string[], active: number, onPick: (item: string) => void) {
  return html`<ul id=${HINT_LIST} class="hints scroller" role="listbox" aria-label="Items to hint">
    ${items.map(
      (item, i) =>
        html`<li
          id=${hintRowId(i)}
          class="hint band-row"
          role="option"
          aria-selected=${String(i === active)}
          aria-current=${i === active ? "true" : nothing}
          @pointerdown=${(event: PointerEvent) => event.preventDefault()}
          @click=${() => onPick(item)}
        >
          ${item}
        </li>`
    )}
  </ul>`;
}
