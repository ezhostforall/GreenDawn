# Style and component ownership register

This is the Phase 1 source-of-truth for extracting reusable primitives, child components and sections while moving their CSS beside them. It accounts for all 486 CSS rule blocks in the frozen Phase 1 baseline by file and selector family. It does not authorise visual redesign.

## Phase 2 status

The global CSS foundation is complete. Shared visual rules now live in `src/styles/primitives.css`; rendered markup and component APIs are unchanged. Phase 3 proceeds vertically by section in the agreed order. Shared classes do not require wrapper components merely to own their CSS.

## Phase 3 status

All 15 vertical migrations are complete. Component-owned base, responsive, touch and short-height rules now live beside their Astro owners. Coherent repeated children were extracted with typed props and native-attribute forwarding, and former cross-boundary positional dependencies use explicit variants. Problem intro rules are no longer global; shared Survey description and CTA DOM now own their styles without parent reach-through. Animation and navigation hooks remain unchanged. The legacy global stylesheet files remain imported as Phase 5 placeholders until final ownership searches and browser verification are complete.

## Phase 4 status

The shared motion runtime is complete and delivered with the corrected Phase 3 archive. It is the single GSAP/ScrollTrigger import and registration boundary and owns page-level motion lifecycle, refresh and teardown. Section animation modules retain their individual selectors and values.

## Ownership classes

| Code | Ownership | Destination rule |
| --- | --- | --- |
| `G1` | Global foundation | Remains in `src/styles/`: tokens, reset, document defaults, accessibility helpers, shell and surface utilities. |
| `G2` | Global visual primitive | Remains globally reusable in `src/styles/primitives.css`; do not create a wrapper component solely to own the class. |
| `S1` | Section root/layout | Move into the section component that renders the root and layout wrapper. |
| `C1` | Child component internal | Move with the smallest component that renders the complete DOM contract. |
| `P1` | Page composition relationship | Remains with the page/composition layer; never hide adjacency or ordering dependencies inside a child. |

## Non-negotiable migration rules

1. Move markup and its base, responsive, short-height, hover and reduced-motion rules in the same change.
2. Preserve current class names and `data-*` animation hooks until functional and visual parity is proven.
3. Keep `data-*` attributes as JavaScript hooks and classes as styling hooks; do not make new CSS depend on animation attributes.
4. A component must own all DOM required by its positional selectors. If it cannot, replace the positional contract with explicit variants before extraction.
5. Do not reach through an Astro child component with a parent-scoped selector. Pass a class/variant/custom property, or let the child own the rule.
6. Attribute forwarding is required for reusable links, images and wrappers: `class`, `id`, `aria-*`, `data-*`, `loading`, `fetchpriority` and other native attributes must not be silently dropped.
7. Keep `:root` tokens and responsive token overrides global. Components consume tokens; they do not redefine the global scale.
8. Keep page-order rules in the composition layer.
9. Do not combine unrelated sections merely because they currently share declarations. Promote a real primitive or duplicate the small declaration set until a stable abstraction exists.
10. Preserve selector specificity and stylesheet order during each move. A scoped-style rewrite is not complete until computed styles match at all seven projects.

## Phase 1 global stylesheet inventory

| File | Baseline rule blocks | Phase 1 responsibility | Phased destination |
| --- | ---: | --- | --- |
| `tokens.css` | 1 | Colour, type, spacing, radii, shadows, shell and focus tokens | `G1`; keep global |
| `foundations.css` | 47 | Reset, document typography, accessibility, shells, surfaces and visual primitives | Split `G1` foundations from `G2` primitives |
| `navigation.css` | 19 | Utility bar, site header, brand and desktop navigation | Phase 2 moves shared brand rules to `primitives.css`; Phase 3 moves remaining layout rules vertically |
| `home.css` | 200 | All homepage sections and child patterns | Move by section/child ownership |
| `footer.css` | 15 | Footer root, brand variant, grids and links | Footer-specific rules remain for the Phase 3 Footer migration |
| `responsive.css` | 204 | Every responsive, touch, short-height and reduced-motion override | Dissolve by moving each rule beside its owner |
| `global.css` | 0 | Ordered import entry point | Retain as global entry point |

