export type SceneTiming = {
  id: string;
  durationSeconds: number;
  transitionSeconds?: number;
};
export type Cue = { start: number; end: number; text: string };
export function framesFor(seconds: number, fps: number): number;
export function makeTimeline<T extends SceneTiming>(
  scenes: T[],
  fps: number,
): {
  items: (T & { from: number; durationInFrames: number; overlap: number })[];
  durationInFrames: number;
};
export function captionErrors(
  cues: Cue[],
  audioSeconds: number,
  durationSeconds: number,
): string[];
