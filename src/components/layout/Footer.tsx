import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";
import { socials } from "@/config/socials";

const footerNav = [
  {
    title: "Services",
    links: [
      { label: "Brand Strategy", href: "/services/branding" },
      { label: "Website Design", href: "/services/web-development" },
      { label: "SEO Optimization", href: "/services/seo" },
      { label: "Meta Ads", href: "/services/social-media" },
      { label: "Google Ads", href: "/services/digital-marketing" },
      { label: "Content Marketing", href: "/services/content-marketing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Guides", href: "/resources/guides" },
      { label: "Tools", href: "/tools" },
      { label: "Free Website Audit", href: "/tools/seo-audit" },
      { label: "FAQ", href: "/support/faq" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Industries",
    nonClickable: true,
    links: [
      { label: "Contractors" },
      { label: "Ecommerce" },
      { label: "Enterprise" },
      { label: "Startups" },
      { label: "SMEs" },
      { label: "Professional Services" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-dark bg-deep-navy text-on-dark">
      <div className="border-b border-on-dark/10">
        <Container>
          <div className="py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-3 mb-5">
                <Logo
                  variant="dark"
                  layout="icon"
                  size="lg"
                  href={null}
                  className="!p-0"
                />
                <span className="font-heading font-bold text-xl text-on-dark">
                  Digital <span className="text-mid-mint">Pro</span>
                </span>
              </Link>

              <p className="text-sm text-on-dark/50 leading-relaxed max-w-xs mb-6">
                {siteConfig.tagline} {siteConfig.description}
              </p>

              <div className="space-y-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-sm text-on-dark/60 hover:text-on-dark transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {siteConfig.email}
                </a>
                <a
                  href={`tel:${siteConfig.phoneTel}`}
                  className="flex items-center gap-2.5 text-sm text-on-dark/60 hover:text-on-dark transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="font-heading font-semibold text-sm mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {"href" in link ? (
                        <Link
                          href={link.href}
                          className="text-sm text-on-dark/50 hover:text-on-dark transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span className="text-sm text-on-dark/50">
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on-dark/40">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/legal/privacy-policy"
              className="text-xs text-on-dark/40 hover:text-on-dark/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms-of-service"
              className="text-xs text-on-dark/40 hover:text-on-dark/70 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/legal/cookie-policy"
              className="text-xs text-on-dark/40 hover:text-on-dark/70 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 rounded-lg bg-on-dark/5 flex items-center justify-center text-on-dark/40 hover:bg-on-dark/10 hover:text-on-dark transition-all"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="pb-5 text-center">
          <a
            href="https://www.swarajyadigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-medium text-on-dark/40 hover:text-on-dark/70 transition-colors"
          >
            @Developed by Swarajya Digital
          </a>
        </div>
      </Container>
    </footer>
  );
}
