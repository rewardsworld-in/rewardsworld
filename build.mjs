// Bakes the current content.json into index.html as the safe fallback (so the site works even if content.json is broken).
// Optional: the site already reads content.json live; run this only to refresh the fallback copy.
import { readFileSync, writeFileSync } from "node:fs";
await import("./site.js");
const c = JSON.parse(readFileSync("content.json", "utf8"));
const tpl = readFileSync("template.html", "utf8");
const baked = JSON.stringify(c).replace(/</g, "\\u003c");
const title = c.meta.title.replace(/&/g, "&amp;");
const out = tpl
  .replace("<!--APP-->", globalThis.RW.render(c))
  .replace("<!--DATA-->", '<script type="application/json" id="rw-baked">' + baked + "</script>")
  .replace(/<title>.*?<\/title>/, "<title>" + title + "</title>")
  .replace(/(<meta name="description" content=")[^"]*"/, '$1' + c.meta.description.replace(/"/g, "&quot;") + '"');
writeFileSync("index.html", out);
console.log("index.html updated");
