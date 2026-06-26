/**
 * Brand Guidelines v2.0 — shared copy, services, and voice
 * @see docs/brand/247DigitalPro___Brand_Guidelines.pdf
 */

import { siteConfig } from "@/config/site";

/** §07 — Tone of Voice intro */
export const brandToneIntro = [
  "We speak like a trusted advisor — knowledgeable, confident, and direct.",
  "We talk in outcomes and business results, not features and tech jargon.",
] as const;

/** §07 — Four tone pillars (2×2 grid) */
export const brandTonePillars = [
  {
    emoji: "🎯",
    title: "Outcome-Focused",
    description:
      "We lead with results — leads, revenue, and growth — not with features. Every message connects back to what the client actually gains.",
    surface: "pale" as const,
  },
  {
    emoji: "🤝",
    title: "Strategic Partner",
    description:
      "We're not a vendor — we're an invested partner. Tone is collaborative, not transactional. We use \"we\" and \"together\" often.",
    surface: "mint" as const,
  },
  {
    emoji: "💡",
    title: "Clear & Jargon-Free",
    description:
      "Plain, direct language that respects client intelligence. We explain even technical terms (AEO, GEO) in plain business language.",
    surface: "pale" as const,
  },
  {
    emoji: "📈",
    title: "Data-Backed Confidence",
    description:
      "We back claims with metrics and frameworks — \"15+ years,\" \"qualified leads,\" \"measurable growth.\" Specific beats general every time.",
    surface: "mint" as const,
  },
] as const;

/** §07 — Preferred copy patterns */
export const brandWriteLikeThis = [
  "We'll identify your highest-impact growth channels and build a 90-day roadmap.",
  "Our SEO work has helped clients move from page 3 to page 1 within 90 days.",
  "AEO ensures your business appears when AI tools answer your customers' questions.",
  "Let's replace guesswork with a system built on real data and clear accountability.",
] as const;

/** §07 — Copy to avoid */
export const brandAvoidThis = [
  "Leveraging our synergistic omnichannel growth paradigm to optimize your KPIs…",
  "We are the number one digital marketing company in the universe!",
  "Results may vary and are not guaranteed due to complex market conditions.",
  "Our proprietary AI-powered solution stack will 10× your ROI overnight.",
] as const;

/** §07 — Sitewide voice-aligned copy */
export const brandVoice = {
  heroLead:
    "We'll identify your highest-impact growth channels and build a 90-day roadmap — strategy, SEO, paid media, and automation tailored to how you grow.",
  servicesIntro:
    "End-to-end digital marketing for entrepreneurs, experts, and service businesses — from brand foundation to next-generation AI search visibility.",
  partnerLine:
    "We're not a vendor — we're an invested partner. We speak in outcomes and business results, not features and tech jargon.",
  ctaDarkTitle: "Ready to build a system that drives qualified leads?",
  ctaDarkDescription:
    "We'll identify your highest-impact growth channels and build a 90-day roadmap — strategy driven by real data, not guesswork.",
  /** §09 — Primary on light surfaces; mint + outlineDark on navy blocks */
  ctaPrimary: "Book Strategy Call",
  /** §09 — Deep mint high-emphasis standalone */
  ctaAudit: "Request Audit",
  ctaServices: "View Services",
  ctaCaseStudies: "See Case Studies",
  ctaConsultation:
    "Book a free strategy call and we'll map the right approach for your goals, timeline, and budget — with clear accountability, not guesswork.",
} as const;

/** §05 — Service offering labels for forms & navigation */
export const brandServiceOptions = [
  "Brand Strategy",
  "Website Design",
  "SEO Optimization",
  "Meta Ads",
  "Google Ads",
  "AEO — Answer Engine Optimization",
  "GEO — Generative Engine Optimization",
  "Content Creation",
  "Performance Analytics",
  "Other",
] as const;

/** §05 — Marketing growth process (audit → optimization) */
export const brandProcessSteps = [
  {
    title: "Audit",
    description:
      "We baseline your channels, funnel, and performance — identifying the highest-impact growth opportunities.",
    bg: "#1e5a98",
    color: "#1e5a98",
    borderColor: "rgba(30,90,152,0.35)",
    sphereFrom: "#1e5a98",
    sphereTo: "#2d6ab5",
    light: false,
  },
  {
    title: "Strategy",
    description:
      "A clear 90-day roadmap with qualified-lead targets, channel mix, and accountability built in.",
    bg: "#1a9e80",
    color: "#1a9e80",
    borderColor: "rgba(26,158,128,0.35)",
    sphereFrom: "#1a9e80",
    sphereTo: "#7dd4c0",
    light: false,
  },
  {
    title: "Creative",
    description:
      "Messaging, landing experiences, and ad creative aligned to conversion — not vanity metrics.",
    bg: "#2d6ab5",
    color: "#2d6ab5",
    borderColor: "rgba(45,106,181,0.35)",
    sphereFrom: "#2d6ab5",
    sphereTo: "#1e5a98",
    light: false,
  },
  {
    title: "Launch",
    description:
      "Campaigns, SEO, and content go live with tracking, attribution, and dashboards your team can use.",
    bg: "#0d1f3c",
    color: "#0d1f3c",
    borderColor: "rgba(13,31,60,0.4)",
    sphereFrom: "#0d1f3c",
    sphereTo: "#1a3a5f",
    light: false,
  },
  {
    title: "Optimize",
    description:
      "Weekly performance reviews — we double down on winners and cut waste with real data.",
    bg: "#d1f5ee",
    color: "#1a9e80",
    borderColor: "rgba(209,245,238,0.8)",
    sphereFrom: "#7dd4c0",
    sphereTo: "#d1f5ee",
    light: true,
  },
  {
    title: "Scale",
    description:
      "Expand proven channels, add AEO/GEO visibility, and compound growth across the funnel.",
    bg: "#d6e8f8",
    color: "#1e5a98",
    borderColor: "rgba(214,232,248,0.9)",
    sphereFrom: "#d6e8f8",
    sphereTo: "#1e5a98",
    light: true,
  },
  {
    title: "Report",
    description:
      "Executive-ready reporting on leads, revenue, and ROI — clarity for leadership every month.",
    bg: "#1e5a98",
    color: "#1e5a98",
    borderColor: "rgba(30,90,152,0.35)",
    sphereFrom: "#1e5a98",
    sphereTo: "#1a9e80",
    light: false,
  },
] as const;

export const brandMetrics = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 10, suffix: "M+", label: "Leads Generated" },
] as const;

export { siteConfig };
