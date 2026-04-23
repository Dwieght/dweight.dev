import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useHandCursorControl } from "./useHandCursorControl";

function createVideoElement() {
  const video = document.createElement("video");
  let currentTime = 0;

  Object.defineProperty(video, "readyState", {
    configurable: true,
    get: () => 4,
  });

  Object.defineProperty(video, "currentTime", {
    configurable: true,
    get: () => currentTime,
    set: (value: number) => {
      currentTime = value;
    },
  });

  return video;
}

function createHand({
  thumbTip,
  indexTip,
}: {
  thumbTip: { x: number; y: number };
  indexTip: { x: number; y: number };
}) {
  const points = Array.from({ length: 21 }, () => ({ x: 0, y: 0 }));
  points[4] = thumbTip;
  points[8] = indexTip;
  return [points];
}

describe("useHandCursorControl", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("stays idle while disabled", () => {
    const requestFrame = vi.fn();
    const video = createVideoElement();
    const detectForVideo = vi.fn();

    const { result } = renderHook(() =>
      useHandCursorControl({
        enabled: false,
        video,
        handLandmarker: { detectForVideo },
        requestFrame,
      })
    );

    expect(requestFrame).not.toHaveBeenCalled();
    expect(detectForVideo).not.toHaveBeenCalled();
    expect(result.current.cursorVisible).toBe(false);
  });

  it("shows the virtual cursor and hovered label from index fingertip movement", async () => {
    const target = document.createElement("button");
    target.type = "button";
    target.setAttribute("aria-label", "Projects");
    document.body.appendChild(target);

    const video = createVideoElement();
    const callbacks: Array<FrameRequestCallback> = [];
    const getElementAtPoint = vi.fn(() => target);
    const cancelFrame = vi.fn();
    const handLandmarker = {
      detectForVideo: vi.fn(() => ({
        landmarks: [
          createHand({
            thumbTip: { x: 0.58, y: 0.5 },
            indexTip: { x: 0.25, y: 0.4 },
          })[0],
        ],
      })),
    };
    const requestFrame = (callback: FrameRequestCallback) => {
      callbacks.push(callback);
      return callbacks.length;
    };

    const { result } = renderHook(() =>
      useHandCursorControl({
        enabled: true,
        video,
        handLandmarker,
        viewport: { width: 1200, height: 800 },
        smoothingFactor: 1,
        getElementAtPoint,
        requestFrame,
        cancelFrame,
      })
    );

    act(() => {
      video.currentTime = 1;
      callbacks.shift()?.(performance.now());
    });

    await waitFor(() => expect(result.current.cursorVisible).toBe(true));

    expect(result.current.cursorPosition).toEqual({ x: 900, y: 320 });
    expect(result.current.hoveredLabel).toBe("Projects");
    expect(target.dataset.gestureHovered).toBe("true");
  });

  it("fires a single click when a pinch starts and does not repeat while the pinch stays closed", async () => {
    const target = document.createElement("button");
    target.type = "button";
    target.textContent = "Open";
    const clickSpy = vi.fn();
    target.addEventListener("click", clickSpy);
    document.body.appendChild(target);

    const video = createVideoElement();
    const callbacks: Array<FrameRequestCallback> = [];
    const frames = [
      createHand({
        thumbTip: { x: 0.62, y: 0.52 },
        indexTip: { x: 0.25, y: 0.38 },
      })[0],
      createHand({
        thumbTip: { x: 0.29, y: 0.39 },
        indexTip: { x: 0.25, y: 0.38 },
      })[0],
      createHand({
        thumbTip: { x: 0.28, y: 0.39 },
        indexTip: { x: 0.25, y: 0.38 },
      })[0],
    ];
    let frameIndex = 0;
    const getElementAtPoint = vi.fn(() => target);
    const cancelFrame = vi.fn();
    const handLandmarker = {
      detectForVideo: vi.fn(() => ({
        landmarks: [frames[Math.min(frameIndex, frames.length - 1)]],
      })),
    };
    const requestFrame = (callback: FrameRequestCallback) => {
      callbacks.push(callback);
      return callbacks.length;
    };

    renderHook(() =>
      useHandCursorControl({
        enabled: true,
        video,
        handLandmarker,
        viewport: { width: 1200, height: 800 },
        smoothingFactor: 1,
        getElementAtPoint,
        requestFrame,
        cancelFrame,
        now: () => frameIndex * 80,
      })
    );

    act(() => {
      for (let i = 0; i < 3; i += 1) {
        frameIndex = i;
        video.currentTime = i + 1;
        callbacks.shift()?.(performance.now());
      }
    });

    await waitFor(() => expect(clickSpy).toHaveBeenCalledTimes(1));
  });

  it("removes hover state on unmount", async () => {
    const target = document.createElement("button");
    target.type = "button";
    target.textContent = "Contact";
    document.body.appendChild(target);

    const video = createVideoElement();
    const callbacks: Array<FrameRequestCallback> = [];
    const getElementAtPoint = vi.fn(() => target);
    const cancelFrame = vi.fn();
    const handLandmarker = {
      detectForVideo: vi.fn(() => ({
        landmarks: [
          createHand({
            thumbTip: { x: 0.57, y: 0.52 },
            indexTip: { x: 0.31, y: 0.42 },
          })[0],
        ],
      })),
    };
    const requestFrame = (callback: FrameRequestCallback) => {
      callbacks.push(callback);
      return callbacks.length;
    };

    const { unmount } = renderHook(() =>
      useHandCursorControl({
        enabled: true,
        video,
        handLandmarker,
        viewport: { width: 1000, height: 700 },
        smoothingFactor: 1,
        getElementAtPoint,
        requestFrame,
        cancelFrame,
      })
    );

    act(() => {
      video.currentTime = 1;
      callbacks.shift()?.(performance.now());
    });

    await waitFor(() => expect(target.dataset.gestureHovered).toBe("true"));

    unmount();

    expect(target.dataset.gestureHovered).toBeUndefined();
  });
});
