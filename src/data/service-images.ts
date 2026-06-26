/** Hero / card images aligned with the main Services listing page */
export const serviceHeroImages = {
  branding: "/images/Brand-Strategy.gif",
  "web-development": "/images/Website-design.gif",
  seo: "/images/SEO-optimization.gif",
  "social-media": "/images/Social-media-management.gif",
  "digital-marketing": "/images/Paid-advertising.gif",
  "content-marketing": "/images/Content-creation.gif",
  "saas-solutions": "/images/Automation-systems.gif",
  "ai-automation": "/images/Automation-systems.gif",
  "crm-systems": "/images/Performance-analytics.gif",
} as const;

export type ServiceImageSlug = keyof typeof serviceHeroImages;

export function getServiceHeroImage(slug: string): string {
  return (
    serviceHeroImages[slug as ServiceImageSlug] ??
    "/images/marketing-performance-dashboard.avif"
  );
}
