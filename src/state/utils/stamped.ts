/**
 * Something with the time the tracker saw it, in milliseconds since 1970. One
 * that came before the tracker was watching has no time, and reads "earlier";
 * leaving `at` out, rather than setting it undefined, keeps it the same once
 * it's been kept as JSON.
 */
export interface Stamped<T> {
  readonly value: T;
  readonly at?: number;
}
