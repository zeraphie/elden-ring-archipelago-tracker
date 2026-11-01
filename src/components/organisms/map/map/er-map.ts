/**
 * ─ Map ─
 *
 * The open-world map as the apworld's tiles: each region its 256 m squares,
 * filled for how it stands (locked, open, or every key check done), with the
 * borders between regions, the coastline, the selected region's border in
 * gold, and a sack on each tile with key checks. Pointing at a sack enlarges
 * it and shows its checks in a tooltip. Tabs switch between the Lands
 * Between and the Realm of Shadow; a sheet the room has no tiles on gets no
 * tab. The wheel and a pinch zoom about the cursor, a left drag pans, a click
 * selects a region or a sack's region, and the buttons zoom by steps or show
 * the whole map. Under the narrow layout the map frames the selected region
 * instead, gliding to each one selected, and the last button frames it again.
 * That last button breathes once the map is left with no land in view. A right
 * drag draws a route, and so does a left one while the pen top right is on.
 */

import { LitElement, css, html, nothing, svg, type PropertyValues } from "lit";
import type { MapPin } from "../../../../data/checks/map-pins.js";
import type { Sheet } from "../../../../data/checks/map-tiles.js";
import type { EldenRingData } from "../../../../state/setup.js";
import type { TrackerState, TrackerStore } from "../../../../state/store.js";
import { regionChecksOf } from "../../../../state/utils/checks.js";
import { mapOf, type MapView } from "../../../../state/utils/map.js";
import { narrow, NARROW_MEDIA } from "../../../atoms/layout.js";
import "./er-map-legend.js";
import "../er-pin-tip.js";
import "../er-route-tools.js";
import "../er-sheet-tabs.js";
import "../er-zoom-buttons.js";
import { LostWatch } from "../camera/lost-watch.js";
import { MapCamera, type ZoomTo } from "../camera/map-camera.js";
import { pickRing, pinLayer, pinStyles } from "../pin-layer.js";
import { pinSpots } from "../pin-tip.js";
import { RoutePen, routeStyles, type RouteAction } from "../route-pen.js";
import { anyTileIn, boundsOf, edgesPath, tileCentre, tilesPath } from "../map-paths.js";
import { DRAWING_LINE, pinCount } from "../map-words.js";
import { AREA_STATE_WORDS } from "../../../utils/area-words.js";
import type { CheckPick } from "../../../utils/check-pick.js";
import { emit } from "../../../utils/emit.js";
import { MediaController } from "../../../utils/media.js";
import { SHEET_NAMES } from "../../../utils/sheet-names.js";
import { StoreController } from "../../../utils/store-controller.js";

// The simulate buttons are for a development build only, so a built page never loads them.
if (import.meta.env.DEV) {
  void import("../er-simulate.js");
}

// Screen pixels per 256 m tile: from a whole sheet in a small window to a tile filling much of the view.
const ZOOM_LIMITS = { min: 2, max: 400 };

/**
 * The map of the room's open-world regions, how each stands, and the one selected.
 *
 * @fires er-region - A region was clicked; `detail` is its code.
 * @fires er-check - A sack was clicked; `detail` is a `CheckPick`, the check it opens.
 */
export class ErMap extends LitElement {
  static override properties = {
    store: { attribute: false },
    data: { attribute: false },
    coveredLeft: { attribute: false },
    selected: { attribute: false },
    picked: { attribute: false },
    sheet: { state: true },
    pointed: { state: true },
    isLost: { state: true },
  };

