import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/fonts";
import {
  CharacterSprite,
  SceneBackground,
  TechObject,
} from "../components/Assets";
import { Caption, Title } from "../components/Editorial";
import { InfoCard } from "../components/Interfaces";
import { EditorialLayout } from "../layouts";
import { Motion } from "../motion";
import { makeTimeline } from "../motion/timeline.mjs";
import { colors, typography } from "../theme";
import type { EpisodeProps } from "../schemas/types";
loadFont({
  family: "Outfit",
  url: staticFile("fonts/Outfit.ttf"),
  weight: "100 900",
});
export const ProductionEpisode = ({ episode, cues }: EpisodeProps) => {
  const { fps } = useVideoConfig();
  const t = makeTimeline(episode.scenes, fps);
  return (
    <AbsoluteFill
      style={{
        fontFamily: typography.family,
        color: colors.white,
        background: colors.black,
      }}
    >
      {t.items.map((s) => (
        <Sequence
          key={s.id}
          from={s.from}
          durationInFrames={s.durationInFrames}
          premountFor={fps}
        >
          <Motion enterSeconds={0.3} exitSeconds={s.transitionSeconds || 0.15}>
            <SceneBackground id={s.backgroundId} />
            <EditorialLayout kind={s.layout}>
              <Title
                kicker={
                  s.evidence === "fiction"
                    ? "EXEMPLO FICTÍCIO"
                    : "FUTURO PRÁTICO"
                }
              >
                {s.title}
              </Title>
              <div style={{ position: "absolute", top: 330, width: 828 }}>
                <InfoCard
                  title={s.layout === "reveal" ? "A descoberta" : "Em cena"}
                  text={s.screenText}
                />
              </div>
              {s.character !== "none" && s.character !== "both" && (
                <CharacterSprite
                  character={s.character}
                  pose={s.pose}
                  x={s.layout === "object" ? 20 : 150}
                  y={690}
                  height={620}
                />
              )}
              {s.character === "both" && (
                <>
                  <CharacterSprite
                    character="personagem_1"
                    pose={s.pose}
                    x={10}
                    y={690}
                    height={620}
                  />
                  <CharacterSprite
                    character="personagem_2"
                    pose={s.pose}
                    x={400}
                    y={690}
                    height={620}
                  />
                </>
              )}
              {s.objectId && (
                <TechObject
                  id={s.objectId}
                  style={{
                    position: "absolute",
                    left: s.layout === "object" ? 400 : 500,
                    top: 800,
                    width: 350,
                    height: 350,
                  }}
                />
              )}
            </EditorialLayout>
          </Motion>
        </Sequence>
      ))}
      {episode.audio.file && (
        <Audio src={staticFile(episode.audio.file)} premountFor={fps} />
      )}
      <Caption cues={cues} />
    </AbsoluteFill>
  );
};
