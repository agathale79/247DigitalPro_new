export interface MarketingAdPreview {
  platform: "Meta" | "Google" | "LinkedIn";
  headline: string;
  body: string;
  cta: string;
}

export interface MarketingMetric {
  value: string;
  label: string;
}

export interface MarketingPortfolioItem {
  id: string;
  client: string;
  website: string;
  industry: string;
  summary: string;
  services: string[];
  channels: string[];
  metrics: MarketingMetric[];
  adPreviews: MarketingAdPreview[];
  accent: string;
  accentSoft: string;
}

export const marketingPortfolioItems: MarketingPortfolioItem[] = [
  {
    id: "sea-edu",
    client: "Sea Education Association",
    website: "https://sea.edu/",
    industry: "Marine Education & Research",
    summary:
      "Paid social and search campaigns promoting SEA's high school expeditions, undergraduate ocean programs, and summer research at sea - driving program inquiries from students and parents nationwide.",
    services: [
      "Meta Ads",
      "Google Search",
      "Audience Targeting",
      "Creative Strategy",
    ],
    channels: ["Meta", "Google", "Retargeting"],
    metrics: [
      { value: "2.4×", label: "Landing page CTR" },
      { value: "38%", label: "Lower cost per lead" },
      { value: "12K+", label: "Monthly ad reach" },
    ],
    adPreviews: [
      {
        platform: "Meta",
        headline: "Study the Ocean. Sail the World.",
        body: "SEA Expedition programs for high school & pre-college students. Hands-on marine science on a tall ship this summer.",
        cta: "Explore Programs",
      },
      {
        platform: "Google",
        headline: "Marine Biology Programs | SEA",
        body: "Field research at sea. Woods Hole campus. Apply for Summer 2026 oceanography & conservation expeditions.",
        cta: "View Expeditions",
      },
    ],
    accent: "#0c4a6e",
    accentSoft: "#e0f2fe",
  },
];
