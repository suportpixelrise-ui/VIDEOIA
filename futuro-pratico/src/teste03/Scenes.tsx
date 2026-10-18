import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { BLUE } from "../design";
import { Car } from "./Car";
import { chapters, clamp, p, rise, smooth, word } from "./timing";

const Label: React.FC<{
  children: React.ReactNode;
  top: number;
  left?: number;
  right?: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({
  children,
  top,
  left = 100,
  right,
  size = 38,
  color = "white",
  style,
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      right,
      fontSize: size,
      color,
      lineHeight: 1.14,
      fontWeight: 500,
      letterSpacing: -0.5,
      ...style,
    }}
  >
    {children}
  </div>
);
const Footnote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Label
    top={1315}
    left={100}
    right={140}
    size={27}
    color="#a7bdd4"
    style={{ letterSpacing: 0.2 }}
  >
    {children}
  </Label>
);
export const Floor: React.FC<{ f: number; speed?: number }> = ({
  f,
  speed = 0,
}) => (
  <svg
    width="1080"
    height="800"
    viewBox="0 0 1080 800"
    style={{ position: "absolute", top: 740, left: 0 }}
  >
    <defs>
      <radialGradient id="roadster-floor">
        <stop stopColor="#13639d33" />
        <stop offset="1" stopColor="#080b1400" />
      </radialGradient>
    </defs>
    <ellipse cx="540" cy="490" rx="580" ry="140" fill="url(#roadster-floor)" />
    <path
      d="M-100 510L1180 420M-100 590L1180 485"
      stroke="#416c8b66"
      strokeWidth="2"
    />
    {Array.from({ length: 12 }, (_, i) => (
      <path
        key={i}
        d={`M${((i * 190 - f * speed) % 2100) - 500} 545l130 -10`}
        stroke="#85b5d9"
        strokeWidth="3"
        opacity={0.15 + (i % 3) * 0.06}
      />
    ))}
  </svg>
);

export const LiftOff = () => {
  const f = useCurrentFrame();
  const end = chapters[0].durationInFrames;
  const lift = interpolate(
    f,
    [0, 13, 28, 57, 77, 95],
    [0, 12, -195, -230, -100, 0],
    smooth,
  );
  const turn = interpolate(f, [24, 68], [0, 360], smooth);
  return (
    <AbsoluteFill>
      <Label
        top={300}
        size={108}
        style={{ fontWeight: 650, letterSpacing: -4 }}
      >
        ELE SAIU
        <br />
        DO CHÃO.
      </Label>
      <Label top={560} size={43} color="#a4c9e9">
        Mas olhe a letra miúda.
      </Label>
      <Floor f={f} />
      <div
        style={{
          position: "absolute",
          top: 1170,
          left: 170,
          width: 740,
          height: 50,
          borderRadius: "50%",
          background: "#0009",
          filter: "blur(12px)",
          scale: interpolate(lift, [-230, 0], [0.68, 1], clamp),
          opacity: interpolate(lift, [-230, 0], [0.3, 0.85], clamp),
        }}
      />
      <svg width="1080" height="900" style={{ position: "absolute", top: 500 }}>
        <path
          d="M90 680Q500 170 970 680"
          stroke="#2a87d066"
          strokeWidth="2"
          strokeDasharray="8 13"
          fill="none"
          opacity={p(f, 15, 45)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: 855 + lift,
          left: 15,
          width: 1040,
          height: 416,
          transform: `perspective(1300px) rotateY(${turn}deg) rotateZ(${interpolate(f, [0, 35, 75, 100], [0, -6, 5, 0], smooth)}deg)`,
          scale: interpolate(f, [0, end], [1.02, 1.09], clamp),
        }}
      >
        <Car frame={f} roll={1.8} />
      </div>
      <Footnote>Reconstituição ilustrativa • não é filmagem do evento</Footnote>
    </AbsoluteFill>
  );
};

export const Event = () => {
  const f = useCurrentFrame();
  const start = word(1, "roadster", 3.5);
  return (
    <AbsoluteFill>
      <Label top={310} size={34} color="#9eb7d2" style={{ letterSpacing: 3 }}>
        TEXAS, ESTADOS UNIDOS
      </Label>
      <Label top={362} size={80} style={{ letterSpacing: -3, fontWeight: 600 }}>
        15 OUT 2026
      </Label>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 485,
          height: 2,
          width: interpolate(f, [0, 35], [0, 800], rise),
          background: BLUE,
        }}
      />
      <Label top={535} size={34} color="#bbcce1">
        Centro de testes da SpaceX
        <br />
        Apresentação reportada pela AP
      </Label>
      <Floor f={f} speed={2} />
      <div
        style={{
          position: "absolute",
          top: 805,
          left: interpolate(f, [0, 55], [-130, 15], smooth),
          width: 1060,
          height: 424,
          transform: `perspective(1300px) rotateY(${interpolate(f, [0, chapters[1].durationInFrames], [18, -8], clamp)}deg)`,
        }}
      >
        <Car frame={f} roll={1.6} />
      </div>
      <Label
        top={1200}
        size={50}
        color={BLUE}
        style={{ opacity: p(f, start - 12, start + 15) }}
      >
        ROADSTER
      </Label>
      <Footnote>
        Fonte: AP, 16/10/2026 • carro representado por ilustração
      </Footnote>
    </AbsoluteFill>
  );
};

