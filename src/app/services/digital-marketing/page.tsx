import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/services";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "Strategic campaigns across search, social, and content that drive measurable growth and qualified leads.",
};

export default function DigitalMarketingPage() {
  return <ServicePageLayout slug="digital-marketing" />;
}
