import { describe, expect, it } from "vitest";
import {
  DEFAULT_SWIPE_CONFIG,
  classifySwipe,
  extractPrimaryHandPoint,
  trimGestureHistory,
  type GesturePoint,
} from "./hand-gesture-scroll";

const points = (entries: Array<[number, number, number]>): GesturePoint[] =>
  entries.map(([x, y, timestamp]) => ({ x, y, timestamp }));

describe("classifySwipe", () => {
  it("returns up for a fast upward hand movement", () => {
    expect(
      classifySwipe(
        points([
          [0.5, 0.72, 0],
          [0.5, 0.58, 80],
          [0.5, 0.43, 160],
        ]),
        null,
        DEFAULT_SWIPE_CONFIG
      )
    ).toBe("up");
  });

  it("returns down for a fast downward hand movement", () => {
    expect(
      classifySwipe(
        points([
          [0.5, 0.34, 0],
          [0.5, 0.48, 80],
          [0.5, 0.64, 160],
        ]),
        null,
        DEFAULT_SWIPE_CONFIG
      )
    ).toBe("down");
  });

  it("ignores mostly horizontal motion", () => {
    expect(
      classifySwipe(
        points([
          [0.2, 0.72, 0],
          [0.33, 0.62, 80],
          [0.46, 0.54, 160],
        ]),
        null,
        DEFAULT_SWIPE_CONFIG
      )
    ).toBeNull();
  });

  it("ignores tiny jitter", () => {
    expect(
      classifySwipe(
        points([
          [0.5, 0.5, 0],
          [0.5, 0.48, 80],
          [0.5, 0.49, 160],
        ]),
        null,
        DEFAULT_SWIPE_CONFIG
      )
    ).toBeNull();
  });

  it("respects the cooldown window", () => {
    expect(
      classifySwipe(
        points([
          [0.5, 0.72, 1000],
          [0.5, 0.58, 1080],
          [0.5, 0.43, 1160],
        ]),
        600,
        DEFAULT_SWIPE_CONFIG
      )
    ).toBeNull();
  });
});

describe("extractPrimaryHandPoint", () => {
  it("returns an averaged palm anchor for the first detected hand", () => {
    expect(
      extractPrimaryHandPoint([
        [
          { x: 0.5, y: 0.6 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0.52, y: 0.58 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0.48, y: 0.57 },
        ],
        [
          { x: 0.15, y: 0.2 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0.18, y: 0.18 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0.21, y: 0.19 },
        ],
      ])
    ).toEqual({ x: 0.5, y: 0.5833333333333334 });
  });

  it("returns null when hands are missing", () => {
    expect(extractPrimaryHandPoint(undefined)).toBeNull();
  });

  it("returns null when required palm landmarks are missing", () => {
    expect(
      extractPrimaryHandPoint([
        [
          { x: 0.5, y: 0.6 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          undefined as unknown as { x: number; y: number },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0.48, y: 0.57 },
        ],
      ])
    ).toBeNull();

    expect(
      extractPrimaryHandPoint([
        [
          { x: 0.5, y: 0.6 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0.52, y: 0.58 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
        ],
      ])
    ).toBeNull();
  });
});

describe("trimGestureHistory", () => {
  it("keeps only points within the configured time window", () => {
    expect(
      trimGestureHistory(
        points([
          [0.5, 0.5, 700],
          [0.5, 0.5, 899],
          [0.5, 0.5, 900],
          [0.5, 0.5, 1000],
        ]),
        100,
        1000
      )
    ).toEqual(
      points([
        [0.5, 0.5, 900],
        [0.5, 0.5, 1000],
      ])
    );
  });
});
