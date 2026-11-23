import type { ExpertiseTrack, LifecyclePhase } from "@/types";

export const expertiseTracks: ExpertiseTrack[] = [
  {
    id: "quality-engineering",
    title: "Quality Engineering & QA Leadership",
    subtitle: "Building quality into every stage of software delivery",
    description:
      "Quality isn't a phase at the end of development — it's a discipline woven through the entire lifecycle. I lead QA teams that think beyond test cases: identifying risks early, defining what 'ready to ship' actually means, and making the go/no-go calls that protect users and revenue.",
    capabilities: [
      {
        title: "Test Strategy & Planning",
        description:
          "Defining what to test, how deep to go, and where the highest risk lives. Not every feature needs the same coverage — strategy means allocating testing effort where it matters most.",
        icon: "ClipboardList",
      },
      {
        title: "Release Governance",
        description:
          "Owning the go/no-go decision. Evaluating test results, open defects, known risks, and stakeholder readiness to determine whether a release is truly ready for production.",
        icon: "ShieldCheck",
      },
      {
        title: "QA Team Leadership",
        description:
          "Building, mentoring, and scaling QA teams. Hiring, assigning engineers to projects by skill match, running syncs, and shifting resources when delivery needs change.",
        icon: "Users",
      },
      {
        title: "Process Design & Improvement",
        description:
          "Creating the systems that make quality repeatable: developer-to-QA handoffs, build-health reporting, regression standards, and defect lifecycle management.",
        icon: "Settings",
      },
      {
        title: "Cross-Platform Testing",
        description:
          "Testing across web, mobile, desktop, and IoT platforms. Understanding platform-specific behaviors, offline sync, and cross-device consistency.",
        icon: "Monitor",
      },
      {
        title: "Risk Identification",
        description:
          "Finding the bugs that would cost real money — currency mismatches, data duplication, pricing errors — before they reach production.",
        icon: "AlertTriangle",
      },
    ],
  },
  {
    id: "project-delivery",
    title: "Technical Project Delivery",
    subtitle: "From requirements to release, across concurrent engagements",
    description:
      "Transitioning from QA leadership to project management meant I already understood the full delivery pipeline — scope, build, test, ship. I bring a quality-first mindset to delivery: if the process is right, the output is right.",
    capabilities: [
      {
        title: "Multi-Project Management",
        description:
          "Managing 6+ concurrent projects with cross-functional teams of 10–20. Balancing priorities, resource allocation, and delivery timelines across different clients and domains.",
        icon: "LayoutGrid",
      },
      {
        title: "Agile Delivery",
        description:
          "Sprint planning, backlog grooming, estimation, and scoping. Translating business requirements into actionable work items and keeping teams aligned on delivery goals.",
        icon: "Zap",
      },
      {
        title: "Stakeholder Communication",
        description:
          "Managing expectations across time zones and cultural contexts — US, UAE, and Pakistan clients with different communication preferences and decision-making styles.",
        icon: "MessageSquare",
      },
      {
        title: "Resource Planning",
        description:
          "Staffing decisions, effort estimation, ROI assessment for resource allocation, and managing shared resources across concurrent projects without creating bottlenecks.",
        icon: "BarChart3",
      },
      {
        title: "Release Management",
        description:
          "Coordinating release readiness, UAT, app-store submissions, and maintenance cycles. Tracking delivery issues, defects, and changes across release stages.",
        icon: "Rocket",
      },
      {
        title: "Scope & Commercial Awareness",
        description:
          "SOWs, change requests, contracted hours, and commercial decision-making. Understanding the business side of delivery, not just the technical side.",
        icon: "FileText",
      },
    ],
  },
];

