# Brand-alignment implementation notes

## Delivered changes

- Uses **Greendawn** consistently in visible copy, accessibility text, metadata, structured data and project documentation.
- Restores the approved hero proposition: **EV charging. Handled.**
- Changes public navigation from “Solutions” to “Who we help”, led by fleet and workforce requirements.
- Uses Bricolage Grotesque for the hero and selected statement moments, Archivo for ordinary headings and body copy, and JetBrains Mono for labels and technical numbers.
- Orders the homepage around the buyer journey: proposition, trust, problem, complete system, process, featured project, paid surveys, audiences, aftercare, supporting evidence, insights and conversion.
- Retains the paid survey module with scope, deliverables, VAT wording, installation-credit wording and tier-specific enquiry links.
- Removes the unconfirmed survey turnaround, the unattributed testimonial and the public OZEV authorisation claim.
- Adds a typed public-claims register, sitemap, robots policy, local terms document and automated production validation.
- Retains GSAP and ScrollTrigger with the existing reduced-motion fallback.
- Removes opacity transitions from readable text and card content so animation cannot create transient contrast failures.
- Restricts pinned and parallax storytelling to suitable wide, tall, fine-pointer viewports; mobile, tablet and short-height layouts use stable document flow.
- Reduces entrance distances and durations, removes ornamental card motion and keeps survey prices continuously legible.
- Integrates the technology and power decisions into the complete-system section, removing two repeated full-height sections while retaining the AC/DC and site-power guide routes.
- Compresses supporting proof into one photographed project and two clearly differentiated evidence cards so a single-site image is not presented as proof of national coverage.
- Adds asset-specific desktop and mobile focal points, removes duplicated responsive imagery and prevents horizontal overflow with local clipping at animated boundaries.
- Strengthens small-text legibility, surface-aware focus states, active-navigation semantics and mobile-menu focus restoration.
- Clears active-navigation state when the reader is in a section that has no corresponding primary-navigation item.
- Adds Playwright coverage for desktop, tablet, mobile and short viewports, including overflow, menu, reduced-motion and automated accessibility checks.
- Bundles the required Archivo, Bricolage Grotesque and JetBrains Mono weights locally and adds a dedicated 1200 × 630 social-preview asset with stable Organisation schema identifiers.
- Standardises the project on pnpm 11.19.0 and records safe dependency build permissions in `pnpm-workspace.yaml`.

## Production sign-off items

- Sales, Operations and Legal should approve the survey prices, scope, VAT treatment and installation-credit conditions before publication.
- The approved-claims register should be reviewed whenever project figures, delivery coverage or accreditations change.
- The supplied raster Greendawn wordmark and mark remain in use. Replace them with the official SVG masters when those assets are available; do not recreate the wordmark manually.
- Confirm that the enquiry page preserves the `survey` query parameter before relying on tier-specific attribution.
