import type { ReactNode } from "react";
import { useVideoConfig } from "remotion";
import { safeArea } from "../theme";
export type LayoutKind = "solo" | "duo" | "interface" | "object" | "reveal";
export const EditorialLayout = ({
  children,
  kind = "solo",
}: {
  children: ReactNode;
  kind?: LayoutKind;
}) => {
  const { width, height } = useVideoConfig();
  const m = safeArea(width, height);
  return (
    <div
      data-layout={kind}
      style={{
        position: "absolute",
        left: m.left,
        top: m.top,
        width: width - m.left - m.right,
        height: height - m.top - m.bottom,
      }}
    >
      <div
        style={{
          width: 828,
          height: 1460,
          transform: `scale(${Math.min((width - m.left - m.right) / 828, (height - m.top - m.bottom) / 1460)})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
};
