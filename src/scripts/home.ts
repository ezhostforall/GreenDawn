import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { animateAftercare } from "./animations/aftercare";
import { animateFinalCta } from "./animations/final-cta";
import { animateHero } from "./animations/hero";
import { initialiseCounters } from "./animations/counters";
import { animateProblem } from "./animations/problem";
import { animateProcess } from "./animations/process";
import { animateDesktopProjectStory, animateProjects } from "./animations/projects";
import { animateReveals, revealWithoutMotion } from "./animations/reveals";
import { initialiseSolutionStory } from "./animations/solutions";
import { animateDesktopSystem, animateSystem } from "./animations/system";
import { animateTechnology } from "./animations/technology";
import { initialiseNavigation } from "./navigation";

gsap.registerPlugin(ScrollTrigger);

document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
initialiseNavigation();

if (reduceMotion) {
  revealWithoutMotion();
} else {
  const pageContext = gsap.context(() => {
    gsap.ticker.lagSmoothing(500, 33);

    animateHero();
    animateReveals();
    animateProblem();
    animateSystem();
    animateProcess();
    initialiseSolutionStory();
    animateAftercare();
    initialiseCounters();
    animateProjects();
    animateTechnology();
    animateFinalCta();

    const desktop = gsap.matchMedia();
    desktop.add("(min-width: 62rem)", () => {
      animateDesktopSystem();
      animateDesktopProjectStory();
    });
  }, document.body);

  window.addEventListener("pagehide", () => pageContext.revert(), { once: true });
}
