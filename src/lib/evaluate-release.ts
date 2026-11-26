import type {
  ReleaseMetricDefinition,
  MetricStatus,
  ReleaseMetricResult,
  ReleaseEvaluationResult,
  ReleaseDecision,
} from "@/types";

export function evaluateReleaseMetric(
  value: number,
  definition: ReleaseMetricDefinition
): MetricStatus {
  const { direction, thresholdPass, thresholdWarning } = definition;

  if (direction === "gte") {
    if (value >= thresholdPass) return "pass";
    if (value >= thresholdWarning) return "warning";
    return "fail";
  } else {
    if (value <= thresholdPass) return "pass";
    if (value <= thresholdWarning) return "warning";
    return "fail";
  }
}

export function evaluateReleaseReadiness(
  values: Record<string, number>,
  definitions: ReleaseMetricDefinition[]
): ReleaseEvaluationResult {
  const metrics: ReleaseMetricResult[] = definitions.map((def) => {
    const value = values[def.id] ?? 0;
    return {
      id: def.id,
      value,
      status: evaluateReleaseMetric(value, def),
    };
  });

  const passCount = metrics.filter((m) => m.status === "pass").length;
  const failCount = metrics.filter((m) => m.status === "fail").length;
  const warningCount = metrics.filter((m) => m.status === "warning").length;

  let decision: ReleaseDecision;
  let summary: string;

  if (failCount > 0) {
    decision = "no-go";
    summary = `${failCount} metric${failCount > 1 ? "s" : ""} failed threshold. Hold release until blocking issues are resolved.`;
  } else if (warningCount >= 2) {
    decision = "no-go";
    summary = `${warningCount} metrics are in warning range. Too many risks to proceed — address before release.`;
  } else {
    decision = "go";
    summary =
      warningCount === 1
        ? "All critical thresholds met with 1 metric in warning range. Release is conditionally approved — monitor the warning area."
        : "All release criteria met. This release is ready for production deployment.";
  }

  return { metrics, decision, passCount, failCount, warningCount, summary };
}
