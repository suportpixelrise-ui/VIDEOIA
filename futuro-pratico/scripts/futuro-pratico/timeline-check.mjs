import { readFileSync } from "node:fs";
import {
  makeTimeline,
  captionErrors,
} from "../../src/futuro-pratico/motion/timeline.mjs";
const input = JSON.parse(readFileSync(0, "utf8"));
const timeline = makeTimeline(input.scenes, input.fps);
const errors = captionErrors(
  input.cues ?? [],
  input.audio.durationSeconds,
  timeline.durationInFrames / input.fps,
);
if (errors.length) throw new Error(errors.join("\n"));
console.log(JSON.stringify(timeline));
