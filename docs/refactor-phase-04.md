# Phase 4 shared motion runtime

Phase 4 is delivered with the corrected Phase 3 component migration. It centralises motion infrastructure without changing the section-specific animation values, selectors, order or responsive conditions.

## Runtime boundary

`src/scripts/motion/runtime.ts` is the only module that imports GSAP and ScrollTrigger directly. It owns:

- one ScrollTrigger registration point;
- the reduced-motion preference read;
- the page-level GSAP context;
- cleanup registration for animation-owned match-media and event handlers;
- refresh after fonts and eager images are ready;
- animation-frame-debounced refresh after resize;
- refresh after back-forward-cache restoration;
- idempotent teardown.

Every module in `src/scripts/animations/` imports `gsap` and, where needed, `ScrollTrigger` from the runtime. `home.ts` remains the composition root: it starts navigation, registers the existing section animations in their established order, and tears down navigation and motion when the document leaves the active history entry.

## Lifecycle correction

The former `pagehide` listener used `{ once: true }`. A persisted bfcache navigation consumed that listener without tearing the page down, so a later non-persisted navigation could miss cleanup. The listener now survives persisted transitions, refreshes on `pageshow`, and removes itself only during final teardown.

## Deliberately unchanged

- GSAP durations, easing, stagger values and scroll ranges;
- fine-pointer desktop media queries;
- every `data-*` hook and state class;
- reduced-motion content visibility;
- section-owned animation logic;
- the static HTML and CSS presentation.

The dormant `aftercare.ts` module was removed after confirming that its optional `[data-aftercare-orb]` hook has no producer and that the module was not imported by the composition root.

## Validation contract

The production validator fails if an animation module imports GSAP directly, if the runtime stops registering ScrollTrigger, or if any of the seven approved visual baselines is missing or has the wrong project width. Browser-enabled sign-off still runs the existing functional and visual suites across all seven projects.
