import type {
  HealthMetricDefinition,
  MetricStatus,
  HealthMetricResult,
  HealthEvaluationResult,
  HealthStatus,
} from "@/types";

export function evaluateHealthMetric(
  value: number,
  definition: HealthMetricDefinition
): MetricStatus {
  const { direction, thresholdGreen, thresholdYellow } = definition;

  if (direction === "gte") {
    if (value >= thresholdGreen) return "pass";
    if (value >= thresholdYellow) return "warning";
    return "fail";
  } else {
    if (value <= thresholdGreen) return "pass";
    if (value <= thresholdYellow) return "warning";
    return "fail";
  }
}

function computeHealthScore(metrics: HealthMetricResult[]): number {
  if (metrics.length === 0) return 0;
  const scoreMap: Record<MetricStatus, number> = {
    pass: 100,
    warning: 50,
    fail: 0,
  };
  const total = metrics.reduce((sum, m) => sum + scoreMap[m.status], 0);
  return Math.round(total / metrics.length);
}

export function evaluateProjectHealth(
  values: Record<string, number>,
  definitions: HealthMetricDefinition[]
): HealthEvaluationResult {
  const metrics: HealthMetricResult[] = definitions.map((def) => {
    const value = values[def.id] ?? 0;
    return {
      id: def.id,
      value,
      status: evaluateHealthMetric(value, def),
    };
  });

  const passCount = metrics.filter((m) => m.status === "pass").length;
  const warningCount = metrics.filter((m) => m.status === "warning").length;
  const criticalCount = metrics.filter((m) => m.status === "fail").length;
  const score = computeHealthScore(metrics);

  let overallStatus: HealthStatus;
  let summary: string;

  if (criticalCount > 0) {
    overallStatus = "critical";
    summary = `${criticalCount} metric${criticalCount > 1 ? "s" : ""} in critical range. Immediate escalation and corrective action required.`;
  } else if (warningCount > 0) {
    overallStatus = "at-risk";
    summary = `${warningCount} metric${warningCount > 1 ? "s" : ""} in warning range. Project requires attention to avoid slipping into critical status.`;
  } else {
    overallStatus = "on-track";
    summary =
      "All project health indicators are within acceptable ranges. Continue current trajectory.";
  }

  return {
    metrics,
    overallStatus,
    score,
    passCount,
    warningCount,
    criticalCount,
    summary,
  };
}
