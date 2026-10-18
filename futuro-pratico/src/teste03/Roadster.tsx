import {
  AbsoluteFill,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { Mark } from "../design";
import plan from "./plan.json";
import { RoadsterCaptions } from "./Captions";
import {
  Claim,
  Event,
  Fineprint,
  History,
  LiftOff,
  Limit,
  Mechanism,
} from "./Scenes";

export const Roadster = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = plan.chapters;
  const index = Math.max(
    0,
    c.findIndex((ch) => f >= ch.from && f < ch.from + ch.durationInFrames),
  );
  return (
    <AbsoluteFill
      style={{
        background: "#070b12",
        color: "white",
        fontFamily: "Outfit,sans-serif",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${42 + Math.sin(f / 160) * 9}% 59%,#15395499,transparent 60%),linear-gradient(120deg,#02050a,#0d1520 52%,#02060b)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 160,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: 0.6,
        }}
      >
        <Mark size={32} />
        <span style={{ fontSize: 25, fontWeight: 550, letterSpacing: 2 }}>
          FUTURO PRÁTICO
        </span>
      </div>
      {index !== 5 ? (
        <div
          style={{
            position: "absolute",
            left: 100,
            right: 140,
            top: 238,
            fontSize: 25,
            color: "#a2b7c9",
            letterSpacing: 1,
          }}
        >
          ILUSTRAÇÃO • NÃO É FILMAGEM DO EVENTO
        </div>
      ) : null}
      <Sequence
        name="O salto e a pergunta"
        durationInFrames={c[0].durationInFrames}
        premountFor={fps}
      >
        <LiftOff />
      </Sequence>
      <Sequence
        name="O evento reportado"
        from={c[1].from}
        durationInFrames={c[1].durationInFrames}
        premountFor={fps}
      >
        <Event />
      </Sequence>
      <Sequence
        name="Gás frio e ação-reação"
        from={c[2].from}
        durationInFrames={c[2].durationInFrames}
        premountFor={fps}
      >
        <Mechanism />
      </Sequence>
      <Sequence
        name="Salto versus sustentação"
        from={c[3].from}
        durationInFrames={c[3].durationInFrames}
        premountFor={fps}
      >
        <Limit />
      </Sequence>
      <Sequence
        name="Anúncio não é medição"
        from={c[4].from}
        durationInFrames={c[4].durationInFrames}
        premountFor={fps}
      >
        <Claim />
      </Sequence>
      <Sequence
        name="Arquivo real e previsão"
        from={c[5].from}
        durationInFrames={c[5].durationInFrames}
        premountFor={fps}
      >
        <History />
      </Sequence>
      <Sequence
        name="A nota que muda a história"
        from={c[6].from}
        durationInFrames={c[6].durationInFrames}
        premountFor={fps}
      >
        <Fineprint />
      </Sequence>
      <style>{`.roadster-captions div[style*="white-space"]{font-family:Outfit,sans-serif!important;font-size:50px!important;line-height:1.18!important;font-weight:500!important;background:#070b12de!important;border-radius:14px;padding:17px 24px!important;box-shadow:0 7px 25px #0007;}`}</style>
      <RoadsterCaptions />
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          top: 1690,
          height: 2,
          background: "#233d5270",
        }}
      >
        <div
          style={{
            height: 2,
            background: "#65b9f2",
            width: `${(f / (plan.durationInFrames - 1)) * 100}%`,
          }}
        />
      </div>
      <Audio
        name="AntonioNeural • mixagem original Teste03"
        src={staticFile("teste-03/mix-final.wav")}
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
