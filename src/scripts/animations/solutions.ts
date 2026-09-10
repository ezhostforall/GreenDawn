import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function initialiseSolutionStory(): () => void {
  const rows = gsap.utils.toArray<HTMLElement>("[data-solution-row]");
  const images = gsap.utils.toArray<HTMLElement>("[data-solution-image]");
  if (!rows.length || !images.length) return () => undefined;
  const media = gsap.matchMedia();
  media.add("(min-width: 62rem)", () => {
    let activeIndex = 0;
    gsap.set(images, { visibility: "hidden", scale: 1 });
    gsap.set(images[0], { visibility: "visible" });
    const activate = (index: number): void => {
      if (!images[index] || index === activeIndex) return;
      gsap.killTweensOf(images);
      rows.forEach((row, rowIndex) => row.classList.toggle("is-active", rowIndex === index));
      images.forEach((image, imageIndex) => {
        if (imageIndex !== index) gsap.set(image, { visibility: "hidden", scale: 1.025 });
      });
      gsap.set(images[index], { visibility: "visible", scale: 1.035 });
      gsap.to(images[index], { scale: 1, duration: 0.48, ease: "power2.out", overwrite: true });
      activeIndex = index;
    };
    const cleanups: Array<() => void> = [];
    rows.forEach((row, index) => {
      const trigger = ScrollTrigger.create({ trigger: row, start: "top 58%", end: "bottom 43%", onEnter: () => activate(index), onEnterBack: () => activate(index) });
      const onActivate = (): void => activate(index);
      row.addEventListener("pointerenter", onActivate);
      row.addEventListener("focus", onActivate);
      cleanups.push(() => {
        trigger.kill();
        row.removeEventListener("pointerenter", onActivate);
        row.removeEventListener("focus", onActivate);
      });
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      gsap.killTweensOf(images);
      rows.forEach((row, index) => row.classList.toggle("is-active", index === 0));
      gsap.set(images, { clearProps: "all" });
    };
  });
  return () => media.revert();
}