The sum is 486 rule blocks. `global.css` contains imports only.

## Global foundations and primitives

| Selector family | Owner | Planned destination | Notes |
| --- | --- | --- | --- |
| `:root` in `tokens.css` | `G1` | `tokens.css` | Canonical tokens only. |
| responsive `:root` overrides at 75rem, 61rem, 42rem and 30rem | `G1` | `tokens.css` or a global token-media file imported immediately after it | Must retain current cascade order relative to base tokens. |
| `*`, pseudo-elements, `html`, `body`, form controls, images/SVG, heading/paragraph/list resets | `G1` | `foundations.css` | Includes global `box-sizing`, typography and overflow safety. |
| `::selection`, `:focus-visible` | `G1` | `foundations.css` | Accessibility foundation. |
| `.sr-only`, `.skip-link` and `.skip-link:focus` | `G1` | `foundations.css` | Accessibility utilities used across layouts/pages. |
| `.page-shell` | `G1` | `foundations.css` | Shared layout utility; tested across header, hero and footer. |
| `.section`, `.section--cream`, `.section--paper`, `.section--navy`, `.section--lime` | `G1` | `foundations.css` | Shared surface/spacing utilities. Mobile `.section` rules move with them. |
| dark/lime surface focus-token groups | `G1` | `foundations.css` | Cross-cutting focus context, not section presentation. |
| `.eyebrow`, `.eyebrow--light` and pseudo-elements | `G2` | `primitives.css` | Shared class contract; contextual descendant rules remain with their sections. |
| `.button`, `.button--lime`, `.button--navy` and hover/touch overrides | `G2` | `primitives.css` | Shared link styling; markup remains native and unchanged. |
| `.text-link`, `.text-link--light` and hover states | `G2` | `primitives.css` | Retains current inline-flex and underline behaviour. |
| `.section-title-row*` shared typography/layout | `G2` | `primitives.css` | Reused by Process, Solutions, Supporting Proof and Insights. |
| `.section-intro*` | `S1` | Problem section during Phase 3 | One current owner; not a global primitive. |
| `.brand`, `.brand img` | `G2` | `primitives.css` | Shared by header and footer. |
| `.brand--footer` | `C1` | Footer during Phase 3 | Context-specific variant; not moved in Phase 2. |
| `.icon-arrow` | `C1` | existing `ArrowIcon.astro` | Any future icon styling belongs in the icon component. |
| `body.menu-open` | layout-global exception | `SiteHeader.astro` using `:global(body.menu-open)` or a very small global state file | JS-controlled document state cannot be Astro-scoped normally. |
| `main, .utility-bar, .site-header, .hero, .footer` width guard | `G1` | `foundations.css` | Keep as a documented global overflow guard until equivalent root rules are proven. |
| global reduced-motion reset on `html`, `*` and pseudo-elements | `G1` | `foundations.css` | Section-specific reduced-motion rules should still move locally. |

## Layout components

| Selector family | Owner | Planned destination | Coupling to preserve |
| --- | --- | --- | --- |
| `.utility-bar*` | `C1` | `UtilityBar.astro` | 42rem visibility/spacing rules move with the component. |
| `.site-header`, `.site-header__inner` | `S1` | `SiteHeader.astro` | Absolute/fixed transition and 75rem/42rem states. |
| `.site-header.is-scrolled` | `C1` state | `SiteHeader.astro` | `navigation.ts` toggles `is-scrolled` at 72px. |
| `.site-header.menu-active` | `C1` state | `SiteHeader.astro` | `navigation.ts` toggles it with the mobile menu. |
| `.desktop-nav*` | `C1` | `SiteHeader.astro`, or a `PrimaryNav.astro` only if reused | `[aria-current="location"]` is set by navigation logic. |
| `.header-cta` | `C1` or `G2` primitive instance | Prefer `ButtonLink` variant if computed styles can be preserved | Do not merge visually different CTAs only for naming symmetry. |
| `.menu-toggle*`, `[aria-expanded="true"]` and positional spans | `C1` | `SiteHeader.astro` | Component must keep both line spans and `.sr-only` label. |
| `.mobile-nav*`, `.mobile-nav.is-open` | `C1` state | `SiteHeader.astro` or `MobileNav.astro` | JS requires `.mobile-nav`, `is-open`, `aria-hidden` and `inert`. Short-height rules move too. |
| `.footer` | `S1` | `SiteFooter.astro` | Root surface and responsive padding. |
| `.footer__lead`, `.footer__grid`, `.footer__contact`, `.footer__base` and descendants | `C1` | `SiteFooter.astro` | 61rem, 42rem and 30rem layouts move with footer. |

