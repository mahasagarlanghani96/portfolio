import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "disaster-management-field-operations",
    title: "Field Operations & Reporting System",
    subtitle: "Ensuring data integrity in offline-first disaster management",
    domain: "Disaster Management / Government (FEMA)",
    tags: [
      "Offline Sync",
      "Data Integrity",
      "GIS/ArcGIS",
      "Mobile Testing",
      "IoT",
    ],
    background:
      "A disaster management platform used by field teams to record damage assessments, track debris operations, and generate compliance reports for FEMA. The system operated across web, mobile, and desktop with offline-first capabilities — field crews needed to work in areas with no connectivity and sync data when back online.",
    problem:
      "Offline synchronization was creating duplicate disaster records when field workers submitted assessments in areas with intermittent connectivity. These duplicates flowed downstream into invoicing, quantity calculations, and federal reporting — threatening data accuracy in a compliance-critical system.",
    role: "Lead SQA Engineer responsible for end-to-end quality across all platforms. Coordinated QA coverage for web, mobile, desktop, and GIS components. Owned release sign-off decisions for production deployments.",
    challenges: [
      "Offline-to-online sync logic was complex, with multiple conflict resolution scenarios that varied by data type.",
      "Duplicate records were not immediately visible — they surfaced in downstream reports and invoicing, making root cause analysis difficult.",
      "Field operations couldn't be paused for testing; defects had to be caught before they reached production.",
      "Multiple user roles (field crews, supervisors, monitors, administrators) each had different data access patterns.",
      "GIS/ArcGIS integration added spatial data validation requirements beyond typical form testing.",
    ],
    approach: [
      "Mapped every offline sync scenario — from clean syncs to interrupted connections to rapid repeated submissions.",
      "Designed targeted test cases for duplicate detection across different record types and submission patterns.",
      "Tested quantity integrity end-to-end: from field input through aggregation to invoice generation and FEMA reporting.",
      "Coordinated cross-platform regression to ensure fixes on one platform didn't break sync behavior on another.",
      "Established build-health reports specifically for the sync module to catch regressions early.",
    ],
    collaboration:
      "Worked closely with backend engineers to understand sync conflict resolution logic, with the GIS team on spatial data validation, and with the client's compliance team to verify reporting accuracy requirements.",
    outcome:
      "Identified and helped resolve the duplicate record issue before it affected federal reporting. Established ongoing regression coverage for offline sync that caught subsequent regressions in later releases. The build-health reporting pattern was later adopted across other projects at the company.",
    lessons: [
      "Offline sync bugs often manifest far from where they originate — testing needs to follow data through the entire pipeline, not just the sync endpoint.",
      "In compliance-critical systems, the cost of a missed bug isn't just a user inconvenience — it's a reporting accuracy problem that can have regulatory consequences.",
      "Build-health reporting after releases gives the team a feedback loop that reduces the chance of shipping the same class of bug twice.",
    ],
    draft: false,
  },
  {
    slug: "service-booking-platform-migration",
    title: "Service Booking Platform Migration",
    subtitle: "Validating complex business rules during a legacy-to-new-system transition",
    domain: "Service Booking / Marketplace",
    tags: [
      "Migration",
      "Business Rules",
      "Booking Workflows",
      "Pricing Logic",
      "Regression",
    ],
    background:
      "A service booking platform connecting customers with service providers. The system handled booking allocation, provider scheduling, pricing with configurable add-ons, and financial reporting. The company was migrating from a legacy system to a rebuilt platform.",
    problem:
      "The migration needed to preserve complex business rules — booking allocation logic, pricing calculations with multiple add-on configurations, provider availability rules, and financial reconciliation — while the new system introduced a different underlying architecture. Any discrepancy in pricing or booking behavior would directly affect revenue and provider trust.",
    role: "Lead SQA Engineer managing quality across the migration. Responsible for defining the validation approach, coordinating testing across the old and new systems, and making the go/no-go recommendation for cutover.",
    challenges: [
      "Pricing rules involved multiple layers: base rates, service-specific add-ons, provider rates, time-based modifiers, and promotional discounts.",
      "Booking allocation followed complex rules that the legacy system had accumulated over years — not all were formally documented.",
      "Financial reports needed to reconcile between both systems during a parallel-run period.",
      "Provider-facing workflows had to remain consistent to avoid confusion during the transition.",
    ],
    approach: [
      "Built comparison test suites that ran the same booking scenarios against both old and new systems to verify behavioral parity.",
      "Mapped undocumented business rules by analyzing legacy system behavior and validating with stakeholders.",
      "Tested pricing calculations exhaustively across different add-on combinations and edge cases.",
      "Validated reporting reconciliation between systems during parallel operation.",
      "Defined specific regression criteria that had to pass before recommending cutover.",
    ],
    collaboration:
      "Coordinated with product managers to verify business rules, with the development team on migration-specific test environments, and with finance stakeholders on reporting accuracy requirements.",
    outcome:
      "Migration proceeded with verified business rule parity. The comparison testing approach caught pricing discrepancies that would have affected provider payouts. The documented business rules became a lasting reference for the team.",
    lessons: [
      "Legacy system migrations are really business-rule preservation projects — the technical migration is secondary to behavioral correctness.",
      "Undocumented business rules are the highest-risk area in any migration; discovering them requires testing, not just documentation review.",
      "Parallel-run validation with explicit reconciliation criteria gives stakeholders confidence in the cutover decision.",
    ],
    draft: false,
  },
  {
    slug: "auction-marketplace-payment-integrity",
    title: "Online Auction Marketplace",
    subtitle: "Catching currency and payment inconsistencies before they reach production",
    domain: "E-commerce / Auctions",
    tags: [
      "Payment Testing",
      "Currency Handling",
      "Invoice Accuracy",
      "Financial Systems",
    ],
    background:
      "An online auction platform where users bid on items, with the system handling multi-currency transactions, invoice generation, and payment processing. The platform needed to handle correct currency display, conversion, and transaction recording across the entire purchase flow.",
    problem:
      "Currency mismatch bugs were silently creating inconsistencies between what bidders saw, what invoices recorded, and what payment processors charged. In an auction context, where amounts change rapidly during bidding, these inconsistencies could result in financial discrepancies.",
    role: "Lead SQA Engineer responsible for identifying and validating the currency handling across the transaction pipeline.",
    challenges: [
      "Currency was handled at multiple points in the flow — display, bid recording, invoice generation, and payment processing — each potentially using different currency references.",
      "The bug was subtle: transactions appeared to work correctly in common scenarios but failed in specific currency combination edge cases.",
      "Auction timing pressure meant that some validation happened asynchronously, making real-time currency verification complex.",
    ],
    approach: [
      "Traced currency handling through every touchpoint: listing display, bid submission, winning confirmation, invoice generation, and payment initiation.",
      "Created targeted test scenarios for multi-currency edge cases that the standard test suite didn't cover.",
      "Validated invoice amounts against bid records and payment processor charges for consistency.",
      "Established currency-specific regression tests to prevent recurrence.",
    ],
    collaboration:
      "Worked with the payments integration team to understand the currency handling at each pipeline stage and with the frontend team to verify display consistency.",
    outcome:
      "Caught the currency mismatch before it reached production. The targeted testing approach and regression suite prevented similar issues in subsequent releases.",
    lessons: [
      "Financial accuracy bugs are often invisible in happy-path testing — they require deliberate edge-case exploration across the entire transaction pipeline.",
      "Currency handling should be validated end-to-end, not at individual checkpoints. A display that looks correct doesn't guarantee the backend recorded the same value.",
    ],
    draft: false,
  },
  {
    slug: "qa-department-building",
    title: "QA Process & Department Building",
    subtitle: "From solo QA to a 15-person quality engineering department",
    domain: "QA Process Improvement / Organizational",
    tags: [
      "QA Leadership",
      "Process Design",
      "Team Building",
      "Release Governance",
      "Mentoring",
    ],
    background:
      "KoderLabs is a software agency delivering projects across diverse domains. When I joined, QA was fragmented — engineers were scattered across departments with no unified standards, inconsistent test practices, and no formal release governance.",
    problem:
      "The scattered QA structure meant inconsistent quality across projects, no standardized test practices, unclear release criteria, and difficulty scaling QA coverage as the company grew. Buggy builds regularly reached testing because there was no structured handoff process from development.",
    role: "Identified the problem as an SQA Engineer, proposed the centralization, and led the initiative from Senior SQA through Lead SQA — ultimately building and running the unified department.",
    challenges: [
      "QA engineers across departments had developed different workflows and reporting standards.",
      "No existing release governance — shipping decisions were informal and inconsistent.",
      "Needed to maintain project coverage during the reorganization.",
      "Team ranged from junior to senior, requiring different mentoring approaches.",
      "Agency environment with 15–20+ concurrent projects meant resource allocation was constantly shifting.",
    ],
    approach: [
      "Proposed and led the initiative to unify all QA engineers into one centralized department.",
      "Defined company-wide test planning, test-case standards, and regression practices.",
      "Introduced developer-to-QA build demonstrations — developers walked QA through completed work before formal handoff.",
      "Established post-release build-health reports to track quality trends across builds.",
      "Created release sign-off criteria and owned go/no-go decisions across all projects.",
      "Built Jira and Google Sheets quality dashboards for visibility into QA status across projects.",
      "Ran daily and weekly syncs to review project status, testing quality, capacity pressure, and coverage needs.",
    ],
    collaboration:
      "Coordinated daily with PMs, BAs, Account Managers, and the Director of Engineering on QA processes and project-level quality decisions. Participated in hiring and mentored team members from junior to senior level.",
    outcome:
      "Built a functioning QA department of 9–15 engineers with standardized practices. Developer-to-QA demonstrations reduced buggy builds reaching testing. Release governance became a defined process rather than an informal decision. The department structure supported the company's growth across 300+ delivered projects.",
    lessons: [
      "Quality isn't just about finding bugs — it's about building systems that prevent them from reaching users. Process improvements compound over time.",
      "Developer-to-QA demonstrations create shared ownership of quality. When developers walk through their work, they catch issues themselves before QA even starts.",
      "Release governance needs to be a defined process with clear criteria, not a conversation that happens differently each time.",
    ],
    draft: false,
  },
  {
    slug: "multi-project-delivery-coordination",
    title: "Multi-Project Delivery Coordination",
    subtitle: "Managing quality and delivery across 6+ concurrent projects",
    domain: "Project Management / Multi-Project Delivery",
    tags: [
      "Project Management",
      "Resource Allocation",
      "Stakeholder Communication",
      "Release Planning",
      "Agile",
    ],
    background:
      "As both QA Lead and later Project Manager at KoderLabs, I managed quality and delivery across multiple concurrent projects spanning web, mobile, desktop, and IoT platforms for clients in the US, UAE, and Pakistan.",
    problem:
      "Concurrent projects with shared resources, different client expectations, varying release schedules, and cross-platform dependencies created coordination challenges. Each project had its own delivery timeline, but QA resources and sometimes development resources were shared — meaning a delay or escalation on one project could cascade to others.",
    role: "Initially as Lead SQA managing QA allocation and release readiness across all projects, then as Project Manager directly owning delivery for six concurrent engagements with teams of 10–20.",
    challenges: [
      "Shared QA and development resources meant capacity decisions on one project affected others.",
      "Clients in different time zones (US, UAE, Pakistan) with different communication expectations.",
      "Projects ranged from maintenance releases to greenfield builds — different delivery cadences and risk profiles.",
      "UAT timelines and client feedback cycles varied, making sprint planning across projects complex.",
    ],
    approach: [
      "Developed resource allocation practices that balanced project priority with team capacity and skill match.",
      "Established sprint planning and backlog grooming practices that accounted for cross-project dependencies.",
      "Created clear escalation paths for when project timelines conflicted.",
      "Maintained regular client communication cadences adjusted to each client's preferred frequency and format.",
      "Tracked delivery metrics — scope changes, defect rates, sprint velocity — to identify issues early.",
    ],
    collaboration:
      "Coordinated with BAs, developers, designers, QA engineers, account managers, and direct clients. Managed stakeholder expectations across cultural contexts and communication styles.",
    outcome:
      "Directed two projects through UAT and completion within two months each. Maintained delivery cadence across concurrent projects while coordinating a mobile app-store submission and four maintenance releases for an existing client.",
    lessons: [
      "Multi-project management is fundamentally about resource allocation decisions — every yes to one project is an implicit constraint on another.",
      "Client communication style matters as much as content. The same status update needs different framing for a US enterprise client versus a local startup.",
      "Delivery tracking metrics are only useful if they drive decisions. A dashboard nobody acts on is just noise.",
    ],
    draft: false,
  },
];
