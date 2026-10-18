// Preserve every existing deliverable; no setup or audio generation during render.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");
const root = path.resolve(__dirname, "..");
const plan = require("../src/teste02/plan.json");
const snapshots = require("../docs/teste-02/previous-videos-sha256.json");
const hash = (p) =>
  crypto
    .createHash("sha256")
    .update(fs.readFileSync(path.join(root, p)))
    .digest("hex");
for (const [p, h] of Object.entries(snapshots))
  if (hash(p) !== h) throw new Error("Versão anterior mudou: " + p);
if (
  plan.status !== "ready" ||
  !fs.existsSync(path.join(root, "public/teste-02/mix-final.wav"))
)
  throw new Error("Narração/mixagem ainda não está pronta.");
const target = "out/futuro-pratico-teste-02.mp4";
if (fs.existsSync(path.join(root, target)))
  throw new Error(
    "O Teste02 já existe. Preserve-o antes de uma nova exportação.",
  );
const result = spawnSync(
  path.join(root, "node_modules/.bin/remotion"),
  [
    "render",
    "src/index.ts",
    "FuturoPraticoTeste02",
    target,
    "--codec=h264",
    "--audio-codec=aac",
    "--color-space=bt709",
    "--concurrency=3",
  ],
  { cwd: root, stdio: "inherit" },
);
for (const [p, h] of Object.entries(snapshots))
  if (hash(p) !== h)
    throw new Error("Versão anterior mudou durante o render: " + p);
process.exit(result.status ?? 1);
