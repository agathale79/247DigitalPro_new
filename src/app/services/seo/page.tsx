import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/services";

export const metadata: Metadata = {
  title: "SEO Optimization",
  description:
    "Technical SEO, on-page strategy, authority content, AEO, and GEO to improve rankings and drive qualified organic traffic.",
};

export default function SeoPage() {
  return <ServicePageLayout slug="seo" />;
}
