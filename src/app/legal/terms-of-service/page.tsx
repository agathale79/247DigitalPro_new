import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export default function TermsOfServicePage() {
  return (
    <main>
      <BrandedPageHero
        overline="Legal"
        title="Terms of Service"
        description={`Terms governing use of ${siteConfig.name} services and website.`}
      />
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl mx-auto text-slate text-sm leading-relaxed space-y-4">
            <p>
              By using our website and engaging our services, you agree to these
              terms. Full terms will be published here.
            </p>
            <p>
              Questions: {siteConfig.email}
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
