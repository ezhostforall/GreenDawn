# Content batch 04: research-informed homepage copy

## Scope

Implements the revised copy reviewed on 9 October 2026 against the user's latest tested batch-three archive. Keeps the page sequence, brand system, navigation, footer, callback flow, animation hooks and runtime unchanged. No new service pages, redirects, backend integrations or dependencies are introduced.

## Content changes

- Metadata explicitly describes commercial installation and support. The H1 remains “EV charging. Handled.”
- Hero copy welcomes single-site and estate requirements, with agreed support rather than an unlimited operational promise.
- The problem section explains coordination; the system section describes technical decisions; the process section describes the four customer-facing stages.
- Existing approved process labels remain Consult · Design · Install · Manage.
- Technical surveys retain the approved £200 + VAT starting price, four outcome summaries and the guide route. Copy distinguishes an initial discussion from a separately paid technical survey and confirms scope, price and applicable third-party costs before booking.
- Five buyer rows gain an optional typed `linkLabel` rendered as non-interactive text inside the existing link. Multi-site and dealership cues accurately describe the current broad delivery page and planning guide. No nested links or new URLs are added.
- Aftercare keeps four concise service labels, visibly qualifies package scope and adds a direct customer-support route. The unlimited repair assurance is replaced.
- The final CTA invites a rough requirement rather than promising that customers have nothing to manage.
- Insight headings are shortened; their existing URLs and images remain unchanged.

## Preserved source material

The four dormant survey tiers and all SurveyTier child components remain intact. Supporting coverage/capability records remain dormant. Approved project counts (Johnsons 136 sites / 454 chargepoints / 11 brands; Salvation Army 50 sites / 71 chargepoints), claims status and review dates are not changed or newly certified.

The survey price layout is retained in this copy-led batch. Any further change to its visual prominence is a separate design decision.

## Publication dependencies

Retaining source approval does not independently resolve the research's discrepancies. Reconcile project units, dates and permissions with older gallery totals before publication. Confirm survey-policy applicability, third-party cost handling and current aftercare scope with the commercial/operational owners. Refresh the featured fleet-transition guide separately; this batch does not edit the WordPress destination.

Callback submission remains a clearly disclosed prototype with no network submission. Required company/email, auto-advance, labelled Back control, launcher wording, payload types and fallback enquiry URLs are unchanged. A real, tested delivery endpoint and matching privacy terms remain production-launch requirements.

## Verification and review

Static validation now protects package qualification, support routing, paid-survey distinction, honest interim destination cues and the absence of unqualified management/repair promises. Two Playwright functional tests cover those contracts alongside the existing suites.

Run `pnpm run check`, `pnpm exec tsc --noEmit`, `pnpm run test:static` and the configured-base production build. Run `pnpm run test:e2e` and `pnpm run test:visual` in the user's IDE. Existing screenshots are deliberately not updated: inspect copy wrapping, the longer system eyebrow, support link, five destination cues and final-CTA rhythm before accepting new baselines.

### Completed checks on 9 October 2026

- `pnpm run check`: 0 errors, 0 warnings, 0 hints across 66 Astro files.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm run test:static`: brand naming, root production build and production contracts passed.
- Project-path `BASE_URL` production build and matching `validate:build`: passed.
- `pnpm exec playwright test --list`: 189 cases discovered (182 functional plus 7 visual); not browser execution.
- Byte comparison with the input archive confirmed untouched runtime, lead UI, header/footer, configuration, claim records, assets, snapshots, package manifest/lockfile and dormant survey-tier data.

The first offline install could not complete because cached package metadata was unavailable. Validation used the existing matching dependency set; the manifest and lockfile are identical to the baseline. Browser tests, visual review and downstream WordPress guide edits were not performed here.
