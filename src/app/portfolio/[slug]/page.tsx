import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioDetailLayout } from "@/components/portfolio/PortfolioDetailLayout";
import {
  getAllPortfolioSlugs,
  getPortfolioBySlug,
} from "@/data/portfolio-details";

interface PortfolioDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPortfolioSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.heroDescription,
  };
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);
  if (!project) notFound();

  return (
    <main className="relative bg-surface">
      <div className="fixed inset-0 -z-10 bg-surface">
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: "-10%",
            right: "-8%",
            backgroundColor: "var(--pale-blue)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "5%",
            left: "-5%",
            backgroundColor: "var(--brand-mint)",
            opacity: 0.4,
          }}
        />
      </div>

      <PortfolioDetailLayout project={project} />
    </main>
  );
}
