# Phase 3 vertical component migrations

Phase 3 moves component-owned CSS, responsive states and interaction states beside the Astro components that render their DOM. This corrected delivery is paired with Phase 4 so the component and motion boundaries can be verified together. The migration preserves the Phase 2 design, content, URLs, accessibility semantics and animation hooks.

## Migration order

The agreed low-to-high-risk order was followed:

1. Utility Bar
2. Footer
3. Trust
4. Insights
5. Supporting Proof
6. Aftercare
7. Surveys
8. Process
9. Final CTA
10. Featured Case Study
11. Solutions
12. System
13. Problem
14. Hero
15. Header and mobile navigation

Every owner now contains its base, responsive, touch and short-height rules in a local `<style is:global>` block. Global selectors are intentional during this parity-preserving phase: they retain the existing class contract and avoid Astro scope attributes changing selector behaviour. Component APIs and explicit variant classes remove the positional dependencies that crossed extracted component boundaries.

## Extracted child components

| Component | Contract |
| --- | --- |
| `TrustClientLogo.astro` | Optimised client logo tile with an explicit brand variant. |
| `InsightCard.astro` | Insight content, responsive image and parent-supplied grid variants. |
| `ProofCard.astro` | Project/coverage/capability card with explicit parent-grid variants. |
| `SurveyTier.astro` | Desktop survey tier with index-derived edge variants. |
| `SurveyTierMobile.astro` | Accessible mobile disclosure for the same typed survey data. |
| `ProcessStep.astro` | Typed process step with explicit first/fourth/odd layout variants. |
| `SolutionImage.astro` | Animated solution-media state and data hook. |
| `SolutionRow.astro` | Linked solution row, state class and animation hook. |
| `SystemCard.astro` | Typed layer card with explicit base/violet/cream tone. |
| `FragmentedModel.astro` | Complete fragmented-model DOM and animation-hook contract. |
| `SurveyTierDescription.astro` | Shared survey description DOM and label styling used by both desktop and mobile presentations. |
| `SurveyTierCta.astro` | Shared survey enquiry link, native-attribute forwarding and CTA styling. |

One-off wrappers remain inside their section components. Shared visual primitives remain in `primitives.css`; no wrapper components were created solely to own a class.

## Deliberately retained global files

Phase 5, not Phase 3, removes the legacy stylesheet files. For now:

- `navigation.css`, `home.css` and `footer.css` remain as imported migration placeholders;
- `responsive.css` retains global token, heading, section-spacing and reduced-motion rules;
- `foundations.css` retains resets, document defaults, accessibility utilities, surfaces and overflow guards;
- the two sibling-order spacing rules live in the `index.astro` composition layer;
- the `body.menu-open` document-state rule lives with `SiteHeader.astro`.

## Preserved runtime contracts

All existing `data-*` animation hooks, navigation state classes, accessibility attributes and content order are unchanged. Reusable wrappers, links, images and icons forward native attributes while retaining their required internal hooks. Phase 4 introduces the shared runtime described in `refactor-phase-04.md`; the animation values and trigger selectors remain unchanged.

## Validation

The completed migration passes:

- Greendawn naming validation;
- Astro diagnostics with 0 errors, 0 warnings and 0 hints across 59 files;
- the production build and production HTML/assets validator;
- component-contract checks for extracted repeated components and their explicit variants;
- a generated-HTML comparison showing that output differs from Phase 2 only by the new explicit variant classes;
- a generated-HTML comparison showing the corrected output is identical to the reviewed Phase 3 output after normalising only its explicit mobile CTA variant and content-hashed bundle names;
- a compiled-CSS multiset comparison showing all 1,745 live selector-context declarations match Phase 3 after excluding only the 35 declarations attached to demonstrably dormant selectors;
- ownership checks preventing Problem and Survey child selectors from returning to their former parents;
- native-attribute forwarding on extracted reusable wrappers, links, images and icons;
- the seven approved Phase 2 visual baselines at their original project widths.

The supplied browser-enabled environment reported the Phase 2 functional and visual suites passing. Browser execution for this combined Phase 3/4 archive remains a hand-off because Playwright Chromium installation is intentionally not attempted in this environment:

```sh
pnpm run test:e2e
pnpm run test:visual
```

Do not update screenshot baselines to conceal a mismatch.
