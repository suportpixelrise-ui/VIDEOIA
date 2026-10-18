import { Composition, registerRoot } from "remotion";
import { ProductionEpisode } from "./compositions/Episode";
import template from "../../docs/futuro-pratico/templates/episode.json";
import presets from "../../config/futuro-pratico/presets.json";
import { makeTimeline } from "./motion/timeline.mjs";
import type { EpisodeView } from "./schemas/types";
const Root = () => (
  <Composition
    id="FPEpisode"
    component={ProductionEpisode}
    width={720}
    height={1280}
    fps={24}
    durationInFrames={240}
    defaultProps={{ episode: template as EpisodeView, cues: [] }}
    calculateMetadata={({ props }) => {
      const p = presets[props.episode.preset as keyof typeof presets];
      if (!p) throw new Error("Unknown preset");
      return {
        ...p,
        durationInFrames: makeTimeline(props.episode.scenes, p.fps)
          .durationInFrames,
      };
    }}
  />
);
registerRoot(Root);
