import type { Metadata } from "next";
import { JobFlowPage } from "@/components/sections/products/jobflow/JobFlowPage";
import { siteConfig } from "@/config/site";
import { faqs, jobflowMeta } from "@/data/jobflow";

const pageUrl = `${siteConfig.url}/products/jobflow/`;

export const metadata: Metadata = {
  title: `${jobflowMeta.name}: Lead-to-Production System for Service Businesses`,
  description: jobflowMeta.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `${jobflowMeta.name} by ${siteConfig.name}`,
    description: jobflowMeta.tagline,
    url: pageUrl,
    siteName: siteConfig.name,
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: jobflowMeta.name,
      description: jobflowMeta.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: pageUrl,
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function JobFlowProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <JobFlowPage />
    </>
  );
}
