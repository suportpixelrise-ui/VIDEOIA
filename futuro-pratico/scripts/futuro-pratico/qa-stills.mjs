import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const destination = resolve(
  process.argv[2] || resolve(root, "out/fp-qa/catalog"),
);
if (existsSync(destination))
  throw new Error("Use a new destination to preserve prior QA");
mkdirSync(destination, { recursive: true });
for (const [i, frame] of [36, 108, 180, 252, 324].entries()) {
  const result = spawnSync(
    process.execPath,
    [
      "node_modules/@remotion/cli/remotion-cli.js",
      "still",
      "src/index.ts",
      "FPCatalogoTecnico",
      resolve(destination, `${i + 1}.png`),
      "--frame",
      String(frame),
      "--browser-executable",
      process.env.REMOTION_BROWSER_EXECUTABLE || "/usr/bin/chromium",
    ],
    { cwd: root, stdio: "inherit" },
  );
  if (result.status !== 0) process.exit(result.status || 1);
}
