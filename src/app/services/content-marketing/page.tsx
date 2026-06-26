import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/services";

export const metadata: Metadata = {
  title: "Content Creation",
  description:
    "Blog posts, social content, video scripts, and lead magnets that build authority and nurture prospects to conversion.",
};

export default function ContentMarketingPage() {
  return <ServicePageLayout slug="content-marketing" />;
}
