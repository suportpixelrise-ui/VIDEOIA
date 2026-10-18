import { interpolate, useCurrentFrame } from "remotion";
import plan from "../narration-plan.json";
import { BLUE, ease, Mark, SceneShell } from "../design";
export const Closing = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell duration={plan.sceneDurations[4]}>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 420,
          fontSize: 99,
          fontWeight: 650,
          lineHeight: 1.05,
          letterSpacing: -3,
          opacity: interpolate(f, [0, 16], [0, 1], ease),
          translate: `0 ${interpolate(f, [0, 26], [70, 0], ease)}px`,
        }}
      >
        O FUTURO
        <br />
        JÁ <span style={{ color: BLUE }}>COMEÇOU.</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 330,
          top: 800,
          width: 420,
          height: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          scale: interpolate(f, [9, 40], [0.5, 1], ease),
          opacity: interpolate(f, [9, 28], [0, 1], ease),
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid #008cff66",
            borderRadius: 80,
            transform: `rotate(${45 + f * 0.04}deg)`,
            background: "linear-gradient(140deg, #008cff15, transparent)",
            boxShadow: "0 0 100px #008cff1a, inset 0 0 60px #008cff10",
          }}
        />
        <Mark size={220} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1310,
          left: 100,
          right: 140,
          textAlign: "center",
          fontSize: 68,
          fontWeight: 600,
          letterSpacing: 3,
          opacity: interpolate(f, [25, 45], [0, 1], ease),
        }}
      >
        FUTURO <span style={{ color: BLUE }}>PRÁTICO</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1405,
          left: 100,
          right: 140,
          textAlign: "center",
          fontSize: 33,
          color: "#c8d6e9",
          letterSpacing: 2,
          opacity: interpolate(f, [35, 55], [0, 1], ease),
        }}
      >
        INTELIGÊNCIA ARTIFICIAL. VIDA REAL.
      </div>
      <div
        style={{
          position: "absolute",
          top: 1475,
          left: 100,
          right: 140,
          fontSize: 44,
          fontWeight: 550,
          textAlign: "center",
          color: "white",
          opacity: interpolate(
            f,
            [plan.closingQuestionFrame - 5, plan.closingQuestionFrame + 8],
            [0, 1],
            ease,
          ),
          translate: `0 ${interpolate(f, [plan.closingQuestionFrame - 5, plan.closingQuestionFrame + 12], [20, 0], ease)}px`,
        }}
      >
        E você, vai ficar de fora?
      </div>
    </SceneShell>
  );
};
