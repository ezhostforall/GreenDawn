# Greendawn website rebuild

Astro-based rebuild of the Greendawn website. The current branch remains a static GitHub Pages-compatible build so progress can be reviewed continuously while the wider site architecture is developed.

## Package manager

Use **pnpm only**.

```bash
pnpm install
pnpm dev
```

Production validation:

```bash
pnpm check
pnpm build
pnpm test
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
│   └── home.ts        # Structured homepage list/card content
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

## Design system

The existing visual rules are preserved but separated by responsibility. `src/styles/global.css` is now only the ordered entry point; design tokens, foundations, navigation, homepage sections, footer and responsive rules live in focused files. This keeps later brand-token updates isolated from structural page styles.

Current role-based tokens include dark navy surfaces, warm off-white, electric lime, violet and coral, with Bricolage Grotesque, Archivo and JetBrains Mono.

## Motion

GSAP and ScrollTrigger remain progressively enhanced. The orchestration now lives in `src/scripts/home.ts`, with individual behaviours separated into `src/scripts/animations/`.

`prefers-reduced-motion` continues to bypass animation and keeps reveal content visible.

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

The current homepage copy is still the pre-content-rewrite concept. Business claims, customer permissions, legal details, survey/aftercare wording, accreditation treatment and project figures are being governed separately and will be updated in the next content stage.
