import Link from "next/link";
import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { Container } from "@/components/layout/Container";

const supportLinks = [
  { label: "FAQ", href: "/support/faq", description: "Answers to common questions about our services." },
  { label: "Knowledge Base", href: "/support/knowledge-base", description: "How-to articles and troubleshooting." },
  { label: "Contact", href: "/contact", description: "Speak with our team about your growth goals." },
];

export default function SupportPage() {
  return (
    <main>
      <BrandedPageHero
        overline="Support"
        title={
          <>
            We&apos;re your <span className="text-primary">strategic partner</span>
          </>
        }
        description="Clear, direct help when you need it — the same transparency we bring to every engagement."
      />
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {supportLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-border bg-white p-6 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <h2 className="font-heading font-semibold text-wordmark text-lg mb-2">
                  {item.label}
                </h2>
                <p className="text-sm text-slate leading-relaxed">{item.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <BrandCTA />
    </main>
  );
}
