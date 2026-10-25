import type { ReactiveController, ReactiveControllerHost } from "lit";

/**
 * Whether a media query matches, for a Lit element: `matches`, kept current, and the element updated when it changes, while it's connected.
 */
export class MediaController implements ReactiveController {
  matches = false;
  private list: MediaQueryList | undefined;

  constructor(
    private readonly host: ReactiveControllerHost,
    private readonly query: string
  ) {
    host.addController(this);
  }

  hostConnected(): void {
    this.list = matchMedia(this.query);
    this.matches = this.list.matches;
    this.list.addEventListener("change", this.change);
  }

  hostDisconnected(): void {
    this.list?.removeEventListener("change", this.change);
    this.list = undefined;
  }

  private readonly change = (event: MediaQueryListEvent): void => {
    this.matches = event.matches;
    this.host.requestUpdate();
  };
}
