import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { BrandedPageHero } from "@/components/layout/BrandedPageHero";
import { BrandCTA } from "@/components/ui/BrandCTA";

export default function TestimonialsPage() {
  return (
    <main>
      <BrandedPageHero
        overline="Testimonials"
        title={
          <>
            Trusted by <span className="text-primary">business owners</span>
          </>
        }
        description="Partners who value reliability, transparency, and ROI-focused marketing systems."
      />
      <TestimonialsSection />
      <BrandCTA />
    </main>
  );
}
