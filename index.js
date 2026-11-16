// Wrong Chat — AUTO LOADER (v2)
// किसी भी नाम की server फ़ाइल चलेगी: server36.js / server37.js / "server35 (1).js"
// नियम: सबसे नई version वाली फ़ाइल चलेगी; version बराबर हो तो बड़ा नंबर (server37 > server36)
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const d = fileURLToPath(new URL(".", import.meta.url));

const files = readdirSync(d)
  .filter((n) => /^server[\d\s().]+\.js$/i.test(n))
  .map((n) => {
    const head = readFileSync(d + n, "utf8").slice(0, 3000);
    const m = head.match(/v?(\d+)\.(\d+)\.(\d+)/);
    const fileNo = Number((n.match(/server\s*(\d+)/i) || [])[1] || 0);
    return { n, v: m ? [m[1], m[2], m[3]].join(".") : "0.0.0", fileNo };
  })
  .sort((a, b) => b.v.localeCompare(a.v, undefined, { numeric: true }) || b.fileNo - a.fileNo);

if (!files.length) {
  console.error("[boot] कोई server फ़ाइल नहीं मिली (server36.js जैसी फ़ाइल चाहिए)");
  process.exit(1);
}

console.log("[boot] found:", files.map((f) => `${f.n} (v${f.v})`).join(" | "));
console.log("[boot] loading →", files[0].n);
await import("./" + files[0].n);
