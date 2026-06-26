import { IndustrySolutions } from "@/components/sections/home/IndustrySolutions";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { brandVoice } from "@/config/brand";

export default function IndustriesPage() {
  return (
    <main>
      <section className="pt-32 pb-8 sm:pt-40 sm:pb-12 bg-surface">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-overline mb-4">Industries</p>
          <h1 className="font-heading font-bold text-wordmark text-display max-w-3xl mx-auto">
            Marketing systems built for your sector
          </h1>
          <p className="mt-5 text-lead text-slate max-w-2xl mx-auto">
            {brandVoice.servicesIntro}
          </p>
        </div>
      </section>
      <IndustrySolutions />
      <BrandCTA />
    </main>
  );
}
