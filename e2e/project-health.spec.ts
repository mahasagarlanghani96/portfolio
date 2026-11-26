import { test, expect } from "@playwright/test";

test.describe("Project Health Assessment", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#project-health");
    await section.scrollIntoViewIfNeeded();
  });

  test("displays section header and disclaimer", async ({ page }) => {
    await expect(page.getByText("Project Health Assessment")).toBeVisible();
    await expect(page.getByText(/demonstration showing how a project manager/i)).toBeVisible();
  });

  test("renders 6 input fields with labels", async ({ page }) => {
    await expect(page.getByLabel("Budget Utilization")).toBeVisible();
    await expect(page.getByLabel("Schedule Variance")).toBeVisible();
    await expect(page.getByLabel("Scope Change Requests")).toBeVisible();
    await expect(page.getByLabel("Team Velocity Trend")).toBeVisible();
    await expect(page.getByLabel("Open Risk Items")).toBeVisible();
    await expect(page.getByLabel("Stakeholder Satisfaction")).toBeVisible();
  });

  test("shows On Track when all metrics are healthy", async ({ page }) => {
    await page.getByLabel("Budget Utilization").fill("80");
    await page.getByLabel("Schedule Variance").fill("0");
    await page.getByLabel("Scope Change Requests").fill("2");
    await page.getByLabel("Team Velocity Trend").fill("5");
    await page.getByLabel("Open Risk Items").fill("3");
    await page.getByLabel("Stakeholder Satisfaction").fill("8");

    const assessBtn = page.getByRole("button", { name: /assess project health/i });
    await assessBtn.scrollIntoViewIfNeeded();
    await assessBtn.click();
    await expect(page.getByText("On Track")).toBeVisible();
  });

  test("shows At Risk with warning metrics", async ({ page }) => {
    await page.getByLabel("Budget Utilization").fill("100");
    await page.getByLabel("Schedule Variance").fill("0");
    await page.getByLabel("Scope Change Requests").fill("2");
    await page.getByLabel("Team Velocity Trend").fill("5");
    await page.getByLabel("Open Risk Items").fill("3");
    await page.getByLabel("Stakeholder Satisfaction").fill("8");

    const assessBtn = page.getByRole("button", { name: /assess project health/i });
    await assessBtn.scrollIntoViewIfNeeded();
    await assessBtn.click();
    await expect(page.getByText("At Risk")).toBeVisible();
  });

  test("shows Critical with failing metrics", async ({ page }) => {
    await page.getByLabel("Budget Utilization").fill("150");
    await page.getByLabel("Schedule Variance").fill("-30");
    await page.getByLabel("Scope Change Requests").fill("15");
    await page.getByLabel("Team Velocity Trend").fill("-20");
    await page.getByLabel("Open Risk Items").fill("20");
    await page.getByLabel("Stakeholder Satisfaction").fill("2");

    const assessBtn = page.getByRole("button", { name: /assess project health/i });
    await assessBtn.scrollIntoViewIfNeeded();
    await assessBtn.click();
    await expect(page.getByText("Critical")).toBeVisible();
  });

  test("reset clears inputs and hides result", async ({ page }) => {
    await page.getByLabel("Budget Utilization").fill("80");
    const assessBtn = page.getByRole("button", { name: /assess project health/i });
    await assessBtn.scrollIntoViewIfNeeded();
    await assessBtn.click();
    await expect(page.getByText("Status:")).toBeVisible();

    await page.getByRole("button", { name: /reset/i }).click();
    await expect(page.getByLabel("Budget Utilization")).toHaveValue("");
    await expect(page.getByText("Status:")).not.toBeVisible();
  });
});
