import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page, context: string): Promise<void> {
  const measurements = await page.evaluate(() => {
    const root = document.documentElement;
    const scrollingElement = document.scrollingElement ?? root;
    const viewportWidth = root.clientWidth;
    const selectorFor = (element: Element): string => {
      const id = element.id ? `#${CSS.escape(element.id)}` : "";
      const classes = [...element.classList]
        .slice(0, 3)
        .map((className) => `.${CSS.escape(className)}`)
        .join("");
      return `${element.tagName.toLowerCase()}${id}${classes}`;
    };

    const overflowCandidates = [...document.querySelectorAll<HTMLElement>("body *")]
      .map((element) => {
        const bounds = element.getBoundingClientRect();
        const styles = getComputedStyle(element);
        const overflowLeft = Math.max(0, -bounds.left);
        const overflowRight = Math.max(0, bounds.right - viewportWidth);
        let depth = 0;
        let ancestor = element.parentElement;
        let clippedBy: string | null = null;

        while (ancestor && ancestor !== document.body) {
          depth += 1;
          const ancestorStyles = getComputedStyle(ancestor);
          const ancestorBounds = ancestor.getBoundingClientRect();
          if (
            ["auto", "clip", "hidden", "scroll"].includes(ancestorStyles.overflowX)
            && (bounds.left < ancestorBounds.left - 1 || bounds.right > ancestorBounds.right + 1)
          ) {
            clippedBy = selectorFor(ancestor);
            break;
          }
          ancestor = ancestor.parentElement;
        }

        return {
          selector: selectorFor(element),
          parent: element.parentElement ? selectorFor(element.parentElement) : null,
          text: element.children.length === 0 ? element.textContent?.trim().slice(0, 80) || null : null,
          depth,
          clippedBy,
          left: Math.round(bounds.left * 10) / 10,
          right: Math.round(bounds.right * 10) / 10,
          width: Math.round(bounds.width * 10) / 10,
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
          overflowLeft: Math.round(overflowLeft * 10) / 10,
          overflowRight: Math.round(overflowRight * 10) / 10,
          display: styles.display,
          position: styles.position,
          computedWidth: styles.width,
          minWidth: styles.minWidth,
          maxWidth: styles.maxWidth,
          overflowX: styles.overflowX,
          gridTemplateColumns: styles.gridTemplateColumns,
          transform: styles.transform,
        };
      })
      .filter(({ overflowLeft, overflowRight, scrollWidth, clientWidth }) =>
        overflowLeft > 1 || overflowRight > 1 || scrollWidth > clientWidth + 1,
      )
      .sort((a, b) => {
        const aLocalOverflow = a.scrollWidth - a.clientWidth;
        const bLocalOverflow = b.scrollWidth - b.clientWidth;
        return Number(Boolean(a.clippedBy)) - Number(Boolean(b.clippedBy))
          || bLocalOverflow - aLocalOverflow
          || b.depth - a.depth
          || b.overflowRight - a.overflowRight;
      })
      .slice(0, 15);

    return {
      clientWidth: viewportWidth,
      innerWidth: window.innerWidth,
      scrollWidth: scrollingElement.scrollWidth,
      visualViewportWidth: window.visualViewport?.width ?? null,
      overflowCandidates,
    };
  });

  const diagnostic = JSON.stringify(measurements.overflowCandidates);

  expect(
    measurements.scrollWidth,
    `${context}: scrollWidth=${measurements.scrollWidth}, clientWidth=${measurements.clientWidth}, innerWidth=${measurements.innerWidth}, visualViewportWidth=${measurements.visualViewportWidth ?? "unavailable"}; candidates=${diagnostic}`,
  ).toBeLessThanOrEqual(measurements.clientWidth + 1);
}

test.beforeEach(async ({ page }) => {
  await page.goto(".");
  await page.waitForLoadState("networkidle");
});

test("has one visible heading, working local navigation and no horizontal overflow", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expectNoHorizontalOverflow(page, "Initial page layout");
  await page.locator('a[href="#surveys"]').first().click();
  await expect(page.locator("#surveys")).toBeInViewport();
});

