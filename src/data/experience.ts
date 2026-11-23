import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "koderlabs",
    company: "KoderLabs",
    location: "Karachi, Pakistan",
    startDate: "Nov 2019",
    endDate: "Present",
    roles: [
      {
        title: "Project Manager",
        startDate: "Apr 2026",
        endDate: "Present",
        responsibilities: [
          "Managing 6 concurrent client projects across web, mobile, desktop and IoT platforms for US, UAE, and Pakistan clients, with cross-functional teams of 10–20.",
          "Directed two projects through UAT and completion within two months each; coordinated mobile app-store submission on another project.",
          "Coordinate Debris Optics maintenance and four software releases; track delivery issues, defects, changes and release readiness.",
          "Plan project scope, SOWs, estimates, sprint work, staffing, contracted hours and client change requests; assess resource pay rates, effort and ROI for commercial decisions.",
        ],
        technologies: [
          "Jira",
          "Confluence",
          "Agile/Scrum",
          "Slack",
          "Google Sheets",
        ],
      },
      {
        title: "Lead SQA Engineer",
        startDate: "Jan 2022",
        endDate: "Mar 2026",
        responsibilities: [
          "Built and led a centralized QA department of 9–15 engineers; participated in hiring, assigned QAs by project, mentored team members and shifted staff between engagements based on delivery needs.",
          "Acted as de-facto delivery coordinator on key accounts: Debris Optics (FEMA), Geospace (DOE), GFS (FinTech), Casita Trailers (Odoo ERP). Managed QA delivery across 20+ enterprise platforms simultaneously.",
          "Introduced developer-to-QA build demonstrations and post-release build-health reports; improved handoff ownership and reduced buggy builds reaching testing.",
          "Defined company-wide test planning, test-case standards, regression practices and production release sign-off; owned final go/no-go quality judgments across simultaneous projects.",
          "Built Jira and Google Sheets quality dashboards; oversaw ERP workflows, migrations, integrations, e-commerce payments, IoT synchronization and mobile testing.",
          "Caught critical business-logic bugs: offline sync duplicating disaster records, currency mismatch in auctions, quotation fee double-counting, purchase list overwrite after 20 items, pet-charge recalculation during data migration.",
        ],
        technologies: [
          "Jira",
          "Postman",
          "BrowserStack",
          "LambdaTest",
          "Google Sheets",
          "Confluence",
        ],
      },
      {
        title: "Senior SQA Engineer",
        startDate: "Jul 2021",
        endDate: "Dec 2021",
        responsibilities: [
          "Merged all QA engineers across departments into one unified QA department — this initiative led directly to the Lead SQA Engineer promotion.",
          "Took ownership of QA prioritization across concurrent projects, balancing urgent production issues with sprint testing.",
          "Started delivery coordination: providing QA status updates in client calls, flagging release risks, and advising PMs on testing timelines and go-live readiness.",
          "Mentored peers on testing workflows, defect reporting standards and cross-browser/cross-device testing practices.",
        ],
        technologies: [
          "Jira",
          "BrowserStack",
          "Postman",
        ],
      },
      {
        title: "SQA Engineer",
        startDate: "Nov 2019",
        endDate: "Jun 2021",
        responsibilities: [
          "Joined as the only QA in the department. Involved in every project from design phase through delivery. Handled 15–20 website tasks daily alongside complex cross-department projects.",
          "Performed functional, UI, regression and cross-device testing across WordPress, Shopify, PHP, React, Vue.js, native Android/iOS, React Native and Flutter projects.",
          "Won Best SQA Engineer award.",
        ],
        technologies: [
          "WordPress",
          "Shopify",
          "React",
          "Vue.js",
          "React Native",
          "Flutter",
          "Android",
          "iOS",
        ],
      },
    ],
  },
  {
    id: "itsec",
    company: "ITSec Pvt. Ltd.",
    location: "Karachi, Pakistan",
    startDate: "Aug 2018",
    endDate: "Oct 2019",
    roles: [
      {
        title: "Junior QA",
        startDate: "Aug 2018",
        endDate: "Oct 2019",
        responsibilities: [
          "Sole QA handling all deliverables end-to-end: websites, mobile apps, web apps, logo/branding designs, 2D/3D animations, stationery, flyers, and brochures.",
          "Managed quality from assignment through final delivery, coordinating with designers and developers to ensure defect resolution across both tech and creative outputs.",
        ],
        technologies: [
          "Web Apps",
          "Mobile Apps",
          "Design QA",
        ],
      },
    ],
  },
];
