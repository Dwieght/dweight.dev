# Hand Gesture Scroll Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add desktop-only webcam hand swipe scrolling to the landing page, with auto camera prompt, a visible Gesture Mode toggle, smooth stepped scrolling, and safe fallbacks when the camera or detector is unavailable.

**Architecture:** Keep the webcam and gesture logic out of the oversized home page by extracting a `GestureScrollController` component and a `useHandGestureScroll` hook. Put deterministic swipe math and runtime guards into pure utility modules so the fragile parts can be unit-tested without the camera.

**Tech Stack:** Next.js 13 App Router, React 18, TypeScript, Tailwind CSS, `@mediapipe/tasks-vision`, Vitest, Testing Library, jsdom

---

## Read This First

- `docs/plans/2026-03-30-hand-gesture-scroll-design.md`
- `package.json`
- `src/app/page.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/dialog.tsx`

### Task 1: Add Runtime And Test Dependencies

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

**Step 1: Install the MediaPipe runtime**

Run: `pnpm add @mediapipe/tasks-vision`

Expected: `package.json` and `pnpm-lock.yaml` update with the runtime dependency.

**Step 2: Install the browser test toolchain**

Run: `pnpm add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event`

Expected: the dev dependency list includes Vitest, jsdom, and Testing Library packages.

**Step 3: Add test scripts to `package.json`**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

**Step 4: Create `vitest.config.ts`**

```ts
/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    clearMocks: true,
  },
});
```

**Step 5: Create `src/test/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

**Step 6: Verify Vitest is available**

Run: `pnpm exec vitest --version`

Expected: a version string prints and the command exits successfully.

**Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts src/test/setup.ts
git commit -m "test: add gesture scroll test harness"
```

### Task 2: Build Swipe Classification Utilities

**Files:**
- Create: `src/lib/hand-gesture-scroll.ts`
- Create: `src/lib/hand-gesture-scroll.test.ts`

**Step 1: Write the failing tests**

```ts
import { describe, expect, it } from "vitest";
import {
  DEFAULT_SWIPE_CONFIG,
  classifySwipe,
  extractPrimaryHandPoint,
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
          [0.2, 0.5, 0],
          [0.35, 0.49, 80],
          [0.52, 0.48, 160],
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
      ])
    ).toEqual({ x: 0.5, y: 0.5833333333333334 });
  });
});
```

**Step 2: Run the tests and confirm failure**

Run: `pnpm exec vitest run src/lib/hand-gesture-scroll.test.ts`

Expected: FAIL because `src/lib/hand-gesture-scroll.ts` does not exist yet.

**Step 3: Implement `src/lib/hand-gesture-scroll.ts`**

```ts
export type SwipeDirection = "up" | "down";

export interface GesturePoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface HandLandmarkPoint {
  x: number;
  y: number;
}

export interface SwipeConfig {
  minSamples: number;
  minVerticalTravel: number;
  minVelocity: number;
  maxHorizontalTravel: number;
  cooldownMs: number;
}

export const DEFAULT_SWIPE_CONFIG: SwipeConfig = {
  minSamples: 3,
  minVerticalTravel: 0.14,
  minVelocity: 0.0008,
  maxHorizontalTravel: 0.08,
  cooldownMs: 900,
};

export function classifySwipe(
  history: GesturePoint[],
  lastGestureAt: number | null,
  config: SwipeConfig = DEFAULT_SWIPE_CONFIG
): SwipeDirection | null {
  if (history.length < config.minSamples) {
    return null;
  }

  const first = history[0];
  const last = history[history.length - 1];
  const elapsed = last.timestamp - first.timestamp;

  if (elapsed <= 0) {
    return null;
  }

  if (
    lastGestureAt !== null &&
    last.timestamp - lastGestureAt < config.cooldownMs
  ) {
    return null;
  }

  const verticalTravel = first.y - last.y;
  const horizontalTravel = Math.abs(last.x - first.x);
  const velocity = Math.abs(verticalTravel) / elapsed;

  if (Math.abs(verticalTravel) < config.minVerticalTravel) {
    return null;
  }

  if (horizontalTravel > config.maxHorizontalTravel) {
    return null;
  }

  if (velocity < config.minVelocity) {
    return null;
  }

  return verticalTravel > 0 ? "up" : "down";
}

export function trimGestureHistory(
  history: GesturePoint[],
  windowMs: number,
  now: number
): GesturePoint[] {
  return history.filter((point) => now - point.timestamp <= windowMs);
}

export function extractPrimaryHandPoint(
  hands?: HandLandmarkPoint[][]
): Omit<GesturePoint, "timestamp"> | null {
  const hand = hands?.[0];

  if (!hand || !hand[0] || !hand[5] || !hand[9]) {
    return null;
  }

  return {
    x: (hand[0].x + hand[5].x + hand[9].x) / 3,
    y: (hand[0].y + hand[5].y + hand[9].y) / 3,
  };
}
```

