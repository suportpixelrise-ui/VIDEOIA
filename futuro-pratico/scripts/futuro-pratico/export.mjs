// Only invoked by an explicit future export request. No automatic recompression.
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const [episodeFile, presetName, destination] = process.argv.slice(2);
if (!episodeFile || !presetName || !destination)
  throw new Error(
    "Usage: npm run fp:export -- episodes/ID/episode.json PRESET NEW.mp4",
  );
const gate = spawnSync(
  "python3",
  ["scripts/futuro-pratico/pipeline.py", "gate", resolve(episodeFile)],
  { cwd: root, encoding: "utf8" },
);
if (gate.status !== 0) throw new Error(gate.stderr || "Gate failed");
const { episode, timeline, inputHash } = JSON.parse(gate.stdout);
if (episode.preset !== presetName)
  throw new Error("Preset must match episode; changing it invalidates QA");
const presets = JSON.parse(
  readFileSync(resolve(root, "config/futuro-pratico/presets.json"), "utf8"),
);
const p = presets[presetName];
const output = resolve(destination);
if (existsSync(output)) throw new Error("Refusing to overwrite output");
const seconds = timeline.durationInFrames / p.fps;
const videoKbps = episode.maxSizeMB
  ? Math.floor((episode.maxSizeMB * 8000 * 0.94) / seconds - p.audioKbps)
  : null;
if (videoKbps !== null && videoKbps < 100)
  throw new Error(
    "Size budget conflicts with readable video; human decision required",
  );
mkdirSync(resolve(root, ".fp-local"), { recursive: true });
const propsPath = resolve(
  root,
  ".fp-local",
  `${episode.id}-v${episode.version}-${inputHash}.json`,
);
const cues = JSON.parse(
  readFileSync(resolve(root, "public", episode.captions.file), "utf8"),
);
writeFileSync(propsPath, JSON.stringify({ episode, cues }));
mkdirSync(dirname(output), { recursive: true });
const args = [
  "node_modules/@remotion/cli/remotion-cli.js",
  "render",
  "src/futuro-pratico/episode-entry.tsx",
  "FPEpisode",
  output,
  "--props",
  propsPath,
  "--codec",
  "h264",
  "--audio-codec",
  "aac",
  "--audio-bitrate",
  `${p.audioKbps}k`,
  "--overwrite=false",
  "--browser-executable",
  process.env.REMOTION_BROWSER_EXECUTABLE || "/usr/bin/chromium",
];
args.push(
  ...(videoKbps === null
    ? ["--crf", String(p.crf)]
    : ["--video-bitrate", `${videoKbps}k`]),
);
const render = spawnSync(process.execPath, args, {
  cwd: root,
  stdio: "inherit",
});
if (render.status !== 0) process.exit(render.status || 1);
const probe = spawnSync(
  "ffprobe",
  ["-v", "error", "-show_streams", "-show_format", "-of", "json", output],
  { encoding: "utf8" },
);
if (probe.status !== 0) throw new Error("Final probe failed");
const measured = JSON.parse(probe.stdout);
const video = measured.streams.find((s) => s.codec_type === "video");
const audio = measured.streams.find((s) => s.codec_type === "audio");
const passed =
  video?.width === p.width &&
  video?.height === p.height &&
  video?.codec_name === "h264" &&
  video?.r_frame_rate === `${p.fps}/1` &&
  Math.abs(Number(video.duration) - seconds) < 1 / p.fps &&
  audio?.codec_name === "aac" &&
  (!episode.maxSizeMB ||
    Number(measured.format.size) <= episode.maxSizeMB * 1e6);
writeFileSync(
  output + ".qa.json",
  JSON.stringify(
    { inputHash, passed, measured, recompressionAttempts: 0 },
    null,
    2,
  ),
);
if (!passed)
  throw new Error(
    "Export measurements fail constraints; report saved. No automatic retry.",
  );
console.log(`Exported and measured: ${output}`);
