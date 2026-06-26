import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/services";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Custom websites, landing pages, and web applications built for performance, SEO, and conversion.",
};

export default function WebDevelopmentPage() {
  return <ServicePageLayout slug="web-development" />;
}