export const Mechanism = () => {
  const f = useCurrentFrame();
  const gas = word(2, "gás", 1);
  const impulse = word(2, "impulso", 4.5);
  const space = word(2, "spacex", 8);
  const cut = p(f, 10, 38);
  const pulse = Math.max(0, Math.sin((f - gas) / 15));
  return (
    <AbsoluteFill>
      <Label top={315} size={34} color="#90b9db" style={{ letterSpacing: 3 }}>
        COMO O IMPULSO É GERADO
      </Label>
      <Label top={375} size={64}>
        GÁS FRIO.
        <br />
        NÃO É UMA CHAMA.
      </Label>
      <div
        style={{
          position: "absolute",
          top: 820,
          left: 35,
          width: 1010,
          height: 404,
        }}
      >
        <Car frame={f} cutaway={cut} roll={0.3} />
      </div>
      <svg width="1080" height="1300" style={{ position: "absolute", top: 20 }}>
        <defs>
          <marker
            id="gas-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path
              d="M0 0L7 3 0 6"
              fill="none"
              stroke={BLUE}
              strokeWidth="1.5"
            />
          </marker>
        </defs>
        <g opacity={cut}>
          <path
            d="M515 1033V745H380"
            stroke="#8db6d7"
            strokeWidth="2"
            fill="none"
          />
          <text
            x="205"
            y="700"
            fill="#c4d9e9"
            fontFamily="Outfit"
            fontSize="33"
          >
            Reservatório conceitual
          </text>
          <rect
            x="420"
            y="1033"
            width="215"
            height="65"
            rx="32"
            fill="#07294a"
            stroke="#55baff"
            strokeWidth="3"
          />
          {Array.from({ length: 14 }, (_, i) => (
            <circle
              key={i}
              cx={437 + ((i * 31 + f * 0.7) % 178)}
              cy={1045 + ((i * 19) % 40)}
              r="3"
              fill="#8ed6ff"
              opacity=".8"
            />
          ))}
          <path
            d="M420 1065H225L170 1087"
            stroke="#2a99ee"
            strokeWidth="7"
            fill="none"
          />
          <circle
            cx="265"
            cy="1065"
            r="15"
            fill="#07213b"
            stroke="#b6e2ff"
            strokeWidth="3"
          />
          <path d="M265 1052v26" stroke="#fff" strokeWidth="3" />
          <path
            d="M265 1090v78h140"
            stroke="#89b4d7"
            strokeWidth="2"
            fill="none"
          />
          <text
            x="415"
            y="1177"
            fill="#c4d9e9"
            fontFamily="Outfit"
            fontSize="32"
          >
            Válvula + bocal
          </text>
          <path d="M170 1088L135 1077 132 1103Z" fill="#b6cee2" />
          {Array.from({ length: 24 }, (_, i) => (
            <circle
              key={i}
              cx={130 - ((i * 17 + f * 4) % 220)}
              cy={1090 + Math.sin(i * 4 + f / 12) * (10 + (i % 4) * 8)}
              r={1.7 + (i % 3)}
              fill="#9bdcff"
              opacity={(0.2 + 0.6 * pulse) * p(f, gas - 5, gas + 20)}
            />
          ))}
          <path
            d="M220 970H100"
            stroke={BLUE}
            strokeWidth="4"
            markerEnd="url(#gas-arrow)"
            opacity={p(f, gas, gas + 18)}
          />
          <path
            d="M720 980H925"
            stroke={BLUE}
            strokeWidth="4"
            markerEnd="url(#gas-arrow)"
            opacity={p(f, impulse - 10, impulse + 20)}
          />
        </g>
      </svg>
      <Label top={910} left={110} size={30} color="#b1d8f4">
        Gás ←
      </Label>
      <Label top={910} left={745} size={30} color="#b1d8f4">
        Impulso →
      </Label>
      <Label
        top={1210}
        size={34}
        color={BLUE}
        style={{ opacity: p(f, space - 18, space + 10) }}
      >
        Tecnologia SpaceX, segundo a Tesla.
      </Label>
      <Footnote>
        Esquema conceitual • posição e dimensões não representam o projeto real
      </Footnote>
    </AbsoluteFill>
  );
};

