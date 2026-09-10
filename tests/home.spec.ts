import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
});

test("has one visible heading, working local navigation and no horizontal overflow", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
  await page.locator('a[href="#surveys"]').first().click();
  await expect(page.locator("#surveys")).toBeInViewport();
});

test("keeps animated sections within their local viewport bounds", async ({ page }) => {
  for (const selector of [".problem", ".system", ".solutions"]) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
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
  const toggle = page.getByRole("button", { name: /open navigation/i });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
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
