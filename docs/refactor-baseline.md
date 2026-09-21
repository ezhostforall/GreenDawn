# Component refactor baseline

This document freezes the source and regression contract for the component and CSS ownership refactor. Phases 0 and 1 are documentation and validation work only: they do not change rendered markup, styling, behaviour or content.

## Authoritative source

| Item | Value |
| --- | --- |
| Supplied archive | `greendawn-homepage-stage-01-trust-client-logos-2026-09-16 (2)(1).zip` |
| SHA-256 | `d8de729e69bc35bb9c720b54c2a09229ca1bf386cfc20241515bc72c34c702fc` |
| Verified | 16 September 2026 (UTC) |
| ZIP integrity | Passed; no compressed-data errors |
| Runtime | Node `v24.19.0` |
| Package manager | pnpm `11.19.0` |
| Astro | `7.3.1` |

The checksum matches the previously supplied deployed archive. Any Phase 2 branch must start from this source or document the intervening changes before moving CSS.

## Phase 0 validation result

The following non-browser checks passed against the untouched source:

```text
pnpm install --frozen-lockfile
pnpm run test:static
pnpm exec playwright test --list
```

`test:static` completed with:

- Greendawn naming validation passed;
- Astro diagnostics: 0 errors, 0 warnings and 0 hints across 47 files;
- static production build completed;
- production validation passed with 1 `h1`, 16 unique IDs and 38 local assets checked.

Playwright discovered 105 cases: 15 tests across each of seven configured projects. Browser execution was deliberately left to the browser-enabled development environment; no Playwright browser installation was attempted here.

## Current build budget

These values are a comparison baseline, not a performance target.

| Metric | Baseline |
| --- | ---: |
| Source CSS files | 7 |
| Source CSS rule blocks | 486 |
| Unique selector groups | 344 |
| Source CSS lines | 3,155 |
| Built CSS bundles | 1 |
| Built CSS, raw | 46,535 bytes |
| Built CSS, gzip | 9,549 bytes |
| Built CSS SHA-256 | `256291e48595ce268d514bee9411fd22378bee892ad39df26405c6a0a6576f59` |
| Built JavaScript bundles | 1 |
| Built JavaScript, raw | 121,413 bytes |
| Built JavaScript, gzip | 46,639 bytes |
| Built JavaScript SHA-256 | `a8c5308891de0116c2345ad4d8ac7263e6c69d466d944eaceab5518650a00160` |
| Files in `dist/` | 58 |
| Total `dist/` size | 4,670,287 bytes |
| Distinct local URLs in built HTML | 18 |

The 18 local URLs are HTML references, not a browser network-request count. Responsive image selection and native lazy loading make the actual request count viewport- and browser-dependent. Record browser request counts alongside the visual screenshots in the development environment if they are required as a Phase 2 acceptance metric.

## Current source topology

| Area | Baseline |
| --- | ---: |
| Astro components | 17 |
| Homepage section components | 12 |
| Layout components | 3 |
| Media components | 2 |
| Animation modules | 10 |
| Functional E2E source tests | 14 |
| Visual E2E source tests | 1 |

The page composition order is:

1. utility bar;
2. site header;
3. hero;
4. trust;
5. problem;
6. system;
7. process;
8. featured project;
9. surveys;
10. solutions;
11. aftercare;
12. supporting proof;
13. insights;
14. final CTA;
15. site footer.

Changing this order is outside the component refactor and would invalidate adjacency rules recorded in the ownership register.

## Viewport matrix

| Project | Browser/device semantics | Viewport |
| --- | --- | --- |
| `desktop` | Desktop Chrome | 1440 × 900 |
| `narrow` | Pixel 5 mobile/touch/UA with overridden dimensions | 320 × 568 |
| `mobile` | Pixel 5 | 390 × 844 |
| `tablet` | iPad Pro 11 | Device preset |
| `short` | Desktop Chrome | 1280 × 640 |
| `wide` | Desktop Chrome | 1920 × 1080 |
| `ultrawide` | Desktop Chrome | 2560 × 1440 |

The functional suite additionally checks 20 breakpoint-boundary widths from 320px to 2560px. Do not replace the `narrow` project with a plain desktop context: its mobile viewport semantics are part of the overflow regression coverage.

## Locked functional contracts

Phase 2 must keep every existing assertion green. In particular:

- one visible `h1` and working local navigation;
- no document-level horizontal overflow initially, during the problem/system/solutions animations, or at the breakpoint boundary matrix;
- both approved client logos remain visible, accessible, contained and in equal-height tiles no taller than 65px;
- active navigation clears in sections with no corresponding primary navigation item;
- mobile navigation maintains its accessible name, closes on Escape, restores focus and clears `body.menu-open`;
- reduced-motion content stays visible;
- no automatically detectable serious or critical Axe violations;
- header, hero and footer share the same horizontal shell on wide layouts;
- hero proof numbers remain optically centred against their titles;
- narrow fragmented-model rows, process alignment and media bounds remain compact;
- narrow project media stays at or below 0.76 × its width;
- the managed-relationship statement remains contained;
- proof-card label/body spacing and supporting type remain consistent;
- mobile survey tiers remain expandable.

## Regression-sensitive implementation details

The following rules were introduced to fix real failures and must not disappear during extraction:

- `min-width: 0` on grid/flex descendants, especially `.solutions__layout > *`, `.solutions__media`, `.case-study__layout > *` and `.case-study__media`;
- local clipping at `.hero`, `.problem__model`, `.system` and other animation boundaries;
- the 4:3 compact media treatment for `.case-study__media` and `.solutions__media` on short/narrow viewports;
- `.trust-client__logo--salvation-army { max-height: 2.5rem; }` within the fixed-height logo row;
- centred hero proof alignment rather than baseline alignment;
- responsive problem fragments that assemble without widening a 320px mobile layout;
- page-shell alignment between header, hero content and footer;
- `prefers-reduced-motion` visibility and transform reset behaviour;
- hover neutralisation for touch layouts.

## Visual baseline status

`tests/home.visual.spec.ts` runs a full-page, reduced-motion screenshot in every configured project. The seven Linux reference images generated from the successful Phase 2 run are now committed in `tests/home.visual.spec.ts-snapshots/` at their original project widths: 320, 390, 834, 1280, 1440, 1920 and 2560 pixels.

The production validator checks that every expected PNG exists and retains the correct project width. Baselines must only be updated after an intentional visual change has been reviewed; never update them to conceal a refactor mismatch.

## Phase 2 entry gate

Component extraction may begin only when:

- this source checksum is retained in the change record;
- `pnpm run test:static` passes;
- the functional suite passes in the browser-enabled environment;
- the seven untouched visual baselines have been generated, approved and retained;
- any browser request-count and geometry measurements required for sign-off have been recorded;
- the ownership rules in `style-ownership-register.md` are accepted.

During Phase 2, move one ownership unit at a time, run static validation after every unit and run the full browser/visual suite before merging each extraction batch.
