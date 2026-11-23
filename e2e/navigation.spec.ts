import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navigates to quality engineering page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /explore my qa experience/i }).click();
    await expect(page).toHaveURL("/quality-engineering");
    await expect(page.getByText("Quality Engineering & QA Leadership")).toBeVisible();
  });

  test("navigates to project delivery page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /explore project delivery/i }).click();
    await expect(page).toHaveURL("/project-delivery");
    await expect(page.getByText("Technical Project Delivery")).toBeVisible();
  });

  test("navigates to case studies page", async ({ page }) => {
    await page.goto("/case-studies");
    await expect(page.getByText("Quality Engineering in Action")).toBeVisible();
  });

  test("navigates to individual case study", async ({ page }) => {
    await page.goto("/case-studies");
    await page
      .getByRole("link", { name: /field operations/i })
      .first()
      .click();
    await expect(page).toHaveURL(/case-studies\/disaster-management/);
    await expect(page.getByText("Background")).toBeVisible();
  });

  test("navigates to about page", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("The Journey")).toBeVisible();
  });

  test("navigates to contact page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText("Send a Message")).toBeVisible();
  });

  test("shows 404 for invalid route", async ({ page }) => {
    await page.goto("/nonexistent-page");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByText("Page Not Found")).toBeVisible();
  });

  test("case study back link works", async ({ page }) => {
    await page.goto("/case-studies/disaster-management-field-operations");
    await page.getByRole("link", { name: /back to case studies/i }).click();
    await expect(page).toHaveURL("/case-studies");
  });
});
