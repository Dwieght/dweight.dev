# Hand Cursor Control Design

## Goal

Add a desktop-only virtual cursor mode to the existing webcam gesture controller so a user can move a page-level cursor with their index fingertip, hover targets, and pinch with thumb plus index to click interactive elements on the live site.

## Architecture

The existing `GestureScrollController` keeps ownership of camera permission, video stream lifecycle, and MediaPipe hand detection. Cursor mode will be added as a second interaction mode alongside the current scroll mode, reusing the same camera and detector instance instead of creating a second controller.

Scroll mode remains implemented by `useHandGestureScroll`. Cursor mode will be implemented in a new `useHandCursorControl` hook and supporting cursor-utility module so the two behaviors stay isolated and can be switched by mode without mixing gesture logic in one hook.

## Components And Data Flow

- `GestureScrollController`
  - Owns camera startup, permission states, shared video element, shared hand landmarker, and UI mode switching.
  - Renders a virtual cursor overlay when cursor mode is active and a hand is detected.
- `useHandGestureScroll`
  - Keeps current swipe-scroll behavior.
- `useHandCursorControl`
  - Reads hand landmarks frame-by-frame in cursor mode.
  - Maps the index fingertip into viewport coordinates.
  - Applies light smoothing to reduce jitter.
  - Uses thumb-index pinch transitions to fire a single click per pinch.
  - Resolves hovered/click targets with `document.elementFromPoint(...)` and an interactive ancestor lookup.
- Cursor utility module
  - Houses pinch detection, coordinate mapping, smoothing, interactive-target resolution, and hover-label helpers.

## Interaction Model

- `Scroll` mode
  - Existing upward/downward swipe behavior remains unchanged.
- `Cursor` mode
  - Index fingertip moves a page-level virtual cursor.
  - Thumb + index pinch start triggers click/select.
  - Open hand hovers only.
  - A short cooldown and pinch-edge detection prevent repeated clicks while the pinch is held.

## Guardrails

- Desktop and fine-pointer only, matching the existing gesture environment gate.
- One hand only.
- Cursor mode must be toggled on manually.
- No OS-level cursor movement; all behavior stays inside the page.
- Hover feedback uses app-controlled visual state rather than relying on native CSS `:hover`.
- Gesture processing pauses when the tab is hidden or a dialog is open.

## Failure Handling

- If camera permission is denied or MediaPipe fails, the site stays fully usable and the feature remains disabled.
- If no hand is detected in cursor mode, the virtual cursor hides and the hover target clears.
- If no interactive element exists under the cursor point, hover state clears and no click fires.

## Testing

- Unit tests for cursor math and pinch detection.
- Hook tests for cursor movement, hover target resolution, and single-click-on-pinch behavior.
- Controller tests for mode switching and cursor-mode UI states.
- Manual desktop browser checks for camera prompt, cursor overlay visibility, hover indication, nav/button clicks, and no regressions in scroll mode.
