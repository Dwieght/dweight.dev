# Remove Gesture Lab And 3D Design

## Goal

Return the portfolio to a tighter, hiring-manager-first presentation by removing the optional gesture experiment and the interactive 3D hero artifact from the public experience.

## Decision

Use full removal rather than homepage-only hiding.

## Rationale

- The gesture lab and 3D hero no longer support the portfolio's primary job: getting the reader to quickly trust the work and move into case studies.
- Keeping them in the codebase but off the homepage would preserve unnecessary content, routing, copy, and maintenance overhead.
- The simplified site should read as an editorial portfolio focused on shipped work, experience, and the CV CTA.

## Scope

- Remove the homepage 3D artifact panel.
- Remove the gesture experiment card from featured work.
- Remove the `gesture-lab` portfolio entry from shared content.
- Remove experiment-specific behavior from project detail pages.
- Update project index copy so it no longer mentions experiments.
- Remove dead styling and tests tied only to those features.

## Non-Goals

- Do not change the featured project set.
- Do not redesign the case-study structure.
- Do not remove low-level gesture utility code unless it becomes completely unreachable from the public portfolio surface.
