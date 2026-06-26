import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/services";

export const metadata: Metadata = {
  title: "SaaS Solutions",
  description:
    "End-to-end SaaS product development from ideation to launch — CRM, ERP, and custom platforms.",
};

export default function SaasSolutionsPage() {
  return <ServicePageLayout slug="saas-solutions" />;
}
