import { describe, it, expect } from "vitest";
import {
  cn,
  formatDateRange,
  generateMailtoLink,
  generateWhatsAppLink,
  slugify,
} from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});

describe("formatDateRange", () => {
  it("formats a range with two dates", () => {
    expect(formatDateRange("Jan 2022", "Mar 2026")).toBe("Jan 2022 — Mar 2026");
  });

  it("formats a range ending with Present", () => {
    expect(formatDateRange("Apr 2026", "Present")).toBe("Apr 2026 — Present");
  });
});

describe("generateMailtoLink", () => {
  it("generates a basic mailto link", () => {
    expect(generateMailtoLink("test@example.com")).toBe("mailto:test@example.com");
  });

  it("includes subject and body", () => {
    const link = generateMailtoLink("test@example.com", "Hello", "Body text");
    expect(link).toContain("mailto:test@example.com?");
    expect(link).toContain("subject=Hello");
    expect(link).toContain("body=Body+text");
  });

  it("encodes special characters", () => {
    const link = generateMailtoLink("test@example.com", "Hello & Welcome");
    expect(link).toContain("subject=Hello+%26+Welcome");
  });
});

describe("generateWhatsAppLink", () => {
  it("generates a basic WhatsApp link", () => {
    expect(generateWhatsAppLink("+92 331 2142033")).toBe("https://wa.me/923312142033");
  });

  it("includes a message", () => {
    const link = generateWhatsAppLink("+92 331 2142033", "Hello");
    expect(link).toContain("text=Hello");
  });
});

describe("slugify", () => {
  it("converts text to slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("QA & Testing!")).toBe("qa-testing");
  });

  it("handles multiple spaces", () => {
    expect(slugify("multiple   spaces")).toBe("multiple-spaces");
  });
});
