import { describe, expect, it } from "vitest";
import {
  extractCursorGestureFrame,
  getHoverLabel,
  isPinchClosed,
  mapNormalizedPointToViewport,
  resolveInteractiveTarget,
} from "./hand-cursor-control";

const createHand = ({
  thumbTip,
  indexTip,
}: {
  thumbTip: { x: number; y: number };
  indexTip: { x: number; y: number };
}) => {
  const points = Array.from({ length: 21 }, () => ({ x: 0, y: 0 }));
  points[4] = thumbTip;
  points[8] = indexTip;
  return [points];
};

describe("extractCursorGestureFrame", () => {
  it("returns thumb and index fingertip data for the first hand", () => {
    expect(
      extractCursorGestureFrame(
        createHand({
          thumbTip: { x: 0.42, y: 0.47 },
          indexTip: { x: 0.63, y: 0.28 },
        })
      )
    ).toEqual({
      thumbTip: { x: 0.42, y: 0.47 },
      indexTip: { x: 0.63, y: 0.28 },
    });
  });

  it("returns null when required cursor landmarks are missing", () => {
    expect(extractCursorGestureFrame(undefined)).toBeNull();
    expect(
      extractCursorGestureFrame([
        Array.from({ length: 8 }, () => ({ x: 0, y: 0 })),
      ])
    ).toBeNull();
  });
});

describe("mapNormalizedPointToViewport", () => {
  it("maps normalized coordinates into the viewport using mirrored x movement", () => {
    expect(
      mapNormalizedPointToViewport(
        { x: 0.25, y: 0.5 },
        { width: 1200, height: 800 }
      )
    ).toEqual({ x: 900, y: 400 });
  });

  it("clamps the mapped point into the viewport", () => {
    expect(
      mapNormalizedPointToViewport(
        { x: -0.2, y: 1.4 },
        { width: 1000, height: 700 }
      )
    ).toEqual({ x: 1000, y: 700 });
  });
});

describe("isPinchClosed", () => {
  it("returns true when thumb and index are close enough", () => {
    expect(
      isPinchClosed({
        thumbTip: { x: 0.44, y: 0.45 },
        indexTip: { x: 0.48, y: 0.47 },
      })
    ).toBe(true);
  });

  it("returns false when thumb and index are apart", () => {
    expect(
      isPinchClosed({
        thumbTip: { x: 0.2, y: 0.2 },
        indexTip: { x: 0.45, y: 0.5 },
      })
    ).toBe(false);
  });
});

describe("resolveInteractiveTarget", () => {
  it("returns the closest interactive ancestor", () => {
    document.body.innerHTML =
      '<button type="button" id="trigger"><span id="inner">Launch</span></button>';

    const inner = document.getElementById("inner");
    const trigger = document.getElementById("trigger");

    expect(resolveInteractiveTarget(inner)).toBe(trigger);
  });

  it("returns null for non-interactive elements", () => {
    document.body.innerHTML = '<div id="plain">Plain</div>';

    expect(resolveInteractiveTarget(document.getElementById("plain"))).toBeNull();
  });
});

describe("getHoverLabel", () => {
  it("prefers aria-label and falls back to text content", () => {
    document.body.innerHTML = `
      <button type="button" id="a" aria-label="Open Contact"></button>
      <a href="#projects" id="b">Projects</a>
    `;

    expect(getHoverLabel(document.getElementById("a"))).toBe("Open Contact");
    expect(getHoverLabel(document.getElementById("b"))).toBe("Projects");
  });
});
