import gsap from "gsap";
import { animatePath } from "./path";

export function animateHero(): void {
  const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

  timeline
    .from("[data-hero-line]", {
      yPercent: 112,
      duration: 1.15,
      stagger: 0.11,
    })
    .from(
      "[data-hero-item]",
      {
        y: 34,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      },
      "-=0.68",
    )
    .from(
      ".hero__proof > div",
      {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
      },
      "-=0.55",
    );

  gsap.fromTo(
    "[data-hero-image] img",
    { scale: 1.11, clipPath: "inset(0 0 100% 0)" },
    { scale: 1.02, clipPath: "inset(0 0 0% 0)", duration: 1.55, ease: "power4.inOut" },
  );

  gsap.to("[data-hero-image] img", {
    yPercent: 8,
    ease: "none",
    scrollTrigger: {
      trigger: "[data-hero]",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  animatePath("[data-arc-path]", {
    trigger: "[data-hero]",
    start: "top 80%",
    end: "55% 40%",
    scrub: 1.2,
  });
}
