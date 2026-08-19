import gsap from "gsap";

export function animateReveals(): void {
  const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");

  revealItems.forEach((item) => {
    gsap.set(item, { visibility: "visible" });
    gsap.from(item, {
      y: 52,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 87%",
        once: true,
      },
    });
  });
}

export function revealWithoutMotion(): void {
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
    item.style.visibility = "visible";
  });
}
