"use client";

import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Hand, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHandCursorControl } from "@/hooks/useHandCursorControl";
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

type InteractionMode = "scroll" | "cursor";

const TUTORIAL_STORAGE_KEY = "gesture-control-tutorial-dismissed";
const TUTORIAL_COPY: Record<
  InteractionMode,
  { eyebrow: string; title: string; steps: string[] }
> = {
  scroll: {
    eyebrow: "Scroll tutorial",
    title: "Use swipes to move through the page",
    steps: [
      "Show one hand in frame",
      "Turn Scroll Mode On",
      "Swipe up to scroll down",
      "Swipe down to scroll up",
    ],
  },
  cursor: {
    eyebrow: "Cursor tutorial",
    title: "Use fingertip aim and pinch clicks",
    steps: [
      "Show one hand in frame",
      "Turn Cursor Mode On",
      "Move your index finger to steer the cursor",
      "Pinch thumb and index to click",
    ],
  },
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
  const handLandmarkerRef = useRef<HandLandmarkerLike | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>(
    "requesting-permission"
  );
  const [gestureModeEnabled, setGestureModeEnabled] = useState(false);
  const [interactionMode, setInteractionMode] =
    useState<InteractionMode>("scroll");
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarkerLike | null>(
    null
  );
  const [hasDismissedTutorial, setHasDismissedTutorial] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setHasDismissedTutorial(
      window.localStorage.getItem(TUTORIAL_STORAGE_KEY) === "true"
    );
  }, []);

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
          try {
            await videoRef.current.play();
          } catch {
            // Some environments cannot autoplay video.
          }
        }

        const detector = await services.createHandLandmarker();

        if (!active) {
          detector.close?.();
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        handLandmarkerRef.current = detector;
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
      handLandmarkerRef.current?.close?.();
      handLandmarkerRef.current = null;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [services]);

  useEffect(() => {
    if (cameraState === "camera-ready" && !hasDismissedTutorial) {
      setShowTutorial(true);
      return;
    }

    if (cameraState !== "camera-ready") {
      setShowTutorial(false);
    }
  }, [cameraState, hasDismissedTutorial]);

  useHandGestureScroll({
    enabled:
      cameraState === "camera-ready" &&
      gestureModeEnabled &&
      interactionMode === "scroll",
    video: videoRef.current,
    handLandmarker,
  });

  const { cursorPosition, cursorVisible, hoveredLabel, isPinching } =
    useHandCursorControl({
      enabled:
        cameraState === "camera-ready" &&
        gestureModeEnabled &&
        interactionMode === "cursor",
      video: videoRef.current,
      handLandmarker,
    });

  const modeName = interactionMode === "scroll" ? "Scroll" : "Cursor";
  const tutorial = TUTORIAL_COPY[interactionMode];
  const helperText =
    interactionMode === "scroll"
      ? "Swipe your hand up or down in the preview to scroll."
      : "Move your index finger to aim. Pinch thumb and index to click.";
  const cursorStatus =
    !gestureModeEnabled
      ? "Enable cursor mode to start controlling the virtual cursor."
      : !cursorVisible
        ? "Show one hand in the frame to reveal the cursor."
        : hoveredLabel
          ? `Hovering ${hoveredLabel}`
          : isPinching
            ? "Pinch detected"
            : "Pinch to click";
  const dismissTutorial = () => {
    setShowTutorial(false);
    setHasDismissedTutorial(true);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(TUTORIAL_STORAGE_KEY, "true");
    }
  };

  return (
    <>
      {cameraState === "camera-ready" && showTutorial && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/45 p-6 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            data-state="open"
            className="w-full max-w-md rounded-3xl border border-white/20 bg-white/95 p-6 text-slate-900 shadow-2xl dark:border-slate-700/40 dark:bg-slate-900/95 dark:text-slate-50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">
              Gesture Tutorial
            </p>
            <h3 className="mt-2 text-2xl font-semibold">{tutorial.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              The camera preview mirrors your hand, so move naturally while
              watching the guide below.
            </p>
            <div className="mt-5 space-y-3">
              {tutorial.steps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-2xl bg-slate-100/90 px-3 py-3 dark:bg-slate-800/80"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm text-slate-700 dark:text-slate-200">
                    {step}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This tutorial appears once. The quick guide stays in the card.
              </p>
              <Button type="button" onClick={dismissTutorial}>
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}

      {cameraState === "camera-ready" &&
        interactionMode === "cursor" &&
        gestureModeEnabled &&
        cursorVisible &&
        cursorPosition && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed z-[70]"
            style={{
              left: cursorPosition.x,
              top: cursorPosition.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-150 ${
                isPinching
                  ? "scale-90 border-emerald-500 bg-emerald-500/25 shadow-[0_0_0_10px_rgba(16,185,129,0.18)]"
                  : "border-sky-500 bg-white/70 shadow-[0_0_0_10px_rgba(14,165,233,0.18)]"
              }`}
            >
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  isPinching ? "bg-emerald-500" : "bg-sky-500"
                }`}
              />
            </div>
          </div>
        )}

      <Card className="w-64 border-white/20 bg-white/90 shadow-xl backdrop-blur-xl dark:border-slate-700/30 dark:bg-slate-800/90">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Hand className="h-4 w-4" />
            Gesture Control
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
              style={{ transform: "scaleX(-1)" }}
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
              Desktop only. Gesture controls are hidden on mobile and
              coarse-pointer devices.
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
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={interactionMode === "scroll" ? "default" : "outline"}
                  aria-pressed={interactionMode === "scroll"}
                  onClick={() => setInteractionMode("scroll")}
                >
                  Scroll
                </Button>
                <Button
                  type="button"
                  variant={interactionMode === "cursor" ? "default" : "outline"}
                  aria-pressed={interactionMode === "cursor"}
                  onClick={() => setInteractionMode("cursor")}
                >
                  Cursor
                </Button>
              </div>
              <Button
                type="button"
                onClick={() => setGestureModeEnabled((value) => !value)}
                className="w-full"
                variant={gestureModeEnabled ? "default" : "outline"}
                aria-pressed={gestureModeEnabled}
              >
                {gestureModeEnabled ? `${modeName} Mode On` : `${modeName} Mode Off`}
              </Button>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {helperText}
              </p>
              <div className="rounded-2xl border border-sky-200/70 bg-sky-50/80 p-3 dark:border-sky-800/60 dark:bg-sky-950/30">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-300">
                  How It Works
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {tutorial.eyebrow}
                </p>
                <div className="mt-3 space-y-2">
                  {tutorial.steps.map((step, index) => (
                    <div key={step} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-semibold text-white">
                        {index + 1}
                      </span>
                      <p className="text-xs leading-5 text-slate-700 dark:text-slate-200">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {interactionMode === "cursor" && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {cursorStatus}
                </p>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
