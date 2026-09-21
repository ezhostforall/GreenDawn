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
│   ├── home/          # Homepage sections; presentation only
│   └── layout/        # Header, footer and global navigation UI
├── config/
│   └── site.ts        # Site-wide contact/company configuration
├── content/
│   ├── claims.ts      # Approved/held public claims and evidence status
│   └── home.ts        # Structured homepage and survey content
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   └── urls.ts        # GitHub Pages-safe asset URLs and live-site URLs
├── pages/
│   └── index.astro    # Page composition only
├── scripts/
│   ├── animations/    # Section-specific GSAP behaviour
│   ├── navigation.ts  # Menu/header behaviour
│   └── home.ts        # Homepage client-script orchestrator
├── styles/
│   ├── tokens.css      # Brand/design tokens
│   ├── foundations.css # Reset, typography and shared primitives
│   ├── navigation.css  # Utility bar/header/navigation
│   ├── home.css        # Homepage section styles
│   ├── footer.css      # Footer styles
│   ├── responsive.css  # Responsive/reduced-motion overrides
│   └── global.css      # Ordered stylesheet entry point
└── types/
    └── home.ts        # Shared homepage content types
```

## Refactor principles

- Astro renders all core content statically.
- TypeScript is used for configuration, content models, utilities and client behaviour.
- Homepage sections are isolated Astro components rather than one monolithic page file.
- Structured repeated content is separated from markup.
- Client-side behaviour is split by responsibility; GSAP is retained without introducing a UI framework.
- Existing CSS class names and visual output are preserved during this structural refactor.
- GitHub Pages `BASE_URL` support remains centralised in `src/lib/urls.ts`.

The next component/CSS extraction is governed by the locked [refactor baseline](docs/refactor-baseline.md) and [style ownership register](docs/style-ownership-register.md). Those records define the regression gates, component boundaries, selector ownership and composition rules that must be preserved while styles move beside their components.

## Design system

The existing visual rules are preserved but separated by responsibility. `src/styles/global.css` is now only the ordered entry point; design tokens, foundations, navigation, homepage sections, footer and responsive rules live in focused files. This keeps later brand-token updates isolated from structural page styles.

Current role-based tokens include dark navy surfaces, warm off-white, electric lime, violet and coral, with Bricolage Grotesque, Archivo and JetBrains Mono. The exact Latin font weights used by the page are bundled locally through Fontsource, avoiding render-blocking third-party font requests.

## Motion

GSAP and ScrollTrigger remain progressively enhanced. The orchestration now lives in `src/scripts/home.ts`, with individual behaviours separated into `src/scripts/animations/`.

`prefers-reduced-motion` continues to bypass animation and keeps reveal content visible.

Readable content is never faded through low-opacity states. Motion uses transforms, path drawing and image treatment so animated text and cards retain their designed contrast throughout the sequence. Horizontal movement is restricted to locally clipped decorative media; narrow layouts use vertical movement only.

Pinned and parallax sequences are restricted to fine-pointer desktop layouts with enough viewport height. Mobile, tablet and short-height layouts retain the complete narrative without scroll pinning. Image focal points are defined per asset for desktop and mobile crops.

The navigation closes and restores page scrolling when the layout crosses the desktop breakpoint.

## Deployment

`.github/workflows/deploy.yml` builds with pnpm and publishes `dist/` to the `gh-pages` branch. It sets Astro `SITE_URL` and `BASE_URL` dynamically so the same build works for a project Pages URL or a user/organisation Pages site.

## Deferred architecture decisions

The following are intentionally **not** part of this refactor:

- visual/admin content editing;
- Supabase database/authentication;
- contact-form backend and email delivery;
- a headless CMS;
- moving from static GitHub Pages preview hosting to a server-capable production target.

Those should be designed after the static public-site boundaries and content model are established. An admin interface will require authentication, authorisation and a persistent content/media store, while a server-handled contact form will require a runtime that GitHub Pages cannot provide directly.

## Content and launch notes

The homepage uses the approved Greendawn spelling throughout, separates the initial conversation from paid site surveys and publishes only claims marked as approved in `src/content/claims.ts`. Survey prices, VAT wording, scope and credit terms remain subject to final commercial and legal sign-off before production publication. The social-preview asset is a dedicated 1200 × 630 image rather than a reused 4:3 content image.

`pnpm test` verifies the production HTML structure, fragment targets, intrinsic image dimensions, local assets, reduced-motion output, navigation behaviour, responsive overflow and serious automated accessibility findings. `pnpm test:visual:update` creates baselines for all seven configured Playwright projects after an approved visual review. The current archive does not yet contain committed screenshot baselines; generate and approve them from the untouched Phase 0 source before component extraction begins. The naming gate fails if the incorrect company-name capitalisation appears in human-readable source files.
