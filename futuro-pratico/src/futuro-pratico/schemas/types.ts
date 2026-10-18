import type { Character, Pose } from "../components/Assets";
import type { LayoutKind } from "../layouts";
import type { Cue, SceneTiming } from "../motion/timeline.mjs";
export type ProductionScene = SceneTiming & {
  layout: LayoutKind;
  title: string;
  screenText: string;
  character: Character | "both" | "none";
  pose: Pose;
  backgroundId: string;
  objectId: string;
  evidence: "fact" | "inference" | "fiction";
};
export type EpisodeView = {
  id: string;
  fps: number;
  preset: string;
  scenes: ProductionScene[];
  audio: { file: string };
};
export type EpisodeProps = { episode: EpisodeView; cues: Cue[] };
