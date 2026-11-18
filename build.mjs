// Bakes the current content.json into index.html as the safe fallback (so the site works even if content.json is broken).
// Optional: the site already reads content.json live; run this only to refresh the fallback copy.
import { readFileSync, writeFileSync } from "node:fs";
await import("./site.js");
const c = JSON.parse(readFileSync("content.json", "utf8"));
const tpl = readFileSync("template.html", "utf8");
writeFileSync("index.html", tpl.replace("<!--APP-->", globalThis.RW.render(c)));
console.log("index.html updated");
