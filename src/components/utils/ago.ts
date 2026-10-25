/**
 * ─ Ago ─
 *
 * How long ago something happened, as a person would say it beside an event:
 * "now", "12 seconds ago", "5 minutes ago", "yesterday". Archipelago sends no times, so
 * the moment is the tracker's own stamp, and an event from before the tracker
 * was watching has none: that one happened "earlier". Pure, with the clock
 * handed in.
 */

/** How long ago a moment was: not known, now, or a count of the one unit a person would say it in. */
export type Elapsed =
  | { readonly kind: "unknown" }
  | { readonly kind: "now" }
  | {
      readonly kind: "past";
      readonly count: number;
      readonly unit: "second" | "minute" | "hour" | "day";
    };

// Under a second reads as now, and the seconds count up to a minute, whole
// seconds gone. From a minute, the count rounds to the nearest whole unit, and
// a unit gives way to the next once it would round to a whole one of those:
// 59.5 minutes is an hour, 23.5 hours is a day.

// "auto" says "yesterday" rather than "1 day ago".
const SAYING = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });

/** How long before `now` the moment `at` was, both in milliseconds since the epoch. A moment ahead of `now` is now. */
export function elapsed(at: number | undefined, now: number): Elapsed {
  if (at === undefined) {
    return { kind: "unknown" };
  }
  const seconds = (now - at) / 1000;
  if (seconds < 1) {
    return { kind: "now" };
  }
  if (seconds < 60) {
    return { kind: "past", count: Math.floor(seconds), unit: "second" };
  }
  const minutes = Math.max(1, Math.round(seconds / 60));
  if (minutes < 60) {
    return { kind: "past", count: minutes, unit: "minute" };
  }
  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return { kind: "past", count: hours, unit: "hour" };
  }
  return { kind: "past", count: Math.round(hours / 24), unit: "day" };
}

/** `at` as said at `now`: "now", "12 seconds ago", "5 minutes ago", "yesterday", or "earlier" when it has no time. */
export function ago(at: number | undefined, now: number): string {
  const since = elapsed(at, now);
  switch (since.kind) {
    case "unknown":
      return "earlier";
    case "now":
      return SAYING.format(0, "second");
    case "past":
      return SAYING.format(-since.count, since.unit);
  }
}