export const lifecyclePhases: LifecyclePhase[] = [
  {
    id: "discover",
    title: "Discover",
    description:
      "Understanding what needs to be built, who it's for, and what success looks like.",
    qaActivities: [
      "Review requirements for testability",
      "Identify ambiguous or conflicting requirements",
      "Flag risk areas early",
      "Assess testing effort and coverage needs",
    ],
    pmActivities: [
      "Gather and document requirements",
      "Define project scope and boundaries",
      "Identify stakeholders and decision-makers",
      "Assess feasibility and constraints",
    ],
    deliverables: [
      "Requirements document",
      "Risk assessment",
      "Initial test strategy outline",
      "Project charter",
    ],
  },
  {
    id: "plan",
    title: "Plan",
    description:
      "Breaking work into manageable pieces with clear timelines and resource allocation.",
    qaActivities: [
      "Create test plan and strategy",
      "Define test environments needed",
      "Estimate QA effort per feature",
      "Plan regression suite scope",
    ],
    pmActivities: [
      "Create project plan and milestones",
      "Allocate resources and assign teams",
      "Define sprint structure and cadence",
      "Set up communication cadences",
    ],
    deliverables: [
      "Test plan",
      "Sprint backlog",
      "Resource allocation matrix",
      "Communication plan",
    ],
  },
  {
    id: "design",
    title: "Design",
    description:
      "Translating requirements into technical and user experience designs.",
    qaActivities: [
      "Review designs for usability issues",
      "Identify edge cases from wireframes",
      "Validate design against requirements",
      "Plan test cases from design specs",
    ],
    pmActivities: [
      "Coordinate design reviews with stakeholders",
      "Manage design feedback cycles",
      "Track design-to-requirement traceability",
      "Approve design completion milestones",
    ],
    deliverables: [
      "Design review feedback",
      "Test case drafts",
      "Design sign-off",
      "Updated requirements",
    ],
  },
  {
    id: "build",
    title: "Build",
    description: "Development with continuous quality integration, not testing as an afterthought.",
    qaActivities: [
      "Developer-to-QA build demonstrations",
      "Early smoke testing on dev builds",
      "Defect reporting and verification",
      "API testing alongside development",
    ],
    pmActivities: [
      "Track sprint progress and velocity",
      "Manage blockers and dependencies",
      "Coordinate cross-team handoffs",
      "Client status updates and demos",
    ],
    deliverables: [
      "Tested builds",
      "Defect reports",
      "Sprint review notes",
      "Build-health status",
    ],
  },
  {
    id: "validate",
    title: "Validate",
    description: "Comprehensive testing to verify everything works as intended, together.",
    qaActivities: [
      "Execute full test suites",
      "Regression testing",
      "Cross-browser and cross-device testing",
      "Performance and edge case validation",
      "UAT coordination and support",
    ],
    pmActivities: [
      "Coordinate UAT with stakeholders",
      "Track defect resolution priority",
      "Manage scope decisions for release",
      "Prepare release readiness assessment",
    ],
    deliverables: [
      "Test execution reports",
      "UAT sign-off",
      "Defect summary",
      "Release readiness report",
    ],
  },
  {
    id: "release",
    title: "Release",
    description: "The go/no-go decision — shipping with confidence, not hope.",
    qaActivities: [
      "Final regression pass",
      "Release criteria evaluation",
      "Go/no-go recommendation",
      "Post-release build-health monitoring",
    ],
    pmActivities: [
      "Release coordination across teams",
      "Client communication for go-live",
      "Deployment verification",
      "Post-release stakeholder update",
    ],
    deliverables: [
      "Release sign-off",
      "Deployment checklist",
      "Post-release health report",
      "Client confirmation",
    ],
  },
  {
    id: "improve",
    title: "Improve",
    description: "Learning from each cycle to make the next one better.",
    qaActivities: [
      "Analyze escaped defects",
      "Update regression suites",
      "Review test coverage gaps",
      "Refine build-health metrics",
    ],
    pmActivities: [
      "Sprint retrospective facilitation",
      "Process improvement identification",
      "Capacity planning for next cycle",
      "Client feedback incorporation",
    ],
    deliverables: [
      "Retrospective action items",
      "Updated test strategy",
      "Process improvement log",
      "Next sprint priorities",
    ],
  },
];