**Step 4: Run the tests and confirm success**

Run: `pnpm exec vitest run src/lib/hand-gesture-scroll.test.ts`

Expected: PASS for swipe detection and hand anchor extraction.

**Step 5: Commit**

```bash
git add src/lib/hand-gesture-scroll.ts src/lib/hand-gesture-scroll.test.ts
git commit -m "feat: add swipe classification utilities"
```

### Task 3: Build Runtime Guard Utilities

**Files:**
- Create: `src/lib/gesture-scroll-runtime.ts`
- Create: `src/lib/gesture-scroll-runtime.test.ts`

**Step 1: Write the failing tests**

```ts
import { describe, expect, it } from "vitest";
import {
  hasOpenDialog,
  isDesktopGestureEnvironment,
  shouldPauseGestureProcessing,
} from "./gesture-scroll-runtime";

describe("isDesktopGestureEnvironment", () => {
  it("accepts a large viewport with a fine pointer and camera support", () => {
    expect(
      isDesktopGestureEnvironment({
        innerWidth: 1440,
        hasFinePointer: true,
        hasCameraApi: true,
      })
    ).toBe(true);
  });

  it("rejects narrow or coarse-pointer environments", () => {
    expect(
      isDesktopGestureEnvironment({
        innerWidth: 768,
        hasFinePointer: false,
        hasCameraApi: true,
      })
    ).toBe(false);
  });
});

describe("shouldPauseGestureProcessing", () => {
  it("pauses when gesture mode is disabled", () => {
    expect(
      shouldPauseGestureProcessing({
        enabled: false,
        visibilityState: "visible",
        dialogOpen: false,
      })
    ).toBe(true);
  });

  it("pauses when a dialog is open", () => {
    expect(
      shouldPauseGestureProcessing({
        enabled: true,
        visibilityState: "visible",
        dialogOpen: true,
      })
    ).toBe(true);
  });
});

describe("hasOpenDialog", () => {
  it("detects an open Radix dialog in the document", () => {
    document.body.innerHTML =
      '<div role="dialog" data-state="open">Certificate</div>';

    expect(hasOpenDialog()).toBe(true);
  });
});
```

**Step 2: Run the tests and confirm failure**

Run: `pnpm exec vitest run src/lib/gesture-scroll-runtime.test.ts`

Expected: FAIL because the runtime helper module does not exist yet.

**Step 3: Implement `src/lib/gesture-scroll-runtime.ts`**

```ts
export interface DesktopGestureEnvironment {
  innerWidth: number;
  hasFinePointer: boolean;
  hasCameraApi: boolean;
}

export interface PauseGestureProcessingInput {
  enabled: boolean;
  visibilityState: DocumentVisibilityState;
  dialogOpen: boolean;
}

export function isDesktopGestureEnvironment(
  input: DesktopGestureEnvironment
): boolean {
  return input.innerWidth >= 1024 && input.hasFinePointer && input.hasCameraApi;
}

export function hasOpenDialog(root: ParentNode = document): boolean {
  return Boolean(root.querySelector('[role="dialog"][data-state="open"]'));
}

export function shouldPauseGestureProcessing(
  input: PauseGestureProcessingInput
): boolean {
  return (
    !input.enabled ||
    input.visibilityState !== "visible" ||
    input.dialogOpen
  );
}
```

**Step 4: Run the tests and confirm success**

Run: `pnpm exec vitest run src/lib/gesture-scroll-runtime.test.ts`

Expected: PASS for desktop gating and pause conditions.

**Step 5: Commit**

```bash
git add src/lib/gesture-scroll-runtime.ts src/lib/gesture-scroll-runtime.test.ts
git commit -m "feat: add gesture runtime guards"
```

### Task 4: Build The Gesture Controller Shell

**Files:**
- Create: `src/components/GestureScrollController.tsx`
- Create: `src/components/GestureScrollController.test.tsx`

