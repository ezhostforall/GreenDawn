import { expect, test } from "@playwright/test";

test("homepage visual baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("homepage.png", { fullPage: true, animations: "disabled" });
});
