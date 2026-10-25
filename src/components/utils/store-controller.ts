import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { Mutate, StoreApi } from "zustand/vanilla";

/** A store made with zustand's subscribeWithSelector, so a part of it can be subscribed to on its own. */
export type SelectableStore<State> = Mutate<
  StoreApi<State>,
  [["zustand/subscribeWithSelector", never]]
>;

/**
 * Reads part of a store into a Lit element: `value` is the part selected, and
 * the element updates whenever zustand finds it changed, while the element is
 * connected. A part that's a new list or object each time wants `shallow`,
 * from `zustand/vanilla/shallow`, as its equality, so a copy the same as
 * before isn't a change.
 */
export class StoreController<State, Selected> implements ReactiveController {
  value: Selected;
  private unsubscribe: (() => void) | undefined;

  constructor(
    private readonly host: ReactiveControllerHost,
    private readonly store: SelectableStore<State>,
    private readonly select: (state: State) => Selected,
    private readonly isEqual: (a: Selected, b: Selected) => boolean = Object.is
  ) {
    this.value = select(store.getState());
    host.addController(this);
  }

  hostConnected(): void {
    this.value = this.select(this.store.getState());
    this.unsubscribe = this.store.subscribe(
      this.select,
      (value) => {
        this.value = value;
        this.host.requestUpdate();
      },
      { equalityFn: this.isEqual }
    );
  }

  hostDisconnected(): void {
    this.unsubscribe?.();
    this.unsubscribe = undefined;
  }
}
