# Hero arc animation hotfix

The hero arc previously used the shared scroll-driven path helper. Because the hero starts at the top of the document, its trigger range began above the initial viewport and the arc could be calculated as mostly or fully drawn before the visitor saw it move.

The hero now uses a dedicated entrance draw lasting 1.25 seconds, beginning alongside the existing hero entrance sequence. The system and final-CTA arcs remain scroll-driven because those sections enter later in the document.

The existing early `html.js` capability switch also applies the undrawn dash state in CSS before the first paint. This prevents the complete arc flashing before GSAP initialises while leaving the complete SVG visible when JavaScript is unavailable.

The existing motion runtime still owns setup and teardown. The tween is explicitly killed during cleanup, and a component-owned reduced-motion rule restores the fully drawn static SVG because motion initialisation is bypassed when `prefers-reduced-motion: reduce` is active.

The production validator guards the distinction so the hero arc cannot accidentally be returned to the unsuitable scroll-trigger configuration.
