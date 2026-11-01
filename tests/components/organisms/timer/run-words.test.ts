import { describe, expect, test } from "bun:test";
import { clockFace, typedTime } from "../../../../src/components/organisms/timer/run-words.js";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

describe("clockFace", () => {
  test("starts at bare seconds", () => {
    expect(clockFace(0)).toEqual({ whole: "0", hundredths: ".00" });
  });

  test("shows minutes once there are any", () => {
    expect(clockFace(8 * MINUTE + 5 * SECOND + 200)).toEqual({ whole: "8:05", hundredths: ".20" });
  });

  test("shows hours once there are any, with its minutes in two figures", () => {
    expect(clockFace(HOUR + 8 * MINUTE + 5 * SECOND)).toEqual({
      whole: "1:08:05",
      hundredths: ".00",
    });
  });

  test("runs past a day in hours", () => {
    expect(clockFace(30 * HOUR).whole).toBe("30:00:00");
  });

  test("drops what's under a hundredth rather than rounding up", () => {
    expect(clockFace(999).hundredths).toBe(".99");
  });
});

describe("typedTime", () => {
  test("takes nothing typed as no time", () => {
    expect(typedTime("  ")).toBe(0);
  });

  test("reads seconds, minutes and hours", () => {
    expect(typedTime("90")).toBe(90 * SECOND);
    expect(typedTime("1:30")).toBe(90 * SECOND);
    expect(typedTime("1:02:03")).toBe(HOUR + 2 * MINUTE + 3 * SECOND);
  });

  test("reads hundredths", () => {
    expect(typedTime("1:30.25")).toBe(90 * SECOND + 250);
  });

  test("leaves what can't be read", () => {
    expect(typedTime("soon")).toBeUndefined();
    expect(typedTime("1:2:3:4")).toBeUndefined();
    expect(typedTime("-5")).toBeUndefined();
  });
});
