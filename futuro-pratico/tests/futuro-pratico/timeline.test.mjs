import test from "node:test";
import assert from "node:assert/strict";
import {
  makeTimeline,
  framesFor,
  captionErrors,
} from "../../src/futuro-pratico/motion/timeline.mjs";
test("overlap counted once and all sequences fit", () => {
  const t = makeTimeline(
    [
      { id: "a", durationSeconds: 3, transitionSeconds: 0.25 },
      { id: "b", durationSeconds: 2 },
    ],
    24,
  );
  assert.equal(t.items[1].from, 66);
  assert.equal(t.durationInFrames, 114);
  assert(
    t.items.every((i) => i.from + i.durationInFrames <= t.durationInFrames),
  );
});
test("transition duration converts from seconds at any fps", () => {
  assert.equal(framesFor(8 / 24, 30), 10);
  assert.equal(framesFor(8 / 24, 24), 8);
});
test("invalid times and transition chains rejected", () => {
  for (const scenes of [
    [],
    [{ id: "a", durationSeconds: 0 }],
    [{ id: "a", durationSeconds: 1, transitionSeconds: 1 }],
    [{ id: "a", durationSeconds: 1, transitionSeconds: 0.25 }],
    [
      { id: "a", durationSeconds: 1 },
      { id: "a", durationSeconds: 1 },
    ],
    [
      { id: "a", durationSeconds: 2, transitionSeconds: 1 },
      { id: "b", durationSeconds: 1 },
    ],
  ])
    assert.throws(() => makeTimeline(scenes, 24));
  assert.throws(() => framesFor(NaN, 24));
  assert.throws(() => framesFor(1, 0));
});
test("captions reject overlap, oversized lines and audio overruns", () => {
  assert.deepEqual(
    captionErrors([{ start: 0, end: 1, text: "Olá" }], 2, 3),
    [],
  );
  for (const cues of [
    [{ start: 0, end: 3, text: "Olá" }],
    [
      { start: 0, end: 1, text: "a" },
      { start: 0.5, end: 1.5, text: "b" },
    ],
    [{ start: 0, end: 1, text: "a".repeat(43) }],
    [{ start: 0, end: 1, text: "a\nb\nc" }],
  ])
    assert(captionErrors(cues, 2, 3).length);
});