export const Limit = () => {
  const f = useCurrentFrame();
  const sustain = word(3, "sustentar", 2);
  const tank = word(3, "limitado", 6);
  const hovering = p(f, sustain - 10, sustain + 20);
  const fill = interpolate(f, [sustain, tank + 15], [0.86, 0.22], smooth);
  const y = interpolate(
    f,
    [0, 32, 65, sustain, sustain + 24, tank, tank + 30],
    [0, -130, 0, 0, -85, -85, 0],
    smooth,
  );
  return (
    <AbsoluteFill>
      <Label top={315} size={70}>
        SALTAR ≠<br />
        SUSTENTAR VOO
      </Label>
      <Label top={520} size={36} color="#b1c8df">
        Um pulso não demonstra autonomia no ar.
      </Label>
      <Floor f={f} />
      <div
        style={{
          position: "absolute",
          top: 865 + y,
          left: 40,
          width: 990,
          height: 396,
        }}
      >
        <Car frame={f} roll={0.4} />
      </div>
      <svg width="1080" height="1400" style={{ position: "absolute", top: 0 }}>
        <defs>
          <marker
            id="force-blue"
            markerWidth="12"
            markerHeight="12"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0 0L8 4 0 8" fill="none" stroke={BLUE} strokeWidth="2" />
          </marker>
          <marker
            id="weight-gold"
            markerWidth="12"
            markerHeight="12"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path
              d="M0 0L8 4 0 8"
              fill="none"
              stroke="#e2b478"
              strokeWidth="2"
            />
          </marker>
        </defs>
        <g opacity={hovering}>
          <path
            d="M550 940V730"
            stroke={BLUE}
            strokeWidth="5"
            markerEnd="url(#force-blue)"
          />
          <text
            x="590"
            y="790"
            fill="#94d7ff"
            fontSize="32"
            fontFamily="Outfit"
          >
            Empuxo
          </text>
          <path
            d="M570 1080V1240"
            stroke="#e2b478"
            strokeWidth="5"
            markerEnd="url(#weight-gold)"
          />
          <text
            x="615"
            y="1220"
            fill="#e3c398"
            fontSize="32"
            fontFamily="Outfit"
          >
            Peso
          </text>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 115,
          top: 680,
          width: 80,
          height: 190,
          border: "2px solid #78b8e8",
          borderRadius: 22,
          padding: 8,
          boxSizing: "border-box",
          opacity: hovering,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 9,
            left: 9,
            right: 9,
            height: fill * 165,
            background: "linear-gradient(#7cd2ff,#008cff)",
            borderRadius: 12,
          }}
        />
      </div>
      <Label
        top={890}
        left={100}
        size={26}
        color="#a4c4df"
        style={{ opacity: hovering }}
      >
        Gás finito
      </Label>
      <Footnote>
        Princípio físico ilustrado • sem estimativa de autonomia do Roadster
      </Footnote>
    </AbsoluteFill>
  );
};

export const Claim = () => {
  const f = useCurrentFrame();
  const correction = word(4, "afirmação", 4);
  const movement = interpolate(f, [0, 40, 75], [70, 130, 900], smooth);
  return (
    <AbsoluteFill>
      <Label top={315} size={31} color="#b3c9df" style={{ letterSpacing: 3 }}>
        THRUST • ANÚNCIO DA FABRICANTE
      </Label>
      <Label top={390} size={90} style={{ fontWeight: 600, letterSpacing: -3 }}>
        0–60 mph
      </Label>
      <Label top={495} size={36} color="#b4c9dd">
        ≈97 km/h
      </Label>
      <Label top={580} size={80} color={BLUE} style={{ fontWeight: 650 }}>
        MENOS DE 1 s
      </Label>
      <Floor f={f} speed={10} />
      <div
        style={{
          position: "absolute",
          left: movement - 170,
          top: 870,
          width: 1020,
          height: 408,
          opacity: interpolate(f, [65, 95, 110], [1, 0.12, 0], clamp),
        }}
      >
        <Car frame={f} roll={8} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          top: 920,
          borderTop: "2px solid #a2c8df",
          borderBottom: "2px solid #a2c8df",
          padding: "35px 0",
          opacity: p(f, correction - 8, correction + 16),
          translate: `0 ${interpolate(f, [correction - 8, correction + 20], [45, 0], rise)}px`,
        }}
      >
        <div style={{ fontSize: 47, fontWeight: 600 }}>AFIRMAÇÃO DA TESLA.</div>
        <div style={{ fontSize: 39, color: "#b9cfe1", marginTop: 18 }}>
          Não é uma medição deste vídeo.
        </div>
      </div>
      <Footnote>
        Fonte: Tesla, Roadster • representação de aceleração, não um cronômetro
        real
      </Footnote>
    </AbsoluteFill>
  );
};

