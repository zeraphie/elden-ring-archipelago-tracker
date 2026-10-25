import { describe, expect, test } from "bun:test";
import type { ReactiveController, ReactiveControllerHost } from "lit";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/vanilla/shallow";
import { createStore } from "zustand/vanilla";
import { StoreController } from "../../../src/components/utils/store-controller.js";

// A host in an element's place: it keeps its controllers and counts the updates asked of it.
class TestHost implements ReactiveControllerHost {
  readonly controllers: ReactiveController[] = [];
  updates = 0;
  readonly updateComplete = Promise.resolve(true);

  addController(controller: ReactiveController): void {
    this.controllers.push(controller);
  }

  removeController(): void {}

  requestUpdate(): void {
    this.updates += 1;
  }
}

const counts = () =>
  createStore<{ a: number; b: number; list: number[] }>()(
    subscribeWithSelector(() => ({ a: 1, b: 1, list: [1] }))
  );

describe("StoreController", () => {
  test("holds the selected part from the start, and adds itself to its host", () => {
    const host = new TestHost();
    const controller = new StoreController(host, counts(), (state) => state.a);
    expect(controller.value).toBe(1);
    expect(host.controllers).toEqual([controller]);
  });

  test("while connected, a change to the selected part updates the host, and a change elsewhere doesn't", () => {
    const host = new TestHost();
    const store = counts();
    const controller = new StoreController(host, store, (state) => state.a);
    controller.hostConnected();
    store.setState({ b: 2 });
    expect(host.updates).toBe(0);
    store.setState({ a: 2 });
    expect(host.updates).toBe(1);
    expect(controller.value).toBe(2);
  });

  test("with shallow equality, a copy of the same list isn't a change", () => {
    const host = new TestHost();
    const store = counts();
    const controller = new StoreController(host, store, (state) => state.list, shallow);
    controller.hostConnected();
    store.setState({ list: [1] });
    expect(host.updates).toBe(0);
    store.setState({ list: [1, 2] });
    expect(host.updates).toBe(1);
  });

  test("once disconnected, changes no longer update the host", () => {
    const host = new TestHost();
    const store = counts();
    const controller = new StoreController(host, store, (state) => state.a);
    controller.hostConnected();
    controller.hostDisconnected();
    store.setState({ a: 5 });
    expect(host.updates).toBe(0);
  });
});
