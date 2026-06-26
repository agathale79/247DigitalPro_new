import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export default function PrivacyPolicyPage() {
  return (
    <main>
      <BrandedPageHero
        overline="Legal"
        title="Privacy Policy"
        description={`How ${siteConfig.name} collects, uses, and protects your information.`}
      />
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-slate text-slate text-sm leading-relaxed space-y-4">
            <p>
              This policy describes how we handle personal data when you use our
              website and services. Contact us at {siteConfig.email} with any
              questions.
            </p>
            <p>
              Full legal text will be published here. For immediate requests,
              please reach out through our contact page.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
