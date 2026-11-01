/**
 * ─ Run words ─
 *
 * How the run's time is written and read: as a stopwatch writes it, with
 * nothing before the first figure it needs, and as a person types it in.
 */

/** A run's time on the large timer: the whole seconds, and the hundredths, which show smaller. */
export interface ClockFace {
  readonly whole: string;
  readonly hundredths: string;
}

const twoFigures = (value: number): string => String(value).padStart(2, "0");

// A time in milliseconds in whole hours, minutes and seconds.
function timeParts(ms: number) {
  const allSeconds = Math.floor(ms / 1000);
  return {
    hours: Math.floor(allSeconds / 3600),
    minutes: Math.floor(allSeconds / 60) % 60,
    seconds: allSeconds % 60,
  };
}

/** A time in milliseconds as the large timer shows it: "0", "8:05" or "1:08:05", then ".20". */
export function clockFace(ms: number): ClockFace {
  const { hours, minutes, seconds } = timeParts(ms);
  const whole =
    hours > 0
      ? `${hours}:${twoFigures(minutes)}:${twoFigures(seconds)}`
      : minutes > 0
        ? `${minutes}:${twoFigures(seconds)}`
        : String(seconds);
  return { whole, hundredths: `.${twoFigures(Math.floor(ms / 10) % 100)}` };
}

/** A time in milliseconds as a row shows it, to the second: "0:06", "8:05" or "1:08:05". */
export function splitTime(ms: number): string {
  const { hours, minutes, seconds } = timeParts(ms);
  return hours > 0
    ? `${hours}:${twoFigures(minutes)}:${twoFigures(seconds)}`
    : `${minutes}:${twoFigures(seconds)}`;
}

/**
 * A typed time in milliseconds: "90", "1:30" or "1:02:03", each with hundredths
 * if they're given. Nothing typed is no time at all; undefined when it can't be read.
 */
export function typedTime(text: string): number | undefined {
  const typed = text.trim();
  if (typed === "") {
    return 0;
  }
  if (!/^\d+(?::\d+){0,2}(?:\.\d+)?$/.test(typed)) {
    return undefined;
  }
  const seconds = typed.split(":").reduce((all, part) => all * 60 + Number(part), 0);
  return Math.round(seconds * 1000);
}
