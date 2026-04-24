# Home Hero Profile Card Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move the homepage profile card upward on desktop so it aligns with the hero headline rather than sitting low in the composition.

**Architecture:** Keep the existing hero structure and fix the layout at the source by changing the large-screen cross-axis alignment from bottom to top, then add a small top offset to the right column so the card sits near the headline block without looking pinned. Capture the expected desktop alignment in a UI test that inspects the rendered hero structure.

**Tech Stack:** Next.js App Router, React, TypeScript, Vitest, Testing Library

---

### Task 1: Lock The Desired Desktop Alignment

**Files:**
- Modify: `src/app/page.test.tsx`

**Step 1: Write the failing test**

- Assert that the hero section containing the main heading uses `lg:items-start`.
- Assert that the profile card column has a small desktop top offset such as `lg:pt-6`.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/page.test.tsx`
Expected: FAIL because the hero still uses `lg:items-end` and the right column has no offset.

**Step 3: Write minimal implementation**

- Update `src/components/portfolio/home-hero.tsx` to top-align the hero on large screens and add the right-column offset class.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/page.test.tsx`
Expected: PASS.

### Task 2: Verify The Portfolio Still Builds

**Files:**
- No additional changes expected

**Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS.

**Step 2: Run a production build**

Run: `npm run build`
Expected: PASS.
