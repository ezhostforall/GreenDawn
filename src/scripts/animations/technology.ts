import gsap from "gsap";

export function animateTechnology(): () => void {
  const media = gsap.matchMedia();
  media.add("(min-width: 42.01rem)", () => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: "[data-technology]", start: "top 74%" }, defaults: { duration: 0.72, ease: "power3.out" } });
    timeline
      .from(".technology__image--one", { x: -38, y: 24, rotate: -1.2, opacity: 0.35 })
      .from(".technology__image--two", { x: 42, y: 34, rotate: 1.4, opacity: 0.35 }, "-=0.52")
      .from(".technology__criteria", { y: 28, opacity: 0.45 }, "-=0.42");
  });
  media.add("(max-width: 42rem)", () => {
    gsap.from(".technology__visual", { y: 24, opacity: 0.6, duration: 0.55, ease: "power2.out", scrollTrigger: { trigger: "[data-technology]", start: "top 84%" } });
  });
  return () => media.revert();
}
