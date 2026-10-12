# Greendawn balance and clipping — Batch 7

This revision corrects the remaining composition and overlap issues visible in the full-resolution Codespaces capture. The earlier published version remains the reference for a restrained supporting type scale. It retains the approved copy, fonts and colours.

## Corrections

- The hero proof strip participates in normal layout rather than covering the bottom of the copy. All three desktop assurances remain visible as text wraps or grows.
- Short desktop layouts reserve enough room below the header. The short-screen rule no longer overrides phone spacing and hides the hero label behind the header.
- The hero arc sits clear of the paragraph at the inspected desktop and phone widths. The phone proof strip reserves space for the callback icon so it does not cover “Manage”.
- Section headings use balanced line wrapping. System, survey, project, aftercare and programme headings have more controlled measures instead of long, heavy lines.
- Section introductions have closer column proportions and smaller gaps. The system’s two decision summaries fill the available width; the aftercare list aligns with the copy group.
- The dealership photograph has a taller desktop frame and sufficient overscan for both directions of its scroll movement. Its background is not exposed above the image during scrolling.
- Contact rows use one consistent gap instead of combining field margins and grid gaps. Company and email remain mandatory. The optional suggested date/time and invitation to suggest one remain.
- Astro’s development toolbar is disabled for public development previews, removing the repeated black pills from full-page captures. The Astro configuration stays in TypeScript.

## Validation

- Brand naming, Astro diagnostics, production build and rendered HTML/assets pass for both root and configured GitHub Pages base paths.
- Full homepage regression suite: **134 passed, 62 intentionally skipped, zero failures** across the seven configured Chromium projects.
- After the final header-spacing correction, the hero clearance check passes again across all seven projects with 16px and 20px root text sizes. It checks clearance from both the header and proof strip.
- The animated dealership image is checked at three scroll positions to ensure it covers its frame.
- Final captures inspected at 320 × 568, 390 × 844, 834 × 1194, 1024 × 600, 1280 × 640, 1440 × 900 and 2560 × 1440. Checks include horizontal overflow, launcher/proof overlap, hero clearance and visible callback submission actions after scrolling.
- Selected captures and measurements are in `qa-batch-07/`. Section captures temporarily hide fixed controls and the skip link; viewport and callback captures show the actual controls. Captures use reduced motion; the image coverage regression uses normal motion.
- The temporary environment-specific browser fixture and copied test file are excluded from this handoff. The permanent regression checks remain in `tests/home.spec.ts`.
- Historical visual snapshots have not been replaced or claimed to pass against the revised layout.

The callback transport remains the development mock described in the README. Applying this archive updates the project source; it does not publish the public preview or connect a production enquiry endpoint.
