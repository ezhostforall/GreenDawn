import gsap from "gsap";

export function animateTechnology(): void {
  gsap.from(".technology__image--one", {
    x: -70,
    y: 40,
    rotate: -2.5,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "[data-technology]",
      start: "top 72%",
    },
  });

  gsap.from(".technology__image--two", {
    x: 75,
    y: 65,
    rotate: 3,
    opacity: 0,
    duration: 1,
    delay: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "[data-technology]",
      start: "top 72%",
    },
  });

  gsap.from(".technology__criteria", {
    y: 60,
    scale: 0.92,
    opacity: 0,
    duration: 0.9,
    delay: 0.3,
    ease: "back.out(1.25)",
    scrollTrigger: {
      trigger: "[data-technology]",
      start: "top 72%",
    },
  });
}
