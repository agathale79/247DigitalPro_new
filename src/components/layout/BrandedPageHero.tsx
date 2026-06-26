interface BrandedPageHeroProps {
  overline: string;
  title: React.ReactNode;
  description: string;
}

/** Standard page hero aligned with brand guidelines §04 typography */
export function BrandedPageHero({
  overline,
  title,
  description,
}: BrandedPageHeroProps) {
  return (
    <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-surface">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-overline mb-4">{overline}</p>
        <h1 className="font-heading font-bold text-wordmark text-[clamp(2rem,5vw,3.25rem)] leading-tight tracking-tight">
          {title}
        </h1>
        <p className="mt-5 text-lead text-slate max-w-2xl mx-auto">{description}</p>
      </div>
    </section>
  );
}
