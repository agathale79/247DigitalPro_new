export interface PortfolioDetailSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: {
    heading: string;
    bullets: string[];
  }[];
}

export interface PortfolioDetail {
  slug: string;
  title: string;
  client: string;
  category: string;
  heroDescription: string;
  image: string;
  accent: string;
  externalUrl?: string;
  whatIsIt: PortfolioDetailSection;
  howItWorks: PortfolioDetailSection;
  why: PortfolioDetailSection;
  otherInfo: PortfolioDetailSection;
  ctaTitle: string;
  ctaDescription: string;
}

export const portfolioDetails: PortfolioDetail[] = [
  {
    slug: "abacuzz",
    title: "Abacuzz",
    client: "Abacuzz",
    category: "SaaS Platform",
    heroDescription:
      "Built for abacus students, academies, and organizations — an AI-powered platform to test and track student performance in a simple, accurate way.",
    image: "/images/portfolio/abacuzz.png",
    accent: "#7c3aed",
    externalUrl: "https://www.abacuzz.in/landing",
    whatIsIt: {
      title: "What is Abacuzz?",
      paragraphs: [
        "Abacuzz is an AI-powered platform that helps abacus academies test and track student performance with clarity and confidence.",
        "Practice smarter, test faster, and compete online — with real data behind every result.",
      ],
      subsections: [
        {
          heading: "The Problem",
          bullets: [
            "Too much time spent on manual checking",
            "Students don't know where they need to improve",
            "No proper way to track student progress",
            "Results are based on guesswork",
          ],
        },
        {
          heading: "The Solution",
          bullets: [
            "Get results immediately",
            "View simple reports for every student",
            "Generate tests instantly using AI",
            "Track speed and accuracy clearly",
          ],
        },
      ],
    },
    howItWorks: {
      title: "How does it work?",
      paragraphs: [
        "A simple system for testing, tracking, and improving student performance.",
      ],
      bullets: [
        "Create a test in seconds",
        "Student attempts the test",
        "System checks answers instantly",
        "Get a clear performance report",
      ],
      subsections: [
        {
          heading: "Benefits for Students",
          bullets: [
            "Understand their real performance",
            "Improve speed and accuracy",
            "Track progress over time",
          ],
        },
        {
          heading: "Benefits for Academies & Organizations",
          bullets: [
            "Save time on checking papers",
            "Standardize testing for all students",
            "Share clear reports with parents",
            "Build more trust and professionalism",
          ],
        },
      ],
    },
    why: {
      title: "Why Abacuzz?",
      bullets: [
        "No manual work — everything is automated",
        "No guesswork — only data-based results",
        "Not just practice — real performance tracking",
      ],
      paragraphs: [
        "If you can't measure progress, you can't improve it.",
      ],
    },
    otherInfo: {
      title: "Project Details",
      subsections: [
        {
          heading: "Platform Focus",
          bullets: [
            "Abacus academy management",
            "Online competitions and demos",
            "AI-generated assessments",
            "Performance analytics dashboards",
          ],
        },
        {
          heading: "Contact & Website",
          bullets: [
            "Website: www.abacuzz.in",
            "Phone: +91-9325158255",
          ],
        },
      ],
    },
    ctaTitle: "Start Using Abacuzz Today",
    ctaDescription:
      "Give your students better results with proper evaluation. Book a demo to see Abacuzz in action.",
  },
  {
    slug: "atlantic-awning",
    title: "Atlantic Awning",
    client: "Atlantic Awning",
    category: "Web Development",
    heroDescription:
      "A modern digital presence for a New England awning leader since 1888 — showcasing custom commercial and residential shade solutions across Boston and beyond.",
    image: "/images/portfolio/atlantic-awning.png",
    accent: "#1e5a98",
    externalUrl: "https://atlantic-awning.com/",
    whatIsIt: {
      title: "What is Atlantic Awning?",
      paragraphs: [
        "Atlantic Awning is a heritage awning company delivering custom commercial and residential shade solutions — from retractable awnings and storefront canopies to pergolas and vestibules.",
        "This project focused on translating decades of craftsmanship into a clear, conversion-focused web experience.",
      ],
      bullets: [
        "Showcase product range and service areas",
        "Highlight 120+ years of industry heritage",
        "Support both residential and commercial buyers",
      ],
    },
    howItWorks: {
      title: "How does it work?",
      paragraphs: [
        "The website guides visitors from discovery to inquiry with a structured, trust-first journey.",
      ],
      bullets: [
        "Visitors explore solutions by use case and product type",
        "Service pages explain offerings with visual proof",
        "Clear calls-to-action drive quote and consultation requests",
        "Local SEO structure helps nearby customers find the business",
      ],
      subsections: [
        {
          heading: "Key Experience Goals",
          bullets: [
            "Fast, mobile-friendly browsing",
            "Professional brand presentation",
            "Easy path to contact and estimates",
          ],
        },
      ],
    },
    why: {
      title: "Why this approach?",
      bullets: [
        "Heritage brands need modern UX without losing credibility",
        "Local service businesses win with clarity and trust signals",
        "Structured content improves discoverability and lead quality",
      ],
      paragraphs: [
        "Placeholder content — full case study details will be updated soon.",
      ],
    },
    otherInfo: {
      title: "Other Information",
      subsections: [
        {
          heading: "Services Highlighted",
          bullets: [
            "Retractable awnings",
            "Storefront canopies",
            "Pergolas and vestibules",
            "Commercial shade systems",
          ],
        },
        {
          heading: "Project Scope",
          bullets: [
            "Website design and development",
            "Local SEO foundations",
            "Conversion-focused page structure",
          ],
        },
      ],
    },
    ctaTitle: "Interested in a Similar Project?",
    ctaDescription:
      "Book a demo to discuss how we can build a high-performing web presence for your business.",
  },
];

export function getPortfolioBySlug(slug: string): PortfolioDetail | undefined {
  return portfolioDetails.find((p) => p.slug === slug);
}

export function getAllPortfolioSlugs(): string[] {
  return portfolioDetails.map((p) => p.slug);
}
