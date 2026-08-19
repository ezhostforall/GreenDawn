import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function initialiseSolutionStory(): void {
  const rows = gsap.utils.toArray<HTMLElement>("[data-solution-row]");
  const images = gsap.utils.toArray<HTMLElement>("[data-solution-image]");

  if (!rows.length || !images.length) return;

  const media = gsap.matchMedia();

  media.add("(min-width: 62rem)", () => {
    let activeIndex = 0;
    gsap.set(images, { autoAlpha: 0 });
    gsap.set(images[0], { autoAlpha: 1 });

    const activate = (index: number): void => {
      if (index === activeIndex || !images[index]) return;

      rows[activeIndex]?.classList.remove("is-active");
      rows[index]?.classList.add("is-active");

      gsap.to(images[activeIndex], {
        autoAlpha: 0,
        scale: 1.035,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.fromTo(
        images[index],
        { autoAlpha: 0, scale: 1.06 },
        { autoAlpha: 1, scale: 1, duration: 0.72, ease: "power3.out" },
      );
      activeIndex = index;
    };

    const cleanups: Array<() => void> = [];

    rows.forEach((row, index) => {
      const trigger = ScrollTrigger.create({
        trigger: row,
        start: "top 58%",
        end: "bottom 43%",
        onEnter: () => activate(index),
        onEnterBack: () => activate(index),
      });

      const onPointerEnter = (): void => activate(index);
      const onFocus = (): void => activate(index);
      row.addEventListener("pointerenter", onPointerEnter);
      row.addEventListener("focus", onFocus);

      cleanups.push(() => {
        trigger.kill();
        row.removeEventListener("pointerenter", onPointerEnter);
        row.removeEventListener("focus", onFocus);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  });
}
