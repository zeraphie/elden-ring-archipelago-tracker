/**
 * ─ App styles ─
 *
 * The page's layout: the map, with the goal menu over its left side, and the
 * panel beside it, or stacked under it at a tablet's width and below.
 */

import { css, unsafeCSS } from "lit";
import { narrow } from "./atoms/layout.js";
import { MAP_MIN_PX, PANEL_MIN_HEIGHT_PX } from "./panel-split.js";

/** How wide the goal menu lies over the map's left side, in CSS pixels. */
export const GOAL_MENU_PX = 440;
/** How wide the run's timer lies over the map's left side, in CSS pixels. */
export const RUN_TIMER_WIDTH_PX = 396;
// How high the run's timer lies over the goal menu's foot, in CSS pixels: 78 for its two buttons,
// and its 20 of room around them.
const RUN_TIMER_PX = 98;

/** The page's layout, for its root element. */
export const appStyles = css`
  /* The page is the window's height, so the panel's lists scroll in it rather than the page. */
  :host {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  /* The map, with the goal menu over its left side, and the panel beside it. */
  .stage {
    display: flex;
    flex: 1 1 0;
    min-height: 480px;
  }
  /* Clipped, so a toast leaving off its right edge goes under the panel without widening the page. */
  .map {
    position: relative;
    flex: 999 1 560px;
    min-width: 0;
    overflow: clip;
  }
  /* Over the map's lower right, above its zoom buttons. */
  er-toasts {
    position: absolute;
    z-index: 3;
    right: 16px;
    bottom: 72px;
    width: min(380px, calc(100% - 32px));
  }
  /* Its width its border included, as the handle measures it. It keeps the width it's dragged
     to as the window narrows, the map giving way, but never so wide the map is too narrow to use. */
  er-panel {
    box-sizing: border-box;
    flex: 0 0 var(--er-panel-width, 380px);
    min-width: 0;
    max-width: calc(100% - ${unsafeCSS(MAP_MIN_PX)}px);
  }
  /* Between the map and the panel, over the edge of each, the panel's border its line. */
  er-resize-handle {
    position: relative;
    z-index: 5;
    flex: none;
    width: 12px;
    margin: 0 -6px;
  }
  er-map {
    position: absolute;
    inset: 0;
  }
  er-goal-menu {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: min(${unsafeCSS(GOAL_MENU_PX)}px, 100%);
  }
  er-run-timer {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: ${unsafeCSS(RUN_TIMER_WIDTH_PX)}px;
  }
  /* In the goal menu's place, from the header to the page's foot. */
  er-run-splits {
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    width: min(${unsafeCSS(RUN_TIMER_WIDTH_PX)}px, 100%);
  }
  /* With no sheet tabs over it, the goal menu starts nearer the top. */
  .map[data-timer] er-goal-menu {
    padding-top: 16px;
    --er-goal-menu-foot: ${unsafeCSS(RUN_TIMER_PX)}px;
  }
  /* Across the top of the map, under its sheet tabs and route tools. */
  er-version-notice {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    z-index: 3;
  }
  /* At a tablet's width and below, the map on top and the panel under it, the goal menu a strip
     along the map's foot clear of its zoom buttons, and the toasts and notice under its tabs. */
  @media ${narrow} {
    .stage {
      flex-direction: column;
      min-height: 0;
    }
    /* As tall as it's dragged to, but never so tall the panel under it is too short to use. */
    .map {
      flex: none;
      height: var(--er-map-height, clamp(300px, 46vh, 520px));
      max-height: calc(100% - ${unsafeCSS(PANEL_MIN_HEIGHT_PX)}px);
    }
    er-panel {
      flex: 1 1 auto;
      max-width: none;
      min-height: 0;
      border-top: none;
    }
    /* A bar along the panel's top edge, as a sheet's grip, taking the panel's border. */
    er-resize-handle {
      width: auto;
      height: 24px;
      margin: 0;
      background: var(--er-panel);
      border-top: 1px solid var(--er-divider);
    }
    /* Clear of the legend's and zoom buttons: four of 44 px, 6 px apart, 10 px in, and a gap. */
    er-goal-menu {
      top: auto;
      right: 214px;
      bottom: 10px;
      left: 10px;
      width: auto;
    }
    er-toasts {
      top: 62px;
      right: 10px;
      bottom: auto;
      left: 10px;
      width: auto;
    }
    er-version-notice {
      top: 62px;
    }
  }
`;
