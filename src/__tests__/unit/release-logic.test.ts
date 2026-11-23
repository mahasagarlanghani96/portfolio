import { describe, it, expect } from "vitest";
import { evaluateRelease } from "@/components/interactive/release-readiness";

describe("evaluateRelease", () => {
  it("returns 'go' when all criteria are met", () => {
    const criteria = [
      { met: true },
      { met: true },
      { met: true },
    ];
    expect(evaluateRelease(criteria)).toBe("go");
  });

  it("returns 'no-go' when any criterion is not met", () => {
    const criteria = [
      { met: true },
      { met: false },
      { met: true },
    ];
    expect(evaluateRelease(criteria)).toBe("no-go");
  });

  it("returns 'no-go' when all criteria are not met", () => {
    const criteria = [
      { met: false },
      { met: false },
    ];
    expect(evaluateRelease(criteria)).toBe("no-go");
  });

  it("returns 'go' for empty criteria", () => {
    expect(evaluateRelease([])).toBe("go");
  });

  it("returns 'no-go' for single unmet criterion", () => {
    expect(evaluateRelease([{ met: false }])).toBe("no-go");
  });
});
