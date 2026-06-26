import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { BrandCTA } from "@/components/ui/BrandCTA";

export default function CaseStudiesPage() {
  return (
    <main>
      <BrandedPageHero
        overline="Case Studies"
        title={
          <>
            Real results, <span className="text-primary">real data</span>
          </>
        }
        description="See how we help entrepreneurs and small businesses drive qualified leads, conversions, and revenue."
      />
      <BrandCTA />
    </main>
  );
}