test("keeps animated sections within their local viewport bounds", async ({ page }) => {
  for (const selector of [".problem", ".system", ".solutions"]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
    await expectNoHorizontalOverflow(page, `${selector} animation state`);
  }
});

test("clears active navigation in sections without a matching navigation item", async ({ page }) => {
  await page.locator("#surveys").scrollIntoViewIfNeeded();
  await page.waitForTimeout(180);
  await expect(page.locator('.desktop-nav a[aria-current="location"]')).toHaveCount(0);
  await expect(page.locator('.mobile-nav nav a[aria-current="location"]')).toHaveCount(0);
});

test("mobile navigation closes cleanly and returns focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile interaction only");
  const toggle = page.locator(".menu-toggle");
  await expect(toggle).toHaveAccessibleName("Open navigation");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toHaveAccessibleName("Close navigation");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAccessibleName("Open navigation");
  await expect(page.locator("body")).not.toHaveClass(/menu-open/);
});

test("reduced motion keeps all content readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.locator("[data-reveal]").first()).toBeVisible();
  expect(await page.locator("[data-reveal]").evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).visibility !== "hidden"))).toBe(true);
});

test("has no automatically detectable serious accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);
});

test("uses the same horizontal shell for header, hero and footer", async ({ page }, testInfo) => {
  test.skip(!["desktop", "wide", "ultrawide"].includes(testInfo.project.name), "Wide-layout assertion only");
  const bounds = await page.evaluate(() => {
    const selectors = [".site-header__inner", ".hero__content", ".footer .page-shell"];
    return selectors.map((selector) => {
      const rect = document.querySelector<HTMLElement>(selector)?.getBoundingClientRect();
      return rect ? { left: rect.left, right: rect.right } : null;
    });
  });
  expect(bounds.every(Boolean)).toBe(true);
  const [header, hero, footer] = bounds as Array<{ left: number; right: number }>;
  expect(Math.abs(header.left - hero.left)).toBeLessThanOrEqual(1);
  expect(Math.abs(header.right - hero.right)).toBeLessThanOrEqual(1);
  expect(Math.abs(header.left - footer.left)).toBeLessThanOrEqual(1);
  expect(Math.abs(header.right - footer.right)).toBeLessThanOrEqual(1);
});

test("centres hero proof numbers against their titles", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) <= 672, "Mobile proof labels use a vertical stack");
  const centreOffsets = await page.locator(".hero__proof > div").evaluateAll((items) =>
    items.map((item) => {
      const number = item.querySelector<HTMLElement>("span")?.getBoundingClientRect();
      const title = item.querySelector<HTMLElement>("strong")?.getBoundingClientRect();
      return number && title
        ? Math.abs((number.top + number.bottom) / 2 - (title.top + title.bottom) / 2)
        : Number.POSITIVE_INFINITY;
    }),
  );
  expect(centreOffsets.every((offset) => offset <= 1)).toBe(true);
});

test("keeps key breakpoint boundaries free from horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Run the boundary matrix once");
  const widths = [320, 360, 390, 430, 480, 671, 672, 673, 768, 834, 976, 977, 1024, 1199, 1200, 1201, 1440, 1600, 1920, 2560];
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.waitForLoadState("networkidle");
  for (const width of widths) {
    await page.setViewportSize({ width, height: width <= 430 ? 844 : 900 });
    await page.waitForTimeout(20);
    await expectNoHorizontalOverflow(page, `${width}px breakpoint`);
  }
});

