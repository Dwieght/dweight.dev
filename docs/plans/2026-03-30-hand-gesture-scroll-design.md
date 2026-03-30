# Hand Gesture Scroll Design

## Summary

Add desktop-only hand swipe scrolling to the live portfolio site. The site will request webcam access on page load, but scrolling will only activate when the user enables a visible Gesture Mode toggle. Upward and downward hand swipes will trigger stepped smooth scrolling on the main page.

## Goals

- Make gesture scrolling work on the deployed portfolio site.
- Keep normal scrolling and navigation fully functional.
- Avoid accidental scrolls from idle movement or random hand motion.
- Fail safely when camera access or gesture detection is unavailable.

## Non-Goals

- Mobile support in v1.
- Eye tracking in v1.
- Full-screen AR overlays or complex hand pose UI.
- Server-side video processing.

## Product Decisions

- Platform: desktop and laptop only.
- Activation: request camera permission on page load.
- Control mode: swipe up and swipe down gestures.
- Safety: gesture scrolling stays off until the user turns on Gesture Mode.
- Scroll behavior: each accepted swipe triggers one smooth stepped scroll.

## Implementation Approach

Use a browser-side webcam pipeline inside the existing Next.js client page rather than Python. The page will initialize camera access in the browser and run hand landmark detection client-side. Swipe interpretation will be implemented in app code so thresholds and cooldown behavior can be tuned for this page.

## Architecture

The landing page in `src/app/page.tsx` remains the integration point, but gesture logic is extracted into focused client modules:

- `GestureScrollController` component
- `useHandGestureScroll` hook

`GestureScrollController` owns:

- desktop-only gating
- camera permission and stream setup
- detector initialization lifecycle
- UI state for camera and Gesture Mode
- teardown on unmount

`useHandGestureScroll` owns:

- frame processing loop
- recent landmark history
- swipe detection logic
- cooldown enforcement
- dispatching `window.scrollBy()` calls

## UI Design

Add a compact floating panel on desktop near the existing right-side floating navigation. The panel shows:

- camera status: requesting, ready, blocked, unsupported, error
- Gesture Mode toggle
- compact webcam preview after permission is granted
- brief instruction text for swipe controls

The panel must not replace existing navigation. It is an optional enhancement layer.

## Data Flow

1. The page mounts on desktop or laptop.
2. The browser requests webcam access.
3. If permission is granted, the app starts a local video stream.
4. The detector processes video frames in the browser.
5. The hook tracks one hand and stores a short recent movement window.
6. When movement crosses the configured vertical swipe threshold, the hook classifies the gesture as up or down.
7. The app triggers a smooth stepped `window.scrollBy()` and enters cooldown.
8. Existing scroll listeners continue to update section highlighting and scroll-to-top behavior.

## Swipe Detection Rules

Gesture recognition should be conservative:

- use one detected hand only
- prefer a stable fingertip or palm reference point
- require minimum vertical travel
- require minimum movement speed
- reject mostly horizontal motion
- use a short cooldown after every accepted swipe
- ignore tiny jitter and resting movement

Initial implementation should tune for reliability over sensitivity.

## State Model

Suggested controller state:

- `unsupported`
- `requesting-permission`
- `permission-denied`
- `camera-ready`
- `detector-error`

Suggested interaction state:

- `gestureModeEnabled`
- `isProcessing`
- `lastGestureAt`
- `lastGestureDirection`

## Error Handling

- If camera permission is denied, show a non-blocking blocked state and leave the rest of the site unchanged.
- If detector initialization fails, disable gesture scrolling and show an error state in the panel.
- If browser capabilities are insufficient, hide or disable the feature cleanly.
- If the page unmounts, stop the camera stream and release detector resources.
- If the tab is hidden, pause processing until the tab becomes active again.
- If a modal or dialog is open, suspend gesture-driven scroll actions.

## Performance Considerations

- Run processing only on desktop/laptop.
- Skip work when Gesture Mode is off where possible.
- Keep the preview small.
- Cap detection frequency if continuous full-frame processing is too expensive.
- Avoid unnecessary React state updates from per-frame values.

## Accessibility And UX Notes

- The page must remain fully usable without camera access.
- The floating panel needs clear labels and visible state.
- Gesture controls should never trap users or replace standard input.
- If permission is denied, the rest of the experience should not degrade.

## Manual Test Plan

- Desktop happy path with permission granted.
- Desktop denied-permission path.
- Reload path after permission has already been granted.
- Reload path after permission has already been denied.
- Gesture Mode off with visible hand: no scrolling.
- Gesture Mode on with clear upward swipe: one downward page scroll step.
- Gesture Mode on with clear downward swipe: one upward page scroll step.
- Idle hand in frame: no scrolling.
- Horizontal hand movement: no scrolling.
- Existing navigation buttons still scroll correctly.
- Active section highlighting still updates.
- Scroll-to-top button still works.
- Certificate dialogs still open and are not disrupted by gesture scrolling.

## Risks

- Auto camera prompting may feel intrusive on first load.
- Browser support and webcam quality will vary.
- False positives are the main product risk.
- The main landing page file is already large, so isolation into new modules is important.

## Recommended Execution Order

1. Add dependencies and browser capability guards.
2. Create gesture controller component and hook.
3. Add floating desktop panel and toggle UI.
4. Wire detector output to swipe thresholds and stepped scrolling.
5. Add cleanup, pause conditions, and error states.
6. Run manual verification locally and on the deployed site.