**Step 1: Write the failing component tests**

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

  it("shows a blocked state when camera access is denied", async () => {
    render(
      <GestureScrollController
        services={{
          matchMedia: createMatchMedia(true),
          getUserMedia: vi
            .fn()
            .mockRejectedValue(Object.assign(new Error("Denied"), { name: "NotAllowedError" })),
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
      expect(screen.getByRole("button", { name: /gesture mode off/i })).toBeInTheDocument()
    );
  });
});
```

**Step 2: Run the tests and confirm failure**

Run: `pnpm exec vitest run src/components/GestureScrollController.test.tsx`

Expected: FAIL because the controller component does not exist yet.

**Step 3: Implement `src/components/GestureScrollController.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Hand, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHandGestureScroll } from "@/hooks/useHandGestureScroll";
import { isDesktopGestureEnvironment } from "@/lib/gesture-scroll-runtime";

type CameraState =
  | "unsupported"
  | "requesting-permission"
  | "permission-denied"
  | "camera-ready"
  | "detector-error";

type HandLandmarkerLike = {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => {
    landmarks?: Array<Array<{ x: number; y: number }>>;
  };
  close?: () => void;
};

type GestureServices = {
  matchMedia: (query: string) => MediaQueryList;
  getUserMedia: (constraints: MediaStreamConstraints) => Promise<MediaStream>;
  createHandLandmarker: () => Promise<HandLandmarkerLike>;
};

const WASM_ROOT =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const MODEL_ASSET_PATH =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

const defaultServices: GestureServices = {
  matchMedia: (query) => window.matchMedia(query),
  getUserMedia: (constraints) => navigator.mediaDevices.getUserMedia(constraints),
  createHandLandmarker: async () => {
    const { FilesetResolver, HandLandmarker } = await import(
      "@mediapipe/tasks-vision"
    );

    const vision = await FilesetResolver.forVisionTasks(WASM_ROOT);

    return HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MODEL_ASSET_PATH,
      },
      runningMode: "VIDEO",
      numHands: 1,
      minHandDetectionConfidence: 0.6,
      minHandPresenceConfidence: 0.6,
      minTrackingConfidence: 0.6,
    });
  },
};

interface GestureScrollControllerProps {
  services?: GestureServices;
}

