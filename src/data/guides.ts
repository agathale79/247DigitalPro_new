/** Unified card & modal header gradient (matches blog cards) */
export const GUIDE_CARD_GRADIENT = "from-mid-mint to-deep-mint";

export interface GuideStep {
  title: string;
  description: string;
}

export interface GuidePreview {
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  gradient: string;
  image: string;
  stepItems: GuideStep[];
}

export const allGuides: GuidePreview[] = [
  {
    title: "Launch Your First SEO Audit in 30 Minutes",
    excerpt:
      "A step-by-step checklist to crawl your site, fix critical issues, and prioritize quick wins that move rankings within weeks.",
    category: "SEO",
    slug: "first-seo-audit",
    readTime: "12 min read",
    difficulty: "Beginner",
    gradient: GUIDE_CARD_GRADIENT,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    stepItems: [
      { title: "Run a full-site crawl", description: "Use Screaming Frog, Sitebulb, or our free audit tool to export URLs, status codes, and indexability flags." },
      { title: "Check index coverage", description: "Review Google Search Console for excluded pages, crawl errors, and sitemap submission status." },
      { title: "Audit title tags & meta descriptions", description: "Flag duplicates, missing tags, and pages over 60 characters for titles or 160 for descriptions." },
      { title: "Review Core Web Vitals", description: "Pull LCP, INP, and CLS scores from PageSpeed Insights for your top 10 landing pages." },
      { title: "Map internal linking gaps", description: "Identify orphan pages and high-value URLs with fewer than three internal links pointing to them." },
      { title: "Prioritize fixes by impact", description: "Sort issues into quick wins (this week), medium effort (this month), and structural (quarterly)." },
      { title: "Document baseline metrics", description: "Record current rankings, organic sessions, and indexed pages so you can measure progress." },
    ],
  },
  {
    title: "Google Ads Setup for Local Service Businesses",
    excerpt:
      "From account structure to conversion tracking — build a lean campaign that generates qualified leads without wasting budget.",
    category: "Paid Ads",
    slug: "google-ads-local-services",
    readTime: "15 min read",
    difficulty: "Intermediate",
    gradient: GUIDE_CARD_GRADIENT,
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    stepItems: [
      { title: "Link Google Ads & Analytics", description: "Connect GA4 and enable auto-tagging so every click carries campaign data into your reports." },
      { title: "Install conversion tracking", description: "Set up form submit, call, and booked-appointment conversions with values if possible." },
      { title: "Build a tight keyword list", description: "Focus on high-intent local terms — service + city, emergency variants, and competitor alternatives." },
      { title: "Structure campaigns by intent", description: "Separate brand, high-intent non-brand, and remarketing into distinct campaigns with clear budgets." },
      { title: "Write ad copy with local proof", description: "Include city names, response time, reviews, and a single clear CTA per ad group." },
      { title: "Set geo-targeting & ad schedule", description: "Target your service radius and align spend with hours when your team can respond fast." },
      { title: "Add negative keywords weekly", description: "Block DIY, jobs, free, and irrelevant queries before they drain budget." },
      { title: "Launch with a test budget", description: "Start at 70% of target spend for 14 days, then reallocate to winning ad groups." },
      { title: "Review search terms report", description: "Every Monday, mine converting queries and add losers as negatives." },
    ],
  },
  {
    title: "Content Calendar That Actually Gets Published",
    excerpt:
      "Plan 90 days of SEO-friendly topics, assign owners, and ship consistently even when your team is stretched thin.",
    category: "Content",
    slug: "content-calendar-playbook",
    readTime: "10 min read",
    difficulty: "Beginner",
    gradient: GUIDE_CARD_GRADIENT,
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80",
    stepItems: [
      { title: "Audit existing content", description: "List top performers, thin pages, and gaps competitors rank for that you don't cover yet." },
      { title: "Define 3–5 content pillars", description: "Align pillars to services and buyer questions — not random industry news." },
      { title: "Map topics to funnel stage", description: "Tag each idea as awareness, consideration, or decision so CTAs match intent." },
      { title: "Assign owners and deadlines", description: "One accountable person per piece — writer, reviewer, and publisher." },
      { title: "Batch production sprints", description: "Block two half-days per month for outlines and drafts instead of one-off heroics." },
      { title: "Ship and measure monthly", description: "Track rankings, time on page, and assisted conversions — kill topics that don't move metrics." },
    ],
  },
  {
    title: "AEO Readiness: Structure Pages for AI Answers",
    excerpt:
      "Format FAQs, entity markup, and authority signals so ChatGPT, Perplexity, and Google AI Overviews cite your brand.",
    category: "AEO",
    slug: "aeo-readiness-guide",
    readTime: "14 min read",
    difficulty: "Intermediate",
    gradient: GUIDE_CARD_GRADIENT,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    stepItems: [
      { title: "Identify answer-worthy queries", description: "Pull questions from Search Console, sales calls, and support tickets — prioritize 'how' and 'what' phrasing." },
      { title: "Create definitive answer blocks", description: "Lead with a 40–60 word direct answer, then expand with context, examples, and data." },
      { title: "Build FAQ schema", description: "Add JSON-LD FAQ markup on service and resource pages with matching on-page Q&A." },
      { title: "Strengthen entity signals", description: "Consistent NAP, About page, author bios, and Organization schema across the site." },
      { title: "Earn third-party mentions", description: "Pursue listings, podcasts, and citations that LLMs can associate with your brand entity." },
      { title: "Structure for scanability", description: "Use H2/H3 hierarchy, bullet lists, tables, and summary boxes machines can parse easily." },
      { title: "Monitor AI citation share", description: "Monthly spot-check target queries in Perplexity and Google AI Overviews for brand visibility." },
      { title: "Refresh top answer pages", description: "Update stats and examples quarterly so models prefer your content over stale competitors." },
    ],
  },
  {
    title: "Website Conversion Audit for Service Sites",
    excerpt:
      "Walk through hero messaging, trust signals, forms, and page speed to turn more visitors into booked calls.",
    category: "Web",
    slug: "website-conversion-audit",
    readTime: "11 min read",
    difficulty: "Beginner",
    gradient: GUIDE_CARD_GRADIENT,
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    stepItems: [
      { title: "Clarify the hero promise", description: "Within 5 seconds, visitors should know who you help, what outcome you deliver, and the next step." },
      { title: "Add proof above the fold", description: "Reviews, client logos, certifications, or a specific result metric near your primary CTA." },
      { title: "Reduce form friction", description: "Ask only for name, email, and phone on first touch — save detail for the sales call." },
      { title: "Test mobile tap targets", description: "CTAs should be thumb-friendly with 44px min height and visible on every scroll depth." },
      { title: "Speed up LCP", description: "Compress hero images, preload fonts, and defer non-critical scripts on landing pages." },
    ],
  },
  {
    title: "Meta Ads Creative Testing Framework",
    excerpt:
      "Run structured hook, offer, and audience tests — know when to kill underperformers and scale winners with confidence.",
    category: "Paid Ads",
    slug: "meta-ads-creative-testing",
    readTime: "13 min read",
    difficulty: "Advanced",
    gradient: GUIDE_CARD_GRADIENT,
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    stepItems: [
      { title: "Define your testing matrix", description: "List variables: hook style, offer, format (static vs video), and audience segment." },
      { title: "Set minimum spend per variant", description: "Allocate enough budget to exit learning phase — typically 50 conversions or 7 days, whichever comes first." },
      { title: "Isolate one variable", description: "Change only the hook OR the visual OR the audience per test — never all three at once." },
      { title: "Track hook rate & hold rate", description: "For video, measure 3-second views and thru-plays; for static, CTR and outbound clicks." },
      { title: "Score creatives on CPA", description: "Rank by cost per lead at equal spend, not vanity engagement." },
      { title: "Scale winners, kill losers fast", description: "Pause ads 20% above target CPA after minimum data; duplicate winners into new ad sets." },
      { title: "Refresh creative monthly", description: "Even top performers fatigue — plan 2–4 new concepts per month per active campaign." },
    ],
  },
  {
    title: "Monthly Marketing Reporting Template",
    excerpt:
      "Track leads, cost per acquisition, channel mix, and pipeline impact in a single dashboard your stakeholders understand.",
    category: "Analytics",
    slug: "monthly-marketing-reporting",
    readTime: "9 min read",
    difficulty: "Beginner",
    gradient: GUIDE_CARD_GRADIENT,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    stepItems: [
      { title: "Pick 5 KPIs max", description: "Leads, CPA, conversion rate, pipeline value, and channel mix — avoid report bloat." },
      { title: "Connect ad platforms to CRM", description: "Ensure UTM discipline so every lead attributes to a source and campaign." },
      { title: "Build a one-page dashboard", description: "Use Looker Studio or Sheets with month-over-month and year-over-year comparisons." },
      { title: "Add a short narrative", description: "Three bullets: what worked, what didn't, and what you're doing next month." },
    ],
  },
  {
    title: "90-Day Growth Sprint for New Websites",
    excerpt:
      "Week-by-week priorities for indexing, on-page SEO, local listings, and your first paid campaigns after launch.",
    category: "Strategy",
    slug: "90-day-growth-sprint",
    readTime: "18 min read",
    difficulty: "Intermediate",
    gradient: GUIDE_CARD_GRADIENT,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    stepItems: [
      { title: "Week 1–2: Technical foundation", description: "Submit sitemap, fix robots.txt, set up Search Console, and verify tracking." },
      { title: "Week 3–4: Core pages live", description: "Publish service pages, About, Contact, and location pages with unique copy." },
      { title: "Week 5–6: Local presence", description: "Claim and optimize Google Business Profile and top 10 local directories." },
      { title: "Week 7–8: Content launch", description: "Publish 4 pillar articles targeting your highest-intent keywords." },
      { title: "Week 9–10: First paid tests", description: "Launch small Google or Meta campaigns with tight geo and conversion tracking." },
      { title: "Week 11: CRO pass", description: "Review heatmaps and form analytics; A/B test headline and CTA on top landing page." },
      { title: "Week 12: Retrospective", description: "Compare traffic, leads, and rankings to day-one baseline; plan next quarter." },
    ],
  },
  {
    title: "CRM Pipeline Setup for Inbound Leads",
    excerpt:
      "Map stages, automate follow-ups, and connect forms and ad platforms so no lead slips through the cracks.",
    category: "Strategy",
    slug: "crm-pipeline-setup",
    readTime: "12 min read",
    difficulty: "Intermediate",
    gradient: GUIDE_CARD_GRADIENT,
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    stepItems: [
      { title: "Define pipeline stages", description: "New lead → contacted → qualified → proposal → won/lost — keep stages actionable, not decorative." },
      { title: "Set SLAs per stage", description: "e.g. contact within 5 minutes, qualify within 24 hours, proposal within 3 business days." },
      { title: "Connect form & ad sources", description: "Pipe website forms, Meta leads, and Google Ads into CRM with source tags intact." },
      { title: "Automate nurture sequences", description: "Email or SMS follow-ups for leads that don't book on first touch." },
      { title: "Build a weekly pipeline review", description: "Monday standup: stale deals, stuck stages, and win/loss reasons from the prior week." },
      { title: "Report velocity metrics", description: "Track time-in-stage and conversion rate between stages to find bottlenecks." },
    ],
  },
];

export function getGuideBySlug(slug: string): GuidePreview | undefined {
  return allGuides.find((g) => g.slug === slug);
}
