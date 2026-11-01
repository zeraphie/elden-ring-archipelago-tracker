/**
 * ─ Settings open ─
 *
 * Whether the settings panel is open, as the page holds it. The cog and the
 * panel's cross send the same event, which opens or closes it. Escape closes
 * it, and so does a click anywhere else, as the players list closes, but for
 * the grip beside the panel, which still drags while it's open.
 */

import type { ReactiveController, ReactiveControllerHost } from "lit";

// What a click on leaves it open: the panel, what opens it, and the grip.
const KEEPS_OPEN = "er-settings, [data-opens-settings], er-resize-handle";

/** Whether the settings panel is open, for the page. */
export class SettingsOpen implements ReactiveController {
  isOpen = false;

  /**
   * @param host - The page, which every event reaches.
   * @param onShut - Told when the cross, the cog or Escape closes it, for the keyboard's focus to
   * go back; a click elsewhere has put the person somewhere already.
   */
  constructor(
    private readonly host: ReactiveControllerHost & HTMLElement,
    private readonly onShut: () => void
  ) {
    host.addController(this);
  }

  hostConnected(): void {
    this.host.addEventListener("er-settings", this.toggle);
    this.host.addEventListener("click", this.clicked);
    document.addEventListener("keydown", this.keyed);
  }

  hostDisconnected(): void {
    this.host.removeEventListener("er-settings", this.toggle);
    this.host.removeEventListener("click", this.clicked);
    document.removeEventListener("keydown", this.keyed);
  }

  private set(isOpen: boolean): void {
    this.isOpen = isOpen;
    this.host.requestUpdate();
  }

  private readonly toggle = (): void => {
    this.set(!this.isOpen);
    if (!this.isOpen) {
      this.onShut();
    }
  };

  private readonly clicked = (event: Event): void => {
    const keeps = event
      .composedPath()
      .some((target) => target instanceof Element && target.matches(KEEPS_OPEN));
    if (this.isOpen && !keeps) {
      this.set(false);
    }
  };

  private readonly keyed = (event: KeyboardEvent): void => {
    if (this.isOpen && event.key === "Escape") {
      this.set(false);
      this.onShut();
    }
  };
}
