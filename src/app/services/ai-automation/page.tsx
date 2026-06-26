import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/services";

export const metadata: Metadata = {
  title: "AI & Automation",
  description:
    "Intelligent workflow automation, chatbots, WhatsApp integration, and AI-powered business tools.",
};

export default function AiAutomationPage() {
  return <ServicePageLayout slug="ai-automation" />;
}
