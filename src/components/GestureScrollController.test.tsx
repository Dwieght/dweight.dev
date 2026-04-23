import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GestureScrollController } from "./GestureScrollController";

const createMatchMedia = (finePointer: boolean) =>
  ((query: string) =>
    ({
      matches: query === "(pointer: fine)" ? finePointer : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }) as MediaQueryList);

const createStream = () =>
  ({
    getTracks: () => [{ stop: vi.fn() }],
  }) as unknown as MediaStream;

describe("GestureScrollController", () => {
  let originalPlay: typeof HTMLMediaElement.prototype.play;
  let originalMediaDevices: Navigator["mediaDevices"];

  beforeEach(() => {
    originalPlay = HTMLMediaElement.prototype.play;
    originalMediaDevices = navigator.mediaDevices;
    HTMLMediaElement.prototype.play = vi
      .fn()
      .mockResolvedValue(undefined) as typeof HTMLMediaElement.prototype.play;
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: vi.fn(),
      },
    });
  });

  afterEach(() => {
    HTMLMediaElement.prototype.play = originalPlay;
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: originalMediaDevices,
    });
    window.localStorage.clear();
  });

  it("shows an unsupported message outside desktop environments", () => {
    render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(false),
          getUserMedia: vi.fn(),
          createHandLandmarker: vi.fn(),
        }}
      />
    );

    expect(screen.getByText(/desktop only/i)).toBeInTheDocument();
  });

  it("shows an unsupported message when camera APIs are unavailable", () => {
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: undefined,
    });

    render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(true),
          getUserMedia: vi.fn(),
          createHandLandmarker: vi.fn(),
        }}
      />
    );

    expect(screen.getByText(/desktop only/i)).toBeInTheDocument();
  });

  it("shows a blocked state when camera access is denied", async () => {
    render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(true),
          getUserMedia: vi
            .fn()
            .mockRejectedValue(
              Object.assign(new Error("Denied"), { name: "NotAllowedError" })
            ),
          createHandLandmarker: vi.fn(),
        }}
      />
    );

    await waitFor(() =>
      expect(screen.getByText(/camera blocked/i)).toBeInTheDocument()
    );
  });

  it("reveals the gesture mode toggle after camera startup succeeds", async () => {
    render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(true),
          getUserMedia: vi.fn().mockResolvedValue(createStream()),
          createHandLandmarker: vi.fn().mockResolvedValue({
            detectForVideo: vi.fn(),
            close: vi.fn(),
          }),
        }}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /scroll mode off/i })
      ).toBeInTheDocument()
    );
  });

  it("lets the user switch into cursor mode", async () => {
    render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(true),
          getUserMedia: vi.fn().mockResolvedValue(createStream()),
          createHandLandmarker: vi.fn().mockResolvedValue({
            detectForVideo: vi.fn(),
            close: vi.fn(),
          }),
        }}
      />
    );

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Scroll" })).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: "Cursor" }));

    expect(
      screen.getByRole("button", { name: /cursor mode off/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/move your index finger to aim/i)
    ).toBeInTheDocument();
  });

  it("shows a compact how-it-works guide for the active mode", async () => {
    render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(true),
          getUserMedia: vi.fn().mockResolvedValue(createStream()),
          createHandLandmarker: vi.fn().mockResolvedValue({
            detectForVideo: vi.fn(),
            close: vi.fn(),
          }),
        }}
      />
    );

    await waitFor(() =>
      expect(screen.getByText(/how it works/i)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: /got it/i }));

    expect(screen.getByText(/show one hand in frame/i)).toBeInTheDocument();
    expect(screen.getByText(/swipe up to scroll down/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cursor" }));

    expect(
      screen.getByText(/move your index finger to steer the cursor/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/pinch thumb and index to click/i).length).toBe(
      2
    );
  });

  it("shows the first-run tutorial overlay once and persists dismissal", async () => {
    render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(true),
          getUserMedia: vi.fn().mockResolvedValue(createStream()),
          createHandLandmarker: vi.fn().mockResolvedValue({
            detectForVideo: vi.fn(),
            close: vi.fn(),
          }),
        }}
      />
    );

    await waitFor(() =>
      expect(screen.getByText(/gesture tutorial/i)).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: /got it/i }));

    await waitFor(() =>
      expect(screen.queryByText(/gesture tutorial/i)).not.toBeInTheDocument()
    );

    expect(window.localStorage.getItem("gesture-control-tutorial-dismissed")).toBe(
      "true"
    );
  });

  it("does not auto-open the tutorial overlay after it has been dismissed before", async () => {
    window.localStorage.setItem("gesture-control-tutorial-dismissed", "true");

    render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(true),
          getUserMedia: vi.fn().mockResolvedValue(createStream()),
          createHandLandmarker: vi.fn().mockResolvedValue({
            detectForVideo: vi.fn(),
            close: vi.fn(),
          }),
        }}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /scroll mode off/i })
      ).toBeInTheDocument()
    );

    expect(screen.queryByText(/gesture tutorial/i)).not.toBeInTheDocument();
  });

  it("closes detector and stops stream tracks on unmount", async () => {
    const stop = vi.fn();
    const close = vi.fn();
    const stream = {
      getTracks: () => [{ stop }],
    } as unknown as MediaStream;

    const { unmount } = render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(true),
          getUserMedia: vi.fn().mockResolvedValue(stream),
          createHandLandmarker: vi.fn().mockResolvedValue({
            detectForVideo: vi.fn(),
            close,
          }),
        }}
      />
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /scroll mode off/i })
      ).toBeInTheDocument()
    );

    unmount();

    expect(close).toHaveBeenCalledTimes(1);
    expect(stop).toHaveBeenCalledTimes(1);
  });
});
