import { afterEach, describe, expect, test } from "bun:test";
import { deviceStorage } from "../../src/storage/device.js";

const real = globalThis.localStorage;

// Stands in a localStorage that refuses every call, as a private window can.
function refuse(): void {
  const refused = (): never => {
    throw new Error("refused");
  };
  globalThis.localStorage = {
    getItem: refused,
    setItem: refused,
    removeItem: refused,
  } as unknown as Storage;
}

describe("device storage", () => {
  afterEach(() => {
    globalThis.localStorage = real;
  });

  test("a refused read reads as nothing kept", () => {
    refuse();
    expect(deviceStorage.getItem("anything")).toBeNull();
  });

  test("a refused write and removal are let go", () => {
    refuse();
    expect(() => deviceStorage.setItem("anything", "value")).not.toThrow();
    expect(() => deviceStorage.removeItem("anything")).not.toThrow();
  });
});
