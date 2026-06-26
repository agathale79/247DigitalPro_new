import type { AeoGeoFeature, ServiceOverviewItem } from "@/types/service";

/** §05 — Our Services Offering (Brand Guidelines v2.0) */
export const servicesOverview: ServiceOverviewItem[] = [
  {
    title: "Brand Strategy",
    description:
      "Positioning, identity, and messaging systems that differentiate you in your market and build lasting authority.",
    icon: "palette",
    href: "/services/branding",
    badge: "CORE",
  },
  {
    title: "Website Design",
    description:
      "Conversion-focused websites designed for qualified lead generation, authority, and seamless user experience.",
    icon: "globe",
    href: "/services/web-development",
    badge: "CORE",
  },
  {
    title: "SEO Optimization",
    description:
      "Technical SEO, on-page strategy, and authority content that improves rankings and drives organic traffic.",
    icon: "search",
    href: "/services/seo",
    badge: "CORE",
  },
  {
    title: "Meta Ads",
    description:
      "Facebook and Instagram paid campaigns with precise audience targeting, creative, and continuous optimization.",
    icon: "megaphone",
    href: "/services/social-media",
    badge: "CORE",
  },
  {
    title: "Google Ads",
    description:
      "Search, display, and Performance Max campaigns that capture high-intent demand and maximize ad spend ROI.",
    icon: "bar-chart-3",
    href: "/services/digital-marketing",
    badge: "CORE",
  },
  {
    title: "AEO — Answer Engine Optimization",
    description:
      "Structured content strategy to appear in AI-generated answers on ChatGPT, Perplexity, and voice search.",
    icon: "bot",
    href: "/services/seo",
    badge: "NEW",
  },
  {
    title: "GEO — Generative Engine Optimization",
    description:
      "Optimization for AI-powered search engines (Google SGE, Bing Copilot) to ensure brand visibility in AI-generated results.",
    icon: "sparkles",
    href: "/services/seo",
    badge: "NEW",
  },
  {
    title: "Content Creation",
    description:
      "Blog posts, social content, video scripts, and lead magnets that build authority and nurture prospects to conversion.",
    icon: "file-text",
    href: "/services/content-marketing",
    badge: "CORE",
  },
  {
    title: "Performance Analytics",
    description:
      "KPI dashboards, attribution reporting, and continuous optimization — strategy driven by real data, not guesswork.",
    icon: "trending-up",
    href: "/services/digital-marketing",
    badge: "CORE",
  },
];

export const aeoGeoFeature: AeoGeoFeature = {
  title: "AEO & GEO — Next-Generation Search Visibility",
  description:
    "AEO ensures your business appears when AI tools answer your customers' questions. GEO optimizes for AI-generated search results (Google SGE, Bing Copilot). Together, we make sure your brand shows up wherever people search — traditional engines and AI alike.",
  href: "/services/seo",
};