export const History = () => {
  const f = useCurrentFrame();
  const production = word(5, "produção", 5);
  const interior = f > 55 && f < 112;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 440,
          bottom: 440,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile(
            interior
              ? "teste-03/roadster-interior-2019.jpg"
              : "teste-03/roadster-prototipo-2019.jpg",
          )}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: interior ? "52% center" : "45% center",
            scale: interpolate(
              f,
              [0, chapters[5].durationInFrames],
              [1.02, 1.13],
              clamp,
            ),
            translate: `${interpolate(f, [0, chapters[5].durationInFrames], [15, -25], clamp)}px 0`,
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(#080b1480,transparent 22%,transparent 65%,#080b14)",
          }}
        />
      </div>
      <Label top={285} size={28} color="#a6c7e1" style={{ letterSpacing: 2 }}>
        ARQUIVO • PROTÓTIPO ANTERIOR
      </Label>
      <Label top={340} size={56}>
        FOTO DE 2019
      </Label>
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          top: 1130,
          padding: "20px 22px",
          background: "#080b14db",
          borderRadius: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {["2017", "2026", "2028?"].map((year, i) => (
            <React.Fragment key={year}>
              {i > 0 ? (
                <div
                  style={{
                    height: 2,
                    flex: 1,
                    background:
                      i === 2
                        ? "repeating-linear-gradient(90deg,#85afd3 0 6px,transparent 6px 12px)"
                        : "#71baff",
                  }}
                />
              ) : null}
              <div
                style={{
                  textAlign: "center",
                  color: i === 2 ? BLUE : "white",
                  opacity: i === 2 ? p(f, production - 10, production + 18) : 1,
                }}
              >
                <div style={{ fontSize: 50, fontWeight: 600 }}>{year}</div>
                <div style={{ fontSize: 23, color: "#b7cce0", marginTop: 8 }}>
                  {["Projeto", "Evento", "Previsão Musk"][i]}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Label top={1320} size={26} color="#c0d3e2">
        Foto: Steve Jurvetson • CC BY 2.0 • recorte animado
      </Label>
    </AbsoluteFill>
  );
};

export const Fineprint = () => {
  const f = useCurrentFrame();
  const reveal = word(6, "rocket", 3);
  const stop = interpolate(f, [0, 35], [180, 0], smooth);
  return (
    <AbsoluteFill>
      <Floor f={f} speed={interpolate(f, [0, 35], [4, 0], smooth)} />
      <div
        style={{
          position: "absolute",
          left: stop - 80,
          top: 730,
          width: 1120,
          height: 448,
          opacity: interpolate(
            f,
            [reveal - 10, reveal + 25],
            [1, 0.45],
            smooth,
          ),
        }}
      >
        <Car frame={f} roll={interpolate(f, [0, 35], [2, 0], smooth)} />
      </div>
      <Label top={305} size={34} color="#bbcfe1">
        E A LETRA MIÚDA?
      </Label>
      <div
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          top: 450,
          padding: "30px 0",
          borderTop: "1px solid #b8d3e7",
          borderBottom: "1px solid #b8d3e7",
          opacity: p(f, reveal - 40, reveal - 10),
        }}
      >
        <div style={{ fontSize: 29, letterSpacing: 3, color: "#a4c6e2" }}>
          VERSÃO ROCKET
        </div>
        <div
          style={{
            fontSize: 62,
            lineHeight: 1.05,
            fontWeight: 600,
            marginTop: 22,
          }}
        >
          NÃO APROVADA
          <br />
          PARA VIAS PÚBLICAS.
        </div>
        <div style={{ fontSize: 27, color: "#c0d2e3", marginTop: 20 }}>
          Nota da própria Tesla.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 780,
          top: 1030,
          width: 160,
          height: 180,
          perspective: 1000,
          opacity: p(f, 20, 45),
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 15,
            left: 65,
            width: 14,
            height: 180,
            background: "#314c63",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 150,
            height: 90,
            borderRadius: 10,
            background:
              "repeating-linear-gradient(135deg,#d9ad69 0 24px,#0c1726 24px 48px)",
            border: "2px solid #f6d6a2",
          }}
        />
      </div>
      <Label
        top={1225}
        size={37}
        color="#c9dbe9"
        style={{ opacity: p(f, reveal + 25, reveal + 60) }}
      >
        Saltar não é estar liberado para a rua.
      </Label>
      <Footnote>
        Fonte: Tesla, Roadster • nota da versão Rocket • ilustração conceitual
      </Footnote>
    </AbsoluteFill>
  );
};
