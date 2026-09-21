# Phase 2 global CSS foundation

Phase 2 creates a dedicated global stylesheet for genuinely shared visual primitives. It deliberately makes no component, markup, API, content, motion or JavaScript changes.

## Authoritative source

| Item | Value |
| --- | --- |
| Supplied archive | `greendawn-homepage-refactor-phases-00-01-2026-09-16 (1)(1).zip` |
| SHA-256 | `7f33a41284b1333df44f75f1862716ac2424f5656617712b0b1688693b123581` |
| ZIP integrity | Passed |
| Baseline built CSS | 46,535 bytes; SHA-256 `256291e48595ce268d514bee9411fd22378bee892ad39df26405c6a0a6576f59` |
| Baseline built JavaScript | 121,413 bytes; SHA-256 `a8c5308891de0116c2345ad4d8ac7263e6c69d466d944eaceab5518650a00160` |

## Rules moved to `primitives.css`

- `.eyebrow` and `.eyebrow--light`, including their pseudo-elements;
- `.button`, its lime/navy variants, hover states and touch-hover neutralisation;
- `.text-link`, its light hover state and shared interaction styling;
- reused `.section-title-row` and compact-row layout/typography rules, including their 61rem responsive state;
- shared `.brand` and `.brand img` rules, including the 42rem width override.

`global.css` imports `primitives.css` immediately after `foundations.css`.

## Rules deliberately not moved

- `.section-intro*` is used only by the Problem section and remains for that Phase 3 vertical migration;
- `.brand--footer` is footer-specific and remains in `footer.css`;
- contextual selectors such as `.hero .eyebrow`, `.mobile-nav .button` and `.hero__actions .text-link--light` remain with their current owners;
- no Astro wrapper components were created merely to own shared classes;
- no component source, content, client script, motion module or test was changed.

## Validation

`pnpm run test:static` passes with:

- Greendawn naming validation passed;
- Astro diagnostics: 0 errors, 0 warnings and 0 hints across 47 files;
- production build completed;
- production validation passed with 1 `h1`, 16 unique IDs and 38 local assets checked.

Generated-output comparison against the untouched Phase 0/1 build confirms:

- rendered HTML is byte-identical after normalising only the content-hashed CSS filename;
- built client JavaScript is byte-identical;
- all 543 effective selector, media-context and declaration entries are identical;
- no selector family has duplicate ownership across the source stylesheets.

The built CSS is 227 bytes larger because two previously comma-grouped rules were split at ownership boundaries: the one-off Problem intro remains outside the shared title-row rules, and button touch behaviour is separated from unrelated card hover rules. This is structural duplication in the minified bundle, not a visual or behavioural difference.

## Browser hand-off

Run the existing functional and visual suites in the browser-enabled development environment:

```sh
pnpm run test:e2e
pnpm run test:visual
```

Do not update visual baselines to hide a mismatch. Any failure should be investigated against the untouched Phase 0/1 source before Phase 3 begins.
