import { gsap } from "../motion/runtime";

export function animateProjects(): void {
  gsap.to("[data-case-image] img", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: "[data-case-study]",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function animateDesktopProjectStory(): void {
  gsap.to(".case-study__story", {
    yPercent: -3,
    ease: "none",
    scrollTrigger: {
      trigger: "[data-case-study]",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}
