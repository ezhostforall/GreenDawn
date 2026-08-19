import gsap from "gsap";

export function initialiseCounters(): void {
  document.querySelectorAll<HTMLElement>("[data-counter]").forEach((element) => {
    const target = Number(element.dataset.value ?? 0);
    const prefix = element.dataset.prefix ?? "";
    const suffix = element.dataset.suffix ?? "";
    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(counter.value).toLocaleString("en-GB")}${suffix}`;
      },
    });
  });
}
