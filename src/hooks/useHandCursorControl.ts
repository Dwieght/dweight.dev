"use client";

import { useEffect, useRef, useState } from "react";
import {
  extractCursorGestureFrame,
  getHoverLabel,
  isPinchClosed,
  isTargetDisabled,
  mapNormalizedPointToViewport,
  resolveInteractiveTarget,
  resolveInteractiveTargetAtPoint,
  smoothCursorPoint,
  syncGestureHoveredElement,
  type CursorViewportPoint,
} from "@/lib/hand-cursor-control";
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

interface UseHandCursorControlOptions {
  enabled: boolean;
  video: HTMLVideoElement | null;
  handLandmarker: HandLandmarkerLike | null;
  now?: () => number;
  requestFrame?: (callback: FrameRequestCallback) => number;
  cancelFrame?: (id: number) => void;
  root?: Document;
  viewport?: {
    width: number;
    height: number;
  };
  getElementAtPoint?: (x: number, y: number) => Element | null;
  smoothingFactor?: number;
  pinchThreshold?: number;
  clickCooldownMs?: number;
}

const fallbackNow = () => performance.now();
const fallbackRequestFrame = (callback: FrameRequestCallback) =>
  window.requestAnimationFrame(callback);
const fallbackCancelFrame = (id: number) => window.cancelAnimationFrame(id);

export function useHandCursorControl({
  enabled,
  video,
  handLandmarker,
  now,
  requestFrame,
  cancelFrame,
  root,
  viewport,
  getElementAtPoint,
  smoothingFactor = 0.35,
  pinchThreshold = 0.06,
  clickCooldownMs = 450,
}: UseHandCursorControlOptions) {
  const viewportWidth =
    viewport?.width ?? (typeof window !== "undefined" ? window.innerWidth : 0);
  const viewportHeight =
    viewport?.height ?? (typeof window !== "undefined" ? window.innerHeight : 0);
  const resolvedNow = now ?? fallbackNow;
  const resolvedRequestFrame = requestFrame ?? fallbackRequestFrame;
  const resolvedCancelFrame = cancelFrame ?? fallbackCancelFrame;
  const [cursorPosition, setCursorPosition] = useState<CursorViewportPoint | null>(
    null
  );
  const [cursorVisible, setCursorVisible] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [isPinching, setIsPinching] = useState(false);
  const frameIdRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef(-1);
  const previousCursorRef = useRef<CursorViewportPoint | null>(null);
  const hoveredElementRef = useRef<HTMLElement | null>(null);
  const wasPinchedRef = useRef(false);
  const lastClickAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || !video || !handLandmarker) {
      hoveredElementRef.current = syncGestureHoveredElement(
        hoveredElementRef.current,
        null
      );
      previousCursorRef.current = null;
      lastVideoTimeRef.current = -1;
      wasPinchedRef.current = false;
      setCursorPosition(null);
      setCursorVisible(false);
      setHoveredLabel(null);
      setIsPinching(false);
      return;
    }

    let active = true;

    const clearCursor = () => {
      hoveredElementRef.current = syncGestureHoveredElement(
        hoveredElementRef.current,
        null
      );
      previousCursorRef.current = null;
      wasPinchedRef.current = false;
      setCursorPosition(null);
      setCursorVisible(false);
      setHoveredLabel(null);
      setIsPinching(false);
    };

    const loop = () => {
      const pause = shouldPauseGestureProcessing({
        enabled,
        visibilityState: document.visibilityState,
        dialogOpen: hasOpenDialog(),
      });

      if (pause) {
        clearCursor();
      } else if (
        video.readyState >= 2 &&
        video.currentTime !== lastVideoTimeRef.current
      ) {
        lastVideoTimeRef.current = video.currentTime;
        const timestamp = resolvedNow();
        const result = handLandmarker.detectForVideo(video, timestamp);
        const frame = extractCursorGestureFrame(result.landmarks);

        if (!frame) {
          clearCursor();
        } else {
          const targetPoint = mapNormalizedPointToViewport(
            frame.indexTip,
            {
              width: viewportWidth,
              height: viewportHeight,
            }
          );
          const nextCursor = smoothCursorPoint(
            previousCursorRef.current,
            targetPoint,
            smoothingFactor
          );
          previousCursorRef.current = nextCursor;
          setCursorPosition(nextCursor);
          setCursorVisible(true);

          const activeRoot = root ?? document;
          const hoveredTarget = getElementAtPoint
            ? resolveInteractiveTarget(
                getElementAtPoint(nextCursor.x, nextCursor.y)
              )
            : resolveInteractiveTargetAtPoint(
                activeRoot,
                nextCursor.x,
                nextCursor.y
              );

          hoveredElementRef.current = syncGestureHoveredElement(
            hoveredElementRef.current,
            hoveredTarget
          );
          setHoveredLabel(getHoverLabel(hoveredTarget));

          const pinched = isPinchClosed(frame, pinchThreshold);
          setIsPinching(pinched);

          if (
            pinched &&
            !wasPinchedRef.current &&
            hoveredTarget &&
            !isTargetDisabled(hoveredTarget) &&
            (lastClickAtRef.current === null ||
              timestamp - lastClickAtRef.current >= clickCooldownMs)
          ) {
            hoveredTarget.focus?.({ preventScroll: true });
            hoveredTarget.click();
            lastClickAtRef.current = timestamp;
          }

          wasPinchedRef.current = pinched;
        }
      }

      if (active) {
        frameIdRef.current = resolvedRequestFrame(loop);
      }
    };

    frameIdRef.current = resolvedRequestFrame(loop);

    return () => {
      active = false;
      if (frameIdRef.current !== null) {
        resolvedCancelFrame(frameIdRef.current);
      }
      hoveredElementRef.current = syncGestureHoveredElement(
        hoveredElementRef.current,
        null
      );
      previousCursorRef.current = null;
      lastVideoTimeRef.current = -1;
      wasPinchedRef.current = false;
    };
  }, [
    enabled,
    video,
    handLandmarker,
    root,
    getElementAtPoint,
    viewportWidth,
    viewportHeight,
    smoothingFactor,
    pinchThreshold,
    clickCooldownMs,
    resolvedNow,
    resolvedRequestFrame,
    resolvedCancelFrame,
  ]);

  return {
    cursorPosition,
    cursorVisible,
    hoveredLabel,
    isPinching,
  };
}
