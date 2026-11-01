/**
 * ─ Split lists ─
 *
 * The run's rows, drawn, laid out for where they show: Comfort's two lists under
 * their bands, Compact's two with a line between them, and the accordion's one.
 * On a long goal the To do band or the line moves what's between the lists, and
 * Compact holds the goal's last row apart under them.
 */

import { html, nothing } from "lit";
import { figure } from "../../utils/figure.js";

/** The rows to lay out. */
export interface SplitLists {
  /** The rows gotten, drawn. */
  readonly gotten: unknown;
  readonly doneCount: number;
  /** The rows left, by key. */
  readonly toDo: readonly string[];
  /** Draws rows left. */
  readonly left: (keys: readonly string[]) => unknown;
  /** What moves the line between the lists, dragged by what it's given, on a long goal alone. */
  readonly handle: ((handleClass: string, by: unknown) => unknown) | undefined;
}

/** Rows gotten over those left, scrolling as one, for the accordion. */
export function oneList({ gotten, doneCount, toDo, left }: SplitLists) {
  const hasBoth = doneCount > 0 && toDo.length > 0;
  return html`<ul class="rows scroller" aria-label="Goal">
    ${gotten} ${hasBoth ? html`<li class="line" aria-hidden="true"></li>` : nothing} ${left(toDo)}
  </ul>`;
}

/** Each list under its band, and neither when it has no rows, for Comfort. */
export function comfortLists({ gotten, doneCount, toDo, left, handle }: SplitLists) {
  const words = (word: string, count: number) =>
    html`${word} <span class="fig">${figure(count)}</span>`;
  const toDoWords = words("To do", toDo.length);
  return html`${
    doneCount === 0
      ? nothing
      : html`<h3 class="band band-heading">${words("Done", doneCount)}</h3>
          <ul class="rows done scroller">
            ${gotten}
          </ul>`
  }
  ${
    toDo.length === 0
      ? nothing
      : html`${
            handle === undefined
              ? html`<h3 class="band band-heading">${toDoWords}</h3>`
              : html`<div class="band band-heading">
                  ${handle("", html`<span class="band-words">${toDoWords}</span>`)}
                </div>`
          }
          <ul class="rows left scroller">
            ${left(toDo)}
          </ul>`
  }`;
}

/** The lists with a line between them, for Compact. */
export function compactLists({ gotten, doneCount, toDo, left, handle }: SplitLists) {
  const line = html`<div class="line" aria-hidden="true"></div>`;
  return html`<ul class="rows done scroller" aria-label="Goal rows done">
      ${gotten}
    </ul>
    ${
      doneCount === 0 || toDo.length === 0
        ? nothing
        : handle === undefined
          ? line
          : handle("divider", line)
    }
    <ul class="rows left scroller" aria-label="Goal rows left">
      ${left(handle === undefined ? toDo : toDo.slice(0, -1))}
    </ul>
    ${
      handle === undefined
        ? nothing
        : html`<ul class="rows last">
            ${left(toDo.slice(-1))}
          </ul>`
    }`;
}