## Homepage section ownership

Every unlisted descendant that begins with a row's prefix belongs to the same owner unless it is called out in the cross-section table.

| Prefix/root | Ownership | Component | Child extraction candidates | State/positional contract |
| --- | --- | --- | --- | --- |
| `.hero`, `.hero__*`, `.hero-line*` | `S1`/`C1` | `HeroSection.astro` | `HeroProof.astro` only after its alignment test is retained | `data-hero*`; arc path animation; full-bleed clipping; 42rem and short-height layouts |
| `.trust`, `.trust__*` | `S1` | `TrustSection.astro` | `TrustClientLogo.astro`, credential item | Two equal client tiles; 65px maximum; logo-specific sizing |
| `.trust-client*` | `C1` | `TrustClientLogo.astro` | — | `min-width: 0`; overflow containment; Johnsons/Salvation Army variants |
| `.problem`, `.problem__*` | `S1`/`C1` | `ProblemSection.astro` | `FragmentedModel.astro` is a strong candidate | `data-fragment`, connector and answer hooks; local clipping; 320px-safe assembly |
| `.problem__fragments span:nth-child(...)` | `C1` positional | `FragmentedModel.astro` | Replace with explicit tone variants only in a parity-preserving change | Current content order drives colours and animation offsets |
| `.system`, `.system__*` | `S1` | `SystemSection.astro` | `SystemCard.astro`, decision card, evidence media | `data-system`, path/card hooks; stage clipping; short-height behaviour |
| `.system-card*` and `nth-child(...)` | `C1` positional | `SystemCard.astro` | Expose `tone`/`size` props before removing position selectors | Card 2/3 colours and heights depend on order |
| `.process`, `.process__*` | `S1` | `ProcessSection.astro` | `ProcessStep.astro`, evidence media | `data-process*`; grid-border position logic; mobile number/title alignment |
| `.process-step*`, `first-of-type`, `nth-of-type(...)` | `C1` positional | `ProcessStep.astro` plus parent grid | Parent owns grid-edge borders; child owns number/copy |
| `.case-study`, `.case-study__*` | `S1`/`C1` | `FeaturedProjectSection.astro` | `StatList.astro`, sticky media | `data-case-image`; `min-width: 0`; 4:3 narrow/short media; three facts |
| `.surveys`, `.surveys__*` | `S1` | `SurveySection.astro` | `SurveyTier.astro` and `SurveyTierMobile.astro` | Desktop and mobile representations must stay semantically synchronised |
| `.survey-tier*`, positional border rules | `C1` positional | corresponding survey-tier component and grid parent | Explicit edge props are preferable once parity is locked | 75rem/61rem border patterns; mobile details/open state |
| `.solutions`, `.solutions__*` | `S1` | `SolutionsSection.astro` | `SolutionRow.astro`, `SolutionImage.astro` | `data-solution-row/image`; `is-active`; sticky media; `min-width: 0` |
| `.solution-row*`, `.solution-image*` | `C1` state | child components within solutions | — | GSAP toggles `is-active`; touch hover must remain neutralised |
| `.aftercare`, `.aftercare__*` | `S1`/`C1` | `AftercareSection.astro` | service item if reused | `data-aftercare`; quote responsive rules |
| `.proof-grid`, `.proof-grid__*` | `S1` | `SupportingProofSection.astro` | `ProofCard.astro` | `data-proof`; card variants and top/bottom spacing tests |
| `.proof-card*` | `C1` | `ProofCard.astro` | — | project/coverage/capability variants; hover image; mobile span rules |
| `.insights`, `.insights__*` | `S1` | `InsightsSection.astro` | `InsightCard.astro` | Last-card grid spanning at responsive sizes |
| `.insight-card*` | `C1` | `InsightCard.astro` | — | Hover image/title; touch hover neutralisation |
| `.final-cta`, `.final-cta__*` | `S1`/`C1` | `FinalCtaSection.astro` | Arc decorative primitive only if also used elsewhere with one API | `data-final-cta/arc`; root clipping and mobile list layout |

