import { readFileSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import { version } from "./package.json";

// What the built site ships besides its own code, each with the licence that asks to travel with
// copies of it: the libraries bundled into the page, the fonts, and the apworld's data.
const SHIPPED_LICENCES: readonly (readonly [string, string])[] = [
  ["Lit", "node_modules/lit/LICENSE"],
  ["lit-html", "node_modules/lit-html/LICENSE"],
  ["lit-element", "node_modules/lit-element/LICENSE"],
  ["@lit/reactive-element", "node_modules/@lit/reactive-element/LICENSE"],
  ["zustand", "node_modules/zustand/LICENSE"],
  ["immer", "node_modules/immer/LICENSE"],
  ["EB Garamond", "src/fonts/licences/eb-garamond.txt"],
  ["Fira Code", "src/fonts/licences/fira-code.txt"],
  ["The Elden Ring apworld's data", "src/data/apworld-licence.txt"],
];

const LICENCES_HEADING = `The licences of what this site ships besides its own code.

The site's own code is under the MIT licence in LICENSE, and what that does
and doesn't cover is in NOTICE, both at
https://github.com/zeraphie/elden-ring-archipelago-tracker. The game's icons
are Elden Ring's art, copyright FromSoftware, Inc. and Bandai Namco
Entertainment Inc., shown under fair use and not licensed by this site.`;

// Gathers every shipped licence into the build's licences.txt, read from the packages installed,
// so it follows them as they update; a licence file gone missing fails the build.
function shippedLicences(): Plugin {
  return {
    name: "shipped-licences",
    apply: "build",
    generateBundle() {
      const sections = SHIPPED_LICENCES.map(([name, path]) => {
        const text = readFileSync(new URL(path, import.meta.url), "utf8").trim();
        return `${name}\n${"-".repeat(name.length)}\n\n${text}`;
      });
      this.emitFile({
        type: "asset",
        fileName: "licences.txt",
        source: `${[LICENCES_HEADING, ...sections].join("\n\n\n")}\n`,
      });
    },
  };
}

// The site is a project page under the izelya.me GitHub Pages domain, so every
// asset is served from beneath its folder.
export default defineConfig({
  base: "/elden-ring-archipelago-tracker/",
  plugins: [shippedLicences()],
  // The tracker's version, from package.json: the Archipelago release it's tested against, and
  // "+N" for its own changes since. A login says the release.
  define: { "import.meta.env.TRACKER_VERSION": JSON.stringify(version) },
  build: {
    target: "es2022",
    // The Elden Ring data is a file of its own, loaded alongside the room: the location table,
    // the rules and the bosses come to about 620 kB (95 kB compressed), with room for the key
    // spots' full names still to come. The page's own code stays well under this.
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        // Vite drops /*! notices when it minifies, and the apworld's licence asks for its
        // copyright notice in every copy of its data, the built page included.
        comments: { legal: true },
      },
    },
  },
});
