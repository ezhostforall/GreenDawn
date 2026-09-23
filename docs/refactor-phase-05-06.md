# Phase 5 CSS closure and Phase 6 production verification

Phase 5 removes the final migration scaffolding. Phase 6 supplies the production sign-off gates without changing the approved page design.

## Phase 5 ownership closure

Final searches confirmed that `home.css`, `navigation.css` and `footer.css` contained no live declarations. The declarations still present in `responsive.css` were global rather than component-owned:

- responsive design-token overrides moved to `tokens.css`;
- responsive `h2` and `.section` foundations moved to `foundations.css`;
- the global reduced-motion safeguard moved to `foundations.css`.

The four legacy files are deleted. `global.css` now imports exactly, and in this order:

1. `tokens.css`;
2. `foundations.css`;
3. `primitives.css`.

The production validator rejects a returning legacy stylesheet or any change to that import contract.

## No-JavaScript resilience

Desktop navigation was already usable without JavaScript, but responsive layouts hid it behind an inert JavaScript-controlled menu. The base layout now begins with a `no-js` class and swaps it to `js` synchronously in the document head. On responsive no-JavaScript layouts, the inactive menu button is hidden and a native `<details>` primary-navigation fallback is available. Core content remains server rendered and visible.

## Phase 6 browser coverage

The existing seven-project functional suite continues to cover structure, navigation, overflow, approved client logos, reduced motion and automated accessibility. It now also covers:

- responsive content and primary navigation with JavaScript disabled;
- back/forward restoration plus the persisted `pageshow` lifecycle;
- portrait, landscape and desktop resizing;
- open mobile-menu cleanup when crossing the desktop breakpoint.

The seven approved Phase 2 visual baselines remain unchanged. Do not update them unless a separately approved visual change is intended.

## Build and request comparison

The Phase 3/4 build was captured immediately before Phase 5, then compared with the final root build using the same toolchain.

| Metric | Phase 3/4 | Phase 5/6 | Change |
| --- | ---: | ---: | ---: |
| Source CSS files | 8 | 4 | −4 legacy files |
| Built CSS bundles | 1 | 1 | none |
| Built CSS, raw | 48,535 bytes | 49,417 bytes | +882 bytes |
| Built CSS, gzip | 9,558 bytes | 9,695 bytes | +137 bytes |
| Stylesheet links in HTML | 1 | 1 | none |
| Module-script links in HTML | 1 | 1 | none |
| Distinct direct local HTML URLs | 18 | 18 | none |
| Files in `dist/` | 58 | 58 | none |

The small CSS increase is the deliberate no-JavaScript responsive navigation fallback. After excluding only those new selectors, a compiled rule-context multiset comparison found all 508 pre-existing rule instances unchanged: zero missing and zero unexpected.

The stylesheet and module-script request slots are unchanged. Responsive-image requests remain browser- and viewport-dependent; the seven-project browser run is the final network inspection gate rather than treating every `srcset` candidate as a request.

## Verification commands

Static checks can run in any dependency-complete environment:

```sh
pnpm run test:static
```

Browser verification is intentionally handed to the browser-enabled development environment:

```sh
pnpm run test:e2e
pnpm run test:visual
```

For the GitHub Pages project-path build, use a non-root base and repeat the production validator:

```sh
rm -rf dist
SITE_URL=https://example.github.io BASE_URL=/greendawn/ pnpm run build
BASE_URL=/greendawn/ pnpm run validate:build
```

After deploying the root or project-path build, inspect the public URL once before beginning Stage 2 or Stage 3. Confirm the canonical and social metadata, all local assets, fragment navigation, responsive menu, no-JavaScript fallback, reduced motion and absence of console/network errors.

## Sign-off boundary

The local static/build and source-level bundle comparisons are recorded above. Functional, visual and deployment inspection remain explicit user-run gates because Playwright browsers are not installed in this environment and the completed archive is not yet deployed. The deployment workflow now runs both functional and visual suites before publishing.
