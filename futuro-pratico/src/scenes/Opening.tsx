import plan from "../narration-plan.json";
import { interpolate, useCurrentFrame } from "remotion";
import { BLUE, ease, SceneShell } from "../design";
export const Opening = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell duration={plan.sceneDurations[0]}>
      <div
        style={{
          position: "absolute",
          left: 95,
          top: 340,
          width: 800,
          height: 630,
          background: "radial-gradient(ellipse, #008cff28, transparent 65%)",
          opacity: interpolate(f, [0, 12, 35], [0.35, 0.7, 0], ease),
          scale: interpolate(f, [0, 35], [0.8, 1.2], ease),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 375,
          fontSize: 102,
          fontWeight: 650,
          lineHeight: 1.06,
          letterSpacing: -3,
          translate: `0 ${interpolate(f, [0, 18], [48, 0], ease)}px`,
          opacity: interpolate(f, [0, 10], [0.7, 1], ease),
          filter: `blur(${interpolate(f, [0, 13], [4, 0], ease)}px)`,
        }}
      >
        VOCÊ AINDA
        <br />
        NÃO USA
      </div>
      <div
        style={{
          position: "absolute",
          left: 89,
          top: 590,
          fontSize: 315,
          fontWeight: 800,
          letterSpacing: -18,
          lineHeight: 1.1,
          color: BLUE,
          textShadow: "0 0 100px #008cff45",
          scale: interpolate(f, [0, 22], [1.14, 1], ease),
          translate: `${interpolate(f, [0, 20], [60, 0], ease)}px 0`,
          opacity: interpolate(f, [0, 9], [0.65, 1], ease),
        }}
      >
        IA<span style={{ color: "white" }}>?</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 1020,
          width: 480,
          height: 480,
          perspective: 1000,
          scale: interpolate(f, [12, 50], [0.6, 1], ease),
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: i * 38,
              border: `${i === 1 ? 3 : 1}px solid ${i === 1 ? BLUE : "#6fbfff66"}`,
              borderRadius: i === 1 ? 65 : "50%",
              transform: `rotateX(${58 + i * 12}deg) rotateY(${f * 0.5 + i * 50}deg) rotateZ(${f * 0.6 + i * 35}deg)`,
              boxShadow:
                i === 1
                  ? "0 0 50px #008cff33, inset 0 0 50px #008cff22"
                  : undefined,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            left: 160,
            top: 170,
            width: 160,
            height: 160,
            borderRadius: 35,
            background:
              "linear-gradient(140deg, #8ed5ff, #008cff 55%, #003f91)",
            transform: `rotateX(-20deg) rotateY(${f * 0.8}deg) rotateZ(-25deg)`,
            boxShadow: "0 30px 90px #008cff66, inset 2px 2px 3px #ffffff99",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 1485,
          left: 100,
          fontSize: 42,
          color: "#c8d6e9",
          opacity: interpolate(f, [30, 48], [0, 1], ease),
        }}
      >
        3 possibilidades. Um novo começo.
      </div>
    </SceneShell>
  );
};
