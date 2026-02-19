import { ChemicalServer } from "chemicaljs";
import express from "express";

const [app, listen] = new ChemicalServer({
  default: "uv",
  uv: true,
  rh: true,
  scramjet: true,
  bypassDownloads: true,
  downloadMimeTypes: [
    "application/octet-stream",
    "application/zip",
    "application/x-zip-compressed",
    "application/pdf",
    "application/x-msdownload",
    "application/x-apple-diskimage",
  ],
});

const port = process.env.PORT || 3000;

// Serve Chemical files FIRST so they're not intercepted by static middleware
app.serveChemical();

app.use(express.static("public", {
  index: "index.html", 
  extensions: ["html"]
}));

listen(port, () => {
  console.log(`LoveHeart listening on port ${port}`);
});