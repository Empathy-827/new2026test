const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

app.use(express.static(PUBLIC_DIR, {
  extensions: ["html"]
}));

app.get("/", (_, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.get("/videos", (_, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "videos.html"));
});

app.get("/gallery", (_, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "gallery.html"));
});

app.get("/about", (_, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "about.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
