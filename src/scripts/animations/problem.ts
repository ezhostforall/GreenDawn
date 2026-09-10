import gsap from "gsap";

export function animateProblem(): void {
  gsap.from("[data-fragment]", {
    y: 18,
    duration: 0.55,
    stagger: 0.09,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "[data-problem-model]",
      start: "top 78%",
    },
  });

  gsap.from("[data-answer]", {
    scale: 0.97,
    y: 28,
    duration: 0.62,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "[data-answer]",
      start: "top 85%",
    },
  });
}
