// Never overwrite the approved original. Render only after real speech is ready.
const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { createHash } = require("node:crypto");
const root = path.resolve(__dirname, "..");
const plan = require("../src/narration-plan.json");
if (
  plan.status !== "ready" ||
  !fs.existsSync(path.join(root, "public/narracao/futuro-pratico-mix-v2.wav"))
) {
  console.error(
    "Narração ainda não foi gerada. Execute scripts/generate_narration.py com acesso ao Edge TTS antes do render final.",
  );
  process.exit(1);
}
const original = path.join(root, "out/futuro-pratico-instagram.mp4");
const hash = () =>
  fs.existsSync(original)
    ? createHash("sha256").update(fs.readFileSync(original)).digest("hex")
    : null;
const before = hash();
const result = spawnSync(
  path.join(root, "node_modules/.bin/remotion"),
  [
    "render",
    "src/index.ts",
    "FuturoPratico",
    "out/futuro-pratico-v2-narrado.mp4",
    "--codec=h264",
    "--audio-codec=aac",
    "--color-space=bt709",
  ],
  { cwd: root, stdio: "inherit" },
);
if (hash() !== before)
  throw new Error("O MP4 original sofreu alteração inesperada.");
process.exit(result.status ?? 1);
