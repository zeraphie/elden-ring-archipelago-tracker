import { defineConfig } from "vite";
import { version } from "./package.json";

// The site is a project page under the izelya.me GitHub Pages domain, so every
// asset is served from beneath its folder.
export default defineConfig({
  base: "/elden-ring-archipelago-tracker/",
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
