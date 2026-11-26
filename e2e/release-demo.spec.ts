import { test, expect } from "@playwright/test";

test.describe("Release Readiness Demo", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#release-demo");
    await section.scrollIntoViewIfNeeded();
  });

  test("displays section header and disclaimer", async ({ page }) => {
    await expect(page.getByText("Release Readiness")).toBeVisible();
    await expect(page.getByText(/demonstration showing how a QA leader/i)).toBeVisible();
  });

  test("renders 6 input fields with labels", async ({ page }) => {
    await expect(page.getByLabel("Test Cases Executed")).toBeVisible();
    await expect(page.getByLabel("Pass Rate")).toBeVisible();
    await expect(page.getByLabel("Critical Defects Open")).toBeVisible();
    await expect(page.getByLabel("Regression Pass Rate")).toBeVisible();
    await expect(page.getByLabel("High-Priority Defects")).toBeVisible();
    await expect(page.getByLabel("Code Coverage")).toBeVisible();
  });

  test("inputs accept numeric values", async ({ page }) => {
    const input = page.getByLabel("Pass Rate");
    await input.fill("95.5");
    await expect(input).toHaveValue("95.5");
  });

  test("shows NO-GO when evaluating with empty inputs", async ({ page }) => {
    const evaluateBtn = page.getByRole("button", { name: /evaluate release decision/i });
    await evaluateBtn.scrollIntoViewIfNeeded();
    await evaluateBtn.click();
    await expect(page.getByText("NO-GO")).toBeVisible();
  });

  test("shows GO when all metrics pass thresholds", async ({ page }) => {
    await page.getByLabel("Test Cases Executed").fill("98");
    await page.getByLabel("Pass Rate").fill("97");
    await page.getByLabel("Critical Defects Open").fill("0");
    await page.getByLabel("Regression Pass Rate").fill("96");
    await page.getByLabel("High-Priority Defects").fill("1");
    await page.getByLabel("Code Coverage").fill("85");

    const evaluateBtn = page.getByRole("button", { name: /evaluate release decision/i });
    await evaluateBtn.scrollIntoViewIfNeeded();
    await evaluateBtn.click();
    await expect(page.getByText("GO", { exact: true })).toBeVisible();
  });

  test("shows NO-GO with a failing metric", async ({ page }) => {
    await page.getByLabel("Test Cases Executed").fill("98");
    await page.getByLabel("Pass Rate").fill("97");
    await page.getByLabel("Critical Defects Open").fill("5");
    await page.getByLabel("Regression Pass Rate").fill("96");
    await page.getByLabel("High-Priority Defects").fill("1");
    await page.getByLabel("Code Coverage").fill("85");

    const evaluateBtn = page.getByRole("button", { name: /evaluate release decision/i });
    await evaluateBtn.scrollIntoViewIfNeeded();
    await evaluateBtn.click();
    await expect(page.getByText("NO-GO")).toBeVisible();
  });

  test("reset clears inputs and hides decision", async ({ page }) => {
    await page.getByLabel("Pass Rate").fill("97");
    const evaluateBtn = page.getByRole("button", { name: /evaluate release decision/i });
    await evaluateBtn.scrollIntoViewIfNeeded();
    await evaluateBtn.click();
    await expect(page.getByText("Decision:")).toBeVisible();

    await page.getByRole("button", { name: /reset/i }).click();
    await expect(page.getByLabel("Pass Rate")).toHaveValue("");
    await expect(page.getByText("Decision:")).not.toBeVisible();
  });
});
