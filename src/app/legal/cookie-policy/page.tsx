import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export default function CookiePolicyPage() {
  return (
    <main>
      <BrandedPageHero
        overline="Legal"
        title="Cookie Policy"
        description={`How ${siteConfig.name} uses cookies and similar technologies.`}
      />
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl mx-auto text-slate text-sm leading-relaxed space-y-4">
            <p>
              We use cookies to improve site performance and understand how
              visitors use our marketing resources.
            </p>
            <p>
              Contact {siteConfig.email} to manage your preferences.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
