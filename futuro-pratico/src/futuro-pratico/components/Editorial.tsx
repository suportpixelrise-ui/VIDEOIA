import type { ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { colors, typography, safeArea } from "../theme";
import type { Cue } from "../motion/timeline.mjs";
export const Title = ({
  children,
  kicker,
}: {
  children: ReactNode;
  kicker?: string;
}) => (
  <div>
    {kicker && (
      <div
        style={{
          fontSize: 25,
          letterSpacing: 3,
          color: colors.orange,
          marginBottom: 22,
        }}
      >
        {kicker}
      </div>
    )}
    <h1
      style={{
        fontSize: typography.title,
        lineHeight: 1.08,
        margin: 0,
        fontWeight: 700,
      }}
    >
      {children}
    </h1>
  </div>
);
export const Caption = ({ cues }: { cues: Cue[] }) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const cue = cues.find((c) => f / fps >= c.start && f / fps < c.end);
  const m = safeArea(width, height);
  return cue ? (
    <div
      style={{
        position: "absolute",
        left: m.left,
        right: m.right,
        bottom: m.bottom + 20,
        fontSize: (typography.caption * width) / 1080,
        lineHeight: 1.25,
        textAlign: "center",
        whiteSpace: "pre-line",
        background: "#080810ed",
        padding: 20,
        borderRadius: 16,
      }}
    >
      {cue.text}
    </div>
  ) : null;
};
export const DebugSafeArea = ({ show = true }: { show?: boolean }) => {
  const { width, height } = useVideoConfig();
  const m = safeArea(width, height);
  return show ? (
    <div
      style={{
        position: "absolute",
        ...m,
        border: "2px dashed #FF7A2E",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: -30,
          fontSize: 20,
          background: colors.black,
          color: colors.orange,
        }}
      >
        Margens editoriais · conferir na plataforma
      </span>
    </div>
  ) : null;
};
