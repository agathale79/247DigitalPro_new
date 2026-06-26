import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/services";

export const metadata: Metadata = {
  title: "Branding",
  description:
    "Complete brand identity systems including logo design, visual language, and corporate branding.",
};

export default function BrandingPage() {
  return <ServicePageLayout slug="branding" />;
}
