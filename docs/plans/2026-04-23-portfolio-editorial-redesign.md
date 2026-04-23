# Portfolio Editorial Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the portfolio into a LinkedIn-first editorial experience that increases interview callbacks, highlights three confidentiality-safe case studies, introduces a refined 3D hero artifact, and moves gesture control into an optional experiment page.

**Architecture:** Introduce a small content model that centralizes home, case-study, and experiment data; rebuild the homepage and project routes from that model; then restyle global tokens and the CV route to match the new visual system. Preserve the existing gesture controller implementation, but change its role and presentation so it is opt-in instead of part of the main conversion path.

**Tech Stack:** Next.js App Router, React 18, TypeScript, Tailwind CSS, Vitest, Testing Library, `@react-three/fiber`, `@react-three/drei`, `three`

---

### Task 1: Add red tests for the new information architecture

**Files:**
- Create: `src/app/page.test.tsx`
- Create: `src/app/projects/[slug]/page.test.tsx`
- Modify: `src/test/setup.ts` (only if a missing browser mock blocks page rendering)

**Step 1: Write the failing test**

Cover these behaviors:
- homepage renders a high-trust positioning statement plus a `View CV` CTA
- homepage renders exactly three featured case-study links
- homepage exposes a gesture experiment entry point without rendering the gesture controller in the main flow
- project route renders an in-site case study page for a featured project and a separate case study page for the gesture lab experiment

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/page.test.tsx src/app/projects/[slug]/page.test.tsx`

Expected:
- imports fail because the new routes/data do not exist yet, or
- assertions fail because the current homepage does not match the new IA

**Step 3: Write minimal implementation**

Create the smallest possible data and route scaffolding to make the tests meaningful before styling.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/page.test.tsx src/app/projects/[slug]/page.test.tsx`

Expected: PASS

### Task 2: Build the shared portfolio content model

**Files:**
- Create: `src/content/portfolio.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`

**Step 1: Write the failing test**

Extend tests to assert:
- featured projects are sourced from shared data
- non-featured work appears in an archive/listing area
- case-study pages expose role, outcome, stack, and contribution sections

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/page.test.tsx src/app/projects/[slug]/page.test.tsx`

Expected: FAIL on missing content structure

**Step 3: Write minimal implementation**

Add typed data objects for:
- hero identity and CTA copy
- featured projects
- supporting work archive
- experience timeline
- skill groups
- certification highlights
- gesture-lab experiment narrative

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/page.test.tsx src/app/projects/[slug]/page.test.tsx`

Expected: PASS

### Task 3: Rebuild the homepage structure before styling

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/portfolio/home-hero.tsx`
- Create: `src/components/portfolio/featured-projects.tsx`
- Create: `src/components/portfolio/experience-timeline.tsx`
- Create: `src/components/portfolio/skills-profile.tsx`
- Create: `src/components/portfolio/site-footer.tsx`

**Step 1: Write the failing test**

Add assertions for semantic structure:
- one primary `<h1>`
- clear landmark/section headings
- featured work section before skills/certificates
- primary CTA and proof CTA both reachable by keyboard

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/page.test.tsx`

Expected: FAIL on missing structure or order

**Step 3: Write minimal implementation**

Compose the homepage from semantic sections and real content without visual polish first.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/page.test.tsx`

Expected: PASS

### Task 4: Build the 3D hero artifact and interaction layer

**Files:**
- Create: `src/components/portfolio/hero-artifact.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Step 1: Write the failing test**

Add a lightweight behavior assertion:
- homepage renders a labeled 3D scene region with fallback supporting text
- the scene is supplemental, not the only carrier of core information

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/page.test.tsx`

Expected: FAIL because the scene is not yet in the redesigned structure

**Step 3: Write minimal implementation**

Implement a refined artifact component with:
- graceful fallback copy
- subtle autonomous motion
- optional pointer interaction
- no dependency on the scene for core comprehension

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/page.test.tsx`

Expected: PASS

### Task 5: Build in-site case study pages and gesture lab route

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/app/projects/page.tsx`
- Modify: `src/content/portfolio.ts`
- Modify: `src/components/GestureScrollController.tsx` (only if presentation tweaks are needed for the lab route)

**Step 1: Write the failing test**

Add assertions for:
- `/projects/[slug]` featured case studies render structured sections
- gesture lab route shows clear experiment framing and opt-in demo messaging
- live links are secondary to the case-study narrative

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/projects/[slug]/page.test.tsx`

Expected: FAIL

**Step 3: Write minimal implementation**

Implement static case-study pages backed by the shared content model. Keep gesture control in a dedicated experiment page with explicit framing and camera-permission context.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/projects/[slug]/page.test.tsx`

Expected: PASS

### Task 6: Apply the editorial visual system

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/projects/page.tsx`
- Modify: `src/app/cv/page.tsx`

**Step 1: Write the failing test**

Only add tests for durable behaviors, not pixel styling:
- CV page still exposes print/download actions
- major pages preserve landmark headings and main CTAs after restyling

**Step 2: Run test to verify it fails**

Run: `npm test -- src/app/page.test.tsx src/app/projects/[slug]/page.test.tsx`

Expected: FAIL if semantic changes regress

**Step 3: Write minimal implementation**

Apply the visual system:
- new font pairing in `layout.tsx`
- light-first OKLCH token system in `globals.css`
- editorial spacing rhythm, refined buttons, subtle dividers, controlled motion
- mobile-first layout adaptations
- restyled CV page consistent with the homepage system

**Step 4: Run test to verify it passes**

Run: `npm test -- src/app/page.test.tsx src/app/projects/[slug]/page.test.tsx`

Expected: PASS

### Task 7: Verify, build, and visually inspect

**Files:**
- No new files required unless verification exposes issues

**Step 1: Run targeted tests**

Run: `npm test -- src/app/page.test.tsx src/app/projects/[slug]/page.test.tsx src/components/GestureScrollController.test.tsx`

Expected: PASS

**Step 2: Run the full test suite**

Run: `npm test`

Expected: PASS

**Step 3: Run the production build**

Run: `npm run build`

Expected: PASS

**Step 4: Start the app for visual review**

Run: `pnpm dev`

Expected: local dev server starts

**Step 5: Visually inspect and iterate**

Review:
- homepage hierarchy and first viewport
- case study pages
- CV page
- mobile layout
- 3D artifact behavior
- gesture lab discoverability and framing

Fix any issues, then re-run the relevant tests and build.
