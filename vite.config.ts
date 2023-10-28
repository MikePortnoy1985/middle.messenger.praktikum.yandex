import { defineConfig } from "vite";
import handlebars from "./vite-plugin-handlebars-precompile";
import * as path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
  },
  plugins: [handlebars()],
});
