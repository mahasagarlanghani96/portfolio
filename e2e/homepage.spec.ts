import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders hero section with name and tagline", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Mahasagar Langhani");
    await expect(page.getByText("Quality Leadership. Technical Delivery.")).toBeVisible();
  });

  test("has two CTA buttons in hero", async ({ page }) => {
    await expect(page.getByRole("link", { name: /explore my qa experience/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /explore project delivery/i })).toBeVisible();
  });

  test("renders navigation links", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: /main/i });
    await expect(nav.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Expertise" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  test("has skip navigation link", async ({ page }) => {
    const skipLink = page.getByRole("link", { name: /skip to main content/i });
    await expect(skipLink).toBeAttached();
  });

  test("renders expertise track switcher", async ({ page }) => {
    const section = page.locator("#expertise");
    await section.scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("tab", { name: /quality engineering/i })
    ).toBeVisible();
    await expect(
      page.getByRole("tab", { name: /project delivery/i })
    ).toBeVisible();
  });

  test("expertise tabs switch content", async ({ page }) => {
    const section = page.locator("#expertise");
    await section.scrollIntoViewIfNeeded();

    await page.getByRole("tab", { name: /project delivery/i }).click();
    await expect(page.getByText("Technical Project Delivery")).toBeVisible();

    await page.getByRole("tab", { name: /quality engineering/i }).click();
    await expect(page.getByText("Quality Engineering & QA Leadership")).toBeVisible();
  });

  test("renders experience timeline", async ({ page }) => {
    const section = page.locator("#experience");
    await section.scrollIntoViewIfNeeded();
    await expect(page.getByText("Experience Timeline")).toBeVisible();
    await expect(page.getByText("KoderLabs")).toBeVisible();
  });

  test("renders case studies preview", async ({ page }) => {
    const section = page.locator("#case-studies");
    await section.scrollIntoViewIfNeeded();
    await expect(page.getByText("Quality in Action")).toBeVisible();
  });

  test("renders footer with copyright", async ({ page }) => {
    await expect(page.getByText(/© 2026 Mahasagar Langhani/)).toBeVisible();
  });
});
