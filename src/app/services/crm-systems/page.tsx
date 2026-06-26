import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/services";

export const metadata: Metadata = {
  title: "CRM Systems",
  description:
    "Custom CRM solutions to streamline sales pipelines, client management, and team collaboration.",
};

export default function CrmSystemsPage() {
  return <ServicePageLayout slug="crm-systems" />;
}