## Cross-section and composition selectors

These rules must be resolved explicitly; copying them into whichever component is edited first would create hidden coupling.

| Current selector/group | Ownership | Resolution |
| --- | --- | --- |
| `.trust + .problem` | `P1` | Keep in `index.astro` composition styles or a homepage composition stylesheet. It expresses spacing between ordered siblings. |
| `.proof-grid + .insights` | `P1` | Same: page-order spacing, not proof or insight internals. |
| `.hero__arc path, .system__arc path, .final-cta > svg path` | cross-section visual pattern | Either introduce a tested `ArcGraphic.astro` primitive or split identical declarations into each owning component. Do not retain a global reach-through group. |
| `.system__evidence, .process__evidence` and their shared image/overlay/caption selectors | cross-section visual pattern | Consider an `EvidenceMedia.astro` primitive only if markup and responsive behaviour are identical; otherwise split. |
| `.solutions__layout, .case-study__layout` | responsive coincidence | Split into the two section owners. Their sticky-media requirements already differ. |
| `.proof-grid__items, .insights__grid` | responsive coincidence | Split unless a genuine reusable card-grid primitive is introduced with explicit column/span props. |
| `.proof-card--project, .proof-card:last-child, .insight-card:last-child` | mixed parents | Parent grids own spanning; child cards must not know they are last. Replace with parent-provided class/variant if extracted. |
| `.case-study__media img, .system__evidence img, .process__evidence img, .solution-image img, .proof-card img, .insight-card img` | global mobile image reset | Move an equivalent rule to each owner or promote a real media primitive. Preserve focal-position variables. |
| `.insight-card:hover img, .button:hover`, `.proof-card:hover img` in touch query | touch behaviour | Move each neutralisation with its owner. Do not keep a mixed global hover group. |
| shell alignment across header, hero and footer | `G1` shared contract | Continue consuming `.page-shell`; do not reproduce shell width locally. |

## Responsive ownership map

`responsive.css` is ordered by query. During Phase 2 each rule moves with its base owner, but these conditions and cascade relationships remain unchanged initially.

| Query | Responsibility | Migration requirement |
| --- | --- | --- |
| `max-width: 75rem` | Navigation switch; tablet grids; section column changes | Move navigation rules with header and each section rule with its section. Keep the breakpoint exact. |
| `max-width: 61rem` | Single-column/sticky release; card/grid reductions | Co-locate section rules; retain `min-width: 0` and media sizing. |
| `max-width: 42rem` | Mobile typography, spacing, alternate survey UI and compact cards | Move complete mobile blocks, not isolated declarations. Keep desktop survey grid hidden and mobile details visible as a coordinated pair. |
| `prefers-reduced-motion: reduce` | Global scroll/motion reset | Keep global reset; move future component-specific animation resets locally. |
| `max-width: 61rem` after reduced-motion block | Clears active solution-row desktop treatment | Move to `SolutionRow`. Preserve its later cascade position or specificity. |
| `hover: none` and `max-width: 61rem` | Cancels hover-only transforms on touch layouts | Move rules with ButtonLink, ProofCard and InsightCard. |
| `max-height: 44rem` and `max-width: 75rem` | Short viewport navigation, hero and compact media | Move with owners; preserve the 4:3 media constraint and height cap. |
| `max-width: 30rem` | 320–480px compaction | Move with owners; keep token and generic section overrides global. |

## JavaScript and CSS state contract

