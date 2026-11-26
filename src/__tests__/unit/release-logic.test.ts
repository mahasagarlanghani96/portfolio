import { describe, it, expect } from "vitest";
import {
  evaluateReleaseMetric,
  evaluateReleaseReadiness,
} from "@/lib/evaluate-release";
import type { ReleaseMetricDefinition } from "@/types";

const gteDef: ReleaseMetricDefinition = {
  id: "pass-rate",
  label: "Pass Rate",
  unit: "%",
  placeholder: "0–100",
  description: "Test pass rate",
  thresholdPass: 95,
  thresholdWarning: 90,
  direction: "gte",
};

const lteDef: ReleaseMetricDefinition = {
  id: "critical-defects",
  label: "Critical Defects",
  unit: "bugs",
  placeholder: "0–50",
  description: "Open critical defects",
  thresholdPass: 0,
  thresholdWarning: 2,
  direction: "lte",
};

describe("evaluateReleaseMetric", () => {
  it("returns pass for gte metric when value >= thresholdPass", () => {
    expect(evaluateReleaseMetric(96, gteDef)).toBe("pass");
    expect(evaluateReleaseMetric(95, gteDef)).toBe("pass");
  });

  it("returns warning for gte metric when value between warning and pass", () => {
    expect(evaluateReleaseMetric(92, gteDef)).toBe("warning");
    expect(evaluateReleaseMetric(90, gteDef)).toBe("warning");
  });

  it("returns fail for gte metric when value < thresholdWarning", () => {
    expect(evaluateReleaseMetric(89, gteDef)).toBe("fail");
    expect(evaluateReleaseMetric(0, gteDef)).toBe("fail");
  });

  it("returns pass for lte metric when value <= thresholdPass", () => {
    expect(evaluateReleaseMetric(0, lteDef)).toBe("pass");
  });

  it("returns warning for lte metric when value between pass and warning", () => {
    expect(evaluateReleaseMetric(1, lteDef)).toBe("warning");
    expect(evaluateReleaseMetric(2, lteDef)).toBe("warning");
  });

  it("returns fail for lte metric when value > thresholdWarning", () => {
    expect(evaluateReleaseMetric(3, lteDef)).toBe("fail");
    expect(evaluateReleaseMetric(10, lteDef)).toBe("fail");
  });
});

describe("evaluateReleaseReadiness", () => {
  const defs: ReleaseMetricDefinition[] = [
    { ...gteDef, id: "a" },
    { ...gteDef, id: "b" },
    { ...lteDef, id: "c" },
  ];

  it("returns go when all metrics pass", () => {
    const result = evaluateReleaseReadiness({ a: 99, b: 97, c: 0 }, defs);
    expect(result.decision).toBe("go");
    expect(result.passCount).toBe(3);
    expect(result.failCount).toBe(0);
    expect(result.warningCount).toBe(0);
  });

  it("returns no-go when any metric fails", () => {
    const result = evaluateReleaseReadiness({ a: 99, b: 50, c: 0 }, defs);
    expect(result.decision).toBe("no-go");
    expect(result.failCount).toBeGreaterThan(0);
  });

  it("returns no-go when 2+ warnings", () => {
    const result = evaluateReleaseReadiness({ a: 92, b: 93, c: 0 }, defs);
    expect(result.decision).toBe("no-go");
    expect(result.warningCount).toBe(2);
  });

  it("returns go when exactly 1 warning and 0 fails", () => {
    const result = evaluateReleaseReadiness({ a: 92, b: 99, c: 0 }, defs);
    expect(result.decision).toBe("go");
    expect(result.warningCount).toBe(1);
  });

  it("handles empty definitions", () => {
    const result = evaluateReleaseReadiness({}, []);
    expect(result.decision).toBe("go");
    expect(result.metrics).toHaveLength(0);
  });

  it("defaults missing values to 0", () => {
    const result = evaluateReleaseReadiness({}, defs);
    expect(result.metrics).toHaveLength(3);
    result.metrics.forEach((m) => {
      expect(m.value).toBe(0);
    });
  });
});
