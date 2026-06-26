import {
  Megaphone,
  Globe,
  Cloud,
  Palette,
  Bot,
  Users,
  Search,
  FileText,
} from "lucide-react";
import type { ServiceDetail } from "@/types/service-detail";
import { getServiceHeroImage } from "@/data/service-images";

const ctaPanel = (): ServiceDetail["panels"][number] => ({
    id: "cta",
    navLabel: "Start",
    title: "Ready to get started?",
    subtitle: "Let's build your next chapter together.",
    body: "Book a free strategy call and we'll map the right approach for your goals, timeline, and budget.",
    list: [
      "Free 30-minute discovery session",
      "Tailored roadmap & timeline",
      "Transparent pricing options",
    ],
});

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "Growth Campaigns",
    tagline: "Turn attention into measurable revenue",
    description:
      "Strategic campaigns across search, social, and content that attract qualified leads and compound your brand's reach over time.",
    href: "/services/digital-marketing",
    icon: Megaphone,
    heroImage: getServiceHeroImage("digital-marketing"),
    accent: "#1e5a98",
    accentMuted: "#d6e8f8",
    heroGradient:
      "linear-gradient(135deg, #d6e8f8 0%, #f3f7fc 40%, #ffffff 100%)",
    stats: [
      { value: "3.2×", label: "Avg. ROAS uplift" },
      { value: "48%", label: "Lower cost per lead" },
      { value: "12+", label: "Channels managed" },
    ],
    panels: [
      {
        id: "overview",
        navLabel: "Overview",
        title: "Marketing that moves the needle",
        subtitle: "Full-funnel growth",
        body: "We blend paid media, organic search, and content into one cohesive engine — so every touchpoint works toward the same business outcome.",
        bullets: [
          {
            title: "Audience-first strategy",
            description:
              "Deep research into your market, competitors, and buyer intent before a single ad goes live.",
          },
          {
            title: "Always-on optimization",
            description:
              "Weekly performance reviews, creative refreshes, and budget shifts based on real data.",
          },
        ],
      },
      {
        id: "offerings",
        navLabel: "Offerings",
        title: "What we deliver",
        subtitle: "End-to-end capabilities",
        list: [
          "Search & performance marketing (Google, Meta, LinkedIn)",
          "SEO & content strategy",
          "Email nurture & automation flows",
          "Conversion rate optimization",
          "Analytics & attribution setup",
          "Monthly growth reporting",
        ],
      },
      {
        id: "process",
        navLabel: "Process",
        title: "How we work",
        subtitle: "A repeatable growth loop",
        bullets: [
          {
            title: "Audit & benchmark",
            description: "Baseline your channels, creatives, and funnel performance.",
          },
          {
            title: "Plan & launch",
            description: "Campaign architecture, messaging, and tracking in one sprint.",
          },
          {
            title: "Scale & refine",
            description: "Double down on winners and cut waste with confidence.",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        title: "Results you can report on",
        subtitle: "Clarity for leadership",
        body: "Every engagement ships with dashboards your team actually uses — pipeline contribution, CAC, LTV, and channel mix at a glance.",
        list: [
          "Executive-ready monthly reports",
          "Live performance dashboards",
          "Clear KPI ownership per channel",
        ],
      },
      ctaPanel(),
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    subtitle: "Sites & Apps",
    tagline: "Fast, beautiful experiences that convert",
    description:
      "Custom websites, landing pages, and web applications engineered for performance, accessibility, and search visibility from day one.",
    href: "/services/web-development",
    icon: Globe,
    heroImage: getServiceHeroImage("web-development"),
    accent: "#1a9e80",
    accentMuted: "#d1f5ee",
    heroGradient:
      "var(--gradient-service-hero-mint)",
    stats: [
      { value: "99+", label: "Lighthouse scores" },
      { value: "40%", label: "Faster load times" },
      { value: "2–6", label: "Week typical launch" },
    ],
    panels: [
      {
        id: "overview",
        navLabel: "Overview",
        title: "Built to perform under pressure",
        subtitle: "Modern web stack",
        body: "From marketing sites to complex web apps, we ship responsive experiences with clean code, strong SEO foundations, and CMS flexibility your team can manage.",
        bullets: [
          {
            title: "Design-to-dev parity",
            description:
              "Pixel-accurate implementation with motion and micro-interactions that feel premium.",
          },
          {
            title: "Future-proof architecture",
            description:
              "Next.js, headless CMS, and API integrations that scale with your roadmap.",
          },
        ],
      },
      {
        id: "offerings",
        navLabel: "Offerings",
        title: "What we build",
        subtitle: "From landing pages to platforms",
        list: [
          "Marketing & corporate websites",
          "High-converting landing pages",
          "E-commerce storefronts",
          "Web applications & dashboards",
          "Headless CMS integration",
          "Ongoing maintenance & support",
        ],
      },
      {
        id: "process",
        navLabel: "Process",
        title: "Delivery you can trust",
        subtitle: "Agile, transparent builds",
        bullets: [
          {
            title: "Scope & wireframes",
            description: "Align on structure, content, and technical requirements early.",
          },
          {
            title: "Iterative development",
            description: "Staging previews and feedback loops every week.",
          },
          {
            title: "Launch & handoff",
            description: "QA, performance tuning, analytics, and team training included.",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        title: "Sites that earn their keep",
        subtitle: "Business impact",
        body: "We measure success in speed, rankings, and conversion — not just launch dates. Every project includes Core Web Vitals optimization and structured data.",
        list: [
          "Mobile-first responsive layouts",
          "SEO-ready markup & sitemaps",
          "Analytics & event tracking baked in",
        ],
      },
      ctaPanel(),
    ],
  },
  {
    slug: "saas-solutions",
    title: "SaaS Solutions",
    subtitle: "Product Engineering",
    tagline: "From idea to scalable product",
    description:
      "End-to-end SaaS development — discovery, UX, engineering, and launch — for CRM, ERP, and custom platforms your users will love.",
    href: "/services/saas-solutions",
    icon: Cloud,
    heroImage: getServiceHeroImage("saas-solutions"),
    accent: "#0d1f3c",
    accentMuted: "#d6e8f8",
    heroGradient:
      "linear-gradient(135deg, #d6e8f8 0%, #f3f7fc 50%, #ffffff 100%)",
    stats: [
      { value: "15+", label: "Products shipped" },
      { value: "6", label: "Avg. months to MVP" },
      { value: "99.9%", label: "Uptime targets" },
    ],
    panels: [
      {
        id: "overview",
        navLabel: "Overview",
        title: "Product teams without the overhead",
        subtitle: "Full-stack SaaS",
        body: "We act as your extended product squad — validating ideas, designing intuitive flows, and shipping reliable software on a roadmap you control.",
        bullets: [
          {
            title: "MVP to enterprise",
            description:
              "Start lean, then scale architecture, billing, and multi-tenancy as you grow.",
          },
          {
            title: "User-centric design",
            description:
              "Onboarding, dashboards, and workflows tested for adoption and retention.",
          },
        ],
      },
      {
        id: "offerings",
        navLabel: "Offerings",
        title: "Capabilities",
        subtitle: "Build what you need",
        list: [
          "Product discovery & roadmapping",
          "UX/UI design systems",
          "Full-stack development",
          "API design & third-party integrations",
          "Auth, billing & subscriptions",
          "DevOps, CI/CD & cloud hosting",
        ],
      },
      {
        id: "process",
        navLabel: "Process",
        title: "Ship in phases",
        subtitle: "De-risked delivery",
        bullets: [
          {
            title: "Validate",
            description: "User interviews, prototypes, and technical spikes before heavy build.",
          },
          {
            title: "Build",
            description: "Two-week sprints with demoable increments and clear acceptance criteria.",
          },
          {
            title: "Grow",
            description: "Post-launch iteration, monitoring, and feature expansion.",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        title: "Platforms that scale",
        subtitle: "Built for longevity",
        body: "Clean documentation, automated tests, and observability mean your team can maintain velocity long after launch.",
        list: [
          "Modular, documented codebase",
          "Role-based access & security best practices",
          "Scalable cloud infrastructure",
        ],
      },
      ctaPanel(),
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    subtitle: "Identity & Creative",
    tagline: "A brand people remember and trust",
    description:
      "Complete brand identity systems — logo, visual language, tone of voice, and guidelines — that make every touchpoint feel unmistakably yours.",
    href: "/services/branding",
    icon: Palette,
    heroImage: getServiceHeroImage("branding"),
    accent: "#7dd4c0",
    accentMuted: "#d1f5ee",
    heroGradient:
      "linear-gradient(135deg, #d1f5ee 0%, #f3f7fc 45%, #ffffff 100%)",
    stats: [
      { value: "80+", label: "Brands crafted" },
      { value: "4", label: "Weeks avg. delivery" },
      { value: "100%", label: "Asset handoff" },
    ],
    panels: [
      {
        id: "overview",
        navLabel: "Overview",
        title: "Identity with intention",
        subtitle: "Strategic creative",
        body: "Great branding isn't just aesthetics — it's strategy made visible. We craft systems that communicate who you are and why you matter.",
        bullets: [
          {
            title: "Research-led positioning",
            description:
              "Workshops and competitor analysis to define your unique market space.",
          },
          {
            title: "Cohesive systems",
            description:
              "Logo, color, typography, and templates that work across print and digital.",
          },
        ],
      },
      {
        id: "offerings",
        navLabel: "Offerings",
        title: "Brand deliverables",
        subtitle: "Everything you need",
        list: [
          "Logo & mark variations",
          "Color palettes & typography",
          "Brand guidelines document",
          "Business cards & stationery",
          "Social media kit",
          "Pitch deck & presentation templates",
        ],
      },
      {
        id: "process",
        navLabel: "Process",
        title: "Creative workflow",
        subtitle: "Collaborative by design",
        bullets: [
          {
            title: "Discover",
            description: "Stakeholder interviews, mood boards, and creative direction.",
          },
          {
            title: "Design",
            description: "Concept rounds with clear rationale and refinement cycles.",
          },
          {
            title: "Deliver",
            description: "Final assets, source files, and usage rules for your team.",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        title: "Consistency at scale",
        subtitle: "Brand that lasts",
        body: "Your team gets production-ready files and a playbook so every campaign, hire, and partner stays on-brand without constant oversight.",
        list: [
          "Editable source files (AI, SVG, Figma)",
          "Print & digital specifications",
          "Optional brand rollout support",
        ],
      },
      ctaPanel(),
    ],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    subtitle: "Intelligent Workflows",
    tagline: "Work smarter, not harder",
    description:
      "Intelligent workflow automation, AI assistants, WhatsApp integration, and custom tools that eliminate repetitive work and unlock capacity.",
    href: "/services/ai-automation",
    icon: Bot,
    heroImage: getServiceHeroImage("ai-automation"),
    accent: "#1a9e80",
    accentMuted: "#d1f5ee",
    heroGradient:
      "linear-gradient(135deg, #7dd4c0 0%, #d1f5ee 40%, #f3f7fc 100%)",
    stats: [
      { value: "60%", label: "Time saved on tasks" },
      { value: "24/7", label: "Automated support" },
      { value: "10+", label: "Integrations" },
    ],
    panels: [
      {
        id: "overview",
        navLabel: "Overview",
        title: "Automation with guardrails",
        subtitle: "Practical AI",
        body: "We focus on high-impact automations — not hype. Chatbots, document processing, and workflow triggers that integrate with tools you already use.",
        bullets: [
          {
            title: "Human-in-the-loop",
            description:
              "AI assists your team; critical decisions stay with people you trust.",
          },
          {
            title: "Secure by default",
            description:
              "Data handling, access controls, and audit trails built into every solution.",
          },
        ],
      },
      {
        id: "offerings",
        navLabel: "Offerings",
        title: "Solutions we deploy",
        subtitle: "Real-world automation",
        list: [
          "AI chatbots & virtual assistants",
          "WhatsApp Business automation",
          "Lead qualification & routing",
          "Document & invoice processing",
          "CRM & ERP workflow triggers",
          "Custom GPT / agent integrations",
        ],
      },
      {
        id: "process",
        navLabel: "Process",
        title: "Implementation path",
        subtitle: "Fast time-to-value",
        bullets: [
          {
            title: "Map workflows",
            description: "Identify bottlenecks and ROI opportunities in your operations.",
          },
          {
            title: "Prototype",
            description: "Pilot automations on a single team or process before rollout.",
          },
          {
            title: "Scale",
            description: "Monitor, tune models, and expand across departments.",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        title: "Capacity you can measure",
        subtitle: "Operational lift",
        body: "Track hours saved, response times, and error rates — so leadership sees automation as an investment, not an experiment.",
        list: [
          "Reduced manual data entry",
          "Faster customer response times",
          "Scalable ops without headcount spikes",
        ],
      },
      ctaPanel(),
    ],
  },
  {
    slug: "crm-systems",
    title: "CRM Systems",
    subtitle: "Client Management",
    tagline: "Every relationship, one clear view",
    description:
      "Custom CRM solutions that streamline sales pipelines, client management, and team collaboration — tailored to how your business actually works.",
    href: "/services/crm-systems",
    icon: Users,
    heroImage: getServiceHeroImage("crm-systems"),
    accent: "#2d6ab5",
    accentMuted: "#d6e8f8",
    heroGradient:
      "linear-gradient(135deg, #d6e8f8 0%, #f3f7fc 50%, #ffffff 100%)",
    stats: [
      { value: "35%", label: "Faster deal cycles" },
      { value: "1", label: "Source of truth" },
      { value: "100%", label: "Team adoption focus" },
    ],
    panels: [
      {
        id: "overview",
        navLabel: "Overview",
        title: "CRM built around your process",
        subtitle: "Not off-the-shelf chaos",
        body: "Generic CRMs force awkward workarounds. We design pipelines, fields, and automations that mirror your sales motion and reporting needs.",
        bullets: [
          {
            title: "Unified customer data",
            description:
              "Contacts, deals, communications, and tasks in one searchable hub.",
          },
          {
            title: "Role-based views",
            description:
              "Sales, support, and leadership each see what matters to them.",
          },
        ],
      },
      {
        id: "offerings",
        navLabel: "Offerings",
        title: "CRM capabilities",
        subtitle: "Tailored modules",
        list: [
          "Custom pipeline stages & deal tracking",
          "Contact & account management",
          "Email & calendar sync",
          "Task automation & reminders",
          "Reporting & forecast dashboards",
          "Mobile-friendly access",
        ],
      },
      {
        id: "process",
        navLabel: "Process",
        title: "Rollout approach",
        subtitle: "Adoption-first",
        bullets: [
          {
            title: "Process mapping",
            description: "Document current workflows and define the ideal future state.",
          },
          {
            title: "Configure & migrate",
            description: "Data import, integrations, and team-specific training.",
          },
          {
            title: "Optimize",
            description: "Refine automations and reports based on real usage patterns.",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        title: "Pipeline visibility",
        subtitle: "Revenue clarity",
        body: "Leadership gets accurate forecasts and activity metrics — while reps spend less time updating spreadsheets and more time closing.",
        list: [
          "Real-time pipeline dashboards",
          "Automated follow-up sequences",
          "Integration with marketing & support tools",
        ],
      },
      ctaPanel(),
    ],
  },
  {
    slug: "seo",
    title: "SEO Optimization",
    subtitle: "Organic Growth",
    tagline: "Rank higher, attract qualified traffic",
    description:
      "Technical SEO, on-page strategy, and authority content that improves rankings and drives sustainable organic traffic — plus AEO and GEO for AI-powered search.",
    href: "/services/seo",
    icon: Search,
    heroImage: getServiceHeroImage("seo"),
    accent: "#1e5a98",
    accentMuted: "#d6e8f8",
    heroGradient:
      "linear-gradient(135deg, #d6e8f8 0%, #f3f7fc 40%, #ffffff 100%)",
    stats: [
      { value: "90+", label: "Page-1 keywords" },
      { value: "3×", label: "Avg. organic traffic lift" },
      { value: "AEO/GEO", label: "AI search ready" },
    ],
    panels: [
      {
        id: "overview",
        navLabel: "Overview",
        title: "Search visibility that compounds",
        subtitle: "Technical + content SEO",
        body: "We fix what holds you back technically, strengthen on-page relevance, and publish authority content so Google — and AI answer engines — surface your brand when buyers are looking.",
        bullets: [
          {
            title: "Full-site technical audits",
            description:
              "Crawlability, Core Web Vitals, schema, and indexation issues resolved with clear priorities.",
          },
          {
            title: "Intent-matched content",
            description:
              "Topic clusters and landing pages aligned to how your audience actually searches.",
          },
        ],
      },
      {
        id: "offerings",
        navLabel: "Offerings",
        title: "What we optimize",
        subtitle: "Traditional & AI search",
        list: [
          "Technical SEO audits & fixes",
          "Keyword research & content strategy",
          "On-page optimization & internal linking",
          "Link building & digital PR",
          "AEO — Answer Engine Optimization",
          "GEO — Generative Engine Optimization",
          "Monthly ranking & traffic reporting",
        ],
      },
      {
        id: "process",
        navLabel: "Process",
        title: "How we grow organic",
        subtitle: "Audit to authority",
        bullets: [
          {
            title: "Baseline & roadmap",
            description:
              "Audit your site, competitors, and search landscape — then build a 90-day plan.",
          },
          {
            title: "Implement & publish",
            description:
              "Technical fixes, on-page updates, and content production on a steady cadence.",
          },
          {
            title: "Measure & refine",
            description:
              "Track rankings, traffic, and conversions — double down on what moves qualified leads.",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        title: "Traffic you can trust",
        subtitle: "Qualified visitors",
        body: "Our SEO work has helped clients move from page 3 to page 1 within 90 days. AEO ensures your business appears when AI tools answer your customers' questions.",
        list: [
          "Higher rankings for high-intent keywords",
          "Improved domain authority over time",
          "Visibility in AI-generated answers & summaries",
        ],
      },
      ctaPanel(),
    ],
  },
  {
    slug: "social-media",
    title: "Meta Ads",
    subtitle: "Paid Social",
    tagline: "Reach buyers where they scroll",
    description:
      "Facebook and Instagram campaigns with precise audience targeting, scroll-stopping creative, and continuous optimization to lower cost per lead.",
    href: "/services/social-media",
    icon: Megaphone,
    heroImage: getServiceHeroImage("social-media"),
    accent: "#2d6ab5",
    accentMuted: "#d6e8f8",
    heroGradient:
      "linear-gradient(135deg, #d6e8f8 0%, #f3f7fc 45%, #ffffff 100%)",
    stats: [
      { value: "2.8×", label: "Avg. ROAS on Meta" },
      { value: "35%", label: "Lower CPL vs. baseline" },
      { value: "24/7", label: "Campaign monitoring" },
    ],
    panels: [
      {
        id: "overview",
        navLabel: "Overview",
        title: "Paid social that pays back",
        subtitle: "Meta-first growth",
        body: "We build and manage Meta ad campaigns that put your offer in front of the right people — then optimize creative, audiences, and budgets weekly so spend drives measurable leads.",
        bullets: [
          {
            title: "Audience precision",
            description:
              "Lookalikes, retargeting, and interest stacks built from your CRM and site data.",
          },
          {
            title: "Creative that converts",
            description:
              "Ad copy and visuals tested systematically — not one-and-done launches.",
          },
        ],
      },
      {
        id: "offerings",
        navLabel: "Offerings",
        title: "Campaign capabilities",
        subtitle: "Full Meta stack",
        list: [
          "Facebook & Instagram feed, story, and reel ads",
          "Lead gen & conversion campaigns",
          "Retargeting & funnel sequencing",
          "Creative production & A/B testing",
          "Pixel, CAPI & event tracking setup",
          "Weekly performance reporting",
        ],
      },
      {
        id: "process",
        navLabel: "Process",
        title: "Launch to scale",
        subtitle: "Test, learn, grow",
        bullets: [
          {
            title: "Strategy & setup",
            description:
              "Account structure, tracking, and initial audience/creative hypotheses.",
          },
          {
            title: "Test & optimize",
            description:
              "Rapid creative and audience tests with clear kill/scale rules.",
          },
          {
            title: "Scale winners",
            description:
              "Increase budget on proven ad sets while protecting efficiency.",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        title: "Leads from social",
        subtitle: "Measurable pipeline",
        body: "Clients see more qualified form fills and booked calls — with full attribution from first click to closed deal when CRM is connected.",
        list: [
          "Lower cost per qualified lead over time",
          "Creative library your team can reuse organically",
          "Clear dashboards on spend, CPL, and ROAS",
        ],
      },
      ctaPanel(),
    ],
  },
  {
    slug: "content-marketing",
    title: "Content Creation",
    subtitle: "Authority & Nurture",
    tagline: "Content that builds trust and converts",
    description:
      "Blog posts, social content, video scripts, and lead magnets that build authority and nurture prospects from first touch to conversion.",
    href: "/services/content-marketing",
    icon: FileText,
    heroImage: getServiceHeroImage("content-marketing"),
    accent: "#1a9e80",
    accentMuted: "#d1f5ee",
    heroGradient: "var(--gradient-service-hero-mint)",
    stats: [
      { value: "200+", label: "Pieces published" },
      { value: "4×", label: "Engagement uplift" },
      { value: "SEO", label: "Built into every piece" },
    ],
    panels: [
      {
        id: "overview",
        navLabel: "Overview",
        title: "Content with a job to do",
        subtitle: "Strategy-led production",
        body: "Every article, post, and asset supports a business goal — awareness, authority, or conversion. We plan topics from search and buyer intent, then produce on a calendar your team can rely on.",
        bullets: [
          {
            title: "Editorial planning",
            description:
              "Quarterly content maps tied to funnel stage, SEO targets, and campaigns.",
          },
          {
            title: "On-brand execution",
            description:
              "Copy and visuals aligned to your voice — expert but approachable, outcome-focused.",
          },
        ],
      },
      {
        id: "offerings",
        navLabel: "Offerings",
        title: "Content formats",
        subtitle: "What we create",
        list: [
          "SEO blog posts & pillar pages",
          "Social posts & carousels",
          "Video scripts & short-form hooks",
          "Lead magnets & downloadable guides",
          "Email newsletters & nurture sequences",
          "Case studies & customer stories",
        ],
      },
      {
        id: "process",
        navLabel: "Process",
        title: "From brief to publish",
        subtitle: "Repeatable workflow",
        bullets: [
          {
            title: "Plan",
            description:
              "Topic research, outlines, and approval before production begins.",
          },
          {
            title: "Produce",
            description:
              "Writing, design, and revisions with clear turnaround times.",
          },
          {
            title: "Distribute",
            description:
              "Publish, promote, and repurpose across site, social, and email.",
          },
        ],
      },
      {
        id: "outcomes",
        navLabel: "Outcomes",
        title: "Authority that converts",
        subtitle: "Long-term asset",
        body: "Strong content compounds — rankings improve, sales cycles shorten, and prospects arrive already educated on your value.",
        list: [
          "Growing organic traffic from published articles",
          "Consistent social presence without internal burnout",
          "Assets sales and ads teams reuse in outreach",
        ],
      },
      ctaPanel(),
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail {
  const service = serviceDetails.find((s) => s.slug === slug);
  if (!service) {
    throw new Error(`Service not found: ${slug}`);
  }
  return service;
}
