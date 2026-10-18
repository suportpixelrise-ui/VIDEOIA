import { Easing, interpolate } from "remotion";
import plan from "./plan.json";
export const chapters = plan.chapters;
export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
export const smooth = { ...clamp, easing: Easing.bezier(0.55, 0, 0.45, 1) };
export const rise = { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) };
export const p = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], rise);
export const word = (i: number, text: string, fallback = 1) => {
  const x = chapters[i].captions.find(
    (c) =>
      c.text
        .trim()
        .toLocaleLowerCase("pt-BR")
        .replace(/[^\p{L}]/gu, "") === text,
  );
  return x ? (x.startMs * 30) / 1000 : fallback * 30;
};
