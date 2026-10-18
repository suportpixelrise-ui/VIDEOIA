import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { Backdrop, BLUE, linear, Mark } from "./design";
import { Opening } from "./scenes/Opening";
import { Websites } from "./scenes/Websites";
import { Automation } from "./scenes/Automation";
import { Content } from "./scenes/Content";
import { Closing } from "./scenes/Closing";
import plan from "./narration-plan.json";

export const FuturoPratico = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ends = plan.sceneDurations.reduce<number[]>(
    (values, d) => [...values, (values[values.length - 1] ?? 0) + d],
    [],
  );
  const scene = Math.min(
    4,
    ends.findIndex((end) => f < end),
  );
  const cut = scene === 0 ? 0 : ends[scene - 1];
  return (
    <AbsoluteFill
      style={{
        background: "#080B14",
        fontFamily: "Outfit, sans-serif",
        color: "white",
      }}
    >
      <Backdrop />
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          top: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Mark size={47} />
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: 2 }}>
            FUTURO PRÁTICO
          </span>
        </div>
        <span style={{ fontSize: 26, letterSpacing: 2, color: "#b9cbe0" }}>
          IDEIAS → AÇÃO
        </span>
      </div>
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Você ainda não usa IA?"
          durationInFrames={plan.sceneDurations[0]}
          premountFor={fps}
        >
          <Opening />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="1. Criar sites"
          durationInFrames={plan.sceneDurations[1]}
          premountFor={fps}
        >
          <Websites />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="2. Automatizar tarefas"
          durationInFrames={plan.sceneDurations[2]}
          premountFor={fps}
        >
          <Automation />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="3. Criar conteúdos"
          durationInFrames={plan.sceneDurations[3]}
          premountFor={fps}
        >
          <Content />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="O futuro já começou"
          durationInFrames={plan.sceneDurations[4]}
          premountFor={fps}
        >
          <Closing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          top: 1670,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {[0, 1, 2, 3, 4].map((n) => (
          <div
            key={n}
            style={{
              height: 3,
              flex: 1,
              background: "#223047",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: BLUE,
                width:
                  n < scene
                    ? "100%"
                    : n > scene
                      ? "0%"
                      : `${interpolate(f, [cut, ends[scene]], [0, 100], linear)}%`,
              }}
            />
          </div>
        ))}
        <span
          style={{
            fontSize: 20,
            color: "#839bb9",
            marginLeft: 16,
            letterSpacing: 3,
          }}
        >
          0{scene + 1}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: -300,
          top: interpolate(f - cut, [0, 16], [-500, 2200], linear),
          width: 1700,
          height: 110,
          background: "linear-gradient(transparent, #008cff15, transparent)",
          rotate: "-20deg",
          opacity:
            scene === 0
              ? 0
              : interpolate(f - cut, [0, 8, 16], [0, 1, 0], linear),
          pointerEvents: "none",
        }}
      />
      {plan.status === "ready" ? (
        <Audio
          name="Narração + trilha original com ducking"
          src={staticFile("narracao/futuro-pratico-mix-v2.wav")}
          premountFor={fps}
          volume={1}
        />
      ) : (
        <Audio
          name="Prévia instrumental • narração pendente"
          src={staticFile("futuro-original.wav")}
          premountFor={fps}
          loop
          volume={0.2}
        />
      )}
    </AbsoluteFill>
  );
};
