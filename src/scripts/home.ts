import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

root.classList.add("js");

const header = document.querySelector<HTMLElement>("[data-header]");
const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
const mobileNav = document.querySelector<HTMLElement>(".mobile-nav");
const mobileLinks = mobileNav?.querySelectorAll<HTMLAnchorElement>("a") ?? [];

let menuOpen = false;

function setMenu(open: boolean) {
  if (!menuButton || !mobileNav) return;

  menuOpen = open;
  menuButton.setAttribute("aria-expanded", String(open));
  mobileNav.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("menu-open", open);

  const label = menuButton.querySelector<HTMLElement>(".sr-only");
  if (label) label.textContent = open ? "Close navigation" : "Open navigation";

  gsap.to(mobileNav, {
    yPercent: open ? 0 : -100,
    visibility: open ? "visible" : "hidden",
    duration: reduceMotion ? 0 : 0.65,
    ease: open ? "power4.out" : "power3.inOut",
  });

  if (open && !reduceMotion) {
    gsap.fromTo(
      mobileNav.querySelectorAll("nav a"),
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, delay: 0.16, ease: "power3.out" },
    );
  }
}

menuButton?.addEventListener("click", () => setMenu(!menuOpen));
mobileLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuOpen) {
    setMenu(false);
    menuButton?.focus();
  }
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 72);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (!reduceMotion) {
  const pageContext = gsap.context(() => {
    gsap.ticker.lagSmoothing(500, 33);

    const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });

    heroTimeline
      .from("[data-hero-line]", {
        yPercent: 112,
        duration: 1.15,
        stagger: 0.11,
      })
      .from(
        "[data-hero-item]",
        {
          y: 34,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        "-=0.68",
      )
      .from(
        ".hero__proof > div",
        {
          y: 28,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
        },
        "-=0.55",
      );

    gsap.fromTo(
      "[data-hero-image]",
      { scale: 1.11, clipPath: "inset(0 0 100% 0)" },
      { scale: 1.02, clipPath: "inset(0 0 0% 0)", duration: 1.55, ease: "power4.inOut" },
    );

    gsap.to("[data-hero-image]", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-hero]",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    animatePath("[data-arc-path]", {
      trigger: "[data-hero]",
      start: "top 80%",
      end: "55% 40%",
      scrub: 1.2,
    });

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

    gsap.from("[data-fragment]", {
      x: (index) => (index % 2 === 0 ? -55 : 55),
      y: 35,
      rotate: (index) => (index % 2 === 0 ? -2.5 : 2.5),
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

    animatePath("[data-system-path]", {
      trigger: "[data-system]",
      start: "top 65%",
      end: "55% 55%",
      scrub: 1,
    });

    gsap.from("[data-system-card]", {
      y: 110,
      opacity: 0,
      rotate: (index) => index - 1,
      duration: 1,
      stagger: 0.18,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".system__cards",
        start: "top 82%",
      },
    });

    gsap.to("[data-process-line]", {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "[data-process]",
        start: "top 72%",
        end: "bottom 62%",
        scrub: 1,
      },
    });

    gsap.from("[data-process-step]", {
      y: 45,
      opacity: 0.22,
      stagger: 0.14,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-process]",
        start: "top 74%",
        end: "bottom 68%",
        scrub: 1,
      },
    });

    initialiseSolutionStory();

    gsap.to("[data-aftercare-orb]", {
      rotate: 38,
      xPercent: -5,
      yPercent: 9,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-aftercare]",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1,
      },
    });

    initialiseCounters();

    gsap.to("[data-case-image] img", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-case-study]",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

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

    animatePath("[data-final-arc]", {
      trigger: "[data-final-cta]",
      start: "top 80%",
      end: "bottom 55%",
      scrub: 1,
    });

    const desktop = gsap.matchMedia();
    desktop.add("(min-width: 62rem)", () => {
      gsap.to(".system__cards", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-system]",
          start: "top 70%",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".case-study__story", {
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-case-study]",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, document.body);

  window.addEventListener("pagehide", () => pageContext.revert(), { once: true });
} else {
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
    item.style.visibility = "visible";
  });
}

function animatePath(
  selector: string,
  scrollTrigger: ScrollTrigger.Vars,
) {
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

function initialiseSolutionStory() {
  const rows = gsap.utils.toArray<HTMLElement>("[data-solution-row]");
  const images = gsap.utils.toArray<HTMLElement>("[data-solution-image]");
  let activeIndex = 0;

  gsap.set(images, { autoAlpha: 0 });
  gsap.set(images[0], { autoAlpha: 1 });

  const activate = (index: number) => {
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

  rows.forEach((row, index) => {
    ScrollTrigger.create({
      trigger: row,
      start: "top 58%",
      end: "bottom 43%",
      onEnter: () => activate(index),
      onEnterBack: () => activate(index),
    });

    row.addEventListener("pointerenter", () => activate(index));
    row.addEventListener("focus", () => activate(index));
  });
}

function initialiseCounters() {
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
