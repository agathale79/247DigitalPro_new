export interface PortfolioProject {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  image: string;
  href: string;
  externalUrl?: string;
  accent: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "atlantic-awning",
    title: "Atlantic Awning",
    client: "Atlantic Awning",
    category: "Web Development",
    description:
      "Website for a New England awning leader since 1888 — custom commercial and residential shade solutions, from retractable awnings and storefront canopies to pergolas and vestibules across Boston and beyond.",
    metric: "120+",
    metricLabel: "Years of Heritage",
    tags: ["Web Design", "Local SEO", "Commercial"],
    image: "/images/portfolio/atlantic-awning.png",
    href: "/portfolio/atlantic-awning",
    externalUrl: "https://atlantic-awning.com/",
    accent: "#1e5a98",
  },
  {
    slug: "abacuzz",
    title: "Abacuzz",
    client: "Abacuzz",
    category: "SaaS Platform",
    description:
      "All-in-one abacus academy management platform — manage organizations, academies, and students from a single dashboard. Run competitions, demos, and tests to scale abacus businesses effortlessly.",
    metric: "500+",
    metricLabel: "Academies Powered",
    tags: ["SaaS", "EdTech", "Platform"],
    image: "/images/portfolio/abacuzz.png",
    href: "/portfolio/abacuzz",
    externalUrl: "https://www.abacuzz.in/landing",
    accent: "#7c3aed",
  },
];

/** @deprecated Use portfolioProjects — kept for homepage showcase compatibility */
export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  gradient: string;
  image?: string;
  href?: string;
}

export const portfolioHighlights: PortfolioItem[] = portfolioProjects.map(
  (project) => ({
    title: project.title,
    category: project.category,
    description: project.description,
    metric: project.metric,
    metricLabel: project.metricLabel,
    gradient: "from-wordmark to-deep-navy",
    image: project.image,
    href: project.href,
  })
);