test("keeps narrow layouts compact and visually connected", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 672, "Narrow-layout assertion only");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.waitForLoadState("networkidle");

  const fragmentRows = await page.locator(".problem__fragments span").evaluateAll((nodes) =>
    nodes.slice(0, 2).map((node) => node.getBoundingClientRect().top),
  );
  expect(Math.abs(fragmentRows[0] - fragmentRows[1])).toBeLessThanOrEqual(1);

  const processAlignment = await page.locator(".process-step").first().evaluate((step) => {
    const number = step.querySelector<HTMLElement>(".process-step__number")?.getBoundingClientRect();
    const title = step.querySelector<HTMLElement>("h3")?.getBoundingClientRect();
    return number && title ? Math.abs(number.top - title.top) : Number.POSITIVE_INFINITY;
  });
  expect(processAlignment).toBeLessThanOrEqual(12);

  const projectMedia = await page.locator(".case-study__media").evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      right: rect.right,
      viewportWidth: document.documentElement.clientWidth,
    };
  });
  expect(projectMedia.height).toBeLessThanOrEqual(projectMedia.width * 0.76);
  expect(projectMedia.left).toBeGreaterThanOrEqual(-1);
  expect(projectMedia.right).toBeLessThanOrEqual(projectMedia.viewportWidth + 1);

  const mediaBounds = await page.locator(".solutions__media, .case-study__media").evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        viewportWidth: document.documentElement.clientWidth,
      };
    }),
  );
  expect(mediaBounds.every(({ left }) => left >= -1)).toBe(true);
  expect(mediaBounds.every(({ right, viewportWidth }) => right <= viewportWidth + 1)).toBe(true);
});

test("keeps the managed-relationship statement inside its answer card", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.waitForLoadState("networkidle");

  const bounds = await page.locator("[data-answer]").evaluate((answer) => {
    const card = answer.getBoundingClientRect();
    const statement = answer.querySelector<HTMLElement>("strong")?.getBoundingClientRect();
    return statement
      ? { cardLeft: card.left, cardRight: card.right, statementLeft: statement.left, statementRight: statement.right }
      : null;
  });

  expect(bounds).not.toBeNull();
  expect(bounds!.statementLeft).toBeGreaterThanOrEqual(bounds!.cardLeft - 1);
  expect(bounds!.statementRight).toBeLessThanOrEqual(bounds!.cardRight + 1);
});

test("uses consistent proof-card spacing and supporting type", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.waitForLoadState("networkidle");

  const rhythm = await page.locator(".proof-card").evaluateAll((cards) =>
    cards.map((card) => {
      const label = card.querySelector<HTMLElement>(".proof-card__label");
      const body = card.querySelector<HTMLElement>(".proof-card__body");
      const result = body?.querySelector<HTMLElement>(":scope > strong");
      const copy = body?.querySelector<HTMLElement>(":scope > p");
      const gap = (first?: DOMRect, second?: DOMRect) => first && second ? second.top - first.bottom : null;
      const resultStyle = result ? getComputedStyle(result) : null;
      const copyStyle = copy ? getComputedStyle(copy) : null;
      const cardBounds = card.getBoundingClientRect();
      const labelBounds = label?.getBoundingClientRect();
      const bodyBounds = body?.getBoundingClientRect();
      return {
        labelOffsetTop: labelBounds ? labelBounds.top - cardBounds.top : null,
        bodyOffsetBottom: labelBounds && bodyBounds ? cardBounds.bottom - bodyBounds.bottom : null,
        resultToCopy: gap(result?.getBoundingClientRect(), copy?.getBoundingClientRect()),
        fontDifference: resultStyle && copyStyle
          ? Math.abs(Number.parseFloat(resultStyle.fontSize) - Number.parseFloat(copyStyle.fontSize))
          : Number.POSITIVE_INFINITY,
      };
    }),
  );

  expect(rhythm.every(({ labelOffsetTop }) => labelOffsetTop === null || labelOffsetTop <= 42)).toBe(true);
  expect(rhythm.every(({ bodyOffsetBottom }) => bodyOffsetBottom === null || bodyOffsetBottom <= 42)).toBe(true);
  expect(rhythm.every(({ resultToCopy }) => resultToCopy !== null && resultToCopy <= 16)).toBe(true);
  expect(rhythm.every(({ fontDifference }) => fontDifference <= 1)).toBe(true);
});

test("presents mobile surveys as an expandable comparison", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 672, "Narrow-layout assertion only");
  const comparison = page.locator(".surveys__mobile");
  await expect(comparison).toBeVisible();
  const firstTier = comparison.locator("details").first();
  await expect(firstTier).not.toHaveAttribute("open", "");
  await firstTier.locator("summary").click();
  await expect(firstTier).toHaveAttribute("open", "");
  await expect(firstTier.getByText("What you receive")).toBeVisible();
});
