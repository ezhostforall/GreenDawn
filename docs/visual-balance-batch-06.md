# Greendawn visual balance — Batch 6

This revision implements the homepage and callback-tool visual review, using the earlier published site as a reference for a quieter supporting type scale. It keeps the current approved copy, fonts, colours, hero and decorative arcs.

## Homepage changes

- Dense card, process, solution and survey descriptions use 16px text at the default 16px root. Card headings range from 24px to 28px. Navigation and footer links use 14px text.
- The hero eyebrow and assurances have deliberate stacked arrangements. Display text is capped against its available container width, and short layouts reserve more space above the proof strip.
- Trust-strip columns give delivery credentials more space. The coordinated-project explanation and model sit closer together, with compact fragment and outcome sizing.
- System and survey introductions group their labels, headings and explanations. Wider heading measures remove unnecessarily short lines; the system's card spacing is consistent while retaining its stepped desktop silhouette.
- Johnsons project text receives more width. Its heading uses the full story column, its image is more proportionate and the metric labels begin at a common vertical position.
- Survey outcomes have a wider, smaller heading and compact supporting text. “Discuss a site survey” opens the shared callback tool, with the existing enquiry-page fallback. The £200 + VAT starting point and all survey scope/price qualifications remain.
- Solutions use the compact type scale. The previous photograph remains visible until its replacement is loaded and decoded; failed or superseded image requests cannot blank the media panel.
- Aftercare uses four intrinsic-height rows rather than stretched tiles. The customer-support link has its own spacing below the aftercare button.
- Salvation Army proof uses a constrained desktop image with vertically centred supporting copy. Closing-CTA paragraphs and actions are grouped more closely.
- On mobile, the floating callback launcher is a smaller icon button with the accessible name “Request a callback”.

## Callback changes

- Main prompts use 36–40px on desktop and 28–32px on mobile. The callback-preference legend has a full-width, compact measure.
- Named stages replace route-dependent numeric totals. Back navigation retains answers and each stage starts at the top of the scroll area.
- Name, telephone, company and email remain mandatory. The contact introduction explicitly says all four fields are required. Callback preference remains required.
- “Suggest a time” reveals an optional suggested date/time. Supporting copy invites a preference and says availability will be confirmed. The empty suggested-time field does not block a valid request.
- The final action and telephone alternative stay in a separate footer while fields, optional notes and privacy information scroll above it.
- Back and submit actions have larger, readable labels.

## Validation

- `pnpm run test:static` passes: brand naming, Astro diagnostics, production build and rendered HTML/assets.
- TypeScript and a configured-base production build are checked as part of the handoff.
- The updated homepage regression assertions pass across all seven configured projects: **126 passed, 56 intentionally skipped, zero failures**.
- Five additional screenshot-capture runs pass (desktop, narrow, mobile, tablet and short); two inapplicable capture projects are skipped. Combined result: **131 passed, 58 skipped, zero failures or flaky results**.
- Regression coverage includes conditional and direct callback routes, all four required contact-field errors, optional suggested time, keyboard focus, no network submission, persistent narrow-screen submission actions, responsive overflow, no-JavaScript fallbacks and serious automated accessibility findings.
- Fresh renders were inspected at 320 × 568, 390 × 844, 834 × 1194, 1280 × 640 and 1440 × 900. The existing breakpoint-overflow check also covers widths from 320 to 2560px.
- Selected captures are in `docs/qa-batch-06/`. Section captures hide fixed header/launcher elements to avoid full-section capture artefacts; callback captures show the actual viewport. Captures use reduced motion to inspect settled content.
- A temporary local test harness uses a fresh Chromium headless browser per test because the environment requires a single-process runner. It changes browser setup only, preserving the repository's regression assertions. The temporary files and browser downloads are excluded from delivery.
- Existing historical visual baselines are retained; no claim is made that the snapshot-comparison suite passes against the intentionally changed design. Native browser zoom, user font preferences and platform date pickers remain separate launch checks.

The callback transport remains the existing development mock. It validates and prepares a payload but does not send or store an enquiry; the production WordPress endpoint is still required.
