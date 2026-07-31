# Greendawn homepage concept

An Astro homepage rebuild for Greendawn, using the emerging June 2026 brand direction and genuine project imagery from the current Greendawn website.

## Run locally

```bash
pnpm install
pnpm run dev
```

Create a production build with:

```bash
pnpm run build
```

## Project structure

- `src/pages/index.astro` — homepage content and semantic structure
- `src/styles/global.css` — design tokens, layout, components and responsive states
- `src/scripts/home.ts` — GSAP and ScrollTrigger motion, menu behaviour and reduced-motion handling
- `src/layouts/BaseLayout.astro` — metadata and Google Fonts
- `public/brand` — raster logo assets recovered from the supplied pitch deck
- `public/images` — selected Greendawn project and editorial images
- `public/credentials` — accreditation marks used on the current website

## Design system

The implementation uses the pitch-deck colours as a controlled role-based system:

- Navy `#0B1D2A` — primary dark surface and text
- Secondary navy `#13293B` — layered dark surfaces
- Warm off-white `#FAF9F6` — primary light surface
- Electric lime `#E9F227` — primary accent and action colour
- Violet `#3A22D8` — secondary emphasis
- Coral `#FF5E33` — small graphic accent only

Typography is loaded from Google Fonts:

- Bricolage Grotesque for display type
- Archivo for body copy and interface text
- JetBrains Mono for labels, metadata and numbered markers

Spacing, type and colour are defined as reusable CSS variables. The layout follows the supplied Refactoring UI guidance: deliberate hierarchy, a constrained spacing scale, readable line lengths, fewer borders, controlled colour roles and imagery with reliable text contrast.

## Motion

GSAP and ScrollTrigger provide the hero reveal, SVG arc drawing, image parallax, section reveals, system assembly, process progress, solution-image transitions, metric counters and supporting scroll choreography. The site honours `prefers-reduced-motion` and leaves all content visible and usable without animation.

## Content and launch notes

The June 2026 pitch deck is a draft. The four scale metrics displayed in the homepage concept are reproduced from that deck and are explicitly marked for verification. Absolute commercial claims, unfinished future services and the pitch deck's regulatory wording have not been carried into the page.

The Johnsons Cars, Salvation Army, Elite Hotels and Honda project facts are based on the current Greendawn project page at the time of the rebuild. Reconfirm all figures, client permissions, testimonials, contact details and service commitments before production launch.

The included project photography and credentials were sourced from Greendawn's current public website for this Greendawn redesign. Confirm the organisation's rights and any client/manufacturer permissions before redistributing the assets outside this project.
