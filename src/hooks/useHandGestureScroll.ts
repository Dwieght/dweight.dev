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
  detectForVideo: (
    video: HTMLVideoElement,
    timestamp: number
  ) => {
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

const fallbackNow = () => performance.now();
const fallbackRequestFrame = (callback: FrameRequestCallback) =>
  window.requestAnimationFrame(callback);
const fallbackCancelFrame = (id: number) => window.cancelAnimationFrame(id);

export function useHandGestureScroll({
  enabled,
  video,
  handLandmarker,
  scrollStepPx,
  historyWindowMs = 220,
  now,
  requestFrame,
  cancelFrame,
}: UseHandGestureScrollOptions) {
  const resolvedScrollStepPx =
    scrollStepPx ??
    (typeof window !== "undefined" ? Math.round(window.innerHeight * 0.45) : 0);
  const resolvedNow = now ?? fallbackNow;
  const resolvedRequestFrame = requestFrame ?? fallbackRequestFrame;
  const resolvedCancelFrame = cancelFrame ?? fallbackCancelFrame;
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

      if (
        !pause &&
        video.readyState >= 2 &&
        video.currentTime !== lastVideoTimeRef.current
      ) {
        lastVideoTimeRef.current = video.currentTime;
        const timestamp = resolvedNow();
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
              top:
                direction === "up"
                  ? resolvedScrollStepPx
                  : -resolvedScrollStepPx,
              behavior: "smooth",
            });
          }
        } else {
          historyRef.current = [];
        }
      }

      frameIdRef.current = resolvedRequestFrame(loop);
    };

    frameIdRef.current = resolvedRequestFrame(loop);

    return () => {
      if (frameIdRef.current !== null) {
        resolvedCancelFrame(frameIdRef.current);
      }
      historyRef.current = [];
      lastVideoTimeRef.current = -1;
    };
  }, [
    enabled,
    video,
    handLandmarker,
    historyWindowMs,
    resolvedScrollStepPx,
    resolvedNow,
    resolvedRequestFrame,
    resolvedCancelFrame,
  ]);

  return { lastGestureDirection };
}
