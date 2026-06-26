import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { BrandCTA } from "@/components/ui/BrandCTA";
import { getAllPostSlugs, getPostBySlug } from "@/data/blog-posts";
import { siteConfig } from "@/config/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const heroImage = post.image;

  return (
    <>
      <section className="relative overflow-hidden bg-deep-mint min-h-[min(52vw,22rem)] sm:min-h-[min(42vw,24rem)] md:min-h-80 lg:min-h-88 pt-20 md:pt-24 flex flex-col">
        {heroImage && (
          <div className="absolute inset-y-0 right-0 w-[78%] sm:w-[62%] md:w-[58%] lg:w-[55%]">
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover object-[65%_center] sm:object-center"
              sizes="(max-width: 640px) 78vw, (max-width: 768px) 62vw, (max-width: 1024px) 58vw, 55vw"
              priority
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-linear-to-r from-deep-mint via-deep-mint/90 via-22% sm:via-deep-mint/75 sm:via-28% to-transparent to-68% sm:to-72%"
              aria-hidden
            />
          </div>
        )}

        <Container className="relative z-10 flex flex-1 items-center justify-center py-10 md:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-bold text-white text-[clamp(1.75rem,4.5vw,2.75rem)] leading-[1.15] tracking-tight text-balance">
              {post.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed text-pretty max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          </div>
        </Container>
      </section>

      <section className="relative py-12 md:py-16 bg-surface">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-10 w-72 h-72 rounded-full bg-deep-mint/5 blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-primary-light/5 blur-[120px]" />
        </div>

        <Container className="relative z-10">
          <article className="max-w-3xl mx-auto bg-white rounded-2xl border border-border p-8 md:p-12 shadow-[0_2px_24px_rgba(30,90,152,0.06)]">
            <div className="space-y-8">
              {post.content.map((section, i) => (
                <section key={i}>
                  {section.heading && (
                    <h2 className="font-heading font-bold text-wordmark text-xl sm:text-2xl mb-4 leading-snug">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-4">
                    {section.paragraphs.map((paragraph, j) => (
                      <p
                        key={j}
                        className="text-sm sm:text-base text-slate leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-slate">
                Published by{" "}
                <span className="font-semibold text-ink">{post.author}</span> ·{" "}
                {siteConfig.name}
              </p>
              <Link
                href="/resources/blog"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                More articles
              </Link>
            </div>
          </article>
        </Container>
      </section>

      <BrandCTA
        title="Turn insights into measurable growth"
        description="Ready to apply these strategies? Book a free strategy call with our team."
        className="pt-10 md:pt-14 pb-24"
      />
    </>
  );
}
