import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("shows validation errors for empty required fields", async ({ page }) => {
    await page.getByRole("button", { name: /open in email client/i }).click();
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Message is required")).toBeVisible();
  });

  test("shows validation error for invalid email", async ({ page }) => {
    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill("invalid-email");
    await page.getByLabel(/message/i).fill("Test message");
    await page.getByRole("button", { name: /open in email client/i }).click();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();
  });

  test("clears error when user starts typing", async ({ page }) => {
    await page.getByRole("button", { name: /open in email client/i }).click();
    await expect(page.getByText("Name is required")).toBeVisible();

    await page.getByLabel(/name/i).fill("T");
    await expect(page.getByText("Name is required")).not.toBeVisible();
  });

  test("contact methods are displayed", async ({ page }) => {
    await expect(page.getByText("sagar_langhani@hotmail.com")).toBeVisible();
    await expect(page.getByText("Connect on LinkedIn")).toBeVisible();
    await expect(page.getByText("+92 331 2142033")).toBeVisible();
    await expect(page.getByText("Karachi, Pakistan")).toBeVisible();
  });
});