export function GestureScrollController({
  services = defaultServices,
}: GestureScrollControllerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>(
    "requesting-permission"
  );
  const [gestureModeEnabled, setGestureModeEnabled] = useState(false);
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarkerLike | null>(
    null
  );

  useEffect(() => {
    const supported = isDesktopGestureEnvironment({
      innerWidth: window.innerWidth,
      hasFinePointer: services.matchMedia("(pointer: fine)").matches,
      hasCameraApi: Boolean(navigator.mediaDevices?.getUserMedia),
    });

    if (!supported) {
      setCameraState("unsupported");
      return;
    }

    let active = true;

    async function bootCamera() {
      try {
        const stream = await services.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
          audio: false,
        });

        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }

        const detector = await services.createHandLandmarker();

        if (!active) {
          detector.close?.();
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        setHandLandmarker(detector);
        setCameraState("camera-ready");
      } catch (error) {
        const name = error instanceof Error ? error.name : "";
        setCameraState(
          name === "NotAllowedError" ? "permission-denied" : "detector-error"
        );
      }
    }

    void bootCamera();

    return () => {
      active = false;
      handLandmarker?.close?.();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [services]);

  useHandGestureScroll({
    enabled: cameraState === "camera-ready" && gestureModeEnabled,
    video: videoRef.current,
    handLandmarker,
  });

  return (
    <Card className="w-64 border-white/20 bg-white/90 shadow-xl backdrop-blur-xl dark:border-slate-700/30 dark:bg-slate-800/90">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Hand className="h-4 w-4" />
          Gesture Scroll
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-900/60">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="aspect-video w-full rounded-lg object-cover"
          />
        </div>

        {cameraState === "requesting-permission" && (
          <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Loader2 className="h-4 w-4 animate-spin" />
            Requesting camera access...
          </p>
        )}

        {cameraState === "unsupported" && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Desktop only. Gesture scroll is hidden on mobile and coarse-pointer devices.
          </p>
        )}

        {cameraState === "permission-denied" && (
          <p className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-300">
            <CameraOff className="h-4 w-4" />
            Camera blocked. Normal scrolling still works.
          </p>
        )}

        {cameraState === "detector-error" && (
          <p className="text-sm text-amber-600 dark:text-amber-300">
            Gesture detector unavailable. Normal scrolling still works.
          </p>
        )}

        {cameraState === "camera-ready" && (
          <>
            <p className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-300">
              <Camera className="h-4 w-4" />
              Camera ready
            </p>
            <Button
              type="button"
              onClick={() => setGestureModeEnabled((value) => !value)}
              className="w-full"
              variant={gestureModeEnabled ? "default" : "outline"}
              aria-pressed={gestureModeEnabled}
            >
              {gestureModeEnabled ? "Gesture Mode On" : "Gesture Mode Off"}
            </Button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Swipe your hand up or down in the preview to scroll.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
```

**Step 4: Run the tests and confirm success**

Run: `pnpm exec vitest run src/components/GestureScrollController.test.tsx`

Expected: PASS for unsupported, blocked, and ready states.

**Step 5: Commit**

```bash
git add src/components/GestureScrollController.tsx src/components/GestureScrollController.test.tsx
git commit -m "feat: add gesture controller shell"
```

### Task 5: Build The Scrolling Hook

**Files:**
- Create: `src/hooks/useHandGestureScroll.ts`
- Create: `src/hooks/useHandGestureScroll.test.ts`

**Step 1: Write the failing hook tests**

```ts
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
  it("does not scroll while disabled", () => {
    const scrollSpy = vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    const video = createVideoElement();

    renderHook(() =>
      useHandGestureScroll({
        enabled: false,
        video,
        handLandmarker: {
          detectForVideo: vi.fn(),
        },
      })
    );

    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it("scrolls down when an upward swipe is detected", async () => {
    const scrollSpy = vi.spyOn(window, "scrollBy").mockImplementation(() => {});
    const video = createVideoElement();
    const frames = [
      { landmarks: [[{ x: 0.5, y: 0.72 }, {}, {}, {}, {}, { x: 0.5, y: 0.69 }, {}, {}, {}, { x: 0.5, y: 0.68 }]] },
      { landmarks: [[{ x: 0.5, y: 0.57 }, {}, {}, {}, {}, { x: 0.5, y: 0.55 }, {}, {}, {}, { x: 0.5, y: 0.54 }]] },
      { landmarks: [[{ x: 0.5, y: 0.42 }, {}, {}, {}, {}, { x: 0.5, y: 0.4 }, {}, {}, {}, { x: 0.5, y: 0.39 }]] },
    ];

    let frameIndex = 0;
    const callbacks: Array<FrameRequestCallback> = [];

    renderHook(() =>
      useHandGestureScroll({
        enabled: true,
        video,
        scrollStepPx: 420,
        handLandmarker: {
          detectForVideo: vi.fn(() => frames[Math.min(frameIndex, frames.length - 1)]),
        },
        now: () => frameIndex * 80,
        requestFrame: (callback) => {
          callbacks.push(callback);
          return callbacks.length;
        },
        cancelFrame: vi.fn(),
      })
    );

    for (let i = 0; i < 3; i += 1) {
      frameIndex = i;
      video.currentTime = i + 1;
      callbacks.shift()?.(performance.now());
    }

    await waitFor(() =>
      expect(scrollSpy).toHaveBeenCalledWith({
        top: 420,
        behavior: "smooth",
      })
    );
  });
});
```

**Step 2: Run the tests and confirm failure**

Run: `pnpm exec vitest run src/hooks/useHandGestureScroll.test.ts`

Expected: FAIL because the hook does not exist yet.

**Step 3: Implement `src/hooks/useHandGestureScroll.ts`**

```ts
"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_SWIPE_CONFIG,
  classifySwipe,
  extractPrimaryHandPoint,
  trimGestureHistory,
  type GesturePoint,
  type SwipeDirection,
} from "@/lib/hand-gesture-scroll";
import {
  hasOpenDialog,
  shouldPauseGestureProcessing,
} from "@/lib/gesture-scroll-runtime";

type HandLandmarkerLike = {
  detectForVideo: (video: HTMLVideoElement, timestamp: number) => {
    landmarks?: Array<Array<{ x: number; y: number }>>;
  };
};

interface UseHandGestureScrollOptions {
  enabled: boolean;
  video: HTMLVideoElement | null;
  handLandmarker: HandLandmarkerLike | null;
  scrollStepPx?: number;
  historyWindowMs?: number;
  now?: () => number;
  requestFrame?: (callback: FrameRequestCallback) => number;
  cancelFrame?: (id: number) => void;
}

export function useHandGestureScroll({
  enabled,
  video,
  handLandmarker,
  scrollStepPx = Math.round(window.innerHeight * 0.45),
  historyWindowMs = 220,
  now = () => performance.now(),
  requestFrame = (callback) => window.requestAnimationFrame(callback),
  cancelFrame = (id) => window.cancelAnimationFrame(id),
}: UseHandGestureScrollOptions) {
  const [lastGestureDirection, setLastGestureDirection] =
    useState<SwipeDirection | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const historyRef = useRef<GesturePoint[]>([]);
  const lastGestureAtRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);

  useEffect(() => {
    if (!enabled || !video || !handLandmarker) {
      return;
    }

    const loop = () => {
      const pause = shouldPauseGestureProcessing({
        enabled,
        visibilityState: document.visibilityState,
        dialogOpen: hasOpenDialog(),
      });

      if (!pause && video.readyState >= 2 && video.currentTime !== lastVideoTimeRef.current) {
        lastVideoTimeRef.current = video.currentTime;
        const timestamp = now();
        const result = handLandmarker.detectForVideo(video, timestamp);
        const point = extractPrimaryHandPoint(result.landmarks);

        if (point) {
          historyRef.current = trimGestureHistory(
            [...historyRef.current, { ...point, timestamp }],
            historyWindowMs,
            timestamp
          );

          const direction = classifySwipe(
            historyRef.current,
            lastGestureAtRef.current,
            DEFAULT_SWIPE_CONFIG
          );

          if (direction) {
            lastGestureAtRef.current = timestamp;
            historyRef.current = [];
            setLastGestureDirection(direction);
            window.scrollBy({
              top: direction === "up" ? scrollStepPx : -scrollStepPx,
              behavior: "smooth",
            });
          }
        } else {
          historyRef.current = [];
        }
      }

      frameIdRef.current = requestFrame(loop);
    };

    frameIdRef.current = requestFrame(loop);

    return () => {
      if (frameIdRef.current !== null) {
        cancelFrame(frameIdRef.current);
      }
      historyRef.current = [];
      lastVideoTimeRef.current = -1;
    };
  }, [
    enabled,
    video,
    handLandmarker,
    historyWindowMs,
    scrollStepPx,
    now,
    requestFrame,
    cancelFrame,
  ]);

  return { lastGestureDirection };
}
```

**Step 4: Run the tests and confirm success**

Run: `pnpm exec vitest run src/hooks/useHandGestureScroll.test.ts`

Expected: PASS for disabled and upward-swipe scenarios.

**Step 5: Commit**

```bash
git add src/hooks/useHandGestureScroll.ts src/hooks/useHandGestureScroll.test.ts
git commit -m "feat: add hand gesture scrolling hook"
```

### Task 6: Integrate The Controller Into The Landing Page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Add the controller import**

```tsx
import { GestureScrollController } from "@/components/GestureScrollController";
```

**Step 2: Replace the single floating nav wrapper with a stacked desktop rail**

```tsx
<div className="fixed top-20 right-5 z-50 hidden lg:flex flex-col gap-4 print:hidden">
  <GestureScrollController />

  <nav>
    <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-xl p-2">
      <div className="flex flex-col gap-1">
        {["about", "projects", "skills", "certificates", "contact"].map(
          (item) => (
            <button
              key={item}
              onClick={() => {
                document
                  .getElementById(item)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`p-3 rounded-xl transition-all duration-200 group relative ${
                activeSection === item
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {/* existing icons stay as-is */}
            </button>
          )
        )}
      </div>
    </div>
  </nav>
</div>
```

**Step 3: Keep all existing page scroll logic intact**

Do not replace the existing `window.scrollTo`, `scrollIntoView`, section tracking, or scroll-to-top code. Gesture scroll should feed the same page-level scroll system.

**Step 4: Run the automated checks**

Run: `pnpm exec vitest run`

Expected: PASS for all new unit and component tests.

Run: `pnpm lint`

Expected: PASS with no new lint errors.

**Step 5: Run the local manual verification**

Run: `pnpm dev`

Expected manual checks:
- camera prompt appears on desktop page load
- denied permission leaves the site usable
- Gesture Mode defaults to off
- upward hand swipe scrolls down once
- downward hand swipe scrolls up once
- idle hand does not trigger scrolling
- certificate dialogs pause gesture scrolling
- nav buttons and scroll-to-top still behave normally

**Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: integrate hand gesture scroll controller"
```

### Task 7: Final Verification Before Merge

**Files:**
- Modify: none

**Step 1: Run the full verification pass**

Run: `pnpm exec vitest run && pnpm lint && pnpm build`

Expected: all tests pass, lint passes, and the production build succeeds.

**Step 2: Verify the worktree is clean except for expected user changes**

Run: `git status --short`

Expected: only the feature changes are staged or committed; unrelated pre-existing files remain untouched.

**Step 3: Record deployment notes**

Write down:
- browsers tested
- whether auto-prompting felt acceptable
- any false-positive thresholds that were adjusted
- whether remote MediaPipe assets should be moved into `public/` later

**Step 4: Commit if final cleanup changed anything**

```bash
git add .
git commit -m "chore: finalize gesture scroll verification"
```
