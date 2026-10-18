export const framesFor = (seconds, fps) => {
  if (
    !Number.isFinite(seconds) ||
    seconds < 0 ||
    !Number.isFinite(fps) ||
    fps <= 0
  )
    throw new Error("Invalid seconds/fps");
  return Math.round(seconds * fps);
};
// Each scene owns its outgoing overlap. The last scene must have zero overlap.
export const makeTimeline = (scenes, fps) => {
  if (!scenes.length) throw new Error("Empty timeline");
  const ids = new Set();
  let cursor = 0;
  const items = scenes.map((scene, index) => {
    if (!scene.id || ids.has(scene.id))
      throw new Error("Duplicate/missing scene id");
    ids.add(scene.id);
    const durationInFrames = framesFor(scene.durationSeconds, fps);
    const overlap = framesFor(scene.transitionSeconds ?? 0, fps);
    if (
      durationInFrames < 1 ||
      overlap >= durationInFrames ||
      (index === scenes.length - 1 && overlap)
    )
      throw new Error("Invalid transition/duration");
    if (
      index &&
      framesFor(scenes[index - 1].transitionSeconds ?? 0, fps) + overlap >=
        durationInFrames
    )
      throw new Error("Transitions consume scene");
    const item = { ...scene, from: cursor, durationInFrames, overlap };
    cursor += durationInFrames - overlap;
    return item;
  });
  return { items, durationInFrames: cursor };
};
export const captionErrors = (cues, audioSeconds, durationSeconds) => {
  const errors = [];
  let end = 0;
  for (const c of cues) {
    if (
      !Number.isFinite(c.start) ||
      !Number.isFinite(c.end) ||
      c.start < end ||
      c.end <= c.start ||
      c.end > Math.min(audioSeconds, durationSeconds)
    )
      errors.push("Caption timing outside audio/timeline or overlapping");
    if (
      typeof c.text !== "string" ||
      !c.text.trim() ||
      c.text.split("\n").length > 2 ||
      c.text.split("\n").some((line) => line.length > 42)
    )
      errors.push("Caption needs 1–2 lines, max 42 characters per line");
    end = c.end;
  }
  return errors;
};
