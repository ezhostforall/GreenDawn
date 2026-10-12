# Greendawn typography consistency — Batch 5

## Result

The corrected Batch 4 homepage now consumes continuous role-based typography tokens. The approved fonts, weights, colours, copy, URLs, component structure and motion behaviour are retained. The hero H1 keeps its existing display treatment.

- Fixed the undefined survey subheading property by using `--type-card`.
- Replaced substantive description sizing in system cards, the coordination model, process stages, solution rows and supporting projects with `--type-body` (16–18px at a 16px root).
- Introduced `--type-secondary` and `--type-action` for readable 14–16px supporting information, labels, validation errors, privacy copy, optional-field labels, navigation and actions.
- Reserved `--type-caption` (12–14px) for short supplementary eyebrows, numbering and image captions.
- Unified system, process, solution, survey and supporting-project headings under `--type-card` (24–32px). Compact aftercare labels, technical guide titles and insight headlines use `--type-compact` (20–24px).
- Removed the mobile font-size replacements for section H2s, system and solution titles, supporting-project titles, project metrics, survey price, aftercare statement and closing CTA. Layout and spacing breakpoints remain.
- Added continuous price and closing-display scales. Kept the numbered body aliases for existing consumers.
- Corrected the earlier brand-gate failure in `docs/content-batch-04.md` without renaming any deployment URL.

## Token contract

| Role | Token | Range at a 16px root |
| --- | --- | --- |
| Main explanations | `--type-body` | 16–18px |
| Secondary information and field labels | `--type-secondary` | 14–16px |
| Buttons, links and navigation | `--type-action` | 14–16px |
| Eyebrows and supplementary captions | `--type-caption` | 12–14px |
| Lead paragraphs | `--type-lead` | 18–24px |
| Comparable content headings | `--type-card` | 24–32px |
| Compact service and insight headings | `--type-compact` | 20–24px |
| Section headings | `--type-section` | 37.6–68px |
| Aftercare statement | `--type-statement` | 46.4–116px |
| Closing CTA | `--type-closing` | 64–144px |
| Survey price | `--type-price` | 60.8–120px |

The scales combine rem and viewport units and remain bounded by rem limits. These ranges describe default rendering, not an assurance of WCAG compliance or native zoom behaviour. Use weight, colour, spacing and content role to establish hierarchy; do not introduce a smaller local override merely to make a layout fit.

## Rendered measurements

Measured in Chromium with the local fonts loaded, reduced motion and a 16px root. Values rounded to one decimal place.

| Role | 390px | 671px | 673px | 1440px |
| --- | --- | --- | --- | --- |
| Main descriptions | 16.1px | 16.7px | 16.7px | 18.0px |
| Secondary information and actions | 14.1px | 14.4px | 14.4px | 15.3px |
| System / process / solution / project headings | 24.3px | 26.3px | 26.3px | 31.7px |
| Compact aftercare headings | 20.0px | 21.1px | 21.1px | 24.0px |
| Section H2 | 39.8px | 45.4px | 45.5px | 60.8px |
| Closing CTA | 69.5px | 84.9px | 85.0px | 127.2px |

The separate hero H1 and callback-dialog prompts retain their existing responsive display rules.

## Verification on 9 October 2026

- Frozen-lockfile dependency installation completed; no manifest or lockfile changes.
- `pnpm run test:static`: naming, Astro check/build and production contracts passed. Astro reported 0 errors, warnings or hints across 66 files; production checks found one H1, 24 unique IDs and 36 valid local assets.
- `pnpm exec tsc --noEmit`: passed.
- `BASE_URL=/greendawn-preview/ pnpm run build` and the matching `validate:build`: passed.
- Existing `tests/home.spec.ts` executed across all seven configured viewport projects: **126 passed, 56 skipped, 0 failed**. Existing conditions deliberately skip tests irrelevant to a viewport. A temporary local configuration changed only browser launch settings to use the available Chromium binary; it is excluded from the archive.
- The existing 20-width overflow matrix passed, including 320px, 671/672/673px, navigation boundaries, desktop and ultrawide widths. The automated accessibility checks reported no serious or critical findings in their tested states.
- Static property scan found no undefined CSS custom properties in the source.
- Browser measurements checked the type hierarchy and continuity at 320, 390, 671, 672, 673, 976, 977, 1200, 1201, 1280, 1440, 1920 and 2560px.
- Screenshots were inspected for mobile and desktop hierarchy, narrow process copy, system cards, survey pricing and the callback error state. Section captures were used because the available headless renderer repeated content in very tall full-page captures.

## Remaining visual checks

A separate 32px root-size stress check showed clipping in the preserved hero display line and crowding around its fixed header/proof composition. Root-size injection is not native browser zoom. This batch does **not** claim that text enlargement or native zoom passes accessibility requirements. Check 200% and 400% browser zoom, browser default-font enlargement, menu and callback scrolling, and the hero's available space before launch; a focused hero/layout accessibility fix remains necessary if these problems reproduce.

The historical Phase 2 screenshot baselines have not been regenerated. `test:visual` was not used as an acceptance gate for this intentional typography change. Review the current layout before accepting refreshed baselines. No changes were made to the tests, application scripts, assets, content data, configurations or dormant survey-tier components.
