# Greendawn website rebuild

Astro-based rebuild of the Greendawn website. The current branch remains a static GitHub Pages-compatible build so progress can be reviewed continuously while the wider site architecture is developed.

## Package manager

Use **pnpm only**.

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm dev
```

Production validation:

```bash
pnpm check
pnpm build
pnpm test
pnpm audit
```

The repository intentionally contains `pnpm-lock.yaml` only. Do not add `package-lock.json`.

## Runtime

CI uses Node 24. `.node-version` is provided for local version managers. Astro 7 requires Node 22.12 or newer.

## Current architecture

```text
src/
├── components/
│   ├── home/          # Homepage sections and reusable section children
│   ├── lead/          # Reusable callback lead-capture UI
│   ├── layout/        # Header, footer and utility navigation UI
│   └── media/         # Responsive image and icon components
├── config/
│   └── site.ts        # Site-wide contact/company configuration
├── content/
│   ├── claims.ts      # Approved/held public claims and evidence status
│   ├── home.ts        # Structured homepage and survey content
│   └── lead-capture.ts # Typed lead questions and controlled choices
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   └── urls.ts        # GitHub Pages-safe asset URLs and live-site URLs
├── pages/
│   └── index.astro    # Page composition only
├── scripts/
│   ├── animations/    # Section-specific GSAP behaviour
│   ├── lead-capture/  # Lead controller, events and submission boundary
│   ├── motion/         # Shared GSAP/ScrollTrigger lifecycle runtime
│   ├── navigation.ts  # Menu/header behaviour
│   └── home.ts        # Homepage client-script orchestrator
├── styles/
│   ├── tokens.css      # Brand/design tokens
│   ├── foundations.css # Reset, typography and global layout foundations
│   ├── primitives.css  # Shared visual primitives and their responsive states
│   └── global.css      # Ordered stylesheet entry point
└── types/
    ├── home.ts        # Shared homepage content types
    └── lead.ts        # Lead payload and funnel-event domain types
```

## Refactor principles

- Astro renders all core content statically.
- TypeScript is used for configuration, content models, utilities and client behaviour.
- Homepage sections are isolated Astro components rather than one monolithic page file.
- Structured repeated content is separated from markup.
- Client-side behaviour is split by responsibility; GSAP is retained without introducing a UI framework.
- Existing CSS class names and visual output are preserved during this structural refactor.
- GitHub Pages `BASE_URL` support remains centralised in `src/lib/urls.ts`.

The refactor is governed by the locked [refactor baseline](docs/refactor-baseline.md), [style ownership register](docs/style-ownership-register.md), [Phase 2 change record](docs/refactor-phase-02.md), [Phase 3 change record](docs/refactor-phase-03.md), [Phase 4 change record](docs/refactor-phase-04.md) and [Phase 5/6 change record](docs/refactor-phase-05-06.md). Those records define the regression gates, component boundaries, selector ownership, motion lifecycle and composition rules.

## Design system

The existing visual rules are preserved but separated by responsibility. `src/styles/global.css` imports only tokens, global foundations and genuinely shared primitives. Component-specific base and responsive rules live beside their Astro owners. Repeated child components expose typed content and explicit visual variants instead of relying on positional selectors across component boundaries.

Current role-based tokens include dark navy surfaces, warm off-white, electric lime, violet and coral, with Bricolage Grotesque, Archivo and JetBrains Mono. The exact Latin font weights used by the page are bundled locally through Fontsource, avoiding render-blocking third-party font requests.

## Motion

GSAP and ScrollTrigger remain progressively enhanced. `src/scripts/motion/runtime.ts` owns their single registration point, page context, refresh and teardown lifecycle. `src/scripts/home.ts` composes the runtime with navigation and the section behaviours in `src/scripts/animations/`.

`prefers-reduced-motion` continues to bypass animation and keeps reveal content visible.

Readable content is never faded through low-opacity states. Motion uses transforms, path drawing and image treatment so animated text and cards retain their designed contrast throughout the sequence. Horizontal movement is restricted to locally clipped decorative media; narrow layouts use vertical movement only.

Pinned and parallax sequences are restricted to fine-pointer desktop layouts with enough viewport height. Mobile, tablet and short-height layouts retain the complete narrative without scroll pinning. Image focal points are defined per asset for desktop and mobile crops.

The navigation closes and restores page scrolling when the layout crosses the desktop breakpoint. A native `<noscript>` disclosure keeps primary navigation available on responsive layouts when JavaScript is unavailable.

## Lead capture prototype

`src/components/lead/LeadCapture.astro` provides one reusable callback tool shared by the floating launcher, hero CTA and final conversion CTA. It uses a native dialog, strict TypeScript and the existing design tokens without adding a UI framework or form dependency. The launcher is a desktop drawer and mobile bottom sheet; the existing CTA URLs remain usable enquiry-page fallbacks when JavaScript is unavailable.

This GitHub Pages stage deliberately performs no network submission. `src/scripts/lead-capture/submit.ts` logs the typed payload, waits 400ms and resolves to a truthful development success state. The eventual WordPress/PHP handoff is isolated to that transport boundary. `greendawn:lead-funnel` custom events expose only controlled, non-PII context so the later analytics phase can subscribe without coupling analytics code to the component.

The implementation contract, payload, event boundary and production handoff are documented in [Lead capture Stage 3](docs/lead-capture-stage-03.md).

## Deployment

`.github/workflows/deploy.yml` builds with pnpm and publishes `dist/` to the `gh-pages` branch. It sets Astro `SITE_URL` and `BASE_URL` dynamically so the same build works for a project Pages URL or a user/organisation Pages site.

## Deferred architecture decisions

The following are intentionally **not** part of this refactor:

- visual/admin content editing;
- Supabase database/authentication;
- lead-capture backend, validation, routing and email/Trello delivery;
- a headless CMS;
- moving from static GitHub Pages preview hosting to a server-capable production target.

Those should be designed after the static public-site boundaries and content model are established. An admin interface will require authentication, authorisation and a persistent content/media store, while production lead delivery will require the planned WordPress/PHP runtime rather than GitHub Pages.

## Content and launch notes

The homepage uses the approved Greendawn spelling throughout, separates the initial conversation from paid site surveys and publishes only claims marked as approved in `src/content/claims.ts`. Survey prices, VAT wording, scope and credit terms remain subject to final commercial and legal sign-off before production publication. The social-preview asset is a dedicated 1200 × 630 image rather than a reused 4:3 content image.

`pnpm test` verifies the production HTML structure, fragment targets, intrinsic image dimensions, local assets, reduced-motion output, navigation behaviour, responsive overflow and serious automated accessibility findings. The approved Phase 2 Linux baselines for all seven Playwright projects are committed; `pnpm test:visual:update` must only be used after an intentional visual change has been reviewed. The naming gate fails if the incorrect company-name capitalisation appears in human-readable source files.
