# Canonical navigation batch 01

This batch replaces the homepage-section primary navigation with the current public WordPress information architecture while the Astro homepage remains a drop-in replacement for the WordPress homepage.

## Canonical destinations

The shared configuration in `src/config/navigation.ts` is the single source for desktop, mobile and no-JavaScript primary navigation:

- About Us → `/about-us/`
- Our Projects → `/gallery/`
- Our Solutions
  - Workplace Charging → `/workplace-charging/`
  - Fleet Charging → `/fleet-charging-solutions/`
  - Public Charging → `/public-charging/`
- Aftercare → `/aftercare/`

The brand links to the live homepage. “Discuss your site” remains the header conversion label and continues to open the shared callback tool when JavaScript is available, with `/enquire/` retained as its ordinary-link fallback.

## Behaviour

“Our Solutions” is a native disclosure rather than a redundant link back to the homepage. Native semantics keep the child routes accessible without JavaScript. The client runtime adds mutually exclusive disclosures, outside-click closure and Escape-to-close with focus restoration.

The mobile menu retains its existing focus containment, body-scroll lock, breakpoint reset, back-forward cache reset and sticky-header behaviour. The former scroll-position observer and `aria-current="location"` state were removed because primary navigation no longer represents homepage sections.

## Scope boundary

This batch deliberately does not change:

- homepage section order or copy;
- survey pricing or survey components;
- the public process terminology;
- footer information architecture;
- lead-capture questions, validation, events or submission behaviour;
- motion or section animation behaviour.

## Verification

`tests/home.spec.ts` now checks the canonical destinations, desktop and responsive disclosures, Escape focus restoration, no-JavaScript route availability and the existing callback fallback. Visual baselines are expected to change only in the header and open navigation states.
