import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/services";

export const metadata: Metadata = {
  title: "Meta Ads",
  description:
    "Facebook and Instagram paid campaigns with precise targeting, creative, and optimization for qualified leads.",
};

export default function SocialMediaPage() {
  return <ServicePageLayout slug="social-media" />;
}
