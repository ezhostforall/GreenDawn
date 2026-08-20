import gsap from "gsap";

export function animatePath(selector: string, scrollTrigger: ScrollTrigger.Vars): void {
  const path = document.querySelector<SVGPathElement>(selector);
  if (!path) return;

  const length = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger,
  });
}
