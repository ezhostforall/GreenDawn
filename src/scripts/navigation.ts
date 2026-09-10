const MOBILE_BREAKPOINT = "(max-width: 75rem)";

export function initialiseNavigation(): () => void {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const mobileNav = document.querySelector<HTMLElement>(".mobile-nav");
  if (!menuButton || !mobileNav) return () => undefined;

  const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
  const menuLinks = Array.from(mobileNav.querySelectorAll<HTMLAnchorElement>("a"));
  const pageLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.desktop-nav a[href^="#"], .mobile-nav nav a[href^="#"]'));
  const menuLabel = menuButton.querySelector<HTMLElement>(".sr-only");
  let menuOpen = false;

  const focusableElements = (): HTMLElement[] => [
    menuButton,
    ...Array.from(mobileNav.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )),
  ].filter((element) => !element.hasAttribute("inert"));

  const setMenu = (open: boolean, restoreFocus = false): void => {
    menuOpen = open;
    menuButton.setAttribute("aria-expanded", String(open));
    mobileNav.setAttribute("aria-hidden", String(!open));
    mobileNav.toggleAttribute("inert", !open);
    mobileNav.classList.toggle("is-open", open);
    header?.classList.toggle("menu-active", open);
    document.body.classList.toggle("menu-open", open);
    if (menuLabel) menuLabel.textContent = open ? "Close navigation" : "Open navigation";
    if (open) window.requestAnimationFrame(() => menuLinks[0]?.focus());
    else if (restoreFocus) menuButton.focus();
  };

  const focusDestination = (hash: string): void => {
    const section = document.querySelector<HTMLElement>(hash);
    if (!section) return menuButton.focus();
    const destination = section.querySelector<HTMLElement>("h1, h2, h3") ?? section;
    const hadTabIndex = destination.hasAttribute("tabindex");
    if (!hadTabIndex) destination.setAttribute("tabindex", "-1");
    destination.focus({ preventScroll: true });
    if (!hadTabIndex) destination.addEventListener("blur", () => destination.removeAttribute("tabindex"), { once: true });
  };

  const onMenuButtonClick = (): void => setMenu(!menuOpen);
  const onMenuLinkClick = (event: Event): void => {
    const link = event.currentTarget as HTMLAnchorElement;
    setMenu(false);
    if (link.hash) window.setTimeout(() => focusDestination(link.hash), 0);
  };
  const onKeyDown = (event: KeyboardEvent): void => {
    if (!menuOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setMenu(false, true);
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = focusableElements();
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  const onBreakpointChange = ({ matches }: MediaQueryListEvent): void => {
    if (!matches && menuOpen) setMenu(false);
  };
  const onPageShow = (): void => {
    if (menuOpen) setMenu(false);
  };
  const updateHeader = (): void => {
    header?.classList.toggle("is-scrolled", window.scrollY > 72);
  };

  const sectionMap = new Map<HTMLElement, string>();
  pageLinks.forEach((link) => {
    const section = document.querySelector<HTMLElement>(link.hash);
    if (section) sectionMap.set(section, link.hash);
  });
  const observedSections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
  const visibleSections = new Set<HTMLElement>();
  const setCurrentSection = (section?: HTMLElement): void => {
    const hash = section ? sectionMap.get(section) : undefined;
    pageLinks.forEach((link) => {
      if (link.hash === hash) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const section = entry.target as HTMLElement;
      if (entry.isIntersecting) visibleSections.add(section);
      else visibleSections.delete(section);
    });
    const marker = window.innerHeight * 0.24;
    const active = [...visibleSections].sort((a, b) => {
      const distanceA = Math.abs(a.getBoundingClientRect().top - marker);
      const distanceB = Math.abs(b.getBoundingClientRect().top - marker);
      return distanceA - distanceB;
    })[0];
    setCurrentSection(active);
  }, { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.6] });

  observedSections.forEach((section) => sectionObserver.observe(section));
  menuButton.addEventListener("click", onMenuButtonClick);
  menuLinks.forEach((link) => link.addEventListener("click", onMenuLinkClick));
  window.addEventListener("keydown", onKeyDown);
  mediaQuery.addEventListener("change", onBreakpointChange);
  window.addEventListener("pageshow", onPageShow);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  return () => {
    setMenu(false);
    sectionObserver.disconnect();
    visibleSections.clear();
    menuButton.removeEventListener("click", onMenuButtonClick);
    menuLinks.forEach((link) => link.removeEventListener("click", onMenuLinkClick));
    window.removeEventListener("keydown", onKeyDown);
    mediaQuery.removeEventListener("change", onBreakpointChange);
    window.removeEventListener("pageshow", onPageShow);
    window.removeEventListener("scroll", updateHeader);
  };
}
