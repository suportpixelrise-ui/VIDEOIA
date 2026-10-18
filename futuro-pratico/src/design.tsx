import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";

loadFont({
  family: "Outfit",
  url: staticFile("fonts/Outfit.ttf"),
  weight: "100 900",
});
export const BLUE = "#008CFF";
export const INK = "#080B14";
export const ease = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};
export const linear = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
export const panel: React.CSSProperties = {
  background: "linear-gradient(135deg, #17263bee, #0b111fee)",
  border: "1px solid #43688e88",
  boxShadow: "0 45px 100px #0009, inset 0 1px 0 #ffffff1a",
  borderRadius: 30,
};

export const Mark: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M8 48V16h46L40 30H23v18H8Z" fill={BLUE} />
    <path d="M31 38h17L31 55V38Z" fill="white" />
  </svg>
);

export const Backdrop: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${45 + Math.sin(f / 100) * 14}% 58%, #008cff22, transparent 58%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.2,
          backgroundImage:
            "linear-gradient(#2685cf33 1px, transparent 1px), linear-gradient(90deg, #2685cf33 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          transform: `perspective(900px) rotateX(58deg) translateY(${420 + f * 0.12}px) scale(1.8)`,
          transformOrigin: "center 80%",
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 700 + i * 200,
            height: 700 + i * 200,
            left: 190 - i * 100,
            top: 700 - i * 100,
            border: "1px solid #008cff1e",
            borderRadius: "50%",
            transform: `rotateX(65deg) rotateZ(${f * 0.08 + i * 35}deg)`,
          }}
        />
      ))}
      {Array.from({ length: 22 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (i * 173 + 71) % 1080,
            top: ((i * 257 + f * (0.15 + (i % 3) * 0.08)) % 1500) + 150,
            width: i % 4 === 0 ? 4 : 2,
            height: i % 4 === 0 ? 4 : 2,
            background: "#7ac4ff",
            opacity: 0.15 + (Math.sin(f / 30 + i) + 1) * 0.12,
            borderRadius: "50%",
          }}
        />
      ))}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #080b1499, transparent 25%, transparent 75%, #080b14)",
        }}
      />
    </AbsoluteFill>
  );
};

export const SceneShell: React.FC<{
  children: React.ReactNode;
  duration: number;
}> = ({ children, duration }) => {
  const f = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        fontFamily: "Outfit, sans-serif",
        color: "white",
        opacity: interpolate(
          f,
          [0, 5, duration - 4, duration],
          [0.85, 1, 1, 0.45],
          linear,
        ),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export const Title: React.FC<{
  number: string;
  children: React.ReactNode;
  size?: number;
  note: string;
}> = ({ number, children, size = 112, note }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 100, right: 140, top: 345 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: interpolate(f, [0, 0.4 * fps], [0, 1], ease),
          translate: `${interpolate(f, [0, 0.6 * fps], [60, 0], ease)}px 0`,
        }}
      >
        <span
          style={{
            border: `1px solid ${BLUE}`,
            color: BLUE,
            borderRadius: 30,
            padding: "10px 22px",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          0{number} / 03
        </span>
        <span style={{ fontSize: 28, letterSpacing: 4, color: "#b8cae0" }}>
          NA PRÁTICA
        </span>
      </div>
      <div
        style={{
          marginTop: 26,
          fontSize: size,
          fontWeight: 750,
          lineHeight: 0.98,
          letterSpacing: -4,
          translate: `0 ${interpolate(f, [3, 25], [75, 0], ease)}px`,
          opacity: interpolate(f, [3, 16], [0, 1], ease),
          filter: `blur(${interpolate(f, [3, 18], [10, 0], ease)}px)`,
        }}
      >
        {children}
      </div>
      <div
        style={{
          fontSize: 42,
          color: "#c8d6e9",
          marginTop: 24,
          opacity: interpolate(f, [18, 36], [0, 1], ease),
        }}
      >
        {note}
      </div>
    </div>
  );
};

export const Chip: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      ...panel,
      borderRadius: 40,
      padding: "15px 24px",
      fontSize: 34,
      color: "#e3edfa",
      display: "flex",
      alignItems: "center",
      gap: 12,
      ...style,
    }}
  >
    <span
      style={{
        width: 8,
        height: 8,
        borderRadius: 10,
        background: BLUE,
        boxShadow: `0 0 18px ${BLUE}`,
      }}
    />
    {children}
  </div>
);
