import { describe, it, expect } from "vitest";
import {
  evaluateHealthMetric,
  evaluateProjectHealth,
} from "@/lib/evaluate-health";
import type { HealthMetricDefinition } from "@/types";

const gteDef: HealthMetricDefinition = {
  id: "satisfaction",
  label: "Stakeholder Satisfaction",
  unit: "/ 10",
  placeholder: "1–10",
  description: "Average satisfaction",
  thresholdGreen: 7,
  thresholdYellow: 5,
  direction: "gte",
};

const lteDef: HealthMetricDefinition = {
  id: "budget",
  label: "Budget Utilization",
  unit: "%",
  placeholder: "0–150",
  description: "Budget consumed",
  thresholdGreen: 90,
  thresholdYellow: 110,
  direction: "lte",
};

describe("evaluateHealthMetric", () => {
  it("returns pass for gte metric when value >= thresholdGreen", () => {
    expect(evaluateHealthMetric(8, gteDef)).toBe("pass");
    expect(evaluateHealthMetric(7, gteDef)).toBe("pass");
  });

  it("returns warning for gte metric when value between yellow and green", () => {
    expect(evaluateHealthMetric(6, gteDef)).toBe("warning");
    expect(evaluateHealthMetric(5, gteDef)).toBe("warning");
  });

  it("returns fail for gte metric when value < thresholdYellow", () => {
    expect(evaluateHealthMetric(4, gteDef)).toBe("fail");
    expect(evaluateHealthMetric(1, gteDef)).toBe("fail");
  });

  it("returns pass for lte metric when value <= thresholdGreen", () => {
    expect(evaluateHealthMetric(80, lteDef)).toBe("pass");
    expect(evaluateHealthMetric(90, lteDef)).toBe("pass");
  });

  it("returns warning for lte metric when value between green and yellow", () => {
    expect(evaluateHealthMetric(100, lteDef)).toBe("warning");
    expect(evaluateHealthMetric(110, lteDef)).toBe("warning");
  });

  it("returns fail for lte metric when value > thresholdYellow", () => {
    expect(evaluateHealthMetric(120, lteDef)).toBe("fail");
  });

  it("handles negative values (schedule variance)", () => {
    const schedDef: HealthMetricDefinition = {
      id: "schedule",
      label: "Schedule Variance",
      unit: "%",
      placeholder: "-50 to +50",
      description: "Schedule deviation",
      thresholdGreen: -5,
      thresholdYellow: -15,
      direction: "gte",
    };
    expect(evaluateHealthMetric(0, schedDef)).toBe("pass");
    expect(evaluateHealthMetric(-5, schedDef)).toBe("pass");
    expect(evaluateHealthMetric(-10, schedDef)).toBe("warning");
    expect(evaluateHealthMetric(-20, schedDef)).toBe("fail");
  });
});

describe("evaluateProjectHealth", () => {
  const defs: HealthMetricDefinition[] = [
    { ...gteDef, id: "a" },
    { ...gteDef, id: "b" },
    { ...lteDef, id: "c" },
  ];

  it("returns on-track when all metrics pass", () => {
    const result = evaluateProjectHealth({ a: 9, b: 8, c: 80 }, defs);
    expect(result.overallStatus).toBe("on-track");
    expect(result.score).toBe(100);
    expect(result.passCount).toBe(3);
  });

  it("returns at-risk when any metric is warning but none fail", () => {
    const result = evaluateProjectHealth({ a: 6, b: 8, c: 80 }, defs);
    expect(result.overallStatus).toBe("at-risk");
    expect(result.warningCount).toBeGreaterThan(0);
    expect(result.criticalCount).toBe(0);
  });

  it("returns critical when any metric fails", () => {
    const result = evaluateProjectHealth({ a: 2, b: 8, c: 80 }, defs);
    expect(result.overallStatus).toBe("critical");
    expect(result.criticalCount).toBeGreaterThan(0);
  });

  it("computes correct score", () => {
    // all pass = 100
    expect(evaluateProjectHealth({ a: 9, b: 8, c: 80 }, defs).score).toBe(100);
    // all fail = 0
    expect(evaluateProjectHealth({ a: 1, b: 1, c: 200 }, defs).score).toBe(0);
    // mixed: 1 pass (100) + 1 warning (50) + 1 fail (0) = 150/3 = 50
    expect(evaluateProjectHealth({ a: 9, b: 6, c: 120 }, defs).score).toBe(50);
  });

  it("handles empty definitions", () => {
    const result = evaluateProjectHealth({}, []);
    expect(result.overallStatus).toBe("on-track");
    expect(result.score).toBe(0);
    expect(result.metrics).toHaveLength(0);
  });

  it("defaults missing values to 0", () => {
    const result = evaluateProjectHealth({}, defs);
    expect(result.metrics).toHaveLength(3);
    result.metrics.forEach((m) => {
      expect(m.value).toBe(0);
    });
  });
});
