import {
  HeroSection,
  TrustMetricsSection,
  ServicesOverview,
  IndustrySolutions,
  WhyChooseUs,
  ProductEcosystem,
  WorkflowProcess,
  PortfolioShowcase,
  TestimonialsSection,
  BlogPreview,
  CTASection,
  IntroAnimation,
} from "@/components/sections/home";
import { Container } from "@/components/layout/Container";

function SectionSeparator() {
  return (
    <Container>
      <div className="h-px bg-border/70" aria-hidden />
    </Container>
  );
}

export default function Home() {
  return (
    <IntroAnimation>
      <HeroSection />
      <SectionSeparator />
      <TrustMetricsSection />
      <SectionSeparator />
      <ServicesOverview />
      <SectionSeparator />
      {/* Industry Solutions   <IndustrySolutions />*/}
     
      <SectionSeparator />
      <WhyChooseUs />
      <SectionSeparator />
      <ProductEcosystem />
      <SectionSeparator />
      <WorkflowProcess />
      <SectionSeparator />
      <PortfolioShowcase />
      <SectionSeparator />
      <TestimonialsSection />
      <SectionSeparator />
      <BlogPreview />
      <SectionSeparator />
      <CTASection />
    </IntroAnimation>
  );
}
