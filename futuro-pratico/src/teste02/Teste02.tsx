import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { Backdrop, BLUE, ease, Mark } from "../design";
import plan from "./plan.json";
import { camera, chapters, packet, progress } from "./timing";
import {
  Comparison,
  Draft,
  Email,
  Extracted,
  Finale,
  ManualCopies,
  Review,
  Task,
} from "./Surfaces";
import { Teste02Captions } from "./Captions";

const Heading: React.FC<{
  eyebrow: string;
  children: React.ReactNode;
  first?: boolean;
}> = ({ eyebrow, children, first }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        right: 140,
        top: 338,
        opacity: first ? 1 : interpolate(f, [0, 11], [0.15, 1], ease),
        translate: `0 ${interpolate(f, [0, 22], [first ? 0 : 20, 0], ease)}px`,
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: 4,
          color: "#97bbdf",
          marginBottom: 17,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          fontSize: first ? 92 : 88,
          fontWeight: 650,
          lineHeight: 0.99,
          letterSpacing: -3,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Teste02 = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cam = camera(f);
  const token = packet(f);
  const index = Math.max(
    0,
    chapters.findIndex((c) => f >= c.from && f < c.from + c.durationInFrames),
  );
  const active = chapters[index];
  return (
    <AbsoluteFill
      style={{
        background: "#080B14",
        color: "white",
        fontFamily: "Outfit, sans-serif",
        overflow: "hidden",
      }}
    >
      <Backdrop />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${45 + Math.sin(f / 160) * 15}% 50%,#008cff12,transparent 55%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 164,
          left: 100,
          right: 140,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <Mark size={49} />
        <span style={{ fontSize: 31, fontWeight: 600, letterSpacing: 2 }}>
          FUTURO PRÁTICO
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 23,
            color: "#a0bbd8",
            letterSpacing: 3,
          }}
        >
          IA EM AÇÃO
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 255,
          fontSize: 24,
          color: "#93abc8",
          letterSpacing: 1.2,
        }}
      >
        DEMONSTRAÇÃO ILUSTRATIVA • DADOS FICTÍCIOS
      </div>

      <AbsoluteFill
        style={{
          maskImage:
            "linear-gradient(transparent 555px, black 635px, black 1360px, transparent 1445px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 540,
            top: 980,
            transform: `perspective(1800px) rotateX(3deg) rotateZ(${cam.angle}deg) scale(${cam.scale})`,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            style={{
              translate: `${-cam.x}px ${-cam.y}px`,
              position: "absolute",
            }}
          >
            <svg
              width="8600"
              height="1600"
              style={{
                position: "absolute",
                left: -500,
                top: -650,
                overflow: "visible",
                opacity:
                  index === 7
                    ? 1 - progress(f, active.from, active.from + 50)
                    : 1,
              }}
            >
              <defs>
                <linearGradient id="test02-rail">
                  <stop stopColor="#008cff22" />
                  <stop offset=".4" stopColor="#008cffa0" />
                  <stop offset="1" stopColor="#008cff22" />
                </linearGradient>
              </defs>
              <path
                d="M100 900H8200"
                fill="none"
                stroke="#1c3a59"
                strokeWidth="4"
              />
              <path
                d="M100 900H8200"
                fill="none"
                stroke="url(#test02-rail)"
                strokeWidth="3"
                strokeDasharray="16 28"
                strokeDashoffset={-f * 1.2}
              />
              {[500, 1700, 2900, 4100, 5300, 6650, 8000].map((x, i) => (
                <g key={x}>
                  <path d={`M${x} 900V650`} stroke="#2e6392" strokeWidth="3" />
                  <circle cx={x} cy="900" r="11" fill={BLUE} />
                  <ellipse
                    cx={x}
                    cy="900"
                    rx="190"
                    ry="40"
                    fill="#008cff09"
                    stroke="#008cff33"
                  />
                  <text
                    x={x}
                    y="1010"
                    textAnchor="middle"
                    fill="#8eb4da"
                    fontSize="50"
                    fontFamily="Outfit"
                  >
                    {
                      [
                        "ENTRADA",
                        "DADOS",
                        "TAREFA",
                        "RASCUNHO",
                        "REVISÃO",
                        "RESULTADO",
                        "PRÓXIMO PASSO",
                      ][i]
                    }
                  </text>
                </g>
              ))}
            </svg>
            <Email f={f} />
            <ManualCopies f={f} />
            <Extracted f={f} />
            <Task f={f} />
            <Draft f={f} />
            <Review f={f} />
            <Comparison f={f} />
            <Finale f={f} />
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: 540 + (token.x - cam.x) * cam.scale - 130,
          top: 620,
          opacity:
            index === 7 ? 1 - progress(f, active.from, active.from + 28) : 1,
          rotate: `${-cam.angle}deg`,
          padding: "12px 23px",
          background: "linear-gradient(135deg,#087bea,#005db8)",
          border: "1px solid #74c6ff",
          borderRadius: 16,
          boxShadow: "0 10px 35px #008cff35",
          fontSize: 27,
          fontWeight: 600,
          letterSpacing: 1,
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <span style={{ fontSize: 24, color: "#bfebff" }}>◈</span> PEDIDO 01{" "}
        <span style={{ fontSize: 22 }}>→</span>
      </div>

      <Sequence
        name="Gancho imediato"
        durationInFrames={chapters[0].durationInFrames}
        premountFor={fps}
      >
        <Heading eyebrow="O CICLO QUE VOCÊ CONHECE" first>
          COPIAR. COLAR.
          <br />
          <span style={{ color: BLUE }}>REPETIR?</span>
        </Heading>
      </Sequence>
      <Sequence
        name="O problema repetitivo"
        from={chapters[1].from}
        durationInFrames={chapters[1].durationInFrames}
        premountFor={fps}
      >
        <Heading eyebrow="UM PEDIDO, VÁRIAS JANELAS">
          A MESMA TAREFA.
          <br />
          <span style={{ color: BLUE }}>DE NOVO.</span>
        </Heading>
      </Sequence>
      <Sequence
        name="Da conversa ao fluxo"
        from={chapters[2].from}
        durationInFrames={chapters[2].durationInFrames}
        premountFor={fps}
      >
        <Heading eyebrow="A MUDANÇA DE PERSPECTIVA">
          NÃO É SÓ CHAT.
          <br />
          <span style={{ color: BLUE }}>É UM FLUXO.</span>
        </Heading>
      </Sequence>
      <Sequence
        name="Ler e estruturar"
        from={chapters[3].from}
        durationInFrames={chapters[3].durationInFrames}
        premountFor={fps}
      >
        <Heading eyebrow="01 / ENTENDER O PEDIDO">
          DO TEXTO
          <br />
          <span style={{ color: BLUE }}>AOS DADOS.</span>
        </Heading>
      </Sequence>
      <Sequence
        name="Criar tarefa e rascunho"
        from={chapters[4].from}
        durationInFrames={chapters[4].durationInFrames}
        premountFor={fps}
      >
        <Heading eyebrow="02 / EXECUTAR AS ETAPAS">
          DADOS VIRAM
          <br />
          <span style={{ color: BLUE }}>AÇÃO.</span>
        </Heading>
      </Sequence>
      <Sequence
        name="Trava e exceção"
        from={chapters[5].from}
        durationInFrames={chapters[5].durationInFrames}
        premountFor={fps}
      >
        <Heading eyebrow="03 / MANTER O CONTROLE">
          A ÚLTIMA PALAVRA
          <br />
          <span style={{ color: BLUE }}>É SUA.</span>
        </Heading>
      </Sequence>
      <Sequence
        name="Resultado sem promessa"
        from={chapters[6].from}
        durationInFrames={chapters[6].durationInFrames}
        premountFor={fps}
      >
        <Heading eyebrow="O RESULTADO QUE IMPORTA">
          MENOS REPETIÇÃO.
          <br />
          <span style={{ color: BLUE }}>MAIS CONTROLE.</span>
        </Heading>
      </Sequence>
      <Sequence
        name="Comece pequeno"
        from={chapters[7].from}
        durationInFrames={chapters[7].durationInFrames}
        premountFor={fps}
      >
        <Heading eyebrow="AGORA É COM VOCÊ">
          COMECE
          <br />
          <span style={{ color: BLUE }}>PEQUENO.</span>
        </Heading>
      </Sequence>

      <style>{`.teste02-captions div[style*="white-space"] {font-family:Outfit,sans-serif!important;font-size:48px!important;font-weight:500!important;line-height:1.2!important;background:#080b14dc!important;border:1px solid #2a476a;border-radius:18px;padding:18px 26px!important;box-shadow:0 10px 30px #0005;}`}</style>
      <Teste02Captions />
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          top: 1680,
          display: "flex",
          alignItems: "center",
          gap: 22,
        }}
      >
        <div style={{ height: 3, background: "#233752", flex: 1 }}>
          <div
            style={{
              height: 3,
              width: `${(f / (plan.durationInFrames - 1)) * 100}%`,
              background: BLUE,
            }}
          />
        </div>
        <span style={{ fontSize: 22, color: "#91adcd", letterSpacing: 2 }}>
          0{index + 1} / 08
        </span>
      </div>
      <Audio
        name="AntonioNeural + música original + efeitos"
        src={staticFile("teste-02/mix-final.wav")}
        premountFor={fps}
      />
    </AbsoluteFill>
  );
};
