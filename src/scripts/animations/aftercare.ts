import gsap from "gsap";

export function animateAftercare(): void {
  gsap.to("[data-aftercare-orb]", {
    rotate: 38,
    xPercent: -5,
    yPercent: 9,
    ease: "none",
    scrollTrigger: {
      trigger: "[data-aftercare]",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.1,
    },
  });
}
