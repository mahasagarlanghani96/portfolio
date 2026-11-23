import type { ReleaseMetric, ReleaseCriteria } from "@/types";

export const sampleReleaseMetrics: ReleaseMetric[] = [
  {
    label: "Test Cases Executed",
    value: 847,
    threshold: 800,
    unit: "of 892",
    status: "pass",
  },
  {
    label: "Pass Rate",
    value: 94.2,
    threshold: 95,
    unit: "%",
    status: "warning",
  },
  {
    label: "Critical Defects Open",
    value: 2,
    threshold: 0,
    unit: "bugs",
    status: "fail",
  },
  {
    label: "Regression Pass Rate",
    value: 98.1,
    threshold: 95,
    unit: "%",
    status: "pass",
  },
  {
    label: "High-Priority Defects",
    value: 5,
    threshold: 3,
    unit: "bugs",
    status: "fail",
  },
  {
    label: "Code Coverage",
    value: 78,
    threshold: 70,
    unit: "%",
    status: "pass",
  },
];

export const sampleReleaseCriteria: ReleaseCriteria[] = [
  {
    id: "critical-bugs",
    label: "Zero critical defects",
    met: false,
    details: "2 critical defects remain open: payment currency mismatch in edge case, offline sync timeout on large payloads.",
  },
  {
    id: "regression",
    label: "Regression suite pass rate ≥ 95%",
    met: true,
    details: "98.1% pass rate across 312 regression test cases. 6 failures are known environment-specific issues.",
  },
  {
    id: "uat",
    label: "UAT sign-off received",
    met: true,
    details: "Client completed UAT on Nov 15. 3 minor feedback items logged — none blocking release.",
  },
  {
    id: "performance",
    label: "Performance within acceptable range",
    met: true,
    details: "API response times under 200ms for 95th percentile. Page load under 3s on target devices.",
  },
  {
    id: "security",
    label: "No open security vulnerabilities",
    met: true,
    details: "Security scan completed. All findings from previous scan resolved and verified.",
  },
  {
    id: "coverage",
    label: "Test execution coverage ≥ 90%",
    met: true,
    details: "847 of 892 planned test cases executed (94.9%). Remaining 45 are low-priority edge cases.",
  },
];

export const DEMO_DISCLAIMER =
  "This is a fictional demonstration showing how a QA leader evaluates release readiness. All data is sample data created for illustrative purposes.";
