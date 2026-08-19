const MOBILE_BREAKPOINT = "(max-width: 75rem)";

export function initialiseNavigation(): void {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
  const mobileNav = document.querySelector<HTMLElement>(".mobile-nav");

  if (!menuButton || !mobileNav) return;

  const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
  const menuLinks = Array.from(mobileNav.querySelectorAll<HTMLAnchorElement>("a"));
  const menuLabel = menuButton.querySelector<HTMLElement>(".sr-only");
  let menuOpen = false;

  const focusableElements = (): HTMLElement[] => [
    menuButton,
    ...Array.from(
      mobileNav.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ),
  ].filter((element) => !element.hasAttribute("inert"));

  const setMenu = (open: boolean, restoreFocus = false): void => {
    menuOpen = open;
    menuButton.setAttribute("aria-expanded", String(open));
    mobileNav.setAttribute("aria-hidden", String(!open));
    mobileNav.toggleAttribute("inert", !open);
    mobileNav.classList.toggle("is-open", open);
    header?.classList.toggle("menu-active", open);
    document.body.classList.toggle("menu-open", open);

    if (menuLabel) {
      menuLabel.textContent = open ? "Close navigation" : "Open navigation";
    }

    if (open) {
      window.requestAnimationFrame(() => menuLinks[0]?.focus());
    } else if (restoreFocus) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => setMenu(!menuOpen));
  menuLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

  window.addEventListener("keydown", (event) => {
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
  });

  mediaQuery.addEventListener("change", ({ matches }) => {
    if (!matches && menuOpen) setMenu(false);
  });

  const updateHeader = (): void => {
    header?.classList.toggle("is-scrolled", window.scrollY > 72);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
