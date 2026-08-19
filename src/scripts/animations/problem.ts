import gsap from "gsap";

export function animateProblem(): void {
  gsap.from("[data-fragment]", {
    x: (index: number) => (index % 2 === 0 ? -55 : 55),
    y: 35,
    rotate: (index: number) => (index % 2 === 0 ? -2.5 : 2.5),
    opacity: 0,
    duration: 0.75,
    stagger: 0.09,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "[data-problem-model]",
      start: "top 78%",
    },
  });

  gsap.from("[data-answer]", {
    scale: 0.9,
    y: 55,
    opacity: 0,
    duration: 0.9,
    ease: "back.out(1.35)",
    scrollTrigger: {
      trigger: "[data-answer]",
      start: "top 85%",
    },
  });
}
