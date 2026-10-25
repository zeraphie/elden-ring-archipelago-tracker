// What the page reads from Vite's .env files as it's built.

interface ImportMetaEnv {
  /** This tracker's version, from package.json, such as "0.6.8+2": the Archipelago release it's tested against, and its own changes since. */
  readonly TRACKER_VERSION: string;
  /** A room's link that "Use the sample room" fills in, for testing locally; set in .env.development.local only. */
  readonly VITE_SAMPLE_ROOM?: string;
  /** A range in ms, such as "200-500", that each part waits once it's in, to watch them arrive; set in .env.development.local only. */
  readonly VITE_PART_DELAY_MS?: string;
}
