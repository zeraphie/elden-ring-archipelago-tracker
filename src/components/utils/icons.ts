/**
 * ─ Icons ─
 *
 * The game's icons by name: each is a file in src/icons, sorted into a folder
 * by its kind, and named as the domain data names it, without ".png", so the
 * data never says which folder. Vite gives each file a URL of its own,
 * hashed, so a browser keeps it until the picture changes.
 */

const URLS = import.meta.glob<string>("../../icons/**/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

// Each icon's URL by its file's name, whichever folder it's in.
const BY_NAME: ReadonlyMap<string, string> = new Map(
  Object.entries(URLS).map(([path, url]) => [
    path.slice(path.lastIndexOf("/") + 1, -".png".length),
    url,
  ])
);

/** An icon's URL by its name, such as "sack"; undefined when there's no icon by that name. */
export function iconUrl(name: string | undefined): string | undefined {
  return name === undefined ? undefined : BY_NAME.get(name);
}
