import { act, renderHook, waitFor } from "@testing-library/react";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useHandGestureScroll } from "./useHandGestureScroll";

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

describe("useHandGestureScroll", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not scroll while disabled", () => {
    const scrollSpy = vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    const requestFrame = vi.fn();
    const video = createVideoElement();
    const detectForVideo = vi.fn();

    renderHook(() =>
      useHandGestureScroll({
        enabled: false,
        video,
        handLandmarker: {
          detectForVideo,
        },
        requestFrame,
      })
    );

    expect(scrollSpy).not.toHaveBeenCalled();
    expect(requestFrame).not.toHaveBeenCalled();
    expect(detectForVideo).not.toHaveBeenCalled();
  });

  it("does not throw during server render when window is unavailable", () => {
    function Probe() {
      useHandGestureScroll({
        enabled: false,
        video: null,
        handLandmarker: null,
      });

      return null;
    }

    const originalWindowDescriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      "window"
    );

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      writable: true,
      value: undefined,
    });

    try {
      expect(() => renderToString(createElement(Probe))).not.toThrow();
    } finally {
      if (originalWindowDescriptor) {
        Object.defineProperty(globalThis, "window", originalWindowDescriptor);
      }
    }
  });

  it("scrolls down when an upward swipe is detected", async () => {
    const scrollSpy = vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    const video = createVideoElement();
    const fillerPoint = { x: 0, y: 0 };
    const frames = [
      {
        landmarks: [
          [
            { x: 0.5, y: 0.72 },
            fillerPoint,
            fillerPoint,
            fillerPoint,
            fillerPoint,
            { x: 0.5, y: 0.69 },
            fillerPoint,
            fillerPoint,
            fillerPoint,
            { x: 0.5, y: 0.68 },
          ],
        ],
      },
      {
        landmarks: [
          [
            { x: 0.5, y: 0.57 },
            fillerPoint,
            fillerPoint,
            fillerPoint,
            fillerPoint,
            { x: 0.5, y: 0.55 },
            fillerPoint,
            fillerPoint,
            fillerPoint,
            { x: 0.5, y: 0.54 },
          ],
        ],
      },
      {
        landmarks: [
          [
            { x: 0.5, y: 0.42 },
            fillerPoint,
            fillerPoint,
            fillerPoint,
            fillerPoint,
            { x: 0.5, y: 0.4 },
            fillerPoint,
            fillerPoint,
            fillerPoint,
            { x: 0.5, y: 0.39 },
          ],
        ],
      },
    ];

    let frameIndex = 0;
    const callbacks: Array<FrameRequestCallback> = [];

    renderHook(() =>
      useHandGestureScroll({
        enabled: true,
        video,
        scrollStepPx: 420,
        handLandmarker: {
          detectForVideo: vi.fn(
            () => frames[Math.min(frameIndex, frames.length - 1)]
          ),
        },
        now: () => frameIndex * 80,
        requestFrame: (callback) => {
          callbacks.push(callback);
          return callbacks.length;
        },
        cancelFrame: vi.fn(),
      })
    );

    act(() => {
      for (let i = 0; i < 3; i += 1) {
        frameIndex = i;
        video.currentTime = i + 1;
        callbacks.shift()?.(performance.now());
      }
    });

    await waitFor(() =>
      expect(scrollSpy).toHaveBeenCalledWith({
        top: 420,
        behavior: "smooth",
      })
    );
  });

  it("does not restart the loop on prop-driven rerender when using default frame options", () => {
    let frameId = 0;
    const requestSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation(() => {
        frameId += 1;
        return frameId;
      });
    const cancelSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});
    const video = createVideoElement();
    const handLandmarker = { detectForVideo: vi.fn(() => ({})) };

    const { rerender } = renderHook(
      ({ enabled }) =>
        useHandGestureScroll({
          enabled,
          video,
          handLandmarker,
        }),
      {
        initialProps: { enabled: true },
      }
    );

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(cancelSpy).not.toHaveBeenCalled();

    rerender({ enabled: true });

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(cancelSpy).not.toHaveBeenCalled();
  });

  it("cancels the scheduled frame on unmount", () => {
    const video = createVideoElement();
    const requestFrame = vi.fn(() => 42);
    const cancelFrame = vi.fn();

    const { unmount } = renderHook(() =>
      useHandGestureScroll({
        enabled: true,
        video,
        handLandmarker: { detectForVideo: vi.fn(() => ({})) },
        requestFrame,
        cancelFrame,
      })
    );

    unmount();

    expect(requestFrame).toHaveBeenCalledTimes(1);
    expect(cancelFrame).toHaveBeenCalledWith(42);
  });
});
