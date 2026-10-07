# Brand-alignment implementation notes

## Delivered changes

- Uses **Greendawn** consistently in visible copy, accessibility text, metadata, structured data and project documentation.
- Restores the approved hero proposition: **EV charging. Handled.**
- Mirrors the current public WordPress navigation in the Astro header while keeping “Discuss your site” as the progressively enhanced callback CTA.
- Uses Bricolage Grotesque for the hero and selected statement moments, Archivo for ordinary headings and body copy, and JetBrains Mono for labels and technical numbers.
- Orders the homepage around the buyer journey: proposition, trust, problem, complete system, process, featured project, technical surveys, audiences, aftercare, supporting evidence, insights and conversion.
- Uses the agreed public process language—Consult, Design, Install and Manage—in both the hero proof strip and the detailed process section.
- Replaces the public survey tier comparison with decision-support content and the approved **from £200 + VAT** starting point. The typed tier data and reusable tier components remain in the repository but are not rendered on the homepage.
- Removes the unconfirmed survey turnaround, the unattributed testimonial and the public OZEV authorisation claim.
- Adds a typed public-claims register, sitemap, robots policy, local terms document and automated production validation.
- Retains GSAP and ScrollTrigger with the existing reduced-motion fallback.
- Removes opacity transitions from readable text and card content so animation cannot create transient contrast failures.
- Restricts pinned and parallax storytelling to suitable wide, tall, fine-pointer viewports; mobile, tablet and short-height layouts use stable document flow.
- Reduces entrance distances and durations, removes ornamental card motion and keeps the survey starting price continuously legible.
- Integrates the technology and power decisions into the complete-system section, removing two repeated full-height sections while retaining the AC/DC and site-power guide routes.
- Compresses supporting proof into one photographed project and two clearly differentiated evidence cards so a single-site image is not presented as proof of national coverage.
- Adds asset-specific desktop and mobile focal points, removes duplicated responsive imagery and prevents horizontal overflow with local clipping at animated boundaries.
- Strengthens small-text legibility, surface-aware focus states, disclosure semantics and mobile-menu focus restoration.
- Centralises desktop, mobile and no-JavaScript route labels in `src/config/navigation.ts` and removes obsolete scroll-position navigation state.
- Adds Playwright coverage for desktop, tablet, mobile and short viewports, including overflow, menu, reduced-motion and automated accessibility checks.
- Bundles the required Archivo, Bricolage Grotesque and JetBrains Mono weights locally and adds a dedicated 1200 × 630 social-preview asset with stable Organisation schema identifiers.
- Standardises the project on pnpm 11.19.0 and records safe dependency build permissions in `pnpm-workspace.yaml`.

## Production sign-off items

- Sales, Operations and Legal should approve the survey starting price, scope and VAT treatment before publication.
- The approved-claims register should be reviewed whenever project figures, delivery coverage or accreditations change.
- The supplied raster Greendawn wordmark and mark remain in use. Replace them with the official SVG masters when those assets are available; do not recreate the wordmark manually.
- Revisit tier-specific attribution only if the retained survey comparison is published elsewhere in future.
