import { test, expect } from "@playwright/test";

test.describe("Release Readiness Demo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#release-demo");
    await section.scrollIntoViewIfNeeded();
  });

  test("displays disclaimer", async ({ page }) => {
    await expect(page.getByText(/fictional demonstration/i)).toBeVisible();
  });

  test("displays release metrics", async ({ page }) => {
    await expect(page.getByText("Release Metrics")).toBeVisible();
    await expect(page.getByText("Test Cases Executed")).toBeVisible();
    await expect(page.getByText("Pass Rate")).toBeVisible();
  });

  test("can toggle criteria and evaluate", async ({ page }) => {
    const evaluateBtn = page.getByRole("button", { name: /evaluate release decision/i });
    await evaluateBtn.scrollIntoViewIfNeeded();
    await evaluateBtn.click();
    await expect(page.getByText("NO-GO")).toBeVisible();
  });

  test("shows GO when all criteria are met", async ({ page }) => {
    const unmetButtons = page.locator('button[aria-pressed="false"]');
    const count = await unmetButtons.count();
    for (let i = 0; i < count; i++) {
      await unmetButtons.nth(0).click();
    }

    const evaluateBtn = page.getByRole("button", { name: /evaluate release decision/i });
    await evaluateBtn.scrollIntoViewIfNeeded();
    await evaluateBtn.click();
    await expect(page.getByText("GO", { exact: true })).toBeVisible();
  });
});
