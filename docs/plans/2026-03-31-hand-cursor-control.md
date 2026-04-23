# Hand Cursor Control Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a desktop webcam-driven cursor mode that moves a virtual cursor with the index fingertip and clicks via thumb-index pinch while preserving the existing gesture scroll mode.

**Architecture:** Extend the existing camera controller with a mode switch and a second hook dedicated to cursor interaction. Keep cursor math, pinch detection, and target resolution in a separate utility module so scroll and cursor logic stay independent and easy to test.

**Tech Stack:** Next.js 13, React 18, TypeScript, MediaPipe Hand Landmarker, Vitest, Testing Library

---

### Task 1: Add Cursor Utility Tests

**Files:**
- Create: `src/lib/hand-cursor-control.test.ts`
- Create: `src/lib/hand-cursor-control.ts`

**Step 1: Write the failing tests**

Add tests for:
- mapping a normalized fingertip point into viewport coordinates
- detecting a closed pinch from thumb and index landmarks
- resolving an interactive ancestor from a DOM target
- preventing repeated clicks while pinch state remains closed

**Step 2: Run test to verify it fails**

Run: `pnpm test -- src/lib/hand-cursor-control.test.ts`
Expected: FAIL because `src/lib/hand-cursor-control.ts` does not exist yet.

**Step 3: Write minimal implementation**

Implement:
- viewport mapping helper
- pinch-threshold helper
- interactive-target resolver
- basic cursor state helpers used by the hook

**Step 4: Run test to verify it passes**

Run: `pnpm test -- src/lib/hand-cursor-control.test.ts`
Expected: PASS

### Task 2: Add Cursor Hook Tests

**Files:**
- Create: `src/hooks/useHandCursorControl.test.ts`
- Create: `src/hooks/useHandCursorControl.ts`
- Modify: `src/lib/hand-cursor-control.ts`

**Step 1: Write the failing tests**

Add tests for:
- hidden cursor when disabled
- cursor position update from index fingertip data
- hover target lookup with `elementFromPoint`
- single click firing on pinch start
- no repeated clicks while pinch stays closed

**Step 2: Run test to verify it fails**

Run: `pnpm test -- src/hooks/useHandCursorControl.test.ts`
Expected: FAIL because `useHandCursorControl` does not exist yet.

**Step 3: Write minimal implementation**

Implement the hook with:
- requestAnimationFrame loop
- hand landmark extraction for thumb and index tip
- cursor visibility and position state
- hover target lookup
- pinch-edge click logic
- cleanup on unmount

**Step 4: Run test to verify it passes**

Run: `pnpm test -- src/hooks/useHandCursorControl.test.ts`
Expected: PASS

### Task 3: Extend Gesture Controller UI

**Files:**
- Modify: `src/components/GestureScrollController.tsx`
- Modify: `src/components/GestureScrollController.test.tsx`

**Step 1: Write the failing tests**

Add tests for:
- mode toggle rendering when camera is ready
- switching between scroll and cursor labels
- rendering the cursor overlay/status only in cursor mode

**Step 2: Run test to verify it fails**

Run: `pnpm test -- src/components/GestureScrollController.test.tsx`
Expected: FAIL because cursor mode UI is missing.

**Step 3: Write minimal implementation**

Update the controller to:
- keep one shared camera/detector lifecycle
- add `scroll` / `cursor` mode state
- enable only one hook at a time
- render a virtual cursor overlay and cursor status text

**Step 4: Run test to verify it passes**

Run: `pnpm test -- src/components/GestureScrollController.test.tsx`
Expected: PASS

### Task 4: Integrate Cursor Hover Feedback

**Files:**
- Modify: `src/app/page.tsx` only if required for a top-level overlay/container
- Modify: `src/app/globals.css`
- Modify: `src/components/GestureScrollController.tsx`

**Step 1: Write the failing test**

Add or extend tests to verify the hovered target receives app-controlled visual feedback metadata.

**Step 2: Run test to verify it fails**

Run: `pnpm test`
Expected: FAIL because hover feedback is not applied yet.

**Step 3: Write minimal implementation**

Implement:
- `data-gesture-hovered` or equivalent hover metadata on the active target
- cursor overlay styling in globals
- cleanup to remove the hover marker when the target changes or cursor mode stops

**Step 4: Run test to verify it passes**

Run: `pnpm test`
Expected: PASS

### Task 5: Full Verification

**Files:**
- Modify: `pnpm-lock.yaml` if dependency graph changes

**Step 1: Run the full automated checks**

Run:
- `pnpm test`
- `pnpm exec tsc --noEmit --pretty false`
- `pnpm build`

**Step 2: Fix only merge-specific failures**

If any check fails, fix the root cause and rerun the exact failing command before moving on.

**Step 3: Manual browser verification**

Check in desktop `pnpm dev`:
- camera permission prompt appears
- scroll mode still works
- cursor mode shows the virtual cursor
- moving index finger changes the hovered target
- pinch clicks buttons/links/dialog triggers
- holding the pinch does not multi-click

**Step 4: Prepare summary**

Document:
- files changed
- verified commands
- any remaining manual-only risks
