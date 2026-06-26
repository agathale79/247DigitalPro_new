export interface ProductItem {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export const products: ProductItem[] = [
  {
    title: "CRM Platform",
    description:
      "All-in-one customer relationship management with pipeline tracking, lead scoring, and automated follow-ups.",
    features: ["Pipeline Management", "Lead Scoring", "Automated Follow-ups"],
    icon: "users",
  },
  {
    title: "Estimation Software",
    description:
      "Accurate project estimation with smart templates, material databases, and client-ready proposals.",
    features: ["Smart Templates", "Cost Databases", "Instant Proposals"],
    icon: "calculator",
  },
  {
    title: "Project Management",
    description:
      "Collaborative project tracking with task boards, timelines, resource allocation, and team chat.",
    features: ["Task Boards", "Gantt Timelines", "Resource Allocation"],
    icon: "clipboard-list",
  },
  {
    title: "Invoicing System",
    description:
      "Automated invoicing with recurring billing, payment tracking, and financial reporting dashboards.",
    features: ["Recurring Billing", "Payment Tracking", "Financial Reports"],
    icon: "file-text",
  },
  {
    title: "Website Builder",
    description:
      "Drag-and-drop website builder with SEO tools, analytics, and conversion-optimized templates.",
    features: ["Drag & Drop Editor", "SEO Built-in", "Analytics Dashboard"],
    icon: "layout",
  },
  {
    title: "Automation Dashboard",
    description:
      "Centralized control panel for all your automated workflows, integrations, and business processes.",
    features: ["Workflow Builder", "API Integrations", "Real-time Monitoring"],
    icon: "settings",
  },
];