| Hook/state | Producer | Consumer | Rule during extraction |
| --- | --- | --- | --- |
| `data-header` | `SiteHeader.astro` | `navigation.ts` | Preserve. |
| `.menu-toggle`, `.mobile-nav` | `SiteHeader.astro` | `navigation.ts`, CSS | Preserve selectors until navigation tests pass. |
| `is-scrolled`, `menu-active`, `is-open`, `body.menu-open` | `navigation.ts` | header/mobile CSS | State names are public internal contracts for this refactor. |
| `aria-current="location"` | `navigation.ts` | desktop/mobile nav CSS and tests | Preserve semantic state. |
| `data-hero*`, `data-arc-path` | Hero | `hero.ts`, path animation | Preserve. |
| `data-reveal` | many sections | `reveals.ts` and reduced-motion test | Reusable primitives must forward it. |
| `data-problem-model`, `data-fragment`, `data-problem-connector`, `data-answer` | Problem model | `problem.ts` and containment tests | Keep the complete hook set in one owner. |
| `data-system`, `data-system-path`, `data-system-card` | System | `system.ts`, path animation | Preserve. |
| `data-process`, `data-process-line`, `data-process-step` | Process | `process.ts` | Preserve. |
| `data-case-image`, `.case-study__story` | Featured project | `projects.ts` | Prefer a data hook for story in a later behaviour-only change; do not combine with CSS move. |
| `data-solution-row`, `data-solution-image`, `is-active` | Solutions | `solutions.ts`, CSS | Child components must forward numeric values exactly. |
| `data-aftercare` | Aftercare | section markup and future behaviour | Preserve the section hook. The unconsumed optional orb hook and dormant module were removed in Phase 4. |
| `data-final-cta`, `data-final-arc` | Final CTA | `final-cta.ts`, path animation | Preserve. |

## Positional selector risk register

| Area | Current dependency | Safer future contract |
| --- | --- | --- |
| Fragment cards | second, third and fifth child control colour | `tone="navy|violet|paper"` in content data |
| System cards | second/third child control height, colour and copy tone | explicit `tone` and optional `size` props |
| Process steps | first/fourth/odd positions control grid borders | parent calculates edge classes or CSS grid uses explicit parent separators |
| Survey tiers | even/last-two/first-two positions control borders | parent passes row/column edge flags |
| Proof/insight grids | last child controls span | parent layout supplies a span class/prop |
| Footer contact | first link receives display treatment | explicit contact-link class |
| Footer legal | last link receives auto margin | explicit trailing-link class |
| Menu icon | second/third spans form the two lines | named line classes within `MenuToggle` |

Do not clean up these selectors while simultaneously moving them unless the corresponding functional and visual test is added first. Structural extraction and selector redesign should be separate, reviewable commits.

## Phase 3 component boundary candidates

The existing 12 section components remain the page-level owners. Phase 3 proceeds vertically in the agreed order and may extract repeated or independently testable children where they have a coherent API. Global primitive classes remain in `primitives.css` unless a component has a separate semantic or behavioural reason to exist.

```text
components/
├── home/
│   ├── HeroSection.astro
│   ├── TrustSection.astro
│   ├── TrustClientLogo.astro
│   ├── ProblemSection.astro
│   ├── FragmentedModel.astro
│   ├── SystemSection.astro
│   ├── SystemCard.astro
│   ├── ProcessSection.astro
│   ├── ProcessStep.astro
│   ├── FeaturedProjectSection.astro
│   ├── SurveySection.astro
│   ├── SurveyTier.astro
│   ├── SurveyTierMobile.astro
│   ├── SolutionsSection.astro
│   ├── SolutionRow.astro
│   ├── AftercareSection.astro
│   ├── SupportingProofSection.astro
│   ├── ProofCard.astro
│   ├── InsightsSection.astro
│   ├── InsightCard.astro
│   └── FinalCtaSection.astro
├── layout/
│   ├── UtilityBar.astro
│   ├── SiteHeader.astro
│   └── SiteFooter.astro
└── media/
    ├── ArrowIcon.astro
    └── ResponsiveImage.astro
```

This is a boundary proposal, not a requirement to create every file. A component should be extracted only when it has a coherent API and owns its DOM, styles, responsive states and accessibility contract. One-off wrappers with no independent contract should remain inside their section.

## Phase 1 completion criteria

Phase 1 is complete when this register is accepted and the following remain true:

- no runtime source, markup or CSS has changed;
- the authoritative checksum and build metrics are recorded;
- all current selector families have an owner;
- page-composition and cross-section selectors are explicitly identified;
- JS state/data hooks are registered;
- positional-selector risks have a migration strategy;
- the approved Phase 2 visual baselines remain committed and protected by validation.
