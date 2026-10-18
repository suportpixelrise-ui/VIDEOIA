import { Easing, interpolate } from "remotion";
import plan from "./plan.json";
import { ease, linear } from "../design";
export const chapters = plan.chapters;
export const at = (i: number, seconds = 0) => chapters[i].from + seconds * 30;
export const progress = (f: number, start: number, end: number) =>
  interpolate(f, [start, end], [0, 1], ease);
export const local = (f: number, i: number) => f - chapters[i].from;
export const word = (i: number, needle: string, fallback: number) => {
  const token = chapters[i].captions.find(
    (c) =>
      c.text
        .trim()
        .toLocaleLowerCase("pt-BR")
        .replace(/[^\p{L}]/gu, "") === needle,
  );
  return token ? (token.startMs * 30) / 1000 : fallback * 30;
};
const cameraEase = { ...linear, easing: Easing.bezier(0.55, 0, 0.45, 1) };
export const camera = (f: number) => {
  const missing = word(5, "faltou", 5.1) / 30;
  const keys = [
    [0, 0, 0, 1.06, -4],
    [25, 0, 0, 0.96, -1],
    [at(1, -0.35), 0, 0, 0.96, -1],
    [at(1, 0.7), 180, 100, 0.76, 2],
    [at(2, -0.35), 180, 100, 0.76, 2],
    [at(2, 0.8), 1200, 0, 0.33, 0],
    [at(2, 2.3), 1200, 0, 0.33, 0],
    [at(2, 4.8), 1200, 0, 0.86, -2],
    [at(3, -0.35), 1200, 0, 0.86, -2],
    [at(3, 0.6), 0, 0, 1.02, 1],
    [at(3, 3.25), 0, 0, 1.02, 1],
    [at(3, 4.9), 1200, 0, 1.0, -1],
    [at(4, 0.35), 1200, 0, 1.0, -1],
    [at(4, 1.8), 2400, -140, 0.98, 1],
    [at(4, 3.25), 2400, -140, 0.98, 1],
    [at(4, 4.9), 3600, 80, 0.96, -1],
    [at(5, -0.35), 3600, 80, 0.96, -1],
    [at(5, 0.7), 4800, 0, 0.98, 1],
    [at(5, missing - 0.4), 4800, 0, 0.98, 1],
    [at(5, missing + 1.1), 4800, 525, 0.96, -1],
    [at(5, 9.25), 4800, 525, 0.96, -1],
    [at(5, 10.45), 4800, 0, 0.98, 0],
    [at(6, -0.2), 4800, 0, 0.98, 0],
    [at(6, 0.8), 6150, 0, 0.98, -1],
    [at(7, -0.35), 6150, 0, 1.02, 0],
    [at(7, 0.8), 7500, 0, 1.0, 0],
    [plan.durationInFrames, 7500, 0, 1.04, -1],
  ];
  const times = keys.map((k) => k[0]);
  return {
    x: interpolate(
      f,
      times,
      keys.map((k) => k[1]),
      ease,
    ),
    y: interpolate(
      f,
      times,
      keys.map((k) => k[2]),
      ease,
    ),
    scale: interpolate(
      f,
      times,
      keys.map((k) => k[3]),
      ease,
    ),
    angle: interpolate(
      f,
      times,
      keys.map((k) => k[4]),
      ease,
    ),
  };
};
export const packet = (f: number) => {
  const keys = [
    [0, -120],
    [at(1), 0],
    [at(1, 2), 760],
    [at(1, 4), 0],
    [at(1, 6), 760],
    [at(2, 0.8), 0],
    [at(2, 4.5), 2400],
    [at(3, -0.35), 2400],
    [at(3, 0.6), 0],
    [at(3, 3.25), 0],
    [at(3, 5.8), 1200],
    [at(4, 0.35), 1200],
    [at(4, 1.8), 2400],
    [at(4, 3.25), 2400],
    [at(4, 4.9), 3600],
    [at(5, -0.35), 3600],
    [at(5, 0.7), 4800],
    [at(6, -0.2), 4800],
    [at(6, 0.8), 6150],
    [at(7, -0.35), 6150],
    [at(7, 0.8), 7500],
  ];
  return {
    x: interpolate(
      f,
      keys.map((k) => k[0]),
      keys.map((k) => k[1]),
      cameraEase,
    ),
    y: -370,
  };
};
