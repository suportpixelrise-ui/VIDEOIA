import type { ReactNode } from "react";
import { interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
export const Motion = ({
  children,
  enterSeconds = 0.3,
  exitSeconds = 0.2,
  pan = 0,
  zoom = 0,
}: {
  children: ReactNode;
  enterSeconds?: number;
  exitSeconds?: number;
  pan?: number;
  zoom?: number;
}) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = Math.max(1, enterSeconds * fps),
    exit = Math.max(1, exitSeconds * fps),
    last = Math.max(enter + 1, durationInFrames - 1);
  const opacity = Math.min(
    interpolate(f, [0, enter], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(f, [last - exit, last], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        opacity,
        transform: `translate(${interpolate(f, [0, enter], [24, 0], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }) + interpolate(f, [0, last], [0, pan])}px,0) scale(${interpolate(f, [0, last], [1, 1 + Math.min(0.04, Math.max(0, zoom))])})`,
      }}
    >
      {children}
    </div>
  );
};
