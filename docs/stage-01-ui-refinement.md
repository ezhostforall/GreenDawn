# Stage 0–1 UI refinement record

## Baseline

- Source: the current GitHub repository archive supplied 14 September 2026.
- SHA-256: `6d271ff8175d25150d525239657a3decd4b5cb4ca8c41817e3920caf311ec4ad`.
- Published comparison: the public GitHub Pages preview supplied for review.
- Baseline checks: frozen pnpm install, Astro check/build, naming validation and generated-build validation passed before implementation.
- Review evidence: the supplied desktop/mobile full-page captures and Charlotte's two annotated website-review PDFs.

## Stage 1 scope delivered

- The utility bar and primary header now use the same capped inner shell as hero copy, page content and footer content.
- The hero remains full bleed while narrow-screen copy receives a safer header offset and a cleaner image transition.
- Hero proof numbers align with their titles and have greater prominence.
- Hero proof numbers are optically centred against their title line rather than baseline-aligned.
- The fragmentation model now resolves horizontally on larger layouts and as a compact two-column dependency grid on mobile.
- Its motion now shows the six responsibilities assembling before the connector draws and the managed relationship resolves; reduced-motion users receive the final state immediately.
- The component clips those temporary entry positions to its own animation canvas so they cannot widen the document on narrow screens.
- At 360px and below, rows converge vertically without a horizontal translation; the fuller two-axis assembly remains in place from 361px upwards.
- The managed-relationship statement now scales within its desktop answer card rather than clipping at wide viewport sizes.
- Fragment-card and answer-panel shadows were removed to eliminate the clipped corner haze identified in review.
- Mobile space between trust and problem content is reduced.
- Mobile process stages use a compact number-and-content grid.
- Tablet and mobile project media use responsive aspect ratios rather than a fixed 38rem height.
- Project lead copy is returned to the established mobile body scale.
- The workplace and featured-project crops are adjusted through the central media registry.
- Mobile solution-row indicator overlap is removed.
- Mobile aftercare, proof and insight compositions are shortened without changing their wording.
- Supporting-proof cards now anchor their category label at the top and keep the heading, result and explanation as a compact bottom-aligned group. The two groups use the available card height deliberately through `space-between`, while mobile supporting type remains normalised across all three cards.
- Mobile surveys use collapsed comparison rows with expandable detail; desktop and tablet retain the existing grid.
- Automated coverage now includes narrow mobile, standard mobile, tablet, short desktop, desktop, wide and ultra-wide projects, plus exact breakpoint-boundary overflow checks.

## Deliberately deferred

- Callback/lead-capture implementation.
- GTM, GA4, Clarity, CookieYes or conversion-event changes.
- PHP, Zapier, Trello or any live submission.
- Further client-logo sourcing beyond the subsequently approved Johnsons Cars and Salvation Army assets now present in `TrustSection.astro`.
- Replacement photography not yet supplied and approved.
- Changes to prices, claims, metrics, methodology wording or commercial terms.

## Release checks

Run with the configured GitHub Pages project base path as well as `/`:

```sh
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run validate:brand
pnpm run validate:build
pnpm run test:e2e
```

The CI workflow installs Chromium before executing Playwright. Visual review should include 320–430px mobile, tablet portrait/landscape, the 1200px navigation boundary, short desktop, 1440px, 1920px and 2560px.
