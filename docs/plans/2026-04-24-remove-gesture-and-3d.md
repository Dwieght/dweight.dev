# Remove Gesture Lab And 3D Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the gesture-lab experiment and interactive 3D hero from the portfolio so the public site stays focused on case studies, experience, and CV conversion.

**Architecture:** Simplify the portfolio by cutting the experiment entry from the shared content model, removing homepage consumers of the experiment and 3D artifact, and collapsing the project detail route back to a single case-study path without experiment branches. Verification should prove the homepage no longer advertises either feature and project routes no longer generate the removed slug.

**Tech Stack:** Next.js App Router, React, TypeScript, Vitest, Testing Library

---

### Task 1: Lock The New Homepage Behavior

**Files:**
- Modify: `src/app/page.test.tsx`

**Step 1: Write the failing test**

- Replace the homepage assertion that expects a `Gesture Lab` link.
- Add assertions that the homepage does not render `Gesture Lab`.
- Add assertions that the homepage does not render `Interactive 3D scene`.

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/page.test.tsx`
Expected: FAIL because the homepage still renders the experiment link and 3D artifact.

**Step 3: Write minimal implementation**

- Remove the experiment card and 3D artifact from homepage production code.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/page.test.tsx`
Expected: PASS.

### Task 2: Lock The Project Routing Behavior

**Files:**
- Modify: `src/app/projects/[slug]/page.test.tsx`

**Step 1: Write the failing test**

- Add an assertion that `generateStaticParams()` does not include `gesture-lab`.
- Remove the experiment-specific case-study expectation.

**Step 2: Run test to verify it fails**

Run: `npm test -- 'src/app/projects/[slug]/page.test.tsx'`
Expected: FAIL because `gesture-lab` is still generated.

**Step 3: Write minimal implementation**

- Remove the experiment entry from shared portfolio content.
- Remove experiment branches and imports from the project detail page.

**Step 4: Run test to verify it passes**

Run: `npm test -- 'src/app/projects/[slug]/page.test.tsx'`
Expected: PASS.

### Task 3: Remove Dead Public Surface Code

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/portfolio/home-hero.tsx`
- Modify: `src/components/portfolio/featured-projects.tsx`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/content/portfolio.ts`
- Modify: `src/app/globals.css`
- Delete: `src/components/portfolio/hero-artifact.tsx`

**Step 1: Implement the simplification**

- Drop `gestureExperiment` from imports and props.
- Remove the homepage sidebar experiment panel.
- Remove the 3D artifact panel from the hero.
- Rename index copy from `Projects and experiments` to `Projects`.
- Remove `.artifact-frame` and any unused gesture-only public styling.

**Step 2: Run targeted tests**

Run: `npm test -- src/app/page.test.tsx 'src/app/projects/[slug]/page.test.tsx'`
Expected: PASS.

### Task 4: Verify The Whole Portfolio Still Ships

**Files:**
- No code changes expected

**Step 1: Run full test suite**

Run: `npm test`
Expected: PASS.

**Step 2: Run production build**

Run: `npm run build`
Expected: PASS.
