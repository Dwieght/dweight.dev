import { afterEach, describe, expect, it } from "vitest";
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

  it("rejects environments without camera API support", () => {
    expect(
      isDesktopGestureEnvironment({
        innerWidth: 1440,
        hasFinePointer: true,
        hasCameraApi: false,
      })
    ).toBe(false);
  });

  it("rejects wide environments with a coarse pointer", () => {
    expect(
      isDesktopGestureEnvironment({
        innerWidth: 1440,
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

  it("pauses when the page is hidden", () => {
    expect(
      shouldPauseGestureProcessing({
        enabled: true,
        visibilityState: "hidden",
        dialogOpen: false,
      })
    ).toBe(true);
  });

  it("does not pause when enabled, visible, and no dialog is open", () => {
    expect(
      shouldPauseGestureProcessing({
        enabled: true,
        visibilityState: "visible",
        dialogOpen: false,
      })
    ).toBe(false);
  });
});

describe("hasOpenDialog", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("detects an open Radix dialog in the document", () => {
    document.body.innerHTML =
      '<div role="dialog" data-state="open">Certificate</div>';

    expect(hasOpenDialog()).toBe(true);
  });

  it("returns false when no dialog is open", () => {
    document.body.innerHTML =
      '<div role="dialog" data-state="closed">Certificate</div>';

    expect(hasOpenDialog()).toBe(false);
  });
});
