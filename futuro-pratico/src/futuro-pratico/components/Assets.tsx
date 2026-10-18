import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import assets from "../../../config/futuro-pratico/assets.json";
export type AssetCategory =
  | "personagens"
  | "retratos"
  | "cenarios"
  | "objetos"
  | "overlays";
export const assetById = (id: string, category?: AssetCategory) => {
  const a = assets.find((x) => x.id === id);
  if (!a || (category && a.category !== category))
    throw new Error(`Asset inválido: ${id}`);
  return a;
};
export type Character = "personagem_1" | "personagem_2";
export type Pose = "neutro" | "apresentando" | "pensativo" | "entusiasmado";
export const CharacterSprite = ({
  character,
  pose = "neutro",
  x = 0,
  y = 0,
  height = 780,
  scale = 1,
  facing = "original",
  cropBottom = 0,
}: {
  character: Character;
  pose?: Pose;
  x?: number;
  y?: number;
  height?: number;
  scale?: number;
  facing?: "original" | "mirrored";
  cropBottom?: number;
}) => {
  const a = assetById(`personagens.${character}_${pose}`, "personagens");
  return (
    <Img
      src={staticFile(a.path)}
      style={{
        position: "absolute",
        left: x,
        top: y,
        height,
        width: (height * a.width) / a.height,
        objectFit: "contain",
        transform: `scale(${facing === "mirrored" ? -scale : scale},${scale})`,
        transformOrigin: "bottom center",
        clipPath: `inset(0 0 ${Math.max(0, Math.min(10, cropBottom))}% 0)`,
      }}
    />
  );
};
export const SceneBackground = ({
  id,
  focal = [50, 50],
  crop = "cover",
  pan = 0,
  zoom = 0,
}: {
  id: string;
  focal?: [number, number];
  crop?: "cover" | "contain";
  pan?: number;
  zoom?: number;
}) => {
  const a = assetById(id, "cenarios");
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(a.path)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: crop,
          objectPosition: `${focal[0]}% ${focal[1]}%`,
          transform: `translateX(${interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, Math.max(-2, Math.min(2, pan))])}%) scale(${1 + Math.max(pan ? 0.04 : 0, Math.min(0.04, zoom))})`,
        }}
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(#08081088,#08081011 40%,#080810dd)",
        }}
      />
    </AbsoluteFill>
  );
};
export const TechObject = ({
  id,
  style,
}: {
  id: string;
  style?: CSSProperties;
}) => (
  <Img
    src={staticFile(assetById(id, "objetos").path)}
    style={{ objectFit: "contain", ...style }}
  />
);
export const AssetOverlay = ({
  id,
  style,
}: {
  id: string;
  style?: CSSProperties;
}) => (
  <Img
    src={staticFile(assetById(id, "overlays").path)}
    style={{ objectFit: "contain", ...style }}
  />
);
