/** Unified card & detail hero gradient (Social Media ROI style) */
export const BLOG_CARD_GRADIENT = "from-mid-mint to-deep-mint";

export interface BlogPostPreview {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  slug: string;
  readTime: string;
  gradient: string;
  image: string;
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost extends BlogPostPreview {
  author: string;
  content: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    title: "How AI Is Revolutionizing Digital Marketing in 2026",
    excerpt:
      "Explore how artificial intelligence is reshaping campaign strategies, audience targeting, and content creation for modern businesses.",
    category: "AI Trends",
    date: "2026-05-10",
    slug: "ai-revolutionizing-digital-marketing",
    readTime: "5 min read",
    gradient: BLOG_CARD_GRADIENT,
    image: "/images/blog/How AI Is Revolutionizing.webp",
    author: "247 Digital Pro Team",
    content: [
      {
        paragraphs: [
          "Artificial intelligence is no longer a novelty in marketing — it's the infrastructure behind how modern teams plan, launch, and optimize campaigns. From predictive audience modeling to generative creative, AI compresses weeks of manual work into hours while surfacing patterns humans would miss.",
          "For small and mid-size businesses, the opportunity isn't to replace strategy with automation. It's to use AI as a force multiplier so lean teams can compete with enterprises on speed, personalization, and measurement.",
        ],
      },
      {
        heading: "Smarter audience targeting",
        paragraphs: [
          "Machine learning models now analyze thousands of signals — browsing behavior, purchase history, content engagement — to predict who's most likely to convert. Platforms like Google and Meta bake this into their bidding systems, but the real edge comes from feeding them clean first-party data.",
          "Start by consolidating CRM, website, and ad platform data. Tag high-value actions clearly, then let algorithms optimize toward qualified leads rather than cheap clicks.",
        ],
      },
      {
        heading: "Content at scale without losing voice",
        paragraphs: [
          "Generative AI accelerates drafts, outlines, and variant testing. The risk is sounding generic. The fix: train workflows on your brand voice, customer language, and proof points — then use AI for speed while humans edit for accuracy and tone.",
          "Teams that win treat AI as a co-writer, not a replacement. Every published piece should still pass a human quality bar.",
        ],
      },
      {
        heading: "What to do this quarter",
        paragraphs: [
          "Audit one channel where you're spending the most — paid search, Meta, or email — and identify one workflow AI can accelerate without sacrificing quality.",
          "Document baseline metrics before you change anything. AI-driven improvements only matter if you can prove lift in leads, CPA, or revenue — not just impressions.",
        ],
      },
    ],
  },
  {
    title: "10 SEO Strategies That Actually Drive Organic Growth",
    excerpt:
      "Stop chasing algorithm updates. These proven SEO fundamentals deliver compounding traffic gains quarter after quarter.",
    category: "SEO",
    date: "2026-05-05",
    slug: "seo-strategies-drive-growth",
    readTime: "7 min read",
    gradient: BLOG_CARD_GRADIENT,
    image: "/images/blog/10 SEO Strategies.webp",
    author: "247 Digital Pro Team",
    content: [
      {
        paragraphs: [
          "SEO in 2026 rewards sites that solve real problems clearly — not pages stuffed with keywords. Search engines and AI answer engines both favor depth, structure, and trust signals over tricks.",
          "These ten strategies focus on fundamentals that compound: technical health, intent-matched content, and authority that earns links and citations over time.",
        ],
      },
      {
        heading: "Fix technical foundations first",
        paragraphs: [
          "Crawlability, indexation, Core Web Vitals, and mobile usability still gate everything else. Run quarterly audits and fix broken links, redirect chains, and slow templates before publishing more content.",
          "A fast, clean site sends positive signals to both Google and users — especially on mobile where most local and service searches happen.",
        ],
      },
      {
        heading: "Match content to search intent",
        paragraphs: [
          "Every target keyword should map to a page type: informational guide, comparison, service landing page, or local page. Misaligned intent is why great writing sometimes ranks nowhere.",
          "Study the top results for your target query. If Google shows listicles, build a listicle. If it shows service pages, build a service page — then make yours more useful.",
        ],
      },
      {
        heading: "Build topical authority",
        paragraphs: [
          "Cluster related articles around pillar pages and interlink them deliberately. One strong service page supported by five supporting articles beats ten orphaned posts.",
          "Earn mentions from reputable sites in your niche — directories, partnerships, guest content, and digital PR all contribute to the authority graph search engines use to rank you.",
        ],
      },
    ],
  },
  // No image yet — hidden until asset is added
  // {
  //   title: "AEO: Appear in AI-Generated Answers",
  //   excerpt:
  //     "Structured content strategy for ChatGPT, Perplexity, and voice search — where your customers are searching next.",
  //   category: "AEO",
  //   date: "2026-04-28",
  //   slug: "aeo-ai-generated-answers",
  //   readTime: "9 min read",
  //   gradient: BLOG_CARD_GRADIENT,
  //   image: "",
  //   author: "247 Digital Pro Team",
  //   content: [
  //     {
  //       paragraphs: [
  //         "Answer Engine Optimization (AEO) is how brands show up when users ask ChatGPT, Perplexity, Google AI Overviews, or voice assistants for recommendations — not just when they type keywords into a search box.",
  //         "The goal is to become the cited, trusted source for questions your buyers actually ask.",
  //       ],
  //     },
  //     {
  //       heading: "Structure pages for machine readability",
  //       paragraphs: [
  //         "Lead with direct answers in the first 40–60 words, then expand with context. Use clear H2/H3 hierarchy, bullet lists, tables, and FAQ blocks that mirror natural-language questions.",
  //         "Add FAQ and Organization schema where appropriate. Structured data helps machines parse your content and associate it with your brand entity.",
  //       ],
  //     },
  //     {
  //       heading: "Strengthen entity signals",
  //       paragraphs: [
  //         "Consistent business name, address, and phone across your site and listings matter. Author bios, About pages, and third-party mentions reinforce who you are and what you're known for.",
  //         "LLMs weigh corroboration — if multiple reputable sources mention your brand in the context of a topic, you're more likely to appear in synthesized answers.",
  //       ],
  //     },
  //     {
  //       heading: "Measure what matters",
  //       paragraphs: [
  //         "Track branded search lift, referral traffic from AI platforms, and manual spot-checks of target queries monthly. AEO is still evolving, but early movers build citation moats competitors struggle to displace.",
  //       ],
  //     },
  //   ],
  // },
  {
    title: "Why Your Business Needs Measurable Marketing Systems",
    excerpt:
      "Disconnected tactics cost deals. Learn how qualified leads, attribution, and optimization compound growth.",
    category: "Strategy",
    date: "2026-04-20",
    slug: "measurable-marketing-systems",
    readTime: "6 min read",
    gradient: BLOG_CARD_GRADIENT,
    image: "/images/blog/Why Your Business (1).webp",
    author: "247 Digital Pro Team",
    content: [
      {
        paragraphs: [
          "Posting on social, running ads, and publishing blog content without a connected system is activity — not growth. Measurable marketing ties every tactic to pipeline, revenue, and repeatable playbooks.",
          "When channels operate in silos, you can't tell which efforts drive qualified leads or which campaigns waste budget. Systems fix that.",
        ],
      },
      {
        heading: "Define your north-star metrics",
        paragraphs: [
          "Pick a small set: qualified leads, cost per acquisition, conversion rate by stage, and revenue influenced. Vanity metrics like impressions and followers only matter if they correlate with these outcomes.",
        ],
      },
      {
        heading: "Connect tools end to end",
        paragraphs: [
          "Website forms, ad platforms, CRM, and analytics should share UTM discipline and conversion events. A lead should be traceable from first click to closed deal.",
          "Monthly reviews should answer: what worked, what didn't, and what we're changing next — backed by data, not opinions.",
        ],
      },
    ],
  },
  {
    title: "Social Media ROI: Metrics That Matter",
    excerpt:
      "Vanity likes won't pay the bills. Focus on engagement quality, conversion paths, and attribution models that prove channel value.",
    category: "Social Media",
    date: "2026-04-15",
    slug: "social-media-roi-metrics",
    readTime: "5 min read",
    gradient: BLOG_CARD_GRADIENT,
    image: "/images/blog/Social Media ROI.webp",
    author: "247 Digital Pro Team",
    content: [
      {
        paragraphs: [
          "Social platforms optimize for time on site — not your revenue. To prove ROI, you need metrics tied to business outcomes: clicks to site, form fills, booked calls, and assisted conversions.",
        ],
      },
      {
        heading: "Engagement quality over volume",
        paragraphs: [
          "Save rate, shares, profile visits, and link clicks matter more than raw likes. Content that drives action signals platform algorithms to show you to more of the right people.",
        ],
      },
      {
        heading: "Attribute conversions properly",
        paragraphs: [
          "Use UTM parameters on every bio link and ad. Compare last-click vs. assisted conversions in GA4 so social gets credit when it influences a journey that closes elsewhere.",
          "Report monthly: spend, reach, site sessions, leads, and CPA — in one slide stakeholders can understand.",
        ],
      },
    ],
  },
  {
    title: "Content Marketing Playbook for Service Businesses",
    excerpt:
      "A practical framework for thought leadership, case studies, and SEO content that attracts qualified buyers.",
    category: "Content",
    date: "2026-04-08",
    slug: "content-marketing-service-business",
    readTime: "8 min read",
    gradient: BLOG_CARD_GRADIENT,
    image: "/images/blog/Content Marketing Playbook (1).webp",
    author: "247 Digital Pro Team",
    content: [
      {
        paragraphs: [
          "Service businesses win content marketing when they answer buyer questions at every stage — and prove outcomes with real examples. Generic industry news rarely converts; specific, helpful content does.",
        ],
      },
      {
        heading: "Map content to the buyer journey",
        paragraphs: [
          "Awareness: problem-focused articles and short videos. Consideration: comparisons, process explainers, and FAQs. Decision: case studies, testimonials, and clear service pages with CTAs.",
          "Each piece should have one job and one next step — read another article, book a call, or request a quote.",
        ],
      },
      {
        heading: "Repurpose proof into assets",
        paragraphs: [
          "Turn client wins into case studies, pull quotes into social snippets, and extract data points for landing pages. One delivered project can fuel a month of content if you plan reuse upfront.",
        ],
      },
    ],
  },
  {
    title: "Web Performance: Core Web Vitals Explained",
    excerpt:
      "LCP, INP, and CLS demystified — plus actionable fixes to improve rankings, conversions, and user experience on any stack.",
    category: "Technology",
    date: "2026-03-28",
    slug: "core-web-vitals-explained",
    readTime: "7 min read",
    gradient: BLOG_CARD_GRADIENT,
    image: "/images/blog/Web Performance Core (1).webp",
    author: "247 Digital Pro Team",
    content: [
      {
        paragraphs: [
          "Core Web Vitals are Google's user-experience metrics: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). They affect rankings and — more importantly — whether visitors stay and convert.",
        ],
      },
      {
        heading: "LCP: load the main content fast",
        paragraphs: [
          "Optimize hero images (WebP/AVIF, proper sizing), preload critical fonts, and reduce server response time. LCP should hit under 2.5 seconds on mobile for a good score.",
        ],
      },
      {
        heading: "INP: keep interactions responsive",
        paragraphs: [
          "Break up long JavaScript tasks, defer non-critical scripts, and audit third-party widgets that block the main thread. Users notice lag on forms and menus before Google flags it.",
        ],
      },
      {
        heading: "CLS: stop layout jumping",
        paragraphs: [
          "Set width and height on images and embeds, reserve space for ads and banners, and avoid injecting content above existing UI after load. Stable layouts feel professional and reduce bounce.",
        ],
      },
    ],
  },
  // No image yet — hidden until asset is added
  // {
  //   title: "5 Branding Mistakes That Kill Trust",
  //   excerpt:
  //     "Inconsistent visuals, weak messaging, and poor UX signal amateurism. Here's how to build a cohesive brand customers remember.",
  //   category: "Branding",
  //   date: "2026-03-15",
  //   slug: "branding-mistakes-kill-trust",
  //   readTime: "6 min read",
  //   gradient: BLOG_CARD_GRADIENT,
  //   image: "",
  //   author: "247 Digital Pro Team",
  //   content: [
  //     {
  //       paragraphs: [
  //         "Trust is built in seconds and lost just as fast. For service businesses, brand isn't just a logo — it's every touchpoint from your website to your proposal deck.",
  //       ],
  //     },
  //     {
  //       heading: "Inconsistent visual identity",
  //       paragraphs: [
  //         "Mixed fonts, off-brand colors, and stretched logos signal carelessness. Document a simple brand kit: logo lockups, primary palette, typography, and spacing — then enforce it everywhere.",
  //       ],
  //     },
  //     {
  //       heading: "Vague or generic messaging",
  //       paragraphs: [
  //         "We help businesses grow isn't a position. Clarify who you serve, what outcome you deliver, and why you're different — in language your ideal client would actually use.",
  //       ],
  //     },
  //     {
  //       heading: "Ignoring mobile experience",
  //       paragraphs: [
  //         "If your site looks broken on a phone, prospects assume your work quality matches. Responsive design and fast load times are baseline brand expectations in 2026.",
  //       ],
  //     },
  //   ],
  // },
];

export const allPosts: BlogPostPreview[] = blogPosts;

export const featuredPosts = blogPosts.slice(0, 3);
export const latestPosts = blogPosts.slice(0, 3);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
