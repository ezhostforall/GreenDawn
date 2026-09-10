import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { animateFinalCta } from "./animations/final-cta";
import { animateHero } from "./animations/hero";
import { animateProblem } from "./animations/problem";
import { animateProcess } from "./animations/process";
import { animateDesktopProjectStory, animateProjects } from "./animations/projects";
import { animateReveals, revealWithoutMotion } from "./animations/reveals";
import { initialiseSolutionStory } from "./animations/solutions";
import { animateDesktopSystem, animateSystem } from "./animations/system";
import { initialiseNavigation } from "./navigation";

gsap.registerPlugin(ScrollTrigger);

document.documentElement.classList.add("js");

const cleanupNavigation = initialiseNavigation();
const cleanupMotion: Array<() => void> = [];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let pageContext: gsap.Context | undefined;

if (reduceMotion) {
  revealWithoutMotion();
} else {
  pageContext = gsap.context(() => {
    gsap.ticker.lagSmoothing(500, 33);

    cleanupMotion.push(animateHero());
    animateReveals();
    animateProblem();
    animateSystem();
    animateProcess();
    cleanupMotion.push(initialiseSolutionStory());
    animateProjects();
    animateFinalCta();

    const desktop = gsap.matchMedia();
    desktop.add("(min-width: 62rem) and (min-height: 44.01rem) and (pointer: fine)", () => {
      animateDesktopSystem();
      animateDesktopProjectStory();
    });
    cleanupMotion.push(() => desktop.revert());
  }, document.body);
}

const refresh = (): void => ScrollTrigger.refresh();
const criticalImages = Array.from(document.querySelectorAll<HTMLImageElement>('img[loading="eager"]'));
const imageReady = criticalImages.map((image) => image.complete
  ? Promise.resolve()
  : new Promise<void>((resolve) => {
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    }));

Promise.all([document.fonts.ready, ...imageReady]).then(refresh);

let resizeFrame = 0;
const onResize = (): void => {
  window.cancelAnimationFrame(resizeFrame);
  resizeFrame = window.requestAnimationFrame(refresh);
};
const onPageShow = (event: PageTransitionEvent): void => {
  if (event.persisted) window.requestAnimationFrame(refresh);
};
const teardown = (): void => {
  window.removeEventListener("resize", onResize);
  window.removeEventListener("pageshow", onPageShow);
  cleanupNavigation();
  cleanupMotion.splice(0).forEach((cleanup) => cleanup());
  pageContext?.revert();
};

window.addEventListener("resize", onResize, { passive: true });
window.addEventListener("pageshow", onPageShow);
window.addEventListener("pagehide", (event) => {
  if (!(event as PageTransitionEvent).persisted) teardown();
}, { once: true });