  static override styles = [
    pinStyles,
    routeStyles,
    css`
      :host {
        display: block;
        position: relative;
        background: var(--er-map);
      }
      .view {
        position: absolute;
        inset: 0;
        touch-action: none;
        cursor: grab;
      }
      .view[data-dragging],
      .view[data-dragging] .region {
        cursor: grabbing;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
      }
      /* Strokes keep their width in screen pixels however the map is scaled. */
      path {
        vector-effect: non-scaling-stroke;
      }
      .region {
        stroke: var(--er-map);
        stroke-width: 0.8;
        cursor: pointer;
      }
      .region[data-state="locked"] {
        fill: var(--er-region-locked);
      }
      .region[data-state="locked"]:hover {
        fill: var(--er-region-locked-hover);
      }
      .region[data-state="open"] {
        fill: var(--er-region-open);
      }
      .region[data-state="open"]:hover {
        fill: var(--er-region-open-hover);
      }
      .region[data-state="done"] {
        fill: var(--er-region-done);
      }
      .region[data-state="done"]:hover {
        fill: var(--er-region-done-hover);
      }
      .lines {
        fill: none;
        stroke-linecap: square;
        pointer-events: none;
      }
      .edge {
        stroke: var(--er-region-edge);
        stroke-width: 1;
      }
      .coast {
        stroke: var(--er-coast);
        stroke-width: 1.5;
      }
      .selected {
        stroke: var(--er-gold);
        stroke-width: 2.5;
      }
      /* The tabs and the legend sit above the goal menu, which runs under them. */
      er-sheet-tabs {
        position: absolute;
        z-index: 2;
        top: 14px;
        left: 16px;
      }
      er-map-legend {
        position: absolute;
        z-index: 2;
        right: 240px;
        bottom: 14px;
        left: 16px;
        pointer-events: none;
      }
      /* The top right: the route tools, and in a development build the simulate buttons under them. */
      .tools {
        position: absolute;
        z-index: 3;
        top: 14px;
        right: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 12px;
      }
      /* At a tablet's width and below the controls sit closer to the edges, and the legend goes:
         the goal strip has the map's foot, and a touch points at nothing. */
      @media ${narrow} {
        er-sheet-tabs {
          top: 10px;
          left: 10px;
        }
        .tools {
          top: 10px;
          right: 10px;
        }
        er-map-legend {
          display: none;
        }
        .corner {
          right: 10px;
          bottom: 10px;
        }
      }
      /* The bottom right: the zoom buttons. */
      .corner {
        position: absolute;
        z-index: 3;
        right: 16px;
        bottom: 14px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
    `,
  ];

  /** The room's store. */
  store: TrackerStore | undefined;
  /** The Elden Ring data, loaded with the room. */
  data: EldenRingData | undefined;
  /** How much of the map's left side, in CSS pixels, something lies over, so a fit keeps the sheet clear of it. */
  coveredLeft = 0;
  private sheet: Sheet = "surface";
  /** The region selected, by its code, with its border in gold. */
  selected: string | undefined;
  /** The check picked, by id: its sack enlarged, or its tile ringed, on its sheet. */
  picked: number | undefined;
  // The pin pointed at, by its tile, and its element, for its tooltip to sit beside.
  private pointed: string | undefined;
  private pointedPin: Element | undefined;
  // The sheet's tiles, and whether the view has been left with none of them in it.
  private land: readonly (readonly [number, number])[] = [];
  private isLost = false;
  private readonly lost = new LostWatch(
    () => this.hasLand(),
    (isLost) => {
      this.isLost = isLost;
    }
  );
  // Under the narrow layout, the camera fits the region selected rather than the whole sheet, and
  // glides to each one newly selected once it's drawn.
  private readonly isNarrow = new MediaController(this, NARROW_MEDIA);
  private isFramePending = false;
  private map: StoreController<TrackerState, MapView | undefined> | undefined;
  private readonly route = new RoutePen(
    this,
    () => this.renderRoot.querySelector<SVGPathElement>(".stroke") ?? undefined
  );
  private readonly camera = new MapCamera(
    this,
    {
      view: () => this.renderRoot.querySelector<HTMLElement>(".view") ?? undefined,
      world: () => this.renderRoot.querySelector<SVGGElement>(".world") ?? undefined,
      coveredLeft: () => this.coveredLeft,
      pen: this.route,
      onPlace: () => {
        this.renderRoot.querySelector("er-pin-tip")?.follow();
        this.lost.moved();
      },
    },
    ZOOM_LIMITS
  );

  protected override willUpdate(changed: PropertyValues<this>): void {
    const { store, data } = this;
    if (store !== undefined && data !== undefined && this.map === undefined) {
      this.map = new StoreController(this, store, (state) => mapOf(data, state));
    }
    // A region selected, or a check picked, on the other sheet brings its sheet into view.
    const sheets = this.map?.value?.sheets;
    const { selected, picked } = this;
    const regionSheet = [...(sheets ?? [])].find(([, { regions }]) =>
      regions.some(({ region }) => region === selected)
    )?.[0];
    if (changed.has("selected") && regionSheet !== undefined) {
      this.sheet = regionSheet;
      this.isFramePending = true;
    }
    const where = picked === undefined ? undefined : this.map?.value?.placed.get(picked);
    if (changed.has("picked") && where !== undefined) {
      this.sheet = where.sheet;
    }
  }

  // Under the narrow layout, a region newly selected is framed, however it was picked.
  protected override updated(): void {
    if (this.isFramePending) {
      this.isFramePending = false;
      this.camera.frame();
    }
  }

