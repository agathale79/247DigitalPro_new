/**
 * JobFlow product page content.
 *
 * Rules (agreed with the product owner):
 * - The launch client stays fully anonymous: no name, pricing, or real volumes.
 * - `highlights`, `process`, and `integrations` describe only what is live today.
 * - Anything not yet built belongs in `roadmap`, which the page labels as planned.
 */

export const jobflowMeta = {
  name: "JobFlow",
  tagline: "From first lead to finished job, in one system.",
  description:
    "JobFlow is a lead-to-production system for service businesses. Every lead lands in one queue, follow-ups run on a schedule, site visits go on the calendar, and each job is tracked stage by stage through to cost close-out.",
  demoCta: "Request a Demo",
};

export interface JobFlowPainPoint {
  before: string;
  after: string;
}

export const painPoints: JobFlowPainPoint[] = [
  {
    before: "Leads arrive by Facebook, Angi, web form and phone, and live in different inboxes.",
    after: "Every lead lands in one queue automatically, tagged with its source.",
  },
  {
    before: "Follow-ups depend on someone remembering to call back.",
    after: "A set follow-up cadence of calls, emails, and callback dates, with nothing left to memory.",
  },
  {
    before: "Sales and the shop track jobs in separate spreadsheets.",
    after: "Approved work moves to a shared production board the whole team sees live.",
  },
  {
    before: "Nobody knows which lead source pays off, or what a job actually cost.",
    after: "Source attribution, pipeline reports, and cost close-out on every completed job.",
  },
];

export interface JobFlowHighlight {
  icon: string;
  title: string;
  description: string;
}

export const highlights: JobFlowHighlight[] = [
  {
    icon: "inbox",
    title: "Every lead in one queue",
    description:
      "Facebook Lead Ads, Angi, your website form and internal forms feed a single review queue. Approve good leads and set spam aside in a click.",
  },
  {
    icon: "phone",
    title: "Follow-up that doesn't slip",
    description:
      "A structured cadence: first call within 24 hours, then an automatic email and a dated task after each missed call, for up to three attempts.",
  },
  {
    icon: "calendar",
    title: "Callbacks and site visits on the calendar",
    description:
      "Booking a site visit creates a Google Calendar event, and rescheduling updates it. Leads who ask to be called back later come back automatically on the date.",
  },
  {
    icon: "kanban",
    title: "Stage-by-stage production board",
    description:
      "Sold jobs move onto a 13-stage production board. Each stage is marked to do, in progress, complete, on hold, or not needed.",
  },
  {
    icon: "calculator",
    title: "Job costing and margins",
    description:
      "Close out each completed job with its actual costs, so you can see the real margin on the work you did.",
  },
  {
    icon: "chart",
    title: "Reports that answer real questions",
    description:
      "Ten built-in reports, including lead-source attribution, quotes sent, follow-ups, lost leads and on-hold jobs, all exportable to CSV.",
  },
  {
    icon: "shield",
    title: "The right access for each person",
    description:
      "Roles and departments keep sales and production in their own lanes. Access rules are enforced by the database, not just hidden in the menu.",
  },
  {
    icon: "history",
    title: "Full history with one-click undo",
    description:
      "Every change is recorded. If something is edited by mistake, restore the earlier version in a click.",
  },
];

export interface JobFlowStep {
  title: string;
  description: string;
}

export const process: JobFlowStep[] = [
  { title: "Capture", description: "Leads arrive from every channel into one queue." },
  { title: "Review", description: "Approve good leads, reject spam or out-of-area requests." },
  { title: "Follow up", description: "Calls, automatic emails, and callback dates, on a schedule." },
  { title: "Visit & quote", description: "Book the site visit on the calendar and track the quote." },
  { title: "Produce", description: "The job moves stage by stage across the production board." },
  { title: "Close out", description: "Record actual costs and see the margin on every job." },
];

/** Hero animation: the path one sample job takes through JobFlow today. */
export const heroStages = [
  "Lead captured",
  "Approved",
  "Followed up",
  "Visit booked",
  "Quote sent",
  "In production",
  "Completed",
];

export const integrations = [
  { name: "Zapier", detail: "Brings leads in from any source" },
  { name: "Google Calendar", detail: "Site visits and reschedules" },
  { name: "CompanyCam", detail: "Photo projects created on approval" },
  { name: "ShopVox", detail: "Sales records created on approval" },
  { name: "Email", detail: "Automatic follow-up emails" },
];

export interface JobFlowRoadmapGroup {
  title: string;
  items: string[];
}

export const roadmap: JobFlowRoadmapGroup[] = [
  {
    title: "Customers & collaboration",
    items: [
      "Customer records with contacts and a full activity timeline",
      "Notes and assignable, dated tasks on every lead, quote, and order",
      "A personal \"My Tasks\" view with overdue flags",
    ],
  },
  {
    title: "Pricing & quotes",
    items: [
      "Your pricing rules built in as editable price books",
      "A quote builder with live totals and versions",
      "Branded quote PDFs, emailed in one click",
      "Online quote approval for customers",
    ],
  },
  {
    title: "Orders, invoicing & payments",
    items: [
      "An accepted quote becomes an order and a job, with no re-typing",
      "Deposit, progress, and final invoices with payment tracking",
      "Accounts-receivable aging: who owes what, and for how long",
      "QuickBooks sync and online card payments",
    ],
  },
];

export interface JobFlowFaq {
  question: string;
  answer: string;
}

export const faqs: JobFlowFaq[] = [
  {
    question: "Who is JobFlow for?",
    answer:
      "Service businesses that sell, schedule, and deliver jobs, such as contractors, installers, and trades. It suits teams where sales and production need to share the same view of the work.",
  },
  {
    question: "Is JobFlow running in a real business today?",
    answer:
      "Yes. JobFlow runs the day-to-day lead pipeline, follow-ups, and production tracking for an installation business, with sales and production teams using it live.",
  },
  {
    question: "Can it work with the lead sources we already use?",
    answer:
      "Yes. Leads come in through Zapier, so Facebook Lead Ads, Angi, website forms, and most other sources can feed the same queue.",
  },
  {
    question: "Does it work on phones and tablets?",
    answer:
      "Yes. JobFlow is a web app, so your team can use it in the office, in the shop, or on site from any modern browser.",
  },
  {
    question: "How do we get started?",
    answer:
      "Request a demo. We'll walk through your current lead and job process and show you how JobFlow would fit it.",
  },
];
