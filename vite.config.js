import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        videos: resolve(__dirname, "videos.html"),
        gallery: resolve(__dirname, "gallery.html"),
        about: resolve(__dirname, "about.html")
      }
    }
  }
});
