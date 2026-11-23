import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { name: "Homepage", path: "/" },
  { name: "Quality Engineering", path: "/quality-engineering" },
  { name: "Project Delivery", path: "/project-delivery" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

for (const { name, path } of pages) {
  test(`${name} page has no critical accessibility violations @a11y`, async ({
    page,
  }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(critical).toEqual([]);
  });
}

test("keyboard navigation works on homepage @a11y", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: /skip to main content/i });
  await expect(skipLink).toBeFocused();

  await page.keyboard.press("Tab");
  const firstNavLink = page.getByRole("link", { name: "ML" });
  await expect(firstNavLink).toBeFocused();
});

test("theme toggle is keyboard accessible @a11y", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /switch to/i });
  await toggle.focus();
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
});
