import { describe, expect, test } from "bun:test";
import type { StateStorage } from "zustand/middleware";
import { createSettingsStore } from "../../src/state/settings.js";

// Storage holding `kept` under the settings' name.
function storageOf(kept?: string) {
  const items = new Map(kept === undefined ? [] : [["er-settings", kept]]);
  const storage: StateStorage = {
    getItem: (name) => items.get(name) ?? null,
    setItem: (name, value) => void items.set(name, value),
    removeItem: (name) => void items.delete(name),
  };
  return { items, storage };
}

const keptAs = (checkLook: unknown): string => JSON.stringify({ state: { checkLook }, version: 0 });
const keptWith = (state: Record<string, unknown>): string => JSON.stringify({ state, version: 0 });

describe("settings", () => {
  test("a new visitor starts on compact", () => {
    expect(createSettingsStore(storageOf().storage).getState().checkLook).toBe("compact");
  });

  test("a look that was kept comes back at once", () => {
    const { storage } = storageOf(keptAs("comfort"));
    expect(createSettingsStore(storage).getState().checkLook).toBe("comfort");
  });

  test("a look chosen is kept for the next visit", () => {
    const { storage } = storageOf();
    createSettingsStore(storage).getState().setCheckLook("comfort");
    expect(createSettingsStore(storage).getState().checkLook).toBe("comfort");
  });

  test("a kept look the tracker doesn't know starts as a new visitor's does", () => {
    const { storage } = storageOf(keptAs("spacious"));
    expect(createSettingsStore(storage).getState().checkLook).toBe("compact");
  });

  test("a kept value that isn't JSON starts as a new visitor's does", () => {
    const { storage } = storageOf("not json");
    expect(createSettingsStore(storage).getState().checkLook).toBe("compact");
  });

  test("the store's actions aren't what's kept", () => {
    const { items, storage } = storageOf();
    createSettingsStore(storage).getState().setCheckLook("comfort");
    expect(Object.keys(JSON.parse(items.get("er-settings") ?? "{}").state).sort()).toEqual([
      "checkLook",
      "hasSplits",
      "isTimerOn",
      "timerLook",
    ]);
  });

  test("a new visitor has the timer off, with splits on and the comfort look", () => {
    const { isTimerOn, hasSplits, timerLook } = createSettingsStore(storageOf().storage).getState();
    expect({ isTimerOn, hasSplits, timerLook }).toEqual({
      isTimerOn: false,
      hasSplits: true,
      timerLook: "comfort",
    });
  });

  test("the timer's settings are kept for the next visit", () => {
    const { storage } = storageOf();
    const settings = createSettingsStore(storage).getState();
    settings.setTimerOn(true);
    settings.setHasSplits(false);
    settings.setTimerLook("compact");
    const { isTimerOn, hasSplits, timerLook } = createSettingsStore(storage).getState();
    expect({ isTimerOn, hasSplits, timerLook }).toEqual({
      isTimerOn: true,
      hasSplits: false,
      timerLook: "compact",
    });
  });

  test("a kept value it can't read leaves the settings it can", () => {
    const { storage } = storageOf(
      keptWith({ checkLook: "comfort", isTimerOn: "yes", hasSplits: false, timerLook: "spacious" })
    );
    const { checkLook, isTimerOn, hasSplits, timerLook } = createSettingsStore(storage).getState();
    expect({ checkLook, isTimerOn, hasSplits, timerLook }).toEqual({
      checkLook: "comfort",
      isTimerOn: false,
      hasSplits: false,
      timerLook: "comfort",
    });
  });

  test("settings kept before the timer came start its own as a new visitor's do", () => {
    const { storage } = storageOf(keptAs("comfort"));
    const { isTimerOn, hasSplits } = createSettingsStore(storage).getState();
    expect({ isTimerOn, hasSplits }).toEqual({ isTimerOn: false, hasSplits: true });
  });
});
