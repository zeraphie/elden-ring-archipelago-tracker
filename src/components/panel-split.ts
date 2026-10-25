/**
 * ─ Panel split ─
 *
 * How the page splits between the map and the panel, as the person drags it:
 * the panel's width beside the map, and the map's height over the panel when
 * the page is stacked. Each holds for the session, in its storage, and a size
 * never dragged is left to the page's own layout. The bounds keep a map wide
 * or tall enough to use, and a panel enough to read.
 */

import type { ReactiveControllerHost } from "lit";

// The least the panel's width can be beside the map.
const PANEL_MIN_PX = 320;
/** The least the map's width can be beside the panel, however it's dragged or the window narrows. */
export const MAP_MIN_PX = 480;
// The least the map's height can be over the panel, with the header's 61 px over both.
const MAP_MIN_HEIGHT_PX = 200;
const HEADER_PX = 61;
/** The least the panel's height can be under the map, however it's dragged or the window shortens. */
export const PANEL_MIN_HEIGHT_PX = 240;

// Where the session keeps each size.
const PANEL_WIDTH_KEY = "er-panel-width";
const MAP_HEIGHT_KEY = "er-map-height";

/** The page's split between the map and the panel, as dragged, kept for the session. */
export class PanelSplit {
  /** The panel's width beside the map, in CSS pixels; undefined until it's dragged. */
  panelWidth = read(PANEL_WIDTH_KEY);
  /** The map's height over the panel when the page is stacked; undefined until it's dragged. */
  mapHeight = read(MAP_HEIGHT_KEY);

  constructor(private readonly host: ReactiveControllerHost) {}

  /** The custom properties the page's stage takes, for the sizes dragged. */
  get styles(): Readonly<Record<string, string>> {
    return {
      ...(this.panelWidth === undefined ? {} : { "--er-panel-width": `${this.panelWidth}px` }),
      ...(this.mapHeight === undefined ? {} : { "--er-map-height": `${this.mapHeight}px` }),
    };
  }

  /** The least and the most the panel's width can be, in the window as it now is. */
  readonly panelLimits = (): readonly [number, number] => [
    PANEL_MIN_PX,
    Math.max(PANEL_MIN_PX, innerWidth - MAP_MIN_PX),
  ];

  /** The least and the most the map's height can be, in the window as it now is. */
  readonly mapLimits = (): readonly [number, number] => [
    MAP_MIN_HEIGHT_PX,
    Math.max(MAP_MIN_HEIGHT_PX, innerHeight - HEADER_PX - PANEL_MIN_HEIGHT_PX),
  ];

  /** Sets the panel's width, and keeps it for the session. */
  readonly setPanelWidth = ({ detail }: CustomEvent<number>): void => {
    this.panelWidth = detail;
    write(PANEL_WIDTH_KEY, detail);
    this.host.requestUpdate();
  };

  /** Sets the map's height, and keeps it for the session. */
  readonly setMapHeight = ({ detail }: CustomEvent<number>): void => {
    this.mapHeight = detail;
    write(MAP_HEIGHT_KEY, detail);
    this.host.requestUpdate();
  };
}

// A size the session kept; none when it kept none, or its storage can't be read, as in a private window.
function read(key: string): number | undefined {
  try {
    const size = Number(sessionStorage.getItem(key) ?? Number.NaN);
    return Number.isFinite(size) ? size : undefined;
  } catch {
    return undefined;
  }
}

// Keeps a size for the session, where the session can keep it; the page works the same without.
function write(key: string, size: number): void {
  try {
    sessionStorage.setItem(key, String(Math.round(size)));
  } catch {
    // Without storage the size holds until the page is reloaded.
  }
}