  override render() {
    const map = this.map?.value;
    const { data } = this;
    if (map === undefined || data === undefined) {
      return nothing;
    }
    const sheets = SHEET_NAMES.filter(([sheet]) => map.sheets.has(sheet));
    const [sheet, name] = sheets.find(([each]) => each === this.sheet) ?? sheets[0] ?? [];
    const tiles = sheet === undefined ? undefined : map.sheets.get(sheet);
    if (sheet === undefined || tiles === undefined) {
      return nothing;
    }
    const selected = tiles.regions.find(({ region }) => region === this.selected);
    this.land = tiles.regions.flatMap((region) => region.tiles);
    this.camera.show(
      sheet,
      boundsOf(this.land),
      this.isNarrow.matches && selected !== undefined ? boundsOf(selected.tiles) : undefined
    );
    this.route.show(sheet);
    const pins = map.pins.get(sheet) ?? [];
    const pointed = pins.find(({ tile }) => tile === this.pointed);
    const { picked } = this;
    const pickedPin =
      picked === undefined ? undefined : pins.find(({ ids }) => ids.includes(picked));
    const pickedAt = picked === undefined ? undefined : map.placed.get(picked);
    return html`<div class="view" ?data-drawing=${this.route.isOn()}>
        <svg role="img" aria-label=${`Map of the ${name}`}>
          <g class="world">
            ${tiles.regions.map(({ region, tiles: squares }) => {
              const state = map.regions.get(region)?.state ?? "locked";
              return svg`<path
                class="region"
                data-state=${state}
                d=${tilesPath(squares)}
                @click=${() => this.select(region)}
              ><title>${data.regionName(region)}: ${AREA_STATE_WORDS[state]}</title></path>`;
            })}
            <g class="lines" aria-hidden="true">
              ${tiles.regions.map(
                ({ edges }) => svg`<path class="edge" d=${edgesPath(edges)}></path>`
              )}
              <path class="coast" d=${edgesPath(tiles.coast)}></path>
              ${
                selected === undefined
                  ? nothing
                  : svg`<path class="selected" d=${edgesPath(selected.edges)}></path>`
              }
            </g>
            ${
              pickedPin === undefined && pickedAt?.sheet === sheet
                ? pickRing(tileCentre(pickedAt.x, pickedAt.y))
                : nothing
            }
            ${pinLayer(pins, pickedPin, {
              onPoint: (tile, pin) => {
                if (pin !== undefined || this.pointed === tile) {
                  this.pointed = pin === undefined ? undefined : tile;
                  this.pointedPin = pin;
                }
              },
              onPick: ({ region, opens }) =>
                emit<CheckPick>(this, "er-check", { region, id: opens }),
            })}
            ${this.route.layer()}
          </g>
        </svg>
      </div>
      ${
        sheets.length < 2
          ? nothing
          : html`<er-sheet-tabs
              .sheets=${sheets}
              .shown=${sheet}
              @er-sheet=${({ detail }: CustomEvent<Sheet>) => {
                this.sheet = detail;
                this.pointed = undefined;
              }}
            ></er-sheet-tabs>`
      }
      ${pointed === undefined || this.route.isOn() ? nothing : this.tip(pointed, data)}
      <er-map-legend .readout=${this.route.isOn() ? DRAWING_LINE : undefined}></er-map-legend>
      <div class="tools">
        <er-route-tools
          .isOn=${this.route.isOn()}
          .hasLines=${this.route.hasLines()}
          @er-route=${({ detail }: CustomEvent<RouteAction>) => this.route.act(detail)}
        ></er-route-tools>
        ${
          import.meta.env.DEV
            ? html`<er-simulate
                .store=${this.store}
                .data=${data}
                .region=${this.selected}
              ></er-simulate>`
            : nothing
        }
      </div>
      <div class="corner">
        <er-zoom-buttons
          .isLost=${this.isLost}
          @er-zoom=${({ detail }: CustomEvent<ZoomTo>) => this.camera.zoom(detail)}
        ></er-zoom-buttons>
      </div>`;
  }

  // The tooltip of the pin pointed at, its checks as the panel lists them.
  private tip(pin: MapPin, data: EldenRingData) {
    const state = this.store?.getState();
    if (state === undefined) {
      return nothing;
    }
    const { key, other } = regionChecksOf(data, state, pin.region);
    const rows = [...key, ...other].filter(({ id }) => pin.ids.includes(id));
    return html`<er-pin-tip
      .spots=${pinSpots(rows)}
      .count=${pin.ids.length > 1 ? pinCount(pin.done, pin.ids.length) : undefined}
      .pin=${this.pointedPin}
      .frame=${this}
    ></er-pin-tip>`;
  }

  private select(region: string): void {
    emit<string>(this, "er-region", region);
  }

  // Land under what covers the view's left isn't in view, as the fit keeps clear of it too.
  private hasLand(): boolean {
    const seen = this.camera.seen();
    return seen === undefined || anyTileIn(this.land, seen);
  }
}

customElements.define("er-map", ErMap);

declare global {
  interface HTMLElementTagNameMap {
    "er-map": ErMap;
  }
}
